const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_4_" + Date.now(),
      "word": "学校",
      "furigana": "がっこう",
      "romaji": "gakkou",
      "type": "noun",
      "category": "education_learning",
      "level": "N5",
      "meaning": "學校",
      "sentences": [
        {
          "ja": "毎日バスで学校へ行きます。",
          "furigana": "まいにちばすでがっこうへいきます。",
          "en": "每天搭公車去學校。"
        }
      ]
    },
    {
      "id": "v_n5_auto_5_" + Date.now(),
      "word": "先生",
      "furigana": "せんせい",
      "romaji": "sensei",
      "type": "noun",
      "category": "relations_human",
      "level": "N5",
      "meaning": "老師",
      "sentences": [
        {
          "ja": "日本語の先生はとても優しいです。",
          "furigana": "にほんごのせんせいはとてもやさしいです。",
          "en": "日語老師非常溫柔。"
        }
      ]
    },
    {
      "id": "v_n5_auto_6_" + Date.now(),
      "word": "学生",
      "furigana": "がくせい",
      "romaji": "gakusei",
      "type": "noun",
      "category": "relations_human",
      "level": "N5",
      "meaning": "學生",
      "sentences": [
        {
          "ja": "私は大学の学生です。",
          "furigana": "わたしはだいがくのがくせいです。",
          "en": "我是大學的學生。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_4_" + Date.now(),
      "word": "準備",
      "furigana": "じゅんび",
      "romaji": "junbi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "準備",
      "sentences": [
        {
          "ja": "旅行の準備はもう終わりましたか。",
          "furigana": "りょこうのじゅんびはもうおわりましたか。",
          "en": "旅行的準備已經完成了嗎？"
        }
      ]
    },
    {
      "id": "v_n4_auto_5_" + Date.now(),
      "word": "連絡",
      "furigana": "れんらく",
      "romaji": "renraku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "聯絡",
      "sentences": [
        {
          "ja": "後で必ず連絡してください。",
          "furigana": "あとでかならずれんらくしてください。",
          "en": "稍後請務必跟我聯絡。"
        }
      ]
    },
    {
      "id": "v_n4_auto_6_" + Date.now(),
      "word": "相談",
      "furigana": "そうだん",
      "romaji": "soudan",
      "type": "noun",
      "category": "relations_human",
      "level": "N4",
      "meaning": "商量 / 討論",
      "sentences": [
        {
          "ja": "先生に進学の相談をしました。",
          "furigana": "せんせいにしんがくのそうだんをしました。",
          "en": "跟老師商量了升學的事情。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_4_" + Date.now(),
      "word": "感謝",
      "furigana": "かんしゃ",
      "romaji": "kansha",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "感謝",
      "sentences": [
        {
          "ja": "皆様の協力に深く感謝いたします。",
          "furigana": "みなさまのきょうりょくにふかくかんしゃいたします。",
          "en": "深深感謝各位的協助。"
        }
      ]
    },
    {
      "id": "v_n3_auto_5_" + Date.now(),
      "word": "努力",
      "furigana": "どりょく",
      "romaji": "doryoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "努力",
      "sentences": [
        {
          "ja": "夢を叶えるためには努力が必要です。",
          "furigana": "ゆめをかなえるためにはどりょくがひつようです。",
          "en": "為了實現夢想，努力是必須的。"
        }
      ]
    },
    {
      "id": "v_n3_auto_6_" + Date.now(),
      "word": "成功",
      "furigana": "せいこう",
      "romaji": "seikou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "成功",
      "sentences": [
        {
          "ja": "新しいプロジェクトは大成功でした。",
          "furigana": "あたらしいぷろじぇくとはだいせいこうでした。",
          "en": "新專案取得了大成功。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_3_" + Date.now(),
      "word": "評価",
      "furigana": "ひょうか",
      "romaji": "hyouka",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "評價 / 評估",
      "sentences": [
        {
          "ja": "彼の仕事ぶりは高く評価されている。",
          "furigana": "かれのしごとぶりはたかくひょうかされている。",
          "en": "他的工作表現獲得了很高的評價。"
        }
      ]
    },
    {
      "id": "v_n2_auto_4_" + Date.now(),
      "word": "期待",
      "furigana": "きたい",
      "romaji": "kitai",
      "type": "noun",
      "category": "psychology_character",
      "level": "N2",
      "meaning": "期待",
      "sentences": [
        {
          "ja": "親の期待に応えられるように頑張ります。",
          "furigana": "おやのきたいにこたえられるようにがんばります。",
          "en": "我會努力以不辜負父母的期待。"
        }
      ]
    },
    {
      "id": "v_n2_auto_5_" + Date.now(),
      "word": "比較",
      "furigana": "ひかく",
      "romaji": "hikaku",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "比較",
      "sentences": [
        {
          "ja": "二つの製品を比較して、安い方を買った。",
          "furigana": "ふたつのせいひんをひかくして、やすいほうをかった。",
          "en": "比較了兩個產品後，買了比較便宜的那一個。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_2_" + Date.now(),
      "word": "把握",
      "furigana": "はあく",
      "romaji": "haaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "掌握 / 理解",
      "sentences": [
        {
          "ja": "現状を正確に把握することが重要だ。",
          "furigana": "げんじょうをせいかくにはあくすることがじゅうようだ。",
          "en": "準確掌握現狀是很重要的。"
        }
      ]
    },
    {
      "id": "v_n1_auto_3_" + Date.now(),
      "word": "貢献",
      "furigana": "こうけん",
      "romaji": "kouken",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "貢獻",
      "sentences": [
        {
          "ja": "彼は科学の発展に大きく貢献した。",
          "furigana": "かれはかがくのはってんにおおきくこうけんした。",
          "en": "他對科學的發展做出了巨大的貢獻。"
        }
      ]
    },
    {
      "id": "v_n1_auto_4_" + Date.now(),
      "word": "柔軟",
      "furigana": "じゅうなん",
      "romaji": "juunan",
      "type": "na-adjective",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "靈活 / 柔軟",
      "sentences": [
        {
          "ja": "変化に対して柔軟な対応が求められる。",
          "furigana": "へんかにたいしてじゅうなんなたいおうがもとめられる。",
          "en": "面對變化，需要能夠靈活應對。"
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
