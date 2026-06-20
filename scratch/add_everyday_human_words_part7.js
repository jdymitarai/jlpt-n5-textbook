const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart7 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_mune", word: "胸", furigana: "むね", romaji: "mune", meaning: "胸部 / 胸膛", level: "N5", category: "body_physiology",
    sentences: [{ ja: "走った後、胸がドキドキします。", furigana: "はしったあと、むねがどきどきします。", en: "跑完步後，胸口噗通噗通跳。" }] },
  { id: "v_onaka", word: "お腹", furigana: "おなか", romaji: "onaka", meaning: "肚子", level: "N5", category: "body_physiology",
    sentences: [{ ja: "食べすぎてお腹が痛いです。", furigana: "たべすぎておなかがいたいです。", en: "吃太多肚子痛。" }] },
  { id: "v_senaka", word: "背中", furigana: "せなか", romaji: "senaka", meaning: "背部", level: "N5", category: "body_physiology",
    sentences: [{ ja: "孫が背中を流してくれました。", furigana: "まごがせなかをながしてくれました。", en: "孫子幫我搓背。" }] },
  { id: "v_koshi", word: "腰", furigana: "こし", romaji: "koshi", meaning: "腰", level: "N5", category: "body_physiology",
    sentences: [{ ja: "重い荷物を持って腰を痛めました。", furigana: "おもいにもつをもってこしをいためました。", en: "拿重物閃到了腰。" }] },
  { id: "v_kata", word: "肩", furigana: "かた", romaji: "kata", meaning: "肩膀", level: "N5", category: "body_physiology",
    sentences: [{ ja: "荷物を肩にかけます。", furigana: "にもつをかたにかけます。", en: "把行李掛在肩膀上。" }] },
  { id: "v_mabuta", word: "まぶた", furigana: "まぶた", romaji: "mabuta", meaning: "眼皮", level: "N5", category: "body_physiology",
    sentences: [{ ja: "眠くてまぶたが重いです。", furigana: "ねむくてまぶたがおもいです。", en: "太睏了眼皮很重。" }] },
  { id: "v_chi", word: "血", furigana: "ち", romaji: "chi", meaning: "血", level: "N5", category: "body_physiology",
    sentences: [{ ja: "鼻から血が出ました。", furigana: "はなからちがでました。", en: "鼻子流血了。" }] },
  { id: "v_inochi", word: "命", furigana: "いのち", romaji: "inochi", meaning: "生命", level: "N5", category: "body_physiology",
    sentences: [{ ja: "命はとても大切です。", furigana: "いのちはとてもたいせつです。", en: "生命是非常重要的。" }] },
  { id: "v_oshikko", word: "おしっこ", furigana: "おしっこ", romaji: "oshikko", meaning: "尿尿 / 小便", level: "N5", category: "body_physiology",
    sentences: [{ ja: "トイレでおしっこをします。", furigana: "といれでおしっこをします。", en: "在廁所尿尿。" }] },
  { id: "v_unchi", word: "うんち", furigana: "うんち", romaji: "unchi", meaning: "大便", level: "N5", category: "body_physiology",
    sentences: [{ ja: "犬のうんちを片付けます。", furigana: "いぬのうんちをかたづけます。", en: "清理狗的大便。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_seki", word: "咳", furigana: "せき", romaji: "seki", meaning: "咳嗽", level: "N5", category: "health_medical",
    sentences: [{ ja: "風邪で咳が止まりません。", furigana: "かぜでせきがとまりません。", en: "因為感冒咳嗽咳不停。" }] },
  { id: "v_netsu", word: "熱", furigana: "ねつ", romaji: "netsu", meaning: "發燒 / 熱度", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱があるので、今日は学校を休みます。", furigana: "ねつがあるので、きょうはがっこうをやすみます。", en: "因為發燒，今天向學校請假。" }] },
  { id: "v_kizuguchi", word: "傷口", furigana: "きずぐち", romaji: "kizuguchi", meaning: "傷口", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷口を水でよく洗ってください。", furigana: "きずぐちをみずでよくあらってください。", en: "請用水將傷口洗乾淨。" }] },
  { id: "v_naoru", word: "治る", furigana: "なおる", romaji: "naoru", meaning: "痊癒 / 復原", level: "N5", category: "health_medical",
    sentences: [{ ja: "薬を飲んだら、すぐに風邪が治りました。", furigana: "くすりをのんだら、すぐにかぜがなおりました。", en: "吃了藥之後，感冒馬上就痊癒了。" }] },
  { id: "v_teate", word: "手当", furigana: "てあて", romaji: "teate", meaning: "包紮 / 治療", level: "N4", category: "health_medical",
    sentences: [{ ja: "怪我の手当をします。", furigana: "けがのてあてをします。", en: "包紮傷口。" }] },
  { id: "v_kanbyou", word: "看病", furigana: "かんびょう", romaji: "kanbyou", meaning: "照顧病人 / 看病", level: "N4", category: "health_medical",
    sentences: [{ ja: "母が病気の妹を看病しています。", furigana: "ははがびょうきのいもうとをかんびょうしています。", en: "媽媽在照顧生病的妹妹。" }] },
  { id: "v_kenkou", word: "健康", furigana: "けんこう", romaji: "kenkou", meaning: "健康", level: "N5", category: "health_medical",
    sentences: [{ ja: "健康のために毎日歩いています。", furigana: "けんこうのためにまいにちあるいています。", en: "為了健康每天都在走路。" }] },
  { id: "v_byouki", word: "病気", furigana: "びょうき", romaji: "byouki", meaning: "生病 / 疾病", level: "N5", category: "health_medical",
    sentences: [{ ja: "病気になって、病院へ行きました。", furigana: "びょうきになって、びょういんへいきました。", en: "生病了去醫院。" }] },
  { id: "v_kusuri", word: "薬", furigana: "くすり", romaji: "kusuri", meaning: "藥", level: "N5", category: "health_medical",
    sentences: [{ ja: "食後にこの薬を飲んでください。", furigana: "しょくごにこのくすりをのんでください。", en: "請在飯後吃這個藥。" }] },
  { id: "v_isha", word: "医者", furigana: "いしゃ", romaji: "isha", meaning: "醫生", level: "N5", category: "health_medical",
    sentences: [{ ja: "私は将来、医者になりたいです。", furigana: "わたしはしょうらい、いしゃになりたいです。", en: "我將來想當醫生。" }] },
  { id: "v_byouin", word: "病院", furigana: "びょういん", romaji: "byouin", meaning: "醫院", level: "N5", category: "health_medical",
    sentences: [{ ja: "近くの病院へ行きます。", furigana: "ちかくのびょういんへいきます。", en: "去附近的醫院。" }] },
  { id: "v_haisha", word: "歯医者", furigana: "はいしゃ", romaji: "haisha", meaning: "牙醫", level: "N5", category: "health_medical",
    sentences: [{ ja: "歯が痛いので歯医者へ行きます。", furigana: "はがいたいのではいしゃへいきます。", en: "牙齒痛所以去看牙醫。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_warau", word: "笑う", furigana: "わらう", romaji: "warau", meaning: "笑", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼の話を聞いて、みんな笑いました。", furigana: "かれのはなしをきいて、みんなわらいました。", en: "聽了他的話，大家都笑了。" }] },
  { id: "v_naku", word: "泣く", furigana: "なく", romaji: "naku", meaning: "哭", level: "N5", category: "psychology_character",
    sentences: [{ ja: "赤ちゃんが大きな声で泣いています。", furigana: "あかちゃんがおおきなこえでないています。", en: "嬰兒正大聲哭泣著。" }] },
  { id: "v_okoru", word: "怒る", furigana: "おこる", romaji: "okoru", meaning: "生氣", level: "N5", category: "psychology_character",
    sentences: [{ ja: "約束を破って、彼は怒りました。", furigana: "やくそくをやぶって、かれはおこりました。", en: "因為打破了約定，他生氣了。" }] },
  { id: "v_odoroku", word: "驚く", furigana: "おどろく", romaji: "odoroku", meaning: "驚訝", level: "N4", category: "psychology_character",
    sentences: [{ ja: "突然のニュースに驚きました。", furigana: "とつぜんのにゅーすにおどろきました。", en: "對突然的新聞感到驚訝。" }] },
  { id: "v_yorokobu", word: "喜ぶ", furigana: "よろこぶ", romaji: "yorokobu", meaning: "高興 / 喜悅", level: "N4", category: "psychology_character",
    sentences: [{ ja: "プレゼントをあげたら、とても喜びました。", furigana: "ぷれぜんとをあげたら、とてもよろこびました。", en: "送了禮物之後，他非常高興。" }] },
  { id: "v_kanashimu", word: "悲しむ", furigana: "かなしむ", romaji: "kanashimu", meaning: "悲傷", level: "N4", category: "psychology_character",
    sentences: [{ ja: "ペットが死んで、とても悲しみました。", furigana: "ぺっとがしんで、とてもかなしみました。", en: "寵物死掉了，非常悲傷。" }] },
  { id: "v_kangaeru", word: "考える", furigana: "かんがえる", romaji: "kangaeru", meaning: "思考", level: "N4", category: "psychology_character",
    sentences: [{ ja: "将来のことについてよく考えます。", furigana: "しょうらいのことについてよくかんがえます。", en: "好好思考關於將來的事。" }] },
  { id: "v_oboeru", word: "覚える", furigana: "おぼえる", romaji: "oboeru", meaning: "記住 / 記得", level: "N5", category: "psychology_character",
    sentences: [{ ja: "新しい漢字を覚えます。", furigana: "あたらしいかんじをおぼえます。", en: "記住新的漢字。" }] },
  { id: "v_wasureru", word: "忘れる", furigana: "わすれる", romaji: "wasureru", meaning: "忘記", level: "N5", category: "psychology_character",
    sentences: [{ ja: "宿題を家に忘れました。", furigana: "しゅくだいをいえにわすれました。", en: "把作業忘在家裡了。" }] },
  { id: "v_kibun", word: "気分", furigana: "きぶん", romaji: "kibun", meaning: "心情", level: "N4", category: "psychology_character",
    sentences: [{ ja: "今日は天気が良くて気分がいいです。", furigana: "きょうはてんきがよくてきぶんがいいです。", en: "今天天氣很好，心情也很好。" }] },
  { id: "v_kimochi", word: "気持ち", furigana: "きもち", romaji: "kimochi", meaning: "心情 / 感覺", level: "N5", category: "psychology_character",
    sentences: [{ ja: "あなたの気持ちはよく分かります。", furigana: "あなたのきもちはよくわかります。", en: "我很了解你的心情。" }] },
  { id: "v_kanjou", word: "感情", furigana: "かんじょう", romaji: "kanjou", meaning: "感情 / 情緒", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼女は感情が顔に出やすいです。", furigana: "かのじょはかんじょうがかおにでやすいです。", en: "她的情緒很容易顯露在臉上。" }] },
  { id: "v_seikaku", word: "性格", furigana: "せいかく", romaji: "seikaku", meaning: "性格", level: "N4", category: "psychology_character",
    sentences: [{ ja: "二人は性格が全く違います。", furigana: "ふたりはせいかくがまったくちがいます。", en: "兩人性格完全不同。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart7.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 7) to data_n5.js!');
