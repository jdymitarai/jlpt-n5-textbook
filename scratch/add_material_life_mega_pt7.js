const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt7 = [
  // ================= 百貨公司 (Department Store) 進階擴充 =================
  { id: "v_l_kosume", word: "コスメ", furigana: "こすめ", romaji: "kosume", meaning: "化妝品 (cosmetics)", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "１階で新しいコスメを買います。", furigana: "いっかいであたらしいこすめをかいます。", en: "在一樓買新的化妝品。" }] },
  { id: "v_l_depakosu", word: "デパコス", furigana: "でぱこす", romaji: "depakosu", meaning: "專櫃化妝品", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "友達の誕生日にデパコスをプレゼントします。", furigana: "ともだちのたんじょうびにでぱこすをぷれぜんとします。", en: "朋友生日送她專櫃化妝品當禮物。" }] },
  { id: "v_l_bebiizouhin", word: "ベビー用品", furigana: "べびーようひん", romaji: "bebiizouhin", meaning: "嬰兒用品", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "６階はベビー用品売り場です。", furigana: "ろっかいはべびーようひんうりばです。", en: "六樓是嬰兒用品專櫃。" }] },
  { id: "v_l_supootsuyouhin", word: "スポーツ用品", furigana: "すぽーつようひん", romaji: "supootsuyouhin", meaning: "體育用品", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "スポーツ用品店で靴を買います。", furigana: "すぽーつようひんてんでくつをかいます。", en: "在體育用品店買鞋子。" }] },
  { id: "v_l_zakka", word: "雑貨", furigana: "ざっか", romaji: "zakka", meaning: "雜貨 / 生活小物", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "可愛い雑貨を見るのが好きです。", furigana: "かわいいざっかをつるのがすきです。", en: "喜歡看可愛的生活雜貨。" }] },
  { id: "v_l_pointokaado", word: "ポイントカード", furigana: "ぽいんとかーど", romaji: "pointokaado", meaning: "集點卡", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "ポイントカードはお持ちですか？", furigana: "ぽいんとかーどはおもちですか？", en: "您有集點卡嗎？" }] },
  { id: "v_l_shouhinken", word: "商品券", furigana: "しょうひんけん", romaji: "shouhinken", meaning: "商品禮券", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "デパートで商品券が使えます。", furigana: "でぱーとでしょうひんけんがつかえます。", en: "在百貨公司可以使用商品禮券。" }] },
  { id: "v_l_shishoku", word: "試食", furigana: "ししょく", romaji: "shishoku", meaning: "試吃", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "デパ地下でケーキを試食しました。", furigana: "でぱちかでけーきをししょくしました。", en: "在百貨地下街試吃了蛋糕。" }] },
  { id: "v_l_kamibukuro", word: "紙袋", furigana: "かみぶくろ", romaji: "kamibukuro", meaning: "紙袋", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "紙袋を一つください。", furigana: "かみぶくろをひとつください。", en: "請給我一個紙袋。" }] },
  { id: "v_l_keibiin", word: "警備員", furigana: "けいびいん", romaji: "keibiin", meaning: "警衛 / 保全", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "入り口に警備員が立っています。", furigana: "いりぐちにけいびいんがたっています。", en: "入口處站著警衛。" }] },
  { id: "v_l_maigo", word: "迷子", furigana: "まいご", romaji: "maigo", meaning: "迷路的孩子", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "デパートで迷子になりました。", furigana: "でぱーとでまいごになりました。", en: "在百貨公司裡走失了。" }] },
  { id: "v_l_otoshimono", word: "落とし物", furigana: "おとしもの", romaji: "otoshimono", meaning: "遺失物", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "案内所に落とし物を届けます。", furigana: "あんないじょにおとしものをとどけます。", en: "把撿到的遺失物送到服務台。" }] },
  { id: "v_l_bebiikaa", word: "ベビーカー", furigana: "べびーかー", romaji: "bebiikaa", meaning: "嬰兒車", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "デパートでベビーカーを借りました。", furigana: "でぱーとでべびーかーをかりました。", en: "在百貨公司借了嬰兒車。" }] },
  { id: "v_l_kurumaisu", word: "車椅子", furigana: "くるまいす", romaji: "kurumaisu", meaning: "輪椅", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "エレベーターは車椅子でも乗れます。", furigana: "えれべーたーはくるまいすでものれます。", en: "輪椅也可以搭電梯。" }] },
  { id: "v_l_kyuukeijo", word: "休憩所", furigana: "きゅうけいじょ", romaji: "kyuukeijo", meaning: "休息區", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "買い物の後、休憩所で休みます。", furigana: "かいもののあと、きゅうけいじょでやすみます。", en: "買完東西後在休息區休息。" }] },
  { id: "v_l_fuudokooto", word: "フードコート", furigana: "ふーどこーと", romaji: "fuudokooto", meaning: "美食街", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "フードコートでラーメンを食べます。", furigana: "ふーどこーとでらーめんをたべます。", en: "在美食街吃拉麵。" }] },
  { id: "v_l_resutorangai", word: "レストラン街", furigana: "れすとらんがい", romaji: "resutorangai", meaning: "餐廳樓層", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "上の階のレストラン街で食事をします。", furigana: "うえのかいのれすとらんがいでしょくじをします。", en: "在樓上的餐廳樓層吃飯。" }] },
  { id: "v_l_genteihin", word: "限定品", furigana: "げんていひん", romaji: "genteihin", meaning: "限定商品", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "このカバンはデパートの限定品です。", furigana: "このかばんはでぱーとのげんていひんです。", en: "這個包包是百貨公司的限定商品。" }] },
  { id: "v_l_shinagire", word: "品切れ", furigana: "しなぎれ", romaji: "shinagire", meaning: "缺貨 / 售完", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "申し訳ありません、その商品は品切れです。", furigana: "もうしわけありません、そのしょうひんはしなぎれです。", en: "非常抱歉，那個商品已經售完了。" }] },
  { id: "v_l_zaiko", word: "在庫", furigana: "ざいこ", romaji: "zaiko", meaning: "庫存", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "在庫があるか確認します。", furigana: "ざいこがあるかかくにんします。", en: "我確認一下有沒有庫存。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt7.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 7 - Department Store 2) to data_n5.js!');
