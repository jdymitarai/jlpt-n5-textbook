const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const vm = require('vm');

const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const backupPath = 'C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\upload_data_n5_js.js';
const backupContent = fs.readFileSync(backupPath, 'utf8');
const match = backupContent.match(/const b64 = "([^"]+)"/);
if (!match) {
  console.log("No base64 match");
  process.exit(1);
}
const decompressed = zlib.gunzipSync(Buffer.from(match[1], 'base64')).toString('utf8');
const backupContext = { window: {} };
vm.createContext(backupContext);
vm.runInContext(decompressed, backupContext);
const vocab = backupContext.window.JLPT_DATA_CHUNKS.N5.vocabulary;

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

async function main() {
  const kuro = new Kuroshiro();
  const analyzer = new KuromojiAnalyzer();
  await kuro.init(analyzer);
  const tokenizer = analyzer._analyzer;

  const mismatches = [];
  vocab.forEach(v => {
    const ok = verifySentenceTokens(v.word, v.furigana, v.exampleJa, tokenizer);
    if (!ok) {
      mismatches.push(v);
    }
  });

  console.log('--- FIRST 15 MISMATCHES DETAILS ---');
  mismatches.slice(0, 15).forEach((v, idx) => {
    console.log(`${idx+1}. Word: "${v.word}" (${v.furigana}) | Meaning: "${v.meaning}"`);
    console.log(`   Sentence: "${v.exampleJa}"`);
    console.log(`   Furigana: "${v.exampleFurigana}"`);
    console.log(`   Translation: "${v.exampleEn}"`);
    console.log();
  });
}

main().catch(console.error);
