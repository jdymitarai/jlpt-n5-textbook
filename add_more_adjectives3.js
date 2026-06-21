const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

// The user's requested adjectives + new ones
const newAdjectives = [
  // 1. 情感與心理狀態
  { word: "苦しい (くるしい)", meaning: "痛苦的/艱苦的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "寂しい (さびしい)", meaning: "寂寞的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "懐かしい (なつかしい)", meaning: "令人懷念的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "恥ずかしい (はずかしい)", meaning: "害羞的/丟臉的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "羨ましい (うらやましい)", meaning: "羨慕的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "面倒な (めんどうな)", meaning: "麻煩的", type: "na", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "幸せな (しあわせな)", meaning: "幸福的", type: "na", context: "情感與心理狀態", subcontext: "正面情緒" },

  // 2. 五官感知
  { word: "甘い (あまい)", meaning: "甜的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "辛い (からい)", meaning: "辣的/鹹的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "酸っぱい (すっぱい)", meaning: "酸的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "苦い (にがい)", meaning: "苦的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "濃い (こい)", meaning: "濃的/深的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "薄い (うすい)", meaning: "薄的/淡的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "うるさい", meaning: "吵鬧的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "冷たい (つめたい)", meaning: "冰冷的(觸覺)", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },
  { word: "柔らかい (やわらかい)", meaning: "柔軟的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },
  { word: "硬い (かたい)", meaning: "堅硬的", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },

  // 3. 物理狀態與性質
  { word: "遠い (とおい)", meaning: "遠的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "近い (ちかい)", meaning: "近的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "速い (はやい)", meaning: "快的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "遅い (おそい)", meaning: "慢的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "高い (たかい)", meaning: "高的/貴的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "安い (やすい)", meaning: "便宜的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },
  { word: "多い (おおい)", meaning: "多的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "少ない (すくない)", meaning: "少的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "重い (おもい)", meaning: "重的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "軽い (かるい)", meaning: "輕的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "明るい (あかるい)", meaning: "明亮的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "暗い (くらい)", meaning: "昏暗的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },

  // 4. 性格與人際評價
  { word: "優しい (やさしい)", meaning: "溫柔的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "真面目な (まじめな)", meaning: "認真的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "わがままな", meaning: "任性的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "意地悪な (いじわるな)", meaning: "愛惡作劇的/壞心眼的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "偉い (えらい)", meaning: "了不起的", type: "i", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "丁寧な (ていねいな)", meaning: "有禮貌的/仔細的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "失礼な (しつれいな)", meaning: "失禮的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "有名な (ゆうめいな)", meaning: "有名的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "安全な (あんぜんな)", meaning: "安全的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "危険な (きけんな)", meaning: "危險的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },

  // 5. 抽象概念與價值判斷
  { word: "良い (よい/いい)", meaning: "好的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "悪い (わるい)", meaning: "壞的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "無駄な (むだな)", meaning: "浪費的/徒勞的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "難しい (むずかしい)", meaning: "困難的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "簡単な (かんたんな)", meaning: "簡單的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "易しい (やさしい)", meaning: "容易的", type: "i", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "新しい (あたらしい)", meaning: "新的", type: "i", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "古い (ふるい)", meaning: "舊的", type: "i", context: "抽象概念與價值判斷", subcontext: "時間與新舊" }
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
