const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_61_" + Date.now(),
      "word": "赤",
      "furigana": "あか",
      "romaji": "aka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "紅色",
      "sentences": [
        {
          "ja": "彼女は赤い服を着ています。",
          "furigana": "かのじょはあかいふくをきています。",
          "en": "她穿著紅色的衣服。"
        }
      ]
    },
    {
      "id": "v_n5_auto_62_" + Date.now(),
      "word": "青",
      "furigana": "あお",
      "romaji": "ao",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "藍色",
      "sentences": [
        {
          "ja": "青い空が綺麗です。",
          "furigana": "あおいそらがきれいです。",
          "en": "藍色的天空很美。"
        }
      ]
    },
    {
      "id": "v_n5_auto_63_" + Date.now(),
      "word": "白",
      "furigana": "しろ",
      "romaji": "shiro",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "白色",
      "sentences": [
        {
          "ja": "白い靴を買いました。",
          "furigana": "しろいくつをかいました。",
          "en": "買了白色的鞋子。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_61_" + Date.now(),
      "word": "旅館",
      "furigana": "りょかん",
      "romaji": "ryokan",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "旅館",
      "sentences": [
        {
          "ja": "温泉の旅館に泊まります。",
          "furigana": "おんせんのりょかにとまります。",
          "en": "住在溫泉旅館。"
        }
      ]
    },
    {
      "id": "v_n4_auto_62_" + Date.now(),
      "word": "港",
      "furigana": "みなと",
      "romaji": "minato",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "港口",
      "sentences": [
        {
          "ja": "港に船がたくさんあります。",
          "furigana": "みなとにふねがたくさんあります。",
          "en": "港口有很多船。"
        }
      ]
    },
    {
      "id": "v_n4_auto_63_" + Date.now(),
      "word": "会場",
      "furigana": "かいじょう",
      "romaji": "kaijou",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "會場",
      "sentences": [
        {
          "ja": "コンサートの会場はどこですか。",
          "furigana": "こんさーとのかいじょうはどこですか。",
          "en": "演唱會的會場在哪裡？"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_61_" + Date.now(),
      "word": "怒り",
      "furigana": "いかり",
      "romaji": "ikari",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "憤怒",
      "sentences": [
        {
          "ja": "彼の顔に怒りが見えた。",
          "furigana": "かれのかおにいかりがみえた。",
          "en": "他的臉上流露出憤怒。"
        }
      ]
    },
    {
      "id": "v_n3_auto_62_" + Date.now(),
      "word": "悩み",
      "furigana": "なやみ",
      "romaji": "nayami",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "煩惱",
      "sentences": [
        {
          "ja": "友達に悩みを相談する。",
          "furigana": "ともだちになやみをそうだんする。",
          "en": "向朋友商量煩惱。"
        }
      ]
    },
    {
      "id": "v_n3_auto_63_" + Date.now(),
      "word": "喜び",
      "furigana": "よろこび",
      "romaji": "yorokobi",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "喜悅",
      "sentences": [
        {
          "ja": "合格の喜びを分かち合う。",
          "furigana": "ごうかくのよろこびをわかちあう。",
          "en": "分享及格的喜悅。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_60_" + Date.now(),
      "word": "濃度",
      "furigana": "のうど",
      "romaji": "noudo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "濃度",
      "sentences": [
        {
          "ja": "液体の濃度を測定する。",
          "furigana": "えきたいののうどをそくていする。",
          "en": "測量液體的濃度。"
        }
      ]
    },
    {
      "id": "v_n2_auto_61_" + Date.now(),
      "word": "密度",
      "furigana": "みつど",
      "romaji": "mitsudo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "密度",
      "sentences": [
        {
          "ja": "この都市は人口密度が高い。",
          "furigana": "このとしはじんこうみつどがたかい。",
          "en": "這個都市的人口密度很高。"
        }
      ]
    },
    {
      "id": "v_n2_auto_62_" + Date.now(),
      "word": "頻度",
      "furigana": "ひんど",
      "romaji": "hindo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "頻率",
      "sentences": [
        {
          "ja": "地震が起こる頻度が高い。",
          "furigana": "じしんがおこるひんどがたかい。",
          "en": "地震發生的頻率很高。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_59_" + Date.now(),
      "word": "還元",
      "furigana": "かんげん",
      "romaji": "kangen",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "還原 / 回饋",
      "sentences": [
        {
          "ja": "利益を社会に還元する。",
          "furigana": "りえきをしゃかいにかんげんする。",
          "en": "將利益回饋給社會。"
        }
      ]
    },
    {
      "id": "v_n1_auto_60_" + Date.now(),
      "word": "偏重",
      "furigana": "へんちょう",
      "romaji": "henchou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "偏重",
      "sentences": [
        {
          "ja": "学歴偏重の社会を見直す。",
          "furigana": "がくれきへんちょうのしゃかいをみなおす。",
          "en": "重新審視偏重學歷的社會。"
        }
      ]
    },
    {
      "id": "v_n1_auto_61_" + Date.now(),
      "word": "錯綜",
      "furigana": "さくそう",
      "romaji": "sakusou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "錯綜 / 複雜",
      "sentences": [
        {
          "ja": "さまざまな情報が錯綜している。",
          "furigana": "さまざまなじょうほうがさくそうしている。",
          "en": "各式各樣的情報錯綜複雜。"
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
