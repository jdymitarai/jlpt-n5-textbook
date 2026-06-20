const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt20 = [
  // ================= 學校與升學日常 (School & Studying) - Category: learning_education =================
  { id: "v_e_juku", word: "塾", furigana: "じゅく", romaji: "juku", meaning: "補習班", level: "N4", category: "learning_education",
    sentences: [{ ja: "学校の後は塾で勉強します。", furigana: "がっこうのあとはじゅくでべんきょうします。", en: "放學後在補習班讀書。" }] },
  { id: "v_e_yobikou", word: "予備校", furigana: "よびこう", romaji: "yobikou", meaning: "升學補習班 / 預備校", level: "N3", category: "learning_education",
    sentences: [{ ja: "大学に合格するために予備校に通います。", furigana: "だいがくにごうかくするためによびこうにかよいます。", en: "為了考上大學去上預備校。" }] },
  { id: "v_e_shougakukin", word: "奨学金", furigana: "しょうがくきん", romaji: "shougakukin", meaning: "獎學金 / 學貸", level: "N3", category: "learning_education",
    sentences: [{ ja: "奨学金をもらって大学へ行きます。", furigana: "しょうがくきんをもらってだいがくへいきます。", en: "領取獎學金去讀大學。" }] },
  { id: "v_e_saakuru", word: "サークル", furigana: "さーくる", romaji: "saakuru", meaning: "大學社團 (Circle)", level: "N3", category: "learning_education",
    sentences: [{ ja: "テニスのサークルに入りました。", furigana: "てにすのさーくるにはいりました。", en: "加入了網球社團。" }] },
  { id: "v_e_gakuensai", word: "学園祭", furigana: "がくえんさい", romaji: "gakuensai", meaning: "校慶 / 學園祭", level: "N3", category: "learning_education",
    sentences: [{ ja: "秋の学園祭で屋台を出します。", furigana: "あきのがくえんさいでやたいをだします。", en: "在秋天的學園祭擺攤。" }] },
  { id: "v_e_tani", word: "単位", furigana: "たんい", romaji: "tani", meaning: "學分", level: "N3", category: "learning_education",
    sentences: [{ ja: "卒業のために単位が足りません。", furigana: "そつぎょうのためにたんいがたりません。", en: "為了畢業學分不夠。" }] },
  { id: "v_e_kanningu", word: "カンニング", furigana: "かんにんぐ", romaji: "kanningu", meaning: "作弊", level: "N3", category: "learning_education",
    sentences: [{ ja: "テストでカンニングをしてはいけません。", furigana: "てすとでかんにんぐをしてはいけません。", en: "考試不能作弊。" }] },
  { id: "v_e_tetsuya", word: "徹夜", furigana: "てつや", romaji: "tetsuya", meaning: "熬夜通宵", level: "N3", category: "learning_education",
    sentences: [{ ja: "テストの前日は徹夜で勉強しました。", furigana: "てすとのぜんじつはてつやでべんきょうしました。", en: "考試前一天通宵讀書了。" }] },
  { id: "v_e_fudebako", word: "筆箱", furigana: "ふでばこ", romaji: "fudebako", meaning: "鉛筆盒", level: "N4", category: "learning_education",
    sentences: [{ ja: "筆箱の中に消しゴムが入っています。", furigana: "ふでばこのなかにけしごむはいっています。", en: "鉛筆盒裡面裝著橡皮擦。" }] },
  { id: "v_e_randoseru", word: "ランドセル", furigana: "らんどせる", romaji: "randoseru", meaning: "日本小學生書包", level: "N3", category: "learning_education",
    sentences: [{ ja: "小学生は赤いランドセルを背負います。", furigana: "しょうがくせいはあかいらんどせるをせおいます。", en: "小學生背著紅色的書包。" }] },
  { id: "v_e_ijime", word: "いじめ", furigana: "いじめ", romaji: "ijime", meaning: "霸凌", level: "N3", category: "learning_education",
    sentences: [{ ja: "学校でのいじめは大きな問題です。", furigana: "がっこうでのいじめはおおきなもんだいです。", en: "學校的霸凌是個大問題。" }] },
  { id: "v_e_futoukou", word: "不登校", furigana: "ふとうこう", romaji: "futoukou", meaning: "拒學 / 輟學", level: "N3", category: "learning_education",
    sentences: [{ ja: "不登校の子供をサポートします。", furigana: "ふとうこうのこどもをさぽーとします。", en: "支援拒學的兒童。" }] },
  { id: "v_e_hensachi", word: "偏差値", furigana: "へんさち", romaji: "hensachi", meaning: "偏差值 (升學考試的相對成績標準)", level: "N2", category: "learning_education",
    sentences: [{ ja: "この大学は偏差値が高いです。", furigana: "このだいがくはへんさちがたかいです。", en: "這所大學的偏差值很高。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt20.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 20 - School Life) to data_n5.js!');
