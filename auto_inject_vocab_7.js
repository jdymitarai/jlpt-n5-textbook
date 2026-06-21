const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_19_" + Date.now(),
      "word": "医者",
      "furigana": "いしゃ",
      "romaji": "isha",
      "type": "noun",
      "category": "relations_human",
      "level": "N5",
      "meaning": "醫生",
      "sentences": [
        {
          "ja": "将来は医者になりたいです。",
          "furigana": "しょうらいはいしゃになりたいです。",
          "en": "將來想成為醫生。"
        }
      ]
    },
    {
      "id": "v_n5_auto_20_" + Date.now(),
      "word": "銀行",
      "furigana": "ぎんこう",
      "romaji": "ginkou",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "銀行",
      "sentences": [
        {
          "ja": "駅の近くに銀行があります。",
          "furigana": "えきのちかくにぎんこうがあります。",
          "en": "車站附近有銀行。"
        }
      ]
    },
    {
      "id": "v_n5_auto_21_" + Date.now(),
      "word": "郵便局",
      "furigana": "ゆうびんきょく",
      "romaji": "yuubinkyoku",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "郵局",
      "sentences": [
        {
          "ja": "郵便局で切手を買います。",
          "furigana": "ゆうびんきょくできってをかいます。",
          "en": "在郵局買郵票。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_19_" + Date.now(),
      "word": "工場",
      "furigana": "こうじょう",
      "romaji": "koujou",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "工廠",
      "sentences": [
        {
          "ja": "この町には大きな工場があります。",
          "furigana": "このまちにはおおきなこうじょうがあります。",
          "en": "這個城鎮有間大工廠。"
        }
      ]
    },
    {
      "id": "v_n4_auto_20_" + Date.now(),
      "word": "病院",
      "furigana": "びょういん",
      "romaji": "byouin",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "醫院",
      "sentences": [
        {
          "ja": "風邪を引いたので病院へ行きます。",
          "furigana": "かぜをひいたのでびょういんへいきます。",
          "en": "因為感冒了所以去醫院。"
        }
      ]
    },
    {
      "id": "v_n4_auto_21_" + Date.now(),
      "word": "図書館",
      "furigana": "としょかん",
      "romaji": "toshokan",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "圖書館",
      "sentences": [
        {
          "ja": "休みの日は図書館で勉強します。",
          "furigana": "やすみのひはとしょかんでべんきょうします。",
          "en": "放假時會在圖書館讀書。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_19_" + Date.now(),
      "word": "政治",
      "furigana": "せいじ",
      "romaji": "seiji",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "政治",
      "sentences": [
        {
          "ja": "私は政治にあまり興味がありません。",
          "furigana": "わたしはせいじにあまりきょうみがありません。",
          "en": "我對政治沒什麼興趣。"
        }
      ]
    },
    {
      "id": "v_n3_auto_20_" + Date.now(),
      "word": "経済",
      "furigana": "けいざい",
      "romaji": "keizai",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "經濟",
      "sentences": [
        {
          "ja": "大学で経済学を専攻しています。",
          "furigana": "だいがくでけいざいがくをせんこうしています。",
          "en": "在大學主修經濟學。"
        }
      ]
    },
    {
      "id": "v_n3_auto_21_" + Date.now(),
      "word": "文化",
      "furigana": "ぶんか",
      "romaji": "bunka",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "文化",
      "sentences": [
        {
          "ja": "他国の文化を尊重することが大切だ。",
          "furigana": "たこくのぶんかをそんちょうすることがたいせつだ。",
          "en": "尊重他國的文化是很重要的。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_18_" + Date.now(),
      "word": "特徴",
      "furigana": "とくちょう",
      "romaji": "tokuchou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "特徵",
      "sentences": [
        {
          "ja": "この商品の最大の特徴は何ですか。",
          "furigana": "このしょうひんのさいだいのとくちょうはなんですか。",
          "en": "這個商品最大的特徵是什麼？"
        }
      ]
    },
    {
      "id": "v_n2_auto_19_" + Date.now(),
      "word": "現象",
      "furigana": "げんしょう",
      "romaji": "genshou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "現象",
      "sentences": [
        {
          "ja": "温暖化による異常気象という現象が起きている。",
          "furigana": "おんだんかによるいじょうきしょうというげんしょうがおきている。",
          "en": "發生了因為暖化導致的異常氣候現象。"
        }
      ]
    },
    {
      "id": "v_n2_auto_20_" + Date.now(),
      "word": "過程",
      "furigana": "かてい",
      "romaji": "katei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "過程",
      "sentences": [
        {
          "ja": "結果よりも過程が大事だと教えられた。",
          "furigana": "けっかよりもかていがだいじだとおしえられた。",
          "en": "被教導比起結果，過程更重要。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_17_" + Date.now(),
      "word": "見解",
      "furigana": "けんかい",
      "romaji": "kenkai",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "見解 / 看法",
      "sentences": [
        {
          "ja": "その件については見解の相違がある。",
          "furigana": "そのけんについてはけんかいのそういがある。",
          "en": "關於那件事存在著見解的差異。"
        }
      ]
    },
    {
      "id": "v_n1_auto_18_" + Date.now(),
      "word": "解釈",
      "furigana": "かいしゃく",
      "romaji": "kaishaku",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "解釋 / 理解",
      "sentences": [
        {
          "ja": "法律の解釈を巡って議論が交わされた。",
          "furigana": "ほうりつのかいしゃくをめぐってぎろんがかわされた。",
          "en": "圍繞著法律的解釋展開了討論。"
        }
      ]
    },
    {
      "id": "v_n1_auto_19_" + Date.now(),
      "word": "認識",
      "furigana": "にんしき",
      "romaji": "ninshiki",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "認識 / 認知",
      "sentences": [
        {
          "ja": "現状に対する認識が甘かった。",
          "furigana": "げんじょうにたいするにんしきがあまかった。",
          "en": "對現狀的認知太過天真了。"
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
