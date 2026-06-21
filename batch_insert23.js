const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human) -> Strictly family, love, neighbors
  { word: "幼馴染", furigana: "おさななじみ", romaji: "osananajimi", meaning: "青梅竹馬 / 兒時玩伴", category: "relations_human", level: "N1", 
    exampleJa: "彼女とは幼馴染です。", exampleFurigana: "かのじょとはおさななじみです。", exampleEn: "和她是青梅竹馬。" },
  { word: "知己", furigana: "ちき", romaji: "chiki", meaning: "知己 / 熟人", category: "relations_human", level: "N1", 
    exampleJa: "長年の知己に再会しました。", exampleFurigana: "ながねんのちきにさいかいしました。", exampleEn: "與多年的知己重逢了。" },
  { word: "未婚", furigana: "みこん", romaji: "mikon", meaning: "未婚", category: "relations_human", level: "N2", 
    exampleJa: "彼はまだ未婚です。", exampleFurigana: "かれはまだみこんです。", exampleEn: "他還是未婚。" },
  { word: "伴侶", furigana: "はんりょ", romaji: "hanryo", meaning: "伴侶 / 配偶", category: "relations_human", level: "N1", 
    exampleJa: "人生の伴侶を見つけました。", exampleFurigana: "じんせいのはんりょをみつけました。", exampleEn: "找到了人生的伴侶。" },
  { word: "クラスメイト", furigana: "くらすめいと", romaji: "kurasumeito", meaning: "同班同學", category: "relations_human", level: "N4", 
    exampleJa: "クラスメイトと一緒に勉強します。", exampleFurigana: "くらすめいとといっしょにべんきょうします。", exampleEn: "和同班同學一起念書。" },
  { word: "ライバル", furigana: "らいばる", romaji: "raibaru", meaning: "對手 / 競爭者", category: "relations_human", level: "N3", 
    exampleJa: "良きライバルとして切磋琢磨します。", exampleFurigana: "よきらいばるとしてせっさたくまします。", exampleEn: "作為好對手互相切磋琢磨。" },
  { word: "結納", furigana: "ゆいのう", romaji: "yuinou", meaning: "聘禮 / 訂婚", category: "relations_human", level: "N1", 
    exampleJa: "来月、結納を交わします。", exampleFurigana: "らいげつ、ゆいのうをかわします。", exampleEn: "下個月交換聘禮（訂婚）。" },
  { word: "別居", furigana: "べっきょ", romaji: "bekkyo", meaning: "分居", category: "relations_human", level: "N1", 
    exampleJa: "夫婦は現在別居しています。", exampleFurigana: "ふうふはげんざいべっきょしています。", exampleEn: "這對夫妻現在正在分居。" },
  { word: "同居", furigana: "どうきょ", romaji: "doukyo", meaning: "同居", category: "relations_human", level: "N2", 
    exampleJa: "親と同居しています。", exampleFurigana: "おやとどうきょしています。", exampleEn: "和父母同居（住在一起）。" },
  { word: "単身赴任", furigana: "たんしんふにん", romaji: "tanshinbunin", meaning: "隻身赴任 (因工作與家人分居)", category: "relations_human", level: "N1", 
    exampleJa: "父は東京に単身赴任しています。", exampleFurigana: "ちちはとうきょうにたんしんふにんしています。", exampleEn: "父親在東京隻身赴任。" },

  // 日常工作與經濟 (economy_business)
  { word: "赤字国債", furigana: "あかじこくさい", romaji: "akajikokusai", meaning: "赤字國債", category: "economy_business", level: "N1", 
    exampleJa: "政府は赤字国債を発行しました。", exampleFurigana: "せいふはあかじこくさいをはっこうしました。", exampleEn: "政府發行了赤字國債。" },
  { word: "補助金", furigana: "ほじょきん", romaji: "hojokin", meaning: "補助金", category: "economy_business", level: "N1", 
    exampleJa: "国から補助金が支給されます。", exampleFurigana: "くにからほじょきんがしきゅうされます。", exampleEn: "由國家發放補助金。" },
  { word: "助成金", furigana: "じょせいきん", romaji: "joseikin", meaning: "助成金 / 補助款", category: "economy_business", level: "N1", 
    exampleJa: "研究のための助成金を申請します。", exampleFurigana: "けんきゅうのためのじょせいきんをしんせいします。", exampleEn: "申請用於研究的補助款。" },
  { word: "報酬", furigana: "ほうしゅう", romaji: "houshuu", meaning: "報酬 / 酬勞", category: "economy_business", level: "N1", 
    exampleJa: "仕事の報酬を受け取ります。", exampleFurigana: "しごとのほうしゅうをうけとります。", exampleEn: "領取工作的酬勞。" },
  { word: "融資額", furigana: "ゆうしがく", romaji: "yuushigaku", meaning: "貸款額度 / 融資金額", category: "economy_business", level: "N1", 
    exampleJa: "銀行の融資額が決定しました。", exampleFurigana: "ぎんこうのゆうしがくがけっていしました。", exampleEn: "銀行的貸款額度決定了。" },
  { word: "返済", furigana: "へんさい", romaji: "hensai", meaning: "償還 / 還款", category: "economy_business", level: "N1", 
    exampleJa: "借金の返済に追われています。", exampleFurigana: "しゃっきんのへんさいにおわれています。", exampleEn: "正忙於償還債務。" },
  { word: "担保", furigana: "たんぽ", romaji: "tanpo", meaning: "擔保 / 抵押", category: "economy_business", level: "N1", 
    exampleJa: "家を担保にお金を借ります。", exampleFurigana: "いえをたんぽにおかねをかります。", exampleEn: "將房子作為抵押來借錢。" },
  { word: "借入金", furigana: "かりいれきん", romaji: "kariirekin", meaning: "借款 / 貸款", category: "economy_business", level: "N1", 
    exampleJa: "会社の借入金が増加しています。", exampleFurigana: "かいしゃのかりいれきんがぞうかしています。", exampleEn: "公司的借款正在增加。" },
  { word: "不渡り", furigana: "ふわたり", romaji: "fuwatari", meaning: "跳票 (支票等)", category: "economy_business", level: "N1", 
    exampleJa: "不渡りを出して会社が倒産しました。", exampleFurigana: "ふわたりをだしてかいしゃがとうさんしました。", exampleEn: "因跳票導致公司倒閉了。" },
  { word: "差し押さえ", furigana: "さしおさえ", romaji: "sashiosae", meaning: "查封 / 扣押", category: "economy_business", level: "N1", 
    exampleJa: "財産の差し押さえを受けました。", exampleFurigana: "ざいさんのさしおさえをうけました。", exampleEn: "財產遭到了查封。" },

  // 基本社會體制 (society_politics_law)
  { word: "偏見", furigana: "へんけん", romaji: "henken", meaning: "偏見", category: "society_politics_law", level: "N1", 
    exampleJa: "偏見を持たずに人と接します。", exampleFurigana: "へんけんをもたずにひととせっします。", exampleEn: "不帶偏見地與人接觸。" },
  { word: "治安", furigana: "ちあん", romaji: "chian", meaning: "治安", category: "society_politics_law", level: "N2", 
    exampleJa: "この地域は治安が良いです。", exampleFurigana: "このちいきはちあんがよいです。", exampleEn: "這個地區治安很好。" },
  { word: "防犯", furigana: "ぼうはん", romaji: "bouhan", meaning: "防範犯罪", category: "society_politics_law", level: "N2", 
    exampleJa: "防犯カメラを設置しました。", exampleFurigana: "ぼうはんかめらをせっちしました。", exampleEn: "安裝了防盜監視器。" },
  { word: "国境", furigana: "こっきょう", romaji: "kokkyou", meaning: "國境 / 邊界", category: "society_politics_law", level: "N2", 
    exampleJa: "国境を越えて移動します。", exampleFurigana: "こっきょうをこえていどうします。", exampleEn: "跨越國境移動。" },
  { word: "領土", furigana: "りょうど", romaji: "ryoudo", meaning: "領土", category: "society_politics_law", level: "N1", 
    exampleJa: "領土問題について話し合います。", exampleFurigana: "りょうどもんだいについてはなしあいます。", exampleEn: "討論關於領土的問題。" },
  { word: "領海", furigana: "りょうかい", romaji: "ryoukai", meaning: "領海", category: "society_politics_law", level: "N1", 
    exampleJa: "領海を侵犯してはなりません。", exampleFurigana: "りょうかいをしんぱんしてはなりません。", exampleEn: "不可侵犯領海。" },
  { word: "領空", furigana: "りょうくう", romaji: "ryoukuu", meaning: "領空", category: "society_politics_law", level: "N1", 
    exampleJa: "他国の領空を通過します。", exampleFurigana: "たこくのりょうくうをつうかします。", exampleEn: "通過他國的領空。" },
  { word: "宣言", furigana: "せんげん", romaji: "sengen", meaning: "宣言", category: "society_politics_law", level: "N2", 
    exampleJa: "独立宣言が読み上げられました。", exampleFurigana: "どくりつせんげんがよみあげられました。", exampleEn: "宣讀了獨立宣言。" },
  { word: "協定", furigana: "きょうてい", romaji: "kyoutei", meaning: "協定 / 協議", category: "society_politics_law", level: "N1", 
    exampleJa: "平和協定が結ばれました。", exampleFurigana: "へいわきょうていがむすばれました。", exampleEn: "締結了和平協定。" },
  { word: "同盟", furigana: "どうめい", romaji: "doumei", meaning: "同盟", category: "society_politics_law", level: "N1", 
    exampleJa: "軍事同盟を強化します。", exampleFurigana: "ぐんじどうめいをきょうかします。", exampleEn: "加強軍事同盟。" }
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
