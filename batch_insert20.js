const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "相棒", furigana: "あいぼう", romaji: "aibou", meaning: "搭檔 / 夥伴", category: "relations_human", level: "N2", 
    exampleJa: "彼は仕事の良き相棒です。", exampleFurigana: "かれはしごとのよきあいぼうです。", exampleEn: "他是工作上的好搭檔。" },
  { word: "悪友", furigana: "あくゆう", romaji: "akuyuu", meaning: "損友", category: "relations_human", level: "N1", 
    exampleJa: "学生時代の悪友と飲みに行きます。", exampleFurigana: "がくせいじだいのあくゆうとのみにいきます。", exampleEn: "和學生時代的損友去喝酒。" },
  { word: "同窓生", furigana: "どうそうせい", romaji: "dousousei", meaning: "同校同學 / 校友", category: "relations_human", level: "N2", 
    exampleJa: "大学の同窓生が集まりました。", exampleFurigana: "だいがくのどうそうせいがあつまりました。", exampleEn: "大學的校友們聚在一起了。" },
  { word: "取締役", furigana: "とりしまりやく", romaji: "torishimariyaku", meaning: "董事", category: "relations_human", level: "N1", 
    exampleJa: "彼は会社の取締役に就任しました。", exampleFurigana: "かれはかいしゃのとりしまりやくにしゅうにんしました。", exampleEn: "他上任為公司的董事。" },
  { word: "重役", furigana: "じゅうやく", romaji: "juuyaku", meaning: "高層 / 董事", category: "relations_human", level: "N1", 
    exampleJa: "重役会議で新しい方針が決まりました。", exampleFurigana: "じゅうやくかいぎであたらしいほうしんがきまりました。", exampleEn: "在高層會議中決定了新方針。" },
  { word: "顧問", furigana: "こもん", romaji: "komon", meaning: "顧問", category: "relations_human", level: "N1", 
    exampleJa: "法律の専門家を顧問に迎えます。", exampleFurigana: "ほうりつのせんもんかをこもんにむかえます。", exampleEn: "聘請法律專家擔任顧問。" },
  { word: "秘書", furigana: "ひしょ", romaji: "hisho", meaning: "秘書", category: "relations_human", level: "N2", 
    exampleJa: "社長の秘書として働いています。", exampleFurigana: "しゃちょうのひしょとしてはたらいています。", exampleEn: "作為社長的秘書工作。" },
  { word: "後継者", furigana: "こうけいしゃ", romaji: "koukeisha", meaning: "接班人 / 繼承者", category: "relations_human", level: "N1", 
    exampleJa: "優秀な後継者を育成します。", exampleFurigana: "ゆうしゅうなこうけいしゃをいくせいします。", exampleEn: "培育優秀的接班人。" },
  { word: "跡継ぎ", furigana: "あとつぎ", romaji: "atotsugi", meaning: "繼承人 / 接班人", category: "relations_human", level: "N2", 
    exampleJa: "伝統工芸の跡継ぎを探しています。", exampleFurigana: "でんとうこうげいのあとつぎをさがしています。", exampleEn: "正在尋找傳統工藝的繼承人。" },
  { word: "世継ぎ", furigana: "よつぎ", romaji: "yotsugi", meaning: "繼承人 / 後嗣", category: "relations_human", level: "N1", 
    exampleJa: "王家の世継ぎが誕生しました。", exampleFurigana: "おうけのよつぎがたんじょうしました。", exampleEn: "王室的繼承人誕生了。" },

  // 日常工作與經濟 (economy_business)
  { word: "産業", furigana: "さんぎょう", romaji: "sangyou", meaning: "產業 / 工業", category: "economy_business", level: "N3", 
    exampleJa: "この地域は自動車産業が盛んです。", exampleFurigana: "このちいきはじどうしゃさんぎょうがさかんです。", exampleEn: "這個地區汽車產業很繁盛。" },
  { word: "商業", furigana: "しょうぎょう", romaji: "shougyou", meaning: "商業", category: "economy_business", level: "N3", 
    exampleJa: "商業の中心地として発展しました。", exampleFurigana: "しょうぎょうのちゅうしんちとしてはってんしました。", exampleEn: "作為商業中心發展起來了。" },
  { word: "農業", furigana: "のうぎょう", romaji: "nougyou", meaning: "農業", category: "economy_business", level: "N3", 
    exampleJa: "新しい技術を農業に取り入れます。", exampleFurigana: "あたらしいぎじゅつをのうぎょうにとりいれます。", exampleEn: "將新技術導入農業。" },
  { word: "工業", furigana: "こうぎょう", romaji: "kougyou", meaning: "工業", category: "economy_business", level: "N3", 
    exampleJa: "工業地帯には多くの工場があります。", exampleFurigana: "こうぎょうちたいにはおおくのこうじょうがあります。", exampleEn: "工業區有很多工廠。" },
  { word: "漁業", furigana: "ぎょぎょう", romaji: "gyogyou", meaning: "漁業", category: "economy_business", level: "N2", 
    exampleJa: "この町は漁業で成り立っています。", exampleFurigana: "このまちはぎょぎょうでなりたっています。", exampleEn: "這個城鎮靠漁業為生。" },
  { word: "林業", furigana: "りんぎょう", romaji: "ringyou", meaning: "林業", category: "economy_business", level: "N1", 
    exampleJa: "山間部では林業が行われています。", exampleFurigana: "さんかんぶではりんぎょうがおこなわれています。", exampleEn: "山區正在從事林業。" },
  { word: "製造業", furigana: "せいぞうぎょう", romaji: "seizougyou", meaning: "製造業", category: "economy_business", level: "N1", 
    exampleJa: "日本の製造業は世界で高く評価されています。", exampleFurigana: "にほんのせいぞうぎょうはせかいでたかくひょうかされています。", exampleEn: "日本的製造業在世界上獲得高度評價。" },
  { word: "サービス業", furigana: "さーびすぎょう", romaji: "saabisugyou", meaning: "服務業", category: "economy_business", level: "N2", 
    exampleJa: "サービス業ではお客様の満足が第一です。", exampleFurigana: "さーびすぎょうではおきゃくさまのまんぞくがだいいちです。", exampleEn: "在服務業顧客的滿意是第一。" },
  { word: "小売業", furigana: "こうりぎょう", romaji: "kourigyou", meaning: "零售業", category: "economy_business", level: "N1", 
    exampleJa: "小売業の競争が激しくなっています。", exampleFurigana: "こうりぎょうのきょうそうがはげしくなっています。", exampleEn: "零售業的競爭變得激烈。" },
  { word: "卸売業", furigana: "おろしうりぎょう", romaji: "oroshiurigyou", meaning: "批發業", category: "economy_business", level: "N1", 
    exampleJa: "彼は卸売業を営んでいます。", exampleFurigana: "かれはおろしうりぎょうをいとなんでいます。", exampleEn: "他經營著批發業。" },

  // 基本社會體制 (society_politics_law)
  { word: "投票", furigana: "とうひょう", romaji: "touhyou", meaning: "投票", category: "society_politics_law", level: "N3", 
    exampleJa: "日曜日に選挙の投票に行きます。", exampleFurigana: "にちようびにせんきょのとうひょうにいきます。", exampleEn: "星期天去選舉投票。" },
  { word: "候補者", furigana: "こうほしゃ", romaji: "kouhosha", meaning: "候選人", category: "society_politics_law", level: "N2", 
    exampleJa: "それぞれの候補者が演説を行います。", exampleFurigana: "それぞれのこうほしゃがえんぜつをおこないます。", exampleEn: "各個候選人進行演講。" },
  { word: "政党", furigana: "せいとう", romaji: "seitou", meaning: "政黨", category: "society_politics_law", level: "N2", 
    exampleJa: "新しい政党が結成されました。", exampleFurigana: "あたらしいせいとうがけっせいされました。", exampleEn: "組成了新的政黨。" },
  { word: "与党", furigana: "よとう", romaji: "yotou", meaning: "執政黨", category: "society_politics_law", level: "N1", 
    exampleJa: "与党が議席の過半数を占めました。", exampleFurigana: "よとうがぎせきのかはんすうをしめました。", exampleEn: "執政黨佔了過半數的議席。" },
  { word: "野党", furigana: "やとう", romaji: "yatou", meaning: "在野黨", category: "society_politics_law", level: "N1", 
    exampleJa: "野党は政府の方針を批判しました。", exampleFurigana: "やとうはせいふのほうしんをひはんしました。", exampleEn: "在野黨批評了政府的方針。" },
  { word: "政策", furigana: "せいさく", romaji: "seisaku", meaning: "政策", category: "society_politics_law", level: "N2", 
    exampleJa: "新しい経済政策が発表されました。", exampleFurigana: "あたらしいけいざいせいさくがはっぴょうされました。", exampleEn: "發布了新的經濟政策。" },
  { word: "外交", furigana: "がいこう", romaji: "gaikou", meaning: "外交", category: "society_politics_law", level: "N2", 
    exampleJa: "隣国との外交問題について話し合います。", exampleFurigana: "りんこくとのがいこうもんだいについてはなしあいます。", exampleEn: "討論與鄰國的外交問題。" },
  { word: "内政", furigana: "ないせい", romaji: "naisei", meaning: "內政", category: "society_politics_law", level: "N1", 
    exampleJa: "政府は内政の改革を進めています。", exampleFurigana: "せいふはないせいのかいかくをすすめています。", exampleEn: "政府正在推進內政改革。" },
  { word: "条例", furigana: "じょうれい", romaji: "jourei", meaning: "條例 / 規章", category: "society_politics_law", level: "N1", 
    exampleJa: "市の条例でゴミの分別が義務付けられています。", exampleFurigana: "しのじょうれいでごみのぶんべつがぎむづけられています。", exampleEn: "市的條例規定必須垃圾分類。" },
  { word: "刑法", furigana: "けいほう", romaji: "keihou", meaning: "刑法", category: "society_politics_law", level: "N1", 
    exampleJa: "刑法に基づいて処罰されます。", exampleFurigana: "けいほうにもとづいてしょばつされます。", exampleEn: "根據刑法受到處罰。" }
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
