const fs = require('fs');

const n5GrammarPart3Raw = [
  {
    title: '〜ことができます (能夠/可以)',
    structure: '名詞(動作) / 動詞辭書形 + こと + ができます',
    explanation: '表示具備某種能力，或是當時的狀況允許做某事。「會... / 能夠... / 可以...」。',
    examples: [
      { ja: 'クレジットカードで払うことができます。', furigana: 'くれじっとかーどではらうことができます。', en: '可以用信用卡付款。' }
    ]
  },
  {
    title: '〜まえに (在...之前)',
    structure: '動詞辭書形 / 名詞の / 數量詞 + まえに',
    explanation: '表示在某個動作或時間發生之前。「在...之前」。',
    examples: [
      { ja: '寝るまえに、本を読みます。', furigana: 'ねるまえに、ほんをよみます。', en: '睡覺前看書。' }
    ]
  },
  {
    title: '〜たあとで (在...之後)',
    structure: '動詞た形 / 名詞の + あとで',
    explanation: '表示在某個動作結束之後，接著進行下一個動作。「在...之後」。',
    examples: [
      { ja: '仕事が終わったあとで、飲みに行きませんか。', furigana: 'しごとがおわったあとで、のみにいきませんか。', en: '工作結束後，要不要去喝一杯？' }
    ]
  },
  {
    title: '〜てから (自從...之後 / 在...之後才)',
    structure: '動詞て形 + から',
    explanation: '表示前項動作是後項動作的起點或先決條件。與「あとで」相似，但「てから」強調先後順序的必要性。「做完...才...」。',
    examples: [
      { ja: '手を洗ってから、ご飯を食べます。', furigana: 'てをあらってから、ごはんをたべます。', en: '洗完手才吃飯。' }
    ]
  },
  {
    title: '〜たほうがいいです (最好...)',
    structure: '動詞た形 / ない形 + ほうがいいです',
    explanation: '給予對方的忠告或建議。「最好... / 最好不要...」。',
    examples: [
      { ja: '疲れたら、早く寝たほうがいいですよ。', furigana: 'つかれたら、はやくねたほうがいいですよ。', en: '累的話，最好早點睡覺喔。' }
    ]
  },
  {
    title: '〜かもしれません (說不定)',
    structure: '普通形 / 名詞 / な形容詞語幹 + かもしれません',
    explanation: '表示某件事雖然不確定，但有一半左右的可能性會發生。「也許... / 說不定...」。',
    examples: [
      { ja: '明日は雪が降るかもしれません。', furigana: 'あしたはゆきがふるかもしれません。', en: '明天也許會下雪。' }
    ]
  },
  {
    title: '〜でしょう (大概)',
    structure: '普通形 / 名詞 / な形容詞語幹 + でしょう',
    explanation: '用於表達不確定但可能性很高的推測(如天氣預報)。「大概...吧」。',
    examples: [
      { ja: '明日はいい天気になるでしょう。', furigana: 'あしたはいいてんきになるでしょう。', en: '明天大概會是個好天氣吧。' }
    ]
  },
  {
    title: '〜つもりです (打算)',
    structure: '動詞辭書形 / ない形 + つもりです',
    explanation: '表示說話者個人的意志與計畫。「打算要... / 打算不...」。',
    examples: [
      { ja: '週末は海へ行くつもりです。', furigana: 'しゅうまつはうみへいくつもりです。', en: '週末打算去海邊。' }
    ]
  },
  {
    title: '〜予定です (預定)',
    structure: '動詞辭書形 / 名詞の + 予定です (よていです)',
    explanation: '表示客觀已定案的行程表或計畫。「預定要...」。',
    examples: [
      { ja: '飛行機は3時に着く予定です。', furigana: 'ひこうきはさんじにつくよていです。', en: '飛機預定在3點抵達。' }
    ]
  },
  {
    title: '〜と、〜 (一...就...)',
    structure: '動詞辭書形 / ない形 + と、〜',
    explanation: '表示某個條件成立時，必然會引起下一個結果(多為自然現象或機器操作)。「一...就會...」。',
    examples: [
      { ja: 'このボタンを押すと、お釣りが出ます。', furigana: 'このぼたんをおすと、おつりがでます。', en: '一按下這個按鈕，就會跑出找零。' },
      { ja: '春になると、桜が咲きます。', furigana: 'はるになると、さくらがさきます。', en: '一到春天，櫻花就會綻放。' }
    ]
  },
  {
    title: '〜ば / 〜なら (如果)',
    structure: '動詞ば形 / い形容詞ければ / 名詞・な形容詞なら',
    explanation: '最常見的條件假定用法。表示「如果符合這個條件，就會有後面的結果」。「如果...」。',
    examples: [
      { ja: '天気が良ければ、山へ行きます。', furigana: 'てんきがよければ、やまへいきます。', en: '如果天氣好的話，就去山上。' }
    ]
  },
  {
    title: '〜たら (如果 / 之後)',
    structure: '動詞/形容詞/名詞 た形 + ら',
    explanation: '口語中最常用的條件與時間表達。1. 假設「如果...的話」。 2. 確定會發生的未來「等...之後」。',
    examples: [
      { ja: '雨が降ったら、試合は中止です。', furigana: 'あめがふったら、しあいはちゅうしです。', en: '如果下雨的話，比賽就中止。' },
      { ja: '夏休みになったら、国へ帰ります。', furigana: 'なつやすみになったら、くにへかえります。', en: '等放了暑假，我就要回國。' }
    ]
  },
  {
    title: '〜ても / 〜でも (即使)',
    structure: '動詞て形 + も / い形容詞くて + も / 名詞・な形容詞で + も',
    explanation: '表示逆接的假定條件。「即使...也... / 就算...也...」。',
    examples: [
      { ja: '雨が降っても、出かけます。', furigana: 'あめがふっても、でかけます。', en: '即使下雨，我也要出門。' },
      { ja: '安くても、買いたくないです。', furigana: 'やすくても、かいたくないです。', en: '就算很便宜，我也不想買。' }
    ]
  },
  {
    title: '〜くれます (別人給我)',
    structure: '名詞(人) + が(は) + わたし + に + 事物 + を + くれます',
    explanation: '表示別人給自己(或自己家人)東西。動作主體是對方。「別人給我...」。',
    examples: [
      { ja: '田中さんが私にプレゼントをくれました。', furigana: 'たなかさんがわたしにぷれぜんとをくれました。', en: '田中先生給了我禮物。' }
    ]
  },
  {
    title: '〜あげます (我給別人)',
    structure: 'わたし + は + 名詞(人) + に + 事物 + を + あげます',
    explanation: '表示自己給別人東西。動作主體是自己。「我給別人...」。',
    examples: [
      { ja: '私は妹にお金をあげました。', furigana: 'わたしはいもうとにおかねをあげました。', en: '我給了妹妹錢。' }
    ]
  },
  {
    title: '〜もらいます (我從別人那裡得到)',
    structure: 'わたし + は + 名詞(人) + に(から) + 事物 + を + もらいます',
    explanation: '表示自己從別人那裡得到東西。動作主體是自己。「我從別人那裡得到...」。',
    examples: [
      { ja: '私は友達から手紙をもらいました。', furigana: 'わたしはともだちからてがみをもらいました。', en: '我收到了朋友的信(我從朋友那裡得到信)。' }
    ]
  },
  {
    title: '〜てあげます (為別人做某事)',
    structure: '動詞て形 + あげます',
    explanation: '表示主動為他人做某件事(有施恩的意味，對長輩慎用)。「我幫別人...」。',
    examples: [
      { ja: '私は友達の荷物を持ってあげました。', furigana: 'わたしはともだちのにもつをもってもらいました。', en: '我幫朋友拿了行李。' }
    ]
  },
  {
    title: '〜てくれます (別人為我做某事)',
    structure: '動詞て形 + くれます',
    explanation: '表示他人主動為自己做某件事，並帶有感謝的心情。「別人幫我...」。',
    examples: [
      { ja: '先生が日本語を教えてくれました。', furigana: 'せんせいがにほんごをおしえてくれました。', en: '老師教了我日文(老師幫我教日文)。' }
    ]
  },
  {
    title: '〜てもらいます (請別人為我做某事)',
    structure: '動詞て形 + もらいます',
    explanation: '表示自己拜託別人為自己做某事，並接受這份恩惠。「請別人幫我...」。',
    examples: [
      { ja: '私は山田さんに写真を撮ってもらいました。', furigana: 'わたしはやまださんにしゃしんをとってもらいました。', en: '我請山田先生幫我拍了照。' }
    ]
  },
  {
    title: '自動詞與他動詞',
    structure: '名詞 + が + 自動詞 / 名詞 + を + 他動詞',
    explanation: '自動詞表示狀態的自然改變或動作；他動詞表示人為蓄意去做某個動作。',
    examples: [
      { ja: 'ドアが開きます。(自動詞)', furigana: 'どあがあきます。', en: '門開了。(描述狀態)' },
      { ja: '私がドアを開けます。(他動詞)', furigana: 'わたしがどあをあけます。', en: '我把門打開。(描述人為動作)' }
    ]
  },
  {
    title: '〜ています (狀態存續)',
    structure: '自動詞て形 + います',
    explanation: '表示動作結束後，其結果所留下來的狀態一直持續到現在。「...著」。',
    examples: [
      { ja: '窓が開いています。', furigana: 'まどがあいています。', en: '窗戶開著(維持打開的狀態)。' }
    ]
  },
  {
    title: '〜てあります (人為狀態存續)',
    structure: '他動詞て形 + あります',
    explanation: '表示某人抱著某種目的做了動作，而該動作的結果一直維持到現在。「(已經)...好了」。',
    examples: [
      { ja: '黒板に字が書いてあります。', furigana: 'こくばんにじがかいてあります。', en: '黑板上寫著字(有人故意寫的，且維持在那裡)。' }
    ]
  },
  {
    title: '〜ておきます (事先準備 / 放置)',
    structure: '動詞て形 + おきます',
    explanation: '1. 為了將來做準備「事先...好」。 2. 為了下次使用而保持原狀「就放著...」。',
    examples: [
      { ja: '旅行の前に、ホテルを予約しておきます。', furigana: 'りょこうのまえに、ほてるをよやくしておきます。', en: '旅行前先訂好飯店。' }
    ]
  },
  {
    title: '〜てしまいます (完成 / 遺憾)',
    structure: '動詞て形 + しまいます',
    explanation: '1. 表示動作徹底結束「...完了」。 2. 表示發生了不好的事而感到後悔、遺憾「不小心...了」。',
    examples: [
      { ja: '宿題を全部してしまいました。', furigana: 'しゅくだいをぜんぶしてしまいました。', en: '把作業全部寫完了。' },
      { ja: 'パスポートを落としてしまいました。', furigana: 'ぱすぽーとをおとしてしまいました。', en: '不小心把護照弄丟了。' }
    ]
  },
  {
    title: '〜う / 〜よう (意向形)',
    structure: '動詞意向形 (I類: o段+う / II類: 去ます+よう / III類: しよう・こよう)',
    explanation: '表示說話者想要做某事的意志，或是邀請對方一起做(為「〜ましょう」的普通體)。「打算要... / 一起...吧」。',
    examples: [
      { ja: '明日、映画を見に行こう。', furigana: 'あした、えいがをみにいこう。', en: '明天一起去看電影吧！' }
    ]
  }
];

// Note: To avoid duplicates, check titles.
let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

let existingTitles = data.grammar.map(g => g.title);
let uniqueNewGrammar = n5GrammarPart3Raw.filter(g => !existingTitles.includes(g.title));

let startIdx = data.grammar.length + 1;
uniqueNewGrammar.forEach((g) => {
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

let content_n5 = fs.readFileSync('data_n5.js', 'utf8');
const ctx_n5 = { window: { JLPT_DATA_CHUNKS: {} } };
vm.createContext(ctx_n5);
vm.runInContext(content_n5, ctx_n5);

const data_n5 = ctx_n5.window.JLPT_DATA_CHUNKS['N5'];
data_n5.grammar = [...data.grammar];

const newData_n5 = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(data_n5, null, 2)};\n`;
fs.writeFileSync('data_n5.js', newData_n5, 'utf8');

console.log('N5 grammar part 3 generated successfully. Total: ' + data.grammar.length + ' items (Added ' + uniqueNewGrammar.length + ')');
