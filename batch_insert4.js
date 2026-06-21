const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "日光", furigana: "にっこう", romaji: "nikkou", meaning: "日光 / 陽光", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "日光を浴びて散歩します。", exampleFurigana: "にっこうをあびてさんぽします。", exampleEn: "沐浴著陽光散步。" },
  { word: "流れ星", furigana: "ながれぼし", romaji: "nagareboshi", meaning: "流星", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "夜空に流れ星を見つけました。", exampleFurigana: "よぞらにながれぼしをみつけました。", exampleEn: "在夜空發現了流星。" },
  { word: "青空", furigana: "あおぞら", romaji: "aozora", meaning: "藍天", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "綺麗な青空が広がっています。", exampleFurigana: "きれいなあおぞらがひろがっています。", exampleEn: "展開著美麗的藍天。" },
  { word: "夕焼け", furigana: "ゆうやけ", romaji: "yuuyake", meaning: "晚霞", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "夕焼けがとても美しいです。", exampleFurigana: "ゆうやけがとてもうつくしいです。", exampleEn: "晚霞非常美麗。" },
  { word: "吹雪", furigana: "ふぶき", romaji: "fubuki", meaning: "暴風雪", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "吹雪で前が見えません。", exampleFurigana: "ふぶきでまえがみえません。", exampleEn: "暴風雪讓人看不見前方。" },
  { word: "梅雨", furigana: "つゆ", romaji: "tsuyu", meaning: "梅雨季", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "日本の梅雨は雨が多いです。", exampleFurigana: "にほんのつゆはあめがおおいです。", exampleEn: "日本的梅雨季雨水很多。" },
  { word: "夕日", furigana: "ゆうひ", romaji: "yuuhi", meaning: "夕陽", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "海に沈む夕日を見ます。", exampleFurigana: "うみにしずむゆうひをみます。", exampleEn: "觀看沉入海中的夕陽。" },
  { word: "朝日", furigana: "あさひ", romaji: "asahi", meaning: "朝陽", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "山の上で朝日を待ちます。", exampleFurigana: "やまのうえであさひをまちます。", exampleEn: "在山頂上等待朝陽。" },
  { word: "稲妻", furigana: "いなずま", romaji: "inazuma", meaning: "閃電", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "遠くで稲妻が光りました。", exampleFurigana: "とおくでいなずまがひかりました。", exampleEn: "遠方閃爍著閃電。" },
  { word: "湿度", furigana: "しつど", romaji: "shitsudo", meaning: "濕度", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "今日は湿度が高くて暑いです。", exampleFurigana: "きょうはしつどがたかくてあついです。", exampleEn: "今天濕度很高很熱。" },

  // 地理與生態
  { word: "野原", furigana: "のはら", romaji: "nohara", meaning: "原野 / 草地", category: "geography_ecology", level: "N4", 
    exampleJa: "子供たちが野原で遊んでいます。", exampleFurigana: "こどもたちがのはらであそんでいます。", exampleEn: "孩子們在草地上玩耍。" },
  { word: "岸", furigana: "きし", romaji: "kishi", meaning: "岸邊", category: "geography_ecology", level: "N3", 
    exampleJa: "船が岸に着きました。", exampleFurigana: "ふねがきしにつきました。", exampleEn: "船靠岸了。" },
  { word: "泉", furigana: "いずみ", romaji: "izumi", meaning: "泉水", category: "geography_ecology", level: "N3", 
    exampleJa: "森の中にきれいな泉があります。", exampleFurigana: "もりのなかにきれいないずみがあります。", exampleEn: "森林裡有座美麗的泉水。" },
  { word: "洞窟", furigana: "どうくつ", romaji: "doukutsu", meaning: "洞窟", category: "geography_ecology", level: "N2", 
    exampleJa: "探検家が洞窟に入りました。", exampleFurigana: "たんけんかがどうくつにはいりました。", exampleEn: "探險家進入了洞窟。" },
  { word: "岩", furigana: "いわ", romaji: "iwa", meaning: "岩石", category: "geography_ecology", level: "N3", 
    exampleJa: "大きな岩の上に座ります。", exampleFurigana: "おおきないわのうえにすわります。", exampleEn: "坐在巨大的岩石上。" },
  { word: "半島", furigana: "はんとう", romaji: "hantou", meaning: "半島", category: "geography_ecology", level: "N3", 
    exampleJa: "この半島は海が美しいです。", exampleFurigana: "このはんとうはうみがうつくしいです。", exampleEn: "這個半島的海很美。" },
  { word: "大陸", furigana: "たいりく", romaji: "tairiku", meaning: "大陸", category: "geography_ecology", level: "N3", 
    exampleJa: "新しい大陸を発見しました。", exampleFurigana: "あたらしいたいりくをはっけんしました。", exampleEn: "發現了新大陸。" },
  { word: "氷山", furigana: "ひょうざん", romaji: "hyouzan", meaning: "冰山", category: "geography_ecology", level: "N2", 
    exampleJa: "船から氷山が見えました。", exampleFurigana: "ふねからひょうざんがみえました。", exampleEn: "從船上看見了冰山。" },
  { word: "崖", furigana: "がけ", romaji: "gake", meaning: "懸崖", category: "geography_ecology", level: "N2", 
    exampleJa: "高い崖から海を見下ろします。", exampleFurigana: "たかいがけからうみをみおろします。", exampleEn: "從高峻的懸崖俯瞰大海。" },
  { word: "地面", furigana: "じめん", romaji: "jimen", meaning: "地面", category: "geography_ecology", level: "N3", 
    exampleJa: "雨で地面が濡れています。", exampleFurigana: "あめでじめんがぬれています。", exampleEn: "因為下雨地面濕濕的。" },

  // 生物世界
  { word: "蜘蛛", furigana: "くも", romaji: "kumo", meaning: "蜘蛛", category: "biological_world", level: "N2", 
    exampleJa: "部屋の隅に蜘蛛の巣があります。", exampleFurigana: "へやのすみにくものすがあります。", exampleEn: "房間角落有蜘蛛網。" },
  { word: "蜂", furigana: "はち", romaji: "hachi", meaning: "蜜蜂", category: "biological_world", level: "N2", 
    exampleJa: "蜂が花に集まっています。", exampleFurigana: "はちがはなにあつまっています。", exampleEn: "蜜蜂聚集在花朵上。" },
  { word: "蟻", furigana: "あり", romaji: "ari", meaning: "螞蟻", category: "biological_world", level: "N2", 
    exampleJa: "蟻が砂糖を運んでいます。", exampleFurigana: "ありがさとうをはこんでいます。", exampleEn: "螞蟻在搬運砂糖。" },
  { word: "ハエ", furigana: "はえ", romaji: "hae", meaning: "蒼蠅", category: "biological_world", level: "N2", 
    exampleJa: "部屋にハエが飛んでいます。", exampleFurigana: "へやにはえがとんでいます。", exampleEn: "房間裡有蒼蠅在飛。" },
  { word: "鳩", furigana: "はと", romaji: "hato", meaning: "鴿子", category: "biological_world", level: "N2", 
    exampleJa: "公園で鳩に餌をあげます。", exampleFurigana: "こうえんではとにえさをあげます。", exampleEn: "在公園餵鴿子。" },
  { word: "烏", furigana: "からす", romaji: "karasu", meaning: "烏鴉", category: "biological_world", level: "N2", 
    exampleJa: "黒い烏が木に止まっています。", exampleFurigana: "くろいからすがきにとまっています。", exampleEn: "黑色的烏鴉停在樹上。" },
  { word: "亀", furigana: "かめ", romaji: "kame", meaning: "烏龜", category: "biological_world", level: "N3", 
    exampleJa: "池に亀がいます。", exampleFurigana: "いけにかめがいます。", exampleEn: "池塘裡有烏龜。" },
  { word: "蟹", furigana: "かに", romaji: "kani", meaning: "螃蟹", category: "biological_world", level: "N3", 
    exampleJa: "海で蟹を捕まえました。", exampleFurigana: "うみでかにをつかまえました。", exampleEn: "在海邊抓到了螃蟹。" },
  { word: "海老", furigana: "えび", romaji: "ebi", meaning: "蝦子", category: "biological_world", level: "N3", 
    exampleJa: "海老の天ぷらが好きです。", exampleFurigana: "えびのてんぷらがすきです。", exampleEn: "喜歡吃炸蝦天婦羅。" },
  { word: "羽", furigana: "はね", romaji: "hane", meaning: "羽毛 / 翅膀", category: "biological_world", level: "N3", 
    exampleJa: "鳥が羽を広げて飛び立ちます。", exampleFurigana: "とりがはねをひろげてとびたちます。", exampleEn: "鳥兒張開翅膀起飛。" }
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
  // Check if word already exists
  if (!data.vocabulary.some(v => v.word === entry.word)) {
    data.vocabulary.push(entry);
    addedCount++;
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${addedCount} words to data.js!`);
