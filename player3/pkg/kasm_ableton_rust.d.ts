/* tslint:disable */
/* eslint-disable */
/**
 * Initialize video processor with default settings
 */
export function create_video_processor(): VideoProcessor;
/**
 * Utility function to calculate frame number from time and frame rate
 */
export function time_to_frame(time_seconds: number, frame_rate: number): number;
/**
 * Utility function to calculate time from frame number and frame rate
 */
export function frame_to_time(frame_number: number, frame_rate: number): number;
/**
 * Kasm filmscore 1 - Morse Code repeater
 */
export function kasm_filmscore_1(note: number, offset: number, velocity: number, enc1_velocity_offset: number, enc2_intensity: number): number;
/**
 * Main function that is called on v8 bang - this example randomly selects one of the available Kasm MIDI pattern generators
 */
export function bang(inlet_0_note: number, inlet_1_semitone: number, inlet_2_velocity: number, inlet_3_enc1: number, inlet_4_enc2: number, inlet_5_filmscore_selector: number): number;
/**
 * Video processor struct to handle MP4 playback and filtering
 */
export class VideoProcessor {
  free(): void;
  /**
   * Create a new VideoProcessor instance
   */
  constructor();
  /**
   * Load an MP4 file from a URL or file path
   */
  load_video(video_url: string): void;
  /**
   * Set video dimensions
   */
  set_dimensions(width: number, height: number): void;
  /**
   * Set video frame rate
   */
  set_frame_rate(frame_rate: number): void;
  /**
   * Set green tint intensity (0.0 to 1.0)
   */
  set_green_tint_intensity(intensity: number): void;
  /**
   * Get the current frame based on Ableton transport time
   */
  get_current_frame_from_transport(): number;
  /**
   * Seek video to specific frame based on Ableton transport
   */
  sync_to_transport(): void;
  /**
   * Process current frame with green tint filter and send to Jitter
   */
  process_and_send_frame(): void;
  /**
   * Get video metadata
   */
  get_video_info(): Array<any>;
  /**
   * Start video processing loop (should be called from JavaScript setInterval)
   */
  update(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_videoprocessor_free: (a: number, b: number) => void;
  readonly videoprocessor_load_video: (a: number, b: number, c: number) => [number, number];
  readonly videoprocessor_set_dimensions: (a: number, b: number, c: number) => void;
  readonly videoprocessor_set_frame_rate: (a: number, b: number) => void;
  readonly videoprocessor_set_green_tint_intensity: (a: number, b: number) => void;
  readonly videoprocessor_get_current_frame_from_transport: (a: number) => number;
  readonly videoprocessor_sync_to_transport: (a: number) => [number, number];
  readonly videoprocessor_process_and_send_frame: (a: number) => [number, number];
  readonly videoprocessor_get_video_info: (a: number) => [number, number, number];
  readonly videoprocessor_update: (a: number) => [number, number];
  readonly create_video_processor: () => number;
  readonly time_to_frame: (a: number, b: number) => number;
  readonly frame_to_time: (a: number, b: number) => number;
  readonly videoprocessor_new: () => number;
  readonly kasm_filmscore_1: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly bang: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
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
