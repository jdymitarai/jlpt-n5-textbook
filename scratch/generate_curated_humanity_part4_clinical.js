const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const clinicalWords = [
  // --- 醫學解剖等級：內部器官與組織 (body_physiology) ---
  {
    id: "vocab_nou",
    word: "脳",
    furigana: "のう",
    romaji: "nou",
    meaning: "大腦",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "脳のMRI検査を受けました。", furigana: "のうのMRIけんさけをうけました。", en: "接受了腦部的核磁共振檢查。" },
      { ja: "この病気は脳の神経に影響を与えます。", furigana: "このびょうきはのうのしんけいにえいきょうをあたえます。", en: "這種疾病會影響大腦神經。" }
    ]
  },
  {
    id: "vocab_shinzou",
    word: "心臓",
    furigana: "しんぞう",
    romaji: "shinzou",
    meaning: "心臟",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "心臓の鼓動が早くなっています。", furigana: "しんぞうのこどうがはやくなっています。", en: "心跳變得很快。" },
      { ja: "彼は心臓の手術を受けました。", furigana: "かれはしんぞうのしゅじゅつをうけました。", en: "他接受了心臟手術。" }
    ]
  },
  {
    id: "vocab_hai",
    word: "肺",
    furigana: "はい",
    romaji: "hai",
    meaning: "肺部",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "タバコは肺に悪いです。", furigana: "たばこははいにわるいです。", en: "抽菸對肺部不好。" },
      { ja: "レントゲンで肺の影を確認します。", furigana: "れんとげんではいのかげをかくにんします。", en: "用X光確認肺部的陰影。" }
    ]
  },
  {
    id: "vocab_kanzou",
    word: "肝臓",
    furigana: "かんぞう",
    romaji: "kanzou",
    meaning: "肝臟",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "お酒の飲み過ぎで肝臓を壊しました。", furigana: "おさけののみすぎでかんぞうをこわしました。", en: "因為飲酒過度把肝臟弄壞了。" },
      { ja: "肝臓の数値が高いです。", furigana: "かんぞうのすうちがたかいです。", en: "肝臟的指數偏高。" }
    ]
  },
  {
    id: "vocab_jinzou",
    word: "腎臓",
    furigana: "じんぞう",
    romaji: "jinzou",
    meaning: "腎臟",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "腎臓の機能が低下しています。", furigana: "じんぞうのきのうがていかしています。", en: "腎臟功能正在衰退。" },
      { ja: "塩分を控えて腎臓を休ませてください。", furigana: "えんぶんをひかえてじんぞうをやすませてください。", en: "請控制鹽分攝取，讓腎臟休息。" }
    ]
  },
  {
    id: "vocab_i",
    word: "胃",
    furigana: "い",
    romaji: "i",
    meaning: "胃部",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "ストレスで胃が痛いです。", furigana: "すとれすでいがいたいです。", en: "因為壓力大導致胃痛。" },
      { ja: "胃カメラの検査を予約しました。", furigana: "いかめらのけんさをよやくしました。", en: "預約了胃鏡檢查。" }
    ]
  },
  {
    id: "vocab_chou",
    word: "腸",
    furigana: "ちょう",
    romaji: "chou",
    meaning: "腸道 (包含大腸與小腸)",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "腸の調子を整える薬を出します。", furigana: "ちょうのちょうしをととのえるくすりをだします。", en: "我開一些調理腸胃的藥給您。" },
      { ja: "大腸がんのスクリーニング検査です。", furigana: "だいちょうがんのすくりーにんぐけんさです。", en: "這是大腸癌的篩檢。" }
    ]
  },
  {
    id: "vocab_kinniku",
    word: "筋肉",
    furigana: "きんにく",
    romaji: "kinniku",
    meaning: "肌肉",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "運動の後で筋肉が痛いです。", furigana: "うんどうのあとできんにくがいたいです。", en: "運動後肌肉很痛（肌肉痠痛）。" },
      { ja: "リハビリで筋肉を強化します。", furigana: "りはびりできんにくをきょうかします。", en: "透過復健來強化肌肉。" }
    ]
  },
  {
    id: "vocab_kekkan",
    word: "血管",
    furigana: "けっかん",
    romaji: "kekkan",
    meaning: "血管",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "血管が詰まる病気です。", furigana: "けっかんがつまるびょうきです。", en: "這是血管阻塞的疾病。" },
      { ja: "注射のために血管を探します。", furigana: "ちゅうしゃのためにけっかんをさがします。", en: "為了打針在尋找血管。" }
    ]
  },
  {
    id: "vocab_shinkei",
    word: "神経",
    furigana: "しんけい",
    romaji: "shinkei",
    meaning: "神經",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "虫歯が神経まで達しています。", furigana: "むしばがしんけいまでたっしています。", en: "蛀牙已經侵入到神經了。" },
      { ja: "自律神経の乱れが原因です。", furigana: "じりつしんけいのみだれがげんいんです。", en: "原因是自律神經失調。" }
    ]
  },
  {
    id: "vocab_saibou",
    word: "細胞",
    furigana: "さいぼう",
    romaji: "saibou",
    meaning: "細胞",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "がん細胞の増殖を抑える薬です。", furigana: "がんさいぼうのぞうしょくをおさえるくすりです。", en: "這是抑制癌細胞增生的藥物。" },
      { ja: "細胞の検査結果は一週間後に出ます。", furigana: "さいぼうのけんさけっかはいっしゅうかんごにでます。", en: "細胞學檢查結果一週後會出來。" }
    ]
  },
  {
    id: "vocab_sekizui",
    word: "脊髄",
    furigana: "せきずい",
    romaji: "sekizui",
    meaning: "脊髓",
    level: "N5",
    category: "body_physiology",
    sentences: [
      { ja: "事故で脊髄を損傷しました。", furigana: "じこでせきずいをそんしょうしました。", en: "在事故中損傷了脊髓。" },
      { ja: "脊髄から神経の束が出ています。", furigana: "せきずいからしんけいのたばがでています。", en: "神經束從脊髓延伸出來。" }
    ]
  },

  // --- 專業臨床醫療 (health_medical) ---
  {
    id: "vocab_shujutsu",
    word: "手術",
    furigana: "しゅじゅつ",
    romaji: "shujutsu",
    meaning: "手術、開刀",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "明日の朝、胃の手術をします。", furigana: "あしたのあさ、いのしゅじゅつをします。", en: "明天早上要進行胃部手術。" },
      { ja: "手術は無事に成功しました。", furigana: "しゅじゅつはぶじにせいこうしました。", en: "手術順利成功了。" }
    ]
  },
  {
    id: "vocab_shoujou",
    word: "症状",
    furigana: "しょうじょう",
    romaji: "shoujou",
    meaning: "症狀",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "どのような症状がありますか。", furigana: "どのようなしょうじょうがありますか。", en: "您有什麼樣的症狀呢？" },
      { ja: "薬を飲んでから、症状が軽くなりました。", furigana: "くすりをのんでから、しょうじょうがかるくなりました。", en: "吃藥之後，症狀減輕了。" }
    ]
  },
  {
    id: "vocab_shindan",
    word: "診断",
    furigana: "しんだん",
    romaji: "shindan",
    meaning: "診斷",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "医師の診断によれば、軽い肺炎です。", furigana: "いしのしんだんによれば、かるいはいえんです。", en: "根據醫師的診斷，是輕微的肺炎。" },
      { ja: "確定診断のために組織検査を行います。", furigana: "かくていしんだんのためにそしきけんさをおこないます。", en: "為了進行確診將進行組織切片檢查。" }
    ]
  },
  {
    id: "vocab_chiryou",
    word: "治療",
    furigana: "ちりょう",
    romaji: "chiryou",
    meaning: "治療",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "この病気は治療に時間がかかります。", furigana: "このびょうきはちりょうにじかんがかかります。", en: "這種疾病需要花費較長的時間治療。" },
      { ja: "最新の放射線治療を受けます。", furigana: "さいしんのほうしゃせんちりょうをうけます。", en: "接受最新的放射線治療。" }
    ]
  },
  {
    id: "vocab_shohousen",
    word: "処方箋",
    furigana: "しょほうせん",
    romaji: "shohousen",
    meaning: "處方箋",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "薬局に処方箋を出してください。", furigana: "やっきょくにしょほうせんをだしてください。", en: "請將處方箋交給藥局。" },
      { ja: "この薬は処方箋が必要です。", furigana: "このくすりはしょほうせんがひつようです。", en: "這種藥需要處方箋才能領取。" }
    ]
  },
  {
    id: "vocab_ketsuekikensa",
    word: "血液検査",
    furigana: "けつえきけんさ",
    romaji: "ketsuekikensa",
    meaning: "抽血檢查、血液檢驗",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "明日は血液検査があるので、朝ご飯を食べないでください。", furigana: "あしたはけつえきけんさがあるので、あさごはんをたべないでください。", en: "明天有抽血檢查，請不要吃早餐。" },
      { ja: "血液検査の結果はすべて正常です。", furigana: "けつえきけんさのけっかはすべてせいじょうです。", en: "血液檢查的結果全部正常。" }
    ]
  },
  {
    id: "vocab_rentogen",
    word: "レントゲン",
    furigana: "れんとげん",
    romaji: "rentogen",
    meaning: "X光",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "胸のレントゲンを撮ります。", furigana: "むねのれんとげんをとります。", en: "要拍胸部X光片。" },
      { ja: "レントゲン写真に異常はありませんでした。", furigana: "れんとげんしゃしんにいじょうはありませんでした。", en: "X光片上沒有發現任何異常。" }
    ]
  },
  {
    id: "vocab_gan",
    word: "癌",
    furigana: "がん",
    romaji: "gan",
    meaning: "癌症、腫瘤",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "初期の胃がんが見つかりました。", furigana: "しょきのいがんがみつかりました。", en: "發現了早期的胃癌。" },
      { ja: "彼はがんと闘っています。", furigana: "かれはがんとたたかっています。", en: "他正在與癌症對抗。" }
    ]
  },
  {
    id: "vocab_kossetsu",
    word: "骨折",
    furigana: "こっせつ",
    romaji: "kossetsu",
    meaning: "骨折",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "スキーで転んで、右腕を骨折しました。", furigana: "すきーでころんで、みぎうでをこっせつしました。", en: "滑雪時摔倒，右手臂骨折了。" },
      { ja: "骨折が治るまで、一ヶ月かかります。", furigana: "こっせつがなおるまで、いっかげつかかります。", en: "骨折要一個月才能痊癒。" }
    ]
  },
  {
    id: "vocab_masui",
    word: "麻酔",
    furigana: "ますい",
    romaji: "masui",
    meaning: "麻醉",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "手術の前に全身麻酔をかけます。", furigana: "しゅじゅつのまえにぜんしんますいをかけます。", en: "手術前會進行全身麻醉。" },
      { ja: "歯を抜くので、局所麻酔を打ちました。", furigana: "はをぬくので、きょくしょますいをうちました。", en: "因為要拔牙，所以打了局部麻醉。" }
    ]
  },
  {
    id: "vocab_fukusayou",
    word: "副作用",
    furigana: "ふくさよう",
    romaji: "fukusayou",
    meaning: "副作用",
    level: "N5",
    category: "health_medical",
    sentences: [
      { ja: "この薬は眠くなる副作用があります。", furigana: "このくすりはねむくなるふくさようがあります。", en: "這種藥有會讓人想睡覺的副作用。" },
      { ja: "もし強い副作用が出たら、すぐに来てください。", furigana: "もしつよいふくさようがでたら、すぐにきてください。", en: "如果出現強烈的副作用，請立刻回診。" }
    ]
  }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(clinicalWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', clinicalWords.length, 'clinical/anatomy words to data_n5.js!');
