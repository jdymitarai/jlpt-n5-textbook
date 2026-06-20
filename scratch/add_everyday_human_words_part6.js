const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const everydayWordsPart6 = [
  // ================= 身體部位與生理 (Body & Actions) =================
  { id: "v_namida", word: "涙", furigana: "なみだ", romaji: "namida", meaning: "眼淚", level: "N4", category: "body_physiology",
    sentences: [{ ja: "悲しくて涙が出ました。", furigana: "かなしくてなみだがでました。", en: "太悲傷流下了眼淚。" }] },
  { id: "v_tsuba", word: "つば", furigana: "つば", romaji: "tsuba", meaning: "口水 / 唾液", level: "N4", category: "body_physiology",
    sentences: [{ ja: "美味しい匂いでつばが出ます。", furigana: "おいしいにおいでつばがでます。", en: "好聞的味道讓人流口水。" }] },
  { id: "v_hifu", word: "皮膚", furigana: "ひふ", romaji: "hifu", meaning: "皮膚", level: "N4", category: "body_physiology",
    sentences: [{ ja: "冬は乾燥して皮膚が痒くなります。", furigana: "ふゆはかんそうしてひふがかゆくなります。", en: "冬天乾燥皮膚會變癢。" }] },
  { id: "v_hone", word: "骨", furigana: "ほね", romaji: "hone", meaning: "骨頭", level: "N4", category: "body_physiology",
    sentences: [{ ja: "魚の骨が喉に刺さりました。", furigana: "さかなのほねがのどにささりました。", en: "魚骨頭卡在喉嚨了。" }] },
  { id: "v_kinniku", word: "筋肉", furigana: "きんにく", romaji: "kinniku", meaning: "肌肉", level: "N4", category: "body_physiology",
    sentences: [{ ja: "毎日運動して筋肉をつけます。", furigana: "まいにちうんどうしてきんにくをつけます。", en: "每天運動增加肌肉。" }] },
  { id: "v_kekkan", word: "血管", furigana: "けっかん", romaji: "kekkan", meaning: "血管", level: "N4", category: "body_physiology",
    sentences: [{ ja: "腕の血管がよく見えます。", furigana: "うでのけっかんがよくみえます。", en: "手臂的血管看得很清楚。" }] },
  { id: "v_iki", word: "息", furigana: "いき", romaji: "iki", meaning: "呼吸 / 氣息", level: "N5", category: "body_physiology",
    sentences: [{ ja: "深く息を吸ってください。", furigana: "ふかくいきをすってください。", en: "請深深地吸氣。" }] },
  { id: "v_koe", word: "声", furigana: "こえ", romaji: "koe", meaning: "聲音", level: "N5", category: "body_physiology",
    sentences: [{ ja: "彼女はとてもきれいな声で歌います。", furigana: "かのじょはとてもきれいなこえでうたいます。", en: "她用非常優美的聲音唱歌。" }] },
  { id: "v_jumyou", word: "寿命", furigana: "じゅみょう", romaji: "jumyou", meaning: "壽命", level: "N4", category: "body_physiology",
    sentences: [{ ja: "日本人の平均寿命は長いです。", furigana: "にほんじんのへいきんじゅみょうはながいです。", en: "日本人的平均壽命很長。" }] },
  { id: "v_nenrei", word: "年齢", furigana: "ねんれい", romaji: "nenrei", meaning: "年齡", level: "N4", category: "body_physiology",
    sentences: [{ ja: "この仕事は年齢に関係なくできます。", furigana: "このしごとはねんれいにかんけいなくできます。", en: "這份工作與年齡無關都可以做。" }] },
  { id: "v_shisei", word: "姿勢", furigana: "しせい", romaji: "shisei", meaning: "姿勢", level: "N4", category: "body_physiology",
    sentences: [{ ja: "姿勢を良くして座ってください。", furigana: "しせいをよくしてすわってください。", en: "請保持好姿勢坐著。" }] },
  { id: "v_utsubuse", word: "うつぶせ", furigana: "うつぶせ", romaji: "utsubuse", meaning: "趴著 / 俯臥", level: "N4", category: "body_physiology",
    sentences: [{ ja: "ベッドにうつぶせになって本を読みます。", furigana: "べっどにうつぶせになってほんをよみます。", en: "趴在床上看書。" }] },
  { id: "v_aomuke", word: "仰向け", furigana: "あおむけ", romaji: "aomuke", meaning: "仰躺 / 仰臥", level: "N4", category: "body_physiology",
    sentences: [{ ja: "仰向けに寝て、星を見ました。", furigana: "あおむけにねて、ほしをみました。", en: "仰躺著看星星。" }] },
  { id: "v_hadashi", word: "裸足", furigana: "はだし", romaji: "hadashi", meaning: "赤腳", level: "N4", category: "body_physiology",
    sentences: [{ ja: "砂浜を裸足で歩くのは気持ちいいです。", furigana: "すなはまをはだしであるくのはきもちいいです。", en: "赤腳走在沙灘上很舒服。" }] },

  // ================= 常見疾病與常規醫療 (Everyday Health & Medical) =================
  { id: "v_itamidome", word: "痛み止め", furigana: "いたみどめ", romaji: "itamidome", meaning: "止痛藥", level: "N4", category: "health_medical",
    sentences: [{ ja: "頭が痛いので痛み止めを飲みました。", furigana: "あたまがいたいのでいたみどめをのみました。", en: "因為頭痛吃了止痛藥。" }] },
  { id: "v_igusuri", word: "胃薬", furigana: "いぐすり", romaji: "igusuri", meaning: "胃藥", level: "N4", category: "health_medical",
    sentences: [{ ja: "食べすぎて胃薬を飲みました。", furigana: "たべすぎていぐすりをのみました。", en: "吃太多所以吃了胃藥。" }] },
  { id: "v_suiminyaku", word: "睡眠薬", furigana: "すいみんやく", romaji: "suiminyaku", meaning: "安眠藥", level: "N4", category: "health_medical",
    sentences: [{ ja: "眠れない時は医者に睡眠薬をもらいます。", furigana: "ねむれないときはいしゃにすいみんやくをもらいます。", en: "睡不著的時候會請醫生開安眠藥。" }] },
  { id: "v_jouzai", word: "錠剤", furigana: "じょうざい", romaji: "jouzai", meaning: "藥丸 / 藥錠", level: "N4", category: "health_medical",
    sentences: [{ ja: "この錠剤を１日３回飲んでください。", furigana: "このじょうざいをいちにちさんかいのんでください。", en: "這個藥丸請一天吃三次。" }] },
  { id: "v_konagusuri", word: "粉薬", furigana: "こなぐすり", romaji: "konagusuri", meaning: "藥粉", level: "N4", category: "health_medical",
    sentences: [{ ja: "子供は粉薬が苦手です。", furigana: "こどもはこなぐすりがにがてです。", en: "小孩很怕吃藥粉。" }] },
  { id: "v_fukusayou", word: "副作用", furigana: "ふくさよう", romaji: "fukusayou", meaning: "副作用", level: "N4", category: "health_medical",
    sentences: [{ ja: "この薬は眠くなる副作用があります。", furigana: "このくすりはねむくなるふくさようがあります。", en: "這個藥有會讓人想睡的副作用。" }] },
  { id: "v_shoujou", word: "症状", furigana: "しょうじょう", romaji: "shoujou", meaning: "症狀", level: "N4", category: "health_medical",
    sentences: [{ ja: "風邪の症状は熱と咳です。", furigana: "かぜのしょうじょうはねつとせきです。", en: "感冒的症狀是發燒和咳嗽。" }] },
  { id: "v_yobou", word: "予防", furigana: "よぼう", romaji: "yobou", meaning: "預防", level: "N4", category: "health_medical",
    sentences: [{ ja: "手洗いは病気の予防に大切です。", furigana: "てあらいはびょうきのよぼうにたいせつです。", en: "洗手對預防疾病很重要。" }] },
  { id: "v_shindan", word: "診断", furigana: "しんだん", romaji: "shindan", meaning: "診斷", level: "N4", category: "health_medical",
    sentences: [{ ja: "病院で医者の診断を受けました。", furigana: "びょういんでいしゃのしんだんをうけました。", en: "在醫院接受了醫生的診斷。" }] },
  { id: "v_chiryou", word: "治療", furigana: "ちりょう", romaji: "chiryou", meaning: "治療", level: "N4", category: "health_medical",
    sentences: [{ ja: "虫歯の治療には時間がかかります。", furigana: "むしばのちりょうにはじかんがかかります。", en: "蛀牙的治療需要花時間。" }] },
  { id: "v_shujutsu", word: "手術", furigana: "しゅじゅつ", romaji: "shujutsu", meaning: "手術", level: "N4", category: "health_medical",
    sentences: [{ ja: "来週、目の手術をします。", furigana: "らいしゅう、めのしゅじゅつをします。", en: "下週要做眼睛的手術。" }] },
  { id: "v_nyuuin", word: "入院", furigana: "にゅういん", romaji: "nyuuin", meaning: "住院", level: "N4", category: "health_medical",
    sentences: [{ ja: "怪我をして１週間入院しました。", furigana: "けがをしていっしゅうかんにゅういんしました。", en: "因為受傷住院了一個星期。" }] },
  { id: "v_taiin", word: "退院", furigana: "たいいん", romaji: "taiin", meaning: "出院", level: "N4", category: "health_medical",
    sentences: [{ ja: "明日やっと退院できます。", furigana: "あしたやっとたいいんできます。", en: "明天終於可以出院了。" }] },
  { id: "v_mimai", word: "見舞い", furigana: "みまい", romaji: "mimai", meaning: "探病", level: "N4", category: "health_medical",
    sentences: [{ ja: "友達のお見舞いに花を買って行きます。", furigana: "ともだちのおみまいにばなをかっていきます。", en: "買了花去探望朋友。" }] },

  // ================= 心理情感與性格 (Psychology & Character) =================
  { id: "v_shiawase", word: "幸せ", furigana: "しあわせ", romaji: "shiawase", meaning: "幸福", level: "N4", category: "psychology_character",
    sentences: [{ ja: "家族と一緒にいる時が一番幸せです。", furigana: "かぞくといっしょにいるときがいちばんしあわせです。", en: "和家人在一起的時候最幸福。" }] },
  { id: "v_fuan", word: "不安", furigana: "ふあん", romaji: "fuan", meaning: "不安", level: "N4", category: "psychology_character",
    sentences: [{ ja: "テストの結果がどうなるか不安です。", furigana: "てすとのけっかがどうなるかふあんです。", en: "對考試結果會怎樣感到不安。" }] },
  { id: "v_anshin", word: "安心", furigana: "あんしん", romaji: "anshin", meaning: "安心 / 放心", level: "N4", category: "psychology_character",
    sentences: [{ ja: "無事についたと聞いて安心しました。", furigana: "ぶじについたときいてあんしんしました。", en: "聽到平安抵達的消息就放心了。" }] },
  { id: "v_manzoku", word: "満足", furigana: "まんぞく", romaji: "manzoku", meaning: "滿意", level: "N4", category: "psychology_character",
    sentences: [{ ja: "今日の夕食はとても美味しくて満足です。", furigana: "きょうのゆうしょくはとてもおいしくてまんぞくです。", en: "今天的晚餐非常美味，很滿意。" }] },
  { id: "v_fuman", word: "不満", furigana: "ふまん", romaji: "fuman", meaning: "不滿", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼は今の給料に不満を持っています。", furigana: "かれはいまのきゅうりょうにふまんをもっています。", en: "他對現在的薪水感到不滿。" }] },
  { id: "v_jishin", word: "自信", furigana: "じしん", romaji: "jishin", meaning: "自信", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼女は自分の英語に自信があります。", furigana: "かのじょはじぶんのえいごにじしんがあります。", en: "她對自己的英文有自信。" }] },
  { id: "v_kakugo", word: "覚悟", furigana: "かくご", romaji: "kakugo", meaning: "覺悟", level: "N4", category: "psychology_character",
    sentences: [{ ja: "何があっても頑張る覚悟です。", furigana: "なにがあってもがんばるかくごです。", en: "有著無論發生什麼都會努力的覺悟。" }] },
  { id: "v_kesshin", word: "決心", furigana: "けっしん", romaji: "kesshin", meaning: "決心", level: "N4", category: "psychology_character",
    sentences: [{ ja: "来年日本へ行くことを決心しました。", furigana: "らいねんにほんへいくことをけっしんしました。", en: "下定決心明年要去日本。" }] },
  { id: "v_amaenbou", word: "甘えん坊", furigana: "あまえんぼう", romaji: "amaenbou", meaning: "愛撒嬌的人", level: "N4", category: "psychology_character",
    sentences: [{ ja: "末っ子はいつも甘えん坊です。", furigana: "すえっこはいつもあまえんぼうです。", en: "老么總是很愛撒嬌。" }] },
  { id: "v_makezugirai", word: "負けず嫌い", furigana: "まけずぎらい", romaji: "makezugirai", meaning: "不服輸的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼は負けず嫌いなので、ゲームでも絶対に負けたくないです。", furigana: "かれはまけずぎらいなので、げーむでもぜったいにまけたくないです。", en: "他很不服輸，所以連玩遊戲也絕對不想輸。" }] },
  { id: "v_kichoumen", word: "几帳面", furigana: "きちょうめん", romaji: "kichoumen", meaning: "一絲不苟的 / 愛乾淨整齊的", level: "N4", category: "psychology_character",
    sentences: [{ ja: "彼女は几帳面な性格で、机の上がいつもきれいです。", furigana: "かのじょはきちょうめんなせいかくで、つくえのうえがいつもきれいです。", en: "她性格一絲不苟，桌上總是乾乾淨淨的。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = everydayWordsPart6.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'everyday life words (part 6) to data_n5.js!');
