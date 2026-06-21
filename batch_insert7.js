const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 天文與氣象
  { word: "満ち潮", furigana: "みちしお", romaji: "michishio", meaning: "漲潮", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "満ち潮の時に釣りをします。", exampleFurigana: "みちしおのときにつりをします。", exampleEn: "在漲潮的時候釣魚。" },
  { word: "引き潮", furigana: "ひきしお", romaji: "hikishio", meaning: "退潮", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "引き潮で海辺が広くなりました。", exampleFurigana: "ひきしおでうみべがひろくなりました。", exampleEn: "因為退潮，海邊變得寬闊了。" },
  { word: "流星群", furigana: "りゅうせいぐん", romaji: "ryuuseigun", meaning: "流星雨", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "今夜は流星群が見られます。", exampleFurigana: "こんやはりゅうせいぐんがみられます。", exampleEn: "今晚可以看到流星雨。" },
  { word: "隕石", furigana: "いんせき", romaji: "inseki", meaning: "隕石", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "昔、ここに大きな隕石が落ちました。", exampleFurigana: "むかし、ここにおおきないんせきがおちました。", exampleEn: "以前這裡掉落過一顆大隕石。" },
  { word: "積乱雲", furigana: "せきらんうん", romaji: "sekiranun", meaning: "積雨雲", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "夏空に積乱雲が湧き上がっています。", exampleFurigana: "なつぞらにせきらんうんがわきあがっています。", exampleEn: "夏日的天空中湧現出積雨雲。" },
  { word: "木枯らし", furigana: "こがらし", romaji: "kogarashi", meaning: "秋末冬初的寒風", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "冷たい木枯らしが吹いています。", exampleFurigana: "つめたいこがらしがふいています。", exampleEn: "吹著寒冷的冬風。" },
  { word: "旋風", furigana: "つむじかぜ", romaji: "tsumujikaze", meaning: "旋風", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "校庭で旋風が起こりました。", exampleFurigana: "こうていでつむじかぜがおこりました。", exampleEn: "操場上颳起了旋風。" },
  { word: "竜巻", furigana: "たつまき", romaji: "tatsumaki", meaning: "龍捲風", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "アメリカで大きな竜巻が発生しました。", exampleFurigana: "あめりかでおおきなたつまきがはっせいしました。", exampleEn: "美國發生了巨大的龍捲風。" },
  { word: "稲光", furigana: "いなびかり", romaji: "inabikari", meaning: "閃電", category: "astronomy_meteorology", level: "N1", 
    exampleJa: "遠くで稲光が光りました。", exampleFurigana: "とおくでいなびかりがひかりました。", exampleEn: "遠處閃爍著閃電。" },
  { word: "日差し", furigana: "ひざし", romaji: "hizashi", meaning: "陽光照射", category: "astronomy_meteorology", level: "N3", 
    exampleJa: "春の暖かな日差しを感じます。", exampleFurigana: "はるのあたたかなひざしをかんじます。", exampleEn: "感受著春天溫暖的陽光。" },

  // 地理與生態
  { word: "砂丘", furigana: "さきゅう", romaji: "sakyuu", meaning: "沙丘", category: "geography_ecology", level: "N1", 
    exampleJa: "鳥取砂丘に遊びに行きました。", exampleFurigana: "とっとりさきゅうにあそびにいきました。", exampleEn: "去鳥取沙丘玩了。" },
  { word: "海峡", furigana: "かいきょう", romaji: "kaikyou", meaning: "海峽", category: "geography_ecology", level: "N1", 
    exampleJa: "船で海峡を渡ります。", exampleFurigana: "ふねでかいきょうをわたります。", exampleEn: "搭船渡過海峽。" },
  { word: "運河", furigana: "うんが", romaji: "unga", meaning: "運河", category: "geography_ecology", level: "N1", 
    exampleJa: "この町には古い運河があります。", exampleFurigana: "このまちにはふるいうんががあります。", exampleEn: "這座小鎮有一條古老的運河。" },
  { word: "滝壺", furigana: "たきつぼ", romaji: "takitsubo", meaning: "瀑布深潭", category: "geography_ecology", level: "N1", 
    exampleJa: "水が勢いよく滝壺に落ちます。", exampleFurigana: "みずがいきおいよくたきつぼにおちます。", exampleEn: "水流猛烈地落入瀑布深潭中。" },
  { word: "洞穴", furigana: "どうけつ", romaji: "douketsu", meaning: "洞穴", category: "geography_ecology", level: "N1", 
    exampleJa: "探検隊が暗い洞穴に入りました。", exampleFurigana: "たんけんたいがくらいどうけつにはいりました。", exampleEn: "探險隊進入了黑暗的洞穴。" },
  { word: "樹海", furigana: "じゅかい", romaji: "jukai", meaning: "樹海 (茂密的森林)", category: "geography_ecology", level: "N1", 
    exampleJa: "富士山の麓には広い樹海が広がっています。", exampleFurigana: "ふじさんのふもとにはひろいじゅかいがひろがっています。", exampleEn: "富士山腳下有著廣闊的樹海。" },
  { word: "断崖", furigana: "だんがい", romaji: "dangai", meaning: "懸崖 / 斷崖", category: "geography_ecology", level: "N1", 
    exampleJa: "断崖絶壁に立って海を見下ろします。", exampleFurigana: "だんがいぜっぺきにたってうみをみおろします。", exampleEn: "站在懸崖峭壁上俯瞰大海。" },
  { word: "珊瑚礁", furigana: "さんごしょう", romaji: "sangoshou", meaning: "珊瑚礁", category: "geography_ecology", level: "N1", 
    exampleJa: "美しい珊瑚礁の海で泳ぎます。", exampleFurigana: "うつくしいさんごしょうのうみでおよぎます。", exampleEn: "在美麗的珊瑚礁海域游泳。" },
  { word: "湧き水", furigana: "わきみず", romaji: "wakimizu", meaning: "湧泉 / 泉水", category: "geography_ecology", level: "N1", 
    exampleJa: "山で冷たい湧き水を飲みました。", exampleFurigana: "やまでつめたいわきみずをのみました。", exampleEn: "在山上喝了冰涼的湧泉水。" },
  { word: "泥沼", furigana: "どろぬま", romaji: "doronuma", meaning: "泥沼", category: "geography_ecology", level: "N1", 
    exampleJa: "車が泥沼にはまって動けません。", exampleFurigana: "くるまがどろぬまにはまってうごけません。", exampleEn: "車子陷入泥沼動彈不得。" },

  // 生物世界
  { word: "蝙蝠", furigana: "こうもり", romaji: "koumori", meaning: "蝙蝠", category: "biological_world", level: "N1", 
    exampleJa: "夕方になると蝙蝠が飛び交います。", exampleFurigana: "ゆうがたになるとこうもりがとびかいます。", exampleEn: "一到傍晚蝙蝠就會飛來飛去。" },
  { word: "駱駝", furigana: "らくだ", romaji: "rakuda", meaning: "駱駝", category: "biological_world", level: "N1", 
    exampleJa: "砂漠で駱駝に乗りました。", exampleFurigana: "さばくでらくだにのりました。", exampleEn: "在沙漠裡騎了駱駝。" },
  { word: "麒麟", furigana: "きりん", romaji: "kirin", meaning: "長頸鹿", category: "biological_world", level: "N2", 
    exampleJa: "動物園で首の長い麒麟を見ました。", exampleFurigana: "どうぶつえんでくびのながいきりんをみました。", exampleEn: "在動物園裡看到了長脖子的長頸鹿。" },
  { word: "犀", furigana: "さい", romaji: "sai", meaning: "犀牛", category: "biological_world", level: "N1", 
    exampleJa: "犀の角はとても硬いです。", exampleFurigana: "さいのつのはとてもかたいです。", exampleEn: "犀牛的角非常堅硬。" },
  { word: "河馬", furigana: "かば", romaji: "kaba", meaning: "河馬", category: "biological_world", level: "N1", 
    exampleJa: "大きな口を開けた河馬を見ました。", exampleFurigana: "おおきなくちをあけたかばをみました。", exampleEn: "看到了張著大嘴的河馬。" },
  { word: "蠍", furigana: "さそり", romaji: "sasori", meaning: "蠍子", category: "biological_world", level: "N1", 
    exampleJa: "砂漠には危険な蠍がいます。", exampleFurigana: "さばくにはきけんなさそりがいます。", exampleEn: "沙漠裡有危險的蠍子。" },
  { word: "蜥蜴", furigana: "とかげ", romaji: "tokage", meaning: "蜥蜴", category: "biological_world", level: "N1", 
    exampleJa: "壁に蜥蜴が張り付いています。", exampleFurigana: "かべにとかげがはりついています。", exampleEn: "壁上趴著一隻蜥蜴。" },
  { word: "蜈蚣", furigana: "むかで", romaji: "mukade", meaning: "蜈蚣", category: "biological_world", level: "N1", 
    exampleJa: "石の下から蜈蚣が出てきました。", exampleFurigana: "いしのしたからむかでがでてきました。", exampleEn: "蜈蚣從石頭下面爬了出來。" },
  { word: "蚯蚓", furigana: "みみず", romaji: "mimizu", meaning: "蚯蚓", category: "biological_world", level: "N1", 
    exampleJa: "雨の後は蚯蚓が地面に出てきます。", exampleFurigana: "あめのあとはみみずがじめんにでてきます。", exampleEn: "下雨過後蚯蚓會爬出地面。" },
  { word: "蜘蛛の巣", furigana: "くものす", romaji: "kumonosu", meaning: "蜘蛛網", category: "biological_world", level: "N1", 
    exampleJa: "森で蜘蛛の巣に引っかかりました。", exampleFurigana: "もりでくものすにひっかかりました。", exampleEn: "在森林裡被蜘蛛網纏住了。" }
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
