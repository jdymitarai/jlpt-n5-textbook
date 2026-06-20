const fs = require('fs');

const files = ['index.txt', 'index_b64.txt', 'app.txt'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    const regex = /clinical|native|臨床|母語者/gi;
    let count = 0;
    while (regex.exec(c) !== null) count++;
    console.log(`${f}: ${count} matches`);
  } else {
    console.log(`${f}: not found`);
  }
});
