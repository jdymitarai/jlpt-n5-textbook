const fs = require('fs');

const data = JSON.parse(fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\scratch\\parsed_candidates.json', 'utf8'));

['N3', 'N2', 'N1'].forEach(lvl => {
  const counts = {};
  data[lvl].forEach(c => {
    counts[c.word] = (counts[c.word] || 0) + 1;
  });
  const dups = Object.entries(counts).filter(([w, n]) => n > 1);
  if (dups.length > 0) {
    console.log(`Duplicates in ${lvl}:`);
    dups.forEach(([w, n]) => {
      console.log(`  - ${w} appears ${n} times:`);
      data[lvl].filter(c => c.word === w).forEach(c => {
        console.log(`    * Reading: ${c.reading} | Cat: ${c.category} | Meaning: ${c.meaning}`);
      });
    });
  } else {
    console.log(`No duplicates in ${lvl}`);
  }
});
