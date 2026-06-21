const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_70_" + Date.now(),
      "word": "右",
      "furigana": "みぎ",
      "romaji": "migi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "右邊",
      "sentences": [
        {
          "ja": "次の角を右に曲がります。",
          "furigana": "つぎのかどをみぎにまがります。",
          "en": "下個轉角向右轉。"
        }
      ]
    },
    {
      "id": "v_n5_auto_71_" + Date.now(),
      "word": "左",
      "furigana": "ひだり",
      "romaji": "hidari",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "左邊",
      "sentences": [
        {
          "ja": "左手にペンを持ちます。",
          "furigana": "ひだりてにぺんをもちます。",
          "en": "左手拿著筆。"
        }
      ]
    },
    {
      "id": "v_n5_auto_72_" + Date.now(),
      "word": "前",
      "furigana": "まえ",
      "romaji": "mae",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "前面 / 以前",
      "sentences": [
        {
          "ja": "駅の前にいます。",
          "furigana": "えきのまえにいます。",
          "en": "在車站前面。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_70_" + Date.now(),
      "word": "会議室",
      "furigana": "かいぎしつ",
      "romaji": "kaigishitsu",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "會議室",
      "sentences": [
        {
          "ja": "会議室に集まってください。",
          "furigana": "かいぎしつにあつまってください。",
          "en": "請在會議室集合。"
        }
      ]
    },
    {
      "id": "v_n4_auto_71_" + Date.now(),
      "word": "事務所",
      "furigana": "じむしょ",
      "romaji": "jimusho",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "辦公室 / 事務所",
      "sentences": [
        {
          "ja": "事務所で書類を作ります。",
          "furigana": "じむしょでしょるいをつくります。",
          "en": "在辦公室製作文件。"
        }
      ]
    },
    {
      "id": "v_n4_auto_72_" + Date.now(),
      "word": "図書室",
      "furigana": "としょしつ",
      "romaji": "toshoshitsu",
      "type": "noun",
      "category": "living_housing",
      "level": "N4",
      "meaning": "圖書室",
      "sentences": [
        {
          "ja": "放課後は図書室で勉強します。",
          "furigana": "ほうかごはとしょしつでべんきょうします。",
          "en": "放學後在圖書室學習。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_70_" + Date.now(),
      "word": "行動",
      "furigana": "こうどう",
      "romaji": "koudou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "行動",
      "sentences": [
        {
          "ja": "考えてから行動する。",
          "furigana": "かんがえてからこうどうする。",
          "en": "思考過後再行動。"
        }
      ]
    },
    {
      "id": "v_n3_auto_71_" + Date.now(),
      "word": "活動",
      "furigana": "かつどう",
      "romaji": "katsudou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "活動",
      "sentences": [
        {
          "ja": "部活動に熱中している。",
          "furigana": "ぶかつどうにねっちゅうしている。",
          "en": "熱衷於社團活動。"
        }
      ]
    },
    {
      "id": "v_n3_auto_72_" + Date.now(),
      "word": "行事",
      "furigana": "ぎょうじ",
      "romaji": "gyouji",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "活動 / 儀式",
      "sentences": [
        {
          "ja": "学校の行事に参加する。",
          "furigana": "がっこうのぎょうじにさんかする。",
          "en": "參加學校的活動。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_69_" + Date.now(),
      "word": "判断",
      "furigana": "はんだん",
      "romaji": "handan",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "判斷",
      "sentences": [
        {
          "ja": "状況を見て自分で判断する。",
          "furigana": "じょうきょうをみてじぶんではんだんする。",
          "en": "看狀況自行判斷。"
        }
      ]
    },
    {
      "id": "v_n2_auto_70_" + Date.now(),
      "word": "決断",
      "furigana": "けつだん",
      "romaji": "ketsudan",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "決斷 / 決定",
      "sentences": [
        {
          "ja": "大きな決断を迫られる。",
          "furigana": "おおきなけつだんをせまられる。",
          "en": "被迫做出重大的決定。"
        }
      ]
    },
    {
      "id": "v_n2_auto_71_" + Date.now(),
      "word": "決心",
      "furigana": "けっしん",
      "romaji": "kesshin",
      "type": "noun",
      "category": "psychology_character",
      "level": "N2",
      "meaning": "決心",
      "sentences": [
        {
          "ja": "留学する決心を固めた。",
          "furigana": "りゅうがくするけっしんをかためた。",
          "en": "堅定了留學的決心。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_68_" + Date.now(),
      "word": "規制",
      "furigana": "きせい",
      "romaji": "kisei",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "管制 / 限制",
      "sentences": [
        {
          "ja": "交通規制が敷かれている。",
          "furigana": "こうつうきせいがしかれている。",
          "en": "正在實施交通管制。"
        }
      ]
    },
    {
      "id": "v_n1_auto_69_" + Date.now(),
      "word": "統制",
      "furigana": "とうせい",
      "romaji": "tousei",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "統制 / 控制",
      "sentences": [
        {
          "ja": "経済の統制を強化する。",
          "furigana": "けいざいのとうせいをきょうかする。",
          "en": "強化經濟的控制。"
        }
      ]
    },
    {
      "id": "v_n1_auto_70_" + Date.now(),
      "word": "介入",
      "furigana": "かいにゅう",
      "romaji": "kainyuu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "介入",
      "sentences": [
        {
          "ja": "他国の内政に介入する。",
          "furigana": "たこくのないせいにかいにゅうする。",
          "en": "介入他國的內政。"
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
