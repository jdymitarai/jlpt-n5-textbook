const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt6 = [
  // ================= 百貨公司 (Department Store) =================
  { id: "v_l_esukareetaa", word: "エスカレーター", furigana: "えすかれーたー", romaji: "esukareetaa", meaning: "手扶梯", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "エスカレーターで上の階に行きます。", furigana: "えすかれーたーでうえのかいにいきます。", en: "搭手扶梯去樓上。" }] },
  { id: "v_l_erebeetaa", word: "エレベーター", furigana: "えれべーたー", romaji: "erebeetaa", meaning: "電梯", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "エレベーターで屋上に上がります。", furigana: "えれべーたーでおくじょうにあがります。", en: "搭電梯上頂樓。" }] },
  { id: "v_l_annaijo", word: "案内所", furigana: "あんないじょ", romaji: "annaijo", meaning: "服務台 / 詢問處", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "１階の案内所で地図をもらいます。", furigana: "いっかいのあんないじょでちずをもらいます。", en: "在一樓服務台拿地圖。" }] },
  { id: "v_l_tenin", word: "店員", furigana: "てんいん", romaji: "tenin", meaning: "店員", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "店員さんに靴のサイズを聞きます。", furigana: "てんいんさんにくつのさいずをききます。", en: "向店員詢問鞋子的尺寸。" }] },
  { id: "v_l_manekin", word: "マネキン", furigana: "まねきん", romaji: "manekin", meaning: "人體模型", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "マネキンが着ている服を買いたいです。", furigana: "まねきんがきているふくをかいたいです。", en: "想買人體模型身上穿的那套衣服。" }] },
  { id: "v_l_shookeesu", word: "ショーケース", furigana: "しょーけーす", romaji: "shookeesu", meaning: "展示櫃", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "ショーケースの中の時計を見ます。", furigana: "しょーけーすのなかのとけいをみます。", en: "看展示櫃裡的手錶。" }] },
  { id: "v_l_shichakushitsu", word: "試着室", furigana: "しちゃくしつ", romaji: "shichakushitsu", meaning: "試衣間", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "試着室はあちらです。", furigana: "しちゃくしつはあちらです。", en: "試衣間在那邊。" }] },
  { id: "v_l_fujinfuku", word: "婦人服", furigana: "ふじんふく", romaji: "fujinfuku", meaning: "女裝", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "３階は婦人服売り場です。", furigana: "さんがいはふじんふくうりばです。", en: "三樓是女裝專櫃。" }] },
  { id: "v_l_shinshifuku", word: "紳士服", furigana: "しんしふく", romaji: "shinshifuku", meaning: "男裝", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "４階で紳士服のスーツを買います。", furigana: "よんかいでしんしふくのすーつをかいます。", en: "在四樓買男裝西裝。" }] },
  { id: "v_l_kodomofuku", word: "子供服", furigana: "こどもふく", romaji: "kodomofuku", meaning: "童裝", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "５階の子供服売り場でおもちゃも見ます。", furigana: "ごかいのこどもふくうりばでおもちゃもみます。", en: "在五樓的童裝區順便看玩具。" }] },
  { id: "v_l_depachika", word: "デパ地下", furigana: "でぱちか", romaji: "depachika", meaning: "百貨公司地下美食街", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "デパ地下でおいしいケーキを買って帰ります。", furigana: "でぱちかでおいしいけーきをかってかえります。", en: "在百貨公司地下街買好吃的蛋糕回家。" }] },
  { id: "v_l_okujou", word: "屋上", furigana: "おくじょう", romaji: "okujou", meaning: "頂樓", level: "N4", category: "housing_space",
    sentences: [{ ja: "デパートの屋上に小さな遊園地があります。", furigana: "でぱーとのおくじょうにちいさなゆうえんちがあります。", en: "百貨公司頂樓有一個小遊樂園。" }] },
  { id: "v_l_saijijou", word: "催事場", furigana: "さいじじょう", romaji: "saijijou", meaning: "活動會場 / 特賣會場", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "８階の催事場で北海道のイベントをやっています。", furigana: "はちかいのさいじじょうでほっかいどうのいべんとをやっています。", en: "八樓的活動會場正在舉辦北海道展。" }] },
  { id: "v_l_menzei", word: "免税", furigana: "めんぜい", romaji: "menzei", meaning: "免稅", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "パスポートを見せると免税になります。", furigana: "ぱすぽーとをみせるとめんぜいになります。", en: "出示護照可以免稅。" }] },
  { id: "v_l_rappingu", word: "ラッピング", furigana: "らっぴんぐ", romaji: "rappingu", meaning: "包裝", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "プレゼント用にラッピングをお願いします。", furigana: "ぷれぜんとようにらっぴんぐをおねがいします。", en: "麻煩幫我做禮物包裝。" }] },
  { id: "v_l_housou", word: "包装", furigana: "ほうそう", romaji: "housou", meaning: "包裝", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "商品をきれいに包装してもらいました。", furigana: "しょうひんをきれいにほうそうしてもらいました。", en: "請店員將商品包裝得很漂亮。" }] },
  { id: "v_l_gifutoken", word: "ギフト券", furigana: "ぎふとけん", romaji: "gifutoken", meaning: "禮券", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "お祝いにデパートのギフト券をもらいました。", furigana: "おいわいにでぱーとのぎふとけんをもらいました。", en: "收到百貨公司禮券當作賀禮。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt6.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 6 - Department Store) to data_n5.js!');
