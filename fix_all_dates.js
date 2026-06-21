const fs = require('fs');

const allDates = [
  { num: '1', kanji: '一日', furigana: 'ついたち', romaji: 'tsuitachi', irregular: true },
  { num: '2', kanji: '二日', furigana: 'ふつか', romaji: 'futsuka', irregular: true },
  { num: '3', kanji: '三日', furigana: 'みっか', romaji: 'mikka', irregular: true },
  { num: '4', kanji: '四日', furigana: 'よっか', romaji: 'yokka', irregular: true },
  { num: '5', kanji: '五日', furigana: 'いつか', romaji: 'itsuka', irregular: true },
  { num: '6', kanji: '六日', furigana: 'むいか', romaji: 'muika', irregular: true },
  { num: '7', kanji: '七日', furigana: 'なのか', romaji: 'nanoka', irregular: true },
  { num: '8', kanji: '八日', furigana: 'ようか', romaji: 'youka', irregular: true },
  { num: '9', kanji: '九日', furigana: 'ここのか', romaji: 'kokonoka', irregular: true },
  { num: '10', kanji: '十日', furigana: 'とおか', romaji: 'tooka', irregular: true },
  { num: '11', kanji: '十一日', furigana: 'じゅういちにち', romaji: 'juu-ichi-nichi', irregular: false },
  { num: '12', kanji: '十二日', furigana: 'じゅうににち', romaji: 'juu-ni-nichi', irregular: false },
  { num: '13', kanji: '十三日', furigana: 'じゅうさんにち', romaji: 'juu-san-nichi', irregular: false },
  { num: '14', kanji: '十四日', furigana: 'じゅうよっか', romaji: 'juu-yokka', irregular: true },
  { num: '15', kanji: '十五日', furigana: 'じゅうごにち', romaji: 'juu-go-nichi', irregular: false },
  { num: '16', kanji: '十六日', furigana: 'じゅうろくにち', romaji: 'juu-roku-nichi', irregular: false },
  { num: '17', kanji: '十七日', furigana: 'じゅうしちにち', romaji: 'juu-shichi-nichi', irregular: false },
  { num: '18', kanji: '十八日', furigana: 'じゅうはちにち', romaji: 'juu-hachi-nichi', irregular: false },
  { num: '19', kanji: '十九日', furigana: 'じゅうくにち', romaji: 'juu-ku-nichi', irregular: false },
  { num: '20', kanji: '二十日', furigana: 'はつか', romaji: 'hatsuka', irregular: true },
  { num: '21', kanji: '二十一日', furigana: 'にじゅういちにち', romaji: 'ni-juu-ichi-nichi', irregular: false },
  { num: '22', kanji: '二十二日', furigana: 'にじゅうににち', romaji: 'ni-juu-ni-nichi', irregular: false },
  { num: '23', kanji: '二十三日', furigana: 'にじゅうさんにち', romaji: 'ni-juu-san-nichi', irregular: false },
  { num: '24', kanji: '二十四日', furigana: 'にじゅうよっか', romaji: 'ni-juu-yokka', irregular: true },
  { num: '25', kanji: '二十五日', furigana: 'にじゅうごにち', romaji: 'ni-juu-go-nichi', irregular: false },
  { num: '26', kanji: '二十六日', furigana: 'にじゅうろくにち', romaji: 'ni-juu-roku-nichi', irregular: false },
  { num: '27', kanji: '二十七日', furigana: 'にじゅうしちにち', romaji: 'ni-juu-shichi-nichi', irregular: false },
  { num: '28', kanji: '二十八日', furigana: 'にじゅうはちにち', romaji: 'ni-juu-hachi-nichi', irregular: false },
  { num: '29', kanji: '二十九日', furigana: 'にじゅうくにち', romaji: 'ni-juu-ku-nichi', irregular: false },
  { num: '30', kanji: '三十日', furigana: 'さんじゅうにち', romaji: 'san-juu-nichi', irregular: false },
  { num: '31', kanji: '三十一日', furigana: 'さんじゅういちにち', romaji: 'san-juu-ichi-nichi', irregular: false },
  { num: '?', kanji: '何日', furigana: 'なんにち', romaji: 'nan-nichi', irregular: false }
];

let content = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

const dateCounterIndex = data.counters.findIndex(c => c.title.includes('日期 (1日 ~ 31日)'));

if (dateCounterIndex !== -1) {
  data.counters[dateCounterIndex].table = allDates;
  // Also fix description if any
  data.counters[dateCounterIndex].description = "1號到10號、14號、20號、24號為特殊發音（以紅色標記），其餘皆為一般規則（數字+にち）。";
}

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Replaced Dates counter with all 31 days.');
