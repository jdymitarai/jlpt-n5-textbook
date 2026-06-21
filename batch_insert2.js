const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "天気", furigana: "てんき", romaji: "tenki", meaning: "天氣", category: "astronomy_meteorology", level: "N5" },
  { word: "雲", furigana: "くも", romaji: "kumo", meaning: "雲", category: "astronomy_meteorology", level: "N5" },
  { word: "光", furigana: "ひかり", romaji: "hikari", meaning: "光 / 光線", category: "astronomy_meteorology", level: "N4" },
  { word: "空気", furigana: "くうき", romaji: "kuuki", meaning: "空氣", category: "astronomy_meteorology", level: "N4" },
  { word: "季節", furigana: "きせつ", romaji: "kisetsu", meaning: "季節", category: "astronomy_meteorology", level: "N4" },
  { word: "地震", furigana: "じしん", romaji: "jishin", meaning: "地震", category: "astronomy_meteorology", level: "N4" },
  { word: "氷", furigana: "こおり", romaji: "koori", meaning: "冰", category: "astronomy_meteorology", level: "N4" },
  { word: "波", furigana: "なみ", romaji: "nami", meaning: "波浪", category: "astronomy_meteorology", level: "N4" },
  { word: "夕方", furigana: "ゆうがた", romaji: "yuugata", meaning: "傍晚 / 黃昏", category: "astronomy_meteorology", level: "N5" },
  { word: "夜", furigana: "よる", romaji: "yoru", meaning: "夜晚", category: "astronomy_meteorology", level: "N5" },

  // 地理與生態
  { word: "自然", furigana: "しぜん", romaji: "shizen", meaning: "自然", category: "geography_ecology", level: "N4" },
  { word: "森", furigana: "もり", romaji: "mori", meaning: "森林 (茂密)", category: "geography_ecology", level: "N4" },
  { word: "林", furigana: "はやし", romaji: "hayashi", meaning: "樹林", category: "geography_ecology", level: "N4" },
  { word: "池", furigana: "いけ", romaji: "ike", meaning: "池塘", category: "geography_ecology", level: "N5" },
  { word: "石", furigana: "いし", romaji: "ishi", meaning: "石頭", category: "geography_ecology", level: "N4" },
  { word: "砂", furigana: "すな", romaji: "suna", meaning: "沙子", category: "geography_ecology", level: "N4" },
  { word: "島", furigana: "しま", romaji: "shima", meaning: "島嶼", category: "geography_ecology", level: "N4" },
  { word: "海岸", furigana: "かいがん", romaji: "kaigan", meaning: "海岸", category: "geography_ecology", level: "N4" },
  { word: "宇宙", furigana: "うちゅう", romaji: "uchuu", meaning: "宇宙", category: "geography_ecology", level: "N3" },
  { word: "地球", furigana: "ちきゅう", romaji: "chikyuu", meaning: "地球", category: "geography_ecology", level: "N3" },

  // 生物世界
  { word: "花", furigana: "はな", romaji: "hana", meaning: "花", category: "biological_world", level: "N5" },
  { word: "葉", furigana: "は", romaji: "ha", meaning: "葉子", category: "biological_world", level: "N4" },
  { word: "草", furigana: "くさ", romaji: "kusa", meaning: "草", category: "biological_world", level: "N4" },
  { word: "魚", furigana: "さかな", romaji: "sakana", meaning: "魚", category: "biological_world", level: "N5" },
  { word: "猿", furigana: "さる", romaji: "saru", meaning: "猴子", category: "biological_world", level: "N4" },
  { word: "桜", furigana: "さくら", romaji: "sakura", meaning: "櫻花", category: "biological_world", level: "N4" },
  { word: "熊", furigana: "くま", romaji: "kuma", meaning: "熊", category: "biological_world", level: "N3" },
  { word: "蛇", furigana: "へび", romaji: "hebi", meaning: "蛇", category: "biological_world", level: "N3" },
  { word: "兎", furigana: "うさぎ", romaji: "usagi", meaning: "兔子", category: "biological_world", level: "N4" },
  { word: "竹", furigana: "たけ", romaji: "take", meaning: "竹子", category: "biological_world", level: "N4" }
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
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${wordsToAdd.length} words to data.js!`);
