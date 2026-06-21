const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('id="consolidation-page"'));
if (start !== -1) {
  let braceCount = 0;
  for (let i = start; i < lines.length; i++) {
    console.log(lines[i]);
    if (lines[i].includes('</section>')) break;
  }
}
