const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startTag = '<div class="adjectives-split-container">';
const endTag = '<!-- 3. 常用量詞 -->';

const startIndex = html.indexOf(startTag);
const endIndex = html.indexOf(endTag);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `<div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;" id="adj-context-filter">
                <strong style="font-size:0.85rem; color:var(--text-secondary);">情境場合：</strong>
                <button class="filter-btn active" data-context="All" style="padding: 4px 10px; font-size: 0.8rem;">全部</button>
                <button class="filter-btn" data-context="情感與心理狀態" style="padding: 4px 10px; font-size: 0.8rem;">情感與心理</button>
                <button class="filter-btn" data-context="五官感知" style="padding: 4px 10px; font-size: 0.8rem;">五官感知</button>
                <button class="filter-btn" data-context="物理狀態與性質" style="padding: 4px 10px; font-size: 0.8rem;">物理與性質</button>
                <button class="filter-btn" data-context="性格與人際評價" style="padding: 4px 10px; font-size: 0.8rem;">性格與評價</button>
                <button class="filter-btn" data-context="抽象概念與價值判斷" style="padding: 4px 10px; font-size: 0.8rem;">抽象與價值</button>
              </div>
              <div style="overflow-x: auto;">
                <table class="consolidation-table">
                  <thead>
                    <tr>
                      <th style="width: 60px;">級別</th>
                      <th style="min-width: 120px;">日文 (原形)</th>
                      <th style="min-width: 100px;">中文釋義</th>
                      <th style="min-width: 80px;">詞性</th>
                      <th style="min-width: 130px;">分類 / 情境</th>
                      <th style="width: 60px;">時態</th>
                    </tr>
                  </thead>
                  <tbody id="table-adj-body">
                    <!-- Javascript 渲染 -->
                  </tbody>
                </table>
              </div>
            </div>

            `;
            
  html = html.substring(0, startIndex) + replacement + html.substring(endIndex);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully for adjectives unified table.');
} else {
  console.log('Could not find start or end tags in index.html');
}
