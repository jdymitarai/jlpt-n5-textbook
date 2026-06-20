const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt15 = [
  // ================= 區公所與行政手續 (City Hall & Procedures) =================
  { id: "v_h_kuyakusho", word: "区役所", furigana: "くやくしょ", romaji: "kuyakusho", meaning: "區公所", level: "N4", category: "housing_space",
    sentences: [{ ja: "引っ越したので区役所へ行きます。", furigana: "ひっこしたのでくやくしょへいきます。", en: "因為搬家了所以去區公所。" }] },
  { id: "v_h_shiyakusho", word: "市役所", furigana: "しやくしょ", romaji: "shiyakusho", meaning: "市公所 / 市政府", level: "N4", category: "housing_space",
    sentences: [{ ja: "市役所で手続きをします。", furigana: "しやくしょでてつづきをします。", en: "在市公所辦理手續。" }] },
  { id: "v_h_juuminhyou", word: "住民票", furigana: "じゅうみんひょう", romaji: "juuminhyou", meaning: "住民票 (戶籍謄本)", level: "N3", category: "housing_space",
    sentences: [{ ja: "区役所で住民票をもらいます。", furigana: "くやくしょでじゅうみんひょうをもらいます。", en: "在區公所申請住民票。" }] },
  { id: "v_h_tennyuutodoke", word: "転入届", furigana: "てんにゅうとどけ", romaji: "tennyuutodoke", meaning: "遷入登記", level: "N3", category: "housing_space",
    sentences: [{ ja: "新しい町で転入届を出します。", furigana: "あたらしいまちでてんにゅうとどけをだします。", en: "在新的城市提交遷入登記。" }] },
  { id: "v_h_tenshutsutodoke", word: "転出届", furigana: "てんしゅつとどけ", romaji: "tenshutsutodoke", meaning: "遷出登記", level: "N3", category: "housing_space",
    sentences: [{ ja: "引っ越す前に転出届が必要です。", furigana: "ひっこすまえにてんしゅつとどけがひつようです。", en: "搬家前需要提交遷出登記。" }] },
  { id: "v_h_juushohenkou", word: "住所変更", furigana: "じゅうしょへんこう", romaji: "juushohenkou", meaning: "地址變更", level: "N3", category: "housing_space",
    sentences: [{ ja: "郵便局で住所変更の手続きをします。", furigana: "ゆうびんきょくでじゅうしょへんこうのてつづきをします。", en: "在郵局辦理地址變更的手續。" }] },
  { id: "v_h_mainannbaa", word: "マイナンバーカード", furigana: "まいなんばーかーど", romaji: "mainannbaakaado", meaning: "個人編號卡 (My Number卡)", level: "N3", category: "housing_space",
    sentences: [{ ja: "身分証明書としてマイナンバーカードを使います。", furigana: "みぶんしょうめいしょとしてまいなんばーかーどをつかいます。", en: "把個人編號卡當作身分證件使用。" }] },
  { id: "v_h_kokuminkenkouchoken", word: "国民健康保険", furigana: "こくみんけんこうほけん", romaji: "kokuminkenkouchoken", meaning: "國民健康保險", level: "N3", category: "housing_space",
    sentences: [{ ja: "区役所で国民健康保険に加入します。", furigana: "くやくしょでこくみんけんこうほけんにかにゅうします。", en: "在區公所加入國民健康保險。" }] },
  { id: "v_h_nenkin", word: "年金", furigana: "ねんきん", romaji: "nenkin", meaning: "年金", level: "N3", category: "housing_space",
    sentences: [{ ja: "毎月年金を払っています。", furigana: "まいつきねんきんをはらっています。", en: "每個月都有繳年金。" }] },
  { id: "v_h_shinsei", word: "申請", furigana: "しんせい", romaji: "shinsei", meaning: "申請", level: "N3", category: "housing_space",
    sentences: [{ ja: "パスポートの申請をします。", furigana: "ぱすぽーとのしんせいをします。", en: "申請護照。" }] },
  { id: "v_h_tetsuzuki", word: "手続き", furigana: "てつづき", romaji: "tetsuzuki", meaning: "手續", level: "N3", category: "housing_space",
    sentences: [{ ja: "銀行で口座を作る手続きをします。", furigana: "ぎんこうでこうざをつくるてつづきをします。", en: "在銀行辦理開戶手續。" }] },
  { id: "v_h_inkantouroku", word: "印鑑登録", furigana: "いんかんとうろく", romaji: "inkantouroku", meaning: "印鑑登記", level: "N3", category: "housing_space",
    sentences: [{ ja: "車を買うために印鑑登録が必要です。", furigana: "くるまをかうためにいんかんとうろくがひつようです。", en: "為了買車需要辦理印鑑登記。" }] },

  // ================= 垃圾分類進階 (Garbage Sorting) =================
  { id: "v_h_bunbetsu", word: "分別", furigana: "ぶんべつ", romaji: "bunbetsu", meaning: "分類", level: "N3", category: "housing_space",
    sentences: [{ ja: "日本ではゴミの分別が厳しいです。", furigana: "にほんではごみのぶんべつがきびしいです。", en: "在日本垃圾分類很嚴格。" }] },
  { id: "v_h_pettobotoru", word: "ペットボトル", furigana: "ぺっとぼとる", romaji: "pettobotoru", meaning: "寶特瓶", level: "N4", category: "housing_space",
    sentences: [{ ja: "ペットボトルは洗ってから捨てます。", furigana: "ぺっとぼとるはあらってからすてます。", en: "寶特瓶要洗過再丟。" }] },
  { id: "v_h_kyappu", word: "キャップ", furigana: "きゃっぷ", romaji: "kyappu", meaning: "瓶蓋", level: "N4", category: "housing_space",
    sentences: [{ ja: "ペットボトルのキャップとラベルを外します。", furigana: "ぺっとぼとるのきゃっぷとらべるをはずします。", en: "把寶特瓶的瓶蓋和標籤拆下來。" }] },
  { id: "v_h_raberu", word: "ラベル", furigana: "らべる", romaji: "raberu", meaning: "標籤", level: "N4", category: "housing_space",
    sentences: [{ ja: "このラベルはプラスチックのゴミです。", furigana: "このらべるはぷらすちっくのごみです。", en: "這個標籤是塑膠垃圾。" }] },
  { id: "v_h_akikan", word: "空き缶", furigana: "あきかん", romaji: "akikan", meaning: "空罐", level: "N4", category: "housing_space",
    sentences: [{ ja: "空き缶は潰して捨ててください。", furigana: "あきかんはつぶしてすててください。", en: "空罐請壓扁後再丟。" }] },
  { id: "v_h_akibin", word: "空き瓶", furigana: "あきびん", romaji: "akibin", meaning: "空瓶 (玻璃)", level: "N4", category: "housing_space",
    sentences: [{ ja: "空き瓶は割れないように袋に入れます。", furigana: "あきびんはわれないようにふくろにいれます。", en: "為了避免破掉，把空玻璃瓶裝進袋子裡。" }] },
  { id: "v_h_koshi", word: "古紙", furigana: "こし", romaji: "koshi", meaning: "廢紙 / 回收紙類", level: "N3", category: "housing_space",
    sentences: [{ ja: "雑誌や段ボールは古紙として出します。", furigana: "ざっしやだんぼーるはこしとしてだします。", en: "雜誌和紙箱當作廢紙回收。" }] },
  { id: "v_h_shinbunshi", word: "新聞紙", furigana: "しんぶんし", romaji: "shinbunshi", meaning: "報紙", level: "N4", category: "housing_space",
    sentences: [{ ja: "古い新聞紙を紐で縛ります。", furigana: "ふるいしんぶんしをひもでしばります。", en: "用繩子把舊報紙綁起來。" }] },
  { id: "v_h_namagomi", word: "生ゴミ", furigana: "なまごみ", romaji: "namagomi", meaning: "廚餘 / 生垃圾", level: "N4", category: "housing_space",
    sentences: [{ ja: "生ゴミの水をしっかり切ります。", furigana: "なまごみのみずをしっかりきります。", en: "把廚餘的水分瀝乾。" }] },
  { id: "v_h_purasuchikku", word: "プラスチック", furigana: "ぷらすちっく", romaji: "purasuchikku", meaning: "塑膠", level: "N4", category: "housing_space",
    sentences: [{ ja: "お弁当の容器はプラスチックのゴミです。", furigana: "おべんとうのようきはぷらすちっくのごみです。", en: "便當的容器是塑膠垃圾。" }] },
  { id: "v_h_shuushuubi", word: "収集日", furigana: "しゅうしゅうび", romaji: "shuushuubi", meaning: "回收日 / 垃圾收集日", level: "N3", category: "housing_space",
    sentences: [{ ja: "明日は燃えるゴミの収集日です。", furigana: "あすはもえるごみのしゅうしゅうひです。", en: "明天是可燃垃圾的收集日。" }] },
  { id: "v_h_shiteigomibukuro", word: "指定ゴミ袋", furigana: "していごみぶくろ", romaji: "shiteigomibukuro", meaning: "指定垃圾袋", level: "N3", category: "housing_space",
    sentences: [{ ja: "コンビニで市の指定ゴミ袋を買います。", furigana: "こんびにでしのしていごみぶくろをかいます。", en: "在便利商店買市府規定的垃圾袋。" }] },

  // ================= 打工與職場 (Part-time Jobs & Work) =================
  { id: "v_h_arubaito", word: "アルバイト", furigana: "あるばいと", romaji: "arubaito", meaning: "打工 (常簡稱 バイト)", level: "N5", category: "housing_space",
    sentences: [{ ja: "コンビニでアルバイトをしています。", furigana: "こんびにであるばいとをしています。", en: "在便利商店打工。" }] },
  { id: "v_h_mensetsu", word: "面接", furigana: "めんせつ", romaji: "mensetsu", meaning: "面試", level: "N4", category: "housing_space",
    sentences: [{ ja: "明日、アルバイトの面接があります。", furigana: "あす、あるばいとのめんせつがあります。", en: "明天有打工的面試。" }] },
  { id: "v_h_rirekisho", word: "履歴書", furigana: "りれきしょ", romaji: "rirekisho", meaning: "履歷表", level: "N3", category: "housing_space",
    sentences: [{ ja: "面接に履歴書を持っていきます。", furigana: "めんせつにりれきしょをもっていきます。", en: "帶履歷表去面試。" }] },
  { id: "v_h_jikyuu", word: "時給", furigana: "じきゅう", romaji: "jikyuu", meaning: "時薪", level: "N3", category: "housing_space",
    sentences: [{ ja: "このお店は時給が１２００円です。", furigana: "このおみせはじきゅうがせんにおひゃくえんです。", en: "這家店的時薪是1200日圓。" }] },
  { id: "v_h_shifuto", word: "シフト", furigana: "しふと", romaji: "shifuto", meaning: "排班", level: "N4", category: "housing_space",
    sentences: [{ ja: "来月のシフトを店長に出します。", furigana: "らいげつのしふとをてんちょうにだします。", en: "把下個月的排班表交給店長。" }] },
  { id: "v_h_makanai", word: "まかない", furigana: "まかない", romaji: "makanai", meaning: "員工餐", level: "N3", category: "housing_space",
    sentences: [{ ja: "このレストランは美味しいまかないが出ます。", furigana: "このれすとらんはおいしいまかないがでます。", en: "這家餐廳會提供好吃的員工餐。" }] },
  { id: "v_h_koutsuuhi", word: "交通費", furigana: "こうつうひ", romaji: "koutsuuhi", meaning: "交通費", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "アルバイト先から交通費がもらえます。", furigana: "あるばいとさきからこうつうひがもらえます。", en: "打工的地方會發交通費。" }] },
  { id: "v_h_zangyou", word: "残業", furigana: "ざんぎょう", romaji: "zangyou", meaning: "加班", level: "N4", category: "housing_space",
    sentences: [{ ja: "今日は仕事が忙しくて残業しました。", furigana: "きょうはしごとがいそがしくてざんぎょうしました。", en: "今天工作很忙所以加班了。" }] },
  { id: "v_h_kyuukei", word: "休憩", furigana: "きゅうけい", romaji: "kyuukei", meaning: "休息", level: "N4", category: "housing_space",
    sentences: [{ ja: "１２時から１時間休憩します。", furigana: "じゅうにじからいちじかんきゅうけいします。", en: "從12點開始休息一小時。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt15.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 15 - City Hall, Garbage, Part-time job) to data_n5.js!');
