const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt8 = [
  // ================= 超市與藥妝店 (Supermarket & Drugstore) =================
  { id: "v_l_doraggusutoa", word: "ドラッグストア", furigana: "どらっぐすとあ", romaji: "doraggusutoa", meaning: "藥妝店", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "ドラッグストアで薬と化粧品を買います。", furigana: "どらっぐすとあでくすりとけしょうひんをかいます。", en: "在藥妝店買藥和化妝品。" }] },
  { id: "v_l_kaato", word: "カート", furigana: "かーと", romaji: "kaato", meaning: "購物車", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "スーパーでカートを押して買い物をします。", furigana: "すーぱーでかーとおしておかいものをします。", en: "在超市推著購物車買東西。" }] },
  { id: "v_l_kago", word: "かご", furigana: "かご", romaji: "kago", meaning: "購物籃", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "かごの中に野菜を入れます。", furigana: "かごのなかにやさいをいれます。", en: "把蔬菜放進購物籃裡。" }] },
  { id: "v_l_tokubaihin", word: "特売品", furigana: "とくばいひん", romaji: "tokubaihin", meaning: "特價品", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "今日の特売品は卵です。", furigana: "きょうのとくばいひんはたまごです。", en: "今天的特價品是雞蛋。" }] },
  { id: "v_l_taimuseeru", word: "タイムセール", furigana: "たいむせーる", romaji: "taimuseeru", meaning: "限時特賣", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "５時からタイムセールが始まります。", furigana: "ごじからたいむせーるがはじまります。", en: "五點開始限時特賣。" }] },
  { id: "v_l_okaidoku", word: "お買い得", furigana: "おかいどく", romaji: "okaidoku", meaning: "划算 / 物超所值", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "この肉はとてもお買い得です。", furigana: "このにくはとてもおかいどくです。", en: "這塊肉非常划算。" }] },
  { id: "v_l_hangakushiiru", word: "半額シール", furigana: "はんがくしーる", romaji: "hangakushiiru", meaning: "半價貼紙", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "お弁当に半額シールが貼ってあります。", furigana: "おべんとうにはんがくしーるがはってあります。", en: "便當上貼著半價貼紙。" }] },
  { id: "v_l_souzai", word: "惣菜", furigana: "そうざい", romaji: "souzai", meaning: "熟食 / 小菜", level: "N3", category: "food_culture",
    sentences: [{ ja: "スーパーの惣菜コーナーでコロッケを買います。", furigana: "すーぱーのそうざいこーなーでころっけをかいます。", en: "在超市的熟食區買可樂餅。" }] },
  { id: "v_l_seisen", word: "生鮮食品", furigana: "せいせんしょくひん", romaji: "seisenshokuhin", meaning: "生鮮食品", level: "N3", category: "food_culture",
    sentences: [{ ja: "生鮮食品は冷蔵庫に入れてください。", furigana: "せいせんしょくひんはれいぞうこにいれてください。", en: "生鮮食品請放進冰箱。" }] },
  { id: "v_l_nichiyouhin", word: "日用品", furigana: "にちようひん", romaji: "nichiyouhin", meaning: "日常用品", level: "N3", category: "housing_space",
    sentences: [{ ja: "トイレットペーパーなどの日用品を買います。", furigana: "といれっとぺーぱーなどのにちようひんをかいます。", en: "買廁所衛生紙等日常用品。" }] },
  { id: "v_l_sapurimento", word: "サプリメント", furigana: "さぷりめんと", romaji: "sapurimento", meaning: "保健食品", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "健康のためにサプリメントを飲んでいます。", furigana: "けんこうのためにさぷりめんとをのんでいます。", en: "為了健康在吃保健食品。" }] },
  { id: "v_l_shohousen", word: "処方箋", furigana: "しょほうせん", romaji: "shohousen", meaning: "處方籤", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "病院でもらった処方箋を薬局に出します。", furigana: "びょういんでもらったしょほうせんをやっきょくにだします。", en: "把醫院開的處方籤拿去藥局。" }] },
  { id: "v_l_yakuzaishi", word: "薬剤師", furigana: "やくざいし", romaji: "yakuzaishi", meaning: "藥劑師", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "薬剤師に薬の飲み方を聞きます。", furigana: "やくざいしにくすりののみかたをききます。", en: "向藥劑師詢問吃藥的方法。" }] },
  { id: "v_l_kuupon", word: "クーポン", furigana: "くーぽん", romaji: "kuupon", meaning: "折價券", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "スマホのクーポンを使って安く買います。", furigana: "すまほのくーぽんをつかってやすくかいます。", en: "用手機的折價券便宜買東西。" }] },
  { id: "v_l_denshimanee", word: "電子マネー", furigana: "でんしまねー", romaji: "denshimanee", meaning: "電子支付", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "支払いは電子マネーでお願いします。", furigana: "しはらいはでんしまねーでおねがいします。", en: "麻煩用電子支付結帳。" }] },
  { id: "v_l_serufureji", word: "セルフレジ", furigana: "せるふれじ", romaji: "serufureji", meaning: "自助結帳機", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "セルフレジで自分で会計をします。", furigana: "せるふれじでじぶんでかいけいをします。", en: "在自助結帳機自己結帳。" }] },
  { id: "v_l_shikyouhin", word: "試供品", furigana: "しきょうひん", romaji: "shikyouhin", meaning: "試用品", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "化粧品の試供品をもらいました。", furigana: "けしょうひんのしきょうひんをもらいました。", en: "拿到了化妝品的試用品。" }] },
  { id: "v_l_omake", word: "おまけ", furigana: "おまけ", romaji: "omake", meaning: "贈品", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "ジュースを買うとおまけがついてきます。", furigana: "じゅーすをかうとおまけがついてきます。", en: "買果汁會附贈品。" }] },
  { id: "v_l_horeizai", word: "保冷剤", furigana: "ほれいざい", romaji: "horeizai", meaning: "保冷劑", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "ケーキに保冷剤をつけてもらいます。", furigana: "けーきにほれいざいをつけてもらいます。", en: "請店員在蛋糕裡放保冷劑。" }] },
  { id: "v_l_waribashi", word: "割り箸", furigana: "わりばし", romaji: "waribashi", meaning: "免洗筷", level: "N4", category: "food_culture",
    sentences: [{ ja: "お弁当に割り箸をつけてください。", furigana: "おべんとうにわりばしをつけてください。", en: "便當請附上免洗筷。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt8.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 8 - Supermarket) to data_n5.js!');
