const fs = require('fs');

const appContent = fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\app.js', 'utf8');

const regex = /categoryLabels|category-badge|vocab-categories/gi;
let match;
console.log("Matches in app.js:");
while ((match = regex.exec(appContent)) !== null) {
  const start = Math.max(0, match.index - 60);
  const end = Math.min(appContent.length, match.index + match[0].length + 60);
  console.log(`- Position ${match.index}: "${appContent.substring(start, end).replace(/\n/g, ' ')}"`);
}
