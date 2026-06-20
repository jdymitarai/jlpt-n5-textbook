const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';
const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

const backupPath = path.join(brainScratchDir, 'upload_data_n5_js.js');
if (!fs.existsSync(backupPath)) {
  console.log('Backup not found');
  process.exit(1);
}

// Load backup vocab
const backupContent = fs.readFileSync(backupPath, 'utf8');
const match = backupContent.match(/const b64 = "([^"]+)"/);
if (!match) process.exit(1);
const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
const backupContext = { window: {} };
vm.createContext(backupContext);
vm.runInContext(decompressed, backupContext);
const backupVocab = backupContext.window.JLPT_DATA_CHUNKS.N5.vocabulary;

// Load current vocab
const currentPath = path.join(projectDir, 'data_n5.js');
let currentWords = new Set();
if (fs.existsSync(currentPath)) {
  const currentContent = fs.readFileSync(currentPath, 'utf8');
  const currentContext = { window: {} };
  vm.createContext(currentContext);
  vm.runInContext(currentContent, currentContext);
  const currentVocab = currentContext.window.JLPT_DATA_CHUNKS.N5.vocabulary;
  currentWords = new Set(currentVocab.map(v => v.word.trim()));
}

// Find missing
const missing = backupVocab.filter(v => !currentWords.has(v.word.trim()));

console.log(`Total missing N5 words: ${missing.length}`);
console.log('First 150 missing N5 words:');
const batch = missing.slice(0, 150);
batch.forEach((v, i) => {
  console.log(`${i+1}: ${v.word} (${v.furigana}) - ${v.meaning}`);
});

fs.writeFileSync(path.join(projectDir, 'scratch', 'n5_missing_batch.json'), JSON.stringify(batch, null, 2), 'utf8');
console.log(`Saved batch to scratch/n5_missing_batch.json`);
