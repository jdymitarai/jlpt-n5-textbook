const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt16 = [
  // ================= 廚房用具與做菜動作 (Kitchen Utensils & Cooking) =================
  { id: "v_h_furaipan", word: "フライパン", furigana: "ふらいぱん", romaji: "furaipan", meaning: "平底鍋", level: "N4", category: "housing_space",
    sentences: [{ ja: "フライパンで卵を焼きます。", furigana: "ふらいぱんでたまごをやきます。", en: "用平底鍋煎蛋。" }] },
  { id: "v_h_nabe", word: "鍋", furigana: "なべ", romaji: "nabe", meaning: "鍋子", level: "N4", category: "housing_space",
    sentences: [{ ja: "鍋でお湯を沸かします。", furigana: "なべでおゆをわかします。", en: "用鍋子燒開水。" }] },
  { id: "v_h_manaita", word: "まな板", furigana: "まないた", romaji: "manaita", meaning: "砧板", level: "N3", category: "housing_space",
    sentences: [{ ja: "まな板の上で肉を切ります。", furigana: "まないたのうえでにくをきります。", en: "在砧板上切肉。" }] },
  { id: "v_h_houchou", word: "包丁", furigana: "ほうちょう", romaji: "houchou", meaning: "菜刀", level: "N3", category: "housing_space",
    sentences: [{ ja: "包丁を使う時は気をつけてください。", furigana: "ほうちょうをつかうときはきをつけてください。", en: "用菜刀的時候請小心。" }] },
  { id: "v_h_otama", word: "お玉", furigana: "おたま", romaji: "otama", meaning: "湯勺", level: "N3", category: "housing_space",
    sentences: [{ ja: "お玉でスープをすくいます。", furigana: "おたまでスープをすくいます。", en: "用湯勺舀湯。" }] },
  { id: "v_h_furaigaeshi", word: "フライ返し", furigana: "ふらいがえし", romaji: "furaigaeshi", meaning: "鍋鏟", level: "N3", category: "housing_space",
    sentences: [{ ja: "フライ返しでハンバーグをひっくり返します。", furigana: "ふらいがえしではんばーぐをひっくりかえします。", en: "用鍋鏟把漢堡排翻面。" }] },
  { id: "v_h_shamoji", word: "しゃもじ", furigana: "しゃもじ", romaji: "shamoji", meaning: "飯匙", level: "N3", category: "housing_space",
    sentences: [{ ja: "しゃもじでご飯をよそいます。", furigana: "しゃもじでごはんをよそいます。", en: "用飯匙盛飯。" }] },
  { id: "v_h_keiryoukappu", word: "計量カップ", furigana: "けいりょうかっぷ", romaji: "keiryoukappu", meaning: "量杯", level: "N3", category: "housing_space",
    sentences: [{ ja: "計量カップで水の量を量ります。", furigana: "けいりょうかっぷでみずのりょうをはかります。", en: "用量杯量水的份量。" }] },
  { id: "v_h_piiraa", word: "ピーラー", furigana: "ぴーらー", romaji: "piiraa", meaning: "削皮刀", level: "N3", category: "housing_space",
    sentences: [{ ja: "ピーラーでじゃがいもの皮をむきます。", furigana: "ぴーらーでじゃがいものかわをむきます。", en: "用削皮刀削馬鈴薯皮。" }] },
  { id: "v_h_zaru", word: "ザル", furigana: "ざる", romaji: "zaru", meaning: "漏盆 / 瀝水籃", level: "N3", category: "housing_space",
    sentences: [{ ja: "ザルで野菜の水を切ります。", furigana: "ざるでやさいのみずをきります。", en: "用漏盆把蔬菜的水分瀝乾。" }] },
  { id: "v_h_bouru", word: "ボウル", furigana: "ぼうる", romaji: "bouru", meaning: "調理碗 / 攪拌盆", level: "N4", category: "housing_space",
    sentences: [{ ja: "ボウルに卵を割って混ぜます。", furigana: "ぼうるにたまごをわってまぜます。", en: "把蛋打進調理碗裡攪拌。" }] },
  { id: "v_h_rappu", word: "ラップ", furigana: "らっぷ", romaji: "rappu", meaning: "保鮮膜", level: "N4", category: "housing_space",
    sentences: [{ ja: "お皿にラップをかけて冷蔵庫に入れます。", furigana: "おさらにらっぷをかけてれいぞうこにいれます。", en: "在盤子上包保鮮膜後放進冰箱。" }] },
  { id: "v_h_arumijoiru", word: "アルミホイル", furigana: "あるみほいる", romaji: "arumihoiru", meaning: "鋁箔紙", level: "N4", category: "housing_space",
    sentences: [{ ja: "魚をアルミホイルで包んで焼きます。", furigana: "さかなをあるみほいるでつつんでやきます。", en: "把魚用鋁箔紙包起來烤。" }] },
  { id: "v_h_kicchinpeepaa", word: "キッチンペーパー", furigana: "きっちんぺーぱー", romaji: "kicchinpeepaa", meaning: "廚房紙巾", level: "N4", category: "housing_space",
    sentences: [{ ja: "キッチンペーパーで油を拭き取ります。", furigana: "きっちんぺーぱーであぶらをふきとります。", en: "用廚房紙巾擦去油漬。" }] },
  { id: "v_f_itameru", word: "炒める", furigana: "いためる", romaji: "itameru", meaning: "炒", level: "N3", category: "food_diet",
    sentences: [{ ja: "野菜と肉をフライパンで炒めます。", furigana: "やさいとにくをふらいぱんでいためます。", en: "用平底鍋炒蔬菜和肉。" }] },
  { id: "v_f_niru", word: "煮る", furigana: "にる", romaji: "niru", meaning: "煮 / 燉", level: "N3", category: "food_diet",
    sentences: [{ ja: "大根を弱火で柔らかくなるまで煮ます。", furigana: "だいこんをよわびでやわらかくなるまでにます。", en: "用小火把蘿蔔燉到變軟。" }] },
  { id: "v_f_yaku", word: "焼く", furigana: "やく", romaji: "yaku", meaning: "烤 / 煎", level: "N5", category: "food_diet",
    sentences: [{ ja: "オーブンでパンを焼きます。", furigana: "おーぶんでぱんをやきます。", en: "用烤箱烤麵包。" }] },
  { id: "v_f_ageru", word: "揚げる", furigana: "あげる", romaji: "ageru", meaning: "油炸", level: "N3", category: "food_diet",
    sentences: [{ ja: "油で天ぷらを揚げます。", furigana: "あぶらでてんぷらをあげます。", en: "用油炸天婦羅。" }] },
  { id: "v_f_musu", word: "蒸す", furigana: "むす", romaji: "musu", meaning: "蒸", level: "N3", category: "food_diet",
    sentences: [{ ja: "肉まんを蒸し器で蒸します。", furigana: "にくまんをむしきでむします。", en: "用蒸籠蒸肉包。" }] },
  { id: "v_h_wakasu", word: "沸かす", furigana: "わかす", romaji: "wakasu", meaning: "燒開(水)", level: "N4", category: "housing_space",
    sentences: [{ ja: "コーヒーを淹れるためにお湯を沸かします。", furigana: "こーひーをいれるためにおゆをわかします。", en: "為了泡咖啡而燒開水。" }] },

  // ================= 化妝保養與日常打理 (Skincare & Cosmetics) =================
  { id: "v_c_keshousui", word: "化粧水", furigana: "けしょうすい", romaji: "keshousui", meaning: "化妝水", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "洗顔の後に化粧水をつけます。", furigana: "せんがんのあとにけしょうすいをつけます。", en: "洗臉後塗化妝水。" }] },
  { id: "v_c_nyuueki", word: "乳液", furigana: "にゅうえき", romaji: "nyuueki", meaning: "乳液", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "肌が乾燥するので乳液を塗ります。", furigana: "はだがかんそうするのでにゅうえきをぬります。", en: "因為皮膚乾燥所以塗乳液。" }] },
  { id: "v_c_senganryou", word: "洗顔料", furigana: "せんがんりょう", romaji: "senganryou", meaning: "洗面乳", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "泡立つ洗顔料で顔を洗います。", furigana: "あわだつせんがんりょうでかおをあらいます。", en: "用會起泡的洗面乳洗臉。" }] },
  { id: "v_c_kurenjingu", word: "クレンジング", furigana: "くれんじんぐ", romaji: "kurenjingu", meaning: "卸妝", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "寝る前にクレンジングで化粧を落とします。", furigana: "ねるまえにくれんじんぐでけしょうをおとします。", en: "睡前用卸妝產品把妝卸掉。" }] },
  { id: "v_c_hiyakedome", word: "日焼け止め", furigana: "ひやけどめ", romaji: "hiyakedome", meaning: "防曬乳", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "夏は出かける前に日焼け止めを塗ります。", furigana: "なつはでかけるまえにひやけどめをぬります。", en: "夏天出門前會塗防曬乳。" }] },
  { id: "v_c_fandeeshon", word: "ファンデーション", furigana: "ふぁんでーしょん", romaji: "fandeeshon", meaning: "粉底", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "新しいファンデーションを買いました。", furigana: "あたらしいふぁんでーしょんをかいました。", en: "買了新的粉底。" }] },
  { id: "v_c_kuchibeni", word: "口紅", furigana: "くちべに", romaji: "kuchibeni", meaning: "口紅", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "赤い口紅をつけます。", furigana: "あかいくちべにをつけます。", en: "塗上紅色的口紅。" }] },
  { id: "v_c_rippu", word: "リップ", furigana: "りっぷ", romaji: "rippu", meaning: "護唇膏 / 唇膏", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "唇が乾いたのでリップを塗ります。", furigana: "くちびるがかわいたのでりっぷをぬります。", en: "嘴唇乾了所以塗護唇膏。" }] },
  { id: "v_c_aishadou", word: "アイシャドウ", furigana: "あいしゃどう", romaji: "aishadou", meaning: "眼影", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "ピンクのアイシャドウを使います。", furigana: "ぴんくのあいしゃどうをつかいます。", en: "使用粉紅色的眼影。" }] },
  { id: "v_c_kousui", word: "香水", furigana: "こうすい", romaji: "kousui", meaning: "香水", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "いい匂いの香水をつけます。", furigana: "いいにおいのこうすいをつけます。", en: "噴上好聞的香水。" }] },
  { id: "v_h_kagami", word: "鏡", furigana: "かがみ", romaji: "kagami", meaning: "鏡子", level: "N4", category: "housing_space",
    sentences: [{ ja: "鏡を見て髪型を直します。", furigana: "かがみをみてかみがたをなおします。", en: "看著鏡子整理髮型。" }] },
  { id: "v_c_kushi", word: "くし", furigana: "くし", romaji: "kushi", meaning: "梳子", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "くしで髪をとかします。", furigana: "くしかみでとかします。", en: "用梳子梳頭髮。" }] },
  { id: "v_c_heagomu", word: "ヘアゴム", furigana: "へあごむ", romaji: "heagomu", meaning: "髮圈", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "ヘアゴムで髪を結びます。", furigana: "へあごむでかみをむすびます。", en: "用髮圈把頭髮綁起來。" }] },

  // ================= 運動與健身 (Fitness & Sports) =================
  { id: "v_o_supootshijimu", word: "スポーツジム", furigana: "すぽーつじむ", romaji: "supootsujimu", meaning: "健身房", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "仕事の後にスポーツジムへ行きます。", furigana: "しごとのあとにすぽーつじむへいきます。", en: "下班後去健身房。" }] },
  { id: "v_o_kintore", word: "筋トレ", furigana: "きんとれ", romaji: "kintore", meaning: "重量訓練", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "毎日家で筋トレをしています。", furigana: "まいにちいえできんとれをしています。", en: "每天在家做重量訓練。" }] },
  { id: "v_o_ranningumashin", word: "ランニングマシン", furigana: "らんにんぐましん", romaji: "ranningumashin", meaning: "跑步機", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "ジムのランニングマシンで３０分走ります。", furigana: "じむのらんにんぐましんでさんじゅっぷんはしります。", en: "在健身房的跑步機上跑30分鐘。" }] },
  { id: "v_o_yoga", word: "ヨガ", furigana: "よが", romaji: "yoga", meaning: "瑜珈", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "健康のためにヨガの教室に通っています。", furigana: "けんこうのためによがのきょうしつにかよっています。", en: "為了健康去上瑜珈課。" }] },
  { id: "v_o_danberu", word: "ダンベル", furigana: "だんべる", romaji: "danberu", meaning: "啞鈴", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "重いダンベルを持ち上げます。", furigana: "おもいだんべるをもちあげます。", en: "舉起重啞鈴。" }] },
  { id: "v_o_kinnikutsuu", word: "筋肉痛", furigana: "きんにくつう", romaji: "kinnikutsuu", meaning: "肌肉痠痛", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "昨日の運動で今日は筋肉痛です。", furigana: "きのうのうんどうできょうはきんにくつうです。", en: "因為昨天的運動，今天肌肉痠痛。" }] },
  { id: "v_o_asewokaku", word: "汗をかく", furigana: "あせをかく", romaji: "asewokaku", meaning: "流汗", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "たくさん走って汗をかきました。", furigana: "たくさんはしってあせをかきました。", en: "跑了很多步流汗了。" }] },
  { id: "v_c_undougutsu", word: "運動靴", furigana: "うんどうぐつ", romaji: "undougutsu", meaning: "運動鞋", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "運動靴を履いて公園を散歩します。", furigana: "うんどうぐつをはいてこうえんをさんぽします。", en: "穿上運動鞋去公園散步。" }] },
  { id: "v_c_jaaji", word: "ジャージ", furigana: "じゃーじ", romaji: "jaaji", meaning: "運動服", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "休みの日は家でジャージを着ています。", furigana: "やすみのひはいえでじゃーじをきています。", en: "休假的日子在家裡穿運動服。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt16.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 16 - Kitchen, Skincare, Fitness) to data_n5.js!');
