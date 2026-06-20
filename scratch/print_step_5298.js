const fs = require('fs');

const transcriptPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\.system_generated\\logs\\transcript_full.jsonl';

const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  const data = JSON.parse(line);
  if (data.step_index === 5298) {
    console.log("Step 5298 full content:");
    console.log(JSON.stringify(data, null, 2));
    break;
  }
}
