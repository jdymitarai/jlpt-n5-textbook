const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const omegaWords = [
  // ================= 生化学・栄養学 (Biochemistry & Nutrition) =================
  { id: "v_tanpakushitsu", word: "タンパク質", furigana: "たんぱくしつ", romaji: "tanpakushitsu", meaning: "蛋白質", level: "N5", category: "body_physiology",
    sentences: [{ ja: "筋肉を作るためにはタンパク質が必要です。", furigana: "きんにくをつくるためにはたんぱくしつがひつようです。", en: "為了增長肌肉需要蛋白質。" }] },
  { id: "v_tansuikabutsu", word: "炭水化物", furigana: "たんすいかぶつ", romaji: "tansuikabutsu", meaning: "碳水化合物", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脳のエネルギー源は炭水化物です。", furigana: "のうのえねるぎーげんはたんすいかぶつです。", en: "大腦的能量來源是碳水化合物。" }] },
  { id: "v_shishitsu", word: "脂質", furigana: "ししつ", romaji: "shishitsu", meaning: "脂質 (脂肪)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脂質の摂りすぎは肥満の原因になります。", furigana: "ししつのとりすぎはひまんのげんいんになります。", en: "攝取過多脂質會成為肥胖的原因。" }] },
  { id: "v_bitamin", word: "ビタミン", furigana: "びたみん", romaji: "bitamin", meaning: "維生素 (維他命)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "風邪の予防にビタミンCを摂ります。", furigana: "かぜのよぼうにびたみんしーをとります。", en: "為了預防感冒攝取維他命C。" }] },
  { id: "v_mineraru", word: "ミネラル", furigana: "みねらる", romaji: "mineraru", meaning: "礦物質", level: "N5", category: "body_physiology",
    sentences: [{ ja: "鉄やカルシウムは重要なミネラルです。", furigana: "てつやかるしうむはじゅうようなみねらるです。", en: "鐵和鈣是重要的礦物質。" }] },
  { id: "v_hissuamino", word: "必須アミノ酸", furigana: "ひっすあみのさん", romaji: "hissuaminosan", meaning: "必需胺基酸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "必須アミノ酸は体内で作ることができません。", furigana: "ひっすあみのさんはたいないでつくることができません。", en: "必需胺基酸無法在體內製造。" }] },
  { id: "v_shokumotsuseni", word: "食物繊維", furigana: "しょくもつせんい", romaji: "shokumotsuseni", meaning: "膳食纖維", level: "N5", category: "body_physiology",
    sentences: [{ ja: "便秘解消のために食物繊維を多く食べます。", furigana: "べんぴかいしょうのためにしょくもつせんいをおおくたべます。", en: "為了消除便秘而多吃膳食纖維。" }] },

  // ================= 特殊検査・診断 (Specialized Tests) =================
  { id: "v_naishikyou", word: "内視鏡", furigana: "ないしきょう", romaji: "naishikyou", meaning: "內視鏡", level: "N5", category: "health_medical",
    sentences: [{ ja: "胃の内視鏡検査を定期的に受けます。", furigana: "いのないしきょうけんさをていきてきにうけます。", en: "定期接受胃部內視鏡檢查。" }] },
  { id: "v_seiken", word: "生検", furigana: "せいけん", romaji: "seiken", meaning: "切片檢查 (Biopsy)", level: "N5", category: "health_medical",
    sentences: [{ ja: "腫瘍の一部を切り取って生検に出します。", furigana: "しゅようのいちぶをきりとってせいけんにだします。", en: "切下腫瘤的一部分送去做切片檢查。" }] },
  { id: "v_zuiekikensa", word: "髄液検査", furigana: "ずいえきけんさ", romaji: "zuiekikensa", meaning: "腦脊髓液檢查 (腰椎穿刺)", level: "N5", category: "health_medical",
    sentences: [{ ja: "髄膜炎の診断のために髄液検査を行います。", furigana: "ずいまくえんのしんだんのためにずいえきけんさをおこないます。", en: "為了診斷腦膜炎而進行腦脊髓液檢查。" }] },
  { id: "v_kotsuzuizenshi", word: "骨髄穿刺", furigana: "こつずいせんし", romaji: "kotsuzuizenshi", meaning: "骨髓穿刺", level: "N5", category: "health_medical",
    sentences: [{ ja: "白血病を調べるために骨髄穿刺（マルク）をします。", furigana: "はっけつびょうをしらべるためにこつずいせんしをします。", en: "為了檢查白血病進行骨髓穿刺。" }] },
  { id: "v_manmogurafi", word: "マンモグラフィ", furigana: "まんもぐらふぃ", romaji: "manmogurafi", meaning: "乳房攝影", level: "N5", category: "health_medical",
    sentences: [{ ja: "乳がん検診でマンモグラフィを受けました。", furigana: "にゅうがんけんしんでまんもぐらふぃをうけました。", en: "在乳癌篩檢中接受了乳房攝影。" }] },
  { id: "v_pet_kensa", word: "PET検査", furigana: "ぺっとけんさ", romaji: "petto_kensa", meaning: "正子造影檢查 (PET)", level: "N5", category: "health_medical",
    sentences: [{ ja: "がんの転移がないかPET検査で調べます。", furigana: "がんのてんいがないかぺっとけんさでしらべます。", en: "用PET檢查來確認癌症是否有轉移。" }] },

  // ================= 細微臨床体候 (Micro-Symptoms & Signs) =================
  { id: "v_hinmyaku", word: "頻脈", furigana: "ひんみゃく", romaji: "hinmyaku", meaning: "心搏過速 (心跳過快)", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱があるため頻脈になっています。", furigana: "ねつがあるためひんみゃくになっています。", en: "因為發燒導致心跳過快。" }] },
  { id: "v_jomyaku", word: "徐脈", furigana: "じょみゃく", romaji: "jomyaku", meaning: "心搏過緩 (心跳過慢)", level: "N5", category: "health_medical",
    sentences: [{ ja: "スポーツ選手は安静時に徐脈になることが多いです。", furigana: "すぽーつせんしゅはあんせいじにじょみゃくになることが多いです。", en: "運動員在安靜時常常會出現心跳過慢的情況。" }] },
  { id: "v_zenmei", word: "喘鳴", furigana: "ぜんめい", romaji: "zenmei", meaning: "喘鳴 (呼吸出現咻咻聲)", level: "N5", category: "health_medical",
    sentences: [{ ja: "呼吸をするたびにヒューヒューという喘鳴が聞こえます。", furigana: "こきゅうをするたびにひゅーひゅーというぜんめいがきこえます。", en: "每次呼吸都會聽到咻咻的喘鳴聲。" }] },
  { id: "v_sasei", word: "嗄声", furigana: "させい", romaji: "sasei", meaning: "聲音沙啞", level: "N5", category: "health_medical",
    sentences: [{ ja: "風邪をひいて嗄声（声がれ）になりました。", furigana: "かぜをひいてさせいになりました。", en: "因為感冒聲音變得沙啞了。" }] },
  { id: "v_hinnyou", word: "頻尿", furigana: "ひんにょう", romaji: "hinnyou", meaning: "頻尿", level: "N5", category: "health_medical",
    sentences: [{ ja: "膀胱炎になると頻尿の症状が出ます。", furigana: "ぼうこうえんになるとひんにょうのしょうじょうがでます。", en: "得了膀胱炎就會出現頻尿的症狀。" }] },
  { id: "v_bounyou", word: "乏尿", furigana: "ぼうにょう", romaji: "bounyou", meaning: "少尿 (乏尿)", level: "N5", category: "health_medical",
    sentences: [{ ja: "腎機能が落ちて乏尿になっています。", furigana: "じんきのうがおちてぼうにょうになっています。", en: "腎功能下降導致排尿量減少。" }] },
  { id: "v_ketsunyou", word: "血尿", furigana: "けつにょう", romaji: "ketsunyou", meaning: "血尿", level: "N5", category: "health_medical",
    sentences: [{ ja: "尿に血が混じる血尿が見られました。", furigana: "にょうにちがまじるけつにょうがみられました。", en: "觀察到了尿中帶血的血尿。" }] },
  { id: "v_kakketsu", word: "喀血", furigana: "かっけつ", romaji: "kakketsu", meaning: "咳血", level: "N5", category: "health_medical",
    sentences: [{ ja: "激しい咳とともに喀血しました。", furigana: "はげしいせきとともにかっけつしました。", en: "伴隨劇烈的咳嗽咳出了血。" }] },
  { id: "v_toketsu", word: "吐血", furigana: "とけつ", romaji: "toketsu", meaning: "吐血", level: "N5", category: "health_medical",
    sentences: [{ ja: "胃潰瘍が破れて大量に吐血しました。", furigana: "いかいようがやぶれてたいりょうにとけつしました。", en: "胃潰瘍破裂導致大量吐血。" }] },
  { id: "v_geketsu", word: "下血", furigana: "げけつ", romaji: "geketsu", meaning: "便血 (下血)", level: "N5", category: "health_medical",
    sentences: [{ ja: "黒いタール状の下血が続きます。", furigana: "くろいたーるじょうのげけつがつづきます。", en: "持續排出黑色焦油狀的便血。" }] },

  // ================= 重大疾患・臓器不全 (Critical Illnesses) =================
  { id: "v_anafirakishii", word: "アナフィラキシー", furigana: "あなふぃらきしー", romaji: "anafirakishii", meaning: "過敏性休克", level: "N5", category: "health_medical",
    sentences: [{ ja: "蜂に刺されてアナフィラキシーショックを起こしました。", furigana: "はちにさされてあなふぃらきしーしょっくをおこしました。", en: "被蜜蜂螫到引發了過敏性休克。" }] },
  { id: "v_kankouhen", word: "肝硬変", furigana: "かんこうへん", romaji: "kankouhen", meaning: "肝硬化", level: "N5", category: "health_medical",
    sentences: [{ ja: "慢性肝炎が進行して肝硬変になりました。", furigana: "まんせいかんえんがしんこうしてかんこうへんになりました。", en: "慢性肝炎惡化變成了肝硬化。" }] },
  { id: "v_jinhuzen", word: "腎不全", furigana: "じんふぜん", romaji: "jinhuzen", meaning: "腎衰竭", level: "N5", category: "health_medical",
    sentences: [{ ja: "慢性腎不全のため人工透析が必要です。", furigana: "まんせいじんふぜんのためじんこうとうせきがひつようです。", en: "因為慢性腎衰竭需要進行人工洗腎。" }] },
  { id: "v_hakketsubyou", word: "白血病", furigana: "はっけつびょう", romaji: "hakketsubyou", meaning: "白血病 (血癌)", level: "N5", category: "health_medical",
    sentences: [{ ja: "急性白血病の治療で骨髄移植を受けます。", furigana: "きゅうせいはっけつびょうのちりょうでこつずいいしょくをうけます。", en: "因為治療急性白血病而接受骨髓移植。" }] },
  { id: "v_haikishu", word: "肺気腫", furigana: "はいきしゅ", romaji: "haikishu", meaning: "肺氣腫", level: "N5", category: "health_medical",
    sentences: [{ ja: "長年の喫煙が原因で肺気腫になりました。", furigana: "ながねんのきつえんがげんいんではいきしゅになりました。", en: "長年吸菸導致得了肺氣腫。" }] },

  // ================= 特殊病棟・東洋医学 (Specialized Wards & Kampo) =================
  { id: "v_nicu", word: "NICU", furigana: "えぬあいしーゆー", romaji: "enu-ai-shi-yu-", meaning: "新生兒加護病房", level: "N5", category: "health_medical",
    sentences: [{ ja: "早産で生まれた赤ちゃんがNICUに入院しています。", furigana: "そうざんでうまれたあかちゃんがえぬあいしーゆーににゅういんしています。", en: "早產出生的嬰兒住進了NICU。" }] },
  { id: "v_ccu", word: "CCU", furigana: "しーしーゆー", romaji: "shi-shi-yu-", meaning: "心臟血管加護病房", level: "N5", category: "health_medical",
    sentences: [{ ja: "心筋梗塞の患者をCCUで厳重に管理します。", furigana: "しんきんこうそくのかんじゃをしーしーゆーでげんじゅうにかんりします。", en: "將心肌梗塞的病患在CCU進行嚴密管理。" }] },
  { id: "v_hosupisu", word: "ホスピス", furigana: "ほすぴす", romaji: "hosupisu", meaning: "安寧療護院 (Hospice)", level: "N5", category: "health_medical",
    sentences: [{ ja: "余命宣告を受け、ホスピスへ移ることを決めました。", furigana: "よめいせんこくをうけ、ほすぴすへうつることをきめました。", en: "被宣告了剩餘壽命，決定轉移到安寧療護院。" }] },
  { id: "v_kanpouyaku", word: "漢方薬", furigana: "かんぽうやく", romaji: "kanpouyaku", meaning: "中藥 (漢方藥)", level: "N5", category: "health_medical",
    sentences: [{ ja: "体質改善のために漢方薬を飲んでいます。", furigana: "たいしつかいぜんのためにかんぽうやくをのんでいます。", en: "為了改善體質正在服用中藥。" }] },
  { id: "v_shinkyuu", word: "鍼灸", furigana: "しんきゅう", romaji: "shinkyuu", meaning: "針灸", level: "N5", category: "health_medical",
    sentences: [{ ja: "腰痛の治療で鍼灸院に通っています。", furigana: "ようつうのちりょうでしんきゅういんにかよっています。", en: "為了治療腰痛正在去針灸診所。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(omegaWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', omegaWords.length, 'omega medical words to data_n5.js!');
