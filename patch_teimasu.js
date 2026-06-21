const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const thSearch = /<th style="min-width: 120px;">ている\(進行\/狀態\)<\/th>/;
const thReplace = `<th style="min-width: 130px;">ている / ています<br><span style="font-size:0.8em;font-weight:normal;">(進行/狀態)</span></th>`;

if (thSearch.test(html)) {
  html = html.replace(thSearch, thReplace);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('thSearch not found in index.html');
}

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');

const trSearch = /<td class="clickable-jp" data-speech="\$\{v\.te\.split\(" "\)\[0\]\}いる" style="color:#10B981;">\$\{v\.te\.replace\(\/て\(\?\!\.\*て\)\/, 'ている'\)\.replace\(\/で\(\?\!\.\*で\)\/, 'でいる'\)\}<\/td>/;

const trReplace = `<td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}います" style="color:#10B981; line-height: 1.4;">
            <div>\${v.te.replace(/て(?!.*て)/, 'ている').replace(/で(?!.*で)/, 'でいる')}</div>
            <div style="font-size:0.85em; opacity:0.8;">\${v.te.replace(/て(?!.*て)/, 'ています').replace(/で(?!.*で)/, 'でいます')}</div>
          </td>`;

if (trSearch.test(appJS)) {
  appJS = appJS.replace(trSearch, trReplace);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully.');
} else {
  console.log('trSearch not found in app.js');
}
