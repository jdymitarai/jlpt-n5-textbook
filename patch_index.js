const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add buttons
const buttonsRegex = /(<button class="btn btn-secondary subtab-btn" data-subtab="demonstratives">指示與疑問詞<\/button>)/;
const newButtons = `
            <button class="btn btn-secondary subtab-btn" data-subtab="adverbs">副詞總整理</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="conjunctions">接續詞整理</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="particles">必考助詞對照</button>`;
html = html.replace(buttonsRegex, `$1${newButtons}`);

// Add views
const viewsRegex = /(<div id="subtab-demonstratives-view" class="consolidation-view hide">[\s\S]*?<\/table>\s*<\/div>\s*<\/div>)/;
const newViews = `

            <!-- 5. 副詞總整理 -->
            <div id="subtab-adverbs-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">副詞總整理 (程度、頻率、時間、狀態)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊日文副詞可聆聽發音。副詞不具備活用變化，主要用於修飾動詞與形容詞，是日檢語意判斷的關鍵。</p>
              <div id="adverbs-container"></div>
            </div>

            <!-- 6. 接續詞整理 -->
            <div id="subtab-conjunctions-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">接續詞整理 (順接、逆接、並列)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊接續詞可聆聽發音。接續詞負責串連句子，表示因果、轉折、附加等邏輯，是閱讀測驗的核心解題線索。</p>
              <div id="conjunctions-container"></div>
            </div>

            <!-- 7. 助詞大補帖 -->
            <div id="subtab-particles-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">必考助詞大補帖</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">日檢文法的靈魂！統整 N5 最容易混淆的助詞（は/が/を/に/で/へ/と），並附上對比例句。</p>
              <div id="particles-container"></div>
            </div>`;
html = html.replace(viewsRegex, `$1${newViews}`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html patched with new subtabs');
