const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart4 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_oyayubi", word: "親指", furigana: "おやゆび", romaji: "oyayubi", meaning: "大拇指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ドアに親指を挟んでしまいました。", furigana: "どあにおやゆびをはさんでしまいました。", en: "大拇指被門夾到了。" }] },
  { id: "v_hitosashiyubi", word: "人差し指", furigana: "ひとさしゆび", romaji: "hitosashiyubi", meaning: "食指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "人差し指でボタンを押します。", furigana: "ひとさしゆびでぼたんをおします。", en: "用食指按按鈕。" }] },
  { id: "v_nakayubi", word: "中指", furigana: "なかゆび", romaji: "nakayubi", meaning: "中指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "中指に指輪をつけています。", furigana: "なかゆびにゆびわをつけています。", en: "中指上戴著戒指。" }] },
  { id: "v_kusuriyubi", word: "薬指", furigana: "くすりゆび", romaji: "kusuriyubi", meaning: "無名指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "結婚指輪は左手の薬指にはめます。", furigana: "けっこんゆびわはひだりてのくすりゆびにはめます。", en: "結婚戒指戴在左手的無名指上。" }] },
  { id: "v_koyubi", word: "小指", furigana: "こゆび", romaji: "koyubi", meaning: "小指", level: "N5", category: "body_physiology",
    sentences: [{ ja: "足の小指を机の角にぶつけました。", furigana: "あしのこゆびをつくえのかどにぶつけました。", en: "腳的小指撞到桌角了。" }] },
  { id: "v_tekubi", word: "手首", furigana: "てくび", romaji: "tekubi", meaning: "手腕", level: "N5", category: "body_physiology",
    sentences: [{ ja: "転んだ時に手首を痛めました。", furigana: "ころんだときにてくびをいためました。", en: "跌倒的時候弄傷了手腕。" }] },
  { id: "v_ashikubi", word: "足首", furigana: "あしくび", romaji: "ashikubi", meaning: "腳踝", level: "N5", category: "body_physiology",
    sentences: [{ ja: "階段で足首を捻挫しました。", furigana: "かいだんであしくびをねんざしました。", en: "在樓梯上扭傷了腳踝。" }] },
  { id: "v_tsumasaki", word: "つま先", furigana: "つまさき", romaji: "tsumasaki", meaning: "腳尖", level: "N5", category: "body_physiology",
    sentences: [{ ja: "つま先で静かに歩きます。", furigana: "つまさきでしずかにあるきます。", en: "踮著腳尖安靜地走路。" }] },
  { id: "v_taijuu", word: "体重", furigana: "たいじゅう", romaji: "taijuu", meaning: "體重", level: "N5", category: "body_physiology",
    sentences: [{ ja: "毎日体重を量っています。", furigana: "まいにちたいじゅうをはかっています。", en: "每天都在量體重。" }] },
  { id: "v_shinchou", word: "身長", furigana: "しんちょう", romaji: "shinchou", meaning: "身高", level: "N5", category: "body_physiology",
    sentences: [{ ja: "一年前より身長が伸びました。", furigana: "いちねんまえよりしんちょうがのびました。", en: "身高比一年前長高了。" }] },
  { id: "v_mabataki", word: "瞬き", furigana: "まばたき", romaji: "mabataki", meaning: "眨眼", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼は緊張すると瞬きが多くなります。", furigana: "かれはきんちょうするとまばたきがおおくなります。", en: "他一緊張眨眼次數就會變多。" }] },
  { id: "v_ikigire", word: "息切れ", furigana: "いきぎれ", romaji: "ikigire", meaning: "喘不過氣", level: "N5", category: "body_physiology",
    sentences: [{ ja: "階段を上るだけで息切れがします。", furigana: "かいだんをのぼるだけでいきぎれがします。", en: "光是爬樓梯就喘不過氣。" }] },
  { id: "v_geppu", word: "ゲップ", furigana: "げっぷ", romaji: "geppu", meaning: "打嗝 (胃氣)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "コーラを飲んだらゲップが出ました。", furigana: "こーらをのんだらげっぷがでました。", en: "喝了可樂就打嗝了。" }] },
  { id: "v_negaeri", word: "寝返り", furigana: "ねがえり", romaji: "negaeri", meaning: "翻身", level: "N5", category: "body_physiology",
    sentences: [{ ja: "赤ちゃんが初めて寝返りを打ちました。", furigana: "あかちゃんがはじめてねがえりをうちました。", en: "嬰兒第一次翻身了。" }] },
  { id: "v_okiagaru", word: "起き上がる", furigana: "おきあがる", romaji: "okiagaru", meaning: "爬起來 / 起身", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ベッドからゆっくり起き上がりました。", furigana: "べっどからゆっくりおきあがりました。", en: "從床上慢慢爬了起來。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_ugaigusuri", word: "うがい薬", furigana: "うがいぐすり", romaji: "ugaigusuri", meaning: "漱口水", level: "N5", category: "health_medical",
    sentences: [{ ja: "うがい薬を使って喉を消毒します。", furigana: "うがいぐすりをつかってのどをしょうどくします。", en: "用漱口水消毒喉嚨。" }] },
  { id: "v_megusuri", word: "目薬", furigana: "めぐすり", romaji: "megusuri", meaning: "眼藥水", level: "N5", category: "health_medical",
    sentences: [{ ja: "目が疲れたので目薬をさします。", furigana: "めがつかれたのでめぐすりをさします。", en: "因為眼睛累了所以點眼藥水。" }] },
  { id: "v_shippu", word: "湿布", furigana: "しっぷ", romaji: "shippu", meaning: "痠痛貼布", level: "N5", category: "health_medical",
    sentences: [{ ja: "肩が痛いので湿布を貼ります。", furigana: "かたがいたいのでしっぷをはります。", en: "因為肩膀痛所以貼貼布。" }] },
  { id: "v_shinsatsuken", word: "診察券", furigana: "しんさつけん", romaji: "shinsatsuken", meaning: "掛號證 / 診察券", level: "N5", category: "health_medical",
    sentences: [{ ja: "受付に診察券を出してください。", furigana: "うけつけにしんさつけんをだしてください。", en: "請將掛號證交給櫃檯。" }] },
  { id: "v_hokenshou", word: "保険証", furigana: "ほけんしょう", romaji: "hokenshou", meaning: "健保卡 / 保險證", level: "N5", category: "health_medical",
    sentences: [{ ja: "病院へ行く時は保険証が必要です。", furigana: "びょういんへいくときはほけんしょうがひつようです。", en: "去醫院的時候需要帶健保卡。" }] },
  { id: "v_machiaishitsu", word: "待合室", furigana: "まちあいしつ", romaji: "machiaishitsu", meaning: "候診室 / 等候室", level: "N5", category: "health_medical",
    sentences: [{ ja: "待合室で名前を呼ばれるまでお待ちください。", furigana: "まちあいしつでなまえをよばれるまでおまちください。", en: "請在候診室等到叫您的名字。" }] },
  { id: "v_shoudoku", word: "消毒", furigana: "しょうどく", romaji: "shoudoku", meaning: "消毒", level: "N5", category: "health_medical",
    sentences: [{ ja: "怪我をしたところを消毒します。", furigana: "けがをしたところをしょうどくします。", en: "給受傷的地方消毒。" }] },
  { id: "v_houtai", word: "包帯", furigana: "ほうたい", romaji: "houtai", meaning: "繃帶", level: "N5", category: "health_medical",
    sentences: [{ ja: "腕に白い包帯を巻いています。", furigana: "うでにしろいほうたいをまいています。", en: "手臂上纏著白色的繃帶。" }] },
  { id: "v_hanaji", word: "鼻血", furigana: "はなぢ", romaji: "hanaji", meaning: "流鼻血", level: "N5", category: "health_medical",
    sentences: [{ ja: "ぶつかって鼻血が出ました。", furigana: "ぶつかってはなぢがでました。", en: "撞到流鼻血了。" }] },
  { id: "v_kinnikutsuu", word: "筋肉痛", furigana: "きんにくつう", romaji: "kinnikutsuu", meaning: "肌肉痠痛", level: "N5", category: "health_medical",
    sentences: [{ ja: "昨日の運動でひどい筋肉痛です。", furigana: "きのうのうんどうでひどいきんにくつうです。", en: "因為昨天的運動導致嚴重的肌肉痠痛。" }] },
  { id: "v_katakori", word: "肩こり", furigana: "かたこり", romaji: "katakori", meaning: "肩膀僵硬 / 痠痛", level: "N5", category: "health_medical",
    sentences: [{ ja: "パソコンを使いすぎて肩こりがひどいです。", furigana: "ぱそこんをつかいすぎてかたこりがひどいです。", en: "電腦用太多肩膀僵硬得很厲害。" }] },
  { id: "v_norimonoyoi", word: "乗り物酔い", furigana: "のりものよい", romaji: "norimonoyoi", meaning: "暈車 / 暈船", level: "N5", category: "health_medical",
    sentences: [{ ja: "乗り物酔いをしやすいので、薬を飲みました。", furigana: "のりものよいをしやすいので、くすりをのみました。", en: "因為容易暈車，所以吃了藥。" }] },
  { id: "v_futsukayoi", word: "二日酔い", furigana: "ふつかよい", romaji: "futsukayoi", meaning: "宿醉", level: "N5", category: "health_medical",
    sentences: [{ ja: "お酒を飲みすぎて、今日は二日酔いです。", furigana: "おさけをのみすぎて、きょうはふつかよいです。", en: "酒喝太多，今天宿醉了。" }] },
  { id: "v_nebusoku", word: "寝不足", furigana: "ねぶそく", romaji: "nebusoku", meaning: "睡眠不足", level: "N5", category: "health_medical",
    sentences: [{ ja: "寝不足で頭がぼーっとします。", furigana: "ねぶそくであたまがぼーっとします。", en: "睡眠不足導致頭腦昏昏沉沉的。" }] },
  { id: "v_shokuyoku", word: "食欲", furigana: "しょくよく", romaji: "shokuyoku", meaning: "食慾", level: "N5", category: "health_medical",
    sentences: [{ ja: "風邪で全然食欲がありません。", furigana: "かぜでぜんぜんしょくよくがありません。", en: "感冒了完全沒有食慾。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_omoiyari", word: "思いやり", furigana: "おもいやり", romaji: "omoiyari", meaning: "體貼 / 關懷", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼はいつも他人に思いやりがあります。", furigana: "かれはいつもたにんにおもいやりがあります。", en: "他總是對他人很體貼。" }] },
  { id: "v_darashinai", word: "だらしない", furigana: "だらしない", romaji: "darashinai", meaning: "散漫的 / 邋遢的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "だらしない服装で出かけてはいけません。", furigana: "だらしないふくそうででかけてはいけません。", en: "不可以穿著邋遢的服裝出門。" }] },
  { id: "v_zurui", word: "ずるい", furigana: "ずるい", romaji: "zurui", meaning: "狡猾的 / 奸詐的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "一人だけ美味しいものを食べるなんてずるいです。", furigana: "ひとりだけおいしいものをたべるなんてずるいです。", en: "只有自己一個人吃好吃的太狡猾了。" }] },
  { id: "v_awateru", word: "慌てる", furigana: "あわてる", romaji: "awateru", meaning: "慌張 / 驚慌", level: "N5", category: "psychology_character",
    sentences: [{ ja: "時間がなくて慌てて家を出ました。", furigana: "じかんがなくてあわてていえをでました。", en: "沒時間了慌張地出門。" }] },
  { id: "v_aseru", word: "焦る", furigana: "あせる", romaji: "aseru", meaning: "著急 / 焦慮", level: "N5", category: "psychology_character",
    sentences: [{ ja: "試験の時間が足りなくて焦りました。", furigana: "しけんのじかんがたりなくてあせりました。", en: "考試時間不夠感到很著急。" }] },
  { id: "v_ochikomu", word: "落ち込む", furigana: "おちこむ", romaji: "ochikomu", meaning: "沮喪 / 消沉", level: "N5", category: "psychology_character",
    sentences: [{ ja: "失敗してとても落ち込んでいます。", furigana: "しっぱいしてとてもおちこんでいます。", en: "因為失敗感到非常沮喪。" }] },
  { id: "v_harikiru", word: "張り切る", furigana: "はりきる", romaji: "harikiru", meaning: "幹勁十足", level: "N5", category: "psychology_character",
    sentences: [{ ja: "明日の遠足に子供たちは張り切っています。", furigana: "あしたのえんそくにこどもたちははりきっています。", en: "孩子們對明天的遠足感到幹勁十足。" }] },
  { id: "v_ochitsuku", word: "落ち着く", furigana: "おちつく", romaji: "ochitsuku", meaning: "冷靜下來 / 沉著", level: "N5", category: "psychology_character",
    sentences: [{ ja: "深呼吸をして、少し落ち着きましょう。", furigana: "しんこきゅうをして、すこしおちつきましょう。", en: "深呼吸一下，稍微冷靜下來吧。" }] },
  { id: "v_tereru", word: "照れる", furigana: "てれる", romaji: "tereru", meaning: "害羞 / 靦腆", level: "N5", category: "psychology_character",
    sentences: [{ ja: "褒められて彼は少し照れました。", furigana: "ほめられてかれはすこしてれました。", en: "被稱讚後他有些害羞。" }] },
  { id: "v_donaru", word: "怒鳴る", furigana: "どなる", romaji: "donaru", meaning: "大聲怒吼", level: "N5", category: "psychology_character",
    sentences: [{ ja: "父が大きな声で怒鳴りました。", furigana: "ちちがおおきなこえでどなりました。", en: "父親大聲怒吼了。" }] },
  { id: "v_shinjiru", word: "信じる", furigana: "しんじる", romaji: "shinjiru", meaning: "相信", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼の言葉を信じます。", furigana: "かれのことばをしんじます。", en: "我相信他的話。" }] },
  { id: "v_utagau", word: "疑う", furigana: "うたがう", romaji: "utagau", meaning: "懷疑", level: "N5", category: "psychology_character",
    sentences: [{ ja: "友達を疑うのはよくないです。", furigana: "ともだちをうたがうのはよくないです。", en: "懷疑朋友是不好的。" }] },
  { id: "v_akirameru", word: "諦める", furigana: "あきらめる", romaji: "akirameru", meaning: "放棄", level: "N5", category: "psychology_character",
    sentences: [{ ja: "最後まで諦めないでください。", furigana: "さいごまであきらめないでください。", en: "請不要放棄到最後。" }] },
  { id: "v_kanshasuru", word: "感謝する", furigana: "かんしゃする", romaji: "kanshasuru", meaning: "感謝", level: "N5", category: "psychology_character",
    sentences: [{ ja: "両親にいつも感謝しています。", furigana: "りょうしんにいつもかんしゃしています。", en: "總是對父母抱持著感謝。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart4.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 4) to data_n5.js!');
