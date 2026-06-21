const fs = require('fs');
const vm = require('vm');

['N4', 'N3', 'N2', 'N1'].forEach(level => {
  const filename = `data_${level.toLowerCase()}.js`;
  if (!fs.existsSync(filename)) return;

  let content = fs.readFileSync(filename, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  
  try {
    vm.runInContext(content, ctx);
    const chunk = ctx.window.JLPT_DATA_CHUNKS[level];
    if (chunk) {
      delete chunk.verbConjugations;
      delete chunk.adjectiveGroups;
      
      const newData = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${level}"] = ${JSON.stringify(chunk, null, 2)};\n`;
      fs.writeFileSync(filename, newData, 'utf8');
      console.log(`Cleaned up ${filename}`);
    }
  } catch (e) {
    console.error(`Error processing ${filename}:`, e.message);
  }
});
