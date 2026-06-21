const fs = require('fs');
const path = require('path');
const vm = require('vm');

const kanjiMap = {
  "うつる": "移る/感染る", // We will manually adjust if needed
  "わくわくする": "湧く湧くする",
  "イライラする": "苛苛する",
  "おしっこ": "小便",
  "うんち": "大便",
  "かける": "掛ける",
  "まっすぐ": "真っ直ぐ",
  "おしぼり": "お絞り",
  "きつい": "厳しい/緊い",
  "ゆるい": "緩い",
  "ボタンをかける": "ボタンを掛ける",
  "おまけ": "お負け",
  "ニキビ": "面皰",
  "ゲップ": "噯気"
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

processFile('data_n5.js', true);
processFile('data.js', false);
