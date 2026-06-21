const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "祖父", furigana: "そふ", romaji: "sofu", meaning: "祖父 / 爺爺 / 外公", category: "relations_human", level: "N5", 
    exampleJa: "祖父は今年で八十歳です。", exampleFurigana: "そふはことしではちじゅっさいです。", exampleEn: "祖父今年八十歲。" },
  { word: "祖母", furigana: "そぼ", romaji: "sobo", meaning: "祖母 / 奶奶 / 外婆", category: "relations_human", level: "N5", 
    exampleJa: "祖母は料理が上手です。", exampleFurigana: "そぼはりょうりがじょうずです。", exampleEn: "祖母很會做菜。" },
  { word: "夫婦", furigana: "ふうふ", romaji: "fuufu", meaning: "夫妻", category: "relations_human", level: "N4", 
    exampleJa: "あの二人はとても仲のいい夫婦です。", exampleFurigana: "あのふたりはとてもなかのいいふうふです。", exampleEn: "那兩個人是一對感情很好的夫妻。" },
  { word: "幼なじみ", furigana: "おさななじみ", romaji: "osananajimi", meaning: "青梅竹馬 / 兒時玩伴", category: "relations_human", level: "N2", 
    exampleJa: "彼とは幼稚園からの幼なじみです。", exampleFurigana: "かれとはようちえんからのおさななじみです。", exampleEn: "我和他是幼稚園以來的青梅竹馬。" },
  { word: "仲間", furigana: "なかま", romaji: "nakama", meaning: "同伴 / 夥伴", category: "relations_human", level: "N3", 
    exampleJa: "私たちは趣味の仲間です。", exampleFurigana: "わたしたちはしゅみのなかまです。", exampleEn: "我們是興趣相投的夥伴。" },
  { word: "上司", furigana: "じょうし", romaji: "joushi", meaning: "上司 / 長官", category: "relations_human", level: "N4", 
    exampleJa: "上司の指示に従います。", exampleFurigana: "じょうしのしじにしたがいます。", exampleEn: "遵從上司的指示。" },
  { word: "部下", furigana: "ぶか", romaji: "buka", meaning: "部下 / 屬下", category: "relations_human", level: "N4", 
    exampleJa: "部下の相談に乗ります。", exampleFurigana: "ぶかのそうだんにのります。", exampleEn: "傾聽屬下的煩惱。" },
  { word: "お客様", furigana: "おきゃくさま", romaji: "okyakusama", meaning: "客人 / 顧客", category: "relations_human", level: "N4", 
    exampleJa: "お客様を丁寧にご案内します。", exampleFurigana: "おきゃくさまをていねいにごあんないします。", exampleEn: "恭敬地為客人引導。" },
  { word: "親戚", furigana: "しんせき", romaji: "shinseki", meaning: "親戚", category: "relations_human", level: "N4", 
    exampleJa: "お正月に親戚が集まります。", exampleFurigana: "おしょうがつにしんせきがあつまります。", exampleEn: "過年時親戚會聚在一起。" },
  { word: "孫", furigana: "まご", romaji: "mago", meaning: "孫子 / 孫女", category: "relations_human", level: "N4", 
    exampleJa: "孫の顔を見るのが楽しみです。", exampleFurigana: "まごのかおをみるのがたのしみです。", exampleEn: "很期待看到孫子的臉。" },

  // 日常工作與經濟 (economy_business)
  { word: "企画書", furigana: "きかくしょ", romaji: "kikakusho", meaning: "企劃書", category: "economy_business", level: "N2", 
    exampleJa: "会議のために企画書を作成します。", exampleFurigana: "かいぎのためにきかくしょをさくせいします。", exampleEn: "為了會議製作企劃書。" },
  { word: "会議室", furigana: "かいぎしつ", romaji: "kaigishitsu", meaning: "會議室", category: "economy_business", level: "N4", 
    exampleJa: "会議室を予約しておいてください。", exampleFurigana: "かいぎしつをよやくしておいてください。", exampleEn: "請先預約好會議室。" },
  { word: "人事", furigana: "じんじ", romaji: "jinji", meaning: "人事 / 人事部門", category: "economy_business", level: "N2", 
    exampleJa: "彼は人事部に異動しました。", exampleFurigana: "かれはじんじぶにいどうしました。", exampleEn: "他調到人事部了。" },
  { word: "休暇", furigana: "きゅうか", romaji: "kyuuka", meaning: "休假", category: "economy_business", level: "N3", 
    exampleJa: "来週から一週間の休暇を取ります。", exampleFurigana: "らいしゅうからいっしゅうかんのきゅうかをとります。", exampleEn: "從下週起請一星期的休假。" },
  { word: "退職", furigana: "たいしょく", romaji: "taishoku", meaning: "退休 / 離職", category: "economy_business", level: "N3", 
    exampleJa: "父は来年会社を退職します。", exampleFurigana: "ちちはらいねんかいしゃをたいしょくします。", exampleEn: "父親明年將從公司退休。" },
  { word: "銀行口座", furigana: "ぎんこうこうざ", romaji: "ginkoukouza", meaning: "銀行帳戶", category: "economy_business", level: "N3", 
    exampleJa: "新しい銀行口座を開設します。", exampleFurigana: "あたらしいぎんこうこうざをかいせつします。", exampleEn: "開立新的銀行帳戶。" },
  { word: "お札", furigana: "おさつ", romaji: "osatsu", meaning: "紙鈔 / 鈔票", category: "economy_business", level: "N4", 
    exampleJa: "財布に千円のお札が入っています。", exampleFurigana: "さいふにせんえんのおさつが入っています。", exampleEn: "錢包裡有一張千元紙鈔。" },
  { word: "硬貨", furigana: "こうか", romaji: "kouka", meaning: "硬幣 / 銅板", category: "economy_business", level: "N3", 
    exampleJa: "自動販売機に硬貨を入れます。", exampleFurigana: "じどうはんばいきにこうかをいれます。", exampleEn: "把硬幣投入自動販賣機。" },
  { word: "請求書", furigana: "せいきゅうしょ", romaji: "seikyuusho", meaning: "請款單 / 帳單", category: "economy_business", level: "N3", 
    exampleJa: "今月の電気代の請求書が届きました。", exampleFurigana: "こんげつのでんきだいのせいきゅうしょがとどきました。", exampleEn: "收到這個月的電費帳單了。" },
  { word: "融資", furigana: "ゆうし", romaji: "yuushi", meaning: "融資 / 貸款", category: "economy_business", level: "N1", 
    exampleJa: "銀行から事業の融資を受けます。", exampleFurigana: "ぎんこうからじぎょうのゆうしをうけます。", exampleEn: "從銀行獲得事業的融資。" },

  // 基本社會體制 (society_politics_law)
  { word: "義務教育", furigana: "ぎむきょういく", romaji: "gimukyouiku", meaning: "義務教育", category: "society_politics_law", level: "N2", 
    exampleJa: "日本では中学校までが義務教育です。", exampleFurigana: "にほんではちゅうがっこうまでがぎむきょういくです。", exampleEn: "在日本到國中為止是義務教育。" },
  { word: "大学院", furigana: "だいがくいん", romaji: "daigakuin", meaning: "研究所", category: "society_politics_law", level: "N4", 
    exampleJa: "卒業後は大学院に進学する予定です。", exampleFurigana: "そつぎょうごはだいがくいんにしんがくするよていです。", exampleEn: "畢業後預定升學研究所。" },
  { word: "大使館", furigana: "たいしかん", romaji: "taishikan", meaning: "大使館", category: "society_politics_law", level: "N4", 
    exampleJa: "ビザの申請のために大使館へ行きます。", exampleFurigana: "びざのしんせいのためにたいしかんへいきます。", exampleEn: "為了申請簽證去大使館。" },
  { word: "選挙", furigana: "せんきょ", romaji: "senkyo", meaning: "選舉", category: "society_politics_law", level: "N3", 
    exampleJa: "日曜日に市長の選挙があります。", exampleFurigana: "にちようびにしちょうのせんきょがあります。", exampleEn: "星期天有市長選舉。" },
  { word: "裁判", furigana: "さいばん", romaji: "saiban", meaning: "審判 / 訴訟", category: "society_politics_law", level: "N3", 
    exampleJa: "事件の裁判が始まりました。", exampleFurigana: "じけんのさいばんがはじまりました。", exampleEn: "事件的審判開始了。" },
  { word: "犯罪", furigana: "はんざい", romaji: "hanzai", meaning: "犯罪", category: "society_politics_law", level: "N3", 
    exampleJa: "犯罪のない安全な社会を作ります。", exampleFurigana: "はんざいのないあんぜんなしゃかいをつくります。", exampleEn: "建立沒有犯罪的安全社會。" },
  { word: "違反", furigana: "いはん", romaji: "ihan", meaning: "違反 / 違規", category: "society_politics_law", level: "N3", 
    exampleJa: "交通ルールの違反は危険です。", exampleFurigana: "こうつうるーるのいはんはきけんです。", exampleEn: "違反交通規則很危險。" },
  { word: "平和", furigana: "へいわ", romaji: "heiwa", meaning: "和平", category: "society_politics_law", level: "N4", 
    exampleJa: "世界中の人が平和を願っています。", exampleFurigana: "せかいじゅうのひとがへいわをねがっています。", exampleEn: "全世界的人都祈求和平。" },
  { word: "義務", furigana: "ぎむ", romaji: "gimu", meaning: "義務", category: "society_politics_law", level: "N3", 
    exampleJa: "国民の義務を果たします。", exampleFurigana: "こくみんのぎむをはたします。", exampleEn: "盡國民的義務。" },
  { word: "権利", furigana: "けんり", romaji: "kenri", meaning: "權利", category: "society_politics_law", level: "N3", 
    exampleJa: "すべての人には平等な権利があります。", exampleFurigana: "すべてのひとにはびょうどうなけんりがあります。", exampleEn: "所有人都有平等的權利。" }
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
