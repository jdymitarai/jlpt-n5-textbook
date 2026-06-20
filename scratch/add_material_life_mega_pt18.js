const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt18 = [
  // ================= 動漫與宅文化 (Anime & Otaku Culture) - Category: leisure_culture =================
  { id: "v_o_anime", word: "アニメ", furigana: "あにめ", romaji: "anime", meaning: "動畫", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "日本の手書きアニメは世界中で人気です。", furigana: "にほんのてがきあにめはせかいじゅうでにんきです。", en: "日本的手繪動畫在全世界都很受歡迎。" }] },
  { id: "v_o_manga", word: "漫画", furigana: "まんが", romaji: "manga", meaning: "漫畫", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "寝る前に漫画を読みます。", furigana: "ねるまえにまんがをよみます。", en: "睡前看漫畫。" }] },
  { id: "v_o_otaku", word: "オタク", furigana: "おたく", romaji: "otaku", meaning: "御宅族", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "彼はゲームのオタクです。", furigana: "かれはげーむのおたくです。", en: "他是個遊戲宅。" }] },
  { id: "v_o_kosupure", word: "コスプレ", furigana: "こすぷれ", romaji: "kosupure", meaning: "角色扮演 (Cosplay)", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "イベントでアニメのキャラクターのコスプレをします。", furigana: "いべんとであにめのきゃらくたーのこすぷれをします。", en: "在活動上Cosplay動漫角色。" }] },
  { id: "v_o_seiyuu", word: "声優", furigana: "せいゆう", romaji: "seiyuu", meaning: "聲優 / 配音員", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "好きな声優のラジオを聴きます。", furigana: "すきなせいゆうのらじおをききます。", en: "聽喜歡的聲優的廣播節目。" }] },
  { id: "v_o_figyua", word: "フィギュア", furigana: "ふぃぎゅあ", romaji: "figyua", meaning: "模型 / 角色模型", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "部屋にフィギュアを飾っています。", furigana: "へやにふぃぎゅあをかざっています。", en: "房間裡裝飾著角色模型。" }] },
  { id: "v_o_kyarakutaa", word: "キャラクター", furigana: "きゃらくたー", romaji: "kyarakutaa", meaning: "角色", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "このアニメで一番好きなキャラクターは誰ですか？", furigana: "このあにめでいちばんすきなきゃらくたーはだれですか？", en: "這部動畫裡你最喜歡哪個角色？" }] },
  { id: "v_o_oshi", word: "推し", furigana: "おし", romaji: "oshi", meaning: "本命 / 推 (最支持的偶像或角色)", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "推しのグッズをたくさん買いました。", furigana: "おしのぐっずをたくさんかいました。", en: "買了很多本命角色的周邊商品。" }] },
  { id: "v_o_komike", word: "コミケ", furigana: "こみけ", romaji: "komike", meaning: "Comic Market (日本最大同人誌展)", level: "N2", category: "leisure_culture",
    sentences: [{ ja: "夏休みにコミケへ行きます。", furigana: "なつやすみにこみけへいきます。", en: "暑假要去Comic Market。" }] },
  { id: "v_o_guzzu", word: "グッズ", furigana: "ぐっず", romaji: "guzzu", meaning: "周邊商品", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "アニメのグッズを集めるのが趣味です。", furigana: "あにめのぐっずをあつめるのがしゅみです。", en: "收集動漫周邊是我的興趣。" }] },
  { id: "v_o_posutaa", word: "ポスター", furigana: "ぽすたー", romaji: "posutaa", meaning: "海報", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "壁に映画のポスターを貼ります。", furigana: "かべにえいがのぽすたーをはります。", en: "把電影海報貼在牆上。" }] },
  { id: "v_o_aidoru", word: "アイドル", furigana: "あいどる", romaji: "aidoru", meaning: "偶像", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "アイドルのコンサートで応援します。", furigana: "あいどるのこんさーとでおうえんします。", en: "在偶像的演唱會上應援。" }] },
  { id: "v_o_doujinshi", word: "同人誌", furigana: "どうじんし", romaji: "doujinshi", meaning: "同人誌", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "イベントで友達の同人誌を買いました。", furigana: "いべんとでともだちのどうじんしをかいました。", en: "在活動上買了朋友的同人誌。" }] },

  // ================= 神社與傳統文化 (Shrines & Traditional Culture) =================
  { id: "v_o_jinja", word: "神社", furigana: "じんじゃ", romaji: "jinja", meaning: "神社", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "お正月に神社へお参りに行きます。", furigana: "おしょうがつにじんじゃへおまいりにいきます。", en: "過年的時候去神社參拜。" }] },
  { id: "v_o_otera", word: "お寺", furigana: "おてら", romaji: "otera", meaning: "寺廟", level: "N5", category: "leisure_culture",
    sentences: [{ ja: "京都には古いお寺がたくさんあります。", furigana: "きょうとにはふるいおてらがたくさんあります。", en: "京都有很多古老的寺廟。" }] },
  { id: "v_o_torii", word: "鳥居", furigana: "とりい", romaji: "torii", meaning: "鳥居", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "神社の入り口に赤い鳥居があります。", furigana: "じんじゃのいりぐちにあかいとりいがあります。", en: "神社的入口有紅色的鳥居。" }] },
  { id: "v_o_omamori", word: "お守り", furigana: "おまもり", romaji: "omamori", meaning: "御守 / 護身符", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "神社で交通安全のお守りを買いました。", furigana: "じんじゃでこうつうあんぜんのおまもりをかいました。", en: "在神社買了交通安全的御守。" }] },
  { id: "v_o_omikuji", word: "おみくじ", furigana: "おみくじ", romaji: "omikuji", meaning: "神籤", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "おみくじを引いたら「大吉」でした。", furigana: "おみくじをひいたらだいきちでした。", en: "抽了神籤，結果是「大吉」。" }] },
  { id: "v_o_ema", word: "絵馬", furigana: "えま", romaji: "ema", meaning: "繪馬 (許願的木牌)", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "絵馬に合格の願い事を書きました。", furigana: "えまにごうかくのねがいごとをかきました。", en: "在繪馬上寫下金榜題名的願望。" }] },
  { id: "v_o_saisen", word: "賽銭", furigana: "さいせん", romaji: "saisen", meaning: "香油錢", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "賽銭箱に百円玉を入れました。", furigana: "さいせんばこにひゃくえんだまをいれました。", en: "把一百日圓硬幣投進香油錢箱。" }] },
  { id: "v_o_sanpai", word: "参拝", furigana: "さんぱい", romaji: "sanpai", meaning: "參拜", level: "N3", category: "leisure_culture",
    sentences: [{ ja: "二礼二拍手一礼の作法で参拝します。", furigana: "にれいにはくしゅいちれいのさほうでさんぱいします。", en: "用二鞠躬二拍手一鞠躬的禮儀參拜。" }] },
  { id: "v_o_matsuri", word: "お祭り", furigana: "おまつり", romaji: "omatsuri", meaning: "祭典", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "夏のお祭りでお神輿を見ました。", furigana: "なつのおまつりでおみこしをみました。", en: "在夏天的祭典上看到了神轎。" }] },
  { id: "v_o_mikoshi", word: "神輿", furigana: "みこし", romaji: "mikoshi", meaning: "神轎", level: "N2", category: "leisure_culture",
    sentences: [{ ja: "みんなで重い神輿を担ぎます。", furigana: "みんなでおもいみこしをかつぎます。", en: "大家一起抬沉重的神轎。" }] },
  { id: "v_o_hanabi", word: "花火", furigana: "はなび", romaji: "hanabi", meaning: "煙火", level: "N4", category: "nature_weather",
    sentences: [{ ja: "夜空に綺麗な花火が上がりました。", furigana: "よぞらにきれいなはなびがあがりました。", en: "夜空升起了美麗的煙火。" }] },
  { id: "v_c_yukata", word: "浴衣", furigana: "ゆかた", romaji: "yukata", meaning: "浴衣", level: "N4", category: "clothing_wear",
    sentences: [{ ja: "浴衣を着て花火大会へ行きます。", furigana: "ゆかたをきてはなびたいかいへいきます。", en: "穿著浴衣去煙火大會。" }] },
  { id: "v_c_kimono", word: "着物", furigana: "きもの", romaji: "kimono", meaning: "和服", level: "N4", category: "clothing_wear",
    sentences: [{ ja: "成人式で綺麗な着物を着ます。", furigana: "せいじんしきできれいなきものをきます。", en: "在成年禮上穿漂亮的和服。" }] },
  { id: "v_o_onsen", word: "温泉", furigana: "おんせん", romaji: "onsen", meaning: "溫泉", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "冬は温泉に入るのが一番です。", furigana: "ふゆはおんせんにはいるのがいちばんです。", en: "冬天泡溫泉最棒了。" }] },
  { id: "v_o_ryokan", word: "旅館", furigana: "りょかん", romaji: "ryokan", meaning: "日式傳統旅館", level: "N4", category: "leisure_culture",
    sentences: [{ ja: "日本の古い旅館に泊まりました。", furigana: "にほんのふるいりょかにとまりました。", en: "住了日本傳統的古老旅館。" }] },
  { id: "v_h_tatami", word: "畳", furigana: "たたみ", romaji: "tatami", meaning: "榻榻米", level: "N4", category: "housing_space",
    sentences: [{ ja: "旅館の部屋には畳が敷いてあります。", furigana: "りょかんのへやにはたたみがしいてあります。", en: "旅館的房間裡鋪著榻榻米。" }] },
  { id: "v_f_maccha", word: "抹茶", furigana: "まっちゃ", romaji: "maccha", meaning: "抹茶", level: "N4", category: "food_diet",
    sentences: [{ ja: "苦い抹茶と甘いお菓子は合います。", furigana: "にがいまっちゃとあまいおかしはあいます。", en: "苦澀的抹茶和甜點很搭。" }] },
  { id: "v_f_wagashi", word: "和菓子", furigana: "わがし", romaji: "wagashi", meaning: "和菓子 (日式傳統點心)", level: "N4", category: "food_diet",
    sentences: [{ ja: "お土産に美しい和菓子を買いました。", furigana: "おみやげにうつくしいわがしをかいました。", en: "買了漂亮的和菓子當伴手禮。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt18.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 18 - Anime & Traditional Culture) to data_n5.js!');
