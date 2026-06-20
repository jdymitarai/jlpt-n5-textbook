/**
 * N5 Batch Importer v2 — JMdict (Jisho API) + Tatoeba API
 * 
 * Fixes from v1:
 *  - Correct Tatoeba API URL (no trans_filter param)
 *  - Include expected readings from candidates list
 *  - Cleaner Chinese meanings (concise, max ~15 chars)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');

const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');

// ============================================================
// N5 Candidates — with expected readings and concise meanings
// Multi-meaning words have separate entries
// ============================================================
const n5Candidates = [
  { word: "はじめまして", reading: "はじめまして", meaning: "初次見面，請多指教", cat: "relations_human" },
  { word: "どうぞよろしく", reading: "どうぞよろしく", meaning: "請多指教、請多關照", cat: "relations_human" },
  { word: "眼鏡", reading: "めがね", meaning: "眼鏡", cat: "fashion_beauty" },
  { word: "一足", reading: "いっそく", meaning: "一雙（鞋襪）", cat: "math_quantity" },
  { word: "二足", reading: "にそく", meaning: "兩雙（鞋襪）", cat: "math_quantity" },
  { word: "お腹", reading: "おなか", meaning: "肚子、腹部", cat: "body_physiology" },
  // 結構 — 2 meanings
  { word: "結構", reading: "けっこう", meaning: "足夠、不用了（拒絕）", cat: "properties_relations", tatoeba: "結構です" },
  { word: "結構", reading: "けっこう", meaning: "相當、非常（副詞）", cat: "properties_relations", tatoeba: "結構難しい" },
  // 背 — 2 meanings
  { word: "背", reading: "せ", meaning: "身高、身材", cat: "body_physiology", tatoeba: "背が高い" },
  { word: "背", reading: "せ", meaning: "背部、後背", cat: "body_physiology", tatoeba: "背を向ける" },
  { word: "背広", reading: "せびろ", meaning: "男裝西服", cat: "fashion_beauty" },
  { word: "歯", reading: "は", meaning: "牙齒", cat: "body_physiology" },
  { word: "鼻", reading: "はな", meaning: "鼻子", cat: "body_physiology" },
  { word: "耳", reading: "みみ", meaning: "耳朵", cat: "body_physiology" },
  { word: "目", reading: "め", meaning: "眼睛", cat: "body_physiology" },
  { word: "髪", reading: "かみ", meaning: "頭髮", cat: "body_physiology" },
  // 首 — 2 meanings
  { word: "首", reading: "くび", meaning: "脖子、頸部", cat: "body_physiology", tatoeba: "首が痛い" },
  { word: "首", reading: "くび", meaning: "解雇、免職", cat: "relations_human", tatoeba: "首になった" },
  { word: "喉", reading: "のど", meaning: "喉嚨", cat: "body_physiology" },
  { word: "肩", reading: "かた", meaning: "肩膀", cat: "body_physiology" },
  { word: "胸", reading: "むね", meaning: "胸部、胸口", cat: "body_physiology" },
  { word: "背中", reading: "せなか", meaning: "後背、背部", cat: "body_physiology" },
  { word: "腕", reading: "うで", meaning: "手臂", cat: "body_physiology" },
  { word: "指", reading: "ゆび", meaning: "手指", cat: "body_physiology" },
  { word: "爪", reading: "つめ", meaning: "指甲", cat: "body_physiology" },
  { word: "足首", reading: "あしくび", meaning: "腳踝", cat: "body_physiology" },
  { word: "腰", reading: "こし", meaning: "腰部", cat: "body_physiology" },
  // 指す — 2 meanings
  { word: "指す", reading: "さす", meaning: "指向、用手指指著", cat: "properties_relations", tatoeba: "指を指す" },
  { word: "指す", reading: "さす", meaning: "撐（傘）", cat: "properties_relations", tatoeba: "傘をさす" },
  { word: "芋", reading: "いも", meaning: "地瓜、芋頭、薯類", cat: "food_culture" },
  { word: "饅頭", reading: "まんじゅう", meaning: "日式甜點饅頭", cat: "food_culture" },
  // Medical candidates
  { word: "病院", reading: "びょういん", meaning: "醫院", cat: "health_medical" },
  { word: "医者", reading: "いしゃ", meaning: "醫生", cat: "relations_human" },
  { word: "薬", reading: "くすり", meaning: "藥、藥物", cat: "health_medical" },
  { word: "痛い", reading: "いたい", meaning: "疼痛的、痛的", cat: "properties_relations" },
  { word: "風邪", reading: "かぜ", meaning: "感冒", cat: "health_medical" },
  { word: "トースト", reading: "トースト", meaning: "吐司、烤麵包", cat: "food_culture" }
];

// ============================================================
// HTTP helper
// ============================================================
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || 443,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 JLPT-Importer/2.0' }
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

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// ============================================================
// Romaji helpers
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
// Verb conjugation
// ============================================================
const g1Exc = ["帰る","かえる","走る","はしる","入る","はいる","知る","しる","切る","きる","要る","いる","戻る","もどる"];
const iCol = ["い","き","し","ち","に","ひ","み","り","び","ぎ","じ","ぴ"];
const eCol = ["え","け","せ","て","ね","へ","め","れ","べ","げ","ぜ","ぺ"];
function conjugateVerb(w, f) {
  w=w.trim(); f=f.trim();
  if (w.endsWith("する")||f.endsWith("する")) {
    const rK=w.slice(0,-2),rF=f.slice(0,-2);
    return{group:"第三類動詞 (不規則)",dictionary:`${w} (${f})`,masu:`${rK}します (${rF}します)`,te:`${rK}して (${rF}して)`,nai:`${rK}しない (${rF}しない)`,ta:`${rK}した (${rF}した)`};
  }
  if (w.endsWith("る")) {
    const ch=f.charAt(f.length-2), isIE=iCol.includes(ch)||eCol.includes(ch);
    const isG1=g1Exc.includes(w)||g1Exc.includes(f)||!isIE;
    const rK=w.slice(0,-1),rF=f.slice(0,-1);
    if(isG1) return{group:"第一類動詞 (五段)",dictionary:`${w} (${f})`,masu:`${rK}ります (${rF}ります)`,te:`${rK}って (${rF}って)`,nai:`${rK}らない (${rF}らない)`,ta:`${rK}った (${rF}った)`};
    return{group:"第二類動詞 (上下段)",dictionary:`${w} (${f})`,masu:`${rK}ます (${rF}ます)`,te:`${rK}て (${rF}て)`,nai:`${rK}ない (${rF}ない)`,ta:`${rK}た (${rF}た)`};
  }
  const lK=w.slice(-1),lF=f.slice(-1),rK=w.slice(0,-1),rF=f.slice(0,-1);
  const mm={"う":"います","つ":"ちます","ぬ":"にます","ぶ":"びます","む":"みます","く":"きます","ぐ":"ぎます","す":"します"};
  const tm={"う":"って","つ":"って","ぬ":"んで","ぶ":"んで","む":"んで","く":"いて","ぐ":"いで","す":"して"};
  const nm={"う":"わない","つ":"たない","ぬ":"なない","ぶ":"ばない","む":"まない","く":"かない","ぐ":"がない","す":"さない"};
  const am={"う":"った","つ":"った","ぬ":"んだ","ぶ":"んだ","む":"んだ","く":"いた","ぐ":"いだ","す":"した"};
  return{group:"第一類動詞 (五段)",dictionary:`${w} (${f})`,masu:`${rK}${mm[lK]||'みます'} (${rF}${mm[lF]||'みます'})`,te:`${rK}${tm[lK]||'んで'} (${rF}${tm[lF]||'んで'})`,nai:`${rK}${nm[lK]||'まない'} (${rF}${nm[lF]||'まない'})`,ta:`${rK}${am[lK]||'んだ'} (${rF}${am[lF]||'んだ'})`};
}
const notVerbs = new Set(['病院','医者','風邪','背広','饅頭','お腹','背中','足首','眼鏡','トースト',
  'はじめまして','どうぞよろしく','一足','二足','結構','芋','首','歯','鼻','耳','目','髪','喉',
  '肩','胸','腕','指','爪','腰','背','薬']);
function isVerb(w) {
  return ['う','く','ぐ','す','つ','ぬ','ぶ','む','る'].includes(w.slice(-1)) || w.endsWith('する');
}

// ============================================================
// Query Tatoeba API — use api_v0/search (returns translations)
// ============================================================
async function queryTatoeba(searchTerm) {
  const url = `https://tatoeba.org/en/api_v0/search?from=jpn&to=cmn&query=${encodeURIComponent(searchTerm)}`;
  console.log(`    [Tatoeba] Querying: ${searchTerm}`);
  try {
    const data = await httpGet(url);
    if (data && data.results && data.results.length > 0) {
      const withChinese = [];
      for (const item of data.results) {
        let cmnText = null;
        // translations is [[direct], [indirect]] — check both arrays
        if (Array.isArray(item.translations)) {
          for (const tGroup of item.translations) {
            if (Array.isArray(tGroup)) {
              for (const t of tGroup) {
                if (t.lang === 'cmn' || t.lang === 'zho') {
                  // Prefer traditional Chinese transcription if available
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
          withChinese.push({ ja: item.text, zh: cmnText });
        }
      }
      console.log(`    [Tatoeba] Found ${data.results.length} sentences, ${withChinese.length} with Chinese`);
      return withChinese.slice(0, 10);
    }
    console.log(`    [Tatoeba] No results`);
  } catch (e) {
    console.warn(`    [Tatoeba] Error: ${e.message}`);
  }
  return [];
}

// ============================================================
// Main
// ============================================================
async function main() {
  console.log("=== N5 Batch Import v2 from JMdict + Tatoeba ===\n");

  console.log("Initializing kuroshiro...");
  const kuroshiro = new Kuroshiro();
  await kuroshiro.init(new KuromojiAnalyzer());
  console.log("Kuroshiro ready.\n");

  const allEntries = [];
  const usedSentences = new Set();

  for (let i = 0; i < n5Candidates.length; i++) {
    const c = n5Candidates[i];
    console.log(`\n[${i+1}/${n5Candidates.length}] ${c.word} (${c.reading})`);

    // Reading and romaji are pre-defined from candidates list
    const romaji = kanaToRomaji(katakanaToHiragana(c.reading));

    // Query Tatoeba for example sentence
    const searchTerm = c.tatoeba || c.word;
    let sentences = await queryTatoeba(searchTerm);
    await sleep(600);

    // If tatoeba hint didn't work, try the base word
    if (sentences.length === 0 && c.tatoeba && c.tatoeba !== c.word) {
      console.log(`    [Tatoeba] Retrying with: ${c.word}`);
      sentences = await queryTatoeba(c.word);
      await sleep(600);
    }

    // Pick best sentence (avoid reusing for multi-meaning words)
    let best = null;
    for (const s of sentences) {
      if (!usedSentences.has(s.ja)) { best = s; usedSentences.add(s.ja); break; }
    }
    if (!best && sentences.length > 0) {
      // All used, pick the second or third if available
      for (let si = 1; si < sentences.length; si++) {
        if (!usedSentences.has(sentences[si].ja)) {
          best = sentences[si]; usedSentences.add(sentences[si].ja); break;
        }
      }
      if (!best) best = sentences[0]; // Last resort
    }

    let exJa = '', exZh = '', exFuri = '';
    if (best) {
      exJa = best.ja;
      exZh = best.zh;
      console.log(`    例句: ${exJa}`);
      console.log(`    中譯: ${exZh}`);
      try {
        exFuri = await kuroshiro.convert(exJa, { to: 'hiragana' });
        console.log(`    讀音: ${exFuri}`);
      } catch (e) {
        console.warn(`    Furigana error: ${e.message}`);
        exFuri = exJa;
      }
    } else {
      console.log(`    ⚠ No Tatoeba sentence found`);
    }

    // Build entry
    const entry = {
      word: c.word,
      furigana: c.reading,
      romaji: romaji,
      meaning: c.meaning,
      category: c.cat,
      exampleJa: exJa || `${c.word}は大切な言葉です。`,
      exampleFurigana: exFuri || c.reading,
      exampleEn: exZh || c.meaning,
      level: "N5"
    };

    // Verb conjugations
    if (isVerb(c.word) && !notVerbs.has(c.word)) {
      entry.conjugations = conjugateVerb(c.word, c.reading);
      console.log(`    動詞活用: ${entry.conjugations.group}`);
    }

    allEntries.push(entry);
    console.log(`    ✓ ${entry.word} [${entry.category}]`);
  }

  // Rebuild conjugations & adjective groups
  const verbConj = [];
  const adjGroups = { iAdjectives: [], naAdjectives: [] };
  allEntries.forEach(v => {
    if (v.conjugations) {
      verbConj.push({ dictionary:v.conjugations.dictionary, masu:v.conjugations.masu,
        te:v.conjugations.te, nai:v.conjugations.nai, meaning:v.meaning, group:v.conjugations.group });
    }
    if (v.word.endsWith('い') && v.category === 'properties_relations') {
      const rK=v.word.slice(0,-1), rF=v.furigana.slice(0,-1);
      let neg=`${rK}くない`, past=`${rK}かった`;
      if (v.word==='いい'||v.word==='良い') { neg='よくない'; past='よかった'; }
      adjGroups.iAdjectives.push({ word:`${v.word} (${v.furigana})`, meaning:v.meaning, negative:neg, past:past });
    }
  });

  // Write
  const chunk = { vocabulary: allEntries, verbConjugations: verbConj, adjectiveGroups: adjGroups };
  const out = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
  fs.writeFileSync(path.join(projectDir, 'data_n5.js'), out, 'utf8');
  fs.writeFileSync(path.join(publicDir, 'data_n5.js'), out, 'utf8');

  // Summary
  console.log("\n========================================");
  console.log("=== N5 Import Complete ===");
  console.log(`Total entries: ${allEntries.length}`);
  console.log(`Verb conjugations: ${verbConj.length}`);
  console.log(`i-Adjectives: ${adjGroups.iAdjectives.length}`);
  
  const cats = {};
  allEntries.forEach(v => { cats[v.category] = (cats[v.category]||0)+1; });
  console.log("\nCategories:");
  Object.entries(cats).sort((a,b)=>b[1]-a[1]).forEach(([c,n])=>console.log(`  ${c}: ${n}`));

  // Count entries with real Tatoeba sentences vs fallbacks
  const withTatoeba = allEntries.filter(e => !e.exampleJa.includes('大切な言葉'));
  console.log(`\nWith Tatoeba sentences: ${withTatoeba.length}/${allEntries.length}`);

  console.log("\n--- All entries ---");
  allEntries.forEach((e,i) => {
    const src = e.exampleJa.includes('大切な言葉') ? '❌ fallback' : '✅ Tatoeba';
    console.log(`${i+1}. ${e.word} (${e.furigana}) — ${e.meaning} [${e.category}] ${src}`);
    console.log(`   ${e.exampleJa}`);
    console.log(`   ${e.exampleEn}`);
  });

  console.log("\nSaved to data_n5.js ✓");
}

main().catch(err => { console.error("Fatal:", err); process.exit(1); });
