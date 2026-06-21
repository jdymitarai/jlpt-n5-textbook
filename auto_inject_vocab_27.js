const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_79_" + Date.now(),
      "word": "晴れ",
      "furigana": "はれ",
      "romaji": "hare",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "晴天",
      "sentences": [
        {
          "ja": "明日は晴れでしょう。",
          "furigana": "あしたははれでしょう。",
          "en": "明天會是晴天吧。"
        }
      ]
    },
    {
      "id": "v_n5_auto_80_" + Date.now(),
      "word": "雪",
      "furigana": "ゆき",
      "romaji": "yuki",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "雪",
      "sentences": [
        {
          "ja": "外は雪が降っています。",
          "furigana": "そとはゆきがふっています。",
          "en": "外面正在下雪。"
        }
      ]
    },
    {
      "id": "v_n5_auto_81_" + Date.now(),
      "word": "曇り",
      "furigana": "くもり",
      "romaji": "kumori",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "陰天",
      "sentences": [
        {
          "ja": "今日の天気は曇りです。",
          "furigana": "きょうのてんきはくもりです。",
          "en": "今天的天氣是陰天。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_79_" + Date.now(),
      "word": "島",
      "furigana": "しま",
      "romaji": "shima",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "島嶼",
      "sentences": [
        {
          "ja": "船で島に渡ります。",
          "furigana": "ふねでしまにわたります。",
          "en": "搭船前往島嶼。"
        }
      ]
    },
    {
      "id": "v_n4_auto_80_" + Date.now(),
      "word": "湖",
      "furigana": "みずうみ",
      "romaji": "mizuumi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "湖泊",
      "sentences": [
        {
          "ja": "湖の周りを散歩する。",
          "furigana": "みずうみのまわりをさんぽする。",
          "en": "在湖泊周圍散步。"
        }
      ]
    },
    {
      "id": "v_n4_auto_81_" + Date.now(),
      "word": "森",
      "furigana": "もり",
      "romaji": "mori",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "森林",
      "sentences": [
        {
          "ja": "森の中に動物がいます。",
          "furigana": "もりのなかにどうぶつがいます。",
          "en": "森林裡有動物。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_79_" + Date.now(),
      "word": "予測",
      "furigana": "よそく",
      "romaji": "yosoku",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "預測",
      "sentences": [
        {
          "ja": "将来の経済を予測する。",
          "furigana": "しょうらいのけいざいをよそくする。",
          "en": "預測未來的經濟。"
        }
      ]
    },
    {
      "id": "v_n3_auto_80_" + Date.now(),
      "word": "理想",
      "furigana": "りそう",
      "romaji": "risou",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "理想",
      "sentences": [
        {
          "ja": "彼は理想の上司だ。",
          "furigana": "かれはりそうのじょうしだ。",
          "en": "他是理想的上司。"
        }
      ]
    },
    {
      "id": "v_n3_auto_81_" + Date.now(),
      "word": "現実",
      "furigana": "げんじつ",
      "romaji": "genjitsu",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "現實",
      "sentences": [
        {
          "ja": "理想と現実は違う。",
          "furigana": "りそうとげんじつはちがう。",
          "en": "理想與現實是不同的。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_78_" + Date.now(),
      "word": "特色",
      "furigana": "とくしょく",
      "romaji": "tokushoku",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "特色",
      "sentences": [
        {
          "ja": "この学校の特色を説明する。",
          "furigana": "このがっこうのとくしょくをせつめいする。",
          "en": "說明這所學校的特色。"
        }
      ]
    },
    {
      "id": "v_n2_auto_79_" + Date.now(),
      "word": "長所",
      "furigana": "ちょうしょ",
      "romaji": "chousho",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "長處 / 優點",
      "sentences": [
        {
          "ja": "自分の長所を伸ばす。",
          "furigana": "じぶんのちょうしょをのばす。",
          "en": "發展自己的長處。"
        }
      ]
    },
    {
      "id": "v_n2_auto_80_" + Date.now(),
      "word": "短所",
      "furigana": "たんしょ",
      "romaji": "tansho",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "短處 / 缺點",
      "sentences": [
        {
          "ja": "短所を克服する努力をする。",
          "furigana": "たんしょをこくふくするどりょくをする。",
          "en": "努力克服缺點。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_77_" + Date.now(),
      "word": "起訴",
      "furigana": "きそ",
      "romaji": "kiso",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "起訴",
      "sentences": [
        {
          "ja": "容疑者が起訴された。",
          "furigana": "ようぎしゃがきそされた。",
          "en": "嫌疑犯被起訴了。"
        }
      ]
    },
    {
      "id": "v_n1_auto_78_" + Date.now(),
      "word": "弁護",
      "furigana": "べんご",
      "romaji": "bengo",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "辯護",
      "sentences": [
        {
          "ja": "被告人の権利を弁護する。",
          "furigana": "ひこくにんのけんりをべんごする。",
          "en": "為被告人的權利辯護。"
        }
      ]
    },
    {
      "id": "v_n1_auto_79_" + Date.now(),
      "word": "尋問",
      "furigana": "じんもん",
      "romaji": "jinmon",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "審問 / 盤問",
      "sentences": [
        {
          "ja": "証人に対する尋問が行われた。",
          "furigana": "しょうにんにたいするじんもんがおこなわれた。",
          "en": "對證人進行了審問。"
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
