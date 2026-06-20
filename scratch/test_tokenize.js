const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

function toKatakana(src) {
  return src.replace(/[\u3041-\u3096]/g, m => String.fromCharCode(m.charCodeAt(0) + 0x60));
}

function verifySentenceTokens(word, furigana, sentenceJa, tokenizer) {
  if (!sentenceJa) return false;
  
  const tokens = tokenizer.tokenize(sentenceJa);
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

async function test() {
  const kuro = new Kuroshiro();
  const analyzer = new KuromojiAnalyzer();
  await kuro.init(analyzer);
  const tokenizer = analyzer._analyzer;

  const cases = [
    { word: '焦げる', furigana: 'こげる', sentence: '教習所の教師にそう焦るなと言われています。', expected: false },
    { word: '見かける', furigana: 'みかける', sentence: '駅の近くで彼を見かけました。', expected: true },
    { word: 'パン', furigana: 'パン', sentence: 'きみはパンダだ。', expected: false },
    { word: 'パン', furigana: 'パン', sentence: '私はパンを食べた。', expected: true },
    { word: '頂', furigana: 'いただき', sentence: '頂きます。', expected: false },
    { word: '自首', furigana: 'じしゅ', sentence: '彼は首吊り自殺をした。', expected: false },
    { word: 'ビールス', furigana: 'びーるす', sentence: 'ビール瓶の材質はガラスです。', expected: false }
  ];

  console.log("=== Testing Token-Based Verification ===");
  for (const c of cases) {
    const result = verifySentenceTokens(c.word, c.furigana, c.sentence, tokenizer);
    console.log(`Word: "${c.word}" | Sentence: "${c.sentence}"`);
    console.log(`  Expected: ${c.expected} | Got: ${result} -> ${c.expected === result ? '✅ PASS' : '❌ FAIL'}`);
  }
}

test().catch(console.error);
