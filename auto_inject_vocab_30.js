const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_88_" + Date.now(),
      "word": "切手",
      "furigana": "きって",
      "romaji": "kitte",
      "type": "noun",
      "category": "lifestyle_items",
      "level": "N5",
      "meaning": "郵票",
      "sentences": [
        {
          "ja": "切手を貼ってください。",
          "furigana": "きってをはってください。",
          "en": "請貼上郵票。"
        }
      ]
    },
    {
      "id": "v_n5_auto_89_" + Date.now(),
      "word": "手紙",
      "furigana": "てがみ",
      "romaji": "tegami",
      "type": "noun",
      "category": "lifestyle_items",
      "level": "N5",
      "meaning": "信 / 書信",
      "sentences": [
        {
          "ja": "友達に手紙を書きます。",
          "furigana": "ともだちにてがみをかきます。",
          "en": "寫信給朋友。"
        }
      ]
    },
    {
      "id": "v_n5_auto_90_" + Date.now(),
      "word": "封筒",
      "furigana": "ふうとう",
      "romaji": "fuutou",
      "type": "noun",
      "category": "lifestyle_items",
      "level": "N5",
      "meaning": "信封",
      "sentences": [
        {
          "ja": "手紙を封筒に入れます。",
          "furigana": "てがみをふうとうにいれます。",
          "en": "把信放進信封裡。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_88_" + Date.now(),
      "word": "準備",
      "furigana": "じゅんび",
      "romaji": "junbi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "準備",
      "sentences": [
        {
          "ja": "旅行の準備をします。",
          "furigana": "りょこうのじゅんびをします。",
          "en": "準備旅行。"
        }
      ]
    },
    {
      "id": "v_n4_auto_89_" + Date.now(),
      "word": "予習",
      "furigana": "よしゅう",
      "romaji": "yoshuu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "預習",
      "sentences": [
        {
          "ja": "授業の前に予習をします。",
          "furigana": "じゅぎょうのまえによしゅうをします。",
          "en": "上課前先預習。"
        }
      ]
    },
    {
      "id": "v_n4_auto_90_" + Date.now(),
      "word": "復習",
      "furigana": "ふくしゅう",
      "romaji": "fukushuu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "複習",
      "sentences": [
        {
          "ja": "毎日漢字の復習をします。",
          "furigana": "まいにちかんじのふくしゅうをします。",
          "en": "每天複習漢字。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_88_" + Date.now(),
      "word": "利益",
      "furigana": "りえき",
      "romaji": "rieki",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "利益 / 利潤",
      "sentences": [
        {
          "ja": "会社の利益が上がった。",
          "furigana": "かいしゃのりえきがあがった。",
          "en": "公司的利潤增加了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_89_" + Date.now(),
      "word": "損害",
      "furigana": "そんがい",
      "romaji": "songai",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "損害",
      "sentences": [
        {
          "ja": "台風で大きな損害が出た。",
          "furigana": "たいふうでおおきなそんがいがでた。",
          "en": "因為颱風造成了巨大的損害。"
        }
      ]
    },
    {
      "id": "v_n3_auto_90_" + Date.now(),
      "word": "競争",
      "furigana": "きょうそう",
      "romaji": "kyousou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "競爭",
      "sentences": [
        {
          "ja": "激しい競争を勝ち抜く。",
          "furigana": "はげしいきょうそうをかちぬく。",
          "en": "在激烈的競爭中勝出。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_87_" + Date.now(),
      "word": "矛盾",
      "furigana": "むじゅん",
      "romaji": "mujun",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "矛盾",
      "sentences": [
        {
          "ja": "彼の話には矛盾がある。",
          "furigana": "かれのはなしにはむじゅんがある。",
          "en": "他的話裡有矛盾。"
        }
      ]
    },
    {
      "id": "v_n2_auto_88_" + Date.now(),
      "word": "典型",
      "furigana": "てんけい",
      "romaji": "tenkei",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "典型",
      "sentences": [
        {
          "ja": "これは典型的な日本の家だ。",
          "furigana": "これはてんけいてきなにほんのいえだ。",
          "en": "這是典型的日本房屋。"
        }
      ]
    },
    {
      "id": "v_n2_auto_89_" + Date.now(),
      "word": "本質",
      "furigana": "ほんしつ",
      "romaji": "honshitsu",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "本質",
      "sentences": [
        {
          "ja": "問題の本質を見極める。",
          "furigana": "もんだいのほんしつをみきわめる。",
          "en": "看清問題的本質。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_86_" + Date.now(),
      "word": "変遷",
      "furigana": "へんせん",
      "romaji": "hensen",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "變遷",
      "sentences": [
        {
          "ja": "時代の変遷をたどる。",
          "furigana": "じだいのへんせんをたどる。",
          "en": "追溯時代的變遷。"
        }
      ]
    },
    {
      "id": "v_n1_auto_87_" + Date.now(),
      "word": "推移",
      "furigana": "すいい",
      "romaji": "suii",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "推移 / 演變",
      "sentences": [
        {
          "ja": "人口の推移を調査する。",
          "furigana": "じんこうのすいいをちょうさする。",
          "en": "調查人口的演變。"
        }
      ]
    },
    {
      "id": "v_n1_auto_88_" + Date.now(),
      "word": "軌跡",
      "furigana": "きせき",
      "romaji": "kiseki",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "軌跡 / 歷程",
      "sentences": [
        {
          "ja": "彼の人生の軌跡を振り返る。",
          "furigana": "かれのじんせいのきせきをふりかえる。",
          "en": "回顧他的人生的軌跡。"
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
