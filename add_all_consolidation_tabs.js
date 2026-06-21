const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add buttons
const lastBtn = '<button class="btn btn-secondary subtab-btn" data-subtab="demonstratives">指示與疑問詞</button>';
const newBtns = `
            <button class="btn btn-secondary subtab-btn" data-subtab="nouns">名詞列表</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="pronouns">代名詞</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="adverbs">副詞整理</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="conjunctions">接續詞</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="particles">助詞</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="keigo">敬語</button>
`;

if (html.includes(lastBtn) && !html.includes('data-subtab="nouns"')) {
    html = html.replace(lastBtn, lastBtn + newBtns);
}

// 2. Add Views
const lastView = `              <tbody id="table-dem-body"></tbody>
                </table>
              </div>
            </div>`;

const newViews = `
            <!-- 5. 名詞 -->
            <div id="subtab-nouns-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">常用名詞整理</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">精選N5核心名詞，點擊即可聽發音。</p>
              <div id="nouns-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <!-- 6. 代名詞 -->
            <div id="subtab-pronouns-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">人稱代名詞</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊單字可聽發音。</p>
              <div id="pronouns-container"></div>
            </div>

            <!-- 7. 副詞 -->
            <div id="subtab-adverbs-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">副詞總整理</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">副詞用來修飾動詞與形容詞，掌握它們可以大幅提升句子表達力。</p>
              <div id="adverbs-container" style="display: flex; flex-direction: column; gap: 20px;"></div>
            </div>

            <!-- 8. 接續詞 -->
            <div id="subtab-conjunctions-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">接續詞整理</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">接續詞用來連接句子，表示因果、轉折、並列等關係。</p>
              <div id="conjunctions-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <!-- 9. 助詞 -->
            <div id="subtab-particles-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">助詞整理</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">日文的核心，標示詞語在句子中的文法功能。</p>
              <div id="particles-container" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <!-- 10. 敬語 -->
            <div id="subtab-keigo-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">敬語基本概念</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">包含尊他語、自謙語與丁寧語。</p>
              <div id="keigo-container" style="display: flex; flex-direction: column; gap: 20px;"></div>
            </div>
`;

if (html.includes(lastView) && !html.includes('id="subtab-nouns-view"')) {
    html = html.replace(lastView, lastView + newViews);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully added all subtabs to index.html');
