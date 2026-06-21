const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "夫妻", furigana: "ふさい", romaji: "fusai", meaning: "夫妻 (先生與夫人)", category: "relations_human", level: "N2", 
    exampleJa: "社長ご夫妻がパーティーに出席されました。", exampleFurigana: "しゃちょうごふさいがぱーてぃーにしゅっせきされました。", exampleEn: "社長夫妻出席了派對。" },
  { word: "息子", furigana: "むすこ", romaji: "musuko", meaning: "兒子", category: "relations_human", level: "N4", 
    exampleJa: "息子は今年から中学生です。", exampleFurigana: "むすこはことしからちゅうがくせいです。", exampleEn: "兒子今年開始是國中生了。" },
  { word: "娘", furigana: "むすめ", romaji: "musume", meaning: "女兒", category: "relations_human", level: "N4", 
    exampleJa: "娘はピアノを習っています。", exampleFurigana: "むすめはぴあのをならっています。", exampleEn: "女兒在學鋼琴。" },
  { word: "甥", furigana: "おい", romaji: "oi", meaning: "姪子 / 外甥", category: "relations_human", level: "N2", 
    exampleJa: "甥のお祝いにプレゼントを贈ります。", exampleFurigana: "おいのおいわいにぷれぜんとをおくります。", exampleEn: "送禮物給姪子當作祝賀。" },
  { word: "姪", furigana: "めい", romaji: "mei", meaning: "姪女 / 外甥女", category: "relations_human", level: "N2", 
    exampleJa: "可愛い姪が遊びに来ました。", exampleFurigana: "かわいいめいがあそび にきました。", exampleEn: "可愛的姪女來玩了。" },
  { word: "孤児", furigana: "こじ", romaji: "koji", meaning: "孤兒", category: "relations_human", level: "N1", 
    exampleJa: "戦争で多くの孤児が生まれました。", exampleFurigana: "せんそうでのおおくのこじがうまれました。", exampleEn: "戰爭造成了許多孤兒。" },
  { word: "養子", furigana: "ようし", romaji: "youshi", meaning: "養子 / 養女", category: "relations_human", level: "N2", 
    exampleJa: "親戚の子供を養子に迎えました。", exampleFurigana: "しんせきのこどもをようしにむかえました。", exampleEn: "收養了親戚的小孩為養子。" },
  { word: "里帰り", furigana: "さとがえり", romaji: "satogaeri", meaning: "回娘家 / 回鄉", category: "relations_human", level: "N2", 
    exampleJa: "出産のために実家へ里帰りします。", exampleFurigana: "しゅっさんのためにじっかへさとがえりします。", exampleEn: "為了待產而回娘家。" },
  { word: "先祖", furigana: "せんぞ", romaji: "senzo", meaning: "祖先", category: "relations_human", level: "N3", 
    exampleJa: "お盆に先祖のお墓参りをします。", exampleFurigana: "おぼんにせんぞのおはかまいりをします。", exampleEn: "盂蘭盆節去掃祖先的墓。" },
  { word: "子孫", furigana: "しそん", romaji: "shison", meaning: "子孫 / 後代", category: "relations_human", level: "N2", 
    exampleJa: "子孫のために美しい地球を残します。", exampleFurigana: "しそんのためにうつくしいちきゅうをのこします。", exampleEn: "為了子孫留下美麗的地球。" },

  // 日常工作與經濟 (economy_business)
  { word: "就職", furigana: "しゅうしょく", romaji: "shuushoku", meaning: "就業 / 找工作", category: "economy_business", level: "N3", 
    exampleJa: "卒業後は銀行に就職します。", exampleFurigana: "そつぎょうごはぎんこうにしゅうしょくします。", exampleEn: "畢業後在銀行就業。" },
  { word: "転職", furigana: "てんしょく", romaji: "tenshoku", meaning: "轉職 / 換工作", category: "economy_business", level: "N2", 
    exampleJa: "IT企業へ転職を考えています。", exampleFurigana: "あいてぃーきぎょうへてんしょくをかんがえています。", exampleEn: "正在考慮轉職到IT企業。" },
  { word: "辞表", furigana: "じひょう", romaji: "jihyou", meaning: "辭呈", category: "economy_business", level: "N1", 
    exampleJa: "社長に辞表を提出しました。", exampleFurigana: "しゃちょうにじひょうをていしゅつしました。", exampleEn: "向社長提出了辭呈。" },
  { word: "給与", furigana: "きゅうよ", romaji: "kyuuyo", meaning: "薪資 (較正式寫法)", category: "economy_business", level: "N2", 
    exampleJa: "給与の明細を確認します。", exampleFurigana: "きゅうよのめいさいをかくにんします。", exampleEn: "確認薪資明細。" },
  { word: "賞与", furigana: "しょうよ", romaji: "shouyo", meaning: "獎金 / 年終", category: "economy_business", level: "N1", 
    exampleJa: "冬の賞与が支給されました。", exampleFurigana: "ふゆのしょうよがしきゅうされました。", exampleEn: "發放了冬季獎金。" },
  { word: "年俸", furigana: "ねんぽう", romaji: "nenpou", meaning: "年薪", category: "economy_business", level: "N1", 
    exampleJa: "年俸制の会社で働いています。", exampleFurigana: "ねんぽうせいのかいしゃではたらいています。", exampleEn: "在年薪制的公司工作。" },
  { word: "為替", furigana: "かわせ", romaji: "kawase", meaning: "外匯", category: "economy_business", level: "N1", 
    exampleJa: "外国為替の市場をチェックします。", exampleFurigana: "がいこくかわせのしじょうをちぇっくします。", exampleEn: "查看外匯市場。" },
  { word: "関税", furigana: "かんぜい", romaji: "kanzei", meaning: "關稅", category: "economy_business", level: "N1", 
    exampleJa: "輸入品に関税がかかります。", exampleFurigana: "ゆにゅうひんにかんぜいがかります。", exampleEn: "進口商品需要徵收關稅。" },
  { word: "破産", furigana: "はさん", romaji: "hasan", meaning: "破產", category: "economy_business", level: "N1", 
    exampleJa: "事業に失敗して破産しました。", exampleFurigana: "じぎょうにしっぱいしてはさんしました。", exampleEn: "事業失敗而破產了。" },
  { word: "借入", furigana: "かりいれ", romaji: "kariire", meaning: "借貸 / 貸款", category: "economy_business", level: "N1", 
    exampleJa: "銀行から資金の借入を行います。", exampleFurigana: "ぎんこうからしきんのかりいれをおこないます。", exampleEn: "向銀行進行資金貸款。" },

  // 基本社會體制 (society_politics_law)
  { word: "主権", furigana: "しゅけん", romaji: "shuken", meaning: "主權", category: "society_politics_law", level: "N1", 
    exampleJa: "国家の主権を主張します。", exampleFurigana: "こっかのしゅけんをしゅちょうします。", exampleEn: "主張國家的主權。" },
  { word: "選挙権", furigana: "せんきょけん", romaji: "senkyoken", meaning: "選舉權", category: "society_politics_law", level: "N1", 
    exampleJa: "十八歳で選挙権が得られます。", exampleFurigana: "じゅうはっさいでせんきょけんがえられます。", exampleEn: "十八歲可以獲得選舉權。" },
  { word: "裁判官", furigana: "さいばんかん", romaji: "saibankan", meaning: "法官", category: "society_politics_law", level: "N2", 
    exampleJa: "裁判官が厳しい判決を下しました。", exampleFurigana: "さいばんかんがきびしいはんけつをくだしました。", exampleEn: "法官下達了嚴厲的判決。" },
  { word: "検事", furigana: "けんじ", romaji: "kenji", meaning: "檢察官", category: "society_politics_law", level: "N1", 
    exampleJa: "検事が事件の真相を追及します。", exampleFurigana: "けんじがじけんのしんそうをついきゅうします。", exampleEn: "檢察官追查事件的真相。" },
  { word: "被告", furigana: "ひこく", romaji: "hikoku", meaning: "被告", category: "society_politics_law", level: "N2", 
    exampleJa: "被告は無罪を主張しています。", exampleFurigana: "ひこくはむざいをしゅちょうしています。", exampleEn: "被告主張自己無罪。" },
  { word: "原告", furigana: "げんこく", romaji: "genkoku", meaning: "原告", category: "society_politics_law", level: "N1", 
    exampleJa: "原告が損害賠償を求めました。", exampleFurigana: "げんこくがそんがいばいしょうをもとめました。", exampleEn: "原告要求損害賠償。" },
  { word: "法令", furigana: "ほうれい", romaji: "hourei", meaning: "法令", category: "society_politics_law", level: "N1", 
    exampleJa: "法令を順守して業務を行います。", exampleFurigana: "ほうれいをじゅんしゅしてぎょうむをおこないます。", exampleEn: "遵守法令執行業務。" },
  { word: "罰金", furigana: "ばっきん", romaji: "bakkin", meaning: "罰金", category: "society_politics_law", level: "N2", 
    exampleJa: "スピード違反で罰金を払いました。", exampleFurigana: "すぴーどいはんでばっきんをはらいました。", exampleEn: "因為超速支付了罰金。" },
  { word: "刑罰", furigana: "けいばつ", romaji: "keibatsu", meaning: "刑罰", category: "society_politics_law", level: "N1", 
    exampleJa: "重い刑罰が科せられました。", exampleFurigana: "おもいけいばつがかせられました。", exampleEn: "被處以重刑。" },
  { word: "施設", furigana: "しせつ", romaji: "shisetsu", meaning: "設施 / 機構", category: "society_politics_law", level: "N3", 
    exampleJa: "公共の施設を利用します。", exampleFurigana: "こうきょうのしせつをりようします。", exampleEn: "利用公共設施。" }
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
