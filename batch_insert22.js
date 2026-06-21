const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human) -> Strictly family, love, neighbors. No business titles!
  { word: "新郎", furigana: "しんろう", romaji: "shinrou", meaning: "新郎", category: "relations_human", level: "N3", 
    exampleJa: "新郎が挨拶をしています。", exampleFurigana: "しんろうがあいさつをしています。", exampleEn: "新郎正在致詞。" },
  { word: "新婦", furigana: "しんぷ", romaji: "shinpu", meaning: "新娘", category: "relations_human", level: "N3", 
    exampleJa: "新婦のドレスが綺麗です。", exampleFurigana: "しんぷのどれすがきれいです。", exampleEn: "新娘的婚紗很漂亮。" },
  { word: "世話", furigana: "せわ", romaji: "sewa", meaning: "照顧 / 幫忙", category: "relations_human", level: "N3", 
    exampleJa: "お世話になりました。", exampleFurigana: "おせわになりました。", exampleEn: "受您照顧了。" },
  { word: "親孝行", furigana: "おやこうこう", romaji: "oyakoukou", meaning: "孝順", category: "relations_human", level: "N2", 
    exampleJa: "両親に親孝行をしたいです。", exampleFurigana: "りょうしんにおやこうこうをしたいです。", exampleEn: "想要孝順父母。" },
  { word: "ご近所さん", furigana: "ごきんじょさん", romaji: "gokinjosan", meaning: "鄰居們", category: "relations_human", level: "N3", 
    exampleJa: "ご近所さんと仲良くしています。", exampleFurigana: "ごきんじょさんとなかよくしています。", exampleEn: "和鄰居們相處得很融洽。" },
  { word: "主婦", furigana: "しゅふ", romaji: "shufu", meaning: "家庭主婦", category: "relations_human", level: "N3", 
    exampleJa: "母は専業主婦です。", exampleFurigana: "はははせんぎょうしゅふです。", exampleEn: "母親是全職家庭主婦。" },
  { word: "共働き", furigana: "ともばたらき", romaji: "tomobataraki", meaning: "雙薪家庭 / 雙職工", category: "relations_human", level: "N2", 
    exampleJa: "私たちは共働きで生活しています。", exampleFurigana: "わたしたちはともばたらきでせいかつしています。", exampleEn: "我們是雙薪家庭。" },
  { word: "片思い", furigana: "かたおもい", romaji: "kataomoi", meaning: "單戀 / 暗戀", category: "relations_human", level: "N2", 
    exampleJa: "彼にずっと片思いをしています。", exampleFurigana: "かれにずっとかたおもいをしています。", exampleEn: "一直單戀著他。" },
  { word: "両思い", furigana: "りょうおもい", romaji: "ryouomoi", meaning: "兩情相悅 / 互相喜歡", category: "relations_human", level: "N2", 
    exampleJa: "二人はついに両思いになりました。", exampleFurigana: "ふたりはついにりょうおもいになりました。", exampleEn: "兩人終於兩情相悅了。" },
  { word: "お見合い", furigana: "おみあい", romaji: "omiai", meaning: "相親", category: "relations_human", level: "N2", 
    exampleJa: "週末にお見合いをする予定です。", exampleFurigana: "しゅうまつにおみあいをするよていです。", exampleEn: "週末預定要去相親。" },

  // 日常工作與經濟 (economy_business)
  { word: "企画開発", furigana: "きかくかいはつ", romaji: "kikakukaihatsu", meaning: "企劃開發", category: "economy_business", level: "N1", 
    exampleJa: "企画開発の部門に所属しています。", exampleFurigana: "きかくかいはつのぶもんにしょぞくしています。", exampleEn: "隸屬於企劃開發部門。" },
  { word: "マーケティング", furigana: "まーけてぃんぐ", romaji: "maaketingu", meaning: "行銷", category: "economy_business", level: "N1", 
    exampleJa: "マーケティングの戦略を立てます。", exampleFurigana: "まーけてぃんぐのせんりゃくをたてます。", exampleEn: "制定行銷戰略。" },
  { word: "会計士", furigana: "かいけいし", romaji: "kaikeishi", meaning: "會計師", category: "economy_business", level: "N1", 
    exampleJa: "公認会計士の資格を取得しました。", exampleFurigana: "こうにんかいけいしのしかくをしゅとくしました。", exampleEn: "取得了註冊會計師的資格。" },
  { word: "税理士", furigana: "ぜいりし", romaji: "zeirishi", meaning: "稅務師", category: "economy_business", level: "N1", 
    exampleJa: "確定申告を税理士に依頼します。", exampleFurigana: "かくていしんこくをぜいりしにいらいします。", exampleEn: "委託稅務師進行報稅。" },
  { word: "労働者", furigana: "ろうどうしゃ", romaji: "roudousha", meaning: "勞動者 / 勞工", category: "economy_business", level: "N2", 
    exampleJa: "労働者の権利を守る法律です。", exampleFurigana: "ろうどうしゃのけんりをまもるほうりつです。", exampleEn: "這是保護勞工權利的法律。" },
  { word: "資本家", furigana: "しほんか", romaji: "shihonka", meaning: "資本家", category: "economy_business", level: "N1", 
    exampleJa: "資本家と労働者の対立があります。", exampleFurigana: "しほんかとろうどうしゃのたいりつがあります。", exampleEn: "存在著資本家與勞工的對立。" },
  { word: "株主", furigana: "かぶぬし", romaji: "kabunushi", meaning: "股東", category: "economy_business", level: "N1", 
    exampleJa: "株主総会が開催されました。", exampleFurigana: "かぶぬしそうかいがかいさいされました。", exampleEn: "召開了股東大會。" },
  { word: "上場", furigana: "じょうじょう", romaji: "joujou", meaning: "股票上市", category: "economy_business", level: "N1", 
    exampleJa: "ついに会社が株式上場を果たしました。", exampleFurigana: "ついにかいしゃがかぶしきじょうじょうをはたしました。", exampleEn: "公司終於實現了股票上市。" },
  { word: "資金繰り", furigana: "しきんぐり", romaji: "shikinguri", meaning: "資金調度 / 現金流", category: "economy_business", level: "N1", 
    exampleJa: "資金繰りが悪化して倒産しました。", exampleFurigana: "しきんぐりがあっかしてとうさんしました。", exampleEn: "因資金調度惡化而倒閉了。" },
  { word: "出費", furigana: "しゅっぴ", romaji: "shuppi", meaning: "支出 / 花費", category: "economy_business", level: "N2", 
    exampleJa: "今月は予期せぬ出費が多かったです。", exampleFurigana: "こんげつはよきせぬしゅっぴがおおかったです。", exampleEn: "這個月有很多預期外的花費。" },

  // 基本社會體制 (society_politics_law)
  { word: "人権", furigana: "じんけん", romaji: "jinken", meaning: "人權", category: "society_politics_law", level: "N2", 
    exampleJa: "人権を尊重する社会を作ります。", exampleFurigana: "じんけんをそんちょうするしゃかいをつくります。", exampleEn: "建立尊重人權的社會。" },
  { word: "投票権", furigana: "とうひょうけん", romaji: "touhyouken", meaning: "投票權", category: "society_politics_law", level: "N1", 
    exampleJa: "国民は投票権を持っています。", exampleFurigana: "こくみんはとうひょうけんをもっています。", exampleEn: "國民擁有投票權。" },
  { word: "市議会", furigana: "しぎかい", romaji: "shigikai", meaning: "市議會", category: "society_politics_law", level: "N1", 
    exampleJa: "市議会で予算が承認されました。", exampleFurigana: "しぎかいでよさんがしょうにんされました。", exampleEn: "市議會批准了預算。" },
  { word: "首長", furigana: "しゅちょう", romaji: "shuchou", meaning: "地方首長 / 長官", category: "society_politics_law", level: "N1", 
    exampleJa: "地方自治体の首長を選びます。", exampleFurigana: "ちほうじちたいのしゅちょうをえらびます。", exampleEn: "選舉地方自治體的首長。" },
  { word: "民法", furigana: "みんぽう", romaji: "minpou", meaning: "民法", category: "society_politics_law", level: "N1", 
    exampleJa: "民法の規定に従って処理します。", exampleFurigana: "みんぽうのきていにしたがってしょりします。", exampleEn: "依照民法的規定進行處理。" },
  { word: "行政", furigana: "ぎょうせい", romaji: "gyousei", meaning: "行政 / 行政機關", category: "society_politics_law", level: "N1", 
    exampleJa: "行政の効率化が求められています。", exampleFurigana: "ぎょうせいのこうりつかがもとめられています。", exampleEn: "行政效率化受到要求。" },
  { word: "司法", furigana: "しほう", romaji: "shihou", meaning: "司法", category: "society_politics_law", level: "N1", 
    exampleJa: "司法の独立は守られるべきです。", exampleFurigana: "しほうのどくりつはまもられるべきです。", exampleEn: "司法的獨立應該受到保護。" },
  { word: "立法", furigana: "りっぽう", romaji: "rippou", meaning: "立法", category: "society_politics_law", level: "N1", 
    exampleJa: "国会は唯一の立法機関です。", exampleFurigana: "こっかいはゆいいつのりっぽうきかんです。", exampleEn: "國會是唯一的立法機關。" },
  { word: "三権分立", furigana: "さんけんぶんりつ", romaji: "sankenbunritsu", meaning: "三權分立", category: "society_politics_law", level: "N1", 
    exampleJa: "民主主義は三権分立が基礎です。", exampleFurigana: "みんしゅしゅぎはさんけんぶんりつがきそです。", exampleEn: "民主主義以三權分立為基礎。" },
  { word: "公務員", furigana: "こうむいん", romaji: "koumuin", meaning: "公務員", category: "society_politics_law", level: "N2", 
    exampleJa: "彼は市役所で働く公務員です。", exampleFurigana: "かれはしやくしょではたらくこうむいんです。", exampleEn: "他是在市公所工作的公務員。" }
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
