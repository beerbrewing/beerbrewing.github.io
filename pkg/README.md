# Kasm WASM

Rust code in Ableton Live!
Basically there are three primary layers working together to enable Rust execution within Max4Live/V8:

1. **Rust Code Layer**: Your MIDI/Audio DSP logic compiled as WebAssembly
2. **JavaScript Bridge Layer**: Handles WASM bytecode loading, setups parameter marshalling for Max4Live integration
3. **Max4Live Layer**: V8 JavaScript engine with an basic example .amxd device showing two way communication with Rust

Kasm provides the base64-encoded WASM binary parts and compiles this as a blob for integration

1. **Base64 Decoding**: Custom `atob()` implementation for environments without native support
2. **WASM Compilation**: Direct compilation from decoded binary
3. **Function Export**: Making Rust functions available to JavaScript
5. **getStringFromWasm**: Convert WASM memory strings into JavaScript strings


## Getting data from Max4Live into Rust

Fairly trivial mechanism using the existing inlets feature - the Javascript maintains the state variables

```javascript
function msg_int(value) {
    switch (inlet) {
        case 0:
            inlet_0 = value;  // The left most inlet into the v8 = first paramter in the Rust code
            break;
       case 1:
            inlet_1 = value;  // The next most parameter, and so on...
            break;
    }
}
```
Those parameters are simply stored in global JavaScript variables `inlet_0`, `inlet_1` and passed as params to the Rust function, e.g. during the `bang()` call:

```javascript
function bang() {
    const result = kasm_rust.kasm_midi_note_octave_hit(inlet_0, inlet_1);
    outlet(0, result);
}
```

### Calling Rust Functions from Javascript

The Rust function uses wasm-bindgen annotations for JavaScript interoperability:

```rust
#[wasm_bindgen]
pub fn kasm_midi_note_offset(inlet_0: i32, inlet_1: i32) -> i32 {
    // MIDI note value clamping to 0-127 range
    let result = inlet_0 + inlet_1;
    if result > 127 { 127 } else if result < 0 { 0 } else { result }
}
```

## Calling Ableton Live/Max4Live features from Rust

The Rust code uses wasm-bindgen to declare the `outlet` and `post` functions as external JavaScript functions:

```rust
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = "outlet")]
    fn outlet(outlet_num: i32, value: f64);
    
    #[wasm_bindgen(js_name = "post")]
    fn post(message: &str);
}
```
Kasm then has a bit of magic to hook up the names that bindgen generated e.g. `__wbg_outlet_a80bc191afebf33a`, the flow looks like this

1. **Rust function call**: `outlet(0, 127)`
2. **WASM-bindgen bridge**: Converts to `__wbg_outlet_a80bc191afebf33a(0, 127.0)`
3. **JavaScript environment**: Max4Live's V8 engine provides the actual `outlet` function
4. **Max4Live outlet**: The value is sent to the specified outlet

Same for `post(string)` which ultimately drops a debug line onto the Max4Live console.


# How to build/run Kasm WASM Rust

Pretty simple, you need to have Rust and npm installed if oyu dont already have that...

Install Rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
Install npm from
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Then Run
```
npm install
npm run build
```

This updates `kasm_WASM_rust_obs.js` which you then copy and paste into a 'v8' Max4Live object, 
the example .amxd file can be used to get started. Enjoy!


# Quirks

If you add or change a function header, e.g. adding a new parameter you'll need to update the name in the JS
__wbg_outlet_5ed60edbb924e29f
Whilst you can go inspect the WASM WAT file (kasm_ableton_rust_bg.wasm.wat) for the name The Max Window debug 
will just tell you what that name changed to and so is expected to be


Copyright (c) Pyrmont Brewery 2025 - Kevin Staunton-Lambert
