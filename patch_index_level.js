const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Verbs
html = html.replace(
  '<tr>\n                      <th>辭書形</th>\n                      <th>ます形</th>',
  '<tr>\n                      <th style="width:60px;">級別</th>\n                      <th>辭書形</th>\n                      <th>ます形</th>'
);

// i-Adjectives
html = html.replace(
  '<tr>\n                      <th>い形容詞 (辭書形)</th>\n                      <th>中文意思</th>',
  '<tr>\n                      <th style="width:60px;">級別</th>\n                      <th>い形容詞 (辭書形)</th>\n                      <th>中文意思</th>'
);

// na-Adjectives
html = html.replace(
  '<tr>\n                      <th>な形容詞 (辭書形)</th>\n                      <th>中文意思</th>',
  '<tr>\n                      <th style="width:60px;">級別</th>\n                      <th>な形容詞 (辭書形)</th>\n                      <th>中文意思</th>'
);

// Keigo
// Keigo was added via app.js html generation, not in index.html!
// Wait! Adverbs, Conjunctions, Particles, Keigo are ALL generated in app.js via `let html = '...'`.
// So only Verbs, iAdj, naAdj have static table headers in index.html.

fs.writeFileSync('index.html', html, 'utf8');
console.log('Patched index.html with Level headers');
