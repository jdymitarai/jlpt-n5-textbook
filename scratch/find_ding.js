const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

['n1', 'n3'].forEach(lvl => {
  const file = path.join(projectDir, `data_${lvl}.js`);
  const content = fs.readFileSync(file, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(content, context);
  const key = lvl === 'n1' ? 'N1' : 'N3';
  const chunk = context.window.JLPT_DATA_CHUNKS[key];
  if (!chunk) return;
  const matches = chunk.vocabulary.filter(v => v.word.includes('頂') || v.meaning.includes('頂') || v.exampleJa.includes('頂'));
  console.log(`=== ${key} MATCHES ===`);
  matches.forEach(v => {
    console.log(JSON.stringify(v, null, 2));
  });
});
