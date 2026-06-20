const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart2 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_kaminoke", word: "髪の毛", furigana: "かみのけ", romaji: "kaminoke", meaning: "頭髮", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼女は髪の毛が長くてきれいです。", furigana: "かのじょはかみのけがながくてきれいです。", en: "她的頭髮很長很漂亮。" }] },
  { id: "v_hitai", word: "額", furigana: "ひたい", romaji: "hitai", meaning: "額頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "熱があるかどうか、額に手を当てます。", furigana: "ねつがあるかどうか、ひたいてをあてます。", en: "把手放在額頭上看有沒有發燒。" }] },
  { id: "v_hoppeta", word: "ほっぺた", furigana: "ほっぺた", romaji: "hoppeta", meaning: "臉頰", level: "N5", category: "body_physiology",
    sentences: [{ ja: "寒くてほっぺたが赤くなりました。", furigana: "さむくてほっぺたがあかくなりました。", en: "因為太冷臉頰變紅了。" }] },
  { id: "v_ago", word: "あご", furigana: "あご", romaji: "ago", meaning: "下巴", level: "N5", category: "body_physiology",
    sentences: [{ ja: "転んであごを打ちました。", furigana: "ころんであごをうちました。", en: "跌倒撞到了下巴。" }] },
  { id: "v_matsuge", word: "まつげ", furigana: "まつげ", romaji: "matsuge", meaning: "睫毛", level: "N5", category: "body_physiology",
    sentences: [{ ja: "目にまつげが入って痛いです。", furigana: "めにまつげはいっていたいです。", en: "睫毛跑進眼睛裡很痛。" }] },
  { id: "v_shita", word: "舌", furigana: "した", romaji: "shita", meaning: "舌頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "熱いお茶を飲んで舌をやけどしました。", furigana: "あついおちゃをのんでしたをやけどしました。", en: "喝了熱茶燙到了舌頭。" }] },
  { id: "v_hiji", word: "肘", furigana: "ひじ", romaji: "hiji", meaning: "手肘", level: "N5", category: "body_physiology",
    sentences: [{ ja: "机に肘をついてはいけません。", furigana: "つくえにひじをついてはいけません。", en: "不可以把手肘撐在桌子上。" }] },
  { id: "v_hiza", word: "膝", furigana: "ひざ", romaji: "hiza", meaning: "膝蓋", level: "N5", category: "body_physiology",
    sentences: [{ ja: "おばあさんは膝が痛くて歩けません。", furigana: "おばあさんはひざがいたくてあるけません。", en: "奶奶膝蓋痛沒辦法走路。" }] },
  { id: "v_kakato", word: "かかと", furigana: "かかと", romaji: "kakato", meaning: "腳跟", level: "N5", category: "body_physiology",
    sentences: [{ ja: "靴が合わなくてかかとが痛いです。", furigana: "くつがあわなくてかかとがいたいです。", en: "鞋子不合腳導致腳跟痛。" }] },
  { id: "v_onakagasuku", word: "お腹が空く", furigana: "おなかがすく", romaji: "onakagasuku", meaning: "肚子餓", level: "N5", category: "body_physiology",
    sentences: [{ ja: "朝ごはんを食べていないので、お腹が空きました。", furigana: "あさごはんをたべていないので、おなかがすきました。", en: "因為沒吃早餐，所以肚子餓了。" }] },
  { id: "v_nodogakawaku", word: "喉が渇く", furigana: "のどがかわく", romaji: "nodogakawaku", meaning: "口渴", level: "N5", category: "body_physiology",
    sentences: [{ ja: "たくさん走ったので、喉が渇きました。", furigana: "たくさんはしったので、のどがかわきました。", en: "跑了很多路，所以口渴了。" }] },
  { id: "v_megasameru", word: "目が覚める", furigana: "めがさめる", romaji: "megasameru", meaning: "醒來", level: "N5", category: "body_physiology",
    sentences: [{ ja: "今朝は６時に目が覚めました。", furigana: "けさはろくじにめがさめました。", en: "今天早上六點就醒了。" }] },
  { id: "v_ibiki", word: "いびき", furigana: "いびき", romaji: "ibiki", meaning: "打呼", level: "N5", category: "body_physiology",
    sentences: [{ ja: "父はいびきがとてもうるさいです。", furigana: "ちちはいびきがとてもうるさいです。", en: "爸爸打呼非常吵。" }] },
  { id: "v_negoto", word: "寝言", furigana: "ねごと", romaji: "negoto", meaning: "夢話", level: "N5", category: "body_physiology",
    sentences: [{ ja: "弟が寝言を言っています。", furigana: "おとうとがねごとをいっています。", en: "弟弟在說夢話。" }] },
  { id: "v_ikiru", word: "生きる", furigana: "いきる", romaji: "ikiru", meaning: "生存 / 活著", level: "N5", category: "body_physiology",
    sentences: [{ ja: "水なしでは生きられません。", furigana: "みずなしではいきられません。", en: "沒有水就活不下去。" }] },
  { id: "v_umareru", word: "生まれる", furigana: "うまれる", romaji: "umareru", meaning: "出生", level: "N5", category: "body_physiology",
    sentences: [{ ja: "先月、元気な赤ちゃんが生まれました。", furigana: "せんげつ、げんきなあかちゃんがうまれました。", en: "上個月，一個健康的寶寶出生了。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_darui", word: "だるい", furigana: "だるい", romaji: "darui", meaning: "倦怠的 / 無力的", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱があって体がだるいです。", furigana: "ねつがあってからだがだるいです。", en: "發燒所以身體很倦怠。" }] },
  { id: "v_memai", word: "めまい", furigana: "めまい", romaji: "memai", meaning: "暈眩", level: "N5", category: "health_medical",
    sentences: [{ ja: "急に立ち上がったらめまいがしました。", furigana: "きゅうにたちあがったらめまいがしました。", en: "突然站起來就感到暈眩。" }] },
  { id: "v_samuke", word: "寒気", furigana: "さむけ", romaji: "samuke", meaning: "畏寒 / 發冷", level: "N5", category: "health_medical",
    sentences: [{ ja: "寒気がするので、風邪かもしれません。", furigana: "さむけがするので、かぜかもしれません。", en: "覺得會冷，可能是感冒了。" }] },
  { id: "v_hanamizu", word: "鼻水", furigana: "はなみず", romaji: "hanamizu", meaning: "鼻水", level: "N5", category: "health_medical",
    sentences: [{ ja: "風邪をひいて鼻水が止まりません。", furigana: "かぜをひいてはなみずがとまりません。", en: "感冒了鼻水流不停。" }] },
  { id: "v_hanadzumari", word: "鼻づまり", furigana: "はなづまり", romaji: "hanadzumari", meaning: "鼻塞", level: "N5", category: "health_medical",
    sentences: [{ ja: "鼻づまりで夜よく眠れませんでした。", furigana: "はなづまりでよるよくねむれませんでした。", en: "因為鼻塞晚上沒睡好。" }] },
  { id: "v_hakike", word: "吐き気", furigana: "はきけ", romaji: "hakike", meaning: "噁心 / 想吐", level: "N5", category: "health_medical",
    sentences: [{ ja: "船に酔って吐き気がします。", furigana: "ふねによってはきけがします。", en: "暈船覺得很噁心想吐。" }] },
  { id: "v_netchuushou", word: "熱中症", furigana: "ねっちゅうしょう", romaji: "netchuushou", meaning: "中暑", level: "N5", category: "health_medical",
    sentences: [{ ja: "夏の暑い日は熱中症に気をつけてください。", furigana: "なつのあついひはねっちゅうしょうにきをつけてください。", en: "夏天炎熱的日子請小心中暑。" }] },
  { id: "v_yakkyoku", word: "薬局", furigana: "やっきょく", romaji: "yakkyoku", meaning: "藥局", level: "N5", category: "health_medical",
    sentences: [{ ja: "薬局で風邪薬を買いました。", furigana: "やっきょくでかぜぐすりをかいました。", en: "在藥局買了感冒藥。" }] },
  { id: "v_shinsatsu", word: "診察", furigana: "しんさつ", romaji: "shinsatsu", meaning: "看診", level: "N5", category: "health_medical",
    sentences: [{ ja: "９時から医者の診察が始まります。", furigana: "くじからいしゃのしんさつがはじまります。", en: "九點開始醫生看診。" }] },
  { id: "v_yobouchuusha", word: "予防注射", furigana: "よぼうちゅうしゃ", romaji: "yobouchuusha", meaning: "預防針", level: "N5", category: "health_medical",
    sentences: [{ ja: "インフルエンザの予防注射を受けました。", furigana: "いんふるえんざのよぼうちゅうしゃをうけました。", en: "打了流感的預防針。" }] },
  { id: "v_taionkei", word: "体温計", furigana: "たいおんけい", romaji: "taionkei", meaning: "體溫計", level: "N5", category: "health_medical",
    sentences: [{ ja: "体温計で熱を測ってください。", furigana: "たいおんけいでねつをはかってください。", en: "請用體溫計量體溫。" }] },
  { id: "v_utsuru", word: "うつる", furigana: "うつる", romaji: "utsuru", meaning: "傳染", level: "N5", category: "health_medical",
    sentences: [{ ja: "家族の風邪が私にうつりました。", furigana: "かぞくのかぜがわたしにうつりました。", en: "家人的感冒傳染給我了。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_tanoshimi", word: "楽しみ", furigana: "たのしみ", romaji: "tanoshimi", meaning: "期待 / 樂趣", level: "N5", category: "psychology_character",
    sentences: [{ ja: "明日の旅行がとても楽しみです。", furigana: "あしたのりょこうがとてもたのしみです。", en: "非常期待明天的旅行。" }] },
  { id: "v_hottosuru", word: "ほっとする", furigana: "ほっとする", romaji: "hottosuru", meaning: "鬆了一口氣", level: "N5", category: "psychology_character",
    sentences: [{ ja: "テストが終わってほっとしました。", furigana: "てすとがおわってほっとしました。", en: "考試結束了鬆了一口氣。" }] },
  { id: "v_gakkarisuru", word: "がっかりする", furigana: "がっかりする", romaji: "gakkarisuru", meaning: "失望", level: "N5", category: "psychology_character",
    sentences: [{ ja: "試合に負けてがっかりしました。", furigana: "しあいにまけてがっかりしました。", en: "比賽輸了感到很失望。" }] },
  { id: "v_wakuwakusuru", word: "わくわくする", furigana: "わくわくする", romaji: "wakuwakusuru", meaning: "興奮期待", level: "N5", category: "psychology_character",
    sentences: [{ ja: "プレゼントを開ける時はわくわくします。", furigana: "ぷれぜんとをあけるときはわくわくします。", en: "打開禮物的時候感到很興奮。" }] },
  { id: "v_dokidokisuru", word: "ドキドキする", furigana: "どきどきする", romaji: "dokidokisuru", meaning: "心跳加速 / 緊張", level: "N5", category: "psychology_character",
    sentences: [{ ja: "好きな人と話す時、胸がドキドキします。", furigana: "すきなひととはなすとき、むねがどきどきします。", en: "和喜歡的人說話時，心跳會加速。" }] },
  { id: "v_irairasuru", word: "イライラする", furigana: "いらいらする", romaji: "irairasuru", meaning: "焦躁 / 不耐煩", level: "N5", category: "psychology_character",
    sentences: [{ ja: "バスが来なくてイライラします。", furigana: "ばすがこなくていらいらします。", en: "公車一直不來感到很焦躁。" }] },
  { id: "v_kinchousuru", word: "緊張する", furigana: "きんちょうする", romaji: "kinchousuru", meaning: "緊張", level: "N5", category: "psychology_character",
    sentences: [{ ja: "面接の前はとても緊張します。", furigana: "めんせつのまえはとてもきんちょうします。", en: "面試前非常緊張。" }] },
  { id: "v_kigamijikai", word: "気が短い", furigana: "きがみじかい", romaji: "kigamijikai", meaning: "性子急", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼は気が短いので、すぐ怒ります。", furigana: "かれはきがみじかいので、すぐおこります。", en: "他性子很急，所以馬上就生氣。" }] },
  { id: "v_kiganagai", word: "気が長い", furigana: "きがながい", romaji: "kiganagai", meaning: "慢性子 / 有耐心", level: "N5", category: "psychology_character",
    sentences: [{ ja: "先生は気が長いので、何度も教えてくれます。", furigana: "せんせいはきがながいので、なんどもおしえてくれます。", en: "老師很有耐心，所以教了好幾次。" }] },
  { id: "v_wagamama", word: "わがまま", furigana: "わがまま", romaji: "wagamama", meaning: "任性的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "わがままな子供に手を焼いています。", furigana: "わがままなこどもにてをやいています。", en: "對任性的小孩感到棘手。" }] },
  { id: "v_ijiwaru", word: "意地悪", furigana: "いじわる", romaji: "ijiwaru", meaning: "壞心眼 / 刁難", level: "N5", category: "psychology_character",
    sentences: [{ ja: "意地悪な質問をしてはいけません。", furigana: "いじわるなしつもんをしてはいけません。", en: "不可以問刁難的問題。" }] },
  { id: "v_kechi", word: "けち", furigana: "けち", romaji: "kechi", meaning: "小氣的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼はお金にけちです。", furigana: "かれはおかねにけちです。", en: "他對錢很小氣。" }] },
  { id: "v_namakemono", word: "怠け者", furigana: "なまけもの", romaji: "namakemono", meaning: "懶惰蟲", level: "N5", category: "psychology_character",
    sentences: [{ ja: "アリは働き者で、キリギリスは怠け者です。", furigana: "ありははたらきもので、きりぎりすはなまけものです。", en: "螞蟻是勤勞者，而螽斯是懶惰蟲。" }] },
  { id: "v_yuuki", word: "勇気", furigana: "ゆうき", romaji: "yuuki", meaning: "勇氣", level: "N5", category: "psychology_character",
    sentences: [{ ja: "勇気を出して彼に話しかけました。", furigana: "ゆうきをだしてかれにはなしかけました。", en: "鼓起勇氣向他搭話了。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart2.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 2) to data_n5.js!');
