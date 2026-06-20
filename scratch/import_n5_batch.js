const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');

// ============================================================
// Cache Setup
// ============================================================
const cachePath = path.join(projectDir, 'scratch', 'tatoeba_cache.json');
let cache = {};
if (fs.existsSync(cachePath)) {
  try {
    cache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (e) {
    console.error("Error reading cache file:", e.message);
  }
}

function saveCache() {
  fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
}

// ============================================================
// HTTP GET helper
// ============================================================
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'Mozilla/5.0 JLPT-Importer/3.0' }
    };
    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return httpGet(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        let body = '';
        res.on('data', c => body += c);
        res.on('end', () => reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`)));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function httpGetWithRetry(url, retries = 3, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await httpGet(url);
    } catch (e) {
      if (i === retries - 1) throw e;
      console.warn(`    [HTTP] Failed: ${e.message}. Retrying in ${delay}ms...`);
      await sleep(delay);
      delay *= 2;
    }
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// Google Translate for Traditional Chinese
// ============================================================
async function ensureTraditional(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=zh-TW&dt=t&q=${encodeURIComponent(text)}`;
    const res = await httpGetWithRetry(url);
    if (res && res[0]) {
      return res[0].map(x => x[0]).join('').trim();
    }
  } catch (e) {
    console.warn(`    [Translate] Failed to convert to Traditional: ${e.message}`);
  }
  return text;
}

// ============================================================
// Token-Based strict verification helper
// ============================================================
function toKatakana(src) {
  return src.replace(/[\u3041-\u3096]/g, m => String.fromCharCode(m.charCodeAt(0) + 0x60));
}

function verifySentenceTokens(word, furigana, sentenceJa, kuro) {
  if (!sentenceJa) return false;

  const analyzer = kuro._analyzer || kuro.analyzer;
  const rawTokenizer = analyzer && analyzer._analyzer;
  if (!rawTokenizer || typeof rawTokenizer.tokenize !== 'function') {
    // Fallback if tokenizer is not available
    return sentenceJa.includes(word) || sentenceJa.includes(furigana);
  }

  const tokens = rawTokenizer.tokenize(sentenceJa);
  const w = word.trim();
  const f = furigana.trim();
  
  const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(w.slice(-1)) || w.endsWith('する');
  
  if (isVerb) {
    const hasVerbToken = tokens.some(t => {
      if (t.pos.includes('動詞')) {
        if (t.basic_form === w || t.basic_form === f) return true;
        if (t.surface_form === w) return true;
      }
      return false;
    });
    if (hasVerbToken) return true;
  }
  
  const isAdj = w.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(w);
  if (isAdj) {
    const hasAdjToken = tokens.some(t => {
      if (t.pos.includes('形容詞')) {
        if (t.basic_form === w || t.basic_form === f) return true;
      }
      return false;
    });
    if (hasAdjToken) return true;
  }

  const hasToken = tokens.some(t => {
    if (t.surface_form === w || t.basic_form === w) return true;
    
    const readingKatakana = t.reading;
    const wordKatakana = toKatakana(f);
    if (readingKatakana === wordKatakana) {
      if (t.pos.includes('動詞') && !isVerb) return false;
      return true;
    }
    return false;
  });

  if (hasToken) return true;

  const cleanJa = sentenceJa.replace(/[\s\。\,\.\?\！\！\?\「\」\『\』]/g, '');
  if (cleanJa.includes(w)) {
    const matchedToken = tokens.find(t => t.surface_form.includes(w));
    if (matchedToken) {
      if (matchedToken.surface_form === w) return true;
      if (isVerb || isAdj) return true;
      return false; 
    }
    return true;
  }

  return false;
}

// ============================================================
// Tatoeba v1 Query Logic with token-based verification
// ============================================================
async function queryTatoebaV1(word, furigana, kuro, keywords = null) {
  const cacheKey = word + (keywords ? `|${keywords.join(',')}` : '');
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=cmn&q=${encodeURIComponent(word)}&sort=relevance&limit=15`;
  console.log(`    [Tatoeba] Querying v1 API: "${word}"`);
  try {
    const res = await httpGetWithRetry(url);
    if (res && res.data && res.data.length > 0) {
      const candidates = [];
      for (const item of res.data) {
        let cmnText = null;
        if (item.translations && item.translations.length > 0) {
          const t = item.translations.find(trans => trans.lang === 'cmn' || trans.lang === 'zho');
          if (t) {
            cmnText = t.text;
          }
        }
        if (cmnText) {
          // Token-based verification
          const isCorrect = verifySentenceTokens(word, furigana, item.text, kuro);
          if (isCorrect) {
            candidates.push({ ja: item.text, zh: cmnText });
          } else {
            console.log(`      [Skip] Sentence failed verification: "${item.text}" (for word "${word}" [${furigana}])`);
          }
        }
      }

      // Selection Heuristics out of verified candidates
      let selected = null;

      // 1. If keywords are provided, find matching translation/sentence
      if (keywords && keywords.length > 0) {
        for (const cand of candidates) {
          const matches = keywords.some(kw => cand.zh.includes(kw) || cand.ja.includes(kw));
          if (matches) {
            selected = cand;
            break;
          }
        }
      }

      // 2. Score candidates based on sentence length and exact match
      if (!selected && candidates.length > 0) {
        let bestScore = -999;
        for (const cand of candidates) {
          let score = 0;
          const len = cand.ja.length;
          // Prefer length 8 to 28
          if (len >= 8 && len <= 28) score += 15;
          else if (len >= 5 && len <= 35) score += 5;
          else score -= 10;

          // Exact word match in Japanese
          if (cand.ja.includes(word)) score += 20;

          if (score > bestScore) {
            bestScore = score;
            selected = cand;
          }
        }
      }

      if (selected) {
        // Convert translation to traditional Chinese
        selected.zh = await ensureTraditional(selected.zh);
        
        // Generate furigana for the selected sentence
        const selectedFuri = await kuro.convert(selected.ja, { to: 'hiragana' });
        
        console.log(`    [Tatoeba] Selected sentence: "${selected.ja}" -> "${selected.zh}"`);
        cache[cacheKey] = { ja: selected.ja, zh: selected.zh, furi: selectedFuri };
        saveCache();
        await sleep(600); // polite delay after api query
        return cache[cacheKey];
      }
    }
  } catch (e) {
    console.warn(`    [Tatoeba] Error querying Tatoeba: ${e.message}`);
  }

  await sleep(600);
  return null;
}

// ============================================================
// Romaji conversion helpers
// ============================================================
function katakanaToHiragana(src) {
  return src.replace(/[\u30a1-\u30f6]/g, m => String.fromCharCode(m.charCodeAt(0) - 0x60))
            .replace(/ー/g, '');
}

const romajiMap = {
  'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
  'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
  'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no','は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
  'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo',
  'ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro','わ':'wa','を':'o','ん':'n',
  'が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
  'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo',
  'ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po'
};

const comboMap = {
  'きゃ':'kya','きゅ':'kyu','きょ':'kyo','しゃ':'sha','しゅ':'shu','しょ':'sho',
  'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
  'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
  'りゃ':'rya','りゅ':'ryu','りょ':'ryo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
  'じゃ':'ja','じゅ':'ju','じょ':'jo','びゃ':'bya','びゅ':'byu','びょ':'byo',
  'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo'
};

function kanaToRomaji(str) {
  str = katakanaToHiragana(str);
  let r = '', i = 0;
  while (i < str.length) {
    const c = str[i], n = str[i+1];
    if (n && comboMap[c+n]) { r += comboMap[c+n]; i += 2; }
    else if (c === 'っ' && n) { const nr = romajiMap[n]||''; if (nr) r += nr[0]; i++; }
    else { r += romajiMap[c] || c; i++; }
  }
  return r;
}

// ============================================================
// Category Mapping
// ============================================================
const wordOverrides = {
  'はい': { category: 'relations_human', meaning: '是 / 對的' },
  'インク': { category: 'properties_relations' },
  'デパート': { category: 'housing_space' },
  '公務員': { category: 'economy_business' },
  '看護婦': { category: 'health_medical' },
  '教師': { category: 'culture_thought' },
  '醫師': { category: 'health_medical' },
  '医師': { category: 'health_medical' },
  '患者': { category: 'health_medical' },
  '病院': { category: 'health_medical' },
  '薬': { category: 'health_medical' },
  '藥': { category: 'health_medical' },
  '病室': { category: 'health_medical' },
  '包帯': { category: 'health_medical' }
};

function mapToNewCategory(word, furigana, meaning, originalCategory) {
  const w = word.trim();
  const f = furigana.trim();
  const m = meaning.trim();

  if (wordOverrides[w]) return wordOverrides[w].category;
  if (wordOverrides[f]) return wordOverrides[f].category;

  if (originalCategory.startsWith('medical_') || originalCategory.startsWith('nursing_')) {
    return 'health_medical';
  }
  const medicalKeywords = ['疾病', '感冒', '癌症', '過敏', '骨折', '傷', '痛', '發燒', '咳嗽', '嘔吐', '眩暈', '水腫', '手術', '藥', '醫療', '醫生', '護士', '護理', '照護', '病歷', '診斷', '體溫計', '血壓'];
  if (medicalKeywords.some(kw => m.includes(kw))) {
    return 'health_medical';
  }

  if (originalCategory === 'anatomy_external' || originalCategory === 'anatomy_internal' || originalCategory === 'body_parts') {
    return 'body_physiology';
  }
  const physiologyKeywords = ['身體', '內臟', '骨骼', '五官', '眼睛', '耳朵', '鼻子', '嘴巴', '牙齒', '毛髮', '基因', '呼吸', '代謝', '睡眠', '分泌物', '生育', '動作', '姿態', '站立', '奔跑', '手勢', '發聲'];
  if (physiologyKeywords.some(kw => m.includes(kw))) {
    return 'body_physiology';
  }

  if (originalCategory === 'mental_emotion') {
    return 'psychology_character';
  }
  const psychKeywords = ['情緒', '喜怒哀樂', '焦慮', '恐懼', '機警', '愛恨', '思考', '意識', '記憶', '夢境', '直覺', '潛意識', '性格', '特質', '誠實', '溫柔', '怪癖', '心理'];
  if (psychKeywords.some(kw => m.includes(kw))) {
    return 'psychology_character';
  }

  if (originalCategory.startsWith('food_')) {
    return 'food_culture';
  }
  const foodKeywords = ['食材', '肉', '海鮮', '蔬果', '水果', '蔬菜', '調味', '烹飪', '煮', '炒', '煎', '炸', '餐飲', '料理', '甜點', '酒', '飲料', '速食', '刀具', '鍋具', '餐具', '吃', '喝', '餐廳', '居酒屋', '飯', '麵', '綠茶', '酒', '牛奶', '便當', '麵包', '晚餐', '午餐', '早餐'];
  if (foodKeywords.some(kw => m.includes(kw))) {
    return 'food_culture';
  }

  if (originalCategory === 'clothing' || originalCategory === 'daily_items') {
    return 'fashion_beauty';
  }
  const fashionKeywords = ['衣服', '上衣', '褲裙', '鞋襪', '內衣', '包包', '首飾', '化妝', '彩妝', '保養品', '香水', '髮型', '美甲', '牙刷', '洗面乳', '肥皂', '鞋子'];
  if (fashionKeywords.some(kw => m.includes(kw))) {
    return 'fashion_beauty';
  }

  if (originalCategory === 'daily_furniture') {
    return 'housing_space';
  }
  const housingKeywords = ['建築', '格局', '玄關', '客廳', '臥室', '家具', '桌椅', '床鋪', '冷氣', '空調', '冰箱', '智慧家居', '公共設施', '家飾', '門', '窗', '大樓', '房', '室', '桌子', '椅子', '房間', '房子', '家'];
  if (housingKeywords.some(kw => m.includes(kw))) {
    return 'housing_space';
  }

  if (originalCategory === 'transportation') {
    return 'transport_mobility';
  }
  const transportKeywords = ['交通', '汽機車', '車', '火車', '鐵路', '捷運', '地鐵', '飛機', '船舶', '火箭', '基礎設施', '道路', '路', '橋梁', '橋', '港口', '車站', '紅綠燈', '航線', '軌道', '切符', '車票'];
  if (transportKeywords.some(kw => m.includes(kw))) {
    return 'transport_mobility';
  }

  if (originalCategory === 'leisure_sports') {
    return 'leisure_sports';
  }
  const leisureKeywords = ['藝文', '娛樂', '電影', '音樂', '動漫', '遊戲', '玩具', '賭博', '體育', '運動', '球類', '田徑', '健身', '賽事', '休閒', '散步', '旅行', '約會', '唱歌', '玩耍', '節日', '慶典'];
  if (leisureKeywords.some(kw => m.includes(kw))) {
    return 'leisure_sports';
  }

  const astronomyKeywords = ['天體', '恆星', '行星', '黑洞', '星系', '太空', '天氣', '氣候', '風雨雷電', '風', '雨', '雷', '電', '颱風', '氣壓', '溫室效應', '時間', '曆法', '相對時間', '昨日', '今日', '明日', '星期', '月', '年', '季', '節氣', '時差', '永恆', '今天', '明天', '昨天', '每日', '每天', '早上', '晚上', '夜', '朝', '月', '十二月', '七時', '分', '半', '每週'];
  if (astronomyKeywords.some(kw => m.includes(kw))) {
    return 'astronomy_meteorology';
  }

  if (originalCategory === 'env_disaster') {
    return 'geography_ecology';
  }
  const geographyKeywords = ['地理', '地形', '地貌', '海洋', '海', '河流', '川', '山脈', '山', '沙漠', '火山', '地震', '災害', '環境', '礦物', '金銀銅鐵', '金', '銀', '銅', '鐵', '寶石', '土壤', '元素'];
  if (geographyKeywords.some(kw => m.includes(kw))) {
    return 'geography_ecology';
  }

  const bioKeywords = ['生物', '動物', '哺乳', '鳥', '昆蟲', '深海生物', '絕種生物', '植物', '花', '草', '樹', '蕈', '藻', '微生物', '細菌', '病毒', '真菌', '細胞', '基因', '光合作用', '雞蛋', '魚'];
  if (bioKeywords.some(kw => m.includes(kw))) {
    return 'biological_world';
  }

  if (originalCategory === 'family_people' || originalCategory === 'greetings') {
    return 'relations_human';
  }
  const relationsKeywords = ['血緣', '親屬', '父母', '祖先', '家族', '關係', '人際', '朋友', '同伴', '仇人', '恩人', '鄰居', '問候', '寒暄', '客套', '學生', '先生', '老師', '醫生', '爸爸', '媽媽', '哥哥', '姐姐', '弟弟', '妹妹', '令尊', '令堂', '父親', '母親', '男孩', '女孩', '兒童', '小孩', '人', '上班族', '留學生', '早安', '你好', '晚安', '再見', '謝謝', '感謝', '不好意思', '對不起', '拜託', '是', '對', '不', '不是', '沒關係', '知道了', '明白', '打擾', '告辭', '款待', '吃飽'];
  if (relationsKeywords.some(kw => m.includes(kw))) {
    return 'relations_human';
  }

  const lawKeywords = ['國家', '政治', '政府', '政黨', '選舉', '外交', '戰爭', '法律', '犯罪', '憲法', '刑法', '警察', '監獄', '審判', '盜竊', '小偷', '法律'];
  if (lawKeywords.some(kw => m.includes(kw))) {
    return 'society_politics_law';
  }

  if (originalCategory === 'work_business') {
    return 'economy_business';
  }
  const economyKeywords = ['經濟', '商業', '金融', '貨幣', '錢', '金錢', '銀行', '股票', '保險', '稅', '通貨膨脹', '求職', '履歷', '面試', '退休', '薪水', '公司', '上班', '加班', '職稱', '產業'];
  if (economyKeywords.some(kw => m.includes(kw))) {
    return 'economy_business';
  }

  if (originalCategory === 'arts_culture' || originalCategory === 'school_education' || originalCategory === 'science_tech') {
    return 'culture_thought';
  }
  const cultureKeywords = ['精神文明', '文化', '傳承', '宗教', '神', '天堂', '地獄', '命理', '禁忌', '學術', '教育', '學校', '圖書館', '書店', '哲學', '歷史', '文學', '資訊', '通訊', '網路', '社群', '5G', 'AI', '程式', '軟體', '硬體', '科學', '字典', '辭書'];
  if (cultureKeywords.some(kw => m.includes(kw))) {
    return 'culture_thought';
  }

  const mathKeywords = ['數學', '加減乘除', '幾何', '概率', '無限', '度量衡', '重量', '長度', '面積', '容量', '密度', '數字', '數理', '數量', '量詞', '個' , '張', '台', '倍', '半'];
  if (mathKeywords.some(kw => m.includes(kw))) {
    return 'math_quantity';
  }

  if (originalCategory === 'i_adjectives' || originalCategory === 'na_adjectives' || originalCategory === 'adverbs_conjunctions' || originalCategory === 'abstract_logic') {
    return 'properties_relations';
  }

  if (originalCategory.endsWith('_verbs')) {
    return 'properties_relations';
  }

  return 'properties_relations';
}

// ============================================================
// Verb Conjugation
// ============================================================
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

// Known N5 Verbs in the batch
const n5Verbs = [
  '食べる', '飲む', '行く', '来る', '見る', '聞く', '話す', '書く', '読む', '買う', 
  '勉強する', '起きる', '寝る', '帰る', '会う', '待つ', '言う', '泳ぐ', '歌う', 
  '走る', '歩く', '作る', '乗る', '教える', '忘れる'
];

const n5NaAdjectives = ['静か', '賑やか', '親切', '暇'];

// ============================================================
// Main Execution
// ============================================================
async function main() {
  console.log("=== Starting Batch Import for N5 (150 words) ===");

  const kuro = new Kuroshiro();
  await kuro.init(new KuromojiAnalyzer());
  console.log("Kuroshiro initialized.\n");

  // Load batch words
  const batchPath = path.join(projectDir, 'scratch', 'n5_missing_batch.json');
  if (!fs.existsSync(batchPath)) {
    console.error("Batch file not found: n5_missing_batch.json");
    process.exit(1);
  }
  const batchWords = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

  // Load current N5 database
  const currentPath = path.join(projectDir, 'data_n5.js');
  let chunk = { vocabulary: [], verbConjugations: [], adjectiveGroups: { iAdjectives: [], naAdjectives: [] } };
  if (fs.existsSync(currentPath)) {
    const currentContent = fs.readFileSync(currentPath, 'utf8');
    const currentContext = { window: {} };
    vm.createContext(currentContext);
    vm.runInContext(currentContent, currentContext);
    chunk = currentContext.window.JLPT_DATA_CHUNKS.N5;
  }

  const existingWords = new Set(chunk.vocabulary.map(v => v.word.trim()));

  for (let i = 0; i < batchWords.length; i++) {
    const item = batchWords[i];
    
    // Correct swapped word/furigana fields in metadata if present
    const hasKanji = (str) => /[\u4e00-\u9faf]/.test(str);
    if (hasKanji(item.furigana) && !hasKanji(item.word)) {
      const temp = item.word;
      item.word = item.furigana;
      item.furigana = temp;
    }

    const wordClean = item.word.trim();
    const readClean = item.furigana.trim();

    if (existingWords.has(wordClean)) {
      console.log(`[${i+1}/${batchWords.length}] Skip duplicate: "${wordClean}"`);
      continue;
    }

    console.log(`\n[${i+1}/${batchWords.length}] Processing: "${wordClean}" (${readClean})`);

    // Category mapping
    const targetCategory = mapToNewCategory(wordClean, readClean, item.meaning, item.category);

    // Query Tatoeba v1 with strict verification
    let sentence = await queryTatoebaV1(wordClean, readClean, kuro);
    let exJa = '';
    let exZh = '';
    let exFuri = '';

    if (sentence) {
      exJa = sentence.ja;
      exZh = sentence.zh;
      exFuri = sentence.furi;
    } else {
      // Fallback sentence if none found
      exJa = `${wordClean}は大切な言葉です。`;
      exZh = `${item.meaning}是一個重要的詞彙。`;
      console.log(`    ⚠ [Fallback] Used default sentence template.`);
      
      try {
        exFuri = await kuro.convert(exJa, { to: 'hiragana' });
      } catch (err) {
        exFuri = exJa;
      }
    }

    const entry = {
      word: wordClean,
      furigana: readClean,
      romaji: kanaToRomaji(readClean),
      meaning: item.meaning,
      category: targetCategory,
      exampleJa: exJa,
      exampleFurigana: exFuri,
      exampleEn: exZh,
      level: 'N5'
    };

    // Conjugation if it's a verb
    const isVerb = n5Verbs.includes(wordClean) || wordClean.endsWith('する');
    if (isVerb) {
      entry.conjugations = conjugateVerb(wordClean, readClean, item.meaning);
      console.log(`    [Verb] Generated conjugations: group ${entry.conjugations.group}`);
    }

    chunk.vocabulary.push(entry);
  }

  // ============================================================
  // Rebuild verbConjugations and adjectiveGroups for N5
  // ============================================================
  console.log("\nRebuilding verbConjugations and adjectiveGroups...");
  const verbConjugations = [];
  const adjectiveGroups = { iAdjectives: [], naAdjectives: [] };

  chunk.vocabulary.forEach(v => {
    if (v.conjugations) {
      verbConjugations.push({
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
      adjectiveGroups.iAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: negative,
        past: past
      });
    } else if (v.category === 'properties_relations' && (n5NaAdjectives.includes(v.word) || v.meaning.includes('的') || v.meaning.includes('之'))) {
      adjectiveGroups.naAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: `${v.word}ではない`,
        past: `${v.word}でした`
      });
    }
  });

  chunk.verbConjugations = verbConjugations;
  chunk.adjectiveGroups = adjectiveGroups;

  // Save updated database
  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
  
  fs.writeFileSync(path.join(projectDir, 'data_n5.js'), outputString, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'data_n5.js'), outputString, 'utf8');

  console.log(`\nSuccessfully updated data_n5.js with ${chunk.vocabulary.length} entries!`);
  console.log(`Conjugated verbs: ${verbConjugations.length}`);
  console.log(`i-Adjectives: ${adjectiveGroups.iAdjectives.length}`);
  console.log(`na-Adjectives: ${adjectiveGroups.naAdjectives.length}`);

  // ============================================================
  // Bump cache version in index.html
  // ============================================================
  console.log("\nBumping index.html cache version...");
  const htmlPath = path.join(projectDir, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const versionMatch = htmlContent.match(/window\.JLPT_VERSION = "(\d+)"/);
    if (versionMatch) {
      const oldVer = parseInt(versionMatch[1], 10);
      const newVer = oldVer + 1;
      console.log(`Version bumped: ${oldVer} -> ${newVer}`);
      htmlContent = htmlContent.replace(/window\.JLPT_VERSION = "\d+"/, `window.JLPT_VERSION = "${newVer}"`);
      htmlContent = htmlContent.replace(/href="styles\.css\?v=\d+"/, `href="styles.css?v=${newVer}"`);
      htmlContent = htmlContent.replace(/src="data\.js\?v=\d+"/, `src="data.js?v=${newVer}"`);
      htmlContent = htmlContent.replace(/src="app\.js\?v=\d+"/, `src="app.js?v=${newVer}"`);
      
      fs.writeFileSync(htmlPath, htmlContent, 'utf8');
      fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent, 'utf8');
    }
  }

  console.log("\nBatch N5 import complete!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
