#!/bin/bash

VERSION=$(grep '"version"' ../package.json | sed 's/.*"version": "\(.*\)".*/\1/')

uglifyjs ../kasm_WASM_rust.js -o kasm_WASM_rust_obs.js_temp -c evaluate=true,inline=true -m eval=true
sed "s/VERSION_ID/$VERSION/" kasm_WASM_rust_header.js > kasm_WASM_rust_header_date.js
cat kasm_WASM_rust_header_date.js kasm_WASM_rust_obs.js_temp > kasm_WASM_rust_obs.js
rm kasm_WASM_rust_obs.js_temp
rm kasm_WASM_rust_header_date.js

uglifyjs ../kasm_webmidi.js -o kasm_webmidi_obs.js_temp -c evaluate=true,inline=true -m eval=true
sed "s/VERSION_ID/$VERSION/" kasm_webmidi_header.js > kasm_webmidi_header_date.js
cat kasm_webmidi_header_date.js kasm_webmidi_obs.js_temp > kasm_webmidi_obs.js
rm kasm_webmidi_obs.js_temp
rm kasm_webmidi_header_date.js

npx html-minifier-terser ../kasm_canvas.html -o kasm_canvas_obs_2.html --collapse-whitespace --remove-comments --minify-js true

sed "s/VERSION_ID/$VERSION/" kasm_canvas_header.html > kasm_canvas_header_date.html
cat kasm_canvas_header_date.html kasm_canvas_obs_2.html > kasm_canvas_obs.html
rm kasm_canvas_obs_2.html
rm kasm_canvas_header_date.html





cp ../test.html emanator.html_obs_temp.html

tmpfile=$(mktemp)
awk -v jsfile="kasm_WASM_rust_obs.js" '
  BEGIN { while ((getline line < jsfile) > 0) js = js line "\n"; close(jsfile) }
  /<\/body>/ {
    print "<script>" js "</script>"
  }
  { print }
' emanator.html_obs_temp.html > "$tmpfile"
mv "$tmpfile" emanator.html_obs_temp.html

sed -i.bak '/<script src="kasm_WASM_rust.js"><\/script>/d' emanator.html_obs_temp.html
rm emanator.html_obs_temp.html.bak



tmpfile=$(mktemp)
awk -v jsfile="kasm_webmidi_obs.js" '
  BEGIN { while ((getline line < jsfile) > 0) js = js line "\n"; close(jsfile) }
  /<\/body>/ {
    print "<script>" js "</script>"
  }
  { print }
' emanator.html_obs_temp.html > "$tmpfile"
mv "$tmpfile" emanator.html_obs_temp.html

sed -i.bak '/<script src="kasm_webmidi.js"><\/script>/d' emanator.html_obs_temp.html
rm emanator.html_obs_temp.html.bak




npx html-minifier-terser emanator.html_obs_temp.html -o emanator.html_obs_temp --collapse-whitespace --remove-comments --minify-js true

sed "s/VERSION_ID/$VERSION (Build: $BUILD_DATE)/" emanator_header.html > emanator_header_versioned.html
cat emanator_header_versioned.html emanator.html_obs_temp > emanator.html
rm emanator_header_versioned.html
rm emanator.html_obs_temp
rm emanator.html_obs_temp.html




# Gen UI JS
sh ./kasm_canvas_emanator_compile_obs.sh
sh ./kasm_canvas_arpy_compile_obs.sh
sh ./kasm_canvas_bangaz_compile_obs.sh
sh ./kasm_canvas_jog_compile_obs.sh
sh ./kasm_canvas_physics_compile_obs.sh
