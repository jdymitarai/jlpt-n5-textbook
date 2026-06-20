const fs = require('fs');
const path = require('path');

const dirs = [
  'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook',
  'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\scratch',
  'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch'
];

const tokens = new Set();

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isFile()) {
      const c = fs.readFileSync(fp, 'utf8');
      const m = c.match(/cfoat_[a-zA-Z0-9_\-\.]+/g);
      if (m) {
        m.forEach(t => tokens.add(`${f}: ${t}`));
      }
    }
  });
});

console.log("Found tokens:");
tokens.forEach(t => console.log(t));
