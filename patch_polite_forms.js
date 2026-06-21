const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// The headers to replace
const thTaSearch = /<th style="min-width: 90px;">た形\(過去\)<\/th>/;
const thTaReplace = `<th style="min-width: 120px;">た形 / ました<br><span style="font-size:0.8em;font-weight:normal;">(過去)</span></th>`;

const thNaiSearch = /<th style="min-width: 110px;">ない形\(否定\)<\/th>/;
const thNaiReplace = `<th style="min-width: 120px;">ない形 / ません<br><span style="font-size:0.8em;font-weight:normal;">(否定)</span></th>`;

const thNakattaSearch = /<th style="min-width: 130px;">なかった形\(過去否定\)<\/th>/;
const thNakattaReplace = `<th style="min-width: 140px;">なかった / ませんでした<br><span style="font-size:0.8em;font-weight:normal;">(過去否定)</span></th>`;

if (thTaSearch.test(html)) {
  html = html.replace(thTaSearch, thTaReplace);
}
if (thNaiSearch.test(html)) {
  html = html.replace(thNaiSearch, thNaiReplace);
}
if (thNakattaSearch.test(html)) {
  html = html.replace(thNakattaSearch, thNakattaReplace);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html headers updated successfully.');

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');

// Original replacement string for these cells:
// <td class="clickable-jp" data-speech="${v.te.split(" ")[0].replace(/て$/, 'た').replace(/で$/, 'だ')}" style="color:#3B82F6;">${v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ')}</td>
// <td class="clickable-jp" data-speech="${v.nai.split(" ")[0]}">${v.nai}</td>
// <td class="clickable-jp" data-speech="${v.nai.split(" ")[0].replace(/ない$/, 'なかった')}" style="color:#EF4444;">${v.nai.replace(/ない(?!.*ない)/, 'なかった')}</td>

// We need to replace them with:
// <td class="clickable-jp" data-speech="..." style="color:#3B82F6; line-height: 1.4;">
//   <div>${ta}</div>
//   <div style="font-size:0.85em; opacity:0.8;">${mashita}</div>
// </td>

// To do this reliably, I'll extract the exact template literals being replaced.
const trSearch = /<td class="clickable-jp" data-speech="\$\{v\.te\.split\(" "\)\[0\]\.replace\(\/て\$\/, 'た'\)\.replace\(\/で\$\/, 'だ'\)\}" style="color:#3B82F6;">\$\{v\.te\.replace\(\/て\(\?\!\.\*て\)\/, 'た'\)\.replace\(\/で\(\?\!\.\*で\)\/, 'だ'\)\}<\/td>\s*<td class="clickable-jp" data-speech="\$\{v\.nai\.split\(" "\)\[0\]\}">\$\{v\.nai\}<\/td>\s*<td class="clickable-jp" data-speech="\$\{v\.nai\.split\(" "\)\[0\]\.replace\(\/ない\$\/, 'なかった'\)\}" style="color:#EF4444;">\$\{v\.nai\.replace\(\/ない\(\?\!\.\*ない\)\/, 'なかった'\)\}<\/td>/;

const trReplace = `<td class="clickable-jp" data-speech="\${v.te.split(" ")[0].replace(/て$/, 'た').replace(/で$/, 'だ')}" style="color:#3B82F6; line-height: 1.4;">
              <div>\${v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ')}</div>
              <div style="font-size:0.85em; opacity:0.8;">\${v.masu.replace(/ます(?!.*ます)/, 'ました')}</div>
            </td>
            <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}" style="line-height: 1.4;">
              <div>\${v.nai}</div>
              <div style="font-size:0.85em; opacity:0.8;">\${v.masu.replace(/ます(?!.*ます)/, 'ません')}</div>
            </td>
            <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0].replace(/ない$/, 'なかった')}" style="color:#EF4444; line-height: 1.4;">
              <div>\${v.nai.replace(/ない(?!.*ない)/, 'なかった')}</div>
              <div style="font-size:0.85em; opacity:0.8;">\${v.masu.replace(/ます(?!.*ます)/, 'ませんでした')}</div>
            </td>`;

if (trSearch.test(appJS)) {
  appJS = appJS.replace(trSearch, trReplace);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js cells updated successfully.');
} else {
  console.log('trSearch not found in app.js');
}
