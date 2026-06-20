const fs = require('fs');
const path = require('path');
const vm = require('vm');

const publicDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook\\\\public';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];
let output = '';

levels.forEach(lvl => {
  const filePath = path.join(publicDir, `data_${lvl}.js`);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  
  try {
    vm.runInContext(content, context);
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const data = context.window.JLPT_DATA_CHUNKS[key];
    if (!data || !data.vocabulary) return;

    output += `\n=== Level: ${key} ===\n`;
    const catWords = {};
    data.vocabulary.forEach(item => {
      const cat = item.category || 'undefined';
      if (!catWords[cat]) catWords[cat] = [];
      catWords[cat].push(item);
    });

    Object.keys(catWords).sort().forEach(cat => {
      output += `Category: ${cat} (total ${catWords[cat].length} words)\n`;
      const samples = catWords[cat].slice(0, 15).map(w => `${w.word}(${w.meaning})`).join(', ');
      output += `  Samples: ${samples}\n`;
    });
  } catch (e) {
    output += `Error processing ${lvl}: ${e.message}\n`;
  }
});

fs.writeFileSync('weird_categories.txt', output, 'utf8');
console.log("Written to weird_categories.txt");
