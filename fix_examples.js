const fs = require('fs');
const path = require('path');
const vm = require('vm');

const replacements = {
  "雨": {
    exampleJa: "雨が降っています。",
    exampleFurigana: "あめがふっています。",
    exampleEn: "正在下雨。"
  },
  "雪": {
    exampleJa: "雪が白くてきれいです。",
    exampleFurigana: "ゆきがしろくてきれいです。",
    exampleEn: "雪白白的很漂亮。"
  },
  "晴れ": {
    exampleJa: "明日は晴れになるでしょう。",
    exampleFurigana: "あしたははれになるでしょう。",
    exampleEn: "明天應該會是晴天吧。"
  },
  "曇り": {
    exampleJa: "今日は曇りで少し寒いです。",
    exampleFurigana: "きょうはくもりですこしさむいです。",
    exampleEn: "今天是陰天，有點冷。"
  },
  "天気": {
    exampleJa: "今日はいい天気ですね。",
    exampleFurigana: "きょうはいいてんきですね。",
    exampleEn: "今天天氣真好呢。"
  },
  "空": {
    exampleJa: "空がとても青いです。",
    exampleFurigana: "そらがとてもあおいです。",
    exampleEn: "天空非常藍。"
  },
  "春": {
    exampleJa: "春になると花が咲きます。",
    exampleFurigana: "はるになるとはながさきます。",
    exampleEn: "一到春天花就會開。"
  },
  "夏": {
    exampleJa: "夏は海に行きたいです。",
    exampleFurigana: "なつはうみにいきたいです。",
    exampleEn: "夏天想去海邊。"
  },
  "秋": {
    exampleJa: "秋は涼しくて過ごしやすい季節です。",
    exampleFurigana: "あきはすずしくてすごしやすいきせつです。",
    exampleEn: "秋天是涼爽宜人的季節。"
  },
  "冬": {
    exampleJa: "冬はコートが必要です。",
    exampleFurigana: "ふゆはこーとがひつようです。",
    exampleEn: "冬天需要穿大衣。"
  },
  "雷": {
    exampleJa: "大きな雷の音がしました。",
    exampleFurigana: "おおきなかみなりのおとがしました。",
    exampleEn: "打了一聲很大的雷。"
  },
  "台風": {
    exampleJa: "台風が近づいています。",
    exampleFurigana: "たいふうがちかづいています。",
    exampleEn: "颱風正在逼近。"
  },
  "気温": {
    exampleJa: "今日の気温は高いです。",
    exampleFurigana: "きょうのきおんはたかいです。",
    exampleEn: "今天的氣溫很高。"
  },
  "海": {
    exampleJa: "海で泳ぐのが好きです。",
    exampleFurigana: "うみでおよぐのがすきです。",
    exampleEn: "我喜歡在海裡游泳。"
  },
  "川": {
    exampleJa: "この川は水がきれいです。",
    exampleFurigana: "このかわはみずがきれいです。",
    exampleEn: "這條河的水很乾淨。"
  },
  "山": {
    exampleJa: "週末に山に登ります。",
    exampleFurigana: "しゅうまつにやまにのぼります。",
    exampleEn: "週末去爬山。"
  },
  "月": {
    exampleJa: "今夜は月が明るいです。",
    exampleFurigana: "こんやはつきがあかるいです。",
    exampleEn: "今晚的月亮很明亮。"
  },
  "太陽": {
    exampleJa: "太陽が東から昇ります。",
    exampleFurigana: "たいようがひがしからのぼります。",
    exampleEn: "太陽從東方升起。"
  },
  "星": {
    exampleJa: "空にたくさんの星が見えます。",
    exampleFurigana: "そらにたくさんのほしがみえます。",
    exampleEn: "天空中能看到許多星星。"
  },
  "犬": {
    exampleJa: "可愛い犬を飼っています。",
    exampleFurigana: "かわいいいぬをかっています。",
    exampleEn: "養了一隻可愛的狗。"
  },
  "猫": {
    exampleJa: "猫が日向ぼっこをしています。",
    exampleFurigana: "ねこがひなたぼっこをしています。",
    exampleEn: "貓咪正在曬太陽。"
  },
  "鳥": {
    exampleJa: "鳥が空を飛んでいます。",
    exampleFurigana: "とりがそらをとんでいます。",
    exampleEn: "鳥兒在天空中飛翔。"
  },
  "木": {
    exampleJa: "庭に大きな木があります。",
    exampleFurigana: "にわにおおきなきがあります。",
    exampleEn: "院子裡有一棵大樹。"
  },
  "動物": {
    exampleJa: "動物園で色々な動物を見ました。",
    exampleFurigana: "どうぶつえんでいろいろなどうぶつをみました。",
    exampleEn: "在動物園看到了各種動物。"
  },
  "植物": {
    exampleJa: "部屋に植物を飾ります。",
    exampleFurigana: "へやにしょくぶつをかざります。",
    exampleEn: "在房間裡裝飾植物。"
  },
  "虫": {
    exampleJa: "夏は虫が多いです。",
    exampleFurigana: "なつはむしがおおいです。",
    exampleEn: "夏天蟲子很多。"
  },
  "牛": {
    exampleJa: "牧場に牛がいます。",
    exampleFurigana: "ぼくじょうにうしがいます。",
    exampleEn: "牧場裡有牛。"
  },
  "馬": {
    exampleJa: "馬に乗ったことがありますか。",
    exampleFurigana: "うまにのったことがありますか。",
    exampleEn: "你有騎過馬嗎？"
  },
  "豚": {
    exampleJa: "豚肉を使った料理を作ります。",
    exampleFurigana: "ぶたにくをつかったりょうりをつくります。",
    exampleEn: "製作使用豬肉的料理。"
  }
};

const filePath = path.join(__dirname, 'data_n5.js');
let content = fs.readFileSync(filePath, 'utf8');

const fileContext = { window: {} };
vm.createContext(fileContext);
vm.runInContext(content, fileContext);

const data = fileContext.window.JLPT_DATA_CHUNKS["N5"];

let updatedCount = 0;
data.vocabulary.forEach(v => {
  if (replacements[v.word] && (v.exampleJa.includes("の例です") || !v.exampleJa)) {
    v.exampleJa = replacements[v.word].exampleJa;
    v.exampleFurigana = replacements[v.word].exampleFurigana;
    v.exampleEn = replacements[v.word].exampleEn;
    updatedCount++;
  }
});

const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Updated ${updatedCount} placeholder examples in data_n5.js`);
