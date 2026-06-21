const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const oldTableHead = `                  <thead>
                    <tr>
                      <th>動詞原形</th>
                      <th>ます形</th>
                      <th>て形</th>
                      <th>ない形</th>
                      <th>中文釋義</th>
                      <th>分類群組</th>
                    </tr>
                  </thead>`;
const newTableHead = `                  <thead>
                    <tr>
                      <th style="min-width: 90px;">動詞原形</th>
                      <th style="min-width: 100px;">ます形(敬體)</th>
                      <th style="min-width: 90px;">て形(接續)</th>
                      <th style="min-width: 90px;">た形(過去)</th>
                      <th style="min-width: 110px;">ない形(否定)</th>
                      <th style="min-width: 130px;">なかった形(過去否定)</th>
                      <th style="min-width: 100px;">中文釋義</th>
                      <th style="min-width: 110px;">分類群組</th>
                    </tr>
                  </thead>`;

if (html.includes(oldTableHead)) {
  html = html.replace(oldTableHead, newTableHead);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('oldTableHead not found in index.html');
}

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');
const oldVerbRow = `        const tr = document.createElement("tr");
        tr.innerHTML = \`
          <td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}">\${v.dictionary}</td>
          <td class="clickable-jp" data-speech="\${v.masu.split(" ")[0]}">\${v.masu}</td>
          <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}">\${v.te}</td>
          <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}">\${v.nai}</td>
          <td>\${v.meaning}</td>
          <td><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></td>
        \`;`;

const newVerbRow = `        // Calculate ta form (past) and nakatta form (past negative) automatically
        const teText = v.te.split(" ")[0];
        const taText = teText.replace(/て$/, 'た').replace(/で$/, 'だ');
        const taStr = v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ'); // simple replace for both jp and romaji if present
        
        const naiText = v.nai.split(" ")[0];
        const nakattaText = naiText.replace(/ない$/, 'なかった');
        const nakattaStr = v.nai.replace(/ない(?!.*ない)/, 'なかった');

        const tr = document.createElement("tr");
        tr.innerHTML = \`
          <td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}">\${v.dictionary}</td>
          <td class="clickable-jp" data-speech="\${v.masu.split(" ")[0]}">\${v.masu}</td>
          <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}">\${v.te}</td>
          <td class="clickable-jp" data-speech="\${taText}" style="color:#3B82F6;">\${taStr}</td>
          <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}">\${v.nai}</td>
          <td class="clickable-jp" data-speech="\${nakattaText}" style="color:#EF4444;">\${nakattaStr}</td>
          <td>\${v.meaning}</td>
          <td><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></td>
        \`;`;

if (appJS.includes(oldVerbRow)) {
  appJS = appJS.replace(oldVerbRow, newVerbRow);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully.');
} else {
  console.log('oldVerbRow not found in app.js');
}
