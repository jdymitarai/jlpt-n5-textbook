const fs = require('fs');
const html = fs.readFileSync('c:/ai/jlpt-n5-textbook/index.html', 'utf8');
const m = html.match(/id="[^"]*adverb[^"]*"/g);
console.log("HTML:", m);

const app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');
const lines = app.split('\n');
lines.forEach((line, i) => {
  if(line.includes('adverb') || line.includes('Adverb')) {
    console.log(i + 1, line);
  }
});
