const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_10_" + Date.now(),
      "word": "部屋",
      "furigana": "へや",
      "romaji": "heya",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "房間",
      "sentences": [
        {
          "ja": "私の部屋はとても狭いです。",
          "furigana": "わたしのへやはとてもせまいです。",
          "en": "我的房間非常狹窄。"
        }
      ]
    },
    {
      "id": "v_n5_auto_11_" + Date.now(),
      "word": "水",
      "furigana": "みず",
      "romaji": "mizu",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "水",
      "sentences": [
        {
          "ja": "冷たい水を一杯ください。",
          "furigana": "つめたいみずをいっぱいください。",
          "en": "請給我一杯冷水。"
        }
      ]
    },
    {
      "id": "v_n5_auto_12_" + Date.now(),
      "word": "電車",
      "furigana": "でんしゃ",
      "romaji": "densha",
      "type": "noun",
      "category": "traffic_travel",
      "level": "N5",
      "meaning": "電車",
      "sentences": [
        {
          "ja": "毎日電車で通勤しています。",
          "furigana": "まいにちでんしゃでつうきんしています。",
          "en": "每天搭電車通勤。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_10_" + Date.now(),
      "word": "趣味",
      "furigana": "しゅみ",
      "romaji": "shumi",
      "type": "noun",
      "category": "psychology_character",
      "level": "N4",
      "meaning": "興趣",
      "sentences": [
        {
          "ja": "私の趣味は写真を撮ることです。",
          "furigana": "わたしのしゅみはしゃしんをとることです。",
          "en": "我的興趣是拍照。"
        }
      ]
    },
    {
      "id": "v_n4_auto_11_" + Date.now(),
      "word": "試合",
      "furigana": "しあい",
      "romaji": "shiai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "比賽",
      "sentences": [
        {
          "ja": "明日のサッカーの試合が楽しみです。",
          "furigana": "あしたのさっかーのしあいがたのしみです。",
          "en": "很期待明天的足球比賽。"
        }
      ]
    },
    {
      "id": "v_n4_auto_12_" + Date.now(),
      "word": "季節",
      "furigana": "きせつ",
      "romaji": "kisetsu",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N4",
      "meaning": "季節",
      "sentences": [
        {
          "ja": "日本の季節は四つあります。",
          "furigana": "にほんのきせつはよっつあります。",
          "en": "日本有四個季節。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_10_" + Date.now(),
      "word": "感情",
      "furigana": "かんじょう",
      "romaji": "kanjou",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "感情 / 情緒",
      "sentences": [
        {
          "ja": "自分の感情をコントロールするのは難しい。",
          "furigana": "じぶんのかんじょうをこんとろーるするのはむずかしい。",
          "en": "控制自己的情緒是很困難的。"
        }
      ]
    },
    {
      "id": "v_n3_auto_11_" + Date.now(),
      "word": "理解",
      "furigana": "りかい",
      "romaji": "rikai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "理解",
      "sentences": [
        {
          "ja": "お互いの文化を理解することが大切だ。",
          "furigana": "おたがいのぶんかをりかいすることがたいせつだ。",
          "en": "理解彼此的文化是很重要的。"
        }
      ]
    },
    {
      "id": "v_n3_auto_12_" + Date.now(),
      "word": "協力",
      "furigana": "きょうりょく",
      "romaji": "kyouryoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "合作 / 協助",
      "sentences": [
        {
          "ja": "チームで協力してプロジェクトを進める。",
          "furigana": "ちーむできょうりょくしてぷろじぇくとをすすめる。",
          "en": "團隊合作推進專案。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_9_" + Date.now(),
      "word": "資源",
      "furigana": "しげん",
      "romaji": "shigen",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N2",
      "meaning": "資源",
      "sentences": [
        {
          "ja": "天然資源を大切に使うべきだ。",
          "furigana": "てんねんしげんをたいせつにつかうべきだ。",
          "en": "應該珍惜使用天然資源。"
        }
      ]
    },
    {
      "id": "v_n2_auto_10_" + Date.now(),
      "word": "構造",
      "furigana": "こうぞう",
      "romaji": "kouzou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "構造 / 結構",
      "sentences": [
        {
          "ja": "この建物の構造は非常に複雑だ。",
          "furigana": "このたてもののこうぞうはひじょうにふくざつだ。",
          "en": "這棟建築的結構非常複雜。"
        }
      ]
    },
    {
      "id": "v_n2_auto_11_" + Date.now(),
      "word": "摩擦",
      "furigana": "まさつ",
      "romaji": "masatsu",
      "type": "noun",
      "category": "relations_human",
      "level": "N2",
      "meaning": "摩擦 / 衝突",
      "sentences": [
        {
          "ja": "貿易摩擦が両国の関係を悪化させた。",
          "furigana": "ぼうえきまさつがりょうこくのかんけいをあっかさせた。",
          "en": "貿易摩擦讓兩國關係惡化了。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_8_" + Date.now(),
      "word": "媒体",
      "furigana": "ばいたい",
      "romaji": "baitai",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "媒體 / 媒介",
      "sentences": [
        {
          "ja": "情報は様々な媒体を通じて伝えられる。",
          "furigana": "じょうほうはさまざまなばいたいをつうじてつたえられる。",
          "en": "資訊透過各種媒體傳播。"
        }
      ]
    },
    {
      "id": "v_n1_auto_9_" + Date.now(),
      "word": "該当",
      "furigana": "がいとう",
      "romaji": "gaitou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "符合 / 相當於",
      "sentences": [
        {
          "ja": "条件に該当する方を募集します。",
          "furigana": "じょうけんにがいとうするほうをぼしゅうします。",
          "en": "招募符合條件的人士。"
        }
      ]
    },
    {
      "id": "v_n1_auto_10_" + Date.now(),
      "word": "推移",
      "furigana": "すいい",
      "romaji": "suii",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "推移 / 變化",
      "sentences": [
        {
          "ja": "売上の推移をグラフで示す。",
          "furigana": "うりあげのすいいをぐらふでしめす。",
          "en": "用圖表顯示銷售額的變化。"
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
