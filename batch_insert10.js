const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "日没", furigana: "にちぼつ", romaji: "nichibotsu", meaning: "日落", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "海岸で美しい日没を見ました。", exampleFurigana: "かいがんでうつくしいにちぼつをみました。", exampleEn: "在海岸看到了美麗的日落。" },
  { word: "日の出", furigana: "ひので", romaji: "hinode", meaning: "日出", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "山頂から日の出を拝みます。", exampleFurigana: "さんちょうからひのでをおがみます。", exampleEn: "從山頂參拜日出。" },
  { word: "小雨", furigana: "こさめ", romaji: "kosame", meaning: "小雨", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "小雨が降ってきたので傘をさします。", exampleFurigana: "こさめがふってきたのでかさをさします。", exampleEn: "下起小雨了所以撐傘。" },
  { word: "大雪", furigana: "おおゆき", romaji: "ooyuki", meaning: "大雪", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "明日は大雪になる予報です。", exampleFurigana: "あしたはおおゆきになるよほうです。", exampleEn: "預報明天會下大雪。" },
  { word: "吹雪", furigana: "ふぶき", romaji: "fubuki", meaning: "暴風雪", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "ひどい吹雪で前が見えません。", exampleFurigana: "ひどいふぶきでまえがみえません。", exampleEn: "嚴重的暴風雪讓人看不見前方。" },
  { word: "濃霧", furigana: "のうむ", romaji: "noumu", meaning: "濃霧", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "濃霧のため飛行機が欠航しました。", exampleFurigana: "のうむのためひこうきがけっこうしました。", exampleEn: "因為濃霧飛機停飛了。" },
  { word: "乾燥", furigana: "かんそう", romaji: "kansou", meaning: "乾燥", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "冬は空気が乾燥します。", exampleFurigana: "ふゆはくうきがかんそうします。", exampleEn: "冬天空氣很乾燥。" },
  { word: "湿気", furigana: "しっけ", romaji: "shikke", meaning: "濕氣 / 濕度", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "梅雨の時期は湿気が多いです。", exampleFurigana: "つゆのじきはしっけがおおいです。", exampleEn: "梅雨時期濕氣很重。" },
  { word: "星座", furigana: "せいざ", romaji: "seiza", meaning: "星座", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "夜空の星座を探します。", exampleFurigana: "よぞらのせいざをさがします。", exampleEn: "尋找夜空中的星座。" },
  { word: "季節風", furigana: "きせつふう", romaji: "kisetsufuu", meaning: "季風", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "冬の季節風が冷たいです。", exampleFurigana: "ふゆのきせつふうがつめたいです。", exampleEn: "冬天的季風很冷。" },

  // 地理與生態
  { word: "砂漠化", furigana: "さばくか", romaji: "sabakuka", meaning: "沙漠化", category: "geography_ecology", level: "N1", 
    exampleJa: "地球の砂漠化が進んでいます。", exampleFurigana: "ちきゅうのさばくかがすすんでいます。", exampleEn: "地球的沙漠化正在加劇。" },
  { word: "森林伐採", furigana: "しんりんばっさい", romaji: "shinrinbassai", meaning: "森林砍伐", category: "geography_ecology", level: "N1", 
    exampleJa: "過度な森林伐採が問題になっています。", exampleFurigana: "かどなしんりんばっさいがもんだいになっています。", exampleEn: "過度的森林砍伐成了一個問題。" },
  { word: "環境破壊", furigana: "かんきょうはかい", romaji: "kankyouhakai", meaning: "環境破壞", category: "geography_ecology", level: "N1", 
    exampleJa: "環境破壊を防ぐ必要があります。", exampleFurigana: "かんきょうはかいをふせぐひつようがあります。", exampleEn: "必須防止環境破壞。" },
  { word: "地下水", furigana: "ちかすい", romaji: "chikasui", meaning: "地下水", category: "geography_ecology", level: "N1", 
    exampleJa: "井戸から冷たい地下水を汲みます。", exampleFurigana: "いどからつめたいちかすいをくみます。", exampleEn: "從水井打出冰涼的地下水。" },
  { word: "海岸線", furigana: "かいがんせん", romaji: "kaigansen", meaning: "海岸線", category: "geography_ecology", level: "N1", 
    exampleJa: "美しい海岸線をドライブします。", exampleFurigana: "うつくしいかいがんせんをどらいぶします。", exampleEn: "沿著美麗的海岸線開車兜風。" },
  { word: "列島", furigana: "れっとう", romaji: "rettou", meaning: "列島", category: "geography_ecology", level: "N1", 
    exampleJa: "日本は多くの島からなる列島です。", exampleFurigana: "にほんはおおくのしまからなるれっとうです。", exampleEn: "日本是由許多島嶼組成的列島。" },
  { word: "岩礁", furigana: "がんしょう", romaji: "ganshou", meaning: "岩礁", category: "geography_ecology", level: "N1", 
    exampleJa: "船が岩礁に乗り上げました。", exampleFurigana: "ふねががんしょうにのりあげました。", exampleEn: "船觸礁了。" },
  { word: "浅瀬", furigana: "あさせ", romaji: "asase", meaning: "淺灘", category: "geography_ecology", level: "N1", 
    exampleJa: "子供たちが浅瀬で遊んでいます。", exampleFurigana: "こどもたちがあさせであそんでいます。", exampleEn: "孩子們在淺灘玩耍。" },
  { word: "深海", furigana: "しんかい", romaji: "shinkai", meaning: "深海", category: "geography_ecology", level: "N1", 
    exampleJa: "深海には未知の生物がいます。", exampleFurigana: "しんかいにはみちのせいぶつがいます。", exampleEn: "深海裡有未知生物。" },
  { word: "泥", furigana: "どろ", romaji: "doro", meaning: "泥巴", category: "geography_ecology", level: "N2", 
    exampleJa: "靴に泥がつきました。", exampleFurigana: "くつにどろがつきました。", exampleEn: "鞋子沾上了泥巴。" },

  // 生物世界
  { word: "蜜蜂", furigana: "みつばち", romaji: "mitsubachi", meaning: "蜜蜂", category: "biological_world", level: "N2", 
    exampleJa: "蜜蜂が花の蜜を集めています。", exampleFurigana: "みつばちがはなのみつをあつめています。", exampleEn: "蜜蜂正在採集花蜜。" },
  { word: "蛾", furigana: "が", romaji: "ga", meaning: "飛蛾", category: "biological_world", level: "N1", 
    exampleJa: "夜になると街灯に蛾が集まります。", exampleFurigana: "よるになるとがいとうにががあつまります。", exampleEn: "一到晚上飛蛾就會聚集在路燈下。" },
  { word: "蚊", furigana: "か", romaji: "ka", meaning: "蚊子", category: "biological_world", level: "N2", 
    exampleJa: "夏は蚊に刺されてかゆいです。", exampleFurigana: "なつはかにさされてかゆいです。", exampleEn: "夏天被蚊子叮很癢。" },
  { word: "蟻", furigana: "あり", romaji: "ari", meaning: "螞蟻", category: "biological_world", level: "N2", 
    exampleJa: "庭に蟻の巣があります。", exampleFurigana: "にわにありのすがあります。", exampleEn: "院子裡有螞蟻窩。" },
  { word: "蝉", furigana: "せみ", romaji: "semi", meaning: "蟬", category: "biological_world", level: "N2", 
    exampleJa: "木の上で蝉が鳴いています。", exampleFurigana: "きのうえでせみがないています。", exampleEn: "蟬在樹上鳴叫。" },
  { word: "亀", furigana: "かめ", romaji: "kame", meaning: "烏龜", category: "biological_world", level: "N2", 
    exampleJa: "池の岩で亀が休んでいます。", exampleFurigana: "いけのいわでかめがやすんでいます。", exampleEn: "烏龜在池塘的石頭上休息。" },
  { word: "熊", furigana: "くま", romaji: "kuma", meaning: "熊", category: "biological_world", level: "N2", 
    exampleJa: "森の中で熊に遭遇しました。", exampleFurigana: "もりのなかでくまにそうぐうしました。", exampleEn: "在森林裡遇到了熊。" },
  { word: "鹿", furigana: "しか", romaji: "shika", meaning: "鹿", category: "biological_world", level: "N2", 
    exampleJa: "奈良公園にはたくさんの鹿がいます。", exampleFurigana: "ならこうえんにはたくさんのしかがいます。", exampleEn: "奈良公園有很多鹿。" },
  { word: "鼠", furigana: "ねずみ", romaji: "nezumi", meaning: "老鼠", category: "biological_world", level: "N2", 
    exampleJa: "台所に鼠が出ました。", exampleFurigana: "だいどころにねずみがでました。", exampleEn: "廚房出現了老鼠。" },
  { word: "烏賊", furigana: "いか", romaji: "ika", meaning: "烏賊 / 花枝", category: "biological_world", level: "N2", 
    exampleJa: "新鮮な烏賊の刺身を食べました。", exampleFurigana: "しんせんなんかのさしみをたべました。", exampleEn: "吃了新鮮的烏賊生魚片。" }
];

const filePath = path.join(__dirname, 'data.js');
let content = fs.readFileSync(filePath, 'utf8');

const fileContext = { window: {} };
vm.createContext(fileContext);
vm.runInContext(content, fileContext);

const data = fileContext.window.JLPT_DATA;
if (!data.vocabulary) {
  data.vocabulary = [];
}

let addedCount = 0;
wordsToAdd.forEach(entry => {
  if (!data.vocabulary.some(v => v.word === entry.word)) {
    data.vocabulary.push(entry);
    addedCount++;
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${addedCount} words to data.js!`);
