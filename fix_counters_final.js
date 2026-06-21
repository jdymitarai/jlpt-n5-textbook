const fs = require('fs');

const appPath = 'C:\\ai\\jlpt-n5-textbook\\app.js';
let app = fs.readFileSync(appPath, 'utf8');

// 1. Fix the initNavigation routing for counters
const navOld = `      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetTab = link.getAttribute("data-tab");

        // Update active class on nav`;

const navNew = `      link.addEventListener("click", (e) => {
        e.preventDefault();
        let targetTab = link.getAttribute("data-tab");
        
        let isCounters = false;
        if (targetTab === "counters") {
          targetTab = "consolidation";
          isCounters = true;
        }

        // Update active class on nav`;

if (app.includes(navOld)) {
    app = app.replace(navOld, navNew);
}

// 1.1 Trigger subtab
const triggerOld = `        } else if (targetTab === "consolidation") {
          initConsolidationPage();
        }`;
const triggerNew = `        } else if (targetTab === "consolidation") {
          initConsolidationPage();
          if (isCounters) {
            setTimeout(() => {
              const btn = document.querySelector('.subtab-btn[data-subtab="counters"]');
              if (btn) btn.click();
            }, 50);
          }
        }`;
if (app.includes(triggerOld)) {
    app = app.replace(triggerOld, triggerNew);
}

// 2. Add renderCountersTab inside renderConsolidationData
const endTarget = `    // 11. Render Pronouns`;
const countersRenderLogic = `    // 12. Render Counters
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
    }
    
    // 11. Render Pronouns`;

if (app.includes(endTarget) && !app.includes('// 12. Render Counters')) {
    app = app.replace(endTarget, countersRenderLogic);
}

fs.writeFileSync(appPath, app, 'utf8');
console.log("Successfully patched app.js for counters!");
