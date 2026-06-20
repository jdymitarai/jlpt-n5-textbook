const fs = require('fs');
const path = require('path');

const dir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

const files = fs.readdirSync(dir);
files.forEach(f => {
  const fp = path.join(dir, f);
  if (fs.statSync(fp).isFile()) {
    const c = fs.readFileSync(fp, 'utf8');
    if (c.includes('JLPT_KV') || c.includes('JLPT_R2')) {
      console.log(`${f} contains:`);
      if (c.includes('JLPT_KV')) console.log(' - JLPT_KV');
      if (c.includes('JLPT_R2')) console.log(' - JLPT_R2');
    }
  }
});
