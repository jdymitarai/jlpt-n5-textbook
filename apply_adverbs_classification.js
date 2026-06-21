const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const adverbsMap = {
  // 1. 狀態副詞
  "ゆっくり": { meaning: "慢慢地", context: "狀態副詞", subcontext: "動作的樣子" },
  "はっきり": { meaning: "清楚地", context: "狀態副詞", subcontext: "動作的樣子" },
  "しっかり": { meaning: "確實地", context: "狀態副詞", subcontext: "動作的樣子" },
  "じっと": { meaning: "一動也不動地", context: "狀態副詞", subcontext: "動作的樣子" },
  "突然": { meaning: "突然地", context: "狀態副詞", subcontext: "突發狀態" },
  "いきなり": { meaning: "冷不防地", context: "狀態副詞", subcontext: "突發狀態" },
  "すぐ": { meaning: "立刻/馬上", context: "狀態副詞", subcontext: "突發狀態" },
  "ザーザー": { meaning: "嘩啦嘩啦", context: "狀態副詞", subcontext: "擬聲語" },
  "ワンワン": { meaning: "汪汪", context: "狀態副詞", subcontext: "擬聲語" },
  "ドキドキ": { meaning: "心跳加速地", context: "狀態副詞", subcontext: "擬態語" },
  "ピカピカ": { meaning: "閃閃發光", context: "狀態副詞", subcontext: "擬態語" },
  "こっそり": { meaning: "偷偷地", context: "狀態副詞", subcontext: "擬態語" },
  "そのまま": { meaning: "就那樣", context: "狀態副詞", subcontext: "動作的樣子" },
  "わざと": { meaning: "故意地", context: "狀態副詞", subcontext: "動作的樣子" },

  // 2. 程度副詞
  "とても": { meaning: "非常", context: "程度副詞", subcontext: "高程度" },
  "かなり": { meaning: "相當", context: "程度副詞", subcontext: "高程度" },
  "すごく": { meaning: "極度", context: "程度副詞", subcontext: "高程度" },
  "極めて": { meaning: "極其", context: "程度副詞", subcontext: "高程度" },
  "少し": { meaning: "稍微/一點點", context: "程度副詞", subcontext: "低程度" },
  "ちょっと": { meaning: "一點點", context: "程度副詞", subcontext: "低程度" },
  "わずか": { meaning: "僅僅", context: "程度副詞", subcontext: "低程度" },
  "もっと": { meaning: "更加", context: "程度副詞", subcontext: "比較與極端" },
  "ずっと": { meaning: "...得多", context: "程度副詞", subcontext: "比較與極端" },
  "最も": { meaning: "最", context: "程度副詞", subcontext: "比較與極端" },
  "一番": { meaning: "第一/最", context: "程度副詞", subcontext: "比較與極端" },
  "すっかり": { meaning: "完全地", context: "程度副詞", subcontext: "極限與全面" },
  "ほぼ": { meaning: "幾乎", context: "程度副詞", subcontext: "極限與全面" },
  "だんだん": { meaning: "漸漸地", context: "程度副詞", subcontext: "比較與極端" },
  "ますます": { meaning: "越來越...", context: "程度副詞", subcontext: "比較與極端" },

  // 3. 陳述副詞
  "決して": { meaning: "絕對不...", context: "陳述副詞", subcontext: "呼應否定" },
  "全然": { meaning: "完全不...", context: "陳述副詞", subcontext: "呼應否定" },
  "ちっとも": { meaning: "一點也不...", context: "陳述副詞", subcontext: "呼應否定" },
  "めったに": { meaning: "罕見.../幾乎不...", context: "陳述副詞", subcontext: "呼應否定" },
  "たぶん": { meaning: "大概...", context: "陳述副詞", subcontext: "呼應推測" },
  "おそらく": { meaning: "恐怕.../大概...", context: "陳述副詞", subcontext: "呼應推測" },
  "きっと": { meaning: "一定...", context: "陳述副詞", subcontext: "呼應推測" },
  "ぜひ": { meaning: "務必...", context: "陳述副詞", subcontext: "呼應願望" },
  "どうか": { meaning: "祈求/請...", context: "陳述副詞", subcontext: "呼應願望" },
  "もし": { meaning: "如果...", context: "陳述副詞", subcontext: "呼應假設" },
  "万一": { meaning: "萬一...", context: "陳述副詞", subcontext: "呼應假設" },
  "まるで": { meaning: "簡直就像...", context: "陳述副詞", subcontext: "呼應比喻" },
  "あたかも": { meaning: "宛如...", context: "陳述副詞", subcontext: "呼應比喻" },
  
  // Extra temporal ones we mapped earlier
  "今": { meaning: "現在", context: "時間副詞", subcontext: "現在與未來" },
  "もうすぐ": { meaning: "快要", context: "時間副詞", subcontext: "現在與未來" },
  "後で": { meaning: "稍後", context: "時間副詞", subcontext: "現在與未來" },
  "さっき": { meaning: "剛才", context: "時間副詞", subcontext: "過去與完成" },
  "昔": { meaning: "以前", context: "時間副詞", subcontext: "過去與完成" },
  "すでに": { meaning: "已經", context: "時間副詞", subcontext: "過去與完成" },
  "もう": { meaning: "已經/再", context: "時間副詞", subcontext: "過去與完成" },
  "まだ": { meaning: "還沒", context: "時間副詞", subcontext: "現在與未來" },
  "いつも": { meaning: "總是", context: "時間副詞", subcontext: "頻率" },
  "よく": { meaning: "經常", context: "時間副詞", subcontext: "頻率" },
  "たまに": { meaning: "偶爾", context: "時間副詞", subcontext: "頻率" },
  "時々": { meaning: "有時", context: "時間副詞", subcontext: "頻率" },
  "また": { meaning: "又/再", context: "時間副詞", subcontext: "頻率" }
};

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
        if (!a.context) a.context = "時間副詞"; // default
      }
    }
  }
}

let newCount = 0;
for (const [word, data] of Object.entries(adverbsMap)) {
  if (!existingSet.has(word)) {
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

// Also update index.html filters to match the new categories: 狀態副詞, 程度副詞, 陳述副詞, 時間副詞
let html = fs.readFileSync('index.html', 'utf8');
const filterRegex = /<div class="filter-group" id="adv-context-filter">[\s\S]*?<\/div>/;
const newFilterHtml = '<div class="filter-group" id="adv-context-filter">\n' +
                      '  <button class="filter-btn active" data-context="All">全部</button>\n' +
                      '  <button class="filter-btn" data-context="時間副詞">時間與頻率</button>\n' +
                      '  <button class="filter-btn" data-context="狀態副詞">狀態副詞</button>\n' +
                      '  <button class="filter-btn" data-context="程度副詞">程度副詞</button>\n' +
                      '  <button class="filter-btn" data-context="陳述副詞">陳述副詞 (呼應)</button>\n' +
                      '</div>';
html = html.replace(filterRegex, newFilterHtml);
fs.writeFileSync('index.html', html, 'utf8');

console.log('Successfully structured adverbs with linguistic categories.');
