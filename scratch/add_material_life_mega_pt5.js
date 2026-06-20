const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt5 = [
  // ================= 飲食文化 (food_culture) Part 5 =================
  { id: "v_f_kanzume", word: "缶詰", furigana: "かんづめ", romaji: "kanzume", meaning: "罐頭", level: "N4", category: "food_culture",
    sentences: [{ ja: "地震の時のために缶詰を買っておきます。", furigana: "じしんのときのためにかんづめをかっておきます。", en: "為了防範地震，事先買好罐頭。" }] },
  { id: "v_f_reitoushokuhin", word: "冷凍食品", furigana: "れいとうしょくひん", romaji: "reitoushokuhin", meaning: "冷凍食品", level: "N3", category: "food_culture",
    sentences: [{ ja: "忙しい時は冷凍食品が便利です。", furigana: "いそがしいときはれいとうしょくひんがべんりです。", en: "忙碌的時候冷凍食品很方便。" }] },
  { id: "v_f_kappumen", word: "カップ麺", furigana: "かっぷめん", romaji: "kappumen", meaning: "杯麵", level: "N4", category: "food_culture",
    sentences: [{ ja: "夜中にお腹が空いてカップ麺を食べました。", furigana: "よなかにおなかがすいてかっぷめんをたべました。", en: "半夜肚子餓吃了杯麵。" }] },
  { id: "v_f_nigai", word: "苦い", furigana: "にがい", romaji: "nigai", meaning: "苦的", level: "N4", category: "food_culture",
    sentences: [{ ja: "この薬はとても苦いです。", furigana: "このくすりはとてもにがいです。", en: "這個藥非常苦。" }] },
  { id: "v_f_suppai", word: "酸っぱい", furigana: "すっぱい", romaji: "suppai", meaning: "酸的", level: "N4", category: "food_culture",
    sentences: [{ ja: "レモンは酸っぱいです。", furigana: "れもんはすっぱいです。", en: "檸檬很酸。" }] },
  { id: "v_f_shibui", word: "渋い", furigana: "しぶい", romaji: "shibui", meaning: "澀的", level: "N3", category: "food_culture",
    sentences: [{ ja: "このお茶は少し渋いです。", furigana: "このおちゃはすこししぶいです。", en: "這杯茶有點澀。" }] },
  { id: "v_f_ajigakoi", word: "味が濃い", furigana: "あじがこい", romaji: "ajigakoi", meaning: "味道濃的 / 口味重的", level: "N4", category: "food_culture",
    sentences: [{ ja: "このスープは少し味が濃いです。", furigana: "このすーぷはすこしあじがこいです。", en: "這碗湯口味有點重。" }] },
  { id: "v_f_houchou", word: "包丁", furigana: "ほうちょう", romaji: "houchou", meaning: "菜刀", level: "N3", category: "food_culture",
    sentences: [{ ja: "よく切れる包丁で肉を切ります。", furigana: "よくきれるほうちょうでにくをきります。", en: "用很利的菜刀切肉。" }] },
  { id: "v_f_manaita", word: "まな板", furigana: "まないた", romaji: "manaita", meaning: "砧板", level: "N3", category: "food_culture",
    sentences: [{ ja: "まな板の上で野菜を切ります。", furigana: "まないたのうえでやさいをきります。", en: "在砧板上切菜。" }] },
  { id: "v_f_wakasu", word: "沸かす", furigana: "わかす", romaji: "wakasu", meaning: "燒開 (水)", level: "N4", category: "food_culture",
    sentences: [{ ja: "お茶を飲むためにお湯を沸かします。", furigana: "おちゃをのむためにおゆをわかします。", en: "為了喝茶而燒開水。" }] },
  { id: "v_f_yuderu", word: "茹でる", furigana: "ゆでる", romaji: "yuderu", meaning: "水煮", level: "N3", category: "food_culture",
    sentences: [{ ja: "お湯で卵を茹でます。", furigana: "おゆでたまごをゆでます。", en: "用水煮蛋。" }] },
  { id: "v_f_niru", word: "煮る", furigana: "にる", romaji: "niru", meaning: "燉 / 煮", level: "N3", category: "food_culture",
    sentences: [{ ja: "大根と豚肉を醤油で煮ます。", furigana: "だいこんとぶたにくをしょうゆでにます。", en: "用醬油燉蘿蔔和豬肉。" }] },
  { id: "v_f_denshirenji", word: "電子レンジ", furigana: "でんしれんじ", romaji: "denshirenji", meaning: "微波爐", level: "N4", category: "food_culture",
    sentences: [{ ja: "お弁当を電子レンジで温めます。", furigana: "おべんとうをでんしれんじであたためます。", en: "用微波爐加熱便當。" }] },

  // ================= 服飾與美容 (fashion_beauty) Part 5 =================
  { id: "v_c_taitsu", word: "タイツ", furigana: "たいつ", romaji: "taitsu", meaning: "褲襪", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "冬はスカートの下にタイツを穿きます。", furigana: "ふゆはすかーとのしたにたいつをはきます。", en: "冬天在裙子底下穿褲襪。" }] },
  { id: "v_c_suniikaa", word: "スニーカー", furigana: "すにーかー", romaji: "suniikaa", meaning: "運動鞋", level: "N5", category: "fashion_beauty",
    sentences: [{ ja: "歩きやすいスニーカーを買いました。", furigana: "あるきやすいすにーかーをかいました。", en: "買了很好走的運動鞋。" }] },
  { id: "v_c_haihiiru", word: "ハイヒール", furigana: "はいひーる", romaji: "haihiiru", meaning: "高跟鞋", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "パーティーなのでハイヒールを履きます。", furigana: "ぱーてぃーなのではいひーるをはきます。", en: "因為是派對所以穿了高跟鞋。" }] },
  { id: "v_c_himowomusubu", word: "紐を結ぶ", furigana: "ひもをむすぶ", romaji: "himowomusubu", meaning: "綁鞋帶", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "靴の紐をしっかり結びます。", furigana: "くつのひもをしっかりむすびます。", en: "把鞋帶綁緊。" }] },
  { id: "v_c_botanwokaeru", word: "ボタンをかける", furigana: "ぼたんをかける", romaji: "botanwokakeru", meaning: "扣扣子", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "シャツのボタンを上までかけます。", furigana: "しゃつのぼたんをうえまでかけます。", en: "把襯衫的扣子扣到最上面。" }] },
  { id: "v_c_kamisori", word: "剃刀", furigana: "かみそり", romaji: "kamisori", meaning: "刮鬍刀", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "剃刀で髭をきれいに剃ります。", furigana: "かみそりでひげをきれいにそります。", en: "用刮鬍刀把鬍子刮乾淨。" }] },
  { id: "v_c_menbou", word: "綿棒", furigana: "めんぼう", romaji: "menbou", meaning: "棉花棒", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "お風呂の後に綿棒で耳を掃除します。", furigana: "おふろのあとにめんぼうでみみをそうじします。", en: "洗澡後用棉花棒清耳朵。" }] },
  { id: "v_c_tsumekiri", word: "爪切り", furigana: "つめきり", romaji: "tsumekiri", meaning: "指甲剪", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "爪切りは引き出しの中にあります。", furigana: "つめきりはひきだしのなかにあります。", en: "指甲剪在抽屜裡。" }] },
  { id: "v_c_oshare", word: "おしゃれ", furigana: "おしゃれ", romaji: "oshare", meaning: "時髦的", level: "N4", category: "fashion_beauty",
    sentences: [{ ja: "彼女はいつもおしゃれな服を着ています。", furigana: "かのじょはいつもおしゃれなふくをきています。", en: "她總是穿著時髦的衣服。" }] },
  { id: "v_c_dasai", word: "ダサい", furigana: "ださい", romaji: "dasai", meaning: "俗氣的", level: "N3", category: "fashion_beauty",
    sentences: [{ ja: "そのネクタイは少しダサいです。", furigana: "そのねくたいはすこしださいです。", en: "那條領帶有點俗氣。" }] },

  // ================= 居住與家電 (housing_space) Part 5 =================
  { id: "v_h_suidou", word: "水道", furigana: "すいどう", romaji: "suidou", meaning: "自來水", level: "N5", category: "housing_space",
    sentences: [{ ja: "水道の蛇口をしっかり閉めます。", furigana: "すいどうのじゃぐちをしっかりしめます。", en: "把水龍頭關緊。" }] },
  { id: "v_h_gasu", word: "ガス", furigana: "がす", romaji: "gasu", meaning: "瓦斯", level: "N4", category: "housing_space",
    sentences: [{ ja: "地震の時はガスの元栓を閉めます。", furigana: "じしんのときはがすのもとせんをしめます。", en: "地震時關閉瓦斯總開關。" }] },
  { id: "v_h_teiden", word: "停電", furigana: "ていでん", romaji: "teiden", meaning: "停電", level: "N3", category: "housing_space",
    sentences: [{ ja: "台風で家が停電しました。", furigana: "たいふうでいえがていでんしました。", en: "家裡因為颱風停電了。" }] },
  { id: "v_h_rouka", word: "廊下", furigana: "ろうか", romaji: "rouka", meaning: "走廊", level: "N4", category: "housing_space",
    sentences: [{ ja: "学校の廊下を走ってはいけません。", furigana: "がっこうのろうかをはしってはいけません。", en: "不可以在學校的走廊奔跑。" }] },
  { id: "v_h_tesuri", word: "手すり", furigana: "てすり", romaji: "tesuri", meaning: "扶手", level: "N3", category: "housing_space",
    sentences: [{ ja: "お年寄りのために階段に手すりをつけます。", furigana: "おとしよりのためにかいだんにてすりをつけます。", en: "為了老人家在樓梯裝了扶手。" }] },
  { id: "v_h_yuka", word: "床", furigana: "ゆか", romaji: "yuka", meaning: "地板", level: "N4", category: "housing_space",
    sentences: [{ ja: "床に物を置かないでください。", furigana: "ゆかにものをおかないでください。", en: "請不要把東西放在地板上。" }] },
  { id: "v_h_kabe", word: "壁", furigana: "かべ", romaji: "kabe", meaning: "牆壁", level: "N4", category: "housing_space",
    sentences: [{ ja: "壁にカレンダーを掛けます。", furigana: "かべにかれんだーをかけます。", en: "在牆上掛月曆。" }] },
  { id: "v_h_hangaa", word: "ハンガー", furigana: "はんがー", romaji: "hangaa", meaning: "衣架", level: "N4", category: "housing_space",
    sentences: [{ ja: "コートをハンガーにかけます。", furigana: "こーとをはんがーにかけます。", en: "把大衣掛在衣架上。" }] },
  { id: "v_h_senzai", word: "洗剤", furigana: "せんざい", romaji: "senzai", meaning: "清潔劑 / 洗衣精", level: "N3", category: "housing_space",
    sentences: [{ ja: "洗濯機に洗剤を入れます。", furigana: "せんたくきにせんざいをいれます。", en: "把洗衣精倒進洗衣機裡。" }] },
  { id: "v_h_kanki", word: "換気", furigana: "かんき", romaji: "kanki", meaning: "換氣 / 通風", level: "N3", category: "housing_space",
    sentences: [{ ja: "窓を開けて部屋の換気をします。", furigana: "まどをあけてへやのかんきをします。", en: "打開窗戶讓房間通風。" }] },
  { id: "v_h_futonwoshiku", word: "布団を敷く", furigana: "ふとんをしく", romaji: "futonwoshiku", meaning: "鋪床", level: "N3", category: "housing_space",
    sentences: [{ ja: "寝る前に畳の上に布団を敷きます。", furigana: "ねるまえにたたみのうえにふとんを敷きます。", en: "睡前在榻榻米上鋪床。" }] },

  // ================= 交通與移動 (transport_mobility) Part 5 =================
  { id: "v_t_baiku", word: "バイク", furigana: "ばいく", romaji: "baiku", meaning: "機車", level: "N5", category: "transport_mobility",
    sentences: [{ ja: "毎日バイクで会社に通っています。", furigana: "まいにちばいくでかいしゃにかよっています。", en: "每天騎機車去公司。" }] },
  { id: "v_t_fumikiri", word: "踏切", furigana: "ふみきり", romaji: "fumikiri", meaning: "平交道", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "踏切で電車が通り過ぎるのを待ちます。", furigana: "ふみきりででんしゃがとおりすぎるのをまちます。", en: "在平交道等電車通過。" }] },
  { id: "v_t_zaseki", word: "座席", furigana: "ざせき", romaji: "zaseki", meaning: "座位", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "新幹線の座席を予約しました。", furigana: "しんかんせんのざせきをよやくしました。", en: "預訂了新幹線的座位。" }] },
  { id: "v_t_anaunsu", word: "アナウンス", furigana: "あなうんす", romaji: "anaunsu", meaning: "廣播", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "駅のアナウンスをよく聞いてください。", furigana: "えきのあなうんすをよくきいてください。", en: "請仔細聽車站的廣播。" }] },
  { id: "v_t_hasshasuru", word: "発車する", furigana: "はっしゃする", romaji: "hasshasuru", meaning: "發車", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "電車がまもなく発車します。", furigana: "でんしゃがまもなくはっしゃします。", en: "電車即將發車。" }] },
  { id: "v_t_miraa", word: "ミラー", furigana: "みらー", romaji: "miraa", meaning: "後照鏡", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "バックする時は必ずミラーを見ます。", furigana: "ばっくするときはかならずみらーをみます。", en: "倒車時一定會看後照鏡。" }] },

  // ================= 休閒育樂與購物 (leisure_sports) Part 5 =================
  { id: "v_l_ekobaggu", word: "エコバッグ", furigana: "えこばっぐ", romaji: "ekobaggu", meaning: "環保袋", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "買い物に行く時はエコバッグを持っていきます。", furigana: "かいものにいくときはえこばっぐをもっていきます。", en: "去買東西時會帶環保袋。" }] },
  { id: "v_l_tokubaibi", word: "特売日", furigana: "とくばいび", romaji: "tokubaibi", meaning: "特賣日", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "毎週火曜日はスーパーの特売日です。", furigana: "まいしゅうかようびはすーぱーのとくばいびです。", en: "每週二是超市的特賣日。" }] },
  { id: "v_l_shoumikigen", word: "賞味期限", furigana: "しょうみきげん", romaji: "shoumikigen", meaning: "賞味期限", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "食べる前に賞味期限を確認します。", furigana: "たべるまえにしょうみきげんをかくにんします。", en: "吃之前會確認賞味期限。" }] },
  { id: "v_l_netto", word: "ネット", furigana: "ねっと", romaji: "netto", meaning: "網路", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "ネットで服を安く買いました。", furigana: "ねっとでふくをやすくかいました。", en: "在網路上買了便宜的衣服。" }] },
  { id: "v_l_souryou", word: "送料", furigana: "そうりょう", romaji: "souryou", meaning: "運費", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "５０００円以上買うと送料無料になります。", furigana: "ごせんえんいじょうかうとそうりょうむりょうになります。", en: "買五千日圓以上就免運費。" }] },
  { id: "v_l_kessai", word: "決済", furigana: "けっさい", romaji: "kessai", meaning: "結帳 / 付款", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "クレジットカードで決済しました。", furigana: "くれじっとかーどでけっさいしました。", en: "用信用卡付款了。" }] },
  { id: "v_l_takuhaibin", word: "宅配便", furigana: "たくはいびん", romaji: "takuhaibin", meaning: "宅配", level: "N4", category: "leisure_sports",
    sentences: [{ ja: "田舎の母から宅配便が届きました。", furigana: "いなかのははからたくはいびんがとどきました。", en: "鄉下的媽媽寄了宅配過來。" }] },
  { id: "v_l_fuzaihyou", word: "不在票", furigana: "ふざいひょう", romaji: "fuzaihyou", meaning: "未接獲取通知單", level: "N3", category: "leisure_sports",
    sentences: [{ ja: "ポストに不在票が入っていました。", furigana: "ぽすとにふざいひょうがはいっていました。", en: "信箱裡被塞了未接獲取通知單。" }] },
  { id: "v_l_bouringu", word: "ボウリング", furigana: "ぼうりんぐ", romaji: "bouringu", meaning: "保齡球", level: "N5", category: "leisure_sports",
    sentences: [{ ja: "休日は友達とボウリングをして遊びます。", furigana: "きゅうじつはともだちとぼうりんぐをしてあそびます。", en: "假日和朋友打保齡球玩樂。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt5.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 5) to data_n5.js!');
