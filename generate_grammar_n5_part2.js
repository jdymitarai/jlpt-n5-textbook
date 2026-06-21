const fs = require('fs');

const n5GrammarPart2Raw = [
  {
    title: '〜がわかります (懂 / 明白)',
    structure: '名詞 + が + わかります',
    explanation: '表示了解、明白某件事物，或是具備某種語言的理解能力。對象語助詞習慣用「が」而不是「を」。',
    examples: [
      { ja: '私は日本語が少しわかります。', furigana: 'わたしはにほんごがすこしわかります。', en: '我稍微懂一點日文。' }
    ]
  },
  {
    title: '〜が好きです / 嫌いです (喜歡 / 討厭)',
    structure: '名詞 + が + 好きです / 嫌いです',
    explanation: '表示個人的喜好與厭惡。對象語助詞習慣用「が」。',
    examples: [
      { ja: '私は猫が好きです。', furigana: 'わたしはねこがすきです。', en: '我喜歡貓。' },
      { ja: '彼は野菜が嫌いです。', furigana: 'かれはやさいがきらいです。', en: '他討厭蔬菜。' }
    ]
  },
  {
    title: '〜が上手です / 下手です (擅長 / 不擅長)',
    structure: '名詞 + が + 上手です / 下手です',
    explanation: '表示對某項事物的技術或能力優劣。對象語助詞用「が」。(注意：不能用於稱讚自己)',
    examples: [
      { ja: '田中さんは歌が上手です。', furigana: 'たなかさんはうたがじょうずです。', en: '田中先生很會唱歌。' }
    ]
  },
  {
    title: 'どんな〜 (什麼樣的)',
    structure: 'どんな + 名詞',
    explanation: '詢問事物的具體性質、種類或狀態。「什麼樣的...」。',
    examples: [
      { ja: 'どんなスポーツが好きですか。', furigana: 'どんなすぽーつがすきですか。', en: '你喜歡什麼樣的運動？' }
    ]
  },
  {
    title: 'どうして (為什麼)',
    structure: 'どうして + 疑問句',
    explanation: '用來詢問原因或理由。「為什麼...？」。回答時句尾常接「〜から」。',
    examples: [
      { ja: 'どうして昨日休みましたか。', furigana: 'どうしてきのうやすみましたか。', en: '你昨天為什麼請假？' }
    ]
  },
  {
    title: '〜から (因為)',
    structure: '句子 / 普通形 / 敬體形 + から',
    explanation: '表示原因、理由。「因為...」。放在說明原因的句子後面。',
    examples: [
      { ja: '忙しいですから、行きません。', furigana: 'いそがしいですから、いきません。', en: '因為很忙，所以不去。' }
    ]
  },
  {
    title: '〜が、〜 (雖然...但是)',
    structure: '句子1 + が、句子2',
    explanation: '連接兩個句子，表示語氣的轉折或對比。「雖然...但是...」。',
    examples: [
      { ja: '日本の食べ物は美味しいですが、高いです。', furigana: 'にほんのたべものはおいしいですが、たかいです。', en: '日本的食物雖然好吃，但是很貴。' }
    ]
  },
  {
    title: '〜や〜など (和...等等)',
    structure: '名詞 + や + 名詞 + (など)',
    explanation: '表示從許多事物中，不完全列舉出兩三項代表性的事物。「...和...等等」。',
    examples: [
      { ja: '箱の中に手紙や写真などがあります。', furigana: 'はこのなかにてがみやしゃしんなどがあります。', en: '箱子裡有信、照片等等的東西。' }
    ]
  },
  {
    title: '〜だけ (只有)',
    structure: '名詞 / 數量詞 + だけ',
    explanation: '表示限定範圍，排除其他。「只有...」。',
    examples: [
      { ja: '休みは日曜日だけです。', furigana: 'やすみはにちようびだけです。', en: '休假只有星期日。' }
    ]
  },
  {
    title: '名詞1 + と + 名詞2 (和)',
    structure: '名詞 + と + 名詞',
    explanation: '完全列舉兩個或兩個以上的名詞。「...和...」。',
    examples: [
      { ja: 'パンと卵を買いました。', furigana: 'ぱんとたまごをかいました。', en: '買了麵包和雞蛋。' }
    ]
  },
  {
    title: '〜と一緒に (一起)',
    structure: '名詞(人) + と + 一緒に (いっしょに)',
    explanation: '表示動作的共同參與者。「和...一起」。',
    examples: [
      { ja: '友達と一緒に映画を見ます。', furigana: 'ともだちといっしょにえいがをみます。', en: '和朋友一起看電影。' }
    ]
  },
  {
    title: 'もう (已經)',
    structure: 'もう + 動詞た形 / 肯定句',
    explanation: '表示動作或變化已經完成。「已經...了」。',
    examples: [
      { ja: 'もう昼ご飯を食べましたか。', furigana: 'もうひるごはんをたべましたか。', en: '已經吃過午飯了嗎？' }
    ]
  },
  {
    title: 'まだ (還沒)',
    structure: 'まだ + 動詞て形いません / 否定句',
    explanation: '表示動作尚未完成，或狀態尚未發生。「還沒...」。',
    examples: [
      { ja: 'いいえ、まだ食べていません。', furigana: 'いいえ、まだたべていません。', en: '不，還沒吃。' }
    ]
  },
  {
    title: '〜より〜のほうが (比...更...)',
    structure: '名詞A + より + 名詞B + のほうが + 形容詞',
    explanation: '將兩者進行比較，表示「比起A，B更是...」。',
    examples: [
      { ja: '電車より新幹線のほうが速いです。', furigana: 'でんしゃよりしんかんせんのほうがはやいです。', en: '比起電車，新幹線更快。' }
    ]
  },
  {
    title: '〜と〜とどちらが (兩者之中哪個...)',
    structure: '名詞A + と + 名詞B + と、どちらが + 形容詞ですか',
    explanation: '詢問A和B兩者之中，哪一個比較符合某個形容詞的狀態。',
    examples: [
      { ja: 'サッカーと野球とどちらが好きですか。', furigana: 'さっかーとやきゅうとどちらがすきですか。', en: '足球和棒球，你比較喜歡哪個？' }
    ]
  },
  {
    title: '〜の中で〜が一番 (在...之中最...)',
    structure: '範圍名詞 + の中で + 疑問詞 / 名詞 + が + 一番 + 形容詞',
    explanation: '表示在某個範圍內(三個以上)，某個事物達到了最高程度。「在...之中，...最...」。',
    examples: [
      { ja: '果物の中で、りんごが一番好きです。', furigana: 'くだもののなかで、りんごがいちばんすきです。', en: '在水果之中，我最喜歡蘋果。' }
    ]
  },
  {
    title: '〜つもりです (打算)',
    structure: '動詞辭書形 / ない形 + つもりです',
    explanation: '表示說話者個人的計畫、打算或意志。「打算要... / 不打算...」。',
    examples: [
      { ja: '来年、日本へ留学するつもりです。', furigana: 'らいねん、にほんへりゅうがくするつもりです。', en: '明年打算去日本留學。' }
    ]
  },
  {
    title: '〜予定です (預定)',
    structure: '動詞辭書形 / 名詞の + 予定です (よていです)',
    explanation: '表示行程表上已確定的客觀計畫，或官方/公司的預定事項。「預定要...」。',
    examples: [
      { ja: '会議は午後2時からの予定です。', furigana: 'かいぎはごごにじからのよていです。', en: '會議預定從下午兩點開始。' }
    ]
  },
  {
    title: '〜たいです (我想...)',
    structure: '動詞ます形去ます + たいです',
    explanation: '表示說話者自己想做某事。「我想...」。',
    examples: [
      { ja: '私は新しいパソコンが買いたいです。', furigana: 'わたしはあたらしいぱそこんがかいたいです。', en: '我想買一台新電腦。' }
    ]
  },
  {
    title: '〜に行きます (去...做某事)',
    structure: '場所 + へ + 名詞 / 動詞ます形去ます + に + 行きます',
    explanation: '表示移動的目的。「去(某地)做(某事)」。',
    examples: [
      { ja: 'デパートへ服を買いに行きます。', furigana: 'でぱーとへふくをかいにいきます。', en: '去百貨公司買衣服。' }
    ]
  },
  {
    title: '〜なります (變成)',
    structure: 'い形容詞去い + く / な形容詞・名詞 + に + なります',
    explanation: '表示狀態自然而然的變化。「變成... / 變得...」。',
    examples: [
      { ja: 'だんだん寒くなりました。', furigana: 'だんだんさむくなりました。', en: '漸漸變冷了。' },
      { ja: '彼は医者になりました。', furigana: 'かれはいしゃになりました。', en: '他成為了醫生。' }
    ]
  },
  {
    title: '〜に (頻率/比例)',
    structure: '時間 / 期間 / 單位數量 + に + 次數 / 數量',
    explanation: '表示在某個特定的時間或單位內，發生的次數或比例。「每... / 在...之中」。',
    examples: [
      { ja: '1週間に3回、運動します。', furigana: 'いっしゅうかんにさんかい、うんどうします。', en: '一週運動三次。' }
    ]
  },
  {
    title: '〜はどうですか (覺得怎麼樣)',
    structure: '名詞 + はどうですか',
    explanation: '詢問對方對某事物的感想、意見或狀態。「...覺得怎麼樣？」。',
    examples: [
      { ja: '日本の生活はどうですか。', furigana: 'にほんのせいかつはどうですか。', en: '日本的生活怎麼樣呢？' }
    ]
  },
  {
    title: '〜たほうがいいです (最好...)',
    structure: '動詞た形 / ない形 + ほうがいいです',
    explanation: '給予對方的忠告或建議。「最好... / 最好不要...」。',
    examples: [
      { ja: '熱があるなら、病院へ行ったほうがいいですよ。', furigana: 'ねつがあるなら、びょういんへいったほうがいいですよ。', en: '如果發燒的話，最好去一趟醫院喔。' }
    ]
  },
  {
    title: '〜でしょう (大概 / 對吧)',
    structure: '普通形 / 名詞 / な形容詞語幹 + でしょう',
    explanation: '1. 語氣下降時表示推測「大概...吧」。 2. 語氣上揚時表示向對方確認並期待同意「...對吧？」。',
    examples: [
      { ja: '明日は雨が降るでしょう。', furigana: 'あしたはあめがふるでしょう。', en: '明天大概會下雨吧。' },
      { ja: 'このケーキ、美味しいでしょう？', furigana: 'このけーき、おいしいでしょう？', en: '這個蛋糕，很好吃對吧？' }
    ]
  }
];

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

let startIdx = data.grammar.length + 1;
n5GrammarPart2Raw.forEach((g) => {
  data.grammar.push({
    id: 'g_n5_' + startIdx++,
    title: g.title,
    structure: g.structure,
    explanation: g.explanation,
    examples: g.examples,
    level: 'N5'
  });
});

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');

// Update data_n5.js
let content_n5 = fs.readFileSync('data_n5.js', 'utf8');
const ctx_n5 = { window: { JLPT_DATA_CHUNKS: {} } };
vm.createContext(ctx_n5);
vm.runInContext(content_n5, ctx_n5);

const data_n5 = ctx_n5.window.JLPT_DATA_CHUNKS['N5'];
data_n5.grammar = [...data.grammar];

const newData_n5 = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(data_n5, null, 2)};\n`;
fs.writeFileSync('data_n5.js', newData_n5, 'utf8');

console.log('N5 grammar part 2 generated successfully. Total: ' + data.grammar.length + ' items');
