const fs = require('fs');

const timeCounters = [
  {
    title: '月份 (～月)',
    items: [
      { number: '1', ja: '一月', furigana: 'いちがつ', romaji: 'ichi-gatsu' },
      { number: '2', ja: '二月', furigana: 'にがつ', romaji: 'ni-gatsu' },
      { number: '3', ja: '三月', furigana: 'さんがつ', romaji: 'san-gatsu' },
      { number: '4', ja: '四月', furigana: 'しがつ', romaji: 'shi-gatsu', note: '注意發音：し' },
      { number: '5', ja: '五月', furigana: 'ごがつ', romaji: 'go-gatsu' },
      { number: '6', ja: '六月', furigana: 'ろくがつ', romaji: 'roku-gatsu' },
      { number: '7', ja: '七月', furigana: 'しちがつ', romaji: 'shichi-gatsu', note: '注意發音：しち' },
      { number: '8', ja: '八月', furigana: 'はちがつ', romaji: 'hachi-gatsu' },
      { number: '9', ja: '九月', furigana: 'くがつ', romaji: 'ku-gatsu', note: '注意發音：く' },
      { number: '10', ja: '十月', furigana: 'じゅうがつ', romaji: 'juu-gatsu' },
      { number: '11', ja: '十一月', furigana: 'じゅういちがつ', romaji: 'juu-ichi-gatsu' },
      { number: '12', ja: '十二月', furigana: 'じゅうにがつ', romaji: 'juu-ni-gatsu' },
      { number: '?', ja: '何月', furigana: 'なんがつ', romaji: 'nan-gatsu', note: '幾月' }
    ]
  },
  {
    title: '日期 (1日 ~ 31日)',
    items: [
      { number: '1', ja: '一日', furigana: 'ついたち', romaji: 'tsuitachi', note: '特殊發音' },
      { number: '2', ja: '二日', furigana: 'ふつか', romaji: 'futsuka', note: '特殊發音' },
      { number: '3', ja: '三日', furigana: 'みっか', romaji: 'mikka', note: '特殊發音' },
      { number: '4', ja: '四日', furigana: 'よっか', romaji: 'yokka', note: '特殊發音' },
      { number: '5', ja: '五日', furigana: 'いつか', romaji: 'itsuka', note: '特殊發音' },
      { number: '6', ja: '六日', furigana: 'むいか', romaji: 'muika', note: '特殊發音' },
      { number: '7', ja: '七日', furigana: 'なのか', romaji: 'nanoka', note: '特殊發音' },
      { number: '8', ja: '八日', furigana: 'ようか', romaji: 'youka', note: '特殊發音' },
      { number: '9', ja: '九日', furigana: 'ここのか', romaji: 'kokonoka', note: '特殊發音' },
      { number: '10', ja: '十日', furigana: 'とおか', romaji: 'tooka', note: '特殊發音' },
      { number: '14', ja: '十四日', furigana: 'じゅうよっか', romaji: 'juu-yokka', note: '特殊發音' },
      { number: '20', ja: '二十日', furigana: 'はつか', romaji: 'hatsuka', note: '特殊發音' },
      { number: '24', ja: '二十四日', furigana: 'にじゅうよっか', romaji: 'ni-juu-yokka', note: '特殊發音' },
      { number: '?', ja: '何日', furigana: 'なんにち', romaji: 'nan-nichi', note: '幾號 / 幾天' }
    ]
  },
  {
    title: '星期 (〜曜日)',
    items: [
      { number: '一', ja: '月曜日', furigana: 'げつようび', romaji: 'getsu-youbi' },
      { number: '二', ja: '火曜日', furigana: 'かようび', romaji: 'ka-youbi' },
      { number: '三', ja: '水曜日', furigana: 'すいようび', romaji: 'sui-youbi' },
      { number: '四', ja: '木曜日', furigana: 'もくようび', romaji: 'moku-youbi' },
      { number: '五', ja: '金曜日', furigana: 'きんようび', romaji: 'kin-youbi' },
      { number: '六', ja: '土曜日', furigana: 'どようび', romaji: 'do-youbi' },
      { number: '日', ja: '日曜日', furigana: 'にちようび', romaji: 'nichi-youbi' },
      { number: '?', ja: '何曜日', furigana: 'なんようび', romaji: 'nan-youbi', note: '星期幾' }
    ]
  },
  {
    title: '點鐘 (〜時)',
    items: [
      { number: '1', ja: '一時', furigana: 'いちじ', romaji: 'ichi-ji' },
      { number: '2', ja: '二時', furigana: 'にじ', romaji: 'ni-ji' },
      { number: '3', ja: '三時', furigana: 'さんじ', romaji: 'san-ji' },
      { number: '4', ja: '四時', furigana: 'よじ', romaji: 'yo-ji', note: '注意發音：よ' },
      { number: '5', ja: '五時', furigana: 'ごじ', romaji: 'go-ji' },
      { number: '6', ja: '六時', furigana: 'ろくじ', romaji: 'roku-ji' },
      { number: '7', ja: '七時', furigana: 'しちじ', romaji: 'shichi-ji', note: '注意發音：しち' },
      { number: '8', ja: '八時', furigana: 'はちじ', romaji: 'hachi-ji' },
      { number: '9', ja: '九時', furigana: 'くじ', romaji: 'ku-ji', note: '注意發音：く' },
      { number: '10', ja: '十時', furigana: 'じゅうじ', romaji: 'juu-ji' },
      { number: '11', ja: '十一時', furigana: 'じゅういちじ', romaji: 'juu-ichi-ji' },
      { number: '12', ja: '十二時', furigana: 'じゅうにじ', romaji: 'juu-ni-ji' },
      { number: '?', ja: '何時', furigana: 'なんじ', romaji: 'nan-ji', note: '幾點' }
    ]
  },
  {
    title: '分鐘 (〜分)',
    items: [
      { number: '1', ja: '一分', furigana: 'いっぷん', romaji: 'ippun', note: '促音+半濁音' },
      { number: '2', ja: '二分', furigana: 'にふん', romaji: 'ni-fun' },
      { number: '3', ja: '三分', furigana: 'さんぷん', romaji: 'san-pun', note: '半濁音' },
      { number: '4', ja: '四分', furigana: 'よんぷん', romaji: 'yon-pun', note: '半濁音' },
      { number: '5', ja: '五分', furigana: 'ごふん', romaji: 'go-fun' },
      { number: '6', ja: '六分', furigana: 'ろっぷん', romaji: 'roppun', note: '促音+半濁音' },
      { number: '7', ja: '七分', furigana: 'ななふん', romaji: 'nana-fun' },
      { number: '8', ja: '八分', furigana: 'はっぷん', romaji: 'happun', note: '促音+半濁音' },
      { number: '9', ja: '九分', furigana: 'きゅうふん', romaji: 'kyuu-fun' },
      { number: '10', ja: '十分', furigana: 'じゅっぷん', romaji: 'juppun', note: '促音+半濁音' },
      { number: '30', ja: '三十分', furigana: 'さんじゅっぷん / はん', romaji: 'san-juppun / han', note: '半' },
      { number: '?', ja: '何分', furigana: 'なんぷん', romaji: 'nan-pun', note: '幾分' }
    ]
  }
];

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

// Filter out if they already exist (just in case)
const existingTitles = data.counters.map(c => c.title);
const itemsToAdd = timeCounters.filter(tc => !existingTitles.includes(tc.title));

data.counters = [...data.counters, ...itemsToAdd];

// Write back to data.js
const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');

console.log('Added ' + itemsToAdd.length + ' time/calendar counters.');
