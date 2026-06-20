const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const foodWordsPart2 = [
  // ================= 味覺與嗅覺 (Advanced Taste & Smell) =================
  { id: "v_suppai", word: "酸っぱい", furigana: "すっぱい", romaji: "suppai", meaning: "酸的", level: "N4", category: "food_culture",
    sentences: [{ ja: "レモンはとても酸っぱいです。", furigana: "れもんはとてもすっぱいです。", en: "檸檬非常酸。" }] },
  { id: "v_shoppai", word: "しょっぱい", furigana: "しょっぱい", romaji: "shoppai", meaning: "鹹的", level: "N4", category: "food_culture",
    sentences: [{ ja: "塩を入れすぎて、スープがしょっぱいです。", furigana: "しおをいれすぎて、すーぷがしょっぱいです。", en: "鹽加太多，湯很鹹。" }] },
  { id: "v_nigai", word: "苦い", furigana: "にがい", romaji: "nigai", meaning: "苦的", level: "N4", category: "food_culture",
    sentences: [{ ja: "この薬は苦くて飲めません。", furigana: "このくすりはにがくてのめません。", en: "這個藥很苦吞不下去。" }] },
  { id: "v_koi_taste", word: "濃い", furigana: "こい", romaji: "koi", meaning: "濃的 / 重口味的", level: "N3", category: "food_culture",
    sentences: [{ ja: "味が濃い料理が好きです。", furigana: "あじがこいりょうりがすきです。", en: "喜歡口味重的料理。" }] },
  { id: "v_usui_taste", word: "薄い", furigana: "うすい", romaji: "usui", meaning: "淡的", level: "N3", category: "food_culture",
    sentences: [{ ja: "味が薄かったら、醤油をかけてください。", furigana: "あじがうすかったら、しょうゆをかけてください。", en: "如果味道淡，請加點醬油。" }] },

  // ================= 料理動作 (Cooking Actions) =================
  { id: "v_niru", word: "煮る", furigana: "にる", romaji: "niru", meaning: "煮 / 燉", level: "N4", category: "food_culture",
    sentences: [{ ja: "野菜と肉を鍋で煮ます。", furigana: "やさいとにくをなべでにます。", en: "在鍋裡燉煮蔬菜和肉。" }] },
  { id: "v_yaku", word: "焼く", furigana: "やく", romaji: "yaku", meaning: "烤 / 煎", level: "N4", category: "food_culture",
    sentences: [{ ja: "魚をきれいに焼きました。", furigana: "さかなをきれいにやきました。", en: "把魚烤得很漂亮。" }] },
  { id: "v_ageru_food", word: "揚げる", furigana: "あげる", romaji: "ageru", meaning: "油炸", level: "N4", category: "food_culture",
    sentences: [{ ja: "油でポテトを揚げます。", furigana: "あぶらでぽてとをあげます。", en: "用油炸薯條。" }] },
  { id: "v_yuderu", word: "茹でる", furigana: "ゆでる", romaji: "yuderu", meaning: "用水煮 / 汆燙", level: "N4", category: "food_culture",
    sentences: [{ ja: "お湯で卵を茹でます。", furigana: "おゆでたまごをゆでます。", en: "用熱水煮蛋。" }] },
  { id: "v_mazeru", word: "混ぜる", furigana: "まぜる", romaji: "mazeru", meaning: "攪拌 / 混合", level: "N3", category: "food_culture",
    sentences: [{ ja: "卵と砂糖をよく混ぜます。", furigana: "たまごとさとうをよくまぜます。", en: "將蛋和糖充分攪拌。" }] },
  { id: "v_atatameru", word: "温める", furigana: "あたためる", romaji: "atatameru", meaning: "加熱", level: "N4", category: "food_culture",
    sentences: [{ ja: "お弁当を電子レンジで温めます。", furigana: "おべんとうをでんしれんじであたためます。", en: "用微波爐加熱便當。" }] },
  { id: "v_wakasu", word: "沸かす", furigana: "わかす", romaji: "wakasu", meaning: "燒開 (水)", level: "N4", category: "food_culture",
    sentences: [{ ja: "お茶を飲むためにお湯を沸かします。", furigana: "おちゃをのむためにおゆをわかします。", en: "為了喝茶而燒開水。" }] },

  // ================= 餐具 (Tableware) =================
  { id: "v_hashi", word: "箸", furigana: "はし", romaji: "hashi", meaning: "筷子", level: "N5", category: "food_culture",
    sentences: [{ ja: "日本人は箸を使ってご飯を食べます。", furigana: "にほんじんははしをつかってごはんをたべます。", en: "日本人用筷子吃飯。" }] },
  { id: "v_supuun", word: "スプーン", furigana: "すぷーん", romaji: "supuun", meaning: "湯匙", level: "N5", category: "food_culture",
    sentences: [{ ja: "スプーンでカレーを食べます。", furigana: "すぷーんでかれーをたべます。", en: "用湯匙吃咖哩。" }] },
  { id: "v_fooku", word: "フォーク", furigana: "ふぉーく", romaji: "fooku", meaning: "叉子", level: "N5", category: "food_culture",
    sentences: [{ ja: "フォークとナイフでステーキを切ります。", furigana: "ふぉーくとないふですてーきをきります。", en: "用叉子和刀子切牛排。" }] },
  { id: "v_osara", word: "お皿", furigana: "おさら", romaji: "osara", meaning: "盤子", level: "N5", category: "food_culture",
    sentences: [{ ja: "きれいなお皿にケーキをのせます。", furigana: "きれいなおさらにけーきをのせます。", en: "把蛋糕放在漂亮的盤子上。" }] },
  { id: "v_chawan", word: "茶碗", furigana: "ちゃわん", romaji: "chawan", meaning: "飯碗 / 茶碗", level: "N4", category: "food_culture",
    sentences: [{ ja: "ご飯を茶碗によそいます。", furigana: "ごはんをちゃわんによそいます。", en: "把飯盛到碗裡。" }] },
  { id: "v_koppu", word: "コップ", furigana: "こっぷ", romaji: "koppu", meaning: "杯子 (無把手的水杯)", level: "N5", category: "food_culture",
    sentences: [{ ja: "コップに水を注ぎます。", furigana: "こっぷにみずをそそぎます。", en: "把水倒進杯子裡。" }] },

  // ================= 常見日本料理與外來語 (Specific Dishes) =================
  { id: "v_karee", word: "カレー", furigana: "かれー", romaji: "karee", meaning: "咖哩", level: "N5", category: "food_culture",
    sentences: [{ ja: "日本のカレーライスは美味しいです。", furigana: "にほんのかれーらいすはおいしいです。", en: "日本的咖哩飯很好吃。" }] },
  { id: "v_raamen", word: "ラーメン", furigana: "らーめん", romaji: "raamen", meaning: "拉麵", level: "N5", category: "food_culture",
    sentences: [{ ja: "寒い日は熱いラーメンが食べたくなります。", furigana: "さむいひはあついらーめんがたべたくなります。", en: "冷天就想吃熱呼呼的拉麵。" }] },
  { id: "v_udon", word: "うどん", furigana: "うどん", romaji: "udon", meaning: "烏龍麵", level: "N5", category: "food_culture",
    sentences: [{ ja: "昼ご飯はうどんにします。", furigana: "ひるごはんはうどんにします。", en: "午餐吃烏龍麵。" }] },
  { id: "v_sushi", word: "寿司", furigana: "すし", romaji: "sushi", meaning: "壽司", level: "N5", category: "food_culture",
    sentences: [{ ja: "北海道でお寿司を食べました。", furigana: "ほっかいどうでおすしをたべました。", en: "在北海道吃了壽司。" }] },
  { id: "v_sashimi", word: "刺身", furigana: "さしみ", romaji: "sashimi", meaning: "生魚片", level: "N4", category: "food_culture",
    sentences: [{ ja: "マグロの刺身が一番好きです。", furigana: "まぐろのさしみがいちばんすきです。", en: "最喜歡鮪魚生魚片。" }] },
  { id: "v_misoshiru", word: "味噌汁", furigana: "みそしる", romaji: "misoshiru", meaning: "味噌湯", level: "N4", category: "food_culture",
    sentences: [{ ja: "毎朝、ご飯と味噌汁を食べます。", furigana: "まいあさ、ごはんとみそしるをたべます。", en: "每天早上吃飯配味噌湯。" }] },
  { id: "v_onigiri", word: "おにぎり", furigana: "おにぎり", romaji: "onigiri", meaning: "飯糰", level: "N5", category: "food_culture",
    sentences: [{ ja: "コンビニで鮭のおにぎりを買いました。", furigana: "こんびにでさけのおにぎりをかいました。", en: "在便利商店買了鮭魚飯糰。" }] },
  { id: "v_sarada", word: "サラダ", furigana: "さらだ", romaji: "sarada", meaning: "沙拉", level: "N5", category: "food_culture",
    sentences: [{ ja: "野菜サラダを作りました。", furigana: "やさいさらだをつくりました。", en: "做了蔬菜沙拉。" }] },

  // ================= 甜點零食 (Snacks & Desserts) =================
  { id: "v_okashi", word: "お菓子", furigana: "おかし", romaji: "okashi", meaning: "零食 / 點心", level: "N5", category: "food_culture",
    sentences: [{ ja: "子供たちにお菓子をあげます。", furigana: "こどもたちにおかしをあげます。", en: "給孩子們零食。" }] },
  { id: "v_keeki", word: "ケーキ", furigana: "けーき", romaji: "keeki", meaning: "蛋糕", level: "N5", category: "food_culture",
    sentences: [{ ja: "誕生日にケーキを買いました。", furigana: "たんじょうびにけーきをかいました。", en: "生日買了蛋糕。" }] },
  { id: "v_aisukuriimu", word: "アイスクリーム", furigana: "あいすくりーむ", romaji: "aisukuriimu", meaning: "冰淇淋", level: "N5", category: "food_culture",
    sentences: [{ ja: "暑いのでアイスクリームが食べたいです。", furigana: "あついのであいすくりーむがたべたいです。", en: "因為很熱所以想吃冰淇淋。" }] },
  { id: "v_chokoreeto", word: "チョコレート", furigana: "ちょこれーと", romaji: "chokoreeto", meaning: "巧克力", level: "N5", category: "food_culture",
    sentences: [{ ja: "バレンタインにチョコレートをもらいました。", furigana: "ばれんたいんにちょこれーとをもらいました。", en: "情人節收到了巧克力。" }] },

  // ================= 外食與結帳 (Dining Out & Payment) =================
  { id: "v_menyuu", word: "メニュー", furigana: "めにゅー", romaji: "menyuu", meaning: "菜單", level: "N5", category: "food_culture",
    sentences: [{ ja: "すみません、メニューを見せてください。", furigana: "すみません、めにゅーをみせてください。", en: "不好意思，請讓我看一下菜單。" }] },
  { id: "v_chuumon", word: "注文", furigana: "ちゅうもん", romaji: "chuumon", meaning: "點餐 / 訂購", level: "N4", category: "food_culture",
    sentences: [{ ja: "レストランでハンバーグを注文しました。", furigana: "れすとらんではんばーぐをちゅうもんしました。", en: "在餐廳點了漢堡排。" }] },
  { id: "v_okaikei", word: "お会計", furigana: "おかいけい", romaji: "okaikei", meaning: "結帳", level: "N5", category: "food_culture",
    sentences: [{ ja: "お会計をお願いします。", furigana: "おかいけいをおねがいします。", en: "麻煩結帳。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = foodWordsPart2.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'food & dining words (part 2) to data_n5.js!');
