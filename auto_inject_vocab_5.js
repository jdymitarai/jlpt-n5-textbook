const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_13_" + Date.now(),
      "word": "車",
      "furigana": "くるま",
      "romaji": "kuruma",
      "type": "noun",
      "category": "traffic_travel",
      "level": "N5",
      "meaning": "車子",
      "sentences": [
        {
          "ja": "私は車を持っていません。",
          "furigana": "わたしはくるまをもっていません。",
          "en": "我沒有車子。"
        }
      ]
    },
    {
      "id": "v_n5_auto_14_" + Date.now(),
      "word": "手紙",
      "furigana": "てがみ",
      "romaji": "tegami",
      "type": "noun",
      "category": "activities_actions",
      "level": "N5",
      "meaning": "信件",
      "sentences": [
        {
          "ja": "友達に手紙を書きました。",
          "furigana": "ともだちにてがみをかきました。",
          "en": "寫信給了朋友。"
        }
      ]
    },
    {
      "id": "v_n5_auto_15_" + Date.now(),
      "word": "時計",
      "furigana": "とけい",
      "romaji": "tokei",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "鐘錶",
      "sentences": [
        {
          "ja": "新しい時計を買いました。",
          "furigana": "あたらしいとけいをかいました。",
          "en": "買了新手錶。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_13_" + Date.now(),
      "word": "規則",
      "furigana": "きそく",
      "romaji": "kisoku",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "規則",
      "sentences": [
        {
          "ja": "学校の規則を守ってください。",
          "furigana": "がっこうのきそくをまもってください。",
          "en": "請遵守學校的規則。"
        }
      ]
    },
    {
      "id": "v_n4_auto_14_" + Date.now(),
      "word": "交通",
      "furigana": "こうつう",
      "romaji": "koutsuu",
      "type": "noun",
      "category": "traffic_travel",
      "level": "N4",
      "meaning": "交通",
      "sentences": [
        {
          "ja": "この町は交通が便利です。",
          "furigana": "このまちはこうつうがべんりです。",
          "en": "這個城鎮的交通很方便。"
        }
      ]
    },
    {
      "id": "v_n4_auto_15_" + Date.now(),
      "word": "計画",
      "furigana": "けいかく",
      "romaji": "keikaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "計畫",
      "sentences": [
        {
          "ja": "夏休みの計画を立てました。",
          "furigana": "なつやすみのけいかくをたてました。",
          "en": "制定了暑假的計畫。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_13_" + Date.now(),
      "word": "効果",
      "furigana": "こうか",
      "romaji": "kouka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "效果",
      "sentences": [
        {
          "ja": "この薬は効果があります。",
          "furigana": "このくすりはこうかがあります。",
          "en": "這個藥有效果。"
        }
      ]
    },
    {
      "id": "v_n3_auto_14_" + Date.now(),
      "word": "条件",
      "furigana": "じょうけん",
      "romaji": "jouken",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "條件",
      "sentences": [
        {
          "ja": "働く条件について話し合う。",
          "furigana": "はたらくじょうけんについてはなしあう。",
          "en": "討論工作的條件。"
        }
      ]
    },
    {
      "id": "v_n3_auto_15_" + Date.now(),
      "word": "実験",
      "furigana": "じっけん",
      "romaji": "jikken",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "實驗",
      "sentences": [
        {
          "ja": "理科室で実験を行います。",
          "furigana": "りかしつでじっけんをおこないます。",
          "en": "在理化教室進行實驗。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_12_" + Date.now(),
      "word": "抽象",
      "furigana": "ちゅうしょう",
      "romaji": "chuushou",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "抽象",
      "sentences": [
        {
          "ja": "彼の話は抽象的で分かりにくい。",
          "furigana": "かれのはなしはちゅうしょうてきでわかりにくい。",
          "en": "他的話很抽象，難以理解。"
        }
      ]
    },
    {
      "id": "v_n2_auto_13_" + Date.now(),
      "word": "具体",
      "furigana": "ぐたい",
      "romaji": "gutai",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "具體",
      "sentences": [
        {
          "ja": "もっと具体的な例を挙げてください。",
          "furigana": "もっとぐたいてきなれいをあげてください。",
          "en": "請舉出更具體的例子。"
        }
      ]
    },
    {
      "id": "v_n2_auto_14_" + Date.now(),
      "word": "論理",
      "furigana": "ろんり",
      "romaji": "ronri",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "邏輯",
      "sentences": [
        {
          "ja": "論理的に考えて判断する。",
          "furigana": "ろんりてきにかんがえてはんだんする。",
          "en": "依照邏輯思考並判斷。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_11_" + Date.now(),
      "word": "軌道",
      "furigana": "きどう",
      "romaji": "kidou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "軌道 / 軌跡",
      "sentences": [
        {
          "ja": "事業がようやく軌道に乗った。",
          "furigana": "じぎょうがようやくきどうにのった。",
          "en": "事業終於步上軌道了。"
        }
      ]
    },
    {
      "id": "v_n1_auto_12_" + Date.now(),
      "word": "模索",
      "furigana": "もさく",
      "romaji": "mosaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "摸索 / 探索",
      "sentences": [
        {
          "ja": "新しい解決策を模索している。",
          "furigana": "あたらしいかいけつさくをもさくしている。",
          "en": "正在摸索新的解決方案。"
        }
      ]
    },
    {
      "id": "v_n1_auto_13_" + Date.now(),
      "word": "著しい",
      "furigana": "いちじるしい",
      "romaji": "ichijirushii",
      "type": "i-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "顯著的",
      "sentences": [
        {
          "ja": "科学技術の著しい進歩が見られる。",
          "furigana": "かがくぎじゅつのいちじるしいしんぽがみられる。",
          "en": "能看見科學技術的顯著進步。"
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
