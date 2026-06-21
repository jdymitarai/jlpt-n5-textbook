const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The original HTML block in renderVocabulary:
/*
      card.innerHTML = \`
        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">\${item.word}<rt>\${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
            <span class="vocab-romaji-text">\${item.romaji}</span>
          </div>
...
*/

const targetHtml = `        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">\${item.word}<rt>\${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
            <span class="vocab-romaji-text">\${item.romaji}</span>
          </div>`;

const replacementHtml = `        <div class="vocab-list-top">
          <div class="vocab-japanese-wrapper">
            <ruby class="vocab-jp-text">\${item.word}<rt>\${item.word === item.furigana ? "" : item.furigana}</rt></ruby>
          </div>`;

if (app.includes(targetHtml)) {
  app = app.replace(targetHtml, replacementHtml);
}

// And the examples inside renderVocabulary:
const targetEx = `<div class="vocab-example-ja"><ruby>\${sent.ja}<rt>\${sent.ja === sent.furigana ? "" : (sent.furigana || "")}</rt></ruby></div>`;
const replacementEx = `<div class="vocab-example-ja" style="font-size: 1.1em; line-height: 1.8;">\${parseFuriganaToRuby(sent.ja)}</div>`;

if (app.includes(targetEx)) {
  app = app.replace(targetEx, replacementEx);
}

fs.writeFileSync('app.js', app, 'utf8');
console.log("Updated renderVocabulary in app.js");
