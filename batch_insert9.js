const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "日光", furigana: "にっこう", romaji: "nikkou", meaning: "日光 / 陽光", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "日光を浴びてビタミンを作ります。", exampleFurigana: "にっこうをあびてびたみんをつくります。", exampleEn: "沐浴在陽光下製造維生素。" },
  { word: "月光", furigana: "げっこう", romaji: "gekkou", meaning: "月光", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "湖に月光が反射してきれいです。", exampleFurigana: "みずうみにげっこうがはんしゃしてきれいです。", exampleEn: "月光反射在湖面上非常美麗。" },
  { word: "星屑", furigana: "ほしくず", romaji: "hoshikuzu", meaning: "星塵", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "夜空に広がる星屑を眺めます。", exampleFurigana: "よぞらにひろがるほしくずをながめます。", exampleEn: "眺望夜空中廣闊的星塵。" },
  { word: "宇宙人", furigana: "うちゅうじん", romaji: "uchuujin", meaning: "外星人", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "本当に宇宙人はいるのでしょうか。", exampleFurigana: "ほんとうにうちゅうじんはいるのでしょうか。", exampleEn: "真的有外星人存在嗎？" },
  { word: "満月", furigana: "まんげつ", romaji: "mangetsu", meaning: "滿月", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "今夜はきれいな満月ですね。", exampleFurigana: "こんやはきれいなまんげつですね。", exampleEn: "今晚有著美麗的滿月呢。" },
  { word: "三日月", furigana: "みかづき", romaji: "mikadzuki", meaning: "新月 / 眉月", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "空に細い三日月が浮かんでいます。", exampleFurigana: "そらにほそいみかづきがうかんでいます。", exampleEn: "天空中浮現著細細的眉月。" },
  { word: "半月", furigana: "はんげつ", romaji: "hangetsu", meaning: "半月", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "空に半月が出ています。", exampleFurigana: "そらにはんげつがでています。", exampleEn: "天空中出現了半月。" },
  { word: "新月", furigana: "しんげつ", romaji: "shingetsu", meaning: "新月 / 朔月", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "新月の夜は星がよく見えます。", exampleFurigana: "しんげつのよるはほしがよくみえます。", exampleEn: "新月的夜晚星星看得很清楚。" },
  { word: "暴風", furigana: "ぼうふう", romaji: "boufuu", meaning: "暴風 / 狂風", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "暴風で木が倒れました。", exampleFurigana: "ぼうふうできがたおれました。", exampleEn: "狂風把樹給吹倒了。" },
  { word: "大雨", furigana: "おおあめ", romaji: "ooame", meaning: "大雨", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "昨日は大雨が降りました。", exampleFurigana: "きのうはおおあめがふりました。", exampleEn: "昨天下了大雨。" },

  // 地理與生態
  { word: "大陸", furigana: "たいりく", romaji: "tairiku", meaning: "大陸", category: "geography_ecology", level: "N2", 
    exampleJa: "世界には六つの大陸があります。", exampleFurigana: "せかいにはむっつのたいりくがあります。", exampleEn: "世界上有六大洲(大陸)。" },
  { word: "地形", furigana: "ちけい", romaji: "chikei", meaning: "地形", category: "geography_ecology", level: "N2", 
    exampleJa: "この辺りの地形は複雑です。", exampleFurigana: "このあたりのちけいはふくざつです。", exampleEn: "這附近的地形很複雜。" },
  { word: "地層", furigana: "ちそう", romaji: "chisou", meaning: "地層", category: "geography_ecology", level: "N1", 
    exampleJa: "崖の地層を観察します。", exampleFurigana: "がけのちそうをかんさつします。", exampleEn: "觀察懸崖的地層。" },
  { word: "断層", furigana: "だんそう", romaji: "dansou", meaning: "斷層", category: "geography_ecology", level: "N1", 
    exampleJa: "地震で活断層が動きました。", exampleFurigana: "じしんでかつだんそうがうごきました。", exampleEn: "活斷層因為地震而移動了。" },
  { word: "丘陵", furigana: "きゅうりょう", romaji: "kyuuryou", meaning: "丘陵", category: "geography_ecology", level: "N1", 
    exampleJa: "緑の丘陵がなだらかに続いています。", exampleFurigana: "みどりのきゅうりょうがなだらかにつづいています。", exampleEn: "綠色的丘陵平緩地綿延著。" },
  { word: "高山", furigana: "こうざん", romaji: "kouzan", meaning: "高山", category: "geography_ecology", level: "N1", 
    exampleJa: "高山には珍しい植物があります。", exampleFurigana: "こうざんにはめずらしいしょくぶつがあります。", exampleEn: "高山上有稀有的植物。" },
  { word: "火山灰", furigana: "かざんばい", romaji: "kazanbai", meaning: "火山灰", category: "geography_ecology", level: "N1", 
    exampleJa: "町に火山灰が降ってきました。", exampleFurigana: "まちにかざんばいがふってきました。", exampleEn: "城鎮降下了火山灰。" },
  { word: "氷山", furigana: "ひょうざん", romaji: "hyouzan", meaning: "冰山", category: "geography_ecology", level: "N1", 
    exampleJa: "海に巨大な氷山が浮かんでいます。", exampleFurigana: "うみにきょだいなひょうざんがうかんでいます。", exampleEn: "海中漂浮著巨大的冰山。" },
  { word: "沼地", furigana: "ぬまち", romaji: "numachi", meaning: "沼澤地", category: "geography_ecology", level: "N1", 
    exampleJa: "長靴を履いて沼地を歩きます。", exampleFurigana: "ながぐつをはいてぬまちをあるきます。", exampleEn: "穿著長靴走在沼澤地上。" },
  { word: "無人島", furigana: "むじんとう", romaji: "mujintou", meaning: "無人島", category: "geography_ecology", level: "N1", 
    exampleJa: "無人島でサバイバル生活をします。", exampleFurigana: "むじんとうでさばいばるせいかつをします。", exampleEn: "在無人島過著求生生活。" },

  // 生物世界
  { word: "水草", furigana: "みずくさ", romaji: "mizukusa", meaning: "水草", category: "biological_world", level: "N1", 
    exampleJa: "金魚鉢に水草を入れます。", exampleFurigana: "きんぎょばちにみずくさをいれます。", exampleEn: "在金魚缸裡放進水草。" },
  { word: "雑木林", furigana: "ぞうきばやし", romaji: "zoukibayashi", meaning: "雜木林", category: "biological_world", level: "N1", 
    exampleJa: "裏の雑木林でカブトムシを捕まえます。", exampleFurigana: "うらのぞうきばやしでかぶとむしをつかまえます。", exampleEn: "在後面的雜木林抓獨角仙。" },
  { word: "猛禽類", furigana: "もうきんるい", romaji: "moukinrui", meaning: "猛禽類", category: "biological_world", level: "N1", 
    exampleJa: "鷹や鷲は猛禽類です。", exampleFurigana: "たかやわしはもうきんるいです。", exampleEn: "老鷹和老鵰都是猛禽類。" },
  { word: "深海魚", furigana: "しんかいぎょ", romaji: "shinkaigyo", meaning: "深海魚", category: "biological_world", level: "N1", 
    exampleJa: "不思議な形をした深海魚を発見しました。", exampleFurigana: "ふしぎなかたちをしたしんかいぎょをはっけんしました。", exampleEn: "發現了外型奇特的深海魚。" },
  { word: "貝殻", furigana: "かいがら", romaji: "kaigara", meaning: "貝殼", category: "biological_world", level: "N2", 
    exampleJa: "浜辺できれいな貝殻を拾いました。", exampleFurigana: "はまべできれいなかいがらをひろいました。", exampleEn: "在海邊撿到了美麗的貝殼。" },
  { word: "珊瑚", furigana: "さんご", romaji: "sango", meaning: "珊瑚", category: "biological_world", level: "N1", 
    exampleJa: "きれいなピンク色の珊瑚を見ました。", exampleFurigana: "きれいなぴんくいろのさんごをみました。", exampleEn: "看到了美麗的粉紅色珊瑚。" },
  { word: "海草", furigana: "かいそう", romaji: "kaisou", meaning: "海草 / 海藻", category: "biological_world", level: "N2", 
    exampleJa: "亀が海草を食べています。", exampleFurigana: "かめがかいそうをたべています。", exampleEn: "海龜正在吃海草。" },
  { word: "枯れ葉", furigana: "かれは", romaji: "kareha", meaning: "枯葉", category: "biological_world", level: "N2", 
    exampleJa: "秋風で枯れ葉が舞っています。", exampleFurigana: "あきかぜでかれはがまっています。", exampleEn: "秋風吹拂著枯葉飛舞。" },
  { word: "新緑", furigana: "しんりょく", romaji: "shinryoku", meaning: "新綠 (初夏翠綠的草木)", category: "biological_world", level: "N1", 
    exampleJa: "五月は新緑がまぶしい季節です。", exampleFurigana: "ごがつはしんりょくがまぶしいきせつです。", exampleEn: "五月是新綠耀眼的季節。" },
  { word: "蕾", furigana: "つぼみ", romaji: "tsubomi", meaning: "花苞 / 蓓蕾", category: "biological_world", level: "N1", 
    exampleJa: "桜の蕾が膨らんできました。", exampleFurigana: "さくらのつぼみがふくらんできました。", exampleEn: "櫻花的花苞開始膨脹了。" }
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
