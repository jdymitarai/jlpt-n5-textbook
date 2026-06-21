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

const moreCounters = [
  {
    id: 'sai',
    title: '年齡 (～歳)',
    description: '用於計算年齡。注意 1歲、8歲、10歲 以及 20歲(はたち) 的特殊念法。',
    table: [
      { num: 1, kanji: '一歳', furigana: 'いっさい', romaji: 'issai', irregular: true },
      { num: 2, kanji: '二歳', furigana: 'にさい', romaji: 'nisai', irregular: false },
      { num: 3, kanji: '三歳', furigana: 'さんさい', romaji: 'sansai', irregular: false },
      { num: 4, kanji: '四歳', furigana: 'よんさい', romaji: 'yonsai', irregular: false },
      { num: 5, kanji: '五歳', furigana: 'ごさい', romaji: 'gosai', irregular: false },
      { num: 6, kanji: '六歳', furigana: 'ろくさい', romaji: 'rokusai', irregular: false },
      { num: 7, kanji: '七歳', furigana: 'ななさい', romaji: 'nanasai', irregular: false },
      { num: 8, kanji: '八歳', furigana: 'はっさい', romaji: 'hassai', irregular: true },
      { num: 9, kanji: '九歳', furigana: 'きゅうさい', romaji: 'kyuusai', irregular: false },
      { num: 10, kanji: '十歳', furigana: 'じゅっさい', romaji: 'jussai', irregular: true },
      { num: 20, kanji: '二十歳', furigana: 'はたち', romaji: 'hatachi', irregular: true },
      { num: '?', kanji: '何歳', furigana: 'なんさい', romaji: 'nansai', irregular: false }
    ]
  },
  {
    id: 'kai_times',
    title: '次數 (～回)',
    description: '用於計算頻率與次數。1, 6, 8, 10 會發生促音變化。',
    table: [
      { num: 1, kanji: '一回', furigana: 'いっかい', romaji: 'ikkai', irregular: true },
      { num: 2, kanji: '二回', furigana: 'にかい', romaji: 'nikai', irregular: false },
      { num: 3, kanji: '三回', furigana: 'さんかい', romaji: 'sankai', irregular: false },
      { num: 4, kanji: '四回', furigana: 'よんかい', romaji: 'yonkai', irregular: false },
      { num: 5, kanji: '五回', furigana: 'ごかい', romaji: 'gokai', irregular: false },
      { num: 6, kanji: '六回', furigana: 'ろっかい', romaji: 'rokkai', irregular: true },
      { num: 7, kanji: '七回', furigana: 'ななかい', romaji: 'nanakai', irregular: false },
      { num: 8, kanji: '八回', furigana: 'はっかい', romaji: 'hakkai', irregular: true },
      { num: 9, kanji: '九回', furigana: 'きゅうかい', romaji: 'kyuukai', irregular: false },
      { num: 10, kanji: '十回', furigana: 'じゅっかい', romaji: 'jukkai', irregular: true },
      { num: '?', kanji: '何回', furigana: 'なんかい', romaji: 'nankai', irregular: false }
    ]
  },
  {
    id: 'kai_floors',
    title: '樓層 (～階)',
    description: '用於計算建築物的樓層。注意 3樓(さんがい) 與疑問詞(なんがい) 會發生濁音變化！',
    table: [
      { num: 1, kanji: '一階', furigana: 'いっかい', romaji: 'ikkai', irregular: true },
      { num: 2, kanji: '二階', furigana: 'にかい', romaji: 'nikai', irregular: false },
      { num: 3, kanji: '三階', furigana: 'さんがい', romaji: 'sangai', irregular: true },
      { num: 4, kanji: '四階', furigana: 'よんかい', romaji: 'yonkai', irregular: false },
      { num: 5, kanji: '五階', furigana: 'ごかい', romaji: 'gokai', irregular: false },
      { num: 6, kanji: '六階', furigana: 'ろっかい', romaji: 'rokkai', irregular: true },
      { num: 7, kanji: '七階', furigana: 'ななかい', romaji: 'nanakai', irregular: false },
      { num: 8, kanji: '八階', furigana: 'はっかい', romaji: 'hakkai', irregular: true },
      { num: 9, kanji: '九階', furigana: 'きゅうかい', romaji: 'kyuukai', irregular: false },
      { num: 10, kanji: '十階', furigana: 'じゅっかい', romaji: 'jukkai', irregular: true },
      { num: '?', kanji: '何階', furigana: 'なんがい', romaji: 'nangai', irregular: true }
    ]
  },
  {
    id: 'hai',
    title: '杯碗 (～杯)',
    description: '用於計算碗裝或杯裝的飲料食物。變化最多，有半濁音(ぱい)與濁音(ばい)的組合！',
    table: [
      { num: 1, kanji: '一杯', furigana: 'いっぱい', romaji: 'ippai', irregular: true },
      { num: 2, kanji: '二杯', furigana: 'にはい', romaji: 'nihai', irregular: false },
      { num: 3, kanji: '三杯', furigana: 'さんばい', romaji: 'sanbai', irregular: true },
      { num: 4, kanji: '四杯', furigana: 'よんはい', romaji: 'yonhai', irregular: false },
      { num: 5, kanji: '五杯', furigana: 'ごはい', romaji: 'gohai', irregular: false },
      { num: 6, kanji: '六杯', furigana: 'ろっぱい', romaji: 'roppai', irregular: true },
      { num: 7, kanji: '七杯', furigana: 'ななはい', romaji: 'nanahai', irregular: false },
      { num: 8, kanji: '八杯', furigana: 'はっぱい', romaji: 'happai', irregular: true },
      { num: 9, kanji: '九杯', furigana: 'きゅうはい', romaji: 'kyuuhai', irregular: false },
      { num: 10, kanji: '十杯', furigana: 'じゅっぱい', romaji: 'juppai', irregular: true },
      { num: '?', kanji: '何杯', furigana: 'なんばい', romaji: 'nanbai', irregular: true }
    ]
  },
  {
    id: 'satsu',
    title: '書籍冊數 (～冊)',
    description: '用於計算書本、雜誌、筆記本等裝訂物。1, 8, 10 有促音。',
    table: [
      { num: 1, kanji: '一冊', furigana: 'いっさつ', romaji: 'issatsu', irregular: true },
      { num: 2, kanji: '二冊', furigana: 'にさつ', romaji: 'nisatsu', irregular: false },
      { num: 3, kanji: '三冊', furigana: 'さんさつ', romaji: 'sansatsu', irregular: false },
      { num: 4, kanji: '四冊', furigana: 'よんさつ', romaji: 'yonsatsu', irregular: false },
      { num: 5, kanji: '五冊', furigana: 'ごさつ', romaji: 'gosatsu', irregular: false },
      { num: 6, kanji: '六冊', furigana: 'ろくさつ', romaji: 'rokusatsu', irregular: false },
      { num: 7, kanji: '七冊', furigana: 'ななさつ', romaji: 'nanasatsu', irregular: false },
      { num: 8, kanji: '八冊', furigana: 'はっさつ', romaji: 'hassatsu', irregular: true },
      { num: 9, kanji: '九冊', furigana: 'きゅうさつ', romaji: 'kyuusatsu', irregular: false },
      { num: 10, kanji: '十冊', furigana: 'じゅっさつ', romaji: 'jussatsu', irregular: true },
      { num: '?', kanji: '何冊', furigana: 'なんさつ', romaji: 'nansatsu', irregular: false }
    ]
  },
  {
    id: 'ko',
    title: '小個體 (～個)',
    description: '萬用量詞之一，用於計算小巧的立體物（如蘋果、雞蛋、橡皮擦）。',
    table: [
      { num: 1, kanji: '一個', furigana: 'いっこ', romaji: 'ikko', irregular: true },
      { num: 2, kanji: '二個', furigana: 'にこ', romaji: 'niko', irregular: false },
      { num: 3, kanji: '三個', furigana: 'さんこ', romaji: 'sanko', irregular: false },
      { num: 4, kanji: '四個', furigana: 'よんこ', romaji: 'yonko', irregular: false },
      { num: 5, kanji: '五個', furigana: 'ごこ', romaji: 'goko', irregular: false },
      { num: 6, kanji: '六個', furigana: 'ろっこ', romaji: 'rokko', irregular: true },
      { num: 7, kanji: '七個', furigana: 'ななこ', romaji: 'nanako', irregular: false },
      { num: 8, kanji: '八個', furigana: 'はっこ', romaji: 'hakko', irregular: true },
      { num: 9, kanji: '九個', furigana: 'きゅうこ', romaji: 'kyuuko', irregular: false },
      { num: 10, kanji: '十個', furigana: 'じゅっこ', romaji: 'jukko', irregular: true },
      { num: '?', kanji: '何個', furigana: 'なんこ', romaji: 'nanko', irregular: false }
    ]
  }
];

// Append the new counters to the END of the counters array
data.counters.push(...moreCounters);

const outputString = 'window.JLPT_DATA = ' + JSON.stringify(data, null, 2) + ';\nif (typeof module !== \x27undefined\x27) { module.exports = window.JLPT_DATA; }';
fs.writeFileSync('data.js', outputString, 'utf8');
console.log('Appended additional counters to data.counters in data.js');
