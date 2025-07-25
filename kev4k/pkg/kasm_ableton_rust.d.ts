/* tslint:disable */
/* eslint-disable */
/**
 * Kasm emanator 1 - Morse Code repeater
 */
export function kasm_emanator_1(note: number, offset: number, velocity: number, enc1_velocity_offset: number, enc2_intensity: number): number;
/**
 * Kasm Emanator 2 - strummed cascading glissando (enc_1 changes how fast we strum)
 */
export function kasm_emanator_2(note: number, offset: number, inlet_2_velocity: number, intensity: number, stereo_spread: number): number;
/**
 * Kasm Emanator 3 - classic chord progression cascade
 */
export function kasm_emanator_3(note: number, semitone_offset: number, inlet_2_velocity: number, progression_id: number, progression_speed: number): number;
/**
 * Kasm emanator 4 - Swarming spirals with Fibonacci timing and golden ratio velocity modulation
 */
export function kasm_emanator_4(note: number, semitone_offset: number, velocity: number, enc1_intensity: number, enc2_rate: number): number;
/**
 * Kasm Emanator 5 - Fractal mathematics, L-systems, strange attractors, and chaos theory
 */
export function kasm_emanator_5(note: number, semitone_offset: number, velocity: number, intensity: number, complexity: number): number;
/**
 * Kasm Emanator 6 - Harmonic Series Resonance (echoes based on harmonic series)
 */
export function kasm_emanator_6(note: number, offset: number, velocity: number, intensity: number, compexity: number): number;
/**
 * Kasm Emanator 7 - Phone Ringtone Tune with micro-timing and velocity humanization
 */
export function kasm_emanator_7(note: number, semitone_offset: number, velocity: number, complexity: number, humanize: number): number;
/**
 * Kasm Emanator 8 - Trigonometric Wave Interference
 * Creates melodic patterns based on sine wave interference and circular trigonometry
 */
export function kasm_emanator_8(note: number, semitone_offset: number, velocity: number, complexity: number, humanize: number): number;
/**
 * Kasm Emanator 9 - Complex Reflection Algorithm
 * Uses geometric reflection and fractal mathematics for evolving melodic patterns
 */
export function kasm_emanator_9(note: number, semitone_offset: number, velocity: number, complexity: number, humanize: number): number;
/**
 * Kasm Emanator 10 - Swarm/boids algorithms, fluid dynamics, and cellular automata for complex musical swarms
 */
export function kasm_emanator_10(note: number, semitone_offset: number, velocity: number, complexity: number, humanize: number): number;
/**
 * Kasm Emanator 11 - Fibonacci Spiral Echos (sequence timing with golden ratio velocity decay)
 */
export function kasm_emanator_11(note: number, offset: number, velocity: number, enc1_velocity_offset: number, intensity: number): number;
/**
 * Kasm Emanator 12 - Fractal cascade/echo patterns at different time scales
 */
export function kasm_emanator_12(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 13 - Simple first-order Markov chain with basic note transitions
 */
export function kasm_emanator_13(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 14 - Second-Order Markov Chain with Rhythm Patterns
 */
export function kasm_emanator_14(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 15 - Multi-Dimensional Markov Chain with Harmonic Context
 */
export function kasm_emanator_15(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 16 - Simple Chord Progression
 */
export function kasm_emanator_16(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 17 - Extended Chord Progression with Inversions
 */
export function kasm_emanator_17(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 18 - Complex Chord Progression with Extensions and Rhythmic Variations
 */
export function kasm_emanator_18(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 19 - Elaborate Melodic Algorithm with Dynamic Panning
 */
export function kasm_emanator_19(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Kasm Emanator 20 - Advanced Melodic Algorithm with Rhythmic Variations and Panning
 */
export function kasm_emanator_20(note: number, offset: number, velocity: number, enc1_intensity: number, enc2_complexity: number): number;
/**
 * Generate Fibonacci-based counterpoint harmony
 * Example 1: Simple Fibonacci intervals - creates ascending perfect fourths and fifths
 */
export function kasm_emanator_fibonacci_harmony(base_note: number, velocity: number): number;
/**
 * Generate Markov chain-based counterpoint harmony
 * Example 2: Probabilistic note selection based on previous note history
 */
export function kasm_emanator_markov_harmony(base_note: number, velocity: number): number;
/**
 * Generate fractal-based counterpoint harmony using Cantor set
 * Example 3: Self-similar patterns at different octave levels
 */
export function kasm_emanator_fractal_harmony(base_note: number, velocity: number): number;
/**
 * Generate prime number-based counterpoint harmony
 * Example 4: Using prime sequences for mathematically pure intervals
 */
export function kasm_emanator_prime_harmony(base_note: number, velocity: number): number;
/**
 * Generate golden ratio-based counterpoint harmony
 * Example 5: Most sophisticated - uses φ (phi) for organic, naturally pleasing intervals
 */
export function kasm_emanator_golden_ratio_harmony(base_note: number, velocity: number): number;
/**
 * Reset all mathematical harmony states
 */
export function kasm_looper_reset_harmony_states(): void;
/**
 * Generate a single ghost arpeggio note based on current harmonic context
 * Call repeatedly to get continuous arpeggio until key changes
 */
export function kasm_ghost_arpeggio_generate(input_note: number, velocity: number, enc1_pattern_selector: number, enc2_intensity: number): number;
/**
 * Reset the ghost arpeggiator state
 */
export function kasm_ghost_arpeggio_reset(): void;
/**
 * Set arpeggiator parameters
 */
export function kasm_ghost_arpeggio_set_params(octave_range: number, direction: number): void;
/**
 * Get current arpeggiator state for debugging
 */
export function kasm_ghost_arpeggio_get_state(): string;
/**
 * Create mathematical arpeggio patterns using ArpeggioPattern
 */
export function kasm_ghost_arpeggio_create_mathematical_pattern(pattern_type: number, octave_spread: number, base_notes: Int32Array): number;
/**
 * Generate notes using mathematical transformations from stored patterns
 */
export function kasm_ghost_arpeggio_generate_mathematical(pattern_index: number, base_note: number, velocity: number, step_offset: number): number;
/**
 * Generate harmonic series using mathematical patterns
 */
export function kasm_ghost_arpeggio_generate_harmonics(pattern_index: number, fundamental: number, step: number): Int32Array;
/**
 * Generate frequency modulated notes (returns MIDI note numbers)
 */
export function kasm_ghost_arpeggio_generate_fm(pattern_index: number, carrier_note: number, step: number): number;
/**
 * Kasm triggaz pattern detector - detects musical patterns and triggers completions
 */
export function kasm_triggaz_detect_pattern(note: number, offset: number, velocity: number, _enc1_sensitivity: number, _enc2_trigger_threshold: number, _inlet_5: number): number;
/**
 * Get debug info about the sequences and dynamic split
 */
export function kasm_triggaz_get_debug_info(): string;
/**
 * Main function that is called on v8 bang - this example randomly selects one of the available Kasm MIDI pattern generators
 */
export function bang(inlet_0_note: number, inlet_1_semitone: number, inlet_2_velocity: number, inlet_3_enc1: number, inlet_4_enc2: number, inlet_5_selector: number): number;
/**
 * Metronome function that provides 120 BPM timing (500ms intervals)
 * This is the master time reference for the entire system
 */
export function metro(): bigint;
export function kasm_metronone(bpm: number): number;
/**
 * kasm_get_notes - returns a Ableton MIDI Generator array of Note data JS object
 */
export function kasm_get_notes(rate_ms: number, inlet_0_note: number, inlet_1_semitone: number, inlet_2_velocity: number, inlet_3_enc1: number, inlet_4_enc2: number, inlet_5_selector: number): any;
/**
 * kasm_transform_notes - transforms existing Notes JSON object using kasm_get_notes algorithm
 * Takes a Notes JSON object as input and applies the kasm algorithm to transform the note data
 */
export function kasm_transform_notes(input_notes_json: any, rate_ms: number, inlet_0_note: number, inlet_1_semitone: number, inlet_2_velocity: number, inlet_3_enc1: number, inlet_4_enc2: number, inlet_5_selector: number): any;
/**
 * Kasm kasm_krumhansl_detect_key - Detects musical key being played and the last chord played
 */
export function kasm_krumhansl_detect_key(note: number, offset: number, _velocity: number, _enc1_velocity_offset: number, enc2_intensity: number, _inlet_5: number): number;
export function kasm_midi_note_offset(inlet_0: number, inlet_1: number, inlet_2: number): number;
export function kasm_midi_note_octave_hit(inlet_0: number, inlet_1: number, inlet_2: number): number;
export function kasm_midi_note_octave_strummed(inlet_0: number, inlet_1: number, inlet_2: number): number;
export function kasm_midi_note_octave_arp(inlet_0: number, inlet_1: number, inlet_2: number): number;
/**
 * Enhanced version with configurable delays for more complex strumming patterns
 */
export function kasm_midi_note_weird_strum(inlet_0: number, inlet_1: number, inlet_2: number, strum_delay: number): number;
/**
 * Ripple effect with exponential delay spacing
 */
export function kasm_midi_note_ripple(inlet_0: number, inlet_1: number, inlet_2: number, base_delay: number): number;
/**
 * Elaborate rendition of a familiar nursery rhyme with rich dynamics and harmonies
 */
export function kasm_playout_nursery_rhyme_sequence(inlet_0: number, inlet_1_semitone_offset: number, inlet_2_velocity: number, enc1_progression_speed: number, inlet_4_enc2: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly kasm_emanator_1: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_2: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_3: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_4: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_5: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_6: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_7: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_8: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_9: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_10: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_11: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_12: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_13: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_14: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_15: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_16: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_17: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_18: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_19: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_20: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly kasm_emanator_fibonacci_harmony: (a: number, b: number) => number;
  readonly kasm_emanator_markov_harmony: (a: number, b: number) => number;
  readonly kasm_emanator_fractal_harmony: (a: number, b: number) => number;
  readonly kasm_emanator_prime_harmony: (a: number, b: number) => number;
  readonly kasm_emanator_golden_ratio_harmony: (a: number, b: number) => number;
  readonly kasm_looper_reset_harmony_states: () => void;
  readonly kasm_ghost_arpeggio_generate: (a: number, b: number, c: number, d: number) => number;
  readonly kasm_ghost_arpeggio_reset: () => void;
  readonly kasm_ghost_arpeggio_set_params: (a: number, b: number) => void;
  readonly kasm_ghost_arpeggio_get_state: () => [number, number];
  readonly kasm_ghost_arpeggio_create_mathematical_pattern: (a: number, b: number, c: number, d: number) => number;
  readonly kasm_ghost_arpeggio_generate_mathematical: (a: number, b: number, c: number, d: number) => number;
  readonly kasm_ghost_arpeggio_generate_harmonics: (a: number, b: number, c: number) => [number, number];
  readonly kasm_ghost_arpeggio_generate_fm: (a: number, b: number, c: number) => number;
  readonly kasm_triggaz_detect_pattern: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly kasm_triggaz_get_debug_info: () => [number, number];
  readonly bang: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly metro: () => bigint;
  readonly kasm_metronone: (a: number) => number;
  readonly kasm_get_notes: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
  readonly kasm_transform_notes: (a: any, b: number, c: number, d: number, e: number, f: number, g: number, h: number) => any;
  readonly kasm_krumhansl_detect_key: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly kasm_midi_note_offset: (a: number, b: number, c: number) => number;
  readonly kasm_midi_note_octave_hit: (a: number, b: number, c: number) => number;
  readonly kasm_midi_note_octave_strummed: (a: number, b: number, c: number) => number;
  readonly kasm_midi_note_octave_arp: (a: number, b: number, c: number) => number;
  readonly kasm_midi_note_weird_strum: (a: number, b: number, c: number, d: number) => number;
  readonly kasm_midi_note_ripple: (a: number, b: number, c: number, d: number) => number;
  readonly kasm_playout_nursery_rhyme_sequence: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_4: WebAssembly.Table;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
