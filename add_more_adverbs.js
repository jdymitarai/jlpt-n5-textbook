const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const newAdverbsMap = {
  // 1. 時間副詞
  "これから": { meaning: "從現在起", context: "時間副詞", subcontext: "現在與未來" },
  "やがて": { meaning: "不久/即將", context: "時間副詞", subcontext: "現在與未來" },
  "まもなく": { meaning: "不久/一會兒", context: "時間副詞", subcontext: "現在與未來" },
  "いつか": { meaning: "遲早/總有一天", context: "時間副詞", subcontext: "現在與未來" },
  "つい": { meaning: "不知不覺/剛才", context: "時間副詞", subcontext: "過去與完成" },
  "とうとう": { meaning: "終於/到底", context: "時間副詞", subcontext: "過去與完成" },
  "やっと": { meaning: "好不容易才...", context: "時間副詞", subcontext: "過去與完成" },
  "ついに": { meaning: "終於", context: "時間副詞", subcontext: "過去與完成" },
  "だいたい": { meaning: "大概/大約", context: "程度副詞", subcontext: "高程度" },
  "大抵 (たいてい)": { meaning: "大抵/通常", context: "時間副詞", subcontext: "頻率" },
  "たまに": { meaning: "偶爾", context: "時間副詞", subcontext: "頻率" },
  "滅多に (めったに)": { meaning: "難得/罕見", context: "時間副詞", subcontext: "頻率" },

  // 2. 程度副詞
  "非常に (ひじょうに)": { meaning: "非常", context: "程度副詞", subcontext: "高程度" },
  "大変 (たいへん)": { meaning: "非常/很", context: "程度副詞", subcontext: "高程度" },
  "だいぶ": { meaning: "很/相當", context: "程度副詞", subcontext: "高程度" },
  "ずいぶん": { meaning: "相當/非常", context: "程度副詞", subcontext: "高程度" },
  "なかなか": { meaning: "相當/很", context: "程度副詞", subcontext: "高程度" },
  "いくら": { meaning: "無論怎麼...", context: "程度副詞", subcontext: "比較與極端" },
  "少しも (すこしも)": { meaning: "一點也不...", context: "程度副詞", subcontext: "低程度" },
  "ちっとも": { meaning: "一點也不...", context: "程度副詞", subcontext: "低程度" },
  "ますます": { meaning: "越來越", context: "程度副詞", subcontext: "比較與極端" },
  "いよいよ": { meaning: "越發/終於", context: "程度副詞", subcontext: "比較與極端" },
  "全く (まったく)": { meaning: "完全/簡直", context: "程度副詞", subcontext: "極限與全面" },
  "すっかり": { meaning: "完全地", context: "程度副詞", subcontext: "極限與全面" },
  "全部 (ぜんぶ)": { meaning: "全部", context: "程度副詞", subcontext: "極限與全面" },

  // 3. 狀態副詞
  "きちんと": { meaning: "整潔地/好好地", context: "狀態副詞", subcontext: "動作的樣子" },
  "ちゃんと": { meaning: "規矩地/確實地", context: "狀態副詞", subcontext: "動作的樣子" },
  "そっと": { meaning: "輕輕地/悄悄地", context: "狀態副詞", subcontext: "動作的樣子" },
  "ぐっすり": { meaning: "熟睡地", context: "狀態副詞", subcontext: "動作的樣子" },
  "にこにこ": { meaning: "笑瞇瞇地", context: "狀態副詞", subcontext: "擬態語" },
  "ぺらぺら": { meaning: "流利地", context: "狀態副詞", subcontext: "擬態語" },
  "すらすら": { meaning: "流暢地", context: "狀態副詞", subcontext: "擬態語" },
  "ぶつぶつ": { meaning: "抱怨地/嘟囔地", context: "狀態副詞", subcontext: "擬聲語" },
  "うっかり": { meaning: "不小心/發呆", context: "狀態副詞", subcontext: "動作的樣子" },
  "がっかり": { meaning: "失望地", context: "狀態副詞", subcontext: "擬態語" },
  "のんびり": { meaning: "悠閒地", context: "狀態副詞", subcontext: "動作的樣子" },

  // 4. 陳述副詞 (呼應)
  "まさか": { meaning: "怎麼可能...", context: "陳述副詞", subcontext: "呼應推測" },
  "どうして": { meaning: "為什麼", context: "陳述副詞", subcontext: "呼應疑問" },
  "なぜ": { meaning: "為什麼", context: "陳述副詞", subcontext: "呼應疑問" },
  "どうぞ": { meaning: "請...", context: "陳述副詞", subcontext: "呼應願望" },
  "ぜひ": { meaning: "務必...", context: "陳述副詞", subcontext: "呼應願望" },
  "たしか": { meaning: "確實/大概", context: "陳述副詞", subcontext: "呼應推測" },
  "絶対に (ぜったいに)": { meaning: "絕對", context: "陳述副詞", subcontext: "呼應否定" },
  "決して (けっして)": { meaning: "決不...", context: "陳述副詞", subcontext: "呼應否定" },
  "たぶん": { meaning: "大概", context: "陳述副詞", subcontext: "呼應推測" }
};

const existingSet = new Set();
for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (window.JLPT_DATA.adverbsGroup[lvl]) {
    for (let i = 0; i < window.JLPT_DATA.adverbsGroup[lvl].length; i++) {
      let a = window.JLPT_DATA.adverbsGroup[lvl][i];
      let word = a.word;
      if (word.includes('(')) word = word.split('(')[0].trim();
      
      existingSet.add(word);
      if (newAdverbsMap[word]) {
        a.context = newAdverbsMap[word].context;
        a.subcontext = newAdverbsMap[word].subcontext;
      }
    }
  } else {
    window.JLPT_DATA.adverbsGroup[lvl] = [];
  }
}

let newCount = 0;
for (const [word, data] of Object.entries(newAdverbsMap)) {
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

console.log('Successfully added ' + newCount + ' new adverbs.');
