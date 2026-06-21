const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_55_" + Date.now(),
      "word": "腕",
      "furigana": "うで",
      "romaji": "ude",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "手臂",
      "sentences": [
        {
          "ja": "転んで腕を怪我しました。",
          "furigana": "ころんでうでをけがしました。",
          "en": "跌倒受傷了手臂。"
        }
      ]
    },
    {
      "id": "v_n5_auto_56_" + Date.now(),
      "word": "胸",
      "furigana": "むね",
      "romaji": "mune",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "胸部",
      "sentences": [
        {
          "ja": "胸がドキドキします。",
          "furigana": "むねがどきどきします。",
          "en": "胸口撲通撲通地跳。"
        }
      ]
    },
    {
      "id": "v_n5_auto_57_" + Date.now(),
      "word": "歯",
      "furigana": "は",
      "romaji": "ha",
      "type": "noun",
      "category": "geography_ecology",
      "level": "N5",
      "meaning": "牙齒",
      "sentences": [
        {
          "ja": "毎日歯を磨きます。",
          "furigana": "まいにちはをみがきます。",
          "en": "每天刷牙。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_55_" + Date.now(),
      "word": "専門",
      "furigana": "せんもん",
      "romaji": "senmon",
      "type": "noun",
      "category": "education_learning",
      "level": "N4",
      "meaning": "專門 / 專業",
      "sentences": [
        {
          "ja": "彼の専門は歴史です。",
          "furigana": "かれのせんもんはれきしです。",
          "en": "他的專業是歷史。"
        }
      ]
    },
    {
      "id": "v_n4_auto_56_" + Date.now(),
      "word": "実験",
      "furigana": "じっけん",
      "romaji": "jikken",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "實驗",
      "sentences": [
        {
          "ja": "理科の授業で実験をした。",
          "furigana": "りかのじゅぎょうでじっけんをした。",
          "en": "在理科課堂上做了實驗。"
        }
      ]
    },
    {
      "id": "v_n4_auto_57_" + Date.now(),
      "word": "成功",
      "furigana": "せいこう",
      "romaji": "seikou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "成功",
      "sentences": [
        {
          "ja": "手術は無事に成功しました。",
          "furigana": "しゅじゅつはぶじにせいこうしました。",
          "en": "手術順利地成功了。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_55_" + Date.now(),
      "word": "改善",
      "furigana": "かいぜん",
      "romaji": "kaizen",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "改善",
      "sentences": [
        {
          "ja": "生活習慣を改善する。",
          "furigana": "せいかつしゅうかんをかいぜんする。",
          "en": "改善生活習慣。"
        }
      ]
    },
    {
      "id": "v_n3_auto_56_" + Date.now(),
      "word": "発展",
      "furigana": "はってん",
      "romaji": "hatten",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發展",
      "sentences": [
        {
          "ja": "経済が急速に発展した。",
          "furigana": "けいざいがきゅうそくにはってんした。",
          "en": "經濟快速發展了。"
        }
      ]
    },
    {
      "id": "v_n3_auto_57_" + Date.now(),
      "word": "努力",
      "furigana": "どりょく",
      "romaji": "doryoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "努力",
      "sentences": [
        {
          "ja": "夢を叶えるために努力する。",
          "furigana": "ゆめをかなえるためにどりょくする。",
          "en": "為了實現夢想而努力。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_54_" + Date.now(),
      "word": "制度",
      "furigana": "せいど",
      "romaji": "seido",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "制度",
      "sentences": [
        {
          "ja": "新しい教育制度が始まる。",
          "furigana": "あたらしいきょういくせいどがはじまる。",
          "en": "新的教育制度開始了。"
        }
      ]
    },
    {
      "id": "v_n2_auto_55_" + Date.now(),
      "word": "責任",
      "furigana": "せきにん",
      "romaji": "sekinin",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N2",
      "meaning": "責任",
      "sentences": [
        {
          "ja": "リーダーとしての責任を果たす。",
          "furigana": "りーだーとしてのせきにんをはたす。",
          "en": "盡到身為領導者的責任。"
        }
      ]
    },
    {
      "id": "v_n2_auto_56_" + Date.now(),
      "word": "目的",
      "furigana": "もくてき",
      "romaji": "mokuteki",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "目的",
      "sentences": [
        {
          "ja": "留学の目的は何ですか。",
          "furigana": "りゅうがくのもくてきはなんですか。",
          "en": "留學的目的是什麼呢？"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_53_" + Date.now(),
      "word": "錯覚",
      "furigana": "さっかく",
      "romaji": "sakkaku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "錯覺",
      "sentences": [
        {
          "ja": "それは目の錯覚に過ぎない。",
          "furigana": "それはめのさっかくにすぎない。",
          "en": "那只不過是眼睛的錯覺。"
        }
      ]
    },
    {
      "id": "v_n1_auto_54_" + Date.now(),
      "word": "執着",
      "furigana": "しゅうちゃく",
      "romaji": "shuuchaku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "執著",
      "sentences": [
        {
          "ja": "過去の栄光に執着する。",
          "furigana": "かこのえいこうにしゅうちゃくする。",
          "en": "對過去的榮光感到執著。"
        }
      ]
    },
    {
      "id": "v_n1_auto_55_" + Date.now(),
      "word": "飛躍",
      "furigana": "ひやく",
      "romaji": "hiyaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "飛躍 / 躍進",
      "sentences": [
        {
          "ja": "科学技術が飛躍的に進歩した。",
          "furigana": "かがくぎじゅつがひやくてきにしんぽした。",
          "en": "科學技術有了飛躍性的進步。"
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
