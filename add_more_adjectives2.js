const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

// The user's requested adjectives + new ones
const newAdjectives = [
  // 1. 情感與心理狀態
  { word: "怪しい (あやしい)", meaning: "可疑的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "恋しい (こいしい)", meaning: "令人懷念的/眷戀的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "悔しい (くやしい)", meaning: "懊悔的/不甘心的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "残念な (ざんねんな)", meaning: "遺憾的/可惜的", type: "na", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "可笑しい (おかしい)", meaning: "可笑的/好笑的", type: "i", context: "情感與心理狀態", subcontext: "正面情緒" },

  // 2. 五官感知
  { word: "臭い (くさい)", meaning: "臭的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "痒い (かゆい)", meaning: "癢的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },
  { word: "眩しい (まぶしい)", meaning: "刺眼的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "ぬるい", meaning: "微溫的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },

  // 3. 物理狀態與性質
  { word: "丸い / 円い (まるい)", meaning: "圓的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "四角い (しかくい)", meaning: "四角的/方形的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "鋭い (するどい)", meaning: "銳利的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "鈍い (にぶい)", meaning: "遲鈍的/鈍的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "きつい", meaning: "緊的/艱苦的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "ゆるい", meaning: "鬆的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "細かい (こまかい)", meaning: "細微的/零碎的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },

  // 4. 性格與人際評價
  { word: "大人しい (おとなしい)", meaning: "溫順的/老實的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "生意気な (なまいきな)", meaning: "傲慢的/自大的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "偉大な (いだいな)", meaning: "偉大的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "優秀な (ゆうしゅうな)", meaning: "優秀的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "豊かな (ゆたかな)", meaning: "豐富的/富裕的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "適当な (てきとうな)", meaning: "適當的/敷衍的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "熱心な (ねっしんな)", meaning: "熱心的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "素直な (すなおな)", meaning: "坦率的/聽話的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },

  // 5. 抽象概念與價值判斷
  { word: "等しい (ひとしい)", meaning: "相等的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "珍しい (めずらしい)", meaning: "罕見的/稀奇的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "激しい (はげしい)", meaning: "激烈的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "厳しい (きびしい)", meaning: "嚴峻的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "特別な (とくべつな)", meaning: "特別的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "十分な (じゅうぶんな)", meaning: "充足的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "無理な (むりな)", meaning: "勉強的/辦不到的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "自由な (じゆうな)", meaning: "自由的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "重要な (じゅうような)", meaning: "重要的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "必要な (ひつような)", meaning: "必要的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "完全な (かんぜんな)", meaning: "完全的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "盛んな (さかんな)", meaning: "繁盛的", type: "na", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "清潔な (せいけつな)", meaning: "清潔的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" }
];

// Combine all existing adjectives into a flat list
const existingMap = {};
for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (!window.JLPT_DATA.adjectiveGroups[lvl]) {
    window.JLPT_DATA.adjectiveGroups[lvl] = { iAdjectives: [], naAdjectives: [] };
  }
  window.JLPT_DATA.adjectiveGroups[lvl].iAdjectives.forEach(a => existingMap[a.word.split(' ')[0]] = a);
  window.JLPT_DATA.adjectiveGroups[lvl].naAdjectives.forEach(a => existingMap[a.word.split(' ')[0]] = a);
}

// Function to generate conjugations
function generateConjugations(wordObj) {
  const base = wordObj.word.split(" ")[0];
  if (wordObj.type === 'i') {
    if (base === 'いい' || base === '良い') {
      return {
        ...wordObj,
        negative: "よくない / よくありません",
        past: "よかった / よかったです",
        past_negative: "よくなかった / よくありませんでした",
        te: "よくて",
        adverb: "よく"
      };
    }
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
    // na adjective
    let stem = base;
    if (stem.endsWith('だ')) stem = stem.slice(0, -1);
    if (stem.endsWith('な')) stem = stem.slice(0, -1);
    
    // Some dict forms have 'な' at the end for na adjectives, keep 'な' in word for display
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
// Process user adjectives
for (let item of newAdjectives) {
  let base = item.word.split(" ")[0];
  if (base.endsWith('な')) base = base.slice(0, -1);
  
  if (existingMap[base] || existingMap[base+'な']) {
    // skip or just overwrite context
    let existing = existingMap[base] || existingMap[base+'な'];
    existing.context = item.context;
    existing.subcontext = item.subcontext;
  } else {
    // Add new to N5
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
