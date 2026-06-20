const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart8 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_karada", word: "体", furigana: "からだ", romaji: "karada", meaning: "身體", level: "N5", category: "body_physiology",
    sentences: [{ ja: "運動すると体が温かくなります。", furigana: "うんどうするとからだがあたたかくなります。", en: "運動後身體會變暖和。" }] },
  { id: "v_atama", word: "頭", furigana: "あたま", romaji: "atama", meaning: "頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "考えすぎて頭が痛いです。", furigana: "かんがえすぎてあたまがいたいです。", en: "想太多頭很痛。" }] },
  { id: "v_kao", word: "顔", furigana: "かお", romaji: "kao", meaning: "臉", level: "N5", category: "body_physiology",
    sentences: [{ ja: "朝起きて、水で顔を洗います。", furigana: "あさおきて、みずでかおをあらいます。", en: "早上起床用水洗臉。" }] },
  { id: "v_me", word: "目", furigana: "め", romaji: "me", meaning: "眼睛", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼女の目はとても大きくてきれいです。", furigana: "かのじょのめはとてもおおきくてきれいです。", en: "她的眼睛很大很漂亮。" }] },
  { id: "v_hana", word: "鼻", furigana: "はな", romaji: "hana", meaning: "鼻子", level: "N5", category: "body_physiology",
    sentences: [{ ja: "花粉症で鼻がムズムズします。", furigana: "かふんしょうではながむずむずします。", en: "因為花粉症鼻子發癢。" }] },
  { id: "v_kuchi", word: "口", furigana: "くち", romaji: "kuchi", meaning: "嘴巴", level: "N5", category: "body_physiology",
    sentences: [{ ja: "大きく口を開けてください。", furigana: "おおきくくちをあけてください。", en: "請張大嘴巴。" }] },
  { id: "v_ha", word: "歯", furigana: "は", romaji: "ha", meaning: "牙齒", level: "N5", category: "body_physiology",
    sentences: [{ ja: "毎日３回、歯を磨きます。", furigana: "まいにちさんかい、はをみがきます。", en: "每天刷三次牙。" }] },
  { id: "v_mimi", word: "耳", furigana: "みみ", romaji: "mimi", meaning: "耳朵", level: "N5", category: "body_physiology",
    sentences: [{ ja: "変な音が耳に入ってきました。", furigana: "へんなおとがみみにはいってきました。", en: "奇怪的聲音傳進了耳朵。" }] },
  { id: "v_te", word: "手", furigana: "て", romaji: "te", meaning: "手", level: "N5", category: "body_physiology",
    sentences: [{ ja: "手を繋いで一緒に歩きましょう。", furigana: "てをつないでいっしょにあるきましょう。", en: "牽著手一起走吧。" }] },
  { id: "v_ashi", word: "足", furigana: "あし", romaji: "ashi", meaning: "腳", level: "N5", category: "body_physiology",
    sentences: [{ ja: "たくさん歩いたので足が疲れました。", furigana: "たくさんあるいたのであしがつかれました。", en: "走了很多路腳很累。" }] },
  { id: "v_kami", word: "髪", furigana: "かみ", romaji: "kami", meaning: "頭髮", level: "N5", category: "body_physiology",
    sentences: [{ ja: "風で髪が乱れました。", furigana: "かぜでかみがみだれました。", en: "風把頭髮吹亂了。" }] },
  { id: "v_yubi", word: "指", furigana: "ゆび", romaji: "yubi", meaning: "手指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "指でボタンを押してください。", furigana: "ゆびでぼたんをおしてください。", en: "請用手指按按鈕。" }] },
  { id: "v_hara", word: "腹", furigana: "はら", romaji: "hara", meaning: "肚子 / 腹部", level: "N5", category: "body_physiology",
    sentences: [{ ja: "腹が減っては戦ができぬ。", furigana: "はらがへってはいくさができぬ。", en: "肚子餓了就無法打仗（餓著肚子做不成事）。" }] },
  { id: "v_aruku", word: "歩く", furigana: "あるく", romaji: "aruku", meaning: "走路", level: "N5", category: "body_physiology",
    sentences: [{ ja: "公園の中をゆっくり歩きます。", furigana: "こうえんのなかをゆっくりあるきます。", en: "在公園裡慢慢地走路。" }] },
  { id: "v_hashiru", word: "走る", furigana: "はしる", romaji: "hashiru", meaning: "跑步", level: "N5", category: "body_physiology",
    sentences: [{ ja: "遅刻しそうなので駅まで走りました。", furigana: "ちこくしそうなのでえきまで走りました。", en: "快遲到了所以跑步去車站。" }] },
  { id: "v_tatsu", word: "立つ", furigana: "たつ", romaji: "tatsu", meaning: "站立", level: "N5", category: "body_physiology",
    sentences: [{ ja: "名前を呼ばれたら立ってください。", furigana: "なまえをよばれたらたってください。", en: "被叫到名字的話請站起來。" }] },
  { id: "v_suwaru", word: "座る", furigana: "すわる", romaji: "suwaru", meaning: "坐下", level: "N5", category: "body_physiology",
    sentences: [{ ja: "どうぞ、こちらの椅子に座ってください。", furigana: "どうぞ、こちらのいすにすわってください。", en: "請坐這張椅子。" }] },
  { id: "v_neru", word: "寝る", furigana: "ねる", romaji: "neru", meaning: "睡覺", level: "N5", category: "body_physiology",
    sentences: [{ ja: "疲れたので今日は早く寝ます。", furigana: "つかれたのできょうははやくねます。", en: "累了所以今天早點睡。" }] },
  { id: "v_okiru", word: "起きる", furigana: "おきる", romaji: "okiru", meaning: "起床", level: "N5", category: "body_physiology",
    sentences: [{ ja: "毎朝６時に起きます。", furigana: "まいあさろくじにおきます。", en: "每天早上六點起床。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart8.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 8) to data_n5.js!');
