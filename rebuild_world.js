const fs = require('fs');
const vm = require('vm');

// 1. Load current broken data (which has the new structures for adjectives, verbs, adverbs, etc.)
let currentDataStr = fs.readFileSync('data.js', 'utf8');
const ctxCurrent = { window: {} };
vm.createContext(ctxCurrent);
vm.runInContext(currentDataStr, ctxCurrent);
const currentData = ctxCurrent.window.JLPT_DATA;

// 2. Load master baseline data
let masterDataStr = fs.readFileSync('data_master.js', 'utf16le');
// Some strings might have weird encoding artifacts from git pipe, let's fix
if (masterDataStr.charCodeAt(0) === 0xFEFF) {
  masterDataStr = masterDataStr.slice(1);
}
// wait, the git output had some trailing/leading weirdness? We'll see.
try {
  const ctxMaster = { window: {} };
  vm.createContext(ctxMaster);
  vm.runInContext(masterDataStr, ctxMaster);
  const masterData = ctxMaster.window.JLPT_DATA;
  
  // 3. Merge!
  masterData.adjectiveGroups = currentData.adjectiveGroups;
  masterData.verbConjugations = currentData.verbConjugations;
  masterData.adverbsGroup = currentData.adverbsGroup;
  masterData.conjunctions = currentData.conjunctions;
  masterData.particles = currentData.particles;
  masterData.keigo = currentData.keigo;
  masterData.counters = currentData.counters;
  masterData.pronouns = currentData.pronouns;
  
  // Leave masterData.demonstratives as an ARRAY, because app.js expects an array!
  // Leave masterData.vocabulary as an array
  // Leave masterData.grammar as an array
  // Leave masterData.kana as an object
  // Leave masterData.counterTables as an object

  const finalDataStr = `window.JLPT_DATA = ${JSON.stringify(masterData, null, 2)};\n`;
  fs.writeFileSync('data.js', finalDataStr, 'utf8');
  console.log('Successfully rebuilt data.js from master + current data.');
} catch (e) {
  console.error("Failed to parse master data:", e);
}
