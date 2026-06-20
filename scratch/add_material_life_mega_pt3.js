const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt3 = [
  // ================= 飲食文化 (food_culture) Part 3 =================
  { id: "v_f_koori", word: "氷", furigana: "こおり", romaji: "koori", meaning: "冰塊", level: "N5", category: "food_culture",
    sentences: [{ ja: "ジュースに氷をたくさん入れます。", furigana: "じゅーすにこおりをたくさんいれます。", en: "在果汁裡加很多冰塊。" }] },
  { id: "v_f_oyu", word: "お湯", furigana: "おゆ", romaji: "oyu", meaning: "熱水", level: "N5", category: "food_culture",
    sentences: [{ ja: "ポットにお湯が入っています。", furigana: "ぽっとにおゆがはいっています。", en: "熱水瓶裡有熱水。" }] },
  { id: "v_f_nurui", word: "温い", furigana: "ぬるい", romaji: "nurui", meaning: "微溫的 / 不冷不熱的", level: "N3", category: "food_culture",
    sentences: [{ ja: "このお茶はもう温くなっています。", furigana: "このおちゃはもうぬるくなっています。", en: "這杯茶已經變溫了。" }] },
  { id: "v_f_katai", word: "固い", furigana: "かたい", romaji: "katai", meaning: "硬的", level: "N4", category: "food_culture",
    sentences: [{ ja: "この肉は少し固いです。", furigana: "このにくはすこしかたいです。", en: "這個肉有點硬。" }] },
  { id: "v_f_yawarakai", word: "柔らかい", furigana: "やわらかい", romaji: "yawarakai", meaning: "軟的", level: "N4", category: "food_culture",
    sentences: [{ ja: "とても柔らかくて美味しいパンです。", furigana: "とてもやわらかくておいしいぱんです。", en: "非常柔軟好吃的麵包。" }] },
  { id: "v_f_shinsen", word: "新鮮", furigana: "しんせん", romaji: "shinsen", meaning: "新鮮的", level: "N3", category: "food_culture",
    sentences: [{ ja: "新鮮な野菜でサラダを作ります。", furigana: "しんせんなやさいでさらだをつくります。", en: "用新鮮的蔬菜做沙拉。" }] },
  { id: "v_f_kusaru", word: "腐る", furigana: "くさる", romaji: "kusaru", meaning: "腐敗 / 壞掉", level: "N3", category: "food_culture",
    sentences: [{ ja: "夏は食べ物がすぐに腐ります。", furigana: "なつはたべものがすぐにくさります。", en: "夏天食物很快就會壞掉。" }] },
  { id: "v_f_kamu", word: "噛む", furigana: "かむ", romaji: "kamu", meaning: "咬 / 咀嚼", level: "N4", category: "food_culture",
    sentences: [{ ja: "よく噛んで食べてください。", furigana: "よくかんでたべてください。", en: "請好好咀嚼後再吃。" }] },
  { id: "v_f_nomikomu", word: "飲み込む", furigana: "のみこむ", romaji: "nomikomu", meaning: "吞下", level: "N3", category: "food_culture",
    sentences: [{ ja: "薬を水と一緒に飲み込みます。", furigana: "くすりをみずといっしょにのみこみます。", en: "配水把藥吞下去。" }] },
  { id: "v_f_nokosu", word: "残す", furigana: "のこす", romaji: "nokosu", meaning: "留下 / 剩", level: "N4", category: "food_culture",
    sentences: [{ ja: "ご飯を残してはいけません。", furigana: "ごはんをのこしてはいけません。", en: "不可以把飯剩下來。" }] },
  { id: "v_f_okawari", word: "お代わり", furigana: "おかわり", romaji: "okawari", meaning: "再來一碗", level: "N4", category: "food_culture",
    sentences: [{ ja: "ご飯のお代わりをお願いします。", furigana: "ごはんのおかわりをおねがいします。", en: "麻煩飯再來一碗。" }] },
  { id: "v_f_kobosu", word: "こぼす", furigana: "こぼす", romaji: "kobosu", meaning: "打翻 / 灑出", level: "N3", category: "food_culture",
    sentences: [{ ja: "コップの水をこぼしてしまいました。", furigana: "こっぷのみずをこぼしてしまいました。", en: "不小心打翻了杯子裡的水。" }] },

  // ================= 服飾與美容 (fashion_beauty) Part 3 =================
  { id: "v_c_pajama", word: "パジャマ", furigana: "ぱじゃま", romaji: "pajama", meaning: "睡衣", level: "N5", category: "fashion_beauty",
    sentences: [{ ja: "お風呂の後、パジャマに着替えます。", furigana: "おふろのあと、ぱじゃまにきがえます。", en: "洗完澡後換上睡衣。" }] },
  { id: "v_c_seifuku", word: "制服", furigana: "せいふく", romaji: "seifuku", meaning: "制服", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "高校生は学校の制服を着ます。", furigana: "こうこうせいはがっこうのせいふくをきます。", en: "高中生穿學校的制服。" }] },
  { id: "v_c_mizugi", word: "水着", furigana: "みずぎ", romaji: "mizugi", meaning: "泳裝", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "プールに行くので水着を持っていきます。", furigana: "ぷーるにいくのでみずぎをもっていきます。", en: "因為要去游泳池所以帶著泳裝。" }] },
  { id: "v_c_kimono", word: "着物", furigana: "きもの", romaji: "kimono", meaning: "和服", level: "N5", category: "fashion_beauty",
    sentences: [{ ja: "お正月には着物を着ます。", furigana: "おしょうがつにはきものをきます。", en: "過年時會穿和服。" }] },
  { id: "v_c_hige", word: "髭", furigana: "ひげ", romaji: "hige", meaning: "鬍鬚", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "毎朝、顔を洗って髭を剃ります。", furigana: "まいあさ、かおをあらってひげをそります。", en: "每天早上洗完臉後刮鬍子。" }] },
  { id: "v_c_tsume", word: "爪", furigana: "つめ", romaji: "tsume", meaning: "指甲", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "爪が伸びたので切ります。", furigana: "つめがのびたのできります。", en: "指甲變長了所以要剪。" }] },
  { id: "v_c_tokasu", word: "梳かす", furigana: "とかす", romaji: "tokasu", meaning: "梳(頭)", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "櫛で髪をきれいに梳かします。", furigana: "くしでかみをきれいにとかします。", en: "用梳子把頭髮梳整齊。" }] },
  { id: "v_c_yogoreru", word: "汚れる", furigana: "よごれる", romaji: "yogoreru", meaning: "變髒", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "白いシャツが汚れてしまいました。", furigana: "しろいしゃつがよごれてしまいました。", en: "白襯衫弄髒了。" }] },
  { id: "v_c_yabureru", word: "破れる", furigana: "やぶれる", romaji: "yabureru", meaning: "破掉", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "服がどこかに引っかかって破れました。", furigana: "ふくがどこかにひっかかってやぶれました。", en: "衣服不知道勾到哪裡破掉了。" }] },
  { id: "v_c_nureru", word: "濡れる", furigana: "ぬれる", romaji: "nureru", meaning: "淋濕 / 變濕", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "雨で靴が濡れてしまいました。", furigana: "あめでくつがぬれてしまいました。", en: "鞋子被雨淋濕了。" }] },
  { id: "v_c_kawaku", word: "乾く", furigana: "かわく", romaji: "kawaku", meaning: "變乾", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "天気がいいので、洗濯物がすぐに乾きます。", furigana: "てんきがいいので、せんたくものがすぐにかわきます。", en: "天氣很好，洗好的衣服馬上就乾了。" }] },

  // ================= 居住與家電 (housing_space) Part 3 =================
  { id: "v_h_tenjou", word: "天井", furigana: "てんじょう", romaji: "tenjou", meaning: "天花板", level: "N3", category: "housing_space",
    sentences: [{ ja: "この部屋は天井が高いです。", furigana: "このへやはてんじょうがたかいです。", en: "這個房間的天花板很高。" }] },
  { id: "v_h_hashira", word: "柱", furigana: "はしら", romaji: "hashira", meaning: "柱子", level: "N3", category: "housing_space",
    sentences: [{ ja: "太くて立派な柱がある家です。", furigana: "ふとくてりっぱなはしらがあるいえです。", en: "這是一棟有著粗大氣派柱子的房子。" }] },
  { id: "v_h_yane", word: "屋根", furigana: "やね", romaji: "yane", meaning: "屋頂", level: "N4", category: "housing_space",
    sentences: [{ ja: "屋根の上に雪が積もっています。", furigana: "やねのうえにゆきがつもっています。", en: "屋頂上積了雪。" }] },
  { id: "v_h_sutoobu", word: "ストーブ", furigana: "すとーぶ", romaji: "sutoobu", meaning: "暖爐", level: "N4", category: "housing_space",
    sentences: [{ ja: "寒いのでストーブをつけましょう。", furigana: "さむいのですとーぶをつけましょう。", en: "很冷，打開暖爐吧。" }] },
  { id: "v_h_kankisen", word: "換気扇", furigana: "かんきせん", romaji: "kankisen", meaning: "抽風機", level: "N3", category: "housing_space",
    sentences: [{ ja: "料理をする時は換気扇を回します。", furigana: "りょうりをするときはかんきせんをまわします。", en: "做菜時會開抽風機。" }] },
  { id: "v_h_makura", word: "枕", furigana: "まくら", romaji: "makura", meaning: "枕頭", level: "N4", category: "housing_space",
    sentences: [{ ja: "柔らかい枕で寝るのが好きです。", furigana: "やわらかいまくらでねるのがすきです。", en: "喜歡睡軟的枕頭。" }] },
  { id: "v_h_moufu", word: "毛布", furigana: "もうふ", romaji: "moufu", meaning: "毛毯", level: "N4", category: "housing_space",
    sentences: [{ ja: "夜は寒いので毛布をかけます。", furigana: "よるはさむいでもうふをかけます。", en: "晚上很冷所以蓋毛毯。" }] },
  { id: "v_h_shiitsu", word: "シーツ", furigana: "しーつ", romaji: "shiitsu", meaning: "床單", level: "N3", category: "housing_space",
    sentences: [{ ja: "ベッドのシーツを新しく交換します。", furigana: "べっどのしーつをあたらしくこうかんします。", en: "換上新的床單。" }] },

  // ================= 交通與移動 (transport_mobility) Part 3 =================
  { id: "v_t_untenshu", word: "運転手", furigana: "うんてんしゅ", romaji: "untenshu", meaning: "司機", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "タクシーの運転手に道を教えます。", furigana: "たくしーのうんてんしゅにみちをおしえます。", en: "告訴計程車司機路線。" }] },
  { id: "v_t_ekiin", word: "駅員", furigana: "えきいん", romaji: "ekiin", meaning: "站務員", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "駅員さんに道を尋ねました。", furigana: "えきいんさんにみちをたずねました。", en: "向站務員問路。" }] },
  { id: "v_t_joukyaku", word: "乗客", furigana: "じょうきゃく", romaji: "joukyaku", meaning: "乘客", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "電車はたくさんの乗客でいっぱいです。", furigana: "でんしゃはたくさんのじょうきゃくでいっぱいです。", en: "電車裡滿滿都是乘客。" }] },
  { id: "v_t_tsuukin", word: "通勤", furigana: "つうきん", romaji: "tsuukin", meaning: "通勤", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "通勤に１時間かかります。", furigana: "つうきんにいちじかんかかります。", en: "通勤要花一個小時。" }] },
  { id: "v_t_rasshu", word: "ラッシュアワー", furigana: "らっしゅあわー", romaji: "rasshuawaa", meaning: "尖峰時刻", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "朝のラッシュアワーはとても混みます。", furigana: "あさのらっしゅあわーはとてもこみます。", en: "早上的尖峰時刻非常擁擠。" }] },
  { id: "v_t_shuuden", word: "終電", furigana: "しゅうでん", romaji: "shuuden", meaning: "末班車", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "飲みすぎて終電に乗り遅れました。", furigana: "のみすぎてしゅうでんにのりおくれました。", en: "喝太多錯過了末班車。" }] },

  // ================= 休閒育樂與購物 (leisure_sports) Part 3 =================
  { id: "v_l_ginkou", word: "銀行", furigana: "ぎんこう", romaji: "ginkou", meaning: "銀行", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "銀行でお金を引き出します。", furigana: "ぎんこうでおかねをひきだします。", en: "在銀行領錢。" }] },
  { id: "v_l_anshoubangou", word: "暗証番号", furigana: "あんしょうばんごう", romaji: "anshoubangou", meaning: "密碼", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "暗証番号を入力してください。", furigana: "あんしょうばんごうをにゅうりょくしてください。", en: "請輸入密碼。" }] },
  { id: "v_l_hikidasu", word: "引き出す", furigana: "ひきだす", romaji: "hikidasu", meaning: "領出 / 抽出", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "ＡＴＭで１万円を引き出します。", furigana: "えーてぃーえむでいちまんえんをひきだします。", en: "在ATM領一萬日圓。" }] },
  { id: "v_l_furikomu", word: "振り込む", furigana: "ふりこむ", romaji: "furikomu", meaning: "匯款", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "家賃を銀行で振り込みます。", furigana: "やちんをぎんこうでふりこみます。", en: "在銀行匯房租。" }] },
  { id: "v_l_chokin", word: "貯金", furigana: "ちょきん", romaji: "chokin", meaning: "存錢", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "旅行のために毎月貯金しています。", furigana: "りょこうのためにまいつきちょきんしています。", en: "為了旅行每個月都在存錢。" }] },
  { id: "v_l_manga", word: "漫画", furigana: "まんが", romaji: "manga", meaning: "漫畫", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "日本の漫画は世界中で人気があります。", furigana: "にほんのまんがはせかいじゅうでにんきがあります。", en: "日本漫畫在全世界都很受歡迎。" }] },
  { id: "v_l_anime", word: "アニメ", furigana: "あにめ", romaji: "anime", meaning: "動畫", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "子供の頃からアニメを見るのが好きです。", furigana: "こどものころからあにめをみるのがすきです。", en: "從小就喜歡看動畫。" }] },
  { id: "v_l_yuuenchi", word: "遊園地", furigana: "ゆうえんち", romaji: "yuuenchi", meaning: "遊樂園", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "週末に家族で遊園地へ行きました。", furigana: "しゅうまつにかぞくでゆうえんちへいきました。", en: "週末和家人去了遊樂園。" }] },
  { id: "v_l_ogoru", word: "奢る", furigana: "おごる", romaji: "ogoru", meaning: "請客", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "今日は私がご飯を奢ります。", furigana: "きょうはわたしがごはんをおごります。", en: "今天吃飯我請客。" }] },
  { id: "v_l_warikan", word: "割り勘", furigana: "わりかん", romaji: "warikan", meaning: "各付各的 / AA制", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "お会計は割り勘にしましょう。", furigana: "おかいけいはわりかんにしましょう。", en: "結帳就各付各的吧。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt3.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 3) to data_n5.js!');
