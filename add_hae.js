const fs = require('fs');
const path = require('path');
const vm = require('vm');

const kanjiMap = {
  "ハエ": "蠅"
};

function processFile(filename, isChunk) {
  const filePath = path.join(__dirname, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  const fileContext = { window: { JLPT_DATA_CHUNKS: {} } };
  vm.createContext(fileContext);
  vm.runInContext(content, fileContext);

  let data;
  if (isChunk) {
    data = fileContext.window.JLPT_DATA_CHUNKS['N5'];
  } else {
    data = fileContext.window.JLPT_DATA;
  }

  let updatedCount = 0;
  if (data && data.vocabulary) {
    data.vocabulary.forEach(v => {
      if (kanjiMap[v.word]) {
        v.word = kanjiMap[v.word];
        updatedCount++;
      }
    });
  }

  let outputString;
  if (isChunk) {
    outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
  } else {
    outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
  }

  fs.writeFileSync(filePath, outputString, 'utf8');
  console.log(`Updated ${updatedCount} words in ${filename}`);
}

processFile('data.js', false);
