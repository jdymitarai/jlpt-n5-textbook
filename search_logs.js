const fs = require('fs');
const readline = require('readline');

async function run() {
  const fileStream = fs.createReadStream('C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let count = 0;
  for await (const line of rl) {
    if (line.includes('"status":"DONE"') && (line.includes('wrangler') || line.includes('deploy') || line.includes('execute'))) {
      try {
        const parsed = JSON.parse(line);
        if (parsed.step_index >= 928 && parsed.step_index < 1350 && parsed.tool_calls && parsed.tool_calls.length > 0) {
          console.log(`Step ${parsed.step_index} (${parsed.created_at}):`);
          console.log(JSON.stringify(parsed.tool_calls, null, 2));
          console.log("-----------------------------------------");
          count++;
          if (count > 30) break;
        }
      } catch (e) {}
    }
  }
}
run();
