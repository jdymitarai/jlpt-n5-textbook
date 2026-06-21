const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetFcFront = `document.getElementById("fc-front-jp").textContent = currentItem.word;`;
const replacementFcFront = `document.getElementById("fc-front-jp").innerHTML = currentItem.furigana ? \`<ruby>\${currentItem.word}<rt>\${currentItem.furigana}</rt></ruby>\` : currentItem.word;`;

if (app.includes(targetFcFront)) {
  app = app.replace(targetFcFront, replacementFcFront);
}

fs.writeFileSync('app.js', app, 'utf8');
console.log("Updated flashcard front jp in app.js");
