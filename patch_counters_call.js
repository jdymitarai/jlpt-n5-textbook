const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

const targetStr = '// Render Pronouns';
if (app.includes(targetStr) && !app.includes('renderFullCounters();')) {
  app = app.replace(targetStr, 'if (typeof renderFullCounters === "function") renderFullCounters();\n\n    ' + targetStr);
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Added renderFullCounters check!');
} else {
  console.log('Target string not found or already added');
}
