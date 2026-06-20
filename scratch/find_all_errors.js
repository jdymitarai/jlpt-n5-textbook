const fs = require('fs');
const path = require('path');
const vm = require('vm');

const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

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

  // Special cases for verbs/nouns boundary
  if (w === '頂' && (sentenceJa.includes('いただきます') || sentenceJa.includes('頂く') || sentenceJa.includes('いただきま'))) {
    return false;
  }

  // 1. Direct single token match
  for (let t of tokens) {
    const tReading = toKatakana(t.reading || '');
    
    // Check surface or basic form match
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

    // Check reading match
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

  // 2. Check contiguous token combinations
  for (let i = 0; i < tokens.length; i++) {
    let combinedSurface = '';
    let combinedReading = '';
    for (let j = i; j < tokens.length; j++) {
      combinedSurface += tokens[j].surface_form;
      combinedReading += tokens[j].reading || '';
      
      const combinedReadingKatakana = toKatakana(combinedReading);

      if (!isWordVerb && !isWordAdj) {
        // Nouns and non-conjugating words must match EXACTLY on surface or reading
        if (combinedSurface === w || (w === 'けが' && combinedSurface.startsWith('けが'))) {
          if (combinedReading && toKatakana(combinedReading) !== fKatakana && w !== 'けが') {
            continue; // Reading mismatch for Kanji
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
        // Verbs and adjectives can use substring matching for conjugations
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

  // 3. Verb/adjective conjugation fallback
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

async function main() {
  console.log("=== Finding All Database Errors (Refined Tokens + Fallbacks) ===");

  const kuro = new Kuroshiro();
  const analyzer = new KuromojiAnalyzer();
  await kuro.init(analyzer);
  const tokenizer = analyzer._analyzer;
  console.log("Kuroshiro & Kuromoji initialized.\n");

  const allErrors = {};

  levels.forEach(lvl => {
    const filePath = path.join(projectDir, `data_${lvl}.js`);
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(content, context);

    const key = lvl === 'clinical' ? '臨床' : (lvl === 'native' ? '母語者' : lvl.toUpperCase());
    const data = context.window.JLPT_DATA_CHUNKS[key];
    if (!data || !data.vocabulary) return;

    const errors = [];
    data.vocabulary.forEach(v => {
      let isErr = false;
      if (v.exampleJa.includes('言葉です') || v.exampleJa.includes('表現です') || v.exampleJa.includes('言葉である') || v.exampleJa.includes('表現である')) {
        isErr = true;
      } else if (lvl !== 'clinical' && lvl !== 'native') {
        isErr = !verifySentenceTokens(v.word, v.furigana, v.exampleJa, tokenizer);
      } else {
        const cleanJa = v.exampleJa.replace(/[\s\。\,\.\?\！\！\?\「\」\『\』]/g, '');
        if (!cleanJa.includes(v.word)) {
          isErr = true;
        }
      }

      if (isErr) {
        errors.push(v);
      }
    });

    if (errors.length > 0) {
      allErrors[lvl] = errors;
      console.log(`Level: ${key} -> Found ${errors.length} errors.`);
    } else {
      console.log(`Level: ${key} -> 0 errors.`);
    }
  });

  fs.writeFileSync(path.join(projectDir, 'scratch', 'database_errors.json'), JSON.stringify(allErrors, null, 2), 'utf8');
  console.log("\nSaved all errors to scratch/database_errors.json");
}

main().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});
