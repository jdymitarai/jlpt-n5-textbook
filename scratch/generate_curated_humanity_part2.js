const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const newWords = [
  // --- 常見疾病與常規醫療 ---
  {
    id: "v_n5_body_21",
    word: "風邪",
    furigana: "かぜ",
    romaji: "kaze",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "感冒",
    sentences: [
      { ja: "昨日から風邪を引いています。", furigana: "きのうからかぜをひいています。", en: "我從昨天開始就感冒了。" },
      { ja: "風邪ですから、今日は学校を休みます。", furigana: "かぜですから、きょうはがっこうをやすみます。", en: "因為感冒，今天向學校請假。" }
    ]
  },
  {
    id: "v_n5_body_22",
    word: "薬",
    furigana: "くすり",
    romaji: "kusuri",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "藥",
    sentences: [
      { ja: "ご飯の後で、この薬を飲んでください。", furigana: "ごはんのあとで、このくすりをのんでください。", en: "請在飯後吃（喝）這包藥。" },
      { ja: "頭が痛いので、薬を買いたいです。", furigana: "あたまがいたいので、くすりをかいたいです。", en: "因為頭痛，所以想去買藥。" }
    ]
  },
  {
    id: "v_n5_body_23",
    word: "病院",
    furigana: "びょういん",
    romaji: "byouin",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "醫院",
    sentences: [
      { ja: "熱があるので、病院へ行きます。", furigana: "ねつがあるので、びょういんへいきます。", en: "因為發燒了，所以要去醫院。" },
      { ja: "あの大きな白い建物が病院です。", furigana: "あのおおきなしろいたてものがびょういんです。", en: "那棟白色的大建築物就是醫院。" }
    ]
  },
  {
    id: "v_n5_body_24",
    word: "医者",
    furigana: "いしゃ",
    romaji: "isha",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "醫生",
    sentences: [
      { ja: "私の父は医者です。", furigana: "わたしのちちはいしゃです。", en: "我的父親是醫生。" },
      { ja: "早く医者に診てもらった方がいいですよ。", furigana: "はやくいしゃにみてもらったほうがいいですよ。", en: "你最好早點去給醫生看診喔。" }
    ]
  },
  {
    id: "v_n5_body_25",
    word: "病気",
    furigana: "びょうき",
    romaji: "byouki",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "生病 / 疾病",
    sentences: [
      { ja: "友達が病気になりました。", furigana: "ともだちがびょうきになりました。", en: "朋友生病了。" },
      { ja: "病気の時はよく寝てください。", furigana: "びょうきのときはよくねてください。", en: "生病的時候請多睡覺休息。" }
    ]
  },
  {
    id: "v_n5_body_26",
    word: "怪我",
    furigana: "けが",
    romaji: "kega",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "受傷",
    sentences: [
      { ja: "スポーツをしていて、足に怪我をしました。", furigana: "すぽーつをしていて、あしにけがをしました。", en: "做運動的時候，腳受傷了。" },
      { ja: "怪我はないですか？", furigana: "けがはないですか？", en: "你有沒有受傷？" }
    ]
  },
  {
    id: "v_n5_body_27",
    word: "休む",
    furigana: "やすむ",
    romaji: "yasumu",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "休息 / 請假",
    sentences: [
      { ja: "少し疲れたので、あのベンチで休みましょう。", furigana: "すこしつかれたので、あのべんちでやすみましょう。", en: "有點累了，我們去那張長椅上休息一下吧。" },
      { ja: "明日、仕事を休みます。", furigana: "あした、しごとをやすみます。", en: "明天我工作要請假。" }
    ]
  },

  // --- 心理、情感與性格 ---
  {
    id: "v_n5_body_28",
    word: "泣く",
    furigana: "なく",
    romaji: "naku",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "哭泣",
    sentences: [
      { ja: "赤ちゃんが大きな声で泣いています。", furigana: "あかちゃんがおおきなこえでないています。", en: "小嬰兒正大聲地哭著。" },
      { ja: "悲しい映画を見て、たくさん泣きました。", furigana: "かなしいえいがをみて、たくさんなきました。", en: "看了悲傷的電影，大哭了一場。" }
    ]
  },
  {
    id: "v_n5_body_29",
    word: "笑う",
    furigana: "わらう",
    romaji: "warau",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "笑",
    sentences: [
      { ja: "彼女が笑うと、とても可愛いです。", furigana: "かのじょがわらうと、とてもかわいいです。", en: "她笑起來非常可愛。" },
      { ja: "テレビを見て、みんなで笑いました。", furigana: "てれびをみて、みんなでわらいました。", en: "看著電視，大家都笑了。" }
    ]
  },
  {
    id: "v_n5_body_30",
    word: "怒る",
    furigana: "おこる",
    romaji: "okoru",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "生氣 / 發怒",
    sentences: [
      { ja: "宿題を忘れて、先生に怒られました。", furigana: "しゅくだいをわすれて、せんせいにおこられました。", en: "因為忘記帶作業，被老師罵（惹老師生氣）了。" },
      { ja: "そんなに怒らないでください。", furigana: "そんなにおこらないでください。", en: "請不要那麼生氣。" }
    ]
  },
  {
    id: "v_n5_body_31",
    word: "楽しい",
    furigana: "たのしい",
    romaji: "tanoshii",
    type: "i-adjective",
    category: "人類自身",
    level: "N5",
    meaning: "快樂的 / 有趣的",
    sentences: [
      { ja: "昨日のパーティーはとても楽しかったです。", furigana: "きのうのぱーてぃーはとてもたのしかったです。", en: "昨天的派對非常開心。" },
      { ja: "毎日日本語を勉強するのは楽しいです。", furigana: "まいにちにほんごをべんきょうするのはたのしいです。", en: "每天學日文很快樂。" }
    ]
  },
  {
    id: "v_n5_body_32",
    word: "悲しい",
    furigana: "かなしい",
    romaji: "kanashii",
    type: "i-adjective",
    category: "人類自身",
    level: "N5",
    meaning: "悲傷的 / 難過的",
    sentences: [
      { ja: "犬が死んで、とても悲しいです。", furigana: "いぬがしんで、とてもかなしいです。", en: "狗死掉了，我非常難過。" },
      { ja: "悲しいニュースを聞きました。", furigana: "かなしいにゅーすをききました。", en: "聽到了令人悲傷的新聞。" }
    ]
  },
  {
    id: "v_n5_body_33",
    word: "優しい",
    furigana: "やさしい",
    romaji: "yasashii",
    type: "i-adjective",
    category: "人類自身",
    level: "N5",
    meaning: "溫柔的 / 親切的",
    sentences: [
      { ja: "私の母はとても優しい人です。", furigana: "わたしのはははとてもやさしいひとです。", en: "我的媽媽是個非常溫柔的人。" },
      { ja: "おばあさんに席を譲る、優しい男の子を見ました。", furigana: "おばあさんにせきをゆずる、やさしいおとこのこをみました。", en: "我看到一個讓座給老奶奶的溫柔男孩。" }
    ]
  },
  {
    id: "v_n5_body_34",
    word: "覚える",
    furigana: "おぼえる",
    romaji: "oboeru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    meaning: "記住 / 記憶",
    sentences: [
      { ja: "新しい漢字をたくさん覚えました。", furigana: "あたらしいかんじをたくさんおぼえました。", en: "記住了很多新的漢字。" },
      { ja: "あの人の名前を覚えていますか？", furigana: "あのひとのなまえをおぼえていますか？", en: "你還記得那個人的名字嗎？" }
    ]
  },
  {
    id: "v_n5_body_35",
    word: "忘れる",
    furigana: "わすれる",
    romaji: "wasureru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    meaning: "忘記",
    sentences: [
      { ja: "電車の中に傘を忘れました。", furigana: "でんしゃのなかにかさをわすれました。", en: "把傘忘在電車裡了。" },
      { ja: "今日の約束を忘れないでくださいね。", furigana: "きょうのやくそくをわすれないでくださいね。", en: "請不要忘記今天的約定喔。" }
    ]
  },
  {
    id: "v_n5_body_36",
    word: "思う",
    furigana: "おもう",
    romaji: "omou",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "覺得 / 認為",
    sentences: [
      { ja: "明日は雨が降ると思います。", furigana: "あしたはあめがふるとおもいます。", en: "我覺得明天會下雨。" },
      { ja: "私はこのパソコンがいいと思います。", furigana: "わたしはこのぱそこんがいいとおもいます。", en: "我認為這台電腦不錯。" }
    ]
  },
  {
    id: "v_n5_body_37",
    word: "考える",
    furigana: "かんがえる",
    romaji: "kangaeru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    meaning: "思考 / 考慮",
    sentences: [
      { ja: "将来のことについて考えています。", furigana: "しょうらいのことについてかんがえています。", en: "我正在思考關於未來的事。" },
      { ja: "よく考えてから答えてください。", furigana: "よくかんがえてからこたえてください。", en: "請仔細思考後再回答。" }
    ]
  },

  // --- 身體動作與姿態 ---
  {
    id: "v_n5_body_38",
    word: "寝る",
    furigana: "ねる",
    romaji: "neru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    meaning: "睡覺",
    sentences: [
      { ja: "毎晩11時に寝ます。", furigana: "まいばんじゅういちじにねます。", en: "每晚十一點睡覺。" },
      { ja: "疲れたので、早く寝たいです。", furigana: "つかれたので、はやくねたいです。", en: "因為累了，所以想早點睡覺。" }
    ]
  },
  {
    id: "v_n5_body_39",
    word: "起きる",
    furigana: "おきる",
    romaji: "okiru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    meaning: "起床 / 醒來",
    sentences: [
      { ja: "今朝は6時に起きました。", furigana: "けさはろくじにおきました。", en: "今天早上六點起床了。" },
      { ja: "朝早く起きるのは大変です。", furigana: "あさはやくおきるのはたいへんです。", en: "一大早起床很辛苦。" }
    ]
  },
  {
    id: "v_n5_body_40",
    word: "歩く",
    furigana: "あるく",
    romaji: "aruku",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "走路 / 步行",
    sentences: [
      { ja: "駅から家まで10分歩きます。", furigana: "えきからいえまでじゅっぷんあるきます。", en: "從車站走路到家要十分鐘。" },
      { ja: "天気がいいので、公園を歩きましょう。", furigana: "てんきがいいので、こうえんをあるきましょう。", en: "因為天氣很好，我們去公園散步（走走）吧。" }
    ]
  },
  {
    id: "v_n5_body_41",
    word: "走る",
    furigana: "はしる",
    romaji: "hashiru",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "跑步",
    sentences: [
      { ja: "電車に遅れそうなので、駅まで走りました。", furigana: "でんしゃにおくれそうなので、えきまではしりました。", en: "因為快趕不上電車了，所以一路跑到車站。" },
      { ja: "廊下を走らないでください。", furigana: "ろうかをはしらないでください。", en: "請不要在走廊上奔跑。" }
    ]
  },
  {
    id: "v_n5_body_42",
    word: "座る",
    furigana: "すわる",
    romaji: "suwaru",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "坐下",
    sentences: [
      { ja: "どうぞ、この椅子に座ってください。", furigana: "どうぞ、このいすにすわってください。", en: "請坐這張椅子。" },
      { ja: "床に座ってテレビを見ます。", furigana: "ゆかにすわっててれびをみます。", en: "坐在地板上看電視。" }
    ]
  },
  {
    id: "v_n5_body_43",
    word: "立つ",
    furigana: "たつ",
    romaji: "tatsu",
    type: "verb",
    verbGroup: 1,
    category: "人類自身",
    level: "N5",
    meaning: "站立",
    sentences: [
      { ja: "名前を呼ばれたら、立ってください。", furigana: "なまえをよばれたら、たってください。", en: "被叫到名字的話，請站起來。" },
      { ja: "電車に人が多くて、ずっと立っていました。", furigana: "でんしゃにひとがおおくて、ずっとたっていました。", en: "電車上人很多，所以我一直站著。" }
    ]
  }
];

function buildConjugations(wordData) {
  if (wordData.type === 'verb') {
    if (wordData.word === "休む") return { word: "休む", furigana: "やすむ", romaji: "yasumu", group: 1, conjugations: { masu: { jp: "休みます", furigana: "やすみます" }, te: { jp: "休んで", furigana: "やすんで" }, nai: { jp: "休まない", furigana: "やすまない" }, ta: { jp: "休んだ", furigana: "やすんだ" } } };
    if (wordData.word === "泣く") return { word: "泣く", furigana: "なく", romaji: "naku", group: 1, conjugations: { masu: { jp: "泣きます", furigana: "なきます" }, te: { jp: "泣いて", furigana: "ないて" }, nai: { jp: "泣かない", furigana: "なかない" }, ta: { jp: "泣いた", furigana: "ないた" } } };
    if (wordData.word === "笑う") return { word: "笑う", furigana: "わらう", romaji: "warau", group: 1, conjugations: { masu: { jp: "笑います", furigana: "わらいます" }, te: { jp: "笑って", furigana: "わらって" }, nai: { jp: "笑わない", furigana: "わらわない" }, ta: { jp: "笑った", furigana: "わらった" } } };
    if (wordData.word === "怒る") return { word: "怒る", furigana: "おこる", romaji: "okoru", group: 1, conjugations: { masu: { jp: "怒ります", furigana: "おこります" }, te: { jp: "怒って", furigana: "おこって" }, nai: { jp: "怒らない", furigana: "おこらない" }, ta: { jp: "怒った", furigana: "おこった" } } };
    if (wordData.word === "覚える") return { word: "覚える", furigana: "おぼえる", romaji: "oboeru", group: 2, conjugations: { masu: { jp: "覚えます", furigana: "おぼえます" }, te: { jp: "覚えて", furigana: "おぼえて" }, nai: { jp: "覚えない", furigana: "おぼえない" }, ta: { jp: "覚えた", furigana: "おぼえた" } } };
    if (wordData.word === "忘れる") return { word: "忘れる", furigana: "わすれる", romaji: "wasureru", group: 2, conjugations: { masu: { jp: "忘れます", furigana: "わすれます" }, te: { jp: "忘れて", furigana: "わすれて" }, nai: { jp: "忘れない", furigana: "わすれない" }, ta: { jp: "忘れた", furigana: "わすれた" } } };
    if (wordData.word === "思う") return { word: "思う", furigana: "おもう", romaji: "omou", group: 1, conjugations: { masu: { jp: "思います", furigana: "おもいます" }, te: { jp: "思って", furigana: "おもって" }, nai: { jp: "思わない", furigana: "おもわない" }, ta: { jp: "思った", furigana: "おもった" } } };
    if (wordData.word === "考える") return { word: "考える", furigana: "かんがえる", romaji: "kangaeru", group: 2, conjugations: { masu: { jp: "考えます", furigana: "かんがえます" }, te: { jp: "考えて", furigana: "かんがえて" }, nai: { jp: "考えない", furigana: "かんがえない" }, ta: { jp: "考えた", furigana: "かんがえた" } } };
    if (wordData.word === "寝る") return { word: "寝る", furigana: "ねる", romaji: "neru", group: 2, conjugations: { masu: { jp: "寝ます", furigana: "ねます" }, te: { jp: "寝て", furigana: "ねて" }, nai: { jp: "寝ない", furigana: "ねない" }, ta: { jp: "寝た", furigana: "ねた" } } };
    if (wordData.word === "起きる") return { word: "起きる", furigana: "おきる", romaji: "okiru", group: 2, conjugations: { masu: { jp: "起きます", furigana: "おきます" }, te: { jp: "起きて", furigana: "おきて" }, nai: { jp: "起きない", furigana: "おきない" }, ta: { jp: "起きた", furigana: "おきた" } } };
    if (wordData.word === "歩く") return { word: "歩く", furigana: "あるく", romaji: "aruku", group: 1, conjugations: { masu: { jp: "歩きます", furigana: "あるきます" }, te: { jp: "歩いて", furigana: "あるいて" }, nai: { jp: "歩かない", furigana: "あるかない" }, ta: { jp: "歩いた", furigana: "あるいた" } } };
    if (wordData.word === "走る") return { word: "走る", furigana: "はしる", romaji: "hashiru", group: 1, conjugations: { masu: { jp: "走ります", furigana: "はしります" }, te: { jp: "走って", furigana: "はしって" }, nai: { jp: "走らない", furigana: "はしらない" }, ta: { jp: "走った", furigana: "はしった" } } };
    if (wordData.word === "座る") return { word: "座る", furigana: "すわる", romaji: "suwaru", group: 1, conjugations: { masu: { jp: "座ります", furigana: "すわります" }, te: { jp: "座って", furigana: "すわって" }, nai: { jp: "座らない", furigana: "すわらない" }, ta: { jp: "座った", furigana: "すわった" } } };
    if (wordData.word === "立つ") return { word: "立つ", furigana: "たつ", romaji: "tatsu", group: 1, conjugations: { masu: { jp: "立ちます", furigana: "たちます" }, te: { jp: "立って", furigana: "たって" }, nai: { jp: "立たない", furigana: "たたない" }, ta: { jp: "立った", furigana: "たった" } } };
  } else if (wordData.type === 'i-adjective') {
    if (wordData.word === "楽しい") return { word: "楽しい", furigana: "たのしい", romaji: "tanoshii", type: "i-adjective", conjugations: { present: { jp: "楽しいです", furigana: "たのしいです" }, past: { jp: "楽しかったです", furigana: "たのしかったです" }, negative: { jp: "楽しくないです", furigana: "たのしくないです" }, pastNegative: { jp: "楽しくなかったです", furigana: "たのしくなかったです" }, teForm: { jp: "楽しくて", furigana: "たのしくて" } } };
    if (wordData.word === "悲しい") return { word: "悲しい", furigana: "かなしい", romaji: "kanashii", type: "i-adjective", conjugations: { present: { jp: "悲しいです", furigana: "かなしいです" }, past: { jp: "悲しかったです", furigana: "かなしかったです" }, negative: { jp: "悲しくないです", furigana: "かなしくないです" }, pastNegative: { jp: "悲しくなかったです", furigana: "かなしくなかったです" }, teForm: { jp: "悲しくて", furigana: "かなしくて" } } };
    if (wordData.word === "優しい") return { word: "優しい", furigana: "やさしい", romaji: "yasashii", type: "i-adjective", conjugations: { present: { jp: "優しいです", furigana: "やさしいです" }, past: { jp: "優しかったです", furigana: "やさしかったです" }, negative: { jp: "優しくないです", furigana: "やさしくないです" }, pastNegative: { jp: "優しくなかったです", furigana: "やさしくなかったです" }, teForm: { jp: "優しくて", furigana: "やさしくて" } } };
  }
  return null;
}

// Read existing
const n5Content = fs.readFileSync(n5File, 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);

const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Append new words
for (const w of newWords) {
  db.vocabulary.push(w);
  const conj = buildConjugations(w);
  if (conj) {
    if (w.type === 'verb') {
      db.verbConjugations.push(conj);
    } else if (w.type === 'i-adjective') {
      db.adjectiveGroups.iAdjectives.push(conj);
    } else if (w.type === 'na-adjective') {
      db.adjectiveGroups.naAdjectives.push(conj);
    }
  }
}

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log(`Successfully added ${newWords.length} more words to '人類自身' (Body/Mind).`);
