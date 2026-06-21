const fs = require('fs');
const path = require('path');
const vm = require('vm');

const kanjiMap = {
  "ひげ": "髭",
  "あご": "顎",
  "かかと": "踵",
  "まつげ": "睫毛",
  "まぶた": "瞼",
  "しわ": "皺",
  "おなら": "屁",
  "つば": "唾",
  "めまい": "目眩",
  "だるい": "怠い",
  "しびれる": "痺れる",
  "うなずく": "頷く",
  "つまずく": "躓く",
  "こする": "擦る",
  "ひっかく": "引っ掻く",
  "あぐらをかく": "胡坐を掻く",
  "ほほえむ": "微笑む",
  "おしゃべり": "お喋り",
  "つかむ": "掴む",
  "こぼす": "零す",
  "つまらない": "詰まらない",
  "うるさい": "煩い",
  "すごい": "凄い",
  "まぶしい": "眩しい",
  "ずるい": "狡い",
  "わがまま": "我儘",
  "そば": "蕎麦",
  "おにぎり": "お握り",
  "はちみつ": "蜂蜜",
  "わさび": "山葵",
  "にんにく": "大蒜",
  "まずい": "不味い",
  "しょっぱい": "塩っぱい",
  "いただきます": "頂きます",
  "ごちそうさまでした": "御馳走様でした",
  "かばん": "鞄",
  "はさみ": "鋏",
  "ほうき": "箒",
  "ちりとり": "塵取り",
  "かなづち": "金槌",
  "のこぎり": "鋸",
  "おたま": "お玉",
  "こたつ": "炬燵",
  "おしゃれ": "お洒落",
  "はんこ": "判子",
  "はがき": "葉書",
  "かご": "籠",
  "のり": "糊",
  "おみくじ": "お神籤",
  "いじめ": "苛め"
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
