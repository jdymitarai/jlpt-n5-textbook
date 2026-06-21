const fs = require('fs');
let content = fs.readFileSync('data_n5.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const chunk = ctx.window.JLPT_DATA_CHUNKS['N5'];
delete chunk.verbConjugations;
delete chunk.adjectiveGroups;

const newData = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(chunk, null, 2)};\n`;

fs.writeFileSync('data_n5.js', newData, 'utf8');
console.log('Removed verbConjugations and adjectiveGroups from data_n5.js');
