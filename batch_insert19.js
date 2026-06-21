const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "幼児", furigana: "ようじ", romaji: "youji", meaning: "幼兒", category: "relations_human", level: "N2", 
    exampleJa: "公園で幼児が遊んでいます。", exampleFurigana: "こうえんでようじがあそんでいます。", exampleEn: "幼兒正在公園裡玩耍。" },
  { word: "児童", furigana: "じどう", romaji: "jidou", meaning: "兒童 / 學童", category: "relations_human", level: "N2", 
    exampleJa: "児童のための図書室があります。", exampleFurigana: "じどうのためのとしょしつがあります。", exampleEn: "有專為兒童設立的圖書室。" },
  { word: "双生児", furigana: "そうせいじ", romaji: "souseiji", meaning: "雙胞胎 (正式)", category: "relations_human", level: "N1", 
    exampleJa: "彼らは一卵性の双生児です。", exampleFurigana: "かれらはいちらんせいのそうせいじです。", exampleEn: "他們是同卵雙胞胎。" },
  { word: "大家族", furigana: "だいかぞく", romaji: "daikazoku", meaning: "大家族", category: "relations_human", level: "N3", 
    exampleJa: "昔は大家族が一般的でした。", exampleFurigana: "むかしはだいかぞくがいっぱんてきでした。", exampleEn: "以前大家族是很普遍的。" },
  { word: "核家族", furigana: "かくかぞく", romaji: "kakukazoku", meaning: "小家庭 (核心家庭)", category: "relations_human", level: "N1", 
    exampleJa: "現代は核家族化が進んでいます。", exampleFurigana: "げんだいはかくかぞくかがすすんでいます。", exampleEn: "現代的核心家庭化正在加劇。" },
  { word: "家系", furigana: "かけい", romaji: "kakei", meaning: "家系 / 血統", category: "relations_human", level: "N1", 
    exampleJa: "音楽家の家系に生まれました。", exampleFurigana: "おんがくかのかけいにうまれました。", exampleEn: "出生於音樂世家。" },
  { word: "親族", furigana: "しんぞく", romaji: "shinzoku", meaning: "親屬 / 宗親", category: "relations_human", level: "N1", 
    exampleJa: "結婚式に親族が集まります。", exampleFurigana: "けっこんしきにしんぞくがあつまります。", exampleEn: "親屬們聚集在結婚典禮上。" },
  { word: "見知らぬ人", furigana: "みしらぬひと", romaji: "mishiranuhito", meaning: "陌生人", category: "relations_human", level: "N2", 
    exampleJa: "見知らぬ人に道を聞かれました。", exampleFurigana: "みしらぬひとにみちをきかれました。", exampleEn: "被陌生人問路了。" },
  { word: "師匠", furigana: "ししょう", romaji: "shishou", meaning: "師父 / 師傅", category: "relations_human", level: "N1", 
    exampleJa: "師匠の教えを守ります。", exampleFurigana: "ししょうのおしえをまもります。", exampleEn: "遵守師父的教誨。" },
  { word: "弟子", furigana: "でし", romaji: "deshi", meaning: "弟子 / 徒弟", category: "relations_human", level: "N1", 
    exampleJa: "彼は有名な料理人の弟子です。", exampleFurigana: "かれはゆうめいなりょうりにんのでしです。", exampleEn: "他是著名廚師的徒弟。" },

  // 日常工作與經濟 (economy_business)
  { word: "資本主義", furigana: "しほんしゅぎ", romaji: "shihonshugi", meaning: "資本主義", category: "economy_business", level: "N1", 
    exampleJa: "資本主義の経済体制について学びます。", exampleFurigana: "しほんしゅぎのけいざいたいせいについてまなびます。", exampleEn: "學習關於資本主義的經濟體制。" },
  { word: "貯蓄", furigana: "ちょちく", romaji: "chochiku", meaning: "儲蓄", category: "economy_business", level: "N2", 
    exampleJa: "将来のために貯蓄を増やします。", exampleFurigana: "しょうらいのためにちょちくをふやします。", exampleEn: "為了將來增加儲蓄。" },
  { word: "負債", furigana: "ふさい", romaji: "fusai", meaning: "負債 / 債務", category: "economy_business", level: "N1", 
    exampleJa: "会社の負債を減らします。", exampleFurigana: "かいしゃのふさいをへらします。", exampleEn: "減少公司的負債。" },
  { word: "資産", furigana: "しさん", romaji: "shisan", meaning: "資產", category: "economy_business", level: "N1", 
    exampleJa: "土地や建物は重要な資産です。", exampleFurigana: "とちやたてものはじゅうようなしさんです。", exampleEn: "土地與建築物是重要的資產。" },
  { word: "需要", furigana: "じゅよう", romaji: "juyou", meaning: "需求", category: "economy_business", level: "N1", 
    exampleJa: "新しいスマートフォンの需要が高いです。", exampleFurigana: "あたらしいすまーとふぉんのじゅようがたかいです。", exampleEn: "新智慧型手機的需求很高。" },
  { word: "供給", furigana: "きょうきゅう", romaji: "kyoukyuu", meaning: "供給", category: "economy_business", level: "N1", 
    exampleJa: "需要と供給のバランスが大切です。", exampleFurigana: "じゅようときょうきゅうのばらんすがたいせつです。", exampleEn: "需求與供給的平衡很重要。" },
  { word: "流通", furigana: "りゅうつう", romaji: "ryuutsuu", meaning: "流通", category: "economy_business", level: "N1", 
    exampleJa: "商品の流通ルートを改善します。", exampleFurigana: "しょうひんのりゅうつうるーとをかいぜんします。", exampleEn: "改善商品的流通管道。" },
  { word: "株式市場", furigana: "かぶしきしじょう", romaji: "kabushikishijou", meaning: "股票市場", category: "economy_business", level: "N1", 
    exampleJa: "株式市場の動向を分析します。", exampleFurigana: "かぶしきしじょうのどうこうをぶんせきします。", exampleEn: "分析股票市場的動向。" },
  { word: "為替相場", furigana: "かわせそうば", romaji: "kawasesouba", meaning: "匯率行情", category: "economy_business", level: "N1", 
    exampleJa: "毎朝為替相場を確認します。", exampleFurigana: "まいあさかわせそうばをかくにんします。", exampleEn: "每天早上確認匯率行情。" },
  { word: "企業家", furigana: "きぎょうか", romaji: "kigyouka", meaning: "企業家", category: "economy_business", level: "N1", 
    exampleJa: "有名な企業家の講演を聞きます。", exampleFurigana: "ゆうめいなきぎょうかのこうえんをききます。", exampleEn: "聆聽著名企業家的演講。" },

  // 基本社會體制 (society_politics_law)
  { word: "役場", furigana: "やくば", romaji: "yakuba", meaning: "鄉鎮公所 / 辦公處", category: "society_politics_law", level: "N3", 
    exampleJa: "町の役場で手続きをします。", exampleFurigana: "まちのやくばでてつづきをします。", exampleEn: "在鎮公所辦理手續。" },
  { word: "官公庁", furigana: "かんこうちょう", romaji: "kankouchou", meaning: "政府機關 / 公家機關", category: "society_politics_law", level: "N1", 
    exampleJa: "官公庁は土日が休みです。", exampleFurigana: "かんこうちょうはどにちがやすみです。", exampleEn: "公家機關六日休息。" },
  { word: "国会", furigana: "こっかい", romaji: "kokkai", meaning: "國會", category: "society_politics_law", level: "N2", 
    exampleJa: "国会で新しい法律が議論されます。", exampleFurigana: "こっかいであたらしいほうりつがぎろんされます。", exampleEn: "國會將討論新的法律。" },
  { word: "最高裁判所", furigana: "さいこうさいばんしょ", romaji: "saikousaibansho", meaning: "最高法院", category: "society_politics_law", level: "N1", 
    exampleJa: "最高裁判所が判決を下しました。", exampleFurigana: "さいこうさいばんしょがはんけつをくだしました。", exampleEn: "最高法院下達了判決。" },
  { word: "法律違反", furigana: "ほうりついはん", romaji: "houritsuihan", meaning: "違法 / 違反法律", category: "society_politics_law", level: "N1", 
    exampleJa: "それは法律違反になる可能性があります。", exampleFurigana: "それはほうりついはんになるかのうせいがあります。", exampleEn: "那有違法的可能性。" },
  { word: "被害者", furigana: "ひがいしゃ", romaji: "higaisha", meaning: "受害者", category: "society_politics_law", level: "N2", 
    exampleJa: "事件の被害者を支援します。", exampleFurigana: "じけんのひがいしゃをしえんします。", exampleEn: "支援事件的受害者。" },
  { word: "加害者", furigana: "かがいしゃ", romaji: "kagaisha", meaning: "加害者", category: "society_politics_law", level: "N1", 
    exampleJa: "加害者は警察に逮捕されました。", exampleFurigana: "かがいしゃはけいさつにたいほされました。", exampleEn: "加害者被警察逮捕了。" },
  { word: "証人", furigana: "しょうにん", romaji: "shounin", meaning: "證人", category: "society_politics_law", level: "N1", 
    exampleJa: "裁判で証人として証言します。", exampleFurigana: "さいばんでしょうにんとしてしょうげんします。", exampleEn: "在法庭上作為證人作證。" },
  { word: "有罪", furigana: "ゆうざい", romaji: "yuuzai", meaning: "有罪", category: "society_politics_law", level: "N1", 
    exampleJa: "被告に有罪の判決が出ました。", exampleFurigana: "ひこくにゆうざいのはんけつがでました。", exampleEn: "被告被判決有罪。" },
  { word: "無罪", furigana: "むざい", romaji: "muzai", meaning: "無罪", category: "society_politics_law", level: "N1", 
    exampleJa: "裁判で無罪が証明されました。", exampleFurigana: "さいばんでむざいがしょうめいされました。", exampleEn: "在法庭上證明了無罪。" }
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
