const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

const targetStr = `  };

  // --- MODULE 5: GRAMMAR ---`;

if (app.includes(targetStr) && !app.includes('renderFullCounters()')) {
  app = app.replace(targetStr, `    if (typeof renderFullCounters === "function") renderFullCounters();\n` + targetStr);
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Fixed renderFullCounters call successfully!');
} else {
  console.log('Could not find target block or already replaced.');
}
