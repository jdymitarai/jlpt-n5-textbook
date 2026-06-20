const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const megaWordsPt17 = [
  // ================= 資訊科技與電腦手機 (IT, Computers & Smartphones) =================
  { id: "v_h_pasokon", word: "パソコン", furigana: "ぱそこん", romaji: "pasokon", meaning: "電腦", level: "N5", category: "housing_space",
    sentences: [{ ja: "新しいパソコンを買いました。", furigana: "あたらしいぱそこんをかいました。", en: "買了新電腦。" }] },
  { id: "v_h_sumaho", word: "スマホ", furigana: "すまほ", romaji: "sumaho", meaning: "智慧型手機", level: "N4", category: "housing_space",
    sentences: [{ ja: "スマホでニュースを読みます。", furigana: "すまほでにゅーすをよみます。", en: "用手機看新聞。" }] },
  { id: "v_h_apuri", word: "アプリ", furigana: "あぷり", romaji: "apuri", meaning: "應用程式 (App)", level: "N4", category: "housing_space",
    sentences: [{ ja: "便利なアプリをダウンロードします。", furigana: "べんりなあぷりをだうんろーどします。", en: "下載方便的App。" }] },
  { id: "v_h_daunroodo", word: "ダウンロード", furigana: "だうんろーど", romaji: "daunroodo", meaning: "下載", level: "N4", category: "housing_space",
    sentences: [{ ja: "インターネットからファイルをダウンロードします。", furigana: "いんたーねっとからふぁいるをだうんろーどします。", en: "從網路上下載檔案。" }] },
  { id: "v_h_insutooru", word: "インストール", furigana: "いんすとーる", romaji: "insutooru", meaning: "安裝", level: "N3", category: "housing_space",
    sentences: [{ ja: "新しいソフトをパソコンにインストールします。", furigana: "あたらしいそふとをぱそこんにいんすとーるします。", en: "把新軟體安裝到電腦上。" }] },
  { id: "v_h_pasuwaado", word: "パスワード", furigana: "ぱすわーど", romaji: "pasuwaado", meaning: "密碼", level: "N4", category: "housing_space",
    sentences: [{ ja: "パスワードを忘れないようにメモします。", furigana: "ぱすわーどをわすれないようにもめします。", en: "為了不忘記密碼而記下來。" }] },
  { id: "v_h_akaunto", word: "アカウント", furigana: "あかうんと", romaji: "akaunto", meaning: "帳號", level: "N4", category: "housing_space",
    sentences: [{ ja: "SNSのアカウントを作成します。", furigana: "えすえぬえすのあかうんとをさくせいします。", en: "建立社群網站的帳號。" }] },
  { id: "v_h_roguin", word: "ログイン", furigana: "ろぐいん", romaji: "roguin", meaning: "登入", level: "N4", category: "housing_space",
    sentences: [{ ja: "サイトにログインして買い物をします。", furigana: "さいとにろぐいんしてかいものをします。", en: "登入網站購物。" }] },
  { id: "v_h_roguauto", word: "ログアウト", furigana: "ろぐあうと", romaji: "roguauto", meaning: "登出", level: "N4", category: "housing_space",
    sentences: [{ ja: "使い終わったらログアウトしてください。", furigana: "つかいおわったらろぐあうとしてください。", en: "用完之後請登出。" }] },
  { id: "v_h_kopii", word: "コピー", furigana: "こぴー", romaji: "kopii", meaning: "複製 / 影印", level: "N5", category: "housing_space",
    sentences: [{ ja: "この文章をコピーしてください。", furigana: "このぶんしょうをこぴーしてください。", en: "請複製這段文章。" }] },
  { id: "v_h_peesuto", word: "ペースト", furigana: "ぺーすと", romaji: "peesuto", meaning: "貼上", level: "N4", category: "housing_space",
    sentences: [{ ja: "コピーした文字をここにペーストします。", furigana: "こぴーしたもじをここにぺーすとします。", en: "把複製的文字貼在這裡。" }] },
  { id: "v_h_hozon", word: "保存", furigana: "ほぞん", romaji: "hozon", meaning: "儲存", level: "N3", category: "housing_space",
    sentences: [{ ja: "作ったデータをパソコンに保存します。", furigana: "つくったでーたをぱそこんにほぞんします。", en: "把做好的資料存到電腦裡。" }] },
  { id: "v_h_sakujo", word: "削除", furigana: "さくじょ", romaji: "sakujo", meaning: "刪除", level: "N3", category: "housing_space",
    sentences: [{ ja: "不要なメールを削除しました。", furigana: "ふようなめーるをさくじょしました。", en: "刪除了不需要的郵件。" }] },
  { id: "v_h_kensaku", word: "検索", furigana: "けんさく", romaji: "kensaku", meaning: "搜尋", level: "N3", category: "housing_space",
    sentences: [{ ja: "分からない言葉をインターネットで検索します。", furigana: "わからないことばをいんたーねっとでけんさくします。", en: "在網路上搜尋不懂的詞。" }] },
  { id: "v_h_gamen", word: "画面", furigana: "がめん", romaji: "gamen", meaning: "螢幕畫面", level: "N3", category: "housing_space",
    sentences: [{ ja: "パソコンの画面が急に暗くなりました。", furigana: "ぱそこんのがめんがきゅうにくらくなりました。", en: "電腦螢幕突然變暗了。" }] },
  { id: "v_h_kiiboodo", word: "キーボード", furigana: "きーぼーど", romaji: "kiiboodo", meaning: "鍵盤", level: "N4", category: "housing_space",
    sentences: [{ ja: "キーボードで文字を入力します。", furigana: "きーぼーどでもじをにゅうりょくします。", en: "用鍵盤輸入文字。" }] },
  { id: "v_h_mausu", word: "マウス", furigana: "まうす", romaji: "mausu", meaning: "滑鼠", level: "N4", category: "housing_space",
    sentences: [{ ja: "マウスをクリックしてください。", furigana: "まうすをくりっくしてください。", en: "請點擊滑鼠。" }] },
  { id: "v_h_juudenki", word: "充電器", furigana: "じゅうでんき", romaji: "juudenki", meaning: "充電器", level: "N4", category: "housing_space",
    sentences: [{ ja: "スマホの充電器を忘れました。", furigana: "すまほのじゅうでんきをわすれました。", en: "忘記帶手機充電器了。" }] },
  { id: "v_h_dengen", word: "電源", furigana: "でんげん", romaji: "dengen", meaning: "電源", level: "N4", category: "housing_space",
    sentences: [{ ja: "パソコンの電源を入れます。", furigana: "ぱそこんのでんげんをいれます。", en: "打開電腦電源。" }] },
  { id: "v_h_saikidou", word: "再起動", furigana: "さいきどう", romaji: "saikidou", meaning: "重新啟動", level: "N3", category: "housing_space",
    sentences: [{ ja: "スマホの動きが遅いので再起動します。", furigana: "すまほのうごきがおそいのでさいきどうします。", en: "因為手機跑很慢所以重新啟動。" }] },

  // ================= 職場與商務 (Business & Office) =================
  { id: "v_w_kaisha", word: "会社", furigana: "かいしゃ", romaji: "kaisha", meaning: "公司", level: "N5", category: "housing_space",
    sentences: [{ ja: "私は東京の会社で働いています。", furigana: "わたしはとうきょうのかいしゃではたらいています。", en: "我在東京的公司上班。" }] },
  { id: "v_w_shachou", word: "社長", furigana: "しゃちょう", romaji: "shachou", meaning: "社長 / 總經理", level: "N4", category: "housing_space",
    sentences: [{ ja: "社長の挨拶から会議が始まります。", furigana: "しゃちょうのあいさつからかいぎがはじまります。", en: "會議從總經理的致詞開始。" }] },
  { id: "v_w_buchou", word: "部長", furigana: "ぶちょう", romaji: "buchou", meaning: "部長 / 經理", level: "N4", category: "housing_space",
    sentences: [{ ja: "部長に書類を提出します。", furigana: "ぶちょうにしょるいをていしゅつします。", en: "向部長提交文件。" }] },
  { id: "v_w_kachou", word: "課長", furigana: "かちょう", romaji: "kachou", meaning: "課長 / 課級主管", level: "N4", category: "housing_space",
    sentences: [{ ja: "課長に仕事の報告をします。", furigana: "かちょうにしごとのほうこくをします。", en: "向課長報告工作。" }] },
  { id: "v_w_douryou", word: "同僚", furigana: "どうりょう", romaji: "douryou", meaning: "同事", level: "N3", category: "housing_space",
    sentences: [{ ja: "会社の同僚と一緒にランチを食べます。", furigana: "かいしゃのどうりょうといっしょにらんちをたべます。", en: "和公司的同事一起吃午餐。" }] },
  { id: "v_w_meishi", word: "名刺", furigana: "めいし", romaji: "meishi", meaning: "名片", level: "N3", category: "housing_space",
    sentences: [{ ja: "お客様と名刺を交換します。", furigana: "おきゃくさまとめいしをこうかんします。", en: "和客戶交換名片。" }] },
  { id: "v_w_kaigi", word: "会議", furigana: "かいぎ", romaji: "kaigi", meaning: "會議", level: "N4", category: "housing_space",
    sentences: [{ ja: "午後から大事な会議があります。", furigana: "ごごからだいじなかいぎがあります。", en: "下午有很重要的會議。" }] },
  { id: "v_w_shiryou", word: "資料", furigana: "しりょう", romaji: "shiryou", meaning: "資料 / 文件", level: "N3", category: "housing_space",
    sentences: [{ ja: "会議の資料を準備してください。", furigana: "かいぎのしりょうをじゅんびしてください。", en: "請準備會議資料。" }] },
  { id: "v_w_shimekiri", word: "締め切り", furigana: "しめきり", romaji: "shimekiri", meaning: "截止日期", level: "N3", category: "housing_space",
    sentences: [{ ja: "レポートの締め切りは明日です。", furigana: "れぽーとのしめきりはあすです。", en: "報告的截止日期是明天。" }] },
  { id: "v_w_nouki", word: "納期", furigana: "のうき", romaji: "nouki", meaning: "交貨期", level: "N3", category: "housing_space",
    sentences: [{ ja: "商品の納期を守ります。", furigana: "しょうひんののうきをまもります。", en: "遵守商品的交貨期。" }] },
  { id: "v_w_eigyou", word: "営業", furigana: "えいぎょう", romaji: "eigyou", meaning: "業務 / 營業", level: "N3", category: "housing_space",
    sentences: [{ ja: "営業の仕事で色々な会社に行きます。", furigana: "えいぎょうのしごとでいろいろなかいしゃにいきます。", en: "因為業務工作而去各種公司。" }] },
  { id: "v_w_shucchou", word: "出張", furigana: "しゅっちょう", romaji: "shucchou", meaning: "出差", level: "N4", category: "housing_space",
    sentences: [{ ja: "来週から大阪へ出張します。", furigana: "らいしゅうからおおさかへしゅっちょうします。", en: "下週開始去大阪出差。" }] },
  { id: "v_w_keiyaku", word: "契約", furigana: "けいやく", romaji: "keiyaku", meaning: "合約 / 契約", level: "N3", category: "housing_space",
    sentences: [{ ja: "新しい会社と契約を結びます。", furigana: "あたらしいかいしゃとけいやくをむすびます。", en: "和新公司簽訂合約。" }] },
  { id: "v_w_kikakusho", word: "企画書", furigana: "きかくしょ", romaji: "kikakusho", meaning: "企劃書", level: "N3", category: "housing_space",
    sentences: [{ ja: "新しいプロジェクトの企画書を書きます。", furigana: "あたらしいぷろじぇくとのきかくしょをかきます。", en: "寫新專案的企劃書。" }] },
  { id: "v_w_keigo", word: "敬語", furigana: "けいご", romaji: "keigo", meaning: "敬語", level: "N3", category: "housing_space",
    sentences: [{ ja: "目上の人には敬語を使います。", furigana: "めうえのひとにはけいごをつかいます。", en: "對長輩要使用敬語。" }] },
  { id: "v_w_meeru", word: "メール", furigana: "めーる", romaji: "meeru", meaning: "電子郵件", level: "N4", category: "housing_space",
    sentences: [{ ja: "お客様にメールを送ります。", furigana: "おきゃくさまにめーるをおくります。", en: "寄電子郵件給客戶。" }] },
  { id: "v_w_tenpu", word: "添付", furigana: "てんぷ", romaji: "tenpu", meaning: "附件 / 附加", level: "N3", category: "housing_space",
    sentences: [{ ja: "メールに写真を添付します。", furigana: "めーるにしゃしんをてんぷします。", en: "把照片附加在郵件裡。" }] },
  { id: "v_w_henshin", word: "返信", furigana: "へんしん", romaji: "henshin", meaning: "回覆", level: "N3", category: "housing_space",
    sentences: [{ ja: "先生からのメールに返信します。", furigana: "せんせいからのめーるにへんしんします。", en: "回覆老師的郵件。" }] },
  { id: "v_w_tensou", word: "転送", furigana: "てんそう", romaji: "tensou", meaning: "轉寄 / 轉送", level: "N3", category: "housing_space",
    sentences: [{ ja: "このメールを部長に転送してください。", furigana: "このめーるをぶちょうにてんそうしてください。", en: "請把這封郵件轉寄給部長。" }] },
  { id: "v_w_aisatsu", word: "挨拶", furigana: "あいさつ", romaji: "aisatsu", meaning: "打招呼 / 問候", level: "N4", category: "housing_space",
    sentences: [{ ja: "朝、会社に着いたら挨拶をします。", furigana: "あさ、かいしゃについたらあいさつをします。", en: "早上到了公司要打招呼。" }] },
  { id: "v_w_otsukaresamadesu", word: "お疲れ様です", furigana: "おつかれさまです", romaji: "otsukaresamadesu", meaning: "辛苦了 (職場最常用問候語)", level: "N3", category: "housing_space",
    sentences: [{ ja: "お疲れ様です。今日の会議の資料です。", furigana: "おつかれさまです。きょうのかいぎのしりょうです。", en: "辛苦了。這是今天會議的資料。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Avoid duplicates
const existingWords = new Set(db.vocabulary.map(v => v.word));
const newWords = megaWordsPt17.filter(v => !existingWords.has(v.word));

db.vocabulary = db.vocabulary.concat(newWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', newWords.length, 'Mega material life words (Part 17 - IT, Smartphones, Business) to data_n5.js!');
