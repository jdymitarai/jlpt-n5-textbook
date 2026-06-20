const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt12 = [
  // ================= 五金行與 DIY (Home Center & Hardware) =================
  { id: "v_h_hoomusenntaa", word: "ホームセンター", furigana: "ほーむせんたー", romaji: "hoomusenntaa", meaning: "大型五金量販店", level: "N4", category: "housing_space",
    sentences: [{ ja: "週末にホームセンターで工具を買います。", furigana: "しゅうまつにほーむせんたーでこうぐをかいます。", en: "週末去大型五金量販店買工具。" }] },
  { id: "v_h_kougu", word: "工具", furigana: "こうぐ", romaji: "kougu", meaning: "工具", level: "N3", category: "housing_space",
    sentences: [{ ja: "机を組み立てるために工具が必要です。", furigana: "つくえをくみたてるためにこうぐがひつようです。", en: "為了組裝桌子需要工具。" }] },
  { id: "v_h_doraibaa", word: "ドライバー", furigana: "どらいばー", romaji: "doraibaa", meaning: "螺絲起子", level: "N4", category: "housing_space",
    sentences: [{ ja: "ドライバーでネジを締めます。", furigana: "どらいばーでねじをしめます。", en: "用螺絲起子把螺絲鎖緊。" }] },
  { id: "v_h_purasudoraibaa", word: "プラスドライバー", furigana: "ぷらすどらいばー", romaji: "purasudoraibaa", meaning: "十字螺絲起子", level: "N4", category: "housing_space",
    sentences: [{ ja: "プラスドライバーを取ってください。", furigana: "ぷらすどらいばーをとってください。", en: "請把十字螺絲起子遞給我。" }] },
  { id: "v_h_mainasudoraibaa", word: "マイナスドライバー", furigana: "まいなすどらいばー", romaji: "mainasudoraibaa", meaning: "一字螺絲起子", level: "N4", category: "housing_space",
    sentences: [{ ja: "マイナスドライバーを使って開けます。", furigana: "まいなすどらいばーをつかってあけます。", en: "用一字螺絲起子打開。" }] },
  { id: "v_h_kanazuchi", word: "かなづち", furigana: "かなづち", romaji: "kanazuchi", meaning: "鐵鎚", level: "N3", category: "housing_space",
    sentences: [{ ja: "かなづちで釘を打ちます。", furigana: "かなづちでくぎをうちます。", en: "用鐵鎚釘釘子。" }] },
  { id: "v_h_hanmaa", word: "ハンマー", furigana: "はんまー", romaji: "hanmaa", meaning: "鐵鎚 (外來語)", level: "N4", category: "housing_space",
    sentences: [{ ja: "大きなハンマーを使います。", furigana: "おおきなはんまーをつかいます。", en: "使用大鐵鎚。" }] },
  { id: "v_h_kugi", word: "釘", furigana: "くぎ", romaji: "kugi", meaning: "釘子", level: "N3", category: "housing_space",
    sentences: [{ ja: "壁に釘を打ち込んで時計を掛けます。", furigana: "かべにくぎをうちこんでとけいをかけます。", en: "在牆上釘釘子掛時鐘。" }] },
  { id: "v_h_neji", word: "ネジ", furigana: "ねじ", romaji: "neji", meaning: "螺絲", level: "N4", category: "housing_space",
    sentences: [{ ja: "この椅子のネジが緩んでいます。", furigana: "このいすのねじがゆるんでいます。", en: "這把椅子的螺絲鬆了。" }] },
  { id: "v_h_penchi", word: "ペンチ", furigana: "ぺんち", romaji: "penchi", meaning: "老虎鉗", level: "N4", category: "housing_space",
    sentences: [{ ja: "ペンチで針金を曲げます。", furigana: "ぺんちではりがねをまげます。", en: "用老虎鉗把鐵絲折彎。" }] },
  { id: "v_h_nippaa", word: "ニッパー", furigana: "にっぱー", romaji: "nippaa", meaning: "斜口鉗", level: "N4", category: "housing_space",
    sentences: [{ ja: "ニッパーで細い線を切ります。", furigana: "にっぱーでほそいせんをきります。", en: "用斜口鉗剪斷細線。" }] },
  { id: "v_h_supana", word: "スパナ", furigana: "すぱな", romaji: "supana", meaning: "扳手", level: "N4", category: "housing_space",
    sentences: [{ ja: "スパナでボルトを締めます。", furigana: "すぱなでぼるとをしめます。", en: "用扳手鎖緊螺栓。" }] },
  { id: "v_h_nokogiri", word: "のこぎり", furigana: "のこぎり", romaji: "nokogiri", meaning: "鋸子", level: "N3", category: "housing_space",
    sentences: [{ ja: "のこぎりで木を切ります。", furigana: "のこぎりできをきります。", en: "用鋸子鋸木頭。" }] },
  { id: "v_h_doriru", word: "ドリル", furigana: "どりる", romaji: "doriru", meaning: "電鑽", level: "N4", category: "housing_space",
    sentences: [{ ja: "電動ドリルで穴を開けます。", furigana: "でんどうどりるであなをあけます。", en: "用電鑽打洞。" }] },
  { id: "v_h_mejaa", word: "メジャー", furigana: "めじゃー", romaji: "mejaa", meaning: "捲尺", level: "N4", category: "housing_space",
    sentences: [{ ja: "メジャーで窓の長さを測ります。", furigana: "めじゃーでまどのながさをはかります。", en: "用捲尺量窗戶的長度。" }] },
  { id: "v_h_keikoutou", word: "蛍光灯", furigana: "けいこうとう", romaji: "keikoutou", meaning: "日光燈管", level: "N3", category: "housing_space",
    sentences: [{ ja: "部屋の蛍光灯が切れました。", furigana: "へやのけいこうとうがきれました。", en: "房間的日光燈管燒壞了。" }] },
  { id: "v_h_enchoukoudo", word: "延長コード", furigana: "えんちょうこーど", romaji: "enchoukoodo", meaning: "延長線", level: "N4", category: "housing_space",
    sentences: [{ ja: "延長コードを使ってパソコンを充電します。", furigana: "えんちょうこーどをつかってぱそこんをじゅうでんします。", en: "使用延長線幫電腦充電。" }] },
  { id: "v_h_kandenchi", word: "乾電池", furigana: "かんでんち", romaji: "kandenchi", meaning: "乾電池", level: "N4", category: "housing_space",
    sentences: [{ ja: "リモコンの乾電池を交換します。", furigana: "りもこんのかんでんちをこうかんします。", en: "更換遙控器的乾電池。" }] },
  { id: "v_h_gamuteepu", word: "ガムテープ", furigana: "がむてーぷ", romaji: "gamuteepu", meaning: "封箱膠帶 / 封箱布膠帶", level: "N4", category: "housing_space",
    sentences: [{ ja: "引っ越しの段ボールをガムテープでとめます。", furigana: "ひっこしのだんぼーるをがむてーぷでとめます。", en: "用封箱膠帶把搬家的紙箱封起來。" }] },
  { id: "v_h_setchakuzai", word: "接着剤", furigana: "せっちゃくざい", romaji: "setchakuzai", meaning: "接著劑 / 三秒膠", level: "N3", category: "housing_space",
    sentences: [{ ja: "壊れたおもちゃを接着剤で直します。", furigana: "こわれたおもちゃをせっちゃくざいでなおします。", en: "用接著劑修理壞掉的玩具。" }] },
  { id: "v_h_penki", word: "ペンキ", furigana: "ぺんき", romaji: "penki", meaning: "油漆", level: "N4", category: "housing_space",
    sentences: [{ ja: "壁に白いペンキを塗ります。", furigana: "かべにしろいぺんきをぬります。", en: "在牆上塗白色的油漆。" }] },
  { id: "v_h_hake", word: "刷毛", furigana: "はけ", romaji: "hake", meaning: "油漆刷", level: "N3", category: "housing_space",
    sentences: [{ ja: "刷毛でペンキをきれいに塗ります。", furigana: "はけでぺんきをきれいにぬります。", en: "用油漆刷把油漆塗漂亮。" }] },
  { id: "v_h_kyatatsu", word: "脚立", furigana: "きゃたつ", romaji: "kyatatsu", meaning: "折疊梯 / 馬椅梯", level: "N3", category: "housing_space",
    sentences: [{ ja: "脚立に乗って電球を替えます。", furigana: "きゃたつにのってでんきゅうをかえます。", en: "站上折疊梯換燈泡。" }] },
  { id: "v_h_gunte", word: "軍手", furigana: "ぐんて", romaji: "gunte", meaning: "工作用棉手套", level: "N4", category: "housing_space",
    sentences: [{ ja: "作業をする時は軍手をはめます。", furigana: "さぎょうをするときはぐんてをはめます。", en: "工作時要戴上棉手套。" }] },
  { id: "v_h_danbooru", word: "段ボール", furigana: "だんぼーる", romaji: "danbooru", meaning: "瓦楞紙箱", level: "N4", category: "housing_space",
    sentences: [{ ja: "スーパーで空の段ボールをもらいました。", furigana: "すーぱーでからのだんぼーるをもらいました。", en: "在超市拿了空的紙箱。" }] },
  { id: "v_h_kessokubando", word: "結束バンド", furigana: "けっそくばんど", romaji: "kessokubando", meaning: "束線帶 / 束帶", level: "N3", category: "housing_space",
    sentences: [{ ja: "ケーブルを結束バンドでまとめます。", furigana: "けーぶるをけっそくばんどでまとめます。", en: "用束線帶把電線綁起來。" }] },
  { id: "v_h_roopu", word: "ロープ", furigana: "ろーぷ", romaji: "roopu", meaning: "繩索", level: "N4", category: "housing_space",
    sentences: [{ ja: "荷物をロープでしっかり縛ります。", furigana: "にもつをろーぷでしっかりしばります。", en: "用繩索把貨物綁緊。" }] },
  { id: "v_h_daisha", word: "台車", furigana: "だいしゃ", romaji: "daisha", meaning: "手推車 / 拖車", level: "N3", category: "housing_space",
    sentences: [{ ja: "重い荷物は台車で運びます。", furigana: "おもいにもつはだいしゃではこびます。", en: "重物用手推車搬運。" }] },
  { id: "v_h_diy", word: "DIY", furigana: "でぃーあいわい", romaji: "diiaiwai", meaning: "DIY (自己動手做)", level: "N5", category: "housing_space",
    sentences: [{ ja: "最近はDIYで家具を作るのが人気です。", furigana: "さいきんはでぃーあいわいでかぐをつくるのがにんきです。", en: "最近自己動手做家具很受歡迎。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt12.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 12 - Hardware Store) to data_n5.js!');
