const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';
const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

const dbFiles = [
  { backup: 'upload_data_n5_js.js', target: 'data_n5.js', key: 'N5' },
  { backup: 'upload_data_n4_js.js', target: 'data_n4.js', key: 'N4' },
  { backup: 'upload_data_n3_js.js', target: 'data_n3.js', key: 'N3' },
  { backup: 'upload_data_n2_js.js', target: 'data_n2.js', key: 'N2' },
  { backup: 'upload_data_n1_js.js', target: 'data_n1.js', key: 'N1' }
];

dbFiles.forEach(item => {
  const backupPath = path.join(brainScratchDir, item.backup);
  if (!fs.existsSync(backupPath)) {
    console.log(`${item.key}: backup not found`);
    return;
  }

  // Decompress backup
  const backupContent = fs.readFileSync(backupPath, 'utf8');
  const match = backupContent.match(/const b64 = "([^"]+)"/);
  if (!match) return;
  const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
  
  const backupContext = { window: {} };
  vm.createContext(backupContext);
  vm.runInContext(decompressed, backupContext);
  const backupVocab = backupContext.window.JLPT_DATA_CHUNKS[item.key].vocabulary;

  // Load current database
  const currentPath = path.join(projectDir, item.target);
  let currentVocab = [];
  if (fs.existsSync(currentPath)) {
    const currentContent = fs.readFileSync(currentPath, 'utf8');
    const currentContext = { window: {} };
    vm.createContext(currentContext);
    vm.runInContext(currentContent, currentContext);
    currentVocab = currentContext.window.JLPT_DATA_CHUNKS[item.key].vocabulary;
  }

  // Find missing words
  const currentWords = new Set(currentVocab.map(v => v.word.trim()));
  const missing = backupVocab.filter(v => !currentWords.has(v.word.trim()));

  console.log(`${item.key}: ${backupVocab.length} original, ${currentVocab.length} current, ${missing.length} missing`);
  if (missing.length > 0) {
    console.log(`  Some missing examples: ${missing.slice(0, 10).map(v => `${v.word} (${v.furigana})`).join(', ')}`);
  }
});
