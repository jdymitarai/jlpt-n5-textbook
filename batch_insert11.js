const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "温暖化", furigana: "おんだんか", romaji: "ondanka", meaning: "全球暖化", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "地球の温暖化が進んでいます。", exampleFurigana: "ちきゅうのおんだんかがすすんでいます。", exampleEn: "地球的全球暖化正在加劇。" },
  { word: "異常気象", furigana: "いじょうきしょう", romaji: "ijoukishou", meaning: "異常天氣", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "今年は異常気象が続いています。", exampleFurigana: "ことしはいじょうきしょうがつづいています。", exampleEn: "今年的異常天氣持續不斷。" },
  { word: "花粉症", furigana: "かふんしょう", romaji: "kafunshou", meaning: "花粉症", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "春になると花粉症がひどくなります。", exampleFurigana: "はるになるとかふんしょうがひどくなります。", exampleEn: "一到春天花粉症就會變嚴重。" },
  { word: "満ち欠け", furigana: "みちかけ", romaji: "michikake", meaning: "月亮的盈虧", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "月の満ち欠けを観察します。", exampleFurigana: "つきのみちかけをかんさつします。", exampleEn: "觀察月亮的盈虧。" },
  { word: "朝焼け", furigana: "あさやけ", romaji: "asayake", meaning: "朝霞 / 晨彩", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "美しい朝焼けの空を見ました。", exampleFurigana: "うつくしいあさやけのそらをみました。", exampleEn: "看到了美麗的朝霞天空。" },
  { word: "木星", furigana: "もくせい", romaji: "mokusei", meaning: "木星", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "木星は太陽系で最も大きな惑星です。", exampleFurigana: "もくせいはたいようけいでもっともおおきなわくせいです。", exampleEn: "木星是太陽系中最大的行星。" },
  { word: "霰", furigana: "あられ", romaji: "arare", meaning: "冰珠 / 小冰雹", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "冷たい霰が降ってきました。", exampleFurigana: "つめたいあられがふってきました。", exampleEn: "下起了冰冷的冰珠。" },
  { word: "雹", furigana: "ひょう", romaji: "hyou", meaning: "冰雹", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "大きな雹が屋根に当たりました。", exampleFurigana: "おおきなひょうがやねにあたりました。", exampleEn: "巨大的冰雹打在屋頂上。" },
  { word: "蜃気楼", furigana: "しんきろう", romaji: "shinkirou", meaning: "海市蜃樓", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "砂漠で蜃気楼を見ました。", exampleFurigana: "さばくでしんきろうをみました。", exampleEn: "在沙漠裡看到了海市蜃樓。" },
  { word: "氷柱", furigana: "つらら", romaji: "tsurara", meaning: "冰柱", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "軒下に長い氷柱ができています。", exampleFurigana: "のきしたにながいつららができています。", exampleEn: "屋簷下結了長長的冰柱。" },

  // 地理與生態
  { word: "断崖絶壁", furigana: "だんがいぜっぺき", romaji: "dangaizeppeki", meaning: "懸崖峭壁", category: "geography_ecology", level: "N1", 
    exampleJa: "断崖絶壁の上に立ちました。", exampleFurigana: "だんがいぜっぺきのうえにたちました。", exampleEn: "站在懸崖峭壁之上。" },
  { word: "峠", furigana: "とうげ", romaji: "touge", meaning: "山口 / 埡口", category: "geography_ecology", level: "N1", 
    exampleJa: "険しい峠を越えて村に行きます。", exampleFurigana: "けわしいとうげをこえてむらにいきます。", exampleEn: "越過險峻的山口前往村莊。" },
  { word: "源流", furigana: "げんりゅう", romaji: "genryuu", meaning: "水源頭", category: "geography_ecology", level: "N1", 
    exampleJa: "川の源流を求めて山に入ります。", exampleFurigana: "かわのげんりゅうをもとめてやまにはいります。", exampleEn: "為尋找河川的源頭而入山。" },
  { word: "大自然", furigana: "だいしぜん", romaji: "daishizen", meaning: "大自然", category: "geography_ecology", level: "N2", 
    exampleJa: "大自然の中でリラックスします。", exampleFurigana: "だいしぜんのなかでりらっくすします。", exampleEn: "在大自然中放鬆身心。" },
  { word: "生態系", furigana: "せいたいけい", romaji: "seitaikei", meaning: "生態系", category: "geography_ecology", level: "N1", 
    exampleJa: "森の生態系を保護します。", exampleFurigana: "もりのせいたいけいをほごします。", exampleEn: "保護森林的生態系。" },
  { word: "天然", furigana: "てんねん", romaji: "tennen", meaning: "天然", category: "geography_ecology", level: "N2", 
    exampleJa: "これは天然の温泉です。", exampleFurigana: "これはてんねんのおんせんです。", exampleEn: "這是天然的溫泉。" },
  { word: "人工", furigana: "じんこう", romaji: "jinkou", meaning: "人工", category: "geography_ecology", level: "N2", 
    exampleJa: "人工の湖を作りました。", exampleFurigana: "じんこうのみずうみをつくりました。", exampleEn: "建造了人工湖。" },
  { word: "資源", furigana: "しげん", romaji: "shigen", meaning: "資源", category: "geography_ecology", level: "N2", 
    exampleJa: "限りある資源を大切にしましょう。", exampleFurigana: "かぎりあるしげんをたいせつにしましょう。", exampleEn: "珍惜有限的資源吧。" },
  { word: "鉱物", furigana: "こうぶつ", romaji: "koubutsu", meaning: "礦物", category: "geography_ecology", level: "N1", 
    exampleJa: "珍しい鉱物を集めています。", exampleFurigana: "めずらしいこうぶつをあつめています。", exampleEn: "正在收集稀有的礦物。" },
  { word: "化石", furigana: "かせき", romaji: "kaseki", meaning: "化石", category: "geography_ecology", level: "N1", 
    exampleJa: "恐竜の化石を発掘しました。", exampleFurigana: "きょうりゅうのかせきをはっくつしました。", exampleEn: "挖掘了恐龍的化石。" },

  // 生物世界
  { word: "蘭", furigana: "らん", romaji: "ran", meaning: "蘭花", category: "biological_world", level: "N1", 
    exampleJa: "きれいな蘭の花が咲きました。", exampleFurigana: "きれいならんのはながさきました。", exampleEn: "開出了美麗的蘭花。" },
  { word: "牡丹", furigana: "ぼたん", romaji: "botan", meaning: "牡丹花", category: "biological_world", level: "N1", 
    exampleJa: "庭で牡丹を育てています。", exampleFurigana: "にわでぼたんをそだてています。", exampleEn: "在院子裡種植著牡丹。" },
  { word: "杉", furigana: "すぎ", romaji: "sugi", meaning: "杉樹", category: "biological_world", level: "N1", 
    exampleJa: "山には杉の木がたくさんあります。", exampleFurigana: "やまにはすぎのきがたくさんあります。", exampleEn: "山上有很多杉樹。" },
  { word: "檜", furigana: "ひのき", romaji: "hinoki", meaning: "檜木", category: "biological_world", level: "N1", 
    exampleJa: "檜の香りがするお風呂に入ります。", exampleFurigana: "ひのきのかおりがするおふろにはいります。", exampleEn: "泡著散發檜木香氣的澡。" },
  { word: "柳", furigana: "やなぎ", romaji: "yanagi", meaning: "柳樹", category: "biological_world", level: "N1", 
    exampleJa: "川沿いに柳の木が揺れています。", exampleFurigana: "かわぞいにやなぎのきがゆれています。", exampleEn: "沿河的柳樹搖曳著。" },
  { word: "蓮", furigana: "はす", romaji: "hasu", meaning: "蓮花", category: "biological_world", level: "N1", 
    exampleJa: "池に蓮の花が咲いています。", exampleFurigana: "いけにはすのはながさいています。", exampleEn: "池塘裡開著蓮花。" },
  { word: "牧草", furigana: "ぼくそう", romaji: "bokusou", meaning: "牧草", category: "biological_world", level: "N1", 
    exampleJa: "牛が青々とした牧草を食べています。", exampleFurigana: "うしがあおあおとしたぼくそうをたべています。", exampleEn: "牛隻正在吃青翠的牧草。" },
  { word: "蔦", furigana: "つた", romaji: "tsuta", meaning: "藤蔓 / 爬山虎", category: "biological_world", level: "N1", 
    exampleJa: "古い壁に蔦が絡まっています。", exampleFurigana: "ふるいかべにつたがからまっています。", exampleEn: "古老的牆壁上纏繞著藤蔓。" },
  { word: "樹液", furigana: "じゅえき", romaji: "jueki", meaning: "樹液", category: "biological_world", level: "N1", 
    exampleJa: "カブトムシが樹液を吸っています。", exampleFurigana: "かぶとむしがじゅえきをすっています。", exampleEn: "獨角仙正在吸食樹液。" },
  { word: "茎", furigana: "くき", romaji: "kuki", meaning: "莖", category: "biological_world", level: "N2", 
    exampleJa: "植物の茎を切ります。", exampleFurigana: "しょくぶつのくきをきります。", exampleEn: "切斷植物的莖。" }
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
