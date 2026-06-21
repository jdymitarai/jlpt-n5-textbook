const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_76_" + Date.now(),
      "word": "後ろ",
      "furigana": "うしろ",
      "romaji": "ushiro",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "後面",
      "sentences": [
        {
          "ja": "私の後ろに人がいます。",
          "furigana": "わたしのうしろにひとがいます。",
          "en": "我後面有人。"
        }
      ]
    },
    {
      "id": "v_n5_auto_77_" + Date.now(),
      "word": "隣",
      "furigana": "となり",
      "romaji": "tonari",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "旁邊 / 隔壁",
      "sentences": [
        {
          "ja": "隣の部屋から声がする。",
          "furigana": "となりのへやからこえがする。",
          "en": "從隔壁房間傳來聲音。"
        }
      ]
    },
    {
      "id": "v_n5_auto_78_" + Date.now(),
      "word": "近く",
      "furigana": "ちかく",
      "romaji": "chikaku",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "附近",
      "sentences": [
        {
          "ja": "家の近くに公園があります。",
          "furigana": "いえのちかくにこうえんがあります。",
          "en": "家附近有公園。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_76_" + Date.now(),
      "word": "火事",
      "furigana": "かじ",
      "romaji": "kaji",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "火災",
      "sentences": [
        {
          "ja": "遠くで火事がありました。",
          "furigana": "とおくでかじがありました。",
          "en": "遠處發生了火災。"
        }
      ]
    },
    {
      "id": "v_n4_auto_77_" + Date.now(),
      "word": "警察",
      "furigana": "けいさつ",
      "romaji": "keisatsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "警察",
      "sentences": [
        {
          "ja": "警察に電話をかけます。",
          "furigana": "けいさつにでんわをかけます。",
          "en": "打電話給警察。"
        }
      ]
    },
    {
      "id": "v_n4_auto_78_" + Date.now(),
      "word": "交番",
      "furigana": "こうばん",
      "romaji": "kouban",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "派出所",
      "sentences": [
        {
          "ja": "道に迷って交番で聞いた。",
          "furigana": "みちにまよってこうばできいた。",
          "en": "迷路了，在派出所問了路。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_76_" + Date.now(),
      "word": "結果",
      "furigana": "けっか",
      "romaji": "kekka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "結果",
      "sentences": [
        {
          "ja": "試験の結果が発表された。",
          "furigana": "しけんのけっかがはっぴょうされた。",
          "en": "考試結果發表了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_77_" + Date.now(),
      "word": "結論",
      "furigana": "けつろん",
      "romaji": "ketsuron",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "結論",
      "sentences": [
        {
          "ja": "話し合いの結論を出す。",
          "furigana": "はなしあいのけつろんをだす。",
          "en": "得出討論的結論。"
        }
      ]
    },
    {
      "id": "v_n3_auto_78_" + Date.now(),
      "word": "目標",
      "furigana": "もくひょう",
      "romaji": "mokuhyou",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "目標",
      "sentences": [
        {
          "ja": "今年の目標を立てる。",
          "furigana": "ことしのもくひょうをたてる。",
          "en": "制定今年的目標。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_75_" + Date.now(),
      "word": "計画",
      "furigana": "けいかく",
      "romaji": "keikaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "計畫",
      "sentences": [
        {
          "ja": "旅行の計画を立てる。",
          "furigana": "りょこうのけいかくをたてる。",
          "en": "擬定旅行的計畫。"
        }
      ]
    },
    {
      "id": "v_n2_auto_76_" + Date.now(),
      "word": "企画",
      "furigana": "きかく",
      "romaji": "kikaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "企劃 / 策劃",
      "sentences": [
        {
          "ja": "新しいイベントを企画する。",
          "furigana": "あたらしいいべんとをきかくする。",
          "en": "策劃新的活動。"
        }
      ]
    },
    {
      "id": "v_n2_auto_77_" + Date.now(),
      "word": "設備",
      "furigana": "せつび",
      "romaji": "setsubi",
      "type": "noun",
      "category": "living_housing",
      "level": "N2",
      "meaning": "設備",
      "sentences": [
        {
          "ja": "工場の設備を新しくする。",
          "furigana": "こうじょうのせつびをあたらしくする。",
          "en": "更新工廠的設備。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_74_" + Date.now(),
      "word": "逮捕",
      "furigana": "たいほ",
      "romaji": "taiho",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "逮捕",
      "sentences": [
        {
          "ja": "警察が犯人を逮捕した。",
          "furigana": "けいさつがはんにんをたいほした。",
          "en": "警察逮捕了犯人。"
        }
      ]
    },
    {
      "id": "v_n1_auto_75_" + Date.now(),
      "word": "処罰",
      "furigana": "しょばつ",
      "romaji": "shobatsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "處罰",
      "sentences": [
        {
          "ja": "厳しい処罰を受ける。",
          "furigana": "きびしいしょばつをうける。",
          "en": "接受嚴厲的處罰。"
        }
      ]
    },
    {
      "id": "v_n1_auto_76_" + Date.now(),
      "word": "釈放",
      "furigana": "しゃくほう",
      "romaji": "shakuhou",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "釋放",
      "sentences": [
        {
          "ja": "証拠不十分で釈放された。",
          "furigana": "しょうこふじゅうぶんでしゃくほうされた。",
          "en": "因證據不足而被釋放了。"
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
