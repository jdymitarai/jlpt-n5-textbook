const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetFallback = `      // Fallback: simple character split if not defined
      tokens = jaText.replace(/[。！]/g, "").split("");`;

const replaceFallback = `      // Fallback: simple character split if not defined
      // Clean up furigana in parentheses before splitting
      let cleanText = jaText.replace(/\\([^)]+\\)/g, "");
      tokens = cleanText.replace(/[。！]/g, "").split("");`;

if (app.includes(targetFallback)) {
  app = app.replace(targetFallback, replaceFallback);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Updated fallback tokens in app.js");
} else {
  console.log("Could not find fallback in app.js");
}
