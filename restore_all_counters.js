const fs = require('fs');

const indexPath = 'C:\\ai\\jlpt-n5-textbook\\index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Replace subtab-counters-view content
const oldHtml = `            <div id="subtab-counters-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">日檢 N5 特殊計數與時間量詞</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">日文的數量計量詞發音變化多端（尤其是 1、2、4、8、10 等數字），此處統整最常考的三大量詞表。</p>
              <div class="counters-grid-container">
                <div class="counter-box">
                  <h4 class="counter-header">物品個數 (一つ、二つ...)</h4>
                  <div class="counter-cards-grid" id="grid-counter-items"></div>
                </div>
                <div class="counter-box">
                  <h4 class="counter-header">人數計算 (一人、二人...)</h4>
                  <div class="counter-cards-grid" id="grid-counter-people"></div>
                </div>
                <div class="counter-box">
                  <h4 class="counter-header">月份日期 (一日、二日...)</h4>
                  <div class="counter-cards-grid" id="grid-counter-days"></div>
                </div>
              </div>
            </div>`;

const newHtml = `            <div id="subtab-counters-view" class="consolidation-view hide">
              <div id="counters-dynamic-container" class="counters-container">
                <!-- Counters dynamically generated from JLPT_DATA.counters here -->
              </div>
            </div>`;

if (indexHtml.includes(oldHtml)) {
    indexHtml = indexHtml.replace(oldHtml, newHtml);
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log("Patched index.html");
} else {
    console.log("Could not find target html in index.html");
}

const appPath = 'C:\\ai\\jlpt-n5-textbook\\app.js';
let appJs = fs.readFileSync(appPath, 'utf8');

const oldAppLogic = `    // 12. Render Counters
    const renderCounterGrid = (containerId, dataArray) => {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = "";
      if (!dataArray || dataArray.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); text-align: center;">暫無資料</p>';
        return;
      }
      dataArray.forEach(item => {
        const html = \`
          <div class="counter-card" style="cursor: pointer; transition: transform 0.2s; border: 1px solid var(--border-color); padding: 12px; border-radius: 8px; text-align: center; background: var(--surface);" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="speak('\${item.jp}')">
            <div class="counter-num" style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">\${item.num}</div>
            <div class="counter-jp" style="font-size: 1.2rem; color: var(--primary); font-weight: 700;">\${item.jp}</div>
            <div class="counter-furigana" style="font-size: 0.85rem; color: var(--text-secondary);">\${item.furigana}</div>
          </div>
        \`;
        container.insertAdjacentHTML("beforeend", html);
      });
    };
    
    if (JLPT_DATA.counterTables) {
      renderCounterGrid("grid-counter-items", JLPT_DATA.counterTables.items);
      renderCounterGrid("grid-counter-people", JLPT_DATA.counterTables.people);
      renderCounterGrid("grid-counter-days", JLPT_DATA.counterTables.days);
    }`;

const newAppLogic = `    // 12. Render Full Counters
    const renderFullCounters = () => {
      const container = document.getElementById("counters-dynamic-container");
      if (!container) return;
      container.innerHTML = "";
      
      if (!JLPT_DATA.counters || JLPT_DATA.counters.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:20px; color:var(--text-secondary);">暫無資料</p>';
        return;
      }

      JLPT_DATA.counters.forEach(group => {
        // Group Header
        let html = \`
          <div class="counter-group" style="margin-bottom: 30px; background: var(--bg-secondary); padding: 20px; border-radius: 12px; border: 1px solid var(--border-color);">
            <h3 style="color: var(--primary); margin-bottom: 8px; display: flex; align-items: center; gap: 8px;">
              <span style="display:inline-block; width:6px; height:20px; background:var(--primary); border-radius:4px;"></span>
              \${group.title}
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px; padding-left: 14px;">\${group.description}</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 12px;">
        \`;

        // Render each item
        group.table.forEach(item => {
          let badgeHtml = item.irregular ? \`<span style="position: absolute; top: -6px; right: -6px; background: #EF4444; color: white; font-size: 0.65rem; padding: 2px 6px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">特殊</span>\` : '';
          
          let displayKanji = item.kanji || item.jp; // fallback if needed
          let displayNum = item.num;
          
          html += \`
            <div class="counter-card" style="position: relative; cursor: pointer; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; text-align: center; transition: all 0.2s; box-shadow: var(--shadow-sm);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='var(--shadow-md)'; this.style.borderColor='var(--primary)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='var(--shadow-sm)'; this.style.borderColor='var(--border-color)'" onclick="speak('\${displayKanji}')">
              \${badgeHtml}
              <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 4px; font-weight: 600;">\${displayNum}</div>
              <div style="font-size: 1.3rem; font-weight: bold; color: var(--text-primary); margin-bottom: 2px;">\${displayKanji}</div>
              <div style="font-size: 0.85rem; color: var(--primary);">\${item.furigana}</div>
              \${item.romaji ? \`<div style="font-size: 0.75rem; color: var(--text-secondary); opacity: 0.7; margin-top: 2px;">\${item.romaji}</div>\` : ''}
            </div>
          \`;
        });

        html += \`</div></div>\`;
        container.insertAdjacentHTML('beforeend', html);
      });
    };
    renderFullCounters();`;

if (appJs.includes(oldAppLogic)) {
    appJs = appJs.replace(oldAppLogic, newAppLogic);
    fs.writeFileSync(appPath, appJs, 'utf8');
    console.log("Patched app.js");
} else {
    console.log("Could not find old logic in app.js");
}
