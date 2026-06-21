const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// Flashcards:
const targetFcRomaji = `document.getElementById("fc-back-reading").textContent = \`\${currentItem.furigana} (\${currentItem.romaji})\`;`;
const replacementFcRomaji = `document.getElementById("fc-back-reading").textContent = currentItem.furigana;`;

if (app.includes(targetFcRomaji)) {
  app = app.replace(targetFcRomaji, replacementFcRomaji);
}

const targetFcEx = `fcBackExample.innerHTML = currentItem.sentences.map(sent => \`
        <div style="margin-bottom: 8px;">
          <div><ruby>\${sent.ja}<rt>\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>
          <div style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${sent.en}</div>
        </div>
      \`).join('');`;
const replacementFcEx = `fcBackExample.innerHTML = currentItem.sentences.map(sent => \`
        <div style="margin-bottom: 8px;">
          <div style="font-size: 1.1em; line-height: 1.8;">\${parseFuriganaToRuby(sent.ja)}</div>
          <div style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${sent.en}</div>
        </div>
      \`).join('');`;

if (app.includes(targetFcEx)) {
  app = app.replace(targetFcEx, replacementFcEx);
}

const targetFcFallbackEx = `fcBackExample.innerHTML = \`
        <div id="fc-back-ex-ja">\${currentItem.exampleJa || ''}</div>
        <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${currentItem.exampleEn || ''}</div>
      \`;`;
const replacementFcFallbackEx = `fcBackExample.innerHTML = \`
        <div id="fc-back-ex-ja" style="font-size: 1.1em; line-height: 1.8;">\${parseFuriganaToRuby(currentItem.exampleJa || '')}</div>
        <div id="fc-back-ex-en" style="opacity: 0.8; font-size: 0.8rem; margin-top: 4px;">\${currentItem.exampleEn || ''}</div>
      \`;`;

if (app.includes(targetFcFallbackEx)) {
  app = app.replace(targetFcFallbackEx, replacementFcFallbackEx);
}

// Grammar Examples:
const targetGrEx = `<ruby class="grammar-example-ja">\${ex.ja}<rt>\${ex.ja === ex.furigana ? "" : ex.furigana}</rt></ruby>`;
const replacementGrEx = `<div class="grammar-example-ja" style="line-height: 1.8;">\${parseFuriganaToRuby(ex.ja)}</div>`;

if (app.includes(targetGrEx)) {
  app = app.replace(targetGrEx, replacementGrEx);
}

fs.writeFileSync('app.js', app, 'utf8');
console.log("Updated flashcards and grammar examples in app.js");
