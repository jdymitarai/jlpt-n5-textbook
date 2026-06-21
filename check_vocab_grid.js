const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
console.log('vocab-list-grid exists?', html.includes('vocab-list-grid'));
console.log('vocab-list-view exists?', html.includes('vocab-list-view'));
console.log('vocab-fc-view exists?', html.includes('vocab-fc-view'));
