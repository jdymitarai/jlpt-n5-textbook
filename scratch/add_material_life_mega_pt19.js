const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt19 = [
  // ================= 寵物與動物醫院 (Pets & Veterinary) - Category: nature_weather & others =================
  { id: "v_n_petto", word: "ペット", furigana: "ぺっと", romaji: "petto", meaning: "寵物", level: "N4", category: "nature_weather",
    sentences: [{ ja: "アパートでペットを飼っています。", furigana: "あぱーとでぺっとをかっています。", en: "在公寓裡養寵物。" }] },
  { id: "v_n_esa", word: "餌", furigana: "えさ", romaji: "esa", meaning: "飼料 / 餌", level: "N3", category: "nature_weather",
    sentences: [{ ja: "朝起きて犬に餌をやります。", furigana: "あさおきていぬにえさをやります。", en: "早上起床餵狗吃飼料。" }] },
  { id: "v_n_riido", word: "リード", furigana: "りーど", romaji: "riido", meaning: "牽繩", level: "N3", category: "nature_weather",
    sentences: [{ ja: "犬にリードをつけて散歩に行きます。", furigana: "いぬにりーどをつけてさんぽにいきます。", en: "給狗繫上牽繩去散步。" }] },
  { id: "v_n_doubutsubyouin", word: "動物病院", furigana: "どうぶつびょういん", romaji: "doubutsubyouin", meaning: "動物醫院 / 獸醫院", level: "N4", category: "housing_space",
    sentences: [{ ja: "猫の具合が悪いので動物病院へ連れて行きます。", furigana: "ねこのぐあいがわるいのでどうぶつびょういんへつれていきます。", en: "貓咪不舒服，所以帶牠去動物醫院。" }] },
  { id: "v_p_juui", word: "獣医", furigana: "じゅうい", romaji: "juui", meaning: "獸醫", level: "N3", category: "work_business",
    sentences: [{ ja: "将来の夢は獣医になることです。", furigana: "しょうらいのゆめはじゅういになることです。", en: "未來的夢想是成為一名獸醫。" }] },
  { id: "v_h_yobousesshu", word: "予防接種", furigana: "よぼうせっしゅ", romaji: "yobousesshu", meaning: "預防注射 / 打疫苗", level: "N3", category: "body_health",
    sentences: [{ ja: "犬の狂犬病の予防接種を受けます。", furigana: "いぬのきょうけんびょうのよぼうせっしゅをうけます。", en: "讓狗接種狂犬病疫苗。" }] },

  // ================= 娛樂與休閒場所 (Entertainment & Venues) - Category: leisure_culture =================
  { id: "v_l_eigakan", word: "映画館", furigana: "えいがかん", romaji: "eigakan", meaning: "電影院", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "週末は映画館で新しい映画を見ます。", furigana: "しゅうまつはえいがかんであたらしいえいがをみます。", en: "週末在電影院看新電影。" }] },
  { id: "v_l_karaoke", word: "カラオケ", furigana: "からおけ", romaji: "karaoke", meaning: "卡拉OK", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "友達とカラオケでたくさん歌いました。", furigana: "ともだちとからおけでたくさんうたいました。", en: "和朋友在卡拉OK唱了很多歌。" }] },
  { id: "v_l_yuuenchi", word: "遊園地", furigana: "ゆうえんち", romaji: "yuuenchi", meaning: "遊樂園", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "遊園地でジェットコースターに乗りました。", furigana: "ゆうえんちでじぇっとこーすたーにのりました。", en: "在遊樂園坐了雲霄飛車。" }] },
  { id: "v_l_suizokukan", word: "水族館", furigana: "すいぞくかん", romaji: "suizokukan", meaning: "水族館", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "水族館で大きなイルカを見ました。", furigana: "すいぞくかんでおおきないるかをみました。", en: "在水族館看到了巨大的海豚。" }] },
  { id: "v_l_doubutsuen", word: "動物園", furigana: "どうぶつえん", romaji: "doubutsuen", meaning: "動物園", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "動物園にパンダを見に行きます。", furigana: "どうぶつえんにぱんだをみにいきます。", en: "去動物園看熊貓。" }] },
  { id: "v_l_bijutsukan", word: "美術館", furigana: "びじゅつかん", romaji: "bijutsukan", meaning: "美術館", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "美術館で美しい絵を鑑賞します。", furigana: "びじゅつかんでうつくしいえをかんしょうします。", en: "在美術館欣賞美麗的畫作。" }] },
  { id: "v_l_hakubutsukan", word: "博物館", furigana: "はくぶつかん", romaji: "hakubutsukan", meaning: "博物館", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "博物館で恐竜の骨を見ました。", furigana: "はくぶつかんできょうりゅうのほねをみました。", en: "在博物館看到了恐龍的骨骼。" }] },
  { id: "v_l_chiketto", word: "チケット", furigana: "ちけっと", romaji: "chiketto", meaning: "票券 / 門票", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "インターネットでコンサートのチケットを買います。", furigana: "いんたーねっとでこんさーとのちけっとをかいます。", en: "在網路上買演唱會的門票。" }] },
  { id: "v_l_yoyaku", word: "予約", furigana: "よやく", romaji: "yoyaku", meaning: "預約", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "人気のレストランを予約しました。", furigana: "にんきのれすとらんをよやくしました。", en: "預約了受歡迎的餐廳。" }] },
  { id: "v_l_kamera", word: "カメラ", furigana: "かめら", romaji: "kamera", meaning: "相機", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "旅行に新しいカメラを持っていきます。", furigana: "りょこうにあたらしいかめらをもっていきます。", en: "帶新相機去旅行。" }] },

  // ================= 人際關係與感情 (Relationships & Emotions) =================
  { id: "v_p_koibito", word: "恋人", furigana: "こいびと", romaji: "koibito", meaning: "戀人 / 情人", level: "N4", category: "personal_info",
    sentences: [{ ja: "休日は恋人と一緒に過ごします。", furigana: "きゅうじつはこいびとといっしょにすごします。", en: "假日和情人一起度過。" }] },
  { id: "v_p_kareshi", word: "彼氏", furigana: "かれし", romaji: "kareshi", meaning: "男朋友", level: "N4", category: "personal_info",
    sentences: [{ ja: "彼氏に誕生日プレゼントをあげます。", furigana: "かれしにたんじょうびぷれぜんとをあげます。", en: "送生日禮物給男朋友。" }] },
  { id: "v_p_kanojo", word: "彼女", furigana: "かのじょ", romaji: "kanojo", meaning: "女朋友 (也可用於代稱'她')", level: "N5", category: "personal_info",
    sentences: [{ ja: "彼女と映画を見に行きます。", furigana: "かのじょとえいがをみにいきます。", en: "和女朋友去看電影。" }] },
  { id: "v_p_deeto", word: "デート", furigana: "でーと", romaji: "deeto", meaning: "約會", level: "N4", category: "personal_info",
    sentences: [{ ja: "明日は好きな人と初めてのデートです。", furigana: "あすはすきなひととはじめてのでーとです。", en: "明天要和喜歡的人第一次約會。" }] },
  { id: "v_a_kenka", word: "喧嘩", furigana: "けんか", romaji: "kenka", meaning: "吵架 / 打架", level: "N3", category: "actions_verbs",
    sentences: [{ ja: "弟とゲームのことで喧嘩しました。", furigana: "おとうととげーむのことでけんかしました。", en: "因為遊戲的事情和弟弟吵架了。" }] },
  { id: "v_a_nakanaori", word: "仲直り", furigana: "なかなおり", romaji: "nakanaori", meaning: "和好", level: "N3", category: "actions_verbs",
    sentences: [{ ja: "喧嘩した友達とすぐに仲直りしました。", furigana: "けんかしたともだちとすぐになかなおりしました。", en: "和吵架的朋友馬上就和好了。" }] },
  { id: "v_s_ureshii", word: "嬉しい", furigana: "うれしい", romaji: "ureshii", meaning: "開心的 / 高興的", level: "N4", category: "states_adjectives",
    sentences: [{ ja: "プレゼントをもらってとても嬉しいです。", furigana: "ぷれぜんとをもらってとてもうれしいです。", en: "收到禮物非常開心。" }] },
  { id: "v_s_kanashii", word: "悲しい", furigana: "かなしい", romaji: "kanashii", meaning: "悲傷的 / 難過的", level: "N4", category: "states_adjectives",
    sentences: [{ ja: "悲しい映画を見て涙が出ました。", furigana: "かなしいえいがをみてなみだがでました。", en: "看了悲傷的電影流下了眼淚。" }] },
  { id: "v_a_okoru", word: "怒る", furigana: "おこる", romaji: "okoru", meaning: "生氣", level: "N4", category: "actions_verbs",
    sentences: [{ ja: "約束を破って母に怒られました。", furigana: "やくそくをやぶってはかにおこられました。", en: "因為打破約定而被媽媽罵(生氣)了。" }] },
  { id: "v_a_warau", word: "笑う", furigana: "わらう", romaji: "warau", meaning: "笑", level: "N4", category: "actions_verbs",
    sentences: [{ ja: "彼の面白い話を聞いて大声で笑いました。", furigana: "かれのおもしろいはなしをきいておおごえでわらいました。", en: "聽了他有趣的話大聲笑了出來。" }] },
  { id: "v_a_naku", word: "泣く", furigana: "なく", romaji: "naku", meaning: "哭泣", level: "N4", category: "actions_verbs",
    sentences: [{ ja: "迷子になって子供が泣いています。", furigana: "まいごになってこどもがないています。", en: "小孩因為迷路而在哭泣。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt19.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 19 - Pets, Venues, Relationships) to data_n5.js!');
