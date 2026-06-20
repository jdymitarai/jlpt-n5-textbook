const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt11 = [
  // ================= 晨間與盥洗 (Morning Routine) =================
  { id: "v_h_mezamashidokei", word: "目覚まし時計", furigana: "めざましどけい", romaji: "mezamashidokei", meaning: "鬧鐘", level: "N4", category: "housing_space",
    sentences: [{ ja: "毎朝７時に目覚まし時計が鳴ります。", furigana: "まいあさしちじにめざましどけいがなります。", en: "每天早上七點鬧鐘會響。" }] },
  { id: "v_h_nebou", word: "寝坊する", furigana: "ねぼうする", romaji: "nebousuru", meaning: "睡過頭", level: "N4", category: "housing_space",
    sentences: [{ ja: "目覚ましをかけ忘れて寝坊しました。", furigana: "めざましをかけわすれてねぼうしました。", en: "忘記設鬧鐘而睡過頭了。" }] },
  { id: "v_h_haburashi", word: "歯ブラシ", furigana: "はぶらし", romaji: "haburashi", meaning: "牙刷", level: "N5", category: "housing_space",
    sentences: [{ ja: "新しい歯ブラシを買いました。", furigana: "あたらしいはぶらしをかいました。", en: "買了新的牙刷。" }] },
  { id: "v_h_hamigakiko", word: "歯磨き粉", furigana: "はみがきこ", romaji: "hamigakiko", meaning: "牙膏", level: "N4", category: "housing_space",
    sentences: [{ ja: "歯ブラシに歯磨き粉をつけます。", furigana: "はぶらしにはみがきこをつけます。", en: "在牙刷上擠牙膏。" }] },
  { id: "v_h_ugai", word: "うがい", furigana: "うがい", romaji: "ugai", meaning: "漱口", level: "N3", category: "housing_space",
    sentences: [{ ja: "外から帰ったら手洗いとうがいをします。", furigana: "そとからかえったらてあらいとうがいをします。", en: "從外面回來後要洗手和漱口。" }] },
  { id: "v_h_sengan", word: "洗顔", furigana: "せんがん", romaji: "sengan", meaning: "洗臉", level: "N4", category: "housing_space",
    sentences: [{ ja: "朝起きてすぐに洗顔をします。", furigana: "あさおきてすぐにせんがんをします。", en: "早上起床立刻洗臉。" }] },
  { id: "v_h_pajama", word: "パジャマ", furigana: "ぱじゃま", romaji: "pajama", meaning: "睡衣", level: "N5", category: "fashion_beauty",
    sentences: [{ ja: "お風呂に入った後、パジャマに着替えます。", furigana: "おふろにはいったあと、ぱじゃまにきがえます。", en: "洗完澡後換上睡衣。" }] },
  { id: "v_h_doraiyaa", word: "ドライヤー", furigana: "どらいやー", romaji: "doraiyaa", meaning: "吹風機", level: "N4", category: "housing_space",
    sentences: [{ ja: "ドライヤーで髪を乾かします。", furigana: "どらいやーでかみをおかかします。", en: "用吹風機把頭髮吹乾。" }] },

  // ================= 居家家事 (Housework / Chores) =================
  { id: "v_h_gomidashi", word: "ゴミ出し", furigana: "ごみだし", romaji: "gomidashi", meaning: "倒垃圾", level: "N3", category: "housing_space",
    sentences: [{ ja: "明日の朝はゴミ出しの日です。", furigana: "あすのあさはごみだしのひです。", en: "明天早上是倒垃圾的日子。" }] },
  { id: "v_h_moerugomi", word: "燃えるゴミ", furigana: "もえるごみ", romaji: "moerugomi", meaning: "可燃垃圾", level: "N4", category: "housing_space",
    sentences: [{ ja: "紙や生ゴミは燃えるゴミに捨てます。", furigana: "かみやなまごみはもえるごみにすてます。", en: "紙類和廚餘丟到可燃垃圾。" }] },
  { id: "v_h_moenaigomi", word: "燃えないゴミ", furigana: "もえないごみ", romaji: "moenaigomi", meaning: "不可燃垃圾", level: "N4", category: "housing_space",
    sentences: [{ ja: "ガラスは燃えないゴミです。", furigana: "がらすはもえないごみです。", en: "玻璃是不可燃垃圾。" }] },
  { id: "v_h_shigengomi", word: "資源ゴミ", furigana: "しげんごみ", romaji: "shigengomi", meaning: "資源回收垃圾", level: "N3", category: "housing_space",
    sentences: [{ ja: "ペットボトルは資源ゴミに出します。", furigana: "ぺっとぼとるはしげんごみにだします。", en: "寶特瓶拿去丟資源回收垃圾。" }] },
  { id: "v_h_sodaigomi", word: "粗大ゴミ", furigana: "そだいごみ", romaji: "sodaigomi", meaning: "大型垃圾", level: "N3", category: "housing_space",
    sentences: [{ ja: "古い自転車を粗大ゴミに出します。", furigana: "ふるいじてんしゃをそだいごみにだします。", en: "把舊腳踏車當作大型垃圾丟掉。" }] },
  { id: "v_h_soujiki", word: "掃除機", furigana: "そうじき", romaji: "soujiki", meaning: "吸塵器", level: "N4", category: "housing_space",
    sentences: [{ ja: "部屋に掃除機をかけます。", furigana: "へやにそうじきをかけます。", en: "用吸塵器吸房間。" }] },
  { id: "v_h_korokoro", word: "コロコロ", furigana: "ころころ", romaji: "korokoro", meaning: "黏塵滾筒", level: "N3", category: "housing_space",
    sentences: [{ ja: "服にコロコロをかけて埃を取ります。", furigana: "ふくにころころをかけてほこりをとります。", en: "用黏塵滾筒黏掉衣服上的灰塵。" }] },
  { id: "v_h_zoukin", word: "雑巾", furigana: "ぞうきん", romaji: "zoukin", meaning: "抹布", level: "N3", category: "housing_space",
    sentences: [{ ja: "雑巾を水で濡らして床を拭きます。", furigana: "ぞうきんをみずでぬらしてゆかをふきます。", en: "把抹布沾水擦地板。" }] },
  { id: "v_h_houki", word: "ほうき", furigana: "ほうき", romaji: "houki", meaning: "掃把", level: "N3", category: "housing_space",
    sentences: [{ ja: "ほうきで庭の落ち葉を掃きます。", furigana: "ほうきでにわのおちばをはきます。", en: "用掃把掃庭院的落葉。" }] },
  { id: "v_h_chiritori", word: "ちりとり", furigana: "ちりとり", romaji: "chiritori", meaning: "畚箕", level: "N3", category: "housing_space",
    sentences: [{ ja: "集めたゴミをちりとりに入れます。", furigana: "あつめたごみをちりとりにいれます。", en: "把掃起來的垃圾倒進畚箕裡。" }] },
  { id: "v_h_senntakumonowohosu", word: "洗濯物を干す", furigana: "せんたくものをほす", romaji: "senntakumonowohosu", meaning: "晾衣服", level: "N3", category: "housing_space",
    sentences: [{ ja: "天気がいいのでベランダで洗濯物を干します。", furigana: "てんきがいいのでべらんだでせんたくものをほします。", en: "因為天氣很好，在陽台晾衣服。" }] },
  { id: "v_h_senntakumonowotatamu", word: "洗濯物をたたむ", furigana: "せんたくものをたたむ", romaji: "senntakumonowotatamu", meaning: "摺衣服", level: "N3", category: "housing_space",
    sentences: [{ ja: "乾いた洗濯物をきれいにたたみます。", furigana: "かわいたせんたくものをきれいにたたみます。", en: "把乾的衣服摺整齊。" }] },
  { id: "v_h_airon", word: "アイロン", furigana: "あいろん", romaji: "airon", meaning: "熨斗", level: "N4", category: "housing_space",
    sentences: [{ ja: "シャツにアイロンをかけます。", furigana: "しゃつにあいろんをかけます。", en: "用熨斗燙襯衫。" }] },
  { id: "v_h_suponji", word: "スポンジ", furigana: "すぽんじ", romaji: "suponji", meaning: "海綿", level: "N4", category: "housing_space",
    sentences: [{ ja: "スポンジに洗剤をつけてお皿を洗います。", furigana: "すぽんじにせんざいをつけておさらをあらいます。", en: "在海綿上沾洗碗精洗盤子。" }] },

  // ================= 文具與小物 (Stationery & Tools) =================
  { id: "v_h_hasami", word: "はさみ", furigana: "はさみ", romaji: "hasami", meaning: "剪刀", level: "N5", category: "housing_space",
    sentences: [{ ja: "はさみで紙を切ります。", furigana: "はさみでかみをきります。", en: "用剪刀剪紙。" }] },
  { id: "v_h_nori", word: "のり", furigana: "のり", romaji: "nori", meaning: "膠水 / 口紅膠", level: "N4", category: "housing_space",
    sentences: [{ ja: "のりで写真をノートに貼ります。", furigana: "のりでしゃしんをのーとにはります。", en: "用膠水把照片貼在筆記本上。" }] },
  { id: "v_h_teepu", word: "テープ", furigana: "てーぷ", romaji: "teepu", meaning: "膠帶", level: "N4", category: "housing_space",
    sentences: [{ ja: "箱をテープでとめます。", furigana: "はこをてーぷでとめます。", en: "用膠帶把箱子封起來。" }] },
  { id: "v_h_hotchikisu", word: "ホッチキス", furigana: "ほっちきす", romaji: "hotchikisu", meaning: "釘書機", level: "N4", category: "housing_space",
    sentences: [{ ja: "ホッチキスで書類をとめます。", furigana: "ほっちきすでしょるいをとめます。", en: "用釘書機把文件釘起來。" }] },
  { id: "v_h_keshigomu", word: "消しゴム", furigana: "けしごむ", romaji: "keshigomu", meaning: "橡皮擦", level: "N5", category: "housing_space",
    sentences: [{ ja: "間違えた字を消しゴムで消します。", furigana: "まちがえたじをけしごむでけします。", en: "用橡皮擦把寫錯的字擦掉。" }] },
  { id: "v_h_jougi", word: "定規", furigana: "じょうぎ", romaji: "jougi", meaning: "尺", level: "N4", category: "housing_space",
    sentences: [{ ja: "定規を使ってまっすぐな線を引きます。", furigana: "じょうぎをつかってまっすぐなせんをひきます。", en: "用尺畫直線。" }] },
  { id: "v_h_boorupen", word: "ボールペン", furigana: "ぼーるぺん", romaji: "boorupen", meaning: "原子筆", level: "N5", category: "housing_space",
    sentences: [{ ja: "ボールペンで名前を書いてください。", furigana: "ぼーるぺんでなまえをかいてください。", en: "請用原子筆寫名字。" }] },
  { id: "v_h_keikoupen", word: "蛍光ペン", furigana: "けいこうぺん", romaji: "keikoupen", meaning: "螢光筆", level: "N3", category: "housing_space",
    sentences: [{ ja: "大切なところに蛍光ペンで色を塗ります。", furigana: "たいせつなところにけいこうぺんでいろをぬります。", en: "在重要的地方用螢光筆畫重點。" }] },
  { id: "v_h_memo", word: "メモ帳", furigana: "めもちょう", romaji: "memocho", meaning: "筆記本 / 便條紙", level: "N4", category: "housing_space",
    sentences: [{ ja: "忘れないようにメモ帳に書きます。", furigana: "わすれないようにめもちょうにかきます。", en: "為了不忘記寫在筆記本上。" }] },
  { id: "v_h_dentaku", word: "電卓", furigana: "でんたく", romaji: "dentaku", meaning: "計算機", level: "N3", category: "housing_space",
    sentences: [{ ja: "電卓を使って計算します。", furigana: "でんたくをつかってけいさんします。", en: "使用計算機計算。" }] },

  // ================= 街景與市鎮 (Street & Neighborhood) =================
  { id: "v_t_jihanki", word: "自動販売機", furigana: "じどうはんばいき", romaji: "jidouhanbaiki", meaning: "自動販賣機", level: "N5", category: "transport_mobility",
    sentences: [{ ja: "自動販売機で冷たいジュースを買います。", furigana: "じどうはんばいきでつめたいじゅーすをかいます。", en: "在自動販賣機買冰果汁。" }] },
  { id: "v_t_gomibako", word: "ゴミ箱", furigana: "ごみばこ", romaji: "gomibako", meaning: "垃圾桶", level: "N5", category: "housing_space",
    sentences: [{ ja: "ゴミはゴミ箱に捨ててください。", furigana: "ごみはごみばこにすててください。", en: "垃圾請丟進垃圾桶。" }] },
  { id: "v_t_shingou", word: "信号", furigana: "しんごう", romaji: "shingou", meaning: "紅綠燈", level: "N5", category: "transport_mobility",
    sentences: [{ ja: "信号が青になったら渡ります。", furigana: "しんごうがあおになったらわたります。", en: "紅綠燈變綠燈就過馬路。" }] },
  { id: "v_t_oudanhodou", word: "横断歩道", furigana: "おうだんほどう", romaji: "oudanhodou", meaning: "斑馬線", level: "N4", category: "transport_mobility",
    sentences: [{ ja: "道路は横断歩道を渡りましょう。", furigana: "どうろはおうだんほどうをわたりましょう。", en: "過馬路請走斑馬線。" }] },
  { id: "v_t_hodoukyou", word: "歩道橋", furigana: "ほどうきょう", romaji: "hodoukyou", meaning: "天橋", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "あそこの歩道橋を登って反対側に行きます。", furigana: "あそこのほどうきょうをのぼってはんたいがわにいきます。", en: "爬上那邊的天橋去對面。" }] },
  { id: "v_t_gaitou", word: "街灯", furigana: "がいとう", romaji: "gaitou", meaning: "路燈", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "夜は街灯が明るい道を歩いて帰ります。", furigana: "よるはがいとうがあかるいみちをあるいてかえります。", en: "晚上走有明亮路燈的路回家。" }] },
  { id: "v_t_denchuu", word: "電柱", furigana: "でんちゅう", romaji: "denchuu", meaning: "電線桿", level: "N3", category: "transport_mobility",
    sentences: [{ ja: "犬が電柱におしっこをしています。", furigana: "いぬがでんちゅうにおしっこをしています。", en: "狗在電線桿上尿尿。" }] },
  { id: "v_t_posuto", word: "ポスト", furigana: "ぽすと", romaji: "posuto", meaning: "郵筒 / 信箱", level: "N5", category: "housing_space",
    sentences: [{ ja: "手紙を赤いポストに入れます。", furigana: "てがみをあかいぽすとにいれます。", en: "把信投進紅色的郵筒裡。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt11.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 11 - Ultimate Everyday Mundane Life) to data_n5.js!');
