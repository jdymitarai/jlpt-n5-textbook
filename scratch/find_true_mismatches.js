const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

function getStemReadings(word, furigana) {
  const f = furigana.trim();
  const w = word.trim();

  // Special cases
  if (w === '来る' || w === 'くる') {
    return ['き', 'く', 'こ'];
  }
  if (w === '行く' || w === 'いく') {
    return ['い'];
  }
  if (w === 'いい' || w === '良い' || f === 'いい' || f === 'よい') {
    return ['い', 'よ'];
  }

  // Verbs ending in する
  if (w.endsWith('する') || f.endsWith('する')) {
    return [f.slice(0, -2)];
  }

  // Verbs ending in dictionary hiragana
  const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(w.slice(-1));
  if (isVerb) {
    return [f.slice(0, -1)];
  }

  // Adjectives ending in い
  if (w.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(w)) {
    if (f.endsWith('い') && f.length > 1) {
      return [f.slice(0, -1)];
    }
  }

  return [f];
}

function verifySentence(word, furigana, sentenceJa, sentenceFuri) {
  if (!sentenceJa || !sentenceFuri) return false;

  const cleanJa = sentenceJa.replace(/[\s\。\,\.\?\！\！\?\「\」\『\』]/g, '');
  const cleanFuri = sentenceFuri.replace(/[\s\。\,\.\?\！\！\?\「\」\『\』]/g, '');

  const stems = getStemReadings(word, furigana);

  // Check if any stem reading is in the sentence furigana
  const hasStem = stems.some(stem => cleanFuri.includes(stem));
  if (!hasStem) return false;

  // Also check if the Kanji part is in the Japanese sentence (if word contains kanji)
  const kanjiMatch = word.match(/^([\u4e00-\u9faf]+)/);
  if (kanjiMatch) {
    const kanjiPart = kanjiMatch[1];
    if (!cleanJa.includes(kanjiPart)) {
      // Allow cases like はじめまして (written in hiragana in dictionary but Kanji in sentence)
      // by checking if the full furigana is in the cleanJa or cleanFuri.
      const fullFuri = furigana.trim();
      if (!cleanJa.includes(fullFuri) && !cleanFuri.includes(fullFuri)) {
        return false;
      }
    }
  }

  return true;
}

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
    const ok = verifySentence(v.word, v.furigana, v.exampleJa, v.exampleFurigana);
    if (!ok) {
      errors.push(v);
    }
  });

  if (errors.length > 0) {
    allErrors[lvl] = errors;
    console.log(`=== Level: ${key} (${errors.length} true errors found) ===`);
    errors.forEach(e => {
      console.log(`  - Word: "${e.word}" (${e.furigana}) | Meaning: "${e.meaning}"`);
      console.log(`    Sentence: "${e.exampleJa}"`);
      console.log(`    Furigana: "${e.exampleFurigana}"`);
      console.log(`    Translation: "${e.exampleEn}"`);
    });
    console.log();
  } else {
    console.log(`=== Level: ${key} (0 errors found) ===\n`);
  }
});

fs.writeFileSync(path.join(projectDir, 'scratch', 'database_errors.json'), JSON.stringify(allErrors, null, 2), 'utf8');
console.log("Saved errors list to scratch/database_errors.json");
