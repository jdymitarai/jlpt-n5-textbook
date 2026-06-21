const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(content);

if (!window.JLPT_DATA.verbConjugations) window.JLPT_DATA.verbConjugations = {};
if (!window.JLPT_DATA.adjectiveGroups) window.JLPT_DATA.adjectiveGroups = {};
if (!window.JLPT_DATA.adverbsGroup) window.JLPT_DATA.adverbsGroup = {};
if (!window.JLPT_DATA.conjunctions) window.JLPT_DATA.conjunctions = {};
if (!window.JLPT_DATA.particles) window.JLPT_DATA.particles = {};
if (!window.JLPT_DATA.keigo) window.JLPT_DATA.keigo = {};
// We change demonstratives from array to object
window.JLPT_DATA.demonstratives = {};

// Then we write it back
const newData = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';\n';
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Initialized missing structs.');
