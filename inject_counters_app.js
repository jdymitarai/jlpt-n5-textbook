const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

const targetStr = '// Bind speak handlers for dynamically generated elements';
if (app.includes(targetStr) && !app.includes('renderFullCounters();')) {
  app = app.replace(targetStr, 'if (typeof renderFullCounters === "function") renderFullCounters();\n    ' + targetStr);
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Added renderFullCounters() to app.js');
} else {
  console.log('Target string not found or already added');
}
