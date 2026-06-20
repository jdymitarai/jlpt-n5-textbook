const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart12 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_shibireru", word: "しびれる", furigana: "しびれる", romaji: "shibireru", meaning: "發麻", level: "N3", category: "body_physiology",
    sentences: [{ ja: "正座をしていたので、足がしびれました。", furigana: "せいざをしていたので、あしがしびれました。", en: "因為跪坐，所以腳麻了。" }] },
  { id: "v_tsuru", word: "つる", furigana: "つる", romaji: "tsuru", meaning: "抽筋", level: "N3", category: "body_physiology",
    sentences: [{ ja: "泳いでいる時に足がつりました。", furigana: "およいでいるときにあしがつりました。", en: "游泳的時候腳抽筋了。" }] },
  { id: "v_mukumu", word: "むくむ", furigana: "むくむ", romaji: "mukumu", meaning: "水腫 / 浮腫", level: "N3", category: "body_physiology",
    sentences: [{ ja: "ずっと立っていたので、足がむくんでいます。", furigana: "ずっとたっていたので、あしがむくんでいます。", en: "因為一直站著，所以腳水腫了。" }] },
  { id: "v_furueru", word: "震える", furigana: "ふるえる", romaji: "furueru", meaning: "發抖 / 顫抖", level: "N4", category: "body_physiology",
    sentences: [{ ja: "寒くて体がガタガタ震えます。", furigana: "さむくてからだががたがたふるえます。", en: "冷得身體直發抖。" }] },
  { id: "v_torihada", word: "鳥肌", furigana: "とりはだ", romaji: "torihada", meaning: "雞皮疙瘩", level: "N3", category: "body_physiology",
    sentences: [{ ja: "怖い話を聞いて鳥肌が立ちました。", furigana: "こわいはなしをきいてとりはだがたちました。", en: "聽了恐怖的故事起了雞皮疙瘩。" }] },
  { id: "v_yodare", word: "よだれ", furigana: "よだれ", romaji: "yodare", meaning: "口水 (流出的)", level: "N3", category: "body_physiology",
    sentences: [{ ja: "赤ちゃんがよだれを垂らしています。", furigana: "あかちゃんがよだれをたらしています。", en: "嬰兒正流著口水。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_kinnikutsuu", word: "筋肉痛", furigana: "きんにくつう", romaji: "kinnikutsuu", meaning: "肌肉痠痛", level: "N4", category: "health_medical",
    sentences: [{ ja: "昨日運動したので、今日は筋肉痛です。", furigana: "きのううんどうしたので、きょうはきんにくつうです。", en: "昨天做了運動，所以今天肌肉痠痛。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_kenka", word: "喧嘩", furigana: "けんか", romaji: "kenka", meaning: "吵架 / 打架", level: "N5", category: "psychology_character",
    sentences: [{ ja: "弟とゲームのことで喧嘩しました。", furigana: "おとうととげーむのことでけんかしました。", en: "因為遊戲的事情和弟弟吵架了。" }] },
  { id: "v_nakanaori", word: "仲直り", furigana: "なかなおり", romaji: "nakanaori", meaning: "和好", level: "N4", category: "psychology_character",
    sentences: [{ ja: "ごめんなさいと謝って、友達と仲直りしました。", furigana: "ごめんなさいとあやまって、ともだちとなかなおりしました。", en: "說了對不起道歉後，和朋友和好了。" }] },
  { id: "v_homeru", word: "褒める", furigana: "ほめる", romaji: "homeru", meaning: "稱讚 / 誇獎", level: "N4", category: "psychology_character",
    sentences: [{ ja: "テストで100点をとって、先生に褒められました。", furigana: "てすとでひゃくてんをとって、せんせいにほめられました。", en: "考試考了100分，被老師稱讚了。" }] },
  { id: "v_shikaru", word: "叱る", furigana: "しかる", romaji: "shikaru", meaning: "責罵", level: "N4", category: "psychology_character",
    sentences: [{ ja: "嘘をついたので、母に叱られました。", furigana: "うそをついたので、ははにしかられました。", en: "因為說謊，被媽媽罵了。" }] },
  { id: "v_donaru", word: "怒鳴る", furigana: "どなる", romaji: "donaru", meaning: "大聲斥責 / 怒吼", level: "N3", category: "psychology_character",
    sentences: [{ ja: "お父さんが大きな声で怒鳴りました。", furigana: "おとうさんがおおきなこえでどなりました。", en: "爸爸大聲怒吼了。" }] },
  { id: "v_nagusameru", word: "慰める", furigana: "なぐさめる", romaji: "nagusameru", meaning: "安慰", level: "N3", category: "psychology_character",
    sentences: [{ ja: "泣いている友達を慰めました。", furigana: "ないているともだちをなぐさめました。", en: "安慰了正在哭泣的朋友。" }] },
  { id: "v_hagemasu", word: "励ます", furigana: "はげます", romaji: "hagemasu", meaning: "鼓勵", level: "N3", category: "psychology_character",
    sentences: [{ ja: "落ち込んでいる彼女を励ましました。", furigana: "おちこんでいるかのじょをはげましました。", en: "鼓勵了很沮喪的她。" }] },
  { id: "v_hohoemu", word: "微笑む", furigana: "ほほえむ", romaji: "hohoemu", meaning: "微笑", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼女は優しく微笑みました。", furigana: "かのじょはやさしくほほえみました。", en: "她溫柔地微笑了。" }] },
  { id: "v_shitto", word: "嫉妬", furigana: "しっと", romaji: "shitto", meaning: "嫉妒", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼の成功に少し嫉妬しました。", furigana: "かれのせいこうにすこししっとしました。", en: "對他的成功稍微有些嫉妒。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart12.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 12) to data_n5.js!');
