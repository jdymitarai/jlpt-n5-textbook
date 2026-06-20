const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const nationalExamWords = [
  // 1. 基礎看護學 (Basic Nursing & Positions)
  { id: "v_taihenkan", word: "体位変換", furigana: "たいいへんかん", romaji: "taiihenkan", meaning: "翻身、變換體位", level: "N5", category: "health_medical",
    sentences: [{ ja: "褥瘡を防ぐため、2時間ごとに体位変換を行います。", furigana: "じょくそうをふせぐため、にじかんごとにたいいへんかんをおこないます。", en: "為了預防壓瘡，每2小時進行一次翻身。" }] },
  { id: "v_gyougai", word: "仰臥位", furigana: "ぎょうがい", romaji: "gyougai", meaning: "仰臥位 (平躺)", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者をベッドに仰臥位で寝かせます。", furigana: "かんじゃをべっどにぎょうがいでねかせます。", en: "讓病患以仰臥位躺在床上。" }] },
  { id: "v_sokugai", word: "側臥位", furigana: "そくがい", romaji: "sokugai", meaning: "側臥位 (側躺)", level: "N5", category: "health_medical",
    sentences: [{ ja: "右側臥位の姿勢をとってください。", furigana: "みぎそくがいのしせいをとってください。", en: "請採取右側臥位的姿勢。" }] },
  { id: "v_seishiki", word: "清拭", furigana: "せいしき", romaji: "seishiki", meaning: "擦澡", level: "N5", category: "health_medical",
    sentences: [{ ja: "温かいタオルで全身の清拭をします。", furigana: "あたたかいたおるでぜんしんのせいしきをします。", en: "用溫毛巾進行全身擦澡。" }] },
  { id: "v_nyuuyokukaijo", word: "入浴介助", furigana: "にゅうよくかいじょ", romaji: "nyuuyokukaijo", meaning: "洗澡協助", level: "N5", category: "health_medical",
    sentences: [{ ja: "午後は患者さんの入浴介助に入ります。", furigana: "ごごはかんじゃさんのにゅうよくかいじょにはいります。", en: "下午要協助病患洗澡。" }] },
  { id: "v_haisetsukaijo", word: "排泄介助", furigana: "はいせつかいじょ", romaji: "haisetsukaijo", meaning: "排泄協助 (如廁協助)", level: "N5", category: "health_medical",
    sentences: [{ ja: "トイレでの排泄介助を行います。", furigana: "といれでのはいせつかいじょをおこないます。", en: "在廁所進行排泄協助。" }] },
  { id: "v_enge", word: "嚥下", furigana: "えんげ", romaji: "enge", meaning: "吞嚥", level: "N5", category: "health_medical",
    sentences: [{ ja: "加齢により嚥下機能が低下します。", furigana: "かれいによりえんげきのうがていかします。", en: "隨著年齡增長，吞嚥功能會下降。" }] },
  { id: "v_goen", word: "誤嚥", furigana: "ごえん", romaji: "goen", meaning: "誤嚥 (吸入性嗆咳)", level: "N5", category: "health_medical",
    sentences: [{ ja: "誤嚥性肺炎を予防するためにとろみをつけます。", furigana: "ごえんせいはいえんをよぼうするためにとろみをつけます。", en: "為了預防吸入性肺炎，在食物中加入增稠劑。" }] },
  { id: "v_jokusou", word: "褥瘡", furigana: "じょくそう", romaji: "jokusou", meaning: "壓瘡 (褥瘡)", level: "N5", category: "health_medical",
    sentences: [{ ja: "仙骨部に褥瘡ができています。", furigana: "せんこつぶにじょくそうができています。", en: "薦骨部位出現了壓瘡。" }] },

  // 2. 老年與精神看護學 (Geriatric / Psychiatric)
  { id: "v_ninchishou", word: "認知症", furigana: "にんちしょう", romaji: "ninchishou", meaning: "失智症 (認知症)", level: "N5", category: "health_medical",
    sentences: [{ ja: "祖母はアルツハイマー型認知症と診断されました。", furigana: "そぼはあるつはいまーがたにんちしょうとしんだんされました。", en: "祖母被診斷為阿茲海默型失智症。" }] },
  { id: "v_haikai", word: "徘徊", furigana: "はいかい", romaji: "haikai", meaning: "徘徊 (遊走)", level: "N5", category: "health_medical",
    sentences: [{ ja: "夜間の徘徊に注意して見守ります。", furigana: "やかんのはいかいにちゅういして見守ります。", en: "注意並看顧夜間的徘徊行為。" }] },
  { id: "v_genkaku", word: "幻覚", furigana: "げんかく", romaji: "genkaku", meaning: "幻覺", level: "N5", category: "psychology_character",
    sentences: [{ ja: "患者は虫が見えるという幻覚を訴えています。", furigana: "かんじゃはむしがみえるというげんかくをうったえています。", en: "病患主訴有看到蟲子的幻覺。" }] },
  { id: "v_mousou", word: "妄想", furigana: "もうそう", romaji: "mousou", meaning: "妄想", level: "N5", category: "psychology_character",
    sentences: [{ ja: "被害妄想が強く、薬を飲むのを拒否します。", furigana: "ひがいもうそうがつよく、くすりをのむのをきょひします。", en: "被害妄想強烈，拒絕服藥。" }] },
  { id: "v_utsubyou", word: "うつ病", furigana: "うつびょう", romaji: "utsubyou", meaning: "憂鬱症", level: "N5", category: "psychology_character",
    sentences: [{ ja: "仕事のストレスでうつ病を発症しました。", furigana: "しごとのすとれすでうつびょうをはっしょうしました。", en: "因為工作壓力引發了憂鬱症。" }] },

  // 3. 藥理與特殊治療 (Pharmacology / Treatment)
  { id: "v_naifuku", word: "内服", furigana: "ないふく", romaji: "naifuku", meaning: "內服 (口服藥)", level: "N5", category: "health_medical",
    sentences: [{ ja: "食後にこの薬を内服してください。", furigana: "しょくごにこのくすりをないふくしてください。", en: "請在飯後服用此藥。" }] },
  { id: "v_joumyakunai", word: "静脈内注射", furigana: "じょうみゃくないちゅうしゃ", romaji: "joumyakunaichuusha", meaning: "靜脈內注射", level: "N5", category: "health_medical",
    sentences: [{ ja: "抗生物質を静脈内注射で投与します。", furigana: "こうせいぶっしつをじょうみゃくないちゅうしゃでとうよします。", en: "以靜脈內注射的方式給予抗生素。" }] },
  { id: "v_yueki", word: "輸液", furigana: "ゆえき", romaji: "yueki", meaning: "輸液 (打點滴補充水分)", level: "N5", category: "health_medical",
    sentences: [{ ja: "脱水症状があるため輸液を行います。", furigana: "だっすいしょうじょうがあるためゆえきをおこないます。", en: "因為有脫水症狀所以進行輸液。" }] },
  { id: "v_keikaneiyou", word: "経管栄養", furigana: "けいかんえいよう", romaji: "keikaneiyou", meaning: "管灌營養", level: "N5", category: "health_medical",
    sentences: [{ ja: "胃瘻（いろう）から経管栄養を注入します。", furigana: "いろうからけいかんえいようをちゅうにゅうします。", en: "透過胃造口注入管灌營養。" }] },
  { id: "v_kettouchi", word: "血糖値", furigana: "けっとうち", romaji: "kettouchi", meaning: "血糖值", level: "N5", category: "body_physiology",
    sentences: [{ ja: "食前に血糖値を測定します。", furigana: "しょくぜんにけっとうちをそくていします。", en: "在飯前測量血糖值。" }] },
  { id: "v_shindenzu", word: "心電図", furigana: "しんでんず", romaji: "shindenzu", meaning: "心電圖", level: "N5", category: "health_medical",
    sentences: [{ ja: "健康診断で心電図をとります。", furigana: "けんこうしんだんでしんでんずをとります。", en: "在健康檢查中做心電圖。" }] },
  { id: "v_ketsuekitouseki", word: "血液透析", furigana: "けつえきとうせき", romaji: "ketsuekitouseki", meaning: "血液透析 (洗腎)", level: "N5", category: "health_medical",
    sentences: [{ ja: "週に3回、血液透析に通っています。", furigana: "しゅうにさんかい、けつえきとうせきにかよっています。", en: "一週三次前往進行血液透析。" }] },

  // 4. 母性與小兒看護 (Maternal / Pediatric)
  { id: "v_ninshin", word: "妊娠", furigana: "にんしん", romaji: "ninshin", meaning: "懷孕", level: "N5", category: "body_physiology",
    sentences: [{ ja: "現在、妊娠5ヶ月です。", furigana: "げんざい、にんしんごかげつです。", en: "目前懷孕5個月。" }] },
  { id: "v_shussan", word: "出産", furigana: "しゅっさん", romaji: "shussan", meaning: "生產、分娩", level: "N5", category: "body_physiology",
    sentences: [{ ja: "初めての出産で不安です。", furigana: "はじめてのしゅっさんでふあんです。", en: "因為是第一次生產感到不安。" }] },
  { id: "v_taiji", word: "胎児", furigana: "たいじ", romaji: "taiji", meaning: "胎兒", level: "N5", category: "body_physiology",
    sentences: [{ ja: "エコーで胎児の心音を確認します。", furigana: "えこーでたいじのしんおんをかくにんします。", en: "用超音波確認胎兒的心音。" }] },
  { id: "v_shinseiji", word: "新生児", furigana: "しんせいじ", romaji: "shinseiji", meaning: "新生兒", level: "N5", category: "body_physiology",
    sentences: [{ ja: "新生児室で赤ちゃんをケアします。", furigana: "しんせいじしつであかちゃんをけあします。", en: "在新生兒室照顧嬰兒。" }] },
  { id: "v_yobousesshu", word: "予防接種", furigana: "よぼうせっしゅ", romaji: "yobousesshu", meaning: "預防接種 (打疫苗)", level: "N5", category: "health_medical",
    sentences: [{ ja: "インフルエンザの予防接種を受けました。", furigana: "いんふるえんざのよぼうせっしゅをうけました。", en: "接種了流感疫苗。" }] },

  // 5. 感染對策與救急 (Infection Control & Emergency)
  { id: "v_innaikansen", word: "院内感染", furigana: "いんないかんせん", romaji: "innaikansen", meaning: "院內感染", level: "N5", category: "health_medical",
    sentences: [{ ja: "手洗いは院内感染を防ぐ基本です。", furigana: "てあらいはいんないかんせんをふせぐきほんです。", en: "洗手是防止院內感染的基礎。" }] },
  { id: "v_hyoujunyobou", word: "標準予防策", furigana: "ひょうじゅんよぼうさく", romaji: "hyoujunyobousaku", meaning: "標準防護措施 (Standard Precautions)", level: "N5", category: "health_medical",
    sentences: [{ ja: "すべての患者に対して標準予防策を実施します。", furigana: "すべてのかんじゃにたいしてひょうじゅんよぼうさくをじっしします。", en: "對所有病患實施標準防護措施。" }] },
  { id: "v_himatsukansen", word: "飛沫感染", furigana: "ひまつかんせん", romaji: "himatsukansen", meaning: "飛沫感染", level: "N5", category: "health_medical",
    sentences: [{ ja: "咳やくしゃみによる飛沫感染に注意します。", furigana: "せきやくしゃみによるひまつかんせんにちゅういします。", en: "注意透過咳嗽或打噴嚏造成的飛沫感染。" }] },
  { id: "v_kuukikansen", word: "空気感染", furigana: "くうきかんせん", romaji: "kuukikansen", meaning: "空氣感染", level: "N5", category: "health_medical",
    sentences: [{ ja: "結核は空気感染する病気です。", furigana: "けっかくはくうきかんせんするびょうきです。", en: "結核病是透過空氣感染的疾病。" }] },
  { id: "v_sesshokukansen", word: "接触感染", furigana: "せっしょくかんせん", romaji: "sesshokukansen", meaning: "接觸感染", level: "N5", category: "health_medical",
    sentences: [{ ja: "ドアノブなどを介した接触感染を防ぎます。", furigana: "どあのぶなどをかいしたせっしょくかんせんをふせぎます。", en: "防止透過門把等媒介的接觸感染。" }] },
  { id: "v_shinpaisosei", word: "心肺蘇生", furigana: "しんぱいそせい", romaji: "shinpaisosei", meaning: "心肺復甦術 (CPR)", level: "N5", category: "health_medical",
    sentences: [{ ja: "意識がない場合はすぐに心肺蘇生を開始します。", furigana: "いしきがないばあいはすぐにしんぱいそせいをかいしします。", en: "如果沒有意識，立刻開始心肺復甦術。" }] },

  // 6. 社會保障與在宅醫療 (Social Security & Home Care)
  { id: "v_kaigohoken", word: "介護保険", furigana: "かいごほけん", romaji: "kaigohoken", meaning: "長照保險 (看護保險)", level: "N5", category: "health_medical",
    sentences: [{ ja: "介護保険のサービスを利用して車椅子を借ります。", furigana: "かいごほけんのさーびすをりようしてくるまいすをかります。", en: "利用長照保險的服務租借輪椅。" }] },
  { id: "v_houmonkango", word: "訪問看護", furigana: "ほうもんかんご", romaji: "houmonkango", meaning: "居家護理 (訪問看護)", level: "N5", category: "health_medical",
    sentences: [{ ja: "週に一度、訪問看護師が家に来てくれます。", furigana: "しゅうにいちど、ほうもんかんごしがいえにきてくれます。", en: "一週一次，居家護理師會來到家裡。" }] },
  { id: "v_rihabiri", word: "リハビリ", furigana: "りはびり", romaji: "rihabiri", meaning: "復健 (Rehabilitation)", level: "N5", category: "health_medical",
    sentences: [{ ja: "歩けるようにリハビリを頑張っています。", furigana: "あるけるようにりはびりをがんばっています。", en: "為了能走路正在努力復健。" }] },

  // 7. 內分泌與恆定 (Endocrine & Homeostasis)
  { id: "v_horumon", word: "ホルモン", furigana: "ほるもん", romaji: "horumon", meaning: "賀爾蒙 (激素)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "甲状腺ホルモンのバランスが崩れています。", furigana: "こうじょうせんほるもんのばらんすがくずれています。", en: "甲狀腺賀爾蒙失去平衡。" }] },
  { id: "v_meneki", word: "免疫", furigana: "めんえき", romaji: "meneki", meaning: "免疫", level: "N5", category: "body_physiology",
    sentences: [{ ja: "睡眠不足は免疫を下げます。", furigana: "すいみんぶそくはめんえきをさげます。", en: "睡眠不足會降低免疫力。" }] },
  { id: "v_taisha", word: "代謝", furigana: "たいしゃ", romaji: "taisha", meaning: "代謝", level: "N5", category: "body_physiology",
    sentences: [{ ja: "年齢とともに基礎代謝が落ちます。", furigana: "ねんれいとともにきそたいしゃがおちます。", en: "基礎代謝會隨著年齡下降。" }] },
  { id: "v_koujousei", word: "恒常性", furigana: "こうじょうせい", romaji: "koujousei", meaning: "恆定性 (Homeostasis)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "体温を一定に保つのは恒常性の働きです。", furigana: "たいおんをいっていにたもつのはこうじょうせいのはたらきです。", en: "將體溫維持在一定溫度是恆定性的作用。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(nationalExamWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', nationalExamWords.length, 'National Exam words to data_n5.js!');
