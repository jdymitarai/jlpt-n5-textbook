const fs = require('fs');
const vm = require('vm');
const path = require('path');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

levels.forEach(lvl => {
  const filePath = path.join(projectDir, `data_${lvl}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`${lvl}: file not found`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  try {
    vm.runInContext(content, context);
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const chunk = context.window.JLPT_DATA_CHUNKS[key];
    if (chunk && chunk.vocabulary) {
      console.log(`${lvl}: ${chunk.vocabulary.length} entries`);
    } else {
      console.log(`${lvl}: no vocabulary array`);
    }
  } catch (e) {
    console.log(`${lvl}: error parsing: ${e.message}`);
  }
});
