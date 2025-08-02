import{r as c,j as e,C as M,c as ae,A as ce,X as le,E as de,B as v,T as d,O as we,S as A,a as xe,V as ye,u as S,P as D,b as ve}from"./three-t7VPYTuV.js";import"./vendor-9sitkZcQ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const _e=`
struct VertexInput {
  @location(0) position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) uv: vec2<f32>,
}

struct VertexOutput {
  @builtin(position) clip_position: vec4<f32>,
  @location(0) world_position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) uv: vec2<f32>,
}

struct Uniforms {
  view_proj: mat4x4<f32>,
  model: mat4x4<f32>,
  time: f32,
  light_position: vec3<f32>,
}

@group(0) @binding(0)
var<uniform> uniforms: Uniforms;

@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  var out: VertexOutput;
  
  let world_position = uniforms.model * vec4<f32>(input.position, 1.0);
  out.world_position = world_position.xyz;
  out.clip_position = uniforms.view_proj * world_position;
  out.normal = normalize((uniforms.model * vec4<f32>(input.normal, 0.0)).xyz);
  out.uv = input.uv;
  
  return out;
}
`,je=`
struct FragmentInput {
  @location(0) world_position: vec3<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) uv: vec2<f32>,
}

struct Uniforms {
  view_proj: mat4x4<f32>,
  model: mat4x4<f32>,
  time: f32,
  light_position: vec3<f32>,
}

@group(0) @binding(0)
var<uniform> uniforms: Uniforms;

@group(0) @binding(1)
var texture_sampler: sampler;

@group(0) @binding(2)
var noise_texture: texture_2d<f32>;

// Authentic Pyrmont sandstone color palette (1880s rustic)
const SANDSTONE_BASE: vec3<f32> = vec3<f32>(0.82, 0.68, 0.45); // Warm golden base
const SANDSTONE_DARK: vec3<f32> = vec3<f32>(0.58, 0.48, 0.32); // Deep weathered blocks
const SANDSTONE_LIGHT: vec3<f32> = vec3<f32>(0.92, 0.82, 0.62); // Light weathered surface
const SANDSTONE_MORTAR: vec3<f32> = vec3<f32>(0.72, 0.62, 0.48); // Mortar joints
const SANDSTONE_STAIN: vec3<f32> = vec3<f32>(0.68, 0.52, 0.35); // Age staining

// Noise functions for procedural texture generation
fn hash(p: vec2<f32>) -> f32 {
  let h = dot(p, vec2<f32>(127.1, 311.7));
  return fract(sin(h) * 43758.5453123);
}

fn noise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  
  let a = hash(i);
  let b = hash(i + vec2<f32>(1.0, 0.0));
  let c = hash(i + vec2<f32>(0.0, 1.0));
  let d = hash(i + vec2<f32>(1.0, 1.0));
  
  let u = f * f * (3.0 - 2.0 * f);
  
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

fn fbm(p: vec2<f32>) -> f32 {
  var value = 0.0;
  var amplitude = 0.5;
  var frequency = 1.0;
  
  for (var i = 0; i < 6; i++) {
    value += amplitude * noise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  return value;
}

// Authentic Pyrmont sandstone block pattern
fn sandstoneBlocks(uv: vec2<f32>) -> f32 {
  // Create realistic block pattern with mortar joints
  let block_size = vec2<f32>(0.3, 0.15); // Typical sandstone block proportions
  let block_uv = uv / block_size;
  let block_id = floor(block_uv);
  let block_local = fract(block_uv);
  
  // Mortar joint width
  let mortar_width = 0.08;
  let mortar_x = smoothstep(0.0, mortar_width, block_local.x) * smoothstep(1.0, 1.0 - mortar_width, block_local.x);
  let mortar_y = smoothstep(0.0, mortar_width, block_local.y) * smoothstep(1.0, 1.0 - mortar_width, block_local.y);
  
  return mortar_x * mortar_y;
}

// Weathering and age patterns specific to 1880s Pyrmont stone
fn weatheringPattern(uv: vec2<f32>, world_pos: vec3<f32>) -> f32 {
  // Surface weathering from 140+ years of exposure
  let age_weathering = fbm(uv * 6.0 + world_pos.xz * 0.08);
  
  // Rain streaking patterns (vertical emphasis)
  let rain_streaks = fbm(vec2<f32>(uv.x * 3.0, uv.y * 12.0));
  
  // Wind erosion (horizontal patterns)
  let wind_erosion = fbm(vec2<f32>(uv.x * 15.0, uv.y * 4.0));
  
  return mix(age_weathering, mix(rain_streaks, wind_erosion, 0.4), 0.6);
}

// Iron oxide staining typical of Pyrmont sandstone
fn ironStaining(uv: vec2<f32>, world_pos: vec3<f32>) -> f32 {
  // Iron-rich mineral deposits create characteristic staining
  let iron_deposits = fbm(uv * 8.0 + world_pos.xz * 0.03);
  
  // Vertical streaking from water runoff
  let vertical_stains = fbm(vec2<f32>(uv.x * 4.0, uv.y * 0.8));
  
  // Concentrated staining near mortar joints
  let joint_staining = 1.0 - sandstoneBlocks(uv);
  
  return max(0.0, iron_deposits - 0.3) * (0.4 + 0.6 * vertical_stains) * (0.7 + 0.3 * joint_staining);
}

// Surface roughness for realistic lighting
fn surfaceRoughness(uv: vec2<f32>) -> f32 {
  let detail_scale = 32.0;
  let fine_detail = fbm(uv * detail_scale) * 0.1;
  let medium_detail = fbm(uv * detail_scale * 0.5) * 0.2;
  
  return fine_detail + medium_detail;
}

@fragment
fn fs_main(input: FragmentInput) -> @location(0) vec4<f32> {
  let uv = input.uv;
  let world_pos = input.world_position;
  let normal = normalize(input.normal);
  
  // Generate authentic Pyrmont sandstone texture layers
  let blocks = sandstoneBlocks(uv);
  let weathering = weatheringPattern(uv, world_pos);
  let iron_stain = ironStaining(uv, world_pos);
  let roughness = surfaceRoughness(uv);
  
  // Base sandstone color - start with authentic golden tone
  var base_color = SANDSTONE_BASE;
  
  // Apply block structure - mortar joints are darker
  base_color = mix(base_color, SANDSTONE_MORTAR, (1.0 - blocks) * 0.4);
  
  // Apply weathering - creates lighter weathered areas
  base_color = mix(base_color, SANDSTONE_LIGHT, weathering * 0.3);
  
  // Apply age staining - darker weathered areas
  base_color = mix(base_color, SANDSTONE_STAIN, weathering * 0.2);
  
  // Apply iron oxide staining - characteristic rust-colored streaks
  base_color = mix(base_color, SANDSTONE_STAIN, iron_stain * 0.5);
  
  // Lighting calculation
  let light_dir = normalize(uniforms.light_position - world_pos);
  let view_dir = normalize(-world_pos); // Assuming camera at origin
  let half_dir = normalize(light_dir + view_dir);
  
  // Modify normal with surface roughness
  let perturbed_normal = normalize(normal + vec3<f32>(roughness * 2.0 - 1.0, 0.0, roughness * 2.0 - 1.0) * 0.1);
  
  // Diffuse lighting
  let diffuse = max(0.0, dot(perturbed_normal, light_dir));
  
  // Specular lighting (subtle for sandstone)
  let specular = pow(max(0.0, dot(perturbed_normal, half_dir)), 16.0) * 0.1;
  
  // Ambient occlusion approximation - based on block structure and weathering
  let ao = 1.0 - ((1.0 - blocks) * 0.15 + weathering * 0.1);
  
  // Final color composition
  let ambient = 0.3;
  let final_color = base_color * (ambient * ao + diffuse * 0.8) + vec3<f32>(specular);
  
  // Add subtle subsurface scattering effect
  let subsurface = pow(max(0.0, dot(-light_dir, perturbed_normal)), 2.0) * 0.1;
  let sss_color = SANDSTONE_LIGHT * subsurface;
  
  return vec4<f32>(final_color + sss_color, 1.0);
}
`,Se=`
@group(0) @binding(0)
var<storage, read_write> noise_data: array<f32>;

@compute @workgroup_size(8, 8, 1)
fn cs_main(@builtin(global_invocation_id) global_id: vec3<u32>) {
  let dims = 256u;
  let index = global_id.y * dims + global_id.x;
  
  if (global_id.x >= dims || global_id.y >= dims) {
    return;
  }
  
  let uv = vec2<f32>(f32(global_id.x), f32(global_id.y)) / f32(dims);
  
  // Generate procedural noise for sandstone texture
  var noise_value = 0.0;
  var amplitude = 1.0;
  var frequency = 1.0;
  
  for (var i = 0; i < 8; i++) {
    let p = uv * frequency;
    let n = sin(p.x * 6.28318) * cos(p.y * 6.28318) * 0.5 + 0.5;
    noise_value += n * amplitude;
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  
  noise_data[index] = noise_value;
}
`;class Ae{device;pipeline=null;uniformBuffer=null;noiseTexture=null;bindGroup=null;constructor(t){this.device=t}async initialize(){const t=this.device.createShaderModule({code:_e}),r=this.device.createShaderModule({code:je});this.uniformBuffer=this.device.createBuffer({size:160,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),await this.generateNoiseTexture();const i=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,sampler:{}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}}]}),s=this.device.createSampler({magFilter:"linear",minFilter:"linear",mipmapFilter:"linear",addressModeU:"repeat",addressModeV:"repeat"});this.bindGroup=this.device.createBindGroup({layout:i,entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:s},{binding:2,resource:this.noiseTexture.createView()}]}),this.pipeline=this.device.createRenderPipeline({layout:this.device.createPipelineLayout({bindGroupLayouts:[i]}),vertex:{module:t,entryPoint:"vs_main",buffers:[{arrayStride:32,attributes:[{format:"float32x3",offset:0,shaderLocation:0},{format:"float32x3",offset:12,shaderLocation:1},{format:"float32x2",offset:24,shaderLocation:2}]}]},fragment:{module:r,entryPoint:"fs_main",targets:[{format:"bgra8unorm"}]},primitive:{topology:"triangle-list",cullMode:"back"}})}async generateNoiseTexture(){const r=this.device.createShaderModule({code:Se}),i=this.device.createBuffer({size:256*256*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),s=this.device.createComputePipeline({layout:"auto",compute:{module:r,entryPoint:"cs_main"}}),o=this.device.createBindGroup({layout:s.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i}}]}),a=this.device.createCommandEncoder(),u=a.beginComputePass();u.setPipeline(s),u.setBindGroup(0,o),u.dispatchWorkgroups(Math.ceil(256/8),Math.ceil(256/8)),u.end(),this.noiseTexture=this.device.createTexture({size:[256,256,1],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),a.copyBufferToTexture({buffer:i,bytesPerRow:256*4},{texture:this.noiseTexture},[256,256,1]),this.device.queue.submit([a.finish()])}updateUniforms(t,r,i,s){if(!this.uniformBuffer)return;const o=new Float32Array(40);o.set(t,0),o.set(r,16),o[32]=i,o.set(s,33),this.device.queue.writeBuffer(this.uniformBuffer,0,o.buffer)}render(t,r,i,s){!this.pipeline||!this.bindGroup||(t.setPipeline(this.pipeline),t.setBindGroup(0,this.bindGroup),t.setVertexBuffer(0,r),t.setIndexBuffer(i,"uint16"),t.drawIndexed(s))}}class ue{device=null;context=null;canvas;fallbackToWebGL=!1;webglContext=null;sandstoneMaterial=null;quadVertexBuffer=null;quadIndexBuffer=null;depthTexture=null;constructor(t){this.canvas=t}async initialize(){try{if("gpu"in navigator&&navigator.gpu){const t=navigator.gpu,r=await t.requestAdapter();if(r&&(this.device=await r.requestDevice(),this.context=this.canvas.getContext("webgpu"),this.context&&this.device))return this.context.configure({device:this.device,format:t.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),this.sandstoneMaterial=new Ae(this.device),await this.sandstoneMaterial.initialize(),this.createFullScreenQuad(),!0}}catch{}return this.initializeWebGL()}initializeWebGL(){try{if(this.webglContext=this.canvas.getContext("webgl2")||this.canvas.getContext("webgl"),this.webglContext)return this.fallbackToWebGL=!0,this.webglContext.enable(this.webglContext.DEPTH_TEST),this.webglContext.enable(this.webglContext.CULL_FACE),!0}catch{}return!1}render(t,r,i){this.fallbackToWebGL?this.renderWebGL(t,r,i):this.renderWebGPU(t,r,i)}renderWebGPU(t,r,i){if(!this.device||!this.context)return;const s=this.device.createCommandEncoder(),a={colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]},u=s.beginRenderPass(a);if(this.sandstoneMaterial&&this.quadVertexBuffer&&this.quadIndexBuffer){const h=performance.now()/1e3,f=new Float32Array([2,5,10]),l=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),p=new Float32Array(16);p.set([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),this.sandstoneMaterial.updateUniforms(p,l,h,f),this.sandstoneMaterial.render(u,this.quadVertexBuffer,this.quadIndexBuffer,6)}for(const h of t)this.renderObjectWebGPU(u,h,r,i);u.end(),this.device.queue.submit([s.finish()])}renderObjectWebGPU(t,r,i,s){r.mesh}createFullScreenQuad(){if(!this.device)return;const t=new Float32Array([-1,-1,.999,0,0,1,0,1,1,-1,.999,0,0,1,1,1,1,1,.999,0,0,1,1,0,-1,1,.999,0,0,1,0,0]),r=new Uint16Array([0,1,2,0,2,3]);this.quadVertexBuffer=this.device.createBuffer({size:t.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(this.quadVertexBuffer.getMappedRange()).set(t),this.quadVertexBuffer.unmap(),this.quadIndexBuffer=this.device.createBuffer({size:r.byteLength,usage:GPUBufferUsage.INDEX,mappedAtCreation:!0}),new Uint16Array(this.quadIndexBuffer.getMappedRange()).set(r),this.quadIndexBuffer.unmap()}renderWebGL(t,r,i){if(!this.webglContext)return;const s=this.webglContext;s.clearColor(0,0,0,1),s.clear(s.COLOR_BUFFER_BIT|s.DEPTH_BUFFER_BIT),s.viewport(0,0,this.canvas.width,this.canvas.height);for(const o of t)this.renderObjectWebGL(o,r,i)}renderObjectWebGL(t,r,i){this.webglContext}resize(t,r){this.canvas.width=t,this.canvas.height=r,this.isWebGPU()&&this.device&&this.context&&(this.context.configure({device:this.device,format:navigator.gpu.getPreferredCanvasFormat(),alphaMode:"premultiplied"}),this.depthTexture&&this.depthTexture.destroy(),this.depthTexture=this.device.createTexture({size:[t,r],format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT})),this.fallbackToWebGL&&this.webglContext&&this.webglContext.viewport(0,0,t,r)}dispose(){this.device&&this.device.destroy(),this.device=null,this.context=null,this.webglContext=null}isWebGPU(){return!this.fallbackToWebGL&&this.device!==null}isWebGL(){return this.fallbackToWebGL&&this.webglContext!==null}}function Me(n,t,r,i){const s=1/Math.tan(n/2),o=1/(r-i);return new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(i+r)*o,-1,0,0,2*i*r*o,0])}function Ce(n,t,r){const i=ee(Re(n,t)),s=ee(Z(r,i)),o=Z(i,s);return new Float32Array([s[0],o[0],i[0],0,s[1],o[1],i[1],0,s[2],o[2],i[2],0,-$(s,n),-$(o,n),-$(i,n),1])}function Re(n,t){return[n[0]-t[0],n[1]-t[1],n[2]-t[2]]}function Z(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function $(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function ee(n){const t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);return t>0?[n[0]/t,n[1]/t,n[2]/t]:[0,0,0]}async function ze(){const n=navigator.userAgent,t=/iPad|iPhone|iPod/.test(n),r=/Android/.test(n),i=t||r||/Mobile/.test(n),s=!!("xr"in navigator&&navigator.xr&&"isSessionSupported"in navigator.xr),o="gpu"in navigator,a="VideoEncoder"in window&&"VideoDecoder"in window;let u=!1;try{u="requestMIDIAccess"in navigator}catch{u=!1}return{hasWebXR:s,hasWebGPU:o,hasWebCodecs:a,hasWebMIDI:u,isIOS:t,isAndroid:r,isMobile:i,supportsARCore:!!(r&&s),supportsARKit:!!t}}async function Pe(){if(!("xr"in navigator)||!navigator.xr)return{immersiveAR:!1,immersiveVR:!1,inline:!1};try{const[n,t,r]=await Promise.all([navigator.xr.isSessionSupported("immersive-ar"),navigator.xr.isSessionSupported("immersive-vr"),navigator.xr.isSessionSupported("inline")]);return{immersiveAR:n,immersiveVR:t,inline:r}}catch{return{immersiveAR:!1,immersiveVR:!1,inline:!1}}}function Fe(n,t="AR Model"){const r=window.location.origin;return`${n.startsWith("http")?n:`${r}${n}`}#allowsContentScaling=0&canonicalWebPageURL=${encodeURIComponent(window.location.href)}&checkoutTitle=${encodeURIComponent(t)}`}let m;const fe=typeof TextDecoder<"u"?new TextDecoder("utf-8",{ignoreBOM:!0,fatal:!0}):{decode:()=>{throw Error("TextDecoder not available")}};typeof TextDecoder<"u"&&fe.decode();let k=null;function Y(){return(k===null||k.byteLength===0)&&(k=new Uint8Array(m.memory.buffer)),k}function L(n,t){return n=n>>>0,fe.decode(Y().subarray(n,n+t))}function E(n){const t=m.__externref_table_alloc();return m.__wbindgen_export_2.set(t,n),t}function O(n,t){try{return n.apply(this,t)}catch(r){const i=E(r);m.__wbindgen_exn_store(i)}}let W=0;const H=typeof TextEncoder<"u"?new TextEncoder("utf-8"):{encode:()=>{throw Error("TextEncoder not available")}},Te=typeof H.encodeInto=="function"?function(n,t){return H.encodeInto(n,t)}:function(n,t){const r=H.encode(n);return t.set(r),{read:n.length,written:r.length}};function K(n,t,r){if(r===void 0){const u=H.encode(n),h=t(u.length,1)>>>0;return Y().subarray(h,h+u.length).set(u),W=u.length,h}let i=n.length,s=t(i,1)>>>0;const o=Y();let a=0;for(;a<i;a++){const u=n.charCodeAt(a);if(u>127)break;o[s+a]=u}if(a!==i){a!==0&&(n=n.slice(a)),s=r(s,i,i=a+n.length*3,1)>>>0;const u=Y().subarray(s+a,s+i),h=Te(n,u);a+=h.written,s=r(s,i,a,1)>>>0}return W=a,s}let z=null;function G(){return(z===null||z.buffer.detached===!0||z.buffer.detached===void 0&&z.buffer!==m.memory.buffer)&&(z=new DataView(m.memory.buffer)),z}function X(n){return n==null}const te=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>{m.__wbindgen_export_6.get(n.dtor)(n.a,n.b)});function Ne(n,t,r,i){const s={a:n,b:t,cnt:1,dtor:r},o=(...a)=>{s.cnt++;const u=s.a;s.a=0;try{return i(u,s.b,...a)}finally{--s.cnt===0?(m.__wbindgen_export_6.get(s.dtor)(u,s.b),te.unregister(s)):s.a=u}};return o.original=s,te.register(o,s,s),o}function J(n){const t=typeof n;if(t=="number"||t=="boolean"||n==null)return`${n}`;if(t=="string")return`"${n}"`;if(t=="symbol"){const s=n.description;return s==null?"Symbol":`Symbol(${s})`}if(t=="function"){const s=n.name;return typeof s=="string"&&s.length>0?`Function(${s})`:"Function"}if(Array.isArray(n)){const s=n.length;let o="[";s>0&&(o+=J(n[0]));for(let a=1;a<s;a++)o+=", "+J(n[a]);return o+="]",o}const r=/\[object ([^\]]+)\]/.exec(toString.call(n));let i;if(r&&r.length>1)i=r[1];else return toString.call(n);if(i=="Object")try{return"Object("+JSON.stringify(n)+")"}catch{return"Object"}return n instanceof Error?`${n.name}: ${n.message}
${n.stack}`:i}function Be(n,t,r){m.closure15_externref_shim(n,t,r)}function Ie(n,t,r,i){m.closure37_externref_shim(n,t,r,i)}const ne=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>m.__wbg_arprocessor_free(n>>>0,1));class ke{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,ne.unregister(this),t}free(){const t=this.__destroy_into_raw();m.__wbg_arprocessor_free(t,0)}constructor(){const t=m.arprocessor_new();return this.__wbg_ptr=t>>>0,ne.register(this,this.__wbg_ptr,this),this}process_frame(t,r,i){return m.arprocessor_process_frame(this.__wbg_ptr,t,r,i)}update_camera_matrices(t,r){m.arprocessor_update_camera_matrices(this.__wbg_ptr,t,r)}get_world_to_screen_matrix(){return m.arprocessor_get_world_to_screen_matrix(this.__wbg_ptr)}calculate_object_transform(t,r){return m.arprocessor_calculate_object_transform(this.__wbg_ptr,t,r)}}const re=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>m.__wbg_audioprocessor_free(n>>>0,1));class Ee{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,re.unregister(this),t}free(){const t=this.__destroy_into_raw();m.__wbg_audioprocessor_free(t,0)}constructor(t,r){const i=m.audioprocessor_new(t,r);return this.__wbg_ptr=i>>>0,re.register(this,this.__wbg_ptr,this),this}process_audio_buffer(t,r){return m.audioprocessor_process_audio_buffer(this.__wbg_ptr,t,r)}generate_spatial_reverb(t,r){return m.audioprocessor_generate_spatial_reverb(this.__wbg_ptr,t,r)}}typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>m.__wbg_kasmenvelope_free(n>>>0,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>m.__wbg_kasmfilter_free(n>>>0,1));typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>m.__wbg_kasmmidiprocessor_free(n>>>0,1));const ie=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>m.__wbg_kasmoscillator_free(n>>>0,1));class De{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,ie.unregister(this),t}free(){const t=this.__destroy_into_raw();m.__wbg_kasmoscillator_free(t,0)}constructor(t){const r=m.kasmoscillator_new(t);return this.__wbg_ptr=r>>>0,ie.register(this,this.__wbg_ptr,this),this}set_waveform(t){const r=K(t,m.__wbindgen_malloc,m.__wbindgen_realloc),i=W;m.kasmoscillator_set_waveform(this.__wbg_ptr,r,i)}set_frequency(t){m.kasmoscillator_set_frequency(this.__wbg_ptr,t)}set_amplitude(t){m.kasmoscillator_set_amplitude(this.__wbg_ptr,t)}start(){m.kasmoscillator_start(this.__wbg_ptr)}stop(){m.kasmoscillator_stop(this.__wbg_ptr)}generate_samples(t){return m.kasmoscillator_generate_samples(this.__wbg_ptr,t)}}const se=typeof FinalizationRegistry>"u"?{register:()=>{},unregister:()=>{}}:new FinalizationRegistry(n=>m.__wbg_kasmsynthesizer_free(n>>>0,1));class We{__destroy_into_raw(){const t=this.__wbg_ptr;return this.__wbg_ptr=0,se.unregister(this),t}free(){const t=this.__destroy_into_raw();m.__wbg_kasmsynthesizer_free(t,0)}constructor(t){const r=m.kasmsynthesizer_new(t);return this.__wbg_ptr=r>>>0,se.register(this,this.__wbg_ptr,this),this}note_on(t,r){m.kasmsynthesizer_note_on(this.__wbg_ptr,t,r)}note_off(t){m.kasmsynthesizer_note_off(this.__wbg_ptr,t)}set_filter_cutoff(t){m.kasmsynthesizer_set_filter_cutoff(this.__wbg_ptr,t)}set_filter_resonance(t){m.kasmsynthesizer_set_filter_resonance(this.__wbg_ptr,t)}generate_audio_block(t){return m.kasmsynthesizer_generate_audio_block(this.__wbg_ptr,t)}}typeof FinalizationRegistry>"u"||new FinalizationRegistry(n=>m.__wbg_webgpurenderer_free(n>>>0,1));async function Ue(n,t){if(typeof Response=="function"&&n instanceof Response){if(typeof WebAssembly.instantiateStreaming=="function")try{return await WebAssembly.instantiateStreaming(n,t)}catch(i){if(n.headers.get("Content-Type")=="application/wasm")throw i}const r=await n.arrayBuffer();return await WebAssembly.instantiate(r,t)}else{const r=await WebAssembly.instantiate(n,t);return r instanceof WebAssembly.Instance?{instance:r,module:n}:r}}function Le(){const n={};return n.wbg={},n.wbg.__wbg_alert_ed52048d98bf41f4=function(t,r){alert(L(t,r))},n.wbg.__wbg_buffer_609cc3eee51ed158=function(t){return t.buffer},n.wbg.__wbg_call_672a4d21634d4a24=function(){return O(function(t,r){return t.call(r)},arguments)},n.wbg.__wbg_call_7cccdd69e0791ae2=function(){return O(function(t,r,i){return t.call(r,i)},arguments)},n.wbg.__wbg_error_7534b8e9a36f1ab4=function(t,r){let i,s;try{i=t,s=r}finally{m.__wbindgen_free(i,s,1)}},n.wbg.__wbg_from_2a5d3e218e67aa85=function(t){return Array.from(t)},n.wbg.__wbg_get_67b2ba62fc30de12=function(){return O(function(t,r){return Reflect.get(t,r)},arguments)},n.wbg.__wbg_instanceof_Window_def73ea0955fc569=function(t){let r;try{r=t instanceof Window}catch{r=!1}return r},n.wbg.__wbg_length_3b4f022188ae8db6=function(t){return t.length},n.wbg.__wbg_length_a446193dc22c12f8=function(t){return t.length},n.wbg.__wbg_length_e2d2a49132c1b256=function(t){return t.length},n.wbg.__wbg_log_c222819a41e063d3=function(t){},n.wbg.__wbg_navigator_1577371c070c8947=function(t){return t.navigator},n.wbg.__wbg_new_23a2665fac83c611=function(t,r){try{var i={a:t,b:r},s=(a,u)=>{const h=i.a;i.a=0;try{return Ie(h,i.b,a,u)}finally{i.a=h}};return new Promise(s)}finally{i.a=i.b=0}},n.wbg.__wbg_new_405e22f390576ce2=function(){return new Object},n.wbg.__wbg_new_780abee5c1739fd7=function(t){return new Float32Array(t)},n.wbg.__wbg_new_78feb108b6472713=function(){return new Array},n.wbg.__wbg_new_8a6f238a6ece86ea=function(){return new Error},n.wbg.__wbg_new_a12002a7f91c75be=function(t){return new Uint8Array(t)},n.wbg.__wbg_newnoargs_105ed471475aaf50=function(t,r){return new Function(L(t,r))},n.wbg.__wbg_newwithlength_5a5efe313cfd59f1=function(t){return new Float32Array(t>>>0)},n.wbg.__wbg_now_807e54c39636c349=function(){return Date.now()},n.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5=function(t){queueMicrotask(t)},n.wbg.__wbg_queueMicrotask_d3219def82552485=function(t){return t.queueMicrotask},n.wbg.__wbg_resolve_4851785c9c5f573d=function(t){return Promise.resolve(t)},n.wbg.__wbg_set_10bad9bee0e9c58b=function(t,r,i){t.set(r,i>>>0)},n.wbg.__wbg_set_37837023f3d740e8=function(t,r,i){t[r>>>0]=i},n.wbg.__wbg_set_3fda3bac07393de4=function(t,r,i){t[r]=i},n.wbg.__wbg_set_65595bdd868b3009=function(t,r,i){t.set(r,i>>>0)},n.wbg.__wbg_set_bb8cecf6a62b9f46=function(){return O(function(t,r,i){return Reflect.set(t,r,i)},arguments)},n.wbg.__wbg_setindex_4e73afdcd9bb95cd=function(t,r,i){t[r>>>0]=i},n.wbg.__wbg_stack_0ed75d68575b0f3c=function(t,r){const i=r.stack,s=K(i,m.__wbindgen_malloc,m.__wbindgen_realloc),o=W;G().setInt32(t+4,o,!0),G().setInt32(t+0,s,!0)},n.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07=function(){const t=typeof globalThis>"u"?null:globalThis;return X(t)?0:E(t)},n.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0=function(){const t=typeof globalThis>"u"?null:globalThis;return X(t)?0:E(t)},n.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819=function(){const t=typeof self>"u"?null:self;return X(t)?0:E(t)},n.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40=function(){const t=typeof window>"u"?null:window;return X(t)?0:E(t)},n.wbg.__wbg_then_44b73946d2fb3e7d=function(t,r){return t.then(r)},n.wbg.__wbindgen_cb_drop=function(t){const r=t.original;return r.cnt--==1?(r.a=0,!0):!1},n.wbg.__wbindgen_closure_wrapper202=function(t,r,i){return Ne(t,r,16,Be)},n.wbg.__wbindgen_debug_string=function(t,r){const i=J(r),s=K(i,m.__wbindgen_malloc,m.__wbindgen_realloc),o=W;G().setInt32(t+4,o,!0),G().setInt32(t+0,s,!0)},n.wbg.__wbindgen_init_externref_table=function(){const t=m.__wbindgen_export_2,r=t.grow(4);t.set(0,void 0),t.set(r+0,void 0),t.set(r+1,null),t.set(r+2,!0),t.set(r+3,!1)},n.wbg.__wbindgen_is_function=function(t){return typeof t=="function"},n.wbg.__wbindgen_is_undefined=function(t){return t===void 0},n.wbg.__wbindgen_memory=function(){return m.memory},n.wbg.__wbindgen_number_new=function(t){return t},n.wbg.__wbindgen_string_new=function(t,r){return L(t,r)},n.wbg.__wbindgen_throw=function(t,r){throw new Error(L(t,r))},n}function Oe(n,t){return m=n.exports,U.__wbindgen_wasm_module=t,z=null,k=null,m.__wbindgen_start(),m}async function U(n){if(m!==void 0)return m;typeof n<"u"&&Object.getPrototypeOf(n)===Object.prototype&&({module_or_path:n}=n),typeof n>"u"&&(n=new URL(""+new URL("wasm_ar_bg-BxccU4UK.wasm",import.meta.url).href,import.meta.url));const t=Le();(typeof n=="string"||typeof Request=="function"&&n instanceof Request||typeof URL=="function"&&n instanceof URL)&&(n=fetch(n));const{instance:r,module:i}=await Ue(await n,t);return Oe(r,i)}function Ge(){const n=c.useRef(null);return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(v,{ref:n,position:[0,0,-2],onClick:()=>{n.current&&(n.current.rotation.x+=Math.PI/4)},children:e.jsx("meshStandardMaterial",{color:"hotpink"})}),e.jsx(d,{position:[0,2,-3],fontSize:.5,color:"white",anchorX:"center",anchorY:"middle",children:"Tap the cube to rotate it!"})]})}function oe(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(de,{preset:"sunset"}),e.jsx(v,{position:[0,0,0],children:e.jsx("meshStandardMaterial",{color:"orange"})}),e.jsx(d,{position:[0,2,0],fontSize:.5,color:"white",anchorX:"center",anchorY:"middle",children:"3D Mode - Use mouse to navigate"}),e.jsx(we,{enablePan:!0,enableZoom:!0,enableRotate:!0})]})}function Xe({modelUrl:n,title:t}){const r=Fe(n,t);return e.jsx("div",{className:"ios-ar-viewer",children:e.jsxs("a",{href:r,rel:"ar",className:"ar-button ios-ar-button",children:[e.jsx("img",{src:"/api/placeholder/300/300",alt:"3D Model Preview",style:{width:"100%",maxWidth:"300px",height:"auto"}}),e.jsx("div",{className:"ar-overlay",children:e.jsx("span",{children:"👆 Tap to view in AR"})})]})})}function qe({onModeChange:n}){const[t,r]=c.useState({isARActive:!1,capabilities:null,webxrSupport:null,currentMode:"fallback",wasmInitialized:!1}),i=c.useRef(null),s=c.useRef(null),o=c.useRef(null),a=c.useRef(null);c.useEffect(()=>((async()=>{try{await U(),o.current=new ke,a.current=new Ee(44100,1024);const l=await ze(),p=await Pe();let g="fallback";l.supportsARCore||l.supportsARKit?g="ar":(l.hasWebGPU||!l.isMobile)&&(g="3d"),r({isARActive:!1,capabilities:l,webxrSupport:p,currentMode:g,wasmInitialized:!0}),n?.(g),i.current&&(l.hasWebGPU||g==="3d")&&(s.current=new ue(i.current),await s.current.initialize())}catch{r(p=>({...p,currentMode:"fallback",wasmInitialized:!0})),n?.("fallback")}})(),()=>{s.current&&s.current.dispose()}),[n]);const u=()=>{r(f=>({...f,isARActive:!f.isARActive}))},h=()=>{const{capabilities:f,currentMode:l,wasmInitialized:p}=t;if(!p)return e.jsxs("div",{className:"loading-container",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Initializing AR system..."})]});if(f?.isIOS&&f.supportsARKit)return e.jsxs("div",{className:"ar-container ios-container",children:[e.jsx(Xe,{modelUrl:"/models/sample.usdz",title:"AR Demo Object"}),e.jsx("div",{className:"fallback-3d",children:e.jsx(M,{camera:{position:[0,0,5]},children:e.jsx(c.Suspense,{fallback:null,children:e.jsx(oe,{})})})})]});if(l==="ar"&&f?.supportsARCore){const g=ae();return e.jsxs("div",{className:"ar-container webxr-container",children:[e.jsx(ce,{store:g,onClick:u}),e.jsx(M,{children:e.jsx(le,{store:g,children:e.jsx(c.Suspense,{fallback:null,children:e.jsx(Ge,{})})})})]})}return e.jsxs("div",{className:"ar-container fallback-container",children:[e.jsxs("div",{className:"mode-indicator",children:[e.jsx("span",{children:"3D Mode"}),f?.hasWebGPU&&e.jsx("span",{className:"webgpu-badge",children:"WebGPU"})]}),e.jsx(M,{camera:{position:[0,0,5]},children:e.jsx(c.Suspense,{fallback:null,children:e.jsx(oe,{})})}),f?.hasWebGPU&&e.jsx("canvas",{ref:i,className:"webgpu-canvas",style:{position:"absolute",top:0,left:0,pointerEvents:"none",opacity:.5}})]})};return e.jsxs("div",{className:"ar-experience",children:[h(),!1]})}class Ye{db=null;dbName="brewalytics_db";dbVersion=1;async initialize(){return new Promise((t,r)=>{const i=indexedDB.open(this.dbName,this.dbVersion);i.onerror=()=>r(i.error),i.onsuccess=()=>{this.db=i.result,t()},i.onupgradeneeded=s=>{const o=s.target.result;if(!o.objectStoreNames.contains("brewSessions")){const a=o.createObjectStore("brewSessions",{keyPath:"id"});a.createIndex("status","status",{unique:!1}),a.createIndex("startTime","startTime",{unique:!1})}if(!o.objectStoreNames.contains("recipes")){const a=o.createObjectStore("recipes",{keyPath:"id"});a.createIndex("name","name",{unique:!1}),a.createIndex("style","style",{unique:!1})}if(!o.objectStoreNames.contains("inventory")){const a=o.createObjectStore("inventory",{keyPath:"id"});a.createIndex("ingredientId","ingredientId",{unique:!1}),a.createIndex("expirationDate","expirationDate",{unique:!1})}if(!o.objectStoreNames.contains("fermentationLogs")){const a=o.createObjectStore("fermentationLogs",{keyPath:"id"});a.createIndex("batchId","batchId",{unique:!1}),a.createIndex("date","date",{unique:!1})}o.objectStoreNames.contains("vessels")||o.createObjectStore("vessels",{keyPath:"id"}),o.objectStoreNames.contains("userPreferences")||o.createObjectStore("userPreferences",{keyPath:"id"})}})}async saveBrewSession(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["brewSessions"],"readwrite").objectStore("brewSessions").put(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getBrewSessions(){if(!this.db)throw new Error("Database not initialized");return new Promise((t,r)=>{const o=this.db.transaction(["brewSessions"],"readonly").objectStore("brewSessions").getAll();o.onerror=()=>r(o.error),o.onsuccess=()=>t(o.result||[])})}async getBrewSession(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["brewSessions"],"readonly").objectStore("brewSessions").get(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r(a.result||null)})}async deleteBrewSession(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["brewSessions"],"readwrite").objectStore("brewSessions").delete(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async saveRecipe(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["recipes"],"readwrite").objectStore("recipes").put(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getRecipes(){if(!this.db)throw new Error("Database not initialized");return new Promise((t,r)=>{const o=this.db.transaction(["recipes"],"readonly").objectStore("recipes").getAll();o.onerror=()=>r(o.error),o.onsuccess=()=>t(o.result||[])})}async getRecipe(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["recipes"],"readonly").objectStore("recipes").get(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r(a.result||null)})}async saveInventoryItem(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["inventory"],"readwrite").objectStore("inventory").put(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getInventory(){if(!this.db)throw new Error("Database not initialized");return new Promise((t,r)=>{const o=this.db.transaction(["inventory"],"readonly").objectStore("inventory").getAll();o.onerror=()=>r(o.error),o.onsuccess=()=>t(o.result||[])})}async saveFermentationLog(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["fermentationLogs"],"readwrite").objectStore("fermentationLogs").put(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getFermentationLogs(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const o=this.db.transaction(["fermentationLogs"],"readonly").objectStore("fermentationLogs");let a;t?a=o.index("batchId").getAll(t):a=o.getAll(),a.onerror=()=>i(a.error),a.onsuccess=()=>r(a.result||[])})}async saveVessel(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["vessels"],"readwrite").objectStore("vessels").put(t);a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getVessels(){if(!this.db)throw new Error("Database not initialized");return new Promise((t,r)=>{const o=this.db.transaction(["vessels"],"readonly").objectStore("vessels").getAll();o.onerror=()=>r(o.error),o.onsuccess=()=>t(o.result||[])})}async saveUserPreferences(t){if(!this.db)throw new Error("Database not initialized");return new Promise((r,i)=>{const a=this.db.transaction(["userPreferences"],"readwrite").objectStore("userPreferences").put({id:"default",...t});a.onerror=()=>i(a.error),a.onsuccess=()=>r()})}async getUserPreferences(){if(!this.db)throw new Error("Database not initialized");return new Promise((t,r)=>{const o=this.db.transaction(["userPreferences"],"readonly").objectStore("userPreferences").get("default");o.onerror=()=>r(o.error),o.onsuccess=()=>{const a=o.result;if(a){const{id:u,...h}=a;t(h)}else t(null)}})}async exportData(){if(!this.db)throw new Error("Database not initialized");const[t,r,i,s,o,a]=await Promise.all([this.getBrewSessions(),this.getRecipes(),this.getInventory(),this.getFermentationLogs(),this.getVessels(),this.getUserPreferences()]),u={version:this.dbVersion,timestamp:new Date().toISOString(),data:{brewSessions:t,recipes:r,inventory:i,fermentationLogs:s,vessels:o,userPreferences:a}};return JSON.stringify(u,null,2)}async importData(t){if(!this.db)throw new Error("Database not initialized");try{const r=JSON.parse(t);if(!r.data)throw new Error("Invalid import data format");const{data:i}=r;if(i.brewSessions)for(const s of i.brewSessions)await this.saveBrewSession(s);if(i.recipes)for(const s of i.recipes)await this.saveRecipe(s);if(i.inventory)for(const s of i.inventory)await this.saveInventoryItem(s);if(i.fermentationLogs)for(const s of i.fermentationLogs)await this.saveFermentationLog(s);if(i.vessels)for(const s of i.vessels)await this.saveVessel(s);i.userPreferences&&await this.saveUserPreferences(i.userPreferences)}catch(r){throw new Error(`Failed to import data: ${r}`)}}async clearAllData(){if(!this.db)throw new Error("Database not initialized");const t=["brewSessions","recipes","inventory","fermentationLogs","vessels","userPreferences"];return new Promise((r,i)=>{const s=this.db.transaction(t,"readwrite");s.onerror=()=>i(s.error),s.oncomplete=()=>r(),t.forEach(o=>{s.objectStore(o).clear()})})}close(){this.db&&(this.db.close(),this.db=null)}}const B=new Ye;class q{static calculateSRM(t,r){let i=0;for(const s of t.filter(o=>o.type==="grain")){const o=s.properties.color||0,u=s.amount*o/r;i+=u}return 1.4922*Math.pow(i,.6859)}static srmToEBC(t){return t*1.97}static srmToHexColor(t){const r=["#FFE699","#FFD878","#FFCA5A","#FFBF42","#FBB123","#F8A600","#F39C00","#EA8F00","#E58500","#DE7C00","#D77200","#CF6900","#CB6200","#C35900","#BB5100","#B54C00","#B04500","#A63E00","#A13700","#9B3200"],i=Math.min(Math.floor(t),r.length-1);return r[i]||"#9B3200"}static calculateOG(t,r,i){let s=0;for(const o of t.filter(a=>a.type==="grain")){const a=o.properties.extractPotential||35,h=o.amount*2.20462,f=i*.264172,l=h*a*r/100/f;s+=l}return 1+s/1e3}static calculateIBU(t,r,i){let s=0;for(const o of t.filter(a=>a.type==="hop")){const a=o.properties.alphaAcid||5,u=o.amount,h=o.duration||60,f=1.65*Math.pow(125e-6,i-1),l=(1-Math.exp(-.04*h))/4.15,p=f*l,g=a*u*p*10/r;s+=g}return s}static calculateABV(t,r){return(t-r)*131.25}static calculateAttenuation(t,r){return(t-r)/(t-1)*100}static calculateLacticAcidDose(t,r,i,s=88){return(t-r)*i*.1*88/s}static calculateDOSaturation(t,r=1013.25){return(14.652-.41022*t+.007991*Math.pow(t,2)-77774e-9*Math.pow(t,3))*(r/1013.25)}static calculateTurbidity(t,r,i){let s=t*10;s*=Math.exp(-.02*(r-20));const a=Math.abs(i-4.2);return s*=1+a*.1,Math.max(0,s)}static calculateRecipeStats(t){const r=this.calculateOG(t.ingredients,t.efficiency,t.batchSize),s=t.ingredients.find(l=>l.type==="yeast")?.properties.attenuation||75,o=r-(r-1)*s/100,a=this.calculateABV(r,o),u=this.calculateIBU(t.ingredients,t.batchSize,r),h=this.calculateSRM(t.ingredients,t.batchSize),f=this.srmToEBC(h);return{og:r,fg:o,abv:a,ibu:u,srm:h,ebc:f}}static scaleRecipe(t,r){const i=r/t.batchSize,s=t.ingredients.map(a=>({...a,amount:a.amount*i}));return{...t,id:`${t.id}-scaled-${r}L`,name:`${t.name} (${r}L)`,batchSize:r,ingredients:s,calculatedValues:this.calculateRecipeStats({...t,batchSize:r,ingredients:s})}}static calculateWaterAdditions(t,r,i,s){const o=this.calculateLacticAcidDose(t,r,i),u=Math.max(0,150-s.calcium);return{lacticAcid:o,calciumChloride:u*i*.001*3.4,calciumSulfate:u*i*.001*2.6,magnesiumSulfate:Math.max(0,(50-s.magnesium)*i*.001)*4}}static predictFermentationTimeline(t,r,i){const s=[],o=r.includes("ale")?75:80,a=t-(t-1)*o/100,u=i<18?.7:i>25?1.3:1;for(let h=0;h<=14;h++){let f=t,l="complete";if(h===0)f=t,l="lag";else if(h<=3*u){const p=h/(3*u);f=t-(t-a)*p*.8,l="vigorous"}else if(h<=7*u){const p=(h-3*u)/(4*u);f=t-(t-a)*(.8+p*.2),l="moderate"}else h<=10*u?(f=a+(a-t)*.05*Math.exp(-(h-7*u)),l="slow"):(f=a,l="complete");s.push({day:h,gravity:Math.round(f*1e3)/1e3,activity:l})}return s}static calculateBrewhouseEfficiency(t,r){return(t-1)/(r-1)*100}static calculateHopUtilization(t,r,i="pellet"){const s=1.65*Math.pow(125e-6,r-1),o=(1-Math.exp(-.04*t))/4.15;let a=s*o;switch(i){case"whole":a*=.9;break;case"extract":a*=1.1;break}return a}}function He({session:n,view:t}){if(!n)return e.jsx(d,{position:[0,0,-2],fontSize:.3,color:"white",anchorX:"center",anchorY:"middle",children:"Start a brew session to see AR visualizations"});switch(t){case"brew-sheet":return e.jsx(Ve,{session:n});case"timers":return e.jsx($e,{session:n});case"calculations":return e.jsx(Qe,{session:n});default:return e.jsx(Ke,{session:n})}}function Ve({session:n}){const t=n.entries.filter(i=>i.type==="temperature"),r=t[t.length-1];return e.jsxs("group",{children:[e.jsx(v,{position:[-2,1,-2],scale:[.5,.5,.1],children:e.jsx("meshStandardMaterial",{color:r?Ze(r.value):"gray"})}),e.jsx(d,{position:[-2,.5,-1.9],fontSize:.2,color:"white",anchorX:"center",children:r?`${r.value}°C`:"No temp data"}),n.entries.slice(-5).map((i,s)=>e.jsxs("group",{position:[s*.8-2,-1,-2],children:[e.jsx(v,{scale:[.3,.1,.1],children:e.jsx("meshStandardMaterial",{color:et(i.type)})}),e.jsx(d,{position:[0,-.3,0],fontSize:.1,color:"white",anchorX:"center",children:i.type})]},i.id)),e.jsx(A,{position:[0,2,-2],scale:[.3,.3,.3],children:e.jsx("meshStandardMaterial",{color:"gold",emissive:"orange",emissiveIntensity:.2})}),e.jsx(d,{position:[0,1.5,-2],fontSize:.2,color:"white",anchorX:"center",children:he(n)})]})}function $e({session:n}){const[t,r]=c.useState(Date.now());c.useEffect(()=>{const s=setInterval(()=>r(Date.now()),1e3);return()=>clearInterval(s)},[]);const i=[{id:"1",name:"Mash Rest",duration:3600,remaining:1800,status:"running",startTime:new Date(t-18e5),priority:1,notificationConfig:{sound:!0,vibration:!0,visual:!0}},{id:"2",name:"Hop Addition",duration:900,remaining:300,status:"running",startTime:new Date(t-6e5),priority:2,notificationConfig:{sound:!0,vibration:!0,visual:!0}}];return e.jsxs("group",{children:[i.map((s,o)=>e.jsxs("group",{position:[o*2-1,0,-2],children:[e.jsx(A,{scale:[.5,.5,.1],children:e.jsx("meshStandardMaterial",{color:s.remaining<300?"red":"green",emissive:s.remaining<300?"darkred":"darkgreen",emissiveIntensity:.3})}),e.jsxs("mesh",{rotation:[0,0,0],children:[e.jsx("ringGeometry",{args:[.6,.7,32]}),e.jsx("meshBasicMaterial",{color:"white",transparent:!0,opacity:.3})]}),e.jsx(d,{position:[0,.8,0],fontSize:.15,color:"white",anchorX:"center",children:s.name}),e.jsx(d,{position:[0,0,.1],fontSize:.2,color:"white",anchorX:"center",children:tt(s.remaining)})]},s.id)),e.jsx(v,{position:[2,-1,-2],scale:[.8,.3,.1],onClick:()=>{},children:e.jsx("meshStandardMaterial",{color:"blue"})}),e.jsx(d,{position:[2,-1,-1.9],fontSize:.15,color:"white",anchorX:"center",children:"Add Timer"})]})}function Qe({session:n}){const[t,r]=c.useState({srm:0,og:0,ibu:0,abv:0}),i=new xe().setHex(parseInt(rt(t.srm).replace("#","0x"))),s=new ye(t.og,t.ibu/100,t.abv/10);return c.useEffect(()=>{(async()=>{try{const u=[{id:"1",name:"Cascade",type:"hop",amount:25,unit:"g",duration:60,properties:{alphaAcid:12.5}},{id:"2",name:"Centennial",type:"hop",amount:15,unit:"g",duration:15,properties:{alphaAcid:8.2}}],h=[{id:"1",name:"Pale Malt",type:"grain",amount:4.5,unit:"kg",properties:{color:3,extractPotential:37}},{id:"2",name:"Crystal 40",type:"grain",amount:.5,unit:"kg",properties:{color:40,extractPotential:35}}],l=q.calculateOG(h,75,20),p=q.calculateIBU(u,20,l),g=q.calculateSRM(h,20),b=q.calculateABV(l,1.012);r({srm:Math.round(g*10)/10,og:Math.round(l*1e3)/1e3,ibu:Math.round(p*10)/10,abv:Math.round(b*10)/10})}catch{r({srm:12.5,og:1.055,ibu:35,abv:5.2})}})()},[n]),e.jsxs("group",{children:[e.jsx(A,{position:[-2,1,-2],scale:[.4,.4,.4],children:e.jsx("meshStandardMaterial",{color:i})}),e.jsxs(d,{position:[-2,.4,-2],fontSize:.15,color:"white",anchorX:"center",children:["SRM: ",t.srm]}),e.jsx(v,{position:[0,1,-2],scale:[s.x,.3,.1],children:e.jsx("meshStandardMaterial",{color:"lightblue"})}),e.jsxs(d,{position:[0,1,-1.9],fontSize:.15,color:"black",anchorX:"center",children:["OG: ",t.og.toFixed(3)]}),e.jsx("group",{position:[2,1,-2],children:Array.from({length:Math.floor(t.ibu/10)}).map((o,a)=>e.jsx(v,{position:[0,a*.1,0],scale:[.3,.05,.1],children:e.jsx("meshStandardMaterial",{color:"yellow"})},a))}),e.jsxs(d,{position:[2,.4,-2],fontSize:.15,color:"white",anchorX:"center",children:["IBU: ",t.ibu]}),e.jsxs(d,{position:[0,-.5,-2],fontSize:.2,color:"gold",anchorX:"center",children:["ABV: ",t.abv,"%"]})]})}function Ke({session:n}){return e.jsxs("group",{children:[e.jsxs(d,{position:[0,2,-2],fontSize:.3,color:"white",anchorX:"center",children:[n.metadata.brewer,"'s Brew"]}),e.jsxs(d,{position:[0,1.5,-2],fontSize:.2,color:"lightblue",anchorX:"center",children:["Batch Size: ",n.metadata.batchSize,"L"]}),e.jsx(A,{position:[0,.5,-2],scale:[.2,.2,.2],children:e.jsx("meshStandardMaterial",{color:n.status==="active"?"green":"orange",emissive:n.status==="active"?"darkgreen":"darkorange",emissiveIntensity:.3})}),e.jsxs(d,{position:[0,0,-2],fontSize:.15,color:"white",anchorX:"center",children:["Status: ",n.status]}),e.jsx(v,{position:[-1,-1,-2],scale:[.6,.3,.1],onClick:()=>{},children:e.jsx("meshStandardMaterial",{color:"green"})}),e.jsx(d,{position:[-1,-1,-1.9],fontSize:.12,color:"white",anchorX:"center",children:"Log Entry"}),e.jsx(v,{position:[1,-1,-2],scale:[.6,.3,.1],onClick:()=>{},children:e.jsx("meshStandardMaterial",{color:"blue"})}),e.jsx(d,{position:[1,-1,-1.9],fontSize:.12,color:"white",anchorX:"center",children:"Timers"})]})}function Je({onModeChange:n}){const[t,r]=c.useState({currentSession:null,activeTimers:[],recipes:[],inventory:[],isARActive:!1,currentView:"brew-sheet",wasmInitialized:!1}),i=ae();c.useEffect(()=>{(async()=>{try{await U(),await B.initialize();const l=await B.getBrewSessions(),p=await B.getRecipes(),g=await B.getInventory();let w=l.find(b=>b.status==="active");w||(w=await a(),await B.saveBrewSession(w)),r(b=>({...b,currentSession:w,recipes:p,inventory:g,wasmInitialized:!0})),n?.("ar")}catch{r(p=>({...p,wasmInitialized:!0})),n?.("fallback")}})()},[n]);const s=f=>{r(l=>({...l,currentView:f}))},o=()=>{r(f=>({...f,isARActive:!f.isARActive}))};if(!t.wasmInitialized)return e.jsxs("div",{className:"brewalytics-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Initializing Brewalytics..."})]});return e.jsxs("div",{className:"brewalytics-container",children:[e.jsxs("div",{className:"ar-viewport",children:[e.jsx(ce,{store:i,onClick:o}),e.jsx(M,{camera:{position:[0,0,3],fov:75},children:e.jsx(le,{store:i,children:e.jsxs(c.Suspense,{fallback:null,children:[e.jsx("ambientLight",{intensity:.6}),e.jsx("pointLight",{position:[10,10,10],intensity:.8}),e.jsx(de,{preset:"warehouse"}),e.jsx(He,{session:t.currentSession,view:t.currentView})]})})})]}),e.jsxs("div",{className:"brewalytics-controls",children:[e.jsx("div",{className:"view-selector",children:["brew-sheet","timers","recipes","inventory","calculations"].map(f=>e.jsx("button",{className:`view-button ${t.currentView===f?"active":""}`,onClick:()=>s(f),children:nt(f)},f))}),t.currentSession&&e.jsxs("div",{className:"session-info",children:[e.jsxs("h3",{children:[t.currentSession.metadata.brewer,"'s Brew"]}),e.jsxs("p",{children:["Status: ",t.currentSession.status]}),e.jsxs("p",{children:["Batch Size: ",t.currentSession.metadata.batchSize,"L"]}),e.jsxs("p",{children:["Entries: ",t.currentSession.entries.length]})]}),e.jsxs("div",{className:"quick-actions",children:[e.jsx("button",{onClick:()=>u("temperature",65),children:"Log Temperature"}),e.jsx("button",{onClick:()=>u("note","Mash complete"),children:"Add Note"}),e.jsx("button",{onClick:()=>h("Boil",3600),children:"Start Timer"})]})]})]});async function a(){return{id:`session-${Date.now()}`,recipeId:"demo-recipe",startTime:new Date,status:"active",entries:[{id:"1",timestamp:new Date,type:"temperature",value:65,unit:"°C",stage:"mash",notes:"Mash temperature set"}],metadata:{brewer:"Demo Brewer",batchSize:20,equipment:"All-in-one system"}}}function u(f,l){if(!t.currentSession)return;const p={id:`entry-${Date.now()}`,timestamp:new Date,type:f,value:l,stage:he(t.currentSession),notes:typeof l=="string"?l:void 0},g={...t.currentSession,entries:[...t.currentSession.entries,p]};r(w=>({...w,currentSession:g})),B.saveBrewSession(g)}function h(f,l){const p={id:`timer-${Date.now()}`,name:f,duration:l,remaining:l,status:"running",startTime:new Date,priority:1,notificationConfig:{sound:!0,vibration:!0,visual:!0}};r(g=>({...g,activeTimers:[...g.activeTimers,p]}))}}function Ze(n){return n<20?"blue":n<40?"lightblue":n<60?"yellow":n<80?"orange":"red"}function et(n){switch(n){case"temperature":return"red";case"time":return"blue";case"measurement":return"green";case"note":return"yellow";case"ingredient":return"purple";default:return"gray"}}function he(n){return n.entries[n.entries.length-1]?.stage||"preparation"}function tt(n){const t=Math.floor(n/60),r=n%60;return`${t}:${r.toString().padStart(2,"0")}`}function nt(n){return n.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}function rt(n){const t=["#FFE699","#FFD878","#FFCA5A","#FFBF42","#FBB123","#F8A600","#F39C00","#EA8F00","#E58500","#DE7C00","#D77200","#CF6900","#CB6200","#C35900","#BB5100","#B54C00","#B04500","#A63E00","#A13700","#9B3200"],r=Math.min(Math.floor(n),t.length-1);return t[r]||"#9B3200"}const it=({searchQuery:n})=>{const[t,r]=c.useState(null),[i,s]=c.useState("all"),[o,a]=c.useState([]),u=[{id:"brewing-basics",title:"Brewing Basics: Understanding the Fundamentals",excerpt:"Learn the essential principles of brewing, from grain to glass. This comprehensive guide covers the four main ingredients and the brewing process.",content:`
# Brewing Basics: Understanding the Fundamentals

Brewing is both an art and a science, combining traditional techniques with modern understanding of chemistry and biology. At its core, brewing transforms simple ingredients into complex, flavorful beverages through controlled fermentation.

## The Four Essential Ingredients

### 1. Water
Water makes up 90-95% of beer and significantly impacts the final flavor. Different mineral profiles create different beer styles:
- **Soft water** (low minerals): Ideal for light lagers and pilsners
- **Hard water** (high minerals): Perfect for hoppy ales and stouts
- **pH levels**: Should be between 5.2-5.6 for optimal enzyme activity

### 2. Malted Grains
Malted barley is the primary source of fermentable sugars:
- **Base malts**: Provide the majority of fermentable sugars
- **Specialty malts**: Add color, flavor, and complexity
- **Mashing process**: Converts starches to fermentable sugars at 148-158°F

### 3. Hops
Hops provide bitterness, flavor, and aroma while acting as a natural preservative:
- **Alpha acids**: Provide bitterness when boiled
- **Essential oils**: Contribute aroma and flavor
- **Timing**: Early additions for bitterness, late additions for flavor and aroma

### 4. Yeast
Yeast converts sugars into alcohol and CO2:
- **Ale yeast** (Saccharomyces cerevisiae): Ferments at 60-75°F, top-fermenting
- **Lager yeast** (Saccharomyces pastorianus): Ferments at 45-55°F, bottom-fermenting

## The Brewing Process

1. **Milling**: Crush grains to expose starches
2. **Mashing**: Mix with hot water to convert starches to sugars
3. **Lautering**: Separate sweet wort from grain
4. **Boiling**: Add hops and sterilize the wort
5. **Cooling**: Rapidly cool to fermentation temperature
6. **Fermentation**: Yeast converts sugars to alcohol
7. **Conditioning**: Allow flavors to mature and clarify
8. **Packaging**: Bottle or keg the finished beer

Understanding these fundamentals is crucial for any brewer, whether you're making your first batch or perfecting a recipe.
      `,category:"basics",readTime:8,tags:["fundamentals","ingredients","process"],lastUpdated:"2024-01-15"},{id:"gravity-calculations",title:"Gravity Calculations and ABV Determination",excerpt:"Master the mathematics behind brewing with detailed explanations of specific gravity, original gravity, final gravity, and alcohol by volume calculations.",content:`
# Gravity Calculations and ABV Determination

Understanding gravity measurements is essential for monitoring fermentation progress and calculating alcohol content. These calculations help brewers ensure consistency and quality in their beer.

## Specific Gravity Fundamentals

Specific gravity (SG) measures the density of a liquid compared to water:
- **Water**: SG = 1.000
- **Wort**: SG > 1.000 (due to dissolved sugars)
- **Finished beer**: SG closer to 1.000 (sugars converted to alcohol)

## Key Gravity Measurements

### Original Gravity (OG)
The specific gravity of wort before fermentation:
- **Light beers**: 1.030-1.040
- **Medium beers**: 1.040-1.060
- **Strong beers**: 1.060-1.100+

### Final Gravity (FG)
The specific gravity after fermentation is complete:
- **Dry beers**: 1.005-1.015
- **Medium body**: 1.015-1.025
- **Sweet/full body**: 1.025-1.035+

## ABV Calculation Methods

### Simple Formula
**ABV = (OG - FG) × 131.25**

Example:
- OG: 1.050
- FG: 1.010
- ABV = (1.050 - 1.010) × 131.25 = 5.25%

### Advanced Formula (More Accurate)
**ABV = (76.08 × (OG - FG) / (1.775 - OG)) × (FG / 0.794)**

This formula accounts for the non-linear relationship between gravity and alcohol content.

## Attenuation Calculations

### Apparent Attenuation
**AA = ((OG - FG) / (OG - 1.000)) × 100**

### Real Attenuation
**RA = ((OG - RG) / (OG - 1.000)) × 100**

Where RG (Real Gravity) = 1.000 + ((FG - 1.000) / 1.04)

## Practical Applications

### Recipe Formulation
- Calculate expected OG based on grain bill
- Predict final ABV for recipe development
- Adjust ingredients to hit target gravity

### Fermentation Monitoring
- Track gravity drop to monitor fermentation progress
- Determine when fermentation is complete
- Identify stuck fermentations

### Quality Control
- Ensure batch-to-batch consistency
- Verify recipe calculations
- Troubleshoot brewing issues

## Common Gravity Ranges by Style

| Style | OG Range | FG Range | ABV Range |
|-------|----------|----------|-----------|
| Light Lager | 1.028-1.040 | 1.004-1.010 | 2.8-4.2% |
| IPA | 1.056-1.070 | 1.008-1.014 | 5.5-7.5% |
| Stout | 1.044-1.060 | 1.010-1.018 | 4.0-6.0% |
| Barleywine | 1.080-1.120 | 1.018-1.030 | 8.0-12.0% |

Mastering these calculations enables precise brewing and consistent results across all your batches.
      `,category:"calculations",readTime:12,tags:["gravity","ABV","mathematics","fermentation"],lastUpdated:"2024-01-20"},{id:"hop-utilization",title:"Hop Utilization and IBU Calculations",excerpt:"Dive deep into hop chemistry and learn how to calculate International Bitterness Units (IBUs) for precise bitterness control in your beers.",content:`
# Hop Utilization and IBU Calculations

Hops are crucial for balancing the sweetness of malt with bitterness, while also contributing flavor and aroma. Understanding hop utilization helps brewers achieve consistent bitterness levels and create well-balanced beers.

## Understanding Alpha Acids

Alpha acids are the primary bittering compounds in hops:
- **Humulone**: Most abundant alpha acid
- **Cohumulone**: Affects bitterness quality
- **Adhumulone**: Contributes to overall alpha acid content

### Alpha Acid Ranges by Hop Type
- **Noble hops**: 2-5% AA (Hallertau, Saaz)
- **Aroma hops**: 3-8% AA (Cascade, Centennial)
- **Bittering hops**: 8-15% AA (Magnum, Warrior)
- **High-alpha hops**: 15-20%+ AA (Columbus, Simcoe)

## IBU Calculation Formula

**IBU = (Weight × AA% × Utilization × 1000) / (Volume × SG Factor)**

Where:
- **Weight**: Hop weight in ounces
- **AA%**: Alpha acid percentage (as decimal)
- **Utilization**: Percentage of alpha acids isomerized
- **Volume**: Batch size in gallons
- **SG Factor**: Gravity correction factor

## Utilization Factors

Utilization depends on boil time and wort gravity:

### Boil Time Utilization
| Boil Time | Utilization |
|-----------|-------------|
| 60+ min | 30% |
| 45 min | 27% |
| 30 min | 24% |
| 15 min | 19% |
| 5 min | 13% |
| 0 min | 5% |

### Gravity Correction Factor
**SG Factor = 1 + ((SG - 1.050) / 0.2)**

For SG < 1.050: Factor = 1.0
For SG > 1.050: Factor increases

## Practical IBU Calculation Example

Recipe: American IPA
- Batch size: 5 gallons
- OG: 1.065
- Hops: 1 oz Centennial (10% AA) @ 60 min

**Step 1**: Calculate SG Factor
SG Factor = 1 + ((1.065 - 1.050) / 0.2) = 1.075

**Step 2**: Apply IBU Formula
IBU = (1 × 0.10 × 0.30 × 1000) / (5 × 1.075)
IBU = 30 / 5.375 = 5.6 IBUs

## Hop Scheduling Strategies

### Bittering Additions (60-90 minutes)
- High-alpha hops for efficiency
- Maximum utilization
- Minimal flavor/aroma contribution

### Flavor Additions (15-30 minutes)
- Medium utilization
- Hop flavor development
- Some aroma retention

### Aroma Additions (0-5 minutes)
- Low utilization
- Maximum aroma retention
- Fresh hop character

### Dry Hopping
- No IBU contribution
- Pure aroma addition
- Post-fermentation addition

## IBU Ranges by Beer Style

| Style | IBU Range | Balance |
|-------|-----------|---------|
| Light Lager | 8-12 | Malt-forward |
| Wheat Beer | 10-15 | Balanced |
| Pale Ale | 30-45 | Hop-forward |
| IPA | 40-70 | Very hoppy |
| Imperial IPA | 60-100+ | Extremely hoppy |

## Advanced Considerations

### Hop Form Factors
- **Whole hops**: 100% utilization baseline
- **Pellets**: 110% utilization (better extraction)
- **Extracts**: Variable based on product

### Water Chemistry Impact
- **Sulfate**: Enhances hop bitterness perception
- **Chloride**: Softens bitterness, enhances malt
- **pH**: Affects isomerization efficiency

### Perceived vs. Calculated IBUs
Actual bitterness perception can vary due to:
- Malt sweetness balance
- Alcohol content
- Residual sugars
- Water mineral content

Understanding these principles allows brewers to design recipes with precise bitterness levels and create perfectly balanced beers.
      `,category:"calculations",readTime:15,tags:["hops","IBU","bitterness","calculations"],lastUpdated:"2024-01-25"},{id:"water-chemistry",title:"Water Chemistry for Brewers",excerpt:"Explore the critical role of water chemistry in brewing, including mineral profiles, pH adjustment, and how water affects different beer styles.",content:`
# Water Chemistry for Brewers

Water is often called the "forgotten ingredient" in brewing, yet it comprises 90-95% of the finished beer. Understanding water chemistry is crucial for creating authentic beer styles and achieving consistent results.

## Key Water Parameters

### pH (Potential of Hydrogen)
- **Optimal range**: 5.2-5.6 for mashing
- **Effects**: Enzyme activity, extraction efficiency, flavor
- **Adjustment**: Acids (lactic, phosphoric) or bases (baking soda)

### Mineral Content

#### Calcium (Ca²⁺)
- **Optimal range**: 50-150 ppm
- **Functions**: Enzyme activation, yeast health, protein precipitation
- **Sources**: Gypsum (CaSO₄), Calcium Chloride (CaCl₂)

#### Magnesium (Mg²⁺)
- **Optimal range**: 10-30 ppm
- **Functions**: Yeast nutrient, enzyme cofactor
- **Sources**: Epsom salt (MgSO₄)

#### Sulfate (SO₄²⁻)
- **Range**: 50-400 ppm (style dependent)
- **Effects**: Enhances hop bitterness and dryness
- **Sources**: Gypsum, Epsom salt

#### Chloride (Cl⁻)
- **Range**: 50-250 ppm (style dependent)
- **Effects**: Enhances malt sweetness and fullness
- **Sources**: Calcium chloride, table salt

#### Sodium (Na⁺)
- **Range**: 0-150 ppm
- **Effects**: Enhances flavor at low levels, harsh at high levels
- **Sources**: Table salt, baking soda

#### Bicarbonate (HCO₃⁻)
- **Range**: 0-300 ppm (style dependent)
- **Effects**: Alkalinity, pH buffering
- **Sources**: Baking soda, chalk

## Water Profiles for Classic Beer Styles

### Burton-on-Trent (English IPA)
- **Ca²⁺**: 295 ppm
- **Mg²⁺**: 45 ppm
- **SO₄²⁻**: 725 ppm
- **Cl⁻**: 25 ppm
- **HCO₃⁻**: 300 ppm
- **Character**: Dry, crisp, enhances hop bitterness

### Pilsen (Czech Pilsner)
- **Ca²⁺**: 7 ppm
- **Mg²⁺**: 2 ppm
- **SO₄²⁻**: 5 ppm
- **Cl⁻**: 5 ppm
- **HCO₃⁻**: 15 ppm
- **Character**: Soft, delicate, showcases malt and hops

### Dublin (Irish Stout)
- **Ca²⁺**: 115 ppm
- **Mg²⁺**: 4 ppm
- **SO₄²⁻**: 55 ppm
- **Cl⁻**: 19 ppm
- **HCO₃⁻**: 280 ppm
- **Character**: Alkaline, supports dark malt acidity

### Munich (German Lager)
- **Ca²⁺**: 75 ppm
- **Mg²⁺**: 18 ppm
- **SO₄²⁻**: 10 ppm
- **Cl⁻**: 2 ppm
- **HCO₃⁻**: 150 ppm
- **Character**: Moderate alkalinity, malt-forward

## Sulfate to Chloride Ratio

The SO₄:Cl ratio significantly affects beer character:

- **1:1 to 2:1**: Balanced
- **3:1 to 5:1**: Hop-forward, dry
- **1:2 to 1:3**: Malt-forward, full

### Examples by Style
- **IPA**: 3:1 to 5:1 (dry, bitter)
- **Stout**: 1:1 to 1:2 (balanced to malty)
- **Wheat Beer**: 1:1 (balanced)

## Water Treatment Methods

### Starting with RO Water
Reverse osmosis water provides a blank slate:
1. Test source water
2. Calculate mineral additions
3. Add salts to match target profile
4. Adjust pH if needed

### Treating Municipal Water
1. Obtain water report
2. Remove chlorine/chloramines
3. Calculate adjustments needed
4. Add minerals to reach target

### Common Salt Additions

#### Gypsum (CaSO₄·2H₂O)
- Adds: Ca²⁺ and SO₄²⁻
- Use: Increase sulfate for hoppy beers
- Rate: 1 tsp/5 gal adds ~60 ppm Ca²⁺, ~150 ppm SO₄²⁻

#### Calcium Chloride (CaCl₂)
- Adds: Ca²⁺ and Cl⁻
- Use: Increase chloride for malty beers
- Rate: 1 tsp/5 gal adds ~70 ppm Ca²⁺, ~125 ppm Cl⁻

#### Epsom Salt (MgSO₄·7H₂O)
- Adds: Mg²⁺ and SO₄²⁻
- Use: Yeast nutrient, increase sulfate
- Rate: 1 tsp/5 gal adds ~25 ppm Mg²⁺, ~100 ppm SO₄²⁻

## pH Adjustment

### Mash pH Targets
- **Light beers**: 5.4-5.6
- **Dark beers**: 5.2-5.4
- **Sour beers**: 3.2-3.8

### Acidification Methods
- **Lactic acid**: Smooth, doesn't affect minerals
- **Phosphoric acid**: Clean, adds phosphate
- **Acidulated malt**: Natural, adds complexity

### Alkalinity Reduction
- **Acid additions**: Direct pH reduction
- **Dilution**: Blend with RO water
- **Boiling**: Removes temporary hardness

## Practical Water Chemistry Workflow

1. **Test source water**: Get complete mineral analysis
2. **Choose target profile**: Match beer style requirements
3. **Calculate adjustments**: Use brewing software or calculators
4. **Treat water**: Add salts and adjust pH
5. **Verify results**: Test treated water
6. **Document**: Record successful profiles for future use

## Common Water Issues and Solutions

### Chlorine/Chloramines
- **Problem**: Off-flavors, yeast stress
- **Solution**: Carbon filtration, Campden tablets

### High Alkalinity
- **Problem**: High mash pH, poor extraction
- **Solution**: Acid addition, RO dilution

### Low Mineral Content
- **Problem**: Poor yeast health, flat flavor
- **Solution**: Mineral additions (Ca²⁺, Mg²⁺)

### Excessive Sodium
- **Problem**: Harsh, salty flavors
- **Solution**: RO dilution, different salt choices

Understanding and controlling water chemistry allows brewers to create authentic beer styles and achieve consistent, high-quality results in every batch.
      `,category:"advanced",readTime:18,tags:["water","chemistry","minerals","pH"],lastUpdated:"2024-02-01"},{id:"fermentation-science",title:"Fermentation Science and Yeast Management",excerpt:"Understand the biology and chemistry of fermentation, yeast health, and how to manage fermentation for optimal beer quality.",content:`
# Fermentation Science and Yeast Management

Fermentation is the heart of brewing, where yeast transforms simple sugars into alcohol, CO₂, and hundreds of flavor compounds. Understanding fermentation science enables brewers to control this process for consistent, high-quality results.

## Yeast Biology Fundamentals

### Saccharomyces cerevisiae (Ale Yeast)
- **Temperature range**: 60-75°F (15-24°C)
- **Fermentation style**: Top-fermenting
- **Flocculation**: High to medium
- **Attenuation**: 65-80%
- **Flavor profile**: Fruity esters, phenols

### Saccharomyces pastorianus (Lager Yeast)
- **Temperature range**: 45-55°F (7-13°C)
- **Fermentation style**: Bottom-fermenting
- **Flocculation**: High
- **Attenuation**: 70-85%
- **Flavor profile**: Clean, crisp

## The Fermentation Process

### Phase 1: Lag Phase (0-24 hours)
- Yeast adapts to wort environment
- Cell membrane adjustment
- Enzyme production
- No visible fermentation activity

**Optimization**:
- Proper pitching rate
- Adequate oxygen levels
- Optimal temperature
- Sufficient nutrients

### Phase 2: Exponential Growth (1-4 days)
- Rapid cell division
- Primary sugar consumption
- Maximum CO₂ production
- Vigorous fermentation activity

**Management**:
- Temperature control
- Monitor gravity drop
- Avoid disturbance
- Ensure proper headspace

### Phase 3: Stationary Phase (3-7 days)
- Cell growth slows
- Continued sugar consumption
- Flavor compound development
- Gradual activity decrease

**Considerations**:
- Maintain temperature
- Begin gravity monitoring
- Plan for secondary processes
- Assess fermentation progress

### Phase 4: Decline Phase (1-2 weeks)
- Cell death begins
- Final sugar consumption
- Flavor maturation
- Yeast settling

**Actions**:
- Final gravity readings
- Consider transfers
- Plan conditioning
- Evaluate beer quality

## Yeast Metabolism and Flavor Development

### Primary Metabolites
- **Ethanol**: Primary alcohol
- **CO₂**: Carbonation and pressure
- **Heat**: Temperature management needed

### Secondary Metabolites (Flavor Compounds)

#### Esters
- **Formation**: Alcohol + organic acid
- **Flavors**: Fruity, floral
- **Control**: Temperature, yeast strain, oxygen

**Common Esters**:
- Ethyl acetate: Solvent, nail polish
- Isoamyl acetate: Banana
- Ethyl butyrate: Pineapple
- Phenylethyl acetate: Rose, honey

#### Phenols
- **Formation**: Amino acid metabolism
- **Flavors**: Spicy, medicinal, smoky
- **Control**: Yeast strain selection

**Common Phenols**:
- 4-vinyl guaiacol: Clove, spice
- 4-ethyl phenol: Barnyard, medicinal
- Vanillin: Vanilla

#### Higher Alcohols (Fusel Alcohols)
- **Formation**: Amino acid metabolism
- **Flavors**: Solvent, hot, harsh
- **Control**: Temperature, pitching rate

**Common Fusel Alcohols**:
- Isoamyl alcohol: Banana, solvent
- Phenylethyl alcohol: Rose, perfume
- Isobutanol: Nail polish, solvent

## Fermentation Temperature Control

### Temperature Effects on Fermentation

#### Low Temperatures (Below Optimal)
- **Pros**: Clean flavors, fewer off-flavors
- **Cons**: Slow fermentation, stuck fermentation risk
- **Compounds**: Reduced esters and fusel alcohols

#### Optimal Temperatures
- **Pros**: Balanced fermentation, good attenuation
- **Cons**: Requires precise control
- **Compounds**: Appropriate ester and alcohol levels

#### High Temperatures (Above Optimal)
- **Pros**: Fast fermentation, high attenuation
- **Cons**: Excessive esters, fusel alcohols, stress
- **Compounds**: High ester and fusel alcohol production

### Temperature Ramping Strategies

#### Traditional Fermentation
- Constant temperature throughout
- Simple temperature control
- Predictable results

#### Step Fermentation
- Start cool, raise temperature
- Combines clean start with complete attenuation
- Common in lager brewing

#### Free Rise
- Start at pitching temperature
- Allow natural temperature rise
- Mimics traditional methods

## Yeast Pitching and Cell Counts

### Pitching Rate Calculations

**Standard Rates**:
- **Ales**: 0.75-1.0 million cells/mL/°P
- **Lagers**: 1.5-2.0 million cells/mL/°P
- **High gravity**: 1.5-2.5 million cells/mL/°P

### Cell Count Formula
**Cells needed = Volume (L) × Gravity (°P) × Pitching Rate**

**Example**: 20L batch, 12°P, ale yeast
Cells needed = 20 × 12 × 1,000,000 = 240 billion cells

### Yeast Viability and Vitality

#### Viability
- Percentage of living cells
- Measured by methylene blue staining
- Fresh liquid yeast: 95%+
- Dry yeast: 97%+

#### Vitality
- Metabolic activity of living cells
- More important than viability
- Affected by age, storage, handling

## Oxygenation and Yeast Health

### Oxygen Requirements
- **Purpose**: Cell membrane synthesis, sterol production
- **Timing**: Pre-fermentation only
- **Amount**: 8-12 ppm dissolved oxygen

### Oxygenation Methods
- **Air pumping**: Simple, adequate for most beers
- **Pure oxygen**: More precise, better for high gravity
- **Wort aeration**: Splashing, shaking

### Oxygen Toxicity
- **Problem**: Oxidation during/after fermentation
- **Prevention**: Oxygen only before fermentation
- **Effects**: Stale flavors, reduced shelf life

## Yeast Nutrition

### Essential Nutrients

#### Nitrogen
- **Sources**: Amino acids, ammonium
- **Function**: Protein synthesis, cell growth
- **Deficiency**: Slow fermentation, off-flavors

#### Phosphorus
- **Sources**: Phosphates in malt
- **Function**: Energy metabolism, cell structure
- **Deficiency**: Poor attenuation

#### Trace Elements
- **Zinc**: Enzyme function, alcohol tolerance
- **Magnesium**: Enzyme activation
- **Calcium**: Cell wall stability

### Nutrient Additions
- **Yeast nutrient**: Balanced blend
- **Diammonium phosphate (DAP)**: Nitrogen source
- **Yeast hulls**: Trace elements, sterols

## Fermentation Monitoring

### Gravity Measurements
- **Frequency**: Daily during active fermentation
- **Tools**: Hydrometer, refractometer
- **Targets**: 65-85% apparent attenuation

### Temperature Logging
- **Continuous monitoring**: Data loggers
- **Manual checks**: Multiple daily readings
- **Thermowell placement**: Center of fermenter

### Visual Indicators
- **Airlock activity**: CO₂ production rate
- **Krausen formation**: Yeast health indicator
- **Color changes**: Fermentation progress

## Common Fermentation Problems

### Stuck Fermentation
- **Causes**: Poor yeast health, temperature, nutrients
- **Solutions**: Repitch, nutrient addition, temperature adjustment
- **Prevention**: Proper pitching, oxygenation, nutrition

### Off-Flavors
- **Acetaldehyde**: Green apple, incomplete fermentation
- **Diacetyl**: Butter, vicinal diketones
- **Phenolic**: Medicinal, wild yeast contamination
- **Solvent**: High alcohols, temperature stress

### Slow Fermentation
- **Causes**: Low temperature, poor yeast health, high gravity
- **Solutions**: Temperature increase, yeast addition, nutrients
- **Monitoring**: Extended fermentation timeline

Understanding fermentation science allows brewers to consistently produce high-quality beer while troubleshooting issues and optimizing processes for different beer styles.
      `,category:"advanced",readTime:20,tags:["fermentation","yeast","biology","temperature"],lastUpdated:"2024-02-05"}],h=[{id:"all",label:"All Articles",count:u.length},{id:"basics",label:"Brewing Basics",count:u.filter(l=>l.category==="basics").length},{id:"calculations",label:"Calculations",count:u.filter(l=>l.category==="calculations").length},{id:"advanced",label:"Advanced Topics",count:u.filter(l=>l.category==="advanced").length}];c.useEffect(()=>{let l=u;if(i!=="all"&&(l=l.filter(p=>p.category===i)),n&&n.trim()){const p=n.toLowerCase();l=l.filter(g=>g.title.toLowerCase().includes(p)||g.excerpt.toLowerCase().includes(p)||g.content.toLowerCase().includes(p)||g.tags.some(w=>w.toLowerCase().includes(p)))}a(l)},[i,n]);const f=l=>l.replace(/^# (.*$)/gm,"<h1>$1</h1>").replace(/^## (.*$)/gm,"<h2>$1</h2>").replace(/^### (.*$)/gm,"<h3>$1</h3>").replace(/^#### (.*$)/gm,"<h4>$1</h4>").replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/`(.*?)`/g,"<code>$1</code>").replace(/\n\n/g,"</p><p>").replace(/\n/g,"<br>");return t?e.jsx("div",{className:"brewers-reference",children:e.jsxs("div",{className:"article-view",children:[e.jsx("button",{className:"back-button",onClick:()=>r(null),children:"← Back to Articles"}),e.jsxs("article",{className:"article-content",children:[e.jsxs("header",{className:"article-header",children:[e.jsx("h1",{className:"article-title",children:t.title}),e.jsxs("div",{className:"article-meta",children:[e.jsxs("span",{className:"read-time",children:["📖 ",t.readTime," min read"]}),e.jsxs("span",{className:"category",children:["📂 ",t.category]}),e.jsxs("span",{className:"updated",children:["📅 Updated ",t.lastUpdated]})]}),e.jsx("div",{className:"article-tags",children:t.tags.map(l=>e.jsxs("span",{className:"tag",children:["#",l]},l))})]}),e.jsx("div",{className:"article-body",dangerouslySetInnerHTML:{__html:`<p>${f(t.content)}</p>`}})]})]})}):e.jsxs("div",{className:"brewers-reference",children:[e.jsxs("div",{className:"reference-header",children:[e.jsxs("h1",{className:"reference-title",children:[e.jsx("span",{className:"reference-icon",children:"📚"}),"Brewers Reference"]}),e.jsx("p",{className:"reference-subtitle",children:"Comprehensive brewing knowledge, calculations, and techniques"})]}),e.jsx("div",{className:"reference-filters",children:e.jsx("div",{className:"category-filters",children:h.map(l=>e.jsxs("button",{className:`category-button ${i===l.id?"active":""}`,onClick:()=>s(l.id),children:[l.label," (",l.count,")"]},l.id))})}),e.jsx("div",{className:"articles-grid",children:o.length===0?e.jsxs("div",{className:"no-results",children:[e.jsx("p",{children:"No articles found matching your criteria."}),n&&e.jsx("p",{children:"Try adjusting your search terms or selecting a different category."})]}):o.map(l=>e.jsxs("article",{className:"article-card",children:[e.jsxs("div",{className:"article-card-header",children:[e.jsx("h2",{className:"article-card-title",children:l.title}),e.jsxs("div",{className:"article-card-meta",children:[e.jsxs("span",{className:"read-time",children:["📖 ",l.readTime," min"]}),e.jsx("span",{className:"category-badge",children:l.category})]})]}),e.jsx("p",{className:"article-excerpt",children:l.excerpt}),e.jsxs("div",{className:"article-card-footer",children:[e.jsx("div",{className:"article-tags",children:l.tags.slice(0,3).map(p=>e.jsxs("span",{className:"tag-small",children:["#",p]},p))}),e.jsx("button",{className:"read-more-button",onClick:()=>r(l),children:"Read More →"})]})]},l.id))})]})};class Q extends c.Component{constructor(t){super(t),this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}componentDidCatch(t,r){}render(){return this.state.hasError?e.jsxs("div",{className:"kasm-error",children:[e.jsx("h3",{children:"⚠️ Kasm Component Error"}),e.jsx("p",{children:"There was an issue loading the WebAssembly audio components."}),e.jsxs("p",{children:["Error: ",this.state.error?.message]}),e.jsx("button",{onClick:()=>this.setState({hasError:!1}),children:"Try Again"})]}):this.props.children}}function pe(){const[n,t]=c.useState(null),[r,i]=c.useState([]),[s,o]=c.useState([]),[a,u]=c.useState(!1);return c.useEffect(()=>{(async()=>{if("requestMIDIAccess"in navigator)try{const f=await navigator.requestMIDIAccess();t(f),u(!0);const l=Array.from(f.inputs.values()),p=Array.from(f.outputs.values());i(l),o(p),f.onstatechange=()=>{i(Array.from(f.inputs.values())),o(Array.from(f.outputs.values()))}}catch{}})()},[]),{midiAccess:n,midiInputs:r,midiOutputs:s,isSupported:a}}function st({onAudioGenerated:n,sampleRate:t=44100,bufferSize:r=1024}){const[i,s]=c.useState(null),[o,a]=c.useState(!1),[u,h]=c.useState(440),[f,l]=c.useState("sine"),[p,g]=c.useState(.5),w=c.useRef(void 0);c.useEffect(()=>((async()=>{await U();const y=new De(t);s(y)})(),()=>{w.current&&cancelAnimationFrame(w.current)}),[t]);const b=c.useCallback(()=>{if(i&&o&&n){const j=i.generate_samples(r);n(j)}o&&(w.current=requestAnimationFrame(b))},[i,o,r,n]),C=()=>{i&&(i.set_frequency(u),i.set_waveform(f),i.set_amplitude(p),i.start(),a(!0))},R=()=>{i&&(i.stop(),a(!1))};return c.useEffect(()=>{o&&b()},[o,b]),c.useEffect(()=>{i&&(i.set_frequency(u),i.set_waveform(f),i.set_amplitude(p))},[i,u,f,p]),e.jsxs("div",{className:"kasm-oscillator",children:[e.jsx("h3",{children:"🎵 Kasm Oscillator"}),e.jsxs("div",{className:"controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsx("label",{children:"Waveform:"}),e.jsxs("select",{value:f,onChange:j=>l(j.target.value),children:[e.jsx("option",{value:"sine",children:"Sine"}),e.jsx("option",{value:"square",children:"Square"}),e.jsx("option",{value:"sawtooth",children:"Sawtooth"}),e.jsx("option",{value:"triangle",children:"Triangle"})]})]}),e.jsxs("div",{className:"control-group",children:[e.jsxs("label",{children:["Frequency: ",u,"Hz"]}),e.jsx("input",{type:"range",min:"20",max:"2000",value:u,onChange:j=>h(Number(j.target.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsxs("label",{children:["Amplitude: ",p.toFixed(2)]}),e.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:p,onChange:j=>g(Number(j.target.value))})]}),e.jsx("div",{className:"control-group",children:e.jsx("button",{onClick:o?R:C,className:`play-button ${o?"playing":""}`,children:o?"⏹️ Stop":"▶️ Play"})})]})]})}function ot({onAudioGenerated:n,sampleRate:t=44100,bufferSize:r=1024}){const[i,s]=c.useState(null),[o,a]=c.useState(1e3),[u,h]=c.useState(1),[f,l]=c.useState(new Set),p=c.useRef(void 0),{midiInputs:g}=pe();c.useEffect(()=>((async()=>{try{await U();const x=new We(t);s(x)}catch{}})(),()=>{p.current&&cancelAnimationFrame(p.current)}),[t]);const w=c.useCallback(()=>{if(i&&n){const y=i.generate_audio_block(r);n(y)}p.current=requestAnimationFrame(w)},[i,r,n]);c.useEffect(()=>{w()},[w]),c.useEffect(()=>{i&&(i.set_filter_cutoff(o),i.set_filter_resonance(u))},[i,o,u]),c.useEffect(()=>{if(i&&g.length>0){const y=_=>{const[P,F,T]=_.data,N=P&240;N===144&&T>0?(i.note_on(F,T),l(I=>new Set(I).add(F))):(N===128||N===144&&T===0)&&(i.note_off(F),l(I=>{const V=new Set(I);return V.delete(F),V}))},x=g[0];return x&&(x.onmidimessage=y),()=>{x&&(x.onmidimessage=null)}}},[i,g]);const b=y=>{i&&(i.note_on(y,100),l(x=>new Set(x).add(y)))},C=y=>{i&&(i.note_off(y),l(x=>{const _=new Set(x);return _.delete(y),_}))},R=[60,61,62,63,64,65,66,67,68,69,70,71],j=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return e.jsxs("div",{className:"kasm-synthesizer",children:[e.jsx("h3",{children:"🎹 Kasm Synthesizer"}),e.jsxs("div",{className:"controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsxs("label",{children:["Filter Cutoff: ",o,"Hz"]}),e.jsx("input",{type:"range",min:"20",max:"10000",value:o,onChange:y=>a(Number(y.target.value))})]}),e.jsxs("div",{className:"control-group",children:[e.jsxs("label",{children:["Filter Resonance: ",u.toFixed(1)]}),e.jsx("input",{type:"range",min:"0.5",max:"10",step:"0.1",value:u,onChange:y=>h(Number(y.target.value))})]})]}),e.jsx("div",{className:"virtual-keyboard",children:R.map((y,x)=>{const _=j[x].includes("#"),P=f.has(y);return e.jsx("button",{className:`key ${_?"black-key":"white-key"} ${P?"active":""}`,onMouseDown:()=>b(y),onMouseUp:()=>C(y),onMouseLeave:()=>C(y),children:j[x]},y)})}),g.length>0&&e.jsx("div",{className:"midi-status",children:e.jsxs("span",{children:["🎛️ MIDI: ",g[0].name]})})]})}function at({onAudioGenerated:n,sampleRate:t=44100,bufferSize:r=1024}){const[i,s]=c.useState(!1),[o,a]=c.useState(220);return c.useEffect(()=>{if(i&&n){const u=new Float32Array(r);for(let h=0;h<r;h++)u[h]=Math.sin(2*Math.PI*o*(h/t));n(u)}},[i,o,r,t,n]),e.jsxs("div",{className:"kasm-bangaz",children:[e.jsx("h3",{children:"🥁 Kasm Bangaz"}),e.jsxs("div",{className:"controls",children:[e.jsxs("div",{className:"control-group",children:[e.jsxs("label",{children:["Frequency: ",o,"Hz"]}),e.jsx("input",{type:"range",min:"100",max:"1000",value:o,onChange:u=>a(Number(u.target.value))})]}),e.jsx("div",{className:"control-group",children:e.jsx("button",{onClick:()=>s(u=>!u),className:`play-button ${i?"playing":""}`,children:i?"⏹️ Stop":"▶️ Play"})})]})]})}function ct({currentFilter:n="all-instruments"}){const[t,r]=c.useState(null),[i,s]=c.useState(!1),o=c.useRef(null),{isSupported:a}=pe();c.useEffect(()=>((async()=>{try{const l=new(window.AudioContext||window.webkitAudioContext),p=l.createGain();p.gain.value=.3,p.connect(l.destination),r(l),o.current=p,s(!0)}catch{}})(),()=>{t&&t.close()}),[]);const u=c.useCallback(f=>{if(t&&o.current&&t.state==="running"){const l=t.createBuffer(1,f.length,t.sampleRate),p=l.getChannelData(0);for(let w=0;w<f.length;w++)p[w]=f[w];const g=t.createBufferSource();g.buffer=l,g.connect(o.current),g.start()}},[t]),h=()=>{t&&t.state==="suspended"&&t.resume()};return i?e.jsxs("div",{className:"kasm-container",children:[e.jsxs("header",{className:"kasm-header",children:[e.jsx("h2",{children:"🎵 Kasm - WebMIDI Instruments"}),e.jsx("p",{children:"Modular synthesizers and instruments powered by WebAssembly + Rust"}),e.jsxs("div",{className:"kasm-status",children:[e.jsxs("span",{className:`status-indicator ${t?.state==="running"?"active":"inactive"}`,children:["🔊 Audio: ",t?.state||"inactive"]}),e.jsxs("span",{className:`status-indicator ${a?"active":"inactive"}`,children:["🎛️ MIDI: ",a?"supported":"not supported"]})]}),t?.state==="suspended"&&e.jsx("button",{onClick:h,className:"start-audio-button",children:"🎵 Start Audio"})]}),e.jsxs("div",{className:"kasm-instruments",children:[(n==="all-instruments"||n==="oscillator")&&e.jsx("div",{className:"instrument-panel",children:e.jsx(Q,{children:e.jsx(st,{onAudioGenerated:u,sampleRate:t?.sampleRate||44100})})}),(n==="all-instruments"||n==="synthesizer")&&e.jsx("div",{className:"instrument-panel",children:e.jsx(Q,{children:e.jsx(ot,{onAudioGenerated:u,sampleRate:t?.sampleRate||44100})})}),(n==="all-instruments"||n==="bangaz")&&e.jsx("div",{className:"instrument-panel",children:e.jsx(Q,{children:e.jsx(at,{onAudioGenerated:u,sampleRate:t?.sampleRate||44100})})})]}),e.jsxs("div",{className:"kasm-info",children:[e.jsx("h4",{children:"🧱 Lego-like Instrument Building"}),e.jsx("p",{children:"Kasm instruments are designed to work together like building blocks. Each component (oscillators, filters, envelopes) can be combined and connected to create complex synthesizers and audio processing chains."}),e.jsxs("div",{className:"tech-stack",children:[e.jsx("span",{className:"tech-badge",children:"WebAssembly"}),e.jsx("span",{className:"tech-badge",children:"Rust"}),e.jsx("span",{className:"tech-badge",children:"WebMIDI"}),e.jsx("span",{className:"tech-badge",children:"Web Audio API"})]})]})]}):e.jsxs("div",{className:"kasm-loading",children:[e.jsx("div",{className:"loading-spinner"}),e.jsx("p",{children:"Initializing Kasm Audio System..."})]})}function lt(){const n=c.useRef(null),[t,r]=c.useState(""),[i,s]=c.useState(0),[o,a]=c.useState(0),u=c.useRef(performance.now()),h=c.useRef(0),f=c.useRef(performance.now());return S(()=>{const l=performance.now(),p=new Date,g=p.getHours().toString().padStart(2,"0"),w=p.getMinutes().toString().padStart(2,"0"),b=p.getSeconds().toString().padStart(2,"0"),C=p.getMilliseconds().toString().padStart(3,"0"),R=Math.floor(l%1*1e3).toString().padStart(3,"0"),j=`${g}:${w}:${b}.${C}${R}`;if(r(j),h.current++,s(h.current),l-f.current>=1e3){const y=(l-f.current)/1e3,x=Math.round(h.current/y);a(x),h.current=0,f.current=l}u.current=l}),e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.5,0],fontSize:.3,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:t}),e.jsxs(d,{position:[0,0,0],fontSize:.15,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Frame: ",i]}),e.jsxs(d,{position:[0,-.3,0],fontSize:.15,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["FPS: ",o]}),e.jsx(d,{position:[0,-.6,0],fontSize:.1,color:"#888888",anchorX:"center",anchorY:"middle",children:"μs precision timing for low-latency video"})]})}function dt(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef(null);return S(()=>{const i=new Date,s=performance.now(),a=(i.getSeconds()+i.getMilliseconds()/1e3)/60*Math.PI*2-Math.PI/2,h=i.getMilliseconds()/1e3*Math.PI*2-Math.PI/2,l=s%1*1e3/1e3*Math.PI*2-Math.PI/2;n.current&&(n.current.rotation.z=a),t.current&&(t.current.rotation.z=h),r.current&&(r.current.rotation.z=l)}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(A,{args:[1,32,32],position:[0,0,-.1],children:e.jsx("meshBasicMaterial",{color:"#111111",transparent:!0,opacity:.8})}),Array.from({length:60},(i,s)=>{const o=s/60*Math.PI*2-Math.PI/2,a=Math.cos(o)*.9,u=Math.sin(o)*.9,h=s%5===0;return e.jsx(v,{args:[.02,h?.1:.05,.01],position:[a,u,0],children:e.jsx("meshBasicMaterial",{color:h?"#ffffff":"#666666"})},s)}),e.jsx(v,{ref:n,args:[.01,.7,.01],position:[0,.35,.01],children:e.jsx("meshBasicMaterial",{color:"#ff0000"})}),e.jsx(v,{ref:t,args:[.008,.6,.01],position:[0,.3,.02],children:e.jsx("meshBasicMaterial",{color:"#00ff00"})}),e.jsx(v,{ref:r,args:[.005,.5,.01],position:[0,.25,.03],children:e.jsx("meshBasicMaterial",{color:"#0000ff"})}),e.jsx(A,{args:[.05,16,16],position:[0,0,.04],children:e.jsx("meshBasicMaterial",{color:"#ffffff"})}),e.jsx(d,{position:[0,-1.3,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Frame-Accurate Clock"}),e.jsx(d,{position:[0,-1.5,0],fontSize:.06,color:"#ff0000",anchorX:"center",anchorY:"middle",children:"Red: Seconds"}),e.jsx(d,{position:[0,-1.65,0],fontSize:.06,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"Green: Milliseconds"}),e.jsx(d,{position:[0,-1.8,0],fontSize:.06,color:"#0000ff",anchorX:"center",anchorY:"middle",children:"Blue: Microseconds"})]})}function ut(){const[n,t]=c.useState({frameTime:0,jitter:0,dropped:0,latency:0}),r=c.useRef([]),i=c.useRef(performance.now());return S(()=>{const s=performance.now(),o=s-i.current;r.current.push(o),r.current.length>60&&r.current.shift();const a=r.current.reduce((p,g)=>p+g,0)/r.current.length,u=r.current.reduce((p,g)=>p+Math.pow(g-a,2),0)/r.current.length,h=Math.sqrt(u),f=r.current.filter(p=>p>20).length,l=o+h*2;t({frameTime:Math.round(o*100)/100,jitter:Math.round(h*100)/100,dropped:f,latency:Math.round(l*100)/100}),i.current=s}),e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,.8,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Performance Metrics"}),e.jsxs(d,{position:[0,.5,0],fontSize:.08,color:"#00ff00",anchorX:"center",anchorY:"middle",children:["Frame Time: ",n.frameTime,"ms"]}),e.jsxs(d,{position:[0,.3,0],fontSize:.08,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Jitter: ",n.jitter,"ms"]}),e.jsxs(d,{position:[0,.1,0],fontSize:.08,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["Dropped: ",n.dropped,"/60"]}),e.jsxs(d,{position:[0,-.1,0],fontSize:.08,color:"#ff0000",anchorX:"center",anchorY:"middle",children:["Est. Latency: ",n.latency,"ms"]}),e.jsx(d,{position:[0,-.4,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"Low-latency video timing"})]})}function ft(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(lt,{}),e.jsx(dt,{}),e.jsx(ut,{})]})}function ht(){return e.jsxs("div",{className:"time-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"time-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"⏰ Frame-Accurate Time"}),e.jsx("p",{children:"High-precision wall clock for low-latency video timing"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Microsecond precision timing for professional video production"})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(ft,{})})]})}function pt(){const n=c.useRef(null),[t,r]=c.useState({codec:"H.264",resolution:"1920x1080",bitrate:"5.2 Mbps",fps:60,frames:0,quality:95});return S(()=>{r(i=>({...i,frames:i.frames+1,bitrate:`${(5+Math.sin(Date.now()*.001)*.5).toFixed(1)} Mbps`,quality:Math.floor(94+Math.sin(Date.now()*.002)*3)}))}),e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.8,0],fontSize:.25,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:"WebCodecs Processing"}),e.jsxs(d,{position:[0,.4,0],fontSize:.12,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Codec: ",t.codec," | ",t.resolution]}),e.jsxs(d,{position:[0,.2,0],fontSize:.1,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["Bitrate: ",t.bitrate," | FPS: ",t.fps]}),e.jsxs(d,{position:[0,0,0],fontSize:.1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:["Frames Processed: ",t.frames]}),e.jsxs(d,{position:[0,-.2,0],fontSize:.1,color:"#ff00ff",anchorX:"center",anchorY:"middle",children:["Quality: ",t.quality,"%"]}),e.jsx(d,{position:[0,-.5,0],fontSize:.08,color:"#888888",anchorX:"center",anchorY:"middle",children:"Hardware-accelerated video encoding/decoding"})]})}function mt(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef(null);return S(()=>{const i=Date.now()*.001;if(n.current&&(n.current.rotation.y=i*.5,n.current.scale.setScalar(1+Math.sin(i*2)*.1)),t.current&&(t.current.rotation.y=-i*.3,t.current.scale.setScalar(1+Math.cos(i*1.5)*.1)),r.current){r.current.position.x=Math.sin(i*3)*.5;const s=r.current.material;s&&"opacity"in s&&(s.opacity=.5+Math.sin(i*4)*.3)}}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(v,{ref:n,args:[.4,.3,.2],position:[-.8,.3,0],children:e.jsx("meshBasicMaterial",{color:"#00ff00"})}),e.jsx(D,{ref:r,args:[.1,.05],position:[0,.3,0],children:e.jsx("meshBasicMaterial",{color:"#ffff00",transparent:!0})}),e.jsx(v,{ref:t,args:[.4,.3,.2],position:[.8,.3,0],children:e.jsx("meshBasicMaterial",{color:"#ff0000"})}),e.jsx(A,{args:[.1,16,16],position:[0,-.2,0],children:e.jsx("meshBasicMaterial",{color:"#00ffff"})}),e.jsx(d,{position:[-.8,-.1,0],fontSize:.06,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"Encoder"}),e.jsx(d,{position:[.8,-.1,0],fontSize:.06,color:"#ff0000",anchorX:"center",anchorY:"middle",children:"Decoder"}),e.jsx(d,{position:[0,-.5,0],fontSize:.06,color:"#00ffff",anchorX:"center",anchorY:"middle",children:"Processing Pipeline"}),e.jsx(d,{position:[0,-.8,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"WebCodecs API"}),e.jsx(d,{position:[0,-1,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"Hardware Acceleration"})]})}function gt(){const[n]=c.useState(["H.264/AVC","H.265/HEVC","VP8","VP9","AV1","AAC Audio"]),[t]=c.useState(["Hardware Encoding","Hardware Decoding","Real-time Processing","Low Latency","High Quality"]);return e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,1,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Supported Codecs"}),n.map((r,i)=>e.jsx(d,{position:[0,.6-i*.15,0],fontSize:.08,color:"#00ff88",anchorX:"center",anchorY:"middle",children:r},i)),e.jsx(d,{position:[0,-.5,0],fontSize:.1,color:"#ffff00",anchorX:"center",anchorY:"middle",children:"Capabilities"}),t.map((r,i)=>e.jsxs(d,{position:[0,-.7-i*.1,0],fontSize:.06,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["• ",r]},i))]})}function bt(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(pt,{}),e.jsx(mt,{}),e.jsx(gt,{})]})}function wt(){const[n,t]=c.useState(!1);return c.useEffect(()=>{"VideoEncoder"in window&&"VideoDecoder"in window&&t(!0)},[]),e.jsxs("div",{className:"webcodecs-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"webcodecs-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"🎥 WebCodecs"}),e.jsx("p",{children:"Hardware-accelerated video encoding and decoding"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Low-latency video processing with Rust WebAssembly optimization"}),e.jsx("div",{style:{marginTop:"10px"},children:e.jsx("span",{style:{color:n?"#00ff00":"#ff0000",fontSize:"0.8em"},children:n?"✅ WebCodecs Supported":"❌ WebCodecs Not Available"})})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(bt,{})})]})}function xt(){const n=c.useRef(null),[t,r]=c.useState({protocol:"HLS",quality:"1080p",bitrate:"8.5 Mbps",buffer:"12.3s",latency:"2.1s",dropped:0});return S(()=>{r(i=>({...i,protocol:Math.random()>.5?"HLS":"DASH",bitrate:`${(8+Math.sin(Date.now()*.001)*1.5).toFixed(1)} Mbps`,buffer:`${(12+Math.cos(Date.now()*.0015)*2).toFixed(1)}s`,latency:`${(2+Math.sin(Date.now()*.002)*.5).toFixed(1)}s`,dropped:Math.floor(Math.random()*3)}))}),e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.8,0],fontSize:.25,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:"WebXR Media Player"}),e.jsxs(d,{position:[0,.4,0],fontSize:.12,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Protocol: ",t.protocol," | Quality: ",t.quality]}),e.jsxs(d,{position:[0,.2,0],fontSize:.1,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["Bitrate: ",t.bitrate," | Buffer: ",t.buffer]}),e.jsxs(d,{position:[0,0,0],fontSize:.1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:["Latency: ",t.latency," | Dropped: ",t.dropped]}),e.jsx(d,{position:[0,-.3,0],fontSize:.08,color:"#888888",anchorX:"center",anchorY:"middle",children:"Adaptive streaming with WebXR integration"})]})}function yt(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef(null),i=c.useRef(null);return S(()=>{const s=Date.now()*.001;if(n.current&&(n.current.rotation.y=s*.3,n.current.scale.setScalar(1+Math.sin(s*1.5)*.1)),t.current&&(t.current.rotation.y=-s*.4,t.current.scale.setScalar(1+Math.cos(s*2)*.1)),r.current&&(r.current.rotation.z=s*.5,r.current.position.y=Math.sin(s*2)*.1),i.current){i.current.position.x=Math.sin(s*4)*.3;const o=i.current.material;o&&"opacity"in o&&(o.opacity=.6+Math.sin(s*6)*.3)}}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(v,{ref:n,args:[.3,.3,.3],position:[-.6,.4,0],children:e.jsx("meshBasicMaterial",{color:"#ff6b35"})}),e.jsx(v,{ref:t,args:[.3,.3,.3],position:[.6,.4,0],children:e.jsx("meshBasicMaterial",{color:"#4ecdc4"})}),e.jsx(D,{ref:i,args:[.8,.05],position:[0,.1,0],children:e.jsx("meshBasicMaterial",{color:"#ffff00",transparent:!0})}),e.jsx(A,{ref:r,args:[.2,16,16],position:[0,-.3,0],children:e.jsx("meshBasicMaterial",{color:"#00d4ff"})}),e.jsx(d,{position:[-.6,.1,0],fontSize:.06,color:"#ff6b35",anchorX:"center",anchorY:"middle",children:"HLS.js"}),e.jsx(d,{position:[.6,.1,0],fontSize:.06,color:"#4ecdc4",anchorX:"center",anchorY:"middle",children:"DASH.js"}),e.jsx(d,{position:[0,-.6,0],fontSize:.06,color:"#00d4ff",anchorX:"center",anchorY:"middle",children:"WebXR Display"}),e.jsx(d,{position:[0,-.9,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Immersive Media"}),e.jsx(d,{position:[0,-1.1,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"Adaptive Streaming"})]})}function vt(){const[n]=c.useState(["🎬 HLS Adaptive Streaming","📺 DASH Protocol Support","🥽 WebXR Integration","🔄 Auto Quality Switching","📱 Multi-Device Support","⚡ Low Latency Mode"]),[t]=c.useState(["MP4/H.264","WebM/VP9","HLS/m3u8","DASH/mpd","WebRTC"]);return e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,1,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Player Features"}),n.map((r,i)=>e.jsx(d,{position:[0,.6-i*.15,0],fontSize:.07,color:"#00ff88",anchorX:"center",anchorY:"middle",children:r},i)),e.jsx(d,{position:[0,-.5,0],fontSize:.1,color:"#ffff00",anchorX:"center",anchorY:"middle",children:"Supported Formats"}),t.map((r,i)=>e.jsxs(d,{position:[0,-.7-i*.1,0],fontSize:.06,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["• ",r]},i))]})}function _t(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(xt,{}),e.jsx(yt,{}),e.jsx(vt,{})]})}function jt(){const[n,t]=c.useState({hls:!1,dash:!1,webxr:!1});return c.useEffect(()=>{(async()=>{const i={hls:"MediaSource"in window,dash:"MediaSource"in window&&"fetch"in window,webxr:"xr"in navigator};if(i.webxr&&navigator.xr)try{const s=await navigator.xr.isSessionSupported("immersive-ar"),o=await navigator.xr.isSessionSupported("immersive-vr");i.webxr=s||o}catch{i.webxr=!1}t(i)})()},[]),e.jsxs("div",{className:"webplayer-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"webplayer-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"📺 WebPlayer"}),e.jsx("p",{children:"WebXR media player with HLS.js and DASH.js support"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Immersive video streaming with adaptive quality and Rust optimization"}),e.jsxs("div",{style:{marginTop:"10px",fontSize:"0.8em"},children:[e.jsxs("div",{style:{color:n.hls?"#00ff00":"#ff0000"},children:[n.hls?"✅":"❌"," HLS Support"]}),e.jsxs("div",{style:{color:n.dash?"#00ff00":"#ff0000"},children:[n.dash?"✅":"❌"," DASH Support"]}),e.jsxs("div",{style:{color:n.webxr?"#00ff00":"#ff0000"},children:[n.webxr?"✅":"❌"," WebXR Support"]})]})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(_t,{})})]})}function St(){const n=c.useRef(null),[t,r]=c.useState({protocol:"MoQ",latency:"45ms",throughput:"125 Mbps",objects:1247,subscribers:8,publishers:3,quality:"Ultra Low Latency"});return S(()=>{r(i=>({...i,latency:`${(40+Math.sin(Date.now()*.001)*10).toFixed(0)}ms`,throughput:`${(120+Math.sin(Date.now()*.0015)*20).toFixed(0)} Mbps`,objects:i.objects+Math.floor(Math.random()*3),subscribers:8+Math.floor(Math.sin(Date.now()*.002)*2),publishers:3+Math.floor(Math.cos(Date.now()*.0025)*1)}))}),e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.8,0],fontSize:.25,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:"Media over QUIC"}),e.jsxs(d,{position:[0,.4,0],fontSize:.12,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Protocol: ",t.protocol," | Quality: ",t.quality]}),e.jsxs(d,{position:[0,.2,0],fontSize:.1,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["Latency: ",t.latency," | Throughput: ",t.throughput]}),e.jsxs(d,{position:[0,0,0],fontSize:.1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:["Objects: ",t.objects," | Subscribers: ",t.subscribers]}),e.jsxs(d,{position:[0,-.2,0],fontSize:.1,color:"#ff00ff",anchorX:"center",anchorY:"middle",children:["Publishers: ",t.publishers]}),e.jsx(d,{position:[0,-.5,0],fontSize:.08,color:"#888888",anchorX:"center",anchorY:"middle",children:"Ultra-low latency media streaming over QUIC"})]})}function At(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef([]),i=c.useRef(null);return S(()=>{const s=Date.now()*.001;if(n.current&&(n.current.rotation.y=s*.4,n.current.scale.setScalar(1+Math.sin(s*2)*.1)),t.current&&(t.current.rotation.x=s*.3,t.current.rotation.z=s*.2),r.current.forEach((o,a)=>{o&&(o.rotation.y=s*(.5+a*.1),o.position.y=Math.sin(s*(1+a*.3))*.1)}),i.current){i.current.position.x=Math.sin(s*3)*.4;const o=i.current.material;o&&"opacity"in o&&(o.opacity=.7+Math.sin(s*5)*.2)}}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(v,{ref:n,args:[.3,.3,.3],position:[-.8,.4,0],children:e.jsx("meshBasicMaterial",{color:"#00ff00"})}),e.jsx(A,{ref:t,args:[.2,16,16],position:[0,.2,0],children:e.jsx("meshBasicMaterial",{color:"#ffff00"})}),e.jsx(D,{ref:i,args:[.6,.03],position:[0,.4,0],children:e.jsx("meshBasicMaterial",{color:"#00ffff",transparent:!0})}),[0,1,2].map(s=>e.jsx(v,{ref:o=>{o&&(r.current[s]=o)},args:[.2,.2,.2],position:[.6+s*.3,-.2-s*.2,0],children:e.jsx("meshBasicMaterial",{color:"#ff6600"})},s)),e.jsx(d,{position:[-.8,.1,0],fontSize:.06,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"Publisher"}),e.jsx(d,{position:[0,-.1,0],fontSize:.06,color:"#ffff00",anchorX:"center",anchorY:"middle",children:"MoQ Relay"}),e.jsx(d,{position:[.8,-.6,0],fontSize:.06,color:"#ff6600",anchorX:"center",anchorY:"middle",children:"Subscribers"}),e.jsx(d,{position:[0,-.9,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"MoQ Network"}),e.jsx(d,{position:[0,-1.1,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"QUIC Transport"})]})}function Mt(){const[n]=c.useState(["🚀 Ultra Low Latency","📦 Object-based Delivery","🔄 Adaptive Bitrate","🌐 CDN Integration","📱 Multi-device Sync","🔒 Built-in Security"]),[t]=c.useState(["Live Streaming","Interactive Media","Gaming Applications","Real-time Collaboration","IoT Data Streams"]);return e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,1,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"MoQ Features"}),n.map((r,i)=>e.jsx(d,{position:[0,.6-i*.15,0],fontSize:.07,color:"#00ff88",anchorX:"center",anchorY:"middle",children:r},i)),e.jsx(d,{position:[0,-.5,0],fontSize:.1,color:"#ffff00",anchorX:"center",anchorY:"middle",children:"Use Cases"}),t.map((r,i)=>e.jsxs(d,{position:[0,-.7-i*.1,0],fontSize:.06,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["• ",r]},i))]})}function Ct(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(St,{}),e.jsx(At,{}),e.jsx(Mt,{})]})}function Rt(){const[n,t]=c.useState({quic:!1,webtransport:!1,moq:!1});return c.useEffect(()=>{(()=>{const i={quic:"WebTransport"in window,webtransport:"WebTransport"in window,moq:!1};t(i)})()},[]),e.jsxs("div",{className:"moq-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"moq-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"📡 Media over QUIC"}),e.jsx("p",{children:"Ultra-low latency media streaming protocol"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Object-based media delivery with Rust WebAssembly optimization"}),e.jsxs("div",{style:{marginTop:"10px",fontSize:"0.8em"},children:[e.jsxs("div",{style:{color:n.quic?"#00ff00":"#ff0000"},children:[n.quic?"✅":"❌"," QUIC Support"]}),e.jsxs("div",{style:{color:n.webtransport?"#00ff00":"#ff0000"},children:[n.webtransport?"✅":"❌"," WebTransport Support"]}),e.jsxs("div",{style:{color:n.moq?"#00ff00":"#ffaa00"},children:[n.moq?"✅":"🚧"," MoQ (Experimental)"]})]})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(Ct,{})})]})}function zt(){const n=c.useRef(null),[t,r]=c.useState({protocol:"WebTransport",state:"Connected",rtt:"28ms",bandwidth:"95 Mbps",streams:12,datagrams:847,packets:2341,reliability:"99.8%"});return S(()=>{r(i=>({...i,rtt:`${(25+Math.sin(Date.now()*.001)*8).toFixed(0)}ms`,bandwidth:`${(90+Math.sin(Date.now()*.0012)*15).toFixed(0)} Mbps`,streams:12+Math.floor(Math.sin(Date.now()*.002)*3),datagrams:i.datagrams+Math.floor(Math.random()*5),packets:i.packets+Math.floor(Math.random()*8),reliability:`${(99.5+Math.sin(Date.now()*8e-4)*.4).toFixed(1)}%`}))}),e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.8,0],fontSize:.25,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:"WebTransport"}),e.jsxs(d,{position:[0,.4,0],fontSize:.12,color:"#ffff00",anchorX:"center",anchorY:"middle",children:["Protocol: ",t.protocol," | State: ",t.state]}),e.jsxs(d,{position:[0,.2,0],fontSize:.1,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["RTT: ",t.rtt," | Bandwidth: ",t.bandwidth]}),e.jsxs(d,{position:[0,0,0],fontSize:.1,color:"#00ffff",anchorX:"center",anchorY:"middle",children:["Streams: ",t.streams," | Datagrams: ",t.datagrams]}),e.jsxs(d,{position:[0,-.2,0],fontSize:.1,color:"#ff00ff",anchorX:"center",anchorY:"middle",children:["Packets: ",t.packets," | Reliability: ",t.reliability]}),e.jsx(d,{position:[0,-.5,0],fontSize:.08,color:"#888888",anchorX:"center",anchorY:"middle",children:"Bidirectional communication over QUIC"})]})}function Pt(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef([]),i=c.useRef(null);return S(()=>{const s=Date.now()*.001;if(n.current&&(n.current.rotation.y=s*.3,n.current.scale.setScalar(1+Math.sin(s*1.5)*.1)),t.current&&(t.current.rotation.y=-s*.4,t.current.scale.setScalar(1+Math.cos(s*2)*.1)),r.current.forEach((o,a)=>{o&&(o.position.x=Math.sin(s*(2+a*.5))*.3,o.rotation.z=s*(1+a*.2))}),i.current){i.current.position.x=Math.sin(s*4)*.5,i.current.position.y=Math.cos(s*3)*.1;const o=i.current.material;o&&"opacity"in o&&(o.opacity=.8+Math.sin(s*6)*.2)}}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(v,{ref:n,args:[.3,.3,.3],position:[-.8,.3,0],children:e.jsx("meshBasicMaterial",{color:"#4ecdc4"})}),e.jsx(v,{ref:t,args:[.3,.3,.3],position:[.8,.3,0],children:e.jsx("meshBasicMaterial",{color:"#ff6b35"})}),[0,1,2].map(s=>e.jsx(D,{ref:o=>{o&&(r.current[s]=o)},args:[.6,.02],position:[0,.4-s*.1,0],children:e.jsx("meshBasicMaterial",{color:"#00ff00",transparent:!0})},s)),e.jsx(A,{ref:i,args:[.05,8,8],position:[0,-.1,0],children:e.jsx("meshBasicMaterial",{color:"#ffff00",transparent:!0})}),e.jsx(D,{args:[1.6,.05],position:[0,-.3,0],children:e.jsx("meshBasicMaterial",{color:"#ff00ff",opacity:.6,transparent:!0})}),e.jsx(d,{position:[-.8,0,0],fontSize:.06,color:"#4ecdc4",anchorX:"center",anchorY:"middle",children:"Client"}),e.jsx(d,{position:[.8,0,0],fontSize:.06,color:"#ff6b35",anchorX:"center",anchorY:"middle",children:"Server"}),e.jsx(d,{position:[0,.1,0],fontSize:.06,color:"#00ff00",anchorX:"center",anchorY:"middle",children:"Streams"}),e.jsx(d,{position:[0,-.5,0],fontSize:.06,color:"#ff00ff",anchorX:"center",anchorY:"middle",children:"QUIC Connection"}),e.jsx(d,{position:[0,-.8,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"WebTransport API"}),e.jsx(d,{position:[0,-1,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"HTTP/3 over QUIC"})]})}function Ft(){const[n]=c.useState(["🚀 Low Latency Transport","🔄 Bidirectional Streams","📦 Unreliable Datagrams","🔒 Built-in Security","🌐 Web-native API","⚡ Multiplexed Connections"]),[t]=c.useState(["Real-time Gaming","Live Video Streaming","IoT Communication","File Transfer","Chat Applications"]);return e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,1,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"WebTransport Features"}),n.map((r,i)=>e.jsx(d,{position:[0,.6-i*.15,0],fontSize:.07,color:"#00ff88",anchorX:"center",anchorY:"middle",children:r},i)),e.jsx(d,{position:[0,-.5,0],fontSize:.1,color:"#ffff00",anchorX:"center",anchorY:"middle",children:"Use Cases"}),t.map((r,i)=>e.jsxs(d,{position:[0,-.7-i*.1,0],fontSize:.06,color:"#ff6600",anchorX:"center",anchorY:"middle",children:["• ",r]},i))]})}function Tt(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(zt,{}),e.jsx(Pt,{}),e.jsx(Ft,{})]})}function Nt(){const[n,t]=c.useState({webtransport:!1,quic:!1,http3:!1});return c.useEffect(()=>{(()=>{const i={webtransport:"WebTransport"in window,quic:"WebTransport"in window,http3:"WebTransport"in window};t(i)})()},[]),e.jsxs("div",{className:"webtransport-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"webtransport-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"🌐 WebTransport"}),e.jsx("p",{children:"Bidirectional communication over QUIC"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Low-latency transport with Rust WebAssembly optimization"}),e.jsxs("div",{style:{marginTop:"10px",fontSize:"0.8em"},children:[e.jsxs("div",{style:{color:n.webtransport?"#00ff00":"#ff0000"},children:[n.webtransport?"✅":"❌"," WebTransport Support"]}),e.jsxs("div",{style:{color:n.quic?"#00ff00":"#ff0000"},children:[n.quic?"✅":"❌"," QUIC Support"]}),e.jsxs("div",{style:{color:n.http3?"#00ff00":"#ff0000"},children:[n.http3?"✅":"❌"," HTTP/3 Support"]})]})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(Tt,{})})]})}function Bt(){const[n,t]=c.useState("time");c.useEffect(()=>{const s=new URLSearchParams(window.location.search).get("module");s&&["time","webcodecs","webplayer","moq","webtransport"].includes(s)&&t(s)},[]);const r=[{id:"time",name:"Time",icon:"⏰",description:"Frame-accurate timing"},{id:"webcodecs",name:"WebCodecs",icon:"🎥",description:"Video processing"},{id:"webplayer",name:"WebPlayer",icon:"📺",description:"Media streaming"},{id:"moq",name:"MoQ",icon:"📡",description:"Media over QUIC"},{id:"webtransport",name:"WebTransport",icon:"🌐",description:"QUIC transport"}];return e.jsxs("div",{className:"tech-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"tech-selector",style:{position:"absolute",top:"20px",right:"20px",zIndex:20,background:"rgba(0, 0, 0, 0.8)",borderRadius:"15px",padding:"1rem",backdropFilter:"blur(10px)",border:"1px solid rgba(255, 255, 255, 0.1)"},children:[e.jsx("h3",{style:{color:"white",marginBottom:"1rem",fontSize:"1.1rem",textAlign:"center"},children:"🔧 Tech Demos"}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"0.5rem"},children:r.map(i=>e.jsx("button",{onClick:()=>t(i.id),style:{background:n===i.id?"rgba(0, 255, 136, 0.2)":"rgba(255, 255, 255, 0.1)",border:n===i.id?"1px solid rgba(0, 255, 136, 0.5)":"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"10px",padding:"0.75rem",color:"white",cursor:"pointer",transition:"all 0.3s ease",fontSize:"0.9rem",minWidth:"180px",textAlign:"left"},onMouseEnter:s=>{n!==i.id&&(s.currentTarget.style.background="rgba(255, 255, 255, 0.2)")},onMouseLeave:s=>{n!==i.id&&(s.currentTarget.style.background="rgba(255, 255, 255, 0.1)")},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"0.5rem"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:i.icon}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:i.name}),e.jsx("div",{style:{fontSize:"0.8rem",opacity:.8},children:i.description})]})]})},i.id))}),e.jsx("div",{style:{marginTop:"1rem",padding:"0.5rem",background:"rgba(255, 255, 255, 0.05)",borderRadius:"8px",fontSize:"0.8rem",color:"#aaa",textAlign:"center"},children:"Advanced web technologies powered by Rust WebAssembly"})]}),e.jsxs("div",{className:"tech-module-display",style:{width:"100%",height:"100%"},children:[n==="time"&&e.jsx(ht,{}),n==="webcodecs"&&e.jsx(wt,{}),n==="webplayer"&&e.jsx(jt,{}),n==="moq"&&e.jsx(Rt,{}),n==="webtransport"&&e.jsx(Nt,{})]}),e.jsxs("div",{className:"tech-info",style:{position:"absolute",bottom:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white",maxWidth:"300px"},children:[e.jsxs("h4",{style:{marginBottom:"0.5rem",color:"#00ff88"},children:[r.find(i=>i.id===n)?.icon," ",r.find(i=>i.id===n)?.name]}),e.jsxs("p",{style:{fontSize:"0.9rem",lineHeight:"1.4",margin:0},children:[n==="time"&&"Frame-accurate wall clock for low-latency video timing with microsecond precision.",n==="webcodecs"&&"Hardware-accelerated video encoding and decoding with Rust WebAssembly optimization.",n==="webplayer"&&"WebXR media player with HLS.js and DASH.js adaptive streaming support.",n==="moq"&&"Ultra-low latency media streaming protocol using object-based delivery over QUIC.",n==="webtransport"&&"Bidirectional communication over QUIC with streams and datagrams support."]})]})]})}function It(){const n=c.useRef(null),[t,r]=c.useState(0),i=[{title:"Brewery Web AR Experience",subtitle:"Advanced WebXR Platform",description:"Cutting-edge web technologies for brewing and audio"},{title:"Rust WebAssembly Core",subtitle:"High-Performance Computing",description:"Shared WASM foundation across all modules"},{title:"WebXR Innovation",subtitle:"Immersive Experiences",description:"AR/VR capabilities for modern web browsers"}];S(()=>{const o=Date.now(),a=Math.floor(o/3e3%i.length);a!==t&&r(a)});const s=i[t];return e.jsxs("group",{position:[0,0,-2],children:[e.jsx(d,{ref:n,position:[0,.8,0],fontSize:.25,color:"#00ff00",anchorX:"center",anchorY:"middle",font:"/fonts/monospace.woff",children:s.title}),e.jsx(d,{position:[0,.4,0],fontSize:.15,color:"#ffff00",anchorX:"center",anchorY:"middle",children:s.subtitle}),e.jsx(d,{position:[0,0,0],fontSize:.12,color:"#ff6600",anchorX:"center",anchorY:"middle",children:s.description}),e.jsxs(d,{position:[0,-.4,0],fontSize:.08,color:"#888888",anchorX:"center",anchorY:"middle",children:[t+1," / ",i.length]})]})}function kt(){const n=c.useRef(null),t=c.useRef(null),r=c.useRef(null);return S(()=>{const i=Date.now()*.001;n.current&&(n.current.rotation.y=i*.5,n.current.position.y=Math.sin(i)*.2),t.current&&(t.current.rotation.x=i*.3,t.current.position.y=Math.cos(i*1.2)*.15),r.current&&(r.current.rotation.z=i*.7,r.current.position.y=Math.sin(i*.8)*.25)}),e.jsxs("group",{position:[2,0,-2],children:[e.jsx(v,{ref:n,args:[.3,.3,.3],position:[0,.5,0],children:e.jsx("meshBasicMaterial",{color:"#ce422b"})}),e.jsx(A,{ref:t,args:[.15,16,16],position:[0,0,0],children:e.jsx("meshBasicMaterial",{color:"#00d4ff"})}),e.jsx(v,{ref:r,args:[.2,.2,.2],position:[0,-.5,0],children:e.jsx("meshBasicMaterial",{color:"#ff6b35"})}),e.jsx(d,{position:[0,-1,0],fontSize:.08,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Core Technologies"}),e.jsx(d,{position:[0,-1.2,0],fontSize:.06,color:"#ce422b",anchorX:"center",anchorY:"middle",children:"🦀 Rust WebAssembly"}),e.jsx(d,{position:[0,-1.35,0],fontSize:.06,color:"#00d4ff",anchorX:"center",anchorY:"middle",children:"🥽 WebXR"}),e.jsx(d,{position:[0,-1.5,0],fontSize:.06,color:"#ff6b35",anchorX:"center",anchorY:"middle",children:"⚡ WebGPU"})]})}function Et(){const[n]=c.useState(["🍺 Brewing Analytics & Calculations","🎵 WebMIDI Audio Synthesis","⏰ Frame-Accurate Timing","🎥 WebCodecs Video Processing","📺 WebXR Media Players","🥽 Immersive AR Experiences"]);return e.jsxs("group",{position:[-2,0,-2],children:[e.jsx(d,{position:[0,1,0],fontSize:.12,color:"#ffffff",anchorX:"center",anchorY:"middle",children:"Platform Features"}),n.map((t,r)=>e.jsx(d,{position:[0,.6-r*.2,0],fontSize:.08,color:"#00ff88",anchorX:"center",anchorY:"middle",children:t},r)),e.jsx(d,{position:[0,-.8,0],fontSize:.06,color:"#888888",anchorX:"center",anchorY:"middle",children:"Powered by Rust + WebAssembly"})]})}function Dt(){return e.jsxs(e.Fragment,{children:[e.jsx("ambientLight",{intensity:.5}),e.jsx("pointLight",{position:[10,10,10]}),e.jsx(It,{}),e.jsx(kt,{}),e.jsx(Et,{})]})}function Wt(){return e.jsxs("div",{className:"about-container",style:{width:"100%",height:"100vh",position:"relative"},children:[e.jsxs("div",{className:"about-header",style:{position:"absolute",top:"20px",left:"20px",zIndex:10,background:"rgba(0, 0, 0, 0.7)",padding:"1rem",borderRadius:"10px",color:"white"},children:[e.jsx("h2",{children:"ℹ️ About"}),e.jsx("p",{children:"Brewery Web AR Experience Platform"}),e.jsx("p",{style:{fontSize:"0.9em",marginTop:"10px",color:"#aaa"},children:"Advanced WebXR platform powered by Rust WebAssembly"})]}),e.jsx(M,{camera:{position:[0,0,5],fov:75},style:{background:"linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)"},children:e.jsx(Dt,{})})]})}const Ut=({currentApp:n,onAppChange:t,onSearch:r,appContext:i="main",onFilterChange:s})=>{const[o,a]=c.useState(!1),[u,h]=c.useState(""),l=(()=>{switch(i){case"kasm":return[{id:"all-instruments",label:"All Instruments",icon:"🎵",description:"View all available instruments"},{id:"oscillators",label:"Oscillators",icon:"〰️",description:"Basic waveform generators"},{id:"synthesizers",label:"Synthesizers",icon:"🎹",description:"Complex multi-oscillator synths"},{id:"effects",label:"Effects",icon:"🎛️",description:"Audio processing effects"},{id:"sequencers",label:"Sequencers",icon:"📊",description:"Pattern and sequence generators"},{id:"midi-devices",label:"MIDI Devices",icon:"🔌",description:"Connected MIDI controllers"},{id:"presets",label:"Presets",icon:"💾",description:"Saved instrument configurations"}];case"brewalytics":return[{id:"brew-sheet",label:"Brew Sheet",icon:"📋",description:"Current brewing session data"},{id:"calculations",label:"Calculations",icon:"🧮",description:"SRM, IBU, OG, ABV calculators"},{id:"timers",label:"Timers",icon:"⏱️",description:"Active brewing timers"},{id:"recipes",label:"Recipes",icon:"📖",description:"Saved brewing recipes"},{id:"inventory",label:"Inventory",icon:"📦",description:"Ingredient inventory management"},{id:"fermentation",label:"Fermentation",icon:"🧪",description:"Fermentation tracking"},{id:"analytics",label:"Analytics",icon:"📊",description:"Brewing performance analytics"}];case"tech":return[{id:"webcodecs",label:"WebCodecs",icon:"🎥",description:"Video encoding and decoding"},{id:"webtransport",label:"WebTransport",icon:"🚀",description:"Modern transport protocol"},{id:"moq",label:"Media over QUIC",icon:"📡",description:"Low-latency media streaming"},{id:"webplayer",label:"Web Player",icon:"▶️",description:"Advanced media player"},{id:"time",label:"Time APIs",icon:"⏰",description:"Precision timing demonstrations"},{id:"webgpu",label:"WebGPU",icon:"🎮",description:"GPU compute and rendering"}];default:return[{id:"brewalytics",label:"Brewalytics",icon:"🍺",description:"Brewery analytics and calculations"},{id:"ar",label:"AR Experience",icon:"🥽",description:"Augmented reality brewery tour"},{id:"brewers-reference",label:"Brewers Reference",icon:"📚",description:"Comprehensive brewing guide and calculations"},{id:"kasm",label:"KASM",icon:"🎵",description:"Audio synthesis and MIDI control"},{id:"tech",label:"Tech Demos",icon:"🔧",description:"WebCodecs, WebTransport, MoQ, and more"},{id:"about",label:"About",icon:"ℹ️",description:"Project information and credits"}]}})(),p=b=>{b.preventDefault(),r(u)},g=b=>{i!=="main"&&s?s(b):t(b),a(!1)},w=()=>{a(!o)};return e.jsxs(e.Fragment,{children:[e.jsxs("button",{className:`hamburger-menu ${o?"open":""}`,onClick:w,"aria-label":"Toggle navigation menu","aria-expanded":o,children:[e.jsx("span",{className:"hamburger-line"}),e.jsx("span",{className:"hamburger-line"}),e.jsx("span",{className:"hamburger-line"})]}),o&&e.jsx("div",{className:"sidebar-overlay",onClick:()=>a(!1)}),e.jsxs("nav",{className:`sidebar ${o?"open":""}`,children:[e.jsxs("div",{className:"sidebar-header",children:[e.jsxs("h2",{className:"sidebar-title",children:[e.jsx("span",{className:"sidebar-icon",children:"🚀"}),"AR Web Experience"]}),e.jsx("button",{className:"sidebar-close",onClick:()=>a(!1),"aria-label":"Close navigation menu",children:"✕"})]}),e.jsx("div",{className:"sidebar-search",children:e.jsx("form",{onSubmit:p,children:e.jsxs("div",{className:"search-input-container",children:[e.jsx("input",{type:"text",placeholder:"Search content...",value:u,onChange:b=>h(b.target.value),className:"search-input"}),e.jsx("button",{type:"submit",className:"search-button","aria-label":"Search",children:"🔍"})]})})}),e.jsx("div",{className:"sidebar-nav",children:e.jsx("ul",{className:"nav-list",children:l.map(b=>e.jsx("li",{className:"nav-item",children:e.jsxs("button",{className:`nav-link ${n===b.id?"active":""}`,onClick:()=>g(b.id),"aria-current":n===b.id?"page":void 0,children:[e.jsx("span",{className:"nav-icon",children:b.icon}),e.jsxs("div",{className:"nav-content",children:[e.jsx("span",{className:"nav-label",children:b.label}),e.jsx("span",{className:"nav-description",children:b.description})]})]})},b.id))})}),e.jsx("div",{className:"sidebar-footer",children:e.jsxs("div",{className:"tech-info",children:[e.jsx("p",{className:"tech-title",children:"Built with:"}),e.jsxs("div",{className:"tech-badges-sidebar",children:[e.jsx("span",{className:"tech-badge-sidebar",children:"WebXR"}),e.jsx("span",{className:"tech-badge-sidebar",children:"WebGPU"}),e.jsx("span",{className:"tech-badge-sidebar",children:"WASM"}),e.jsx("span",{className:"tech-badge-sidebar",children:"React"})]})]})})]})]})};function Lt(){const[n,t]=c.useState("fallback"),[r,i]=c.useState("brewalytics"),[s,o]=c.useState(!1),[a,u]=c.useState(""),[h,f]=c.useState(""),l=c.useRef(null);c.useEffect(()=>{const _=new URLSearchParams(window.location.search).get("app");_&&["ar","brewalytics","brewers-reference","kasm","tech","about"].includes(_)?i(_):_&&["time","webcodecs","webplayer","moq","webtransport"].includes(_)&&i("tech")},[]);const p=r==="kasm"||r==="brewalytics",g=()=>r==="kasm"?"kasm":r==="brewalytics"?"brewalytics":r==="tech"?"tech":"main";c.useEffect(()=>{if(!l.current)return;const x=l.current,_=new ue(x);let P;const F=async()=>{await _.initialize()&&(_.resize(window.innerWidth,window.innerHeight),T())},T=()=>{const me=Ce([0,0,5],[0,0,0],[0,1,0]),ge=window.innerWidth/window.innerHeight,be=Me(45*(Math.PI/180),ge,.1,100);_.render([],me,be),P=requestAnimationFrame(T)};F();const N=()=>{_.resize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",N),()=>{window.removeEventListener("resize",N),cancelAnimationFrame(P),_.dispose()}},[]);const w=x=>{t(x)},b=()=>{switch(n){case"ar":return"Augmented Reality mode - Experience 3D objects in your real environment";case"3d":return"3D mode - Interactive 3D experience with WebGPU acceleration";case"fallback":return"Standard 3D mode - Compatible with all devices";default:return"Loading..."}},C=()=>{switch(n){case"ar":return"🥽";case"3d":return"🎮";case"fallback":return"💻";default:return"⏳"}},R=x=>{i(x)},j=x=>{u(x)},y=x=>{f(x)};return e.jsxs(e.Fragment,{children:[e.jsx("canvas",{ref:l,style:{position:"fixed",top:0,left:0,zIndex:-1,width:"100vw",height:"100vh"}}),e.jsxs("div",{className:"App",children:[e.jsx(Ut,{currentApp:r,onAppChange:R,onSearch:j,appContext:g(),onFilterChange:y}),e.jsxs("div",{className:`app-content ${p?"standalone-mode":""}`,children:[!p&&e.jsxs("header",{className:"mode-header",children:[e.jsxs("div",{className:"mode-info",children:[e.jsx("span",{className:"mode-icon",children:C()}),e.jsx("span",{className:"mode-text",children:n.toUpperCase()})]}),e.jsx("button",{className:"info-button",onClick:()=>o(!s),"aria-label":"Toggle information",children:"ℹ️"})]}),s&&!p&&e.jsx("div",{className:"info-panel",children:e.jsxs("div",{className:"info-content",children:[e.jsx("h3",{children:"Current Experience"}),e.jsx("p",{children:b()}),e.jsx("h4",{children:"Technologies Used:"}),e.jsxs("ul",{className:"tech-list",children:[e.jsx("li",{children:"🦀 Rust + WebAssembly for performance-critical operations"}),e.jsx("li",{children:"⚡ WebGPU with WebGL fallback for rendering"}),e.jsx("li",{children:"🥽 WebXR for AR experiences on Android"}),e.jsx("li",{children:"📱 AR Quick Look for iOS devices"}),e.jsx("li",{children:"🎵 WebMIDI for interactive audio"}),e.jsx("li",{children:"🎥 WebCodecs for efficient video processing"}),e.jsx("li",{children:"⚛️ React Three Fiber for 3D scenes"})]}),e.jsxs("div",{className:"browser-support",children:[e.jsx("h4",{children:"Browser Support:"}),e.jsxs("div",{className:"support-grid",children:[e.jsxs("div",{className:"support-item",children:[e.jsx("span",{className:"browser",children:"Chrome Android"}),e.jsx("span",{className:"support full",children:"Full AR"})]}),e.jsxs("div",{className:"support-item",children:[e.jsx("span",{className:"browser",children:"Safari iOS"}),e.jsx("span",{className:"support partial",children:"AR Quick Look"})]}),e.jsxs("div",{className:"support-item",children:[e.jsx("span",{className:"browser",children:"Desktop"}),e.jsx("span",{className:"support fallback",children:"3D Mode"})]})]})]})]})}),e.jsxs("main",{className:"app-main",children:[r==="brewalytics"&&e.jsx("section",{className:"brewalytics-section",children:e.jsx(Je,{onModeChange:w,currentFilter:h})}),r==="ar"&&e.jsx("section",{className:"ar-section",children:e.jsx(qe,{onModeChange:w})}),r==="brewers-reference"&&e.jsx("section",{className:"brewers-reference-section",children:e.jsx(it,{searchQuery:a})}),r==="kasm"&&e.jsx("section",{className:"kasm-section",children:e.jsx(ct,{currentFilter:h})}),r==="tech"&&e.jsx("section",{className:"tech-section",children:e.jsx(Bt,{})}),r==="about"&&e.jsx("section",{className:"about-section",children:e.jsx(Wt,{})})]})]})]})]})}ve.createRoot(document.getElementById("root")).render(e.jsx(c.StrictMode,{children:e.jsx(Lt,{})}));
