const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWords = [
  // ================= 身體部位與生理 (Everyday Body & Actions) =================
  { id: "v_hige", word: "ひげ", furigana: "ひげ", romaji: "hige", meaning: "鬍鬚", level: "N5", category: "body_physiology",
    sentences: [{ ja: "毎朝ひげを剃ります。", furigana: "まいあさひげをそります。", en: "每天早上刮鬍子。" }] },
  { id: "v_mayuge", word: "眉毛", furigana: "まゆげ", romaji: "mayuge", meaning: "眉毛", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼女は眉毛の形がきれいです。", furigana: "かのじょはまゆげのかたちがきれいです。", en: "她的眉毛形狀很漂亮。" }] },
  { id: "v_kuchibiru", word: "唇", furigana: "くちびる", romaji: "kuchibiru", meaning: "嘴唇", level: "N5", category: "body_physiology",
    sentences: [{ ja: "冬は乾燥して唇が荒れます。", furigana: "ふゆはかんそうしてくちびるがあれます。", en: "冬天乾燥嘴唇會裂。" }] },
  { id: "v_oshiri", word: "お尻", furigana: "おしり", romaji: "oshiri", meaning: "屁股", level: "N5", category: "body_physiology",
    sentences: [{ ja: "長時間座っていたのでお尻が痛いです。", furigana: "ちょうじかんすわっていたのでおしりがいたいです。", en: "因為坐了很長時間所以屁股痛。" }] },
  { id: "v_se", word: "背", furigana: "せ", romaji: "se", meaning: "身高 / 背部", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼はクラスで一番背が高いです。", furigana: "かれはくらすでいちばんせがたかいです。", en: "他是班上身高最高的。" }] },
  { id: "v_akubi", word: "あくび", furigana: "あくび", romaji: "akubi", meaning: "打哈欠", level: "N5", category: "body_physiology",
    sentences: [{ ja: "眠くて大きなあくびが出ました。", furigana: "ねむくておおきなあくびがでました。", en: "因為很睏打了一個大哈欠。" }] },
  { id: "v_kushami", word: "くしゃみ", furigana: "くしゃみ", romaji: "kushami", meaning: "打噴嚏", level: "N5", category: "body_physiology",
    sentences: [{ ja: "花粉症でくしゃみが止まりません。", furigana: "かふんしょうでくしゃみがとまりません。", en: "因為花粉症打噴嚏打不停。" }] },
  { id: "v_shakkuri", word: "しゃっくり", furigana: "しゃっくり", romaji: "shakkuri", meaning: "打嗝", level: "N5", category: "body_physiology",
    sentences: [{ ja: "水を飲んだらしゃっくりが止まりました。", furigana: "みずをのんだらしゃっくりがとまりました。", en: "喝了水之後打嗝就停了。" }] },
  { id: "v_onara", word: "おなら", furigana: "おなら", romaji: "onara", meaning: "放屁", level: "N5", category: "body_physiology",
    sentences: [{ ja: "おならをするのは自然な生理現象です。", furigana: "おならをするのはしぜんなせいりげんしょうです。", en: "放屁是自然的生理現象。" }] },
  { id: "v_nemui", word: "眠い", furigana: "ねむい", romaji: "nemui", meaning: "睏的 / 想睡的", level: "N5", category: "body_physiology",
    sentences: [{ ja: "昨日はあまり寝ていないので、とても眠いです。", furigana: "きのうはあまりねていないので、とてもねむいです。", en: "昨天沒怎麼睡，所以非常睏。" }] },
  { id: "v_kamu", word: "噛む", furigana: "かむ", romaji: "kamu", meaning: "咬 / 嚼", level: "N5", category: "body_physiology",
    sentences: [{ ja: "食べ物はよく噛んで食べてください。", furigana: "たべものはよくかんでたべてください。", en: "食物請好好咀嚼後再吃。" }] },
  { id: "v_nioi", word: "匂い", furigana: "におい", romaji: "nioi", meaning: "氣味", level: "N5", category: "body_physiology",
    sentences: [{ ja: "台所から美味しそうな匂いがします。", furigana: "だいどころからおいしそうなにおいがします。", en: "廚房飄來好聞的味道。" }] },
  { id: "v_yaseru", word: "痩せる", furigana: "やせる", romaji: "yaseru", meaning: "變瘦", level: "N5", category: "body_physiology",
    sentences: [{ ja: "運動を始めて少し痩せました。", furigana: "うんどうをはじめですこしやせました。", en: "開始運動之後變瘦了一點。" }] },
  { id: "v_futoru", word: "太る", furigana: "ふとる", romaji: "futoru", meaning: "變胖", level: "N5", category: "body_physiology",
    sentences: [{ ja: "最近甘いものを食べすぎて太りました。", furigana: "さいきんあまいものをたべすぎてふとりました。", en: "最近吃太多甜食所以變胖了。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_genki", word: "元気", furigana: "げんき", romaji: "genki", meaning: "精神好 / 健康", level: "N5", category: "health_medical",
    sentences: [{ ja: "おじいさんはとても元気です。", furigana: "おじいさんはとてもげんきです。", en: "爺爺非常健康有精神。" }] },
  { id: "v_joubu", word: "丈夫", furigana: "じょうぶ", romaji: "joubu", meaning: "健壯的", level: "N5", category: "health_medical",
    sentences: [{ ja: "彼は体が丈夫で、風邪をひきません。", furigana: "かれはからだがじょうぶで、かぜをひきません。", en: "他身體健壯，都不會感冒。" }] },
  { id: "v_haku", word: "吐く", furigana: "はく", romaji: "haku", meaning: "嘔吐", level: "N5", category: "health_medical",
    sentences: [{ ja: "食べすぎで気分が悪くなり、吐いてしまいました。", furigana: "たべすぎできぶんがわるくなり、はいてしまいました。", en: "吃太多覺得噁心，就吐出來了。" }] },
  { id: "v_chigaderu", word: "血が出る", furigana: "ちがでる", romaji: "chigaderu", meaning: "流血", level: "N5", category: "health_medical",
    sentences: [{ ja: "指を切って血が出ました。", furigana: "ゆびをきってちがでました。", en: "割到手指流血了。" }] },
  { id: "v_geri", word: "下痢", furigana: "げり", romaji: "geri", meaning: "拉肚子", level: "N5", category: "health_medical",
    sentences: [{ ja: "冷たいものを飲みすぎて下痢をしました。", furigana: "つめたいものをのみすぎてげりをしました。", en: "喝太多冷飲導致拉肚子。" }] },
  { id: "v_benpi", word: "便秘", furigana: "べんぴ", romaji: "benpi", meaning: "便秘", level: "N5", category: "health_medical",
    sentences: [{ ja: "野菜を食べないと便秘になりやすいです。", furigana: "やさいをたべないとべんぴになりやすいです。", en: "不吃蔬菜的話很容易便秘。" }] },
  { id: "v_taichou", word: "体調", furigana: "たいちょう", romaji: "taichou", meaning: "身體狀況", level: "N5", category: "health_medical",
    sentences: [{ ja: "今日は少し体調が悪いです。", furigana: "きょうはすこしたいちょうがわるいです。", en: "今天身體狀況有點不好。" }] },
  { id: "v_itamu", word: "痛む", furigana: "いたむ", romaji: "itamu", meaning: "疼痛", level: "N5", category: "health_medical",
    sentences: [{ ja: "虫歯がひどく痛みます。", furigana: "むしばがひどくいたみます。", en: "蛀牙痛得很厲害。" }] },
  { id: "v_naosu", word: "治す", furigana: "なおす", romaji: "naosu", meaning: "治好 (他動詞)", level: "N5", category: "health_medical",
    sentences: [{ ja: "早く風邪を治して学校に行きたいです。", furigana: "はやくかぜをなおしてがっこうにいきたいです。", en: "想趕快把感冒治好去學校。" }] },
  { id: "v_kayui", word: "痒い", furigana: "かゆい", romaji: "kayui", meaning: "癢", level: "N5", category: "health_medical",
    sentences: [{ ja: "蚊に刺されて腕が痒いです。", furigana: "かにさされてうでがかゆいです。", en: "被蚊子叮了手臂很癢。" }] },
  { id: "v_bansoukou", word: "絆創膏", furigana: "ばんそうこう", romaji: "bansoukou", meaning: "OK繃 (創可貼)", level: "N5", category: "health_medical",
    sentences: [{ ja: "指の傷に絆創膏を貼りました。", furigana: "ゆびのきずにばんそうこうをはりました。", en: "在手指的傷口上貼了OK繃。" }] },
  { id: "v_ugai", word: "うがい", furigana: "うがい", romaji: "ugai", meaning: "漱口", level: "N5", category: "health_medical",
    sentences: [{ ja: "外から帰ったら、手洗いとうがいをします。", furigana: "そとからかえったら、てあらいとうがいをします。", en: "從外面回來後要洗手和漱口。" }] },
  { id: "v_hamigaki", word: "歯磨き", furigana: "はみがき", romaji: "hamigaki", meaning: "刷牙", level: "N5", category: "health_medical",
    sentences: [{ ja: "寝る前に必ず歯磨きをします。", furigana: "ねるまえにかならずはみがきをします。", en: "睡前一定會刷牙。" }] },

  // ================= 心理情感與性格 (Everyday Psychology & Character) =================
  { id: "v_omoshiroi", word: "面白い", furigana: "おもしろい", romaji: "omoshiroi", meaning: "有趣的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "この映画はとても面白いです。", furigana: "このえいがはとてもおもしろいです。", en: "這部電影非常有趣。" }] },
  { id: "v_tsumaranai", word: "つまらない", furigana: "つまらない", romaji: "tsumaranai", meaning: "無聊的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "今日の授業はつまらなかったです。", furigana: "きょうのじゅぎょうはつまらなかったです。", en: "今天的課很無聊。" }] },
  { id: "v_suki", word: "好き", furigana: "すき", romaji: "suki", meaning: "喜歡", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私は猫が大好きです。", furigana: "わたしはねこがだいすきです。", en: "我非常喜歡貓。" }] },
  { id: "v_kirai", word: "嫌い", furigana: "きらい", romaji: "kirai", meaning: "討厭", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼は野菜が嫌いです。", furigana: "かれはやさいがきらいです。", en: "他討厭蔬菜。" }] },
  { id: "v_bikkurisuru", word: "びっくりする", furigana: "びっくりする", romaji: "bikkurisuru", meaning: "嚇一跳", level: "N5", category: "psychology_character",
    sentences: [{ ja: "急に大きな音がしてびっくりしました。", furigana: "きゅうにおおきなおとがしてびっくりしました。", en: "突然發出很大的聲音嚇了我一跳。" }] },
  { id: "v_nakimushi", word: "泣き虫", furigana: "なきむし", romaji: "nakimushi", meaning: "愛哭鬼", level: "N5", category: "psychology_character",
    sentences: [{ ja: "妹はすぐに泣く泣き虫です。", furigana: "いもうとはすぐに泣くなきむしです。", en: "妹妹是個動不動就哭的愛哭鬼。" }] },
  { id: "v_urusai", word: "うるさい", furigana: "うるさい", romaji: "urusai", meaning: "吵鬧的 / 煩人的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "外の工事の音がうるさくて眠れません。", furigana: "そとのこうじのおとがうるさくてねむれません。", en: "外面的施工聲音太吵了睡不著。" }] },
  { id: "v_shizuka", word: "静か", furigana: "しずか", romaji: "shizuka", meaning: "安靜的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "夜の公園はとても静かです。", furigana: "よるのこうえんはとてもしずかです。", en: "晚上的公園非常安靜。" }] },
  { id: "v_kappatsu", word: "活発", furigana: "かっぱつ", romaji: "kappatsu", meaning: "活潑的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼女はとても明るくて活発な性格です。", furigana: "かのじょはとてもあかるくてかっぱつなせいかくです。", en: "她是有著非常開朗且活潑的性格。" }] },
  { id: "v_hen", word: "変", furigana: "へん", romaji: "hen", meaning: "奇怪的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "この牛乳は変な匂いがします。", furigana: "このぎゅうにゅうはへんなにおいがします。", en: "這牛奶有奇怪的味道。" }] },
  { id: "v_subarashii", word: "素晴らしい", furigana: "すばらしい", romaji: "subarashii", meaning: "極好的 / 絕佳的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "富士山からの景色は素晴らしいです。", furigana: "ふじさんからのけしきはすばらしいです。", en: "從富士山看下去的景色非常棒。" }] },
  { id: "v_sugoi", word: "すごい", furigana: "すごい", romaji: "sugoi", meaning: "厲害的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "日本語がペラペラですごいですね。", furigana: "にほんごがぺらぺらですごいですね。", en: "日語說得很流利，真厲害呢。" }] },
  { id: "v_ganbaru", word: "頑張る", furigana: "がんばる", romaji: "ganbaru", meaning: "努力 / 加油", level: "N5", category: "psychology_character",
    sentences: [{ ja: "明日のテスト、頑張ります！", furigana: "あしたのてすと、がんばります！", en: "明天的考試我會努力的！" }] },
  { id: "v_gamansuru", word: "我慢する", furigana: "がまんする", romaji: "gamansuru", meaning: "忍耐", level: "N5", category: "psychology_character",
    sentences: [{ ja: "トイレに行きたいですが、少し我慢します。", furigana: "といれにいきたいですが、すこしがまんします。", en: "雖然想上廁所，但稍微忍耐一下。" }] },
  { id: "v_nayamu", word: "悩む", furigana: "なやむ", romaji: "nayamu", meaning: "煩惱", level: "N5", category: "psychology_character",
    sentences: [{ ja: "進路について毎日悩んでいます。", furigana: "しんろについてまいにちなやんでいます。", en: "每天都在為未來的出路煩惱。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates if script is run multiple times
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWords.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words to data_n5.js!');
