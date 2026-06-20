const fs = require('fs');
const path = require('path');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

// Compact format: "word|furigana|romaji|meaning|level|category|exampleJa|exampleEn"
const clinicalRecords = [
  // 1. Clinical Procedures & Nursing Actions (臨床護理動作與技術)
  "検温|けんおん|kenon|量體溫 / 測量體溫|臨床|nursing_clinical_procedure|朝の検温をしますので、体温計を脇の下に挟んでください。|要進行早上的體溫測量，請把體溫計夾在腋下。",
  "採血|さいけつ|saiketsu|抽血|臨床|nursing_clinical_procedure|採血をしますので、袖をまくって腕を伸ばしてください。|要幫您抽血，請捲起袖子並把手臂伸直。",
  "点滴|てんてき|tenteki|打點滴 / 靜脈輸液|臨床|nursing_clinical_procedure|点滴が始まります。もし針のところが痛むようでしたら教えてください。|點滴要開始打了。如果注射針的位置會痛的話請告訴我。",
  "吸引|きゅういん|kyuuin|吸痰 / 吸引|臨床|nursing_clinical_procedure|痰が絡んで苦しそうですね。今から吸引しましょうね。|痰卡住看起來很難受呢。現在來幫您吸痰喔。",
  "清拭|せいしき|seishiki|擦澡 / 床上擦澡|臨床|nursing_care|お風呂に入れないので、温かいタオルで体を清拭しますね。|因為現在不能泡澡，我用溫熱的毛巾幫您擦拭身體喔。",
  "移乗|いじょう|ijou|移位 / 移乘|臨床|nursing_care|ベッドから車椅子へ移乗するのをお手伝いします。|我來協助您從床上移位到輪椅上。",
  "体位変換|たいいへんかん|taiihenkan|更換體位 / 翻身|臨床|nursing_care|褥瘡を防ぐために、二時間おきに体位変換を行います。|為了預防褥瘡，每隔兩小時會幫您翻身一次。",
  "洗髪|せんぱつ|senpatsu|洗頭 / 床上洗髮|臨床|nursing_care|ベッドの上で気持ちよく洗髪ができるよう準備しますね。|我來準備一下，讓您在床上也能舒服地洗頭喔。",
  "足浴|そくよく|sokuyoku|泡腳 / 足浴|臨床|nursing_care|足を温めるとよく眠れますので、今から足浴をしましょう。|泡腳可以幫助睡眠，我們現在來做足浴吧。",
  "おむつ交換|おむつこうかん|omutsukoukan|更換尿布|臨床|nursing_care|おむつを交換しますので、少し横を向いてください。|要幫您換尿布，請稍微往旁邊側躺喔。",
  "導尿|どうにょう|dounyou|導尿|臨床|nursing_clinical_procedure|尿が出にくい状態ですので、カテーテルを使って導尿します。|因為您排尿有困難，我們將使用導尿管為您導尿。",
  "浣腸|かんちょう|kanchou|灌腸|臨床|nursing_clinical_procedure|便秘が続いてお腹が張っていますので、浣腸をしましょう。|因為持續便秘肚子有點脹，我們來進行灌腸吧。",
  "検尿|けんにょう|kennyou|驗尿 / 尿液檢查|臨床|nursing_clinical_procedure|こちらのコップに尿をとって、窓口に出してください。|請用這個杯子留取尿液並提交到窗口。",
  "検便|けんべん|kemben|驗便 / 糞便檢查|臨床|nursing_clinical_procedure|この容器に便を少量採取して、明日提出してください。|請用這個容器採集少量糞便，並於明天提交。",
  "胸骨圧迫|きょうこつあっぱく|kyoukotuappaku|胸外心臟按壓|臨床|nursing_clinical_procedure|心停止した患者に対し、ただちに胸骨圧迫を開始した。|針對心跳停止的患者，立刻開始了胸外心臟按壓。",
  "人工呼吸|じんこうこきゅう|jinkoukokyuu|人工呼吸|臨床|nursing_clinical_procedure|救急蘇生において、人工呼吸と心臓マッサージは重要です。|在急救復甦中，人工呼吸與心臟按摩非常重要。",
  "申し送り|もうしおくり|moushiokuri|護理交班 / 交代項目|臨床|nursing_management|夜勤 of 看護師への申し送りを始めます。|現在開始向夜班護理師進行交班。",
  "カルテ|かるて|karute|病歷|臨床|nursing_management|医師が患者さんのカルテを確認しながら診断を行っています。|醫生一邊確認患者的病歷一邊進行診斷。",
  "看護記録|かんごきろく|kangokiroku|護理記錄|臨床|nursing_management|検温の結果や処置の内容を看護記録に正しく入力します。|將體溫測量結果和處置內容正確地輸入至護理記錄中。",
  "インシデント|いんしでんと|inshidento|異常事件 / 異常通報|臨床|nursing_management|誤薬を未然に防いだため、インシデントレポートを提出します。|因為及時防止了給錯藥，需提交異常事件報告書。",
  "リハビリ|りはびり|rihabiri|復健|臨床|nursing_clinical|骨折の手術後、歩行訓練のリハビリを始めました。|骨折手術後，開始了步行訓練的復健。",
  "退院支援|たいいんしえん|taiinshien|出院準備服務 / 出院支援|臨床|nursing_clinical|自宅での介護環境を整えるため、退院支援を進めます。|為了完善在家的照護環境，正在推進出院準備服務。",
  "在宅看護|ざいたくかんご|zaitakukango|居家護理|臨床|nursing_clinical|訪問看護師が週に二回、自宅を訪問して在宅看護を行います。|居家護理師每週兩次訪問家中進行居家護理。",
  "終末期ケア|しゅうまつきけあ|shuumatsukikea|安寧療護 / 臨終關懷|臨床|nursing_clinical|終末期ケアにおいて、患者さんの尊厳を守ることは最優先です。|在安寧療護中，守護患者的尊嚴是最優先的事情。",
  "看取り|みとり|mitori|臨終陪伴 / 善終|臨床|nursing_clinical|ご家族に見守られながら、穏やかな看取りの時間を迎えました。|在家人的陪伴守護下，迎來了安詳的臨終時刻。",

  // 2. Anatomy & Systems (解剖與人體器官)
  "咽頭|いんとう|intou|咽頭 / 喉嚨後部|臨床|anatomy_internal|咽頭炎はのどの痛みや発熱を引き起こします。|咽頭炎會引起喉嚨痛和發燒。",
  "喉頭|こうとう|koutou|喉頭 / 聲帶部位|臨床|anatomy_internal|喉頭の粘膜が炎症を起こし、声が出にくくなっています。|喉頭粘膜發炎，導致聲音難以發出。",
  "扁桃|へんとう|hentou|扁桃腺|臨床|anatomy_internal|扁桃が腫れて、つばを飲み込むのも痛いです。|扁桃腺腫起來，連吞口水都會痛。",
  "食道|しょくどう|shokudou|食道|臨床|anatomy_internal|食道がんの早期発見には内視鏡検査が有効です。|內視鏡檢查對於早期發現食道癌非常有效。",
  "気管|きかん|kikan|氣管|臨床|anatomy_internal|異物が気管に入ると激しく咳き込みます。|異物進入氣管時會引起劇烈咳嗽。",
  "気管支|きかんし|kikanshi|支氣管|臨床|anatomy_internal|気管支炎になると呼吸が苦しくなります。|罹患支氣管炎時呼吸會變得困難。",
  "肺胞|はいほう|haihou|肺泡|臨床|anatomy_internal|肺胞で酸素と二酸化炭素のガス交換が行われます。|在肺泡進行氧氣與二氧化碳的氣體交換。",
  "心室|しんしつ|shinshitsu|心室|臨床|anatomy_internal|心室の収縮運動によって血液が全身に送り出されます。|透過心室的收縮運動將血液送往全身。",
  "心房|しんぼう|shinbou|心房|臨床|anatomy_internal|心房細動は脳梗塞の原因となることがあります。|心房顫動有時會成為腦梗塞的原因。",
  "動脈|どうみゃく|doumyaku|動脈|臨床|anatomy_internal|動脈は心臓から全身へ血液を送る血管です。|動脈是將血液從心臟送到全身的血管。",
  "静脈|じょうみゃく|joumyaku|靜脈|臨床|anatomy_internal|静脈には血液の逆流を防ぐための弁があります。|靜脈內有防止血液逆流的瓣膜。",
  "毛細血管|もうさいけっかん|mousaikekkan|毛細血管|臨床|anatomy_internal|毛細血管を通じて組織細胞に酸素が供給されます。|透過毛細血管將氧氣供給給組織細胞。",
  "十二指腸|じゅうにしちょう|juunishichou|十二指腸|臨床|anatomy_internal|十二指腸潰瘍は空腹時に痛みが生じやすいです。|十二指腸潰瘍容易在空腹時產生疼痛。",
  "小腸|しょうちょう|shouchou|小腸|臨床|anatomy_internal|小腸は栄養分の吸収を行う重要な器官です。|小腸是負責吸收營養成分的重要器官。",
  "大腸|だいちょう|daichou|大腸|臨床|anatomy_internal|大腸は水分を吸収し、便を形成する役割を持ちます。|大腸負責吸收水分並形成糞便。",
  "直腸|ちょくちょう|chokuchou|直腸|臨床|anatomy_internal|直腸は便を一時的にためておく器官です。|直腸是暫時儲存糞便的器官。",
  "胆嚢|たんのう|tannou|膽囊|臨床|anatomy_internal|胆嚢は肝臓で作られた胆汁を濃縮して蓄えます。|膽囊會濃縮並儲存肝臟製造的膽汁。",
  "膵臓|すいぞう|suizou|胰臟|臨床|anatomy_internal|膵臓は血糖値を下げるインスリンを分泌します。|胰臟會分泌降低血糖值的胰島素。",
  "腎臓|じんぞう|jinzou|腎臟|臨床|anatomy_internal|腎臓は老廃物をろ過して尿を作る器官です。|腎臟是過濾廢物並製造尿液的器官。",
  "膀胱|ぼうこう|boukou|膀胱|臨床|anatomy_internal|膀胱炎になると頻尿や排尿痛が現れます。|患膀胱炎時會出現頻尿或排尿痛。",
  "尿道|にょうどう|nyoudou|尿道|臨床|anatomy_internal|カテーテルを尿道から膀胱に挿入して導尿します。|將導尿管從尿道插入膀胱進行導尿。",
  "脳幹|のうかん|noukan|腦幹|臨床|anatomy_internal|脳幹は呼吸や循環など生命維持の中枢です。|腦幹是呼吸與循環等維持生命的中樞。",
  "脊髄|せきずい|sekizui|脊髓|臨床|anatomy_internal|脊髄損傷により運動麻痺や感覚障害が起こります。|脊髓損傷會導致運動麻痺或感覺障礙。",
  "自律神経|じりつしんけい|jiritsushinkei|自律神經|臨床|anatomy_internal|ストレスが溜まると自律神経のバランスが崩れます。|壓力累積時會破壞自律神經的平衡。",
  "甲状腺|こうじょうせん|koujousen|甲狀腺|臨床|anatomy_internal|甲状腺ホルモンは体の代謝を促進します。|甲狀腺素會促進身體的代謝。",
  "横隔膜|おうかくまく|oukakumaku|橫膈膜|臨床|anatomy_internal|しゃっくりは横隔膜の痙攣によって起こります。|打嗝是由於橫膈膜痙攣所引起的。",
  "大腿骨|だいたいこつ|daitaikotsu|大腿骨|臨床|anatomy_internal|高齢者が転倒すると大腿骨頸部骨折を起こしやすいです。|高齡者跌倒時容易造成大腿骨頸部骨折。",
  "靭帯|じんたい|jintai|韌帶|臨床|anatomy_internal|スポーツ中に膝の靭帯を損傷しました。|在運動中損傷了膝蓋的韌帶。",

  // 3. Medical Illnesses & Diseases (醫學疾病與症狀)
  "肺炎|はいえん|haien|肺炎|臨床|medical_illness|誤嚥性肺炎は高齢者に多く見られる疾患です。|誤吸性肺炎是高齡者中常見的疾病。",
  "糖尿病|とうにょうびょう|tounyoubyou|糖尿病|臨床|medical_illness|糖尿病の治療には食事療法と運動療法が基本です。|糖尿病的治療以飲食療法 and 運動療法為基礎。",
  "高血圧|こうけつあつ|kouketsuatsu|高血壓|臨床|medical_illness|高血圧を放置すると脳卒中のリスクが高まります。|放置高血壓不管會提高腦中風的風險。",
  "脳梗塞|のうこうそく|noukousoku|腦梗塞|臨床|medical_illness|脳梗塞の疑いがある場合は、一刻も早く受診が必要です。|懷疑有腦梗塞時，必須儘快就醫。",
  "心不全|しんふぜん|shinfuzen|心臟衰竭 / 心力衰竭|臨床|medical_illness|心不全の患者さんは、むくみや息切れが現れやすいです。|心臟衰竭的患者容易出現水腫或呼吸急促。",
  "白血病|はっけつびょう|hakketsubyou|白血病|臨床|medical_illness|白血病は血液のがんとも呼ばれる病気です。|白血病是也被稱為血液癌症的疾病。",
  "胃潰瘍|いかいよう|ikaiyou|胃潰瘍|臨床|medical_illness|ストレスにより胃潰瘍になり、胃の激痛が生じました。|因為壓力導致胃潰瘍，發生了胃部劇烈疼痛。",
  "肝硬変|かんこうへん|kankouhen|肝硬化|臨床|medical_illness|肝硬変が進行すると黄疸や腹水が生じます。|肝硬化惡化時會產生黃疸或腹水。",
  "腎不全|じんふぜん|jinfuzen|腎衰竭 / 腎功能不全|臨床|medical_illness|慢性腎不全の患者さんは人工透析が必要になります。|慢性腎衰竭的患者會需要進行人工透析。",
  "不眠症|ふみんしょう|fuminshou|失眠症|臨床|medical_illness|不眠症の改善のため、生活リズムを整えましょう。|為了改善失眠症，來調整生活作息吧。",
  "蕁麻疹|じんましん|jinmashin|蕁麻疹|臨床|medical_illness|アレルギー反応で全身に蕁麻疹が出ました。|因過敏反應全身起了蕁麻疹。",
  "骨折|こっせつ|kotsusetsu|骨折|臨床|medical_illness|転倒した際に手をついて手首を骨折しました。|跌倒手撐地時折斷了手腕。"
];

const nativeRecords = [
  // 1. Slang & Colloquialisms (流行語與俗語)
  "エモい|えもい|emoi|感性的 / 懷舊的 / 觸動人心的 (Slang)|母語者|i_adjectives|この映画のラストシーンは本当にエモいです。|這部電影的最後一個場景真的很觸動人心。",
  "バズる|ばずる|bazuru|在網路上爆紅 (Slang)|母語者|action_verbs|彼が投稿した写真がSNSで大バズりしています。|他上傳的照片在社群網站上大爆紅。",
  "ガチで|がちで|gachide|認真地 / 真的 (Slang)|母語者|adverbs_conjunctions|今回のテストはガチで勉強しないとやばいです。|這次考試不認真唸書的話就真的慘了。",
  "やばい|やばい|yabai|不妙的 / 厲害的 (Slang)|母語者|i_adjectives|宿題を忘れてしまってやばい状況です。|忘記寫作業了，狀況真是不妙。",
  "ググる|ぐぐる|guguru|用Google搜尋 (Slang)|母語者|action_verbs|美味しいレストランをスマホでググってみました。|用手機Google搜尋了美味的餐廳。",
  "ワンチャン|わんちゃん|wanchan|搞不好 / 有機會 (Slang)|母語者|adverbs_conjunctions|終電にワンチャン間に合うかもしれません。|搞不好還能趕得上最後一班電車。",
  "詰む|つむ|tsumu|完蛋 / 走投無路 (Slang)|母語者|action_verbs|課題が多すぎて、提出期限に間に合わず詰みました。|作業太多了，趕不上截止日期完蛋了。",
  "推し|おし|oshi|推薦 / 喜歡的偶像或支持對象|母語者|family_people|私の推しのグループが来月ライブを行います。|我支持的偶像團體下個月要辦演唱會。",
  "沼|ぬま|numa|著迷 / 陷入其中 (Slang)|母語者|other_nouns|アニメの沼にハマってしまって、徹夜で見ました。|陷入了動漫的深淵，熬夜看完了。",

  // 2. Idiomatic Expressions (日常慣用句)
  "目がない|めがない|meganai|非常喜歡 / 沒有抵抗力|母語者|i_adjectives|彼は甘いものに目がなく、毎日ケーキを食べます。|他對甜食沒有抵抗力，每天都吃蛋糕。",
  "耳が痛い|みみがいたい|mimigaitai|聽起來刺耳 (形容被說中缺點)|母語者|i_adjectives|先生の厳しい忠告は、私にとって耳が痛いです。|老師嚴厲的忠告對我來說非常刺耳。",
  "手を焼く|てをやく|teowaku|感到棘手 / 難以應付|母語者|action_verbs|反抗期の子供の教育にすっかり手を焼いています。|對處於叛逆期的小孩教育感到十分棘手。",
  "足を引っ張る|あしをひっぱる|ashiohipparu|拖後腿 / 妨礙|母語者|action_verbs|チームの足を引っ張らないように全力で頑張ります。|我會全力以赴，不拖累團隊的後腿。",
  "首を長くする|くびをながくする|kubiowanagakusuru|蹺首盼望 / 渴望|母語者|action_verbs|友達からの手紙を首を長くして待っています。|我正蹺首盼望著來自朋友的信。",
  "腹が立つ|はらがたつ|haragatatsu|生氣 / 發怒|母語者|action_verbs|約束を破られて、本当に腹が立ちました。|被爽約了，真的非常生氣。",
  "鼻が高い|はながたかい|hanagatakai|感到自豪 / 驕傲|母語者|i_adjectives|息子が試験で一番になり、親として鼻が高いです。|兒子考了第一名，做父母的感到很自豪。",
  "骨を折る|ほねをおる|honeoworu|費心 / 盡力 / 辛苦|母語者|action_verbs|このプロジェクトの調整には大変骨を折りました。|在調整這個專案上費了很大的心血。",

  // 3. Four-Character Idioms (四字熟語)
  "一石二鳥|いっせきにちょう|issekinichou|一石二鳥 / 一舉兩得|母語者|other_nouns|早起きは健康にも良く勉強もできて一石二鳥です。|早起對健康好又能唸書，真是一舉兩得。",
  "以心伝心|いしんでんしん|ishindenshin|心照不宣 / 心有靈犀|母語者|other_nouns|長年一緒に暮らしている夫婦は、以心伝心で通じ合います。|共同生活多年的夫婦，能心照不宣地互相理解。",
  "十人十色|じゅうにんといろ|juunintoiro|十人十色 / 每個人都不同|母語者|other_nouns|意見が分かれるのは、十人十色だから当然です。|每個人都不同，所以意見分歧是理所當然的。",
  "自業自得|じごうじとく|jigoujitoku|自作自受 / 咎由自取|母語者|other_nouns|準備を怠ってテストに落ちたのは、自業自得です。|疏於準備而考試落榜，是自作自受。",
  "一生懸命|いっしょうけんめい|isshoukenmei|拼命地 / 努力地|母語者|adverbs_conjunctions|日本語が上手になるために一生懸命勉強します。|為了讓日語變好，會拼命地努力學習。",
  "臨機応変|りんきおうへん|rinkiouhen|臨機應變|母語者|na_adjectives|マニュアル通りではなく、臨機応変に対応してください。|請不要照本宣科，請臨機應變地應對。",
  "順風満帆|じゅんぷうまんぱん|junpuumanpan|順風滿帆 / 一帆風順|母語者|other_nouns|彼の会社経営は、現在順風満帆に進んでいます。|他經營的公司目前進展得一帆風順。",

  // 4. Daily Items & Objects (日常生活物品)
  "スマホ|すまほ|sumaho|智慧型手機|母語者|daily_items|スマホの画面が割れてしまったので修理に出します。|手機螢幕裂開了，所以拿去修理。",
  "アプリ|あぷり|apuri|應用程式 (App)|母語者|daily_items|日本語を勉強するためのアプリをダウンロードしました。|下載了用來學習日語的應用程式。",
  "コンセント|こんせんと|konsento|插座|母語者|daily_items|プラグをコンセントにしっかりと差し込みます。|將插頭牢牢地插進插座裡。",
  "レジ袋|れじぶくろ|rejibukuro|塑膠袋 / 購物袋|母語者|daily_items|環境保護のために、レジ袋の有料化が進んでいます。|為了保護環境，塑膠袋收費化正在推廣中。",
  "ドライヤー|どらいやー|doraiyaa|吹風機|母語者|daily_items|お風呂上がりにドライヤーで髪を乾かします。|洗完澡後用吹風機把頭髮吹乾。",
  "爪切り|つめきり|tsumekiri|指甲剪|母語者|daily_items|爪が伸びてきたので、爪切りで綺麗に切ります。|指甲長長了，用指甲剪剪整齊。",
  "歯ブラシ|はぶらし|haburashi|牙刷|母語者|daily_items|毎食後、新しい歯ブラシで丁寧に歯を磨きます。|每餐飯後用新的牙刷認真刷牙。",
  "電子レンジ|でんしれんじ|denshirenji|微波爐|母語者|daily_items|冷蔵庫のご飯を電子レンジで温めて食べます。|用微波爐把冰箱的飯加熱後吃。",
  "冷蔵庫|れいぞうこ|reizouko|冰箱|母語者|daily_items|夏場は食べ物が傷みやすいので冷蔵庫に入れます。|夏天食物容易壞所以放進冰箱。",

  // 5. Social & Work Life (職場與社會生活)
  "残業|ざんぎょう|zangyou|加班|母語者|work_business|仕事が終わらず、今日も二時間残業しました。|工作做不完，今天又加班了兩個小時。",
  "有給休暇|ゆうきゅうきゅうか|yuukuukuuka|特休 / 有薪假|母語者|work_business|リフレッシュするために、来週有給休暇を取ります。|為了放鬆一下，下週要請有薪假。",
  "サラリーマン|さらりーまん|sarariiman|上班族 / 薪水階級|母語者|work_business|日本のサラリーマンは毎朝スーツを着て通勤します。|日本上班族每天早上穿西裝通勤。",
  "定年退職|ていねんたいしょく|teinentaisoku|退休 / 屆齡退休|母語者|work_business|祖父は長年勤めた会社を昨日定年退職しました。|祖父昨天從服務多年的公司屆齡退休了。",
  "確定申告|かくていしんこく|kakuteishinkoku|所得稅申報 / 報稅|母語者|work_business|毎年三月までに確定申告を行う必要があります。|每年三月前有必要完成所得稅申報。",
  "履歴書|りれきしょ|rirekisho|履歷表|母語者|work_business|就職活動のために、履歴書を丁寧に書き上げました。|為了求職活動，認真地寫好了履歷表。",
  "面接|めんせつ|mensetsu|面試|母語者|work_business|会社の採用面接を受けるため、緊張しています。|因為要接受公司的錄用面試，感到很緊張。",

  // 6. Culture & Food (日本文化與美食)
  "味噌汁|みそしる|misoshiru|味噌湯|母語者|food_drinks|日本の朝食には、ご飯と味噌汁が欠かせません。|日本早餐中，飯 and 味噌湯是不可或缺的。",
  "お好み焼き|おこのみやき|okonomiyaki|大阪燒 / 御好燒|母語者|food_drinks|大阪の有名な店で美味しいお好み焼きを食べました。|在大阪的有名店裡吃了美味的大阪燒。",
  "たこ焼き|たこやき|takoyaki|章魚燒|母語者|food_drinks|屋台でアツアツのたこ焼きを買って食べました。|在路邊攤買了熱騰騰的章魚燒吃。",
  "納豆|なっとう|nattou|納豆|母語者|food_drinks|納豆は独特の匂いがありますが、健康にとても良いです。|納豆雖然有獨特的味道，但對健康非常好。",
  "居酒屋|いざかや|izakaya|居酒屋|母語者|places_buildings|金曜日の夜、同僚と居酒屋でビールを飲みました。|週五晚上和同事在居酒屋喝了啤酒。",
  "鳥居|とりい|torii|鳥居|母語者|places_buildings|神社の入り口には大きな赤い鳥居が立っています。|神社的入口處立著巨大的紅色鳥居。",
  "お盆|おぼん|obon|盂蘭盆節|母語者|numbers_time|お盆の時期には、多くの人が実家に帰省します。|盂蘭盆節時期，許多人會回老家探親。",
  "初詣|はつもうで|hatsumoude|新年參拜 (初詣)|母語者|leisure_sports|元旦に家族と一緒に神社へ初詣に行きました。|元旦時和家人一起去了神社進行新年參拜。",

  // 7. Everyday Verbs & Adverbs (日常動詞與副詞/擬態詞)
  "のんびり|のんびり|nombiri|悠閒地 / 悠哉地|母語者|adverbs_conjunctions|週末は家でテレビを見ながらのんびり過ごします。|週末在家一邊看電視一邊悠閒地度過。",
  "まったり|まったり|mattari|悠閒放鬆 (Slang)|母語者|adverbs_conjunctions|カフェでお茶を飲みながらまったりおしゃべりしました。|在咖啡廳喝茶一邊放鬆聊天。",
  "すっきり|すっきり|sukkiri|舒暢地 / 整潔地|母語者|adverbs_conjunctions|部屋を掃除して、気持ちがすっきりしました。|打掃房間後，心情變得非常舒暢。",
  "うっかり|うっかり|ukkiri|不小心地 / 糊塗地|母語者|adverbs_conjunctions|うっかり約束の時間を忘れてしまいました。|不小心忘記了約定好的時間。",
  "がっかり|がっかり|gakkari|失望地 / 沮喪地|母語者|adverbs_conjunctions|テストの点数が悪くて、がっかりしました。|因為考試分數不好而感到很失望。",
  "忖度|そんたく|sontaku|揣摩上意 / 忖度|母語者|action_verbs|相手の気持ちを忖度して、発言の内容を選びます。|揣摩對方的意圖來挑選發言內容。",
  "葛藤|かっとう|kattou|糾結 / 葛藤 / 心理掙扎|母語者|other_nouns|どちらの仕事を選ぶべきか、激しい葛藤があります。|該選擇哪一份工作，內心有激烈的掙扎。",

  // 8. Life Milestones (人生階段與儀式)
  "七五三|しちごさん|shichigosan|七五三節 (兒童節祝賀儀式)|母語者|numbers_time|子供の成長を祝うため、家族で七五三の参拝に行きました。|為了慶祝小孩成長，全家去進行七五三參拜。",
  "成人式|せいじんしき|seijinshiki|成人式 (二十歲祝賀典禮)|母語者|leisure_sports|成人式で華やかな振袖を着て出席しました。|在成人式上穿著華麗的振袖出席了。",
  "還暦|かんれき|kanreki|花甲 / 還曆 (六十歲大壽)|母語者|numbers_time|父の還暦祝いに赤いちゃんちゃんこを贈りました。|在父親六十歲大壽時送了紅色背心祝壽。"
];

function recordToVocab(record) {
  const parts = record.split('|');
  return {
    word: parts[0],
    furigana: parts[1],
    romaji: parts[2],
    meaning: parts[3],
    level: parts[4],
    category: parts[5],
    exampleJa: parts[6],
    exampleEn: parts[7], // compatibility key
    exampleFurigana: parts[6] // fallback or simplified
  };
}

console.log("Processing Clinical Vocabulary...");
const clinicalVocab = clinicalRecords.map(recordToVocab);

console.log("Processing Native Vocabulary...");
const nativeVocab = nativeRecords.map(recordToVocab);

// Format level chunk structure
const clinicalChunk = {
  vocabulary: clinicalVocab,
  verbConjugations: [],
  adjectiveGroups: { iAdjectives: [], naAdjectives: [] }
};

const nativeChunk = {
  vocabulary: nativeVocab,
  verbConjugations: [],
  adjectiveGroups: { iAdjectives: [], naAdjectives: [] }
};

// Conjugate any verbs or adjectives inside the chunks
const iColumn = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "び", "ぎ", "じ", "ぴ"];
const eColumn = ["え", "け", "せ", "て", "ね", "へ", "め", "れ", "べ", "げ", "ぜ", "ぺ"];
const g1RuExceptions = ["帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる"];

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
    const isGroup1Ru = g1RuExceptions.includes(word) || g1RuExceptions.includes(furigana) || !isIRuOrERu;

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
    masu: `${rootK}${masuMap[lastK] || 'います'} (${rootF}${masuMap[lastF] || 'います'})`,
    te: `${rootK}${teMap[lastK] || 'んで'} (${rootF}${teMap[lastF] || 'んで'})`,
    nai: `${rootK}${naiMap[lastK] || 'まない'} (${rootF}${naiMap[lastF] || 'まない'})`,
    ta: `${rootK}${taMap[lastK] || 'んだ'} (${rootF}${taMap[lastF] || 'んだ'})`
  };
}

function processChunk(chunk) {
  chunk.vocabulary.forEach(v => {
    if (v.category === 'action_verbs') {
      v.conjugations = conjugateVerb(v.word, v.furigana, v.meaning);
      chunk.verbConjugations.push({
        dictionary: v.conjugations.dictionary,
        masu: v.conjugations.masu,
        te: v.conjugations.te,
        nai: v.conjugations.nai,
        meaning: v.meaning,
        group: v.conjugations.group
      });
    } else if (v.category === 'i_adjectives') {
      let rootK = v.word.endsWith('い') ? v.word.slice(0, -1) : v.word;
      let negative = `${rootK}くない`;
      let past = `${rootK}かった`;
      if (v.word === 'いい' || v.word === '良い') {
        negative = 'よくない';
        past = 'よかった';
      }
      chunk.adjectiveGroups.iAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: negative,
        past: past
      });
    } else if (v.category === 'na_adjectives') {
      chunk.adjectiveGroups.naAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: `${v.word}ではない`,
        past: `${v.word}でした`
      });
    }
  });
}

processChunk(clinicalChunk);
processChunk(nativeChunk);

// Write to files
console.log("Writing data_clinical.js...");
const clinicalContent = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["臨床"] = ${JSON.stringify(clinicalChunk, null, 2)};`;
fs.writeFileSync(path.join(projectDir, 'data_clinical.js'), clinicalContent, 'utf8');

console.log("Writing data_native.js...");
const nativeContent = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["母語者"] = ${JSON.stringify(nativeChunk, null, 2)};`;
fs.writeFileSync(path.join(projectDir, 'data_native.js'), nativeContent, 'utf8');

console.log(`Success! Wrote data_clinical.js (${clinicalVocab.length} words) and data_native.js (${nativeVocab.length} words).`);
