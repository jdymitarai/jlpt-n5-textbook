const fs = require('fs');

// Patch index.html
let html = fs.readFileSync('index.html', 'utf8');

// Remove the button
html = html.replace(/<button class="btn btn-secondary subtab-btn" data-subtab="counters">時間與常用量詞<\/button>\s*/g, '');

// Remove the view
const viewStart = html.indexOf('<!-- 3. 時間與常用量詞 -->');
if (viewStart !== -1) {
  const viewEndMarker = '<!-- 4. 指示與疑問詞 -->';
  const viewEnd = html.indexOf(viewEndMarker);
  if (viewEnd !== -1) {
    html = html.substring(0, viewStart) + html.substring(viewEnd);
  }
}
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html patched');

// Patch app.js
let app = fs.readFileSync('app.js', 'utf8');

// Remove render logic
const renderLogicStart = app.indexOf('// 4. Render Counters');
if (renderLogicStart !== -1) {
  const renderLogicEndMarker = 'const adverbsContainer = document.getElementById("adverbs-container");';
  const renderLogicEnd = app.indexOf(renderLogicEndMarker);
  if (renderLogicEnd !== -1) {
    // Keep '    // 5. Render Adverbs\n' part intact, just remove from Start to End
    const precedingComment = app.lastIndexOf('// 5. Render Adverbs', renderLogicEnd);
    app = app.substring(0, renderLogicStart) + app.substring(precedingComment);
  }
}

fs.writeFileSync('app.js', app, 'utf8');
console.log('app.js patched');

