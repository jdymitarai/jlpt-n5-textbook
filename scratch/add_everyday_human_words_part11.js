const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart11 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_shinchou", word: "身長", furigana: "しんちょう", romaji: "shinchou", meaning: "身高", level: "N4", category: "body_physiology",
    sentences: [{ ja: "中学生になって身長が伸びました。", furigana: "ちゅうがくせいになってしんちょうがのびました。", en: "上了國中之後身高變高了。" }] },
  { id: "v_taijuu", word: "体重", furigana: "たいじゅう", romaji: "taijuu", meaning: "體重", level: "N4", category: "body_physiology",
    sentences: [{ ja: "最近、体重が増えてしまいました。", furigana: "さいきん、たいじゅうがふえてしまいました。", en: "最近體重增加了。" }] },
  { id: "v_mitame", word: "見た目", furigana: "みため", romaji: "mitame", meaning: "外表 / 外觀", level: "N3", category: "body_physiology",
    sentences: [{ ja: "人は見た目だけでは分かりません。", furigana: "ひとはみためだけではわかりません。", en: "人不能只看外表。" }] },
  { id: "v_sugata", word: "姿", furigana: "すがた", romaji: "sugata", meaning: "身影 / 姿態", level: "N4", category: "body_physiology",
    sentences: [{ ja: "遠くに彼の姿が見えました。", furigana: "とおくにかれのすがたがみえました。", en: "在遠處看到了他的身影。" }] },
  { id: "v_furikaeru", word: "振り返る", furigana: "ふりかえる", romaji: "furikaeru", meaning: "回頭看", level: "N3", category: "body_physiology",
    sentences: [{ ja: "名前を呼ばれて振り返りました。", furigana: "なまえをよばれてふりかえりました。", en: "被叫到名字所以回頭看。" }] },
  { id: "v_mitsumeru", word: "見つめる", furigana: "みつめる", romaji: "mitsumeru", meaning: "凝視", level: "N3", category: "body_physiology",
    sentences: [{ ja: "彼女は私の目をじっと見つめました。", furigana: "かのじょはわたしのめをじっとみつめました。", en: "她直直地凝視著我的眼睛。" }] },
  { id: "v_yubisasu", word: "指差す", furigana: "ゆびさす", romaji: "yubisasu", meaning: "用手指著", level: "N4", category: "body_physiology",
    sentences: [{ ja: "人を指差すのは失礼です。", furigana: "ひとをゆびさすのはしつれいです。", en: "用手指著別人是很沒禮貌的。" }] },
  { id: "v_nigiru", word: "握る", furigana: "にぎる", romaji: "nigiru", meaning: "握住", level: "N4", category: "body_physiology",
    sentences: [{ ja: "子供は母親の手を強く握りました。", furigana: "こどもはははおやのてをつよくにぎりました。", en: "小孩緊緊握住母親的手。" }] },
  { id: "v_tsukamu", word: "つかむ", furigana: "つかむ", romaji: "tsukamu", meaning: "抓住", level: "N4", category: "body_physiology",
    sentences: [{ ja: "電車の中で吊り革をつかみます。", furigana: "でんしゃのなかでつりかわをつかみます。", en: "在電車裡抓住吊環。" }] },
  { id: "v_ikiwohaku", word: "息を吐く", furigana: "いきをはく", romaji: "ikiwohaku", meaning: "吐氣", level: "N4", category: "body_physiology",
    sentences: [{ ja: "ゆっくり息を吐いてください。", furigana: "ゆっくりいきをはいてください。", en: "請慢慢吐氣。" }] },
  { id: "v_nobiru", word: "伸びる", furigana: "のびる", romaji: "nobiru", meaning: "長長 / 伸展", level: "N4", category: "body_physiology",
    sentences: [{ ja: "髪がずいぶん伸びましたね。", furigana: "かみがずいぶんのびましたね。", en: "頭髮長長了許多呢。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_samuke", word: "寒気", furigana: "さむけ", romaji: "samuke", meaning: "發冷 / 畏寒", level: "N4", category: "health_medical",
    sentences: [{ ja: "風邪をひいたのか、寒気がします。", furigana: "かぜをひいたのか、さむけがします。", en: "可能是感冒了，覺得有點發冷。" }] },
  { id: "v_memai", word: "めまい", furigana: "めまい", romaji: "memai", meaning: "頭暈", level: "N4", category: "health_medical",
    sentences: [{ ja: "急に立ち上がるとめまいがします。", furigana: "きゅうにたちあがるとめまいがします。", en: "突然站起來會頭暈。" }] },
  { id: "v_geri", word: "下痢", furigana: "げり", romaji: "geri", meaning: "拉肚子 / 腹瀉", level: "N4", category: "health_medical",
    sentences: [{ ja: "冷たいものを飲みすぎて下痢をしました。", furigana: "つめたいものをのみすぎてげりをしました。", en: "喝太多冷飲拉肚子了。" }] },
  { id: "v_benpi", word: "便秘", furigana: "べんぴ", romaji: "benpi", meaning: "便秘", level: "N4", category: "health_medical",
    sentences: [{ ja: "野菜をたくさん食べて便秘を治します。", furigana: "やさいをたくさんたべてべんぴをなおします。", en: "多吃蔬菜治療便秘。" }] },
  { id: "v_hanamizu", word: "鼻水", furigana: "はなみず", romaji: "hanamizu", meaning: "鼻水", level: "N5", category: "health_medical",
    sentences: [{ ja: "ティッシュで鼻水をかみます。", furigana: "てぃっしゅではなみずをかみます。", en: "用衛生紙擤鼻涕。" }] },
  { id: "v_hanazumari", word: "鼻づまり", furigana: "はなづまり", romaji: "hanazumari", meaning: "鼻塞", level: "N4", category: "health_medical",
    sentences: [{ ja: "鼻づまりで夜よく眠れませんでした。", furigana: "はなづまりでよるよくねむれませんでした。", en: "因為鼻塞晚上沒睡好。" }] },
  { id: "v_utsuru", word: "うつる", furigana: "うつる", romaji: "utsuru", meaning: "傳染", level: "N4", category: "health_medical",
    sentences: [{ ja: "家族の風邪が私にうつりました。", furigana: "かぞくのかぜがわたしにうつりました。", en: "家人的感冒傳染給我了。" }] },
  { id: "v_hokenshou", word: "保険証", furigana: "ほけんしょう", romaji: "hokenshou", meaning: "健康保險卡", level: "N5", category: "health_medical",
    sentences: [{ ja: "病院へ行く時は保険証が必要です。", furigana: "びょういんへいくときはほけんしょうがひつようです。", en: "去醫院的時候需要健保卡。" }] },
  { id: "v_shinsatsu", word: "診察", furigana: "しんさつ", romaji: "shinsatsu", meaning: "看診 / 診察", level: "N4", category: "health_medical",
    sentences: [{ ja: "医者の診察を受けます。", furigana: "いしゃのしんさつをうけます。", en: "接受醫生的看診。" }] },
  { id: "v_shohousen", word: "処方箋", furigana: "しょほうせん", romaji: "shohousen", meaning: "處方籤", level: "N3", category: "health_medical",
    sentences: [{ ja: "病院で薬の処方箋をもらいました。", furigana: "びょういんでくすりのしょほうせんをもらいました。", en: "在醫院拿到了藥的處方籤。" }] },
  { id: "v_machiaishitsu", word: "待合室", furigana: "まちあいしつ", romaji: "machiaishitsu", meaning: "候診室 / 等候室", level: "N4", category: "health_medical",
    sentences: [{ ja: "待合室で名前が呼ばれるのを待ちます。", furigana: "まちあいしつでなまえがよばれるのをまちます。", en: "在候診室等著被叫名字。" }] },
  { id: "v_rentogen", word: "レントゲン", furigana: "れんとげん", romaji: "rentogen", meaning: "X光", level: "N4", category: "health_medical",
    sentences: [{ ja: "胸のレントゲンを撮ります。", furigana: "むねのれんとげんをとります。", en: "照胸部X光。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_omoiyari", word: "思いやり", furigana: "おもいやり", romaji: "omoiyari", meaning: "體貼 / 關懷", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼女は他人への思いやりがあります。", furigana: "かのじょはたにんへのおもいやりがあります。", en: "她對他人很體貼。" }] },
  { id: "v_sunao", word: "素直", furigana: "すなお", romaji: "sunao", meaning: "坦率的 / 聽話的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "素直に自分の気持ちを伝えます。", furigana: "すなおにじぶんのきもちをつたえます。", en: "坦率地表達自己的心情。" }] },
  { id: "v_ganko", word: "頑固", furigana: "がんこ", romaji: "ganko", meaning: "頑固的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "祖父はとても頑固な性格です。", furigana: "そふはとてもがんこなせいかくです。", en: "祖父的性格非常頑固。" }] },
  { id: "v_wagamama", word: "わがまま", furigana: "わがまま", romaji: "wagamama", meaning: "任性的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "あまりわがままを言わないでください。", furigana: "あまりわがままをいわないでください。", en: "請不要太任性。" }] },
  { id: "v_ijiwaru", word: "意地悪", furigana: "いじわる", romaji: "ijiwaru", meaning: "壞心眼的 / 愛欺負人的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "弟に意地悪をしてはいけません。", furigana: "おとうとにいじわるをしてはいけません。", en: "不可以欺負弟弟。" }] },
  { id: "v_darashinai", word: "だらしない", furigana: "だらしない", romaji: "darashinai", meaning: "散漫的 / 邋遢的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "服が汚れていて、だらしない格好です。", furigana: "ふくがよごれていて、だらしないかっこうです。", en: "衣服髒髒的，打扮得很邋遢。" }] },
  { id: "v_tanki", word: "短気", furigana: "たんき", romaji: "tanki", meaning: "急躁的 / 沒耐性的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼は短気で、すぐに怒ります。", furigana: "かれはたんきで、すぐにおこります。", en: "他很急躁，動不動就生氣。" }] },
  { id: "v_nonki", word: "呑気", furigana: "のんき", romaji: "nonki", meaning: "悠哉的 / 漫不經心的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "試験の前なのに、呑気にテレビを見ています。", furigana: "しけんのまえなのに、のんきにてれびをみています。", en: "明明要考試了，卻還在悠哉地看電視。" }] },
  { id: "v_sekkyokuteki", word: "積極的", furigana: "せっきょくてき", romaji: "sekkyokuteki", meaning: "積極的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "会議で積極的に意見を言います。", furigana: "かいぎでせっきょくてきにいけんをいいます。", en: "在會議上積極地發表意見。" }] },
  { id: "v_shoukyokuteki", word: "消極的", furigana: "しょうきょくてき", romaji: "shoukyokuteki", meaning: "消極的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼はいつも消極的な態度です。", furigana: "かれはいつもしょうきょくてきなたいどです。", en: "他總是態度消極。" }] },
  { id: "v_ochitsuku", word: "落ち着く", furigana: "おちつく", romaji: "ochitsuku", meaning: "冷靜下來 / 安心", level: "N4", category: "psychology_character",
    sentences: [{ ja: "深呼吸をして落ち着いてください。", furigana: "しんこきゅうをしておちついてください。", en: "請深呼吸冷靜下來。" }] },
  { id: "v_taikutsu", word: "退屈", furigana: "たいくつ", romaji: "taikutsu", meaning: "無聊 / 悶", level: "N4", category: "psychology_character",
    sentences: [{ ja: "日曜日なのに何もすることがなくて退屈です。", furigana: "にちようびなのになにもすることがなくてたいくつです。", en: "明明是星期天卻無事可做，很無聊。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart11.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 11) to data_n5.js!');
