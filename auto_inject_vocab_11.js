const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_31_" + Date.now(),
      "word": "牛乳",
      "furigana": "ぎゅうにゅう",
      "romaji": "gyuunyuu",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "牛奶",
      "sentences": [
        {
          "ja": "毎朝牛乳を飲みます。",
          "furigana": "まいあさぎゅうにゅうをのみます。",
          "en": "每天早上喝牛奶。"
        }
      ]
    },
    {
      "id": "v_n5_auto_32_" + Date.now(),
      "word": "お茶",
      "furigana": "おちゃ",
      "romaji": "ocha",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "茶",
      "sentences": [
        {
          "ja": "温かいお茶をください。",
          "furigana": "あたたかいおちゃをください。",
          "en": "請給我熱茶。"
        }
      ]
    },
    {
      "id": "v_n5_auto_33_" + Date.now(),
      "word": "果物",
      "furigana": "くだもの",
      "romaji": "kudamono",
      "type": "noun",
      "category": "food_drink",
      "level": "N5",
      "meaning": "水果",
      "sentences": [
        {
          "ja": "スーパーで果物を買いました。",
          "furigana": "すーぱーでくだものをかいました。",
          "en": "在超市買了水果。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_31_" + Date.now(),
      "word": "用意",
      "furigana": "ようい",
      "romaji": "youi",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "準備 / 預備",
      "sentences": [
        {
          "ja": "食事の用意ができました。",
          "furigana": "しょくじのよういができました。",
          "en": "用餐的準備已經做好了。"
        }
      ]
    },
    {
      "id": "v_n4_auto_32_" + Date.now(),
      "word": "説明",
      "furigana": "せつめい",
      "romaji": "setsumei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "說明",
      "sentences": [
        {
          "ja": "使い方の説明を読みます。",
          "furigana": "つかいかたのせつめいをよみます。",
          "en": "閱讀使用方法的說明。"
        }
      ]
    },
    {
      "id": "v_n4_auto_33_" + Date.now(),
      "word": "案内",
      "furigana": "あんない",
      "romaji": "annai",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "引導 / 導覽",
      "sentences": [
        {
          "ja": "駅までの道を案内してください。",
          "furigana": "えきまでのみちをあんないしてください。",
          "en": "請為我帶路去車站。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_31_" + Date.now(),
      "word": "差",
      "furigana": "さ",
      "romaji": "sa",
      "type": "noun",
      "category": "properties_relations",
      "level": "N3",
      "meaning": "差距",
      "sentences": [
        {
          "ja": "両チームの実力には大きな差がある。",
          "furigana": "りょうちーむのじつりょくにはおおきなさがある。",
          "en": "兩隊的實力有很大的差距。"
        }
      ]
    },
    {
      "id": "v_n3_auto_32_" + Date.now(),
      "word": "発見",
      "furigana": "はっけん",
      "romaji": "hakken",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發現",
      "sentences": [
        {
          "ja": "新しい星が発見されました。",
          "furigana": "あたらしいほしがはっけんされました。",
          "en": "發現了新星星。"
        }
      ]
    },
    {
      "id": "v_n3_auto_33_" + Date.now(),
      "word": "発生",
      "furigana": "はっせい",
      "romaji": "hassei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N3",
      "meaning": "發生",
      "sentences": [
        {
          "ja": "大きな地震が発生しました。",
          "furigana": "おおきなじしんがはっせいしました。",
          "en": "發生了嚴重的地震。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_30_" + Date.now(),
      "word": "統計",
      "furigana": "とうけい",
      "romaji": "toukei",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "統計",
      "sentences": [
        {
          "ja": "最新の統計データを参照する。",
          "furigana": "さいしんのとうけいでーたをさんしょうする。",
          "en": "參照最新的統計資料。"
        }
      ]
    },
    {
      "id": "v_n2_auto_31_" + Date.now(),
      "word": "確率",
      "furigana": "かくりつ",
      "romaji": "kakuritsu",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "機率",
      "sentences": [
        {
          "ja": "明日は雨が降る確率が高い。",
          "furigana": "あしたはあめがふるかくりつがたかい。",
          "en": "明天降雨的機率很高。"
        }
      ]
    },
    {
      "id": "v_n2_auto_32_" + Date.now(),
      "word": "限界",
      "furigana": "げんかい",
      "romaji": "genkai",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "極限",
      "sentences": [
        {
          "ja": "体力の限界に挑戦する。",
          "furigana": "たいりょくのげんかいにちょうせんする。",
          "en": "挑戰體力的極限。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_29_" + Date.now(),
      "word": "頻繁",
      "furigana": "ひんぱん",
      "romaji": "hinpan",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "頻繁",
      "sentences": [
        {
          "ja": "この地域では地震が頻繁に起こる。",
          "furigana": "このちいきではじしんがひんぱんにおこる。",
          "en": "這個地區頻繁發生地震。"
        }
      ]
    },
    {
      "id": "v_n1_auto_30_" + Date.now(),
      "word": "俊敏",
      "furigana": "しゅんびん",
      "romaji": "shunbin",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "敏捷 / 俐落",
      "sentences": [
        {
          "ja": "彼は俊敏な動きで敵をかわした。",
          "furigana": "かれはしゅんびんなうごきでてきをかわした。",
          "en": "他以敏捷的動作躲開了敵人。"
        }
      ]
    },
    {
      "id": "v_n1_auto_31_" + Date.now(),
      "word": "膨大",
      "furigana": "ぼうだい",
      "romaji": "boudai",
      "type": "na-adjective",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "龐大",
      "sentences": [
        {
          "ja": "膨大なデータを処理するシステム。",
          "furigana": "ぼうだいなでーたをしょりするしすてむ。",
          "en": "處理龐大資料的系統。"
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
