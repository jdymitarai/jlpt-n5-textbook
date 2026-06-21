const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_16_" + Date.now(),
      "word": "ご飯",
      "furigana": "ごはん",
      "romaji": "gohan",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "飯 / 餐點",
      "sentences": [
        {
          "ja": "家族と一緒にご飯を食べます。",
          "furigana": "かぞくといつしょにごはんをたべます。",
          "en": "和家人一起吃飯。"
        }
      ]
    },
    {
      "id": "v_n5_auto_17_" + Date.now(),
      "word": "映画",
      "furigana": "えいが",
      "romaji": "eiga",
      "type": "noun",
      "category": "culture_thought",
      "level": "N5",
      "meaning": "電影",
      "sentences": [
        {
          "ja": "週末は映画を見に行きます。",
          "furigana": "しゅうまつはえいがをみにいきます。",
          "en": "週末會去看電影。"
        }
      ]
    },
    {
      "id": "v_n5_auto_18_" + Date.now(),
      "word": "音楽",
      "furigana": "おんがく",
      "romaji": "ongaku",
      "type": "noun",
      "category": "culture_thought",
      "level": "N5",
      "meaning": "音樂",
      "sentences": [
        {
          "ja": "私は音楽を聴くのが好きです。",
          "furigana": "わたしはおんがくをきくのがすきです。",
          "en": "我喜歡聽音樂。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_16_" + Date.now(),
      "word": "歴史",
      "furigana": "れきし",
      "romaji": "rekishi",
      "type": "noun",
      "category": "culture_thought",
      "level": "N4",
      "meaning": "歷史",
      "sentences": [
        {
          "ja": "日本の歴史について勉強しています。",
          "furigana": "にほんのれきしについてべんきょうしています。",
          "en": "正在學習關於日本的歷史。"
        }
      ]
    },
    {
      "id": "v_n4_auto_17_" + Date.now(),
      "word": "小説",
      "furigana": "しょうせつ",
      "romaji": "shousetsu",
      "type": "noun",
      "category": "culture_thought",
      "level": "N4",
      "meaning": "小說",
      "sentences": [
        {
          "ja": "寝る前に小説を読みます。",
          "furigana": "ねるまえにしょうせつをよみます。",
          "en": "睡前會讀小說。"
        }
      ]
    },
    {
      "id": "v_n4_auto_18_" + Date.now(),
      "word": "授業",
      "furigana": "じゅぎょう",
      "romaji": "jugyou",
      "type": "noun",
      "category": "education_learning",
      "level": "N4",
      "meaning": "課程 / 課堂",
      "sentences": [
        {
          "ja": "今日の授業はとても面白かったです。",
          "furigana": "きょうのじゅぎょうはとてもおもしろかったです。",
          "en": "今天的課程非常有趣。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_16_" + Date.now(),
      "word": "管理",
      "furigana": "かんり",
      "romaji": "kanri",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "管理",
      "sentences": [
        {
          "ja": "健康管理には気をつけています。",
          "furigana": "けんこうかんりにはきをつけています。",
          "en": "我很注意健康管理。"
        }
      ]
    },
    {
      "id": "v_n3_auto_17_" + Date.now(),
      "word": "記憶",
      "furigana": "きおく",
      "romaji": "kioku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "記憶",
      "sentences": [
        {
          "ja": "子供の頃の記憶が蘇った。",
          "furigana": "こどものころのきおくがよみがえった。",
          "en": "童年時期的記憶甦醒了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_18_" + Date.now(),
      "word": "状態",
      "furigana": "じょうたい",
      "romaji": "joutai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "狀態",
      "sentences": [
        {
          "ja": "機械の状態をチェックしてください。",
          "furigana": "きかいのじょうたいをちぇっくしてください。",
          "en": "請檢查機器的狀態。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_15_" + Date.now(),
      "word": "範囲",
      "furigana": "はんい",
      "romaji": "hani",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "範圍",
      "sentences": [
        {
          "ja": "試験の範囲が広くて大変だ。",
          "furigana": "しけんのはんいがひろくてたいへんだ。",
          "en": "考試的範圍很廣，很辛苦。"
        }
      ]
    },
    {
      "id": "v_n2_auto_16_" + Date.now(),
      "word": "概念",
      "furigana": "がいねん",
      "romaji": "gainen",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "概念",
      "sentences": [
        {
          "ja": "新しい概念を理解するのは難しい。",
          "furigana": "あたらしいがいねんをりかいするのはむずかしい。",
          "en": "理解新概念是很困難的。"
        }
      ]
    },
    {
      "id": "v_n2_auto_17_" + Date.now(),
      "word": "基準",
      "furigana": "きじゅん",
      "romaji": "kijun",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "基準 / 標準",
      "sentences": [
        {
          "ja": "評価の基準を明確にする。",
          "furigana": "ひょうかのきじゅんをめいかくにする。",
          "en": "明確評價的標準。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_14_" + Date.now(),
      "word": "依然",
      "furigana": "いぜん",
      "romaji": "izen",
      "type": "adverb",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "依然 / 仍然",
      "sentences": [
        {
          "ja": "状況は依然として厳しいままだ。",
          "furigana": "じょうきょうはいぜんとしてきびしいままだ。",
          "en": "狀況依然很嚴峻。"
        }
      ]
    },
    {
      "id": "v_n1_auto_15_" + Date.now(),
      "word": "匹敵",
      "furigana": "ひってき",
      "romaji": "hitteki",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "匹敵 / 相當於",
      "sentences": [
        {
          "ja": "彼の能力はプロに匹敵する。",
          "furigana": "かれののうりょくはぷろにひってきする。",
          "en": "他的能力可以跟職業選手匹敵。"
        }
      ]
    },
    {
      "id": "v_n1_auto_16_" + Date.now(),
      "word": "詳細",
      "furigana": "しょうさい",
      "romaji": "shousai",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "詳細",
      "sentences": [
        {
          "ja": "詳細なデータに基づき分析を行う。",
          "furigana": "しょうさいなでーたにもとづきぶんせきをおこなう。",
          "en": "根據詳細的資料進行分析。"
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
