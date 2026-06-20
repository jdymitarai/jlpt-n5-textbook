const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt14 = [
  // ================= 地震與防災 (Disaster Prevention & Earthquakes) =================
  { id: "v_h_jishin", word: "地震", furigana: "じしん", romaji: "jishin", meaning: "地震", level: "N4", category: "housing_space",
    sentences: [{ ja: "日本は地震が多い国です。", furigana: "にほんはじしんがおおいくにです。", en: "日本是個地震很多的國家。" }] },
  { id: "v_h_yure", word: "揺れ", furigana: "ゆれ", romaji: "yure", meaning: "搖晃", level: "N3", category: "housing_space",
    sentences: [{ ja: "大きな揺れを感じたら、机の下に入ってください。", furigana: "おおきなゆれをかんじたら、つくえのしたにはいってください。", en: "感覺到劇烈搖晃時，請躲進桌子底下。" }] },
  { id: "v_h_shindo", word: "震度", furigana: "しんど", romaji: "shindo", meaning: "震度", level: "N3", category: "housing_space",
    sentences: [{ ja: "先ほどの地震は震度４でした。", furigana: "さきほどのじしんはしんどよんでした。", en: "剛才的地震震度為4級。" }] },
  { id: "v_h_tsunami", word: "津波", furigana: "つなみ", romaji: "tsunami", meaning: "海嘯", level: "N3", category: "housing_space",
    sentences: [{ ja: "地震の後は津波に注意してください。", furigana: "じしんのあとはつなみにちゅういしてください。", en: "地震過後請小心海嘯。" }] },
  { id: "v_h_hinan", word: "避難", furigana: "ひなん", romaji: "hinan", meaning: "避難 / 撤離", level: "N3", category: "housing_space",
    sentences: [{ ja: "安全な場所へ避難しましょう。", furigana: "あんぜんなばしょへひなんしましょう。", en: "到安全的地方避難吧。" }] },
  { id: "v_h_hinanjo", word: "避難所", furigana: "ひなんじょ", romaji: "hinanjo", meaning: "避難所", level: "N3", category: "housing_space",
    sentences: [{ ja: "近くの学校が避難所になっています。", furigana: "ちかくのがっこうがひなんじょになっています。", en: "附近的學校變成了避難所。" }] },
  { id: "v_h_bousaiguzzu", word: "防災グッズ", furigana: "ぼうさいぐっず", romaji: "bousaiguzzu", meaning: "防災用品", level: "N3", category: "housing_space",
    sentences: [{ ja: "家に防災グッズを準備しておきます。", furigana: "いえにぼうさいぐっずをじゅんびしておきます。", en: "在家裡準備好防災用品。" }] },
  { id: "v_h_kaichuudentou", word: "懐中電灯", furigana: "かいちゅうでんとう", romaji: "kaichuudentou", meaning: "手電筒", level: "N4", category: "housing_space",
    sentences: [{ ja: "停電の時に懐中電灯を使います。", furigana: "ていでんのときにかいちゅうでんとうをつかいます。", en: "停電的時候使用手電筒。" }] },
  { id: "v_h_hijoushoku", word: "非常食", furigana: "ひじょうしょく", romaji: "hijoushoku", meaning: "緊急口糧 / 儲備糧食", level: "N3", category: "housing_space",
    sentences: [{ ja: "非常食として缶詰と水を買いました。", furigana: "ひじょうしょくとしてかんづめとみずをかいました。", en: "買了罐頭和水作為緊急口糧。" }] },
  { id: "v_h_herumetto", word: "ヘルメット", furigana: "へるめっと", romaji: "herumetto", meaning: "安全帽 / 頭盔", level: "N4", category: "housing_space",
    sentences: [{ ja: "頭を守るためにヘルメットを被ります。", furigana: "あたまをまもるためにへるめっとをかぶります。", en: "為了保護頭部而戴上頭盔。" }] },
  { id: "v_h_kyuukyuubako", word: "救急箱", furigana: "きゅうきゅうばこ", romaji: "kyuukyuubako", meaning: "急救箱", level: "N4", category: "housing_space",
    sentences: [{ ja: "怪我をしたので救急箱を持ってきてください。", furigana: "けがをしたのできゅうきゅうばこをもっきてください。", en: "受傷了所以請把急救箱拿來。" }] },
  { id: "v_h_teiden", word: "停電", furigana: "ていでん", romaji: "teiden", meaning: "停電", level: "N3", category: "housing_space",
    sentences: [{ ja: "台風の影響で停電になりました。", furigana: "たいふうのえいきょうでていでんになりました。", en: "因為颱風的影響而停電了。" }] },
  { id: "v_h_dansui", word: "断水", furigana: "だんすい", romaji: "dansui", meaning: "停水", level: "N3", category: "housing_space",
    sentences: [{ ja: "地震で水道の管が壊れて断水しています。", furigana: "じしんですいどうのかんがこわれてだんすいしています。", en: "因為地震水管破裂而停水了。" }] },
  { id: "v_h_kasai", word: "火災", furigana: "かさい", romaji: "kasai", meaning: "火災", level: "N3", category: "housing_space",
    sentences: [{ ja: "火災が発生したら、すぐに逃げてください。", furigana: "かさいがはっせいしたら、すぐににげてください。", en: "如果發生火災請馬上逃生。" }] },
  { id: "v_h_shoukaki", word: "消火器", furigana: "しょうかき", romaji: "shoukaki", meaning: "滅火器", level: "N3", category: "housing_space",
    sentences: [{ ja: "廊下に消火器が置いてあります。", furigana: "ろうかにしょうかきがおいてあります。", en: "走廊上放著滅火器。" }] },
  { id: "v_h_sokuhou", word: "速報", furigana: "そくほう", romaji: "sokuhou", meaning: "快報 / 速報", level: "N3", category: "housing_space",
    sentences: [{ ja: "テレビで地震の速報を見ました。", furigana: "てれびでじしんのそくほうをみました。", en: "在電視上看到了地震快報。" }] },
  { id: "v_h_kinkyuujishinsokuhou", word: "緊急地震速報", furigana: "きんきゅうじしんそくほう", romaji: "kinkyuujishinsokuhou", meaning: "緊急地震速報 (手機警報)", level: "N3", category: "housing_space",
    sentences: [{ ja: "スマホの緊急地震速報が鳴りました。", furigana: "すまほのきんきゅうじしんそくほうがなりました。", en: "手機的緊急地震速報響了。" }] },
  { id: "v_h_yoshin", word: "余震", furigana: "よしん", romaji: "yoshin", meaning: "餘震", level: "N3", category: "housing_space",
    sentences: [{ ja: "まだ余震が続くかもしれないので注意してください。", furigana: "まだよしんがつづくかもしれないのでちゅういしてください。", en: "可能還會持續有餘震，請多加注意。" }] },

  // ================= 懷孕與育兒 (Pregnancy & Childcare) =================
  { id: "v_h_ninshin", word: "妊娠", furigana: "にんしん", romaji: "ninshin", meaning: "懷孕", level: "N3", category: "housing_space",
    sentences: [{ ja: "姉が妊娠しました。", furigana: "あねがにんしんしました。", en: "姐姐懷孕了。" }] },
  { id: "v_h_ninpu", word: "妊婦", furigana: "にんぷ", romaji: "ninpu", meaning: "孕婦", level: "N3", category: "housing_space",
    sentences: [{ ja: "電車で妊婦さんに席を譲りました。", furigana: "でんしゃでにんぷさんにせきをゆずりました。", en: "在電車上讓座給孕婦。" }] },
  { id: "v_h_tsuwari", word: "つわり", furigana: "つわり", romaji: "tsuwari", meaning: "害喜 / 孕吐", level: "N3", category: "housing_space",
    sentences: [{ ja: "つわりがひどくて、ご飯が食べられません。", furigana: "つわりがひどくて、ごはんがたべられません。", en: "害喜很嚴重，吃不下飯。" }] },
  { id: "v_h_shussan", word: "出産", furigana: "しゅっさん", romaji: "shussan", meaning: "生產 / 分娩", level: "N3", category: "housing_space",
    sentences: [{ ja: "無事に出産したと聞いて安心しました。", furigana: "ぶじにしゅっさんしたときいてあんしんしました。", en: "聽說平安生產了，覺得很安心。" }] },
  { id: "v_h_akachan", word: "赤ちゃん", furigana: "あかちゃん", romaji: "akachan", meaning: "嬰兒", level: "N4", category: "housing_space",
    sentences: [{ ja: "可愛い赤ちゃんが生まれました。", furigana: "かわいいあかちゃんがうまれました。", en: "可愛的嬰兒出生了。" }] },
  { id: "v_h_omutsu", word: "おむつ", furigana: "おむつ", romaji: "omutsu", meaning: "尿布", level: "N4", category: "housing_space",
    sentences: [{ ja: "赤ちゃんの紙おむつを替えます。", furigana: "あかちゃんのかみおむつをかえます。", en: "換嬰兒的紙尿布。" }] },
  { id: "v_h_konamiruku", word: "粉ミルク", furigana: "こなみるく", romaji: "konamiruku", meaning: "奶粉", level: "N4", category: "housing_space",
    sentences: [{ ja: "お湯で粉ミルクを作ります。", furigana: "おゆでこなみるくをつくります。", en: "用熱水泡奶粉。" }] },
  { id: "v_h_honyuubin", word: "哺乳瓶", furigana: "ほにゅうびん", romaji: "honyuubin", meaning: "奶瓶", level: "N3", category: "housing_space",
    sentences: [{ ja: "使った哺乳瓶をきれいに洗います。", furigana: "つかったほにゅうびんをきれいにあらいます。", en: "把用過的奶瓶洗乾淨。" }] },
  { id: "v_h_bebiikaa", word: "ベビーカー", furigana: "べびーかー", romaji: "bebiikaa", meaning: "嬰兒車", level: "N4", category: "housing_space",
    sentences: [{ ja: "赤ちゃんをベビーカーに乗せて散歩します。", furigana: "あかちゃんをべびーかーにのせてさんぽします。", en: "把嬰兒放上嬰兒車去散步。" }] },
  { id: "v_h_dakkohimo", word: "抱っこ紐", furigana: "だっこひも", romaji: "dakkohimo", meaning: "嬰兒背巾", level: "N3", category: "housing_space",
    sentences: [{ ja: "抱っこ紐でおんぶして出かけます。", furigana: "だっこひもでおんぶしてでかけます。", en: "用嬰兒背巾背著出門。" }] },
  { id: "v_h_ikuji", word: "育児", furigana: "いくじ", romaji: "ikuji", meaning: "育兒", level: "N3", category: "housing_space",
    sentences: [{ ja: "夫婦で協力して育児をします。", furigana: "ふうふできょうりょくしていくじをします。", en: "夫妻互相合作一起育兒。" }] },
  { id: "v_h_yonaki", word: "夜泣き", furigana: "よなき", romaji: "yonaki", meaning: "半夜哭鬧", level: "N3", category: "housing_space",
    sentences: [{ ja: "赤ちゃんの夜泣きで寝不足です。", furigana: "あかちゃんのよなきでねぶそくです。", en: "因為嬰兒半夜哭鬧而睡眠不足。" }] },
  { id: "v_h_oshaburi", word: "おしゃぶり", furigana: "おしゃぶり", romaji: "oshaburi", meaning: "奶嘴", level: "N4", category: "housing_space",
    sentences: [{ ja: "赤ちゃんにおしゃぶりをくわえさせます。", furigana: "あかちゃんにおしゃぶりをくわえさせます。", en: "讓嬰兒吸奶嘴。" }] },
  { id: "v_h_yodarekake", word: "よだれかけ", furigana: "よだれかけ", romaji: "yodarekake", meaning: "圍兜兜", level: "N4", category: "housing_space",
    sentences: [{ ja: "服が汚れないようによだれかけをつけます。", furigana: "ふくがよごれないようによだれかけをつけます。", en: "為了不弄髒衣服戴上圍兜兜。" }] },
  { id: "v_h_rinyuushoku", word: "離乳食", furigana: "りにゅうしょく", romaji: "rinyuushoku", meaning: "副食品 (嬰兒)", level: "N3", category: "housing_space",
    sentences: [{ ja: "そろそろ離乳食を始める時期です。", furigana: "そろそろりにゅうしょくをはじめるじきです。", en: "差不多是開始吃副食品的時期了。" }] },
  { id: "v_h_hoikuen", word: "保育園", furigana: "ほいくえん", romaji: "hoikuen", meaning: "托兒所 / 保育園", level: "N4", category: "housing_space",
    sentences: [{ ja: "子供を保育園に預けて仕事に行きます。", furigana: "こどもをほいくえんにあずけてしごとに行きます。", en: "把小孩寄放在托兒所然後去上班。" }] },
  { id: "v_h_youchien", word: "幼稚園", furigana: "ようちえん", romaji: "youchien", meaning: "幼稚園", level: "N4", category: "housing_space",
    sentences: [{ ja: "来年から幼稚園に通います。", furigana: "らいねんからようちえんにかよいます。", en: "明年開始上幼稚園。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt14.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 14 - Disasters & Childcare) to data_n5.js!');
