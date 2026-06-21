const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_34_" + Date.now(),
      "word": "病気",
      "furigana": "びょうき",
      "romaji": "byouki",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "生病",
      "sentences": [
        {
          "ja": "病気で学校を休みました。",
          "furigana": "びょうきでがっこうをやすみました。",
          "en": "因為生病而向學校請假了。"
        }
      ]
    },
    {
      "id": "v_n5_auto_35_" + Date.now(),
      "word": "薬",
      "furigana": "くすり",
      "romaji": "kusuri",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "藥",
      "sentences": [
        {
          "ja": "食後に薬を飲みます。",
          "furigana": "しょくごにくすりをのみます。",
          "en": "飯後吃藥。"
        }
      ]
    },
    {
      "id": "v_n5_auto_36_" + Date.now(),
      "word": "電話",
      "furigana": "でんわ",
      "romaji": "denwa",
      "type": "noun",
      "category": "activities_actions",
      "level": "N5",
      "meaning": "電話",
      "sentences": [
        {
          "ja": "友達に電話をかけます。",
          "furigana": "ともだちいでんわをかけます。",
          "en": "打電話給朋友。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_34_" + Date.now(),
      "word": "地震",
      "furigana": "じしん",
      "romaji": "jishin",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "地震",
      "sentences": [
        {
          "ja": "日本は地震が多い国です。",
          "furigana": "にほんはじしんがおおいくにです。",
          "en": "日本是地震很多的國家。"
        }
      ]
    },
    {
      "id": "v_n4_auto_35_" + Date.now(),
      "word": "火事",
      "furigana": "かじ",
      "romaji": "kaji",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "火災",
      "sentences": [
        {
          "ja": "近くで火事がありました。",
          "furigana": "ちかくでかじがありました。",
          "en": "附近發生了火災。"
        }
      ]
    },
    {
      "id": "v_n4_auto_36_" + Date.now(),
      "word": "台風",
      "furigana": "たいふう",
      "romaji": "taifuu",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "颱風",
      "sentences": [
        {
          "ja": "強い台風が近づいています。",
          "furigana": "つよいたいふうがちかづいています。",
          "en": "強烈颱風正在逼近。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_34_" + Date.now(),
      "word": "温度",
      "furigana": "おんど",
      "romaji": "ondo",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N3",
      "meaning": "溫度",
      "sentences": [
        {
          "ja": "エアコンで部屋の温度を調節する。",
          "furigana": "えあこんでへやのおんどをちょうせつする。",
          "en": "用冷氣調節房間的溫度。"
        }
      ]
    },
    {
      "id": "v_n3_auto_35_" + Date.now(),
      "word": "湿度",
      "furigana": "しつど",
      "romaji": "shitsudo",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N3",
      "meaning": "濕度",
      "sentences": [
        {
          "ja": "日本の夏は湿度が高い。",
          "furigana": "にほんのなつはしつどがたかい。",
          "en": "日本的夏天濕度很高。"
        }
      ]
    },
    {
      "id": "v_n3_auto_36_" + Date.now(),
      "word": "気候",
      "furigana": "きこう",
      "romaji": "kikou",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N3",
      "meaning": "氣候",
      "sentences": [
        {
          "ja": "この地域は一年中温暖な気候です。",
          "furigana": "このちいきはいちねんじゅうおんだんなきこうです。",
          "en": "這個地區一整年都是溫暖的氣候。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_33_" + Date.now(),
      "word": "寿命",
      "furigana": "じゅみょう",
      "romaji": "jumyou",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N2",
      "meaning": "壽命",
      "sentences": [
        {
          "ja": "医療の進歩で平均寿命が延びた。",
          "furigana": "いりょうのしんぽでへいきんじゅみょうがのびた。",
          "en": "由於醫療的進步，平均壽命延長了。"
        }
      ]
    },
    {
      "id": "v_n2_auto_34_" + Date.now(),
      "word": "遺伝",
      "furigana": "いでん",
      "romaji": "iden",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N2",
      "meaning": "遺傳",
      "sentences": [
        {
          "ja": "この病気は遺伝する可能性がある。",
          "furigana": "このびょうきはいでんするかのうせいがある。",
          "en": "這個疾病有遺傳的可能性。"
        }
      ]
    },
    {
      "id": "v_n2_auto_35_" + Date.now(),
      "word": "細胞",
      "furigana": "さいぼう",
      "romaji": "saibou",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N2",
      "meaning": "細胞",
      "sentences": [
        {
          "ja": "人間の体は多くの細胞でできている。",
          "furigana": "にんげんのからだはおおくのさいぼうでできている。",
          "en": "人類的身體是由許多細胞構成的。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_32_" + Date.now(),
      "word": "普遍",
      "furigana": "ふへん",
      "romaji": "fuhen",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "普遍",
      "sentences": [
        {
          "ja": "愛は人類の普遍的なテーマである。",
          "furigana": "あいはじんるいのふへんてきなてーまである。",
          "en": "愛是人類普遍的主題。"
        }
      ]
    },
    {
      "id": "v_n1_auto_33_" + Date.now(),
      "word": "究極",
      "furigana": "きゅうきょく",
      "romaji": "kyuukyoku",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "終極 / 究極",
      "sentences": [
        {
          "ja": "究極の選択を迫られた。",
          "furigana": "きゅうきょくのせんたくをせまられた。",
          "en": "被迫做出終極的選擇。"
        }
      ]
    },
    {
      "id": "v_n1_auto_34_" + Date.now(),
      "word": "絶大",
      "furigana": "ぜつだい",
      "romaji": "zetsudai",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "巨大 / 極大",
      "sentences": [
        {
          "ja": "社長は社内で絶大な権力を持っている。",
          "furigana": "しゃちょうはしゃないでぜつだいなけんりょくをもっている。",
          "en": "社長在公司內握有極大的權力。"
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
