const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt13 = [
  // ================= 美容院與理髮 (Hair Salon) =================
  { id: "v_c_biyouin", word: "美容院", furigana: "びよういん", romaji: "biyouin", meaning: "美容院 / 髮廊", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "月に一回、美容院に行きます。", furigana: "つきにいっかい、びよういんにいきます。", en: "一個月去一次髮廊。" }] },
  { id: "v_c_tokoya", word: "床屋", furigana: "とこや", romaji: "tokoya", meaning: "理髮店 (男士)", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "父はいつも駅前の床屋で髪を切ります。", furigana: "ちちはいつもえきまえのとこやでかみをきります。", en: "爸爸總是在站前的理髮店剪頭髮。" }] },
  { id: "v_c_biyoushi", word: "美容師", furigana: "びようし", romaji: "biyoushi", meaning: "美髮師", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "将来は有名な美容師になりたいです。", furigana: "しょうらいはゆうめいなびようしになりたいです。", en: "將來想成為有名的美髮師。" }] },
  { id: "v_c_katto", word: "カット", furigana: "かっと", romaji: "katto", meaning: "剪髮", level: "N5", category: "fashion_beauty",
    sentences: [{ ja: "今日はカットだけお願いします。", furigana: "きょうはかっとだけおねがいします。", en: "今天只要剪髮就好。" }] },
  { id: "v_c_toriitomento", word: "トリートメント", furigana: "とりーとめんと", romaji: "toriitomento", meaning: "護髮", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "髪が痛んでいるのでトリートメントをします。", furigana: "かみがいたんでいるのでとりーとめんとをします。", en: "因為頭髮受損所以做護髮。" }] },
  { id: "v_c_buroo", word: "ブロー", furigana: "ぶろー", romaji: "buroo", meaning: "吹整頭髮", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "最後にきれいにブローしてもらいました。", furigana: "さいごにきれいにぶろーしてもらいました。", en: "最後請設計師漂亮地吹整了頭髮。" }] },
  { id: "v_c_maegami", word: "前髪", furigana: "まえがみ", romaji: "maegami", meaning: "瀏海", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "前髪を少し短く切ってください。", furigana: "まえがみをすこしみじかくきってください。", en: "請把瀏海剪短一點。" }] },
  { id: "v_c_kamigata", word: "髪型", furigana: "かみがた", romaji: "kamigata", meaning: "髮型", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "新しい髪型は友達に褒められました。", furigana: "あたらしいかみがたはともだちにほめられました。", en: "新的髮型被朋友稱讚了。" }] },
  { id: "v_c_someru", word: "染める", furigana: "そめる", romaji: "someru", meaning: "染髮", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "髪を明るい茶色に染めました。", furigana: "かみをあかるいちゃいろにそめました。", en: "把頭髮染成了亮茶色。" }] },
  { id: "v_c_paama", word: "パーマ", furigana: "ぱーま", romaji: "paama", meaning: "燙髮", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "パーマをかけてイメージを変えます。", furigana: "ぱーまをかけていめーじをかえます。", en: "燙頭髮改變形象。" }] },
  { id: "v_c_kusege", word: "くせ毛", furigana: "くせげ", romaji: "kusege", meaning: "自然捲", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "くせ毛なので、雨の日は髪がまとまりません。", furigana: "くせげなので、あめのひはかみがまとまりません。", en: "因為有自然捲，下雨天頭髮就很難整理。" }] },
  { id: "v_c_edage", word: "枝毛", furigana: "えだげ", romaji: "edage", meaning: "分岔 (頭髮)", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "枝毛を切ってもらいました。", furigana: "えだげをきってもらいました。", en: "請設計師把分岔剪掉了。" }] },
  { id: "v_c_soroeru", word: "揃える", furigana: "そろえる", romaji: "soroeru", meaning: "修齊", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "長さを揃えるくらいでお願いします。", furigana: "ながさをそろえるくらいでおねがいします。", en: "麻煩長度修齊就好。" }] },
  { id: "v_c_suku", word: "すく", furigana: "すく", romaji: "suku", meaning: "打薄", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "髪が多いので、少しすいてください。", furigana: "かみがおおいので、すこしすいてください。", en: "因為頭髮很多，請幫我打薄一點。" }] },
  { id: "v_c_kariageru", word: "刈り上げる", furigana: "かりあげる", romaji: "kariageru", meaning: "推高 / 剃短 (通常指後腦勺或兩側)", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "後ろは短く刈り上げてください。", furigana: "うしろはみじかくかりあげてください。", en: "後面請幫我推高剪短。" }] },
  { id: "v_c_omakase", word: "お任せ", furigana: "おまかせ", romaji: "omakase", meaning: "交給您決定", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "髪型は美容師さんにお任せします。", furigana: "かみがたはびようしさんにおまかせします。", en: "髮型就交給美髮師決定。" }] },

  // ================= 開車與駕照 (Driving & Driver's License) =================
  { id: "v_t_untenmenkyo", word: "運転免許", furigana: "うんてんめんきょ", romaji: "untenmenkyo", meaning: "駕照", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "１８歳になって運転免許を取りました。", furigana: "じゅうはっさいになってうんてんめんきょをとりました。", en: "滿18歲考到了駕照。" }] },
  { id: "v_t_kyoushuujo", word: "教習所", furigana: "きょうしゅうじょ", romaji: "kyoushuujo", meaning: "駕訓班", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "毎日自動車の教習所に通っています。", furigana: "まいにちじどうしゃのきょうしゅうじょにかよっています。", en: "每天去汽車駕訓班上課。" }] },
  { id: "v_t_joshuseki", word: "助手席", furigana: "じょしゅせき", romaji: "joshuseki", meaning: "副駕駛座", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "彼の車の助手席に乗りました。", furigana: "かれのくるまのじょしゅせきにのりました。", en: "坐進了他車子的副駕駛座。" }] },
  { id: "v_t_koubuzaseki", word: "後部座席", furigana: "こうぶざせき", romaji: "koubuzaseki", meaning: "後座", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "後部座席でもシートベルトが必要です。", furigana: "こうぶざせきでもしーとべるとがひつようです。", en: "坐在後座也需要繫安全帶。" }] },
  { id: "v_t_bureeki", word: "ブレーキ", furigana: "ぶれーき", romaji: "bureeki", meaning: "煞車", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "危ないと思ったらすぐにブレーキを踏みます。", furigana: "あぶないとおもったらすぐにぶれーきをふみます。", en: "覺得危險就馬上踩煞車。" }] },
  { id: "v_t_akuseru", word: "アクセル", furigana: "あくせる", romaji: "akuseru", meaning: "油門", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "アクセルを強く踏みすぎないでください。", furigana: "あくせるをつよくふみすぎないでください。", en: "請不要把油門踩得太用力。" }] },
  { id: "v_t_uinkaa", word: "ウインカー", furigana: "ういんかー", romaji: "uinkaa", meaning: "方向燈", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "曲がる前にウインカーを出します。", furigana: "まがるまえにういんかーをだします。", en: "轉彎前打方向燈。" }] },
  { id: "v_t_waipaa", word: "ワイパー", furigana: "わいぱー", romaji: "waipaa", meaning: "雨刷", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "雨が降ってきたのでワイパーを動かします。", furigana: "あめがふってきたのでわいぱーをうごかします。", en: "因為下雨了所以打開雨刷。" }] },
  { id: "v_t_enjin", word: "エンジン", furigana: "えんじん", romaji: "enjin", meaning: "引擎", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "車のエンジンをかけます。", furigana: "くるまのえんじんをかけます。", en: "發動汽車引擎。" }] },
  { id: "v_t_gasorinsutando", word: "ガソリンスタンド", furigana: "がそりんすたんど", romaji: "gasorinsutando", meaning: "加油站", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "ガソリンスタンドで車に給油します。", furigana: "がそりんすたんどでくるまにきゅうゆうします。", en: "在加油站幫車子加油。" }] },
  { id: "v_t_regyuraa", word: "レギュラー", furigana: "れぎゅらー", romaji: "regyuraa", meaning: "92/95無鉛汽油 (一般汽油)", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "レギュラーを満タンでお願いします。", furigana: "れぎゅらーをまんたんでおねがいします。", en: "一般汽油麻煩加滿。" }] },
  { id: "v_t_haioku", word: "ハイオク", furigana: "はいおく", romaji: "haioku", meaning: "98無鉛汽油 (高級汽油)", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "この車はハイオク専用です。", furigana: "このくるまははいおくせんようです。", en: "這台車專加高級汽油。" }] },
  { id: "v_t_mantan", word: "満タン", furigana: "まんたん", romaji: "mantan", meaning: "加滿 (油箱)", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "出発前にガソリンを満タンにしました。", furigana: "しゅっぱつまえにがそりんをまんたんにしました。", en: "出發前把油箱加滿了。" }] },
  { id: "v_t_kousokudouro", word: "高速道路", furigana: "こうそくどうろ", romaji: "kousokudouro", meaning: "高速公路", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "高速道路を使って大阪へ行きます。", furigana: "こうそくどうろをつかっておおさかへいきます。", en: "走高速公路去大阪。" }] },
  { id: "v_t_juutai", word: "渋滞", furigana: "じゅうたい", romaji: "juutai", meaning: "塞車", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "連休なので道路が渋滞しています。", furigana: "れんきゅうなのでどうろがじゅうたいしています。", en: "因為是連假所以路上塞車。" }] },
  { id: "v_t_chuushaihan", word: "駐車違反", furigana: "ちゅうしゃいはん", romaji: "chuushaihan", meaning: "違規停車", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "駐車違反で罰金を払いました。", furigana: "ちゅうしゃいはんでばっきんをはらいました。", en: "因為違規停車繳了罰單。" }] },
  { id: "v_t_supiidoihan", word: "スピード違反", furigana: "すぴーどいはん", romaji: "supiidoihan", meaning: "超速違規", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "スピード違反で警察に捕まりました。", furigana: "すぴーどいはんでけいさつにつかまりました。", en: "因為超速被警察抓了。" }] },
  { id: "v_t_jiko", word: "事故", furigana: "じこ", romaji: "jiko", meaning: "車禍 / 事故", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "交差点で交通事故がありました。", furigana: "こうさてんでこうつうじこがありました。", en: "在十字路口發生了交通事故。" }] },
  { id: "v_t_kaanabi", word: "カーナビ", furigana: "かーなび", romaji: "kaanabi", meaning: "車用導航", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "カーナビの案内に従って運転します。", furigana: "かーなびのあんないにしたがってうんてんします。", en: "跟著車用導航的指示開車。" }] },
  { id: "v_t_shaken", word: "車検", furigana: "しゃけん", romaji: "shaken", meaning: "汽車定期檢驗", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "来月、車の車検があります。", furigana: "らいげつ、くるまのしゃけんがあります。", en: "下個月汽車要定期檢驗。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt13.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 13 - Hair Salon & Driving) to data_n5.js!');
