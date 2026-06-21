const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let start = html.indexOf('<section id="vocab-page"');
console.log(html.substring(start, start + 800));
