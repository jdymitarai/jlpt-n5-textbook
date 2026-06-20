const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';
const backupPath = path.join(brainScratchDir, 'upload_data_n5_js.js');

if (!fs.existsSync(backupPath)) {
  console.log('Backup not found');
  process.exit(1);
}

const backupContent = fs.readFileSync(backupPath, 'utf8');
const match = backupContent.match(/const b64 = "([^"]+)"/);
if (!match) {
  console.log('No b64 found');
  process.exit(1);
}

const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
const backupContext = { window: {} };
vm.createContext(backupContext);
vm.runInContext(decompressed, backupContext);
const vocab = backupContext.window.JLPT_DATA_CHUNKS.N5.vocabulary;

console.log(`Total words in N5 backup: ${vocab.length}`);
console.log('First 20 words:');
vocab.slice(0, 20).forEach((v, index) => {
  console.log(`${index + 1}: ${v.word} (${v.furigana}) - ${v.meaning} [Cat: ${v.category}]`);
});
