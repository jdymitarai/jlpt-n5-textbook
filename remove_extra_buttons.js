const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex1 = /[ \t]*<button class="level-pill" data-level="臨床">臨床<\/button>\n?/g;
const regex2 = /[ \t]*<button class="level-pill" data-level="母語者">母語者<\/button>\n?/g;

html = html.replace(regex1, '');
html = html.replace(regex2, '');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Removed 臨床 and 母語者 buttons from index.html.');
