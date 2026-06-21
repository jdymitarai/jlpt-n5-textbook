const fs = require('fs');
const path = require('path');
const vm = require('vm');

const kanjiMap = {
  "うどん": "饂飩",
  "あくび": "欠伸",
  "くしゃみ": "嚔",
  "しゃっくり": "噦り",
  "げっぷ": "噯気",
  "いびき": "鼾",
  "よだれ": "涎",
  "ほっぺた": "頬っぺた",
  "へそ": "臍",
  "ふくらはぎ": "脹脛",
  "ほくろ": "黒子",
  "うがい": "嗽",
  "しゃがむ": "蹲む",
  "つねる": "抓る",
  "びっくりする": "吃驚する",
  "けち": "吝嗇",
  "しゃもじ": "杓文字",
  "てんかん": "癲癇",
  "やけど": "火傷",
  "うつぶせ": "俯伏せ",
  "むせる": "噎せる",
  "つる": "攣る",
  "むくむ": "浮腫む",
  "すく": "空く",
  "つわり": "悪阻",
  "おむつ": "お襁褓",
  "よだれかけ": "涎掛け",
  "まかない": "賄い",
  "くし": "櫛"
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
      // Apply the mapping if the word exactly matches a key in our map
      // and only if the current word doesn't already use Kanji
      if (v.word === v.furigana && kanjiMap[v.word]) {
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
