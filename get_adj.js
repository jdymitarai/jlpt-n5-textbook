const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
let match = data.match(/"adjectives": [\s\S]*?\]/);
if (match) console.log(match[0].substring(0, 300));
