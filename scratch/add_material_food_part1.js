const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const foodWordsPart1 = [
  // ================= 核心三餐與主食 (Core Meals & Staples) =================
  { id: "v_asagohan", word: "朝ご飯", furigana: "あさごはん", romaji: "asagohan", meaning: "早餐", level: "N5", category: "food_culture",
    sentences: [{ ja: "毎朝７時に朝ご飯を食べます。", furigana: "まいあさしちじにあさごはんをたべます。", en: "每天早上七點吃早餐。" }] },
  { id: "v_hirugohan", word: "昼ご飯", furigana: "ひるごはん", romaji: "hirugohan", meaning: "午餐", level: "N5", category: "food_culture",
    sentences: [{ ja: "会社の人と一緒に昼ご飯を食べに行きます。", furigana: "かいしゃのひとといっしょにひるごはんをたべにいきます。", en: "和公司的人一起去吃午餐。" }] },
  { id: "v_bangohan", word: "晩ご飯", furigana: "ばんごはん", romaji: "bangohan", meaning: "晚餐", level: "N5", category: "food_culture",
    sentences: [{ ja: "今日の晩ご飯はカレーです。", furigana: "きょうのばんごはんはかれーです。", en: "今天的晚餐是咖哩。" }] },
  { id: "v_obentou", word: "お弁当", furigana: "おべんとう", romaji: "obentou", meaning: "便當", level: "N5", category: "food_culture",
    sentences: [{ ja: "母が毎日お弁当を作ってくれます。", furigana: "ははがまいにちおべんとうをつくってくれます。", en: "媽媽每天都會幫我做便當。" }] },
  { id: "v_gohan", word: "ご飯", furigana: "ごはん", romaji: "gohan", meaning: "飯 / 米飯 / 餐", level: "N5", category: "food_culture",
    sentences: [{ ja: "ご飯をもう一杯お願いします。", furigana: "ごはんをもういっぱいおねがいします。", en: "請再給我一碗飯。" }] },
  { id: "v_pan", word: "パン", furigana: "ぱん", romaji: "pan", meaning: "麵包", level: "N5", category: "food_culture",
    sentences: [{ ja: "朝はいつもパンを食べます。", furigana: "あさはいつもぱんをたべます。", en: "早上總吃麵包。" }] },

  // ================= 基礎食材 (Basic Ingredients) =================
  { id: "v_niku", word: "肉", furigana: "にく", romaji: "niku", meaning: "肉", level: "N5", category: "food_culture",
    sentences: [{ ja: "スーパーで肉をたくさん買いました。", furigana: "すーぱーでにくをたくさんかいました。", en: "在超市買了很多肉。" }] },
  { id: "v_gyuuniku", word: "牛肉", furigana: "ぎゅうにく", romaji: "gyuuniku", meaning: "牛肉", level: "N5", category: "food_culture",
    sentences: [{ ja: "すき焼きに牛肉を入れます。", furigana: "すきやきにぎゅうにくをいれます。", en: "把牛肉放進壽喜燒裡。" }] },
  { id: "v_butaniku", word: "豚肉", furigana: "ぶたにく", romaji: "butaniku", meaning: "豬肉", level: "N5", category: "food_culture",
    sentences: [{ ja: "豚肉と野菜を炒めます。", furigana: "ぶたにくとやさいをいためます。", en: "炒豬肉和蔬菜。" }] },
  { id: "v_toriniku", word: "鳥肉", furigana: "とりにく", romaji: "toriniku", meaning: "雞肉", level: "N5", category: "food_culture",
    sentences: [{ ja: "鳥肉を唐揚げにします。", furigana: "とりにくをからあげにします。", en: "把雞肉做成炸雞。" }] },
  { id: "v_sakana", word: "魚", furigana: "さかな", romaji: "sakana", meaning: "魚", level: "N5", category: "food_culture",
    sentences: [{ ja: "新鮮な魚はお刺身で食べます。", furigana: "しんせんなさかなはおさしみでたべます。", en: "新鮮的魚用來生吃(生魚片)。" }] },
  { id: "v_tamago", word: "卵", furigana: "たまご", romaji: "tamago", meaning: "雞蛋", level: "N5", category: "food_culture",
    sentences: [{ ja: "卵を二つ使ってオムライスを作ります。", furigana: "たまごをふたつづかっておむらいすをつくります。", en: "用了兩顆蛋做蛋包飯。" }] },
  { id: "v_yasai", word: "野菜", furigana: "やさい", romaji: "yasai", meaning: "蔬菜", level: "N5", category: "food_culture",
    sentences: [{ ja: "健康のために野菜をたくさん食べましょう。", furigana: "けんこうのためにやさいをたくさんたべましょう。", en: "為了健康要多吃蔬菜。" }] },
  { id: "v_kudamono", word: "果物", furigana: "くだもの", romaji: "kudamono", meaning: "水果", level: "N5", category: "food_culture",
    sentences: [{ ja: "食後のデザートに果物を食べます。", furigana: "しょくごのでざーとにくだものをたべます。", en: "飯後甜點吃水果。" }] },

  // ================= 調味料 (Seasonings) =================
  { id: "v_shio", word: "塩", furigana: "しお", romaji: "shio", meaning: "鹽", level: "N5", category: "food_culture",
    sentences: [{ ja: "スープに塩を少しいれます。", furigana: "すーぷにしおをすこしいれます。", en: "在湯裡加一點鹽。" }] },
  { id: "v_satou", word: "砂糖", furigana: "さとう", romaji: "satou", meaning: "糖", level: "N5", category: "food_culture",
    sentences: [{ ja: "コーヒーに砂糖を入れますか？", furigana: "こーひーにさとうをいれますか？", en: "咖啡要加糖嗎？" }] },
  { id: "v_shouyu", word: "醤油", furigana: "しょうゆ", romaji: "shouyu", meaning: "醬油", level: "N5", category: "food_culture",
    sentences: [{ ja: "お寿司に醤油をつけます。", furigana: "おすしにしょうゆをつけます。", en: "壽司沾醬油吃。" }] },

  // ================= 飲料 (Drinks) =================
  { id: "v_mizu", word: "水", furigana: "みず", romaji: "mizu", meaning: "水", level: "N5", category: "food_culture",
    sentences: [{ ja: "冷たい水を一杯ください。", furigana: "つめたいみずをいっぱいください。", en: "請給我一杯冷水。" }] },
  { id: "v_ocha", word: "お茶", furigana: "おちゃ", romaji: "ocha", meaning: "茶", level: "N5", category: "food_culture",
    sentences: [{ ja: "熱いお茶を飲みながらテレビを見ます。", furigana: "あついおちゃをのみながらてれびをみます。", en: "邊喝熱茶邊看電視。" }] },
  { id: "v_koucha", word: "紅茶", furigana: "こうちゃ", romaji: "koucha", meaning: "紅茶", level: "N5", category: "food_culture",
    sentences: [{ ja: "ケーキと一緒に紅茶を飲みます。", furigana: "けーきといっしょにこうちゃをのみます。", en: "吃蛋糕配著紅茶喝。" }] },
  { id: "v_koohii", word: "コーヒー", furigana: "こーひー", romaji: "koohii", meaning: "咖啡", level: "N5", category: "food_culture",
    sentences: [{ ja: "毎朝コーヒーを淹れます。", furigana: "まいあさこーひーをいれます。", en: "每天早上泡咖啡。" }] },
  { id: "v_gyuunyuu", word: "牛乳", furigana: "ぎゅうにゅう", romaji: "gyuunyuu", meaning: "牛奶", level: "N5", category: "food_culture",
    sentences: [{ ja: "子供は毎日牛乳を飲みます。", furigana: "こどもはまいにちぎゅうにゅうをのみます。", en: "小孩子每天喝牛奶。" }] },
  { id: "v_osake", word: "お酒", furigana: "おさけ", romaji: "osake", meaning: "酒", level: "N5", category: "food_culture",
    sentences: [{ ja: "二十歳になったらお酒が飲めます。", furigana: "はたちになったらおさけがのめます。", en: "到了二十歲就可以喝酒了。" }] },

  // ================= 料理動作與味覺 (Actions & Taste) =================
  { id: "v_taberu", word: "食べる", furigana: "たべる", romaji: "taberu", meaning: "吃", level: "N5", category: "food_culture",
    sentences: [{ ja: "レストランで美味しい料理を食べます。", furigana: "れすとらんでおいしいりょうりをたべます。", en: "在餐廳吃美味的料理。" }] },
  { id: "v_nomu", word: "飲む", furigana: "のむ", romaji: "nomu", meaning: "喝", level: "N5", category: "food_culture",
    sentences: [{ ja: "薬を水で飲みます。", furigana: "くすりをみずでのみます。", en: "配水吃藥（喝藥）。" }] },
  { id: "v_tsukuru", word: "作る", furigana: "つくる", romaji: "tsukuru", meaning: "做 / 製作", level: "N5", category: "food_culture",
    sentences: [{ ja: "週末は自分で料理を作ります。", furigana: "しゅうまつはじぶんでりょうりをつくります。", en: "週末自己做飯。" }] },
  { id: "v_kiru_food", word: "切る", furigana: "きる", romaji: "kiru", meaning: "切", level: "N5", category: "food_culture",
    sentences: [{ ja: "包丁で野菜を細かく切ります。", furigana: "ほうちょうでやさいをこまかくきります。", en: "用菜刀把蔬菜切細。" }] },
  { id: "v_oishii", word: "美味しい", furigana: "おいしい", romaji: "oishii", meaning: "好吃的 / 美味的", level: "N5", category: "food_culture",
    sentences: [{ ja: "このケーキはとても美味しいです。", furigana: "このけーきはとてもおいしいです。", en: "這塊蛋糕非常美味。" }] },
  { id: "v_mazui", word: "まずい", furigana: "まずい", romaji: "mazui", meaning: "難吃的", level: "N5", category: "food_culture",
    sentences: [{ ja: "失敗して、料理がまずくなりました。", furigana: "しっぱいして、りょうりがまずくなりました。", en: "失敗了，料理變得難吃。" }] },
  { id: "v_amai", word: "甘い", furigana: "あまい", romaji: "amai", meaning: "甜的", level: "N5", category: "food_culture",
    sentences: [{ ja: "私は甘いお菓子が大好きです。", furigana: "わたしはあまいおかしがだいすきです。", en: "我最喜歡甜的點心。" }] },
  { id: "v_karai", word: "辛い", furigana: "からい", romaji: "karai", meaning: "辣的", level: "N5", category: "food_culture",
    sentences: [{ ja: "このカレーは少し辛いです。", furigana: "このかれーはすこしからいです。", en: "這道咖哩有點辣。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = foodWordsPart1.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'food & dining words (part 1) to data_n5.js!');
