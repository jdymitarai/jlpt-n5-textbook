const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');
const zlib = require('zlib');

const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');
const brainScratchDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch';

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
      headers: { 'User-Agent': 'Mozilla/5.0 JLPT-Importer/4.0' }
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
async function translateToTraditional(text, fromLang = 'ja') {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=zh-TW&dt=t&q=${encodeURIComponent(text)}`;
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

function verifySentenceTokens(word, furigana, sentenceJa, tokenizer) {
  if (!sentenceJa) return false;

  const w = word.trim();
  const f = furigana.trim();
  const fKatakana = toKatakana(f);

  const cleanJa = sentenceJa.replace(/[\s\。\,\.\?\！\！\?\「\」\『\』]/g, '');
  if (cleanJa.includes('言葉です') || cleanJa.includes('表現です') || cleanJa.includes('言葉である') || cleanJa.includes('表現である')) {
    return false;
  }

  const tokens = tokenizer.tokenize(sentenceJa);
  
  const isWordVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(w.slice(-1)) || w.endsWith('する');
  const isWordAdj = w.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(w);

  if (w === '頂' && (sentenceJa.includes('いただきます') || sentenceJa.includes('頂く') || sentenceJa.includes('いただきま'))) {
    return false;
  }

  for (let t of tokens) {
    const tReading = toKatakana(t.reading || '');
    if (t.surface_form === w || t.basic_form === w || (w === 'けが' && (t.basic_form === 'けがす' || t.basic_form === 'けがする' || t.surface_form.startsWith('けが')))) {
      if (tReading && !isWordVerb && !isWordAdj && w !== 'けが') {
        if (tReading !== fKatakana) {
          continue;
        }
      }
      if (t.pos.includes('動詞') && !isWordVerb && w !== 'けが') {
        if (t.basic_form !== w) {
          continue;
        }
      }
      return true;
    }
    if (tReading === fKatakana) {
      if (t.pos.includes('動詞') && !isWordVerb) {
        continue;
      }
      if (t.pos.includes('形容詞') && !isWordAdj) {
        continue;
      }
      return true;
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    let combinedSurface = '';
    let combinedReading = '';
    for (let j = i; j < tokens.length; j++) {
      combinedSurface += tokens[j].surface_form;
      combinedReading += tokens[j].reading || '';
      const combinedReadingKatakana = toKatakana(combinedReading);

      if (!isWordVerb && !isWordAdj) {
        if (combinedSurface === w || (w === 'けが' && combinedSurface.startsWith('けが'))) {
          if (combinedReading && toKatakana(combinedReading) !== fKatakana && w !== 'けが') {
            continue;
          }
          if (i === j) {
            const tok = tokens[i];
            if (tok.pos.includes('動詞') && !isWordVerb && w !== 'けが') {
              continue;
            }
            if (tok.pos.includes('形容詞') && !isWordAdj) {
              continue;
            }
          }
          return true;
        }
        if (combinedReadingKatakana === fKatakana) {
          if (i === j) {
            const tok = tokens[i];
            if (tok.pos.includes('動詞') && !isWordVerb) {
              continue;
            }
            if (tok.pos.includes('形容詞') && !isWordAdj) {
              continue;
            }
          }
          return true;
        }
      } else {
        if (combinedSurface.includes(w) && combinedReadingKatakana.includes(fKatakana)) {
          if (i === j) {
            const tok = tokens[i];
            const isVerbOrAdj = tok.pos.includes('動詞') || tok.pos.includes('形容詞');
            if (!isVerbOrAdj && tok.surface_form !== w) {
              continue;
            }
          }
          return true;
        }
      }
    }
  }

  if (isWordVerb) {
    const hasVerb = tokens.some(t => {
      if (t.pos.includes('動詞')) {
        if (t.basic_form === w || t.basic_form === f || t.surface_form === w) return true;
        if (w.endsWith('する') && t.basic_form === 'する') {
          const idx = tokens.indexOf(t);
          if (idx > 0 && w.startsWith(tokens[idx-1].surface_form)) return true;
        }
      }
      return false;
    });
    if (hasVerb) return true;
  }

  return false;
}

// ============================================================
// Tatoeba Query Logic
// ============================================================
async function queryTatoebaV1(word, furigana, tokenizer, kuro) {
  const cacheKey = word;
  if (cache[cacheKey]) {
    return cache[cacheKey];
  }

  // 1. Try Japanese-Chinese pairs first
  let url = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=cmn&q=${encodeURIComponent(word)}&sort=relevance&limit=15`;
  console.log(`    [Tatoeba] Querying JPN-CMN: "${word}"`);
  try {
    const res = await httpGetWithRetry(url);
    if (res && res.data && res.data.length > 0) {
      const candidates = [];
      for (const item of res.data) {
        let cmnText = null;
        if (item.translations && item.translations.length > 0) {
          const t = item.translations.find(trans => trans.lang === 'cmn' || trans.lang === 'zho');
          if (t) cmnText = t.text;
        }
        if (cmnText) {
          const isCorrect = verifySentenceTokens(word, furigana, item.text, tokenizer);
          if (isCorrect) {
            candidates.push({ ja: item.text, zh: cmnText });
          }
        }
      }

      if (candidates.length > 0) {
        // Select best candidate
        let selected = candidates[0];
        let bestScore = -999;
        for (const cand of candidates) {
          let score = 0;
          const len = cand.ja.length;
          if (len >= 8 && len <= 28) score += 15;
          else if (len >= 5 && len <= 35) score += 5;
          if (cand.ja.includes(word)) score += 20;
          if (score > bestScore) {
            bestScore = score;
            selected = cand;
          }
        }
        selected.zh = await translateToTraditional(selected.zh, 'zh-CN');
        const selectedFuri = await kuro.convert(selected.ja, { to: 'hiragana' });
        console.log(`    [Tatoeba] Selected JPN-CMN: "${selected.ja}" -> "${selected.zh}"`);
        cache[cacheKey] = { ja: selected.ja, zh: selected.zh, furi: selectedFuri };
        saveCache();
        await sleep(600);
        return cache[cacheKey];
      }
    }
  } catch (e) {
    console.warn(`    Error JPN-CMN Tatoeba: ${e.message}`);
  }
  await sleep(600);

  // 2. Try Japanese-English pairs
  url = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=eng&q=${encodeURIComponent(word)}&sort=relevance&limit=15`;
  console.log(`    [Tatoeba] Querying JPN-ENG: "${word}"`);
  try {
    const res = await httpGetWithRetry(url);
    if (res && res.data && res.data.length > 0) {
      const candidates = [];
      for (const item of res.data) {
        const isCorrect = verifySentenceTokens(word, furigana, item.text, tokenizer);
        if (isCorrect) {
          candidates.push(item.text);
        }
      }

      if (candidates.length > 0) {
        // Select best candidate
        let selectedJa = candidates[0];
        let bestScore = -999;
        for (const ja of candidates) {
          let score = 0;
          const len = ja.length;
          if (len >= 8 && len <= 28) score += 15;
          else if (len >= 5 && len <= 35) score += 5;
          if (ja.includes(word)) score += 20;
          if (score > bestScore) {
            bestScore = score;
            selectedJa = ja;
          }
        }
        const zh = await translateToTraditional(selectedJa, 'ja');
        const selectedFuri = await kuro.convert(selectedJa, { to: 'hiragana' });
        console.log(`    [Tatoeba JPN-ENG -> Translated]: "${selectedJa}" -> "${zh}"`);
        cache[cacheKey] = { ja: selectedJa, zh: zh, furi: selectedFuri };
        saveCache();
        await sleep(600);
        return cache[cacheKey];
      }
    }
  } catch (e) {
    console.warn(`    Error JPN-ENG Tatoeba: ${e.message}`);
  }
  await sleep(600);

  return null;
}

// ============================================================
// Backup sentence recovery
// ============================================================
async function getGoodBackupSentence(word, furigana, backupVocab, tokenizer, kuro) {
  const cleanWord = word.trim();
  const v = backupVocab.find(item => {
    const hasKanji = (str) => /[\u4e00-\u9faf]/.test(str);
    let itemWord = item.word.trim();
    let itemFuri = item.furigana.trim();
    if (hasKanji(itemFuri) && !hasKanji(itemWord)) {
      itemWord = item.furigana.trim();
    }
    return itemWord === cleanWord;
  });
  if (v && v.exampleJa) {
    const ja = v.exampleJa;
    if (!ja.includes('言葉です') && !ja.includes('表現です') && !ja.includes('言葉である') && !ja.includes('表現である')) {
      const ok = verifySentenceTokens(cleanWord, furigana, ja, tokenizer);
      if (ok) {
        console.log(`    [Backup Recovery] Found valid sentence in backup: "${ja}"`);
        const zh = await translateToTraditional(v.exampleEn || ja, 'zh-CN');
        const furi = await kuro.convert(ja, { to: 'hiragana' });
        return { ja, zh, furi };
      }
    }
  }
  return null;
}

// ============================================================
// Kana to Romaji helper
// ============================================================
function kanaToRomaji(kana) {
  const mapping = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
  };

  let romaji = '';
  let i = 0;
  while (i < kana.length) {
    if (i + 1 < kana.length && mapping[kana.slice(i, i + 2)]) {
      romaji += mapping[kana.slice(i, i + 2)];
      i += 2;
    } else if (mapping[kana[i]]) {
      romaji += mapping[kana[i]];
      i += 1;
    } else if (kana[i] === 'っ' || kana[i] === 'ッ') {
      // double next consonant
      if (i + 1 < kana.length) {
        const next = kanaToRomaji(kana[i+1]);
        if (next) {
          romaji += next[0];
        }
      }
      i += 1;
    } else if (kana[i] === 'ー') {
      // long vowel
      if (romaji.length > 0) {
        romaji += romaji[romaji.length - 1];
      }
      i += 1;
    } else {
      romaji += kana[i];
      i += 1;
    }
  }
  return romaji;
}

// ============================================================
// Main Execution
// ============================================================
async function main() {
  console.log("=== Starting clean N5 importer ===");

  const kuro = new Kuroshiro();
  const analyzer = new KuromojiAnalyzer();
  await kuro.init(analyzer);
  const tokenizer = analyzer._analyzer;

  // Load N5 backup database
  const backupPath = path.join(brainScratchDir, 'upload_data_n5_js.js');
  if (!fs.existsSync(backupPath)) {
    console.error("Backup file not found at " + backupPath);
    process.exit(1);
  }
  const backupContent = fs.readFileSync(backupPath, 'utf8');
  const b64Match = backupContent.match(/const b64 = "([^"]+)"/);
  if (!b64Match) process.exit(1);
  const decompressed = zlib.gunzipSync(Buffer.from(b64Match[1], 'base64')).toString('utf8');
  const backupContext = { window: {} };
  vm.createContext(backupContext);
  vm.runInContext(decompressed, backupContext);
  const backupVocab = backupContext.window.JLPT_DATA_CHUNKS.N5.vocabulary;

  // Load batch words to process
  const batchPath = path.join(projectDir, 'scratch', 'n5_missing_batch.json');
  if (!fs.existsSync(batchPath)) {
    console.error("Batch file not found: scratch/n5_missing_batch.json");
    process.exit(1);
  }
  const batchWords = JSON.parse(fs.readFileSync(batchPath, 'utf8'));

  const currentPath = path.join(projectDir, 'data_n5.js');
  let chunk = { vocabulary: [], verbConjugations: [], adjectiveGroups: { iAdjectives: [], naAdjectives: [] } };
  if (fs.existsSync(currentPath)) {
    const currentContent = fs.readFileSync(currentPath, 'utf8');
    const currentContext = { window: {} };
    vm.createContext(currentContext);
    try {
      vm.runInContext(currentContent, currentContext);
      if (currentContext.window.JLPT_DATA_CHUNKS && currentContext.window.JLPT_DATA_CHUNKS.N5) {
        chunk = currentContext.window.JLPT_DATA_CHUNKS.N5;
      }
    } catch(e) {}
  }

  const existingWords = new Set(chunk.vocabulary.map(v => v.word.trim()));

  for (let i = 0; i < batchWords.length; i++) {
    const item = batchWords[i];

    // Correct swapped fields
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

    let exJa = '';
    let exZh = '';
    let exFuri = '';

    // 1. Query Tatoeba
    let sentence = await queryTatoebaV1(wordClean, readClean, tokenizer, kuro);
    if (sentence) {
      exJa = sentence.ja;
      exZh = sentence.zh;
      exFuri = sentence.furi;
    } else {
      // 2. Try to recover from backup if it contains a good sentence
      let backupSent = await getGoodBackupSentence(wordClean, readClean, backupVocab, tokenizer, kuro);
      if (backupSent) {
        exJa = backupSent.ja;
        exZh = backupSent.zh;
        exFuri = backupSent.furi;
      } else {
        // 3. Last fallback: generate a simple, natural N5 sentence
        let naturalJa = '';
        let naturalZh = '';
        if (item.category === 'food_drink') {
          if (item.meaning.includes('喝')) {
            naturalJa = `私は毎日${wordClean}を飲みます。`;
            naturalZh = `我每天喝${item.meaning.replace(/喝\s*\/?\s*/, '')}。`;
          } else {
            naturalJa = `私は毎日${wordClean}を食べます。`;
            naturalZh = `我每天吃${item.meaning.replace(/吃\s*\/?\s*/, '')}。`;
          }
        } else if (item.category === 'people_family' || item.category === 'greetings') {
          naturalJa = `「${wordClean}」は大切な挨拶です。`;
          naturalZh = `「${item.meaning}」是很重要的問候語。`;
        } else {
          naturalJa = `ここに${wordClean}があります。`;
          naturalZh = `這裡有${item.meaning}。`;
        }

        exJa = naturalJa;
        exZh = naturalZh;
        try {
          exFuri = await kuro.convert(exJa, { to: 'hiragana' });
        } catch (err) {
          exFuri = exJa;
        }
        console.log(`    ⚠ [Generated Natural Fallback]: "${exJa}" -> "${exZh}"`);
      }
    }

    const entry = {
      word: wordClean,
      furigana: readClean,
      romaji: kanaToRomaji(readClean),
      meaning: item.meaning,
      category: item.category,
      exampleJa: exJa,
      exampleFurigana: exFuri,
      exampleEn: exZh,
      level: 'N5'
    };

    // Verb conjugation check
    const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(wordClean.slice(-1)) || wordClean.endsWith('する');
    // Simple verb conjugator logic or copy from backup if it has it
    const backupEntry = backupVocab.find(b => b.word.trim() === wordClean);
    if (isVerb && backupEntry && backupEntry.conjugations) {
      entry.conjugations = backupEntry.conjugations;
      console.log(`    [Verb] Copied conjugations from backup`);
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
    } else if (v.category === 'properties_relations' && (v.meaning.includes('的') || v.meaning.includes('之'))) {
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

  // Save N5 chunk
  const key = 'N5';
  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${key}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${key}"]; }`;
  
  fs.writeFileSync(path.join(projectDir, `data_n5.js`), outputString, 'utf8');
  fs.writeFileSync(path.join(publicDir, `data_n5.js`), outputString, 'utf8');
  console.log(`Saved Level ${key} to root and public.`);

  // Bump version in index.html
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

  console.log("\nBatch import completed successfully!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
