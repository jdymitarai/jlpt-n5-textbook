const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 家族與人際關係 (relations_human)
  { word: "花婿", furigana: "はなむこ", romaji: "hanamuko", meaning: "新郎", category: "relations_human", level: "N3", 
    exampleJa: "花婿が緊張して待っています。", exampleFurigana: "はなむこがきんちょうしてまっています。", exampleEn: "新郎緊張地等待著。" },
  { word: "花嫁", furigana: "はなよめ", romaji: "hanayome", meaning: "新娘", category: "relations_human", level: "N3", 
    exampleJa: "花嫁のドレスがとても美しいです。", exampleFurigana: "はなよめのどれすがとてもうつくしいです。", exampleEn: "新娘的婚紗非常美麗。" },
  { word: "義兄", furigana: "ぎけい", romaji: "gikei", meaning: "姐夫 / 大伯", category: "relations_human", level: "N2", 
    exampleJa: "義兄はとても優しい人です。", exampleFurigana: "ぎけいはとてもやさしいひとです。", exampleEn: "姐夫是個非常溫柔的人。" },
  { word: "義弟", furigana: "ぎてい", romaji: "gitei", meaning: "妹夫 / 小叔", category: "relations_human", level: "N2", 
    exampleJa: "義弟と一緒にお酒を飲みます。", exampleFurigana: "ぎていといっしょにおさけをのみます。", exampleEn: "和妹夫一起喝酒。" },
  { word: "義姉", furigana: "ぎし", romaji: "gishi", meaning: "大嫂 / 姑嫂", category: "relations_human", level: "N2", 
    exampleJa: "義姉から服をもらいました。", exampleFurigana: "ぎしからふくをもらいました。", exampleEn: "從大嫂那裡拿到了衣服。" },
  { word: "義妹", furigana: "ぎまい", romaji: "gimai", meaning: "弟妹 / 姑嫂", category: "relations_human", level: "N2", 
    exampleJa: "義妹は今大学生です。", exampleFurigana: "ぎまいはいまんだいがくせいです。", exampleEn: "弟妹現在是大學生。" },
  { word: "幼少期", furigana: "ようしょうき", romaji: "youshouki", meaning: "幼年時期", category: "relations_human", level: "N1", 
    exampleJa: "幼少期は田舎で過ごしました。", exampleFurigana: "ようしょうきはいなかですごしました。", exampleEn: "幼年時期在鄉下度過。" },
  { word: "思春期", furigana: "ししゅんき", romaji: "shishunki", meaning: "青春期", category: "relations_human", level: "N1", 
    exampleJa: "思春期の子供は難しいです。", exampleFurigana: "ししゅんきのこどもはむずかしいです。", exampleEn: "青春期的小孩很難搞。" },
  { word: "青春", furigana: "せいしゅん", romaji: "seishun", meaning: "青春", category: "relations_human", level: "N3", 
    exampleJa: "友達と青春を楽しみます。", exampleFurigana: "ともだちとせいしゅんをたのしみます。", exampleEn: "和朋友享受青春。" },
  { word: "老後", furigana: "ろうご", romaji: "rougo", meaning: "晚年 / 養老", category: "relations_human", level: "N3", 
    exampleJa: "老後の生活に備えて貯金します。", exampleFurigana: "ろうごのせいかつにそなえてちょきんします。", exampleEn: "為了晚年的生活而存錢。" },

  // 日常工作與經濟 (economy_business)
  { word: "顧客", furigana: "こきゃく", romaji: "kokyaku", meaning: "顧客 / 客戶", category: "economy_business", level: "N2", 
    exampleJa: "顧客の満足度を高めます。", exampleFurigana: "こきゃくのまんぞくどをたかめます。", exampleEn: "提高顧客的滿意度。" },
  { word: "取引先", furigana: "とりひきさき", romaji: "torihikisaki", meaning: "客戶 / 往來廠商", category: "economy_business", level: "N2", 
    exampleJa: "取引先にメールを送ります。", exampleFurigana: "とりひきさきにめーるをおくります。", exampleEn: "寄送郵件給客戶。" },
  { word: "企画", furigana: "きかく", romaji: "kikaku", meaning: "企劃 / 計劃", category: "economy_business", level: "N3", 
    exampleJa: "新しい商品の企画を立てます。", exampleFurigana: "あたらしいしょうひんのきかくをたてます。", exampleEn: "制定新商品的企劃。" },
  { word: "会計", furigana: "かいけい", romaji: "kaikei", meaning: "會計 / 結帳", category: "economy_business", level: "N3", 
    exampleJa: "レストランで会計を済ませます。", exampleFurigana: "れすとらんかいけいをすませます。", exampleEn: "在餐廳結完帳。" },
  { word: "経理", furigana: "けいり", romaji: "keiri", meaning: "會計部門 / 財務", category: "economy_business", level: "N2", 
    exampleJa: "経理部で働いています。", exampleFurigana: "けいりぶではたらいています。", exampleEn: "在財務部工作。" },
  { word: "見積もり", furigana: "みつもり", romaji: "mitsumori", meaning: "估價 / 報價", category: "economy_business", level: "N2", 
    exampleJa: "業者に見積もりを依頼します。", exampleFurigana: "ぎょうしゃにみつもりをいらいします。", exampleEn: "委託廠商報價。" },
  { word: "納品書", furigana: "のうひんしょ", romaji: "nouhinsho", meaning: "交貨單", category: "economy_business", level: "N2", 
    exampleJa: "商品と一緒に納品書を送ります。", exampleFurigana: "しょうひんといっしょにのうひんしょをおくります。", exampleEn: "將交貨單連同商品一起寄出。" },
  { word: "契約書", furigana: "けいやくしょ", romaji: "keiyakusho", meaning: "契約書", category: "economy_business", level: "N2", 
    exampleJa: "契約書にサインをお願いします。", exampleFurigana: "けいやくしょにさいんをおねがいします。", exampleEn: "麻煩在契約書上簽名。" },
  { word: "書類", furigana: "しょるい", romaji: "shorui", meaning: "文件 / 書面資料", category: "economy_business", level: "N4", 
    exampleJa: "会議の書類を準備します。", exampleFurigana: "かいぎのしょるいをじゅんびします。", exampleEn: "準備會議的文件。" },
  { word: "署名", furigana: "しょめい", romaji: "shomei", meaning: "簽名 / 署名", category: "economy_business", level: "N2", 
    exampleJa: "ここに署名をしてください。", exampleFurigana: "ここにしょめいをしてください。", exampleEn: "請在這裡簽名。" },

  // 基本社會體制 (society_politics_law)
  { word: "市民", furigana: "しみん", romaji: "shimin", meaning: "市民", category: "society_politics_law", level: "N3", 
    exampleJa: "市民の意見を尊重します。", exampleFurigana: "しみんのいけんをそんちょうします。", exampleEn: "尊重市民的意見。" },
  { word: "住民", furigana: "じゅうみん", romaji: "juumin", meaning: "居民", category: "society_politics_law", level: "N3", 
    exampleJa: "地域の住民と交流します。", exampleFurigana: "ちいきのじゅうみんとこうりゅうします。", exampleEn: "與地區的居民交流。" },
  { word: "国民", furigana: "こくみん", romaji: "kokumin", meaning: "國民", category: "society_politics_law", level: "N3", 
    exampleJa: "国民の生活を守ります。", exampleFurigana: "こくみんのせいかつをまもります。", exampleEn: "保護國民的生活。" },
  { word: "人民", furigana: "じんみん", romaji: "jinmin", meaning: "人民", category: "society_politics_law", level: "N1", 
    exampleJa: "人民の力を信じます。", exampleFurigana: "じんみんのちからをしんじます。", exampleEn: "相信人民的力量。" },
  { word: "大衆", furigana: "たいしゅう", romaji: "taishuu", meaning: "大眾", category: "society_politics_law", level: "N1", 
    exampleJa: "大衆向けの雑誌を出版します。", exampleFurigana: "たいしゅうむけのざっしをしゅっぱんします。", exampleEn: "出版面向大眾的雜誌。" },
  { word: "警察官", furigana: "けいさつかん", romaji: "keisatsukan", meaning: "警官", category: "society_politics_law", level: "N4", 
    exampleJa: "警察官がパトロールしています。", exampleFurigana: "けいさつかんがぱとろーるしています。", exampleEn: "警官正在巡邏。" },
  { word: "消防士", furigana: "しょうぼうし", romaji: "shouboushi", meaning: "消防員", category: "society_politics_law", level: "N4", 
    exampleJa: "消防士が火事を消しました。", exampleFurigana: "しょうぼうしがかじをけしました。", exampleEn: "消防員撲滅了火災。" },
  { word: "容疑者", furigana: "ようぎしゃ", romaji: "yougisha", meaning: "嫌疑犯", category: "society_politics_law", level: "N1", 
    exampleJa: "警察が容疑者を逮捕しました。", exampleFurigana: "けいさつがようぎしゃをたいほしました。", exampleEn: "警察逮捕了嫌疑犯。" },
  { word: "消防車", furigana: "しょうぼうしゃ", romaji: "shoubousha", meaning: "消防車", category: "society_politics_law", level: "N4", 
    exampleJa: "赤い消防車が走っていきます。", exampleFurigana: "あかいしょうぼうしゃがはしっていきます。", exampleEn: "紅色的消防車駛過去了。" },
  { word: "逮捕", furigana: "たいほ", romaji: "taiho", meaning: "逮捕", category: "society_politics_law", level: "N2", 
    exampleJa: "犯人がついに逮捕されました。", exampleFurigana: "はんにんがついにたいほされました。", exampleEn: "犯人終於被逮捕了。" }
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
