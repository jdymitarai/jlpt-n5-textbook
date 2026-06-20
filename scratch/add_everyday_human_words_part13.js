const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart13 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_kosuru", word: "こする", furigana: "こする", romaji: "kosuru", meaning: "揉 / 摩擦", level: "N3", category: "body_physiology",
    sentences: [{ ja: "眠くて目をこすりました。", furigana: "ねむくてめをこすりました。", en: "因為想睡覺而揉了揉眼睛。" }] },
  { id: "v_hikkaku", word: "ひっかく", furigana: "ひっかく", romaji: "hikkaku", meaning: "抓 / 搔", level: "N3", category: "body_physiology",
    sentences: [{ ja: "かゆいところを爪でひっかきます。", furigana: "かゆいところをつめでひっかきます。", en: "用指甲抓癢的地方。" }] },
  { id: "v_tsuneru", word: "つねる", furigana: "つねる", romaji: "tsuneru", meaning: "捏 / 掐", level: "N3", category: "body_physiology",
    sentences: [{ ja: "夢じゃないかと自分のほっぺたをつねりました。", furigana: "ゆめじゃないかとじぶんのほっぺたをつねりました。", en: "為了確認是不是夢而捏了自己的臉頰。" }] },
  { id: "v_shinkokyuu", word: "深呼吸", furigana: "しんこきゅう", romaji: "shinkokyuu", meaning: "深呼吸", level: "N4", category: "body_physiology",
    sentences: [{ ja: "緊張した時は深呼吸をしてください。", furigana: "きんちょうしたときはしんこきゅうをしてください。", en: "緊張的時候請深呼吸。" }] },
  { id: "v_tameiki", word: "ため息", furigana: "ためいき", romaji: "tameiki", meaning: "嘆氣", level: "N3", category: "body_physiology",
    sentences: [{ ja: "疲れて大きいため息をつきました。", furigana: "つかれておおきいためいきをつきました。", en: "太累了而嘆了一口大氣。" }] },
  { id: "v_agura", word: "あぐらをかく", furigana: "あぐらをかく", romaji: "agura", meaning: "盤腿坐", level: "N3", category: "body_physiology",
    sentences: [{ ja: "床にあぐらをかいて座ります。", furigana: "ゆかにおぐらをかいてすわります。", en: "在地上盤腿坐下。" }] },
  { id: "v_ninshin", word: "妊娠", furigana: "にんしん", romaji: "ninshin", meaning: "懷孕", level: "N3", category: "body_physiology",
    sentences: [{ ja: "姉は今、妊娠５ヶ月です。", furigana: "あねはいま、にんしんごかげつです。", en: "姐姐現在懷孕五個月。" }] },
  { id: "v_shussan", word: "出産", furigana: "しゅっさん", romaji: "shussan", meaning: "生產 / 分娩", level: "N3", category: "body_physiology",
    sentences: [{ ja: "無事に元気な赤ちゃんを出産しました。", furigana: "ぶじにげんきなあかちゃんをしゅっさんしました。", en: "平安順利地生下了健康的嬰兒。" }] },
  { id: "v_seiri", word: "生理", furigana: "せいり", romaji: "seiri", meaning: "生理期 / 月經", level: "N3", category: "body_physiology",
    sentences: [{ ja: "生理でお腹が痛いです。", furigana: "せいりでおなかがいたいです。", en: "因為生理期肚子痛。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_nikibi", word: "ニキビ", furigana: "にきび", romaji: "nikibi", meaning: "青春痘 / 痘痘", level: "N4", category: "health_medical",
    sentences: [{ ja: "顔に大きなニキビができました。", furigana: "かおおきなにきびができました。", en: "臉上長了一顆大痘痘。" }] },
  { id: "v_arerugi", word: "アレルギー", furigana: "あれるぎー", romaji: "arerugii", meaning: "過敏", level: "N4", category: "health_medical",
    sentences: [{ ja: "私は猫アレルギーです。", furigana: "わたしはねこあれるぎーです。", en: "我對貓過敏。" }] },
  { id: "v_mushiba", word: "虫歯", furigana: "むしば", romaji: "mushiba", meaning: "蛀牙", level: "N4", category: "health_medical",
    sentences: [{ ja: "甘いものを食べすぎて虫歯になりました。", furigana: "あまいものをたべすぎてむしばになりました。", en: "吃太多甜食導致蛀牙了。" }] },
  { id: "v_sutoresu", word: "ストレス", furigana: "すとれす", romaji: "sutoresu", meaning: "壓力 (精神上的)", level: "N4", category: "health_medical",
    sentences: [{ ja: "仕事のストレスで眠れません。", furigana: "しごとのすとれすでねむれません。", en: "因為工作的壓力睡不著。" }] },
  { id: "v_shouka", word: "消化", furigana: "しょうか", romaji: "shouka", meaning: "消化", level: "N3", category: "health_medical",
    sentences: [{ ja: "よく噛んで食べると消化にいいです。", furigana: "よくかんでたべるとしょうかにいいです。", en: "仔細咀嚼後再吃對消化比較好。" }] },
  { id: "v_eiyou", word: "栄養", furigana: "えいよう", romaji: "eiyou", meaning: "營養", level: "N3", category: "health_medical",
    sentences: [{ ja: "栄養のバランスを考えて食事を作ります。", furigana: "えいようのばらんすをかんがえてしょくじをつくります。", en: "考慮營養均衡來準備飯菜。" }] },
  { id: "v_karori", word: "カロリー", furigana: "かろりー", romaji: "karorii", meaning: "卡路里", level: "N4", category: "health_medical",
    sentences: [{ ja: "このケーキはカロリーが高いです。", furigana: "このけーきはかろりーがたかいです。", en: "這塊蛋糕的卡路里很高。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_mabushii", word: "まぶしい", furigana: "まぶしい", romaji: "mabushii", meaning: "刺眼的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "太陽の光がまぶしいです。", furigana: "たいようのひかりがまぶしいです。", en: "太陽光很刺眼。" }] },
  { id: "v_urusai", word: "うるさい", furigana: "うるさい", romaji: "urusai", meaning: "吵鬧的 / 煩人的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "外の工事の音がうるさいです。", furigana: "そとのこうじのおとがうるさいです。", en: "外面施工的聲音很吵。" }] },
  { id: "v_kusai", word: "臭い", furigana: "くさい", romaji: "kusai", meaning: "臭的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "このゴミはとても臭いです。", furigana: "このごみはとてもくさいです。", en: "這個垃圾非常臭。" }] },
  { id: "v_niou", word: "匂う", furigana: "におう", romaji: "niou", meaning: "發出味道 (好壞皆可)", level: "N3", category: "psychology_character",
    sentences: [{ ja: "台所からいい匂いがします。", furigana: "だいどころからいいにおいがします。", en: "廚房傳來了香味。" }] },
  { id: "v_ajiwau", word: "味わう", furigana: "あじわう", romaji: "ajiwau", meaning: "品嚐 / 體會", level: "N3", category: "psychology_character",
    sentences: [{ ja: "美味しい料理をゆっくり味わいます。", furigana: "おいしいりょうりをゆっくりあじわいます。", en: "慢慢品嚐美味的料理。" }] },
  { id: "v_kioku", word: "記憶", furigana: "きおく", romaji: "kioku", meaning: "記憶", level: "N3", category: "psychology_character",
    sentences: [{ ja: "子供の頃の記憶が少し残っています。", furigana: "こどものころのきおくがすこしのこっています。", en: "還保留著一些小時候的記憶。" }] },
  { id: "v_ishiki", word: "意識", furigana: "いしき", romaji: "ishiki", meaning: "意識", level: "N3", category: "psychology_character",
    sentences: [{ ja: "事故で一瞬意識を失いました。", furigana: "じこでいっしゅんいしきをうしないました。", en: "因為車禍瞬間失去了意識。" }] },
  { id: "v_kigamijikai", word: "気が短い", furigana: "きがみじかい", romaji: "kigamijikai", meaning: "性子急的 / 沒耐性的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼は気が短くて、すぐ怒ります。", furigana: "かれはきがみじかくて、すぐおこります。", en: "他性子很急，動不動就生氣。" }] },
  { id: "v_kiganagai", word: "気が長い", furigana: "きがながい", romaji: "kiganagai", meaning: "慢性子的 / 有耐心的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "彼女は気が長いので、ずっと待つことができます。", furigana: "かのじょはきがながいので、ずっとまつことができます。", en: "她很有耐心，所以可以一直等。" }] },
  { id: "v_kigaomoi", word: "気が重い", furigana: "きがおもい", romaji: "kigaomoi", meaning: "心情沉重的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "明日はテストがあるので気が重いです。", furigana: "あしたはてすとがあるのできがおもいです。", en: "明天有考試，覺得心情沉重。" }] },
  { id: "v_kigayowai", word: "気が弱い", furigana: "きがよわい", romaji: "kigayowai", meaning: "懦弱的 / 膽小的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "気が弱くて、自分の意見が言えません。", furigana: "きがよわくて、じぶんのいけんがいえません。", en: "個性懦弱，說不出自己的意見。" }] },
  { id: "v_kigatsuyoi", word: "気が強い", furigana: "きがつよい", romaji: "kigatsuyoi", meaning: "要強的 / 倔強的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "妹は気が強くて、絶対に泣きません。", furigana: "いもうとはきがつよくて、ぜったいになきません。", en: "妹妹個性很強，絕對不哭。" }] },
  { id: "v_namidamoroi", word: "涙もろい", furigana: "なみだもろい", romaji: "namidamoroi", meaning: "愛哭的 / 容易感動的", level: "N3", category: "psychology_character",
    sentences: [{ ja: "母は涙もろくて、映画を見てすぐ泣きます。", furigana: "はははなみだもろくて、えいがをみてすぐなきます。", en: "媽媽很容易感動，看電影馬上就哭了。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart13.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 13) to data_n5.js!');
