const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\scratch\\parsed_candidates.json', 'utf8'));

console.log("=== N3 candidates ===");
data.N3.forEach(c => {
  if (c.meaning.includes('/') || c.meaning.includes('、') || c.meaning.includes('；')) {
    console.log(`- ${c.word} (${c.reading}): ${c.meaning}`);
  }
});

console.log("\n=== N2 candidates ===");
data.N2.forEach(c => {
  if (c.meaning.includes('/') || c.meaning.includes('、') || c.meaning.includes('；')) {
    console.log(`- ${c.word} (${c.reading}): ${c.meaning}`);
  }
});
