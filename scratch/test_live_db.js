async function run() {
  const r = await fetch('https://jlpt-n5-textbook.o10040115.workers.dev/data_n5.js');
  const t = await r.text();
  const lines = t.split('\n');
  const catLines = lines.filter(l => l.includes('"category":'));
  console.log('Total categories found:', catLines.length);
  console.log('Unique categories:', [...new Set(catLines.map(l => l.trim()))]);
}
run();
