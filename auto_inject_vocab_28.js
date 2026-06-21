const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_82_" + Date.now(),
      "word": "朝",
      "furigana": "あさ",
      "romaji": "asa",
      "type": "noun",
      "category": "time_frequency",
      "level": "N5",
      "meaning": "早上",
      "sentences": [
        {
          "ja": "毎朝６時に起きます。",
          "furigana": "まいあさろくじにおきます。",
          "en": "每天早上６點起床。"
        }
      ]
    },
    {
      "id": "v_n5_auto_83_" + Date.now(),
      "word": "昼",
      "furigana": "ひる",
      "romaji": "hiru",
      "type": "noun",
      "category": "time_frequency",
      "level": "N5",
      "meaning": "白天 / 中午",
      "sentences": [
        {
          "ja": "昼から雨が降ります。",
          "furigana": "ひるからあめがふります。",
          "en": "從中午開始下雨。"
        }
      ]
    },
    {
      "id": "v_n5_auto_84_" + Date.now(),
      "word": "夜",
      "furigana": "よる",
      "romaji": "yoru",
      "type": "noun",
      "category": "time_frequency",
      "level": "N5",
      "meaning": "晚上",
      "sentences": [
        {
          "ja": "夜は涼しいです。",
          "furigana": "よるはすずしいです。",
          "en": "晚上很涼爽。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_82_" + Date.now(),
      "word": "季節",
      "furigana": "きせつ",
      "romaji": "kisetsu",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "季節",
      "sentences": [
        {
          "ja": "好きな季節は秋です。",
          "furigana": "すきなきせつはあきです。",
          "en": "喜歡的季節是秋天。"
        }
      ]
    },
    {
      "id": "v_n4_auto_83_" + Date.now(),
      "word": "景色",
      "furigana": "けしき",
      "romaji": "keshiki",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "景色",
      "sentences": [
        {
          "ja": "山の上からの景色は美しい。",
          "furigana": "やまのうえからのけしきはうつくしい。",
          "en": "從山上看下去的景色很美。"
        }
      ]
    },
    {
      "id": "v_n4_auto_84_" + Date.now(),
      "word": "海岸",
      "furigana": "かいがん",
      "romaji": "kaigan",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "海岸",
      "sentences": [
        {
          "ja": "海岸を散歩する。",
          "furigana": "かいがんをさんぽする。",
          "en": "在海岸散步。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_82_" + Date.now(),
      "word": "努力",
      "furigana": "どりょく",
      "romaji": "doryoku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "努力",
      "sentences": [
        {
          "ja": "目標に向かって努力する。",
          "furigana": "もくひょうにむかってどりょくする。",
          "en": "朝著目標努力。"
        }
      ]
    },
    {
      "id": "v_n3_auto_83_" + Date.now(),
      "word": "成功",
      "furigana": "せいこう",
      "romaji": "seikou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "成功",
      "sentences": [
        {
          "ja": "事業が成功する。",
          "furigana": "じぎょうがせいこうする。",
          "en": "事業成功。"
        }
      ]
    },
    {
      "id": "v_n3_auto_84_" + Date.now(),
      "word": "失敗",
      "furigana": "しっぱい",
      "romaji": "shippai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "失敗",
      "sentences": [
        {
          "ja": "失敗から学ぶことが多い。",
          "furigana": "しっぱいからまなぶことがおおい。",
          "en": "從失敗中學到的東西很多。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_81_" + Date.now(),
      "word": "欠点",
      "furigana": "けってん",
      "romaji": "ketten",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "缺點",
      "sentences": [
        {
          "ja": "誰にでも欠点はある。",
          "furigana": "だれにでもけってんはある。",
          "en": "任何人都有缺點。"
        }
      ]
    },
    {
      "id": "v_n2_auto_82_" + Date.now(),
      "word": "弱点",
      "furigana": "じゃくてん",
      "romaji": "jakuten",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "弱點",
      "sentences": [
        {
          "ja": "相手の弱点を突く。",
          "furigana": "あいてのじゃくてんをつく。",
          "en": "攻擊對方的弱點。"
        }
      ]
    },
    {
      "id": "v_n2_auto_83_" + Date.now(),
      "word": "魅力",
      "furigana": "みりょく",
      "romaji": "miryoku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N2",
      "meaning": "魅力",
      "sentences": [
        {
          "ja": "彼女の笑顔には魅力がある。",
          "furigana": "かのじょのえがおにはみりょくがある。",
          "en": "她的笑容很有魅力。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_80_" + Date.now(),
      "word": "証言",
      "furigana": "しょうげん",
      "romaji": "shougen",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "證詞 / 證言",
      "sentences": [
        {
          "ja": "目撃者の証言が決め手になった。",
          "furigana": "もくげきしゃのしょうげんがきめてになった。",
          "en": "目擊者的證詞成為了決定性因素。"
        }
      ]
    },
    {
      "id": "v_n1_auto_81_" + Date.now(),
      "word": "陪審",
      "furigana": "ばいしん",
      "romaji": "baishin",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "陪審團",
      "sentences": [
        {
          "ja": "陪審員の意見が一致した。",
          "furigana": "ばいしんいんのいけんがいっちした。",
          "en": "陪審員的意見達成了一致。"
        }
      ]
    },
    {
      "id": "v_n1_auto_82_" + Date.now(),
      "word": "刑罰",
      "furigana": "けいばつ",
      "romaji": "keibatsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "刑罰",
      "sentences": [
        {
          "ja": "重い刑罰を科される。",
          "furigana": "おもいけいばつをかされる。",
          "en": "被處以重刑。"
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
