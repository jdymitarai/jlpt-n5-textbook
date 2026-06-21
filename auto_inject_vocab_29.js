const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_85_" + Date.now(),
      "word": "犬",
      "furigana": "いぬ",
      "romaji": "inu",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "狗",
      "sentences": [
        {
          "ja": "可愛い犬ですね。",
          "furigana": "かわいいいぬですね。",
          "en": "真是可愛的狗呢。"
        }
      ]
    },
    {
      "id": "v_n5_auto_86_" + Date.now(),
      "word": "猫",
      "furigana": "ねこ",
      "romaji": "neko",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "貓",
      "sentences": [
        {
          "ja": "猫が寝ています。",
          "furigana": "ねこがねています。",
          "en": "貓正在睡覺。"
        }
      ]
    },
    {
      "id": "v_n5_auto_87_" + Date.now(),
      "word": "鳥",
      "furigana": "とり",
      "romaji": "tori",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "鳥",
      "sentences": [
        {
          "ja": "鳥が空を飛んでいます。",
          "furigana": "とりがそらをとんでいます。",
          "en": "鳥在天空飛翔。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_85_" + Date.now(),
      "word": "庭",
      "furigana": "にわ",
      "romaji": "niwa",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "院子 / 庭院",
      "sentences": [
        {
          "ja": "庭に花が咲いています。",
          "furigana": "にわにはながさいています。",
          "en": "院子裡開著花。"
        }
      ]
    },
    {
      "id": "v_n4_auto_86_" + Date.now(),
      "word": "門",
      "furigana": "もん",
      "romaji": "mon",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "大門",
      "sentences": [
        {
          "ja": "学校の門の前で待っています。",
          "furigana": "がっこうのもんのまえでまっています。",
          "en": "在學校的大門前等。"
        }
      ]
    },
    {
      "id": "v_n4_auto_87_" + Date.now(),
      "word": "玄関",
      "furigana": "げんかん",
      "romaji": "genkan",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "玄關 / 入口",
      "sentences": [
        {
          "ja": "玄関で靴を脱いでください。",
          "furigana": "げんかんでくつをぬいでください。",
          "en": "請在玄關脫鞋。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_85_" + Date.now(),
      "word": "発達",
      "furigana": "はったつ",
      "romaji": "hattatsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發達 / 發展",
      "sentences": [
        {
          "ja": "交通網が発達している。",
          "furigana": "こうつうもうがはったつしている。",
          "en": "交通網很發達。"
        }
      ]
    },
    {
      "id": "v_n3_auto_86_" + Date.now(),
      "word": "発展",
      "furigana": "はってん",
      "romaji": "hatten",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發展",
      "sentences": [
        {
          "ja": "経済の発展が著しい。",
          "furigana": "けいざいのはってんがいちじるしい。",
          "en": "經濟發展顯著。"
        }
      ]
    },
    {
      "id": "v_n3_auto_87_" + Date.now(),
      "word": "流行",
      "furigana": "りゅうこう",
      "romaji": "ryuukou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "流行",
      "sentences": [
        {
          "ja": "この服は今年流行している。",
          "furigana": "このふくはことしりゅうこうしている。",
          "en": "這件衣服今年很流行。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_84_" + Date.now(),
      "word": "比較",
      "furigana": "ひかく",
      "romaji": "hikaku",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "比較",
      "sentences": [
        {
          "ja": "二つの製品を比較する。",
          "furigana": "ふたつのせいひんをひかくする。",
          "en": "比較兩個產品。"
        }
      ]
    },
    {
      "id": "v_n2_auto_85_" + Date.now(),
      "word": "影響",
      "furigana": "えいきょう",
      "romaji": "eikyou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "影響",
      "sentences": [
        {
          "ja": "環境に良い影響を与える。",
          "furigana": "かんきょうによいえいきょうをあたえる。",
          "en": "對環境帶來好影響。"
        }
      ]
    },
    {
      "id": "v_n2_auto_86_" + Date.now(),
      "word": "効果",
      "furigana": "こうか",
      "romaji": "kouka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "效果",
      "sentences": [
        {
          "ja": "薬の効果が現れた。",
          "furigana": "くすりのこうかがあらわれた。",
          "en": "藥物發揮了效果。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_83_" + Date.now(),
      "word": "該当",
      "furigana": "がいとう",
      "romaji": "gaitou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "符合 / 相當於",
      "sentences": [
        {
          "ja": "条件に該当する人物を探す。",
          "furigana": "じょうけんにがいとうするじんぶつをさがす。",
          "en": "尋找符合條件的人物。"
        }
      ]
    },
    {
      "id": "v_n1_auto_84_" + Date.now(),
      "word": "折衷",
      "furigana": "せっちゅう",
      "romaji": "secchuu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "折衷 / 妥協",
      "sentences": [
        {
          "ja": "和洋折衷のデザイン。",
          "furigana": "わようせっちゅうのでざいん。",
          "en": "和洋折衷的設計。"
        }
      ]
    },
    {
      "id": "v_n1_auto_85_" + Date.now(),
      "word": "寄与",
      "furigana": "きよ",
      "romaji": "kiyo",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "貢獻",
      "sentences": [
        {
          "ja": "社会の発展に寄与する。",
          "furigana": "しゃかいのはってんにきよする。",
          "en": "對社會發展做出貢獻。"
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
