const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

// 1. Add parseFuriganaToRuby helper to the top
const helperCode = `
// Helper: Parse "Kanji(furigana)" to "<ruby>Kanji<rt>furigana</rt></ruby>"
const parseFuriganaToRuby = (text) => {
  if (!text) return "";
  return text.replace(/([\\u4e00-\\u9faf]+)\\(([\\u3040-\\u309f\\u30a0-\\u30ff]+)\\)/g, '<ruby>$1<rt>$2</rt></ruby>');
};
`;

if (!app.includes('const parseFuriganaToRuby')) {
  app = app.replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", () => {' + helperCode);
}

// 2. Update renderVocabulary
// Old pattern: <td>${v.romaji}</td>
// We want to remove the romaji td entirely.
// AND update the word rendering:
/*
<div class="clickable-jp" data-speech="\${v.word}" style="display: flex; flex-direction: column;">
  <span>\${v.word}</span>
  \${v.furigana ? \`<span style="font-size: 0.7em; opacity: 0.7;">\${v.furigana}</span>\` : ''}
</div>
*/
// to:
/*
<div class="clickable-jp" data-speech="\${v.word}" style="display: flex; flex-direction: column; align-items: flex-start;">
  \${v.furigana ? \`<ruby style="font-size: 1.2em;">\${v.word}<rt>\${v.furigana}</rt></ruby>\` : \`<span style="font-size: 1.2em;">\${v.word}</span>\`}
</div>
*/

// Let's replace the whole `html = \` block for renderVocabulary.
// Wait, I need to know exactly how it looks in app.js.
