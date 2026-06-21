const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

// The user's requested adjectives + new ones
const newAdjectives = [
  // 1. 情感與心理狀態
  // 正面情緒
  { word: "素晴らしい (すばらしい)", meaning: "極好的/出色的", type: "i", context: "情感與心理狀態", subcontext: "正面情緒" },
  { word: "面白い (おもしろい)", meaning: "有趣的", type: "i", context: "情感與心理狀態", subcontext: "正面情緒" },
  // 負面情緒
  { word: "つまらない", meaning: "無聊的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "苦しい (くるしい)", meaning: "痛苦的", type: "i", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "可哀想な (かわいそうな)", meaning: "可憐的", type: "na", context: "情感與心理狀態", subcontext: "負面情緒" },
  { word: "嫌な (いやな)", meaning: "討厭的", type: "na", context: "情感與心理狀態", subcontext: "負面情緒" },
  // 心理感受
  { word: "眠い (ねむい)", meaning: "想睡的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "おかしい", meaning: "奇怪的/可笑的", type: "i", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "心配な (しんぱいな)", meaning: "擔心的", type: "na", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "好きな (すきな)", meaning: "喜歡的", type: "na", context: "情感與心理狀態", subcontext: "心理感受" },
  { word: "嫌いな (きらいな)", meaning: "討厭的", type: "na", context: "情感與心理狀態", subcontext: "心理感受" },

  // 2. 五官感知
  // 味覺
  { word: "しょっぱい", meaning: "鹹的", type: "i", context: "五官感知", subcontext: "味覺" },
  { word: "まずい", meaning: "難吃的", type: "i", context: "五官感知", subcontext: "味覺" },
  // 視覺與聽覺
  { word: "美しい (うつくしい)", meaning: "美麗的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "汚い (きたない)", meaning: "髒的", type: "i", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "きれいな", meaning: "漂亮的/乾淨的", type: "na", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "静かな (しずかな)", meaning: "安靜的", type: "na", context: "五官感知", subcontext: "視覺與聽覺" },
  { word: "賑やかな (にぎやかな)", meaning: "熱鬧的", type: "na", context: "五官感知", subcontext: "視覺與聽覺" },
  // 觸覺與痛覺
  { word: "温かい (あたたかい)", meaning: "溫的(觸覺)", type: "i", context: "五官感知", subcontext: "觸覺與痛覺" },

  // 3. 物理狀態與性質
  // 尺寸與重量
  { word: "太い (ふとい)", meaning: "粗的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "細い (ほそい)", meaning: "細的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "厚い (あつい)", meaning: "厚的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "薄い (うすい)", meaning: "薄的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "深い (ふかい)", meaning: "深的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "浅い (あさい)", meaning: "淺的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "広い (ひろい)", meaning: "寬廣的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "狭い (せまい)", meaning: "狹窄的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  { word: "短い (みじかい)", meaning: "短的", type: "i", context: "物理狀態與性質", subcontext: "尺寸與重量" },
  
  // 空間與速度
  { word: "低い (ひくい)", meaning: "低的", type: "i", context: "物理狀態與性質", subcontext: "空間與速度" },

  // 4. 性格與人際評價
  // 性格特質
  { word: "厳しい (きびしい)", meaning: "嚴格的", type: "i", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "親切な (しんせつな)", meaning: "親切的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "元気な (げんきな)", meaning: "有精神的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  { word: "静かな (しずかな)", meaning: "文靜的", type: "na", context: "性格與人際評價", subcontext: "性格特質" },
  // 社會評價
  { word: "有名な (ゆうめいな)", meaning: "有名的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "立派な (りっぱな)", meaning: "氣派的/傑出的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "上手な (じょうずな)", meaning: "擅長的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "下手な (へたな)", meaning: "不擅長的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "得意な (とくいな)", meaning: "拿手的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "苦手な (にがてな)", meaning: "不拿手的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "便利な (べんりな)", meaning: "方便的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },
  { word: "不便な (ふべんな)", meaning: "不方便的", type: "na", context: "性格與人際評價", subcontext: "社會評價" },

  // 5. 抽象概念與價值判斷
  // 好壞與價值
  { word: "正しい (ただしい)", meaning: "正確的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "ひどい", meaning: "過分的/嚴重的", type: "i", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "大切な (たいせつな)", meaning: "重要的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "大事な (だいじな)", meaning: "重要的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  { word: "好きな (すきな)", meaning: "喜歡的", type: "na", context: "抽象概念與價值判斷", subcontext: "好壞與價值" },
  
  // 難易與安全
  { word: "丈夫な (じょうぶな)", meaning: "堅固的/結實的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },
  { word: "複雑な (ふくざつな)", meaning: "複雜的", type: "na", context: "抽象概念與價值判斷", subcontext: "難易與安全" },

  // 時間與新舊
  { word: "若い (わかい)", meaning: "年輕的", type: "i", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "忙しい (いそがしい)", meaning: "忙碌的", type: "i", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "暇な (ひまな)", meaning: "空閒的", type: "na", context: "抽象概念與價值判斷", subcontext: "時間與新舊" },
  { word: "急な (きゅうな)", meaning: "緊急的/突然的", type: "na", context: "抽象概念與價值判斷", subcontext: "時間與新舊" }
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
