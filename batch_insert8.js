const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "銀河", furigana: "ぎんが", romaji: "ginga", meaning: "銀河系 / 星系", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "宇宙には無数の銀河があります。", exampleFurigana: "うちゅうにはむすうのぎんががあります。", exampleEn: "宇宙中有著無數的銀河。" },
  { word: "引力", furigana: "いんりょく", romaji: "inryoku", meaning: "引力 / 萬有引力", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "月は地球の引力で回っています。", exampleFurigana: "つきはちきゅうのいんりょくでまわっています。", exampleEn: "月球受地球引力牽引而繞行。" },
  { word: "軌道", furigana: "きどう", romaji: "kidou", meaning: "軌道", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "人工衛星が軌道に乗りました。", exampleFurigana: "じんこうえいせいがきどうにのりました。", exampleEn: "人造衛星進入了軌道。" },
  { word: "惑星", furigana: "わくせい", romaji: "wakusei", meaning: "行星", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "太陽系には八つの惑星があります。", exampleFurigana: "たいようけいにはやっつのわくせいがあります。", exampleEn: "太陽系有八大行星。" },
  { word: "衛星", furigana: "えいせい", romaji: "eisei", meaning: "衛星", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "月は地球の唯一の衛星です。", exampleFurigana: "つきはちきゅうのゆいいつのえいせいです。", exampleEn: "月球是地球唯一的衛星。" },
  { word: "恒星", furigana: "こうせい", romaji: "kousei", meaning: "恆星", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "太陽は自ら光る恒星です。", exampleFurigana: "たいようはみずからひかるこうせいです。", exampleEn: "太陽是自行發光的恆星。" },
  { word: "真夏", furigana: "まなつ", romaji: "manatsu", meaning: "盛夏", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "真夏の太陽が眩しいです。", exampleFurigana: "まなつのたいようがまぶしいです。", exampleEn: "盛夏的陽光十分刺眼。" },
  { word: "真冬", furigana: "まふゆ", romaji: "mafuyu", meaning: "隆冬", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "真冬の寒さに凍えます。", exampleFurigana: "まふゆのさむさにこごえます。", exampleEn: "在隆冬的嚴寒中凍僵了。" },
  { word: "初雪", furigana: "はつゆき", romaji: "hatsuyuki", meaning: "初雪", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "今年初めての初雪が降りました。", exampleFurigana: "ことしはじめてのはつゆきがふりました。", exampleEn: "下了今年的第一場初雪。" },
  { word: "空梅雨", furigana: "からつゆ", romaji: "karatsuyu", meaning: "乾梅雨 (不下雨的梅雨季)", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "今年は空梅雨で水不足が心配です。", exampleFurigana: "ことしはからつゆでみずぶそくがしんぱいです。", exampleEn: "今年是乾梅雨，很擔心會缺水。" },

  // 地理與生態
  { word: "赤道", furigana: "せきどう", romaji: "sekidou", meaning: "赤道", category: "geography_ecology", level: "N2", 
    exampleJa: "赤道直下の国はとても暑いです。", exampleFurigana: "せきどうちょっかのくにはとてもあついです。", exampleEn: "赤道正下方的國家非常炎熱。" },
  { word: "南極", furigana: "なんきょく", romaji: "nankyoku", meaning: "南極", category: "geography_ecology", level: "N2", 
    exampleJa: "南極にはペンギンがたくさんいます。", exampleFurigana: "なんきょくにはぺんぎんがたくさんいます。", exampleEn: "南極有許多企鵝。" },
  { word: "北極", furigana: "ほっきょく", romaji: "hokkyoku", meaning: "北極", category: "geography_ecology", level: "N2", 
    exampleJa: "北極の氷が溶けています。", exampleFurigana: "ほっきょくのこおりがとけています。", exampleEn: "北極的冰層正在融化。" },
  { word: "緯度", furigana: "いど", romaji: "ido", meaning: "緯度", category: "geography_ecology", level: "N1", 
    exampleJa: "日本と緯度が同じ国を探します。", exampleFurigana: "にほんといどがおなじくにをさがします。", exampleEn: "尋找和日本緯度相同的國家。" },
  { word: "経度", furigana: "けいど", romaji: "keido", meaning: "經度", category: "geography_ecology", level: "N1", 
    exampleJa: "経度によって時差が生じます。", exampleFurigana: "けいどによってじさがしょうじます。", exampleEn: "時間差是由經度造成的。" },
  { word: "海流", furigana: "かいりゅう", romaji: "kairyuu", meaning: "洋流", category: "geography_ecology", level: "N1", 
    exampleJa: "暖かい海流が岸に近づきます。", exampleFurigana: "あたたかいかいりゅうがきしにちかづきます。", exampleEn: "溫暖的洋流靠近了海岸。" },
  { word: "潮風", furigana: "しおかぜ", romaji: "shiokaze", meaning: "海風", category: "geography_ecology", level: "N2", 
    exampleJa: "海辺で潮風に吹かれます。", exampleFurigana: "うみべでしおかぜにふかれます。", exampleEn: "在海邊吹著海風。" },
  { word: "渓谷", furigana: "けいこく", romaji: "keikoku", meaning: "溪谷", category: "geography_ecology", level: "N1", 
    exampleJa: "秋の渓谷はとても美しいです。", exampleFurigana: "あきのけいこくはとてもうつくしいです。", exampleEn: "秋天的溪谷非常美麗。" },
  { word: "鍾乳洞", furigana: "しょうにゅうどう", romaji: "shounyuudou", meaning: "鐘乳洞", category: "geography_ecology", level: "N1", 
    exampleJa: "暗くて涼しい鍾乳洞を探検します。", exampleFurigana: "くらくてすずしいしょうにゅうどうをたんけんします。", exampleEn: "探險陰暗涼爽的鐘乳洞。" },
  { word: "活火山", furigana: "かつかざん", romaji: "katsukazan", meaning: "活火山", category: "geography_ecology", level: "N1", 
    exampleJa: "あの山は現在も活動している活火山です。", exampleFurigana: "あのやまはげんざいもかつどうしているかつかざんです。", exampleEn: "那座山是至今仍在活動的活火山。" },

  // 生物世界
  { word: "恐竜", furigana: "きょうりゅう", romaji: "kyouryuu", meaning: "恐龍", category: "biological_world", level: "N2", 
    exampleJa: "博物館で恐竜の化石を見ました。", exampleFurigana: "はくぶつかんできょうりゅうのかせきをみました。", exampleEn: "在博物館看了恐龍化石。" },
  { word: "猛獣", furigana: "もうじゅう", romaji: "moujuu", meaning: "猛獸", category: "biological_world", level: "N1", 
    exampleJa: "檻の中に危険な猛獣がいます。", exampleFurigana: "おりのなかにきけんなもうじゅうがいます。", exampleEn: "籠子裡有危險的猛獸。" },
  { word: "野鳥", furigana: "やちょう", romaji: "yachou", meaning: "野鳥", category: "biological_world", level: "N1", 
    exampleJa: "双眼鏡で野鳥を観察します。", exampleFurigana: "そうがんきょうでやちょうをかんさつします。", exampleEn: "用望遠鏡觀察野鳥。" },
  { word: "渡り鳥", furigana: "わたりどり", romaji: "wataridori", meaning: "候鳥", category: "biological_world", level: "N1", 
    exampleJa: "季節が変わると渡り鳥が飛んできます。", exampleFurigana: "きせつがかわるとわたりどりがとんできます。", exampleEn: "季節轉換時候鳥就會飛來。" },
  { word: "爬虫類", furigana: "はちゅうるい", romaji: "hachuurui", meaning: "爬蟲類", category: "biological_world", level: "N1", 
    exampleJa: "蛇やトカゲは爬虫類の仲間です。", exampleFurigana: "へびやとかげははちゅうるいのなかまです。", exampleEn: "蛇和蜥蜴都是爬蟲類。" },
  { word: "両生類", furigana: "りょうせいるい", romaji: "ryouseirui", meaning: "兩棲類", category: "biological_world", level: "N1", 
    exampleJa: "カエルは水と陸で生活する両生類です。", exampleFurigana: "かえるはみずとりくでせいかつするりょうせいるいです。", exampleEn: "青蛙是生活在水裡和陸地上的兩棲類。" },
  { word: "哺乳類", furigana: "ほにゅうるい", romaji: "honyuurui", meaning: "哺乳類", category: "biological_world", level: "N1", 
    exampleJa: "犬や猫、人間も哺乳類です。", exampleFurigana: "いぬやねこ、にんげんもほにゅうるいです。", exampleEn: "狗、貓和人類都是哺乳類。" },
  { word: "藻", furigana: "も", romaji: "mo", meaning: "藻類 / 水草", category: "biological_world", level: "N1", 
    exampleJa: "池の水に緑の藻が浮いています。", exampleFurigana: "いけのみずにみどりのもがういています。", exampleEn: "池水裡浮著綠色的藻類。" },
  { word: "苔", furigana: "こけ", romaji: "koke", meaning: "青苔", category: "biological_world", level: "N1", 
    exampleJa: "古い石垣に苔が生えています。", exampleFurigana: "ふるいいしがきにこけがはえています。", exampleEn: "古老的石牆上長滿了青苔。" },
  { word: "菌類", furigana: "きんるい", romaji: "kinrui", meaning: "菌類 (蕈菇類)", category: "biological_world", level: "N1", 
    exampleJa: "きのこは植物ではなく菌類の仲間です。", exampleFurigana: "きのこはしょくぶつではなくきんるいのなかまです。", exampleEn: "蘑菇不是植物，而是屬於菌類。" }
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
