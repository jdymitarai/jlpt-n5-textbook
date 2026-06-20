const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const ultimateWords = [
  // ================= 薬理学・薬剤 (Pharmacology & Drugs) =================
  { id: "v_kouseibusshitsu", word: "抗生物質", furigana: "こうせいぶっしつ", romaji: "kouseibusshitsu", meaning: "抗生素", level: "N5", category: "health_medical",
    sentences: [{ ja: "細菌感染を抑えるために抗生物質を点滴します。", furigana: "さいきんかんせんをおさえるためにこうせいぶっしつをてんてきします。", en: "為了抑制細菌感染而注射抗生素點滴。" }] },
  { id: "v_chintsuuzai", word: "鎮痛剤", furigana: "ちんつうざい", romaji: "chintsuuzai", meaning: "止痛藥", level: "N5", category: "health_medical",
    sentences: [{ ja: "痛みが強い時は鎮痛剤を飲んでください。", furigana: "いたみがつよいときはちんつうざいをのんでください。", en: "疼痛強烈時請服用止痛藥。" }] },
  { id: "v_genetsuzai", word: "解熱剤", furigana: "げねつざい", romaji: "genetsuzai", meaning: "退燒藥", level: "N5", category: "health_medical",
    sentences: [{ ja: "38度以上の熱が出たら解熱剤を使います。", furigana: "さんじゅうはちどいじょうのねつがでたらげねつざいをつかいます。", en: "如果發燒超過38度就使用退燒藥。" }] },
  { id: "v_rinyouyaku", word: "利尿薬", furigana: "りにょうやく", romaji: "rinyouyaku", meaning: "利尿劑", level: "N5", category: "health_medical",
    sentences: [{ ja: "浮腫を取るために利尿薬が処方されました。", furigana: "ふしゅをとるためにりにょうやくがしょほうされました。", en: "處方了利尿劑來消除水腫。" }] },
  { id: "v_kouatsuyaku", word: "降圧薬", furigana: "こうあつやく", romaji: "kouatsuyaku", meaning: "降血壓藥", level: "N5", category: "health_medical",
    sentences: [{ ja: "毎朝欠かさず降圧薬を飲んでいます。", furigana: "まいあさかかさずこうあつやくをのんでいます。", en: "每天早上都不間斷地服用降血壓藥。" }] },
  { id: "v_suteroido", word: "ステロイド", furigana: "すてろいど", romaji: "suteroido", meaning: "類固醇", level: "N5", category: "health_medical",
    sentences: [{ ja: "重いアレルギー症状にステロイドを使用します。", furigana: "おもいあれるぎーしょうじょうにすてろいどをしようします。", en: "對嚴重的過敏症狀使用類固醇。" }] },
  { id: "v_mayaku", word: "麻薬", furigana: "まやく", romaji: "mayaku", meaning: "麻醉藥 (醫療毒品/嗎啡類)", level: "N5", category: "health_medical",
    sentences: [{ ja: "がんの激しい痛みを和らげるために医療用麻薬を使います。", furigana: "がんのはげしいいたみをやわらげるためにいりょうようまやくをつかいます。", en: "為了緩解癌症的劇烈疼痛而使用醫療用麻醉藥（嗎啡類）。" }] },
  { id: "v_keikoutouyo", word: "経口投与", furigana: "けいこうとうよ", romaji: "keikoutouyo", meaning: "口服投藥", level: "N5", category: "health_medical",
    sentences: [{ ja: "この薬は経口投与が可能です。", furigana: "このくすりはけいこうとうよがかのうです。", en: "這種藥物可以透過口服投藥。" }] },
  { id: "v_kyokusyomasui", word: "局所麻酔", furigana: "きょくしょますい", romaji: "kyokusyomasui", meaning: "局部麻醉", level: "N5", category: "health_medical",
    sentences: [{ ja: "局所麻酔をしてから傷口を縫合します。", furigana: "きょくしょますいをしてからきずぐちをほうごうします。", en: "進行局部麻醉後縫合傷口。" }] },

  // ================= 医療機器・臨床検査 (Medical Devices & Testing) =================
  { id: "v_chuushaki", word: "注射器", furigana: "ちゅうしゃき", romaji: "chuushaki", meaning: "注射器 (針筒)", level: "N5", category: "health_medical",
    sentences: [{ ja: "使用済みの注射器は専用の容器に捨てます。", furigana: "しようずみのちゅうしゃきはせんようのようきにすてます。", en: "使用過的針筒要丟進專用的容器裡。" }] },
  { id: "v_kateeteru", word: "カテーテル", furigana: "かてーてる", romaji: "kateeteru", meaning: "導管 (Catheter)", level: "N5", category: "health_medical",
    sentences: [{ ja: "血管内にカテーテルを挿入して検査します。", furigana: "けっかんないにかてーてるをそうにゅうしてけんさします。", en: "將導管插入血管內進行檢查。" }] },
  { id: "v_peesumeekaa", word: "ペースメーカー", furigana: "ぺーすめーかー", romaji: "peesumeekaa", meaning: "心律調節器", level: "N5", category: "health_medical",
    sentences: [{ ja: "不整脈のためペースメーカーを埋め込みました。", furigana: "ふせいみゃくのためぺーすめーかーをうめこみました。", en: "因為心律不整所以植入了心律調節器。" }] },
  { id: "v_jinkoukokyuuki", word: "人工呼吸器", furigana: "じんこうこきゅうき", romaji: "jinkoukokyuuki", meaning: "人工呼吸器 (呼吸器)", level: "N5", category: "health_medical",
    sentences: [{ ja: "自発呼吸が弱いため人工呼吸器を装着します。", furigana: "じはつこきゅうがよわいためじんこうこきゅうきをそうちゃくします。", en: "因為自主呼吸微弱，所以裝上人工呼吸器。" }] },
  { id: "v_ekoo", word: "エコー", furigana: "えこー", romaji: "ekoo", meaning: "超音波檢查", level: "N5", category: "health_medical",
    sentences: [{ ja: "腹部エコーで肝臓の状態を確認します。", furigana: "ふくぶえこーでかんぞうのじょうたいをかくにんします。", en: "用腹部超音波確認肝臟的狀態。" }] },
  { id: "v_nyoukensa", word: "尿検査", furigana: "にょうけんさ", romaji: "nyoukensa", meaning: "尿液檢查", level: "N5", category: "health_medical",
    sentences: [{ ja: "尿検査で糖やタンパクが下りていないか調べます。", furigana: "にょうけんさでとうやたんぱくがおりていないかしらべます。", en: "透過尿液檢查確認是否有尿糖或尿蛋白。" }] },
  { id: "v_bensenketsu", word: "便潜血", furigana: "べんせんけつ", romaji: "bensenketsu", meaning: "糞便潛血", level: "N5", category: "health_medical",
    sentences: [{ ja: "大腸がん検診で便潜血を調べます。", furigana: "だいちょうがんけんしんでべんせんけつをしらべます。", en: "在大腸癌篩檢中檢查糞便潛血。" }] },

  // ================= 看護技術・ケア (Advanced Nursing Skills) =================
  { id: "v_sansokyounyuu", word: "酸素吸入", furigana: "さんそきゅうにゅう", romaji: "sansokyounyuu", meaning: "氧氣吸入", level: "N5", category: "health_medical",
    sentences: [{ ja: "息苦しいため酸素吸入を開始します。", furigana: "いきぐるしいためさんそきゅうにゅうをかいしします。", en: "因為呼吸困難開始給予氧氣吸入。" }] },
  { id: "v_spO2", word: "経皮的酸素飽和度", furigana: "けいひてきさんそほうわど", romaji: "keihitekicansohouwado", meaning: "血氧飽和度 (SpO2)", level: "N5", category: "health_medical",
    sentences: [{ ja: "モニターで経皮的酸素飽和度を監視します。", furigana: "もにたーでけいひてきさんそほうわどをかんしします。", en: "用監視器監控血氧飽和度。" }] },
  { id: "v_soushoushochi", word: "創傷処置", furigana: "そうしょうしょち", romaji: "soushoushochi", meaning: "傷口處理 (換藥)", level: "N5", category: "health_medical",
    sentences: [{ ja: "毎日ガーゼを交換して創傷処置を行います。", furigana: "まいにちがーぜをこうかんしてそうしょうしょちをおこないます。", en: "每天更換紗布進行傷口處理。" }] },
  { id: "v_basshi", word: "抜糸", furigana: "ばっし", romaji: "basshi", meaning: "拆線", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷が塞がったので来週抜糸をします。", furigana: "きずがふさがったのでらいしゅうばっしをします。", en: "因為傷口癒合了，下週進行拆線。" }] },
  { id: "v_doreen", word: "ドレーン", furigana: "どれーん", romaji: "doreen", meaning: "引流管", level: "N5", category: "health_medical",
    sentences: [{ ja: "手術後の体液を排出するためにドレーンを入れます。", furigana: "しゅじゅつごのたいえきをはいしゅつするためにどれーんをいれます。", en: "為了排出術後的體液放入了引流管。" }] },
  { id: "v_koukuukea", word: "口腔ケア", furigana: "こうくうけあ", romaji: "koukuukea", meaning: "口腔護理", level: "N5", category: "health_medical",
    sentences: [{ ja: "肺炎予防のために毎食後の口腔ケアが重要です。", furigana: "はいえんよぼうのためにまいしょくごのこうくうけあがじゅうようです。", en: "為了預防肺炎，每餐後的口腔護理非常重要。" }] },

  // ================= 疾患名・病態 (Specific Diseases & Pathologies) =================
  { id: "v_tounyoubyou", word: "糖尿病", furigana: "とうにょうびょう", romaji: "tounyoubyou", meaning: "糖尿病", level: "N5", category: "health_medical",
    sentences: [{ ja: "糖尿病の治療には食事療法が欠かせません。", furigana: "とうにょうびょうのちりょうにはしょくじりょうほうがかかせません。", en: "糖尿病的治療中，飲食療法是不可或缺的。" }] },
  { id: "v_kouketsuatsu", word: "高血圧", furigana: "こうけつあつ", romaji: "kouketsuatsu", meaning: "高血壓", level: "N5", category: "health_medical",
    sentences: [{ ja: "塩分の摂りすぎは高血圧の原因になります。", furigana: "えんぶんのとりすぎはこうけつあつのげんいんになります。", en: "攝取過多鹽分會成為高血壓的原因。" }] },
  { id: "v_nousocchuu", word: "脳卒中", furigana: "のうそっちゅう", romaji: "nousocchuu", meaning: "腦中風", level: "N5", category: "health_medical",
    sentences: [{ ja: "脳卒中で倒れ、右半身に麻痺が残りました。", furigana: "のうそっちゅうでたおれ、みぎはんしんにまひがのこりました。", en: "因為腦中風倒下，右半身留下了麻痺。" }] },
  { id: "v_shinkinkousoku", word: "心筋梗塞", furigana: "しんきんこうそく", romaji: "shinkinkousoku", meaning: "心肌梗塞", level: "N5", category: "health_medical",
    sentences: [{ ja: "激しい胸の痛みは心筋梗塞のサインかもしれません。", furigana: "はげしいむねのいたみはしんきんこうそくのさいんかもしれません。", en: "劇烈的胸痛可能是心肌梗塞的前兆。" }] },
  { id: "v_shinfuzen", word: "心不全", furigana: "しんふぜん", romaji: "shinfuzen", meaning: "心衰竭", level: "N5", category: "health_medical",
    sentences: [{ ja: "心不全が悪化して呼吸が苦しくなります。", furigana: "しんふぜんがあっかしてこきゅうがくるしくなります。", en: "心衰竭惡化導致呼吸變得困難。" }] },
  { id: "v_haien", word: "肺炎", furigana: "はいえん", romaji: "haien", meaning: "肺炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "高齢者の肺炎は命に関わることがあります。", furigana: "こうれいしゃのはいえんはいのちにかかわることがあります。", en: "高齡者的肺炎有時會危及生命。" }] },
  { id: "v_zensoku", word: "喘息", furigana: "ぜんそく", romaji: "zensoku", meaning: "氣喘", level: "N5", category: "health_medical",
    sentences: [{ ja: "夜中に喘息の発作が起きて吸入器を使いました。", furigana: "よなかにぜんそくのほっさがおきてきゅうにゅうきをつかいました。", en: "半夜氣喘發作使用了吸入器。" }] },
  { id: "v_hakunaishou", word: "白内障", furigana: "はくないしょう", romaji: "hakunaishou", meaning: "白內障", level: "N5", category: "health_medical",
    sentences: [{ ja: "白内障の手術で視力が回復しました。", furigana: "はくないしょうのしゅじゅつでしりょくがかいふくしました。", en: "透過白內障手術恢復了視力。" }] },
  { id: "v_ryokunaishou", word: "緑内障", furigana: "りょくないしょう", romaji: "ryokunaishou", meaning: "青光眼", level: "N5", category: "health_medical",
    sentences: [{ ja: "緑内障は眼圧が高くなり視野が狭くなる病気です。", furigana: "りょくないしょうはがんあつがたくなりしやがせまくなるびょうきです。", en: "青光眼是眼壓升高導致視野變窄的疾病。" }] },
  { id: "v_kotsusoshoushou", word: "骨粗鬆症", furigana: "こつそしょうしょう", romaji: "kotsusoshoushou", meaning: "骨質疏鬆症", level: "N5", category: "health_medical",
    sentences: [{ ja: "骨粗鬆症になると骨折しやすくなります。", furigana: "こつそしょうしょうになるとこっせつしやすくなります。", en: "得了骨質疏鬆症就會容易骨折。" }] },
  { id: "v_tsuufuu", word: "痛風", furigana: "つうふう", romaji: "tsuufuu", meaning: "痛風", level: "N5", category: "health_medical",
    sentences: [{ ja: "尿酸値が高く、足の指に痛風の発作が出ました。", furigana: "にょうさんちがたかく、あしのゆびにつうふうのほっさがでました。", en: "尿酸值偏高，腳趾出現了痛風發作。" }] },
  { id: "v_hinketsu", word: "貧血", furigana: "ひんけつ", romaji: "hinketsu", meaning: "貧血", level: "N5", category: "body_physiology",
    sentences: [{ ja: "立ちくらみがするのは貧血のせいかもしれません。", furigana: "たちくらみがするのはひんけつのせいかもしれません。", en: "站起來時會頭暈可能是因為貧血。" }] },
  { id: "v_kekkaku", word: "結核", furigana: "けっかく", romaji: "kekkaku", meaning: "結核病", level: "N5", category: "health_medical",
    sentences: [{ ja: "結核は過去の病気ではなく、今でも注意が必要です。", furigana: "けっかくはかこのびょうきではなく、いまでもちゅういが必要です。", en: "結核病並非過去的疾病，現在依然需要注意。" }] },

  // ================= 精神・神経疾患 (Psychiatric & Neurological) =================
  { id: "v_tougoushitoushou", word: "統合失調症", furigana: "とうごうしっちょうしょう", romaji: "tougoushitoushou", meaning: "思覺失調症", level: "N5", category: "psychology_character",
    sentences: [{ ja: "統合失調症の治療には服薬の継続が大切です。", furigana: "とうごうしっちょうしょうのちりょうにはふくやくのけいぞくがたいせつです。", en: "在思覺失調症的治療中，持續服藥非常重要。" }] },
  { id: "v_soukyokusei", word: "双極性障害", furigana: "そうきょくせいしょうがい", romaji: "soukyokuseishougai", meaning: "躁鬱症 (雙極性情感疾患)", level: "N5", category: "psychology_character",
    sentences: [{ ja: "双極性障害で、気分が異常に高揚する時期があります。", furigana: "そうきょくせいしょうがいで、きぶんがいじょうにこうようするじきがあります。", en: "因為躁鬱症，會有情緒異常高昂的時期。" }] },
  { id: "v_panikku", word: "パニック障害", furigana: "ぱにっくしょうがい", romaji: "panikkushougai", meaning: "恐慌症", level: "N5", category: "psychology_character",
    sentences: [{ ja: "電車の中でパニック障害の発作が起きました。", furigana: "でんしゃのなかでぱにっくしょうがいのはっさがおきました。", en: "在電車內恐慌症發作了。" }] },
  { id: "v_paakinson", word: "パーキンソン病", furigana: "ぱーきんそんびょう", romaji: "paakinsonbyou", meaning: "巴金森氏症", level: "N5", category: "health_medical",
    sentences: [{ ja: "パーキンソン病の影響で手が震えます。", furigana: "ぱーきんそんびょうのえいきょうでてがふるえます。", en: "受到巴金森氏症的影響手會發抖。" }] },
  { id: "v_tenkan", word: "てんかん", furigana: "てんかん", romaji: "tenkan", meaning: "癲癇", level: "N5", category: "health_medical",
    sentences: [{ ja: "てんかんの発作を抑える薬を毎日飲みます。", furigana: "てんかんのはっさをおさえるくすりをまいにちのみます。", en: "每天服用抑制癲癇發作的藥物。" }] },

  // ================= 母性・産科 (Maternal & Obstetrics) =================
  { id: "v_jintsuu", word: "陣痛", furigana: "じんつう", romaji: "jintsuu", meaning: "陣痛", level: "N5", category: "body_physiology",
    sentences: [{ ja: "陣痛の間隔が短くなってきたら病院に連絡します。", furigana: "じんつうのかんかくがみじかくなってきたらびょういんにれんらくします。", en: "當陣痛間隔變短時就聯絡醫院。" }] },
  { id: "v_hasui", word: "破水", furigana: "はすい", romaji: "hasui", meaning: "破水", level: "N5", category: "body_physiology",
    sentences: [{ ja: "夜中に破水したので急いで病院に向かいました。", furigana: "よなかにはすいしたのでいそいでびょういんにむかいました。", en: "因為半夜破水了所以急忙前往醫院。" }] },
  { id: "v_teiousekkai", word: "帝王切開", furigana: "ていおうせっかい", romaji: "teiousekkai", meaning: "剖腹產", level: "N5", category: "health_medical",
    sentences: [{ ja: "逆子のため、帝王切開で出産することになりました。", furigana: "さかごのため、ていおうせっかいでしゅっさんすることになりました。", en: "因為胎位不正，決定以剖腹產方式生產。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(ultimateWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', ultimateWords.length, 'ultimate nursing words to data_n5.js!');
