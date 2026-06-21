const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_1_" + Date.now(),
      "word": "本",
      "furigana": "ほん",
      "romaji": "hon",
      "type": "noun",
      "category": "culture_thought",
      "level": "N5",
      "meaning": "書本",
      "sentences": [
        {
          "ja": "図書館で新しい本を借りました。",
          "furigana": "としょかんであたらしいほんをかりました。",
          "en": "在圖書館借了新書。"
        }
      ]
    },
    {
      "id": "v_n5_auto_2_" + Date.now(),
      "word": "新聞",
      "furigana": "しんぶん",
      "romaji": "shinbun",
      "type": "noun",
      "category": "culture_thought",
      "level": "N5",
      "meaning": "報紙",
      "sentences": [
        {
          "ja": "毎朝、お茶を飲みながら新聞を読みます。",
          "furigana": "まいあさ、おちゃをのみながらしんぶんをよみます。",
          "en": "每天早上都會一邊喝茶一邊看報紙。"
        }
      ]
    },
    {
      "id": "v_n5_auto_3_" + Date.now(),
      "word": "電話",
      "furigana": "でんわ",
      "romaji": "denwa",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N5",
      "meaning": "電話",
      "sentences": [
        {
          "ja": "昨日、友達と電話で話しました。",
          "furigana": "きのう、ともだちとでんわではなしました。",
          "en": "昨天和朋友講了電話。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_1_" + Date.now(),
      "word": "約束",
      "furigana": "やくそく",
      "romaji": "yakusoku",
      "type": "noun",
      "category": "relations_human",
      "level": "N4",
      "meaning": "約定",
      "sentences": [
        {
          "ja": "友達との約束を守るべきです。",
          "furigana": "ともだちとのやくそくをまもるべきです。",
          "en": "應該要遵守和朋友的約定。"
        }
      ]
    },
    {
      "id": "v_n4_auto_2_" + Date.now(),
      "word": "経験",
      "furigana": "けいけん",
      "romaji": "keiken",
      "type": "noun",
      "category": "psychology_character",
      "level": "N4",
      "meaning": "經驗",
      "sentences": [
        {
          "ja": "あの国での経験はとても貴重でした。",
          "furigana": "あのくにでのけいけんはとてもきちょうでした。",
          "en": "在那個國家的經驗非常珍貴。"
        }
      ]
    },
    {
      "id": "v_n4_auto_3_" + Date.now(),
      "word": "案内",
      "furigana": "あんない",
      "romaji": "annai",
      "type": "noun",
      "category": "relations_human",
      "level": "N4",
      "meaning": "引導 / 導覽",
      "sentences": [
        {
          "ja": "京都の町を案内してくれますか。",
          "furigana": "きょうとのまちをあんないしてくれますか。",
          "en": "可以幫我導覽京都的街道嗎？"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_1_" + Date.now(),
      "word": "環境",
      "furigana": "かんきょう",
      "romaji": "kankyou",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N3",
      "meaning": "環境",
      "sentences": [
        {
          "ja": "私たちは環境を守るために努力しなければなりません。",
          "furigana": "わたしたちはかんきょうをまもるためにどりょくしなければなりません。",
          "en": "我們必須為了保護環境而努力。"
        }
      ]
    },
    {
      "id": "v_n3_auto_2_" + Date.now(),
      "word": "影響",
      "furigana": "えいきょう",
      "romaji": "eikyou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "影響",
      "sentences": [
        {
          "ja": "親の行動は子供に大きな影響を与えます。",
          "furigana": "おやのこうどうはこどもにおおきなえいきょうをあたえます。",
          "en": "父母的行為會對小孩造成很大的影響。"
        }
      ]
    },
    {
      "id": "v_n3_auto_3_" + Date.now(),
      "word": "結果",
      "furigana": "けっか",
      "romaji": "kekka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "結果",
      "sentences": [
        {
          "ja": "試験の結果が良くて安心しました。",
          "furigana": "しけんのけっかがよくてあんしんしました。",
          "en": "考試的結果很好，所以放心了。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_1_" + Date.now(),
      "word": "傾向",
      "furigana": "けいこう",
      "romaji": "keikou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "傾向 / 趨勢",
      "sentences": [
        {
          "ja": "最近の若者は結婚を遅らせる傾向にあります。",
          "furigana": "さいきんのわかものはけっこんをおくらせるけいこうにあります。",
          "en": "最近的年輕人有晚婚的趨勢。"
        }
      ]
    },
    {
      "id": "v_n2_auto_2_" + Date.now(),
      "word": "責任",
      "furigana": "せきにん",
      "romaji": "sekinin",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "責任",
      "sentences": [
        {
          "ja": "リーダーとして、彼には重い責任がある。",
          "furigana": "りーだーとして、かれにはおもいせきにんがある。",
          "en": "身為隊長，他背負著重大的責任。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_1_" + Date.now(),
      "word": "矛盾",
      "furigana": "むじゅん",
      "romaji": "mujun",
      "type": "noun",
      "category": "culture_thought",
      "level": "N1",
      "meaning": "矛盾",
      "sentences": [
        {
          "ja": "彼の言っていることとやっていることは矛盾している。",
          "furigana": "かれのいっていることとやっていることはむじゅんしている。",
          "en": "他說的話和做的事充滿矛盾。"
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
