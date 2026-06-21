const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_73_" + Date.now(),
      "word": "上",
      "furigana": "うえ",
      "romaji": "ue",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "上面",
      "sentences": [
        {
          "ja": "机の上に本があります。",
          "furigana": "つくえのうえにほんがあります。",
          "en": "桌子上面有書。"
        }
      ]
    },
    {
      "id": "v_n5_auto_74_" + Date.now(),
      "word": "下",
      "furigana": "した",
      "romaji": "shita",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "下面",
      "sentences": [
        {
          "ja": "椅子の下に猫がいます。",
          "furigana": "いすのしたにねこがいます。",
          "en": "椅子下面有貓。"
        }
      ]
    },
    {
      "id": "v_n5_auto_75_" + Date.now(),
      "word": "中",
      "furigana": "なか",
      "romaji": "naka",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "裡面 / 中間",
      "sentences": [
        {
          "ja": "箱の中に何がありますか。",
          "furigana": "はこのなかになにがありますか。",
          "en": "箱子裡面有什麼？"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_73_" + Date.now(),
      "word": "泥棒",
      "furigana": "どろぼう",
      "romaji": "dorobou",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "小偷 / 強盜",
      "sentences": [
        {
          "ja": "泥棒が家に入りました。",
          "furigana": "どろぼうがいえにはいりました。",
          "en": "小偷進了屋裡。"
        }
      ]
    },
    {
      "id": "v_n4_auto_74_" + Date.now(),
      "word": "事故",
      "furigana": "じこ",
      "romaji": "jiko",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "事故 / 車禍",
      "sentences": [
        {
          "ja": "交差点で事故がありました。",
          "furigana": "こうさてんでじこがありました。",
          "en": "十字路口發生了車禍。"
        }
      ]
    },
    {
      "id": "v_n4_auto_75_" + Date.now(),
      "word": "地震",
      "furigana": "じしん",
      "romaji": "jishin",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "地震",
      "sentences": [
        {
          "ja": "大きな地震が起きました。",
          "furigana": "おおきなじしんがおきました。",
          "en": "發生了大地震。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_73_" + Date.now(),
      "word": "種類",
      "furigana": "しゅるい",
      "romaji": "shurui",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "種類",
      "sentences": [
        {
          "ja": "いろいろな種類の花が咲いている。",
          "furigana": "いろいろなしゅるいのはながさいている。",
          "en": "開著各種種類的花。"
        }
      ]
    },
    {
      "id": "v_n3_auto_74_" + Date.now(),
      "word": "方法",
      "furigana": "ほうほう",
      "romaji": "houhou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "方法",
      "sentences": [
        {
          "ja": "問題の解決方法を考える。",
          "furigana": "もんだいのかいけつほうほうをかんがえる。",
          "en": "思考解決問題的方法。"
        }
      ]
    },
    {
      "id": "v_n3_auto_75_" + Date.now(),
      "word": "原因",
      "furigana": "げんいん",
      "romaji": "genin",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "原因",
      "sentences": [
        {
          "ja": "事故の原因を調査する。",
          "furigana": "じこのげんいんをちょうさする。",
          "en": "調查事故的原因。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_72_" + Date.now(),
      "word": "検討",
      "furigana": "けんとう",
      "romaji": "kentou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "檢討 / 研究",
      "sentences": [
        {
          "ja": "新しい計画を検討する。",
          "furigana": "あたらしいけいかくをけんとうする。",
          "en": "研討新的計畫。"
        }
      ]
    },
    {
      "id": "v_n2_auto_73_" + Date.now(),
      "word": "承認",
      "furigana": "しょうにん",
      "romaji": "shounin",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "承認 / 批准",
      "sentences": [
        {
          "ja": "社長の承認を得る。",
          "furigana": "しゃちょうのしょうにんをえる。",
          "en": "獲得社長的批准。"
        }
      ]
    },
    {
      "id": "v_n2_auto_74_" + Date.now(),
      "word": "対策",
      "furigana": "たいさく",
      "romaji": "taisaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "對策",
      "sentences": [
        {
          "ja": "温暖化の対策を立てる。",
          "furigana": "おんだんかのたいさくをたてる。",
          "en": "制定全球暖化的對策。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_71_" + Date.now(),
      "word": "訴訟",
      "furigana": "そしょう",
      "romaji": "soshou",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "訴訟",
      "sentences": [
        {
          "ja": "会社に対して損害賠償の訴訟を起こす。",
          "furigana": "かいしゃにたいしてそんがいばいしょうのそしょうをおこす。",
          "en": "對公司提起損害賠償的訴訟。"
        }
      ]
    },
    {
      "id": "v_n1_auto_72_" + Date.now(),
      "word": "判決",
      "furigana": "はんけつ",
      "romaji": "hanketsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "判決",
      "sentences": [
        {
          "ja": "裁判長が判決を言い渡す。",
          "furigana": "さいばんちょうがはんけつをいいわたす。",
          "en": "審判長宣讀判決。"
        }
      ]
    },
    {
      "id": "v_n1_auto_73_" + Date.now(),
      "word": "告訴",
      "furigana": "こくそ",
      "romaji": "kokuso",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "告訴 / 控告",
      "sentences": [
        {
          "ja": "詐欺の疑いで相手を告訴する。",
          "furigana": "さぎのうたがいであいてをこくそする。",
          "en": "以詐欺嫌疑控告對方。"
        }
      ]
    }
  ]
};

const levels = ["N5", "N4", "N3", "N2", "N1"];
let addedCount = 0;

for (let lvl of levels) {
  const filePath = path.join(__dirname, "data_" + lvl.toLowerCase() + ".js");
  if (!fs.existsSync(filePath)) {
    console.log("Warning: " + filePath + " not found. Skipping.");
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  const targetPattern = /"vocabulary":\s*\[\s*/;
  if (targetPattern.test(content) && newWords[lvl] && newWords[lvl].length > 0) {
    const jsonStr = newWords[lvl].map(w => JSON.stringify(w, null, 6)).join(",\n      ") + ",\n      ";
    content = content.replace(targetPattern, '"vocabulary": [\n      ' + jsonStr);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Appended " + newWords[lvl].length + " words to " + lvl);
    addedCount += newWords[lvl].length;
  } else {
    console.log("Could not find vocabulary array in " + lvl + " or no words to add.");
  }
}

console.log("Total " + addedCount + " words successfully injected.");
