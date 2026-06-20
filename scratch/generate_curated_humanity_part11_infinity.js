const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const infinityWords = [
  // ================= 看護行政・法規・安全 (Admin, Law & Safety) =================
  { id: "v_shuhigimu", word: "守秘義務", furigana: "しゅひぎむ", romaji: "shuhigimu", meaning: "保密義務", level: "N5", category: "health_medical",
    sentences: [{ ja: "医療従事者には患者の個人情報を守る守秘義務があります。", furigana: "いりょうじゅうじしゃにはかんじゃのこじんじょうほうをまもるしゅひぎむがあります。", en: "醫療從業人員有保護病患個人資訊的保密義務。" }] },
  { id: "v_hiyarihatto", word: "ヒヤリハット", furigana: "ひやりはっと", romaji: "hiyarihatto", meaning: "Near-miss (異常事件未遂)", level: "N5", category: "health_medical",
    sentences: [{ ja: "事故を未然に防ぐため、ヒヤリハット報告を徹底します。", furigana: "じこをみぜんにふせぐため、ひやりはっとほうこくをてっていします。", en: "為了防範事故於未然，徹底執行Near-miss報告。" }] },
  { id: "v_rinri_iinkai", word: "倫理委員会", furigana: "りんりいいんかい", romaji: "rinri_iinkai", meaning: "倫理委員會", level: "N5", category: "health_medical",
    sentences: [{ ja: "新しい治療法は倫理委員会の承認が必要です。", furigana: "あたらしいちりょうほうはりんりいいんかいのしょうにんがひつようです。", en: "新的治療方法需要倫理委員會的批准。" }] },

  // ================= 公衆衛生・指標 (Public Health & Indices) =================
  { id: "v_qol", word: "QOL", furigana: "きゅーおーえる", romaji: "kyu-o-eru", meaning: "生活品質 (Quality of Life)", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者のQOL（生活の質）を維持することが治療の目的です。", furigana: "かんじゃのきゅーおーえるをいじすることがちりょうのもくてきです。", en: "維持病患的生活品質是治療的目的。" }] },
  { id: "v_adl", word: "ADL", furigana: "えーでぃーえる", romaji: "e-di-eru", meaning: "日常生活活動 (Activities of Daily Living)", level: "N5", category: "health_medical",
    sentences: [{ ja: "リハビリによってADL（日常生活動作）の向上を目指します。", furigana: "りはびりによってえーでぃーえるのこうじょうをめざします。", en: "透過復健以提升日常生活活動能力為目標。" }] },
  { id: "v_hokensho", word: "保健所", furigana: "ほけんじょ", romaji: "hokensho", meaning: "衛生所 (保健所)", level: "N5", category: "health_medical",
    sentences: [{ ja: "感染症の発生状況を保健所に報告します。", furigana: "かんせんしょうのはっせいじょうきょうをほけんじょにほうこくします。", en: "將傳染病的發生狀況通報給衛生所。" }] },
  { id: "v_yobouigaku", word: "予防医学", furigana: "よぼういがく", romaji: "yobouigaku", meaning: "預防醫學", level: "N5", category: "health_medical",
    sentences: [{ ja: "病気にならないための予防医学が注目されています。", furigana: "びょうきにならないためのよぼういがくがちゅうもくされています。", en: "不讓人生病的預防醫學正受到矚目。" }] },
  { id: "v_sukuriiningu", word: "スクリーニング", furigana: "すくりーにんぐ", romaji: "sukuriiningu", meaning: "篩檢 (Screening)", level: "N5", category: "health_medical",
    sentences: [{ ja: "がんの早期発見のためにスクリーニング検査を行います。", furigana: "がんのそうきはっけんのためにすくりーにんぐけんさをおこないます。", en: "為了早期發現癌症進行篩檢。" }] },

  // ================= ケア用品・ストーマ (Care Tools & Stoma) =================
  { id: "v_kurumaisu", word: "車椅子", furigana: "くるまいす", romaji: "kurumaisu", meaning: "輪椅", level: "N5", category: "health_medical",
    sentences: [{ ja: "車椅子からベッドへの移乗を介助します。", furigana: "くるまいすからべっどへのいじょうをかいじょします。", en: "協助病患從輪椅轉位到床上。" }] },
  { id: "v_hokouki", word: "歩行器", furigana: "ほこうき", romaji: "hokouki", meaning: "助行器", level: "N5", category: "health_medical",
    sentences: [{ ja: "骨折の後は歩行器を使って歩く練習をします。", furigana: "こっせつのあとはほこうきをつかってあるくれんしゅうをします。", en: "骨折後使用助行器練習走路。" }] },
  { id: "v_sashikomibenki", word: "差し込み便器", furigana: "さしこみべんき", romaji: "sashikomibenki", meaning: "床上便盆", level: "N5", category: "health_medical",
    sentences: [{ ja: "ベッド上で排泄するため、差し込み便器を使用します。", furigana: "べっどじょうではいせつするため、さしこみべんきをしようします。", en: "因為要在床上排泄，所以使用床上便盆。" }] },
  { id: "v_sutooma", word: "ストーマ", furigana: "すとーま", romaji: "sutooma", meaning: "造口 (人工肛門/人工膀胱)", level: "N5", category: "health_medical",
    sentences: [{ ja: "ストーマ（人工肛門）のケア方法を指導します。", furigana: "すとーまのけあほうほうをしどうします。", en: "指導造口（人工肛門）的護理方法。" }] },

  // ================= 神経精神症状 (Neuro/Psych Symptoms) =================
  { id: "v_shitsugoshou", word: "失語症", furigana: "しつごしょう", romaji: "shitsugoshou", meaning: "失語症", level: "N5", category: "health_medical",
    sentences: [{ ja: "脳梗塞の後遺症で失語症になりました。", furigana: "のうこうそくのこういしょうでしつごしょうになりました。", en: "因為腦梗塞的後遺症得了失語症。" }] },
  { id: "v_engeshougai", word: "嚥下障害", furigana: "えんげしょうがい", romaji: "engeshougai", meaning: "吞嚥困難 (嚥下障礙)", level: "N5", category: "health_medical",
    sentences: [{ ja: "嚥下障害があるため、食事はペースト状にします。", furigana: "えんげしょうがいがあるため、しょくじはぺーすとじょうにします。", en: "因為有吞嚥困難，所以將食物打成泥狀。" }] },
  { id: "v_hanshinmahi", word: "半身麻痺", furigana: "はんしんまひ", romaji: "hanshinmahi", meaning: "半身麻痺 (偏癱)", level: "N5", category: "health_medical",
    sentences: [{ ja: "右半身麻痺のため、左手を使って食事をします。", furigana: "みぎはんしんまひのため、ひだりてをつかってしょくじをします。", en: "因為右半身麻痺，所以用左手吃飯。" }] },
  { id: "v_senmou", word: "せん妄", furigana: "せんもう", romaji: "senmou", meaning: "譫妄", level: "N5", category: "psychology_character",
    sentences: [{ ja: "手術後、高齢の患者にせん妄の症状が現れました。", furigana: "しゅじゅつご、こうれいのかんじゃにせんもうのしょうじょうがあらわれました。", en: "手術後，高齡病患出現了譫妄的症狀。" }] },

  // ================= 詳細な筋肉解剖 (Detailed Muscles) =================
  { id: "v_souboukin", word: "僧帽筋", furigana: "そうぼうきん", romaji: "souboukin", meaning: "斜方肌", level: "N5", category: "body_physiology",
    sentences: [{ ja: "肩こりの主な原因は僧帽筋の緊張です。", furigana: "かたこりのおもなげんいんはそうぼうきんのきんちょうです。", en: "肩膀僵硬的主要原因是斜方肌緊繃。" }] },
  { id: "v_daikyoukin", word: "大胸筋", furigana: "だいきょうきん", romaji: "daikyoukin", meaning: "胸大肌", level: "N5", category: "body_physiology",
    sentences: [{ ja: "腕立て伏せで大胸筋を鍛えます。", furigana: "うでたてふせでだいきょうきんをきたえます。", en: "用伏地挺身來鍛鍊胸大肌。" }] },
  { id: "v_jouwannitoukin", word: "上腕二頭筋", furigana: "じょうわんにとうきん", romaji: "jouwannitoukin", meaning: "肱二頭肌", level: "N5", category: "body_physiology",
    sentences: [{ ja: "荷物を持ち上げる時に上腕二頭筋を使います。", furigana: "にもつをもちあげるじょうわんにとうきんをつかいます。", en: "搬起重物時會使用到肱二頭肌。" }] },
  { id: "v_akiresuken", word: "アキレス腱", furigana: "あきれすけん", romaji: "akiresuken", meaning: "阿基里斯腱 (跟腱)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "運動不足で急に走り、アキレス腱を断裂しました。", furigana: "うんどうぶそくできゅうにはしり、あきれすけんをだんれつしました。", en: "因為缺乏運動突然跑步，導致阿基里斯腱斷裂。" }] },

  // ================= 産婦人科・小児科 (OBGYN & Pediatrics Details) =================
  { id: "v_taiban", word: "胎盤", furigana: "たいばん", romaji: "taiban", meaning: "胎盤", level: "N5", category: "body_physiology",
    sentences: [{ ja: "赤ちゃんが生まれた後、胎盤が排出されます。", furigana: "あかちゃんがうまれたあと、たいばんがはいしゅつされます。", en: "嬰兒出生後，胎盤會被排出。" }] },
  { id: "v_saitai", word: "臍帯", furigana: "さいたい", romaji: "saitai", meaning: "臍帶", level: "N5", category: "body_physiology",
    sentences: [{ ja: "臍帯（へその緒）を通して栄養が送られます。", furigana: "さいたい（へそのお）をとおしてえいようがおくられます。", en: "透過臍帶輸送營養。" }] },
  { id: "v_yousui", word: "羊水", furigana: "ようすい", romaji: "yousui", meaning: "羊水", level: "N5", category: "body_physiology",
    sentences: [{ ja: "胎児は羊水の中で守られながら成長します。", furigana: "たいじはようすいのなかでまもられながらせいちょうします。", en: "胎兒在羊水中受到保護並成長。" }] },
  { id: "v_akuro", word: "悪露", furigana: "おろ", romaji: "akuro", meaning: "惡露", level: "N5", category: "health_medical",
    sentences: [{ ja: "出産後数週間は悪露（おろ）が続きます。", furigana: "しゅっさんごすうしゅうかんはおろがつづきます。", en: "生產後幾週內會持續排出惡露。" }] },
  { id: "v_einsekkai", word: "会陰切開", furigana: "えいんせっかい", romaji: "einsekkai", meaning: "會陰切開術", level: "N5", category: "health_medical",
    sentences: [{ ja: "スムーズな分娩のために会陰切開を行いました。", furigana: "すむーずなぶんべんのためにえいんせっかいをおこないました。", en: "為了順利分娩進行了會陰切開術。" }] },
  { id: "v_toppatsuseihosshin", word: "突発性発疹", furigana: "とっぱつせいはっしん", romaji: "toppatsuseihosshin", meaning: "玫瑰疹 (嬰兒急疹)", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱が下がった後、体に突発性発疹が出ました。", furigana: "ねつがさがったあと、からだにとっぱつせいはっしんがでました。", en: "退燒後，身體出現了玫瑰疹。" }] },

  // ================= 医療略語 (Medical Acronyms/Indicators) =================
  { id: "v_hba1c", word: "HbA1c", furigana: "へもぐろびんえーわんしー", romaji: "hba1c", meaning: "糖化血色素", level: "N5", category: "health_medical",
    sentences: [{ ja: "糖尿病のコントロール指標としてHbA1cを見ます。", furigana: "とうにょうびょうのこんとろーるしひょうとしてへもぐろびんえーわんしーをみます。", en: "將糖化血色素作為糖尿病控制的指標來看。" }] },
  { id: "v_gcs", word: "GCS", furigana: "じーしーえす", romaji: "gcs", meaning: "格拉斯哥昏迷指數", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者の意識レベルをGCSで評価します。", furigana: "かんじゃのいしきれべるをじーしーえすでひょうかします。", en: "用GCS評估病患的意識等級。" }] },
  { id: "v_bmi", word: "BMI", furigana: "びーえむあい", romaji: "bmi", meaning: "身體質量指數 (BMI)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "BMIが25を超えると肥満と判定されます。", furigana: "びーえむあいがにじゅうごをこえるとひまんはんていされます。", en: "BMI超過25就會被判定為肥胖。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(infinityWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', infinityWords.length, 'infinity medical words to data_n5.js!');
