const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const newWords = [
  // --- 身體與生理 (body_physiology) ---
  {
    id: "vocab_tsume",
    word: "爪",
    furigana: "つめ",
    romaji: "tsume",
    meaning: "指甲",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "爪を切ります。", furigana: "つめをきります。", en: "剪指甲。" },
      { ja: "彼女の爪はとてもきれいです。", furigana: "かのじょのつめはとてもきれいです。", en: "她的指甲非常漂亮。" }
    ]
  },
  {
    id: "vocab_hone",
    word: "骨",
    furigana: "ほね",
    romaji: "hone",
    meaning: "骨頭",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "魚の骨に気をつけてください。", furigana: "さかなのほねにきをつけてください。", en: "請小心魚刺（魚骨頭）。" },
      { ja: "転んで足の骨を折りました。", furigana: "ころんであしのほねをお折りました。", en: "跌倒折斷了腳骨。" }
    ]
  },
  {
    id: "vocab_chi",
    word: "血",
    furigana: "ち",
    romaji: "chi",
    meaning: "血",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "指から血が出ています。", furigana: "ゆびからちがでています。", en: "手指在流血。" },
      { ja: "私は血を見るのが怖いです。", furigana: "わたしはちをみるのがこわいです。", en: "我很害怕看到血。" }
    ]
  },
  {
    id: "vocab_nodo",
    word: "喉",
    furigana: "のど",
    romaji: "nodo",
    meaning: "喉嚨",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "喉が渇きました。", furigana: "のどがかわきました。", en: "我口渴了。" },
      { ja: "風邪で喉が痛いです。", furigana: "かぜでのどがいたいです。", en: "因為感冒喉嚨很痛。" }
    ]
  },
  {
    id: "vocab_iki",
    word: "息",
    furigana: "いき",
    romaji: "iki",
    meaning: "呼吸、氣息",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "大きく息を吸ってください。", furigana: "おおきくいきをすってください。", en: "請深呼吸（大口吸氣）。" },
      { ja: "走ったので、息が苦しいです。", furigana: "はしったので、いきがくるしいです。", en: "因為跑了步，呼吸有點困難。" }
    ]
  },
  {
    id: "vocab_ase",
    word: "汗",
    furigana: "あせ",
    romaji: "ase",
    meaning: "汗水",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "暑くて、汗をたくさんかきました。", furigana: "あつくて、あせをたくさんかきました。", en: "好熱，流了好多汗。" },
      { ja: "タオルで汗を拭いてください。", furigana: "たおるであせをふいてください。", en: "請用毛巾把汗擦一擦。" }
    ]
  },
  {
    id: "vocab_namida",
    word: "涙",
    furigana: "なみだ",
    romaji: "namida",
    meaning: "眼淚",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "映画を見て、涙が出ました。", furigana: "えいがをみて、なみだが出ました。", en: "看了電影，流下了眼淚。" },
      { ja: "涙を拭いて、笑ってください。", furigana: "なみだをふいて、わらってください。", en: "擦乾眼淚，笑一個吧。" }
    ]
  },
  {
    id: "vocab_koe",
    word: "声",
    furigana: "こえ",
    romaji: "koe",
    meaning: "聲音",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "あの人は声が大きいです。", furigana: "あのひとはこえがおおきいです。", en: "那個人聲音很大。" },
      { ja: "先生のきれいな声が好きです。", furigana: "せんせいのきれいなこえがすきです。", en: "我喜歡老師好聽的聲音。" }
    ]
  },
  {
    id: "vocab_yume",
    word: "夢",
    furigana: "ゆめ",
    romaji: "yume",
    meaning: "夢想、夢境",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "昨日の夜、怖い夢を見ました。", furigana: "きのうのよる、こわいゆめをみました。", en: "昨天晚上做了一個可怕的夢。" },
      { ja: "私の夢は医者になることです。", furigana: "わたしのゆめはいしゃになることです。", en: "我的夢想是成為醫生。" }
    ]
  },

  // --- 健康與醫療 (health_medical) ---
  {
    id: "vocab_arerugi",
    word: "アレルギー",
    furigana: "あれるぎー",
    romaji: "arerugi-",
    meaning: "過敏",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "私は卵のアレルギーがあります。", furigana: "わたしはたまごのあれるぎーがあります。", en: "我對雞蛋過敏。" },
      { ja: "春は花粉のアレルギーで大変です。", furigana: "はるはかふんのあれるぎーでたいへんです。", en: "春天因為花粉過敏所以很辛苦。" }
    ]
  },
  {
    id: "vocab_seki",
    word: "咳",
    furigana: "せき",
    romaji: "seki",
    meaning: "咳嗽",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "昨日から咳が止まりません。", furigana: "きのうからせきがとまりません。", en: "從昨天開始咳嗽就停不下來。" },
      { ja: "咳が出るので、マスクをします。", furigana: "せきがでるので、ますくをします。", en: "因為會咳嗽，所以戴上口罩。" }
    ]
  },
  {
    id: "vocab_netsu",
    word: "熱",
    furigana: "ねつ",
    romaji: "netsu",
    meaning: "發燒、熱度",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "熱があるので、今日は早く寝ます。", furigana: "ねつがあるので、きょうははやくねます。", en: "因為發燒了，所以今天早點睡。" },
      { ja: "薬を飲んで、熱が下がりました。", furigana: "くすりをのんで、ねつがさがりました。", en: "吃了藥之後，燒退了。" }
    ]
  },
  {
    id: "vocab_naoru",
    word: "治る",
    furigana: "なおる",
    romaji: "naoru",
    meaning: "痊癒、治好",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "風邪はもう治りましたか。", furigana: "かぜはもうなおりましたか。", en: "感冒已經好了嗎？" },
      { ja: "早く病気が治るように祈っています。", furigana: "はやくびょうきがなおるようにいのっています。", en: "祈禱您的病早日康復。" }
    ]
  },
  {
    id: "vocab_chuusha",
    word: "注射",
    furigana: "ちゅうしゃ",
    romaji: "chuusha",
    meaning: "打針、注射",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "病院で注射をしました。", furigana: "びょういんでちゅうしゃをしました。", en: "在醫院打了針。" },
      { ja: "子供は注射が嫌いです。", furigana: "こどもはちゅうしゃがきらいです。", en: "小孩子討厭打針。" }
    ]
  },
  {
    id: "vocab_nyuuin",
    word: "入院",
    furigana: "にゅういん",
    romaji: "nyuuin",
    meaning: "住院",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "父は病気で入院しています。", furigana: "ちちはびょうきでにゅういんしています。", en: "父親因為生病正在住院。" },
      { ja: "明日から一週間入院します。", furigana: "あしたからいっしゅうかんにゅういんします。", en: "從明天開始要住院一個禮拜。" }
    ]
  },
  {
    id: "vocab_taiin",
    word: "退院",
    furigana: "たいいん",
    romaji: "taiin",
    meaning: "出院",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "来週、病院を退院します。", furigana: "らいしゅう、びょういんをたいいんします。", en: "下週要出院。" },
      { ja: "退院おめでとうございます！", furigana: "たいいんおめでとうございます！", en: "恭喜出院！" }
    ]
  },
  {
    id: "vocab_guai",
    word: "具合",
    furigana: "ぐあい",
    romaji: "guai",
    meaning: "狀況、身體情況",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "お腹の具合が悪いです。", furigana: "おなかのぐあいがわるいです。", en: "肚子有點不舒服（腸胃狀況不好）。" },
      { ja: "機械の具合をチェックします。", furigana: "きかいのぐあいをちぇっくします。", en: "檢查機器的狀況。" }
    ]
  },
  {
    id: "vocab_kibun",
    word: "気分",
    furigana: "きぶん",
    romaji: "kibun",
    meaning: "心情、身體感覺",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "気分が悪いので、少し休みます。", furigana: "きぶんがわるいので、すこしやすみます。", en: "覺得不太舒服（想吐或頭暈等），稍微休息一下。" },
      { ja: "天気が良くて、気分がいいです。", furigana: "てんきがよくて、きぶんがいいです。", en: "天氣很好，心情也很好。" }
    ]
  },

  // --- 心理與性格 (psychology_character) ---
  {
    id: "vocab_ureshii",
    word: "嬉しい",
    furigana: "うれしい",
    romaji: "ureshii",
    meaning: "開心的、高興的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "プレゼントをもらって嬉しいです。", furigana: "ぷれぜんとをもらってうれしいです。", en: "收到禮物很開心。" },
      { ja: "テストに合格して、とても嬉しい！", furigana: "てすとにごうかくして、とてもうれしい！", en: "考試及格了，非常高興！" }
    ]
  },
  {
    id: "vocab_sabishii",
    word: "寂しい",
    furigana: "さびしい",
    romaji: "sabishii",
    meaning: "寂寞的、孤單的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "家族に会えなくて寂しいです。", furigana: "かぞくにあえなくてさびしいです。", en: "見不到家人覺得很寂寞。" },
      { ja: "友達が引っ越して、寂しくなります。", furigana: "ともだちがひっこして、さびしくなります。", en: "朋友搬家了，變得有些孤單。" }
    ]
  },
  {
    id: "vocab_kowai",
    word: "怖い",
    furigana: "こわい",
    romaji: "kowai",
    meaning: "可怕的、害怕的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "暗い道は怖いです。", furigana: "くらいみちはこわいです。", en: "暗暗的路很可怕。" },
      { ja: "私は犬が少し怖いです。", furigana: "わたしはいぬがすこしこわいです。", en: "我稍微有點怕狗。" }
    ]
  },
  {
    id: "vocab_hazukashii",
    word: "恥ずかしい",
    furigana: "はずかしい",
    romaji: "hazukashii",
    meaning: "害羞的、丟臉的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "みんなの前で話すのは恥ずかしいです。", furigana: "みんなのまえではなすのははずかしいです。", en: "在大家面前講話很害羞。" },
      { ja: "間違えて、恥ずかしかったです。", furigana: "まちがえて、はずかしかったです。", en: "弄錯了，覺得很丟臉。" }
    ]
  },
  {
    id: "vocab_odoroku",
    word: "驚く",
    furigana: "おどろく",
    romaji: "odoroku",
    meaning: "驚訝、吃驚",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "急に大きな音がして驚きました。", furigana: "きゅうにおおきなおとがしておどろきました。", en: "突然發出巨大聲響，嚇了一跳。" },
      { ja: "彼の日本語が上手で驚きました。", furigana: "かれのにほんごがじょうずでおどろきました。", en: "他日文很好，讓我吃了一驚。" }
    ]
  },
  {
    id: "vocab_komaru",
    word: "困る",
    furigana: "こまる",
    romaji: "komaru",
    meaning: "困擾、為難",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "お金がなくて困っています。", furigana: "おかねがなくてこまっています。", en: "沒錢了，覺得很苦惱。" },
      { ja: "道が分からなくて困りました。", furigana: "みちがわからなくてこまりました。", en: "不知道路怎麼走，很傷腦筋。" }
    ]
  },
  {
    id: "vocab_anshin",
    word: "安心",
    furigana: "あんしん",
    romaji: "anshin",
    meaning: "安心、放心",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "お母さんの顔を見て安心しました。", furigana: "おかあさんのかおをみてあんしんしました。", en: "看到媽媽的臉就放心了。" },
      { ja: "もう大丈夫ですから、安心してください。", furigana: "もうだいじょうぶですから、あんしんしてください。", en: "已經沒問題了，請安心。" }
    ]
  },
  {
    id: "vocab_shinpai",
    word: "心配",
    furigana: "しんぱい",
    romaji: "shinpai",
    meaning: "擔心、掛念",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "親はいつも子供を心配しています。", furigana: "おやはいつもこどもをしんぱいしています。", en: "父母總是擔心著孩子。" },
      { ja: "テストの結果が心配です。", furigana: "てすとのけっかがしんぱいです。", en: "很擔心考試的結果。" }
    ]
  },
  {
    id: "vocab_kibishii",
    word: "厳しい",
    furigana: "きびしい",
    romaji: "kibishii",
    meaning: "嚴格的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "数学の先生はとても厳しいです。", furigana: "すうがくのせんせいはとてもきびしいです。", en: "數學老師非常嚴格。" },
      { ja: "冬の寒さは厳しいです。", furigana: "ふゆのさむさはきびしいです。", en: "冬天的寒冷是很嚴酷的。" }
    ]
  },
  {
    id: "vocab_otonashii",
    word: "大人しい",
    furigana: "おとなしい",
    romaji: "otonashii",
    meaning: "老實的、內向文靜的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "あの猫はとても大人しいです。", furigana: "あのねこはとてもおとなしいです。", en: "那隻貓非常溫順老實。" },
      { ja: "妹は大人しい性格です。", furigana: "いもうとはおとなしいせいかくです。", en: "妹妹是文靜內向的性格。" }
    ]
  },
  {
    id: "vocab_majime",
    word: "真面目",
    furigana: "まじめ",
    romaji: "majime",
    meaning: "認真的、老實的",
    level: "N5",
    category: "psychology_character",
    sentences: [
      { ja: "彼はとても真面目な学生です。", furigana: "かれはとてもまじめながくせいです。", en: "他是非常認真的學生。" },
      { ja: "真面目に仕事をしてください。", furigana: "まじめにしごとをしてください。", en: "請認真老實地工作。" }
    ]
  }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Append the new words
db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'new vocabulary words to data_n5.js!');
