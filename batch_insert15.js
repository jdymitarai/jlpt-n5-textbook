const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "長男", furigana: "ちょうなん", romaji: "chounan", meaning: "長男 / 大兒子", category: "relations_human", level: "N4", 
    exampleJa: "彼は三兄弟の長男です。", exampleFurigana: "かれはさんきょうだいのちょうなんです。", exampleEn: "他是三兄弟中的長男。" },
  { word: "長女", furigana: "ちょうじょ", romaji: "choujo", meaning: "長女 / 大女兒", category: "relations_human", level: "N4", 
    exampleJa: "姉は家の長女です。", exampleFurigana: "あねはいえのちょうじょです。", exampleEn: "姊姊是家裡的長女。" },
  { word: "末っ子", furigana: "すえっこ", romaji: "suekko", meaning: "老么", category: "relations_human", level: "N3", 
    exampleJa: "私は五人兄弟の末っ子です。", exampleFurigana: "わたしはごにんきょうだいのすえっこです。", exampleEn: "我是五兄弟姊妹中的老么。" },
  { word: "一人っ子", furigana: "ひとりっこ", romaji: "hitorikko", meaning: "獨生子 / 獨生女", category: "relations_human", level: "N3", 
    exampleJa: "彼は一人っ子として育ちました。", exampleFurigana: "かれはひとりっことしてそだちました。", exampleEn: "他作為獨生子長大。" },
  { word: "独身", furigana: "どくしん", romaji: "dokushin", meaning: "單身 / 未婚", category: "relations_human", level: "N3", 
    exampleJa: "兄はまだ独身です。", exampleFurigana: "あにはまだどくしんです。", exampleEn: "哥哥還單身。" },
  { word: "既婚", furigana: "きこん", romaji: "kikon", meaning: "已婚", category: "relations_human", level: "N2", 
    exampleJa: "アンケートに既婚か未婚か記入します。", exampleFurigana: "あんけーとにきこんかみこんかきにゅうします。", exampleEn: "在問卷上填寫已婚或未婚。" },
  { word: "離婚", furigana: "りこん", romaji: "rikon", meaning: "離婚", category: "relations_human", level: "N3", 
    exampleJa: "両親は十年前に離婚しました。", exampleFurigana: "りょうしんはじゅうねんまえにりこんしました。", exampleEn: "父母在十年前離婚了。" },
  { word: "婚約", furigana: "こんやく", romaji: "konyaku", meaning: "訂婚", category: "relations_human", level: "N2", 
    exampleJa: "二人は昨日婚約を発表しました。", exampleFurigana: "ふたりはきのうこんやくをはっぴょうしました。", exampleEn: "兩人昨天宣布訂婚了。" },
  { word: "恩師", furigana: "おんし", romaji: "onshi", meaning: "恩師 / 老師", category: "relations_human", level: "N1", 
    exampleJa: "高校時代の恩師に会いにいきます。", exampleFurigana: "こうこうじだいのおんしにあいにいきます。", exampleEn: "去見高中時代的恩師。" },
  { word: "同い年", furigana: "おないどし", romaji: "onaidoshi", meaning: "同年紀", category: "relations_human", level: "N3", 
    exampleJa: "彼とは同い年なので気が合います。", exampleFurigana: "かれとはおないどしなのできがあいます。", exampleEn: "因為和他同年紀所以很合得來。" },

  // 日常工作與經濟 (economy_business)
  { word: "予算", furigana: "よさん", romaji: "yosan", meaning: "預算", category: "economy_business", level: "N2", 
    exampleJa: "来月の予算を決めます。", exampleFurigana: "らいげつのよさんをきめます。", exampleEn: "決定下個月的預算。" },
  { word: "決算", furigana: "けっさん", romaji: "kessan", meaning: "結算 / 財報", category: "economy_business", level: "N1", 
    exampleJa: "会社は三月に決算を迎えます。", exampleFurigana: "かいしゃはさんがつにけっさんをむかえます。", exampleEn: "公司在三月迎接結算。" },
  { word: "税務署", furigana: "ぜいむしょ", romaji: "zeimusho", meaning: "稅務局", category: "economy_business", level: "N2", 
    exampleJa: "確定申告のために税務署へ行きます。", exampleFurigana: "かくていしんこくのためにぜいむしょへいきます。", exampleEn: "為了報稅去稅務局。" },
  { word: "貿易", furigana: "ぼうえき", romaji: "boueki", meaning: "貿易", category: "economy_business", level: "N3", 
    exampleJa: "日本は外国との貿易が盛んです。", exampleFurigana: "にほんはがいこくとのぼうえきがさかんです。", exampleEn: "日本與外國的貿易很繁盛。" },
  { word: "輸出", furigana: "ゆしゅつ", romaji: "yushutsu", meaning: "出口", category: "economy_business", level: "N3", 
    exampleJa: "自動車を海外に輸出します。", exampleFurigana: "じどうしゃをかいがいにゆしゅつします。", exampleEn: "將汽車出口到海外。" },
  { word: "輸入", furigana: "ゆにゅう", romaji: "yunyuu", meaning: "進口", category: "economy_business", level: "N3", 
    exampleJa: "小麦の多くを輸入に頼っています。", exampleFurigana: "こむぎのおおくをゆにゅうにたよっています。", exampleEn: "小麥大多仰賴進口。" },
  { word: "物流", furigana: "ぶつりゅう", romaji: "butsuryuu", meaning: "物流", category: "economy_business", level: "N1", 
    exampleJa: "ネット通販で物流が増加しています。", exampleFurigana: "ねっとつうはんでぶつりゅうがぞうかしています。", exampleEn: "因為網購物流增加了。" },
  { word: "広告", furigana: "こうこく", romaji: "koukoku", meaning: "廣告", category: "economy_business", level: "N3", 
    exampleJa: "新聞に新しい商品の広告が出ました。", exampleFurigana: "しんぶんにあたらしいしょうひんのこうこくがでました。", exampleEn: "報紙上刊登了新商品的廣告。" },
  { word: "宣伝", furigana: "せんでん", romaji: "senden", meaning: "宣傳", category: "economy_business", level: "N3", 
    exampleJa: "テレビで映画の宣伝をしています。", exampleFurigana: "てれびでえいがのせんでんをしています。", exampleEn: "在電視上宣傳電影。" },
  { word: "消費", furigana: "しょうひ", romaji: "shouhi", meaning: "消費", category: "economy_business", level: "N2", 
    exampleJa: "消費者のニーズに応えます。", exampleFurigana: "しょうひしゃのにーず にこたえます。", exampleEn: "回應消費者的需求。" },

  // 基本社會體制 (society_politics_law)
  { word: "専門学校", furigana: "せんもんがっこう", romaji: "senmongakkou", meaning: "專門學校 / 職業學校", category: "society_politics_law", level: "N4", 
    exampleJa: "デザインの専門学校に通っています。", exampleFurigana: "でざいんのせんもんがっこうにかよっています。", exampleEn: "正在就讀設計的專門學校。" },
  { word: "社会保険", furigana: "しゃかいほけん", romaji: "shakaihoken", meaning: "社會保險", category: "society_politics_law", level: "N1", 
    exampleJa: "給料から社会保険料が引かれます。", exampleFurigana: "きゅうりょうからしゃかいほけんりょうがひかれます。", exampleEn: "從薪水中扣除社會保險費。" },
  { word: "裁判所", furigana: "さいばんしょ", romaji: "saibansho", meaning: "法院", category: "society_politics_law", level: "N3", 
    exampleJa: "裁判所で証言します。", exampleFurigana: "さいばんしょでしょうげんします。", exampleEn: "在法院作證。" },
  { word: "条約", furigana: "じょうやく", romaji: "jouyaku", meaning: "條約", category: "society_politics_law", level: "N2", 
    exampleJa: "平和条約が結ばれました。", exampleFurigana: "へいわじょうやくがむすばれました。", exampleEn: "簽署了和平條約。" },
  { word: "制度", furigana: "せいど", romaji: "seido", meaning: "制度", category: "society_politics_law", level: "N3", 
    exampleJa: "新しい教育制度が始まりました。", exampleFurigana: "あたらしいきょういくせいどがはじまりました。", exampleEn: "開始了新的教育制度。" },
  { word: "規則", furigana: "きそく", romaji: "kisoku", meaning: "規則", category: "society_politics_law", level: "N3", 
    exampleJa: "学校の規則を守らなければなりません。", exampleFurigana: "がっこうのきそくをまもらなければなりません。", exampleEn: "必須遵守學校的規則。" },
  { word: "責任", furigana: "せきにん", romaji: "sekinin", meaning: "責任", category: "society_politics_law", level: "N3", 
    exampleJa: "自分の行動に責任を持ちます。", exampleFurigana: "じぶんのこうどうにせきにんをもちます。", exampleEn: "對自己的行為負責。" },
  { word: "自由", furigana: "じゆう", romaji: "jiyuu", meaning: "自由", category: "society_politics_law", level: "N3", 
    exampleJa: "表現の自由は大切です。", exampleFurigana: "ひょうげんのじゆうはたいせつです。", exampleEn: "言論(表現)自由很重要。" },
  { word: "平等", furigana: "びょうどう", romaji: "byoudou", meaning: "平等", category: "society_politics_law", level: "N3", 
    exampleJa: "男女は平等であるべきです。", exampleFurigana: "だんじょはびょうどうであるべきです。", exampleEn: "男女應該是平等的。" },
  { word: "差別", furigana: "さべつ", romaji: "sabetsu", meaning: "歧視 / 差別待遇", category: "society_politics_law", level: "N2", 
    exampleJa: "人種差別をなくす運動をしています。", exampleFurigana: "じんしゅさべつをなくすうんどうをしています。", exampleEn: "正在進行消除種族歧視的運動。" }
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
