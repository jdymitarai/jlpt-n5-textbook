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
// Split Candidates Map
// ============================================================
const splitCandidates = {
  // N3
  '小': [
    { meaning: '小、小型', keywords: ['小', '型'], hint: '小' }
  ],
  '刈る': [
    { meaning: '剪（頭髮）', keywords: ['頭', '髮', '理', '剪'], hint: '髪を刈る' },
    { meaning: '割（草）、收穫', keywords: ['草', '割', '稻', '麥', '穀', '收', '穫'], hint: '草を刈る' }
  ],
  '指す': [
    { meaning: '指向、用手指指著', keywords: ['指', '向', '點'], hint: '指す' },
    { meaning: '撐（傘）', keywords: ['傘', '撐', '打'], hint: '傘をさす' }
  ],
  '流す': [
    { meaning: '流、使流動（如淚、血、音樂）', keywords: ['流', '血', '淚', '播', '放'], hint: '涙を流す' },
    { meaning: '漂流、沖走', keywords: ['漂', '沖', '川'], hint: '川に流す' }
  ],
  '閉じる': [
    { meaning: '閉上（眼睛）', keywords: ['眼', '睛', '目'], hint: '目を閉じる' },
    { meaning: '合上（書本）', keywords: ['書', '本', '合'], hint: '本を閉じる' }
  ],
  '皮': [
    { meaning: '皮膚、果皮', keywords: ['皮', '膚', '果'], hint: 'リンゴの皮' },
    { meaning: '皮革', keywords: ['革', '包', '鞋', '帶', '箱'], hint: '皮の財布' }
  ],
  '背': [
    { meaning: '身高、身材', keywords: ['身', '高', '個'], hint: '背が高い' },
    { meaning: '背部、後背', keywords: ['背', '後'], hint: '背中' }
  ],

  // N2
  '芯': [
    { meaning: '核心、中心', keywords: ['心', '核'], hint: 'リンゴの芯' },
    { meaning: '燈芯、筆芯', keywords: ['筆', '燈', '蠟', '燭'], hint: 'シャープペンシルの芯' }
  ],
  '堅い': [
    { meaning: '堅硬、堅定、可靠', keywords: ['硬', '固', '實', '堅'], hint: '堅い約束' },
    { meaning: '古板、嚴肅（文章等）', keywords: ['板', '肅', '文'], hint: '堅い文章' }
  ],
  '爪': [
    { meaning: '指甲', keywords: ['指', '剪'], hint: '爪を切る' },
    { meaning: '爪子', keywords: ['爪', '貓', '狗', '鷹', '鳥'], hint: '猫の爪' }
  ],
  '擦る': [
    { meaning: '摩擦、揉眼', keywords: ['擦', '揉', '磨'], hint: '目を擦る' },
    { meaning: '敲（火柴）、揮霍', keywords: ['火柴', '敲', '花光', '賭'], hint: 'マッチを擦る' }
  ],
  '浮かべる': [
    { meaning: '使漂浮', keywords: ['浮', '漂', '船', '艇'], hint: '船を浮かべる' },
    { meaning: '露出（表情）、想起', keywords: ['表情', '笑', '淚', '臉', '想'], hint: '涙を浮かべる' }
  ],

  // N1
  '咎める': [
    { meaning: '責備、盤問、良心不安', keywords: ['責', '咎', '良心', '怪'], hint: '良心' },
    { meaning: '紅腫、發炎', keywords: ['腫', '炎', '傷'], hint: '傷口' }
  ],
  '跳ねる': [
    { meaning: '跳躍', keywords: ['跳', '躍', '蹦'], hint: '跳ねる' },
    { meaning: '濺出（泥水、油）', keywords: ['濺', '泥', '油', '灑'], hint: '泥が跳ねる' }
  ]
};

// ============================================================
// HTTP GET helper
// ============================================================
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 JLPT-Importer/3.0' }
    };
    const req = https.request(options, (res) => {
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
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
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
// Google Translate for Traditional Chinese & Translation
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
// Tatoeba Query Logic
// ============================================================
async function queryTatoeba(searchTerm, keywords = null) {
  const cacheKey = searchTerm + (keywords ? `|${keywords.join(',')}` : '');
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  const url = `https://tatoeba.org/en/api_v0/search?from=jpn&to=cmn&query=${encodeURIComponent(searchTerm)}`;
  console.log(`    [Tatoeba] Querying API: "${searchTerm}"`);
  try {
    const data = await httpGetWithRetry(url);
    if (data && data.results && data.results.length > 0) {
      const candidates = [];
      for (const item of data.results) {
        let cmnText = null;
        if (Array.isArray(item.translations)) {
          for (const tGroup of item.translations) {
            if (Array.isArray(tGroup)) {
              for (const t of tGroup) {
                if (t.lang === 'cmn' || t.lang === 'zho') {
                  if (t.transcriptions && Array.isArray(t.transcriptions)) {
                    const hant = t.transcriptions.find(tr => tr.script === 'Hant');
                    if (hant) { cmnText = hant.text; break; }
                  }
                  cmnText = t.text;
                  break;
                }
              }
            }
            if (cmnText) break;
          }
        }
        if (cmnText) {
          candidates.push({ ja: item.text, zh: cmnText });
        }
      }

      // Filter by keywords if provided
      let selected = null;
      if (keywords && keywords.length > 0) {
        for (const cand of candidates) {
          const hasKeyword = keywords.some(kw => cand.zh.includes(kw) || cand.ja.includes(kw));
          if (hasKeyword) {
            selected = cand;
            break;
          }
        }
      }

      // Fallback to first candidate if no keyword match
      if (!selected && candidates.length > 0) {
        selected = candidates[0];
      }

      if (selected) {
        // Convert to traditional Chinese
        selected.zh = await ensureTraditional(selected.zh);
        console.log(`    [Tatoeba] Found sentence: "${selected.ja}" -> "${selected.zh}"`);
        cache[cacheKey] = selected;
        saveCache();
        await sleep(800); // polite delay after api query
        return selected;
      }
    }
  } catch (e) {
    console.warn(`    [Tatoeba] Error querying Tatoeba: ${e.message}`);
  }

  await sleep(800);
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
  const psychKeywords = ['情緒', '喜怒哀樂', '焦慮', '恐懼', '嫉妒', '愛恨', '思考', '意識', '記憶', '夢境', '直覺', '潛意識', '性格', '特質', '誠實', '貪婪', '溫柔', '怪癖', '心理'];
  if (psychKeywords.some(kw => m.includes(kw))) {
    return 'psychology_character';
  }

  if (originalCategory.startsWith('food_')) {
    return 'food_culture';
  }
  const foodKeywords = ['食材', '肉', '海鮮', '蔬果', '水果', '蔬菜', '調味', '烹飪', '煮', '炒', '煎', '炸', '餐飲', '料理', '甜點', '酒', '飲料', '速食', '刀具', '鍋具', '餐具', '吃', '喝', '餐廳', '居酒屋'];
  if (foodKeywords.some(kw => m.includes(kw))) {
    return 'food_culture';
  }

  if (originalCategory === 'clothing' || originalCategory === 'daily_items') {
    return 'fashion_beauty';
  }
  const fashionKeywords = ['衣服', '上衣', '褲裙', '鞋襪', '內衣', '包包', '首飾', '化妝', '彩妝', '保養品', '香水', '髮型', '美甲', '牙刷', '洗面乳', '肥皂'];
  if (fashionKeywords.some(kw => m.includes(kw))) {
    return 'fashion_beauty';
  }

  if (originalCategory === 'daily_furniture') {
    return 'housing_space';
  }
  const housingKeywords = ['建築', '格局', '玄關', '客廳', '臥室', '家具', '桌椅', '床鋪', '冷氣', '空調', '冰箱', '智慧家居', '公共設施', '家飾', '門', '窗', '大樓', '房', '室'];
  if (housingKeywords.some(kw => m.includes(kw))) {
    return 'housing_space';
  }

  if (originalCategory === 'transportation') {
    return 'transport_mobility';
  }
  const transportKeywords = ['交通', '汽機車', '車', '火車', '鐵路', '捷運', '地鐵', '飛機', '船舶', '火箭', '基礎設施', '道路', '路', '橋梁', '橋', '港口', '車站', '紅綠燈', '航線', '軌道'];
  if (transportKeywords.some(kw => m.includes(kw))) {
    return 'transport_mobility';
  }

  if (originalCategory === 'leisure_sports') {
    return 'leisure_sports';
  }
  const leisureKeywords = ['藝文', '娛樂', '電影', '音樂', '動漫', '遊戲', '玩具', '賭博', '體育', '運動', '球類', '田徑', '健身', '賽事', '休閒', '散步', '旅行', '渡假', '相機', '照片', '鋼琴', '吉他'];
  if (leisureKeywords.some(kw => m.includes(kw))) {
    return 'leisure_sports';
  }

  const astronomyKeywords = ['天體', '恆星', '行星', '黑洞', '星系', '太空', '天氣', '氣候', '風雨雷電', '風', '雨', '雷', '電', '颱風', '氣壓', '溫室效應', '時間', '曆法', '相對時間', '昨日', '今日', '明日', '星期', '月', '年', '季', '節氣', '時差', '永恆'];
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

  const bioKeywords = ['生物', '動物', '哺乳', '鳥', '昆蟲', '深海生物', '絕種生物', '植物', '花', '草', '樹', '蕈', '藻', '微生物', '細菌', '病毒', '真菌', '細胞', '基因', '光合作用'];
  if (bioKeywords.some(kw => m.includes(kw))) {
    return 'biological_world';
  }

  if (originalCategory === 'family_people' || originalCategory === 'greetings') {
    return 'relations_human';
  }
  const relationsKeywords = ['血緣', '親屬', '父母', '祖先', '家族', '關係', '人際', '朋友', '同伴', '仇人', '恩人', '鄰居', '問候', '寒暄', '客套'];
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
  const cultureKeywords = ['精神文明', '文化', '傳承', '宗教', '神', '天堂', '地獄', '命理', '禁忌', '學術', '教育', '學校', '哲學', '歷史', '文學', '資訊', '通訊', '網路', '社群', '5G', 'AI', '程式', '軟體', '硬體', '科學'];
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

// ============================================================
// Main Execution
// ============================================================
async function main() {
  console.log("=== Starting Batch Import for N3, N2, and N1 ===");

  const kuro = new Kuroshiro();
  await kuro.init(new KuromojiAnalyzer());
  console.log("Kuroshiro initialized.\n");

  const candidatesData = JSON.parse(fs.readFileSync(path.join(projectDir, 'scratch', 'parsed_candidates.json'), 'utf8'));

  const levels = ['N3', 'N2', 'N1'];

  for (const level of levels) {
    console.log(`\n========================================`);
    console.log(`Processing Level: ${level}`);
    console.log(`========================================`);

    const candidates = candidatesData[level];
    const vocabularyList = [];
    const dupCheck = new Set();

    for (let i = 0; i < candidates.length; i++) {
      const c = candidates[i];
      const wordClean = c.word.trim();
      const readClean = c.reading.trim();

      // Skip exact duplicates
      const dupKey = `${wordClean}|${readClean}|${c.meaning.trim()}`;
      if (dupCheck.has(dupKey)) {
        console.log(`  [Skip] Duplicate entry: ${c.word} (${c.reading})`);
        continue;
      }
      dupCheck.add(dupKey);

      console.log(`\n[${i + 1}/${candidates.length}] "${c.word}" (${c.reading})`);

      // Check if it is a split candidate
      const isSplit = splitCandidates[wordClean];
      const itemsToImport = [];

      if (isSplit) {
        console.log(`  [Split] Target word has ${isSplit.length} distinct meanings.`);
        for (const sub of isSplit) {
          itemsToImport.push({
            word: wordClean,
            reading: readClean,
            meaning: sub.meaning,
            keywords: sub.keywords,
            hint: sub.hint,
            category: c.category
          });
        }
      } else {
        itemsToImport.push({
          word: wordClean,
          reading: readClean,
          meaning: c.meaning,
          keywords: null,
          hint: wordClean,
          category: c.category
        });
      }

      for (const item of itemsToImport) {
        console.log(`  -> Processing usage: "${item.meaning}"`);
        let exJa = '';
        let exZh = '';
        let exFuri = '';

        // Query Tatoeba
        const sentence = await queryTatoeba(item.hint, item.keywords);
        if (sentence) {
          exJa = sentence.ja;
          exZh = sentence.zh;
        } else {
          // Fallback sentence
          exJa = `${item.word}は大切な言葉です。`;
          exZh = `${item.meaning}是一個重要的詞彙。`;
          console.log(`    ⚠ [Fallback] Used default sentence template.`);
        }

        // Generate example furigana
        try {
          exFuri = await kuro.convert(exJa, { to: 'hiragana' });
        } catch (err) {
          console.warn(`    [Furigana] Error: ${err.message}`);
          exFuri = exJa;
        }

        // Category mapping
        const targetCategory = mapToNewCategory(item.word, item.reading, item.meaning, item.category);

        const entry = {
          word: item.word,
          furigana: item.reading,
          romaji: kanaToRomaji(item.reading),
          meaning: item.meaning,
          category: targetCategory,
          exampleJa: exJa,
          exampleFurigana: exFuri,
          exampleEn: exZh,
          level: level
        };

        // Verb Conjugation
        const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(item.word.slice(-1)) || item.word.endsWith('する');
        const isNounOnly = ['中','指','皮','背','爪'].includes(item.word); // exclude specific body parts/words
        if (isVerb && !isNounOnly) {
          entry.conjugations = conjugateVerb(item.word, item.reading, item.meaning);
          console.log(`    [Verb] Group: ${entry.conjugations.group}`);
        }

        vocabularyList.push(entry);
      }
    }

    // Rebuild verbConjugations and adjectiveGroups for this level
    const verbConjugations = [];
    const adjectiveGroups = { iAdjectives: [], naAdjectives: [] };

    vocabularyList.forEach(v => {
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
      } else if (v.category === 'properties_relations' && (v.meaning.includes('的') || v.meaning.includes('之'))) {
        adjectiveGroups.naAdjectives.push({
          word: `${v.word} (${v.furigana})`,
          meaning: v.meaning,
          negative: `${v.word}ではない`,
          past: `${v.word}でした`
        });
      }
    });

    const levelKey = level.toUpperCase();
    const chunk = {
      vocabulary: vocabularyList,
      verbConjugations: verbConjugations,
      adjectiveGroups: adjectiveGroups
    };

    // Save level file
    const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${levelKey}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${levelKey}"]; }`;
    const lvlFileName = `data_${level.toLowerCase()}.js`;
    
    fs.writeFileSync(path.join(projectDir, lvlFileName), outputString, 'utf8');
    fs.writeFileSync(path.join(publicDir, lvlFileName), outputString, 'utf8');

    console.log(`\nSuccessfully wrote ${vocabularyList.length} entries for Level ${levelKey}!`);
    console.log(`Conjugated verbs: ${verbConjugations.length}`);
    console.log(`i-Adjectives: ${adjectiveGroups.iAdjectives.length}`);
    console.log(`na-Adjectives: ${adjectiveGroups.naAdjectives.length}`);
  }

  // ============================================================
  // Bump index.html version
  // ============================================================
  console.log("\nBumping index.html cache version...");
  const htmlPath = path.join(projectDir, 'index.html');
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

  console.log("\nBatch import complete! Ready for sync to R2.");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
