const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "快晴", furigana: "かいせい", romaji: "kaisei", meaning: "晴朗無雲", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "明日は快晴になるでしょう。", exampleFurigana: "あしたはかいせいになるでしょう。", exampleEn: "明天應該會是晴朗無雲的好天氣。" },
  { word: "夕立", furigana: "ゆうだち", romaji: "yuudachi", meaning: "午後雷陣雨", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "夕立が降りそうなので急いで帰ります。", exampleFurigana: "ゆうだちがふりそうなのでいそいでかえります。", exampleEn: "好像要下午後雷陣雨了，趕快回家。" },
  { word: "俄雨", furigana: "にわかあめ", romaji: "niwakaame", meaning: "陣雨", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "突然の俄雨に降られました。", exampleFurigana: "とつぜんのにわかあめにふられました。", exampleEn: "被突然的陣雨淋濕了。" },
  { word: "霧雨", furigana: "きりさめ", romaji: "kirisame", meaning: "毛毛雨", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "外は霧雨が降っています。", exampleFurigana: "そとはきりさめがふっています。", exampleEn: "外面正下著毛毛雨。" },
  { word: "気象", furigana: "きしょう", romaji: "kishou", meaning: "氣象", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "気象予報士になりたいです。", exampleFurigana: "きしょうよほうしになりたいです。", exampleEn: "我想成為氣象預報員。" },
  { word: "紫外線", furigana: "しがいせん", romaji: "shigaisen", meaning: "紫外線", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "夏の紫外線には気をつけてください。", exampleFurigana: "なつのしがいせんにはきをつけてください。", exampleEn: "請小心夏天的紫外線。" },
  { word: "太陽系", furigana: "たいようけい", romaji: "taiyoukei", meaning: "太陽系", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "地球は太陽系の惑星です。", exampleFurigana: "ちきゅうはたいようけいのわくせいです。", exampleEn: "地球是太陽系的行星。" },
  { word: "満天", furigana: "まんてん", romaji: "manten", meaning: "滿天", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "山頂から満天の星空を見上げました。", exampleFurigana: "さんちょうからまんてんのほしぞらをみあげました。", exampleEn: "從山頂仰望滿天星空。" },
  { word: "氷点下", furigana: "ひょうてんか", romaji: "hyoutenka", meaning: "零下", category: "astronomy_meteorology", level: "N2", 
    exampleJa: "今朝の気温は氷点下でした。", exampleFurigana: "けさのきおんはひょうてんかでした。", exampleEn: "今早的氣溫是零下。" },
  { word: "雷雲", furigana: "らいうん", romaji: "raiun", meaning: "雷雨雲", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "遠くに黒い雷雲が見えます。", exampleFurigana: "とおくにくろいらいうんがみえます。", exampleEn: "能看見遠處有黑色的雷雨雲。" },

  // 地理與生態
  { word: "砂浜", furigana: "すなはま", romaji: "sunahama", meaning: "沙灘", category: "geography_ecology", level: "N2", 
    exampleJa: "子供たちが砂浜で遊んでいます。", exampleFurigana: "こどもたちがすなはまであそんでいます。", exampleEn: "孩子們在沙灘上玩耍。" },
  { word: "岬", furigana: "みさき", romaji: "misaki", meaning: "海角 / 岬", category: "geography_ecology", level: "N2", 
    exampleJa: "岬の先に灯台があります。", exampleFurigana: "みさきのさきにとうだいがあります。", exampleEn: "海角的盡頭有座燈塔。" },
  { word: "湾", furigana: "わん", romaji: "wan", meaning: "海灣", category: "geography_ecology", level: "N2", 
    exampleJa: "船が静かな湾に入りました。", exampleFurigana: "ふねがしずかなわんにはいりました。", exampleEn: "船駛入了平靜的海灣。" },
  { word: "氷河", furigana: "ひょうが", romaji: "hyouga", meaning: "冰河", category: "geography_ecology", level: "N2", 
    exampleJa: "巨大な氷河を見に行きました。", exampleFurigana: "きょだいなひょうがをみにいきました。", exampleEn: "去看了巨大的冰河。" },
  { word: "荒野", furigana: "こうや", romaji: "kouya", meaning: "荒野", category: "geography_ecology", level: "N1", 
    exampleJa: "見渡す限り荒野が広がっています。", exampleFurigana: "みわたするかぎりこうやがひろがっています。", exampleEn: "一望無際的荒野展開著。" },
  { word: "密林", furigana: "みつりん", romaji: "mitsurin", meaning: "叢林 / 密林", category: "geography_ecology", level: "N1", 
    exampleJa: "熱帯の密林を探検します。", exampleFurigana: "ねったいのみつりんをたんけんします。", exampleEn: "探險熱帶叢林。" },
  { word: "水源", furigana: "すいげん", romaji: "suigen", meaning: "水源", category: "geography_ecology", level: "N2", 
    exampleJa: "この川の水源はあの山です。", exampleFurigana: "このかわのすいげんはあのやまです。", exampleEn: "這條河的水源是那座山。" },
  { word: "河口", furigana: "かこう", romaji: "kakou", meaning: "河口", category: "geography_ecology", level: "N2", 
    exampleJa: "川が海に注ぐ河口に到着しました。", exampleFurigana: "かわがうみにそそぐかこうにとうちゃくしました。", exampleEn: "抵達了河水注入海洋的河口。" },
  { word: "大地", furigana: "だいち", romaji: "daichi", meaning: "大地", category: "geography_ecology", level: "N3", 
    exampleJa: "雨が乾いた大地を潤します。", exampleFurigana: "あめがかわいただいちをうるおします。", exampleEn: "雨水滋潤了乾燥的大地。" },
  { word: "大洋", furigana: "たいよう", romaji: "taiyou", meaning: "大洋 (海洋)", category: "geography_ecology", level: "N1", 
    exampleJa: "太平洋は世界で一番大きな大洋です。", exampleFurigana: "たいへいようはせかいでいちばんおおきなたいようです。", exampleEn: "太平洋是世界上最大的大洋。" },

  // 生物世界
  { word: "鯨", furigana: "くじら", romaji: "kujira", meaning: "鯨魚", category: "biological_world", level: "N2", 
    exampleJa: "海で大きな鯨を見ました。", exampleFurigana: "うみでおおきなくじらをみました。", exampleEn: "在海裡看到了巨大的鯨魚。" },
  { word: "鮫", furigana: "さめ", romaji: "same", meaning: "鯊魚", category: "biological_world", level: "N2", 
    exampleJa: "鮫は恐ろしい海の生き物です。", exampleFurigana: "さめはおそろしいうみのいきものです。", exampleEn: "鯊魚是可怕的海洋生物。" },
  { word: "海豚", furigana: "いるか", romaji: "iruka", meaning: "海豚", category: "biological_world", level: "N2", 
    exampleJa: "海豚が船について泳いできました。", exampleFurigana: "いるかがふねについておよいできました。", exampleEn: "海豚跟著船游了過來。" },
  { word: "蝸牛", furigana: "かたつむり", romaji: "katatsumuri", meaning: "蝸牛", category: "biological_world", level: "N2", 
    exampleJa: "雨上がりの葉っぱに蝸牛がいます。", exampleFurigana: "あめあがりのはっぱにかたつむりがいます。", exampleEn: "雨後的葉子上有蝸牛。" },
  { word: "蛍", furigana: "ほたる", romaji: "hotaru", meaning: "螢火蟲", category: "biological_world", level: "N2", 
    exampleJa: "夏の夜に蛍が光っています。", exampleFurigana: "なつのよるにほたるがひかっています。", exampleEn: "夏夜裡螢火蟲閃爍著光芒。" },
  { word: "蜻蛉", furigana: "とんぼ", romaji: "tonbo", meaning: "蜻蜓", category: "biological_world", level: "N2", 
    exampleJa: "秋になると蜻蛉がたくさん飛びます。", exampleFurigana: "あきになるととんぼがたくさんとびます。", exampleEn: "一到秋天就會有許多蜻蜓飛舞。" },
  { word: "薔薇", furigana: "ばら", romaji: "bara", meaning: "玫瑰", category: "biological_world", level: "N2", 
    exampleJa: "誕生日に赤い薔薇をもらいました。", exampleFurigana: "たんじょうびにあかいばらをもらいました。", exampleEn: "生日時收到了紅色的玫瑰。" },
  { word: "菊", furigana: "きく", romaji: "kiku", meaning: "菊花", category: "biological_world", level: "N2", 
    exampleJa: "秋は菊の花がきれいに咲きます。", exampleFurigana: "あきはきくのはながきれいにさきます。", exampleEn: "秋天菊花開得很漂亮。" },
  { word: "紅葉", furigana: "もみじ", romaji: "momiji", meaning: "楓葉", category: "biological_world", level: "N3", 
    exampleJa: "京都へ紅葉を見に行きたいです。", exampleFurigana: "きょうとへもみじをみにいきたいです。", exampleEn: "想去京都賞楓。" },
  { word: "森林", furigana: "しんりん", romaji: "shinrin", meaning: "森林", category: "biological_world", level: "N2", 
    exampleJa: "この山には深い森林があります。", exampleFurigana: "このやまにはふかいしんりんがあります。", exampleEn: "這座山上有深邃的森林。" }
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
