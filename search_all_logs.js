const fs = require('fs');
const readline = require('readline');

async function main() {
  const fileStream = fs.createReadStream('C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\.system_generated\\logs\\transcript.jsonl');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const parsed = JSON.parse(line);
      if (parsed.tool_calls) {
        parsed.tool_calls.forEach(tc => {
          if (tc.name === 'write_to_file' || tc.name === 'replace_file_content') {
            const args = typeof tc.args === 'string' ? JSON.parse(tc.args) : tc.args;
            if (args && args.TargetFile && args.TargetFile.includes('run_deploy_local.js')) {
              console.log(`Step ${parsed.step_index}: Created/Modified run_deploy_local.js`);
              console.log("Content:");
              console.log(args.CodeContent || args.ReplacementContent);
              console.log('==================================================');
            }
          }
        });
      }
    } catch (e) {}
  }
}

main().catch(console.error);
