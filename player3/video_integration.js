/*
 * Copyright (c) Pyrmont Brewery 2025
 * Author: Kevin Staunton-Lambert
 *
 * Video Integration for Kasm WASM Rust - Max4Live Jitter Interface
 *
 * This file provides the JavaScript bridge between the Rust WASM video processor
 * and Max4Live Jitter objects for MP4 video playback with green tint filtering.
 */

// Global variables
let videoProcessor = null;
let updateInterval = null;
let jitterMatrix = null;
let abletonTransport = null;
let wasmModule = null;
let isWasmLoaded = false;

// Import WASM module initialization function
let wasmInit = null;

// Load and initialize WASM module
async function initWasmModule() {
    if (isWasmLoaded) {
        return true;
    }

    try {
        // Try to import the WASM module with various path configurations
        let importSupported = false;
        try {
            importSupported = typeof eval('import') === 'function';
        } catch (e) {
            importSupported = false;
        }

        if (importSupported) {
            // ES6 dynamic import - try multiple paths
            const possiblePaths = [
                './pkg/kasm_ableton_rust.js',
                '../pkg/kasm_ableton_rust.js',
                'pkg/kasm_ableton_rust.js',
                '/Users/klambert/workspace/github_kevleyski/priv/wasm/kasm_wasm_ableton_rust/pkg/kasm_ableton_rust.js'
            ];

            let wasmPkg = null;
            for (const path of possiblePaths) {
                try {
                    post("Trying to load WASM from: " + path);
                    wasmPkg = await eval(`import("${path}")`);
                    post("Successfully loaded WASM from: " + path);
                    break;
                } catch (importError) {
                    post("Failed to load from " + path + ": " + importError.message);
                    continue;
                }
            }

            if (wasmPkg) {
                wasmInit = wasmPkg.default;
                wasmModule = wasmPkg;
            } else {
                throw new Error("Could not load WASM module from any path");
            }
        } else {
            // Check if require is available (Node.js or some bundlers)
            let requireSupported = false;
            try {
                requireSupported = typeof require === 'function';
            } catch (e) {
                requireSupported = false;
            }

            if (requireSupported) {
                // Try multiple require paths
                const requirePaths = [
                    './pkg/kasm_ableton_rust.js',
                    '../pkg/kasm_ableton_rust.js',
                    'pkg/kasm_ableton_rust.js'
                ];

                for (const path of requirePaths) {
                    try {
                        post("Trying to require WASM from: " + path);
                        wasmModule = require(path);
                        wasmInit = wasmModule.default || wasmModule;
                        post("Successfully required WASM from: " + path);
                        break;
                    } catch (requireError) {
                        post("Failed to require from " + path + ": " + requireError.message);
                        continue;
                    }
                }

                if (!wasmModule) {
                    throw new Error("Could not require WASM module from any path");
                }
            } else {
                // Fallback: assume module is already loaded globally
                if (typeof create_video_processor !== 'undefined') {
                    isWasmLoaded = true;
                    post("WASM functions found in global scope - no import needed");
                    return true;
                } else {
                    const error = new Error("WASM module not available and no import mechanism found");
                    throw error;
                }
            }
        }

        // Initialize the WASM module
        if (wasmInit) {
            await wasmInit();
            isWasmLoaded = true;
            post("WASM module initialized successfully");
            return true;
        } else {
            const error = new Error("WASM initialization function not found");
            throw error;
        }
    } catch (error) {
        post("Error loading WASM module: " + error.message);
        // Try alternative loading method for Max/MSP environment
        return tryAlternativeWasmLoad();
    }
}

// Alternative WASM loading for Max/MSP environment
function tryAlternativeWasmLoad() {
    try {
        // Check if WASM functions are already available globally
        if (typeof create_video_processor !== 'undefined') {
            isWasmLoaded = true;
            post("WASM module found in global scope");
            return true;
        }

        // Try to load via script tag or other mechanism
        post("Attempting to load WASM module via alternative method...");

        // This would be handled by the Max/MSP environment loading the script
        // For now, we'll assume it should be loaded externally
        return false;
    } catch (error) {
        post("Alternative WASM loading failed: " + error.message);
        return false;
    }
}

// Define external functions that WASM expects BEFORE loading the module
window.getAbletonTransportTime = function() {
    // Default implementation - returns 0 if no transport available
    try {
        if (abletonTransport && typeof abletonTransport.time !== 'undefined') {
            return abletonTransport.time;
        }

        // Fallback: use system time or Max/MSP transport
        if (typeof gettime !== 'undefined') {
            return gettime() / 1000.0; // Convert ms to seconds
        }

        // Last resort: use JavaScript Date
        return Date.now() / 1000.0;
    } catch (error) {
        post("Error getting transport time: " + error.message);
        return 0.0;
    }
};

window.sendMatrixToJitter = function(width, height, data) {
    try {
        // This function interfaces with Max/MSP Jitter
        // The data parameter contains the processed video frame as Uint8ClampedArray

        if (typeof outlet !== 'undefined') {
            // Send dimensions first
            outlet(0, "dim", width, height);

            // Send matrix data
            // Note: This is a simplified example - actual implementation may vary
            // depending on how Max/MSP Jitter expects the data
            outlet(1, "matrix", Array.from(data));
        }

        // Alternative: if using jit.matrix object directly
        if (jitterMatrix) {
            jitterMatrix.dim = [width, height];
            jitterMatrix.planecount = 4; // RGBA
            jitterMatrix.type = "char";

            // Copy data to matrix
            for (let i = 0; i < data.length; i++) {
                jitterMatrix.setcell2d(i % width, Math.floor(i / width), data[i]);
            }
        }

    } catch (error) {
        post("Error sending matrix to Jitter: " + error.message);
    }
};

window.getVideoFrameRate = function() {
    // This can be overridden to get frame rate from external source
    return videoProcessor ? videoProcessor.frame_rate : 25.0;
};

window.post = function(message) {
    // Max/MSP post function for console output
    if (typeof post !== 'undefined') {
        post(message);
    } else {
        console.log("WASM:", message);
    }
};

// Initialize the video processor
async function initVideoProcessor() {
    try {
        // First ensure WASM module is loaded
        if (!isWasmLoaded) {
            const wasmLoaded = await initWasmModule();
            if (!wasmLoaded) {
                post("Error: Failed to load WASM module");
                return false;
            }
        }

        // Create video processor instance
        if (wasmModule && wasmModule.create_video_processor) {
            videoProcessor = wasmModule.create_video_processor();
        } else if (typeof create_video_processor !== 'undefined') {
            videoProcessor = create_video_processor();
        } else {
            post("Error: create_video_processor function not available");
            return false;
        }

        if (videoProcessor) {
            post("Video processor initialized successfully");
            return true;
        } else {
            post("Error: Video processor creation returned null");
            return false;
        }
    } catch (error) {
        post("Error initializing video processor: " + error.message);
        return false;
    }
}

// Enhanced initialization function that can be called from Max/MSP
function initializeVideoSystem() {
    return initVideoProcessor().then(success => {
        if (success) {
            post("Video system initialization complete");
        } else {
            post("Video system initialization failed");
        }
        return success;
    }).catch(error => {
        post("Video system initialization error: " + error.message);
        return false;
    });
}

// Load MP4 video file with better error handling
function loadVideo(videoPath) {
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }

    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    try {
        videoProcessor.load_video(videoPath);

        // Set default dimensions (can be adjusted)
        videoProcessor.set_dimensions(640, 480);

        // Get video info after loading
        setTimeout(() => {
            try {
                const info = videoProcessor.get_video_info();
                post("Video loaded - Width: " + info[0] + ", Height: " + info[1] +
                    ", Duration: " + info[2] + "s, Frame Rate: " + info[3] + "fps");

                // Update processor dimensions based on actual video
                videoProcessor.set_dimensions(info[0], info[1]);
            } catch (e) {
                post("Could not get video info: " + e.message);
            }
        }, 1000);

        return true;
    } catch (error) {
        post("Error loading video: " + error.message);
        return false;
    }
}

// Set video frame rate
function setFrameRate(frameRate) {
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }
    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    try {
        videoProcessor.set_frame_rate(frameRate);
        post("Frame rate set to: " + frameRate + " fps");
        return true;
    } catch (error) {
        post("Error setting frame rate: " + error.message);
        return false;
    }
}

// Set green tint intensity (0.0 to 1.0)
function setGreenTintIntensity(intensity) {
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }
    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    try {
        videoProcessor.set_green_tint_intensity(intensity);
        post("Green tint intensity set to: " + intensity);
        return true;
    } catch (error) {
        post("Error setting green tint intensity: " + error.message);
        return false;
    }
}

// Start video processing loop
function startVideoProcessing(intervalMs = 33) { // ~30fps default
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }
    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    if (updateInterval) {
        clearInterval(updateInterval);
    }

    updateInterval = setInterval(() => {
        try {
            videoProcessor.update();
        } catch (error) {
            post("Error in video update: " + error.message);
        }
    }, intervalMs);

    post("Video processing started with " + intervalMs + "ms interval");
    return true;
}

// Stop video processing
function stopVideoProcessing() {
    if (updateInterval) {
        clearInterval(updateInterval);
        updateInterval = null;
        post("Video processing stopped");
    }
}

// Get current frame number based on transport
function getCurrentFrame() {
    if (!isWasmLoaded) {
        post("Warning: WASM module not loaded");
        return 0;
    }
    if (!videoProcessor) {
        post("Warning: Video processor not initialized");
        return 0;
    }

    try {
        return videoProcessor.get_current_frame_from_transport();
    } catch (error) {
        post("Error getting current frame: " + error.message);
        return 0;
    }
}

// Manual frame processing (call this from Max/MSP bang)
function processFrame() {
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }
    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    try {
        videoProcessor.process_and_send_frame();
        return true;
    } catch (error) {
        post("Error processing frame: " + error.message);
        return false;
    }
}

// Set video dimensions
function setVideoDimensions(width, height) {
    if (!isWasmLoaded) {
        post("Error: WASM module not loaded. Call initializeVideoSystem() first.");
        return false;
    }
    if (!videoProcessor) {
        post("Error: Video processor not initialized. Call initVideoProcessor() first.");
        return false;
    }

    try {
        videoProcessor.set_dimensions(width, height);
        post("Video dimensions set to: " + width + "x" + height);
        return true;
    } catch (error) {
        post("Error setting video dimensions: " + error.message);
        return false;
    }
}

// External functions that need to be implemented in Max/MSP context
// These will be called by the Rust WASM module

// Send matrix data to Jitter object
function sendMatrixToJitter(width, height, data) {
    try {
        // This function should be implemented to interface with Max/MSP Jitter
        // The data parameter contains the processed video frame as Uint8ClampedArray

        if (typeof outlet !== 'undefined') {
            // Send dimensions first
            outlet(0, "dim", width, height);

            // Send matrix data
            // Note: This is a simplified example - actual implementation may vary
            // depending on how Max/MSP Jitter expects the data
            outlet(1, "matrix", Array.from(data));
        }

        // Alternative: if using jit.matrix object directly
        if (jitterMatrix) {
            jitterMatrix.dim = [width, height];
            jitterMatrix.planecount = 4; // RGBA
            jitterMatrix.type = "char";

            // Copy data to matrix
            for (let i = 0; i < data.length; i++) {
                jitterMatrix.setcell2d(i % width, Math.floor(i / width), data[i]);
            }
        }

    } catch (error) {
        post("Error sending matrix to Jitter: " + error.message);
    }
}

// Get Ableton Live transport time
function getAbletonTransportTime() {
    try {
        // This should interface with Ableton Live's transport
        // Return time in seconds

        if (abletonTransport && typeof abletonTransport.time !== 'undefined') {
            return abletonTransport.time;
        }

        // Fallback: use system time or Max/MSP transport
        if (typeof gettime !== 'undefined') {
            return gettime() / 1000.0; // Convert ms to seconds
        }

        // Last resort: use JavaScript Date
        return Date.now() / 1000.0;

    } catch (error) {
        post("Error getting transport time: " + error.message);
        return 0.0;
    }
}

// Get video frame rate (if available from external source)
function getVideoFrameRate() {
    // This can be overridden to get frame rate from external source
    return videoProcessor ? videoProcessor.frame_rate : 25.0;
}

// Set Ableton transport reference
function setAbletonTransport(transport) {
    abletonTransport = transport;
    post("Ableton transport reference set");
}

// Set Jitter matrix reference
function setJitterMatrix(matrix) {
    jitterMatrix = matrix;
    post("Jitter matrix reference set");
}

// Utility functions for Max/MSP integration

// Bang handler for Max/MSP
function bang() {
    return processFrame();
}

// Message handler for video loading
function loadVideoMessage(path) {
    return loadVideo(path);
}

// Message handler for setting frame rate
function setFrameRateMessage(rate) {
    setFrameRate(parseFloat(rate));
}

// Message handler for setting green tint
function setGreenTintMessage(intensity) {
    setGreenTintIntensity(parseFloat(intensity));
}

// Message handler for setting dimensions
function setDimensionsMessage(width, height) {
    setVideoDimensions(parseInt(width), parseInt(height));
}

// Message handler for starting processing
function startMessage(interval) {
    const intervalMs = interval ? parseInt(interval) : 33;
    return startVideoProcessing(intervalMs);
}

// Message handler for stopping processing
function stopMessage() {
    stopVideoProcessing();
}

// Initialize on load
function init() {
    post("Kasm Video Integration loaded");

    // Use async initialization for proper WASM loading
    initializeVideoSystem().then(success => {
        if (success) {
            post("Video system ready for use");
        } else {
            post("Video system initialization failed - manual initialization may be required");
            post("Try calling initializeVideoSystem() manually");
        }
    }).catch(error => {
        post("Initialization error: " + error.message);
        post("Falling back to synchronous initialization attempt...");

        // Fallback: try synchronous initialization if async fails
        try {
            if (typeof create_video_processor !== 'undefined') {
                videoProcessor = create_video_processor();
                isWasmLoaded = true;
                post("Fallback initialization successful");
            } else {
                post("Manual initialization required - call initializeVideoSystem()");
            }
        } catch (fallbackError) {
            post("Fallback initialization also failed: " + fallbackError.message);
        }
    });

    return true; // Return immediately for Max/MSP compatibility
}

// Synchronous initialization function for Max/MSP compatibility
function initSync() {
    try {
        // Check if WASM functions are already available
        if (typeof create_video_processor !== 'undefined') {
            videoProcessor = create_video_processor();
            isWasmLoaded = true;
            post("Synchronous video processor initialization successful");
            return true;
        } else {
            post("WASM functions not available - async initialization required");
            return false;
        }
    } catch (error) {
        post("Synchronous initialization failed: " + error.message);
        return false;
    }
}

// Manual initialization function that can be called from Max/MSP messages
function manualInit() {
    post("Manual initialization requested...");

    // First try synchronous
    if (initSync()) {
        return true;
    }

    // Then try async
    initializeVideoSystem().then(success => {
        if (success) {
            post("Manual async initialization successful");
        } else {
            post("Manual initialization failed");
        }
    });

    return false;
}

// Export functions for Max/MSP
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        bang,
        loadVideoMessage,
        setFrameRateMessage,
        setGreenTintMessage,
        setDimensionsMessage,
        startMessage,
        stopMessage,
        setAbletonTransport,
        setJitterMatrix,
        getCurrentFrame,
        processFrame
    };
}

// Auto-initialize if in Max/MSP context
if (typeof post !== 'undefined') {
    init();
}
