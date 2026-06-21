const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('data-subtab="counters"')) {
  html = html.replace(
    '<button class="btn btn-secondary subtab-btn" data-subtab="tenses">四大詞性時態對照</button>',
    '<button class="btn btn-secondary subtab-btn" data-subtab="tenses">四大詞性時態對照</button>\n            <button class="btn btn-secondary subtab-btn" data-subtab="counters">數字與量詞</button>'
  );

  const viewHtml = `
            <!-- Counters View -->
            <div id="subtab-counters-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">數字與特殊量詞整理</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">點擊日文可聆聽發音。熟記特殊發音的量詞是日檢必考重點，尤其是標示為紅色的不規則變化。</p>
              <div id="consolidation-counters-container"></div>
            </div>
`;
  html = html.replace('<!-- 7. 必考助詞對照 -->', viewHtml + '\n            <!-- 7. 必考助詞對照 -->');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log("Updated index.html");
}

// 2. Update app.js
let app = fs.readFileSync('app.js', 'utf8');
if (!app.includes('// 12. Render Counters')) {
  const codeToInject = `
    // 12. Render Counters
    const countersContainer = document.getElementById("consolidation-counters-container");
    if (countersContainer && JLPT_DATA.counters) {
      countersContainer.innerHTML = "";
      JLPT_DATA.counters.forEach(group => {
        let tableHtml = \`<div class="grammar-card glass-card" style="margin-bottom: 24px;">
          <h4 style="color: var(--primary); margin-bottom: 8px;">\${group.title}</h4>
          <p style="color: var(--text-secondary); font-size: 0.85em; margin-bottom: 12px;">\${group.description}</p>
          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 20%;">數值</th>
                  <th style="width: 40%;">日文漢字</th>
                  <th style="width: 40%;">平假名標音</th>
                </tr>
              </thead>
              <tbody>
        \`;
        
        group.table.forEach(item => {
          const isIrr = item.irregular ? 'color: #ef4444; font-weight: bold;' : '';
          const bgIrr = item.irregular ? 'background: rgba(239, 68, 68, 0.05);' : '';
          tableHtml += \`
                <tr style="\${bgIrr}">
                  <td style="font-weight: bold; \${isIrr}">\${item.num}</td>
                  <td><div class="clickable-jp" data-speech="\${item.kanji || item.furigana}" style="\${isIrr}">\${item.kanji || item.furigana}</div></td>
                  <td style="\${isIrr}">\${item.furigana}</td>
                </tr>
          \`;
        });
        
        tableHtml += \`</tbody></table></div></div>\`;
        countersContainer.innerHTML += tableHtml;
      });
    }
`;
  app = app.replace('// --- Apply global search filtering if needed ---', codeToInject + '\n    // --- Apply global search filtering if needed ---');
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Updated app.js");
}
