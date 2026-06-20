const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const nursingWords = [
  // ================= 消化器系 (Digestive) =================
  { id: "v_shokudou", word: "食道", furigana: "しょくどう", romaji: "shokudou", meaning: "食道", level: "N5", category: "body_physiology",
    sentences: [{ ja: "胃酸が食道に逆流しています。", furigana: "いさんがしょくどうにぎゃくりゅうしています。", en: "胃酸正逆流至食道。" }] },
  { id: "v_shouchou", word: "小腸", furigana: "しょうちょう", romaji: "shouchou", meaning: "小腸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "栄養の大部分は小腸で吸収されます。", furigana: "えいようのだいぶぶんはしょうちょうできゅうしゅうされます。", en: "營養的大部分在小腸被吸收。" }] },
  { id: "v_daichou", word: "大腸", furigana: "だいちょう", romaji: "daichou", meaning: "大腸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "大腸カメラでポリープを切除しました。", furigana: "だいちょうかめらでぽりーぷをせつじょしました。", en: "用大腸鏡切除了息肉。" }] },
  { id: "v_juunishichou", word: "十二指腸", furigana: "じゅうにしちょう", romaji: "juunishichou", meaning: "十二指腸", level: "N5", category: "body_physiology",
    sentences: [{ ja: "十二指腸潰瘍の疑いがあります。", furigana: "じゅうにしちょうかいようのうたがいがあります。", en: "懷疑是十二指腸潰瘍。" }] },
  { id: "v_tannou", word: "胆嚢", furigana: "たんのう", romaji: "tannou", meaning: "膽囊", level: "N5", category: "body_physiology",
    sentences: [{ ja: "胆嚢に石がたまっています。", furigana: "たんのうにいしがたまっています。", en: "膽囊裡有結石。" }] },
  { id: "v_suizou", word: "膵臓", furigana: "すいぞう", romaji: "suizou", meaning: "胰臟", level: "N5", category: "body_physiology",
    sentences: [{ ja: "膵臓からインスリンが分泌されます。", furigana: "すいぞうからいんすりんがぶんぴつされます。", en: "胰島素由胰臟分泌。" }] },

  // ================= 呼吸器系 (Respiratory) =================
  { id: "v_kikan", word: "気管", furigana: "きかん", romaji: "kikan", meaning: "氣管", level: "N5", category: "body_physiology",
    sentences: [{ ja: "気管内挿管を行います。", furigana: "きかんないそうかんをおこないます。", en: "進行氣管內插管。" }] },
  { id: "v_kikanshi", word: "気管支", furigana: "きかんし", romaji: "kikanshi", meaning: "支氣管", level: "N5", category: "body_physiology",
    sentences: [{ ja: "気管支炎で呼吸が苦しいです。", furigana: "きかんしえんでこきゅうがくるしいです。", en: "因為支氣管炎呼吸困難。" }] },
  { id: "v_haihou", word: "肺胞", furigana: "はいほう", romaji: "haihou", meaning: "肺泡", level: "N5", category: "body_physiology",
    sentences: [{ ja: "肺胞でガス交換が行われます。", furigana: "はいほうでがすこうかんがおこなわれます。", en: "在肺泡進行氣體交換。" }] },
  { id: "v_oukakumaku", word: "横隔膜", furigana: "おうかくまく", romaji: "oukakumaku", meaning: "橫膈膜", level: "N5", category: "body_physiology",
    sentences: [{ ja: "深呼吸すると横隔膜が下がります。", furigana: "しんこきゅうするとおうかくまくがさがります。", en: "深呼吸時橫膈膜會下降。" }] },

  // ================= 循環器系 (Circulatory) =================
  { id: "v_shinbou", word: "心房", furigana: "しんぼう", romaji: "shinbou", meaning: "心房", level: "N5", category: "body_physiology",
    sentences: [{ ja: "心房細動の波形が見られます。", furigana: "しんぼうさいどうのはけいがみられます。", en: "可以觀察到心房顫動的波形。" }] },
  { id: "v_shinshitsu", word: "心室", furigana: "しんしつ", romaji: "shinshitsu", meaning: "心室", level: "N5", category: "body_physiology",
    sentences: [{ ja: "左心室から全身へ血液が送られます。", furigana: "さしんしつからぜんしんへけつえきがおくられます。", en: "血液從左心室被輸送到全身。" }] },
  { id: "v_daidoumyaku", word: "大動脈", furigana: "だいどうみゃく", romaji: "daidoumyaku", meaning: "大動脈", level: "N5", category: "body_physiology",
    sentences: [{ ja: "大動脈瘤の破裂に注意が必要です。", furigana: "だいどうみゃくりゅうのはれつにちゅういが必要です。", en: "需要注意大動脈瘤的破裂。" }] },
  { id: "v_joumyaku", word: "静脈", furigana: "じょうみゃく", romaji: "joumyaku", meaning: "靜脈", level: "N5", category: "body_physiology",
    sentences: [{ ja: "静脈にルートを確保します。", furigana: "じょうみゃくにるーとをかくほします。", en: "在靜脈建立點滴管路。" }] },
  { id: "v_mousaikekkan", word: "毛細血管", furigana: "もうさいけっかん", romaji: "mousaikekkan", meaning: "微血管", level: "N5", category: "body_physiology",
    sentences: [{ ja: "酸素は毛細血管を通って細胞に運ばれます。", furigana: "さんそはもうさいけっかんをとおってさいぼうにはこばれます。", en: "氧氣透過微血管被運送到細胞。" }] },
  { id: "v_ketsuatsu", word: "血圧", furigana: "けつあつ", romaji: "ketsuatsu", meaning: "血壓", level: "N5", category: "body_physiology",
    sentences: [{ ja: "毎朝血圧を測定してください。", furigana: "まいあさけつあつをそくていしてください。", en: "請每天早上測量血壓。" }] },
  { id: "v_myakuhaku", word: "脈拍", furigana: "みゃくはく", romaji: "myakuhaku", meaning: "脈搏", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脈拍が少し速いですね。", furigana: "みゃくはくがすこしはやいですね。", en: "脈搏稍微有點快呢。" }] },

  // ================= 脳神経系 (Nervous) =================
  { id: "v_dainou", word: "大脳", furigana: "だいのう", romaji: "dainou", meaning: "大腦(皮質層)", level: "N5", category: "body_physiology",
    sentences: [{ ja: "思考や記憶は大脳の働きです。", furigana: "しこうやきおくはだいのうのはたらきです。", en: "思考和記憶是大腦的功能。" }] },
  { id: "v_shounou", word: "小脳", furigana: "しょうのう", romaji: "shounou", meaning: "小腦", level: "N5", category: "body_physiology",
    sentences: [{ ja: "小脳は体のバランスを保ちます。", furigana: "しょうのうはからだのばらんすをたもちます。", en: "小腦維持著身體的平衡。" }] },
  { id: "v_noukan", word: "脳幹", furigana: "のうかん", romaji: "noukan", meaning: "腦幹", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脳幹は生命維持に不可欠な部分です。", furigana: "のうかんはせいめいいじにふかけつなぶぶんです。", en: "腦幹是維持生命不可或缺的部分。" }] },
  { id: "v_koukansinkei", word: "交感神経", furigana: "こうかんしんけい", romaji: "koukansinkei", meaning: "交感神經", level: "N5", category: "body_physiology",
    sentences: [{ ja: "緊張すると交感神経が優位になります。", furigana: "きんちょうするとこうかんしんけいがゆういになります。", en: "緊張時交感神經會處於優勢。" }] },

  // ================= 骨格・筋肉系 (Skeletal/Muscular) =================
  { id: "v_zugaikotsu", word: "頭蓋骨", furigana: "ずがいこつ", romaji: "zugaikotsu", meaning: "頭蓋骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "頭蓋骨の中に脳が保護されています。", furigana: "ずがいこつのなかにのうがほごされています。", en: "大腦受到頭蓋骨的保護。" }] },
  { id: "v_rokkotsu", word: "肋骨", furigana: "ろっこつ", romaji: "rokkotsu", meaning: "肋骨", level: "N5", category: "body_physiology",
    sentences: [{ ja: "事故で肋骨にヒビが入りました。", furigana: "じこでろっこつにひびがはいりました。", en: "因為事故肋骨出現了裂痕。" }] },
  { id: "v_sekitsui", word: "脊椎", furigana: "せきつい", romaji: "sekitsui", meaning: "脊椎", level: "N5", category: "body_physiology",
    sentences: [{ ja: "脊椎の変形で腰に痛みが出ます。", furigana: "せきついのへんけいでこしにいたみがでます。", en: "因為脊椎變形導致腰部出現疼痛。" }] },
  { id: "v_kotsuban", word: "骨盤", furigana: "こつばん", romaji: "kotsuban", meaning: "骨盆", level: "N5", category: "body_physiology",
    sentences: [{ ja: "出産の時に骨盤が開きます。", furigana: "しゅっさんのときにこつばんがひらきます。", en: "分娩時骨盆會張開。" }] },
  { id: "v_kansetsu", word: "関節", furigana: "かんせつ", romaji: "kansetsu", meaning: "關節", level: "N5", category: "body_physiology",
    sentences: [{ ja: "関節リウマチの治療を始めます。", furigana: "かんせつりうまちのちりょうをはじめます。", en: "開始進行類風濕性關節炎的治療。" }] },
  { id: "v_jintai", word: "靱帯", furigana: "じんたい", romaji: "jintai", meaning: "韌帶", level: "N5", category: "body_physiology",
    sentences: [{ ja: "スポーツで膝の靱帯を断裂しました。", furigana: "すぽーつでひざのじんたいをだんれつしました。", en: "因為運動導致膝蓋韌帶斷裂。" }] },

  // ================= 泌尿・生殖器系 (Urinary/Reproductive) =================
  { id: "v_boukou", word: "膀胱", furigana: "ぼうこう", romaji: "boukou", meaning: "膀胱", level: "N5", category: "body_physiology",
    sentences: [{ ja: "膀胱に尿がたまると尿意を感じます。", furigana: "ぼうこうににょうがたまるとにょういを感じます。", en: "膀胱積尿時就會感覺到尿意。" }] },
  { id: "v_nyoudou", word: "尿道", furigana: "にょうどう", romaji: "nyoudou", meaning: "尿道", level: "N5", category: "body_physiology",
    sentences: [{ ja: "尿道にカテーテルを挿入します。", furigana: "にょうどうにかてーてるをそうにゅうします。", en: "在尿道插入導尿管。" }] },
  { id: "v_shikyuu", word: "子宮", furigana: "しきゅう", romaji: "shikyuu", meaning: "子宮", level: "N5", category: "body_physiology",
    sentences: [{ ja: "子宮筋腫の定期検診を受けます。", furigana: "しきゅうきんしゅのていきけんしんをうけます。", en: "接受子宮肌瘤的定期檢查。" }] },

  // ================= 血液・免疫系 (Blood/Immunity) =================
  { id: "v_sekkekkyuu", word: "赤血球", furigana: "せっけっきゅう", romaji: "sekkekkyuu", meaning: "紅血球", level: "N5", category: "body_physiology",
    sentences: [{ ja: "赤血球が少ないと貧血になります。", furigana: "せっけっきゅうがすくないとひんけつになります。", en: "紅血球太少就會導致貧血。" }] },
  { id: "v_hakkekkyuu", word: "白血球", furigana: "はっけっきゅう", romaji: "hakkekkyuu", meaning: "白血球", level: "N5", category: "body_physiology",
    sentences: [{ ja: "感染症で白血球の数値が上がっています。", furigana: "かんせんしょうではっけっきゅうのすうちがあがっています。", en: "因為感染症導致白血球數值上升。" }] },
  { id: "v_kesshouban", word: "血小板", furigana: "けっしょうばん", romaji: "kesshouban", meaning: "血小板", level: "N5", category: "body_physiology",
    sentences: [{ ja: "血小板は血を止める働きをします。", furigana: "けっしょうばんはちをとめるはたらきをします。", en: "血小板具有止血的功能。" }] },
  { id: "v_rinpasetsu", word: "リンパ節", furigana: "りんぱせつ", romaji: "rinpasetsu", meaning: "淋巴結", level: "N5", category: "body_physiology",
    sentences: [{ ja: "首のリンパ節が腫れています。", furigana: "くびのりんぱせつがはれています。", en: "脖子的淋巴結腫起來了。" }] },
  { id: "v_koutai", word: "抗体", furigana: "こうたい", romaji: "koutai", meaning: "抗體", level: "N5", category: "body_physiology",
    sentences: [{ ja: "ワクチンを打って抗体を作ります。", furigana: "わくちんをうってこうたいをつくります。", en: "施打疫苗來產生抗體。" }] },

  // ================= 病理學 (Pathology) =================
  { id: "v_enshou", word: "炎症", furigana: "えんしょう", romaji: "enshou", meaning: "發炎", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷口に炎症が起きて赤くなっています。", furigana: "きずぐちにえんしょうがおきてあかくなっています。", en: "傷口發炎變紅了。" }] },
  { id: "v_kansen", word: "感染", furigana: "かんせん", romaji: "kansen", meaning: "感染", level: "N5", category: "health_medical",
    sentences: [{ ja: "ウイルスに感染しないように手洗いをします。", furigana: "ういるすにかんせんしないようにてあらいをします。", en: "為了不感染病毒要勤洗手。" }] },
  { id: "v_shuyou", word: "腫瘍", furigana: "しゅよう", romaji: "shuyou", meaning: "腫瘤", level: "N5", category: "health_medical",
    sentences: [{ ja: "脳に小さな腫瘍が見つかりました。", furigana: "のうにちいさなしゅようがみつかりました。", en: "在大腦發現了小腫瘤。" }] },
  { id: "v_akusei", word: "悪性腫瘍", furigana: "あくせいしゅよう", romaji: "akuseishuyou", meaning: "惡性腫瘤 (癌症)", level: "N5", category: "health_medical",
    sentences: [{ ja: "検査の結果、悪性腫瘍と診断されました。", furigana: "けんさのけっか、あくせいしゅようとしんだんされました。", en: "檢查結果診斷為惡性腫瘤。" }] },
  { id: "v_ryousei", word: "良性", furigana: "りょうせい", romaji: "ryousei", meaning: "良性", level: "N5", category: "health_medical",
    sentences: [{ ja: "腫瘍は良性だったので安心してください。", furigana: "しゅようはりょうせいだったのであんしんしてください。", en: "因為腫瘤是良性的，請放心。" }] },
  { id: "v_teni", word: "転移", furigana: "てんい", romaji: "teni", meaning: "轉移 (癌細胞等)", level: "N5", category: "health_medical",
    sentences: [{ ja: "がんが他の臓器に転移していないか調べます。", furigana: "がんがたのぞうきにてんいしていないかしらべます。", en: "檢查癌症是否轉移到其他臟器。" }] },
  { id: "v_kyoketsu", word: "虚血", furigana: "きょけつ", romaji: "kyoketsu", meaning: "缺血", level: "N5", category: "health_medical",
    sentences: [{ ja: "心筋が虚血状態になっています。", furigana: "しんきんがきょけつじょうたいになっています。", en: "心肌正處於缺血狀態。" }] },
  { id: "v_eshi", word: "壊死", furigana: "えし", romaji: "eshi", meaning: "壞死", level: "N5", category: "health_medical",
    sentences: [{ ja: "血流が止まり、組織が壊死しました。", furigana: "けつりゅうがとまり、そしきがえししました。", en: "血流停止導致組織壞死。" }] },
  { id: "v_shukketsu", word: "出血", furigana: "しゅっけつ", romaji: "shukketsu", meaning: "出血", level: "N5", category: "health_medical",
    sentences: [{ ja: "脳内で出血が起きています。", furigana: "のうないでしゅっけつがおきています。", en: "大腦內部正在出血。" }] },
  { id: "v_kessen", word: "血栓", furigana: "けっせん", romaji: "kessen", meaning: "血栓", level: "N5", category: "health_medical",
    sentences: [{ ja: "足の静脈に血栓ができました。", furigana: "あしのじょうみゃくにけっせんができました。", en: "腳部的靜脈產生了血栓。" }] },
  { id: "v_kousoku", word: "梗塞", furigana: "こうそく", romaji: "kousoku", meaning: "梗塞", level: "N5", category: "health_medical",
    sentences: [{ ja: "心筋梗塞で緊急搬送されました。", furigana: "しんきんこうそくできんきゅうはんそうされました。", en: "因為心肌梗塞被緊急送醫。" }] },
  { id: "v_fushu", word: "浮腫", furigana: "ふしゅ", romaji: "fushu", meaning: "水腫 (浮腫)", level: "N5", category: "health_medical",
    sentences: [{ ja: "足にひどい浮腫が見られます。", furigana: "あしにひどいふしゅがみられます。", en: "腳部可觀察到嚴重的水腫。" }] },
  { id: "v_ishuku", word: "萎縮", furigana: "いしゅく", romaji: "ishuku", meaning: "萎縮", level: "N5", category: "health_medical",
    sentences: [{ ja: "筋肉を使わないと萎縮してしまいます。", furigana: "きんにくをつかわないといしゅくしてしまいます。", en: "不使用肌肉的話就會萎縮。" }] },

  // ================= 臨床徵候 (Clinical Symptoms) =================
  { id: "v_okan", word: "悪寒", furigana: "おかん", romaji: "okan", meaning: "惡寒 (發冷)", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱が上がる前に悪寒がしました。", furigana: "ねつがあがるまえにおかんがしました。", en: "發燒前會覺得發冷。" }] },
  { id: "v_ouki", word: "嘔気", furigana: "おうき", romaji: "ouki", meaning: "噁心 (想吐)", level: "N5", category: "health_medical",
    sentences: [{ ja: "薬の副作用で強い嘔気があります。", furigana: "くすりのふくさようでつよいおうきがあります。", en: "因為藥物副作用產生強烈的噁心感。" }] },
  { id: "v_outo", word: "嘔吐", furigana: "おうと", romaji: "outo", meaning: "嘔吐", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者さんがさきほど嘔吐しました。", furigana: "かんじゃさんがさきほどおうとしました。", en: "病患剛剛嘔吐了。" }] },
  { id: "v_geri", word: "下痢", furigana: "げり", romaji: "geri", meaning: "腹瀉 (拉肚子)", level: "N5", category: "health_medical",
    sentences: [{ ja: "食中毒で激しい下痢を起こしています。", furigana: "しょくちゅうどくではげしいげりをおこしています。", en: "因為食物中毒引起劇烈的腹瀉。" }] },
  { id: "v_benpi", word: "便秘", furigana: "べんぴ", romaji: "benpi", meaning: "便秘", level: "N5", category: "health_medical",
    sentences: [{ ja: "便秘が続いてお腹が張っています。", furigana: "べんぴがつづいておなかがはっています。", en: "持續便秘導致腹部脹氣。" }] },
  { id: "v_memai", word: "眩暈", furigana: "めまい", romaji: "memai", meaning: "暈眩", level: "N5", category: "health_medical",
    sentences: [{ ja: "立ち上がった時に眩暈がしました。", furigana: "たちあがったときにめまいがしました。", en: "站起來的時候覺得頭暈。" }] },
  { id: "v_keiren", word: "痙攣", furigana: "けいれん", romaji: "keiren", meaning: "痙攣 (抽搐)", level: "N5", category: "health_medical",
    sentences: [{ ja: "熱が高くて子供が痙攣を起こしました。", furigana: "ねつがたかくてこどもがけいれんをおこしました。", en: "因為發高燒，孩子發生了熱痙攣。" }] },
  { id: "v_ishikishougai", word: "意識障害", furigana: "いしきしょうがい", romaji: "ishikishougai", meaning: "意識障礙", level: "N5", category: "health_medical",
    sentences: [{ ja: "患者に意識障害が見られます。", furigana: "かんじゃにいしきしょうがいがみられます。", en: "病患出現意識障礙的情況。" }] },
  { id: "v_kokyuukonnan", word: "呼吸困難", furigana: "こきゅうこんなん", romaji: "kokyuukonnan", meaning: "呼吸困難", level: "N5", category: "health_medical",
    sentences: [{ ja: "喘息の発作で呼吸困難になりました。", furigana: "ぜんそくのほっさでこきゅうこんなんになりました。", en: "因為氣喘發作導致呼吸困難。" }] },
  { id: "v_chianooze", word: "チアノーゼ", furigana: "ちあのーぜ", romaji: "chianooze", meaning: "發紺", level: "N5", category: "health_medical",
    sentences: [{ ja: "唇にチアノーゼが出ています。", furigana: "くちびるにちあのーぜがでています。", en: "嘴唇出現發紺現象。" }] },
  { id: "v_oudan", word: "黄疸", furigana: "おうだん", romaji: "oudan", meaning: "黃疸", level: "N5", category: "health_medical",
    sentences: [{ ja: "肝機能の低下で黄疸が出現しています。", furigana: "かんきのうのていかでおうだんがしゅつげんしています。", en: "由於肝功能下降出現了黃疸。" }] },

  // ================= 看護技術・医療行為 (Nursing skills) =================
  { id: "v_baitarusain", word: "バイタルサイン", furigana: "ばいたるさいん", romaji: "baitarusain", meaning: "生命徵象", level: "N5", category: "health_medical",
    sentences: [{ ja: "朝のバイタルサインを測定します。", furigana: "あさのばいたるさいんをそくていします。", en: "測量早晨的生命徵象。" }] },
  { id: "v_kenon", word: "検温", furigana: "けんおん", romaji: "kenon", meaning: "測量體溫", level: "N5", category: "health_medical",
    sentences: [{ ja: "今から検温に回ります。", furigana: "いまからけんおんにまわります。", en: "現在去巡房幫大家量體溫。" }] },
  { id: "v_tenteki", word: "点滴", furigana: "てんてき", romaji: "tenteki", meaning: "打點滴", level: "N5", category: "health_medical",
    sentences: [{ ja: "点滴が落ちていないか確認します。", furigana: "てんてきがおちていないかかくにんします。", en: "確認點滴是否有在滴。" }] },
  { id: "v_saiketsu", word: "採血", furigana: "さいけつ", romaji: "saiketsu", meaning: "抽血", level: "N5", category: "health_medical",
    sentences: [{ ja: "腕を少し縛って採血します。", furigana: "うでをすこししばってさいけつします。", en: "將手臂稍微綁緊來抽血。" }] },
  { id: "v_dounyou", word: "導尿", furigana: "どうにょう", romaji: "dounyou", meaning: "導尿", level: "N5", category: "health_medical",
    sentences: [{ ja: "自力で排尿できないため導尿します。", furigana: "じりきではいにょうできないためどうにょうします。", en: "因為無法自行排尿所以進行導尿。" }] },
  { id: "v_kyuuin", word: "吸引", furigana: "きゅういん", romaji: "kyuuin", meaning: "抽痰 (吸引)", level: "N5", category: "health_medical",
    sentences: [{ ja: "痰がたまっているので吸引しますね。", furigana: "たんがたまっているのできゅういんしますね。", en: "因為積了痰，所以幫您抽痰喔。" }] },
  { id: "v_monshin", word: "問診", furigana: "もんしん", romaji: "monshin", meaning: "問診", level: "N5", category: "health_medical",
    sentences: [{ ja: "診察の前に看護師が問診を行います。", furigana: "しんさつのまえにかんごしがもんしんをおこないます。", en: "看診前護理師會先進行問診。" }] },
  { id: "v_choushin", word: "聴診", furigana: "ちょうしん", romaji: "choushin", meaning: "聽診", level: "N5", category: "health_medical",
    sentences: [{ ja: "胸の音を聴診器で聴診します。", furigana: "むねのおとをちょうしんきでちょうしんします。", en: "用聽診器聽診胸部的聲音。" }] },
  { id: "v_shokushin", word: "触診", furigana: "しょくしん", romaji: "shokushin", meaning: "觸診", level: "N5", category: "health_medical",
    sentences: [{ ja: "お腹の痛いところを触診で確かめます。", furigana: "おなかのいたところをしょくしんでたしかめます。", en: "用觸診確認肚子痛的地方。" }] },
  { id: "v_shoudoku", word: "消毒", furigana: "しょうどく", romaji: "shoudoku", meaning: "消毒", level: "N5", category: "health_medical",
    sentences: [{ ja: "傷口をしっかりと消毒します。", furigana: "きずぐちをしっかりとしょうどくします。", en: "將傷口徹底消毒。" }] },
  { id: "v_mekkin", word: "滅菌", furigana: "めっきん", romaji: "mekkin", meaning: "滅菌 (無菌操作)", level: "N5", category: "health_medical",
    sentences: [{ ja: "手術器具は完全に滅菌されています。", furigana: "しゅじゅつきぐはかんぜんにめっきんされています。", en: "手術器具已經完全滅菌。" }] },
  { id: "v_kakuri", word: "隔離", furigana: "かくり", romaji: "kakuri", meaning: "隔離", level: "N5", category: "health_medical",
    sentences: [{ ja: "感染を防ぐため、個室に隔離します。", furigana: "かんせんをふせぐため、こしつにかくりします。", en: "為了防止感染，隔離至單人病房。" }] }
];

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);
const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

db.vocabulary = db.vocabulary.concat(nursingWords);

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log('Appended', nursingWords.length, 'nursing/pathology words to data_n5.js!');
