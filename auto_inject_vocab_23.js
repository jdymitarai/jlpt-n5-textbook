const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_67_" + Date.now(),
      "word": "東",
      "furigana": "ひがし",
      "romaji": "higashi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "東方",
      "sentences": [
        {
          "ja": "太陽は東から昇ります。",
          "furigana": "たいようはひがしからのぼります。",
          "en": "太陽從東方升起。"
        }
      ]
    },
    {
      "id": "v_n5_auto_68_" + Date.now(),
      "word": "西",
      "furigana": "にし",
      "romaji": "nishi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "西方",
      "sentences": [
        {
          "ja": "太陽は西に沈みます。",
          "furigana": "たいようはにしにしずみます。",
          "en": "太陽從西方落下。"
        }
      ]
    },
    {
      "id": "v_n5_auto_69_" + Date.now(),
      "word": "南",
      "furigana": "みなみ",
      "romaji": "minami",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "南方",
      "sentences": [
        {
          "ja": "南の島へ旅行に行きたいです。",
          "furigana": "みなみのしまへりょこうにいきたいです。",
          "en": "想去南方的島嶼旅行。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_67_" + Date.now(),
      "word": "駐車場",
      "furigana": "ちゅうしゃじょう",
      "romaji": "chuushajou",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "停車場",
      "sentences": [
        {
          "ja": "車を駐車場に止めます。",
          "furigana": "くるまをちゅうしゃじょうにとめます。",
          "en": "把車停在停車場。"
        }
      ]
    },
    {
      "id": "v_n4_auto_68_" + Date.now(),
      "word": "飛行場",
      "furigana": "ひこうじょう",
      "romaji": "hikoujou",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "機場",
      "sentences": [
        {
          "ja": "バスで飛行場まで行きます。",
          "furigana": "ばすでひこうじょうまでいきます。",
          "en": "搭公車去機場。"
        }
      ]
    },
    {
      "id": "v_n4_auto_69_" + Date.now(),
      "word": "体育館",
      "furigana": "たいいくかん",
      "romaji": "taiikukan",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "體育館",
      "sentences": [
        {
          "ja": "体育館でスポーツをします。",
          "furigana": "たいいくかんですぽーつをします。",
          "en": "在體育館做運動。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_67_" + Date.now(),
      "word": "基礎",
      "furigana": "きそ",
      "romaji": "kiso",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "基礎",
      "sentences": [
        {
          "ja": "何事も基礎が大切だ。",
          "furigana": "なにごともきそがたいせつだ。",
          "en": "任何事都是基礎最重要。"
        }
      ]
    },
    {
      "id": "v_n3_auto_68_" + Date.now(),
      "word": "規則",
      "furigana": "きそく",
      "romaji": "kisoku",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "規則",
      "sentences": [
        {
          "ja": "学校の規則を守る。",
          "furigana": "がっこうのきそくをまもる。",
          "en": "遵守學校的規則。"
        }
      ]
    },
    {
      "id": "v_n3_auto_69_" + Date.now(),
      "word": "予想",
      "furigana": "よそう",
      "romaji": "yosou",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "預期 / 預測",
      "sentences": [
        {
          "ja": "予想以上の結果が出た。",
          "furigana": "よそういじょうのけっかがでた。",
          "en": "得出了超乎預期的結果。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_66_" + Date.now(),
      "word": "指示",
      "furigana": "しじ",
      "romaji": "shiji",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "指示",
      "sentences": [
        {
          "ja": "上司の指示に従って動く。",
          "furigana": "じょうしのしじにしたがってうごく。",
          "en": "遵從上司的指示行動。"
        }
      ]
    },
    {
      "id": "v_n2_auto_67_" + Date.now(),
      "word": "命令",
      "furigana": "めいれい",
      "romaji": "meirei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "命令",
      "sentences": [
        {
          "ja": "それは絶対的な命令だ。",
          "furigana": "それはぜったいてきなめいれいだ。",
          "en": "那是絕對的命令。"
        }
      ]
    },
    {
      "id": "v_n2_auto_68_" + Date.now(),
      "word": "許可",
      "furigana": "きょか",
      "romaji": "kyoka",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "許可 / 准許",
      "sentences": [
        {
          "ja": "撮影の許可をもらう。",
          "furigana": "さつえいのきょかをもらう。",
          "en": "獲得攝影的許可。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_65_" + Date.now(),
      "word": "拒否",
      "furigana": "きょひ",
      "romaji": "kyohi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "拒絕 / 否決",
      "sentences": [
        {
          "ja": "彼の提案は委員会で拒否された。",
          "furigana": "かれのていあんはいいんかいできょひされた。",
          "en": "他的提案在委員會被否決了。"
        }
      ]
    },
    {
      "id": "v_n1_auto_66_" + Date.now(),
      "word": "拒絶",
      "furigana": "きょぜつ",
      "romaji": "kyozetsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "拒絕",
      "sentences": [
        {
          "ja": "その要求はきっぱりと拒絶した。",
          "furigana": "そのようきゅうはきっぱりときょぜつした。",
          "en": "果斷地拒絕了那個要求。"
        }
      ]
    },
    {
      "id": "v_n1_auto_67_" + Date.now(),
      "word": "排除",
      "furigana": "はいじょ",
      "romaji": "haijo",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "排除",
      "sentences": [
        {
          "ja": "不要な要素を完全に排除する。",
          "furigana": "ふようなようそをかんぜんにはいじょする。",
          "en": "將不必要的要素完全排除。"
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
