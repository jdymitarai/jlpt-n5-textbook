const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "星座", furigana: "せいざ", romaji: "seiza", meaning: "星座", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "夜空に星座を探します。", exampleFurigana: "よぞらにせいざをさがします。", exampleEn: "在夜空中尋找星座。" },
  { word: "月食", furigana: "げっしょく", romaji: "gesshoku", meaning: "月食", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "今夜は月食が見られます。", exampleFurigana: "こんやはげっしょくがみられます。", exampleEn: "今晚可以看到月食。" },
  { word: "日食", furigana: "にっしょく", romaji: "nisshoku", meaning: "日食", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "皆既日食を観察します。", exampleFurigana: "かいきにっしょくをかんさつします。", exampleEn: "觀察日全食。" },
  { word: "彗星", furigana: "すいせい", romaji: "suisei", meaning: "彗星", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "空に彗星が現れました。", exampleFurigana: "そらにすいせいがあらわれました。", exampleEn: "天空中出現了彗星。" },
  { word: "霜", furigana: "しも", romaji: "shimo", meaning: "霜", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "冬の朝は霜が降ります。", exampleFurigana: "ふゆのあさはしもがふります。", exampleEn: "冬天的早晨會下霜。" },
  { word: "小雨", furigana: "こさめ", romaji: "kosame", meaning: "小雨", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "小雨が降っています。", exampleFurigana: "こさめがふっています。", exampleEn: "正在下著小雨。" },
  { word: "大雨", furigana: "おおあめ", romaji: "ooame", meaning: "大雨", category: "astronomy_meteorology", level: "N4", 
    exampleJa: "昨日は大雨でした。", exampleFurigana: "きのうはおおあめでした。", exampleEn: "昨天下了大雨。" },
  { word: "大雪", furigana: "おおゆき", romaji: "ooyuki", meaning: "大雪", category: "astronomy_meteorology", level: "N4", 
    exampleJa: "大雪で電車が止まりました。", exampleFurigana: "おおゆきででんしゃがとまりました。", exampleEn: "因為大雪電車停駛了。" },
  { word: "天の川", furigana: "あまのがわ", romaji: "amanogawa", meaning: "銀河", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "夏は天の川がきれいです。", exampleFurigana: "なつはあまのがわがきれいです。", exampleEn: "夏天的銀河很美。" },
  { word: "夕暮れ", furigana: "ゆうぐれ", romaji: "yuugure", meaning: "黃昏 / 日暮", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "夕暮れの空が赤く染まります。", exampleFurigana: "ゆうぐれのそらがあかくそまります。", exampleEn: "黃昏的天空染成紅色。" },

  // 地理與生態
  { word: "土", furigana: "つち", romaji: "tsuchi", meaning: "泥土 / 土地", category: "geography_ecology", level: "N4", 
    exampleJa: "靴に土がつきました。", exampleFurigana: "くつにつちがつきました。", exampleEn: "鞋子沾到了泥土。" },
  { word: "水溜まり", furigana: "みずたまり", romaji: "mizutamari", meaning: "水窪", category: "geography_ecology", level: "N2", 
    exampleJa: "道に水溜まりがあります。", exampleFurigana: "みちにみずたまりがあります。", exampleEn: "路上有水窪。" },
  { word: "頂上", furigana: "ちょうじょう", romaji: "choujou", meaning: "山頂", category: "geography_ecology", level: "N3", 
    exampleJa: "やっと山の頂上に着きました。", exampleFurigana: "やっとやまのちょうじょうにつきました。", exampleEn: "終於抵達山頂了。" },
  { word: "麓", furigana: "ふもと", romaji: "fumoto", meaning: "山腳", category: "geography_ecology", level: "N2", 
    exampleJa: "山の麓に村があります。", exampleFurigana: "やまのふもとにむらがあります。", exampleEn: "山腳下有一座村莊。" },
  { word: "盆地", furigana: "ぼんち", romaji: "bonchi", meaning: "盆地", category: "geography_ecology", level: "N2", 
    exampleJa: "この町は盆地にあります。", exampleFurigana: "このまちはぼんちにあります。", exampleEn: "這座城鎮位於盆地。" },
  { word: "高原", furigana: "こうげん", romaji: "kougen", meaning: "高原", category: "geography_ecology", level: "N3", 
    exampleJa: "夏は高原が涼しいです。", exampleFurigana: "なつはこうげんがすずしいです。", exampleEn: "夏天的高原很涼爽。" },
  { word: "湿地", furigana: "しっち", romaji: "shitchi", meaning: "濕地", category: "geography_ecology", level: "N2", 
    exampleJa: "湿地に鳥が集まります。", exampleFurigana: "しっちにとりがあつまります。", exampleEn: "鳥群聚集在濕地。" },
  { word: "田んぼ", furigana: "たんぼ", romaji: "tanbo", meaning: "稻田", category: "geography_ecology", level: "N3", 
    exampleJa: "田んぼに水が入りました。", exampleFurigana: "たんぼにみずがはいりました。", exampleEn: "稻田裡注滿了水。" },
  { word: "畑", furigana: "はたけ", romaji: "hatake", meaning: "田地 / 旱田", category: "geography_ecology", level: "N4", 
    exampleJa: "畑で野菜を育てます。", exampleFurigana: "はたけでやさいをそだてます。", exampleEn: "在田裡種植蔬菜。" },
  { word: "水面", furigana: "すいめん", romaji: "suimen", meaning: "水面", category: "geography_ecology", level: "N2", 
    exampleJa: "水面に月が映ります。", exampleFurigana: "すいめんにつきがうつります。", exampleEn: "月亮倒映在水面上。" },

  // 生物世界
  { word: "猪", furigana: "いのしし", romaji: "inoshishi", meaning: "野豬", category: "biological_world", level: "N2", 
    exampleJa: "森から猪が出てきました。", exampleFurigana: "もりからいのししがでてきました。", exampleEn: "野豬從森林裡出來了。" },
  { word: "鷲", furigana: "わし", romaji: "washi", meaning: "老鷹 (鷲)", category: "biological_world", level: "N1", 
    exampleJa: "空高く鷲が飛んでいます。", exampleFurigana: "そらたかくわしがとんでいます。", exampleEn: "老鷹在天空中高飛。" },
  { word: "雀", furigana: "すずめ", romaji: "suzume", meaning: "麻雀", category: "biological_world", level: "N3", 
    exampleJa: "庭で雀が鳴いています。", exampleFurigana: "にわですずめがないています。", exampleEn: "麻雀在院子裡鳴叫。" },
  { word: "燕", furigana: "つばめ", romaji: "tsubame", meaning: "燕子", category: "biological_world", level: "N2", 
    exampleJa: "春になると燕が来ます。", exampleFurigana: "はるになるとつばめがきます。", exampleEn: "一到春天燕子就會來。" },
  { word: "梅", furigana: "うめ", romaji: "ume", meaning: "梅花", category: "biological_world", level: "N3", 
    exampleJa: "庭の梅が咲きました。", exampleFurigana: "にわのうめがさきました。", exampleEn: "院子裡的梅花開了。" },
  { word: "松", furigana: "まつ", romaji: "matsu", meaning: "松樹", category: "biological_world", level: "N3", 
    exampleJa: "公園に立派な松があります。", exampleFurigana: "こうえんにりっぱなまつがあります。", exampleEn: "公園裡有棵雄偉的松樹。" },
  { word: "落ち葉", furigana: "おちば", romaji: "ochiba", meaning: "落葉", category: "biological_world", level: "N3", 
    exampleJa: "落ち葉を集めて燃やします。", exampleFurigana: "おちばをあつめてもやします。", exampleEn: "收集落葉並燒掉。" },
  { word: "雑草", furigana: "ざっそう", romaji: "zassou", meaning: "雜草", category: "biological_world", level: "N2", 
    exampleJa: "庭の雑草を抜きます。", exampleFurigana: "にわのざっそうをぬきます。", exampleEn: "拔除院子裡的雜草。" },
  { word: "果実", furigana: "かじつ", romaji: "kajitsu", meaning: "果實", category: "biological_world", level: "N2", 
    exampleJa: "木に赤い果実がなりました。", exampleFurigana: "きにあかいかじつがなりました。", exampleEn: "樹上結了紅色的果實。" },
  { word: "芝生", furigana: "しばふ", romaji: "shibafu", meaning: "草皮", category: "biological_world", level: "N3", 
    exampleJa: "公園の芝生に座ります。", exampleFurigana: "こうえんのしばふにすわります。", exampleEn: "坐在公園的草皮上。" }
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
