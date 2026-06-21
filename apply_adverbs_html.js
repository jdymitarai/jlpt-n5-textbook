const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetHtml = `<div id="subtab-adverbs-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">副詞總整理 (程度、頻率、時間、狀態)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊日文副詞可聆聽發音。副詞不具備活用變化，主要用於修飾動詞與形容詞，是日檢語意判斷的關鍵。</p>
              <div id="adverbs-container"></div>
            </div>`;

const replacementHtml = `<div id="subtab-adverbs-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">副詞總整理 (程度、頻率、時間、狀態)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊日文副詞可聆聽發音。副詞不具備活用變化，主要用於修飾動詞與形容詞，是日檢語意判斷的關鍵。</p>
              
              <div class="filter-section" style="margin-bottom: 20px;">
                <span style="font-weight: bold; margin-right: 12px; color: var(--text-primary);">情境場合：</span>
                <div class="filter-group" id="adv-context-filter">
                  <button class="filter-btn active" data-context="All">全部</button>
                  <button class="filter-btn" data-context="時間與頻率">時間與頻率</button>
                  <button class="filter-btn" data-context="程度與數量">程度與數量</button>
                  <button class="filter-btn" data-context="狀態與模樣">狀態與模樣</button>
                  <button class="filter-btn" data-context="語氣與推測">語氣與推測</button>
                </div>
              </div>

              <div class="table-container">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th style="width: 10%;">級別</th>
                      <th style="width: 30%;">日文</th>
                      <th style="width: 30%;">中文</th>
                      <th style="width: 30%;">分類 / 情境</th>
                    </tr>
                  </thead>
                  <tbody id="adverbs-container"></tbody>
                </table>
              </div>
            </div>`;

if (html.includes('<div id="subtab-adverbs-view"')) {
  html = html.replace(targetHtml, replacementHtml);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully updated adverbs HTML in index.html');
} else {
  console.log('Target HTML not found.');
}
