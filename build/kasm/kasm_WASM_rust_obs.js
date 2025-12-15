// Rust code in Ableton Live!
// The complete source code and build/test tools for this Rust/WebAssembly Ableton device project can be downloaded from:

// Go build similar instruments like this using Kasm Rust WASM SDK here:
//     https://pyrmontbrewery.com/get_kasm

// Version: 1.18.2

// Gist of what you'll find in the Rust code that is compiled as part of this JavaScript file

// pub fn kasm_midi_note_offset(inlet_0: i32, inlet_1: i32) -> i32 {
//     let result = inlet_0 + inlet_1;
//     // Clamp the result to valid MIDI note range (0-127)
//     let clamped_result = result.max(0).min(127);
//
//     // Use the helper function for cleaner code
//     send_note(clamped_result, 127, 0, 500, -1);
//     ...
//
// pub fn kasm_midi_note_octave_strummed(inlet_0: i32, inlet_1: i32) -> i32 {
//     let result = inlet_0 + inlet_1 + 12;
//     // Clamp the result to valid MIDI note range (0-127)
//     let clamped_result = result.max(0).min(127);
//
//     // Use helper function for cleaner strumming pattern
//     send_note(clamped_result + 3, 70, 0, 300, -1);      // First note immediately
//     send_note(clamped_result + 7, 100, 50, 300, -1);    // Second note after 50ms
//     send_note(clamped_result + 12, 90, 100, 300, -1);   // Third note after 100ms
//     ...
//
// pub fn kasm_emanator_bangaz_2(
//     _inlet_0_note: i32,
//     _inlet_1_semitone: i32,
//     velocity: i32,
//     enc1: i32,
//     enc2: i32,
//     step: i32,
//     bar: i32,
// ) -> i32 {
//     // Apply human realism effects
//     apply_human_realism(step, bar, velocity);
//
//     // enc1 modulation: modify step intervals based on enc1
//     let kick_interval = enc1_modify_step_interval(3, enc1);
//     let snare_interval = enc1_modify_step_interval(5, enc1);
//     let hh_accent_interval = enc1_modify_step_interval(7, enc1);
//
//     // Kick: every 3 steps (triplet feel) - modified by enc1
//     if step % kick_interval == 0 && !enc1_should_skip(enc1, step, bar, 0.9) {
//         let vel = enc1_modify_velocity(velocity_humanize(step, bar, velocity), enc1, step);
//         let delay = timing_humanize(step, bar);
//         send_note(get_drum_note(DrumType::Kick), vel, delay, 100, 40);
//
//         // Dense mode: add ghost kick
//         if enc1_should_add_extra(enc1, step, bar, 0.4) {
//             send_note(get_drum_note(DrumType::Kick), enc1_ghost_velocity(enc1, step), delay + 15, 80, 50);
//         }
//     }
//     // Snare: every 5 steps (cross-rhythm) - modified by enc1
//     if step % snare_interval == 2 && hit_probability(step, bar, 1.0) > 0.0 && !enc1_should_skip(enc1, step, bar, 0.85) {
//         let vel = enc1_modify_velocity(velocity_humanize(step, bar, velocity), enc1, step);
//         let delay = timing_humanize(step, bar);
//         send_note(get_drum_note(DrumType::Snare), vel, delay, 100, 90);
//         // Ratchet on snare at phrase ends
//         generate_ratchet(step, bar, velocity, DrumType::Snare);
//
//         // Dense mode: add snare flam
//         if enc1_should_add_extra(enc1, step, bar, 0.3) {
//             send_note(get_drum_note(DrumType::Snare), enc1_ghost_velocity(enc1, step), delay + 20, 60, 85);
//         }
//     }
//     // Closed HH: every step, but accent every 7th - modified by enc1
//     let hh_vel = if step % hh_accent_interval == 0 { velocity } else { velocity / 2 };
//     if hit_probability(step, bar, 0.9) > 0.0 && !enc1_should_skip(enc1, step, bar, 0.7) {
//         let vel = enc1_modify_velocity(velocity_humanize(step, bar, hh_vel), enc1, step);
//         send_note(get_drum_note(DrumType::ClosedHH), vel, 0, 100, 64);
//
//         // Dense mode: add 16th note hi-hats
//         if enc1_should_add_extra(enc1, step, bar, 0.5) {
//             send_note(get_drum_note(DrumType::ClosedHH), enc1_ghost_velocity(enc1, step), 25, 50, 70);
//         }
//     }
//     // Open HH: syncopated, every 6th step
//     let open_hh_interval = enc1_modify_step_interval(6, enc1);
//     if step % open_hh_interval == 3 && !enc1_should_skip(enc1, step, bar, 0.6) {
//         let vel = enc1_modify_velocity(velocity / 2, enc1, step);
//         send_note(get_drum_note(DrumType::OpenHH), vel, 0, 100, 64);
//     }
// ...

/*
 * Copyright (c) Pyrmont Brewery 2025
 * Author: Kevin Staunton-Lambert
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

