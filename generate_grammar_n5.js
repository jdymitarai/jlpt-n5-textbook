const fs = require('fs');

const n5GrammarRaw = [
  {
    title: '〜は〜です (A是B)',
    structure: '名詞A + は + 名詞B + です',
    explanation: '最基礎的名詞肯定句，表示「A是B」。助詞「は」做為主題標記，發音為「wa」。「です」是禮貌語氣的助動詞。',
    examples: [
      { ja: '私は学生です。', furigana: 'わたしはがくせいです。', en: '我是學生。' },
      { ja: '田中さんは日本人です。', furigana: 'たなかさんはにほんじんです。', en: '田中先生是日本人。' }
    ]
  },
  {
    title: '〜は〜ではありません (A不是B)',
    structure: '名詞A + は + 名詞B + ではありません / じゃありません',
    explanation: '名詞的否定句，表示「A不是B」。口語中常將「ではありません」說成「じゃありません」。',
    examples: [
      { ja: '私は先生ではありません。', furigana: 'わたしはせんせいではありません。', en: '我不是老師。' },
      { ja: 'これは本じゃありません。', furigana: 'これはほんじゃありません。', en: '這不是書。' }
    ]
  },
  {
    title: '〜は〜でした (過去是...)',
    structure: '名詞A + は + 名詞B + でした',
    explanation: '名詞句的過去肯定式，表示過去的狀態「A以前是B」。',
    examples: [
      { ja: '昨日は日曜日でした。', furigana: 'きのうはにちようびでした。', en: '昨天是星期日。' }
    ]
  },
  {
    title: '〜は〜ではありませんでした (過去不是...)',
    structure: '名詞A + は + 名詞B + ではありませんでした / じゃありませんでした',
    explanation: '名詞句的過去否定式，表示「A以前不是B」。',
    examples: [
      { ja: '昨日はいい天気ではありませんでした。', furigana: 'きのうはいいてんきではありませんでした。', en: '昨天天氣不好(不是好天氣)。' }
    ]
  },
  {
    title: '〜の〜 (所屬/修飾)',
    structure: '名詞 + の + 名詞',
    explanation: '助詞「の」用來連接兩個名詞，表示前面的名詞修飾後面的名詞，或是表示所屬關係「...的...」。',
    examples: [
      { ja: 'これは私の本です。', furigana: 'これはわたしのほんです。', en: '這是我的書。' },
      { ja: '日本語の先生', furigana: 'にほんごのせんせい。', en: '日語老師。' }
    ]
  },
  {
    title: 'これ / それ / あれ / どれ (指示代名詞)',
    structure: 'これ(這) / それ(那) / あれ(那/遠處) / どれ(哪個)',
    explanation: '代替事物名稱的代名詞。這系列不能直接接名詞，必須單獨當主詞或受詞使用。',
    examples: [
      { ja: 'それは何ですか。', furigana: 'それはなんですか。', en: '那是什麼？' }
    ]
  },
  {
    title: 'この / その / あの / どの + 名詞 (指示連體詞)',
    structure: 'この / その / あの / どの + 名詞',
    explanation: '必須與後面的名詞綁在一起使用。「這個... / 那個... / 那個(遠處)... / 哪個...」。',
    examples: [
      { ja: 'この車は私のです。', furigana: 'このくるまはわたしのです。', en: '這輛車是我的。' }
    ]
  },
  {
    title: 'ここ / そこ / あそこ / どこ (場所指示詞)',
    structure: 'ここ(這裡) / そこ(那裡) / あそこ(那裡/遠處) / どこ(哪裡)',
    explanation: '代替場所名稱的指示代名詞。用來詢問或指出地點。',
    examples: [
      { ja: 'トイレはどこですか。', furigana: 'といれはどこですか。', en: '洗手間在哪裡？' }
    ]
  },
  {
    title: '〜も (也)',
    structure: '名詞 + も',
    explanation: '提示助詞，取代「は」或「が」，表示與前面提到的事物相同。「...也...」。',
    examples: [
      { ja: '私も学生です。', furigana: 'わたしもがくせいです。', en: '我也是學生。' }
    ]
  },
  {
    title: '〜にあります / います (存在)',
    structure: '場所 + に + 事物 + が + あります(無生命) / います(有生命)',
    explanation: '表示事物的存在地點。「在某個地方，有某個東西/人」。無生命用「あります」，有生命(人或動物)用「います」。',
    examples: [
      { ja: '机の上に本があります。', furigana: 'つくえのうえにほんがあります。', en: '桌子上有書。' },
      { ja: '庭に犬がいます。', furigana: 'にわにいぬがいます。', en: '院子裡有狗。' }
    ]
  },
  {
    title: '〜へ行きます (移動方向)',
    structure: '場所 + へ + 行きます / 来ます / 帰ります',
    explanation: '助詞「へ」(發音為 e) 表示移動的方向或目的地。「去/來/回...」。',
    examples: [
      { ja: '明日、日本へ行きます。', furigana: 'あした、にほんへいきます。', en: '明天要去日本。' }
    ]
  },
  {
    title: '〜で (交通工具 / 方法)',
    structure: '名詞(交通/方法/工具) + で',
    explanation: '表示進行動作所使用的手段、方法或交通工具。「搭乘... / 用...」。',
    examples: [
      { ja: '電車で会社へ行きます。', furigana: 'でんしゃでかいしゃへいきます。', en: '搭電車去公司。' },
      { ja: '日本語で手紙を書きます。', furigana: 'にほんごでてがみをかきます。', en: '用日文寫信。' }
    ]
  },
  {
    title: '〜で (動作的場所)',
    structure: '場所 + で + 動作動詞',
    explanation: '表示發生某個動作的場所。「在...做...」。注意與表示存在的「に」不同。',
    examples: [
      { ja: 'レストランでご飯を食べます。', furigana: 'れすとらんでごはんをたべます。', en: '在餐廳吃飯。' }
    ]
  },
  {
    title: '〜を〜ます (動作的受詞)',
    structure: '名詞 + を + 他動詞',
    explanation: '助詞「を」(發音為 o) 用來提示及物動詞的受詞(賓語)。',
    examples: [
      { ja: '毎日、水を飲みます。', furigana: 'まいにち、みずをのみます。', en: '每天喝水。' }
    ]
  },
  {
    title: '〜に (具體時間點)',
    structure: '時間名詞(具體) + に + 動詞',
    explanation: '表示動作發生的確切時間點(有數字或具體名稱的時間，如幾點、星期幾、幾號)。',
    examples: [
      { ja: '朝7時に起きます。', furigana: 'あさしちじにおきます。', en: '早上7點起床。' }
    ]
  },
  {
    title: '〜から〜まで (起點與終點)',
    structure: '時間/場所 + から + 時間/場所 + まで',
    explanation: '表示時間或空間的起點與終點。「從...到...」。',
    examples: [
      { ja: '学校は午前9時から午後3時までです。', furigana: 'がっこうはごぜんくじからごごさんじまでです。', en: '學校從早上9點到下午3點。' }
    ]
  },
  {
    title: 'い形容詞 (肯定與否定)',
    structure: '肯定：〜いです / 否定：〜くないです',
    explanation: '字尾為「い」的形容詞。否定時將「い」去掉改為「くないです」。(例外：いい -> よくない)',
    examples: [
      { ja: 'このかばんは高いです。', furigana: 'このかばんはたかいです。', en: '這個包包很貴。' },
      { ja: 'この映画は面白くないです。', furigana: 'このえいがはおもしろくないです。', en: '這部電影不有趣。' }
    ]
  },
  {
    title: 'な形容詞 (肯定與否定)',
    structure: '肯定：〜です / 否定：〜ではありません',
    explanation: '語幹不帶「い」的形容詞(少數例外如きれい、きらい)。變化規則與名詞完全相同。',
    examples: [
      { ja: 'この町は静かです。', furigana: 'このまちはしずかです。', en: '這個城鎮很安靜。' },
      { ja: '彼は親切ではありません。', furigana: 'かれはしんせつではありません。', en: '他並不親切。' }
    ]
  },
  {
    title: '〜ませんか (邀約)',
    structure: '動詞ます形去ます + ませんか',
    explanation: '用否定的疑問句來婉轉地邀請對方做某事。「要不要一起...呢？」。',
    examples: [
      { ja: '一緒に映画を見に行きませんか。', furigana: 'いっしょにえいがをみにいきませんか。', en: '要不要一起去看電影呢？' }
    ]
  },
  {
    title: '〜ましょう (提議/附和)',
    structure: '動詞ます形去ます + ましょう',
    explanation: '表示主動提議一起做某事，或是積極地贊同對方的邀約。「我們來...吧」。',
    examples: [
      { ja: '少し休みましょう。', furigana: 'すこしやすみましょう。', en: '我們休息一下吧。' }
    ]
  },
  {
    title: '動詞て形 (請求)',
    structure: '動詞て形 + ください',
    explanation: '禮貌地要求或請求對方做某事。「請...」。',
    examples: [
      { ja: 'ここに名前を書いてください。', furigana: 'ここになまえをかいてください。', en: '請在這裡寫下名字。' }
    ]
  },
  {
    title: '動詞て形 + います (正在進行)',
    structure: '動詞て形 + います',
    explanation: '表示目前的動作正在持續進行中。「正在...」。',
    examples: [
      { ja: '今、本を読んでいます。', furigana: 'いま、ほんをよんでいます。', en: '現在正在看書。' }
    ]
  },
  {
    title: '〜てもいいです (許可)',
    structure: '動詞て形 + もいいです',
    explanation: '表示給予許可，或徵求對方的許可。「可以...」。',
    examples: [
      { ja: '写真を撮ってもいいですか。', furigana: 'しゃしんをとってもいいですか。', en: '我可以拍照嗎？' }
    ]
  },
  {
    title: '〜てはいけません (禁止)',
    structure: '動詞て形 + はいけません',
    explanation: '表示規則上的禁止，不可以做某事。「不可以...」。',
    examples: [
      { ja: 'ここでタバコを吸ってはいけません。', furigana: 'ここでたばこをすってはいけません。', en: '這裡不可以抽菸。' }
    ]
  },
  {
    title: '動詞ない形 (請不要)',
    structure: '動詞ない形 + ないでください',
    explanation: '請求對方不要做某事。「請不要...」。',
    examples: [
      { ja: '無理をしないでください。', furigana: 'むりをしないでください。', en: '請不要勉強自己。' }
    ]
  },
  {
    title: '〜なければなりません (必須)',
    structure: '動詞ない形去ない + なければなりません',
    explanation: '表示有義務或非做不可的事情。「必須...」。',
    examples: [
      { ja: '薬を飲まなければなりません。', furigana: 'くすりをのまなければなりません。', en: '必須吃藥。' }
    ]
  },
  {
    title: '〜なくてもいいです (不用...也可以)',
    structure: '動詞ない形去ない + くてもいいです',
    explanation: '表示沒有必要做某事。「不...也可以 / 不用...」。',
    examples: [
      { ja: '明日、学校へ来なくてもいいです。', furigana: 'あした、がっこうへこなくてもいいです。', en: '明天不用來學校也可以。' }
    ]
  },
  {
    title: '動詞辭書形 + ことができます (能力/可能)',
    structure: '名詞 / 動詞辭書形 + こと + ができます',
    explanation: '表示具備某種能力，或是狀況允許做某事。「會... / 能夠...」。',
    examples: [
      { ja: '私は日本語を話すことができます。', furigana: 'わたしはにほんごをはなすことができます。', en: '我會說日文。' }
    ]
  },
  {
    title: '動詞た形 + ことがあります (經驗)',
    structure: '動詞た形 + ことがあります',
    explanation: '表示過去曾經有過某種經驗。「曾經...過」。',
    examples: [
      { ja: '日本へ行ったことがあります。', furigana: 'にほんへいったことがあります。', en: '我曾經去過日本。' }
    ]
  },
  {
    title: '〜たり〜たりします (列舉動作)',
    structure: '動詞た形 + り、動詞た形 + り + します',
    explanation: '從多個動作中隨機列舉兩個代表性的動作。「有時...有時... / 做做...做做...」。',
    examples: [
      { ja: '日曜日は本を読んだり、映画を見たりします。', furigana: 'にちようびはほんをよんだり、えいがをみたりします。', en: '星期日我會看看書、看看電影之類的。' }
    ]
  }
];

let content = fs.readFileSync('data.js', 'utf8');

// We need to update JLPT_DATA.grammar
const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

// Overwrite entirely with new high quality ones
data.grammar = n5GrammarRaw.map((g, idx) => ({
  id: 'g_n5_' + (idx + 1),
  title: g.title,
  structure: g.structure,
  explanation: g.explanation,
  examples: g.examples,
  level: 'N5'
}));

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');

// Also update data_n5.js
let content_n5 = fs.readFileSync('data_n5.js', 'utf8');
const ctx_n5 = { window: { JLPT_DATA_CHUNKS: {} } };
vm.createContext(ctx_n5);
vm.runInContext(content_n5, ctx_n5);

const data_n5 = ctx_n5.window.JLPT_DATA_CHUNKS['N5'];
data_n5.grammar = [...data.grammar];

const newData_n5 = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(data_n5, null, 2)};\n`;
fs.writeFileSync('data_n5.js', newData_n5, 'utf8');

console.log('N5 grammar generated successfully. Total: ' + data.grammar.length + ' items');
