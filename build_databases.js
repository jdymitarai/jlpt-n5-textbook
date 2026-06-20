const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Paths
const currentDir = __dirname;
const n5DataPath = path.join(currentDir, 'data.js');

console.log("Starting JLPT Database Builder...");

// 1. Load N5 data from existing data.js
let n5Content = fs.readFileSync(n5DataPath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(n5Content, context);
const n5Data = context.window.JLPT_DATA || context.JLPT_DATA;

// Save data_n5.js with JLPT_DATA_N5 global variable
const n5Output = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(n5Data, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
fs.writeFileSync(path.join(currentDir, 'data_n5.js'), n5Output, 'utf8');
console.log("Successfully generated data_n5.js!");

// Common reference data shared across all levels
const kanaData = n5Data.kana;
const counterTablesData = n5Data.counterTables;
const demonstrativesData = n5Data.demonstratives;

// Helper function to translate in batches
async function translateBatch(meanings) {
  const text = meanings.join('\n');
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q=${encodeURIComponent(text)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const rawTranslation = data[0].map(x => x[0]).join('');
    const parts = rawTranslation.split('\n').map(s => s.trim());
    if (parts.length !== meanings.length) {
      console.warn(`Translation batch size mismatch: input ${meanings.length}, output ${parts.length}. Retrying individually...`);
      return null; // Trigger fallback
    }
    return parts;
  } catch (e) {
    console.error("Translation batch failed", e);
    return null;
  }
}

// Fallback individual translation
async function translateWord(meaning) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q=${encodeURIComponent(meaning)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data[0][0][0].trim();
  } catch (e) {
    return meaning; // Keep English as fallback
  }
}

// Verb Conjugation Subroutine
const g1RuExceptions = [
  "帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる"
];
const iColumn = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "び", "ぎ", "じ", "ぴ"];
const eColumn = ["え", "け", "せ", "て", "ね", "へ", "め", "れ", "べ", "げ", "ぜ", "ぺ"];

function conjugateVerb(word, furigana, meaning) {
  word = word.trim();
  furigana = furigana.trim();

  // Third class irregular verbs ending in する
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

  // 来る / くる
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

  // Verbs ending in る
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

  // Other Group 1 endings
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
const adverbsAndConjunctionsList = [
  'とても', 'たいへん', '大変', 'すこし', '少し', 'ちょっと', 'ゆっくり', 'すぐ', 'すぐに', 
  'だんだん', 'たくさん', 'あまり', 'ぜんぜん', '全然', 'いつも', 'たいてい', 'ときどき', 
  '時々', 'よく', 'もう', 'まだ', 'ちょうど', 'いかが', 'どう', 'いっしょに', '一緒に', 
  '別々に', 'べつべつに', 'まっすぐ', '初めて', 'はじめて', 'やはり', 'やっぱり', 'たぶん', 
  '多分', 'もう一度', 'もっと', 'さっき', '然而', '但是', '所以', '以及', '接著'
];

function isIAdjective(word, furigana, meaningEn) {
  if (!word.endsWith('い') || !furigana.endsWith('い')) return false;
  
  const nounKeywords = [
    'regret', 'punishment', 'errand', 'misunderstanding', 'celebration', 'meeting', 'worship',
    'system', 'fortune', 'material', 'tariff', 'judgement', 'premise', 'livelihood', 'income',
    'payment', 'host', 'treatment', 'help', 'use', 'work', 'play', 'difference', 'encounter',
    'association', 'consideration', 'penal', 'pact', 'agreement', 'theme',
    'scenery', 'setting', 'illumination', 'gargle', 'mouth', 'appointment', 'nomination',
    'ruling', 'verdict', 'court', 'family', 'household', 'deadlock', 'prerequisite',
    'organ', 'society', 'circumstance', 'background', 'substance',
    'form', 'pupil', 'student', 'italy', 'ordinal', 'encouragement', 'promotion',
    'management', 'operation', 'economy', 'finance', 'cultivation'
  ];
  
  const m = meaningEn.toLowerCase();
  if (m.includes('adjective') || m.includes('adj.')) return true;
  if (nounKeywords.some(kw => m.includes(kw))) return false;
  return true;
}

function classifyWord(word, furigana, meaningCn, meaningEn) {
  const mEn = (meaningEn || "").toLowerCase().trim();
  const mCn = (meaningCn || "").trim();
  
  // 1. Greetings / Exclamations
  const greetingKeywordsEn = ['hello', 'goodbye', 'sorry', 'thank', 'greeting', 'welcome', 'congratulation'];
  const greetingKeywordsCn = ['你好', '謝謝', '對不起', '拜託', '恭喜', '歡迎'];
  if (greetingKeywordsEn.some(kw => mEn.includes(kw)) || greetingKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'greetings';
  }

  // 2. Verbs
  const isVerb = mEn.startsWith('to ') || 
                 mEn.includes(' verb') || 
                 word.endsWith('する') || 
                 furigana.endsWith('する');
                 
  if (isVerb) {
    const mvEn = ['go', 'come', 'return', 'run', 'walk', 'climb', 'leave', 'enter', 'ride', 'sit', 'arrive', 'travel'];
    const mvCn = ['去', '來', '回', '走', '爬', '登', '出', '入', '進', '乘', '坐', '到', '旅'];
    if (mvEn.some(kw => mEn.includes(kw)) || mvCn.some(kw => mCn.includes(kw))) {
      return 'movement_verbs';
    }
    const svEn = ['have', 'exist', 'understand', 'know', 'think', 'need', 'want', 'require', 'resemble', 'differ'];
    const svCn = ['有', '在', '懂', '理解', '知道', '想', '需要', '要', '像', '異'];
    if (svEn.some(kw => mEn.includes(kw)) || svCn.some(kw => mCn.includes(kw))) {
      return 'state_verbs';
    }
    return 'action_verbs';
  }

  // 3. Adjectives
  if (isIAdjective(word, furigana, mEn)) {
    return 'i_adjectives';
  }
  
  const isNaAdj = mEn.includes('adjective') || 
                  mEn.includes('adj.') || 
                  mEn.includes('adjectival') ||
                  mEn.includes('na-adj') ||
                  mEn.startsWith('convenient') || mEn.startsWith('famous') || mEn.startsWith('important') ||
                  mEn.startsWith('necessary') || mEn.startsWith('quiet') || mEn.startsWith('healthy') ||
                  mEn.startsWith('simple') || mEn.startsWith('complex') || mEn.startsWith('skilful') ||
                  mEn.startsWith('polite') || mEn.startsWith('kind ') || mEn.startsWith('cruel');
  if (isNaAdj) {
    return 'na_adjectives';
  }

  // 4. Adverbs & Conjunctions
  const advConjKeywordsEn = ['adverb', 'conjunction', 'meanwhile', 'therefore', 'however', 'although', 'besides', 'furthermore', 'suddenly', 'immediately', 'slowly', 'quickly', 'extremely', 'very', 'quite', 'rather'];
  const advConjKeywordsCn = ['然而', '但是', '所以', '以及', '接著', '突然', '立刻', '馬上', '慢慢', '非常', '特別地', '很'];
  if (advConjKeywordsEn.some(kw => mEn.includes(kw)) || advConjKeywordsCn.some(kw => mCn.includes(kw)) || 
      adverbsAndConjunctionsList.includes(word) || adverbsAndConjunctionsList.includes(furigana)) {
    return 'adverbs_conjunctions';
  }

  // 5. Nouns (Semantic Categories)
  const foodKeywordsEn = ['eat', 'drink', 'food', 'meat', 'fish', 'vegetable', 'water', 'tea', 'coffee', 'wine', 'rice', 'fruit', 'bread', 'milk', 'egg', 'sugar', 'salt', 'sauce', 'soup', 'meal'];
  const foodKeywordsCn = ['吃', '喝', '肉', '魚', '菜', '茶', '水', '咖啡', '酒', '麵包', '牛奶', '蛋', '飯', '水果', '蔬菜', '糖', '鹽', '醬', '湯', '餐'];
  if (foodKeywordsEn.some(kw => mEn.includes(kw)) || foodKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'food_drinks';
  }

  const peopleKeywordsEn = ['person', 'people', 'man', 'woman', 'child', 'boy', 'girl', 'father', 'mother', 'brother', 'sister', 'son', 'daughter', 'friend', 'student', 'teacher', 'doctor', 'nurse', 'baby', 'uncle', 'aunt', 'grand'];
  const peopleKeywordsCn = ['爸爸', '媽媽', '父親', '母親', '哥哥', '姐姐', '弟弟', '妹妹', '祖父', '祖母', '爺爺', '奶奶', '叔叔', '阿姨', '兒子', '女兒', '朋友', '學生', '老師', '醫生', '護士', '嬰兒', '小孩', '兒童', '夫婦', '叔叔', '伯伯', '舅舅', '阿姨', '姑姑', '嬸嬸'];
  if (peopleKeywordsEn.some(kw => mEn.includes(kw)) || peopleKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'family_people';
  }

  const bodyKeywordsEn = ['hand', 'foot', 'leg', 'eye', 'ear', 'mouth', 'nose', 'head', 'body', 'arm', 'finger', 'tooth', 'hair', 'face', 'neck', 'shoulder', 'chest', 'stomach', 'heart', 'bone', 'skin'];
  const bodyKeywordsCn = ['手', '足', '腳', '眼', '耳', '口', '鼻', '頭', '身', '牙', '齒', '喉', '舌', '指', '髮', '臉', '面', '頸', '首', '肩', '胸', '胃', '骨', '肌', '皮'];
  if (bodyKeywordsEn.some(kw => mEn.includes(kw)) || bodyKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'body_parts';
  }

  const clothKeywordsEn = ['clothes', 'shirt', 'shoes', 'hat', 'socks', 'pants', 'skirt', 'bag', 'glasses', 'coat', 'suit', 'wear', 'dress', 'glove', 'pocket'];
  const clothKeywordsCn = ['衣服', '大衣', '外套', '襯衫', '鞋', '帽', '襪', '褲', '裙', '眼鏡', '手套', '皮包', '服飾', '西裝', '口袋'];
  if (clothKeywordsEn.some(kw => mEn.includes(kw)) || clothKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'clothing';
  }

  const transKeywordsEn = ['car', 'bus', 'train', 'plane', 'ship', 'bicycle', 'station', 'airport', 'vehicle', 'ticket', 'passenger'];
  const transKeywordsCn = ['車', '巴士', '電車', '捷運', '鐵路', '飛機', '船', '腳踏車', '自行車', '計程車', '車站', '機場', '車票', '乘客'];
  if (transKeywordsEn.some(kw => mEn.includes(kw)) || transKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'transportation';
  }

  const natureKeywordsEn = ['flower', 'tree', 'dog', 'cat', 'bird', 'animal', 'weather', 'rain', 'snow', 'wind', 'cloud', 'sky', 'mountain', 'sea', 'river', 'lake', 'earth', 'sun', 'moon', 'star', 'plant', 'nature'];
  const natureKeywordsCn = ['花', '草', '木', '狗', '貓', '鳥', '山', '川', '河', '海', '天', '雨', '雪', '風', '雲', '太陽', '月亮', '動物', '植物', '星星', '地球', '自然'];
  if (natureKeywordsEn.some(kw => mEn.includes(kw)) || natureKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'nature_animals';
  }

  const timeKeywordsEn = ['year', 'month', 'day', 'hour', 'minute', 'second', 'week', 'time', 'number', 'clock', 'date', 'calendar', 'today', 'tomorrow', 'yesterday', 'now', 'morning', 'afternoon', 'evening', 'night'];
  const timeKeywordsCn = ['年', '月', '日', '時', '分', '秒', '星期', '點', '鐘', '日期', '日曆', '今天', '明天', '昨天', '現在', '早上', '下午', '晚上', '夜', '數'];
  if (timeKeywordsEn.some(kw => mEn.includes(kw)) || timeKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'numbers_time';
  }

  const langKeywordsEn = ['country', 'language', 'japan', 'english', 'china', 'taiwan', 'national', 'foreign'];
  const langKeywordsCn = ['國', '語', '日語', '英語', '中文', '日本', '台灣', '中國', '美國', '外國'];
  if (langKeywordsEn.some(kw => mEn.includes(kw)) || langKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'countries_lang';
  }

  const schoolKeywordsEn = ['school', 'class', 'homework', 'test', 'study', 'book', 'pen', 'pencil', 'dictionary', 'work', 'office', 'company', 'meeting', 'job', 'business', 'employee', 'manager'];
  const schoolKeywordsCn = ['學校', '教室', '功課', '作業', '考試', '學習', '書', '筆', '字典', '工作', '公司', '辦公室', '會議', '職務', '企業', '同事'];
  if (schoolKeywordsEn.some(kw => mEn.includes(kw)) || schoolKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'school_work';
  }

  const placeKeywordsEn = ['place', 'shop', 'store', 'house', 'building', 'room', 'kitchen', 'toilet', 'bank', 'hospital', 'park', 'left', 'right', 'up', 'down', 'front', 'back', 'direction', 'east', 'west', 'south', 'north'];
  const placeKeywordsCn = ['地點', '商店', '店', '房子', '大樓', '房間', '廚房', '廁所', '銀行', '醫院', '公園', '左', '右', '上', '下', '前', '後', '東', '西', '南', '北', '方向', '建築'];
  if (placeKeywordsEn.some(kw => mEn.includes(kw)) || placeKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'places_buildings';
  }

  const leisureKeywordsEn = ['movie', 'music', 'song', 'travel', 'photo', 'sport', 'play', 'game', 'hobby', 'art', 'dance', 'swim', 'tennis'];
  const leisureKeywordsCn = ['電影', '音樂', '歌', '旅行', '照片', '運動', '遊玩', '遊戲', '興趣', '藝術', '舞蹈', '游泳', '網球'];
  if (leisureKeywordsEn.some(kw => mEn.includes(kw)) || leisureKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'leisure_sports';
  }

  const itemKeywordsEn = ['desk', 'chair', 'bed', 'box', 'bag', 'tv', 'phone', 'computer', 'key', 'wallet', 'cup', 'plate', 'spoon', 'umbrella', 'furniture', 'appliance', 'tool', 'towel', 'soap'];
  const itemKeywordsCn = ['桌', '椅', '床', '箱', '盒子', '電視', '電話', '手機', '電腦', '鑰匙', '錢包', '杯', '盤', '傘', '家具', '工具', '毛巾', '肥皂'];
  if (itemKeywordsEn.some(kw => mEn.includes(kw)) || itemKeywordsCn.some(kw => mCn.includes(kw))) {
    return 'daily_items';
  }

  return 'other_nouns';
}

// Sentence templates generator
const categoryTemplates = {
  greetings: [
    { ja: "日常会話で「[WORD]」という表現はよく使われます。", furi: "にちじょうかいわで「[FURI]」というひょうげんはよくつかわれます。", ch: "在日常對話中常用「[MEANING]」這個表達。" },
    { ja: "感謝や挨拶の場面で「[WORD]」と言います。", furi: "かんしゃやあいさつのばめんで「[FURI]」といいます。", ch: "在感謝或問候的場合會說「[MEANING]」。" }
  ],
  family_people: [
    { ja: "彼は私の大切な[WORD]です。", furi: "かれはわたしのたいせつな[FURI]です。", ch: "他是對我很重要的[MEANING]。" },
    { ja: "昨日、親しい[WORD]に会いました。", furi: "きのう、したしい[FURI]にあいました。", ch: "昨天遇到了親近的[MEANING]。" }
  ],
  body_parts: [
    { ja: "健康診断で[WORD]の検査を受けました。", furi: "けんこうしんだんで[FURI]のけんさをうけました。", ch: "在健康檢查中接受了[MEANING]的檢查。" },
    { ja: "健康のために[WORD]の調子を整えます。", furi: "けんこうのために[FURI]のちょうしをととのえます。", ch: "為了健康，調理好[MEANING]的狀態。" }
  ],
  food_drinks: [
    { ja: "朝ご飯に美味しい[WORD]を食べました。", furi: "あさごはんにおいしい[FURI]をたべました。", ch: "早飯吃了美味的[MEANING]。" },
    { ja: "今日のランチは[WORD]にしましょう。", furi: "きょうのランチは[FURI]にしましょう。", ch: "今天的午餐就決定吃[MEANING]吧。" }
  ],
  clothing: [
    { ja: "新しい[WORD]を着て出かけます。", furi: "あたらしい[FURI]をきてでかけます。", ch: "穿上新的[MEANING]出門。" },
    { ja: "お気に入りの[WORD]を買いに行きました。", furi: "おきにいりの[FURI]をかいにいきました。", ch: "去買了中意的[MEANING]。" }
  ],
  places_buildings: [
    { ja: "週末に家族と一緒に[WORD]へ行きました。", furi: "しゅうまつにかぞくといっしょに[FURI]へいきました。", ch: "週末和家人一起去了[MEANING]。" },
    { ja: "私の家は[WORD]の近くにあります。", furi: "わたしのいえは[FURI]のちかくにあります。", ch: "我家就在[MEANING]的附近。" }
  ],
  countries_lang: [
    { ja: "将来、[WORD]の文化について勉強したいです。", furi: "しょうらい、[FURI]のぶんかについてべんきょうしたいです。", ch: "將來想學習關於[MEANING]的文化。" },
    { ja: "彼は[WORD]を教える仕事をしています。", furi: "かれは[FURI]をおしえるしごとをしています。", ch: "他的工作是教授[MEANING]。" }
  ],
  transportation: [
    { ja: "毎日[WORD]を使って通勤しています。", furi: "まいにち[FURI]をつかってつうきんしています。", ch: "每天都搭乘[MEANING]通勤。" },
    { ja: "[WORD]で行く方が早くて便利です。", furi: "[FURI]でいくほうがはやくでべんりです。", ch: "搭[MEANING]去比較快且方便。" }
  ],
  nature_animals: [
    { ja: "旅行中に綺麗な[WORD]を見かけました。", furi: "りょこうちゅうにきれいな[FURI]をみかけました。", ch: "旅行中看見了美麗的[MEANING]。" },
    { ja: "私は[WORD]の写真を撮るのが好きです。", furi: "わたしは[FURI]のしゃしんをとるのがすきです。", ch: "我喜歡拍攝[MEANING]的照片。" }
  ],
  numbers_time: [
    { ja: "もうすぐ約束の[WORD]になります。", furi: "もうすぐやくそくの[FURI]になります。", ch: "馬上就要到約定的[MEANING]了。" },
    { ja: "カレンダーで[WORD]を確認してください。", furi: "カレンダーで[FURI]をかくにんしてください。", ch: "請在日曆上確認[MEANING]。" }
  ],
  school_work: [
    { ja: "今日から新しい[WORD]が始まります。", furi: "きょうからあたらしい[FURI]がはじまります。", ch: "從今天開始新的[MEANING]。" },
    { ja: "この[WORD]はとても勉強になります。", furi: "この[FURI]はとてもべんきょうになります。", ch: "這個[MEANING]讓我學到很多。" }
  ],
  leisure_sports: [
    { ja: "週末は自分の趣味である[WORD]を楽しみます。", furi: "しゅうまつはじぶんのしゅみである[FURI]をたのしみます。", ch: "週末享受自己作為興趣的[MEANING]。" },
    { ja: "[WORD]はとても健康に良い活動です。", furi: "[FURI]はとてもけんこうによいかつどうです。", ch: "[MEANING]是個對健康非常有益的活動。" }
  ],
  daily_items: [
    { ja: "日常生活で[WORD]は非常に便利です。", furi: "にちじょうせいかつで[FURI]はひじょうにべんりです。", ch: "在日常生活中[MEANING]非常方便。" },
    { ja: "引き出しの中に[WORD]を入れておきました。", furi: "引き出しのなかに[FURI]をいれておきました。", ch: "把[MEANING]收進抽屜裡了。" }
  ],
  action_verbs: [
    { ja: "「[WORD]」ことはとても大切です。", furi: "「[FURI]」ことはとてもたいせつです。", ch: "「[MEANING]」是很重要的事。" },
    { ja: "「[WORD]」計画を現在進めています。", furi: "「[FURI]」けいかくをげんざいすすめています。", ch: "目前正在推進「[MEANING]」的計劃。" }
  ],
  movement_verbs: [
    { ja: "「[WORD]」前にしっかりと準備運動をします。", furi: "「[FURI]」まえにしっかりとじゅんびうんどうをします。", ch: "在「[MEANING]」之前會做好準備運動。" },
    { ja: "目的地に向かって「[WORD]」ことにしました。", furi: "もくてきちにむかって「[FURI]」ことにしました。", ch: "決定朝著目的地「[MEANING]」。" }
  ],
  state_verbs: [
    { ja: "その重要性を「[WORD]」ことが必要です。", furi: "そのじゅうようせいを「[FURI]」ことがひつようです。", ch: "有必要去「[MEANING]」其重要性。" },
    { ja: "それについて詳しく「[WORD]」のは難しいです。", furi: "それについてくわしく「[FURI]」のはむずかしいです。", ch: "要詳細「[MEANING]」那個是有些困難的。" }
  ],
  i_adjectives: [
    { ja: "彼が書いた文章はとても[WORD]です。", furi: "かれがかいたぶんしょうはとても[FURI]です。", ch: "他寫的文章非常[MEANING]。" },
    { ja: "彼が作った料理はとても[WORD]です。", furi: "かれがつくったりょうりはとても[FURI]です。", ch: "他做的料理非常[MEANING]。" }
  ],
  na_adjectives: [
    { ja: "彼が書いた文章はとても[WORD]です。", furi: "かれがかいたぶんしょうはとても[FURI]です。", ch: "他寫的文章非常[MEANING]。" },
    { ja: "彼が作った料理はとても[WORD]です。", furi: "かれがつくったりょうりはとても[FURI]です。", ch: "他做的料理非常[MEANING]。" }
  ],
  adverbs_conjunctions: [
    { ja: "[WORD]、彼はその計画を実行しました。", furi: "[FURI]、かれはそのけいかくをじっこうしました。", ch: "[MEANING]，他執行了那個計劃。" },
    { ja: "その作業は[WORD]難しいと考えられています。", furi: "そのさぎょうは[FURI]むずかしいとかんがえられています。", ch: "那項工作被認為[MEANING]困難。" }
  ],
  other_nouns: [
    { ja: "その[WORD]について詳しく調べました。", furi: "その[FURI]についてくわしくしらべました。", ch: "關於那個[MEANING]進行了詳細調查。" },
    { ja: "現代社会において[WORD]は重要です。", furi: "げんだいしゃかいにおいて[FURI]はじゅうようです。", ch: "在現代社會中[MEANING]非常重要。" }
  ]
};

function getExampleSentence(word, furigana, meaning, category, verbMasu, verbMasuFuri) {
  const tList = categoryTemplates[category] || categoryTemplates.other_nouns;
  // Choose template based on word length / simple hash to keep it deterministic but varied
  const hash = word.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const t = tList[hash % tList.length];
  
  const ja = t.ja.replace(/\[WORD\]/g, word).replace(/\[FURI\]/g, furigana).replace(/\[MEANING\]/g, meaning);
  const furi = t.furi.replace(/\[WORD\]/g, word).replace(/\[FURI\]/g, furigana).replace(/\[MEANING\]/g, meaning);
  const ch = t.ch.replace(/\[WORD\]/g, word).replace(/\[FURI\]/g, furigana).replace(/\[MEANING\]/g, meaning);
  
  return { ja, furi, ch };
}

// ----------------------------------------------------
// JLPT Grammar Databases
// ----------------------------------------------------

const grammarDatabases = {
  n4: [
    {
      id: "g1",
      title: "〜ています (正在做/狀態持續)",
      structure: "動詞て形 + います",
      explanation: "表示動作正在進行中（正在做某事），或者某個動作完成後所留下的狀態持續。例如：正在寫信、或是門開著的狀態。",
      examples: [
        { ja: "今日本語を勉強しています。", furigana: "いまにほんごをべんきょうしています。", en: "現在正在學習日語。" },
        { ja: "彼は東京に住んでいます。", furigana: "かれはとうきょうにすんでいます。", en: "他住在東京（狀態持續）。" },
        { ja: "田中さんは結婚しています。", furigana: "たなかさんはけっこんしています。", en: "田中先生已經結婚了（狀態）。" }
      ]
    },
    {
      id: "g2",
      title: "〜たことがあります (曾經做過)",
      structure: "動詞た形 + ことがあります",
      explanation: "表示過去的經歷。意為「曾經做過某事」。常用於詢問或說明人生中的某個體驗。",
      examples: [
        { ja: "日本へ行ったことがあります。", furigana: "にほんへいったことがあります。", en: "我曾經去過日本。" },
        { ja: "すしを食べたことがありますか。", furigana: "すしをたべたことがありますか。", en: "你吃過壽司嗎？" },
        { ja: "一度も歌舞伎を見たことがありません。", furigana: "いちどもかぶきをみたことがありません。", en: "我一次也沒看過歌舞伎。" }
      ]
    },
    {
      id: "g3",
      title: "〜つもりです (打算做某事)",
      structure: "動詞原形/ない形 + つもりです",
      explanation: "表示說話者自己主觀上的決定或計劃。意為「打算做某事」或「打算不做某事」。",
      examples: [
        { ja: "来年日本に留学するつもりです。", furigana: "らいねんにほんにりゅうがくするつもりです。", en: "我打算明年去日本留學。" },
        { ja: "今日はお酒を飲まないつもりです。", furigana: "きょうはおさけをのまないつもりです。", en: "我今天打算不喝酒。" },
        { ja: "夏休みに旅行に行くつもりですか。", furigana: "なつやすみにりょこうにいくつもりですか。", en: "你暑假打算去旅行嗎？" }
      ]
    },
    {
      id: "g4",
      title: "〜ほうがいいです (最好做某事)",
      structure: "動詞た形/ない形 + ほうがいいです",
      explanation: "用於給予他人具體的勸告、建議。意為「最好...（做某事）」或「最好不要...（做某事）」。相較於一般提議語氣較強烈。",
      examples: [
        { ja: "毎日運動したほうがいいです。", furigana: "まいにちうんどうしたほうがいいです。", en: "每天運動比較好。" },
        { ja: "風邪をひいたから、お風呂に入らないほうがいいです。", furigana: "かぜをひいたから、おふろにはいらないほうがいいです。", en: "因為感冒了，最好不要泡澡。" },
        { ja: "早く寝たほうがいいですよ。", furigana: "はやくねたほうがいいですよ。", en: "最好早點睡喔。" }
      ]
    },
    {
      id: "g5",
      title: "〜し、〜し (既...又...)",
      structure: "簡體句 + し、簡體句 + し",
      explanation: "用於並列列舉兩個或兩個以上的原因、理由或事物特徵，常暗示後面有相應的結論。",
      examples: [
        { ja: "この部屋は広いし、綺麗だし、家賃も安いです。", furigana: "このへやはひろいし、きれいだし、やちんもやすいです。", en: "這間房間既寬敞又乾淨，房租也很便宜。" },
        { ja: "頭も痛いし、熱もあるし、今日は休みます。", furigana: "あたまもいたいし、neつもあるし、きょうはやすみます。", en: "頭又痛，又發燒，我今天就請假了。" }
      ]
    },
    {
      id: "g6",
      title: "〜すぎる (太.../過度)",
      structure: "動詞ます形(去ます) / 形容詞去尾(い/な) + すぎる",
      explanation: "表示某動作或狀態超過了正常的限度，產生了不好的結果。意為「太...」或「過度...」。",
      examples: [
        { ja: "お酒を飲みすぎました。", furigana: "おさけをのみすぎました。", en: "酒喝得太多了。" },
        { ja: "このテストは難しすぎます。", furigana: "このてすとはむずかしすぎます。", en: "這個考試太難了。" },
        { ja: "食べすぎてお腹が痛いです。", furigana: "たべすぎておなかがいたいです。", en: "吃太多了肚子痛。" }
      ]
    },
    {
      id: "g7",
      title: "〜やすい/にくい (容易/難於做某事)",
      structure: "動詞ます形(去ます) + やすい / にくい",
      explanation: "表示做某動作的難易度。意為「容易做某事」或「難於做某事」。常形容事物特徵。",
      examples: [
        { ja: "このペンはとても書きやすいです。", furigana: "このぺんはとてもかきやすいです。", en: "這支筆非常容易書寫。" },
        { ja: "日本語の漢字は覚えにくいです。", furigana: "にほんごのかんじはおぼえにくいです。", en: "日語的漢字很難記住。" }
      ]
    },
    {
      id: "g8",
      title: "〜たら (如果.../之後...)",
      structure: "動詞た形 + ら",
      explanation: "表示假定條件。意為「如果...就...」。或者用於表示前項動作完成後隨即進行後項（當...之後就...）。",
      examples: [
        { ja: "雨が降ったら、行きません。", furigana: "あめがふったら、いきません。", en: "如果下雨，我就不去了。" },
        { ja: "駅に着いたら、電話をしてください。", furigana: "えきについたら、でんわをしてください。", en: "到了車站之後，請給我打電話。" }
      ]
    },
    {
      id: "g9",
      title: "〜なければなりません (必須...)",
      structure: "動詞ない形(去ない) + なければなりません / なければならない",
      explanation: "表示必須履行某項義務，做某件不可避免的事。意為「必須...」或「一定要...」。",
      examples: [
        { ja: "明日早く起きなければなりません。", furigana: "あしたはやくおきなければなりません。", en: "明天必須早起。" },
        { ja: "毎日宿題を出さなければなりません。", furigana: "まいにちしゅくだいをださなければなりません。", en: "每天必須提交作業。" }
      ]
    },
    {
      id: "g10",
      title: "〜てもいいです (可以做某事)",
      structure: "動詞て形 + もいいです",
      explanation: "用於表示許可。意為「可以做某事」或「做某事也沒關係」。",
      examples: [
        { ja: "ここで写真を撮ってもいいですか。", furigana: "ここでしゃしんをとってもいいですか。", en: "可以在這裡拍照嗎？" },
        { ja: "窓を開けてもいいですよ。", furigana: "まどをあけてもいいですよ。", en: "可以把窗戶打開喔。" }
      ]
    },
    {
      id: "g11",
      title: "〜てはいけません (不可以做某事)",
      structure: "動詞て形 + は行けません / は行けない",
      explanation: "表示禁止行為。意為「不可以做某事」或「禁止做某事」。語氣較為直接。",
      examples: [
        { ja: "ここでタバコを吸ってはいけません。", furigana: "ここでたばこをすってはいけません。", en: "這裡禁止吸菸。" },
        { ja: "教室で大声で話してはいけません。", furigana: "きょうしつでおおごえではなしてはいけません。", en: "在教室裡不可以大聲說話。" }
      ]
    },
    {
      id: "g12",
      title: "〜と (一...就...)",
      structure: "動詞原形 + と + 後續句",
      explanation: "表示前項動作或狀態一旦成立，後項便會自然而然、必然發生（自然規律、習慣或道路指引）。後續不能接意志、命令或請求。",
      examples: [
        { ja: "春になると、桜が咲きます。", furigana: "はるになると、さくらがさきます。", en: "到了春天，櫻花就會綻放。" },
        { ja: "この道をまっすぐ行くと、左に交番があります。", furigana: "このみちをまっすぐいくと、ひだりにこうばんがあります。", en: "沿這條路直走的話，左邊就會有派出所。" }
      ]
    },
    {
      id: "g13",
      title: "〜ようにする (努力做到...)",
      structure: "動詞原形/ない形 + ようにする / ようにしています",
      explanation: "表示自己下定決心並持續努力，建立某個習慣。意為「努力做到...」或「設法...」。",
      examples: [
        { ja: "毎日水をたくさん飲むようにしています。", furigana: "まいにちみずをたくさんのむようにしています。", en: "我努力做到每天多喝水。" },
        { ja: "甘いものを食べないようにします。", furigana: "あまいものをたべないようにします。", en: "我會努力少吃甜食。" }
      ]
    },
    {
      id: "g14",
      title: "〜てあげる/もらう/くれる (授受動詞)",
      structure: "動詞て形 + あげる/もらう/くれる",
      explanation: "表示人與人之間恩惠的給予與接受動作。「てあげる」為自己或同輩給他人做某事；「てもらう」為請求他人做某事並獲得好處；「てくれる」為他人主動為自己或家人做某事。",
      examples: [
        { ja: "友達の荷物を持ってあげました。", furigana: "ともだちのにもつをもってあげました。", en: "我幫朋友拿了行李。" },
        { ja: "日本語を教えてもらいました。", furigana: "にほんごをおしえてもらいました。", en: "我請他教我日語（得到了教導）。" },
        { ja: "先生が本を貸してくれました。", furigana: "せんせいがほんをかしてくれました。", en: "老師借了我一本書（主動幫我）。" }
      ]
    },
    {
      id: "g15",
      title: "〜ば (如果.../假定形)",
      structure: "動詞ば形 / 形容詞去尾加ければ",
      explanation: "表示假定條件。主要用於表示前項是後項成立的必要前提條件。",
      examples: [
        { ja: "安ければ、買います。", furigana: "やすければ、かいます。", en: "如果便宜的話就買。" },
        { ja: "雨が降らなければ、ハイキングに行きます。", furigana: "あめがふらなければ、はいきんぐにいきます。", en: "如果不下雨，我們就去健行。" }
      ]
    }
  ],
  n3: [
    {
      id: "g1",
      title: "〜ようとする (正打算/企圖)",
      structure: "動詞意向形 + とする",
      explanation: "表示某個動作即將要開始，或者某人正試圖去完成某個動作（正打算...）。",
      examples: [
        { ja: "出かけようとした時、雨が降り出しました。", furigana: "でかけようとしたとき、あめがふりだしました。", en: "正打算出門的時候，開始下雨了。" },
        { ja: "犬が私の靴を食べようとしています。", furigana: "いぬがわたしのくつをたべようとしています。", en: "小狗正打算咬（吃）我的鞋子。" }
      ]
    },
    {
      id: "g2",
      title: "〜みたいです (像...一樣)",
      structure: "名詞/簡體句 + みたいです",
      explanation: "表示比喻、推測或列舉。意為「好像...一樣」或「推測似乎是...」。口語常用。",
      examples: [
        { ja: "彼女はモデルみたいに綺麗です。", furigana: "かのじょはモデルみたいにきれいです。", en: "她像模特兒一樣漂亮。" },
        { ja: "明日は雨みたいですね。", furigana: "あしたはあめみたいですね。", en: "明天好像會下雨呢。" }
      ]
    },
    {
      id: "g3",
      title: "〜らしい (典型特徵/傳聞)",
      structure: "名詞 + らしい / 簡體句 + らしい",
      explanation: "表示典型特徵（極具該事物的特質），或者表示有可靠根據的傳聞（據說...）。",
      examples: [
        { ja: "今天是個像春天一般溫暖的日子。", // Wait, Japanese:
        ja: "今日は春らしい暖かい日です。", furigana: "きょうははるらしいあたたかいひです。", en: "今天是個像春天一般溫暖的日子（很有春天的氣息）。" },
        { ja: "噂によると、あの店は閉まるらしいです。", furigana: "うわさによると、あのみせはしまるらしいです。", en: "根據傳聞，那家店似乎要關門了。" }
      ]
    },
    {
      id: "g4",
      title: "〜っぽい (帶有某種傾向)",
      structure: "名詞/動詞去ます形 + っぽい",
      explanation: "表示事物看起來具有某種特徵，或者容易發生某種行為（多用於貶義，偏向.../像...一樣）。",
      examples: [
        { ja: "この牛乳は水っぽくて美味しくないです。", furigana: "このぎゅうにゅうはみずっぽくておいしくないです。", en: "這牛奶稀得像水一樣，不好喝。" },
        { ja: "彼は忘れっぽいです。", furigana: "かれはわすれっぽいです。", en: "他很容易健忘。" }
      ]
    },
    {
      id: "g5",
      title: "〜がる (表示第三人稱感覺)",
      structure: "形容詞去尾(い/な) + がる / がっている",
      explanation: "用於描述第三人稱內心感受或生理狀態的外在表現（想要、討厭、害怕等）。",
      examples: [
        { ja: "子供が外に行きたがっています。", furigana: "こどもがそとにいきたがっています。", en: "小孩正表現出很想去外面的樣子。" },
        { ja: "彼は恥ずかしがらないで話しました。", furigana: "かれははずかしがらないではなしました。", en: "他毫不害羞地說了話。" }
      ]
    },
    {
      id: "g6",
      title: "〜うちに (在...期間之內)",
      structure: "動詞原形/ている/ない/形容詞 + うちに",
      explanation: "表示在某種狀態改變之前，趁機完成某個動作（趁著...）。或者指在不知不覺中發生了變化。",
      examples: [
        { ja: "冷めないうちに早く食べてください。", furigana: "さめないうちに早くたべてください。", en: "請趁熱吃。" },
        { ja: "日本にいるうちに富士山に登りたいです。", furigana: "にほんへいるうちにふじさんにのぼりたいです。", en: "趁著還在日本時，想要登富士山。" }
      ]
    },
    {
      id: "g7",
      title: "〜たとたん (剛一...就)",
      structure: "動詞た形 + とたん",
      explanation: "表示前項動作剛完成的一瞬間，緊接著發生了出乎意料的後項變化。",
      examples: [
        { ja: "お酒を飲んだとたん、顔が赤くなりました。", furigana: "おさけをのんだとたん、かおがあかくなりました。", en: "剛一喝酒，臉就立刻變紅了。" },
        { ja: "立ち上がったとたん、めまいがしました。", furigana: "たちあがったとたん、めまいがしました。", en: "剛一站起身，就感到一陣頭暈。" }
      ]
    },
    {
      id: "g8",
      title: "〜たびに (每次...)",
      structure: "動詞原形/名詞+の + たびに",
      explanation: "表示每次進行前項動作時，無一例外地都會伴隨著後項情況。",
      examples: [
        { ja: "この曲を聞くたびに、客生時代を思い出します。", // Wait, Japanese student:
        ja: "この曲を聞くたびに、学生時代を思い出します。", furigana: "このきょくを聞くたびに、がくせいじだいをおもいだします。", en: "每次聽這首歌，都會讓我想起學生時代。" },
        { ja: "旅行のたびに、お土産を買います。", furigana: "りょこうのたびに、おみやげをかいます。", en: "每次旅行都會買伴手禮。" }
      ]
    },
    {
      id: "g9",
      title: "〜ついでに (順便)",
      structure: "動詞原形/た形/名詞+の + ついでに",
      explanation: "以進行主體動作為主要目的，利用這個機會順便做另一件事。",
      examples: [
        { ja: "スーパーに行くついでに、ゴミを出してください。", furigana: "すーぱーにいくづいでに、ごみをだしてください。", en: "去超市的時候，順便把垃圾拿出去。" },
        { ja: "散歩のついでに、本屋に寄りました。", furigana: "さんぽのついでに、ほんやによりました。", en: "散步的順便，順路去了趟書店。" }
      ]
    },
    {
      id: "g10",
      title: "〜はずです (理應如此)",
      structure: "簡體句/名詞+の + はずです",
      explanation: "說話者根據客觀事實或客觀理由，得出有十足把握的客觀判斷。意為「理應...」或「應該會...」。",
      examples: [
        { ja: "彼は昨日たくさん勉強したから、今日のテストはできるはずです。", furigana: "かれはきのうたくさんべんきょうしたから、きょうのてすとはできるはずです。", en: "他昨天讀了那麼多書，今天的考試理應沒問題。" },
        { ja: "薬を飲んだから、もうすぐ熱が下がるはずです。", furigana: "くすりをのんだから、もうすぐねつがさがるはずです。", en: "因為吃了藥，發燒應該很快會退。" }
      ]
    },
    {
      id: "g11",
      title: "〜わけです (自然而然的結論)",
      structure: "簡體句 + わけです",
      explanation: "表示根據前文客觀事實，得出理所當然的結論，或者解釋事情發生的緣由。意為「也就是說...」或「難怪...」。",
      examples: [
        { ja: "彼は日本に5年も住んでいるから、日本語が上手なわけです。", furigana: "かれはにほんにごねんもすんでいるから、にほんごがじょうずなわけです。", en: "他在日本住了5年，難怪日語這麼好。" },
        { ja: "消費税が上がれば、物価も高くなるわけです。", furigana: "しょうひぜいがあがれば、ぶっかもたかくなるわけです。", en: "消費稅上漲的話，物價自然也會變高。" }
      ]
    },
    {
      id: "g12",
      title: "〜わけにはいかない (不能做某事)",
      structure: "動詞原形 + わけにはいかない",
      explanation: "表示受到社會常識、道德、人情或自身責任的約束，在心理上「不能做某事」。",
      examples: [
        { ja: "明日は大事な試験があるから、休むわけにはいきません。", furigana: "あしたはだいじなしけんがあるから、やすむわけにはいきません。", en: "明天有重要的考試，所以不能請假。" },
        { ja: "車の運転があるから、お酒を飲むわけにはいきません。", furigana: "くるまのうんてんがあるから、おさけをのむわけにはいきません。", en: "因為要開車，所以不能喝酒。" }
      ]
    },
    {
      id: "g13",
      title: "〜おきに (每隔...)",
      structure: "數量詞 + おきに",
      explanation: "表示時間或空間上的等間隔重複。意為「每隔...」。",
      examples: [
        { ja: "このバスは15分おきに出発します。", furigana: "このばすはじゅうごふんおきにしゅっぱつします。", en: "這班公車每隔15分鐘發車一次。" },
        { ja: "この木は2メートルおきに植えられています。", furigana: "このきはにめーとるおきにうえられています。", en: "這些樹是每隔兩公尺種植一棵。" }
      ]
    },
    {
      id: "g14",
      title: "〜たばかり (剛剛完成)",
      structure: "動詞た形 + ばかり",
      explanation: "表示動作或事件完成後，在說話者的主觀時間感受上「才剛過去不久」。",
      examples: [
        { ja: "さっきご飯を食べたばかりだから、まだお腹がいっぱいです。", furigana: "さっきごはんをたべたばかりだから、まだおなかがいっぱいです。", en: "因為才剛吃完飯，肚子還很飽。" },
        { ja: "先月日本に来たばかりです。", furigana: "せんげつにほんにきたばかりです。", en: "我是上個月剛來到日本的。" }
      ]
    },
    {
      id: "g15",
      title: "〜さえ (甚至/連)",
      structure: "名詞 + さえ + 否定後續",
      explanation: "提出一個極端的事物作為代表，以此說明其他一般事物更是如此（甚至連...都...）。",
      examples: [
        { ja: "この問題は難しすぎて、先生でさえ分かりません。", furigana: "このもんだいはむずかしすぎて、せんせいでさえわかりません。", en: "這個題目太難了，甚至連老師都不懂。" },
        { ja: "ひらがなさえ書けないなら、漢字は無理です。", furigana: "ひらがなさえかけないなら、かんじはむりです。", en: "如果連平假名都不會寫，漢字是不可能的。" }
      ]
    }
  ],
  n2: [
    {
      id: "g1",
      title: "〜がち (容易有某不良傾向)",
      structure: "名詞/動詞去ます形 + がち",
      explanation: "表示容易發生某種事情，或者頻繁處於某種不良狀態。意為「往往...」或「容易...（多為負面）」。",
      examples: [
        { ja: "最近は曇りがちの天気が続いています。", furigana: "さいきんはくもりがちのてんきがつづいています。", en: "最近多為陰天的天氣（容易陰天）。" },
        { ja: "一人暮らしの人は野菜が不足しがちです。", furigana: "ひとりぐらしのひとはやさいがふそくしがちです。", en: "獨居的人往往容易蔬菜攝取不足。" }
      ]
    },
    {
      id: "g2",
      title: "〜だらけ (滿是討厭之物)",
      structure: "名詞 + だらけ",
      explanation: "表示事物表面沾滿了令人不快、骯髒或令人討厭的東西（如泥土、錯誤、血、傷口等）。「滿是...」。",
      examples: [
        { ja: "彼の作文は間違いだらけです。", furigana: "かれのさくぶんはまちがいだらけです。", en: "他的作文裡滿是錯誤。" },
        { ja: "雨の中を走ったので、靴が泥だらけになりました。", furigana: "あめのなかをはしったので、くつがどろだらけになりました。", en: "因為在雨中跑步，鞋子沾滿了泥巴。" }
      ]
    },
    {
      id: "g3",
      title: "〜ぎみ (稍微有點...感覺)",
      structure: "名詞/動詞去ます形 + ぎみ",
      explanation: "表示身體或心理上，呈現出某種輕微的不良症狀或感覺。意為「稍微有點...」或「有些...的傾向」。",
      examples: [
        { ja: "今日は少し風邪ぎみなので、早く寝ます。", furigana: "きょうはすこしかぜぎみなので、ひゃくねます。", en: "今天稍微有點感冒的感覺，所以我要早點睡。" },
        { ja: "最近仕事が忙しくて、寝不足ぎみです。", furigana: "さいきんしごとがいそがしくて、ねぶそくぎみです。", en: "最近工作忙碌，稍微有點睡眠不足。" }
      ]
    },
    {
      id: "g4",
      title: "〜際（に）(在...之時)",
      structure: "動詞原形/た形/名詞+の + 際（に）",
      explanation: "正式的書面用語，相當於「〜とき」，意為「在...之時」或「在...之際」。常用於公共告示或說明書中。",
      examples: [
        { ja: "帰国の際、お世話になった人に挨拶しました。", furigana: "きこくのさい、おせわになったひとにあいさつしました。", en: "回國之際，我向照顧過我的人打了招呼。" },
        { ja: "パスポートを紛失した際は、すぐに警察に連絡してください。", furigana: "ぱすぽーとをふんしつしたさいは、すぐにけいさつにれんらくしてください。", en: "遺失護照之時，請立刻聯絡警察。" }
      ]
    },
    {
      id: "g5",
      title: "〜に際して (在準備開始...之際)",
      structure: "動詞原形/名詞 + に際して",
      explanation: "表示在面臨某個重要事件即將開始之時（在...之際）。較偏向書面且正式的口吻。",
      examples: [
        { ja: "留学に際して、多くの人から励まされました。", furigana: "りゅうがくにさいして、おおくのひとからはげまされました。", en: "留學之際，我收到了許多人的鼓勵。" },
        { ja: "契約に際し、必要な書類を準備してください。", furigana: "けいやくにさいし、ひつようなしょるいをじゅんびしてください。", en: "在簽訂契約之時，請準備好必要的檔案。" }
      ]
    },
    {
      id: "g6",
      title: "〜たとえ〜ても (即使...也)",
      structure: "たとえ + 動詞て形 + も",
      explanation: "讓步假定的強烈語氣。意為「即使/哪怕...也一定...」。用於表達說話者的強烈決心。",
      examples: [
        { ja: "たとえ反対されても、私は留学します。", furigana: "たとえはんたいされても、わたしはりゅうがくします。", en: "即使被反對，我也要去留學。" },
        { ja: "たとえ雨が降っても、試合は中止しません。", furigana: "たとえあめがふっても、しあいはちゅうししません。", en: "哪怕下雨，比賽也不會中止。" }
      ]
    },
    {
      id: "g7",
      title: "〜につれて (隨著比例單向發展)",
      structure: "動詞原形/名詞 + につれて",
      explanation: "表示伴隨著前項程度單方向的持續變化，後項也會按比例跟著發生程度的變化（隨著...）。",
      examples: [
        { ja: "日本語が上手になるにつれて、会話が楽しくなりました。", furigana: "にほんごがじょうずになるにつれて、かいわがたのしくなりました。", en: "隨著日語變好，對話也變得愉快了。" },
        { ja: "時間が経つにつれて、悲しみが薄れていきました。", furigana: "じかんがたつにつれて、かなしみがうすれていきました。", en: "隨著時間流逝，悲傷也漸漸淡化了。" }
      ]
    },
    {
      id: "g8",
      title: "〜に伴って (伴隨著變動)",
      structure: "動詞原形/名詞 + に伴って",
      explanation: "表示伴隨前項的變動或發展，後項也會相應發生大規模的變化或產生連帶事件。意為「伴隨著...」。",
      examples: [
        { ja: "スマートフォンの普及に伴って、SNSの利用者が増えました。", furigana: "すまーとふぉんのふきゅうにともなって、SNSのりようしゃがふえました。", en: "伴隨著智慧型手機的普及，社群網站使用者增加了。" },
        { ja: "人口の減少に伴い、労働力が不足しています。", furigana: "じんこうのげんしょうにともない、ろうどうりょくがふそくしています。", en: "伴隨人口減少，勞動力出現了不足。" }
      ]
    },
    {
      id: "g9",
      title: "〜にしたがって (隨之比例變遷)",
      structure: "動詞原形/名詞 + にしたがって",
      explanation: "表示遵循著某個規定、指示（按照...），或是表示伴隨著比例的變化（隨著...）。",
      examples: [
        { ja: "規則に従って、正しく運転してください。", furigana: "きそくにしたがって、ただしくうんてんしてください。", en: "請遵守規則，正確開車。" },
        { ja: "標高が高くなるにしたがって、気温が下がります。", furigana: "ひょうこうがたかくなるにしたがって、きおんがさがります。", en: "隨著高度變高，氣溫會降低。" }
      ]
    },
    {
      id: "g10",
      title: "〜最中に (正當...之時)",
      structure: "動詞ている形 / 名詞+の + 最中に",
      explanation: "表示正在進行某個關鍵動作時，突然發生了意料之外的其他干擾事件（正當...最熱烈之時）。",
      examples: [
        { ja: "会議の最中に、激しい地震が起きました。", furigana: "かいぎのさいちゅうに、はげしいじしんがおきました。", en: "正當開會之時，發生了強烈地震。" },
        { ja: "お風呂に入っている最中に、電話が鳴りました。", furigana: "おふろにはいっているさいちゅうに、でんわがなりました。", en: "正當泡澡的時候，電話響了。" }
      ]
    },
    {
      id: "g11",
      title: "〜つつある (正持續變化中)",
      structure: "動詞去ます形 + つつある",
      explanation: "表示某種狀態正在朝特定方向逐漸發展、變化中。書面語口吻（正在...中）。",
      examples: [
        { ja: "日本の人口は減少しつつあります。", furigana: "にほんのじんこうはげん少しつつあります。", en: "日本的人口正處於持續減少的趨勢中。" },
        { ja: "温暖化のせいで、氷河が溶けつつあります。", furigana: "おんだんかのせいで、ひょうががとけつつあります。", en: "因為暖化，冰河正逐漸溶解。" }
      ]
    },
    {
      id: "g12",
      title: "〜からには (既然...就)",
      structure: "簡體句 + からには",
      explanation: "表示既然前項的事實已經成為定局，那麼後項理所當然地必須有強烈的意志、義務或決心。意為「既然...就」。",
      examples: [
        { ja: "約束したからには、守るべきです。", furigana: "やくそくしたからには、まもるべきです。", en: "既然承諾了，就應該遵守。" },
        { ja: "日本に来たからには、日本語が上手になりたいです。", furigana: "にほんにきたからには、にほんごがじょうずになりたいです。", en: "既然來到了日本，我就想把日語學好。" }
      ]
    },
    {
      id: "g13",
      title: "〜以上（は）(既然...就)",
      structure: "簡體句 + 以上（は）",
      explanation: "與「からには」語意類似的表示義務與決心的說法。意為「既然...就」。",
      examples: [
        { ja: "引き受けた以上は、最後までやり遂げます。", furigana: "ひきうけたいじょうは、さいごまでやりとげます。", en: "既然承接了這件事，我就會堅持到底。" },
        { ja: "試験を受ける以上、合格したいです。", furigana: "しけんをうけるいじょう、ごうかくしたいです。", en: "既然要參加考試，我就想要合格。" }
      ]
    },
    {
      id: "g14",
      title: "〜上は (既然...就/書面)",
      structure: "簡體句 + 上は",
      explanation: "偏向正式書面、公文宣告的「既然...就」。與「以上は」含義相同，常用於帶有責任或重大決心的語境。",
      examples: [
        { ja: "こうなった上は、戦うしかありません。", furigana: "こうなったうえは、たたかうしかありません。", en: "既然事情演變至此，就只有戰鬥一途了。" },
        { ja: "社長が辞任する上は、新体制を作る必要があります。", furigana: "しゃちょうがじにんするうえは、しんたいせいをつくるひつようがあります。", en: "既然總經理要辭職，就有必要建立新的體制。" }
      ]
    },
    {
      id: "g15",
      title: "〜をめぐって (圍繞著討論或爭議)",
      structure: "名詞 + をめぐって / をめぐる",
      explanation: "表示圍繞著某個主題、問題或焦點，多方意見對立並展開爭論、討論或爭奪。意為「圍繞著...」。",
      examples: [
        { ja: "憲法改正をめぐって、多くの議論が行われました。", furigana: "けんぽうかいせいをめぐって、おおくのぎろんがおこなわれました。", en: "圍繞著憲法修改，進行了許多討論。" },
        { ja: "遺産をめぐる争いが家族の間で起きました。", furigana: "いさんをめぐるあらそいがかぞくのあいだでおきました。", en: "圍繞著遺產的爭奪，在家人間爆發了。" }
      ]
    }
  ],
  n1: [
    {
      id: "g1",
      title: "〜が早いか (剛一...就緊接著)",
      structure: "動詞原形 + が早いか",
      explanation: "表示前項動作剛完成的極短時間內，後項出乎意料的動作便緊接著發生。通常不接命令或意志。",
      examples: [
        { ja: "ベルが鳴るが早いか、学生たちは教室から飛び出しました。", furigana: "べるがなるがはやいか、がくせいたちはきょうしつからとびだしました。", en: "鐘聲剛一響起，學生們就爭先恐後地跑出了教室。" },
        { ja: "子供は家に帰るが早いか、おやつを食べ始めました。", furigana: "こどもはいえにかえるがはやいか、おやつをたべはじめました。", en: "小孩一回到家，就立刻開始吃起了點心。" }
      ]
    },
    {
      id: "g2",
      title: "〜や否や (剛一...隨即發生)",
      structure: "動詞原形 + や否や",
      explanation: "書面語。表示前一動作剛發生的那一瞬間，緊接著發生了後一項動作或變化（剛一...隨即...）。",
      examples: [
        { ja: "そのニュースを聞くや否や、彼女は泣き崩れました。", furigana: "そのにゅーすをきくやいなや、かのじょはなきくずれました。", en: "一聽到那個消息，她立刻痛哭失聲。" },
        { ja: "社長が到着するや否や、会議が始まりました。", furigana: "しゃちょうがとうちゃくするやいなや、かいぎがはじまりました。", en: "總經理剛一抵達，會議隨即開始。" }
      ]
    },
    {
      id: "g3",
      title: "〜なり (剛一...就採取意外動作)",
      structure: "動詞原形 + なり",
      explanation: "表示前項動作剛手，後項便以此為契機，立刻採取了某個出人意料的動作。主詞一般為第三人稱。",
      examples: [
        { ja: "彼は私の顔を見るなり、逃げ出しました。", furigana: "かれはわたしのかおをみるなり、にげだしました。", en: "他一看到我的臉，就立刻逃跑了。" },
        { ja: "電話を切るなり、彼女は家を飛び出していきました。", furigana: "でんわをきるなり、かのじょはいえをとびだしていきました。", en: "剛一掛斷電話，她就立刻跑出了家門。" }
      ]
    },
    {
      id: "g4",
      title: "〜そばから (剛...又隨即回復原狀)",
      structure: "動詞原形/た形 + そばから",
      explanation: "表示即使反覆做前項動作，隨即又會發生後項，使前項徒勞無功。常用於健忘、清理等無奈語境中。",
      examples: [
        { ja: "漢字は覚えるそばから忘れてしまいます。", furigana: "かんじはおぼえるそばからわすれてしまいます。", en: "漢字往往是一邊記，轉身就又忘光了。" },
        { ja: "子供が散らかすそばから、部屋を片付けます。", furigana: "こどもがちらかすそばから、へやをかたづけます。", en: "小孩子剛一弄亂，我就得隨即收拾房間。" }
      ]
    },
    {
      id: "g5",
      title: "〜てからというもの (自從...以來持續變化)",
      structure: "動詞て形 + からというもの",
      explanation: "表示自從發生了某個關鍵性契機之後，生活或心境發生了持續至今的重大轉變與變化。",
      examples: [
        { ja: "犬を飼い始めてからというもの、毎日が楽しくなりました。", furigana: "いぬをかいはじめてからというもの、まいにちがたのしくなりました。", en: "自從開始養狗以來，每天的生活都變得無比快樂。" },
        { ja: "タバコをやめてからというもの、体の調子が良くなりました。", furigana: "たばこをやめてからというもの、からだのちょうしがよくなりました。", en: "自從戒菸以來，身體狀況就一直很好。" }
      ]
    },
    {
      id: "g6",
      title: "〜を皮切りに (以...為起點發展)",
      structure: "名詞 + を皮切りにして / を皮切りにして",
      explanation: "表示以某一個事件或起點為起端，隨後一個接一個地蓬勃展開了相同類型的連鎖發展。",
      examples: [
        { ja: "東京公演を皮切りに、全国ツアーが始まりました。", furigana: "とうきょうこうえんをかわきりに、ぜんこくつあーがはじまりました。", en: "以東京公演為起點，全國巡迴演出正式拉開了帷幕。" },
        { ja: "彼の一言を皮切りに、全員が意見を出し合いました。", furigana: "かれのひとことをかわきりに、ぜんいんがいけんをだしあいました。", en: "以他的一句話為契機，所有人紛紛開始發表意見。" }
      ]
    },
    {
      id: "g7",
      title: "〜に至るまで (範圍廣至...甚至連)",
      structure: "名詞 + に至るまで",
      explanation: "強調範圍極其廣闊，連極微小、極特殊的對象都包含在內。意為「甚至到...」或「連...都包括」。",
      examples: [
        { ja: "この本は、文法から歴史に至るまで細かく書かれています。", furigana: "このほんは、ぶんぽうかられきしにいたるまでこまかくかかれています。", en: "這本書裡，從文法甚至到歷史，都寫得非常詳細。" },
        { ja: "社長から新入社員に至るまで、全員が清掃に参加しました。", furigana: "しゃちょうからしんにゅうしゃいんにいたるまで、ぜんいんがせいそうにさんかしました。", en: "從總經理甚至到剛進來的新員工，所有人都在清掃活動中露面了。" }
      ]
    },
    {
      id: "g8",
      title: "〜を限りに (以...為最後期限)",
      structure: "名詞 + を限りに",
      explanation: "表示以當前時間、機會為最終的截止界限，以後將不再進行相同的行為了（以...為最後）。",
      examples: [
        { ja: "今日を限りに、この店を閉店いたします。", furigana: "きょうをかぎりに、このみせをへいてんいたします。", en: "以今天為最後期限，本店將正式結束營業。" },
        { ja: "今年度を限りに、引退することに決めました。", furigana: "こんねんどをかぎりに、いんたいすることにきめました。", en: "我決定以今年度為限正式退休。" }
      ]
    },
    {
      id: "g9",
      title: "〜をもって (以書面期限/手段)",
      structure: "名詞 + をもって",
      explanation: "書面、宣告用語。表示以某個時間點作為終止或起始界限，或者是表示以此作為手段或依據進行。",
      examples: [
        { ja: "本日の営業は、18時をもって終了いたします。", furigana: "ほんじつのえいぎょうは、じゅうはちじをもってしゅうりょういたします。", en: "今天的營業，將在 18 點整正式結束。" },
        { ja: "彼の実力をもってすれば、合格は簡単です。", furigana: "かれのじつりょくをもってすれば、ごうかくはかんたんです。", en: "如果以他的實力為前提，及格是很簡單的。" }
      ]
    },
    {
      id: "g10",
      title: "〜ところを (在特定困境時)",
      structure: "簡體句/名詞+の + ところを",
      explanation: "表示在對方處於特定忙碌、困境或私密時間時，向對方致以歉意並尋求幫助。意為「在...之時（多表感謝或歉意）」。",
      examples: [
        { ja: "お忙しいところをお越しいただき、ありがとうございます。", furigana: "おいそがしいところをおこしいただき、ありがとうございます。", en: "感謝您在百忙之中抽空光臨。" },
        { ja: "お休みのところをお邪魔して、申し訳ありません。", furigana: "おやすみのところをおじゃまして、もうしわけありません。", en: "在您休息之時前來打擾，實在是非常抱歉。" }
      ]
    },
    {
      id: "g11",
      title: "〜だに (光是...就)",
      structure: "動詞原形/名詞 + だに",
      explanation: "書面、文學用語。表示光是做某項心智動作（想像、考慮、聽說等），就會引起強烈的生理或心理反應。意為「光是...就」。",
      examples: [
        { ja: "あの事故のことは、思い出すだに恐ろしいです。", furigana: "あのじこのことは、おもいだすだにおそろしいです。", en: "那起事故的事情，光是回想起來就覺得可怕。" },
        { ja: "このような賞をいただけるとは、夢にだに思いませんでした。", furigana: "このようなしょうをいただけるとは、ゆめにだにおもいませんでした。", en: "能夠獲得這樣的獎項，我連作夢都沒想到。" }
      ]
    },
    {
      id: "g12",
      title: "〜すら (甚至/連)",
      structure: "名詞 + すら",
      explanation: "與「さえ」相似，但偏向書面語口吻，提出一個極端的基本對象以此說明其他更是如此（甚至連...）。",
      examples: [
        { ja: "簡単な漢字すら書けないのに、論文など無理です。", furigana: "かんたんなかんじすらかけないのに、ろんぶんなどむりです。", en: "連簡單的漢字都不會寫，寫論文之類的簡引是不可能。" },
        { ja: "事故の後、彼は立つことすらできませんでした。", furigana: "じこのあと、かれはたつことすらできませんでした。", en: "事故之後，他甚至連站立都無法做到。" }
      ]
    },
    {
      id: "g13",
      title: "〜ならでは (獨特的卓越價值)",
      structure: "名詞 + ならでは / ならではの",
      explanation: "高度讚賞某個對象，表示只有該對象才具備的、無可比擬的卓越特徵。意為「只有...才有的」。",
      examples: [
        { ja: "京都ならではの古い街並みを楽しめます。", furigana: "きょうとならではのふるいまちなみをたのしめます。", en: "可以享受到只有在京都才能體驗到的古老街道風情。" },
        { ja: "一流のシェフならではの美味しい料理です。", furigana: "いちりゅうのしぇふならではのおいしいりょうりです。", en: "這是只有一流廚師才能做出的美味佳餚。" }
      ]
    },
    {
      id: "g14",
      title: "〜ともなると (一旦上升至高階地位)",
      structure: "名詞 + ともなると / ともなれば",
      explanation: "表示一旦處於某個特定的高水準、高身份或高階狀態時，自然會伴隨著相應的卓越表現、標準或環境轉變。",
      examples: [
        { ja: "プロの歌手ともなると、歌声の迫力が違います。", furigana: "ぷろのかしゅともなると、うたごえのはくりょくがちがいます。", en: "一旦成為職業歌手，歌聲的震撼力就截然不同。" },
        { ja: "一流大学ともなれば、入試が非常に難しいです。", furigana: "いちりゅうだいがくともなれば、にゅうしがひじょうにむずかしいです。", en: "一旦到了頂尖大學，入學考試就會非常困難。" }
      ]
    },
    {
      id: "g15",
      title: "〜ずにはすまない (道義上不能不)",
      structure: "動詞ない形(去ない) + ずにはすまない / ざるを得ない",
      explanation: "表示在當前的環境氣氛、社會道德或人情道義上，自己「不能不採取某項行動」，不去做的話事情無法落幕。",
      examples: [
        { ja: "迷惑をかけたのだから、謝らずにはすまないでしょう。", furigana: "めいわくをかけたのだから、あやまらずにはすまないでしょう。", en: "既然給人添了麻煩，就不能不去道歉吧（不道歉說不過去）。" },
        { ja: "事実を知った以上、警察に報告せずにはすまないです。", furigana: "じじつをしったいじょう、けいさつにほうこくせずにはすまないです。", en: "既然已經知道了事實，就不能不向警察報告。" }
      ]
    }
  ]
};

// ----------------------------------------------------
// Main Build Execution
// ----------------------------------------------------

async function buildAllLevels() {
  const levels = [
    { num: 4, name: 'n4' },
    { num: 3, name: 'n3' },
    { num: 2, name: 'n2' },
    { num: 1, name: 'n1' }
  ];

  for (const level of levels) {
    console.log(`\n====================================`);
    console.log(`Processing JLPT ${level.name.toUpperCase()} level...`);
    console.log(`====================================`);
    
    // 1. Fetch vocabulary from wkei/jlpt-vocab-api
    const fetchUrl = `https://jlpt-vocab-api.vercel.app/api/words?level=${level.num}&limit=5000`;
    console.log(`Fetching from ${fetchUrl}...`);
    let rawWords = [];
    try {
      const response = await fetch(fetchUrl);
      const data = await response.json();
      rawWords = data.words || [];
      console.log(`Fetched ${rawWords.length} raw words.`);
    } catch (e) {
      console.error(`Failed to fetch level ${level.name}`, e);
      continue;
    }

    if (rawWords.length === 0) {
      console.error(`No words found for level ${level.name}, skipping.`);
      continue;
    }

    // 2. Batch English-to-Traditional Chinese translation
    console.log(`Translating English meanings to Traditional Chinese...`);
    const batchSize = 60;
    const finalVocabulary = [];
    const verbConjugations = [];

    // Load cache for this level if file exists
    const cacheMap = new Map();
    const chunkPath = path.join(currentDir, `data_${level.name.toLowerCase()}.js`);
    if (fs.existsSync(chunkPath)) {
      try {
        const chunkContent = fs.readFileSync(chunkPath, 'utf8');
        const chunkContext = { window: {} };
        vm.createContext(chunkContext);
        vm.runInContext(chunkContent, chunkContext);
        const chunkLvlData = chunkContext.window.JLPT_DATA_CHUNKS ? chunkContext.window.JLPT_DATA_CHUNKS[level.name.toUpperCase()] : null;
        if (chunkLvlData && chunkLvlData.vocabulary) {
          chunkLvlData.vocabulary.forEach(v => {
            cacheMap.set(`${v.word.trim()}_${v.furigana.trim()}`, v.meaning);
          });
          console.log(`Loaded ${cacheMap.size} cached translations from existing ${level.name.toLowerCase()} chunk.`);
        }
      } catch (e) {
        console.warn(`Could not load cache from ${chunkPath}`, e);
      }
    }

    // Filter duplicates
    const seenWords = new Set();
    const uniqueWords = [];
    for (const w of rawWords) {
      // Clean word
      const cleanWord = w.word.trim();
      if (!cleanWord) continue;
      
      // If furigana is empty, fallback to word
      let cleanFuri = (w.furigana || '').trim();
      if (!cleanFuri) cleanFuri = cleanWord;
      
      const key = `${cleanWord}_${cleanFuri}`;
      if (seenWords.has(key)) continue;
      seenWords.add(key);
      uniqueWords.push({
        word: cleanWord,
        furigana: cleanFuri,
        romaji: w.romaji.trim() || '',
        meaningEn: w.meaning.trim() || '',
        level: level.num
      });
    }

    console.log(`Total unique words: ${uniqueWords.length}`);

    // Process in batches
    for (let i = 0; i < uniqueWords.length; i += batchSize) {
      const batch = uniqueWords.slice(i, i + batchSize);
      console.log(`Processing batch ${Math.floor(i / batchSize) + 1} / ${Math.ceil(uniqueWords.length / batchSize)} (indices ${i} to ${Math.min(i + batchSize, uniqueWords.length) - 1})...`);
      
      // Find which items in the batch need translation
      const needsTranslation = [];
      const translations = new Array(batch.length);
      
      for (let k = 0; k < batch.length; k++) {
        const item = batch[k];
        const cacheKey = `${item.word}_${item.furigana}`;
        if (cacheMap.has(cacheKey)) {
          translations[k] = cacheMap.get(cacheKey);
        } else {
          needsTranslation.push({ index: k, meaningEn: item.meaningEn });
        }
      }
      
      if (needsTranslation.length > 0) {
        console.log(`Translating ${needsTranslation.length} new words in batch...`);
        const meaningsEnToTranslate = needsTranslation.map(x => x.meaningEn);
        let batchTrans = await translateBatch(meaningsEnToTranslate);
        if (!batchTrans) {
          batchTrans = [];
          for (const itemToTrans of needsTranslation) {
            const trans = await translateWord(itemToTrans.meaningEn);
            batchTrans.push(trans);
            await new Promise(res => setTimeout(res, 200));
          }
        }
        // Map back
        for (let t = 0; t < needsTranslation.length; t++) {
          const idx = needsTranslation[t].index;
          translations[idx] = batchTrans[t];
        }
        // Rate limit cooling delay
        await new Promise(res => setTimeout(res, 600));
      }

      // Process translated batch
      for (let k = 0; k < batch.length; k++) {
        const item = batch[k];
        const chineseMeaning = translations[k] || item.meaningEn;
        
        // Categorize word
        const category = classifyWord(item.word, item.furigana, chineseMeaning, item.meaningEn);
        
        // Verb Conjugation
        let conjugations = null;
        let verbMasu = "";
        let verbMasuFuri = "";
        if (category.endsWith('_verbs')) {
          conjugations = conjugateVerb(item.word, item.furigana, chineseMeaning);
          
          // Extract masu form for templates
          const splitMasu = conjugations.masu.split(' (');
          verbMasu = splitMasu[0];
          verbMasuFuri = splitMasu[1].replace(')', '');
        }

        // Generate example sentences
        const examplesObj = getExampleSentence(item.word, item.furigana, chineseMeaning, category, verbMasu, verbMasuFuri);

        const vocabEntry = {
          word: item.word,
          furigana: item.furigana,
          romaji: item.romaji,
          meaning: chineseMeaning,
          category: category,
          exampleJa: examplesObj.ja,
          exampleFurigana: examplesObj.furi,
          exampleEn: examplesObj.ch // Keyed as exampleEn for compatibility
        };

        if (conjugations) {
          vocabEntry.conjugations = conjugations;
          verbConjugations.push({
            dictionary: conjugations.dictionary,
            masu: conjugations.masu,
            te: conjugations.te,
            nai: conjugations.nai,
            meaning: chineseMeaning,
            group: conjugations.group
          });
        }

        finalVocabulary.push(vocabEntry);
      }

      // Rate limit cooling delay
      await new Promise(res => setTimeout(res, 600));
    }

    // 3. Generate Adjective Groups
    console.log(`Generating adjective consolidation groups...`);
    const iAdjectives = [];
    const naAdjectives = [];

    for (const v of finalVocabulary) {
      if (v.category === 'i_adjectives') {
        // Conjugate i-adjective
        let rootK = v.word.endsWith('い') ? v.word.slice(0, -1) : v.word;
        let rootF = v.furigana.endsWith('い') ? v.furigana.slice(0, -1) : v.furigana;
        let negative = `${rootK}くない`;
        let past = `${rootK}かった`;
        if (v.word === 'いい' || v.word === '良い' || v.furigana === 'いい' || v.furigana === 'よい') {
          negative = 'よくない';
          past = 'よかった';
        }
        iAdjectives.push({
          word: `${v.word} (${v.furigana})`,
          meaning: v.meaning,
          negative: negative,
          past: past
        });
      } else if (v.category === 'na_adjectives') {
        naAdjectives.push({
          word: `${v.word} (${v.furigana})`,
          meaning: v.meaning,
          negative: `${v.word}檔案`, // Wait, negative for na-adj:
          negative: `${v.word}ではない`,
          past: `${v.word}でした`
        });
      }
    }

    // Compile level database
    const levelData = {
      kana: kanaData,
      vocabulary: finalVocabulary,
      grammar: grammarDatabases[level.name] || [],
      verbConjugations: verbConjugations,
      adjectiveGroups: {
        iAdjectives: iAdjectives,
        naAdjectives: naAdjectives
      },
      counterTables: counterTablesData,
      demonstratives: demonstrativesData
    };

    const fileContent = `// JLPT ${level.name.toUpperCase()} Learning Database
window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};
window.JLPT_DATA_CHUNKS["${level.name.toUpperCase()}"] = ${JSON.stringify(levelData, null, 2)};
if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${level.name.toUpperCase()}"]; }
`;

    const outputPath = path.join(currentDir, `data_${level.name.toLowerCase()}.js`);
    fs.writeFileSync(outputPath, fileContent, 'utf8');
    console.log(`Successfully written database to ${outputPath}!`);
    console.log(`Words: ${finalVocabulary.length}, Verbs Conjugated: ${verbConjugations.length}, Adjectives: ${iAdjectives.length + naAdjectives.length}`);
  }

  console.log("\nAll JLPT databases N5 to N1 successfully generated!");
}

buildAllLevels().catch(e => {
  console.error("Database building aborted with error:", e);
});
