async function initWebGPU(canvas) {
    if (!navigator.gpu) {
        throw new Error("WebGPU not supported on this browser.");
    }

    const adapter = await navigator.gpu.requestAdapter();
    if (!adapter) {
        throw new Error("No appropriate GPUAdapter found.");
    }

    const device = await adapter.requestDevice();
    const context = canvas.getContext("webgpu");
    const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device: device,
        format: canvasFormat,
    });

    return { device, context, canvasFormat };
}

class SequencerUI {
    constructor(device, context, canvasFormat, canvas) {
        this.device = device;
        this.context = context;
        this.canvasFormat = canvasFormat;
        this.canvas = canvas;
        this.uniformBuffer = null;
        this.bindGroup = null;
        this.pipeline = null;
        this.time = 0;

        // UI State
        this.knobs = new Map();
        this.buttons = new Map();
        this.stepSequencer = { steps: 16, currentStep: 0, pattern: new Array(16).fill(false) };
        this.display = { text: "KASM", mode: "main" };
        this.midiClip = { notes: [] };
        this.isPlaying = false;

        this.init();
        this.setupEventListeners();
    }

    async init() {
        // Create uniform buffer for UI data
        this.uniformBuffer = this.device.createBuffer({
            size: 256, // Enough for time, colors, positions
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        });

        // Create shader modules
        const shaderModule = this.device.createShaderModule({
            code: `
                struct Uniforms {
                    time: f32,
                    canvas_size: vec2<f32>,
                    padding: vec2<f32>,
                }

                @group(0) @binding(0) var<uniform> uniforms: Uniforms;

                struct VertexOutput {
                    @builtin(position) position: vec4<f32>,
                    @location(0) uv: vec2<f32>,
                }

                @vertex
                fn vs_main(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
                    var pos = array<vec2<f32>, 6>(
                        vec2<f32>(-1.0, -1.0),
                        vec2<f32>(1.0, -1.0),
                        vec2<f32>(1.0, 1.0),
                        vec2<f32>(-1.0, -1.0),
                        vec2<f32>(1.0, 1.0),
                        vec2<f32>(-1.0, 1.0)
                    );
                    
                    var uv = array<vec2<f32>, 6>(
                        vec2<f32>(0.0, 1.0),
                        vec2<f32>(1.0, 1.0),
                        vec2<f32>(1.0, 0.0),
                        vec2<f32>(0.0, 1.0),
                        vec2<f32>(1.0, 0.0),
                        vec2<f32>(0.0, 0.0)
                    );

                    var output: VertexOutput;
                    output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
                    output.uv = uv[vertexIndex];
                    return output;
                }

                // SDF functions for UI elements
                fn sdf_circle(p: vec2<f32>, r: f32) -> f32 {
                    return length(p) - r;
                }

                fn sdf_box(p: vec2<f32>, b: vec2<f32>) -> f32 {
                    let d = abs(p) - b;
                    return length(max(d, vec2<f32>(0.0))) + min(max(d.x, d.y), 0.0);
                }

                fn sdf_rounded_box(p: vec2<f32>, b: vec2<f32>, r: f32) -> f32 {
                    let d = abs(p) - b + vec2<f32>(r);
                    return length(max(d, vec2<f32>(0.0))) - r;
                }

                // Smooth min for blending shapes
                fn smin(a: f32, b: f32, k: f32) -> f32 {
                    let h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
                    return mix(b, a, h) - k * h * (1.0 - h);
                }

                // Draw knob with value indicator
                fn draw_knob(uv: vec2<f32>, center: vec2<f32>, radius: f32, value: f32) -> vec3<f32> {
                    let p = uv - center;
                    let knob_dist = sdf_circle(p, radius);
                    let inner_dist = sdf_circle(p, radius * 0.6);
                    
                    // Knob body (dark metallic)
                    var color = vec3<f32>(0.2, 0.2, 0.25);
                    
                    if (knob_dist < 0.0) {
                        // Metallic rim highlight
                        let rim_highlight = smoothstep(-0.005, 0.0, knob_dist);
                        color = mix(color, vec3<f32>(0.6, 0.6, 0.7), rim_highlight * 0.3);
                        
                        // Value indicator line
                        let angle = value * 3.14159 * 1.5 - 3.14159 * 0.75; // -135° to +135°
                        let indicator_pos = vec2<f32>(cos(angle), sin(angle)) * radius * 0.8;
                        let line_dist = length(p - indicator_pos);
                        
                        if (line_dist < 0.008) {
                            color = vec3<f32>(1.0, 0.8, 0.2); // Orange indicator
                        }
                    }
                    
                    return color;
                }

                // Draw button with LED ring
                fn draw_button(uv: vec2<f32>, center: vec2<f32>, radius: f32, pressed: bool, led_on: bool) -> vec3<f32> {
                    let p = uv - center;
                    let button_dist = sdf_circle(p, radius);
                    let led_ring_dist = abs(sdf_circle(p, radius * 1.2)) - 0.005;
                    
                    var color = vec3<f32>(0.1, 0.1, 0.1);
                    
                    if (button_dist < 0.0) {
                        if (pressed) {
                            color = vec3<f32>(0.05, 0.05, 0.08);
                        } else {
                            color = vec3<f32>(0.15, 0.15, 0.18);
                        }
                    }
                    
                    // LED ring
                    if (led_ring_dist < 0.0 && led_on) {
                        color = vec3<f32>(0.2, 0.8, 1.0); // Blue LED
                    }
                    
                    return color;
                }

                // Draw step sequencer pad
                fn draw_step_pad(uv: vec2<f32>, center: vec2<f32>, size: f32, active: bool, current: bool) -> vec3<f32> {
                    let p = uv - center;
                    let pad_dist = sdf_rounded_box(p, vec2<f32>(size), size * 0.15);
                    
                    var color = vec3<f32>(0.1, 0.1, 0.12);
                    
                    if (pad_dist < 0.0) {
                        if (current) {
                            // Current step - bright yellow
                            color = vec3<f32>(1.0, 1.0, 0.3);
                        } else if (active) {
                            // Active step - orange
                            color = vec3<f32>(1.0, 0.5, 0.1);
                        } else {
                            // Inactive step - dark
                            color = vec3<f32>(0.2, 0.2, 0.25);
                        }
                        
                        // Highlight edges
                        let edge_highlight = smoothstep(-0.002, 0.0, pad_dist);
                        color = mix(color, color * 1.3, edge_highlight * 0.5);
                    }
                    
                    return color;
                }

                // Draw LCD-style display
                fn draw_display(uv: vec2<f32>, center: vec2<f32>, size: vec2<f32>) -> vec3<f32> {
                    let p = uv - center;
                    let display_dist = sdf_rounded_box(p, size, 0.02);
                    
                    var color = vec3<f32>(0.05, 0.05, 0.05);
                    
                    if (display_dist < 0.0) {
                        // LCD background - dark green
                        color = vec3<f32>(0.0, 0.1, 0.0);
                        
                        // Grid pattern for LCD effect
                        let grid = sin(p.x * 150.0) * sin(p.y * 150.0);
                        color = mix(color, vec3<f32>(0.0, 0.2, 0.0), grid * 0.1);
                        
                        // Text area highlight (simplified)
                        if (abs(p.x) < size.x * 0.8 && abs(p.y) < size.y * 0.6) {
                            color = mix(color, vec3<f32>(0.2, 1.0, 0.2), 0.8);
                        }
                    }
                    
                    return color;
                }

                @fragment
                fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
                    let uv = input.uv;
                    let aspect = uniforms.canvas_size.x / uniforms.canvas_size.y;
                    let coord = vec2<f32>((uv.x - 0.5) * aspect, uv.y - 0.5);
                    
                    // Background - dark metallic
                    var color = vec3<f32>(0.08, 0.08, 0.1);
                    
                    // Add subtle grid pattern
                    let grid = sin(coord.x * 50.0) * sin(coord.y * 50.0);
                    color = mix(color, vec3<f32>(0.12, 0.12, 0.14), grid * 0.02);
                    
                    // Main display (top center)
                    let display_color = draw_display(coord, vec2<f32>(0.0, 0.3), vec2<f32>(0.25, 0.1));
                    color = mix(color, display_color, step(0.0, -sdf_rounded_box(coord - vec2<f32>(0.0, 0.3), vec2<f32>(0.25, 0.1), 0.02)));
                    
                    // Knobs row (top)
                    for (var i: i32 = 0; i < 6; i++) {
                        let knob_x = -0.6 + f32(i) * 0.24;
                        let knob_center = vec2<f32>(knob_x, 0.1);
                        let knob_color = draw_knob(coord, knob_center, 0.04, f32(i) * 0.16 + sin(uniforms.time + f32(i)) * 0.1 + 0.5);
                        color = mix(color, knob_color, step(0.0, -sdf_circle(coord - knob_center, 0.04)));
                    }
                    
                    // Button rows
                    for (var row: i32 = 0; row < 3; row++) {
                        for (var col: i32 = 0; col < 4; col++) {
                            let button_x = -0.45 + f32(col) * 0.3;
                            let button_y = -0.1 - f32(row) * 0.15;
                            let button_center = vec2<f32>(button_x, button_y);
                            let button_id = row * 4 + col;
                            let pressed = (button_id == 2 || button_id == 5); // Example pressed states
                            let led_on = (button_id % 3 == 0);
                            let button_color = draw_button(coord, button_center, 0.025, pressed, led_on);
                            color = mix(color, button_color, step(0.0, -sdf_circle(coord - button_center, 0.025)));
                        }
                    }
                    
                    // Step sequencer (bottom)
                    for (var i: i32 = 0; i < 16; i++) {
                        let step_x = -0.75 + f32(i) * 0.1;
                        let step_center = vec2<f32>(step_x, -0.6);
                        let current_step = i32(uniforms.time * 2.0) % 16;
                        let active = (i % 3 == 0 || i % 5 == 0); // Example pattern
                        let current = (i == current_step);
                        let step_color = draw_step_pad(coord, step_center, 0.03, active, current);
                        color = mix(color, step_color, step(0.0, -sdf_rounded_box(coord - step_center, vec2<f32>(0.03), 0.005)));
                    }
                    
                    // Transport buttons (bottom right)
                    let play_button = draw_button(coord, vec2<f32>(0.6, -0.6), 0.03, false, true);
                    color = mix(color, play_button, step(0.0, -sdf_circle(coord - vec2<f32>(0.6, -0.6), 0.03)));
                    
                    let stop_button = draw_button(coord, vec2<f32>(0.75, -0.6), 0.03, false, false);
                    color = mix(color, stop_button, step(0.0, -sdf_circle(coord - vec2<f32>(0.75, -0.6), 0.03)));
                    
                    return vec4<f32>(color, 1.0);
                }
            `
        });

        // Create bind group layout
        const bindGroupLayout = this.device.createBindGroupLayout({
            entries: [{
                binding: 0,
                visibility: GPUShaderStage.FRAGMENT,
                buffer: { type: "uniform" }
            }]
        });

        // Create render pipeline
        this.pipeline = this.device.createRenderPipeline({
            layout: this.device.createPipelineLayout({
                bindGroupLayouts: [bindGroupLayout]
            }),
            vertex: {
                module: shaderModule,
                entryPoint: "vs_main",
            },
            fragment: {
                module: shaderModule,
                entryPoint: "fs_main",
                targets: [{
                    format: this.canvasFormat,
                }],
            },
            primitive: {
                topology: "triangle-list",
            },
        });

        // Create bind group
        this.bindGroup = this.device.createBindGroup({
            layout: bindGroupLayout,
            entries: [{
                binding: 0,
                resource: { buffer: this.uniformBuffer }
            }]
        });

        // Initialize knobs with current values from HTML
        this.syncKnobsFromHTML();
    }

    syncKnobsFromHTML() {
        // Sync knob values from existing HTML controls
        const knobMappings = [
            { id: 'note', name: 'Root Note' },
            { id: 'semitone', name: 'Semitone' },
            { id: 'velocity', name: 'Velocity' },
            { id: 'enc1', name: 'Enc1' },
            { id: 'enc2', name: 'Enc2' },
            { id: 'rateMs', name: 'Rate' }
        ];

        knobMappings.forEach((mapping, index) => {
            const element = document.getElementById(mapping.id);
            if (element) {
                const value = parseFloat(element.value);
                const min = parseFloat(element.min) || 0;
                const max = parseFloat(element.max) || 127;
                const normalizedValue = (value - min) / (max - min);

                this.knobs.set(index, {
                    value: normalizedValue,
                    htmlId: mapping.id,
                    name: mapping.name,
                    min: min,
                    max: max
                });
            }
        });
    }

    setupEventListeners() {
        // Mouse interaction for knobs and buttons
        this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));

        // Touch events for mobile
        this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Sync with HTML controls
        const knobIds = ['note', 'semitone', 'velocity', 'enc1', 'enc2', 'rateMs'];
        knobIds.forEach((id, index) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    this.syncKnobFromHTML(index, id);
                });
            }
        });

        // Sync step sequencer with emanator changes
        const emanatorSelect = document.getElementById('inlet_5_emanator');
        if (emanatorSelect) {
            emanatorSelect.addEventListener('change', () => {
                this.updateStepSequencer();
            });
        }
    }

    syncKnobFromHTML(knobIndex, htmlId) {
        const element = document.getElementById(htmlId);
        if (element && this.knobs.has(knobIndex)) {
            const knob = this.knobs.get(knobIndex);
            const value = parseFloat(element.value);
            const normalizedValue = (value - knob.min) / (knob.max - knob.min);
            knob.value = normalizedValue;
            this.knobs.set(knobIndex, knob);
        }
    }

    updateStepSequencer() {
        // Update step sequencer pattern based on current emanator selection
        const emanatorSelect = document.getElementById('inlet_5_emanator');
        if (emanatorSelect) {
            const value = parseInt(emanatorSelect.value);
            // Create pattern based on emanator algorithm
            for (let i = 0; i < 16; i++) {
                this.stepSequencer.pattern[i] = (i % 3 === 0) || (i % 5 === 0) || (value % (i + 1) === 0);
            }
        }
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        this.handleInteraction(x, y, true);
    }

    handleMouseMove(e) {
        if (this.isDragging) {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            this.handleDrag(x, y);
        }
    }

    handleMouseUp(e) {
        this.isDragging = false;
        this.dragTarget = null;
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const x = (touch.clientX - rect.left) / rect.width;
        const y = (touch.clientY - rect.top) / rect.height;

        this.handleInteraction(x, y, true);
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (this.isDragging) {
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = (touch.clientX - rect.left) / rect.width;
            const y = (touch.clientY - rect.top) / rect.height;

            this.handleDrag(x, y);
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.isDragging = false;
        this.dragTarget = null;
    }

    handleInteraction(x, y, isDown) {
        // Convert screen coordinates to shader coordinates
        const aspect = this.canvas.width / this.canvas.height;
        const coord = [(x - 0.5) * aspect, 0.5 - y];

        // Check for knob interactions
        for (let i = 0; i < 6; i++) {
            const knobX = -0.6 + i * 0.24;
            const knobY = 0.1;
            const dist = Math.sqrt((coord[0] - knobX) ** 2 + (coord[1] - knobY) ** 2);

            if (dist < 0.04) {
                if (isDown) {
                    this.isDragging = true;
                    this.dragTarget = { type: 'knob', index: i };
                }
                return;
            }
        }

        // Check for step sequencer interactions
        for (let i = 0; i < 16; i++) {
            const stepX = -0.75 + i * 0.1;
            const stepY = -0.6;
            const dist = Math.sqrt((coord[0] - stepX) ** 2 + (coord[1] - stepY) ** 2);

            if (dist < 0.03) {
                if (isDown) {
                    this.stepSequencer.pattern[i] = !this.stepSequencer.pattern[i];
                    console.log(`Step ${i + 1}: ${this.stepSequencer.pattern[i] ? 'ON' : 'OFF'}`);
                }
                return;
            }
        }
    }

    handleDrag(x, y) {
        if (!this.dragTarget) return;

        if (this.dragTarget.type === 'knob') {
            // Convert mouse movement to knob value
            const deltaY = this.lastMouseY - y;
            const knob = this.knobs.get(this.dragTarget.index);

            if (knob) {
                knob.value = Math.max(0, Math.min(1, knob.value + deltaY * 2));
                this.knobs.set(this.dragTarget.index, knob);

                // Update corresponding HTML element
                const element = document.getElementById(knob.htmlId);
                if (element) {
                    const realValue = knob.min + knob.value * (knob.max - knob.min);
                    element.value = realValue;
                    element.dispatchEvent(new Event('input'));
                }
            }
        }

        this.lastMouseY = y;
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.canvas.getBoundingClientRect();

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;

        // Reconfigure WebGPU context with new size
        this.context.configure({
            device: this.device,
            format: this.canvasFormat,
            size: { width: this.canvas.width, height: this.canvas.height }
        });
    }

    render() {
        this.time += 0.016; // ~60fps

        // Update uniforms with current time and canvas size
        const uniformData = new Float32Array([
            this.time,                    // time
            this.canvas.width,           // canvas_size.x
            this.canvas.height,          // canvas_size.y
            0.0                          // padding
        ]);

        this.device.queue.writeBuffer(this.uniformBuffer, 0, uniformData);

        // Create command encoder
        const commandEncoder = this.device.createCommandEncoder();

        // Begin render pass
        const renderPass = commandEncoder.beginRenderPass({
            colorAttachments: [{
                view: this.context.getCurrentTexture().createView(),
                loadOp: "clear",
                clearValue: { r: 0.08, g: 0.08, b: 0.1, a: 1.0 },
                storeOp: "store",
            }],
        });

        // Set pipeline and draw
        renderPass.setPipeline(this.pipeline);
        renderPass.setBindGroup(0, this.bindGroup);
        renderPass.draw(6); // Draw 2 triangles (6 vertices)
        renderPass.end();

        // Submit commands
        this.device.queue.submit([commandEncoder.finish()]);

        // Continue render loop
        requestAnimationFrame(() => this.render());
    }

    start() {
        // Ensure canvas is properly sized
        this.resizeCanvas();

        // Start render loop
        this.render();

        // Setup resize handler
        window.addEventListener('resize', () => this.resizeCanvas());

        console.log('KASM WebGPU Sequencer UI started');
    }
}

// Export for use in other files
window.SequencerUI = SequencerUI;
window.initWebGPU = initWebGPU;

// Initialize WebGPU UI
async function initSequencerUI() {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
        console.error('Canvas element not found');
        return;
    }

    try {
        const { device, context, canvasFormat } = await initWebGPU(canvas);
        const ui = new SequencerUI(device, context, canvasFormat, canvas);

        // Make UI globally accessible for integration
        window.sequencer_ui = ui;

        // Start rendering
        ui.render();

        console.log('Sequencer-style WebGPU UI initialized successfully');
        return ui;
    } catch (error) {
        console.error('Failed to initialize WebGPU UI:', error);
        // Fallback to HTML UI if WebGPU fails
        canvas.style.display = 'none';
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSequencerUI);
} else {
    initSequencerUI();
}
