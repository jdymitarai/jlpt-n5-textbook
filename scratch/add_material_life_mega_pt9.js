const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt9 = [
  // ================= 居酒屋與日本餐飲 (Izakaya & Dining) =================
  { id: "v_f_izakaya", word: "居酒屋", furigana: "いざかや", romaji: "izakaya", meaning: "居酒屋", level: "N4", category: "food_culture",
    sentences: [{ ja: "金曜日の夜は居酒屋で飲みます。", furigana: "きんようびのよるはいざかやでのみます。", en: "星期五晚上在居酒屋喝酒。" }] },
  { id: "v_f_otooshi", word: "お通し", furigana: "おとおし", romaji: "otooshi", meaning: "餐前小菜 (通常要收費)", level: "N3", category: "food_culture",
    sentences: [{ ja: "居酒屋に入ると、まずお通しが出てきます。", furigana: "いざかやにはいると、まずおとおしがでてきます。", en: "進居酒屋後，首先會端上餐前小菜。" }] },
  { id: "v_f_nama", word: "生ビール", furigana: "なまびーる", romaji: "namabiiru", meaning: "生啤酒", level: "N5", category: "food_culture",
    sentences: [{ ja: "とりあえず生ビールを二つお願いします。", furigana: "とりあえずなまびーるをふたつおねがいします。", en: "總之先來兩杯生啤酒。" }] },
  { id: "v_f_jokki", word: "ジョッキ", furigana: "じょっき", romaji: "jokki", meaning: "啤酒杯 (帶把手)", level: "N4", category: "food_culture",
    sentences: [{ ja: "冷たいジョッキでビールを飲みます。", furigana: "つめたいじょっきでびーるをのみます。", en: "用冰涼的啤酒杯喝啤酒。" }] },
  { id: "v_f_yakitori", word: "焼き鳥", furigana: "やきとり", romaji: "yakitori", meaning: "烤雞肉串", level: "N5", category: "food_culture",
    sentences: [{ ja: "焼き鳥を塩とタレで五本ずつください。", furigana: "やきとりをしおとたれでごほんずつください。", en: "烤雞肉串鹽味和醬汁各來五串。" }] },
  { id: "v_f_edamame", word: "枝豆", furigana: "えだまめ", romaji: "edamame", meaning: "毛豆", level: "N4", category: "food_culture",
    sentences: [{ ja: "ビールのおつまみには枝豆が一番です。", furigana: "びーるのおつまみにはえだまめがいちばんです。", en: "配啤酒的下酒菜非毛豆莫屬。" }] },
  { id: "v_f_hiyayakko", word: "冷奴", furigana: "ひややっこ", romaji: "hiyayakko", meaning: "涼拌豆腐", level: "N3", category: "food_culture",
    sentences: [{ ja: "冷奴にネギと醤油をかけます。", furigana: "ひややっこにねぎとしょうゆをかけます。", en: "在涼拌豆腐上加蔥和醬油。" }] },
  { id: "v_f_sashimi", word: "刺身", furigana: "さしみ", romaji: "sashimi", meaning: "生魚片", level: "N4", category: "food_culture",
    sentences: [{ ja: "新鮮な刺身の盛り合わせを頼みます。", furigana: "しんせんなさしみのもりあわせをたのみます。", en: "點一份新鮮的生魚片拼盤。" }] },
  { id: "v_f_moriawase", word: "盛り合わせ", furigana: "もりあわせ", romaji: "moriawase", meaning: "拼盤", level: "N3", category: "food_culture",
    sentences: [{ ja: "天ぷらの盛り合わせを一つください。", furigana: "てんぷらのもりあわせをひとつください。", en: "請給我一份天婦羅拼盤。" }] },
  { id: "v_f_okaikei", word: "お会計", furigana: "おかいけい", romaji: "okaikei", meaning: "結帳", level: "N5", category: "food_culture",
    sentences: [{ ja: "すみません、お会計をお願いします。", furigana: "すみません、おかいけいをおねがいします。", en: "不好意思，麻煩結帳。" }] },
  { id: "v_f_ohiya", word: "お冷", furigana: "おひや", romaji: "ohiya", meaning: "冰水 (餐廳用語)", level: "N4", category: "food_culture",
    sentences: [{ ja: "お冷をもう一杯いただけますか？", furigana: "おひやをもういっぱいいただけますか？", en: "可以再給我一杯冰水嗎？" }] },
  { id: "v_f_nomihoudai", word: "飲み放題", furigana: "のみほうだい", romaji: "nomihoudai", meaning: "飲料無限暢飲", level: "N4", category: "food_culture",
    sentences: [{ ja: "２時間飲み放題のコースを予約しました。", furigana: "にじかんのみほうだいのこーすをよやくしました。", en: "預約了兩小時無限暢飲的套餐。" }] },
  { id: "v_f_tabehoudai", word: "食べ放題", furigana: "たべほうだい", romaji: "tabehoudai", meaning: "吃到飽", level: "N4", category: "food_culture",
    sentences: [{ ja: "焼肉の食べ放題に行きましょう。", furigana: "やきにくのたべほうだいにいきましょう。", en: "去吃燒肉吃到飽吧。" }] },
  { id: "v_f_kanpai", word: "乾杯", furigana: "かんぱい", romaji: "kanpai", meaning: "乾杯", level: "N5", category: "food_culture",
    sentences: [{ ja: "みんなの健康を祝って、乾杯！", furigana: "みんなのけんこうをいわって、かんぱい！", en: "為了大家的健康，乾杯！" }] },
  { id: "v_f_shime", word: "締め", furigana: "しめ", romaji: "shime", meaning: "收尾 (的一餐)", level: "N3", category: "food_culture",
    sentences: [{ ja: "飲んだ後の締めはやっぱりラーメンですね。", furigana: "のんだあとのしめはやっぱりらーめんですね。", en: "喝完酒之後的收尾果然還是要吃拉麵啊。" }] },
  { id: "v_f_koshitsu", word: "個室", furigana: "こしつ", romaji: "koshitsu", meaning: "包廂", level: "N4", category: "food_culture",
    sentences: [{ ja: "静かに話したいので、個室を予約します。", furigana: "しずかにはなしたいので、こしつをよやくします。", en: "因為想安靜地聊天，所以預約了包廂。" }] },
  { id: "v_f_zashiki", word: "座敷", furigana: "ざしき", romaji: "zashiki", meaning: "榻榻米座位", level: "N4", category: "food_culture",
    sentences: [{ ja: "靴を脱いで座敷に上がります。", furigana: "くつをぬいでざしきにあがります。", en: "脫掉鞋子坐到榻榻米座位上。" }] },
  { id: "v_f_kitsuenseki", word: "喫煙席", furigana: "きつえんせき", romaji: "kitsuenseki", meaning: "吸菸區", level: "N4", category: "food_culture",
    sentences: [{ ja: "喫煙席と禁煙席、どちらになさいますか？", furigana: "きつえんせきときんえんせき、どちらになさいますか？", en: "請問要吸菸區還是禁菸區？" }] },

  // ================= 日本租屋 (Renting an Apartment) =================
  { id: "v_h_fudousanya", word: "不動産屋", furigana: "ふどうさんや", romaji: "fudousanya", meaning: "房仲 / 不動產仲介", level: "N4", category: "housing_space",
    sentences: [{ ja: "駅前の不動産屋で部屋を探します。", furigana: "えきまえのふどうさんやでへやをさがします。", en: "在車站前的房仲那裡找房子。" }] },
  { id: "v_h_bukken", word: "物件", furigana: "ぶっけん", romaji: "bukken", meaning: "房產 / 物件", level: "N3", category: "housing_space",
    sentences: [{ ja: "条件に合う物件をいくつか見せてもらいました。", furigana: "じょうけんにあうぶっけんをいくつかみせてもらいました。", en: "請他們讓我看了幾個符合條件的物件。" }] },
  { id: "v_h_shikikin", word: "敷金", furigana: "しききん", romaji: "shikikin", meaning: "押金", level: "N3", category: "housing_space",
    sentences: [{ ja: "家賃の２ヶ月分を敷金として払います。", furigana: "やちんのにかげつぶんをしききんとしてはらいます。", en: "支付兩個月房租作為押金。" }] },
  { id: "v_h_reikin", word: "礼金", furigana: "れいきん", romaji: "reikin", meaning: "禮金", level: "N3", category: "housing_space",
    sentences: [{ ja: "最近は礼金がゼロの物件も多いです。", furigana: "さいきんはれいきんがぜろのぶっけんもおおいです。", en: "最近也有很多不用禮金的物件。" }] },
  { id: "v_h_kanrihi", word: "管理費", furigana: "かんりひ", romaji: "kanrihi", meaning: "管理費", level: "N3", category: "housing_space",
    sentences: [{ ja: "家賃とは別に、毎月管理費がかかります。", furigana: "やちんとはべつに、まいつきかんりひがかかります。", en: "除了房租之外，每個月還要收管理費。" }] },
  { id: "v_h_madori", word: "間取り", furigana: "まどり", romaji: "madori", meaning: "房屋格局", level: "N3", category: "housing_space",
    sentences: [{ ja: "この部屋の間取りは１ＬＤＫです。", furigana: "このへやのまどりはいちえるでぃーけーです。", en: "這個房間的格局是1LDK。" }] },
  { id: "v_h_toho", word: "徒歩", furigana: "とほ", romaji: "toho", meaning: "步行", level: "N4", category: "housing_space",
    sentences: [{ ja: "駅から徒歩５分のマンションです。", furigana: "えきからとほごふんのまんしょんです。", en: "距離車站步行5分鐘的公寓。" }] },
  { id: "v_h_shinchiku", word: "新築", furigana: "しんちく", romaji: "shinchiku", meaning: "新建", level: "N3", category: "housing_space",
    sentences: [{ ja: "新築のきれいなアパートに住みたいです。", furigana: "しんちくのきれいなあぱーとにすみたいです。", en: "想住在新建的漂亮公寓裡。" }] },
  { id: "v_h_ootorokku", word: "オートロック", furigana: "おーとろっく", romaji: "ootorokku", meaning: "自動門鎖 (公寓大門防護)", level: "N4", category: "housing_space",
    sentences: [{ ja: "安全のためにオートロックのマンションを選びます。", furigana: "あんぜんのためにおーとろっくのまんしょんをえらびます。", en: "為了安全選擇有自動門鎖的公寓。" }] },
  { id: "v_h_keiyaku", word: "契約", furigana: "けいやく", romaji: "keiyaku", meaning: "簽約", level: "N3", category: "housing_space",
    sentences: [{ ja: "アパートの契約書にサインをします。", furigana: "あぱーとのけいやくしょにさいんをします。", en: "在公寓的合約書上簽名。" }] },
  { id: "v_h_hoshounin", word: "保証人", furigana: "ほしょうにん", romaji: "hoshounin", meaning: "保證人", level: "N3", category: "housing_space",
    sentences: [{ ja: "部屋を借りる時、親に保証人になってもらいます。", furigana: "へやをかりるとき、おやにほしょうにんになってもらいます。", en: "租房子的時候，請父母當保證人。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt9.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 9 - Izakaya & Renting) to data_n5.js!');
