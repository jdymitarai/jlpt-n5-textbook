const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_43_" + Date.now(),
      "word": "手",
      "furigana": "て",
      "romaji": "te",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "手",
      "sentences": [
        {
          "ja": "食べる前に手を洗います。",
          "furigana": "たべるまえにてをあらいます。",
          "en": "吃東西前洗手。"
        }
      ]
    },
    {
      "id": "v_n5_auto_44_" + Date.now(),
      "word": "足",
      "furigana": "あし",
      "romaji": "ashi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "腳",
      "sentences": [
        {
          "ja": "歩きすぎて足が痛いです。",
          "furigana": "あるきすぎてあしがいたいです。",
          "en": "走太多路腳很痛。"
        }
      ]
    },
    {
      "id": "v_n5_auto_45_" + Date.now(),
      "word": "目",
      "furigana": "め",
      "romaji": "me",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "眼睛",
      "sentences": [
        {
          "ja": "彼女は目が大きいです。",
          "furigana": "かのじょはめがおおきいです。",
          "en": "她的眼睛很大。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_43_" + Date.now(),
      "word": "遠慮",
      "furigana": "えんりょ",
      "romaji": "enryo",
      "type": "noun",
      "category": "relations_human",
      "level": "N4",
      "meaning": "客氣 / 顧慮",
      "sentences": [
        {
          "ja": "遠慮しないでたくさん食べてください。",
          "furigana": "えんりょしないでたくさんたべてください。",
          "en": "請不要客氣，多吃一點。"
        }
      ]
    },
    {
      "id": "v_n4_auto_44_" + Date.now(),
      "word": "賛成",
      "furigana": "さんせい",
      "romaji": "sansei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "贊成",
      "sentences": [
        {
          "ja": "その意見に賛成します。",
          "furigana": "そのいけんにさんせいします。",
          "en": "我贊成那個意見。"
        }
      ]
    },
    {
      "id": "v_n4_auto_45_" + Date.now(),
      "word": "反対",
      "furigana": "はんたい",
      "romaji": "hantai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "反對",
      "sentences": [
        {
          "ja": "私の家族は留学に反対しています。",
          "furigana": "わたしかぞくはりゅうがくにはんたいしています。",
          "en": "我的家人反對我留學。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_43_" + Date.now(),
      "word": "想像",
      "furigana": "そうぞう",
      "romaji": "souzou",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "想像",
      "sentences": [
        {
          "ja": "想像と現実は違うことが多い。",
          "furigana": "そうぞうとげんじつはちがうことがおおい。",
          "en": "想像和現實經常是不一樣的。"
        }
      ]
    },
    {
      "id": "v_n3_auto_44_" + Date.now(),
      "word": "発達",
      "furigana": "はったつ",
      "romaji": "hattatsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發達 / 發展",
      "sentences": [
        {
          "ja": "この町は交通が発達している。",
          "furigana": "このまちはこうつうがはったつしている。",
          "en": "這個城鎮的交通很發達。"
        }
      ]
    },
    {
      "id": "v_n3_auto_45_" + Date.now(),
      "word": "観察",
      "furigana": "かんさつ",
      "romaji": "kansatsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "觀察",
      "sentences": [
        {
          "ja": "植物の成長を観察する。",
          "furigana": "しょくぶつのせいちょうをかんさつする。",
          "en": "觀察植物的生長。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_42_" + Date.now(),
      "word": "典型",
      "furigana": "てんけい",
      "romaji": "tenkei",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "典型",
      "sentences": [
        {
          "ja": "これは典型的な失敗例だ。",
          "furigana": "これはてんけいてきなしっぱいれいだ。",
          "en": "這是典型的失敗例子。"
        }
      ]
    },
    {
      "id": "v_n2_auto_43_" + Date.now(),
      "word": "共通",
      "furigana": "きょうつう",
      "romaji": "kyoutsuu",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "共通 / 共同",
      "sentences": [
        {
          "ja": "二人の共通の趣味は読書だ。",
          "furigana": "ふたりのきょうつうのしゅみはどくしょだ。",
          "en": "兩人共同的興趣是閱讀。"
        }
      ]
    },
    {
      "id": "v_n2_auto_44_" + Date.now(),
      "word": "応用",
      "furigana": "おうよう",
      "romaji": "ouyou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "應用",
      "sentences": [
        {
          "ja": "基礎を学んだら、次に応用問題に挑戦する。",
          "furigana": "きそをまなんだら、つぎにおうようもんだいにちょうせんする。",
          "en": "學完基礎後，接著挑戰應用題。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_41_" + Date.now(),
      "word": "享受",
      "furigana": "きょうじゅ",
      "romaji": "kyouju",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "享受 / 享有",
      "sentences": [
        {
          "ja": "私たちは平和の恩恵を享受している。",
          "furigana": "わたしたちはへいわのおんけいをきょうじゅしている。",
          "en": "我們享受著和平的恩惠。"
        }
      ]
    },
    {
      "id": "v_n1_auto_42_" + Date.now(),
      "word": "円滑",
      "furigana": "えんかつ",
      "romaji": "enkatsu",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "圓滑 / 順利",
      "sentences": [
        {
          "ja": "会議は円滑に進行した。",
          "furigana": "かいぎはえんかつにしんこうした。",
          "en": "會議順利進行。"
        }
      ]
    },
    {
      "id": "v_n1_auto_43_" + Date.now(),
      "word": "抜本的",
      "furigana": "ばっぽんてき",
      "romaji": "bapponteki",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "根本性的 / 徹底的",
      "sentences": [
        {
          "ja": "制度の抜本的な改革が必要だ。",
          "furigana": "せいどのばっぽんてきなかいかくがひつようだ。",
          "en": "需要進行制度上的根本性改革。"
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
