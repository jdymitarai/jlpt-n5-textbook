const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "家族", furigana: "かぞく", romaji: "kazoku", meaning: "家人 / 家族", category: "relations_human", level: "N5", 
    exampleJa: "私の家族は四人です。", exampleFurigana: "わたしのかぞくはよにんです。", exampleEn: "我的家人有四人。" },
  { word: "両親", furigana: "りょうしん", romaji: "ryoushin", meaning: "雙親 / 父母", category: "relations_human", level: "N5", 
    exampleJa: "両親は元気です。", exampleFurigana: "りょうしんはげんきです。", exampleEn: "父母都很健康。" },
  { word: "兄弟", furigana: "きょうだい", romaji: "kyoudai", meaning: "兄弟姊妹", category: "relations_human", level: "N5", 
    exampleJa: "兄弟はいますか。", exampleFurigana: "きょうだいはいますか。", exampleEn: "你有兄弟姊妹嗎？" },
  { word: "友達", furigana: "ともだち", romaji: "tomodachi", meaning: "朋友", category: "relations_human", level: "N5", 
    exampleJa: "友達と遊びに行きます。", exampleFurigana: "ともだちとあそび にいきます。", exampleEn: "和朋友去玩。" },
  { word: "友人", furigana: "ゆうじん", romaji: "yuujin", meaning: "友人 / 朋友 (較正式)", category: "relations_human", level: "N3", 
    exampleJa: "大学時代の友人に会いました。", exampleFurigana: "だいがくじだいのゆうじんにあいました。", exampleEn: "見到了大學時代的友人。" },
  { word: "親友", furigana: "しんゆう", romaji: "shinyuu", meaning: "摯友 / 好朋友", category: "relations_human", level: "N3", 
    exampleJa: "彼女は私の親友です。", exampleFurigana: "かのじょはわたしのしんゆうです。", exampleEn: "她是我的摯友。" },
  { word: "知人", furigana: "ちじん", romaji: "chijin", meaning: "熟人 / 認識的人", category: "relations_human", level: "N3", 
    exampleJa: "知人の紹介で仕事を見つけました。", exampleFurigana: "ちじんのしょうかいでしごとをみつけました。", exampleEn: "透過熟人介紹找到了工作。" },
  { word: "隣人", furigana: "りんじん", romaji: "rinjin", meaning: "鄰居", category: "relations_human", level: "N3", 
    exampleJa: "隣人に挨拶をします。", exampleFurigana: "りんじんにあいさつをします。", exampleEn: "向鄰居打招呼。" },
  { word: "先輩", furigana: "せんぱい", romaji: "senpai", meaning: "前輩 / 學長姐", category: "relations_human", level: "N4", 
    exampleJa: "会社の先輩に仕事を教わります。", exampleFurigana: "かいしゃのせんぱいにしごとをおそわります。", exampleEn: "向公司的前輩請教工作。" },
  { word: "後輩", furigana: "こうはい", romaji: "kouhai", meaning: "後輩 / 學弟妹", category: "relations_human", level: "N4", 
    exampleJa: "後輩の面倒を見ます。", exampleFurigana: "こうはいのめんどうをみます。", exampleEn: "照顧後輩。" },

  // 日常工作與經濟 (economy_business)
  { word: "仕事", furigana: "しごと", romaji: "shigoto", meaning: "工作", category: "economy_business", level: "N5", 
    exampleJa: "新しい仕事を探しています。", exampleFurigana: "あたらしいしごとをさがしています。", exampleEn: "正在尋找新工作。" },
  { word: "会社員", furigana: "かいしゃいん", romaji: "kaishain", meaning: "公司職員 / 上班族", category: "economy_business", level: "N5", 
    exampleJa: "兄は会社員です。", exampleFurigana: "あにはかいしゃいんです。", exampleEn: "哥哥是上班族。" },
  { word: "給料", furigana: "きゅうりょう", romaji: "kyuuryou", meaning: "薪水 / 工資", category: "economy_business", level: "N4", 
    exampleJa: "給料が上がりました。", exampleFurigana: "きゅうりょうがあがりました。", exampleEn: "薪水漲了。" },
  { word: "事務所", furigana: "じむしょ", romaji: "jimusho", meaning: "辦公室 / 事務所", category: "economy_business", level: "N4", 
    exampleJa: "事務所の掃除をします。", exampleFurigana: "じむしょのそうじをします。", exampleEn: "打掃辦公室。" },
  { word: "物価", furigana: "ぶっか", romaji: "bukka", meaning: "物價", category: "economy_business", level: "N3", 
    exampleJa: "最近は物価が高いです。", exampleFurigana: "さいきんはぶっかがたかいです。", exampleEn: "最近物價很高。" },
  { word: "職場", furigana: "しょくば", romaji: "shokuba", meaning: "職場 / 工作場所", category: "economy_business", level: "N3", 
    exampleJa: "職場の人間関係は大切です。", exampleFurigana: "しょくばのにんげんかんけいはたいせつです。", exampleEn: "職場的人際關係很重要。" },
  { word: "企業", furigana: "きぎょう", romaji: "kigyou", meaning: "企業 / 公司", category: "economy_business", level: "N3", 
    exampleJa: "大企業に就職したいです。", exampleFurigana: "だいきぎょうにしゅうしょくしたいです。", exampleEn: "想進入大企業就職。" },
  { word: "利益", furigana: "りえき", romaji: "rieki", meaning: "利潤 / 利益", category: "economy_business", level: "N3", 
    exampleJa: "会社の利益が上がりました。", exampleFurigana: "かいしゃのりえきがあがりました。", exampleEn: "公司的利潤增加了。" },
  { word: "投資", furigana: "とうし", romaji: "toushi", meaning: "投資", category: "economy_business", level: "N2", 
    exampleJa: "株式に投資します。", exampleFurigana: "かぶしきにとうしします。", exampleEn: "投資股票。" },
  { word: "税金", furigana: "ぜいきん", romaji: "zeikin", meaning: "稅金", category: "economy_business", level: "N3", 
    exampleJa: "税金を払わなければなりません。", exampleFurigana: "ぜいきんをはらわなければなりません。", exampleEn: "必須繳納稅金。" },

  // 基本社會體制 (society_politics_law)
  { word: "学校", furigana: "がっこう", romaji: "gakkou", meaning: "學校", category: "society_politics_law", level: "N5", 
    exampleJa: "毎日学校へ行きます。", exampleFurigana: "まいにちがっこうへいきます。", exampleEn: "每天去學校。" },
  { word: "先生", furigana: "せんせい", romaji: "sensei", meaning: "老師", category: "society_politics_law", level: "N5", 
    exampleJa: "日本語の先生は優しいです。", exampleFurigana: "にほんごのせんせいはやさしいです。", exampleEn: "日文老師很溫柔。" },
  { word: "学生", furigana: "がくせい", romaji: "gakusei", meaning: "學生", category: "society_politics_law", level: "N5", 
    exampleJa: "私は大学の学生です。", exampleFurigana: "わたしはだいがくのがくせいです。", exampleEn: "我是大學生。" },
  { word: "国", furigana: "くに", romaji: "kuni", meaning: "國家 / 故鄉", category: "society_politics_law", level: "N5", 
    exampleJa: "国へ帰りたいです。", exampleFurigana: "くにへかえりたいです。", exampleEn: "想回國(故鄉)。" },
  { word: "法律", furigana: "ほうりつ", romaji: "houritsu", meaning: "法律", category: "society_politics_law", level: "N3", 
    exampleJa: "国の法律を守ります。", exampleFurigana: "くにのほうりつをまもります。", exampleEn: "遵守國家的法律。" },
  { word: "新聞", furigana: "しんぶん", romaji: "shinbun", meaning: "報紙", category: "society_politics_law", level: "N5", 
    exampleJa: "毎朝新聞を読みます。", exampleFurigana: "まいあさしんぶんをよみます。", exampleEn: "每天早上看報紙。" },
  { word: "報道", furigana: "ほうどう", romaji: "houdou", meaning: "報導 / 新聞", category: "society_politics_law", level: "N3", 
    exampleJa: "事件がニュースで報道されました。", exampleFurigana: "じけんがにゅーすでほうどうされました。", exampleEn: "新聞報導了這個事件。" },
  { word: "政治", furigana: "せいじ", romaji: "seiji", meaning: "政治", category: "society_politics_law", level: "N3", 
    exampleJa: "政治に関心があります。", exampleFurigana: "せいじにかんしんがあります。", exampleEn: "對政治感興趣。" },
  { word: "警察", furigana: "けいさつ", romaji: "keisatsu", meaning: "警察", category: "society_politics_law", level: "N4", 
    exampleJa: "警察に道を尋ねました。", exampleFurigana: "けいさつにみちをたずねました。", exampleEn: "向警察問路。" },
  { word: "教育", furigana: "きょういく", romaji: "kyouiku", meaning: "教育", category: "society_politics_law", level: "N3", 
    exampleJa: "子供の教育は大切です。", exampleFurigana: "こどものきょういくはたいせつです。", exampleEn: "孩子的教育很重要。" }
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
