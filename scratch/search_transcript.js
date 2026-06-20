const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\.system_generated\\logs\\transcript.jsonl';

if (!fs.existsSync(transcriptPath)) {
  console.error("Transcript not found!");
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

console.log("Searching transcript for upload/deploy/r2 keywords...");

let count = 0;
rl.on('line', (line) => {
  if (line.includes('upload_all_to_r2.js') || line.includes('R2') || line.includes('uploadToR2') || line.includes('KV')) {
    if (count < 30) {
      console.log(`- ${line.substring(0, 300)}...`);
      count++;
    }
  }
});
