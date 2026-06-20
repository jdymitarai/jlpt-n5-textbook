const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const curatedWords = [
  {
    id: "v_n5_body_1",
    word: "頭",
    furigana: "あたま",
    romaji: "atama",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "頭",
    sentences: [
      { ja: "最近、よく頭が痛くなります。", furigana: "さいきん、よくあたまがいたくなります。", en: "最近經常會頭痛。" },
      { ja: "彼は頭がいいから、すぐ分かりますよ。", furigana: "かれはあたまがいいから、すぐわかりますよ。", en: "他很聰明，所以馬上就能懂了喔。" }
    ]
  },
  {
    id: "v_n5_body_2",
    word: "顔",
    furigana: "かお",
    romaji: "kao",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "臉",
    sentences: [
      { ja: "朝起きて、冷たい水で顔を洗いました。", furigana: "あさおきて、つめたいみずでかおをあらいました。", en: "早上起床後，用冷水洗了臉。" },
      { ja: "彼女はとても綺麗な顔をしています。", furigana: "かのじょはとてもきれいなかおをしています。", en: "她有一張非常漂亮的臉蛋。" }
    ]
  },
  {
    id: "v_n5_body_3",
    word: "目",
    furigana: "め",
    romaji: "me",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "眼睛",
    sentences: [
      { ja: "ずっとパソコンを見ていたので、目が疲れました。", furigana: "ずっとぱそこんをみていたので、めがつかれました。", en: "因為一直看著電腦，所以眼睛累了。" },
      { ja: "目を閉じて、少し休んでください。", furigana: "めをとじて、すこしやすんでください。", en: "請閉上眼睛，稍微休息一下。" }
    ]
  },
  {
    id: "v_n5_body_4",
    word: "耳",
    furigana: "みみ",
    romaji: "mimi",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "耳朵",
    sentences: [
      { ja: "おじいさんは少し耳が遠いです。", furigana: "おじいさんはすこしみみがとおいですよ。", en: "爺爺的耳朵有點重聽。" },
      { ja: "音楽を聴くために、耳にイヤホンを入れました。", furigana: "おんがくをきくために、みみにいやほんをいれました。", en: "為了聽音樂，把耳機戴上了耳朵。" }
    ]
  },
  {
    id: "v_n5_body_5",
    word: "鼻",
    furigana: "はな",
    romaji: "hana",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "鼻子",
    sentences: [
      { ja: "風邪を引いて、鼻水が止まりません。", furigana: "かぜをひいて、はなみずがとまりません。", en: "感冒了，鼻水流個不停。" },
      { ja: "彼女は鼻が高くて美人ですね。", furigana: "かのじょははながたかくてびじんですね。", en: "她鼻子很高挺，真是個美人呢。" }
    ]
  },
  {
    id: "v_n5_body_6",
    word: "口",
    furigana: "くち",
    romaji: "kuchi",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "嘴巴 / 嘴",
    sentences: [
      { ja: "食べ物を口に入れたまま話さないでください。", furigana: "たべものをくちにいいれたままはなさないでください。", en: "請不要嘴裡含著食物說話。" },
      { ja: "大きく口を開けてください。", furigana: "おおきくくちをあけてください。", en: "請把嘴巴張大。" }
    ]
  },
  {
    id: "v_n5_body_7",
    word: "歯",
    furigana: "は",
    romaji: "ha",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "牙齒",
    sentences: [
      { ja: "寝る前に必ず歯を磨きます。", furigana: "ねるまえにかならずはをみがきます。", en: "睡前一定會刷牙。" },
      { ja: "虫歯になって、歯がとても痛いです。", furigana: "むしばになって、はがとてもいたいです。", en: "長了蛀牙，牙齒非常痛。" }
    ]
  },
  {
    id: "v_n5_body_8",
    word: "手",
    furigana: "て",
    romaji: "te",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "手",
    sentences: [
      { ja: "外から帰ったら、まず手を洗いましょう。", furigana: "そとからかえったら、まずてをあらいましょう。", en: "從外面回來後，首先要洗手喔。" },
      { ja: "手を繋いで一緒に歩きましょう。", furigana: "てをつないでいっしょにあるきましょう。", en: "我們牽著手一起走吧。" }
    ]
  },
  {
    id: "v_n5_body_9",
    word: "足",
    furigana: "あし",
    romaji: "ashi",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "腳 / 腿",
    sentences: [
      { ja: "たくさん歩いたので、足が痛くなりました。", furigana: "たくさんあるいたので、あしがいたくなりました。", en: "因為走了很多路，所以腳變痛了。" },
      { ja: "彼は足が速いから、いつも一番です。", furigana: "かれはあしがはやいから、いつもいちばんです。", en: "他跑得很快（腳程快），所以總是拿第一。" }
    ]
  },
  {
    id: "v_n5_body_10",
    word: "体",
    furigana: "からだ",
    romaji: "karada",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "身體",
    sentences: [
      { ja: "健康のために、毎日体を動かしています。", furigana: "けんこうのために、まいにちからだをうごかしています。", en: "為了健康，我每天都會活動身體。" },
      { ja: "体の調子が悪いです。", furigana: "からだのちょうしがわるいです。", en: "身體狀況不太好。" }
    ]
  },
  {
    id: "v_n5_body_11",
    word: "髪",
    furigana: "かみ",
    romaji: "kami",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "頭髮",
    sentences: [
      { ja: "夏は暑いので、髪を短く切りました。", furigana: "なつはあついので、かみをみじかくきりました。", en: "因為夏天很熱，所以把頭髮剪短了。" },
      { ja: "彼女の髪は長くて綺麗です。", furigana: "かのじょのかみはながくてきれいですよ。", en: "她的頭髮很長很漂亮。" }
    ]
  },
  {
    id: "v_n5_body_12",
    word: "首",
    furigana: "くび",
    romaji: "kubi",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "脖子",
    sentences: [
      { ja: "寒い日は、首にマフラーを巻きます。", furigana: "さむいひは、くびにまふらーをまきます。", en: "寒冷的日子裡，會在脖子上圍圍巾。" },
      { ja: "寝違えて、首が痛いです。", furigana: "ねちがえて、くびがいたいです。", en: "落枕了，脖子好痛。" }
    ]
  },
  {
    id: "v_n5_body_13",
    word: "背中",
    furigana: "せなか",
    romaji: "senaka",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "背部",
    sentences: [
      { ja: "重い荷物を持って、背中が痛いです。", furigana: "おもいにもつをもって、せなかがいたいです。", en: "提了沉重的行李，背好痛。" },
      { ja: "背中をまっすぐにして座ってください。", furigana: "せなかをまっすぐにしてすわってください。", en: "請挺直背部坐好。" }
    ]
  },
  {
    id: "v_n5_body_14",
    word: "お腹",
    furigana: "おなか",
    romaji: "onaka",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "肚子",
    sentences: [
      { ja: "お腹が空いたので、ご飯を食べましょう。", furigana: "おなかがすいたので、ごはんをたべましょう。", en: "肚子餓了，我們來吃飯吧。" },
      { ja: "冷たいものを食べすぎて、お腹が痛いです。", furigana: "つめたいものをたべすぎて、おなかがいたいです。", en: "吃太多冰冷的東西，肚子好痛。" }
    ]
  },
  {
    id: "v_n5_body_15",
    word: "指",
    furigana: "ゆび",
    romaji: "yubi",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "手指 / 腳趾",
    sentences: [
      { ja: "料理をしていて、包丁で指を切りました。", furigana: "りょうりをしていて、ほうちょうでゆびをきりました。", en: "做菜的時候，不小心用菜刀切到了手指。" },
      { ja: "彼女の指には綺麗な指輪があります。", furigana: "かのじょのゆびにはきれいなゆびわがあります。", en: "她的手指上戴著一枚漂亮的戒指。" }
    ]
  },
  {
    id: "v_n5_body_16",
    word: "肩",
    furigana: "かた",
    romaji: "kata",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "肩膀",
    sentences: [
      { ja: "仕事が忙しくて、肩が凝りました。", furigana: "しごとがいそがしくて、かたがこりました。", en: "工作太忙，肩膀僵硬痠痛。" },
      { ja: "友達の肩を軽く叩きました。", furigana: "ともだちのかたをかるくたたきました。", en: "輕輕拍了朋友的肩膀。" }
    ]
  },
  {
    id: "v_n5_body_17",
    word: "胸",
    furigana: "むね",
    romaji: "mune",
    type: "noun",
    category: "人類自身",
    level: "N5",
    meaning: "胸部 / 胸膛",
    sentences: [
      { ja: "深呼吸をして、胸を大きく広げてください。", furigana: "しんこきゅうをして、むねをおおきくひろげてください。", en: "請深呼吸，將胸膛大大敞開。" },
      { ja: "試合の前に、胸がドキドキしました。", furigana: "しあいのまえに、むねがどきどきしました。", en: "比賽前，心裡（胸口）撲通撲通地跳。" }
    ]
  },
  {
    id: "v_n5_body_18",
    word: "腕",
    furigana: "うで",
    romaji: "ude",
    type: "noun",
    category: "人類自身",
    level: "N5",
    translation: "手臂",
    sentences: [
      { ja: "テニスをして、右の腕が痛いです。", furigana: "てにすをして、みぎのうでがいたいです。", en: "打完網球後，右手臂很痛。" },
      { ja: "彼はとても腕のいい医者です。", furigana: "かれはとてもうでのいいいしゃです。", en: "他是個醫術（手腕）非常高明的好醫生。" }
    ]
  },
  {
    id: "v_n5_body_19",
    word: "痛い",
    furigana: "いたい",
    romaji: "itai",
    type: "i-adjective",
    category: "人類自身",
    level: "N5",
    translation: "痛的",
    sentences: [
      { ja: "昨日からずっと歯が痛いです。", furigana: "きのうからずっとはがいたいです。", en: "從昨天開始牙齒就一直很痛。" },
      { ja: "転んで膝を打ちました。とても痛かったです。", furigana: "ころんでひざをうちました。とてもいたかったです。", en: "跌倒撞到了膝蓋，非常痛。" }
    ]
  },
  {
    id: "v_n5_body_20",
    word: "疲れる",
    furigana: "つかれる",
    romaji: "tsukareru",
    type: "verb",
    verbGroup: 2,
    category: "人類自身",
    level: "N5",
    translation: "疲累 / 疲倦",
    sentences: [
      { ja: "今日はたくさん仕事をしたので、疲れました。", furigana: "きょうはたくさんしごとをしたので、つかれました。", en: "今天做了很多工作，所以很累。" },
      { ja: "少し疲れたから、あそこのカフェで休みましょう。", furigana: "すこしつかれたから、あそこのかふぇでやすみましょう。", en: "有點累了，我們去那邊的咖啡廳休息一下吧。" }
    ]
  }
];

// Helper to construct verb conjugations
function generateVerbConjugation(wordData) {
  if (wordData.type !== 'verb') return null;
  // This is a simple mock for our single verb "疲れる"
  if (wordData.word === "疲れる") {
    return {
      word: "疲れる",
      furigana: "つかれる",
      romaji: "tsukareru",
      group: 2,
      conjugations: {
        masu: { jp: "疲れます", furigana: "つかれます", romaji: "tsukaremasu" },
        te: { jp: "疲れて", furigana: "つかれて", romaji: "tsukarete" },
        nai: { jp: "疲れない", furigana: "つかれない", romaji: "tsukarenai" },
        ta: { jp: "疲れた", furigana: "つかれた", romaji: "tsukareta" }
      }
    };
  }
  return null;
}

function generateAdjectiveGroup(wordData) {
  if (wordData.type !== 'i-adjective' && wordData.type !== 'na-adjective') return null;
  if (wordData.word === "痛い") {
    return {
      word: "痛い",
      furigana: "いたい",
      romaji: "itai",
      type: "i-adjective",
      conjugations: {
        present: { jp: "痛いです", furigana: "いたいです" },
        past: { jp: "痛かったです", furigana: "いたかったです" },
        negative: { jp: "痛くないです", furigana: "いたくないです" },
        pastNegative: { jp: "痛くなかったです", furigana: "いたくなかったです" },
        teForm: { jp: "痛くて", furigana: "いたくて" }
      }
    };
  }
  return null;
}

// 1. Read data_n5.js
const n5Content = fs.readFileSync(n5File, 'utf8');

// Use a simple extraction of the window object
const newChunks = {
  vocabulary: curatedWords,
  verbConjugations: [],
  adjectiveGroups: {
    iAdjectives: [],
    naAdjectives: []
  }
};

for (const w of curatedWords) {
  if (w.type === 'verb') {
    newChunks.verbConjugations.push(generateVerbConjugation(w));
  } else if (w.type === 'i-adjective') {
    newChunks.adjectiveGroups.iAdjectives.push(generateAdjectiveGroup(w));
  } else if (w.type === 'na-adjective') {
    newChunks.adjectiveGroups.naAdjectives.push(generateAdjectiveGroup(w));
  }
}

// Evaluate existing code to get full structure
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);

const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];
db.vocabulary = newChunks.vocabulary;
db.verbConjugations = newChunks.verbConjugations;
db.adjectiveGroups.iAdjectives = newChunks.adjectiveGroups.iAdjectives;
db.adjectiveGroups.naAdjectives = newChunks.adjectiveGroups.naAdjectives;

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log("Successfully injected 20 handcrafted '人類自身' (Body) words into data_n5.js.");
