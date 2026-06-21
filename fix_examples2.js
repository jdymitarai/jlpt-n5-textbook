const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 第一批 (29 words)
  { word: "雨", furigana: "あめ", romaji: "ame", meaning: "雨 / 雨天", category: "astronomy_meteorology", level: "N5" },
  { word: "雪", furigana: "ゆき", romaji: "yuki", meaning: "雪", category: "astronomy_meteorology", level: "N5" },
  { word: "風", furigana: "かぜ", romaji: "kaze", meaning: "風", category: "astronomy_meteorology", level: "N5" },
  { word: "空", furigana: "そら", romaji: "sora", meaning: "天空", category: "astronomy_meteorology", level: "N5" },
  { word: "晴れ", furigana: "はれ", romaji: "hare", meaning: "晴天", category: "astronomy_meteorology", level: "N5" },
  { word: "曇り", furigana: "くもり", romaji: "kumori", meaning: "陰天", category: "astronomy_meteorology", level: "N5" },
  { word: "春", furigana: "はる", romaji: "haru", meaning: "春天", category: "astronomy_meteorology", level: "N5" },
  { word: "夏", furigana: "なつ", romaji: "natsu", meaning: "夏天", category: "astronomy_meteorology", level: "N5" },
  { word: "秋", furigana: "あき", romaji: "aki", meaning: "秋天", category: "astronomy_meteorology", level: "N5" },
  { word: "冬", furigana: "ふゆ", romaji: "fuyu", meaning: "冬天", category: "astronomy_meteorology", level: "N5" },
  { word: "雷", furigana: "かみなり", romaji: "kaminari", meaning: "雷 / 閃電", category: "astronomy_meteorology", level: "N5" },
  { word: "台風", furigana: "たいふう", romaji: "taifuu", meaning: "颱風", category: "astronomy_meteorology", level: "N5" },
  { word: "気温", furigana: "きおん", romaji: "kion", meaning: "氣溫", category: "astronomy_meteorology", level: "N5" },
  { word: "海", furigana: "うみ", romaji: "umi", meaning: "海洋 / 大海", category: "geography_ecology", level: "N5" },
  { word: "川", furigana: "かわ", romaji: "kawa", meaning: "河川", category: "geography_ecology", level: "N5" },
  { word: "山", furigana: "やま", romaji: "yama", meaning: "山 / 山脈", category: "geography_ecology", level: "N5" },
  { word: "月", furigana: "つき", romaji: "tsuki", meaning: "月亮", category: "geography_ecology", level: "N5" },
  { word: "太陽", furigana: "たいよう", romaji: "taiyou", meaning: "太陽", category: "geography_ecology", level: "N5" },
  { word: "星", furigana: "ほし", romaji: "hoshi", meaning: "星星", category: "geography_ecology", level: "N5" },
  { word: "犬", furigana: "いぬ", romaji: "inu", meaning: "狗", category: "biological_world", level: "N5" },
  { word: "猫", furigana: "ねこ", romaji: "neko", meaning: "貓", category: "biological_world", level: "N5" },
  { word: "鳥", furigana: "とり", romaji: "tori", meaning: "鳥", category: "biological_world", level: "N5" },
  { word: "木", furigana: "き", romaji: "ki", meaning: "樹木", category: "biological_world", level: "N5" },
  { word: "動物", furigana: "どうぶつ", romaji: "doubutsu", meaning: "動物", category: "biological_world", level: "N5" },
  { word: "植物", furigana: "しょくぶつ", romaji: "shokubutsu", meaning: "植物", category: "biological_world", level: "N5" },
  { word: "虫", furigana: "むし", romaji: "mushi", meaning: "昆蟲", category: "biological_world", level: "N5" },
  { word: "牛", furigana: "うし", romaji: "ushi", meaning: "牛", category: "biological_world", level: "N5" },
  { word: "馬", furigana: "うま", romaji: "uma", meaning: "馬", category: "biological_world", level: "N5" },
  { word: "豚", furigana: "ぶた", romaji: "buta", meaning: "豬", category: "biological_world", level: "N5" }
];

const examplesMap = {
  // First batch
  "雨": { ja: "明日は雨が降ります。", furi: "あしたはあめがふります。", en: "明天會下雨。" },
  "雪": { ja: "冬は雪が多いです。", furi: "ふゆはゆきがおおいです。", en: "冬天雪很多。" },
  "風": { ja: "強い風が吹いています。", furi: "つよいかぜがふいています。", en: "正在吹強風。" },
  "空": { ja: "青い空がきれいです。", furi: "あおいそらがきれいです。", en: "藍天很漂亮。" },
  "晴れ": { ja: "今日は晴れです。", furi: "きょうははれです。", en: "今天是晴天。" },
  "曇り": { ja: "明日の天気は曇りです。", furi: "あしたのてんきはくもりです。", en: "明天的天氣是陰天。" },
  "春": { ja: "春に桜が咲きます。", furi: "はるにさくらがさきます。", en: "春天櫻花會開。" },
  "夏": { ja: "夏はとても暑いです。", furi: "なつはとてもあついですね。", en: "夏天非常熱。" },
  "秋": { ja: "秋は涼しい季節です。", furi: "あきはすずしいきせつです。", en: "秋天是涼爽的季節。" },
  "冬": { ja: "冬にスキーに行きます。", furi: "ふゆにスキーにいきます。", en: "冬天去滑雪。" },
  "雷": { ja: "遠くで雷の音がします。", furi: "とおくでかみなりのおとがします。", en: "遠處傳來雷聲。" },
  "台風": { ja: "台風が近づいています。", furi: "たいふうがちかづいています。", en: "颱風正在靠近。" },
  "気温": { ja: "今日の気温は高いです。", furi: "きょうのきおんはたかいです。", en: "今天的氣溫很高。" },
  "海": { ja: "夏休みに海へ行きます。", furi: "なつやすみにうみへいきます。", en: "暑假去海邊。" },
  "川": { ja: "川で魚を釣ります。", furi: "かわでさかなをつります。", en: "在河裡釣魚。" },
  "山": { ja: "週末に山に登ります。", furi: "しゅうまつにやまにのぼります。", en: "週末去爬山。" },
  "月": { ja: "今夜は月がきれいです。", furi: "こんやはつきがきれいです。", en: "今晚的月亮很漂亮。" },
  "太陽": { ja: "太陽が東から昇ります。", furi: "たいようがひがしからのぼります。", en: "太陽從東邊升起。" },
  "星": { ja: "空に星がたくさんあります。", furi: "そらにほしがたくさんあります。", en: "天空中有很多星星。" },
  "犬": { ja: "公園で犬と散歩します。", furi: "こうえんでいぬとさんぽします。", en: "在公園和狗散步。" },
  "猫": { ja: "可愛い猫を飼っています。", furi: "かわいいねこをかっています。", en: "養了一隻可愛的貓。" },
  "鳥": { ja: "鳥が空を飛んでいます。", furi: "とりがそらをとんでいます。", en: "鳥在天空中飛翔。" },
  "木": { ja: "庭に大きな木があります。", furi: "にわにおおきなきがあります。", en: "院子裡有一棵大樹。" },
  "動物": { ja: "動物園にいろいろな動物がいます。", furi: "どうぶつえんにいろいろなどうぶつがいます。", en: "動物園裡有各種動物。" },
  "植物": { ja: "部屋に植物を飾ります。", furi: "へやにしょくぶつをかざります。", en: "在房間裡裝飾植物。" },
  "虫": { ja: "秋の虫の声が聞こえます。", furi: "あきのむしのこえがきこえます。", en: "聽見秋天蟲子的叫聲。" },
  "牛": { ja: "農場で牛を育てています。", furi: "のうじょうでうしをそだてています。", en: "在農場養牛。" },
  "馬": { ja: "馬に乗ったことがあります。", furi: "うまにのったことがあります。", en: "有騎過馬的經驗。" },
  "豚": { ja: "豚の肉を料理します。", furi: "ぶたのにくをりょうりします。", en: "料理豬肉。" }
};

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

const fileContext = { window: {} };
vm.createContext(fileContext);
vm.runInContext(content, fileContext);

const data = fileContext.window.JLPT_DATA;

let addedCount = 0;
wordsToAdd.forEach(entry => {
  const proper = examplesMap[entry.word];
  const fullEntry = {
    ...entry,
    exampleJa: proper.ja,
    exampleFurigana: proper.furi,
    exampleEn: proper.en
  };
  
  if (!data.vocabulary.some(v => v.word === fullEntry.word)) {
    data.vocabulary.push(fullEntry);
    addedCount++;
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${addedCount} words to data.js!`);
