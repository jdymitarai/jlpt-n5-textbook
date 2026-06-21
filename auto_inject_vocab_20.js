const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_58_" + Date.now(),
      "word": "空",
      "furigana": "そら",
      "romaji": "sora",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "天空",
      "sentences": [
        {
          "ja": "今日は空が青いです。",
          "furigana": "きょうはそらがあおいです。",
          "en": "今天天空很藍。"
        }
      ]
    },
    {
      "id": "v_n5_auto_59_" + Date.now(),
      "word": "海",
      "furigana": "うみ",
      "romaji": "umi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "海",
      "sentences": [
        {
          "ja": "夏は海に泳ぎに行きます。",
          "furigana": "なつはうみにおよぎにいきます。",
          "en": "夏天去海邊游泳。"
        }
      ]
    },
    {
      "id": "v_n5_auto_60_" + Date.now(),
      "word": "山",
      "furigana": "やま",
      "romaji": "yama",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "山",
      "sentences": [
        {
          "ja": "週末に山へ登ります。",
          "furigana": "しゅうまつにやまへのぼります。",
          "en": "週末去爬山。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_58_" + Date.now(),
      "word": "自然",
      "furigana": "しぜん",
      "romaji": "shizen",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "自然",
      "sentences": [
        {
          "ja": "この村は自然が豊かです。",
          "furigana": "このむらはしぜんがゆたかです。",
          "en": "這個村莊的自然資源很豐富。"
        }
      ]
    },
    {
      "id": "v_n4_auto_59_" + Date.now(),
      "word": "空気",
      "furigana": "くうき",
      "romaji": "kuuki",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "空氣",
      "sentences": [
        {
          "ja": "田舎は空気がきれいです。",
          "furigana": "いなかはくうきがきれいです。",
          "en": "鄉下的空氣很乾淨。"
        }
      ]
    },
    {
      "id": "v_n4_auto_60_" + Date.now(),
      "word": "星",
      "furigana": "ほし",
      "romaji": "hoshi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "星星",
      "sentences": [
        {
          "ja": "夜空に星が輝いています。",
          "furigana": "よぞらにほしがかがやいています。",
          "en": "夜空中星星在閃爍。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_58_" + Date.now(),
      "word": "協力",
      "furigana": "きょうりょく",
      "romaji": "kyouryoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "協力 / 合作",
      "sentences": [
        {
          "ja": "みんなで協力して終わらせた。",
          "furigana": "みんなできょうりょくしておわらせた。",
          "en": "大家合作完成了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_59_" + Date.now(),
      "word": "参加",
      "furigana": "さんか",
      "romaji": "sanka",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "參加",
      "sentences": [
        {
          "ja": "ボランティア活動に参加する。",
          "furigana": "ぼらんてぃあかつどうにさんかする。",
          "en": "參加志工活動。"
        }
      ]
    },
    {
      "id": "v_n3_auto_60_" + Date.now(),
      "word": "応援",
      "furigana": "おうえん",
      "romaji": "ouen",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "聲援 / 加油",
      "sentences": [
        {
          "ja": "好きなチームを応援する。",
          "furigana": "すきなちーむをおうえんする。",
          "en": "為喜歡的球隊加油。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_57_" + Date.now(),
      "word": "資産",
      "furigana": "しさん",
      "romaji": "shisan",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "資產",
      "sentences": [
        {
          "ja": "会社の資産を管理する。",
          "furigana": "かいしゃのしさんをかんりする。",
          "en": "管理公司的資產。"
        }
      ]
    },
    {
      "id": "v_n2_auto_58_" + Date.now(),
      "word": "負債",
      "furigana": "ふさい",
      "romaji": "fusai",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "負債",
      "sentences": [
        {
          "ja": "多額の負債を抱えている。",
          "furigana": "たがくのふさいをかかえている。",
          "en": "背負著鉅額的負債。"
        }
      ]
    },
    {
      "id": "v_n2_auto_59_" + Date.now(),
      "word": "経費",
      "furigana": "けいひ",
      "romaji": "keihi",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "經費 / 開支",
      "sentences": [
        {
          "ja": "経費を削減するための対策。",
          "furigana": "けいひをさくげんするためのたいさく。",
          "en": "為了削減經費的對策。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_56_" + Date.now(),
      "word": "葛藤",
      "furigana": "かっとう",
      "romaji": "kattou",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "葛藤 / 糾葛",
      "sentences": [
        {
          "ja": "心の中で激しい葛藤があった。",
          "furigana": "こころのなかではげしいかっとうがあった。",
          "en": "心裡有著激烈的糾葛。"
        }
      ]
    },
    {
      "id": "v_n1_auto_57_" + Date.now(),
      "word": "衝動",
      "furigana": "しょうどう",
      "romaji": "shoudou",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "衝動",
      "sentences": [
        {
          "ja": "怒りの衝動を抑えきれなかった。",
          "furigana": "いかりのしょうどうをおさえきれなかった。",
          "en": "無法克制憤怒的衝動。"
        }
      ]
    },
    {
      "id": "v_n1_auto_58_" + Date.now(),
      "word": "郷愁",
      "furigana": "きょうしゅう",
      "romaji": "kyoushuu",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "鄉愁",
      "sentences": [
        {
          "ja": "古い写真を見て郷愁に駆られた。",
          "furigana": "ふるいしゃしんをみてきょうしゅうにかられた。",
          "en": "看著舊照片而興起了鄉愁。"
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
