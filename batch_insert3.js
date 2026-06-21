const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "虹", furigana: "にじ", romaji: "niji", meaning: "彩虹", category: "astronomy_meteorology", level: "N4" },
  { word: "霧", furigana: "きり", romaji: "kiri", meaning: "霧", category: "astronomy_meteorology", level: "N4" },
  { word: "嵐", furigana: "あらし", romaji: "arashi", meaning: "暴風雨", category: "astronomy_meteorology", level: "N3" },
  { word: "気候", furigana: "きこう", romaji: "kikou", meaning: "氣候", category: "astronomy_meteorology", level: "N3" },
  { word: "日の出", furigana: "ひので", romaji: "hinode", meaning: "日出", category: "astronomy_meteorology", level: "N4" },
  { word: "満月", furigana: "まんげつ", romaji: "mangetsu", meaning: "滿月", category: "astronomy_meteorology", level: "N3" },
  { word: "星空", furigana: "ほしぞら", romaji: "hoshizora", meaning: "星空", category: "astronomy_meteorology", level: "N3" },
  { word: "雷雨", furigana: "らいう", romaji: "raiu", meaning: "雷雨", category: "astronomy_meteorology", level: "N3" },

  // 地理與生態
  { word: "湖", furigana: "みずうみ", romaji: "mizuumi", meaning: "湖泊", category: "geography_ecology", level: "N4" },
  { word: "滝", furigana: "たき", romaji: "taki", meaning: "瀑布", category: "geography_ecology", level: "N3" },
  { word: "谷", furigana: "たに", romaji: "tani", meaning: "山谷", category: "geography_ecology", level: "N3" },
  { word: "丘", furigana: "おか", romaji: "oka", meaning: "山丘", category: "geography_ecology", level: "N3" },
  { word: "陸", furigana: "りく", romaji: "riku", meaning: "陸地", category: "geography_ecology", level: "N3" },
  { word: "砂漠", furigana: "さばく", romaji: "sabaku", meaning: "沙漠", category: "geography_ecology", level: "N3" },
  { word: "火山", furigana: "かざん", romaji: "kazan", meaning: "火山", category: "geography_ecology", level: "N3" },
  { word: "泥", furigana: "どろ", romaji: "doro", meaning: "泥巴", category: "geography_ecology", level: "N3" },
  { word: "景色", furigana: "けしき", romaji: "keshiki", meaning: "景色 / 風景", category: "geography_ecology", level: "N4" },

  // 生物世界
  { word: "羊", furigana: "ひつじ", romaji: "hitsuji", meaning: "綿羊", category: "biological_world", level: "N4" },
  { word: "象", furigana: "ぞう", romaji: "zou", meaning: "大象", category: "biological_world", level: "N4" },
  { word: "虎", furigana: "とら", romaji: "tora", meaning: "老虎", category: "biological_world", level: "N4" },
  { word: "鼠", furigana: "ねずみ", romaji: "nezumi", meaning: "老鼠", category: "biological_world", level: "N4" },
  { word: "鹿", furigana: "しか", romaji: "shika", meaning: "鹿", category: "biological_world", level: "N4" },
  { word: "狐", furigana: "きつね", romaji: "kitsune", meaning: "狐狸", category: "biological_world", level: "N4" },
  { word: "蛙", furigana: "かえる", romaji: "kaeru", meaning: "青蛙", category: "biological_world", level: "N4" },
  { word: "蝶", furigana: "ちょう", romaji: "chou", meaning: "蝴蝶", category: "biological_world", level: "N3" },
  { word: "蚊", furigana: "か", romaji: "ka", meaning: "蚊子", category: "biological_world", level: "N4" },
  { word: "枝", furigana: "えだ", romaji: "eda", meaning: "樹枝", category: "biological_world", level: "N4" },
  { word: "種", furigana: "たね", romaji: "tane", meaning: "種子", category: "biological_world", level: "N4" },
  { word: "根", furigana: "ね", romaji: "ne", meaning: "樹根", category: "biological_world", level: "N3" }
];

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

const fileContext = { window: {} };
vm.createContext(fileContext);
vm.runInContext(content, fileContext);

const data = fileContext.window.JLPT_DATA;
if (!data.vocabulary) {
  data.vocabulary = [];
}

let addedCount = 0;
wordsToAdd.forEach(entry => {
  const fullEntry = {
    ...entry,
    exampleJa: `これは「${entry.word}」の例です。`,
    exampleFurigana: `これは「${entry.furigana}」のれいです。`,
    exampleEn: `這是「${entry.meaning}」的例句。`
  };
  
  // Check if word already exists
  if (!data.vocabulary.some(v => v.word === fullEntry.word)) {
    data.vocabulary.push(fullEntry);
    addedCount++;
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${addedCount} words to data.js!`);
