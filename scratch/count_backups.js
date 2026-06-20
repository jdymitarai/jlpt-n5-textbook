const fs = require('fs');
const vm = require('vm');
const path = require('path');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

levels.forEach(lvl => {
  const file = `upload_data_${lvl}_js.js`;
  const fp = path.join(brainScratchDir, file);
  if (!fs.existsSync(fp)) {
    console.log(`${lvl}: backup not found (${fp})`);
    return;
  }
  const content = fs.readFileSync(fp, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  try {
    vm.runInContext(content, context);
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const chunk = context.window.JLPT_DATA_CHUNKS[key];
    if (chunk && chunk.vocabulary) {
      console.log(`${lvl} original: ${chunk.vocabulary.length} entries`);
    } else {
      console.log(`${lvl}: no vocabulary array in backup`);
    }
  } catch (e) {
    console.log(`${lvl} error: ${e.message}`);
  }
});
