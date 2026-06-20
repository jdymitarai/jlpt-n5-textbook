const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart3 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_asewokaku", word: "汗をかく", furigana: "あせをかく", romaji: "asewokaku", meaning: "流汗", level: "N5", category: "body_physiology",
    sentences: [{ ja: "運動してたくさん汗をかきました。", furigana: "うんどうしてたくさんあせをかきました。", en: "運動流了很多汗。" }] },
  { id: "v_hadaka", word: "裸", furigana: "はだか", romaji: "hadaka", meaning: "裸體", level: "N5", category: "body_physiology",
    sentences: [{ ja: "お風呂に入る時は裸になります。", furigana: "おふろにはいるときははだかになります。", en: "洗澡的時候要光著身子。" }] },
  { id: "v_sugata", word: "姿", furigana: "すがた", romaji: "sugata", meaning: "姿態 / 身影", level: "N5", category: "body_physiology",
    sentences: [{ ja: "遠くに彼の姿が見えました。", furigana: "とおくにかれのすがたがみえました。", en: "在遠處看到了他的身影。" }] },
  { id: "v_sawaru", word: "触る", furigana: "さわる", romaji: "sawaru", meaning: "觸摸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "展示品に触らないでください。", furigana: "てんじひんにさわらないでください。", en: "請不要觸摸展示品。" }] },
  { id: "v_kagu", word: "嗅ぐ", furigana: "かぐ", romaji: "kagu", meaning: "嗅 / 聞", level: "N5", category: "body_physiology",
    sentences: [{ ja: "犬は匂いを嗅ぐのが得意です。", furigana: "いぬはにおいをかぐのがとくいです。", en: "狗很擅長聞氣味。" }] },
  { id: "v_mieru", word: "見える", furigana: "みえる", romaji: "mieru", meaning: "看得見", level: "N5", category: "body_physiology",
    sentences: [{ ja: "窓から海が見えます。", furigana: "まどからうみがみえます。", en: "從窗戶看得見海。" }] },
  { id: "v_kikoeru", word: "聞こえる", furigana: "きこえる", romaji: "kikoeru", meaning: "聽得見", level: "N5", category: "body_physiology",
    sentences: [{ ja: "隣の部屋からピアノの音が聞こえます。", furigana: "となりのへやからぴあののおとがきこえます。", en: "從隔壁房間聽見鋼琴的聲音。" }] },
  { id: "v_furikaeru", word: "振り返る", furigana: "ふりかえる", romaji: "furikaeru", meaning: "回頭看", level: "N5", category: "body_physiology",
    sentences: [{ ja: "名前を呼ばれて振り返りました。", furigana: "なまえをよばれてふりかえりました。", en: "被叫到名字所以回頭了。" }] },
  { id: "v_nobiwosuru", word: "伸びをする", furigana: "のびをする", romaji: "nobiwosuru", meaning: "伸懶腰", level: "N5", category: "body_physiology",
    sentences: [{ ja: "疲れたので大きく伸びをしました。", furigana: "つかれたのでおおきくのびをしました。", en: "因為累了所以大大地伸了個懶腰。" }] },
  { id: "v_ojigisuru", word: "お辞儀する", furigana: "おじぎする", romaji: "ojigisuru", meaning: "鞠躬", level: "N5", category: "body_physiology",
    sentences: [{ ja: "先生に丁寧にお辞儀しました。", furigana: "せんせいにていねいにおじぎしました。", en: "很有禮貌地向老師鞠躬。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_hirou", word: "疲労", furigana: "ひろう", romaji: "hirou", meaning: "疲勞", level: "N5", category: "health_medical",
    sentences: [{ ja: "仕事の疲労がたまっています。", furigana: "しごとのひろうがたまっています。", en: "累積了工作的疲勞。" }] },
  { id: "v_sutoresu", word: "ストレス", furigana: "すとれす", romaji: "sutoresu", meaning: "壓力", level: "N5", category: "health_medical",
    sentences: [{ ja: "音楽を聴いてストレスを解消します。", furigana: "おんがくをきいてすとれすをかいしょうします。", en: "聽音樂消除壓力。" }] },
  { id: "v_daietto", word: "ダイエット", furigana: "だいえっと", romaji: "daietto", meaning: "減肥", level: "N5", category: "health_medical",
    sentences: [{ ja: "明日からダイエットを始めます。", furigana: "あしたからだいえっとをはじめます。", en: "從明天開始減肥。" }] },
  { id: "v_mushiba", word: "虫歯", furigana: "むしば", romaji: "mushiba", meaning: "蛀牙", level: "N5", category: "health_medical",
    sentences: [{ ja: "甘いものを食べて虫歯になりました。", furigana: "あまいものをたべてむしばになりました。", en: "吃了甜食導致蛀牙了。" }] },
  { id: "v_ketsuatsu", word: "血圧", furigana: "けつあつ", romaji: "ketsuatsu", meaning: "血壓", level: "N5", category: "health_medical",
    sentences: [{ ja: "おじいさんは血圧が高いです。", furigana: "おじいさんはけつあつがたかいです。", en: "爺爺血壓很高。" }] },
  { id: "v_yakedo", word: "やけど", furigana: "やけど", romaji: "yakedo", meaning: "燙傷", level: "N5", category: "health_medical",
    sentences: [{ ja: "お湯をこぼしてやけどをしました。", furigana: "おゆをこぼしてやけどをしました。", en: "打翻熱水燙傷了。" }] },
  { id: "v_masuku", word: "マスク", furigana: "ますく", romaji: "masuku", meaning: "口罩", level: "N5", category: "health_medical",
    sentences: [{ ja: "風邪をひいたのでマスクをします。", furigana: "かぜをひいたのでますくをします。", en: "因為感冒了所以戴口罩。" }] },
  { id: "v_megane", word: "眼鏡", furigana: "めがね", romaji: "megane", meaning: "眼鏡", level: "N5", category: "health_medical",
    sentences: [{ ja: "本を読む時は眼鏡をかけます。", furigana: "ほんをよむときはめがねをかけます。", en: "看書的時候會戴眼鏡。" }] },
  { id: "v_kyuukyuusha", word: "救急車", furigana: "きゅうきゅうしゃ", romaji: "kyuukyuusha", meaning: "救護車", level: "N5", category: "health_medical",
    sentences: [{ ja: "すぐに救急車を呼んでください！", furigana: "すぐにきゅうきゅうしゃをよんでください！", en: "請立刻叫救護車！" }] },
  { id: "v_kizu", word: "傷", furigana: "きず", romaji: "kizu", meaning: "傷口", level: "N5", category: "health_medical",
    sentences: [{ ja: "転んで足に傷ができました。", furigana: "ころんであしにきずができました。", en: "跌倒導致腳上有了傷口。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_hohoemu", word: "ほほえむ", furigana: "ほほえむ", romaji: "hohoemu", meaning: "微笑", level: "N5", category: "psychology_character",
    sentences: [{ ja: "赤ちゃんが可愛くほほえみました。", furigana: "あかちゃんがかわいくほほえみました。", en: "嬰兒可愛地微笑了。" }] },
  { id: "v_sunao", word: "素直", furigana: "すなお", romaji: "sunao", meaning: "坦率的 / 聽話的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼女はとても素直な性格です。", furigana: "かのじょはとてもすなおなせいかくです。", en: "她是有著非常坦率的性格。" }] },
  { id: "v_ganko", word: "頑固", furigana: "がんこ", romaji: "ganko", meaning: "頑固的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私の父はとても頑固です。", furigana: "わたしのちちはとてもがんこです。", en: "我的父親非常頑固。" }] },
  { id: "v_hazukashigariya", word: "恥ずかしがり屋", furigana: "はずかしがりや", romaji: "hazukashigariya", meaning: "害羞的人", level: "N5", category: "psychology_character",
    sentences: [{ ja: "息子は恥ずかしがり屋で、人の後ろに隠れます。", furigana: "むすこははずかしがりやで、ひとのうしろにかくれます。", en: "兒子是個害羞的人，會躲在別人背後。" }] },
  { id: "v_sabishigariya", word: "寂しがり屋", furigana: "さびしがりや", romaji: "sabishigariya", meaning: "怕寂寞的人", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私は寂しがり屋なので、一人で住めません。", furigana: "わたしはさびしがりやなので、ひとりですめません。", en: "我是個怕寂寞的人，所以沒辦法一個人住。" }] },
  { id: "v_mendoukusai", word: "面倒くさい", furigana: "めんどうくさい", romaji: "mendoukusai", meaning: "嫌麻煩的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "掃除をするのが面倒くさいです。", furigana: "そうじをするのがめんどうくさいです。", en: "覺得打掃很麻煩。" }] },
  { id: "v_ayashii", word: "怪しい", furigana: "あやしい", romaji: "ayashii", meaning: "可疑的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "あの人は怪しい行動をしています。", furigana: "あのひとはあやしいこうどうをしています。", en: "那個人有著可疑的舉動。" }] },
  { id: "v_osoroshii", word: "恐ろしい", furigana: "おそろしい", romaji: "osoroshii", meaning: "恐怖的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "昨日の夜、恐ろしい夢を見ました。", furigana: "きのうのよる、おそろしいゆめをみました。", en: "昨天晚上做了一個恐怖的夢。" }] },
  { id: "v_kuyashii", word: "悔しい", furigana: "くやしい", romaji: "kuyashii", meaning: "懊悔的 / 不甘心的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "テストの点数が悪くて悔しいです。", furigana: "てすとのてんすうがわるくてくやしいです。", en: "考試分數很差，很不甘心。" }] },
  { id: "v_urayamashii", word: "羨ましい", furigana: "うらやましい", romaji: "urayamashii", meaning: "羨慕的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼の新しい車が羨ましいです。", furigana: "かれのあたらしいくるまがうらやましいです。", en: "很羨慕他的新車。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart3.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 3) to data_n5.js!');
