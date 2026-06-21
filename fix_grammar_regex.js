const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

if (!app.includes('renderFullCounters();')) {
  app = app.replace(/  \};\r?\n\r?\n  \/\/ --- MODULE 5: GRAMMAR ---/, '    if (typeof renderFullCounters === "function") renderFullCounters();\n  };\n\n  // --- MODULE 5: GRAMMAR ---');
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Fixed renderFullCounters using regex');
} else {
  console.log('Already fixed!');
}
