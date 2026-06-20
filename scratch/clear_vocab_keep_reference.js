const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');
const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';

const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

levels.forEach(lvl => {
  const backupFile = path.join(brainScratchDir, `upload_data_${lvl}_js.js`);
  if (!fs.existsSync(backupFile)) {
    console.error(`Backup not found for ${lvl}`);
    return;
  }

  const content = fs.readFileSync(backupFile, 'utf8');
  const match = content.match(/const b64 = "([^"]+)"/);
  if (!match) {
    console.error(`No base64 found in backup for ${lvl}`);
    return;
  }

  const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(decompressed, context);

  const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
  const chunk = context.window.JLPT_DATA_CHUNKS[key];
  if (!chunk) {
    console.error(`Chunk key ${key} not found in parsed backup`);
    return;
  }

  // Clear vocabulary and conjugations/adjectives
  chunk.vocabulary = [];
  chunk.verbConjugations = [];
  chunk.adjectiveGroups = { iAdjectives: [], naAdjectives: [] };

  // Save updated database
  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${key}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${key}"]; }`;
  
  fs.writeFileSync(path.join(projectDir, `data_${lvl}.js`), outputString, 'utf8');
  fs.writeFileSync(path.join(publicDir, `data_${lvl}.js`), outputString, 'utf8');
  console.log(`Successfully cleared vocabulary for ${lvl} (keeping grammar, counters, demonstratives)`);
});

console.log("All level vocabulary cleared completely!");
