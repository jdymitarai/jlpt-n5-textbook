const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const apexWords = [
  // ================= 重症・急救 (ICU & ER) =================
  { id: "v_toriaaji", word: "トリアージ", furigana: "とりあーじ", romaji: "toriaaji", meaning: "檢傷分類 (Triage)", level: "N5", category: "health_medical",
    sentences: [{ ja: "救急外来で患者のトリアージを行います。", furigana: "きゅうきゅうがいらいでかんじゃのとりあーじをおこないます。", en: "在急診室進行病患的檢傷分類。" }] },
  { id: "v_soukan", word: "挿管", furigana: "そうかん", romaji: "soukan", meaning: "插管 (Intubation)", level: "N5", category: "health_medical",
    sentences: [{ ja: "呼吸状態が悪化し、気管挿管が必要になりました。", furigana: "こきゅうじょうたいがあっかし、きかんそうかんがひつようになりました。", en: "呼吸狀態惡化，變得需要氣管插管。" }] },
  { id: "v_kikansekkai", word: "気管切開", furigana: "きかんせっかい", romaji: "kikansekkai", meaning: "氣切 (Tracheostomy)", level: "N5", category: "health_medical",
    sentences: [{ ja: "長期の人工呼吸管理のため気管切開をします。", furigana: "ちょうきのじんこうこきゅうかんりのためきかんせっかいをします。", en: "為了長期的呼吸器管理進行氣切。" }] },
  { id: "v_aed", word: "AED", furigana: "えーいーでぃー", romaji: "e-i-di-", meaning: "自動體外心臟去顫器", level: "N5", category: "health_medical",
    sentences: [{ ja: "倒れている人を見つけたらすぐにAEDを持ってきてください。", furigana: "たおれているひとをみつけたらすぐにえーいーでぃーをもらってきてください。", en: "如果發現有人倒下，請立刻拿AED過來。" }] },
  { id: "v_ecmo", word: "ECMO", furigana: "えくも", romaji: "ekumo", meaning: "葉克膜 (體外膜氧合)", level: "N5", category: "health_medical",
    sentences: [{ ja: "重症肺炎の患者にECMOを導入します。", furigana: "じゅうしょうはいえんのかんじゃにえくもをどうにゅうします。", en: "對重症肺炎病患導入葉克膜。" }] },
  { id: "v_kyuukyuusha", word: "救急車", furigana: "きゅうきゅうしゃ", romaji: "kyuukyuusha", meaning: "救護車", level: "N5", category: "health_medical",
    sentences: [{ ja: "意識がないので救急車を呼びましょう。", furigana: "いしきがないのできゅうきゅうしゃをよびましょう。", en: "因為沒有意識，我們叫救護車吧。" }] },

  // ================= 手術・器械 (Surgical & Instruments) =================
  { id: "v_mesu", word: "メス", furigana: "めす", romaji: "mesu", meaning: "手術刀", level: "N5", category: "health_medical",
    sentences: [{ ja: "医師がメスで皮膚を切開します。", furigana: "いしがめすでひふをせっかいします。", en: "醫師用手術刀切開皮膚。" }] },
  { id: "v_kanshi", word: "鉗子", furigana: "かんし", romaji: "kanshi", meaning: "鉗子", level: "N5", category: "health_medical",
    sentences: [{ ja: "出血を止めるために血管を鉗子ではさみます。", furigana: "しゅっけつをとめるためにけっかんをかんしではさみます。", en: "為了止血用鉗子夾住血管。" }] },
  { id: "v_pinsetto", word: "ピンセット", furigana: "ぴんせっと", romaji: "pinsetto", meaning: "鑷子", level: "N5", category: "health_medical",
    sentences: [{ ja: "ガーゼをピンセットで掴んで傷口に当てます。", furigana: "がーぜをぴんせっとでつかんできずぐちにあてます。", en: "用鑷子夾起紗布敷在傷口上。" }] },
  { id: "v_kaihuku", word: "開腹", furigana: "かいふく", romaji: "kaihuku", meaning: "剖腹 (開腹手術)", level: "N5", category: "health_medical",
    sentences: [{ ja: "腹腔鏡ではなく、開腹手術に切り替えます。", furigana: "ふくくうきょうではなく、かいふくしゅじゅつにきりかえます。", en: "不使用腹腔鏡，改為進行剖腹手術。" }] },
  { id: "v_hougou", word: "縫合", furigana: "ほうごう", romaji: "hougou", meaning: "縫合", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷口を5針縫合しました。", furigana: "きずぐちをごはりほうごうしました。", en: "傷口縫合了5針。" }] },
  { id: "v_masui", word: "麻酔", furigana: "ますい", romaji: "masui", meaning: "麻醉", level: "N5", category: "health_medical",
    sentences: [{ ja: "全身麻酔から覚めるまでそばにいます。", furigana: "ぜんしんますいからさめるまでそばにいます。", en: "在從全身麻醉醒來之前我都會待在旁邊。" }] },

  // ================= 医療記録・コミュニケーション (Records & Communication) =================
  { id: "v_karute", word: "カルテ", furigana: "かるて", romaji: "karute", meaning: "病歷 (電子/紙本)", level: "N5", category: "health_medical",
    sentences: [{ ja: "電子カルテに患者のバイタルを入力します。", furigana: "でんしかるてにかんじゃのばいたるをにゅうりょくします。", en: "將病患的生命徵象輸入電子病歷。" }] },
  { id: "v_infoumudokonsento", word: "インフォームドコンセント", furigana: "いんふぉーむどこんせんと", romaji: "infoumudokonsento", meaning: "知情同意 (IC)", level: "N5", category: "health_medical",
    sentences: [{ ja: "手術の前にインフォームドコンセントを行います。", furigana: "しゅじゅつのまえにいんふぉーむどこんせんとをおこないます。", en: "在手術前進行知情同意。" }] },
  { id: "v_kanfarensu", word: "カンファレンス", furigana: "かんふぁれんす", romaji: "kanfarensu", meaning: "病例討論會 (Conference)", level: "N5", category: "health_medical",
    sentences: [{ ja: "医師と看護師による合同カンファレンスを開きます。", furigana: "いしとかんごしによるごうどうかんふぁれんすをひらきます。", en: "召開由醫師和護理師共同參與的病例討論會。" }] },
  { id: "v_inshidento", word: "インシデント", furigana: "いんしでんと", romaji: "inshidento", meaning: "醫療異常事件 (Incident)", level: "N5", category: "health_medical",
    sentences: [{ ja: "薬の配り間違いを防げた事例をインシデントとして報告します。", furigana: "くすりのくばりまちがいをふせげたじれいをいんしでんととしてほうこくします。", en: "將成功防止發錯藥的案例作為異常事件報告。" }] },

  // ================= 腫瘍・緩和ケア (Oncology & Palliative) =================
  { id: "v_kouganzai", word: "抗がん剤", furigana: "こうがんざい", romaji: "kouganzai", meaning: "化療藥物", level: "N5", category: "health_medical",
    sentences: [{ ja: "抗がん剤の副作用で吐き気が強いです。", furigana: "こうがんざいのふくさようではきけがつよいです。", en: "因為化療藥物的副作用，噁心感很強烈。" }] },
  { id: "v_houshasenchiryou", word: "放射線治療", furigana: "ほうしゃせんちりょう", romaji: "houshasenchiryou", meaning: "放射線治療 (電療)", level: "N5", category: "health_medical",
    sentences: [{ ja: "腫瘍を小さくするために放射線治療を受けます。", furigana: "しゅようをちいさくするためにほうしゃせんちりょうをうけます。", en: "為了讓腫瘤變小而接受放射線治療。" }] },
  { id: "v_kanwakea", word: "緩和ケア", furigana: "かんわけあ", romaji: "kanwakea", meaning: "安寧療護 (Palliative care)", level: "N5", category: "health_medical",
    sentences: [{ ja: "痛みをコントロールする緩和ケア病棟に移ります。", furigana: "いたみをこんとろーるするかんわけあびょうとうにうつります。", en: "轉移到能控制疼痛的安寧病房。" }] },
  { id: "v_taaminaru", word: "ターミナルケア", furigana: "たーみなるけあ", romaji: "taaminaru", meaning: "臨終照護 (Terminal care)", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者さんが穏やかに最期を迎えられるようターミナルケアを行います。", furigana: "かんじゃさんがおだやかにさいごをむかえられるようたーみなるけあをおこないます。", en: "進行臨終照護，讓病患能平靜地迎接最後時刻。" }] },

  // ================= 検査・生化指標 (Lab Values) =================
  { id: "v_crp", word: "CRP", furigana: "しーあーるぴー", romaji: "shi-a-rupi-", meaning: "發炎指標 (C反應蛋白)", level: "N5", category: "health_medical",
    sentences: [{ ja: "血液検査でCRPの値が高く、炎症があります。", furigana: "けつえきけんさでしーあーるぴーのあたいがたかく、えんしょうがあります。", en: "血液檢查中CRP數值偏高，表示有發炎。" }] },
  { id: "v_hemogurobin", word: "ヘモグロビン", furigana: "へもぐろびん", romaji: "hemogurobin", meaning: "血紅素", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ヘモグロビン値が低いため、貧血の治療が必要です。", furigana: "へもぐろびんちがひくいため、ひんけつのちりょうがひつようです。", en: "因為血紅素數值偏低，需要治療貧血。" }] },
  { id: "v_kureachinin", word: "クレアチニン", furigana: "くれあちにん", romaji: "kureachinin", meaning: "肌酸酐 (腎功能指標)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "クレアチニンの数値が上昇しており、腎機能が低下しています。", furigana: "くれあちにんのすうちがじょうしょうしており、じんきのうがていかしています。", en: "肌酸酐數值正在上升，腎功能正在下降。" }] },
  { id: "v_koresuterooru", word: "コレステロール", furigana: "これすてろーる", romaji: "koresuterooru", meaning: "膽固醇", level: "N5", category: "body_physiology",
    sentences: [{ ja: "悪玉コレステロールを減らす食事を心がけます。", furigana: "あくだまこれすてろーるをへらすしょくじをこころがけます。", en: "留心攝取能減少壞膽固醇的飲食。" }] },

  // ================= 歯科・耳鼻咽喉科 (Dental & ENT) =================
  { id: "v_ushoku", word: "う蝕", furigana: "うしょく", romaji: "ushoku", meaning: "蛀牙 (齲齒)", level: "N5", category: "health_medical",
    sentences: [{ ja: "子供の歯にう蝕（虫歯）がないか検診します。", furigana: "こどもの歯にうしょく（むしば）がないかけんしんします。", en: "檢查小孩子的牙齒有沒有蛀牙。" }] },
  { id: "v_shishuubyou", word: "歯周病", furigana: "ししゅうびょう", romaji: "shishuubyou", meaning: "牙周病", level: "N5", category: "health_medical",
    sentences: [{ ja: "歯周病が進行すると歯が抜けてしまいます。", furigana: "ししゅうびょうがしんこうするとはがぬけてしまいます。", en: "牙周病惡化的話牙齒就會脫落。" }] },
  { id: "v_hentouen", word: "扁桃炎", furigana: "へんとうえん", romaji: "hentouen", meaning: "扁桃腺炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "扁桃炎で熱が出て喉が痛いです。", furigana: "へんとうえんでねつがでてのどがいたいです。", en: "因為扁桃腺炎發燒且喉嚨痛。" }] },
  { id: "v_arerugiisei", word: "アレルギー性鼻炎", furigana: "あれるぎーせいびえん", romaji: "arerugiiseibien", meaning: "過敏性鼻炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "アレルギー性鼻炎でくしゃみが止まりません。", furigana: "あれるぎーせいびえんでくしゃみがとまりません。", en: "因為過敏性鼻炎導致打噴嚏打不停。" }] },

  // ================= 眼科・皮膚科 (Ophthalmology & Dermatology) =================
  { id: "v_ketsumakuen", word: "結膜炎", furigana: "けつまくえん", romaji: "ketsumakuen", meaning: "結膜炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "ウイルス性の結膜炎は人にうつりやすいです。", furigana: "ういるすせいのけつまくえんはひとにうつりやすいです。", en: "病毒性結膜炎很容易傳染給別人。" }] },
  { id: "v_shisshin", word: "湿疹", furigana: "しっしん", romaji: "shisshin", meaning: "濕疹", level: "N5", category: "health_medical",
    sentences: [{ ja: "腕に赤い湿疹ができて痒いです。", furigana: "うでにあかいしっしんができてかゆいです。", en: "手臂長了紅色的濕疹很癢。" }] },
  { id: "v_atopiisei", word: "アトピー性皮膚炎", furigana: "あとぴーせいひふえん", romaji: "atopiiseihifuen", meaning: "異位性皮膚炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "乾燥する時期はアトピー性皮膚炎が悪化しやすいです。", furigana: "かんそうするじきはあとぴーせいひふえんがあっかしやすいです。", en: "乾燥的季節異位性皮膚炎容易惡化。" }] },
  { id: "v_jinmashin", word: "蕁麻疹", furigana: "じんましん", romaji: "jinmashin", meaning: "蕁麻疹", level: "N5", category: "health_medical",
    sentences: [{ ja: "エビを食べたら急に蕁麻疹が出ました。", furigana: "えびをたべたらきゅうにじんましんでました。", en: "吃了蝦子之後突然長出蕁麻疹。" }] },

  // ================= 小児科・感染症 (Pediatrics & Infectious) =================
  { id: "v_mashin", word: "麻疹", furigana: "ましん", romaji: "mashin", meaning: "麻疹", level: "N5", category: "health_medical",
    sentences: [{ ja: "麻疹（はしか）は感染力が非常に強い病気です。", furigana: "ましんはかんせんりょくがひじょうにつよいびょうきです。", en: "麻疹是傳染力非常強的疾病。" }] },
  { id: "v_fuushin", word: "風疹", furigana: "ふうしん", romaji: "fuushin", meaning: "德國麻疹 (風疹)", level: "N5", category: "health_medical",
    sentences: [{ ja: "妊娠初期に風疹にかかると胎児に影響が出ることがあります。", furigana: "にんしんしょきにふうしんにかかるとたいじにえいきょうがでることがあります。", en: "懷孕初期感染德國麻疹可能會對胎兒造成影響。" }] },
  { id: "v_suitou", word: "水痘", furigana: "すいとう", romaji: "suitou", meaning: "水痘", level: "N5", category: "health_medical",
    sentences: [{ ja: "保育園で水痘（水ぼうそう）が流行っています。", furigana: "ほいくえんですいとうがはやっています。", en: "托兒所正在流行水痘。" }] },
  { id: "v_otafukukaze", word: "おたふく風邪", furigana: "おたふくかぜ", romaji: "otafukukaze", meaning: "腮腺炎 (豬頭皮)", level: "N5", category: "health_medical",
    sentences: [{ ja: "おたふく風邪で耳の下が大きく腫れました。", furigana: "おたふくかぜでみみのしたがおおきくはれました。", en: "因為腮腺炎導致耳朵下方腫得很大。" }] },
  { id: "v_yonaki", word: "夜泣き", furigana: "よなき", romaji: "yonaki", meaning: "半夜哭鬧", level: "N5", category: "health_medical",
    sentences: [{ ja: "赤ちゃんのひどい夜泣きで寝不足です。", furigana: "あかちゃんのひどいよなきでねぶそくです。", en: "因為嬰兒嚴重地半夜哭鬧導致睡眠不足。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(apexWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', apexWords.length, 'apex medical words to data_n5.js!');
