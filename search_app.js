const fs = require('fs');
const app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');
const lines = app.split('\n');
for(let i=0; i<lines.length; i++) {
  if (lines[i].includes('table-dem-body') || lines[i].includes('renderDemonstratives')) {
    console.log(i, lines.slice(i, i+15).join('\n'));
    break;
  }
}
