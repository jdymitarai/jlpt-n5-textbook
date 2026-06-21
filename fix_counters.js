const fs = require('fs');
let content = fs.readFileSync('data.js', 'utf8');
const ctx = { window: {} };
const vm = require('vm');
vm.createContext(ctx);
vm.runInContext(content, ctx);
const data = ctx.window.JLPT_DATA;

data.counters.forEach(c => {
  if (c.items) {
    c.table = c.items.map(i => ({
      num: i.number,
      kanji: i.ja,
      furigana: i.furigana,
      romaji: i.romaji,
      irregular: !!i.note
    }));
    delete c.items;
  }
  if (!c.description) c.description = '';
});

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Fixed counters structure');
