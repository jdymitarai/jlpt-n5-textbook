const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

// 1. Define word overrides
const wordOverrides = {
  // Word -> target category and optional meaning
  'はい': { category: 'greetings', meaning: '是 / 對的' },
  'インク': { category: 'daily_tools' },
  'デパート': { category: 'places_buildings' },
  '携帯': { category: 'daily_tools' },
  '携帯電話': { category: 'daily_tools' },
  '電話': { category: 'daily_tools' },
  '布団': { category: 'daily_furniture' },
  'くだもの': { category: 'food_ingredients' },
  '果物': { category: 'food_ingredients' },
  'ぎゅうにゅう': { category: 'food_drinks_alcohol' },
  '牛乳': { category: 'food_drinks_alcohol' },
  'とても': { category: 'adverbs_conjunctions' },
  'すこし': { category: 'adverbs_conjunctions' },
  '少し': { category: 'adverbs_conjunctions' },
  'あまり': { category: 'adverbs_conjunctions' },
  'ぜんぜん': { category: 'adverbs_conjunctions' },
  '全然': { category: 'adverbs_conjunctions' },
  'やはり': { category: 'adverbs_conjunctions' },
  'やっぱり': { category: 'adverbs_conjunctions' },
  '一生懸命': { category: 'adverbs_conjunctions' },
  'しかる': { category: 'action_verbs' },
  '最近': { category: 'adverbs_conjunctions' },
  '都': { category: 'places_buildings' },
  'ソフト': { category: 'science_tech' },
  '看護婦': { category: 'work_business' },
  '市民': { category: 'society_economy' },
  '公務員': { category: 'work_business' },
  '釣る': { category: 'action_verbs' },
  'プレゼント': { category: 'other_nouns' },
  '首': { category: 'anatomy_external' },
  '丁寧': { category: 'na_adjectives' },
  'だが': { category: 'adverbs_conjunctions' },
  '通学': { category: 'other_nouns' },
  '受ける': { category: 'action_verbs' },
  '辞める': { category: 'action_verbs' },
  '引退': { category: 'work_business' },
  '新聞社': { category: 'places_buildings' },
  '商賣': { category: 'work_business' },
  '商売': { category: 'work_business' },
  '航空社': { category: 'places_buildings' },
  '会社': { category: 'work_business' },
  '仕事': { category: 'work_business' },
  '交通': { category: 'transportation' },
  '乗り換える': { category: 'movement_verbs' },
  '便': { category: 'other_nouns' },
  '効く': { category: 'state_verbs' },
  '全国': { category: 'places_buildings' },
  '縱': { category: 'other_nouns' },
  '縦': { category: 'other_nouns' },
  '束': { category: 'other_nouns' },
  '訪問': { category: 'other_nouns' },
  '地平線': { category: 'nature_animals' },
  '實施': { category: 'work_business' },
  '実施': { category: 'work_business' },
  '發表': { category: 'work_business' },
  '発表': { category: 'work_business' },
  '信號': { category: 'transportation' },
  '信号': { category: 'transportation' },
  '暮らし': { category: 'other_nouns' },
  '不幸': { category: 'other_nouns' },
  '教師': { category: 'work_business' },
  '醫師': { category: 'work_business' },
  '医師': { category: 'work_business' },
  '患者': { category: 'other_nouns' },
  '宅': { category: 'places_buildings' },
  '連れ': { category: 'other_nouns' },
  '小麥': { category: 'food_ingredients' },
  '小麦': { category: 'food_ingredients' },
  'ピクニック': { category: 'leisure_sports' },
  '缶': { category: 'daily_tools' },
  '歡迎': { category: 'other_nouns' },
  '歡迎する': { category: 'action_verbs' },
  '歓迎': { category: 'other_nouns' },
  '喜び': { category: 'mental_emotion' },
  '幸運': { category: 'other_nouns' },
  'お見舞い': { category: 'other_nouns' },
  '見物': { category: 'leisure_sports' },
  '踊り': { category: 'leisure_sports' },
  'デート': { category: 'leisure_sports' },
  '玩具': { category: 'leisure_sports' },
  'おもちゃ': { category: 'leisure_sports' },
  '漫畫': { category: 'leisure_sports' },
  '漫画': { category: 'leisure_sports' },
  '小說': { category: 'leisure_sports' },
  '小説': { category: 'leisure_sports' },
  '讀書': { category: 'leisure_sports' },
  '読書': { category: 'leisure_sports' },
  '電影': { category: 'leisure_sports' },
  '映画': { category: 'leisure_sports' },
  '散步': { category: 'leisure_sports' },
  '散歩': { category: 'leisure_sports' },
  '相機': { category: 'leisure_sports' },
  'カメラ': { category: 'leisure_sports' },
  '照片': { category: 'leisure_sports' },
  '寫真': { category: 'leisure_sports' },
  '写真': { category: 'leisure_sports' },
  '鋼琴': { category: 'leisure_sports' },
  'ピアノ': { category: 'leisure_sports' },
  '吉他': { category: 'leisure_sports' },
  'ギター': { category: 'leisure_sports' },
  '游泳池': { category: 'leisure_sports' },
  'プール': { category: 'leisure_sports' },
  'お祝い': { category: 'other_nouns' },
  'お盆': { category: 'numbers_time' },
  '七五三': { category: 'numbers_time' },
  '還暦': { category: 'numbers_time' },
  '成人式': { category: 'leisure_sports' },
  '初詣': { category: 'leisure_sports' },
  '鳥居': { category: 'places_buildings' },
  '居酒屋': { category: 'places_buildings' },
  '手機': { category: 'daily_tools' },
  'スマホ': { category: 'daily_tools' },
  '應用程式': { category: 'science_tech' },
  'アプリ': { category: 'science_tech' },
  '插座': { category: 'daily_tools' },
  'コンセント': { category: 'daily_tools' },
  '塑膠袋': { category: 'daily_tools' },
  'レジ袋': { category: 'daily_tools' },
  '吹風機': { category: 'daily_tools' },
  'ドライヤー': { category: 'daily_tools' },
  '指甲剪': { category: 'daily_tools' },
  '爪切り': { category: 'daily_tools' },
  '牙刷': { category: 'daily_items' },
  '歯ブラシ': { category: 'daily_items' },
  '微波爐': { category: 'daily_furniture' },
  '電子レンジ': { category: 'daily_furniture' },
  '冰箱': { category: 'daily_furniture' },
  '冷蔵庫': { category: 'daily_furniture' }
};

// Conjugation helpers
const g1RuExceptions = [
  "帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる"
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

  if (word === "来る" || word === "くる") {
    return {
      group: "第三類動詞 (不規則)",
      dictionary: "来る (くる)",
      masu: "来ます (きます)",
      te: "来て (きて)",
      nai: "来ない (こない)",
      ta: "来た (きた)"
    };
  }

  if (word.endsWith("る")) {
    const charBeforeRu = furigana.charAt(furigana.length - 2);
    const isIRuOrERu = iColumn.includes(charBeforeRu) || eColumn.includes(charBeforeRu);
    const isGroup1Ru = g1RuExceptions.includes(word) || 
                       g1RuExceptions.includes(furigana) ||
                       meaning.includes("回家") || 
                       meaning.includes("跑步") || 
                       meaning.includes("進入") || 
                       meaning.includes("知道") || 
                       meaning.includes("切") || 
                       meaning.includes("需要") ||
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

  if (word === "行く" || word === "いく") {
    return {
      group: "第一類動詞 (五段)",
      dictionary: "行く (いく)",
      masu: "行きます (いきます)",
      te: "行って (いって)",
      nai: "行かない (いかない)",
      ta: "行った (いった)"
    };
  }

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

// Classifier function
function getCorrectCategory(word, furigana, meaning, originalCategory, level) {
  // Clean spelling
  const w = word.trim();
  const f = furigana.trim();
  const m = meaning.trim();

  // 1. Check override map first
  if (wordOverrides[w]) {
    return wordOverrides[w].category;
  }
  if (wordOverrides[f]) {
    return wordOverrides[f].category;
  }

  // 2. Check for verbs
  const isVerbEnding = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(w.slice(-1)) || w.endsWith('する') || f.endsWith('する');
  const verbKeywords = ["吃", "喝", "說", "講", "聽", "看", "讀", "寫", "學", "教", "買", "賣", "走", "跑", "游", "飛",
                        "做", "幹", "進行", "實行", "實施", "使", "讓", "去", "來", "回", "進入", "離開", "洗", "打",
                        "結束", "完成", "修復", "協助", "折斷", "折疊", "丟掉", "丟棄", "改變", "生氣", "掛", "取得",
                        "提供", "安裝", "顫抖", "剪", "拜訪", "詢問", "洗澡", "曬太陽", "轉動", "旋轉", "放棄", "缺乏",
                        "反對", "指", "捆綁", "預存", "退", "出", "入", "起", "落", "乘", "搭"];
  
  const isVerbMeaning = verbKeywords.some(kw => m.includes(kw));
  const isVerb = isVerbEnding && isVerbMeaning;

  if (isVerb) {
    // movement verbs
    if (m.includes("去") || m.includes("來") || m.includes("回") || m.includes("走") || m.includes("跑") || m.includes("進") || m.includes("出") || m.includes("移") || m.includes("轉") || m.includes("渡") || m.includes("登") || m.includes("下") || m.includes("飛") || m.includes("越") || m.includes("逃") || m.includes("奔") || m.includes("步") || m.includes("乘") || m.includes("搭") || w.includes("行く") || w.includes("くる") || w.includes("帰る") || w.includes("戻る") || w.includes("走る") || w.includes("歩く") || w.includes("逃げる")) {
      return 'movement_verbs';
    }
    // state verbs
    if (m.includes("有") || m.includes("存在") || m.includes("在於") || m.includes("懂得") || m.includes("理解") || m.includes("明白") || m.includes("知道") || m.includes("認識") || m.includes("屬於") || m.includes("擁有") || m.includes("包含") || w.includes("ある") || w.includes("いる") || w.includes("知る") || w.includes("分かる") || w.includes("要る") || w.includes("居る")) {
      return 'state_verbs';
    }
    return 'action_verbs';
  }

  // 3. Check adjectives
  const isIAdj = w.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(w);
  if (isIAdj && (originalCategory === 'i_adjectives' || m.includes('的') || m.includes('之'))) {
    return 'i_adjectives';
  }
  if (originalCategory === 'na_adjectives' || (originalCategory === 'i_adjectives' && !isIAdj)) {
    return 'na_adjectives';
  }

  // 4. Clinical/Nursing Level specific categories (preserve as much as possible)
  if (level === '臨床') {
    if (originalCategory && (originalCategory.startsWith('nursing_') || originalCategory.startsWith('medical_') || originalCategory.startsWith('anatomy_'))) {
      return originalCategory;
    }
  }

  // 5. Categorize nouns by keywords
  // anatomy external
  if (m.includes("身體") || m.includes("皮膚") || m.includes("肌肉") || m.includes("頭髮") || m.includes("臉") || m.includes("眼睛") || m.includes("耳朵") || m.includes("鼻子") || m.includes("嘴巴") || m.includes("牙齒") || m.includes("脖子") || m.includes("喉嚨") || m.includes("肩膀") || m.includes("胸") || m.includes("肚子") || m.includes("腹部") || m.includes("腰") || m.includes("手") || m.includes("手指") || m.includes("腳") || m.includes("膝蓋") || m.includes("臀部") || m.includes("關節")) {
    return 'anatomy_external';
  }

  // anatomy internal
  if (m.includes("心臟") || m.includes("胃") || m.includes("肺") || m.includes("腎") || m.includes("血管") || m.includes("神經") || m.includes("大腦") || m.includes("骨骼") || m.includes("血液") || m.includes("血")) {
    return 'anatomy_internal';
  }

  // medical illness
  if (m.includes("疾病") || m.includes("感冒") || m.includes("肺炎") || m.includes("糖尿病") || m.includes("高血壓") || m.includes("低血壓") || m.includes("中風") || m.includes("骨折") || m.includes("蛀牙") || m.includes("受傷") || m.includes("癌症") || m.includes("發炎") || m.includes("失眠")) {
    return 'medical_illness';
  }

  // medical symptom
  if (m.includes("發燒") || m.includes("發熱") || m.includes("咳嗽") || m.includes("喘鳴") || m.includes("血尿") || m.includes("呼吸困難") || m.includes("水腫") || m.includes("浮腫") || m.includes("疼痛") || m.includes("頭痛") || m.includes("腹痛") || m.includes("腰痛") || m.includes("噁心") || m.includes("嘔吐") || m.includes("暈眩") || m.includes("眩暈") || m.includes("麻木") || m.includes("搔癢") || m.includes("流鼻血") || m.includes("血壓")) {
    return 'medical_symptom';
  }

  // medical facility tool
  if (m.includes("醫院") || m.includes("診所") || m.includes("藥物") || m.includes("藥") || m.includes("聽診器") || m.includes("血壓計") || m.includes("體溫計") || m.includes("輪椅") || m.includes("助行器") || m.includes("擔架") || m.includes("繃帶") || m.includes("紗布") || m.includes("針筒") || m.includes("針頭") || m.includes("病房")) {
    return 'medical_facility_tool';
  }

  // food drinks alcohol
  if (m.includes("酒") || m.includes("啤酒") || m.includes("紅酒") || m.includes("白酒") || m.includes("威士忌") || m.includes("雞尾酒") || m.includes("清酒") || m.includes("水") || m.includes("茶") || m.includes("咖啡") || m.includes("果汁") || m.includes("汽水") || m.includes("飲料") || m.includes("可樂") || m.includes("牛奶")) {
    return 'food_drinks_alcohol';
  }

  // food staple dishes
  if (m.includes("飯") || m.includes("麵") || m.includes("拉麵") || m.includes("壽司") || m.includes("便當") || m.includes("麵包") || m.includes("蛋糕") || m.includes("點心") || m.includes("零食") || m.includes("大阪燒") || m.includes("章魚燒") || m.includes("天婦羅") || m.includes("生魚片") || m.includes("餃子") || m.includes("烤肉") || m.includes("漢堡") || m.includes("吐司") || m.includes("粥") || m.includes("蓋飯") || m.includes("湯") || m.includes("味噌湯")) {
    return 'food_staple_dishes';
  }

  // food ingredients
  if (m.includes("肉") || m.includes("牛肉") || m.includes("豬肉") || m.includes("雞肉") || m.includes("魚") || m.includes("海鮮") || m.includes("蔬菜") || m.includes("水果") || m.includes("蛋") || m.includes("砂糖") || m.includes("鹽") || m.includes("醬油") || m.includes("油") || m.includes("奶油") || m.includes("起司") || m.includes("麵粉") || m.includes("米") || m.includes("麥") || m.includes("薑") || m.includes("蒜") || m.includes("洋蔥") || m.includes("胡蘿蔔") || m.includes("蘿蔔") || m.includes("高麗菜") || m.includes("萵苣") || m.includes("昆布") || m.includes("海帶")) {
    return 'food_ingredients';
  }

  // clothing
  if (m.includes("衣服") || m.includes("服裝") || m.includes("衣") || m.includes("鞋") || m.includes("帽") || m.includes("襪") || m.includes("褲") || m.includes("裙") || m.includes("外套") || m.includes("大衣") || m.includes("毛衣") || m.includes("襯衫") || m.includes("領帶") || m.includes("手套") || m.includes("戒指") || m.includes("項鍊") || m.includes("耳環") || m.includes("圍巾") || m.includes("絲巾") || m.includes("泳衣") || m.includes("西裝") || m.includes("和服") || m.includes("浴衣") || m.includes("皮包") || m.includes("包包") || m.includes("手提袋") || m.includes("皮夾")) {
    return 'clothing';
  }

  // transportation
  if (m.includes("車") || m.includes("火車") || m.includes("地鐵") || m.includes("飛機") || m.includes("船") || m.includes("單車") || m.includes("腳踏車") || m.includes("計程車") || m.includes("公車") || m.includes("巴士") || m.includes("直升機") || m.includes("摩托車") || m.includes("卡車") || m.includes("客輪") || m.includes("航線") || m.includes("軌道") || m.includes("鐵軌") || m.includes("車票") || m.includes("乘車券") || m.includes("輪胎")) {
    return 'transportation';
  }

  // places buildings
  if (m.includes("場所") || m.includes("建築") || m.includes("大樓") || m.includes("大廈") || m.includes("商店") || m.includes("店") || m.includes("公司") || m.includes("車站") || m.includes("房間") || m.includes("教室") || m.includes("學校") || m.includes("醫院") || m.includes("圖書館") || m.includes("博物館") || m.includes("公園") || m.includes("工廠") || m.includes("東") || m.includes("西") || m.includes("南") || m.includes("北") || m.includes("上") || m.includes("下") || m.includes("左") || m.includes("右") || m.includes("中") || m.includes("外") || m.includes("裡") || m.includes("內") || m.includes("角落") || m.includes("世界") || m.includes("港口") || m.includes("城市") || m.includes("鄉村") || m.includes("寺") || m.includes("神社") || m.includes("鳥居") || m.includes("路口") || m.includes("橋") || m.includes("街道") || m.includes("地區") || m.includes("領域")) {
    return 'places_buildings';
  }

  // env disaster
  if (m.includes("環境") || m.includes("災害") || m.includes("地震") || m.includes("颱風") || m.includes("火災") || m.includes("污染") || m.includes("氣候") || m.includes("天氣") || m.includes("垃圾") || m.includes("事故")) {
    return 'env_disaster';
  }

  // nature animals
  if (m.includes("自然") || m.includes("景觀") || m.includes("山") || m.includes("海") || m.includes("池") || m.includes("雨") || m.includes("雪") || m.includes("狗") || m.includes("貓") || m.includes("鳥") || m.includes("牛") || m.includes("馬") || m.includes("豬") || m.includes("羊") || m.includes("昆蟲") || m.includes("植物") || m.includes("動物") || m.includes("生態") || m.includes("森林") || m.includes("沙") || m.includes("斜坡") || m.includes("湖") || m.includes("島") || m.includes("太陽") || m.includes("月亮") || m.includes("星星") || m.includes("天空") || m.includes("雲") || m.includes("風") || m.includes("樹") || m.includes("木") || m.includes("草") || m.includes("花") || m.includes("櫻花") || m.includes("地平線")) {
    return 'nature_animals';
  }

  // school education
  if (m.includes("學習") || m.includes("教育") || m.includes("課堂") || m.includes("課程") || m.includes("作業") || m.includes("功課") || m.includes("考試") || m.includes("測驗") || m.includes("畢業") || m.includes("入學") || m.includes("教科書") || m.includes("課本") || m.includes("學科") || m.includes("科目") || m.includes("直尺") || m.includes("筆記本") || m.includes("黑板")) {
    return 'school_education';
  }

  // society economy
  if (m.includes("社會") || m.includes("經濟") || m.includes("政治") || m.includes("法律") || m.includes("規則") || m.includes("人口") || m.includes("戰爭") || m.includes("和平") || m.includes("價格") || m.includes("費用") || m.includes("金錢") || m.includes("錢") || m.includes("軍隊") || m.includes("武器") || m.includes("貿易") || m.includes("金融") || m.includes("投資") || m.includes("稅") || m.includes("保險") || m.includes("市民") || m.includes("國民")) {
    return 'society_economy';
  }

  // work business
  if (m.includes("工作") || m.includes("職業") || m.includes("上班") || m.includes("出差") || m.includes("加班") || m.includes("薪水") || m.includes("會議") || m.includes("總經理") || m.includes("經理") || m.includes("職務") || m.includes("退休")) {
    return 'work_business';
  }

  // science tech
  if (m.includes("科學") || m.includes("科技") || m.includes("技術") || m.includes("研究") || m.includes("發明") || m.includes("調查") || m.includes("分析") || m.includes("電腦") || m.includes("硬體") || m.includes("軟體") || m.includes("網路") || m.includes("網際網路")) {
    return 'science_tech';
  }

  // arts culture
  if (m.includes("文學") || m.includes("歷史") || m.includes("藝術") || m.includes("宗教") || m.includes("信仰") || m.includes("民俗") || m.includes("習慣") || m.includes("故事") || m.includes("傳說") || m.includes("詩") || m.includes("圖案") || m.includes("設計") || m.includes("神話")) {
    return 'arts_culture';
  }

  // leisure sports
  if (m.includes("休閒") || m.includes("運動") || m.includes("娛樂") || m.includes("遊戲") || m.includes("玩具") || m.includes("相機") || m.includes("照片") || m.includes("電影") || m.includes("音樂") || m.includes("吉他") || m.includes("散步") || m.includes("旅行") || m.includes("約會") || m.includes("唱歌") || m.includes("玩耍") || m.includes("節日") || m.includes("慶典")) {
    return 'leisure_sports';
  }

  // greetings
  if (m.includes("你好") || m.includes("早安") || m.includes("晚安") || m.includes("再見") || m.includes("謝謝") || m.includes("對不起") || m.includes("不好意思") || m.includes("請問") || m.includes("初次見面") || m.includes("請多指教") || m.includes("拜託") || m.includes("是的") || m.includes("不是") || m.includes("沒關係") || m.includes("我知道了") || m.includes("打擾了") || m.includes("我吃飽了") || m.includes("我回來了") || m.includes("慢走") || m.includes("歡迎")) {
    return 'greetings';
  }

  // numbers time
  if (m.includes("分") || m.includes("秒") || m.includes("小時") || m.includes("時間") || m.includes("每天") || m.includes("星期") || m.includes("月") || m.includes("年") || m.includes("日") || m.includes("點") || m.includes("刻") || m.includes("期") || m.includes("週") || m.includes("曆") || m.includes("季節") || m.includes("時段") || m.includes("早上") || m.includes("晚上") || m.includes("中午") || m.includes("昨日") || m.includes("今日") || m.includes("明日") || m.includes("現在") || m.includes("以前") || m.includes("以後") || m.includes("最近") || m.includes("未來") || m.includes("過去") || m.includes("數字") || m.includes("百") || m.includes("千") || m.includes("萬") || m.includes("億") || m.includes("個") || m.includes("張") || m.includes("台") || m.includes("隻") || m.includes("回") || m.includes("度") || m.includes("倍") || m.includes("半") || m.includes("順序") || m.includes("第一") || m.includes("最後") || m.includes("量詞") || m.includes("數值")) {
    return 'numbers_time';
  }

  // daily furniture
  if (m.includes("家具") || m.includes("床") || m.includes("桌") || m.includes("椅") || m.includes("櫃") || m.includes("沙發") || m.includes("鏡子") || m.includes("冰箱") || m.includes("洗衣機") || m.includes("空調") || m.includes("冷氣") || m.includes("電視") || m.includes("吸塵器") || m.includes("電風扇") || m.includes("暖房") || m.includes("檯燈") || m.includes("微波爐") || m.includes("電鍋") || m.includes("馬桶")) {
    return 'daily_furniture';
  }

  // daily tools
  if (m.includes("傘") || m.includes("鑰匙") || m.includes("錢包") || m.includes("橡皮擦") || m.includes("筆") || m.includes("鉛筆") || m.includes("原子筆") || m.includes("鋼筆") || m.includes("手帳") || m.includes("日曆") || m.includes("杯") || m.includes("盤") || m.includes("碗") || m.includes("碟") || m.includes("鍋") || m.includes("刀") || m.includes("叉") || m.includes("勺") || m.includes("剪刀") || m.includes("針") || m.includes("釘") || m.includes("繩") || m.includes("袋") || m.includes("罐") || m.includes("瓶") || m.includes("打火機") || m.includes("手錶") || m.includes("電腦") || m.includes("手機") || m.includes("電話") || m.includes("電燈") || m.includes("電線") || m.includes("插座")) {
    return 'daily_tools';
  }

  // daily items
  if (m.includes("肥皂") || m.includes("洗面乳") || m.includes("洗髮") || m.includes("沐浴") || m.includes("牙刷") || m.includes("牙膏") || m.includes("衛生紙") || m.includes("面紙") || m.includes("毛巾") || m.includes("浴巾") || m.includes("梳") || m.includes("化妝") || m.includes("保養") || m.includes("指甲剪") || m.includes("垃圾") || m.includes("垃圾桶")) {
    return 'daily_items';
  }

  if (originalCategory) return originalCategory;
  return 'other_nouns';
}

// 6. Run level reclassification
levels.forEach(lvl => {
  const filePath = path.join(publicDir, `data_${lvl}.js`);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${lvl}: file not found`);
    return;
  }

  console.log(`\nProcessing Level: ${lvl}...`);
  const content = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  
  try {
    vm.runInContext(content, context);
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const chunk = context.window.JLPT_DATA_CHUNKS[key];
    if (!chunk || !chunk.vocabulary) {
      console.log(`No vocabulary array in ${lvl}`);
      return;
    }

    const updatedVocab = [];
    let changeCount = 0;

    chunk.vocabulary.forEach(v => {
      const origCat = v.category;
      let targetCat = getCorrectCategory(v.word, v.furigana, v.meaning, origCat, key);

      // Handle override meanings (e.g. Yes/Correct for はい)
      let targetMeaning = v.meaning;
      if (wordOverrides[v.word.trim()] && wordOverrides[v.word.trim()].meaning) {
        targetMeaning = wordOverrides[v.word.trim()].meaning;
      } else if (wordOverrides[v.furigana.trim()] && wordOverrides[v.furigana.trim()].meaning) {
        targetMeaning = wordOverrides[v.furigana.trim()].meaning;
      }

      const newEntry = { ...v, category: targetCat, meaning: targetMeaning };

      // Verb conjugation sync
      if (targetCat.endsWith('_verbs')) {
        if (!newEntry.conjugations) {
          newEntry.conjugations = conjugateVerb(v.word, v.furigana, targetMeaning);
        }
      } else {
        // Strip conjugations if no longer verb
        if (newEntry.conjugations) {
          delete newEntry.conjugations;
        }
      }

      if (origCat !== targetCat || v.meaning !== targetMeaning) {
        console.log(`  - ${v.word} (${v.furigana}): category ${origCat} -> ${targetCat}, meaning: "${v.meaning}" -> "${targetMeaning}"`);
        changeCount++;
      }

      updatedVocab.push(newEntry);
    });

    console.log(`Reclassified ${changeCount} words in Level ${key}.`);

    // Rebuild verbConjugations and adjectiveGroups for this level
    const newVerbConjugations = [];
    const newAdjectiveGroups = { iAdjectives: [], naAdjectives: [] };

    updatedVocab.forEach(v => {
      if (v.category.endsWith('_verbs') && v.conjugations) {
        newVerbConjugations.push({
          dictionary: v.conjugations.dictionary,
          masu: v.conjugations.masu,
          te: v.conjugations.te,
          nai: v.conjugations.nai,
          meaning: v.meaning,
          group: v.conjugations.group
        });
      } else if (v.category === 'i_adjectives') {
        let rootK = v.word.endsWith('い') ? v.word.slice(0, -1) : v.word;
        let rootF = v.furigana.endsWith('い') ? v.furigana.slice(0, -1) : v.furigana;
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
      } else if (v.category === 'na_adjectives') {
        newAdjectiveGroups.naAdjectives.push({
          word: `${v.word} (${v.furigana})`,
          meaning: v.meaning,
          negative: `${v.word}ではない`,
          past: `${v.word}でした`
        });
      }
    });

    const updatedChunk = {
      ...chunk,
      vocabulary: updatedVocab,
      verbConjugations: newVerbConjugations,
      adjectiveGroups: newAdjectiveGroups
    };

    // Save to root and public
    const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${key}"] = ${JSON.stringify(updatedChunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${key}"]; }`;
    
    fs.writeFileSync(path.join(projectDir, `data_${lvl}.js`), outputString, 'utf8');
    fs.writeFileSync(path.join(publicDir, `data_${lvl}.js`), outputString, 'utf8');
    console.log(`Saved Level ${key} to root and public.`);

  } catch (e) {
    console.error(`Error processing Level ${lvl}:`, e);
  }
});

console.log("\nReclassification and file generation completed!");
