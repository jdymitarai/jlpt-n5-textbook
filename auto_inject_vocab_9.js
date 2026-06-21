const fs = require('fs');
const path = require('path');

const newWords = {
  "N5": [
    {
      "id": "v_n5_auto_25_" + Date.now(),
      "word": "荷物",
      "furigana": "にもつ",
      "romaji": "nimotsu",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "行李",
      "sentences": [
        {
          "ja": "重い荷物を運びました。",
          "furigana": "おもいにもつをはこびました。",
          "en": "搬運了沉重的行李。"
        }
      ]
    },
    {
      "id": "v_n5_auto_26_" + Date.now(),
      "word": "洋服",
      "furigana": "ようふく",
      "romaji": "youfuku",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "西式服裝",
      "sentences": [
        {
          "ja": "デパートで洋服を買いました。",
          "furigana": "でぱーとでようふくをかいました。",
          "en": "在百貨公司買了衣服。"
        }
      ]
    },
    {
      "id": "v_n5_auto_27_" + Date.now(),
      "word": "靴",
      "furigana": "くつ",
      "romaji": "kutsu",
      "type": "noun",
      "category": "living_housing",
      "level": "N5",
      "meaning": "鞋子",
      "sentences": [
        {
          "ja": "この靴はとても履きやすいです。",
          "furigana": "このくつはとてもはきやすいです。",
          "en": "這雙鞋子非常好穿。"
        }
      ]
    }
  ],
  "N4": [
    {
      "id": "v_n4_auto_25_" + Date.now(),
      "word": "予約",
      "furigana": "よやく",
      "romaji": "yoyaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "預約",
      "sentences": [
        {
          "ja": "レストランの予約をしました。",
          "furigana": "れすとらんのよやくをしました。",
          "en": "預約了餐廳。"
        }
      ]
    },
    {
      "id": "v_n4_auto_26_" + Date.now(),
      "word": "約束",
      "furigana": "やくそく",
      "romaji": "yakusoku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "約定",
      "sentences": [
        {
          "ja": "友達と約束があります。",
          "furigana": "ともだちとやくそくがあります。",
          "en": "和朋友有約。"
        }
      ]
    },
    {
      "id": "v_n4_auto_27_" + Date.now(),
      "word": "予定",
      "furigana": "よてい",
      "romaji": "yotei",
      "type": "noun",
      "category": "activities_actions",
      "level": "N4",
      "meaning": "預定 / 計畫",
      "sentences": [
        {
          "ja": "週末の予定はまだありません。",
          "furigana": "しゅうまつのよていはまだありません。",
          "en": "週末的計畫還沒決定。"
        }
      ]
    }
  ],
  "N3": [
    {
      "id": "v_n3_auto_25_" + Date.now(),
      "word": "感覚",
      "furigana": "かんかく",
      "romaji": "kankaku",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "感覺",
      "sentences": [
        {
          "ja": "寒さで手の感覚がない。",
          "furigana": "さむさでてのかんかくがない。",
          "en": "因為寒冷而雙手沒有感覺。"
        }
      ]
    },
    {
      "id": "v_n3_auto_26_" + Date.now(),
      "word": "才能",
      "furigana": "さいのう",
      "romaji": "sainou",
      "type": "noun",
      "category": "psychology_character",
      "level": "N3",
      "meaning": "才能 / 天賦",
      "sentences": [
        {
          "ja": "彼女には音楽の才能がある。",
          "furigana": "かのじょにはおんがくのさいのうがある。",
          "en": "她擁有音樂的天賦。"
        }
      ]
    },
    {
      "id": "v_n3_auto_27_" + Date.now(),
      "word": "訓練",
      "furigana": "くんれん",
      "romaji": "kunren",
      "type": "noun",
      "category": "education_learning",
      "level": "N3",
      "meaning": "訓練",
      "sentences": [
        {
          "ja": "厳しい訓練を乗り越えた。",
          "furigana": "きびしいくんれんをのりこえた。",
          "en": "跨越了嚴格的訓練。"
        }
      ]
    }
  ],
  "N2": [
    {
      "id": "v_n2_auto_24_" + Date.now(),
      "word": "分析",
      "furigana": "ぶんせき",
      "romaji": "bunseki",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "分析",
      "sentences": [
        {
          "ja": "データを詳細に分析する。",
          "furigana": "でーたをしょうさいにぶんせきする。",
          "en": "詳細地分析資料。"
        }
      ]
    },
    {
      "id": "v_n2_auto_25_" + Date.now(),
      "word": "対策",
      "furigana": "たいさく",
      "romaji": "taisaku",
      "type": "noun",
      "category": "activities_actions",
      "level": "N2",
      "meaning": "對策 / 措施",
      "sentences": [
        {
          "ja": "早急に対策を講じる必要がある。",
          "furigana": "そうきゅうにたいさくをこうじるひつようがある。",
          "en": "有必要緊急採取對策。"
        }
      ]
    },
    {
      "id": "v_n2_auto_26_" + Date.now(),
      "word": "規模",
      "furigana": "きぼ",
      "romaji": "kibo",
      "type": "noun",
      "category": "properties_relations",
      "level": "N2",
      "meaning": "規模",
      "sentences": [
        {
          "ja": "そのプロジェクトの規模は非常に大きい。",
          "furigana": "そのぷろじぇくとのきぼはひじょうにおおきい。",
          "en": "那個專案的規模非常龐大。"
        }
      ]
    }
  ],
  "N1": [
    {
      "id": "v_n1_auto_23_" + Date.now(),
      "word": "便宜",
      "furigana": "べんぎ",
      "romaji": "bengi",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "便利 / 權宜",
      "sentences": [
        {
          "ja": "お客様の便宜を図るためにサービスを改善した。",
          "furigana": "おきゃくさまのべんぎをはかるためにさーびすをかいぜんした。",
          "en": "為了帶給顧客便利而改善了服務。"
        }
      ]
    },
    {
      "id": "v_n1_auto_24_" + Date.now(),
      "word": "撤廃",
      "furigana": "てっぱい",
      "romaji": "teppai",
      "type": "noun",
      "category": "society_politics_law",
      "level": "N1",
      "meaning": "撤除 / 廢除",
      "sentences": [
        {
          "ja": "不必要な規制が撤廃された。",
          "furigana": "ふひつようなきせいがてっぱいされた。",
          "en": "不必要的規定被廢除了。"
        }
      ]
    },
    {
      "id": "v_n1_auto_25_" + Date.now(),
      "word": "指標",
      "furigana": "しひょう",
      "romaji": "shihyou",
      "type": "noun",
      "category": "properties_relations",
      "level": "N1",
      "meaning": "指標",
      "sentences": [
        {
          "ja": "経済成長の指標となるデータを発表した。",
          "furigana": "けいざいせいちょうのしひょうとなるでーたをはっぴょうした。",
          "en": "發表了作為經濟成長指標的數據。"
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
