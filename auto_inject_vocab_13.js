const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_37_" + Date.now(),
      "word": "猫",
      "furigana": "ねこ",
      "romaji": "neko",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "貓",
      "sentences": [
        {
          "ja": "可愛い猫を飼っています。",
          "furigana": "かわいいねこをかっています。",
          "en": "養了一隻可愛的貓。"
        }
      ]
    },
    {
      "id": "v_n5_auto_38_" + Date.now(),
      "word": "犬",
      "furigana": "いぬ",
      "romaji": "inu",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "狗",
      "sentences": [
        {
          "ja": "公園で犬と散歩します。",
          "furigana": "こうえんていぬとさんぽします。",
          "en": "在公園和狗散步。"
        }
      ]
    },
    {
      "id": "v_n5_auto_39_" + Date.now(),
      "word": "鳥",
      "furigana": "とり",
      "romaji": "tori",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "鳥",
      "sentences": [
        {
          "ja": "空に鳥が飛んでいます。",
          "furigana": "そらにとりがとんでいます。",
          "en": "天空中鳥兒在飛。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_37_" + Date.now(),
      "word": "運動",
      "furigana": "うんどう",
      "romaji": "undou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "運動",
      "sentences": [
        {
          "ja": "健康のために毎日運動します。",
          "furigana": "けんこうのためにまいにちうんどうします。",
          "en": "為了健康每天做運動。"
        }
      ]
    },
    {
      "id": "v_n4_auto_38_" + Date.now(),
      "word": "健康",
      "furigana": "けんこう",
      "romaji": "kenkou",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "健康",
      "sentences": [
        {
          "ja": "健康に気をつけてください。",
          "furigana": "けんこうにきをつけてください。",
          "en": "請注意健康。"
        }
      ]
    },
    {
      "id": "v_n4_auto_39_" + Date.now(),
      "word": "景色",
      "furigana": "けしき",
      "romaji": "keshiki",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "景色 / 風景",
      "sentences": [
        {
          "ja": "山からの景色が綺麗です。",
          "furigana": "やまからのけしきがきれいです。",
          "en": "從山上看到的風景很美。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_37_" + Date.now(),
      "word": "財産",
      "furigana": "ざいさん",
      "romaji": "zaisan",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "財產",
      "sentences": [
        {
          "ja": "彼は多くの財産を残した。",
          "furigana": "かれはおおくのざいさんをのこした。",
          "en": "他留下了許多財產。"
        }
      ]
    },
    {
      "id": "v_n3_auto_38_" + Date.now(),
      "word": "貯金",
      "furigana": "ちょきん",
      "romaji": "chokin",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "存錢 / 存款",
      "sentences": [
        {
          "ja": "将来のために貯金しています。",
          "furigana": "しょうらいのためにちょきんしています。",
          "en": "為了將來正在存錢。"
        }
      ]
    },
    {
      "id": "v_n3_auto_39_" + Date.now(),
      "word": "税金",
      "furigana": "ぜいきん",
      "romaji": "zeikin",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "稅金",
      "sentences": [
        {
          "ja": "消費税が上がりました。",
          "furigana": "しょうひぜいがあがりました。",
          "en": "消費稅上漲了。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_36_" + Date.now(),
      "word": "割合",
      "furigana": "わりあい",
      "romaji": "wariai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "比例",
      "sentences": [
        {
          "ja": "賛成する人の割合が高い。",
          "furigana": "さんせいするひとのわりあいがたかい。",
          "en": "贊成的人的比例很高。"
        }
      ]
    },
    {
      "id": "v_n2_auto_37_" + Date.now(),
      "word": "程度",
      "furigana": "ていど",
      "romaji": "teido",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "程度",
      "sentences": [
        {
          "ja": "ある程度の妥協は必要だ。",
          "furigana": "あるていどのだきょうはひつようだ。",
          "en": "某種程度的妥協是必要的。"
        }
      ]
    },
    {
      "id": "v_n2_auto_38_" + Date.now(),
      "word": "要素",
      "furigana": "ようそ",
      "romaji": "youso",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "要素",
      "sentences": [
        {
          "ja": "成功には運も重要な要素だ。",
          "furigana": "せいこうにはうんもじゅうようなようそだ。",
          "en": "對於成功，運氣也是個重要的要素。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_35_" + Date.now(),
      "word": "余地",
      "furigana": "よち",
      "romaji": "yochi",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "餘地",
      "sentences": [
        {
          "ja": "弁解の余地はない。",
          "furigana": "べんかいのよちはない。",
          "en": "沒有辯解的餘地。"
        }
      ]
    },
    {
      "id": "v_n1_auto_36_" + Date.now(),
      "word": "兆候",
      "furigana": "ちょうこう",
      "romaji": "choukou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "兆候 / 徵兆",
      "sentences": [
        {
          "ja": "景気回復の兆候が見られる。",
          "furigana": "けいきかいふくのちょうこうがみられる。",
          "en": "能看見景氣復甦的徵兆。"
        }
      ]
    },
    {
      "id": "v_n1_auto_37_" + Date.now(),
      "word": "趣旨",
      "furigana": "しゅし",
      "romaji": "shushi",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "主旨 / 本意",
      "sentences": [
        {
          "ja": "会議の趣旨を説明する。",
          "furigana": "かいぎのしゅしをせつめいする。",
          "en": "說明會議的主旨。"
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
