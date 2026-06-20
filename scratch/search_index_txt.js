const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\index.txt', 'utf8');

const regex = /clinical|native|臨床|母語者/gi;
let match;
console.log("Matches in index.txt:");
while ((match = regex.exec(content)) !== null) {
  const start = Math.max(0, match.index - 50);
  const end = Math.min(content.length, match.index + match[0].length + 50);
  console.log(`- Position ${match.index}: "${content.substring(start, end).replace(/\n/g, ' ')}"`);
}
