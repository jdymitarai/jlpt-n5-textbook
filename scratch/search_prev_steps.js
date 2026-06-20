const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\.system_generated\\logs\\transcript.jsonl';

const rl = readline.createInterface({
  input: fs.createReadStream(transcriptPath),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  const data = JSON.parse(line);
  if (data.step_index >= 5700 && data.step_index <= 5860) {
    const s = JSON.stringify(data);
    if (s.includes('upload_all_to_r2') || s.includes('upload_to_kv') || s.includes('r2') || s.includes('KV') || s.includes('sync')) {
      console.log(`Step ${data.step_index} (${data.type}): ${s.substring(0, 400)}...`);
    }
  }
});
