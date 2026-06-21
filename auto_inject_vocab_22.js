const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_64_" + Date.now(),
      "word": "黒",
      "furigana": "くろ",
      "romaji": "kuro",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "黑色",
      "sentences": [
        {
          "ja": "黒いペンで書いてください。",
          "furigana": "くろいぺんでかいてください。",
          "en": "請用黑色的筆寫。"
        }
      ]
    },
    {
      "id": "v_n5_auto_65_" + Date.now(),
      "word": "黄色",
      "furigana": "きいろ",
      "romaji": "kiiro",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "黃色",
      "sentences": [
        {
          "ja": "バナナは黄色です。",
          "furigana": "ばななはきいろです。",
          "en": "香蕉是黃色的。"
        }
      ]
    },
    {
      "id": "v_n5_auto_66_" + Date.now(),
      "word": "茶色",
      "furigana": "ちゃいろ",
      "romaji": "chairo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N5",
      "meaning": "茶色 / 棕色",
      "sentences": [
        {
          "ja": "茶色の靴を履いています。",
          "furigana": "ちゃいろいくつをはいています。",
          "en": "穿著棕色的鞋子。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_64_" + Date.now(),
      "word": "消防署",
      "furigana": "しょうぼうしょ",
      "romaji": "shoubousho",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "消防局",
      "sentences": [
        {
          "ja": "駅の前に消防署があります。",
          "furigana": "えきのまえにしょうぼうしょがあります。",
          "en": "車站前面有消防局。"
        }
      ]
    },
    {
      "id": "v_n4_auto_65_" + Date.now(),
      "word": "市役所",
      "furigana": "しやくしょ",
      "romaji": "shiyakusho",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "市政府",
      "sentences": [
        {
          "ja": "市役所で手続きをします。",
          "furigana": "しやくしょでてつづきをします。",
          "en": "在市政府辦理手續。"
        }
      ]
    },
    {
      "id": "v_n4_auto_66_" + Date.now(),
      "word": "大使館",
      "furigana": "たいしかん",
      "romaji": "taishikan",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "大使館",
      "sentences": [
        {
          "ja": "パスポートを大使館で更新する。",
          "furigana": "ぱすぽーとをたいしかんでこうしんする。",
          "en": "在大使館更新護照。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_64_" + Date.now(),
      "word": "効果",
      "furigana": "こうか",
      "romaji": "kouka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "效果",
      "sentences": [
        {
          "ja": "この薬はすぐに効果が出る。",
          "furigana": "このくすりはすぐにこうかがでる。",
          "en": "這款藥馬上就會有效果。"
        }
      ]
    },
    {
      "id": "v_n3_auto_65_" + Date.now(),
      "word": "成果",
      "furigana": "せいか",
      "romaji": "seika",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "成果",
      "sentences": [
        {
          "ja": "日々の努力が成果を生んだ。",
          "furigana": "ひびのどりょくがせいかをうんだ。",
          "en": "每天的努力產生了成果。"
        }
      ]
    },
    {
      "id": "v_n3_auto_66_" + Date.now(),
      "word": "感動",
      "furigana": "かんどう",
      "romaji": "kandou",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "感動",
      "sentences": [
        {
          "ja": "映画を見て深く感動した。",
          "furigana": "えいがをみてふかくかんどうした。",
          "en": "看了電影後深受感動。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_63_" + Date.now(),
      "word": "段階",
      "furigana": "だんかい",
      "romaji": "dankai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "階段",
      "sentences": [
        {
          "ja": "計画は最終段階に入った。",
          "furigana": "けいかくはさいしゅうだんかいにはいった。",
          "en": "計畫進入了最後階段。"
        }
      ]
    },
    {
      "id": "v_n2_auto_64_" + Date.now(),
      "word": "形態",
      "furigana": "けいたい",
      "romaji": "keitai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "形態 / 形式",
      "sentences": [
        {
          "ja": "新しいビジネスの形態を探る。",
          "furigana": "あたらしいびじねすのけいたいをさぐる。",
          "en": "探索新的商業形態。"
        }
      ]
    },
    {
      "id": "v_n2_auto_65_" + Date.now(),
      "word": "形式",
      "furigana": "けいしき",
      "romaji": "keishiki",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "形式",
      "sentences": [
        {
          "ja": "書類の形式を統一する。",
          "furigana": "しょるいのけいしきをとういつする。",
          "en": "統一文件的形式。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_62_" + Date.now(),
      "word": "束縛",
      "furigana": "そくばく",
      "romaji": "sokubaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "束縛 / 限制",
      "sentences": [
        {
          "ja": "時間的束縛から解放されたい。",
          "furigana": "じかんてきそくばくからかいほうされたい。",
          "en": "想要從時間的束縛中解脫出來。"
        }
      ]
    },
    {
      "id": "v_n1_auto_63_" + Date.now(),
      "word": "従属",
      "furigana": "じゅうぞく",
      "romaji": "juuzoku",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "從屬 / 附屬",
      "sentences": [
        {
          "ja": "他国に従属する状態から抜け出す。",
          "furigana": "たこくにじゅうぞくするじょうたいからぬけだす。",
          "en": "擺脫從屬於他國的狀態。"
        }
      ]
    },
    {
      "id": "v_n1_auto_64_" + Date.now(),
      "word": "克服",
      "furigana": "こくふく",
      "romaji": "kokufuku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "克服",
      "sentences": [
        {
          "ja": "多くの困難を克服して成功を収めた。",
          "furigana": "おおくのこんなんをこくふくしてせいこうをおさめた。",
          "en": "克服了許多困難而取得了成功。"
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
