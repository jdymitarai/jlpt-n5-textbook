const fs = require('fs');
const path = require('path');
const vm = require('vm');

const wordsToAdd = [
  // 數量與數理 (math_quantity)
  { word: "距離", furigana: "きょり", romaji: "kyori", meaning: "距離", category: "math_quantity", level: "N3", 
    exampleJa: "ここから駅までの距離は遠いです。", exampleFurigana: "ここからえきまでのきょりはとおいです。", exampleEn: "從這裡到車站的距離很遠。" },
  { word: "面積", furigana: "めんせき", romaji: "menseki", meaning: "面積", category: "math_quantity", level: "N2", 
    exampleJa: "この土地の面積を測ります。", exampleFurigana: "このとちのめんせきをはかります。", exampleEn: "測量這塊土地的面積。" },
  { word: "体積", furigana: "たいせき", romaji: "taiseki", meaning: "體積", category: "math_quantity", level: "N2", 
    exampleJa: "箱の体積を計算します。", exampleFurigana: "はこのたいせきをけいさんします。", exampleEn: "計算箱子的體積。" },
  { word: "角度", furigana: "かくど", romaji: "kakudo", meaning: "角度", category: "math_quantity", level: "N2", 
    exampleJa: "違う角度から物事を見ます。", exampleFurigana: "ちがうかくどからものごとをみます。", exampleEn: "從不同的角度看待事物。" },
  { word: "温度", furigana: "おんど", romaji: "ondo", meaning: "溫度", category: "math_quantity", level: "N3", 
    exampleJa: "部屋の温度を調節します。", exampleFurigana: "へやのおんどをちょうせつします。", exampleEn: "調節房間的溫度。" },
  { word: "速度", furigana: "そくど", romaji: "sokudo", meaning: "速度", category: "math_quantity", level: "N2", 
    exampleJa: "車の速度を落とします。", exampleFurigana: "くるまのそくどをおとします。", exampleEn: "降低車子的速度。" },
  { word: "足し算", furigana: "たしざん", romaji: "tashizan", meaning: "加法", category: "math_quantity", level: "N2", 
    exampleJa: "子供に足し算を教えます。", exampleFurigana: "こどもにたしざんをおしえます。", exampleEn: "教小孩加法。" },
  { word: "引き算", furigana: "ひきざん", romaji: "hikizan", meaning: "減法", category: "math_quantity", level: "N2", 
    exampleJa: "引き算の計算を間違えました。", exampleFurigana: "ひきざんのけいさんをまちがえました。", exampleEn: "減法計算算錯了。" },
  { word: "掛け算", furigana: "かけざん", romaji: "kakezan", meaning: "乘法", category: "math_quantity", level: "N2", 
    exampleJa: "掛け算の九九を暗記します。", exampleFurigana: "かけざんのくくをあんきします。", exampleEn: "背誦乘法九九乘法表。" },
  { word: "割り算", furigana: "わりざん", romaji: "warizan", meaning: "除法", category: "math_quantity", level: "N2", 
    exampleJa: "割り算の答えを求めます。", exampleFurigana: "わりざんのこたえをもとめます。", exampleEn: "求解除法的答案。" },

  // 性質狀態關係 - 狀態與形狀 (properties_relations)
  { word: "円形", furigana: "えんけい", romaji: "enkei", meaning: "圓形", category: "properties_relations", level: "N2", 
    exampleJa: "円形のテーブルを買いました。", exampleFurigana: "えんけいのてーぶるをかいました。", exampleEn: "買了圓形的桌子。" },
  { word: "三角形", furigana: "さんかくけい", romaji: "sankakukei", meaning: "三角形", category: "properties_relations", level: "N2", 
    exampleJa: "三角形の面積を求める公式です。", exampleFurigana: "さんかくけいのめんせきをもとめるこうしきです。", exampleEn: "這是求三角形面積的公式。" },
  { word: "四角形", furigana: "しかくけい", romaji: "shikakukei", meaning: "四角形", category: "properties_relations", level: "N2", 
    exampleJa: "四角形の箱に荷物を詰めます。", exampleFurigana: "しかくけいのはこににもつをつめます。", exampleEn: "把行李裝進四角形的箱子裡。" },
  { word: "正方形", furigana: "せいほうけい", romaji: "seihoukei", meaning: "正方形", category: "properties_relations", level: "N2", 
    exampleJa: "折り紙は正方形です。", exampleFurigana: "おりがみはせいほうけいです。", exampleEn: "色紙是正方形的。" },
  { word: "長方形", furigana: "ちょうほうけい", romaji: "chouhoukei", meaning: "長方形", category: "properties_relations", level: "N2", 
    exampleJa: "長方形の封筒を選びます。", exampleFurigana: "ちょうほうけいのふうとうをえらびます。", exampleEn: "選擇長方形的信封。" },
  { word: "巨大", furigana: "きょだい", romaji: "kyodai", meaning: "巨大", category: "properties_relations", level: "N2", 
    exampleJa: "巨大なビルが建設されています。", exampleFurigana: "きょだいなびるがけんせつされています。", exampleEn: "正在建設巨大的大樓。" },
  { word: "微小", furigana: "びしょう", romaji: "bishou", meaning: "微小 / 細微", category: "properties_relations", level: "N1", 
    exampleJa: "微小な変化に気付きました。", exampleFurigana: "びしょうなへんかにきづきました。", exampleEn: "注意到了微小的變化。" },
  { word: "透明", furigana: "とうめい", romaji: "toumei", meaning: "透明", category: "properties_relations", level: "N2", 
    exampleJa: "透明なガラスのコップです。", exampleFurigana: "とうめいながらすのこっぷです。", exampleEn: "透明的玻璃杯。" },
  { word: "濁り", furigana: "にごり", romaji: "nigori", meaning: "混濁 / 污濁", category: "properties_relations", level: "N1", 
    exampleJa: "川の水に濁りがあります。", exampleFurigana: "かわのみずににごりがあります。", exampleEn: "河水有混濁的現象。" },
  { word: "状態", furigana: "じょうたい", romaji: "joutai", meaning: "狀態 / 情況", category: "properties_relations", level: "N3", 
    exampleJa: "機械の状態を確認します。", exampleFurigana: "きかいのじょうたいをかくにんします。", exampleEn: "確認機器的狀態。" },

  // 性質狀態關係 - 邏輯關係 (properties_relations)
  { word: "同一", furigana: "どういつ", romaji: "douitsu", meaning: "同一 / 相同", category: "properties_relations", level: "N1", 
    exampleJa: "二つの事件は同一人物の犯行です。", exampleFurigana: "ふたつのじけんはどういつじんぶつのはんこうです。", exampleEn: "兩起事件是同一人的犯行。" },
  { word: "類似", furigana: "るいじ", romaji: "ruiji", meaning: "類似 / 相似", category: "properties_relations", level: "N1", 
    exampleJa: "類似した商品が多くあります。", exampleFurigana: "るいじしたしょうひんがおおくあります。", exampleEn: "有很多類似的商品。" },
  { word: "差異", furigana: "さい", romaji: "sai", meaning: "差異", category: "properties_relations", level: "N1", 
    exampleJa: "両者の間には大きな差異があります。", exampleFurigana: "りょうしゃのあいだにはおおきなさいがあります。", exampleEn: "兩者之間有很大的差異。" },
  { word: "正反対", furigana: "せいはんたい", romaji: "seihantai", meaning: "正相反", category: "properties_relations", level: "N2", 
    exampleJa: "兄と弟は性格が正反対です。", exampleFurigana: "あにとおとうとはせいかくがせいはんたいです。", exampleEn: "哥哥和弟弟的性格正相反。" },
  { word: "矛盾", furigana: "むじゅん", romaji: "mujun", meaning: "矛盾", category: "properties_relations", level: "N1", 
    exampleJa: "彼の発言には矛盾があります。", exampleFurigana: "かれのはつげんにはむじゅんがあります。", exampleEn: "他的發言有矛盾。" },
  { word: "順序", furigana: "じゅんじょ", romaji: "junjo", meaning: "順序", category: "properties_relations", level: "N2", 
    exampleJa: "正しい順序で組み立てます。", exampleFurigana: "ただしいじゅんじょでくみたてます。", exampleEn: "依照正確的順序組裝。" },
  { word: "逆転", furigana: "ぎゃくてん", romaji: "gyakuten", meaning: "逆轉 / 反轉", category: "properties_relations", level: "N1", 
    exampleJa: "試合の終盤で逆転しました。", exampleFurigana: "しあいのしゅうばんでぎゃくてんしました。", exampleEn: "在比賽尾聲逆轉了。" },
  { word: "比例", furigana: "ひれい", romaji: "hirei", meaning: "比例 / 成正比", category: "properties_relations", level: "N1", 
    exampleJa: "収入に比例して税金が高くなります。", exampleFurigana: "しゅうにゅうにひれいしてぜいきんがたかくなります。", exampleEn: "稅金會與收入成正比變高。" },
  { word: "原因", furigana: "げんいん", romaji: "genin", meaning: "原因", category: "properties_relations", level: "N3", 
    exampleJa: "事故の原因を調査します。", exampleFurigana: "じこのげんいんをちょうさします。", exampleEn: "調查事故的原因。" },
  { word: "結果", furigana: "けっか", romaji: "kekka", meaning: "結果", category: "properties_relations", level: "N3", 
    exampleJa: "試験の結果が発表されました。", exampleFurigana: "しけんのけっかがはっぴょうされました。", exampleEn: "考試的結果發布了。" }
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
