const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook';
const codePath = path.join(srcDir, 'mcp_deploy_code.txt');
const code = fs.readFileSync(codePath, 'utf8');

const chunkSize = 28000; // ~28KB chunks
const numChunks = Math.ceil(code.length / chunkSize);

console.log(`Splitting deploy code of length ${code.length} into ${numChunks} chunks...`);

for (let i = 0; i < numChunks; i++) {
  const start = i * chunkSize;
  const end = Math.min(start + chunkSize, code.length);
  const chunk = code.substring(start, end);
  const chunkPath = path.join(srcDir, `chunk_${i}.txt`);
  fs.writeFileSync(chunkPath, chunk, 'utf8');
  console.log(`Saved chunk_${i}.txt (${chunk.length} chars)`);
}
