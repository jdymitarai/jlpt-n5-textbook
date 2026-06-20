const fs = require('fs');
const path = require('path');
const vm = require('vm');

const publicDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook\\\\public';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

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

    data.vocabulary.forEach(v => {
      if (v.word === 'はい' || v.furigana === 'はい') {
        console.log(`[${key}] Word: ${v.word}, Furigana: ${v.furigana}, Meaning: ${v.meaning}, Category: ${v.category}`);
      }
    });
  } catch (e) {
    console.error(e);
  }
});
