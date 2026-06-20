const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const levels = ['n5', 'n4', 'n3', 'n2', 'n1', 'clinical', 'native'];

function getVerbForms(word, furigana) {
  if (!word || typeof word !== 'string') return [];
  const forms = [word];
  if (word.endsWith('する')) {
    const root = word.slice(0, -2);
    forms.push(root + 'し', root + 'せ', root + 'さ');
  } else if (word.endsWith('る')) {
    const root = word.slice(0, -1);
    forms.push(root + 'ます', root + 'て', root + 'ない', root + 'た', root + 'ず', root + 'れ', root + 'よ', root + 'よっ');
    forms.push(root + 'ら', root + 'り', root + 'れ', root + 'ろ', root + 'っ');
  } else if (word.endsWith('う')) {
    const root = word.slice(0, -1);
    forms.push(root + 'い', root + 'わ', root + 'っ', root + 'え', root + 'お');
  } else if (word.endsWith('く')) {
    const root = word.slice(0, -1);
    forms.push(root + 'き', root + 'か', root + 'い', root + 'け', root + 'こ');
  } else if (word.endsWith('ぐ')) {
    const root = word.slice(0, -1);
    forms.push(root + 'ぎ', root + 'が', root + 'い', root + 'げ', root + 'ご');
  } else if (word.endsWith('す')) {
    const root = word.slice(0, -1);
    forms.push(root + 'し', root + 'さ', root + 'せ', root + 'そ');
  } else if (word.endsWith('つ')) {
    const root = word.slice(0, -1);
    forms.push(root + 'ち', root + 'た', root + 'っ', root + 'て', root + 'と');
  } else if (word.endsWith('ぬ')) {
    const root = word.slice(0, -1);
    forms.push(root + 'ni', root + 'な', root + 'ん', root + 'ね', root + 'の');
  } else if (word.endsWith('ぶ')) {
    const root = word.slice(0, -1);
    forms.push(root + 'び', root + 'ば', root + 'ん', root + 'べ', root + 'ぼ');
  } else if (word.endsWith('む')) {
    const root = word.slice(0, -1);
    forms.push(root + 'み', root + 'ま', root + 'ん', root + 'め', root + 'も');
  }
  return [...new Set(forms)];
}

function checkSentence(word, furigana, sentence, conjugations) {
  if (!sentence) return false;
  if (sentence.includes(word)) return true;
  if (sentence.includes(furigana)) return true;

  const kanjiMatch = word.match(/^([\u4e00-\u9faf]+)/);
  if (kanjiMatch) {
    const kanjiPart = kanjiMatch[1];
    if (!sentence.includes(kanjiPart)) return false;
  }

  const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(word.slice(-1)) || word.endsWith('する');
  if (isVerb || conjugations) {
    const forms = getVerbForms(word, furigana);
    const hasForm = forms.some(f => sentence.includes(f));
    if (hasForm) return true;
  }

  if (word.endsWith('い') && word.length > 1) {
    const root = word.slice(0, -1);
    if (sentence.includes(root)) return true;
  }

  return false;
}

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

  const mismatches = [];
  data.vocabulary.forEach(v => {
    const ok = checkSentence(v.word, v.furigana, v.exampleJa, v.conjugations);
    if (!ok) {
      mismatches.push(v.word);
    }
  });

  console.log(`${key}: ${mismatches.length} mismatches out of ${data.vocabulary.length} words. (${((mismatches.length/data.vocabulary.length)*100).toFixed(1)}%)`);
  if (mismatches.length > 0) {
    console.log(`  Examples: ${mismatches.slice(0, 10).join(', ')}`);
  }
});
