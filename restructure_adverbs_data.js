const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const adverbsMap = {
  // 1. 時間與頻率
  "今": { meaning: "現在", context: "時間與頻率", subcontext: "現在與未來" },
  "すぐ": { meaning: "馬上", context: "時間與頻率", subcontext: "現在未來" },
  "もうすぐ": { meaning: "快要", context: "時間與頻率", subcontext: "現在未來" },
  "後で": { meaning: "稍後", context: "時間與頻率", subcontext: "現在未來" },
  "さっき": { meaning: "剛才", context: "時間與頻率", subcontext: "過去與完成" },
  "昔": { meaning: "以前", context: "時間與頻率", subcontext: "過去與完成" },
  "すでに": { meaning: "已經", context: "時間與頻率", subcontext: "過去與完成" },
  "もう": { meaning: "已經/再", context: "時間與頻率", subcontext: "過去與完成" },
  "まだ": { meaning: "還沒", context: "時間與頻率", subcontext: "現在未來" },
  "いつも": { meaning: "總是", context: "時間與頻率", subcontext: "頻率" },
  "よく": { meaning: "經常", context: "時間與頻率", subcontext: "頻率" },
  "たまに": { meaning: "偶爾", context: "時間與頻率", subcontext: "頻率" },
  "全然": { meaning: "完全不...", context: "時間與頻率", subcontext: "頻率" },
  "時々": { meaning: "有時", context: "時間與頻率", subcontext: "頻率" },
  "また": { meaning: "又/再", context: "時間與頻率", subcontext: "頻率" },
  
  // 2. 程度與數量
  "とても": { meaning: "非常", context: "程度與數量", subcontext: "高度與極端" },
  "かなり": { meaning: "相當", context: "程度與數量", subcontext: "高度與極端" },
  "すごく": { meaning: "極度", context: "程度與數量", subcontext: "高度與極端" },
  "最も": { meaning: "最...", context: "程度與數量", subcontext: "高度與極端" },
  "一番": { meaning: "最", context: "程度與數量", subcontext: "高度與極端" },
  "少し": { meaning: "一點點", context: "程度與數量", subcontext: "微小與中等" },
  "ちょっと": { meaning: "稍微", context: "程度與數量", subcontext: "微小與中等" },
  "まあまあ": { meaning: "還算可以", context: "程度與數量", subcontext: "微小與中等" },
  "もっと": { meaning: "更加", context: "程度與數量", subcontext: "增減與極限" },
  "ますます": { meaning: "越來越...", context: "程度與數量", subcontext: "增減與極限" },
  "ほぼ": { meaning: "幾乎", context: "程度與數量", subcontext: "增減與極限" },
  "だんだん": { meaning: "漸漸地", context: "程度與數量", subcontext: "增減與極限" },
  "たくさん": { meaning: "很多", context: "程度與數量", subcontext: "高度與極端" },
  "大分": { meaning: "相當/很大程度", context: "程度與數量", subcontext: "高度與極端" },

  // 3. 狀態與模樣
  "ゆっくり": { meaning: "慢慢地", context: "狀態與模樣", subcontext: "動作方式" },
  "はっきり": { meaning: "清楚地", context: "狀態與模樣", subcontext: "動作方式" },
  "しっかり": { meaning: "確實地/牢固地", context: "狀態與模樣", subcontext: "動作方式" },
  "こっそり": { meaning: "偷偷地", context: "狀態與模樣", subcontext: "動作方式" },
  "イライラ": { meaning: "焦躁地", context: "狀態與模樣", subcontext: "心理生理模樣" },
  "ドキドキ": { meaning: "心跳加速地", context: "狀態與模樣", subcontext: "心理生理模樣" },
  "ペコペコ": { meaning: "肚子餓/點頭哈腰", context: "狀態與模樣", subcontext: "心理生理模樣" },
  "ピカピカ": { meaning: "閃閃發光", context: "狀態與模樣", subcontext: "自然物理模樣" },
  "サラサラ": { meaning: "柔順/清爽", context: "狀態與模樣", subcontext: "自然物理模樣" },
  "ドカン": { meaning: "砰的一聲", context: "狀態與模樣", subcontext: "自然物理模樣" },
  "そのまま": { meaning: "就那樣/照原樣", context: "狀態與模樣", subcontext: "動作方式" },
  "わざと": { meaning: "故意地", context: "狀態與模樣", subcontext: "動作方式" },

  // 4. 語氣、推測與呼應
  "たぶん": { meaning: "大概", context: "語氣與推測", subcontext: "推測與可能性" },
  "もしかすると": { meaning: "說不定", context: "語氣與推測", subcontext: "推測與可能性" },
  "きっと": { meaning: "一定", context: "語氣與推測", subcontext: "推測與可能性" },
  "決して": { meaning: "絕對不...", context: "語氣與推測", subcontext: "強烈否定斷定" },
  "絶対に": { meaning: "絕對...", context: "語氣與推測", subcontext: "強烈否定斷定" },
  "ぜひ": { meaning: "務必", context: "語氣與推測", subcontext: "強烈否定斷定" },
  "まるで": { meaning: "簡直就像...", context: "語氣與推測", subcontext: "比喻與舉例" },
  "例えば": { meaning: "例如", context: "語氣與推測", subcontext: "比喻與舉例" },
  "もし": { meaning: "如果", context: "語氣與推測", subcontext: "推測與可能性" },
  "どうも": { meaning: "總覺得/實在是", context: "語氣與推測", subcontext: "推測與可能性" }
};

// Process N5 to N1 existing adverbs, set their context
const existingSet = new Set();
for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (window.JLPT_DATA.adverbsGroup[lvl]) {
    for (let i = 0; i < window.JLPT_DATA.adverbsGroup[lvl].length; i++) {
      let a = window.JLPT_DATA.adverbsGroup[lvl][i];
      let word = a.word;
      if (word.includes('(')) word = word.split('(')[0].trim();
      
      existingSet.add(word);
      if (adverbsMap[word]) {
        a.context = adverbsMap[word].context;
        a.subcontext = adverbsMap[word].subcontext;
      } else {
        // Fallback for adverbs not explicitly listed
        a.context = "時間與頻率"; // Default
        a.subcontext = "其他";
        // Simple heuristics
        if (["とても", "すこし", "ちょっと", "たくさん", "だいぶ", "かなり", "もっと", "一番"].includes(word)) {
           a.context = "程度與數量";
        }
      }
    }
  } else {
    window.JLPT_DATA.adverbsGroup[lvl] = [];
  }
}

// Add new adverbs that weren't in the list
let newCount = 0;
for (const [word, data] of Object.entries(adverbsMap)) {
  if (!existingSet.has(word)) {
    // Add to N5
    window.JLPT_DATA.adverbsGroup['N5'].push({
      word: word,
      meaning: data.meaning,
      context: data.context,
      subcontext: data.subcontext
    });
    newCount++;
  }
}

const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully structured adverbs and added ' + newCount + ' new adverbs.');
