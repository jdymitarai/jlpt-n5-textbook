const fs = require('fs');
const path = require('path');

const candidatesPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\candidates_utf8.txt';
const content = fs.readFileSync(candidatesPath, 'utf8');

const lines = content.split('\n');
console.log("Words with multiple distinct meanings/usages:");

lines.forEach(line => {
  if (!line.includes('|')) return;
  const parts = line.split('|');
  const level = parts[0].trim();
  const wordInfo = parts[1].trim(); // e.g. "首 (くび)"
  const current = parts[2].trim();
  const meaning = parts[3].trim().replace('Meaning: ', '');

  const hasMultiple = meaning.includes('/') || meaning.includes('、') || meaning.includes('；') || meaning.includes(';') || meaning.includes(',') || meaning.includes('（') || /[\d\(\)]/.test(meaning);

  if (hasMultiple) {
    const word = wordInfo.split(' ')[0];
    if (meaning.length > 10) {
      console.log(`- [${level}] ${wordInfo}: ${meaning}`);
    }
  }
});
