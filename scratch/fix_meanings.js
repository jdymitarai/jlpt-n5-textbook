const fs = require('fs');

const dataStr = fs.readFileSync('data_n5.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataStr, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

for (const item of db.vocabulary) {
  if (item.word === '腕' && !item.meaning) item.meaning = '手臂';
  if (item.word === '痛い' && !item.meaning) item.meaning = '痛的';
  if (item.word === '疲れる' && !item.meaning) item.meaning = '疲累';
}

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync('data_n5.js', outputCode, 'utf8');
console.log('Fixed missing meanings!');
