const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart5 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_heso", word: "へそ", furigana: "へそ", romaji: "heso", meaning: "肚臍", level: "N5", category: "body_physiology",
    sentences: [{ ja: "お腹を出して寝ると、へそが冷えます。", furigana: "おなかをだしてねると、へそがひえます。", en: "露著肚子睡覺肚臍會著涼。" }] },
  { id: "v_futomomo", word: "太もも", furigana: "ふともも", romaji: "futomomo", meaning: "大腿", level: "N5", category: "body_physiology",
    sentences: [{ ja: "走ったので太ももが筋肉痛です。", furigana: "はしったのでふとももがきんにくつうです。", en: "因為跑步大腿肌肉痠痛。" }] },
  { id: "v_fukurahagi", word: "ふくらはぎ", furigana: "ふくらはぎ", romaji: "fukurahagi", meaning: "小腿肚", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ずっと立っていたので、ふくらはぎが疲れました。", furigana: "ずっとたっていたので、ふくらはぎがつかれました。", en: "因為一直站著，小腿肚很累。" }] },
  { id: "v_waki", word: "脇", furigana: "わき", romaji: "waki", meaning: "腋下", level: "N5", category: "body_physiology",
    sentences: [{ ja: "体温計を脇に挟んで熱を測ります。", furigana: "たいおんけいをわきにはさんでねつをはかります。", en: "把體溫計夾在腋下來量體溫。" }] },
  { id: "v_kobushi", word: "拳", furigana: "こぶし", romaji: "kobushi", meaning: "拳頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "怒って拳を強く握りました。", furigana: "おこってこぶしをつよくにぎりました。", en: "生氣地用力握緊了拳頭。" }] },
  { id: "v_shiwa", word: "しわ", furigana: "しわ", romaji: "shiwa", meaning: "皺紋", level: "N5", category: "body_physiology",
    sentences: [{ ja: "おばあちゃんの顔にはしわがたくさんあります。", furigana: "おばあちゃんのかおにはしわがたくさんあります。", en: "奶奶的臉上有許多皺紋。" }] },
  { id: "v_hokuro", word: "ほくろ", furigana: "ほくろ", romaji: "hokuro", meaning: "痣", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼の口の横には小さなほくろがあります。", furigana: "かれのくちのよこにはちいさなほくろがあります。", en: "他的嘴邊有一顆小痣。" }] },
  { id: "v_kizuato", word: "傷跡", furigana: "きずあと", romaji: "kizuato", meaning: "傷疤", level: "N5", category: "body_physiology",
    sentences: [{ ja: "子供の頃に転んだ傷跡がまだあります。", furigana: "こどものころにころんだきずあとがまだあります。", en: "小時候跌倒的傷疤還在。" }] },
  { id: "v_unazuku", word: "うなずく", furigana: "うなずく", romaji: "unazuku", meaning: "點頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "私の話を聞いて、彼は大きくうなずきました。", furigana: "わたしのはなしをきいて、かれはおおきくうなずきました。", en: "聽了我的話，他用力地點了點頭。" }] },
  { id: "v_kubiwofuru", word: "首を振る", furigana: "くびをふる", romaji: "kubiwofuru", meaning: "搖頭", level: "N5", category: "body_physiology",
    sentences: [{ ja: "「違います」と言って首を振りました。", furigana: "「ちがいます」といってくびをふりました。", en: "說著「不是」並搖了搖頭。" }] },
  { id: "v_shagamu", word: "しゃがむ", furigana: "しゃがむ", romaji: "shagamu", meaning: "蹲下", level: "N5", category: "body_physiology",
    sentences: [{ ja: "道に落ちているお金を拾うためにしゃがみました。", furigana: "みちにおちているおかねをひろうためにしゃがみました。", en: "為了撿掉在路上的錢而蹲下。" }] },
  { id: "v_tsumazuku", word: "つまずく", furigana: "つまずく", romaji: "tsumazuku", meaning: "絆倒", level: "N5", category: "body_physiology",
    sentences: [{ ja: "石につまずいて転びそうになりました。", furigana: "いしにつまずいてころびそうになりました。", en: "被石頭絆倒差點跌倒。" }] },
  { id: "v_korobu", word: "転ぶ", furigana: "ころぶ", romaji: "korobu", meaning: "跌倒", level: "N5", category: "body_physiology",
    sentences: [{ ja: "雪道で滑って転びました。", furigana: "ゆきみちですべってころびました。", en: "在雪地上滑了一跤跌倒了。" }] },
  { id: "v_suberu", word: "滑る", furigana: "すべる", romaji: "suberu", meaning: "滑倒 / 打滑", level: "N5", category: "body_physiology",
    sentences: [{ ja: "床が濡れていて滑りやすいです。", furigana: "ゆかがぬれていてすべりやすいです。", en: "地板濕濕的很容易滑倒。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_ikigurushii", word: "息苦しい", furigana: "いきぐるしい", romaji: "ikigurushii", meaning: "呼吸困難 / 悶", level: "N5", category: "health_medical",
    sentences: [{ ja: "満員電車の中はとても息苦しいです。", furigana: "まんいんでんしゃのなかはとてもいきぐるしいです。", en: "滿員電車裡非常悶得喘不過氣。" }] },
  { id: "v_shokuchuudoku", word: "食中毒", furigana: "しょくちゅうどく", romaji: "shokuchuudoku", meaning: "食物中毒", level: "N5", category: "health_medical",
    sentences: [{ ja: "古い刺身を食べて食中毒になりました。", furigana: "ふるいさしみをたべてしょくちゅうどくになりました。", en: "吃了不新鮮的生魚片導致食物中毒。" }] },
  { id: "v_mushisasare", word: "虫刺され", furigana: "むしさされ", romaji: "mushisasare", meaning: "蚊蟲叮咬", level: "N5", category: "health_medical",
    sentences: [{ ja: "虫刺されの薬を足に塗ります。", furigana: "むしさされのくすりをあしにぬります。", en: "在腳上塗抹蚊蟲叮咬的藥。" }] },
  { id: "v_kafunshou", word: "花粉症", furigana: "かふんしょう", romaji: "kafunshou", meaning: "花粉症", level: "N5", category: "health_medical",
    sentences: [{ ja: "春は花粉症でくしゃみが止まりません。", furigana: "はるはかふんしょうでくしゃみがとまりません。", en: "春天因為花粉症噴嚏打不停。" }] },
  { id: "v_gipusu", word: "ギプス", furigana: "ぎぷす", romaji: "gipusu", meaning: "石膏", level: "N5", category: "health_medical",
    sentences: [{ ja: "骨折したので腕にギプスをしています。", furigana: "こっせつしたのでうでにぎぷすをしています。", en: "因為骨折所以在手臂上打了石膏。" }] },
  { id: "v_tsue", word: "杖", furigana: "つえ", romaji: "tsue", meaning: "拐杖 / 手杖", level: "N5", category: "health_medical",
    sentences: [{ ja: "祖父は歩く時に杖を使います。", furigana: "そふはあるくときにつえをつかいます。", en: "祖父走路時會使用拐杖。" }] },
  { id: "v_menbou", word: "綿棒", furigana: "めんぼう", romaji: "menbou", meaning: "棉花棒", level: "N5", category: "health_medical",
    sentences: [{ ja: "お風呂上がりに綿棒で耳を掃除します。", furigana: "おふろあがりにめんぼうでみみをごうじします。", en: "洗完澡後用棉花棒清耳朵。" }] },
  { id: "v_tsumekiri", word: "爪切り", furigana: "つめきり", romaji: "tsumekiri", meaning: "指甲剪", level: "N5", category: "health_medical",
    sentences: [{ ja: "爪が伸びたので爪切りで切りました。", furigana: "つめがのびたのでつめきりできりました。", en: "指甲長長了，所以用指甲剪剪了。" }] },
  { id: "v_taijuukei", word: "体重計", furigana: "たいじゅうけい", romaji: "taijuukei", meaning: "體重計", level: "N5", category: "health_medical",
    sentences: [{ ja: "お風呂の前に体重計に乗ります。", furigana: "おふろのまえにたいじゅうけいにのります。", en: "洗澡前站上體重計量體重。" }] },
  { id: "v_massaaji", word: "マッサージ", furigana: "まっさーじ", romaji: "massaaji", meaning: "按摩", level: "N5", category: "health_medical",
    sentences: [{ ja: "肩こりがひどいのでマッサージに行きました。", furigana: "かたこりがひどいのでまっさーじにいきました。", en: "肩膀非常僵硬，所以去按摩了。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_amaeru", word: "甘える", furigana: "あまえる", romaji: "amaeru", meaning: "撒嬌", level: "N5", category: "psychology_character",
    sentences: [{ ja: "猫が私に甘えてきます。", furigana: "ねこがわたしにあまえてきます。", en: "貓咪向我撒嬌。" }] },
  { id: "v_okorippoi", word: "怒りっぽい", furigana: "おこりっぽい", romaji: "okorippoi", meaning: "易怒的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼は怒りっぽい性格なので注意してください。", furigana: "かれはおこりっぽいせいかくなのでちゅういしてください。", en: "他是易怒的性格，請注意。" }] },
  { id: "v_wasureppoi", word: "忘れっぽい", furigana: "わすれっぽい", romaji: "wasureppoi", meaning: "健忘的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "年をとって少し忘れっぽくなりました。", furigana: "としをとってすこしわすれっぽくなりました。", en: "年紀大了變得有些健忘。" }] },
  { id: "v_akippoi", word: "飽きっぽい", furigana: "あきっぽい", romaji: "akippoi", meaning: "容易厭倦的 / 三分鐘熱度", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私は飽きっぽいので、何でも長続きしません。", furigana: "わたしはあきっぽいので、なんでもながつづきしません。", en: "我很容易膩，所以做什麼都無法長久。" }] },
  { id: "v_hitomishiri", word: "人見知り", furigana: "ひとみしり", romaji: "hitomishiri", meaning: "怕生", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私の子供は人見知りが激しいです。", furigana: "わたしのこどもはひとみしりがはげしいです。", en: "我的小孩非常怕生。" }] },
  { id: "v_oshaberi", word: "おしゃべり", furigana: "おしゃべり", romaji: "oshaberi", meaning: "愛說話的 / 健談的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼女はとてもおしゃべりで、ずっと話しています。", furigana: "かのじょはとてもおしゃべりで、ずっとはなしています。", en: "她非常健談，一直在說話。" }] },
  { id: "v_mukuchi", word: "無口", furigana: "むくち", romaji: "mukuchi", meaning: "沉默寡言的", level: "N5", category: "psychology_character",
    sentences: [{ ja: "彼は無口ですが、とても優しいです。", furigana: "かれはむくちですが、とてもやさしいです。", en: "他雖然沉默寡言，但非常溫柔。" }] },
  { id: "v_kinisuru", word: "気にする", furigana: "きにする", romaji: "kinisuru", meaning: "介意 / 在意", level: "N5", category: "psychology_character",
    sentences: [{ ja: "他人の言葉をあまり気にしないでください。", furigana: "たにんのことばをあまりきにしないでください。", en: "請不要太在意別人的話。" }] },
  { id: "v_kigatsuku", word: "気がつく", furigana: "きがつく", romaji: "kigatsuku", meaning: "發現 / 注意到", level: "N5", category: "psychology_character",
    sentences: [{ ja: "忘れ物をしたことに、駅で気がつきました。", furigana: "わすれものをしたことに、えきできがつきました。", en: "在車站才發現自己忘了帶東西。" }] },
  { id: "v_omoidasu", word: "思い出す", furigana: "おもいだす", romaji: "omoidasu", meaning: "想起", level: "N5", category: "psychology_character",
    sentences: [{ ja: "昔の友達の顔を思い出しました。", furigana: "むかしのともだちのかおをおもいだしました。", en: "想起了以前朋友的臉。" }] },
  { id: "v_gokaisuru", word: "誤解する", furigana: "ごかいする", romaji: "gokaisuru", meaning: "誤解", level: "N5", category: "psychology_character",
    sentences: [{ ja: "私の言葉を誤解しないでください。", furigana: "わたしのことばをごかいしないでください。", en: "請不要誤會我的意思。" }] },
  { id: "v_sukkirisuru", word: "すっきりする", furigana: "すっきりする", romaji: "sukkirisuru", meaning: "舒暢 / 痛快", level: "N5", category: "psychology_character",
    sentences: [{ ja: "シャワーを浴びて気分がすっきりしました。", furigana: "しゃわーをあびてきぶんがすっきりしました。", en: "沖了個澡覺得神清氣爽。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart5.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 5) to data_n5.js!');
