const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_40_" + Date.now(),
      "word": "魚",
      "furigana": "さかな",
      "romaji": "sakana",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "魚",
      "sentences": [
        {
          "ja": "晩ご飯に魚を食べました。",
          "furigana": "ばんごはんにさかなをたべました。",
          "en": "晚餐吃了魚。"
        }
      ]
    },
    {
      "id": "v_n5_auto_41_" + Date.now(),
      "word": "肉",
      "furigana": "にく",
      "romaji": "niku",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "肉",
      "sentences": [
        {
          "ja": "私は肉が好きです。",
          "furigana": "わたしはにくがすきです。",
          "en": "我喜歡吃肉。"
        }
      ]
    },
    {
      "id": "v_n5_auto_42_" + Date.now(),
      "word": "野菜",
      "furigana": "やさい",
      "romaji": "yasai",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "蔬菜",
      "sentences": [
        {
          "ja": "毎日野菜をたくさん食べます。",
          "furigana": "まいにちやさいをたくさんたべます。",
          "en": "每天吃很多蔬菜。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_40_" + Date.now(),
      "word": "原因",
      "furigana": "げんいん",
      "romaji": "genin",
      "type": "noun",
      "category": "properties_relations",
      "level": "N4",
      "meaning": "原因",
      "sentences": [
        {
          "ja": "事故の原因を調べます。",
          "furigana": "じこのげんいんをしらべます。",
          "en": "調查事故的原因。"
        }
      ]
    },
    {
      "id": "v_n4_auto_41_" + Date.now(),
      "word": "結果",
      "furigana": "けっか",
      "romaji": "kekka",
      "type": "noun",
      "category": "properties_relations",
      "level": "N4",
      "meaning": "結果",
      "sentences": [
        {
          "ja": "テストの結果が良かったです。",
          "furigana": "てすとのけっかがよかったです。",
          "en": "考試的結果很好。"
        }
      ]
    },
    {
      "id": "v_n4_auto_42_" + Date.now(),
      "word": "失敗",
      "furigana": "しっぱい",
      "romaji": "shippai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "失敗",
      "sentences": [
        {
          "ja": "実験に失敗しました。",
          "furigana": "じっけんにしっぱいしました。",
          "en": "實驗失敗了。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_40_" + Date.now(),
      "word": "機械",
      "furigana": "きかい",
      "romaji": "kikai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "機械 / 機器",
      "sentences": [
        {
          "ja": "新しい機械を導入する。",
          "furigana": "あたらしいきかいをどうにゅうする。",
          "en": "引進新的機器。"
        }
      ]
    },
    {
      "id": "v_n3_auto_41_" + Date.now(),
      "word": "技術",
      "furigana": "ぎじゅつ",
      "romaji": "gijutsu",
      "type": "noun",
      "category": "culture_thought",
      "level": "N3",
      "meaning": "技術",
      "sentences": [
        {
          "ja": "日本の技術は世界で有名だ。",
          "furigana": "にほんのぎじゅつはせかいでゆうめいだ。",
          "en": "日本的技術在世界上很有名。"
        }
      ]
    },
    {
      "id": "v_n3_auto_42_" + Date.now(),
      "word": "発明",
      "furigana": "はつめい",
      "romaji": "hatsumei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發明",
      "sentences": [
        {
          "ja": "彼は便利な機械を発明した。",
          "furigana": "かれはべんりなきかいをはつめいした。",
          "en": "他發明了便利的機器。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_39_" + Date.now(),
      "word": "仮定",
      "furigana": "かてい",
      "romaji": "katei",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "假設",
      "sentences": [
        {
          "ja": "ある条件を仮定して計算する。",
          "furigana": "あるじょうけんをかていしてけいさんする。",
          "en": "假設某個條件進行計算。"
        }
      ]
    },
    {
      "id": "v_n2_auto_40_" + Date.now(),
      "word": "前提",
      "furigana": "ぜんてい",
      "romaji": "zentei",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "前提",
      "sentences": [
        {
          "ja": "お互いの信頼を前提として話し合う。",
          "furigana": "おたがいのしんらいをぜんていとしてはなしあう。",
          "en": "以雙方的信任為前提進行討論。"
        }
      ]
    },
    {
      "id": "v_n2_auto_41_" + Date.now(),
      "word": "根拠",
      "furigana": "こんきょ",
      "romaji": "konkyo",
      "type": "noun",
      "category": "culture_thought",
      "level": "N2",
      "meaning": "根據 / 依據",
      "sentences": [
        {
          "ja": "その主張には何の根拠もない。",
          "furigana": "そのしゅちょうにはなんのこんきょもない。",
          "en": "那個主張沒有任何根據。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_38_" + Date.now(),
      "word": "漠然",
      "furigana": "ばくぜん",
      "romaji": "bakuzen",
      "type": "na-adjective",
      "category": "psychology_character",
      "level": "N1",
      "meaning": "漠然 / 模糊不清",
      "sentences": [
        {
          "ja": "将来に漠然とした不安を抱く。",
          "furigana": "しょうらいにばくぜんとしたふあんをいだく。",
          "en": "對未來抱持著模糊不清的不安。"
        }
      ]
    },
    {
      "id": "v_n1_auto_39_" + Date.now(),
      "word": "究明",
      "furigana": "きゅうめい",
      "romaji": "kyuumei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "查明 / 探究",
      "sentences": [
        {
          "ja": "事故の原因を徹底的に究明する。",
          "furigana": "じこのげんいんをてっていてきにきゅうめいする。",
          "en": "徹底查明事故的原因。"
        }
      ]
    },
    {
      "id": "v_n1_auto_40_" + Date.now(),
      "word": "圧倒",
      "furigana": "あっとう",
      "romaji": "attou",
      "type": "noun",
      "category": "activities_actions",
      "level": "N1",
      "meaning": "壓倒 / 壓制",
      "sentences": [
        {
          "ja": "相手チームを実力で圧倒した。",
          "furigana": "あいてちーむをじつりょくであっとうした。",
          "en": "憑實力壓倒了對手球隊。"
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
