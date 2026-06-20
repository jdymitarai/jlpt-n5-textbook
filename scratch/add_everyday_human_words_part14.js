const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart14 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_geppu", word: "げっぷ", furigana: "げっぷ", romaji: "geppu", meaning: "打飽嗝", level: "N3", category: "body_physiology",
    sentences: [{ ja: "ご飯を食べた後、げっぷが出ました。", furigana: "ごはんをたべたあと、げっぷがでました。", en: "吃完飯後打了個飽嗝。" }] },
  { id: "v_shakkuri", word: "しゃっくり", furigana: "しゃっくり", romaji: "shakkuri", meaning: "打嗝", level: "N3", category: "body_physiology",
    sentences: [{ ja: "水を飲んでもしゃっくりが止まりません。", furigana: "みずをのんでもしゃっくりがとまりません。", en: "喝了水打嗝也停不下來。" }] },
  { id: "v_onara", word: "おなら", furigana: "おなら", romaji: "onara", meaning: "放屁", level: "N3", category: "body_physiology",
    sentences: [{ ja: "おならの匂いがします。", furigana: "おならのにおいがします。", en: "聞到了放屁的味道。" }] },
  { id: "v_hada", word: "肌", furigana: "はだ", romaji: "hada", meaning: "肌膚", level: "N4", category: "body_physiology",
    sentences: [{ ja: "冬は肌が乾燥しやすいです。", furigana: "ふゆははだがかんそうしやすいです。", en: "冬天肌膚容易乾燥。" }] },
  { id: "v_kesshoku", word: "血色", furigana: "けっしょく", romaji: "kesshoku", meaning: "氣色 / 臉色", level: "N3", category: "body_physiology",
    sentences: [{ ja: "今日は顔の血色がいいですね。", furigana: "きょうはかおのけっしょくがいいですね。", en: "今天臉上的氣色很好呢。" }] },
  { id: "v_ikiwotomeru", word: "息を止める", furigana: "いきをとめる", romaji: "ikiwotomeru", meaning: "憋氣", level: "N4", category: "body_physiology",
    sentences: [{ ja: "水の中で１０秒間、息を止めました。", furigana: "みずのなかでじゅうびょうかん、いきをとめました。", en: "在水裡憋了十秒的氣。" }] },
  { id: "v_tsubawonomikomu", word: "つばを飲み込む", furigana: "つばをのみこむ", romaji: "tsubawonomikomu", meaning: "吞口水", level: "N4", category: "body_physiology",
    sentences: [{ ja: "緊張して、ごくりとつばを飲み込みました。", furigana: "きんちょうして、ごくりとつばをのみこみました。", en: "緊張得咕嚕一聲吞了口水。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_zutsuu", word: "頭痛", furigana: "ずつう", romaji: "zutsuu", meaning: "頭痛 (名詞)", level: "N4", category: "health_medical",
    sentences: [{ ja: "ひどい頭痛で会社を休みました。", furigana: "ひどいずつうでかいしゃをやすみました。", en: "因為嚴重的頭痛向公司請假了。" }] },
  { id: "v_fukutsuu", word: "腹痛", furigana: "ふくつう", romaji: "fukutsuu", meaning: "腹痛 (名詞)", level: "N3", category: "health_medical",
    sentences: [{ ja: "急な腹痛でトイレに走りました。", furigana: "きゅうなふくつうでといれにはしりました。", en: "因為突然的腹痛跑去廁所。" }] },
  { id: "v_hakike", word: "吐き気", furigana: "はきけ", romaji: "hakike", meaning: "噁心 / 想吐", level: "N3", category: "health_medical",
    sentences: [{ ja: "船に酔って吐き気がします。", furigana: "ふねによってはきけがします。", en: "暈船覺得噁心想吐。" }] },
  { id: "v_nemuke", word: "眠気", furigana: "ねむけ", romaji: "nemuke", meaning: "睡意", level: "N3", category: "health_medical",
    sentences: [{ ja: "コーヒーを飲んで眠気を覚まします。", furigana: "こーひーをのんでねむけをさまします。", en: "喝咖啡消除睡意。" }] },
  { id: "v_shiryoku", word: "視力", furigana: "しりょく", romaji: "shiryoku", meaning: "視力", level: "N3", category: "health_medical",
    sentences: [{ ja: "最近、目が悪くなって視力が落ちました。", furigana: "さいきん、めがわるくなってしりょくがおちました。", en: "最近眼睛變差，視力下降了。" }] },
  { id: "v_chouryoku", word: "聴力", furigana: "ちょうりょく", romaji: "chouryoku", meaning: "聽力", level: "N3", category: "health_medical",
    sentences: [{ ja: "おじいちゃんは聴力が弱くなりました。", furigana: "おじいちゃんはちょうりょくがよわくなりました。", en: "爺爺的聽力變弱了。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_jinsei", word: "人生", furigana: "じんせい", romaji: "jinsei", meaning: "人生", level: "N4", category: "psychology_character",
    sentences: [{ ja: "これは私の人生で一番の思い出です。", furigana: "これはわたしのじんせいでいちばんのおもいでです。", en: "這是我人生中最棒的回憶。" }] },
  { id: "v_unmei", word: "運命", furigana: "うんめい", romaji: "unmei", meaning: "命運", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼と出会ったのは運命だと思います。", furigana: "かれとであったのはうんめいだとおもいます。", en: "我覺得遇見他是命運的安排。" }] },
  { id: "v_koi", word: "恋", furigana: "こい", romaji: "koi", meaning: "戀愛", level: "N4", category: "psychology_character",
    sentences: [{ ja: "クラスメイトに恋をしています。", furigana: "くらすめいとにこいをしています。", en: "正在和同班同學戀愛。" }] },
  { id: "v_ai", word: "愛", furigana: "あい", romaji: "ai", meaning: "愛", level: "N4", category: "psychology_character",
    sentences: [{ ja: "親の愛はとても大きいです。", furigana: "おやのあいはとてもおおきいです。", en: "父母的愛是非常偉大的。" }] },
  { id: "v_aijou", word: "愛情", furigana: "あいじょう", romaji: "aijou", meaning: "愛情 / 感情", level: "N3", category: "psychology_character",
    sentences: [{ ja: "花に愛情を注いで育てます。", furigana: "はなにあいじょうをそそいでそだてます。", en: "傾注感情來培育花朵。" }] },
  { id: "v_yuujou", word: "友情", furigana: "ゆうじょう", romaji: "yuujou", meaning: "友情", level: "N3", category: "psychology_character",
    sentences: [{ ja: "二人の友情は永遠に変わりません。", furigana: "ふたりのゆうじょうはえいえんにかわりません。", en: "兩人的友情永遠不會改變。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart14.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 14) to data_n5.js!');
