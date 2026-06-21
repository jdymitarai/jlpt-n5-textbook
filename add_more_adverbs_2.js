const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

const newAdverbsMap = {
  // 1. 時間副詞
  "このごろ": { meaning: "最近/近來", context: "時間副詞", subcontext: "過去與完成" },
  "最近 (さいきん)": { meaning: "最近", context: "時間副詞", subcontext: "過去與完成" },
  "ずっと": { meaning: "一直/很久", context: "時間副詞", subcontext: "頻率" }, // can also be 程度
  "たちまち": { meaning: "轉眼間/立刻", context: "時間副詞", subcontext: "現在與未來" },
  "とっくに": { meaning: "早就", context: "時間副詞", subcontext: "過去與完成" },
  "いまだに": { meaning: "至今(仍)", context: "時間副詞", subcontext: "現在與未來" },
  "ただいま": { meaning: "剛剛/現在", context: "時間副詞", subcontext: "現在與未來" },
  "そのうち": { meaning: "不久/過些日子", context: "時間副詞", subcontext: "現在與未來" },

  // 2. 程度副詞
  "かなり": { meaning: "相當", context: "程度副詞", subcontext: "高程度" },
  "なかなか": { meaning: "相當/很", context: "程度副詞", subcontext: "高程度" },
  "わりと": { meaning: "意外地/相對地", context: "程度副詞", subcontext: "中程度" },
  "なるべく": { meaning: "盡量", context: "程度副詞", subcontext: "極限與全面" },
  "余計に (よけいに)": { meaning: "更加/格外", context: "程度副詞", subcontext: "比較與極端" },
  "すこぶる": { meaning: "非常/極度", context: "程度副詞", subcontext: "高程度" },
  "たっぷり": { meaning: "充分/足夠", context: "程度副詞", subcontext: "極限與全面" },

  // 3. 狀態副詞
  "偶然 (ぐうぜん)": { meaning: "偶然地", context: "狀態副詞", subcontext: "突發狀態" },
  "急に (きゅうに)": { meaning: "突然地", context: "狀態副詞", subcontext: "突發狀態" },
  "そろそろ": { meaning: "差不多該...", context: "狀態副詞", subcontext: "動作的樣子" }, // or 時間
  "ばらばら": { meaning: "分散地/七零八落地", context: "狀態副詞", subcontext: "自然物理模樣" },
  "ぼんやり": { meaning: "發呆/模糊地", context: "狀態副詞", subcontext: "擬態語" },
  "わくわく": { meaning: "期待/興奮", context: "狀態副詞", subcontext: "擬態語" },
  "ぴったり": { meaning: "剛好/緊緊地", context: "狀態副詞", subcontext: "擬態語" },
  "ふと": { meaning: "猛然/偶然", context: "狀態副詞", subcontext: "動作的樣子" },
  "がっかり": { meaning: "失望地", context: "狀態副詞", subcontext: "擬態語" },
  "ばっちり": { meaning: "完美地/漂亮地", context: "狀態副詞", subcontext: "擬態語" },
  "ごろごろ": { meaning: "無所事事/隆隆聲", context: "狀態副詞", subcontext: "擬態/擬聲語" },
  "すっきり": { meaning: "清爽/舒暢", context: "狀態副詞", subcontext: "擬態語" },

  // 4. 陳述副詞 (呼應)
  "まさか": { meaning: "怎麼可能...", context: "陳述副詞", subcontext: "呼應推測" },
  "ひょっとすると": { meaning: "說不定", context: "陳述副詞", subcontext: "呼應推測" },
  "どうせ": { meaning: "反正/終歸", context: "陳述副詞", subcontext: "呼應斷定" },
  "せっかく": { meaning: "特意/好不容易", context: "陳述副詞", subcontext: "呼應遺憾或建議" },
  "わざわざ": { meaning: "特地", context: "陳述副詞", subcontext: "呼應建議或感謝" },
  "なるほど": { meaning: "原來如此", context: "陳述副詞", subcontext: "呼應斷定" },
  "つまり": { meaning: "也就是說", context: "陳述副詞", subcontext: "呼應斷定" },
  "なぜなら": { meaning: "因為...", context: "陳述副詞", subcontext: "呼應原因" },
  "まるで": { meaning: "簡直就像...", context: "陳述副詞", subcontext: "呼應比喻" }
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
