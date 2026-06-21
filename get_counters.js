const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
let m = data.match(/"counters":\s*\[([\s\S]*?)\]/);
if (m) console.log(m[1].substring(0, 500));
