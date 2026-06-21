const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const newAdjectives = [
  // 1. 情感與心理狀態
  { word: "寂しい (さみしい)", meaning: "寂寞的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "愉快な (ゆかいな)", meaning: "愉快的", type: "na", context: "情感與心理狀態", subcontext: "正面情緒" },
  { word: "退屈な (たいくつな)", meaning: "無聊的", type: "na", context: "情感與心理狀態", subcontext: "負面情緒" },

  // 2. 五官感知
  { word: "温かい (ぬくい)", meaning: "溫暖的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },
  { word: "真っ暗な (まっくらな)", meaning: "漆黑的", type: "na", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "真っ白な (まっしろな)", meaning: "純白的", type: "na", context: "五官感知", subcontext: "視覺與聽覺" },

  // 3. 物理狀態與性質
  { word: "深い (ふかい)", meaning: "深的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "浅い (あさい)", meaning: "淺的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "激しい (はげしい)", meaning: "猛烈的(雨/風)", type: "i", context: "物理狀態與性質", subcontext: "溫度與天氣" },

  // 4. 性格與人際評價
  { word: "立派な (りっぱな)", meaning: "出色的/壯麗的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "派手な (はでな)", meaning: "華麗的/花俏的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "地味な (じみな)", meaning: "樸素的/不起眼的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "馬鹿な (ばかな)", meaning: "愚蠢的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },

  // 5. 抽象概念與價值判斷
  { word: "詳しい (くわしい)", meaning: "詳細的/精通的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "正しい (ただしい)", meaning: "正確的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "等しい (ひとしい)", meaning: "相等的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "ひどい", meaning: "糟糕的/殘酷的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "盛んな (さかんな)", meaning: "繁盛的/熱烈的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "十分な (じゅうぶんな)", meaning: "充足的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" }
];

const existingMap = {};
for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (!window.JLPT_DATA.adjectiveGroups[lvl]) {
    window.JLPT_DATA.adjectiveGroups[lvl] = { iAdjectives: [], naAdjectives: [] };
  }
  window.JLPT_DATA.adjectiveGroups[lvl].iAdjectives.forEach(a => existingMap[a.word.split(' ')[0]] = a);
  window.JLPT_DATA.adjectiveGroups[lvl].naAdjectives.forEach(a => existingMap[a.word.split(' ')[0]] = a);
}

function generateConjugations(wordObj) {
  const base = wordObj.word.split(" ")[0];
  if (wordObj.type === 'i') {
    const stem = base.slice(0, -1);
    return {
      ...wordObj,
      negative: stem + "くない / " + stem + "くありません",
      past: stem + "かった / " + stem + "かったです",
      past_negative: stem + "くなかった / " + stem + "くありませんでした",
      te: stem + "くて",
      adverb: stem + "く"
    };
  } else {
    let stem = base;
    if (stem.endsWith('だ')) stem = stem.slice(0, -1);
    if (stem.endsWith('な')) stem = stem.slice(0, -1);
    
    let displayWord = stem + "な";
    if (wordObj.word.includes('(')) {
        displayWord = stem + "な " + wordObj.word.substring(wordObj.word.indexOf('('));
    } else {
        displayWord = stem + "な";
    }

    return {
      ...wordObj,
      word: displayWord,
      negative: stem + "ではない / " + stem + "ではありません",
      past: stem + "だった / " + stem + "でした",
      past_negative: stem + "ではなかった / " + stem + "ではありませんでした",
      te: stem + "で",
      adverb: stem + "に"
    };
  }
}

let addedCount = 0;
for (let item of newAdjectives) {
  let base = item.word.split(" ")[0];
  if (base.endsWith('な')) base = base.slice(0, -1);
  
  if (existingMap[base] || existingMap[base+'な']) {
    let existing = existingMap[base] || existingMap[base+'な'];
    existing.context = item.context;
    existing.subcontext = item.subcontext;
  } else {
    addedCount++;
    let fullItem = generateConjugations(item);
    if (item.type === 'i') {
      window.JLPT_DATA.adjectiveGroups['N5'].iAdjectives.push(fullItem);
    } else {
      window.JLPT_DATA.adjectiveGroups['N5'].naAdjectives.push(fullItem);
    }
  }
}

const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully added ' + addedCount + ' new adjectives.');
