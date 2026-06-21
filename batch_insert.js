const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天氣與氣候
  { word: "雨", furigana: "あめ", romaji: "ame", meaning: "雨 / 雨天", category: "astronomy_meteorology" },
  { word: "雪", furigana: "ゆき", romaji: "yuki", meaning: "雪", category: "astronomy_meteorology" },
  { word: "晴れ", furigana: "はれ", romaji: "hare", meaning: "晴天", category: "astronomy_meteorology" },
  { word: "曇り", furigana: "くもり", romaji: "kumori", meaning: "陰天", category: "astronomy_meteorology" },
  { word: "天気", furigana: "てんき", romaji: "tenki", meaning: "天氣", category: "astronomy_meteorology" },
  { word: "空", furigana: "そら", romaji: "sora", meaning: "天空", category: "astronomy_meteorology" },
  { word: "春", furigana: "はる", romaji: "haru", meaning: "春天", category: "astronomy_meteorology" },
  { word: "夏", furigana: "なつ", romaji: "natsu", meaning: "夏天", category: "astronomy_meteorology" },
  { word: "秋", furigana: "あき", romaji: "aki", meaning: "秋天", category: "astronomy_meteorology" },
  { word: "冬", furigana: "ふゆ", romaji: "fuyu", meaning: "冬天", category: "astronomy_meteorology" },
  { word: "雷", furigana: "かみなり", romaji: "kaminari", meaning: "雷 / 閃電", category: "astronomy_meteorology" },
  { word: "台風", furigana: "たいふう", romaji: "taifuu", meaning: "颱風", category: "astronomy_meteorology" },
  { word: "気温", furigana: "きおん", romaji: "kion", meaning: "氣溫", category: "astronomy_meteorology" },
  
  // 天文與地理
  { word: "海", furigana: "うみ", romaji: "umi", meaning: "海洋 / 大海", category: "geography_ecology" },
  { word: "川", furigana: "かわ", romaji: "kawa", meaning: "河川", category: "geography_ecology" },
  { word: "山", furigana: "やま", romaji: "yama", meaning: "山 / 山脈", category: "geography_ecology" },
  { word: "月", furigana: "つき", romaji: "tsuki", meaning: "月亮", category: "geography_ecology" },
  { word: "太陽", furigana: "たいよう", romaji: "taiyou", meaning: "太陽", category: "geography_ecology" },
  { word: "星", furigana: "ほし", romaji: "hoshi", meaning: "星星", category: "geography_ecology" },

  // 動物與植物
  { word: "犬", furigana: "いぬ", romaji: "inu", meaning: "狗", category: "biological_world" },
  { word: "猫", furigana: "ねこ", romaji: "neko", meaning: "貓", category: "biological_world" },
  { word: "鳥", furigana: "とり", romaji: "tori", meaning: "鳥", category: "biological_world" },
  { word: "木", furigana: "き", romaji: "ki", meaning: "樹木", category: "biological_world" },
  { word: "動物", furigana: "どうぶつ", romaji: "doubutsu", meaning: "動物", category: "biological_world" },
  { word: "植物", furigana: "しょくぶつ", romaji: "shokubutsu", meaning: "植物", category: "biological_world" },
  { word: "虫", furigana: "むし", romaji: "mushi", meaning: "昆蟲", category: "biological_world" },
  { word: "牛", furigana: "うし", romaji: "ushi", meaning: "牛", category: "biological_world" },
  { word: "馬", furigana: "うま", romaji: "uma", meaning: "馬", category: "biological_world" },
  { word: "豚", furigana: "ぶた", romaji: "buta", meaning: "豬", category: "biological_world" }
];

const projectDir = __dirname;
const filePath = path.join(projectDir, 'data.js');

let content = fs.readFileSync(filePath, 'utf8');
const fileContext = { window: {} };
vm.createContext(fileContext);
vm.runInContext(content, fileContext);

const data = fileContext.window.JLPT_DATA;

wordsToAdd.forEach(entry => {
  // Check duplicate
  const duplicate = data.vocabulary.find(v => v.word === entry.word || v.furigana === entry.furigana);
  if (!duplicate) {
    const fullEntry = {
      ...entry,
      exampleJa: `これは「${entry.word}」の例です。`,
      exampleFurigana: `これは「${entry.furigana}」のれいです。`,
      exampleEn: `這是「${entry.meaning}」的例句。`,
      level: "N5"
    };
    data.vocabulary.push(fullEntry);
    console.log(`Added: ${entry.word}`);
  } else {
    console.log(`Skipped duplicate: ${entry.word}`);
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');

console.log("Successfully updated data.js");
