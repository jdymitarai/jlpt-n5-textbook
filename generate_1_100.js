const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

const ones = {
  1: { kanji: '一', furigana: 'いち', romaji: 'ichi' },
  2: { kanji: '二', furigana: 'に', romaji: 'ni' },
  3: { kanji: '三', furigana: 'さん', romaji: 'san' },
  4: { kanji: '四', furigana: 'よん', romaji: 'yon' }, // For > 10, default to yon
  5: { kanji: '五', furigana: 'ご', romaji: 'go' },
  6: { kanji: '六', furigana: 'ろく', romaji: 'roku' },
  7: { kanji: '七', furigana: 'なな', romaji: 'nana' }, // default nana
  8: { kanji: '八', furigana: 'はち', romaji: 'hachi' },
  9: { kanji: '九', furigana: 'きゅう', romaji: 'kyuu' }
};

const tensPrefix = {
  1: { kanji: '', furigana: '', romaji: '' },
  2: { kanji: '二', furigana: 'に', romaji: 'ni' },
  3: { kanji: '三', furigana: 'さん', romaji: 'san' },
  4: { kanji: '四', furigana: 'よん', romaji: 'yon' },
  5: { kanji: '五', furigana: 'ご', romaji: 'go' },
  6: { kanji: '六', furigana: 'ろく', romaji: 'roku' },
  7: { kanji: '七', furigana: 'なな', romaji: 'nana' },
  8: { kanji: '八', furigana: 'はち', romaji: 'hachi' },
  9: { kanji: '九', furigana: 'きゅう', romaji: 'kyuu' }
};

const table = [];

for (let i = 1; i <= 100; i++) {
  if (i <= 10) {
    const orig = [
      { num: 1, kanji: '一', furigana: 'いち', romaji: 'ichi', irregular: false },
      { num: 2, kanji: '二', furigana: 'に', romaji: 'ni', irregular: false },
      { num: 3, kanji: '三', furigana: 'さん', romaji: 'san', irregular: false },
      { num: 4, kanji: '四', furigana: 'よん / し', romaji: 'yon / shi', irregular: false },
      { num: 5, kanji: '五', furigana: 'ご', romaji: 'go', irregular: false },
      { num: 6, kanji: '六', furigana: 'ろく', romaji: 'roku', irregular: false },
      { num: 7, kanji: '七', furigana: 'なな / しち', romaji: 'nana / shichi', irregular: false },
      { num: 8, kanji: '八', furigana: 'はち', romaji: 'hachi', irregular: false },
      { num: 9, kanji: '九', furigana: 'きゅう / く', romaji: 'kyuu / ku', irregular: false },
      { num: 10, kanji: '十', furigana: 'じゅう', romaji: 'juu', irregular: false }
    ];
    table.push(orig[i-1]);
  } else if (i === 100) {
    table.push({ num: 100, kanji: '百', furigana: 'ひゃく', romaji: 'hyaku', irregular: false });
  } else {
    const tens = Math.floor(i / 10);
    const units = i % 10;
    
    let k = tensPrefix[tens].kanji + '十';
    let f = tensPrefix[tens].furigana + (tensPrefix[tens].furigana ? 'じゅう' : 'じゅう');
    let r = tensPrefix[tens].romaji + (tensPrefix[tens].romaji ? 'juu' : 'juu');

    if (units > 0) {
      // Handle special units for 4, 7, 9? Usually in 14 it's jyuuyon or jyuushi. Let's just provide the primary one.
      let u_k = ones[units].kanji;
      let u_f = ones[units].furigana;
      let u_r = ones[units].romaji;
      
      // Provide dual readings for 14, 24, etc? 
      // User only expects 100 to be complete. Let's provide dual readings for 4, 7, 9 to be safe and helpful.
      if (units === 4) {
        u_f = 'よん / し';
        u_r = 'yon / shi';
      } else if (units === 7) {
        u_f = 'なな / しち';
        u_r = 'nana / shichi';
      } else if (units === 9) {
        u_f = 'きゅう / く';
        u_r = 'kyuu / ku';
      }

      k += u_k;
      f += u_f;
      r += u_r;
    }
    
    table.push({ num: i, kanji: k, furigana: f, romaji: r, irregular: false });
  }
}

const basic100 = {
  id: 'basic_1_100',
  title: '基礎數字 (1 ~ 100)',
  description: '最基礎的數字念法，是所有數字與量詞變化的根基。',
  table: table
};

const idx = data.counters.findIndex(c => c.id === 'basic_1_10' || c.id === 'basic_1_100');
if (idx !== -1) {
  data.counters[idx] = basic100;
} else {
  data.counters.unshift(basic100);
}

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Updated data.js with 1-100');
