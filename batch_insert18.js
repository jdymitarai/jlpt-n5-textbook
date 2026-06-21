const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "叔父さん", furigana: "おじさん", romaji: "ojisan", meaning: "叔叔 / 伯伯", category: "relations_human", level: "N5", 
    exampleJa: "近所の叔父さんに挨拶しました。", exampleFurigana: "きんじょのおじさんにあいさつしました。", exampleEn: "向附近的叔叔打招呼了。" },
  { word: "叔母さん", furigana: "おばさん", romaji: "obasan", meaning: "阿姨 / 伯母", category: "relations_human", level: "N5", 
    exampleJa: "叔母さんがお菓子をくれました。", exampleFurigana: "おばさんがおかしをくれました。", exampleEn: "阿姨給了我糖果。" },
  { word: "青年", furigana: "せいねん", romaji: "seinen", meaning: "青年", category: "relations_human", level: "N3", 
    exampleJa: "立派な青年に成長しました。", exampleFurigana: "りっぱなせいねんにせいちょうしました。", exampleEn: "成長為了優秀的青年。" },
  { word: "少年", furigana: "しょうねん", romaji: "shounen", meaning: "少年 / 男孩", category: "relations_human", level: "N3", 
    exampleJa: "少年たちが公園で遊んでいます。", exampleFurigana: "しょうねんたちがこうえんであそんでいます。", exampleEn: "少年們正在公園裡玩耍。" },
  { word: "少女", furigana: "しょうじょ", romaji: "shoujo", meaning: "少女 / 女孩", category: "relations_human", level: "N3", 
    exampleJa: "美しい少女に出会いました。", exampleFurigana: "うつくしいしょうじょにであいました。", exampleEn: "遇見了美麗的少女。" },
  { word: "男子", furigana: "だんし", romaji: "danshi", meaning: "男子 / 男孩", category: "relations_human", level: "N3", 
    exampleJa: "男子学生がスポーツをしています。", exampleFurigana: "だんしがくせいがすぽーつをしています。", exampleEn: "男學生正在做運動。" },
  { word: "女子", furigana: "じょし", romaji: "joshi", meaning: "女子 / 女孩", category: "relations_human", level: "N3", 
    exampleJa: "女子の更衣室はあちらです。", exampleFurigana: "じょしのこういしつはあちらです。", exampleEn: "女子更衣室在那邊。" },
  { word: "老人", furigana: "ろうじん", romaji: "roujin", meaning: "老人 / 長者", category: "relations_human", level: "N3", 
    exampleJa: "電車で老人に席を譲りました。", exampleFurigana: "でんしゃでろうじんにせきをゆずりました。", exampleEn: "在電車上讓座給老人了。" },
  { word: "高齢者", furigana: "こうれいしゃ", romaji: "koureisha", meaning: "高齡者 / 銀髮族", category: "relations_human", level: "N2", 
    exampleJa: "高齢者のための施設を見学します。", exampleFurigana: "こうれいしゃのためのしせつをけんがくします。", exampleEn: "參觀為高齡者設立的機構。" },
  { word: "若者", furigana: "わかもの", romaji: "wakamono", meaning: "年輕人", category: "relations_human", level: "N3", 
    exampleJa: "最近の若者はインターネットをよく使います。", exampleFurigana: "さいきんのわかものはいんたーねっとをよくつかいます。", exampleEn: "最近的年輕人經常使用網路。" },

  // 日常工作與經濟 (economy_business)
  { word: "物資", furigana: "ぶっし", romaji: "busshi", meaning: "物資", category: "economy_business", level: "N1", 
    exampleJa: "被災地に物資を送ります。", exampleFurigana: "ひさいちにぶっしをおくります。", exampleEn: "向災區運送物資。" },
  { word: "小切手", furigana: "こぎって", romaji: "kogitte", meaning: "支票", category: "economy_business", level: "N1", 
    exampleJa: "支払いを小切手で行います。", exampleFurigana: "しはらいをこぎってでおこないます。", exampleEn: "用支票進行支付。" },
  { word: "手形", furigana: "てがた", romaji: "tegata", meaning: "匯票 / 期票", category: "economy_business", level: "N1", 
    exampleJa: "取引先から手形を受け取りました。", exampleFurigana: "とりひきさきからてがたをうけとりました。", exampleEn: "從客戶那裡收到了期票。" },
  { word: "利子", furigana: "りし", romaji: "rishi", meaning: "利息", category: "economy_business", level: "N2", 
    exampleJa: "銀行にお金を預けて利子がつきました。", exampleFurigana: "ぎんこうにおかねをあずけてりしがつきました。", exampleEn: "把錢存在銀行生了利息。" },
  { word: "金利", furigana: "きんり", romaji: "kinri", meaning: "利率", category: "economy_business", level: "N1", 
    exampleJa: "住宅ローンの金利が下がりました。", exampleFurigana: "じゅうたくろーんのきんりがさがりました。", exampleEn: "房貸的利率下降了。" },
  { word: "ローン", furigana: "ろーん", romaji: "roon", meaning: "貸款", category: "economy_business", level: "N2", 
    exampleJa: "車をローンで買いました。", exampleFurigana: "くるまをろーんでかいました。", exampleEn: "貸款買了車。" },
  { word: "配当", furigana: "はいとう", romaji: "haitou", meaning: "股息 / 分紅", category: "economy_business", level: "N1", 
    exampleJa: "株の配当金を受け取りました。", exampleFurigana: "かぶのはいとうきんをうけとりました。", exampleEn: "領取了股票的股息。" },
  { word: "脱税", furigana: "だつぜい", romaji: "datsuzei", meaning: "逃稅", category: "economy_business", level: "N1", 
    exampleJa: "脱税の疑いで調査を受けました。", exampleFurigana: "だつぜいのうたがいでちょうさをうけました。", exampleEn: "因涉嫌逃稅而接受了調查。" },
  { word: "投資家", furigana: "とうしか", romaji: "toushika", meaning: "投資者 / 投資家", category: "economy_business", level: "N1", 
    exampleJa: "海外の投資家が日本株を買っています。", exampleFurigana: "かいがいのとうしかがにほんかぶをかっています。", exampleEn: "海外投資者正在買進日本股票。" },
  { word: "引き出し", furigana: "ひきだし", romaji: "hikidashi", meaning: "提款 / 抽屜", category: "economy_business", level: "N3", 
    exampleJa: "銀行のATMでお金の引き出しをします。", exampleFurigana: "ぎんこうのえーてぃーえむでおかねのひきだしをします。", exampleEn: "在銀行的ATM提款。" },

  // 基本社會體制 (society_politics_law)
  { word: "大臣", furigana: "だいじん", romaji: "daijin", meaning: "大臣 / 部長", category: "society_politics_law", level: "N2", 
    exampleJa: "新しい大臣が任命されました。", exampleFurigana: "あたらしいだいじんがにんめいされました。", exampleEn: "任命了新的部長。" },
  { word: "役所", furigana: "やくしょ", romaji: "yakusho", meaning: "公家機關 / 區公所", category: "society_politics_law", level: "N3", 
    exampleJa: "役所で書類の手続きをします。", exampleFurigana: "やくしょでしょるいのてつづきをします。", exampleEn: "在公家機關辦理文件手續。" },
  { word: "県庁", furigana: "けんちょう", romaji: "kenchou", meaning: "縣政府", category: "society_politics_law", level: "N3", 
    exampleJa: "パスポートの申請で県庁に行きました。", exampleFurigana: "ぱすぽーとのしんせいでけんちょうにいきました。", exampleEn: "為了申請護照去了縣政府。" },
  { word: "旅券", furigana: "りょけん", romaji: "ryoken", meaning: "護照", category: "society_politics_law", level: "N1", 
    exampleJa: "海外旅行には旅券が必要です。", exampleFurigana: "かいがいりょこうにはりょけんがひつようです。", exampleEn: "出國旅行需要護照。" },
  { word: "査証", furigana: "さしょう", romaji: "sashou", meaning: "簽證 (正式)", category: "society_politics_law", level: "N1", 
    exampleJa: "大使館で査証を申請します。", exampleFurigana: "たいしかんでさしょうをしんせいします。", exampleEn: "在大使館申請簽證。" },
  { word: "罪", furigana: "つみ", romaji: "tsumi", meaning: "罪行 / 罪過", category: "society_politics_law", level: "N2", 
    exampleJa: "彼は自分の罪を認めました。", exampleFurigana: "かれはじぶんのつみをみとめました。", exampleEn: "他承認了自己的罪行。" },
  { word: "泥棒", furigana: "どろぼう", romaji: "dorobou", meaning: "小偷", category: "society_politics_law", level: "N3", 
    exampleJa: "留守中に泥棒に入られました。", exampleFurigana: "るすちゅうにどろぼうにはいられました。", exampleEn: "不在家時遭小偷了。" },
  { word: "強盗", furigana: "ごうとう", romaji: "goutou", meaning: "強盜", category: "society_politics_law", level: "N2", 
    exampleJa: "銀行に強盗が押し入りました。", exampleFurigana: "ぎんこうにごうとうがおしいりました。", exampleEn: "強盜闖入了銀行。" },
  { word: "殺人", furigana: "さつじん", romaji: "satsujin", meaning: "殺人", category: "society_politics_law", level: "N2", 
    exampleJa: "殺人事件の捜査が始まりました。", exampleFurigana: "さつじんじけんのそうさがはじまりました。", exampleEn: "開始調查殺人事件。" },
  { word: "詐欺", furigana: "さぎ", romaji: "sagi", meaning: "詐欺 / 騙局", category: "society_politics_law", level: "N1", 
    exampleJa: "電話でお金をだまし取る詐欺が増えています。", exampleFurigana: "でんわでおかねをだましとるさぎがふえています。", exampleEn: "透過電話騙取金錢的詐欺事件正在增加。" }
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
  // Replace 引き出し with 提款
  if (!data.vocabulary.some(v => v.word === entry.word)) {
    data.vocabulary.push(entry);
    addedCount++;
  }
});

const outputString = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA; }`;
fs.writeFileSync(filePath, outputString, 'utf8');
console.log(`Added ${addedCount} words to data.js!`);
