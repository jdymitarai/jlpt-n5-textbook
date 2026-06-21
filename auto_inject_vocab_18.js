const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_52_" + Date.now(),
      "word": "首",
      "furigana": "くび",
      "romaji": "kubi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "脖子",
      "sentences": [
        {
          "ja": "寒くて首が痛いです。",
          "furigana": "さむくてくびがいたいです。",
          "en": "因為寒冷脖子很痛。"
        }
      ]
    },
    {
      "id": "v_n5_auto_53_" + Date.now(),
      "word": "指",
      "furigana": "ゆび",
      "romaji": "yubi",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "手指",
      "sentences": [
        {
          "ja": "料理中に指を切りました。",
          "furigana": "りょうりちゅうにゆびをきりました。",
          "en": "煮菜時切到了手指。"
        }
      ]
    },
    {
      "id": "v_n5_auto_54_" + Date.now(),
      "word": "お腹",
      "furigana": "おなか",
      "romaji": "onaka",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "肚子",
      "sentences": [
        {
          "ja": "お腹が空きました。",
          "furigana": "おなかがすきました。",
          "en": "肚子餓了。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_52_" + Date.now(),
      "word": "会議",
      "furigana": "かいぎ",
      "romaji": "kaigi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "會議",
      "sentences": [
        {
          "ja": "午後から会議があります。",
          "furigana": "ごごからかいぎがあります。",
          "en": "下午開始有會議。"
        }
      ]
    },
    {
      "id": "v_n4_auto_53_" + Date.now(),
      "word": "講義",
      "furigana": "こうぎ",
      "romaji": "kougi",
      "type": "noun",
      "category": "education_learning",
      "level": "N4",
      "meaning": "講義 / 課程",
      "sentences": [
        {
          "ja": "大学の講義に出席する。",
          "furigana": "だいがくのこうぎにしゅっせきする。",
          "en": "出席大學的課程。"
        }
      ]
    },
    {
      "id": "v_n4_auto_54_" + Date.now(),
      "word": "授業",
      "furigana": "じゅぎょう",
      "romaji": "jugyou",
      "type": "noun",
      "category": "education_learning",
      "level": "N4",
      "meaning": "上課 / 課堂",
      "sentences": [
        {
          "ja": "日本語の授業を受けます。",
          "furigana": "にほんごのじゅぎょうをうけます。",
          "en": "上日語課。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_52_" + Date.now(),
      "word": "解決",
      "furigana": "かいけつ",
      "romaji": "kaiketsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "解決",
      "sentences": [
        {
          "ja": "問題が無事に解決した。",
          "furigana": "もんだいぶじにかいけつした。",
          "en": "問題平安地解決了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_53_" + Date.now(),
      "word": "理解",
      "furigana": "りかい",
      "romaji": "rikai",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "理解",
      "sentences": [
        {
          "ja": "相手の気持ちを理解する。",
          "furigana": "あいてのきもちをりかいする。",
          "en": "理解對方的心情。"
        }
      ]
    },
    {
      "id": "v_n3_auto_54_" + Date.now(),
      "word": "意識",
      "furigana": "いしき",
      "romaji": "ishiki",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "意識",
      "sentences": [
        {
          "ja": "健康への意識が高まっている。",
          "furigana": "けんこうへのいしきがたかまっている。",
          "en": "對健康的意識正在提高。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_51_" + Date.now(),
      "word": "構成",
      "furigana": "こうせい",
      "romaji": "kousei",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "構成",
      "sentences": [
        {
          "ja": "委員会は５人で構成されている。",
          "furigana": "いいんかいはごにんでこうせいされている。",
          "en": "委員會是由５人構成的。"
        }
      ]
    },
    {
      "id": "v_n2_auto_52_" + Date.now(),
      "word": "構造",
      "furigana": "こうぞう",
      "romaji": "kouzou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "構造",
      "sentences": [
        {
          "ja": "建物の構造を調べる。",
          "furigana": "たてもののこうぞうをしらべる。",
          "en": "調查建築物的構造。"
        }
      ]
    },
    {
      "id": "v_n2_auto_53_" + Date.now(),
      "word": "組織",
      "furigana": "そしき",
      "romaji": "soshiki",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "組織",
      "sentences": [
        {
          "ja": "新しい組織を立ち上げる。",
          "furigana": "あたらしいそしきをたちあげる。",
          "en": "建立新的組織。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_50_" + Date.now(),
      "word": "抑制",
      "furigana": "よくせい",
      "romaji": "yokusei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "抑制",
      "sentences": [
        {
          "ja": "インフレを抑制するための政策。",
          "furigana": "いんふれをよくせいするためのせいさく。",
          "en": "為了抑制通貨膨脹的政策。"
        }
      ]
    },
    {
      "id": "v_n1_auto_51_" + Date.now(),
      "word": "撤退",
      "furigana": "てったい",
      "romaji": "tettai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "撤退",
      "sentences": [
        {
          "ja": "海外市場からの撤退を決めた。",
          "furigana": "かいがいしじょうからのてったいをきめた。",
          "en": "決定從海外市場撤退。"
        }
      ]
    },
    {
      "id": "v_n1_auto_52_" + Date.now(),
      "word": "誇張",
      "furigana": "こちょう",
      "romaji": "kochou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "誇張",
      "sentences": [
        {
          "ja": "彼の話は少し誇張されている。",
          "furigana": "かれのはなしはすこしこちょうされている。",
          "en": "他說的話有點被誇張了。"
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
