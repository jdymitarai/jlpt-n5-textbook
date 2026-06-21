const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Pronouns Subtab Button
const targetBtn = '<button class="btn btn-secondary subtab-btn" data-subtab="demonstratives">指示與疑問詞</button>';
const newBtn = '<button class="btn btn-secondary subtab-btn" data-subtab="pronouns">代名詞</button>';

if (html.includes(targetBtn) && !html.includes('data-subtab="pronouns"')) {
  html = html.replace(targetBtn, targetBtn + '\n            ' + newBtn);
  console.log("Added pronouns button");
}

// 2. Add Pronouns Subtab View
const targetView = '<!-- 5. 副詞總整理 -->';
const newView = `<!-- 5. 代名詞 -->
            <div id="subtab-pronouns-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">人稱與反身代名詞</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">日文的代名詞會根據性別、親疏遠近與禮貌程度而有不同的變化。點擊單字可聽發音。</p>
              <div id="pronouns-container"></div>
            </div>

            `;

if (html.includes(targetView) && !html.includes('subtab-pronouns-view')) {
  html = html.replace(targetView, newView + targetView);
  console.log("Added pronouns view container");
}

fs.writeFileSync('index.html', html, 'utf8');
