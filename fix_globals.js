const fs = require('fs');
const path = require('path');
const dir = __dirname;
const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];

levels.forEach(lvl => {
  const p = path.join(dir, `data_${lvl}.js`);
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(new RegExp(`const JLPT_DATA_${lvl.toUpperCase()} =`), `window.JLPT_DATA_${lvl.toUpperCase()} =`);
    fs.writeFileSync(p, c, 'utf8');
    console.log(`Fixed globals in data_${lvl}.js`);
  }
});
