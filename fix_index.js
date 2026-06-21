const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target1 = `<th>ない形</th>`;
const target2 = `<th>中文釋義</th>`;
const idx1 = html.indexOf(target1);
if (idx1 !== -1) {
  const nextTargetIdx = html.indexOf(target2, idx1);
  if (nextTargetIdx !== -1) {
    html = html.substring(0, idx1 + target1.length) + '\n                      <th>可能形</th>' + html.substring(nextTargetIdx - 23, nextTargetIdx) + target2 + html.substring(nextTargetIdx + target2.length);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully inserted 可能形 into index.html');
  }
}
