const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

if (!data.counters) {
  data.counters = [];
}

const basicNumbers = [
  {
    id: 'basic_1_10',
    title: '基礎數字 (1 ~ 10)',
    description: '最基礎的數字念法，是所有數字與量詞變化的根基。',
    table: [
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
    ]
  },
  {
    id: 'basic_100',
    title: '百的進位 (100 ~ 900)',
    description: '注意 300(半濁音)、600(促音+半濁音)、800(促音+半濁音) 的不規則變化。',
    table: [
      { num: 100, kanji: '百', furigana: 'ひゃく', romaji: 'hyaku', irregular: false },
      { num: 200, kanji: '二百', furigana: 'にひゃく', romaji: 'nihyaku', irregular: false },
      { num: 300, kanji: '三百', furigana: 'さんびゃく', romaji: 'sanbyaku', irregular: true },
      { num: 400, kanji: '四百', furigana: 'よんひゃく', romaji: 'yonhyaku', irregular: false },
      { num: 500, kanji: '五百', furigana: 'ごひゃく', romaji: 'gohyaku', irregular: false },
      { num: 600, kanji: '六百', furigana: 'ろっぴゃく', romaji: 'roppyaku', irregular: true },
      { num: 700, kanji: '七百', furigana: 'ななひゃく', romaji: 'nanahyaku', irregular: false },
      { num: 800, kanji: '八百', furigana: 'はっぴゃく', romaji: 'happyaku', irregular: true },
      { num: 900, kanji: '九百', furigana: 'きゅうひゃく', romaji: 'kyuuhyaku', irregular: false },
      { num: '?', kanji: '何百', furigana: 'なんびゃく', romaji: 'nanbyaku', irregular: true }
    ]
  },
  {
    id: 'basic_1000',
    title: '千的進位 (1000 ~ 9000)',
    description: '注意 3000(濁音)、8000(促音) 的不規則變化。',
    table: [
      { num: 1000, kanji: '千', furigana: 'せん', romaji: 'sen', irregular: false },
      { num: 2000, kanji: '二千', furigana: 'にせん', romaji: 'nisen', irregular: false },
      { num: 3000, kanji: '三千', furigana: 'さんぜん', romaji: 'sanzen', irregular: true },
      { num: 4000, kanji: '四千', furigana: 'よんせん', romaji: 'yonsen', irregular: false },
      { num: 5000, kanji: '五千', furigana: 'ごせん', romaji: 'gosen', irregular: false },
      { num: 6000, kanji: '六千', furigana: 'ろくせん', romaji: 'rokusen', irregular: false },
      { num: 7000, kanji: '七千', furigana: 'ななせん', romaji: 'nanasen', irregular: false },
      { num: 8000, kanji: '八千', furigana: 'はっせん', romaji: 'hassen', irregular: true },
      { num: 9000, kanji: '九千', furigana: 'きゅうせん', romaji: 'kyuusen', irregular: false },
      { num: '?', kanji: '何千', furigana: 'なんぜん', romaji: 'nanzen', irregular: true }
    ]
  },
  {
    id: 'basic_10000',
    title: '大數進位 (萬、億、兆)',
    description: '日文與中文一樣為「四位一進」。十萬、百萬等都以此類推。',
    table: [
      { num: '1萬', kanji: '一万', furigana: 'いちまん', romaji: 'ichiman', irregular: false },
      { num: '10萬', kanji: '十万', furigana: 'じゅうまん', romaji: 'juuman', irregular: false },
      { num: '100萬', kanji: '百万', furigana: 'ひゃくまん', romaji: 'hyakuman', irregular: false },
      { num: '1000萬', kanji: '千万', furigana: 'せんまん', romaji: 'senman', irregular: false },
      { num: '1億', kanji: '一億', furigana: 'いちおく', romaji: 'ichioku', irregular: false },
      { num: '10億', kanji: '十億', furigana: 'じゅうおく', romaji: 'juuoku', irregular: false },
      { num: '100億', kanji: '百億', furigana: 'ひゃくおく', romaji: 'hyakuoku', irregular: false },
      { num: '1兆', kanji: '一兆', furigana: 'いっちょう', romaji: 'icchou', irregular: true }
    ]
  }
];

// Add basic numbers to the BEGINNING of the counters array
data.counters.unshift(...basicNumbers);

const outputString = 'window.JLPT_DATA = ' + JSON.stringify(data, null, 2) + ';\nif (typeof module !== \x27undefined\x27) { module.exports = window.JLPT_DATA; }';
fs.writeFileSync('data.js', outputString, 'utf8');
console.log('Basic numbers prepended to data.counters in data.js');
