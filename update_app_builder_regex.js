const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const regex = /tokens = jaText\.replace\(\/\[。！\]\/g, ""\)\.split\(""\);/;
const replacement = `let cleanText = jaText.replace(/\\([^)]+\\)/g, "");\n      tokens = cleanText.replace(/[。！]/g, "").split("");`;

if (regex.test(app)) {
  app = app.replace(regex, replacement);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Updated fallback tokens in app.js");
} else {
  console.log("Could not find fallback in app.js via regex");
}
