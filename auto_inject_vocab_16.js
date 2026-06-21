const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_46_" + Date.now(),
      "word": "耳",
      "furigana": "みみ",
      "romaji": "mimi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "耳朵",
      "sentences": [
        {
          "ja": "ウサギは耳が長いです。",
          "furigana": "うさぎはみみがながいです。",
          "en": "兔子的耳朵很長。"
        }
      ]
    },
    {
      "id": "v_n5_auto_47_" + Date.now(),
      "word": "口",
      "furigana": "くち",
      "romaji": "kuchi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "嘴巴",
      "sentences": [
        {
          "ja": "大きく口を開けてください。",
          "furigana": "おおきくくちをあけてください。",
          "en": "請把嘴巴張大。"
        }
      ]
    },
    {
      "id": "v_n5_auto_48_" + Date.now(),
      "word": "鼻",
      "furigana": "はな",
      "romaji": "hana",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "鼻子",
      "sentences": [
        {
          "ja": "ゾウは鼻が長いです。",
          "furigana": "ぞうははながながいです。",
          "en": "大象的鼻子很長。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_46_" + Date.now(),
      "word": "意見",
      "furigana": "いけん",
      "romaji": "iken",
      "type": "noun",
      "category": "culture_thought",
      "level": "N4",
      "meaning": "意見",
      "sentences": [
        {
          "ja": "みんなの意見を聞きましょう。",
          "furigana": "みんなのいけんをききましょう。",
          "en": "聽聽大家的意見吧。"
        }
      ]
    },
    {
      "id": "v_n4_auto_47_" + Date.now(),
      "word": "相談",
      "furigana": "そうだん",
      "romaji": "soudan",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "商量 / 諮詢",
      "sentences": [
        {
          "ja": "先生に進路を相談する。",
          "furigana": "せんせいにしんろをそうだんする。",
          "en": "向老師商量升學出路。"
        }
      ]
    },
    {
      "id": "v_n4_auto_48_" + Date.now(),
      "word": "連絡",
      "furigana": "れんらく",
      "romaji": "renraku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "聯絡",
      "sentences": [
        {
          "ja": "着いたら連絡してください。",
          "furigana": "ついたられんらくしてください。",
          "en": "到了請聯絡我。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_46_" + Date.now(),
      "word": "記憶",
      "furigana": "きおく",
      "romaji": "kioku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "記憶",
      "sentences": [
        {
          "ja": "子供の頃の記憶が蘇る。",
          "furigana": "こどものころのきおくがよみがえる。",
          "en": "兒時的記憶復甦了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_47_" + Date.now(),
      "word": "期待",
      "furigana": "きたい",
      "romaji": "kitai",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "期待",
      "sentences": [
        {
          "ja": "親の期待に応える。",
          "furigana": "おやのきたいにこたえる。",
          "en": "回應父母的期待。"
        }
      ]
    },
    {
      "id": "v_n3_auto_48_" + Date.now(),
      "word": "比較",
      "furigana": "ひかく",
      "romaji": "hikaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "比較",
      "sentences": [
        {
          "ja": "二つの製品を比較する。",
          "furigana": "ふたつのせいひんをひかくする。",
          "en": "比較兩項產品。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_45_" + Date.now(),
      "word": "基準",
      "furigana": "きじゅん",
      "romaji": "kijun",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "基準 / 標準",
      "sentences": [
        {
          "ja": "安全基準を満たしている。",
          "furigana": "あんぜんきじゅんをみたしている。",
          "en": "符合安全基準。"
        }
      ]
    },
    {
      "id": "v_n2_auto_46_" + Date.now(),
      "word": "状態",
      "furigana": "じょうたい",
      "romaji": "joutai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "狀態",
      "sentences": [
        {
          "ja": "健康状態は良好だ。",
          "furigana": "けんこうじょうたいはりょうこうだ。",
          "en": "健康狀態良好。"
        }
      ]
    },
    {
      "id": "v_n2_auto_47_" + Date.now(),
      "word": "状況",
      "furigana": "じょうきょう",
      "romaji": "joukyou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "狀況 / 情況",
      "sentences": [
        {
          "ja": "現在の状況を説明する。",
          "furigana": "げんざいのじょうきょうをせつめいする。",
          "en": "說明現在的情況。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_44_" + Date.now(),
      "word": "妥協",
      "furigana": "だきょう",
      "romaji": "dakyou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "妥協",
      "sentences": [
        {
          "ja": "お互いに妥協して合意に達した。",
          "furigana": "おたがいにだきょうしてごういにたっした。",
          "en": "互相妥協達成了共識。"
        }
      ]
    },
    {
      "id": "v_n1_auto_45_" + Date.now(),
      "word": "貢献",
      "furigana": "こうけん",
      "romaji": "kouken",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "貢獻",
      "sentences": [
        {
          "ja": "社会の発展に大きく貢献する。",
          "furigana": "しゃかいのはってんにおおきくこうけんする。",
          "en": "對社會的發展做出巨大貢獻。"
        }
      ]
    },
    {
      "id": "v_n1_auto_46_" + Date.now(),
      "word": "犠牲",
      "furigana": "ぎせい",
      "romaji": "gisei",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "犧牲",
      "sentences": [
        {
          "ja": "多くの尊い命が犠牲になった。",
          "furigana": "おおくのとうといいのちがぎせいになった。",
          "en": "犧牲了許多寶貴的生命。"
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
