const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const helperCode = `
// Helper: Parse "Kanji(furigana)" to "<ruby>Kanji<rt>furigana</rt></ruby>"
const parseFuriganaToRuby = (text) => {
  if (!text) return "";
  return text.replace(/([\\u4e00-\\u9faf]+)\\(([\\u3040-\\u309f\\u30a0-\\u30ff]+)\\)/g, '<ruby>$1<rt>$2</rt></ruby>');
};
`;

if (!app.includes('const parseFuriganaToRuby')) {
  app = app.replace('document.addEventListener("DOMContentLoaded", () => {', 'document.addEventListener("DOMContentLoaded", () => {' + helperCode);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Added parseFuriganaToRuby");
}
