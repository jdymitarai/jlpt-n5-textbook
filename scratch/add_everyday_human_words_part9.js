const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart9 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_nodo", word: "喉", furigana: "のど", romaji: "nodo", meaning: "喉嚨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "風邪をひいて喉が痛いです。", furigana: "かぜをひいてのどがいたいです。", en: "感冒了喉嚨很痛。" }] },
  { id: "v_ude", word: "腕", furigana: "うで", romaji: "ude", meaning: "手臂", level: "N5", category: "body_physiology",
    sentences: [{ ja: "重い荷物を持って腕が疲れました。", furigana: "おもいにもつをもってうでがつかれました。", en: "拿重物手臂很累。" }] },
  { id: "v_tsume", word: "爪", furigana: "つめ", romaji: "tsume", meaning: "指甲", level: "N5", category: "body_physiology",
    sentences: [{ ja: "爪を短く切ってください。", furigana: "つめをみじかくきってください。", en: "請把指甲剪短。" }] },
  { id: "v_tenohira", word: "手のひら", furigana: "てのひら", romaji: "tenohira", meaning: "手掌", level: "N4", category: "body_physiology",
    sentences: [{ ja: "手のひらに汗をかきました。", furigana: "てのひらにあせをかきました。", en: "手掌出汗了。" }] },
  { id: "v_i", word: "胃", furigana: "い", romaji: "i", meaning: "胃", level: "N4", category: "body_physiology",
    sentences: [{ ja: "ストレスで胃が痛いです。", furigana: "すとれすでいがいたいです。", en: "因為壓力導致胃痛。" }] },
  { id: "v_shinzou", word: "心臓", furigana: "しんぞう", romaji: "shinzou", meaning: "心臟", level: "N4", category: "body_physiology",
    sentences: [{ ja: "走ったので心臓がバクバクしています。", furigana: "はしったのでしんぞうがばくばくしています。", en: "因為跑步心臟撲通撲通跳。" }] },
  { id: "v_aji", word: "味", furigana: "あじ", romaji: "aji", meaning: "味道 / 味覺", level: "N5", category: "body_physiology",
    sentences: [{ ja: "このスープは少し味が薄いです。", furigana: "このすーぷはすこしあじがうすいです。", en: "這個湯味道有點淡。" }] },
  { id: "v_suu", word: "吸う", furigana: "すう", romaji: "suu", meaning: "吸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "森の中で新鮮な空気を吸います。", furigana: "もりのなかでしんせんなくうきをすいます。", en: "在森林裡呼吸新鮮空氣。" }] },
  { id: "v_nomikomu", word: "飲み込む", furigana: "のみこむ", romaji: "nomikomu", meaning: "吞嚥 / 嚥下", level: "N4", category: "body_physiology",
    sentences: [{ ja: "喉が痛くて食べ物を飲み込めません。", furigana: "のどがいたくてたべものをのみこめません。", en: "喉嚨痛到無法吞嚥食物。" }] },
  { id: "v_museru", word: "むせる", furigana: "むせる", romaji: "museru", meaning: "嗆到", level: "N4", category: "body_physiology",
    sentences: [{ ja: "お茶を急いで飲んでむせました。", furigana: "おちゃをいそいでのんでむせました。", en: "喝茶喝太急嗆到了。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_itai", word: "痛い", furigana: "いたい", romaji: "itai", meaning: "痛的", level: "N5", category: "health_medical",
    sentences: [{ ja: "昨日からお腹が痛いです。", furigana: "きのうからおなかがいたいです。", en: "從昨天開始肚子就痛。" }] },
  { id: "v_nigai", word: "苦い", furigana: "にがい", romaji: "nigai", meaning: "苦的", level: "N5", category: "health_medical",
    sentences: [{ ja: "この薬はとても苦いです。", furigana: "このくすりはとてもにがいです。", en: "這個藥非常苦。" }] },
  { id: "v_kimochiwarui", word: "気持ち悪い", furigana: "きもちわるい", romaji: "kimochiwarui", meaning: "覺得噁心 / 不舒服", level: "N4", category: "health_medical",
    sentences: [{ ja: "食べすぎて少し気持ち悪いです。", furigana: "たべすぎてすこしきもちわるいです。", en: "吃太多覺得有點噁心想吐。" }] },
  { id: "v_chuusha", word: "注射", furigana: "ちゅうしゃ", romaji: "chuusha", meaning: "打針 / 注射", level: "N4", category: "health_medical",
    sentences: [{ ja: "病院で注射を打ってもらいました。", furigana: "びょういんでちゅうしゃをうってもらいました。", en: "在醫院打了針。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_ureshii", word: "嬉しい", furigana: "うれしい", romaji: "ureshii", meaning: "開心的 / 高興的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "試験に合格してとても嬉しいです。", furigana: "しけんにごうかくしてとてもうれしいです。", en: "考試合格了非常開心。" }] },
  { id: "v_sabishii", word: "寂しい", furigana: "さびしい", romaji: "sabishii", meaning: "寂寞的 / 孤單的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "友達が引っ越してしまって寂しいです。", furigana: "ともだちがひっこしてしまってさびしいです。", en: "朋友搬走了覺得很寂寞。" }] },
  { id: "v_kowai", word: "怖い", furigana: "こわい", romaji: "kowai", meaning: "可怕的 / 害怕的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "私はお化けが怖いです。", furigana: "わたしはおばけがこわいです。", en: "我怕鬼。" }] },
  { id: "v_yasashii", word: "優しい", furigana: "やさしい", romaji: "yasashii", meaning: "溫柔的 / 親切的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "母はいつも優しく話します。", furigana: "はははいつもやさしくはなします。", en: "媽媽總是溫柔地說話。" }] },
  { id: "v_kibishii", word: "厳しい", furigana: "きびしい", romaji: "kibishii", meaning: "嚴格的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "あの先生は宿題にとても厳しいです。", furigana: "あのせんせいはしゅくだいにとてもきびしいです。", en: "那位老師對作業非常嚴格。" }] },
  { id: "v_majime", word: "真面目", furigana: "まじめ", romaji: "majime", meaning: "認真的 / 踏實的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼は真面目に仕事に取り組んでいます。", furigana: "かれはまじめにしごとにともくんでいます。", en: "他很認真地對待工作。" }] },
  { id: "v_mayou", word: "迷う", furigana: "まよう", romaji: "mayou", meaning: "猶豫 / 迷路", level: "N4", category: "psychology_character",
    sentences: [{ ja: "どちらを買うか迷っています。", furigana: "どちらをかうかまよっています。", en: "正在猶豫要買哪一個。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart9.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 9) to data_n5.js!');
