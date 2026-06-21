const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_22_" + Date.now(),
      "word": "写真",
      "furigana": "しゃしん",
      "romaji": "shashin",
      "type": "noun",
      "category": "activities_actions",
      "level": "N5",
      "meaning": "照片",
      "sentences": [
        {
          "ja": "海でたくさんの写真を撮りました。",
          "furigana": "うみでたくさんのしゃしんをとりました。",
          "en": "在海邊拍了很多照片。"
        }
      ]
    },
    {
      "id": "v_n5_auto_23_" + Date.now(),
      "word": "眼鏡",
      "furigana": "めがね",
      "romaji": "megane",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "眼鏡",
      "sentences": [
        {
          "ja": "本を読む時は眼鏡をかけます。",
          "furigana": "ほんをよむときはめがねをかけます。",
          "en": "看書的時候會戴眼鏡。"
        }
      ]
    },
    {
      "id": "v_n5_auto_24_" + Date.now(),
      "word": "財布",
      "furigana": "さいふ",
      "romaji": "saifu",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "錢包",
      "sentences": [
        {
          "ja": "デパートで財布を落としました。",
          "furigana": "でぱーとでさいふをおとしました。",
          "en": "在百貨公司弄丟了錢包。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_22_" + Date.now(),
      "word": "事故",
      "furigana": "じこ",
      "romaji": "jiko",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "事故 / 車禍",
      "sentences": [
        {
          "ja": "交差点で交通事故がありました。",
          "furigana": "こうさてんでこうつうじこがありました。",
          "en": "在十字路口發生了交通事故。"
        }
      ]
    },
    {
      "id": "v_n4_auto_23_" + Date.now(),
      "word": "警察",
      "furigana": "けいさつ",
      "romaji": "keisatsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "警察",
      "sentences": [
        {
          "ja": "道に迷って警察に道を聞きました。",
          "furigana": "みちにまよってけいさつにみちをききました。",
          "en": "迷路了所以向警察問路。"
        }
      ]
    },
    {
      "id": "v_n4_auto_24_" + Date.now(),
      "word": "泥棒",
      "furigana": "どろぼう",
      "romaji": "dorobou",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N4",
      "meaning": "小偷",
      "sentences": [
        {
          "ja": "留守中に泥棒に入られました。",
          "furigana": "るすちゅうにどろぼうにはいられました。",
          "en": "不在家時遭小偷潛入了。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_22_" + Date.now(),
      "word": "態度",
      "furigana": "たいど",
      "romaji": "taido",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "態度",
      "sentences": [
        {
          "ja": "彼の態度はとても失礼だ。",
          "furigana": "かれのたいどはとてもしつれいだ。",
          "en": "他的態度非常沒禮貌。"
        }
      ]
    },
    {
      "id": "v_n3_auto_23_" + Date.now(),
      "word": "価値",
      "furigana": "かち",
      "romaji": "kachi",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "價值",
      "sentences": [
        {
          "ja": "この絵には高い価値があります。",
          "furigana": "このえにはたかいかちがあります。",
          "en": "這幅畫具有很高的價值。"
        }
      ]
    },
    {
      "id": "v_n3_auto_24_" + Date.now(),
      "word": "役割",
      "furigana": "やくわり",
      "romaji": "yakuwari",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N3",
      "meaning": "職責 / 角色",
      "sentences": [
        {
          "ja": "リーダーの役割を果たす。",
          "furigana": "りーだーのやくわりをはたす。",
          "en": "盡到身為領導者的職責。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_21_" + Date.now(),
      "word": "批判",
      "furigana": "ひはん",
      "romaji": "hihan",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "批判",
      "sentences": [
        {
          "ja": "政府の政策に対して批判が高まっている。",
          "furigana": "せいふのせいさくにたいしてひはんがたかまっている。",
          "en": "對政府政策的批判聲浪日益高漲。"
        }
      ]
    },
    {
      "id": "v_n2_auto_22_" + Date.now(),
      "word": "議論",
      "furigana": "ぎろん",
      "romaji": "giron",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "議論 / 討論",
      "sentences": [
        {
          "ja": "その問題について徹底的に議論する。",
          "furigana": "そのもんだいについててっていてきにぎろんする。",
          "en": "針對那個問題進行了徹底的討論。"
        }
      ]
    },
    {
      "id": "v_n2_auto_23_" + Date.now(),
      "word": "結論",
      "furigana": "けつろん",
      "romaji": "ketsuron",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "結論",
      "sentences": [
        {
          "ja": "議論の結果、一つの結論に達した。",
          "furigana": "ぎろんのけっか、ひとつのけつろんにたっした。",
          "en": "討論的結果，達成了一個結論。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_20_" + Date.now(),
      "word": "画期的",
      "furigana": "かっきてき",
      "romaji": "kakkiteki",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "劃時代的",
      "sentences": [
        {
          "ja": "画期的な発明が世界を変えた。",
          "furigana": "かっきてきなはつめいがせかいをかえた。",
          "en": "劃時代的發明改變了世界。"
        }
      ]
    },
    {
      "id": "v_n1_auto_21_" + Date.now(),
      "word": "必然",
      "furigana": "ひつぜん",
      "romaji": "hitsuzen",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "必然",
      "sentences": [
        {
          "ja": "この結果は偶然ではなく必然だ。",
          "furigana": "このけっかはぐうぜんではなくひつぜんだ。",
          "en": "這個結果不是偶然而是必然。"
        }
      ]
    },
    {
      "id": "v_n1_auto_22_" + Date.now(),
      "word": "顕著",
      "furigana": "けんちょ",
      "romaji": "kencho",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "顯著",
      "sentences": [
        {
          "ja": "両者の間には顕著な違いがある。",
          "furigana": "りょうしゃのあいだにはけんちょなちがいがある。",
          "en": "兩者之間有著顯著的差異。"
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
