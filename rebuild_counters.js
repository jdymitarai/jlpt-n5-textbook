const fs = require('fs');
const vm = require('vm');

let counterTables = {};
try {
  const fileData = fs.readFileSync('temp_counter_tables.json', 'utf8');
  counterTables = JSON.parse(fileData).counterTables;
} catch (e) {
  console.log("Could not parse temp_counter_tables.json", e.message);
}

const mapCounter = (list) => {
  if (!list) return [];
  return list.map(item => ({
    num: item.num || item.number,
    kanji: item.jp || item.ja || item.kanji,
    furigana: item.furigana,
    romaji: item.romaji || '',
    irregular: !!item.note || false
  }));
};

let data = fs.readFileSync('data.js', 'utf8');

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(data, ctx);

const JLPT_DATA = ctx.window.JLPT_DATA;
JLPT_DATA.counters = [
  {
    id: 'tsu',
    title: '物品個數 (一つ、二つ...)',
    description: '用於計算沒有特定形狀的物品、抽象事物或年齡(幼兒)。9以下有特殊唸法。',
    table: mapCounter(counterTables.items)
  },
  {
    id: 'nin',
    title: '人數計算 (一人、二人...)',
    description: '用於計算人數。注意 1人 和 2人 是特殊的「ひとり」、「ふたり」。',
    table: mapCounter(counterTables.people)
  },
  {
    id: 'nichi',
    title: '月份日期 (一日、二日...)',
    description: '用於日期。1日~10日、14日、20日、24日都有特殊唸法。',
    table: mapCounter(counterTables.days)
  }
];

const newData = `window.JLPT_DATA = ${JSON.stringify(JLPT_DATA, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Restored base counters.');
