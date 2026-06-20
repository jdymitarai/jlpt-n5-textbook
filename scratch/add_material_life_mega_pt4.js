const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt4 = [
  // ================= 飲食文化 (food_culture) Part 4 =================
  { id: "v_f_shiokarai", word: "塩辛い", furigana: "しおからい", romaji: "shiokarai", meaning: "死鹹的", level: "N3", category: "food_culture",
    sentences: [{ ja: "この魚は少し塩辛いです。", furigana: "このさかなはすこししおからいです。", en: "這條魚有點死鹹。" }] },
  { id: "v_f_aburakkoi", word: "油っこい", furigana: "あぶらっこい", romaji: "aburakkoi", meaning: "油膩的", level: "N3", category: "food_culture",
    sentences: [{ ja: "年を取ると、油っこい料理が食べられなくなります。", furigana: "としをとると、あぶらっこいりょうりがたべられなくなります。", en: "年紀大了就沒辦法吃油膩的料理了。" }] },
  { id: "v_f_sappari", word: "さっぱりしている", furigana: "さっぱりしている", romaji: "sapparishiteiru", meaning: "清淡的 / 清爽的", level: "N3", category: "food_culture",
    sentences: [{ ja: "夏はさっぱりしたものが食べたいです。", furigana: "なつはさっぱりしたものがたべたいです。", en: "夏天想吃清淡的東西。" }] },
  { id: "v_f_karikari", word: "カリカリ", furigana: "かりかり", romaji: "karikari", meaning: "脆脆的 (煎烤)", level: "N3", category: "food_culture",
    sentences: [{ ja: "ベーコンをカリカリに焼きます。", furigana: "べーこんをかりかりにやきます。", en: "把培根煎得脆脆的。" }] },
  { id: "v_f_sakusaku", word: "サクサク", furigana: "さくさく", romaji: "sakusaku", meaning: "酥脆的 (餅乾/炸物)", level: "N3", category: "food_culture",
    sentences: [{ ja: "このクッキーはサクサクして美味しいです。", furigana: "このくっきーはさくさくしておいしいです。", en: "這個餅乾吃起來酥酥脆脆的很好吃。" }] },
  { id: "v_f_pasuta", word: "パスタ", furigana: "ぱすた", romaji: "pasuta", meaning: "義大利麵", level: "N4", category: "food_culture",
    sentences: [{ ja: "ランチにトマトパスタを食べました。", furigana: "らんちにとまとぱすたをたべました。", en: "午餐吃了番茄義大利麵。" }] },
  { id: "v_f_omuraisu", word: "オムライス", furigana: "おむらいす", romaji: "omuraisu", meaning: "蛋包飯", level: "N5", category: "food_culture",
    sentences: [{ ja: "オムライスにケチャップで絵を描きます。", furigana: "おむらいすにけちゃっぷでえをかきます。", en: "用番茄醬在蛋包飯上畫畫。" }] },
  { id: "v_f_chaahan", word: "チャーハン", furigana: "ちゃーはん", romaji: "chaahan", meaning: "炒飯", level: "N4", category: "food_culture",
    sentences: [{ ja: "中華料理屋でチャーハンを注文しました。", furigana: "ちゅうかりょうりやでちゃーはんをちゅうもんしました。", en: "在中餐廳點了炒飯。" }] },
  { id: "v_f_hachimitsu", word: "はちみつ", furigana: "はちみつ", romaji: "hachimitsu", meaning: "蜂蜜", level: "N4", category: "food_culture",
    sentences: [{ ja: "紅茶にはちみつを入れます。", furigana: "こうちゃにはちみつをいれます。", en: "在紅茶裡加蜂蜜。" }] },
  { id: "v_f_wasabi", word: "わさび", furigana: "わさび", romaji: "wasabi", meaning: "山葵 / 芥末", level: "N4", category: "food_culture",
    sentences: [{ ja: "お寿司にわさびを少しつけます。", furigana: "おすしにわさびをすこしつけます。", en: "在壽司上沾一點芥末。" }] },
  { id: "v_f_negi", word: "ネギ", furigana: "ねぎ", romaji: "negi", meaning: "蔥", level: "N4", category: "food_culture",
    sentences: [{ ja: "うどんにネギをたくさん入れます。", furigana: "うどんにねぎをたくさんいれます。", en: "在烏龍麵裡加很多蔥。" }] },
  { id: "v_f_ninnniku", word: "にんにく", romaji: "ninniku", furigana: "にんにく", meaning: "大蒜", level: "N4", category: "food_culture",
    sentences: [{ ja: "にんにくの匂いが食欲をそそります。", furigana: "にんにくのにおいがしょくよくをそそります。", en: "大蒜的香味讓人食慾大增。" }] },
  { id: "v_f_shouga", word: "生姜", furigana: "しょうが", romaji: "shouga", meaning: "生薑", level: "N4", category: "food_culture",
    sentences: [{ ja: "風邪の時は生姜湯を飲みます。", furigana: "かぜのときはしょうがゆをのみます。", en: "感冒時喝薑湯。" }] },
  { id: "v_f_shamoji", word: "しゃもじ", furigana: "しゃもじ", romaji: "shamoji", meaning: "飯勺", level: "N3", category: "food_culture",
    sentences: [{ ja: "しゃもじでご飯を混ぜます。", furigana: "しゃもじでごはんをまぜます。", en: "用飯勺把飯拌勻。" }] },
  { id: "v_f_otama", word: "おたま", furigana: "おたま", romaji: "otama", meaning: "湯勺", level: "N3", category: "food_culture",
    sentences: [{ ja: "おたまでスープをお皿に入れます。", furigana: "おたまですーぷをおさらにいれます。", en: "用湯勺把湯盛進盤子裡。" }] },
  { id: "v_f_rappu", word: "ラップ", furigana: "らっぷ", romaji: "rappu", meaning: "保鮮膜", level: "N4", category: "food_culture",
    sentences: [{ ja: "残った料理にラップをかけます。", furigana: "のこったりょうりにらっぷをかけます。", en: "在剩下的料理上包保鮮膜。" }] },

  // ================= 服飾與美容 (fashion_beauty) Part 4 =================
  { id: "v_c_heyagi", word: "部屋着", furigana: "へやぎ", romaji: "heyagi", meaning: "居家服", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "家に帰ったらすぐに部屋着に着替えます。", furigana: "いえにかえったらすぐにへやぎにきがえます。", en: "回到家馬上換上居家服。" }] },
  { id: "v_c_burausu", word: "ブラウス", furigana: "ぶらうす", romaji: "burausu", meaning: "女用襯衫", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "仕事に白いブラウスを着て行きます。", furigana: "しごとにしろいぶらうすをきていきます。", en: "穿白襯衫去上班。" }] },
  { id: "v_c_kaadigan", word: "カーディガン", furigana: "かーでぃがん", romaji: "kaadigan", meaning: "針織外套", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "肌寒いのでカーディガンを羽織ります。", furigana: "はださむいのでかーでぃがんをはおります。", en: "有點冷所以披件針織外套。" }] },
  { id: "v_c_piasu", word: "ピアス", furigana: "ぴあす", romaji: "piasu", meaning: "耳環", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "誕生日に可愛いピアスをもらいました。", furigana: "たんじょうびにかわいいぴあすをもらいました。", en: "生日收到了可愛的耳環。" }] },
  { id: "v_c_manikyua", word: "マニキュア", furigana: "まにきゅあ", romaji: "manikyua", meaning: "指甲油", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "週末なので赤いマニキュアを塗ります。", furigana: "しゅうまつなのであかいまにきゅあをぬります。", en: "因為是週末所以塗了紅色的指甲油。" }] },
  { id: "v_c_kousui", word: "香水", furigana: "こうすい", romaji: "kousui", meaning: "香水", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "出かける前に香水を少しつけます。", furigana: "でかけるまえにこうすいをすこしつけます。", en: "出門前噴一點香水。" }] },
  { id: "v_c_someru", word: "染める", furigana: "そめる", romaji: "someru", meaning: "染(頭髮等)", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "美容院で髪を茶色に染めました。", furigana: "びよういんでかみをちゃいろにそめました。", en: "在美容院把頭髮染成了茶色。" }] },
  { id: "v_c_paama", word: "パーマ", furigana: "ぱーま", romaji: "paama", meaning: "燙髮", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "髪にパーマをかけました。", furigana: "かみにぱーまをかけました。", en: "燙了頭髮。" }] },
  { id: "v_c_otosu_makeup", word: "落とす", furigana: "おとす", romaji: "otosu", meaning: "卸除(化妝) / 弄掉", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "寝る前に必ずお化粧を落とします。", furigana: "ねるまえにかならずおけしょうをおとします。", en: "睡前一定會卸妝。" }] },
  { id: "v_c_darashinai", word: "だらしない", furigana: "だらしない", romaji: "darashinai", meaning: "邋遢的 / 散漫的", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "シャツがズボンから出ていてだらしないです。", furigana: "しゃつがずぼんからでていてだらしないです。", en: "襯衫跑出褲子外面，很邋遢。" }] },
  { id: "v_c_seiketsu", word: "清潔", furigana: "せいけつ", romaji: "seiketsu", meaning: "清潔的", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "飲食店では清潔な服装が求められます。", furigana: "いんしょくてんではせいけつなふくそうがもとめられます。", en: "餐飲店會要求穿著清潔的服裝。" }] },

  // ================= 居住與家電 (housing_space) Part 4 =================
  { id: "v_h_amido", word: "網戸", furigana: "あみど", romaji: "amido", meaning: "紗窗", level: "N3", category: "housing_space",
    sentences: [{ ja: "虫が入らないように網戸を閉めます。", furigana: "むしはいらないようにあみどをしめます。", en: "為了不讓蟲子飛進來，把紗窗關上。" }] },
  { id: "v_h_tatami", word: "畳", furigana: "たたみ", romaji: "tatami", meaning: "榻榻米", level: "N4", category: "housing_space",
    sentences: [{ ja: "畳の部屋はとても落ち着きます。", furigana: "たたみのへやはとてもおちつきます。", en: "榻榻米的房間讓人覺得很平靜。" }] },
  { id: "v_h_konsento", word: "コンセント", furigana: "こんせんと", romaji: "konsento", meaning: "插座", level: "N4", category: "housing_space",
    sentences: [{ ja: "コンセントにプラグを挿します。", furigana: "こんせんとにつらぐをさします。", en: "把插頭插進插座裡。" }] },
  { id: "v_h_suitchi", word: "スイッチ", furigana: "すいっち", romaji: "suitchi", meaning: "開關", level: "N4", category: "housing_space",
    sentences: [{ ja: "部屋が暗いのでスイッチを入れます。", furigana: "へやがくらいのですいっちをいれます。", en: "房間很暗所以按下開關。" }] },
  { id: "v_h_denkyuu", word: "電球", furigana: "でんきゅう", romaji: "denkyuu", meaning: "燈泡", level: "N4", category: "housing_space",
    sentences: [{ ja: "トイレの電球が切れました。", furigana: "といれのでんきゅうがきれました。", en: "廁所的燈泡燒壞了。" }] },
  { id: "v_h_kotatsu", word: "こたつ", furigana: "こたつ", romaji: "kotatsu", meaning: "暖桌", level: "N4", category: "housing_space",
    sentences: [{ ja: "冬はこたつに入ってみかんを食べます。", furigana: "ふゆはこたつにはいってみかんをたべます。", en: "冬天躲進暖桌吃橘子。" }] },
  { id: "v_h_kuroozetto", word: "クローゼット", furigana: "くろーぜっと", romaji: "kuroozetto", meaning: "衣櫥", level: "N4", category: "housing_space",
    sentences: [{ ja: "服をクローゼットにしまいます。", furigana: "ふくをくろーぜっとにしまいます。", en: "把衣服收進衣櫥裡。" }] },
  { id: "v_h_getabako", word: "下駄箱", furigana: "げたばこ", romaji: "getabako", meaning: "鞋櫃", level: "N4", category: "housing_space",
    sentences: [{ ja: "靴を下駄箱にきちんと並べます。", furigana: "くつをげたばこにきちんとならべます。", en: "把鞋子在鞋櫃裡排整齊。" }] },
  { id: "v_h_bunbetsu", word: "分別する", furigana: "ぶんべつする", romaji: "bunbetsusuru", meaning: "分類 (垃圾)", level: "N3", category: "housing_space",
    sentences: [{ ja: "ゴミはちゃんと分別して捨ててください。", furigana: "ごみはちゃんとぶんべつしてすててください。", en: "垃圾請好好分類後再丟。" }] },
  { id: "v_h_tisshu", word: "ティッシュ", furigana: "てぃっしゅ", romaji: "tisshu", meaning: "衛生紙", level: "N5", category: "housing_space",
    sentences: [{ ja: "ティッシュで机を拭きます。", furigana: "てぃっしゅでつくえをふきます。", en: "用衛生紙擦桌子。" }] },
  { id: "v_h_toirettopeepaa", word: "トイレットペーパー", furigana: "といれっとぺーぱー", romaji: "toirettopeepaa", meaning: "廁所用衛生紙", level: "N4", category: "housing_space",
    sentences: [{ ja: "トイレットペーパーがなくなりました。", furigana: "といれっとぺーぱーがなくなりました。", en: "廁所的衛生紙用完了。" }] },
  { id: "v_h_gomibukuro", word: "ゴミ袋", furigana: "ごみぶくろ", romaji: "gomibukuro", meaning: "垃圾袋", level: "N4", category: "housing_space",
    sentences: [{ ja: "スーパーでゴミ袋を買います。", furigana: "すーぱーでごみぶくろをかいます。", en: "在超市買垃圾袋。" }] },
  { id: "v_h_zoukin", word: "雑巾", furigana: "ぞうきん", romaji: "zoukin", meaning: "抹布", level: "N4", category: "housing_space",
    sentences: [{ ja: "雑巾を濡らして床を拭きます。", furigana: "ぞうきんをぬらしてゆかをふきます。", en: "弄濕抹布擦地板。" }] },
  { id: "v_h_houki", word: "ほうき", furigana: "ほうき", romaji: "houki", meaning: "掃把", level: "N4", category: "housing_space",
    sentences: [{ ja: "ほうきで玄関を掃きます。", furigana: "ほうきでげんかんをはきます。", en: "用掃把掃玄關。" }] },

  // ================= 交通與移動 (transport_mobility) Part 4 =================
  { id: "v_t_chuushajou", word: "駐車場", furigana: "ちゅうしゃじょう", romaji: "chuushajou", meaning: "停車場", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "デパートの駐車場に車を止めます。", furigana: "でぱーとのちゅうしゃじょうにくるまをとめます。", en: "把車停在百貨公司的停車場。" }] },
  { id: "v_t_chuurinjou", word: "駐輪場", furigana: "ちゅうりんじょう", romaji: "chuurinjou", meaning: "自行車停車場", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "自転車は駅の駐輪場に置いてください。", furigana: "じてんしゃはえきのちゅうりんじょうにおいでください。", en: "自行車請停在車站的自行車停車場。" }] },
  { id: "v_t_bureeki", word: "ブレーキ", furigana: "ぶれーき", romaji: "bureeki", meaning: "煞車", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "危ないので急ブレーキを踏みました。", furigana: "あぶないのできゅうぶれーきをふみました。", en: "因為很危險所以急踩煞車。" }] },
  { id: "v_t_bakku", word: "バックする", furigana: "ばっくする", romaji: "bakkusuru", meaning: "倒車 / 後退", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "車をバックして駐車場に入れます。", furigana: "くるまをばっくしてちゅうしゃじょうにいれます。", en: "倒車停進停車場。" }] },
  { id: "v_t_oikosu", word: "追い越す", furigana: "おいこす", romaji: "oikosu", meaning: "超車", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "前の遅い車を追い越します。", furigana: "まえのおそいくるまをおいこします。", en: "超越前面開得很慢的車。" }] },
  { id: "v_t_tsurikawa", word: "つり革", furigana: "つりかわ", romaji: "tsurikawa", meaning: "拉環", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "電車が揺れるのでつり革に捕まります。", furigana: "でんしゃがゆれるのでつりかわにつかまります。", en: "因為電車會搖晃所以抓著拉環。" }] },
  { id: "v_t_yuusenseki", word: "優先席", furigana: "ゆうせんせき", romaji: "yuusenseki", meaning: "博愛座 / 優先席", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "お年寄りに優先席を譲ります。", furigana: "おとしよりにゆうせんせきをゆずります。", en: "讓座（博愛座）給老人家。" }] },
  { id: "v_t_teikiken", word: "定期券", furigana: "ていきけん", romaji: "teikiken", meaning: "定期車票", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "電車に乗る時は定期券を使います。", furigana: "でんしゃにのるときはていきけんをつかいます。", en: "搭電車時使用定期車票。" }] },
  { id: "v_t_chaaji", word: "チャージする", furigana: "ちゃーじする", romaji: "chaajisuru", meaning: "加值 / 儲值", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "駅の機械でカードにチャージします。", furigana: "えきのきかいでかーどにちゃーじします。", en: "在車站的機器幫卡片加值。" }] },

  // ================= 休閒育樂與購物 (leisure_sports) Part 4 =================
  { id: "v_l_sumaho", word: "スマホ", furigana: "すまほ", romaji: "sumaho", meaning: "智慧型手機", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "スマホでニュースを読みます。", furigana: "すまほでにゅーすをよみます。", en: "用手機看新聞。" }] },
  { id: "v_l_pasokon", word: "パソコン", furigana: "ぱそこん", romaji: "pasokon", meaning: "個人電腦", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "パソコンで仕事をします。", furigana: "ぱそこんでしごとをします。", en: "用電腦工作。" }] },
  { id: "v_l_apuri", word: "アプリ", furigana: "あぷり", romaji: "apuri", meaning: "應用程式 (App)", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "便利な地図アプリを使っています。", furigana: "べんりなちずあぷりをつかっています。", en: "在使用方便的地圖APP。" }] },
  { id: "v_l_juuden", word: "充電する", furigana: "じゅうでんする", romaji: "juudensuru", meaning: "充電", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "スマホの電池がないので充電します。", furigana: "すまほのでんちがないのでじゅうでんします。", en: "手機沒電了所以要充電。" }] },
  { id: "v_l_shichaku", word: "試着する", furigana: "しちゃくする", romaji: "shichakusuru", meaning: "試穿", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "この服を試着してもいいですか？", furigana: "このふくをしちゃくしてもいいですか？", en: "我可以試穿這件衣服嗎？" }] },
  { id: "v_l_henpin", word: "返品する", furigana: "へんぴんする", romaji: "henpinsuru", meaning: "退貨", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "サイズが合わないので返品します。", furigana: "さいずがあわないのでへんぴんします。", en: "因為尺寸不合所以退貨。" }] },
  { id: "v_l_reji", word: "レジ", furigana: "れじ", romaji: "reji", meaning: "收銀台", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "レジの前に人が並んでいます。", furigana: "れじのまえにひとがならんでいます。", en: "收銀台前面排著隊。" }] },
  { id: "v_l_amimono", word: "編み物", furigana: "あみもの", romaji: "amimono", meaning: "編織", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "冬は編み物でセーターを作ります。", furigana: "ふゆはあみものでせーたーをつくります。", en: "冬天織毛衣。" }] },
  { id: "v_l_higaeri", word: "日帰り", furigana: "ひがえり", romaji: "higaeri", meaning: "單日來回", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "日帰りで温泉に行ってきました。", furigana: "ひがえりでおんせんへいってきました。", en: "單日來回去泡了溫泉。" }] },
  { id: "v_l_shukuhaku", word: "宿泊", furigana: "しゅくはく", romaji: "shukuhaku", meaning: "住宿", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "このホテルに二泊宿泊します。", furigana: "このほてるににはくしゅくはくします。", en: "要在這間飯店住兩晚。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt4.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 4) to data_n5.js!');
