const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const extremeWords = [
  // ================= 骨格・筋肉系 (Skeletal & Muscular System Deep Dive) =================
  { id: "v_sakotsu", word: "鎖骨", furigana: "さこつ", romaji: "sakotsu", meaning: "鎖骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "自転車で転んで鎖骨を折りました。", furigana: "じてんしゃでころんでさこつをお折りました。", en: "騎腳踏車摔倒折斷了鎖骨。" }] },
  { id: "v_kenkoukotsu", word: "肩甲骨", furigana: "けんこうこつ", romaji: "kenkoukotsu", meaning: "肩胛骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "肩甲骨の周りの筋肉をほぐします。", furigana: "けんこうこつのまわりのきんにくをほぐします。", en: "放鬆肩胛骨周圍的肌肉。" }] },
  { id: "v_kyoukotsu", word: "胸骨", furigana: "きょうこつ", romaji: "kyoukotsu", meaning: "胸骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "心肺蘇生では胸骨を強く圧迫します。", furigana: "しんぱいそせいではきょうこつをつよくあっぱくします。", en: "在心肺復甦術中要強烈按壓胸骨。" }] },
  { id: "v_daitaikotsu", word: "大腿骨", furigana: "だいたいこつ", romaji: "daitaikotsu", meaning: "大腿骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "高齢者は転倒で大腿骨を骨折しやすいです。", furigana: "こうれいしゃはてんとうでだいたいこつをこっせつしやすいです。", en: "高齡者很容易因為跌倒而造成大腿骨骨折。" }] },
  { id: "v_keitsui", word: "頸椎", furigana: "けいつい", romaji: "keitsui", meaning: "頸椎", level: "N5", category: "body_physiology",
    sentences: [{ ja: "事故の衝撃で頸椎を損傷しました。", furigana: "じこのしょうげきでけいついをそんしょうしました。", en: "因為事故的撞擊損傷了頸椎。" }] },
  { id: "v_youtsui", word: "腰椎", furigana: "ようつい", romaji: "youtsui", meaning: "腰椎", level: "N5", category: "body_physiology",
    sentences: [{ ja: "腰椎椎間板ヘルニアと診断されました。", furigana: "ようついついかんばんへるにあとしんだんされました。", en: "被診斷為腰椎椎間盤突出。" }] },

  // ================= 脳神経系 (Nervous System Deep Dive) =================
  { id: "v_enzui", word: "延髄", furigana: "えんずい", romaji: "enzui", meaning: "延腦 (Medulla oblongata)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "延髄には呼吸や循環の中枢があります。", furigana: "えんずいにはこきゅうやじゅんかんのちゅうすうがあります。", en: "延腦有呼吸與循環的中樞。" }] },
  { id: "v_shishou", word: "視床", furigana: "ししょう", romaji: "shishou", meaning: "視丘 (Thalamus)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "感覚情報は視床を経由して大脳へ送られます。", furigana: "かんかくじょうほうはししょうをけいゆしてだいのうへおくられます。", en: "感覺資訊會經由視丘傳送至大腦。" }] },
  { id: "v_shishoukabu", word: "視床下部", furigana: "ししょうかぶ", romaji: "shishoukabu", meaning: "下視丘 (Hypothalamus)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "視床下部は体温や食欲を調節しています。", furigana: "ししょうかぶはたいおんやしょくよくをちょうせつしています。", en: "下視丘負責調節體溫與食慾。" }] },
  { id: "v_nousekizuieki", word: "脳脊髄液", furigana: "のうせきずいえき", romaji: "nousekizuieki", meaning: "腦脊髓液", level: "N5", category: "body_physiology",
    sentences: [{ ja: "検査のために脳脊髄液を採取します。", furigana: "けんさのためにのうせきずいえきをさいしゅします。", en: "為了檢查而採集了腦脊髓液。" }] },
  { id: "v_undoushinkei", word: "運動神経", furigana: "うんどうしんけい", romaji: "undoushinkei", meaning: "運動神經", level: "N5", category: "body_physiology",
    sentences: [{ ja: "大脳からの指令が運動神経を伝わります。", furigana: "だいのうからのしれいがうんどうしんけいをつたわります。", en: "大腦發出的指令會透過運動神經傳遞。" }] },
  { id: "v_kankakushinkei", word: "感覚神経", furigana: "かんかくしんけい", romaji: "kankakushinkei", meaning: "感覺神經", level: "N5", category: "body_physiology",
    sentences: [{ ja: "皮膚の感覚神経が痛みを感知します。", furigana: "ひふのかんかくしんけいがいたみをかんちします。", en: "皮膚的感覺神經能感知到疼痛。" }] },

  // ================= 内分泌器系 (Endocrine System) =================
  { id: "v_kasuitai", word: "下垂体", furigana: "かすいたい", romaji: "kasuitai", meaning: "腦下垂體", level: "N5", category: "body_physiology",
    sentences: [{ ja: "下垂体から成長ホルモンが分泌されます。", furigana: "かすいたいからせいちょうほるもんがぶんぴつされます。", en: "生長激素由腦下垂體分泌。" }] },
  { id: "v_koujousen", word: "甲状腺", furigana: "こうじょうせん", romaji: "koujousen", meaning: "甲狀腺", level: "N5", category: "body_physiology",
    sentences: [{ ja: "甲状腺の機能が亢進しています。", furigana: "こうじょうせんのきのうがこうしんしています。", en: "甲狀腺功能處於亢進狀態。" }] },
  { id: "v_fukujin", word: "副腎", furigana: "ふくじん", romaji: "fukujin", meaning: "腎上腺", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ストレスがかかると副腎皮質ホルモンが出ます。", furigana: "すとれすがかかるとふくじんひしつほるもんがでます。", en: "感到壓力時會分泌腎上腺皮質激素。" }] },
  { id: "v_shoukatai", word: "松果体", furigana: "しょうかたい", romaji: "shoukatai", meaning: "松果體", level: "N5", category: "body_physiology",
    sentences: [{ ja: "松果体は睡眠に関わるメラトニンを作ります。", furigana: "しょうかたいはすいみんにかかわるめらとにんをつくります。", en: "松果體製造與睡眠相關的褪黑激素。" }] },

  // ================= 消化器・付属腺 (Digestive System Deep Dive) =================
  { id: "v_daekisen", word: "唾液腺", furigana: "だえきせん", romaji: "daekisen", meaning: "唾液腺", level: "N5", category: "body_physiology",
    sentences: [{ ja: "食事を見ると唾液腺から唾液が出ます。", furigana: "しょくじをみるとだえきせんからだえきがでます。", en: "看到食物時，唾液腺就會分泌唾液。" }] },
  { id: "v_intou", word: "咽頭", furigana: "いんとう", romaji: "intou", meaning: "咽頭 (Pharynx)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "風邪で咽頭が赤く腫れています。", furigana: "かぜでいんとうがあかくはれています。", en: "因為感冒咽頭紅腫發炎。" }] },
  { id: "v_mouchou", word: "盲腸", furigana: "もうちょう", romaji: "mouchou", meaning: "盲腸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "盲腸の手術で入院しました。", furigana: "もうちょうのしゅじゅつでにゅういんしました。", en: "因為盲腸手術而住院了。" }] },
  { id: "v_chuusui", word: "虫垂", furigana: "ちゅうすい", romaji: "chuusui", meaning: "闌尾 (Appendix)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "急性虫垂炎の疑いがあります。", furigana: "きゅうせいちゅうすいえんのうたがいがあります。", en: "懷疑是急性闌尾炎。" }] },
  { id: "v_chokuchou", word: "直腸", furigana: "ちょくちょう", romaji: "chokuchou", meaning: "直腸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "直腸がんの早期発見が重要です。", furigana: "ちょくちょうがんのそうきはっけんがじゅうようです。", en: "直腸癌的早期發現非常重要。" }] },
  { id: "v_fukumaku", word: "腹膜", furigana: "ふくまく", romaji: "fukumaku", meaning: "腹膜", level: "N5", category: "body_physiology",
    sentences: [{ ja: "虫垂炎が悪化して腹膜炎を起こしました。", furigana: "ちゅうすいえんがあっかしてふくまくえんをおこしました。", en: "闌尾炎惡化引發了腹膜炎。" }] },

  // ================= 呼吸器・循環器系 (Respiratory & Circulatory Deep Dive) =================
  { id: "v_bikou", word: "鼻腔", furigana: "びこう", romaji: "bikou", meaning: "鼻腔", level: "N5", category: "body_physiology",
    sentences: [{ ja: "花粉症で鼻腔の粘膜が腫れています。", furigana: "かふんしょうでびこうのねんまくがはれています。", en: "因為花粉症導致鼻腔黏膜腫脹。" }] },
  { id: "v_koutou", word: "喉頭", furigana: "こうとう", romaji: "koutou", meaning: "喉頭 (Larynx)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "喉頭がんの手術で声帯を摘出しました。", furigana: "こうとうがんのしゅじゅつでせいたいをてきしゅつしました。", en: "因為喉癌手術摘除了聲帶。" }] },
  { id: "v_kyoumaku", word: "胸膜", furigana: "きょうまく", romaji: "kyoumaku", meaning: "胸膜 (Pleura)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "胸膜に炎症が起きて呼吸が痛いです。", furigana: "きょうまくにえんしょうがおきてこきゅうがいたいです。", en: "胸膜發炎導致呼吸時會痛。" }] },
  { id: "v_kandoumyaku", word: "冠動脈", furigana: "かんどうみゃく", romaji: "kandoumyaku", meaning: "冠狀動脈", level: "N5", category: "body_physiology",
    sentences: [{ ja: "心臓の筋肉に栄養を送るのが冠動脈です。", furigana: "しんぞうのきんにくにえいようをおくるのがかんどうみゃくです。", en: "負責運送營養給心臟肌肉的血管就是冠狀動脈。" }] },
  { id: "v_daijoumyaku", word: "大静脈", furigana: "だいじょうみゃく", romaji: "daijoumyaku", meaning: "大靜脈 (Vena cava)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "全身の血液は上大静脈と下大静脈に集まります。", furigana: "ぜんしんのけつえきはじょうだいじょうみゃくとげだいじょうみゃくにあつまります。", en: "全身的血液會匯集到上、下腔靜脈。" }] },
  { id: "v_hizou", word: "脾臓", furigana: "ひぞう", romaji: "hizou", meaning: "脾臟", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脾臓は古い赤血球を破壊する働きがあります。", furigana: "ひぞうはふるいせっけっきゅうをはかいするはたらきがあります。", en: "脾臟具有破壞衰老紅血球的功能。" }] },

  // ================= 感覚器系 (Sensory Organs) =================
  { id: "v_kakumaku", word: "角膜", furigana: "かくまく", romaji: "kakumaku", meaning: "角膜", level: "N5", category: "body_physiology",
    sentences: [{ ja: "目をこすって角膜を傷つけてしまいました。", furigana: "めをこすってかくまくをきずつけてしまいました。", en: "揉眼睛結果傷到了角膜。" }] },
  { id: "v_suishoutai", word: "水晶体", furigana: "すいしょうたい", romaji: "suishoutai", meaning: "水晶體 (Lens)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "白内障で水晶体が白く濁っています。", furigana: "はくないしょうですいしょうたいがしろくにごっています。", en: "因為白內障導致水晶體白濁。" }] },
  { id: "v_moumaku", word: "網膜", furigana: "もうまく", romaji: "moumaku", meaning: "視網膜 (Retina)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "網膜剥離（はくり）の手術を受けます。", furigana: "もうまくはくりのしゅじゅつをうけます。", en: "接受了視網膜剝離的手術。" }] },
  { id: "v_komaku", word: "鼓膜", furigana: "こまく", romaji: "komaku", meaning: "耳膜 (Tympanic membrane)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "大きな音を聞いて鼓膜が破れました。", furigana: "おおきなおとをきいてこまくがやぶれました。", en: "聽到巨大聲響導致耳膜破裂。" }] },
  { id: "v_kagyuu", word: "蝸牛", furigana: "かぎゅう", romaji: "kagyuu", meaning: "耳蝸 (Cochlea)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "蝸牛は音の振動を神経信号に変えます。", furigana: "かぎゅうはおとのしんどうをしんけいしんごうにかえます。", en: "耳蝸會將聲音的振動轉換成神經訊號。" }] },

  // ================= 生殖器・泌尿器系 (Reproductive & Urinary) =================
  { id: "v_jin_u", word: "腎盂", furigana: "じんう", romaji: "jinu", meaning: "腎盂", level: "N5", category: "body_physiology",
    sentences: [{ ja: "腎盂腎炎（じんえん）で高熱が出ました。", furigana: "じんうじんえんでこうねつがでました。", en: "因為腎盂腎炎引發了高燒。" }] },
  { id: "v_nyoukan", word: "尿管", furigana: "にょうかん", romaji: "nyoukan", meaning: "輸尿管", level: "N5", category: "body_physiology",
    sentences: [{ ja: "尿管結石の激しい痛みで救急車を呼びました。", furigana: "にょうかんけっせきのはげしいいたみできゅうきゅうしゃをよびました。", en: "因為輸尿管結石的劇烈疼痛叫了救護車。" }] },
  { id: "v_rankan", word: "卵管", furigana: "らんかん", romaji: "rankan", meaning: "輸卵管", level: "N5", category: "body_physiology",
    sentences: [{ ja: "受精は通常、卵管の中で起こります。", furigana: "じゅせいはつうじょう、らんかんのなかでおこります。", en: "受精通常發生在輸卵管內。" }] },
  { id: "v_chitsu", word: "膣", furigana: "ちつ", romaji: "chitsu", meaning: "陰道", level: "N5", category: "body_physiology",
    sentences: [{ ja: "膣の感染症を治療するための薬です。", furigana: "ちつのかんせんしょうをちりょうするためのくすりです。", en: "這是用來治療陰道感染症的藥物。" }] },
  { id: "v_seisou", word: "精巣", furigana: "せいそう", romaji: "seisou", meaning: "睪丸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "精巣で精子が作られます。", furigana: "せいそうでもせいしがつくられます。", en: "精子是在睪丸中製造的。" }] },

  // ================= 生理学 (Physiology Deep Dive) =================
  { id: "v_ketsuekigyouko", word: "血液凝固", furigana: "けつえきぎょうこ", romaji: "ketsuekigyouko", meaning: "血液凝固", level: "N5", category: "body_physiology",
    sentences: [{ ja: "血液凝固を妨げる薬を飲んでいます。", furigana: "けつえきぎょうこをさまたげるくすりをのんでいます。", en: "正在服用阻礙血液凝固（抗凝血）的藥物。" }] },
  { id: "v_shiketsu", word: "止血", furigana: "しけつ", romaji: "shiketsu", meaning: "止血", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷口を圧迫して止血してください。", furigana: "きずぐちをあっぱくしてしけつしてください。", en: "請按壓傷口來止血。" }] },
  { id: "v_shintouatsu", word: "浸透圧", furigana: "しんとうあつ", romaji: "shintouatsu", meaning: "滲透壓", level: "N5", category: "body_physiology",
    sentences: [{ ja: "細胞内外の浸透圧のバランスが重要です。", furigana: "さいぼうないがいのしんとうあつのばらんすがじゅうようです。", en: "細胞內外滲透壓的平衡非常重要。" }] },
  { id: "v_denkaishitsu", word: "電解質", furigana: "でんかいしつ", romaji: "denkaishitsu", meaning: "電解質", level: "N5", category: "body_physiology",
    sentences: [{ ja: "発汗で失われた電解質を補給します。", furigana: "はっかんでうしなわられたでんかいしつをほきゅうします。", en: "補充因為流汗而流失的電解質。" }] },
  { id: "v_kisotaisya", word: "基礎代謝", furigana: "きそたいしゃ", romaji: "kisotaisya", meaning: "基礎代謝", level: "N5", category: "body_physiology",
    sentences: [{ ja: "筋肉量を増やすと基礎代謝が上がります。", furigana: "きんにくりょうをふやすときそたいしゃがあがります。", en: "增加肌肉量的話基礎代謝也會跟著提升。" }] },
  { id: "v_katsudoudeni", word: "活動電位", furigana: "かつどうでんい", romaji: "katsudoudeni", meaning: "動作電位 (Action potential)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "神経細胞が刺激を受けて活動電位が発生します。", furigana: "しんけいさいぼうがしげきをうけてかつどうでんいが発生します。", en: "神經細胞受到刺激而產生了動作電位。" }] },
  { id: "v_shoukakouso", word: "消化酵素", furigana: "しょうかこうそ", romaji: "shoukakouso", meaning: "消化酵素", level: "N5", category: "body_physiology",
    sentences: [{ ja: "膵臓から多種類の消化酵素が分泌されます。", furigana: "すいぞうからたしゅるいのしょうかこうそがぶんぴつされます。", en: "多種消化酵素由胰臟分泌。" }] },
  { id: "v_kyuushuu", word: "吸収", furigana: "きゅうしゅう", romaji: "kyuushuu", meaning: "吸收", level: "N5", category: "body_physiology",
    sentences: [{ ja: "胃ではアルコールが素早く吸収されます。", furigana: "いではあるこーるがすばやくきゅうしゅうされます。", en: "酒精在胃部會被迅速吸收。" }] },

  // ================= 病理学・疾病機序 (Pathology Deep Dive) =================
  { id: "v_juuketsu", word: "充血", furigana: "じゅうけつ", romaji: "juuketsu", meaning: "充血 (動脈性)", level: "N5", category: "health_medical",
    sentences: [{ ja: "炎症により目の結膜が充血しています。", furigana: "えんしょうによりめのけつまくがじゅうけつしています。", en: "因為發炎導致眼睛結膜充血。" }] },
  { id: "v_ukketsu", word: "鬱血", furigana: "うっけつ", romaji: "ukketsu", meaning: "鬱血 (靜脈性)", level: "N5", category: "health_medical",
    sentences: [{ ja: "心不全により肺に鬱血が生じています。", furigana: "しんふぜんによりはいにうっけつがしょうじています。", en: "因為心衰竭導致肺部鬱血。" }] },
  { id: "v_kessenshou", word: "血栓症", furigana: "けっせんしょう", romaji: "kessenshou", meaning: "血栓症 (Thrombosis)", level: "N5", category: "health_medical",
    sentences: [{ ja: "深部静脈血栓症（エコノミークラス症候群）を予防します。", furigana: "しんぶじょうみゃくけっせんしょうをよぼうします。", en: "預防深層靜脈血栓症（經濟艙症候群）。" }] },
  { id: "v_sokusenshou", word: "塞栓症", furigana: "そくせんしょう", romaji: "sokusenshou", meaning: "栓塞症 (Embolism)", level: "N5", category: "health_medical",
    sentences: [{ ja: "血栓が肺に飛んで肺塞栓症を起こしました。", furigana: "けっせんがはいにとんではいそくせんしょうをおこしました。", en: "血栓跑到肺部引發了肺栓塞。" }] },
  { id: "v_apotooshisu", word: "アポトーシス", furigana: "あぽとーしす", romaji: "apotooshisu", meaning: "細胞凋亡 (Apoptosis)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "異常な細胞は自らアポトーシスを起こして死滅します。", furigana: "いじょうなさいぼうはみずからあぽとーしすをおこしてしめつします。", en: "異常的細胞會自行啟動細胞凋亡而死亡。" }] },
  { id: "v_kasei", word: "化生", furigana: "かせい", romaji: "kasei", meaning: "化生 (Metaplasia)", level: "N5", category: "health_medical",
    sentences: [{ ja: "慢性的な刺激により組織の化生が見られます。", furigana: "まんせいてきなしげきによりそしきのかせいがみられます。", en: "因為慢性的刺激可以觀察到組織的化生現象。" }] },
  { id: "v_ikeisei", word: "異形成", furigana: "いけいせい", romaji: "ikeisei", meaning: "異生、發育不良 (Dysplasia)", level: "N5", category: "health_medical",
    sentences: [{ ja: "細胞診で軽度の異形成が発見されました。", furigana: "さいぼうしんでけいどのいけいせいがはっけんされました。", en: "細胞抹片檢查中發現了輕度的異生。" }] },
  { id: "v_jiko_meneki", word: "自己免疫疾患", furigana: "じこめんえきしっかん", romaji: "jikomenekishikkan", meaning: "自體免疫疾病", level: "N5", category: "health_medical",
    sentences: [{ ja: "関節リウマチは代表的な自己免疫疾患の一つです。", furigana: "かんせつりうまちはだいひょうてきなじこめんえきしっかんのひとつです。", en: "類風濕性關節炎是典型的自體免疫疾病之一。" }] },
  { id: "v_shokku", word: "ショック", furigana: "しょっく", romaji: "shokku", meaning: "休克", level: "N5", category: "health_medical",
    sentences: [{ ja: "大量出血により出血性ショックに陥りました。", furigana: "たいりょうしゅっけつによりしゅっけつせいしょっくにおちいりました。", en: "因為大量出血陷入了出血性休克。" }] },
  { id: "v_haiketsushou", word: "敗血症", furigana: "はいけつしょう", romaji: "haiketsushou", meaning: "敗血症", level: "N5", category: "health_medical",
    sentences: [{ ja: "感染が全身に広がり、敗血症を引き起こしました。", furigana: "かんせんがぜんしんにひろがり、はいけつしょうをひきおこしました。", en: "感染擴散至全身，引發了敗血症。" }] },
  { id: "v_kikei", word: "奇形", furigana: "きけい", romaji: "kikei", meaning: "畸形", level: "N5", category: "health_medical",
    sentences: [{ ja: "胎児のエコー検査で心臓の奇形が見つかりました。", furigana: "たいじのえこーけんさでしんぞうのきけいがみつかりました。", en: "在胎兒超音波檢查中發現了心臟畸形。" }] },
  { id: "v_totsuzenheni", word: "突然変異", furigana: "とつぜんへんい", romaji: "totsuzenheni", meaning: "突變", level: "N5", category: "body_physiology",
    sentences: [{ ja: "遺伝子の突然変異がガンの原因になります。", furigana: "いでんしのとつぜんへんいががんのげんいんになります。", en: "基因的突變會成為癌症的原因。" }] },
  { id: "v_kaiyou", word: "潰瘍", furigana: "かいよう", romaji: "kaiyou", meaning: "潰瘍", level: "N5", category: "health_medical",
    sentences: [{ ja: "胃酸の出すぎで胃潰瘍ができました。", furigana: "いさんのですぎでいかいようができました。", en: "因為胃酸分泌過多形成了胃潰瘍。" }] },
  { id: "v_senkou", word: "穿孔", furigana: "せんこう", romaji: "senkou", meaning: "穿孔", level: "N5", category: "health_medical",
    sentences: [{ ja: "潰瘍が深くなり、胃に穿孔（穴）が開きました。", furigana: "かいようがふかくなり、いにせんこうがあきました。", en: "潰瘍變深，導致胃部穿孔（破洞）。" }] },
  { id: "v_senika", word: "線維化", furigana: "せんいか", romaji: "senika", meaning: "纖維化", level: "N5", category: "health_medical",
    sentences: [{ ja: "肝臓の組織がダメージを受けて線維化が進みます。", furigana: "かんぞうのそしきがだめーじをうけてせんいかがすすみます。", en: "肝臟組織受損導致纖維化惡化。" }] },
  { id: "v_kouka", word: "硬化", furigana: "こうか", romaji: "kouka", meaning: "硬化", level: "N5", category: "health_medical",
    sentences: [{ ja: "動脈硬化を防ぐために食生活を見直します。", furigana: "どうみゃくこうかをふせぐためにしょくせいかつをみなおします。", en: "為了預防動脈硬化而重新審視飲食習慣。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(extremeWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', extremeWords.length, 'extreme anatomy/pathology words to data_n5.js!');
