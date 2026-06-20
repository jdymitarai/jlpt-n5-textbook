const fs = require('fs');
const path = require('path');
const vm = require('vm');

const publicDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook\\\\public';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

console.log("Analyzing unique categories per level in public database files...");

levels.forEach(lvl => {
  const filePath = path.join(publicDir, `data_${lvl}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${lvl}: file not found`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  
  try {
    vm.runInContext(content, context);
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const data = context.window.JLPT_DATA_CHUNKS[key];
    if (!data || !data.vocabulary) {
      console.log(`Level ${key}: No vocabulary array found`);
      return;
    }

    const catCounts = {};
    data.vocabulary.forEach(item => {
      const cat = item.category || 'undefined';
      catCounts[cat] = (catCounts[cat] || 0) + 1;
    });

    console.log(`\n=== Level: ${key} (Total Words: ${data.vocabulary.length}) ===`);
    Object.keys(catCounts).sort().forEach(cat => {
      console.log(`  - ${cat}: ${catCounts[cat]} words`);
    });
  } catch (e) {
    console.error(`Error processing ${lvl}:`, e);
  }
});
