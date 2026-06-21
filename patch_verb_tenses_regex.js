const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const thSearch = /<th>動詞原形<\/th>\s*<th>ます形<\/th>\s*<th>て形<\/th>\s*<th>ない形<\/th>\s*<th>中文釋義<\/th>\s*<th>分類群組<\/th>/;
const thReplace = `<th style="min-width: 90px;">動詞原形</th>
                      <th style="min-width: 100px;">ます形(敬體)</th>
                      <th style="min-width: 90px;">て形(接續)</th>
                      <th style="min-width: 90px;">た形(過去)</th>
                      <th style="min-width: 110px;">ない形(否定)</th>
                      <th style="min-width: 130px;">なかった形(過去否定)</th>
                      <th style="min-width: 100px;">中文釋義</th>
                      <th style="min-width: 110px;">分類群組</th>`;

if (thSearch.test(html)) {
  html = html.replace(thSearch, thReplace);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('thSearch not found in index.html');
}

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');

// We need to find the specific tr building in renderConsolidationData
const trSearch = /<td class="clickable-jp" data-speech="\$\{v\.dictionary\.split\(" "\)\[0\]\}">\$\{v\.dictionary\}<\/td>\s*<td class="clickable-jp" data-speech="\$\{v\.masu\.split\(" "\)\[0\]\}">\$\{v\.masu\}<\/td>\s*<td class="clickable-jp" data-speech="\$\{v\.te\.split\(" "\)\[0\]\}">\$\{v\.te\}<\/td>\s*<td class="clickable-jp" data-speech="\$\{v\.nai\.split\(" "\)\[0\]\}">\$\{v\.nai\}<\/td>\s*<td>\$\{v\.meaning\}<\/td>\s*<td><span class="vocab-badge \$\{v\.group\.includes\("第一"\) \? "verbs" : v\.group\.includes\("第二"\) \? "people" : "time"\}">\$\{v\.group\}<\/span><\/td>/;

const trReplace = `<td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}">\${v.dictionary}</td>
          <td class="clickable-jp" data-speech="\${v.masu.split(" ")[0]}">\${v.masu}</td>
          <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}">\${v.te}</td>
          <td class="clickable-jp" data-speech="\${v.te.split(" ")[0].replace(/て$/, 'た').replace(/で$/, 'だ')}" style="color:#3B82F6;">\${v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ')}</td>
          <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}">\${v.nai}</td>
          <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0].replace(/ない$/, 'なかった')}" style="color:#EF4444;">\${v.nai.replace(/ない(?!.*ない)/, 'なかった')}</td>
          <td>\${v.meaning}</td>
          <td><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></td>`;

if (trSearch.test(appJS)) {
  appJS = appJS.replace(trSearch, trReplace);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully.');
} else {
  console.log('trSearch not found in app.js');
}
