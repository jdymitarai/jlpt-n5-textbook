const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_28_" + Date.now(),
      "word": "鉛筆",
      "furigana": "えんぴつ",
      "romaji": "enpitsu",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "鉛筆",
      "sentences": [
        {
          "ja": "鉛筆で名前を書いてください。",
          "furigana": "えんぴつでなまえをかいてください。",
          "en": "請用鉛筆寫下名字。"
        }
      ]
    },
    {
      "id": "v_n5_auto_29_" + Date.now(),
      "word": "消しゴム",
      "furigana": "けしごむ",
      "romaji": "keshigomu",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "橡皮擦",
      "sentences": [
        {
          "ja": "消しゴムを貸してくれませんか。",
          "furigana": "けしごむをかしてくれませんか。",
          "en": "可以借我橡皮擦嗎？"
        }
      ]
    },
    {
      "id": "v_n5_auto_30_" + Date.now(),
      "word": "辞書",
      "furigana": "じしょ",
      "romaji": "jisho",
      "type": "noun",
      "category": "culture_thought",
      "level": "N5",
      "meaning": "字典",
      "sentences": [
        {
          "ja": "分からない言葉は辞書で調べます。",
          "furigana": "わからないことばはじしょでしらべます。",
          "en": "不懂的詞彙會用字典查。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_28_" + Date.now(),
      "word": "興味",
      "furigana": "きょうみ",
      "romaji": "kyoumi",
      "type": "noun",
      "category": "psychology_character",
      "level": "N4",
      "meaning": "興趣 / 關注",
      "sentences": [
        {
          "ja": "日本の文化に興味があります。",
          "furigana": "にほんのぶんかにきょうみがあります。",
          "en": "對日本的文化感興趣。"
        }
      ]
    },
    {
      "id": "v_n4_auto_29_" + Date.now(),
      "word": "習慣",
      "furigana": "しゅうかん",
      "romaji": "shuukan",
      "type": "noun",
      "category": "culture_thought",
      "level": "N4",
      "meaning": "習慣",
      "sentences": [
        {
          "ja": "早寝早起きの習慣をつけます。",
          "furigana": "はやねはやおきのしゅうかんをつけます。",
          "en": "養成早睡早起的習慣。"
        }
      ]
    },
    {
      "id": "v_n4_auto_30_" + Date.now(),
      "word": "挨拶",
      "furigana": "あいさつ",
      "romaji": "aisatsu",
      "type": "noun",
      "category": "relations_human",
      "level": "N4",
      "meaning": "打招呼 / 問候",
      "sentences": [
        {
          "ja": "元気よく挨拶をしましょう。",
          "furigana": "げんきよくあいさつをしましょう。",
          "en": "充滿精神地打招呼吧。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_28_" + Date.now(),
      "word": "権利",
      "furigana": "けんり",
      "romaji": "kenri",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "權利",
      "sentences": [
        {
          "ja": "すべての人には生きる権利がある。",
          "furigana": "すべてのひとにはいきるけんりがある。",
          "en": "所有人都有生存的權利。"
        }
      ]
    },
    {
      "id": "v_n3_auto_29_" + Date.now(),
      "word": "義務",
      "furigana": "ぎむ",
      "romaji": "gimu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "義務",
      "sentences": [
        {
          "ja": "国民には税金を払う義務がある。",
          "furigana": "こくみんにはぜいきんをはらうぎむがある。",
          "en": "國民有納稅的義務。"
        }
      ]
    },
    {
      "id": "v_n3_auto_30_" + Date.now(),
      "word": "法律",
      "furigana": "ほうりつ",
      "romaji": "houritsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "法律",
      "sentences": [
        {
          "ja": "法律を破ってはいけません。",
          "furigana": "ほうりつをやぶってはいけません。",
          "en": "不可以打破法律。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_27_" + Date.now(),
      "word": "予測",
      "furigana": "よそく",
      "romaji": "yosoku",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "預測",
      "sentences": [
        {
          "ja": "将来の経済状況を予測する。",
          "furigana": "しょうらいのけいざいじょうきょうをよそくする。",
          "en": "預測未來的經濟狀況。"
        }
      ]
    },
    {
      "id": "v_n2_auto_28_" + Date.now(),
      "word": "検討",
      "furigana": "けんとう",
      "romaji": "kentou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "檢討 / 研究",
      "sentences": [
        {
          "ja": "その提案については検討中です。",
          "furigana": "そのていあんについてはけんとうちゅうです。",
          "en": "關於那個提案正在檢討中。"
        }
      ]
    },
    {
      "id": "v_n2_auto_29_" + Date.now(),
      "word": "証拠",
      "furigana": "しょうこ",
      "romaji": "shouko",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "證據",
      "sentences": [
        {
          "ja": "彼が犯人であるという証拠がない。",
          "furigana": "かれがはんにんであるというしょうこがない。",
          "en": "沒有他是犯人的證據。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_26_" + Date.now(),
      "word": "矛盾",
      "furigana": "むじゅん",
      "romaji": "mujun",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "矛盾",
      "sentences": [
        {
          "ja": "彼の言動には矛盾が多い。",
          "furigana": "かれのげんどうにはむじゅんがおおい。",
          "en": "他的言行有許多矛盾。"
        }
      ]
    },
    {
      "id": "v_n1_auto_27_" + Date.now(),
      "word": "偏見",
      "furigana": "へんけん",
      "romaji": "henken",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "偏見",
      "sentences": [
        {
          "ja": "偏見を持たずに人を見るべきだ。",
          "furigana": "へんけんをもたずにひとをみるべきだ。",
          "en": "應該不帶偏見地看待人。"
        }
      ]
    },
    {
      "id": "v_n1_auto_28_" + Date.now(),
      "word": "権威",
      "furigana": "けんい",
      "romaji": "keni",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "權威",
      "sentences": [
        {
          "ja": "彼はこの分野の権威として知られている。",
          "furigana": "かれはこのぶんやのけんいとしてしられている。",
          "en": "他以作為這個領域的權威而為人所知。"
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
