/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export const __wbg_videoprocessor_free: (a: number, b: number) => void;
export const videoprocessor_load_video: (a: number, b: number, c: number) => [number, number];
export const videoprocessor_set_dimensions: (a: number, b: number, c: number) => void;
export const videoprocessor_set_frame_rate: (a: number, b: number) => void;
export const videoprocessor_set_green_tint_intensity: (a: number, b: number) => void;
export const videoprocessor_get_current_frame_from_transport: (a: number) => number;
export const videoprocessor_sync_to_transport: (a: number) => [number, number];
export const videoprocessor_process_and_send_frame: (a: number) => [number, number];
export const videoprocessor_get_video_info: (a: number) => [number, number, number];
export const videoprocessor_update: (a: number) => [number, number];
export const create_video_processor: () => number;
export const time_to_frame: (a: number, b: number) => number;
export const frame_to_time: (a: number, b: number) => number;
export const videoprocessor_new: () => number;
export const kasm_filmscore_1: (a: number, b: number, c: number, d: number, e: number) => number;
export const bang: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
export const __wbindgen_exn_store: (a: number) => void;
export const __externref_table_alloc: () => number;
export const __wbindgen_export_2: WebAssembly.Table;
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
export const __externref_table_dealloc: (a: number) => void;
export const __wbindgen_start: () => void;
