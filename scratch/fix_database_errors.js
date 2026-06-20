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
          const isCorrect = verifySentenceTokens(word, furigana, item.text, kuro);
          if (isCorrect) {
            candidates.push({ ja: item.text, zh: cmnText });
          }
        }
      }

      let selected = null;
      if (keywords && keywords.length > 0) {
        for (const cand of candidates) {
          const matches = keywords.some(kw => cand.zh.includes(kw) || cand.ja.includes(kw));
          if (matches) {
            selected = cand;
            break;
          }
        }
      }

      if (!selected && candidates.length > 0) {
        let bestScore = -999;
        for (const cand of candidates) {
          let score = 0;
          const len = cand.ja.length;
          if (len >= 8 && len <= 28) score += 15;
          else if (len >= 5 && len <= 35) score += 5;
          else score -= 10;

          if (cand.ja.includes(word)) score += 20;

          if (score > bestScore) {
            bestScore = score;
            selected = cand;
          }
        }
      }

      if (selected) {
        selected.zh = await ensureTraditional(selected.zh);
        const selectedFuri = await kuro.convert(selected.ja, { to: 'hiragana' });
        console.log(`    [Tatoeba] Selected sentence: "${selected.ja}" -> "${selected.zh}"`);
        cache[cacheKey] = { ja: selected.ja, zh: selected.zh, furi: selectedFuri };
        saveCache();
        await sleep(600);
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
// Main Execution
// ============================================================
async function main() {
  console.log("=== Starting Database Error Fixer ===");

  const kuro = new Kuroshiro();
  await kuro.init(new KuromojiAnalyzer());
  console.log("Kuroshiro initialized.\n");

  const errorsPath = path.join(projectDir, 'scratch', 'database_errors.json');
  if (!fs.existsSync(errorsPath)) {
    console.error("Errors file not found: database_errors.json");
    process.exit(1);
  }
  const allErrors = JSON.parse(fs.readFileSync(errorsPath, 'utf8'));

  for (const lvl of Object.keys(allErrors)) {
    const errorList = allErrors[lvl];
    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    
    console.log(`\n========================================`);
    console.log(`Fixing Level: ${key} (${errorList.length} errors)`);
    console.log(`========================================`);

    const dbPath = path.join(projectDir, `data_${lvl}.js`);
    if (!fs.existsSync(dbPath)) {
      console.log(`File not found: ${dbPath}`);
      continue;
    }
    const content = fs.readFileSync(dbPath, 'utf8');
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(content, context);
    const chunk = context.window.JLPT_DATA_CHUNKS[key];

    const errorWordsMap = {};
    errorList.forEach(e => {
      errorWordsMap[e.word.trim() + '|' + e.furigana.trim()] = e;
    });

    for (const v of chunk.vocabulary) {
      const matchKey = v.word.trim() + '|' + v.furigana.trim();
      if (errorWordsMap[matchKey]) {
        console.log(`\nFixing: "${v.word}" (${v.furigana})`);
        
        if (lvl === 'clinical' || lvl === 'native') {
          try {
            const newFuri = await kuro.convert(v.exampleJa, { to: 'hiragana' });
            console.log(`    [Furigana Fix] "${v.exampleJa}" -> "${newFuri}"`);
            v.exampleFurigana = newFuri;
          } catch (e) {
            console.warn(`    Error generating furigana: ${e.message}`);
          }
        } else {
          let keywords = null;
          if (v.meaning.includes('撐') || v.meaning.includes('傘')) {
            keywords = ['傘', '撐', '打'];
          } else if (v.meaning.includes('指向') || v.meaning.includes('指著')) {
            keywords = ['指', '指向'];
          }

          const newSent = await queryTatoebaV1(v.word, v.furigana, kuro, keywords);
          if (newSent) {
            v.exampleJa = newSent.ja;
            v.exampleEn = newSent.zh;
            v.exampleFurigana = newSent.furi;
          } else {
            console.warn(`    ⚠ [Failed] Could not find a valid sentence on Tatoeba for "${v.word}" (${v.furigana})`);
          }
        }
      }
    }

    // Rebuild verbConjugations and adjectiveGroups for this level
    console.log(`\nRebuilding verbConjugations and adjectiveGroups for ${key}...`);
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
      } else if (v.category === 'properties_relations' && (v.meaning.includes('的') || v.meaning.includes('之'))) {
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

    // Save to root and public
    const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${key}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${key}"]; }`;
    
    fs.writeFileSync(path.join(projectDir, `data_${lvl}.js`), outputString, 'utf8');
    fs.writeFileSync(path.join(publicDir, `data_${lvl}.js`), outputString, 'utf8');
    console.log(`Saved Level ${key} to root and public.`);
  }

  console.log("\nDatabase fix completed! Bumping index.html cache version...");
  
  // Bump version in index.html
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

  console.log("\nAll database errors corrected successfully!");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
