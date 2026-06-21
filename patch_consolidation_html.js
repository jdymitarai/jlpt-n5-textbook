const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// I will find <div class="kana-controls" style="margin-bottom: 24px;"> and insert the filter before it.

const insertBlock = `
          <div class="glass-card" style="margin-bottom: 24px; padding: 16px;">
            <!-- 大分類：級別篩選 -->
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
              <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">大分類 (級別篩選)：</div>
              <div id="consolidation-level-filter" class="filter-group">
                <button class="filter-btn active" data-lvl="All">全部級別</button>
                <button class="filter-btn" data-lvl="N5">N5</button>
                <button class="filter-btn" data-lvl="N4">N4</button>
                <button class="filter-btn" data-lvl="N3">N3</button>
                <button class="filter-btn" data-lvl="N2">N2</button>
                <button class="filter-btn" data-lvl="N1">N1</button>
              </div>
            </div>
            
            <!-- 小分類：詞性切換 -->
            <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">小分類 (詞性切換)：</div>
            <div class="kana-controls" style="margin-bottom: 0;">`;

if (html.includes('<div class="kana-controls" style="margin-bottom: 24px;">')) {
  html = html.replace('<div class="kana-controls" style="margin-bottom: 24px;">', insertBlock);
  
  // We also need to add </div> at the end of the kana-controls to close the glass-card
  // Wait, let's just do it with replace regex to grab the whole kana-controls block and wrap it.
}

// Actually better:
const regex = /<div class="kana-controls" style="margin-bottom: 24px;">([\s\S]*?)<\/div>/;
if (regex.test(html)) {
  const innerBtns = html.match(regex)[1];
  html = html.replace(regex, `
          <div class="glass-card" style="margin-bottom: 24px; padding: 16px;">
            <!-- 大分類：級別篩選 -->
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
              <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">大分類 (級別篩選)：</div>
              <div id="consolidation-level-filter" class="filter-group">
                <button class="filter-btn active" data-lvl="All">全部級別</button>
                <button class="filter-btn" data-lvl="N5">N5</button>
                <button class="filter-btn" data-lvl="N4">N4</button>
                <button class="filter-btn" data-lvl="N3">N3</button>
                <button class="filter-btn" data-lvl="N2">N2</button>
                <button class="filter-btn" data-lvl="N1">N1</button>
              </div>
            </div>
            
            <!-- 小分類：詞性切換 -->
            <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">小分類 (詞性切換)：</div>
            <div class="kana-controls" style="margin-bottom: 0;">
              ${innerBtns}
            </div>
          </div>`);
}

// Update table headers to add 級別 column
if (!html.includes('<th style="width: 60px;">級別</th>\n                      <th style="min-width: 90px;">動詞原形</th>')) {
  html = html.replace(/<th style="min-width: 90px;">動詞原形<\/th>/, `<th style="width: 60px;">級別</th>\n                      <th style="min-width: 90px;">動詞原形</th>`);
}
// adjectives table 1
if (!html.includes('<th style="width: 60px;">級別</th>\n                          <th>原形</th>\n                          <th>中文含意</th>')) {
  html = html.replace(/<th>原形<\/th>\s*<th>中文含意<\/th>/g, `<th style="width: 60px;">級別</th>\n                          <th>原形</th>\n                          <th>中文含意</th>`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html wrapped successfully');
