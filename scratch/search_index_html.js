const fs = require('fs');

const indexContent = fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\index.html', 'utf8');

const regex = /clinical|native|臨床|母語者/gi;
let match;
console.log("Matches in index.html:");
while ((match = regex.exec(indexContent)) !== null) {
  const start = Math.max(0, match.index - 40);
  const end = Math.min(indexContent.length, match.index + match[0].length + 40);
  console.log(`- Position ${match.index}: "${indexContent.substring(start, end).replace(/\n/g, ' ')}"`);
}
