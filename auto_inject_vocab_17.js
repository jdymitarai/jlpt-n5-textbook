const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_49_" + Date.now(),
      "word": "髪",
      "furigana": "かみ",
      "romaji": "kami",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "頭髮",
      "sentences": [
        {
          "ja": "彼女は髪が長いです。",
          "furigana": "かのじょはかみがながいです。",
          "en": "她的頭髮很長。"
        }
      ]
    },
    {
      "id": "v_n5_auto_50_" + Date.now(),
      "word": "顔",
      "furigana": "かお",
      "romaji": "kao",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "臉",
      "sentences": [
        {
          "ja": "朝起きて顔を洗います。",
          "furigana": "あさおきてかおをあらいます。",
          "en": "早上起床洗臉。"
        }
      ]
    },
    {
      "id": "v_n5_auto_51_" + Date.now(),
      "word": "背中",
      "furigana": "せなか",
      "romaji": "senaka",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "背部",
      "sentences": [
        {
          "ja": "背中が少し痛いです。",
          "furigana": "せなかがすこしいたいです。",
          "en": "背有點痛。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_49_" + Date.now(),
      "word": "注意",
      "furigana": "ちゅうい",
      "romaji": "chuui",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "注意 / 小心",
      "sentences": [
        {
          "ja": "車に注意してください。",
          "furigana": "くるまにちゅういしてください。",
          "en": "請小心車子。"
        }
      ]
    },
    {
      "id": "v_n4_auto_50_" + Date.now(),
      "word": "故障",
      "furigana": "こしょう",
      "romaji": "koshou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "故障",
      "sentences": [
        {
          "ja": "パソコンが故障しました。",
          "furigana": "ぱそこんがこしょうしました。",
          "en": "電腦故障了。"
        }
      ]
    },
    {
      "id": "v_n4_auto_51_" + Date.now(),
      "word": "修理",
      "furigana": "しゅうり",
      "romaji": "shuuri",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "修理",
      "sentences": [
        {
          "ja": "自転車を修理に出しました。",
          "furigana": "じてんしゃをしゅうりにだしました。",
          "en": "把腳踏車送去修理了。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_49_" + Date.now(),
      "word": "記録",
      "furigana": "きろく",
      "romaji": "kiroku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "記錄",
      "sentences": [
        {
          "ja": "会議の内容を記録する。",
          "furigana": "かいぎのないようをきろくする。",
          "en": "記錄會議的內容。"
        }
      ]
    },
    {
      "id": "v_n3_auto_50_" + Date.now(),
      "word": "報告",
      "furigana": "ほうこく",
      "romaji": "houkoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "報告",
      "sentences": [
        {
          "ja": "上司に結果を報告した。",
          "furigana": "じょうしにけっかをほうこくした。",
          "en": "向上司報告了結果。"
        }
      ]
    },
    {
      "id": "v_n3_auto_51_" + Date.now(),
      "word": "提案",
      "furigana": "ていあん",
      "romaji": "teian",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "提案",
      "sentences": [
        {
          "ja": "新しい計画を提案する。",
          "furigana": "あたらしいけいかくをていあんする。",
          "en": "提出新的計畫。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_48_" + Date.now(),
      "word": "条件",
      "furigana": "じょうけん",
      "romaji": "jouken",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "條件",
      "sentences": [
        {
          "ja": "契約の条件を確認する。",
          "furigana": "けいやくのじょうけんをかくにんする。",
          "en": "確認合約的條件。"
        }
      ]
    },
    {
      "id": "v_n2_auto_49_" + Date.now(),
      "word": "範囲",
      "furigana": "はんい",
      "romaji": "hani",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "範圍",
      "sentences": [
        {
          "ja": "試験の範囲が広すぎる。",
          "furigana": "しけんのはんいがひろすぎる。",
          "en": "考試的範圍太廣了。"
        }
      ]
    },
    {
      "id": "v_n2_auto_50_" + Date.now(),
      "word": "順序",
      "furigana": "じゅんじょ",
      "romaji": "junjo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "順序",
      "sentences": [
        {
          "ja": "正しい順序で組み立てる。",
          "furigana": "ただしいじゅんじょでくみたてる。",
          "en": "按照正確的順序組裝。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_47_" + Date.now(),
      "word": "考慮",
      "furigana": "こうりょ",
      "romaji": "kouryo",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "考慮",
      "sentences": [
        {
          "ja": "相手の立場を考慮して発言する。",
          "furigana": "あいてのたちばをこうりょしてはつげんする。",
          "en": "考慮到對方的立場而發言。"
        }
      ]
    },
    {
      "id": "v_n1_auto_48_" + Date.now(),
      "word": "匹敵",
      "furigana": "ひってき",
      "romaji": "hitteki",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "匹敵 / 相當於",
      "sentences": [
        {
          "ja": "彼の能力はプロに匹敵する。",
          "furigana": "かれののうりょくはぷろにひってきする。",
          "en": "他的能力可以媲美職業選手。"
        }
      ]
    },
    {
      "id": "v_n1_auto_49_" + Date.now(),
      "word": "該当",
      "furigana": "がいとう",
      "romaji": "gaitou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "符合 / 該當",
      "sentences": [
        {
          "ja": "その条件に該当する人は少ない。",
          "furigana": "そのじょうけんにがいとうするひとはすくない。",
          "en": "符合那個條件的人很少。"
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
