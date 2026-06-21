const fs = require('fs');

const newGrammarRaw = [
  {
    title: '〜によると / 〜によれば (根據)',
    structure: '名詞 + によると / によれば',
    explanation: '表示情報、傳聞的來源出處。句尾通常搭配傳聞用法「〜そうです / 〜ということです」。「根據...」。',
    examples: [
      { ja: '天気予報によると、明日は雨だそうです。', furigana: 'てんきよほうによると、あしたはあめだそうです。', en: '根據天氣預報，明天好像會下雨。' }
    ]
  },
  {
    title: '〜そうです (聽說)',
    structure: '普通形 + そうです',
    explanation: '表示將從別處聽來的情報傳達給對方(傳聞用法)。「聽說...」。',
    examples: [
      { ja: '彼は来年結婚するそうです。', furigana: 'かれはらいねんけっこんするそうです。', en: '聽說他明年要結婚。' }
    ]
  },
  {
    title: '〜そうです (看起來像)',
    structure: '動詞ます形去ます / い形容詞去い / な形容詞語幹 + そうです',
    explanation: '表示從外表、視覺上做出的直覺判斷(樣態用法)。「看起來好像... / 似乎快要...」。',
    examples: [
      { ja: 'このケーキは美味しそうですね。', furigana: 'このケーキはおいしそうですね。', en: '這個蛋糕看起來很好吃呢。' },
      { ja: '今にも雨が降りそうです。', furigana: 'いまにもあめがふりそうです。', en: '看起來馬上就要下雨了。' }
    ]
  },
  {
    title: '〜すぎる (太過於)',
    structure: '動詞ます形去ます / い形容詞去い / な形容詞語幹 + すぎる',
    explanation: '表示動作或狀態超出了適當的限度，通常帶有負面的意思。「太... / 過於...」。',
    examples: [
      { ja: 'ゆうべはお酒を飲みすぎました。', furigana: 'ゆうべはおさけをのみすぎました。', en: '昨晚酒喝太多了。' }
    ]
  },
  {
    title: '〜やすい (容易... / 好...)',
    structure: '動詞ます形去ます + やすい',
    explanation: '表示某個動作很容易進行，或是具有很容易發生某種狀態的傾向。「很容易... / 很好...」。',
    examples: [
      { ja: 'このペンはとても書きやすいです。', furigana: 'このペンはとてもかきやすいです。', en: '這支筆很好寫。' }
    ]
  },
  {
    title: '〜にくい (難以... / 不好...)',
    structure: '動詞ます形去ます + にくい',
    explanation: '表示某個動作很難進行，或是具有很難發生某種狀態的傾向。「很難... / 不好...」。',
    examples: [
      { ja: 'この漢字は複雑で覚えにくいです。', furigana: 'このかんじはふくざつでおぼえにくいです。', en: '這個漢字很複雜，很難記。' }
    ]
  },
  {
    title: '〜くする / 〜にする (使之變成)',
    structure: 'い形容詞去い + くする / な形容詞・名詞 + にする',
    explanation: '表示透過人為的動作，改變某個事物的狀態。「把...弄成... / 讓...變成...」。',
    examples: [
      { ja: 'テレビの音を大きくしてください。', furigana: 'テレビのおとをおおきくしてください。', en: '請把電視的聲音開大一點。' },
      { ja: '部屋をきれいにしました。', furigana: 'へやをきれいにしました。', en: '把房間弄乾淨了。' }
    ]
  },
  {
    title: '〜にする (決定)',
    structure: '名詞 + にする',
    explanation: '表示在多個選項中，個人做出了選擇或決定。「我決定要... / 我選...」。',
    examples: [
      { ja: '飲み物はコーヒーにします。', furigana: 'のみものはコーヒーにします。', en: '飲料我選咖啡。' }
    ]
  },
  {
    title: '〜ことにする (決定做某事)',
    structure: '動詞辭書形 / ない形 + ことにする',
    explanation: '表示經過自己的意志，決定了要做或不做某個動作。「我決定要...」。',
    examples: [
      { ja: '明日からダイエットすることにしました。', furigana: 'あしたからダイエットすることにしました。', en: '我決定從明天開始減肥。' }
    ]
  },
  {
    title: '〜ことになっている (規定/預定)',
    structure: '動詞辭書形 / ない形 + ことになっている',
    explanation: '表示並非自己的意志，而是外在的規則、法律、習慣或他人的安排所決定的。「規定要... / 預定要...」。',
    examples: [
      { ja: '日本では、車は左側を走ることになっています。', furigana: 'にほんでは、くるまはひだりがわをはしることになっています。', en: '在日本，規定車輛要靠左行駛。' }
    ]
  },
  {
    title: '〜ように (為了)',
    structure: '動詞辭書形(多為無意志動詞/可能形) / ない形 + ように',
    explanation: '表示為了達到某種狀態，而在前項設定目標。「為了能... / 為了不...」。與「ために」不同在於前面多接無法控制的狀態。',
    examples: [
      { ja: '日本語が話せるように、毎日練習しています。', furigana: 'にほんごがはなせるように、まいにちれんしゅうしています。', en: '為了能開口說日文，每天都在練習。' }
    ]
  },
  {
    title: '〜ところだった (差點就...)',
    structure: '動詞辭書形 + ところだった',
    explanation: '表示差一點點就要發生某個(通常是不好的)結果，但最後並沒有發生。「差一點就...」。',
    examples: [
      { ja: '危ない！もう少しで車にひかれるところだった。', furigana: 'あぶない！もうすこしでくるまにひかれるところだった。', en: '好險！差一點就被車撞到了。' }
    ]
  },
  {
    title: '〜ばよかった (要是...就好了)',
    structure: '動詞ば形 + よかった / 動詞ない形 + なければよかった',
    explanation: '表示對過去已經發生的事情感到後悔、遺憾。「要是當時有...就好了 / 要是沒...就好了」。',
    examples: [
      { ja: 'もっと早く家を出ればよかったです。', furigana: 'もっとはやくいえをでればよかったです。', en: '要是當時早點出門就好了。' }
    ]
  },
  {
    title: '〜てみる (試著做做看)',
    structure: '動詞て形 + みる',
    explanation: '表示為了知道結果如何，而嘗試去做某件事。「試著...看看」。',
    examples: [
      { ja: 'この服、着てみてもいいですか。', furigana: 'このふく、きてみてもいいですか。', en: '這件衣服，我可以試穿看看嗎？' }
    ]
  },
  {
    title: '〜ておく (事先準備/放任)',
    structure: '動詞て形 + おく',
    explanation: '1. 為將來做準備「事先...」。 2. 為了下次使用而保持原狀「把...放著」。 3. 放置不管。',
    examples: [
      { ja: '旅行の前に、ホテルを予約しておきます。', furigana: 'りょこうのまえに、ホテルをよやくしておきます。', en: '旅行前，先預約好飯店。' },
      { ja: '窓を開けておいてください。', furigana: 'まどをあけておいてください。', en: '請讓窗戶開著(保持打開狀態)。' }
    ]
  },
  {
    title: '〜てしまう (完成/遺憾)',
    structure: '動詞て形 + しまう',
    explanation: '1. 表示動作徹底完成「...完了」。 2. 表示無可挽回或發生了不好的事而感到遺憾、後悔「不小心...了」。',
    examples: [
      { ja: '買った本を全部読んでしまった。', furigana: 'かったほんをぜんぶよんでしまった。', en: '把買來的書全部看完了。' },
      { ja: 'パスポートを落としてしまいました。', furigana: 'パスポートをおとしてしまいました。', en: '不小心把護照弄丟了。' }
    ]
  },
  {
    title: '〜てある (狀態存續)',
    structure: '他動詞て形 + ある',
    explanation: '表示某人懷抱著某種目的做了動作，且該動作完成後的結果與狀態一直保留到現在。「(已經)...了」。',
    examples: [
      { ja: 'カレンダーに予定が書いてあります。', furigana: 'カレンダーによていがかいてあります。', en: '日曆上寫著預定行程(已經寫好在那裡了)。' }
    ]
  },
  {
    title: '〜ていく (遠去/持續變化)',
    structure: '動詞て形 + いく',
    explanation: '1. 表示動作主體從現在的位置朝遠方移動「...去」。 2. 表示狀態從現在開始往未來的持續變化「逐漸...」。',
    examples: [
      { ja: '鳥が飛んでいきました。', furigana: 'とりがとんでいきました。', en: '鳥兒飛走了。' },
      { ja: 'これからも日本語の勉強を続けていくつもりです。', furigana: 'これからもにほんごのべんきょうをつづけていくつもりです。', en: '今後我也打算繼續學習日文。' }
    ]
  },
  {
    title: '〜てくる (靠近/狀態發生)',
    structure: '動詞て形 + くる',
    structure: '1. 表示動作主體從遠方朝現在的位置移動「...來」。 2. 表示某個狀態從過去一直延續到現在。 3. 表示某種心理或生理現象自然湧現。',
    examples: [
      { ja: '犬が走ってきました。', furigana: 'いぬがはしってきました。', en: '狗跑過來了。' },
      { ja: 'だんだん寒くなってきました。', furigana: 'だんだんさむくなってきました。', en: '漸漸變冷了(直到現在)。' },
      { ja: '悲しくて、涙が出てきました。', furigana: 'かなしくて、なみだがでてきました。', en: '因為很悲傷，眼淚流了出來。' }
    ]
  },
  {
    title: '〜し、〜し (不僅...而且)',
    structure: '普通形 + し、普通形 + し',
    explanation: '用來並列列舉多個理由或事物。「又...又... / 既...也...」。',
    examples: [
      { ja: 'この店は美味しいし、安いし、いつも人が多いです。', furigana: 'このみせはおいしいし、やすいし、いつもひとがおおいです。', en: '這家店既好吃又便宜，所以總是有很多人。' }
    ]
  }
];

let content = fs.readFileSync('data_n4.js', 'utf8');

const ctx = { window: { JLPT_DATA_CHUNKS: {} } };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA_CHUNKS['N4'];

let startIdx = data.grammar.length + 1;
newGrammarRaw.forEach((g) => {
  data.grammar.push({
    id: 'g_n4_' + startIdx++,
    title: g.title,
    structure: g.structure || g.explanation, // Fallback if typo
    explanation: g.explanation || 'See structure',
    examples: g.examples,
    level: 'N4'
  });
});

const newData = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N4"] = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data_n4.js', newData, 'utf8');

console.log('N4 grammar part 3 generated successfully. Total: ' + data.grammar.length + ' items');
