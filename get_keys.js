const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
let keys = new Set();
let matches = data.matchAll(/"([a-zA-Z0-9_]+)":\s*\[/g);
for (let m of matches) {
  keys.add(m[1]);
}
console.log(Array.from(keys));
