const fs = require('fs');

const candidatesPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\candidates_utf8.txt';

if (!fs.existsSync(candidatesPath)) {
  console.error("Candidates file not found!");
  process.exit(1);
}

const content = fs.readFileSync(candidatesPath, 'utf8');
const lines = content.split('\n');

const prefixes = new Set();
lines.forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('===') || line.startsWith('Found')) return;
  const parts = line.split('|').map(p => p.trim());
  if (parts.length > 0) {
    prefixes.add(parts[0]);
  }
});

console.log("All prefixes in candidates_utf8.txt:");
prefixes.forEach(p => console.log(` - ${p}`));
