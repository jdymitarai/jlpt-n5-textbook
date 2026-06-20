const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execSync } = require('child_process');

const projectDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');

const n5Entries = [
  {
    word: "はじめまして",
    furigana: "はじめまして",
    romaji: "hajimemashite",
    meaning: "初次見面，請多指教",
    category: "relations_human",
    exampleJa: "はじめまして、田中と申します。",
    exampleFurigana: "はじめまして、たなかともうします。",
    exampleEn: "初次見面，我姓田中。",
    level: "N5"
  },
  {
    word: "どうぞよろしく",
    furigana: "どうぞよろしく",
    romaji: "douzoyoroshiku",
    meaning: "請多指教，請多關照",
    category: "relations_human",
    exampleJa: "これからどうぞよろしくお願いします。",
    exampleFurigana: "これからどうぞよろしくおねがいします。",
    exampleEn: "今後請多指教。",
    level: "N5"
  },
  {
    word: "眼鏡",
    furigana: "めがね",
    romaji: "megane",
    meaning: "眼鏡",
    category: "fashion_beauty",
    exampleJa: "私は本を読むとき、眼鏡をかけます。",
    exampleFurigana: "わたしはほんをよむとき、めがねをかけます。",
    exampleEn: "我在讀書的時候會戴眼鏡。",
    level: "N5"
  },
  {
    word: "一足",
    furigana: "いっそく",
    romaji: "issoku",
    meaning: "一雙（鞋襪）",
    category: "math_quantity",
    exampleJa: "新しい靴を一足買いました。",
    exampleFurigana: "あたらしいくつをいっそくかいました。",
    exampleEn: "我買了一雙新鞋。",
    level: "N5"
  },
  {
    word: "二足",
    furigana: "にそく",
    romaji: "nisoku",
    meaning: "兩雙（鞋襪）",
    category: "math_quantity",
    exampleJa: "靴下を二足セットで購入した。",
    exampleFurigana: "くつしたをにそくせっとでこうにゅうした。",
    exampleEn: "買了兩雙一組的襪子。",
    level: "N5"
  },
  {
    word: "お腹",
    furigana: "おなか",
    romaji: "onaka",
    meaning: "肚子、腹部",
    category: "body_physiology",
    exampleJa: "お腹がいっぱいになりました。",
    exampleFurigana: "おなかがいっぱいになりました。",
    exampleEn: "肚子已經飽了。",
    level: "N5"
  },
  {
    word: "結構",
    furigana: "けっこう",
    romaji: "kekkou",
    meaning: "足夠、不用了（拒絕）",
    category: "properties_relations",
    exampleJa: "「お茶のお代わりはいかがですか」「いいえ、もう結構です」",
    exampleFurigana: "「おちゃのおかわりはいかがですか」「いいえ、もうけっこうです」",
    exampleEn: "「要再來一杯茶嗎？」「不用了，已經足夠了。」",
    level: "N5"
  },
  {
    word: "結構",
    furigana: "けっこう",
    romaji: "kekkou",
    meaning: "相當、非常（副詞用法）",
    category: "properties_relations",
    exampleJa: "このテストは結構難しいですね。",
    exampleFurigana: "このてすとはけっこうむずかしいですね。",
    exampleEn: "這個測驗相當難呢。",
    level: "N5"
  },
  {
    word: "背",
    furigana: "se",
    word: "背",
    furigana: "せ",
    romaji: "se",
    meaning: "身高、身材",
    category: "body_physiology",
    exampleJa: "彼はクラスの中で一番背が高いです。",
    exampleFurigana: "かれはくらすのなかでいちばんせがたかいです。",
    exampleEn: "他在班上身高是最高的。",
    level: "N5"
  },
  {
    word: "背",
    furigana: "せ",
    romaji: "se",
    meaning: "背部、後背",
    category: "body_physiology",
    exampleJa: "疲れたので背を伸ばした。",
    exampleFurigana: "つかれたのでせをonばした。",
    exampleJa: "疲れたので背を伸ばした。",
    exampleFurigana: "つかれたのでせをのばした。",
    exampleEn: "因為累了，所以伸展了背部。",
    level: "N5"
  },
  {
    word: "背広",
    furigana: "sebiro",
    romaji: "sebiro",
    meaning: "男裝西服",
    category: "fashion_beauty",
    exampleJa: "父は新しい背広を着て仕事に行きました。",
    exampleFurigana: "ちちはあたらしいsebiroをきてしごとにいきました。",
    exampleFurigana: "ちちはあたらしいせびろをきてしごとにいきました。",
    exampleEn: "父親穿著新西裝去上班了。",
    level: "N5"
  },
  {
    word: "歯",
    furigana: "は",
    romaji: "ha",
    meaning: "牙齒",
    category: "body_physiology",
    exampleJa: "寝る前に必ず歯を磨きます。",
    exampleFurigana: "ねるまえにかならずはをみがきます。",
    exampleEn: "睡覺前一定會刷牙。",
    level: "N5"
  },
  {
    word: "鼻",
    furigana: "はな",
    romaji: "hana",
    meaning: "鼻子",
    category: "body_physiology",
    exampleJa: "風邪をひいて鼻が詰まっています。",
    exampleFurigana: "かぜをひいてはながつまっています。",
    exampleEn: "因為感冒，鼻子塞住了。",
    level: "N5"
  },
  {
    word: "耳",
    furigana: "みみ",
    romaji: "mimi",
    meaning: "耳朵",
    category: "body_physiology",
    exampleJa: "ヘッドホンで耳が痛くなりました。",
    exampleFurigana: "へっどほんでみみがいたくなりました。",
    exampleEn: "戴耳機戴到耳朵痛了。",
    level: "N5"
  },
  {
    word: "目",
    furigana: "me",
    word: "目",
    furigana: "め",
    romaji: "me",
    meaning: "眼睛",
    category: "body_physiology",
    exampleJa: "パソコンの使いすぎで目が疲れました。",
    exampleFurigana: "ぱそこんのつかいすぎでめがつかれました。",
    exampleEn: "因為電腦用太多，眼睛疲倦了。",
    level: "N5"
  },
  {
    word: "髪",
    furigana: "かみ",
    romaji: "kami",
    meaning: "頭髮",
    category: "body_physiology",
    exampleJa: "彼女は長い髪をしています。",
    exampleFurigana: "かのじょはながいかみをしています。",
    exampleEn: "她留著長頭髮。",
    level: "N5"
  },
  {
    word: "首",
    furigana: "くび",
    romaji: "kubi",
    meaning: "脖子、頸部",
    category: "body_physiology",
    exampleJa: "首を寝違えてしまって痛いです。",
    exampleFurigana: "くびをねちがえてしまっていたいです。",
    exampleEn: "睡落枕了，脖子好痛。",
    level: "N5"
  },
  {
    word: "首",
    furigana: "くび",
    romaji: "kubi",
    meaning: "解雇、免職（以首になる/首にする形式）",
    category: "relations_human",
    exampleJa: "遅刻ばかりしていたら、会社を首になった。",
    exampleFurigana: "ちこくばかりしていたら、かいしゃをくびになった。",
    exampleEn: "因為一直遲到，被公司開除了。",
    level: "N5"
  },
  {
    word: "喉",
    furigana: "のど",
    romaji: "nodo",
    meaning: "喉嚨",
    category: "body_physiology",
    exampleJa: "カラオケで歌いすぎて喉が痛いです。",
    exampleFurigana: "からおけでうたいすぎてのどがいたいです。",
    exampleEn: "在卡拉OK唱太多，喉嚨很痛。",
    level: "N5"
  },
  {
    word: "肩",
    furigana: "かた",
    romaji: "kata",
    meaning: "肩膀",
    category: "body_physiology",
    exampleJa: "荷物が重くて肩が凝りました。",
    exampleFurigana: "にもつがおもくてかたがこりました。",
    exampleEn: "因為行李很重，肩膀酸痛了。",
    level: "N5"
  },
  {
    word: "胸",
    furigana: "むね",
    romaji: "mune",
    meaning: "胸部、胸口",
    category: "body_physiology",
    exampleJa: "緊張して胸がドキドキしています。",
    exampleFurigana: "きんちょうしてむねがどきどきしています。",
    exampleEn: "太緊張了，胸口撲通撲通地跳。",
    level: "N5"
  },
  {
    word: "背中",
    furigana: "せなか",
    romaji: "senaka",
    meaning: "後背、背部",
    category: "body_physiology",
    exampleJa: "背中がかゆいので、かいてください。",
    exampleFurigana: "せなかがかゆいので、かいてください。",
    exampleEn: "背部很癢，請幫我抓一下。",
    level: "N5"
  },
  {
    word: "腕",
    furigana: "うで",
    romaji: "ude",
    meaning: "手臂",
    category: "body_physiology",
    exampleJa: "彼は腕の筋肉がすごいです。",
    exampleFurigana: "かれはうでのきんにくがすごいです。",
    exampleEn: "他的手臂肌肉很厲害。",
    level: "N5"
  },
  {
    word: "指",
    furigana: "ゆび",
    romaji: "yubi",
    meaning: "手指",
    category: "body_physiology",
    exampleJa: "ドアに指を挟まないように注意してください。",
    exampleFurigana: "どあにゆびをはさまないようにちゅういしてください。",
    exampleEn: "請注意不要讓門夾到手指。",
    level: "N5"
  },
  {
    word: "爪",
    furigana: "つめ",
    romaji: "tsume",
    meaning: "指甲",
    category: "body_physiology",
    exampleJa: "一週間に一回は爪を切ります。",
    exampleFurigana: "いっしゅうかんにいっかいはつめをきります。",
    exampleEn: "一週至少修剪一次指甲。",
    level: "N5"
  },
  {
    word: "足首",
    furigana: "あしくび",
    romaji: "ashikubi",
    meaning: "腳踝",
    category: "body_physiology",
    exampleJa: "走っているときに足首をひねってしまった。",
    exampleFurigana: "はしっているときにあしくびをひねってしまった。",
    exampleEn: "跑步時扭傷了腳踝。",
    level: "N5"
  },
  {
    word: "腰",
    furigana: "こし",
    romaji: "koshi",
    meaning: "腰部",
    category: "body_physiology",
    exampleJa: "重い荷物を持ち上げたときに腰を痛めた。",
    exampleFurigana: "おもいにもつをもちあげたときにこしをいためた。",
    exampleEn: "搬重物時傷到了腰。",
    level: "N5"
  },
  {
    word: "指す",
    furigana: "さす",
    romaji: "sasu",
    meaning: "指向、指著",
    category: "properties_relations",
    exampleJa: "知らない人を指で指すのは失礼です。",
    exampleFurigana: "しらないひとをゆびでさすのはしつれいです。",
    exampleEn: "用手指著陌生人是很無禮的。",
    level: "N5"
  },
  {
    word: "指す",
    furigana: "さす",
    romaji: "sasu",
    meaning: "撐（傘）（常寫作さす或差す）",
    category: "properties_relations",
    exampleJa: "雨が激しくなったので、傘を指した。",
    exampleFurigana: "あめがはげしくなったので、かさをさした。",
    exampleEn: "因為雨變大了，所以撐起了傘。",
    level: "N5"
  },
  {
    word: "芋",
    furigana: "imo",
    romaji: "imo",
    meaning: "地瓜、芋頭、薯類",
    category: "food_culture",
    exampleJa: "秋には焼き芋が美味しくなります。",
    exampleFurigana: "あきにはやきいもがおいしくなります。",
    exampleEn: "秋天的烤地瓜會變得很美味。",
    level: "N5"
  },
  {
    word: "饅頭",
    furigana: "まんじゅう",
    romaji: "manjuu",
    meaning: "日式甜點饅頭",
    category: "food_culture",
    exampleJa: "お土産に温泉饅頭をもらいました。",
    exampleFurigana: "おみやげにおんせんまんじゅうをもらいました。",
    exampleEn: "收到了溫泉饅頭作為伴手禮。",
    level: "N5"
  }
];

const n4Entries = [
  {
    word: "指輪",
    furigana: "ゆびわ",
    romaji: "yubiwa",
    meaning: "戒指、指環",
    category: "fashion_beauty",
    exampleJa: "結婚記念日に指輪をプレゼントした。",
    exampleFurigana: "けっこんきねんびにゆびわをぷれぜんとした。",
    exampleEn: "在結婚紀念日送了戒指作為禮物。",
    level: "N4"
  },
  {
    word: "最初",
    furigana: "さいしょ",
    romaji: "saisho",
    meaning: "最初、開始",
    category: "properties_relations",
    exampleJa: "最初は日本語が全く分かりませんでした。",
    exampleFurigana: "さいしょはにほんごがまったくわかりませんでした。",
    exampleEn: "起初我完全不懂日文。",
    level: "N4"
  },
  {
    word: "外来",
    furigana: "がいらい",
    romaji: "gairai",
    meaning: "外來的、門診",
    category: "health_medical",
    exampleJa: "この病院の外来受付は午前中のみです。",
    exampleFurigana: "このびょういんのがいらいうけつけはごぜんちゅうのみです。",
    exampleEn: "這家醫院的門診掛號僅限上午。",
    level: "N4"
  },
  {
    word: "見かける",
    furigana: "みかける",
    romaji: "mikakeru",
    meaning: "看見、偶然看到（動詞）",
    category: "properties_relations",
    exampleJa: "駅の近くで彼を見かけました。",
    exampleFurigana: "えきのちかくでかれをみかけました。",
    exampleEn: "我在車站附近看到了他。",
    level: "N4"
  },
  {
    word: "歯医者",
    furigana: "はいしゃ",
    romaji: "haisha",
    meaning: "牙醫、牙科診所",
    category: "health_medical",
    exampleJa: "虫歯の治療のために認可された歯医者へ行きます。",
    exampleFurigana: "むしばのちりょうのためににんかされたはいしゃへいきます。",
    exampleEn: "為了治療牙齒而去牙醫診所。",
    level: "N4"
  },
  {
    word: "見える",
    furigana: "みえる",
    romaji: "mieru",
    meaning: "看得見、出現在眼前",
    category: "properties_relations",
    exampleJa: "ここから綺麗な富士山が見えます。",
    exampleFurigana: "ここからきれいなふじさんがみえます。",
    exampleEn: "從這裡看得見美麗的富士山。",
    level: "N4"
  },
  {
    word: "浅い",
    furigana: "あさい",
    romaji: "asai",
    meaning: "淺的（水深）",
    category: "properties_relations",
    exampleJa: "このプールは浅いので子供でも安心です。",
    exampleFurigana: "このぷーるはあさいのでこどもでもあんしんです。",
    exampleEn: "這個泳池很淺，所以小孩子也很安全。",
    level: "N4"
  },
  {
    word: "浅い",
    furigana: "あさい",
    romaji: "asai",
    meaning: "（經驗、知識）淺薄的、膚淺的",
    category: "properties_relations",
    exampleJa: "彼はまだこの分野での経験が浅いです。",
    exampleFurigana: "かれはまだこのぶんやでのけいけんがあさいです。",
    exampleEn: "他在這個領域的經驗還很淺薄。",
    level: "N4"
  },
  {
    word: "おつり",
    furigana: "おつり",
    romaji: "otsuri",
    meaning: "找零、零錢",
    category: "economy_business",
    exampleJa: "おつりの五百円をもらい忘れた。",
    exampleFurigana: "おつりのごひゃくえんをもらいわすれた。",
    exampleEn: "忘了拿找零的五百日圓。",
    level: "N4"
  },
  {
    word: "腕",
    furigana: "うde",
    word: "腕",
    furigana: "うで",
    romaji: "ude",
    meaning: "手臂（身體部位）",
    category: "body_physiology",
    exampleJa: "転んで腕を強く打ってしまった。",
    exampleFurigana: "ころんでうでをつよくうってしまった。",
    exampleEn: "摔倒時重重地撞到了手臂。",
    level: "N4"
  },
  {
    word: "腕",
    furigana: "うで",
    romaji: "ude",
    meaning: "技術、本領、能力",
    category: "properties_relations",
    exampleJa: "彼は料理の腕がとても良いです。",
    exampleFurigana: "かれはりょうりのうでがとてもよいです。",
    exampleEn: "他的廚藝（料理技術）非常好。",
    level: "N4"
  },
  {
    word: "まず",
    furigana: "まず",
    romaji: "mazu",
    meaning: "首先",
    category: "properties_relations",
    exampleJa: "帰宅したら、まず手と顔を洗います。",
    exampleFurigana: "きたくしたら、まずてとかおをあらいます。",
    exampleEn: "回到家後，首先洗手和洗臉。",
    level: "N4"
  },
  {
    word: "毛",
    furigana: "け",
    romaji: "ke",
    meaning: "毛、毛皮、頭髮",
    category: "body_physiology",
    exampleJa: "猫の毛が服にたくさんついている。",
    exampleFurigana: "ねこ advisersのけがふくにたくさんついている。",
    exampleFurigana: "ねこのけがふくにたくさんついている。",
    exampleEn: "衣服上黏了好多貓毛。",
    level: "N4"
  },
  {
    word: "のど",
    furigana: "のど",
    romaji: "nodo",
    meaning: "喉嚨",
    category: "body_physiology",
    exampleJa: "喉が渇いたので水を一杯ください。",
    exampleFurigana: "のどがかわいたのでみずをいっぱいください。",
    exampleEn: "喉嚨渴了，請給我一杯水。",
    level: "N4"
  },
  {
    word: "石",
    furigana: "いし",
    romaji: "ishi",
    meaning: "石頭",
    category: "geography_ecology",
    exampleJa: "道にある綺麗な石を拾いました。",
    exampleFurigana: "みちにあるきれいないしをひろいました。",
    exampleEn: "撿了路上漂亮的石頭。",
    level: "N4"
  },
  {
    word: "血",
    furigana: "ち",
    romaji: "chi",
    meaning: "血、血液",
    category: "body_physiology",
    exampleJa: "指を切って血が出てしまいました。",
    exampleFurigana: "ゆびをきってちがでてしまいました。",
    exampleEn: "割傷手指流血了。",
    level: "N4"
  },
  {
    word: "足す",
    furigana: "たす",
    romaji: "tasu",
    meaning: "加上、新增、補足（動詞）",
    category: "math_quantity",
    exampleJa: "スープの味が薄いので塩を足した。",
    exampleFurigana: "すーぷのあじがうすいのでしおをたした。",
    exampleEn: "因為湯的味道很淡，所以加了點鹽。",
    level: "N4"
  },
  {
    word: "足りる",
    furigana: "たりる",
    romaji: "tariru",
    meaning: "足夠、夠用（動詞）",
    category: "properties_relations",
    exampleJa: "生活費が足りなくて困っています。",
    exampleFurigana: "せいかつひがたりなくてこまっています。",
    exampleEn: "因為生活費不夠而感到困擾。",
    level: "N4"
  },
  {
    word: "案内",
    furigana: "あんない",
    romaji: "annai",
    meaning: "引導、導覽、介紹（常以案内する形式）",
    category: "relations_human",
    exampleJa: "京都の街を友達に案内してもらいました。",
    exampleFurigana: "きょうとのまちをともだちにあんないしてもらいました。",
    exampleEn: "朋友幫我導覽了京都的街道。",
    level: "N4"
  },
  {
    word: "戻る",
    furigana: "もどる",
    romaji: "modoru",
    meaning: "返回、折回（動詞）",
    category: "transport_mobility",
    exampleJa: "忘れ物をしたので一度席に戻ります。",
    exampleFurigana: "わすれものをしたのでいちどせきにもどります。",
    exampleEn: "因為忘拿東西了，要回座位一下。",
    level: "N4"
  },
  {
    word: "お見舞い",
    furigana: "おみまい",
    romaji: "omimai",
    meaning: "探望（生病的人）、慰問",
    category: "relations_human",
    exampleJa: "入院中の友達のお見舞いに行きました。",
    exampleFurigana: "にゅういんちゅうのともだchionomimai ni ikimashita。",
    exampleFurigana: "にゅういんちゅうのともだちのおみまいにいきました。",
    exampleEn: "去探望了住院的朋友。",
    level: "N4"
  },
  {
    word: "悲しい",
    furigana: "かなしい",
    romaji: "kanashii",
    meaning: "悲傷的、難過的",
    category: "psychology_character",
    exampleJa: "悲しい映画を見て涙が出ました。",
    exampleFurigana: "かなしいえいがをみてなみだがでました。",
    exampleEn: "看悲傷的電影流下了眼淚。",
    level: "N4"
  },
  {
    word: "入院",
    furigana: "niゅういん",
    word: "入院",
    furigana: "にゅういん",
    romaji: "nyuuin",
    meaning: "住院（常以入院する形式）",
    category: "health_medical",
    exampleJa: "祖父が病気で一週間入院しました。",
    exampleFurigana: "そふがびょうきでいっしゅうかんにゅういんしました。",
    exampleEn: "祖父因為生病住院了一星期。",
    level: "N4"
  },
  {
    word: "医学",
    furigana: "いがく",
    romaji: "igaku",
    meaning: "醫學",
    category: "health_medical",
    exampleJa: "将来は大学で医学を勉強したいです。",
    exampleFurigana: "しょうらいはだいがくでいがくをべんきょうしたいです。",
    exampleEn: "將來想在大學學習醫學。",
    level: "N4"
  },
  {
    word: "退院",
    furigana: "たいいん",
    romaji: "taiin",
    meaning: "出院（常以退院する形式）",
    category: "health_medical",
    exampleJa: "病気がすっかり治って明日退院します。",
    exampleFurigana: "びょうきがすっかりなおってあしたたいいんします。",
    exampleEn: "病完全治好了，明天出院。",
    level: "N4"
  },
  {
    word: "けが",
    furigana: "けが",
    romaji: "kega",
    meaning: "受傷、受傷害（常以けがする形式）",
    category: "health_medical",
    exampleJa: "サッカーの試合中に足をけがしてしまった。",
    exampleFurigana: "さっかーのしあいちゅうにあしをけがしてしまった。",
    exampleEn: "在足球比賽中腳受傷了。",
    level: "N4"
  }
];

const g1RuExceptions = [
  "帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる", "戻る", "もどる"
];
const iColumn = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "び", "ぎ", "じ", "ぴ"];
const eColumn = ["え", "け", "せ", "て", "ね", "へ", "め", "れ", "べ", "げ", "ぜ", "ぺ"];

function conjugateVerb(word, furigana, meaning) {
  word = word.trim();
  furigana = furigana.trim();

  if (word.endsWith("する") || furigana.endsWith("する")) {
    const rootK = word.slice(0, -2);
    const rootF = furigana.slice(0, -2);
    return {
      group: "第三類動詞 (不規則)",
      dictionary: `${word} (${furigana})`,
      masu: `${rootK}します (${rootF}します)`,
      te: `${rootK}して (${rootF}して)`,
      nai: `${rootK}しない (${rootF}しない)`,
      ta: `${rootK}した (${rootF}した)`
    };
  }

  if (word.endsWith("る")) {
    const charBeforeRu = furigana.charAt(furigana.length - 2);
    const isIRuOrERu = iColumn.includes(charBeforeRu) || eColumn.includes(charBeforeRu);
    const isGroup1Ru = g1RuExceptions.includes(word) || 
                       g1RuExceptions.includes(furigana) ||
                       !isIRuOrERu;

    const rootK = word.slice(0, -1);
    const rootF = furigana.slice(0, -1);

    if (isGroup1Ru) {
      return {
        group: "第一類動詞 (五段)",
        dictionary: `${word} (${furigana})`,
        masu: `${rootK}ります (${rootF}ります)`,
        te: `${rootK}って (${rootF}って)`,
        nai: `${rootK}らない (${rootF}らない)`,
        ta: `${rootK}った (${rootF}った)`
      };
    } else {
      return {
        group: "第二類動詞 (上下段)",
        dictionary: `${word} (${furigana})`,
        masu: `${rootK}ます (${rootF}ます)`,
        te: `${rootK}て (${rootF}て)`,
        nai: `${rootK}ない (${rootF}ない)`,
        ta: `${rootK}た (${rootF}た)`
      };
    }
  }

  const lastK = word.slice(-1);
  const lastF = furigana.slice(-1);
  const rootK = word.slice(0, -1);
  const rootF = furigana.slice(0, -1);

  const masuMap = { "う": "います", "つ": "ちます", "ぬ": "にます", "ぶ": "びます", "む": "みます", "く": "きます", "ぐ": "ぎます", "す": "します" };
  const teMap   = { "う": "って", "つ": "って", "ぬ": "んで", "ぶ": "んで", "む": "んで", "く": "いて", "ぐ": "いで", "す": "して" };
  const naiMap  = { "う": "わない", "つ": "たない", "ぬ": "なない", "ぶ": "ばない", "む": "まない", "く": "かない", "ぐ": "がない", "す": "さない" };
  const taMap   = { "う": "った", "つ": "った", "ぬ": "んだ", "ぶ": "んだ", "む": "んだ", "く": "いた", "ぐ": "いだ", "す": "した" };

  return {
    group: "第一類動詞 (五段)",
    dictionary: `${word} (${furigana})`,
    masu: `${rootK}${masuMap[lastK] || 'みます'} (${rootF}${masuMap[lastF] || 'みます'})`,
    te: `${rootK}${teMap[lastK] || 'んで'} (${rootF}${teMap[lastF] || 'んで'})`,
    nai: `${rootK}${naiMap[lastK] || 'まない'} (${rootF}${naiMap[lastF] || 'まない'})`,
    ta: `${rootK}${taMap[lastK] || 'んだ'} (${rootF}${taMap[lastF] || 'んだ'})`
  };
}

function processLevel(level, entries) {
  const lvlFile = `data_${level.toLowerCase()}.js`;
  const filePath = path.join(projectDir, lvlFile);
  const publicPath = path.join(publicDir, lvlFile);

  console.log(`Processing level ${level} in ${lvlFile}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  const fileContext = { window: {} };
  vm.createContext(fileContext);
  vm.runInContext(content, fileContext);

  const chunk = fileContext.window.JLPT_DATA_CHUNKS[level];
  if (!chunk || !chunk.vocabulary) {
    console.error(`Invalid structure in ${lvlFile}`);
    return;
  }

  // Clear existing to avoid duplicates if re-running
  chunk.vocabulary = [];

  entries.forEach(entry => {
    const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(entry.word.slice(-1)) || entry.word.endsWith('する');
    if (isVerb && (entry.category.endsWith('_verbs') || entry.category === 'properties_relations' || entry.category === 'transport_mobility' || entry.category === 'health_medical')) {
      // Check if it's not a noun like 案内
      if (entry.word !== '案内' && entry.word !== '入院' && entry.word !== '退院') {
        entry.conjugations = conjugateVerb(entry.word, entry.furigana, entry.meaning);
        console.log(`Generated conjugations for verb: ${entry.word}`);
      }
    }
    chunk.vocabulary.push(entry);
  });

  // Rebuild verbConjugations and adjectiveGroups
  const newVerbConjugations = [];
  const newAdjectiveGroups = { iAdjectives: [], naAdjectives: [] };

  chunk.vocabulary.forEach(v => {
    if (v.conjugations) {
      newVerbConjugations.push({
        dictionary: v.conjugations.dictionary,
        masu: v.conjugations.masu,
        te: v.conjugations.te,
        nai: v.conjugations.nai,
        meaning: v.meaning,
        group: v.conjugations.group
      });
    } else if (v.category === 'properties_relations' && v.word.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(v.word)) {
      let rootK = v.word.slice(0, -1);
      let rootF = v.furigana.slice(0, -1);
      let negative = `${rootK}くない`;
      let past = `${rootK}かった`;
      if (v.word === 'いい' || v.word === '良い' || v.furigana === 'いい' || v.furigana === 'よい') {
        negative = 'よくない';
        past = 'よかった';
      }
      newAdjectiveGroups.iAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: negative,
        past: past
      });
    } else if (v.category === 'properties_relations' && v.meaning.includes('的')) {
      newAdjectiveGroups.naAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: `${v.word}ではない`,
        past: `${v.word}でした`
      });
    }
  });

  chunk.verbConjugations = newVerbConjugations;
  chunk.adjectiveGroups = newAdjectiveGroups;

  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${level}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${level}"]; }`;
  
  fs.writeFileSync(filePath, outputString, 'utf8');
  fs.writeFileSync(publicPath, outputString, 'utf8');
  console.log(`Saved level ${level} database to root & public/ directories.`);
}

async function run() {
  processLevel('N5', n5Entries);
  processLevel('N4', n4Entries);

  console.log("\nBatch import complete! Synchronizing to Cloudflare KV...");
  
  // Run upload_text_to_kv.js
  try {
    execSync('node C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\upload_text_to_kv.js', { stdio: 'inherit' });
    console.log("KV Upload Complete!");
  } catch (err) {
    console.error("KV Upload Failed:", err.message);
  }
}

run().catch(console.error);
