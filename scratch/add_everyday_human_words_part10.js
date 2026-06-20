const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart10 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_hadaka", word: "裸", furigana: "はだか", romaji: "hadaka", meaning: "裸體", level: "N4", category: "body_physiology",
    sentences: [{ ja: "お風呂に入る時は裸になります。", furigana: "おふろにはいるときははだかになります。", en: "洗澡的時候要光著身子。" }] },
  { id: "v_kuse", word: "癖", furigana: "くせ", romaji: "kuse", meaning: "習慣 / 癖好", level: "N4", category: "body_physiology",
    sentences: [{ ja: "髪を触るのが彼の癖です。", furigana: "かみをさわるのがかれのくせです。", en: "摸頭髮是他的習慣。" }] },
  { id: "v_neguse", word: "寝癖", furigana: "ねぐせ", romaji: "neguse", meaning: "剛起床的亂髮 / 睡相", level: "N4", category: "body_physiology",
    sentences: [{ ja: "朝起きると、ひどい寝癖がついていました。", furigana: "あさおきると、ひどいねぐせがついていました。", en: "早上起床發現頭髮睡得亂七八糟。" }] },
  { id: "v_sakebu", word: "叫ぶ", furigana: "さけぶ", romaji: "sakebu", meaning: "叫喊 / 大叫", level: "N4", category: "body_physiology",
    sentences: [{ ja: "びっくりして大きな声で叫びました。", furigana: "びっくりしておおきなこえでさけびました。", en: "嚇了一跳而大聲叫了出來。" }] },
  { id: "v_sawaru", word: "触る", furigana: "さわる", romaji: "sawaru", meaning: "觸摸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "展示品に触らないでください。", furigana: "てんじひんにさわらないでください。", en: "請不要觸摸展示品。" }] },
  { id: "v_naderu", word: "撫でる", furigana: "なでる", romaji: "naderu", meaning: "撫摸", level: "N4", category: "body_physiology",
    sentences: [{ ja: "可愛い犬の頭を撫でました。", furigana: "かわいいいぬのあたまをなでました。", en: "摸了摸可愛狗狗的頭。" }] },
  { id: "v_tataku", word: "叩く", furigana: "たたく", romaji: "tataku", meaning: "拍打 / 敲", level: "N4", category: "body_physiology",
    sentences: [{ ja: "ドアをトントンと叩きました。", furigana: "どあをとんとんとたたきました。", en: "咚咚咚地敲了門。" }] },
  { id: "v_keru", word: "蹴る", furigana: "ける", romaji: "keru", meaning: "踢", level: "N4", category: "body_physiology",
    sentences: [{ ja: "怒ってゴミ箱を蹴りました。", furigana: "おこってごみばこをけりました。", en: "生氣地踢了垃圾桶。" }] },
  { id: "v_nameru", word: "舐める", furigana: "なめる", romaji: "nameru", meaning: "舔", level: "N4", category: "body_physiology",
    sentences: [{ ja: "猫がミルクを舐めています。", furigana: "ねこがみるくをなめています。", en: "貓正在舔牛奶。" }] },
  { id: "v_daku", word: "抱く", furigana: "だく", romaji: "daku", meaning: "擁抱 / 抱著", level: "N4", category: "body_physiology",
    sentences: [{ ja: "母親が赤ちゃんを優しく抱いています。", furigana: "ははおやがあかちゃんをやさしくだいています。", en: "母親溫柔地抱著嬰兒。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_guai", word: "具合", furigana: "ぐあい", romaji: "guai", meaning: "身體狀況", level: "N5", category: "health_medical",
    sentences: [{ ja: "今日は少し体の具合が悪いです。", furigana: "きょうはすこしからだのぐあいがわるいです。", en: "今天身體狀況有點不好。" }] },
  { id: "v_tairyoku", word: "体力", furigana: "たいりょく", romaji: "tairyoku", meaning: "體力", level: "N4", category: "health_medical",
    sentences: [{ ja: "病気の後は体力が落ちます。", furigana: "びょうきのあとはたいりょくがおちます。", en: "生病之後體力會下降。" }] },
  { id: "v_shokuyoku", word: "食欲", furigana: "しょくよく", romaji: "shokuyoku", meaning: "食慾", level: "N4", category: "health_medical",
    sentences: [{ ja: "夏は暑くて食欲がありません。", furigana: "なつはあつくてしょくよくがありません。", en: "夏天太熱了沒有食慾。" }] },
  { id: "v_tsukare", word: "疲れ", furigana: "つかれ", romaji: "tsukare", meaning: "疲勞 (名詞)", level: "N4", category: "health_medical",
    sentences: [{ ja: "お風呂に入って一日の疲れをとります。", furigana: "おふろにはっていちにちのつかれをとります。", en: "泡個澡消除一天的疲勞。" }] },
  { id: "v_kega", word: "怪我", furigana: "けが", romaji: "kega", meaning: "受傷 (名詞)", level: "N5", category: "health_medical",
    sentences: [{ ja: "スポーツをしていて足に怪我をしました。", furigana: "すぽーつをしていてあしにけがをしました。", en: "做運動時腳受傷了。" }] },
  { id: "v_yakedo", word: "火傷", furigana: "やけど", romaji: "yakedo", meaning: "燙傷", level: "N4", category: "health_medical",
    sentences: [{ ja: "熱いお茶をこぼして火傷しました。", furigana: "あついおちゃをこぼしてやけどしました。", en: "打翻熱茶燙傷了。" }] },
  { id: "v_kossetsu", word: "骨折", furigana: "こっせつ", romaji: "kossetsu", meaning: "骨折", level: "N4", category: "health_medical",
    sentences: [{ ja: "スキーで転んで腕を骨折しました。", furigana: "すきーでころんでうでをこっせつしました。", en: "滑雪跌倒手臂骨折了。" }] },
  { id: "v_ketsuatsu", word: "血圧", furigana: "けつあつ", romaji: "ketsuatsu", meaning: "血壓", level: "N4", category: "health_medical",
    sentences: [{ ja: "病院で血圧を測ります。", furigana: "びょういんでけつあつをはかります。", en: "在醫院量血壓。" }] },
  { id: "v_taion", word: "体温", furigana: "たいおん", romaji: "taion", meaning: "體溫", level: "N4", category: "health_medical",
    sentences: [{ ja: "私の平熱（普通の体温）は３６度です。", furigana: "わたしのへいねつ（ふつうのたいおん）はさんじゅうろくどです。", en: "我的平時體溫是36度。" }] },
  { id: "v_kangoshi", word: "看護師", furigana: "かんごし", romaji: "kangoshi", meaning: "護理師 / 護士", level: "N4", category: "health_medical",
    sentences: [{ ja: "優しい看護師さんが世話をしてくれました。", furigana: "やさしいかんごしさんがせわをしてくれました。", en: "溫柔的護理師照顧了我。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_yume", word: "夢", furigana: "ゆめ", romaji: "yume", meaning: "夢 / 夢想", level: "N5", category: "psychology_character",
    sentences: [{ ja: "昨日の夜、怖い夢を見ました。", furigana: "きのうのよる、こわいゆめをみました。", en: "昨天晚上做了個可怕的夢。" }] },
  { id: "v_uso", word: "嘘", furigana: "うそ", romaji: "uso", meaning: "謊言", level: "N5", category: "psychology_character",
    sentences: [{ ja: "嘘をついてはいけません。", furigana: "うそをついてはいけません。", en: "不可以說謊。" }] },
  { id: "v_himitsu", word: "秘密", furigana: "ひみつ", romaji: "himitsu", meaning: "秘密", level: "N4", category: "psychology_character",
    sentences: [{ ja: "これは二人だけの秘密です。", furigana: "これはふたりだけのひみつです。", en: "這是只有我們兩人的秘密。" }] },
  { id: "v_yakusoku", word: "約束", furigana: "やくそく", romaji: "yakusoku", meaning: "約定 / 承諾", level: "N5", category: "psychology_character",
    sentences: [{ ja: "明日遊ぶ約束をしました。", furigana: "あしたあそぶやくそくをしました。", en: "約好了明天要一起玩。" }] },
  { id: "v_ayamaru", word: "謝る", furigana: "あやまる", romaji: "ayamaru", meaning: "道歉", level: "N4", category: "psychology_character",
    sentences: [{ ja: "自分が悪い時は、すぐに謝りましょう。", furigana: "じぶんがわるいときは、すぐにあやまりましょう。", en: "自己有錯的時候，就馬上道歉吧。" }] },
  { id: "v_yurusu", word: "許す", furigana: "ゆるす", romaji: "yurusu", meaning: "原諒", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼のしたことは絶対に許せません。", furigana: "かれのしたことはぜったいにゆるせません。", en: "絕對無法原諒他做的事。" }] },
  { id: "v_utagau", word: "疑う", furigana: "うたがう", romaji: "utagau", meaning: "懷疑", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼の話を少し疑っています。", furigana: "かれのはなしをすこしうたがっています。", en: "有點懷疑他的話。" }] },
  { id: "v_ochikomu", word: "落ち込む", furigana: "おちこむ", romaji: "ochikomu", meaning: "沮喪 / 陷入低潮", level: "N4", category: "psychology_character",
    sentences: [{ ja: "テストの点数が悪くて落ち込んでいます。", furigana: "てすとのてんすがわるくておちこんでいます。", en: "因為考試分數很差而感到沮喪。" }] },
  { id: "v_awateru", word: "慌てる", furigana: "あわてる", romaji: "awateru", meaning: "慌張 / 手忙腳亂", level: "N4", category: "psychology_character",
    sentences: [{ ja: "地震の時は慌てないでください。", furigana: "じしんのときはあわてないでください。", en: "地震的時候請不要慌張。" }] },
  { id: "v_kuyashii", word: "悔しい", furigana: "くやしい", romaji: "kuyashii", meaning: "不甘心的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "試合に負けてとても悔しいです。", furigana: "しあいにまけてとてもくやしいです。", en: "比賽輸了非常不甘心。" }] },
  { id: "v_hazukashii", word: "恥ずかしい", furigana: "はずかしい", romaji: "hazukashii", meaning: "害羞的 / 丟臉的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "みんなの前で歌うのは恥ずかしいです。", furigana: "みんなのまえでうたうのははずかしいです。", en: "在大家面前唱歌很害羞。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart10.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 10) to data_n5.js!');
