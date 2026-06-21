const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_7_" + Date.now(),
      "word": "家族",
      "furigana": "かぞく",
      "romaji": "kazoku",
      "type": "noun",
      "category": "relations_human",
      "level": "N5",
      "meaning": "家人 / 家族",
      "sentences": [
        {
          "ja": "私の家族は四人です。",
          "furigana": "わたしかぞくはよにんです。",
          "en": "我的家人有四個人。"
        }
      ]
    },
    {
      "id": "v_n5_auto_8_" + Date.now(),
      "word": "友達",
      "furigana": "ともだち",
      "romaji": "tomodachi",
      "type": "noun",
      "category": "relations_human",
      "level": "N5",
      "meaning": "朋友",
      "sentences": [
        {
          "ja": "週末は友達と遊びます。",
          "furigana": "しゅうまつはともだちとあそびます。",
          "en": "週末會和朋友一起玩。"
        }
      ]
    },
    {
      "id": "v_n5_auto_9_" + Date.now(),
      "word": "仕事",
      "furigana": "しごと",
      "romaji": "shigoto",
      "type": "noun",
      "category": "activities_actions",
      "level": "N5",
      "meaning": "工作",
      "sentences": [
        {
          "ja": "今日の仕事は忙しかったです。",
          "furigana": "きょうのしごとはいそがしかったです。",
          "en": "今天的工作很忙。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_7_" + Date.now(),
      "word": "会議",
      "furigana": "かいぎ",
      "romaji": "kaigi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "會議",
      "sentences": [
        {
          "ja": "午後の会議は三時からです。",
          "furigana": "ごごのかいぎはさんじからです。",
          "en": "下午的會議從三點開始。"
        }
      ]
    },
    {
      "id": "v_n4_auto_8_" + Date.now(),
      "word": "理由",
      "furigana": "りゆう",
      "romaji": "riyuu",
      "type": "noun",
      "category": "properties_relations",
      "level": "N4",
      "meaning": "理由",
      "sentences": [
        {
          "ja": "遅れた理由を説明してください。",
          "furigana": "おくれたりゆうをせつめいしてください。",
          "en": "請說明遲到的理由。"
        }
      ]
    },
    {
      "id": "v_n4_auto_9_" + Date.now(),
      "word": "意見",
      "furigana": "いけん",
      "romaji": "iken",
      "type": "noun",
      "category": "culture_thought",
      "level": "N4",
      "meaning": "意見",
      "sentences": [
        {
          "ja": "自分の意見をはっきり言うべきだ。",
          "furigana": "じぶんのいけんをはっきりいうべきだ。",
          "en": "應該清楚表達自己的意見。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_7_" + Date.now(),
      "word": "知識",
      "furigana": "ちしき",
      "romaji": "chishiki",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "知識",
      "sentences": [
        {
          "ja": "本を読んで新しい知識を得る。",
          "furigana": "ほんをよんであたらしいちしきをえる。",
          "en": "透過閱讀書籍獲取新知識。"
        }
      ]
    },
    {
      "id": "v_n3_auto_8_" + Date.now(),
      "word": "表現",
      "furigana": "ひょうげん",
      "romaji": "hyougen",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "表現 / 表達",
      "sentences": [
        {
          "ja": "日本語の豊かな表現を学ぶ。",
          "furigana": "にほんごのゆたかなひょうげんをまなぶ。",
          "en": "學習日語豐富的表達方式。"
        }
      ]
    },
    {
      "id": "v_n3_auto_9_" + Date.now(),
      "word": "解決",
      "furigana": "かいけつ",
      "romaji": "kaiketsu",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "解決",
      "sentences": [
        {
          "ja": "皆で話し合って問題を解決した。",
          "furigana": "みんなではなしあってもんだいをかいけつした。",
          "en": "大家一起討論解決了問題。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_6_" + Date.now(),
      "word": "利益",
      "furigana": "りえき",
      "romaji": "rieki",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "利益 / 利潤",
      "sentences": [
        {
          "ja": "会社の利益を優先して考える。",
          "furigana": "かいしゃのりえきをゆうせんしてかんがえる。",
          "en": "優先考慮公司的利益。"
        }
      ]
    },
    {
      "id": "v_n2_auto_7_" + Date.now(),
      "word": "損失",
      "furigana": "そんしつ",
      "romaji": "sonshitsu",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "損失",
      "sentences": [
        {
          "ja": "今回の事故で大きな損失を出した。",
          "furigana": "こんかいのじこでおおきなそんしつをだした。",
          "en": "因為這次的事故造成了巨大的損失。"
        }
      ]
    },
    {
      "id": "v_n2_auto_8_" + Date.now(),
      "word": "投資",
      "furigana": "とうし",
      "romaji": "toushi",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "投資",
      "sentences": [
        {
          "ja": "将来のために自己投資をする。",
          "furigana": "しょうらいのためにじことうしをする。",
          "en": "為了未來進行自我投資。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_5_" + Date.now(),
      "word": "懸念",
      "furigana": "けねん",
      "romaji": "kenen",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "懸念 / 擔憂",
      "sentences": [
        {
          "ja": "専門家は経済の悪化を懸念している。",
          "furigana": "せんもんかはけいざいのあっかをけねんしている。",
          "en": "專家擔憂經濟會惡化。"
        }
      ]
    },
    {
      "id": "v_n1_auto_6_" + Date.now(),
      "word": "妥協",
      "furigana": "だきょう",
      "romaji": "dakyou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "妥協",
      "sentences": [
        {
          "ja": "品質については一切妥協しない。",
          "furigana": "ひんしつについては一切妥協しない。",
          "en": "在品質方面絕不妥協。"
        }
      ]
    },
    {
      "id": "v_n1_auto_7_" + Date.now(),
      "word": "促進",
      "furigana": "そくしん",
      "romaji": "sokushin",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "促進",
      "sentences": [
        {
          "ja": "政府は再生可能エネルギーの利用を促進している。",
          "furigana": "せいふはさいせいかのうえねるぎーのりようをそくしんしている。",
          "en": "政府正在促進再生能源的利用。"
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
