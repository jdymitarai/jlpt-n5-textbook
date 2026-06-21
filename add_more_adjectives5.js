const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const newAdjectives = [
  // N4/N3 adjectives
  { word: "素晴らしい (すばらしい)", meaning: "極好的", type: "i", context: "情感與心理狀態", subcontext: "正面情緒" },
  { word: "親しい (したしい)", meaning: "親近的/親密的", type: "i", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "詳しい (くわしい)", meaning: "詳細的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "細かい (こまかい)", meaning: "細微的/零碎的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "浅い (あさい)", meaning: "淺的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "固い (かたい)", meaning: "堅固的", type: "i", context: "物理狀態與性質", subcontext: "觸覺與痛覺" },
  { word: "ぬるい", meaning: "微溫的", type: "i", context: "物理狀態與性質", subcontext: "溫度與天氣" },
  { word: "まぶしい", meaning: "耀眼的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "蒸し暑い (むしあつい)", meaning: "悶熱的", type: "i", context: "物理狀態與性質", subcontext: "溫度與天氣" },
  { word: "清潔な (せいけつな)", meaning: "清潔的", type: "na", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "安全な (あんぜんな)", meaning: "安全的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "危険な (きけんな)", meaning: "危險的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "盛んな (さかんな)", meaning: "繁盛的", type: "na", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "熱心な (ねっしんな)", meaning: "熱心的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "夢中な (むちゅうな)", meaning: "熱衷的/入迷的", type: "na", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "退屈な (たいくつな)", meaning: "無聊的", type: "na", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "苦しい (くるしい)", meaning: "痛苦的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "きつい", meaning: "緊的/累人的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "緩い (ゆるい)", meaning: "鬆的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "悔しい (くやしい)", meaning: "懊悔的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "羨ましい (うらやましい)", meaning: "羨慕的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "痒い (かゆい)", meaning: "癢的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },
  { word: "おとなしい", meaning: "老實的/乖巧的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "しつこい", meaning: "執拗的/煩人的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "鋭い (するどい)", meaning: "尖銳的/敏銳的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "鈍い (にぶい)", meaning: "遲鈍的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "のろい", meaning: "遲緩的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "くだらない", meaning: "無聊的/沒價值的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "だらしない", meaning: "散漫的/邋遢的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "図々しい (ずうずうしい)", meaning: "厚顏無恥的", type: "i", context: "性格與人際評價", subcontext: "性格特質" }
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
