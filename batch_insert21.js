const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "幼児期", furigana: "ようじき", romaji: "youjiki", meaning: "幼兒期", category: "relations_human", level: "N2", 
    exampleJa: "幼児期の教育は非常に重要です。", exampleFurigana: "ようじきのきょういくはひじょうにじゅうようです。", exampleEn: "幼兒期的教育非常重要。" },
  { word: "青年期", furigana: "せいねんき", romaji: "seinenki", meaning: "青年期 / 青春期", category: "relations_human", level: "N1", 
    exampleJa: "青年期は多くの悩みを抱えます。", exampleFurigana: "せいねんきはおおくのなやみをかかえます。", exampleEn: "青年期會有許多的煩惱。" },
  { word: "熟年", furigana: "じゅくねん", romaji: "jukunen", meaning: "中年 / 熟年", category: "relations_human", level: "N1", 
    exampleJa: "熟年夫婦の旅行が増えています。", exampleFurigana: "じゅくねんふうふのりょこうがふえています。", exampleEn: "熟年夫妻的旅行正在增加。" },
  { word: "世代", furigana: "せだい", romaji: "sedai", meaning: "世代 / 一代", category: "relations_human", level: "N2", 
    exampleJa: "世代間のギャップを感じます。", exampleFurigana: "せだいかんのぎゃっぷをかんじます。", exampleEn: "感受到了世代間的代溝。" },
  { word: "人類", furigana: "じんるい", romaji: "jinrui", meaning: "人類", category: "relations_human", level: "N2", 
    exampleJa: "人類の歴史について勉強します。", exampleFurigana: "じんるいのれきしについてべんきょうします。", exampleEn: "學習關於人類的歷史。" },
  { word: "交際", furigana: "こうさい", romaji: "kousai", meaning: "交往 / 交際", category: "relations_human", level: "N2", 
    exampleJa: "彼女とは結婚を前提に交際しています。", exampleFurigana: "かのじょとはけっこんをぜんていにこうさいしています。", exampleEn: "以結婚為前提與她交往。" },
  { word: "絶交", furigana: "ぜっこう", romaji: "zekkou", meaning: "絕交", category: "relations_human", level: "N1", 
    exampleJa: "親友と喧嘩して絶交しました。", exampleFurigana: "しんゆうとけんかしてぜっこうしました。", exampleEn: "和摯友吵架並絕交了。" },
  { word: "人脈", furigana: "じんみゃく", romaji: "jinmyaku", meaning: "人脈 / 人際網路", category: "relations_human", level: "N1", 
    exampleJa: "ビジネスには人脈が欠かせません。", exampleFurigana: "びじねすにはじんみゃくがかかせません。", exampleEn: "做生意人脈是不可或缺的。" },
  { word: "恩恵", furigana: "おんけい", romaji: "onkei", meaning: "恩惠 / 恩賜", category: "relations_human", level: "N1", 
    exampleJa: "自然の恩恵に感謝します。", exampleFurigana: "しぜんのおんけいにかんしゃします。", exampleEn: "感謝大自然的恩惠。" },
  { word: "人情", furigana: "にんじょう", romaji: "ninjou", meaning: "人情 / 人情味", category: "relations_human", level: "N1", 
    exampleJa: "この町は人情が厚いです。", exampleFurigana: "このまちはにんじょうがあついです。", exampleEn: "這個城鎮很有人情味。" },

  // 日常工作與經濟 (economy_business)
  { word: "景気回復", furigana: "けいきかいふく", romaji: "keikikaifuku", meaning: "景氣復甦", category: "economy_business", level: "N1", 
    exampleJa: "政府は景気回復の対策を打ち出しました。", exampleFurigana: "せいふはけいきかいふくのたいさくをうちだしました。", exampleEn: "政府推出了景氣復甦的對策。" },
  { word: "不景気", furigana: "ふけいき", romaji: "fukeiki", meaning: "不景氣 / 蕭條", category: "economy_business", level: "N2", 
    exampleJa: "不景気で物が売れません。", exampleFurigana: "ふけいきでものがうれません。", exampleEn: "因為不景氣東西賣不出去。" },
  { word: "物価上昇", furigana: "ぶっかじょうしょう", romaji: "bukkajoushou", meaning: "物價上漲", category: "economy_business", level: "N1", 
    exampleJa: "物価上昇が家計を圧迫しています。", exampleFurigana: "ぶっかじょうしょうがかけいをあっぱくしています。", exampleEn: "物價上漲壓迫到了家庭收支。" },
  { word: "デフレ", furigana: "でふれ", romaji: "defure", meaning: "通貨緊縮", category: "economy_business", level: "N1", 
    exampleJa: "デフレから脱却する必要があります。", exampleFurigana: "でふれからだっきゃくするひつようがあります。", exampleEn: "有必要擺脫通貨緊縮。" },
  { word: "インフレ", furigana: "いんふれ", romaji: "infure", meaning: "通貨膨脹", category: "economy_business", level: "N1", 
    exampleJa: "急激なインフレが起きています。", exampleFurigana: "きゅうげきないんふれがおきています。", exampleEn: "正在發生急劇的通貨膨脹。" },
  { word: "収益", furigana: "しゅうえき", romaji: "shuueki", meaning: "收益 / 利潤", category: "economy_business", level: "N1", 
    exampleJa: "新しい事業で収益を上げます。", exampleFurigana: "あたらしいじぎょうでしゅうえきをあげます。", exampleEn: "透過新事業提高收益。" },
  { word: "賃金", furigana: "ちんぎん", romaji: "chingin", meaning: "工資 / 薪資", category: "economy_business", level: "N1", 
    exampleJa: "最低賃金が引き上げられました。", exampleFurigana: "さいていちんぎんがひきあげられました。", exampleEn: "最低工資被調高了。" },
  { word: "雇用", furigana: "こよう", romaji: "koyou", meaning: "僱用 / 就業", category: "economy_business", level: "N1", 
    exampleJa: "政府は雇用の創出に努めています。", exampleFurigana: "せいふはこようのそうしゅつにつとめています。", exampleEn: "政府正在努力創造就業機會。" },
  { word: "失業", furigana: "しつぎょう", romaji: "shitsugyou", meaning: "失業", category: "economy_business", level: "N2", 
    exampleJa: "失業率が低下しました。", exampleFurigana: "しつぎょうりつがていかしました。", exampleEn: "失業率下降了。" },
  { word: "年収", furigana: "ねんしゅう", romaji: "nenshuu", meaning: "年收入", category: "economy_business", level: "N2", 
    exampleJa: "年収がアップする会社に転職したいです。", exampleFurigana: "ねんしゅうがあっぷするかいしゃにてんしょくしたいです。", exampleEn: "想跳槽到年收入會增加的公司。" },

  // 基本社會體制 (society_politics_law)
  { word: "衆議院", furigana: "しゅうぎいん", romaji: "shuugiin", meaning: "眾議院", category: "society_politics_law", level: "N1", 
    exampleJa: "衆議院の解散が発表されました。", exampleFurigana: "しゅうぎいんのかいさんがはっぴょうされました。", exampleEn: "宣布了解散眾議院。" },
  { word: "参議院", furigana: "さんぎいん", romaji: "sangiin", meaning: "參議院", category: "society_politics_law", level: "N1", 
    exampleJa: "参議院選挙の投票日です。", exampleFurigana: "さんぎいんせんきょのとうひょうびです。", exampleEn: "是參議院選舉的投票日。" },
  { word: "選挙活動", furigana: "せんきょかつどう", romaji: "senkyokatsudou", meaning: "選舉活動", category: "society_politics_law", level: "N1", 
    exampleJa: "駅前で選挙活動が行われています。", exampleFurigana: "えきまえでせんきょかつどうがおこなわれています。", exampleEn: "車站前正在進行選舉活動。" },
  { word: "判決", furigana: "はんけつ", romaji: "hanketsu", meaning: "判決", category: "society_politics_law", level: "N1", 
    exampleJa: "裁判長が判決を言い渡しました。", exampleFurigana: "さいばんちょうがはんけつをいいわたしました。", exampleEn: "審判長宣讀了判決。" },
  { word: "告訴", furigana: "こくそ", romaji: "kokuso", meaning: "提告 / 控告", category: "society_politics_law", level: "N1", 
    exampleJa: "相手を名誉毀損で告訴します。", exampleFurigana: "あいてをめいよきそんでこくそします。", exampleEn: "以妨害名譽控告對方。" },
  { word: "憲法改正", furigana: "けんぽうかいせい", romaji: "kenpoukaisei", meaning: "修憲", category: "society_politics_law", level: "N1", 
    exampleJa: "憲法改正の議論が活発になっています。", exampleFurigana: "けんぽうかいせいのぎろんがかつぱつになっています。", exampleEn: "關於修憲的討論變得熱烈。" },
  { word: "国連", furigana: "こくれん", romaji: "kokuren", meaning: "聯合國", category: "society_politics_law", level: "N1", 
    exampleJa: "国連の平和維持活動に参加します。", exampleFurigana: "こくれんのへいわいじかつどうにさんかします。", exampleEn: "參加聯合國的維和行動。" },
  { word: "独立", furigana: "どくりつ", romaji: "dokuritsu", meaning: "獨立", category: "society_politics_law", level: "N2", 
    exampleJa: "植民地が独立を宣言しました。", exampleFurigana: "しょくみんちがどくりつをせんげんしました。", exampleEn: "殖民地宣布了獨立。" },
  { word: "植民地", furigana: "しょくみんち", romaji: "shokuminchi", meaning: "殖民地", category: "society_politics_law", level: "N1", 
    exampleJa: "かつてこの国は植民地でした。", exampleFurigana: "かつてこのくにはしょくみんちでした。", exampleEn: "這個國家過去曾是殖民地。" },
  { word: "難民", furigana: "なんみん", romaji: "nanmin", meaning: "難民", category: "society_politics_law", level: "N1", 
    exampleJa: "難民の受け入れ問題を議論します。", exampleFurigana: "なんみんのうけいれもんだいをぎろんします。", exampleEn: "討論收容難民的問題。" }
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
