const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';
const backupPath = path.join(brainScratchDir, 'upload_data_n5_js.js');

const content = fs.readFileSync(backupPath, 'utf8');
const match = content.match(/const b64 = "([^"]+)"/);
if (!match) process.exit(1);
const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(decompressed, ctx);
const v1 = ctx.window.JLPT_DATA_CHUNKS.N5.vocabulary.find(x => x.word === 'あね' || x.furigana === 'あね');
const v2 = ctx.window.JLPT_DATA_CHUNKS.N5.vocabulary.find(x => x.word === 'あに' || x.furigana === 'あに');
console.log('v1:', JSON.stringify(v1, null, 2));
console.log('v2:', JSON.stringify(v2, null, 2));
