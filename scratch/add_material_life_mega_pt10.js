const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt10 = [
  // ================= 銀行與郵局 (Bank & Post Office) =================
  { id: "v_h_ginkou", word: "銀行", furigana: "ぎんこう", romaji: "ginkou", meaning: "銀行", level: "N5", category: "housing_space",
    sentences: [{ ja: "お金を下ろすために銀行へ行きます。", furigana: "おかねをおろすためにぎんこうへいきます。", en: "去銀行領錢。" }] },
  { id: "v_h_yuubinkyoku", word: "郵便局", furigana: "ゆうびんきょく", romaji: "yuubinkyoku", meaning: "郵局", level: "N5", category: "housing_space",
    sentences: [{ ja: "郵便局で荷物を送ります。", furigana: "ゆうびんきょくでにもつをおくります。", en: "在郵局寄包裹。" }] },
  { id: "v_h_kouza", word: "口座", furigana: "こうざ", romaji: "kouza", meaning: "銀行帳戶", level: "N3", category: "housing_space",
    sentences: [{ ja: "新しい銀行口座を作ります。", furigana: "あたらしいぎんこうこうざをつくります。", en: "開設新的銀行帳戶。" }] },
  { id: "v_h_tsuuchou", word: "通帳", furigana: "つうちょう", romaji: "tsuuchou", meaning: "存摺", level: "N4", category: "housing_space",
    sentences: [{ ja: "銀行で通帳の記帳をします。", furigana: "ぎんこうでつうちょうのきちょうをします。", en: "在銀行補登存摺。" }] },
  { id: "v_h_kyasshukaado", word: "キャッシュカード", furigana: "きゃっしゅかーど", romaji: "kyasshukaado", meaning: "提款卡", level: "N4", category: "housing_space",
    sentences: [{ ja: "ＡＴＭにキャッシュカードを入れます。", furigana: "えーてぃーえむにきゃっしゅかーどをいれます。", en: "把提款卡放進ATM裡。" }] },
  { id: "v_h_inkan", word: "印鑑", furigana: "いんかん", romaji: "inkan", meaning: "印章", level: "N3", category: "housing_space",
    sentences: [{ ja: "口座を作るには印鑑が必要です。", furigana: "こうざをつくるにはいんかんがひつようです。", en: "開戶需要印章。" }] },
  { id: "v_h_hanko", word: "はんこ", furigana: "はんこ", romaji: "hanko", meaning: "印章 (口語)", level: "N4", category: "housing_space",
    sentences: [{ ja: "ここにハンコを押してください。", furigana: "ここにはんこをおしてください。", en: "請在這裡蓋章。" }] },
  { id: "v_h_mibunshoumeisho", word: "身分証明書", furigana: "みぶんしょうめいしょ", romaji: "mibunshoumeisho", meaning: "身分證件", level: "N3", category: "housing_space",
    sentences: [{ ja: "パスポートなどの身分証明書を見せてください。", furigana: "ぱすぽーとなどのみぶんしょうめいしょをみせてください。", en: "請出示護照等身分證件。" }] },
  { id: "v_h_madoguchi", word: "窓口", furigana: "まどぐち", romaji: "madoguchi", meaning: "服務窗口", level: "N3", category: "housing_space",
    sentences: [{ ja: "銀行の窓口で振り込みをします。", furigana: "ぎんこうのまどぐちでふりこみをします。", en: "在銀行窗口匯款。" }] },
  { id: "v_h_tesuuryou", word: "手数料", furigana: "てすうりょう", romaji: "tesuuryou", meaning: "手續費", level: "N3", category: "housing_space",
    sentences: [{ ja: "ＡＴＭの利用には手数料がかかります。", furigana: "えーてぃーえむのりようにはてすうりょうがかかります。", en: "使用ATM需要手續費。" }] },
  { id: "v_h_yokin", word: "預金", furigana: "よきん", romaji: "yokin", meaning: "存款", level: "N3", category: "housing_space",
    sentences: [{ ja: "毎月少しずつ銀行に預金しています。", furigana: "まいつきすこしずつぎんこうによきんしています。", en: "每個月都會存一點錢進銀行。" }] },
  { id: "v_h_hikidashi", word: "引き出し", furigana: "ひきだし", romaji: "hikidashi", meaning: "提款 / 抽屜", level: "N3", category: "housing_space",
    sentences: [{ ja: "ＡＴＭでお金の引き出しをします。", furigana: "えーてぃーえむでおかねのひきだしをします。", en: "在ATM提款。" }] },
  { id: "v_h_furikomi", word: "振り込み", furigana: "ふりこみ", romaji: "furikomi", meaning: "匯款 (轉帳)", level: "N3", category: "housing_space",
    sentences: [{ ja: "家賃の振り込みを忘れないでください。", furigana: "やちんのふりこみをわすれないでください。", en: "請不要忘記匯房租。" }] },
  { id: "v_h_soukin", word: "送金", furigana: "そうきん", romaji: "soukin", meaning: "匯款 (多指跨國/遠距)", level: "N3", category: "housing_space",
    sentences: [{ ja: "海外の家族に送金します。", furigana: "かいがいの家族にそうきんします。", en: "匯款給海外的家人。" }] },
  { id: "v_h_ryougae", word: "両替", furigana: "りょうがえ", romaji: "ryougae", meaning: "換錢 / 換匯", level: "N4", category: "housing_space",
    sentences: [{ ja: "一万円札を千円札に両替してください。", furigana: "いちまんえんさつをせんえんさつにりょうがえしてください。", en: "請把一萬日圓鈔票換成一千日圓鈔票。" }] },
  { id: "v_h_anshoubangou", word: "暗証番号", furigana: "あんしょうばんごう", romaji: "anshoubangou", meaning: "密碼 (PIN碼)", level: "N3", category: "housing_space",
    sentences: [{ ja: "暗証番号を忘れてしまいました。", furigana: "あんしょうばんごうをわすれてしまいました。", en: "忘記密碼了。" }] },
  { id: "v_h_kozutsumi", word: "小包", furigana: "こづつみ", romaji: "kozutsumi", meaning: "包裹", level: "N4", category: "housing_space",
    sentences: [{ ja: "郵便局で小包を送ります。", furigana: "ゆうびんきょくでこづつみをおくります。", en: "在郵局寄包裹。" }] },
  { id: "v_h_kitte", word: "切手", furigana: "きって", romaji: "kitte", meaning: "郵票", level: "N5", category: "housing_space",
    sentences: [{ ja: "封筒に切手を貼ります。", furigana: "ふうとうにきってをはります。", en: "在信封上貼郵票。" }] },
  { id: "v_h_hagaki", word: "はがき", furigana: "はがき", romaji: "hagaki", meaning: "明信片", level: "N5", category: "housing_space",
    sentences: [{ ja: "旅行先から友達にはがきを出します。", furigana: "りょこうさきからともだちにはがきをだします。", en: "從旅遊地點寄明信片給朋友。" }] },
  { id: "v_h_fuutou", word: "封筒", furigana: "ふうとう", romaji: "fuutou", meaning: "信封", level: "N5", category: "housing_space",
    sentences: [{ ja: "手紙を封筒に入れます。", furigana: "てがみをふうとうにいれます。", en: "把信裝進信封裡。" }] },
  { id: "v_h_sokutatsu", word: "速達", furigana: "そくたつ", romaji: "sokutatsu", meaning: "限時專送", level: "N3", category: "housing_space",
    sentences: [{ ja: "急ぐので、この手紙を速達でお願いします。", furigana: "いそぐので、このてがみをそくたつでおねがいします。", en: "因為很急，這封信麻煩寄限時專送。" }] },
  { id: "v_h_kakitome", word: "書留", furigana: "かきとめ", romaji: "kakitome", meaning: "掛號信", level: "N3", category: "housing_space",
    sentences: [{ ja: "大切な書類なので、書留で送ります。", furigana: "たいせつなしょるいなので、かきとめでおくります。", en: "因為是重要文件，所以用掛號寄出。" }] },
  { id: "v_h_koukuubin", word: "航空便", furigana: "こうくうびん", romaji: "koukuubin", meaning: "航空郵件", level: "N4", category: "housing_space",
    sentences: [{ ja: "台湾へ荷物を航空便で送ります。", furigana: "たいわんへにもつをこうくうびんでおくります。", en: "用航空郵件寄包裹到台灣。" }] },
  { id: "v_h_funabin", word: "船便", furigana: "ふなびん", romaji: "funabin", meaning: "海運", level: "N4", category: "housing_space",
    sentences: [{ ja: "船便は安いですが、時間がかかります。", furigana: "ふなびんはやすいですが、じかんがかかります。", en: "海運很便宜，但很花時間。" }] },

  // ================= 飛航與機場 (Airport & Flights) =================
  { id: "v_t_kuukou", word: "空港", furigana: "くうこう", romaji: "kuukou", meaning: "機場", level: "N5", category: "transport_mobility",
    sentences: [{ ja: "タクシーで空港へ向かいます。", furigana: "たくしーでくうこうへむかいます。", en: "搭計程車前往機場。" }] },
  { id: "v_t_kokunaisen", word: "国内線", furigana: "こくないせん", romaji: "kokunaisen", meaning: "國內線", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "国内線のターミナルはあちらです。", furigana: "こくないせんのたーみなるはあちらです。", en: "國內線航廈在那邊。" }] },
  { id: "v_t_kokusaisen", word: "国際線", furigana: "こくさいせん", romaji: "kokusaisen", meaning: "國際線", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "国際線に乗るために、パスポートが必要です。", furigana: "こくさいせんにのるために、ぱすぽーとがひつようです。", en: "搭乘國際線需要護照。" }] },
  { id: "v_t_koukuuken", word: "航空券", furigana: "こうくうけん", romaji: "koukuuken", meaning: "機票", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "ネットで安い航空券を予約しました。", furigana: "ねっとでやすいこうくうけんをよやくしました。", en: "在網路上訂了便宜的機票。" }] },
  { id: "v_t_pasupooto", word: "パスポート", furigana: "ぱすぽーと", romaji: "pasupooto", meaning: "護照", level: "N5", category: "transport_mobility",
    sentences: [{ ja: "出発の前にパスポートを確認します。", furigana: "しゅっぱつのまえにぱすぽーとをかくにんします。", en: "出發前確認護照。" }] },
  { id: "v_t_toujouken", word: "搭乗券", furigana: "とうじょうけん", romaji: "toujouken", meaning: "登機證", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "搭乗券とパスポートを見せてください。", furigana: "とうじょうけんとぱすぽーとをみせてください。", en: "請出示登機證和護照。" }] },
  { id: "v_t_toujouguchi", word: "搭乗口", furigana: "とうじょうぐち", romaji: "toujouguchi", meaning: "登機門", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "出発の３０分前に搭乗口へ来てください。", furigana: "しゅっぱつのさんじゅっぷんまえにとうじょうぐちへきてください。", en: "請在出發前30分鐘來到登機門。" }] },
  { id: "v_t_tenimotsu", word: "手荷物", furigana: "てにもつ", romaji: "tenimotsu", meaning: "隨身行李", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "機内に持ち込める手荷物は一つまでです。", furigana: "きないにもちこめるてにもつはひとつまでです。", en: "可帶入機艙的隨身行李限一件。" }] },
  { id: "v_t_azukeirenimotsu", word: "預け入れ荷物", furigana: "あずけいれにもつ", romaji: "azukeirenimotsu", meaning: "托運行李", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "預け入れ荷物の重さを量ります。", furigana: "あずけいれにもつのおもさをはかります。", en: "秤托運行李的重量。" }] },
  { id: "v_t_kinaimochikomi", word: "機内持ち込み", furigana: "きないもちこみ", romaji: "kinaimochikomi", meaning: "帶入機艙", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "はさみは機内持ち込みができません。", furigana: "はさみはきないもちこみができません。", en: "剪刀不能帶入機艙。" }] },
  { id: "v_t_hoankensa", word: "保安検査", furigana: "ほあんけんさ", romaji: "hoankensa", meaning: "安檢", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "保安検査場で荷物をチェックされます。", furigana: "ほあんけんさじょうでにもつをちぇっくされます。", en: "在安檢處檢查行李。" }] },
  { id: "v_t_zeikan", word: "税関", furigana: "ぜいかん", romaji: "zeikan", meaning: "海關", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "税関で申告するものはありますか？", furigana: "ぜいかんでしんこくするものはありますか？", en: "有要在海關申報的東西嗎？" }] },
  { id: "v_t_shuppatsu", word: "出発", furigana: "しゅっぱつ", romaji: "shuppatsu", meaning: "出發", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "飛行機は定刻通りに出発しました。", furigana: "ひこうきはていこくどおりにしゅっぱつしました。", en: "飛機準時出發了。" }] },
  { id: "v_t_touchaku", word: "到着", furigana: "とうちゃく", romaji: "touchaku", meaning: "抵達", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "飛行機は無事に到着しました。", furigana: "ひこうきはぶじにとうちゃくしました。", en: "飛機平安抵達了。" }] },
  { id: "v_t_chien", word: "遅延", furigana: "ちえん", romaji: "chien", meaning: "延遲", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "雪のため、飛行機に遅延が出ています。", furigana: "ゆきのため、ひこうきにちえんででています。", en: "因為下雪，飛機發生了延遲。" }] },
  { id: "v_t_kekkou", word: "欠航", furigana: "けっこう", romaji: "kekkou", meaning: "航班取消", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "台風で今日の便はすべて欠航になりました。", furigana: "たいふうできょうのびんはすべてけっこうになりました。", en: "因為颱風今天的航班全部取消了。" }] },
  { id: "v_t_taaminaru", word: "ターミナル", furigana: "たーみなる", romaji: "taaminaru", meaning: "航廈", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "第２ターミナルから出発します。", furigana: "だいにたーみなるからしゅっぱつします。", en: "從第二航廈出發。" }] },
  { id: "v_t_menzeiten", word: "免税店", furigana: "めんぜいてん", romaji: "menzeiten", meaning: "免稅店", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "空港の免税店で化粧品を買いました。", furigana: "くうこうのめんぜいてんでけしょうひんをかいました。", en: "在機場免稅店買了化妝品。" }] },
  { id: "v_t_kinaishoku", word: "機内食", furigana: "きないしょく", romaji: "kinaishoku", meaning: "飛機餐", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "機内食は和食と洋食から選べます。", furigana: "きないしょくはわしょくとようしょくからえらべます。", en: "飛機餐可以選日式或西式。" }] },
  { id: "v_t_shiitoberuto", word: "シートベルト", furigana: "しーとべると", romaji: "shiitoberuto", meaning: "安全帶", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "座席に座ったらシートベルトを締めてください。", furigana: "ざせきにすわったらしーとべるとをしめてください。", en: "坐到位子上後請繫好安全帶。" }] },
  { id: "v_t_madogawa", word: "窓側", furigana: "まどがわ", romaji: "madogawa", meaning: "靠窗座位", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "外の景色が見たいので窓側の席がいいです。", furigana: "そとのけしきがみたいのでまどがわのせきがいいです。", en: "因為想看外面的風景，所以想要靠窗的座位。" }] },
  { id: "v_t_tsuurogawa", word: "通路側", furigana: "つうろがわ", romaji: "tsuurogawa", meaning: "靠走道座位", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "トイレに行きやすいので通路側の席を選びます。", furigana: "といれにいきやすいのでつうろがわのせきをえらびます。", en: "因為方便去廁所所以選了靠走道的座位。" }] },
  { id: "v_t_kyakushitsujoumuin", word: "客室乗務員", furigana: "きゃくしつじょうむいん", romaji: "kyakushitsujoumuin", meaning: "空服員", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "客室乗務員に毛布をもらいました。", furigana: "きゃくしつじょうむいんにもうふをもらいました。", en: "向空服員拿了毛毯。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt10.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 10 - Bank & Airport) to data_n5.js!');
