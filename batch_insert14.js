const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "叔父", furigana: "おじ", romaji: "oji", meaning: "叔叔 / 伯父", category: "relations_human", level: "N4", 
    exampleJa: "叔父は大阪に住んでいます。", exampleFurigana: "おじはおおさかにすんでいます。", exampleEn: "叔叔住在大阪。" },
  { word: "叔母", furigana: "おば", romaji: "oba", meaning: "阿姨 / 姑姑", category: "relations_human", level: "N4", 
    exampleJa: "叔母からプレゼントをもらいました。", exampleFurigana: "おばからぷれぜんとをもらいました。", exampleEn: "收到了阿姨給的禮物。" },
  { word: "従兄弟", furigana: "いとこ", romaji: "itoko", meaning: "堂表兄弟姊妹", category: "relations_human", level: "N3", 
    exampleJa: "従兄弟と一緒に遊びました。", exampleFurigana: "いとこといっしょにあそびました。", exampleEn: "和表兄弟一起玩。" },
  { word: "義父", furigana: "ぎふ", romaji: "gifu", meaning: "岳父 / 公公", category: "relations_human", level: "N2", 
    exampleJa: "週末に義父の家に行きます。", exampleFurigana: "しゅうまつにぎふのいえにいきます。", exampleEn: "週末要去岳父家。" },
  { word: "義母", furigana: "ぎぼ", romaji: "gibo", meaning: "岳母 / 婆婆", category: "relations_human", level: "N2", 
    exampleJa: "義母は料理がとても上手です。", exampleFurigana: "ぎぼはりょうりがとてもじょうずです。", exampleEn: "婆婆非常擅長做菜。" },
  { word: "恩人", furigana: "おんじん", romaji: "onjin", meaning: "恩人", category: "relations_human", level: "N1", 
    exampleJa: "彼は私の命の恩人です。", exampleFurigana: "かれはわたしのいのちのおんじんです。", exampleEn: "他是我的救命恩人。" },
  { word: "敵", furigana: "てき", romaji: "teki", meaning: "敵人", category: "relations_human", level: "N3", 
    exampleJa: "敵の動きに注意してください。", exampleFurigana: "てきのうごきにちゅういしてください。", exampleEn: "請注意敵人的動靜。" },
  { word: "味方", furigana: "みかた", romaji: "mikata", meaning: "我方 / 夥伴", category: "relations_human", level: "N3", 
    exampleJa: "私はいつでもあなたの味方です。", exampleFurigana: "わたしはいつでもあなたのみかたです。", exampleEn: "我永遠是你的夥伴。" },
  { word: "同級生", furigana: "どうきゅうせい", romaji: "doukyuusei", meaning: "同班同學", category: "relations_human", level: "N3", 
    exampleJa: "高校の同級生と結婚しました。", exampleFurigana: "こうこうのどうきゅうせいとけっこんしました。", exampleEn: "和高中的同班同學結婚了。" },
  { word: "双子", furigana: "ふたご", romaji: "futago", meaning: "雙胞胎", category: "relations_human", level: "N3", 
    exampleJa: "あの兄弟は双子です。", exampleFurigana: "あのきょうだいはふたごです。", exampleEn: "那對兄弟是雙胞胎。" },

  // 日常工作與經濟 (economy_business)
  { word: "収入", furigana: "しゅうにゅう", romaji: "shuunyuu", meaning: "收入", category: "economy_business", level: "N3", 
    exampleJa: "毎月の収入を計算します。", exampleFurigana: "まいつきのしゅうにゅうをけいさんします。", exampleEn: "計算每個月的收入。" },
  { word: "支出", furigana: "ししゅつ", romaji: "shishutsu", meaning: "支出", category: "economy_business", level: "N3", 
    exampleJa: "今月は支出が多かったです。", exampleFurigana: "こんげつはししゅつがおおかったです。", exampleEn: "這個月的支出很多。" },
  { word: "赤字", furigana: "あかじ", romaji: "akaji", meaning: "赤字 / 虧損", category: "economy_business", level: "N2", 
    exampleJa: "会社の経営が赤字になりました。", exampleFurigana: "かいしゃのけいえいがあかじになりました。", exampleEn: "公司經營出現了赤字。" },
  { word: "黒字", furigana: "くろじ", romaji: "kuroji", meaning: "盈餘", category: "economy_business", level: "N2", 
    exampleJa: "今期は大きな黒字を出しました。", exampleFurigana: "こんきはおおきなくろじをだしました。", exampleEn: "本期創造了巨大的盈餘。" },
  { word: "借金", furigana: "しゃっきん", romaji: "shakkin", meaning: "借款 / 負債", category: "economy_business", level: "N3", 
    exampleJa: "借金を全額返済しました。", exampleFurigana: "しゃっきんをぜんがくへんさいしました。", exampleEn: "全額償還了借款。" },
  { word: "資本", furigana: "しほん", romaji: "shihon", meaning: "資本 / 資金", category: "economy_business", level: "N2", 
    exampleJa: "事業を始めるには資本が必要です。", exampleFurigana: "じぎょうをはじめるにはしほんがひつようです。", exampleEn: "創業需要資本。" },
  { word: "株式", furigana: "かぶしき", romaji: "kabushiki", meaning: "股票 / 股份", category: "economy_business", level: "N2", 
    exampleJa: "新しい会社の株式を買いました。", exampleFurigana: "あたらしいかいしゃのかぶしきをかいました。", exampleEn: "買了新公司的股票。" },
  { word: "倒産", furigana: "とうさん", romaji: "tousan", meaning: "破產 / 倒閉", category: "economy_business", level: "N2", 
    exampleJa: "不景気で会社が倒産しました。", exampleFurigana: "ふけいきでかいしゃがとうさんしました。", exampleEn: "公司因為不景氣而倒閉了。" },
  { word: "景気", furigana: "けいき", romaji: "keiki", meaning: "景氣", category: "economy_business", level: "N3", 
    exampleJa: "最近は景気が良くなっています。", exampleFurigana: "さいきんはけいきがよくなっています。", exampleEn: "最近景氣變好了。" },
  { word: "相場", furigana: "そうば", romaji: "souba", meaning: "市價 / 行情", category: "economy_business", level: "N1", 
    exampleJa: "野菜の相場が上がっています。", exampleFurigana: "やさいのそうばがあがっています。", exampleEn: "蔬菜的市價正在上漲。" },

  // 基本社會體制 (society_politics_law)
  { word: "憲法", furigana: "けんぽう", romaji: "kenpou", meaning: "憲法", category: "society_politics_law", level: "N2", 
    exampleJa: "日本の憲法について学びます。", exampleFurigana: "にほんのけんぽうについてまなびます。", exampleEn: "學習關於日本的憲法。" },
  { word: "議会", furigana: "ぎかい", romaji: "gikai", meaning: "議會 / 國會", category: "society_politics_law", level: "N2", 
    exampleJa: "議会で新しい法律が承認されました。", exampleFurigana: "ぎかいであたらしいほうりつがしょうにんされました。", exampleEn: "議會批准了新的法律。" },
  { word: "大統領", furigana: "だいとうりょう", romaji: "daitouryou", meaning: "總統", category: "society_politics_law", level: "N3", 
    exampleJa: "アメリカの大統領が来日しました。", exampleFurigana: "あめりかのだいとうりょうがらいにちしました。", exampleEn: "美國總統來到日本了。" },
  { word: "首相", furigana: "しゅしょう", romaji: "shushou", meaning: "首相 / 總理", category: "society_politics_law", level: "N2", 
    exampleJa: "首相が記者会見を行いました。", exampleFurigana: "しゅしょうがきしゃかいけんをおこないました。", exampleEn: "首相舉行了記者會。" },
  { word: "民主主義", furigana: "みんしゅしゅぎ", romaji: "minshushugi", meaning: "民主主義", category: "society_politics_law", level: "N2", 
    exampleJa: "民主主義の原則を尊重します。", exampleFurigana: "みんしゅしゅぎのげんそくをそんちょうします。", exampleEn: "尊重民主主義的原則。" },
  { word: "警察署", furigana: "けいさつしょ", romaji: "keisatsusho", meaning: "警察局", category: "society_politics_law", level: "N4", 
    exampleJa: "落とし物を警察署に届けました。", exampleFurigana: "おとしものをけいさつしょにとどけました。", exampleEn: "把遺失物送到警察局了。" },
  { word: "消防署", furigana: "しょうぼうしょ", romaji: "shoubousho", meaning: "消防局", category: "society_politics_law", level: "N3", 
    exampleJa: "火事の時は消防署に連絡します。", exampleFurigana: "かじのときはしょうぼうしょにれんらくします。", exampleEn: "火災時要聯絡消防局。" },
  { word: "刑務所", furigana: "けいむしょ", romaji: "keimusho", meaning: "監獄", category: "society_politics_law", level: "N1", 
    exampleJa: "彼は刑務所に収監されています。", exampleFurigana: "かれはけいむしょにしゅうかんされています。", exampleEn: "他被關押在監獄裡。" },
  { word: "弁護士", furigana: "べんごし", romaji: "bengoshi", meaning: "律師", category: "society_politics_law", level: "N3", 
    exampleJa: "将来は弁護士になりたいです。", exampleFurigana: "しょうらいはべんごしになりたいです。", exampleEn: "將來想成為一名律師。" },
  { word: "検察", furigana: "けんさつ", romaji: "kensatsu", meaning: "檢察官 / 檢察機關", category: "society_politics_law", level: "N1", 
    exampleJa: "検察が事件を調査しています。", exampleFurigana: "けんさつがじけんをちょうさしています。", exampleEn: "檢察機關正在調查該事件。" }
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
