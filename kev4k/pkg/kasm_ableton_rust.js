let wasm;

let WASM_VECTOR_LEN = 0;

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_4.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
/**
 * Kasm emanator 1 - Morse Code repeater
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_velocity_offset
 * @param {number} enc2_intensity
 * @returns {number}
 */
export function kasm_emanator_1(note, offset, velocity, enc1_velocity_offset, enc2_intensity) {
    const ret = wasm.kasm_emanator_1(note, offset, velocity, enc1_velocity_offset, enc2_intensity);
    return ret;
}

/**
 * Kasm Emanator 2 - strummed cascading glissando (enc_1 changes how fast we strum)
 * @param {number} note
 * @param {number} offset
 * @param {number} inlet_2_velocity
 * @param {number} intensity
 * @param {number} stereo_spread
 * @returns {number}
 */
export function kasm_emanator_2(note, offset, inlet_2_velocity, intensity, stereo_spread) {
    const ret = wasm.kasm_emanator_2(note, offset, inlet_2_velocity, intensity, stereo_spread);
    return ret;
}

/**
 * Kasm Emanator 3 - classic chord progression cascade
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} inlet_2_velocity
 * @param {number} progression_id
 * @param {number} progression_speed
 * @returns {number}
 */
export function kasm_emanator_3(note, semitone_offset, inlet_2_velocity, progression_id, progression_speed) {
    const ret = wasm.kasm_emanator_3(note, semitone_offset, inlet_2_velocity, progression_id, progression_speed);
    return ret;
}

/**
 * Kasm emanator 4 - Swarming spirals with Fibonacci timing and golden ratio velocity modulation
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_rate
 * @returns {number}
 */
export function kasm_emanator_4(note, semitone_offset, velocity, enc1_intensity, enc2_rate) {
    const ret = wasm.kasm_emanator_4(note, semitone_offset, velocity, enc1_intensity, enc2_rate);
    return ret;
}

/**
 * Kasm Emanator 5 - Fractal mathematics, L-systems, strange attractors, and chaos theory
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} intensity
 * @param {number} complexity
 * @returns {number}
 */
export function kasm_emanator_5(note, semitone_offset, velocity, intensity, complexity) {
    const ret = wasm.kasm_emanator_5(note, semitone_offset, velocity, intensity, complexity);
    return ret;
}

/**
 * Kasm Emanator 6 - Harmonic Series Resonance (echoes based on harmonic series)
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} intensity
 * @param {number} compexity
 * @returns {number}
 */
export function kasm_emanator_6(note, offset, velocity, intensity, compexity) {
    const ret = wasm.kasm_emanator_6(note, offset, velocity, intensity, compexity);
    return ret;
}

/**
 * Kasm Emanator 7 - Phone Ringtone Tune with micro-timing and velocity humanization
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} complexity
 * @param {number} humanize
 * @returns {number}
 */
export function kasm_emanator_7(note, semitone_offset, velocity, complexity, humanize) {
    const ret = wasm.kasm_emanator_7(note, semitone_offset, velocity, complexity, humanize);
    return ret;
}

/**
 * Kasm Emanator 8 - Trigonometric Wave Interference
 * Creates melodic patterns based on sine wave interference and circular trigonometry
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} complexity
 * @param {number} humanize
 * @returns {number}
 */
export function kasm_emanator_8(note, semitone_offset, velocity, complexity, humanize) {
    const ret = wasm.kasm_emanator_8(note, semitone_offset, velocity, complexity, humanize);
    return ret;
}

/**
 * Kasm Emanator 9 - Complex Reflection Algorithm
 * Uses geometric reflection and fractal mathematics for evolving melodic patterns
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} complexity
 * @param {number} humanize
 * @returns {number}
 */
export function kasm_emanator_9(note, semitone_offset, velocity, complexity, humanize) {
    const ret = wasm.kasm_emanator_9(note, semitone_offset, velocity, complexity, humanize);
    return ret;
}

/**
 * Kasm Emanator 10 - Swarm/boids algorithms, fluid dynamics, and cellular automata for complex musical swarms
 * @param {number} note
 * @param {number} semitone_offset
 * @param {number} velocity
 * @param {number} complexity
 * @param {number} humanize
 * @returns {number}
 */
export function kasm_emanator_10(note, semitone_offset, velocity, complexity, humanize) {
    const ret = wasm.kasm_emanator_10(note, semitone_offset, velocity, complexity, humanize);
    return ret;
}

/**
 * Kasm Emanator 11 - Fibonacci Spiral Echos (sequence timing with golden ratio velocity decay)
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_velocity_offset
 * @param {number} intensity
 * @returns {number}
 */
export function kasm_emanator_11(note, offset, velocity, enc1_velocity_offset, intensity) {
    const ret = wasm.kasm_emanator_11(note, offset, velocity, enc1_velocity_offset, intensity);
    return ret;
}

/**
 * Kasm Emanator 12 - Fractal cascade/echo patterns at different time scales
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_12(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_12(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 13 - Simple first-order Markov chain with basic note transitions
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_13(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_13(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 14 - Second-Order Markov Chain with Rhythm Patterns
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_14(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_14(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 15 - Multi-Dimensional Markov Chain with Harmonic Context
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_15(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_15(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 16 - Simple Chord Progression
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_16(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_16(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 17 - Extended Chord Progression with Inversions
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_17(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_17(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 18 - Complex Chord Progression with Extensions and Rhythmic Variations
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_18(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_18(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 19 - Elaborate Melodic Algorithm with Dynamic Panning
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_19(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_19(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Kasm Emanator 20 - Advanced Melodic Algorithm with Rhythmic Variations and Panning
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} enc1_intensity
 * @param {number} enc2_complexity
 * @returns {number}
 */
export function kasm_emanator_20(note, offset, velocity, enc1_intensity, enc2_complexity) {
    const ret = wasm.kasm_emanator_20(note, offset, velocity, enc1_intensity, enc2_complexity);
    return ret;
}

/**
 * Generate Fibonacci-based counterpoint harmony
 * Example 1: Simple Fibonacci intervals - creates ascending perfect fourths and fifths
 * @param {number} base_note
 * @param {number} velocity
 * @returns {number}
 */
export function kasm_emanator_fibonacci_harmony(base_note, velocity) {
    const ret = wasm.kasm_emanator_fibonacci_harmony(base_note, velocity);
    return ret;
}

/**
 * Generate Markov chain-based counterpoint harmony
 * Example 2: Probabilistic note selection based on previous note history
 * @param {number} base_note
 * @param {number} velocity
 * @returns {number}
 */
export function kasm_emanator_markov_harmony(base_note, velocity) {
    const ret = wasm.kasm_emanator_markov_harmony(base_note, velocity);
    return ret;
}

/**
 * Generate fractal-based counterpoint harmony using Cantor set
 * Example 3: Self-similar patterns at different octave levels
 * @param {number} base_note
 * @param {number} velocity
 * @returns {number}
 */
export function kasm_emanator_fractal_harmony(base_note, velocity) {
    const ret = wasm.kasm_emanator_fractal_harmony(base_note, velocity);
    return ret;
}

/**
 * Generate prime number-based counterpoint harmony
 * Example 4: Using prime sequences for mathematically pure intervals
 * @param {number} base_note
 * @param {number} velocity
 * @returns {number}
 */
export function kasm_emanator_prime_harmony(base_note, velocity) {
    const ret = wasm.kasm_emanator_prime_harmony(base_note, velocity);
    return ret;
}

/**
 * Generate golden ratio-based counterpoint harmony
 * Example 5: Most sophisticated - uses φ (phi) for organic, naturally pleasing intervals
 * @param {number} base_note
 * @param {number} velocity
 * @returns {number}
 */
export function kasm_emanator_golden_ratio_harmony(base_note, velocity) {
    const ret = wasm.kasm_emanator_golden_ratio_harmony(base_note, velocity);
    return ret;
}

/**
 * Reset all mathematical harmony states
 */
export function kasm_looper_reset_harmony_states() {
    wasm.kasm_looper_reset_harmony_states();
}

/**
 * Generate a single ghost arpeggio note based on current harmonic context
 * Call repeatedly to get continuous arpeggio until key changes
 * @param {number} input_note
 * @param {number} velocity
 * @param {number} enc1_pattern_selector
 * @param {number} enc2_intensity
 * @returns {number}
 */
export function kasm_ghost_arpeggio_generate(input_note, velocity, enc1_pattern_selector, enc2_intensity) {
    const ret = wasm.kasm_ghost_arpeggio_generate(input_note, velocity, enc1_pattern_selector, enc2_intensity);
    return ret;
}

/**
 * Reset the ghost arpeggiator state
 */
export function kasm_ghost_arpeggio_reset() {
    wasm.kasm_ghost_arpeggio_reset();
}

/**
 * Set arpeggiator parameters
 * @param {number} octave_range
 * @param {number} direction
 */
export function kasm_ghost_arpeggio_set_params(octave_range, direction) {
    wasm.kasm_ghost_arpeggio_set_params(octave_range, direction);
}

/**
 * Get current arpeggiator state for debugging
 * @returns {string}
 */
export function kasm_ghost_arpeggio_get_state() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.kasm_ghost_arpeggio_get_state();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
 * Create mathematical arpeggio patterns using ArpeggioPattern
 * @param {number} pattern_type
 * @param {number} octave_spread
 * @param {Int32Array} base_notes
 * @returns {number}
 */
export function kasm_ghost_arpeggio_create_mathematical_pattern(pattern_type, octave_spread, base_notes) {
    const ptr0 = passArray32ToWasm0(base_notes, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.kasm_ghost_arpeggio_create_mathematical_pattern(pattern_type, octave_spread, ptr0, len0);
    return ret;
}

/**
 * Generate notes using mathematical transformations from stored patterns
 * @param {number} pattern_index
 * @param {number} base_note
 * @param {number} velocity
 * @param {number} step_offset
 * @returns {number}
 */
export function kasm_ghost_arpeggio_generate_mathematical(pattern_index, base_note, velocity, step_offset) {
    const ret = wasm.kasm_ghost_arpeggio_generate_mathematical(pattern_index, base_note, velocity, step_offset);
    return ret;
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
/**
 * Generate harmonic series using mathematical patterns
 * @param {number} pattern_index
 * @param {number} fundamental
 * @param {number} step
 * @returns {Int32Array}
 */
export function kasm_ghost_arpeggio_generate_harmonics(pattern_index, fundamental, step) {
    const ret = wasm.kasm_ghost_arpeggio_generate_harmonics(pattern_index, fundamental, step);
    var v1 = getArrayI32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

/**
 * Generate frequency modulated notes (returns MIDI note numbers)
 * @param {number} pattern_index
 * @param {number} carrier_note
 * @param {number} step
 * @returns {number}
 */
export function kasm_ghost_arpeggio_generate_fm(pattern_index, carrier_note, step) {
    const ret = wasm.kasm_ghost_arpeggio_generate_fm(pattern_index, carrier_note, step);
    return ret;
}

/**
 * Kasm triggaz pattern detector - detects musical patterns and triggers completions
 * @param {number} note
 * @param {number} offset
 * @param {number} velocity
 * @param {number} _enc1_sensitivity
 * @param {number} _enc2_trigger_threshold
 * @param {number} _inlet_5
 * @returns {number}
 */
export function kasm_triggaz_detect_pattern(note, offset, velocity, _enc1_sensitivity, _enc2_trigger_threshold, _inlet_5) {
    const ret = wasm.kasm_triggaz_detect_pattern(note, offset, velocity, _enc1_sensitivity, _enc2_trigger_threshold, _inlet_5);
    return ret;
}

/**
 * Get debug info about the sequences and dynamic split
 * @returns {string}
 */
export function kasm_triggaz_get_debug_info() {
    let deferred1_0;
    let deferred1_1;
    try {
        const ret = wasm.kasm_triggaz_get_debug_info();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Main function that is called on v8 bang - this example randomly selects one of the available Kasm MIDI pattern generators
 * @param {number} inlet_0_note
 * @param {number} inlet_1_semitone
 * @param {number} inlet_2_velocity
 * @param {number} inlet_3_enc1
 * @param {number} inlet_4_enc2
 * @param {number} inlet_5_selector
 * @returns {number}
 */
export function bang(inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector) {
    const ret = wasm.bang(inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector);
    return ret;
}

/**
 * Metronome function that provides 120 BPM timing (500ms intervals)
 * This is the master time reference for the entire system
 * @returns {bigint}
 */
export function metro() {
    const ret = wasm.metro();
    return BigInt.asUintN(64, ret);
}

/**
 * @param {number} bpm
 * @returns {number}
 */
export function kasm_metronone(bpm) {
    const ret = wasm.kasm_metronone(bpm);
    return ret;
}

/**
 * kasm_get_notes - returns a Ableton MIDI Generator array of Note data JS object
 * @param {number} rate_ms
 * @param {number} inlet_0_note
 * @param {number} inlet_1_semitone
 * @param {number} inlet_2_velocity
 * @param {number} inlet_3_enc1
 * @param {number} inlet_4_enc2
 * @param {number} inlet_5_selector
 * @returns {any}
 */
export function kasm_get_notes(rate_ms, inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector) {
    const ret = wasm.kasm_get_notes(rate_ms, inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector);
    return ret;
}

/**
 * kasm_transform_notes - transforms existing Notes JSON object using kasm_get_notes algorithm
 * Takes a Notes JSON object as input and applies the kasm algorithm to transform the note data
 * @param {any} input_notes_json
 * @param {number} rate_ms
 * @param {number} inlet_0_note
 * @param {number} inlet_1_semitone
 * @param {number} inlet_2_velocity
 * @param {number} inlet_3_enc1
 * @param {number} inlet_4_enc2
 * @param {number} inlet_5_selector
 * @returns {any}
 */
export function kasm_transform_notes(input_notes_json, rate_ms, inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector) {
    const ret = wasm.kasm_transform_notes(input_notes_json, rate_ms, inlet_0_note, inlet_1_semitone, inlet_2_velocity, inlet_3_enc1, inlet_4_enc2, inlet_5_selector);
    return ret;
}

/**
 * Kasm kasm_krumhansl_detect_key - Detects musical key being played and the last chord played
 * @param {number} note
 * @param {number} offset
 * @param {number} _velocity
 * @param {number} _enc1_velocity_offset
 * @param {number} enc2_intensity
 * @param {number} _inlet_5
 * @returns {number}
 */
export function kasm_krumhansl_detect_key(note, offset, _velocity, _enc1_velocity_offset, enc2_intensity, _inlet_5) {
    const ret = wasm.kasm_krumhansl_detect_key(note, offset, _velocity, _enc1_velocity_offset, enc2_intensity, _inlet_5);
    return ret;
}

/**
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @returns {number}
 */
export function kasm_midi_note_offset(inlet_0, inlet_1, inlet_2) {
    const ret = wasm.kasm_midi_note_offset(inlet_0, inlet_1, inlet_2);
    return ret;
}

/**
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @returns {number}
 */
export function kasm_midi_note_octave_hit(inlet_0, inlet_1, inlet_2) {
    const ret = wasm.kasm_midi_note_octave_hit(inlet_0, inlet_1, inlet_2);
    return ret;
}

/**
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @returns {number}
 */
export function kasm_midi_note_octave_strummed(inlet_0, inlet_1, inlet_2) {
    const ret = wasm.kasm_midi_note_octave_strummed(inlet_0, inlet_1, inlet_2);
    return ret;
}

/**
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @returns {number}
 */
export function kasm_midi_note_octave_arp(inlet_0, inlet_1, inlet_2) {
    const ret = wasm.kasm_midi_note_octave_arp(inlet_0, inlet_1, inlet_2);
    return ret;
}

/**
 * Enhanced version with configurable delays for more complex strumming patterns
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @param {number} strum_delay
 * @returns {number}
 */
export function kasm_midi_note_weird_strum(inlet_0, inlet_1, inlet_2, strum_delay) {
    const ret = wasm.kasm_midi_note_weird_strum(inlet_0, inlet_1, inlet_2, strum_delay);
    return ret;
}

/**
 * Ripple effect with exponential delay spacing
 * @param {number} inlet_0
 * @param {number} inlet_1
 * @param {number} inlet_2
 * @param {number} base_delay
 * @returns {number}
 */
export function kasm_midi_note_ripple(inlet_0, inlet_1, inlet_2, base_delay) {
    const ret = wasm.kasm_midi_note_ripple(inlet_0, inlet_1, inlet_2, base_delay);
    return ret;
}

/**
 * Elaborate rendition of a familiar nursery rhyme with rich dynamics and harmonies
 * @param {number} inlet_0
 * @param {number} inlet_1_semitone_offset
 * @param {number} inlet_2_velocity
 * @param {number} enc1_progression_speed
 * @param {number} inlet_4_enc2
 * @returns {number}
 */
export function kasm_playout_nursery_rhyme_sequence(inlet_0, inlet_1_semitone_offset, inlet_2_velocity, enc1_progression_speed, inlet_4_enc2) {
    const ret = wasm.kasm_playout_nursery_rhyme_sequence(inlet_0, inlet_1_semitone_offset, inlet_2_velocity, enc1_progression_speed, inlet_4_enc2);
    return ret;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_String_8f0eb39a4a4c2f66 = function(arg0, arg1) {
        const ret = String(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
        const ret = arg0.buffer;
        return ret;
    };
    imports.wbg.__wbg_call_672a4d21634d4a24 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_done_769e5ede4b31c67b = function(arg0) {
        const ret = arg0.done;
        return ret;
    };
    imports.wbg.__wbg_entries_3265d4158b33e5dc = function(arg0) {
        const ret = Object.entries(arg0);
        return ret;
    };
    imports.wbg.__wbg_get_67b2ba62fc30de12 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    };
    imports.wbg.__wbg_getwithrefkey_1dc361bd10053bfe = function(arg0, arg1) {
        const ret = arg0[arg1];
        return ret;
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Map_f3469ce2244d2430 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Map;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_isArray_a1eab7e0d067391b = function(arg0) {
        const ret = Array.isArray(arg0);
        return ret;
    };
    imports.wbg.__wbg_isSafeInteger_343e2beeeece1bb0 = function(arg0) {
        const ret = Number.isSafeInteger(arg0);
        return ret;
    };
    imports.wbg.__wbg_iterator_9a24c88df860dc65 = function() {
        const ret = Symbol.iterator;
        return ret;
    };
    imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
        const ret = arg0.length;
        return ret;
    };
    imports.wbg.__wbg_new_405e22f390576ce2 = function() {
        const ret = new Object();
        return ret;
    };
    imports.wbg.__wbg_new_78feb108b6472713 = function() {
        const ret = new Array();
        return ret;
    };
    imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    };
    imports.wbg.__wbg_next_25feadfc0913fea9 = function(arg0) {
        const ret = arg0.next;
        return ret;
    };
    imports.wbg.__wbg_next_6574e1a8a62d1055 = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_outlet_5ed60edbb924e29f = function(arg0, arg1, arg2, arg3) {
        outlet(arg0, arg1, arg2, arg3);
    };
    imports.wbg.__wbg_outletmessage_97af4c0717ce7e68 = function(arg0, arg1, arg2) {
        outlet_message(arg0, getStringFromWasm0(arg1, arg2));
    };
    imports.wbg.__wbg_post_d572083291db089b = function(arg0, arg1) {
        post(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_set_37837023f3d740e8 = function(arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    };
    imports.wbg.__wbg_set_3f1d0b984ed272ed = function(arg0, arg1, arg2) {
        arg0[arg1] = arg2;
    };
    imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    };
    imports.wbg.__wbg_value_cd1ffa7b1ab794f1 = function(arg0) {
        const ret = arg0.value;
        return ret;
    };
    imports.wbg.__wbindgen_as_number = function(arg0) {
        const ret = +arg0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_i64 = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_from_u64 = function(arg0) {
        const ret = BigInt.asUintN(64, arg0);
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = arg0;
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = arg0 in arg1;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_4;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_is_bigint = function(arg0) {
        const ret = typeof(arg0) === 'bigint';
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = arg0 == arg1;
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('kasm_ableton_rust_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
