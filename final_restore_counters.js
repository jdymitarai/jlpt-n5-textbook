const fs = require('fs');

const indexPath = 'C:\\ai\\jlpt-n5-textbook\\index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const subtabOldStart = indexHtml.indexOf('<div id="subtab-counters-view"');
if (subtabOldStart !== -1) {
  const subtabOldEnd = indexHtml.indexOf('</div>\n            </div>', subtabOldStart) + 25; // to include the closing tags
  if (subtabOldEnd > subtabOldStart) {
    const oldHtml = indexHtml.substring(subtabOldStart, subtabOldEnd);
    const newHtml = `<div id="subtab-counters-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">數字與各類量詞大全</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 20px;">包含所有基礎數字、進位念法、時間與各種專屬物品量詞，帶有「特殊」標籤者代表發音有不規則變化。</p>
              <div id="counters-dynamic-container" class="counters-container" style="display: flex; flex-direction: column; gap: 24px;">
              </div>
            </div>`;
    indexHtml = indexHtml.replace(oldHtml, newHtml);
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log("Patched index.html");
  }
}

const appPath = 'C:\\ai\\jlpt-n5-textbook\\app.js';
let appJs = fs.readFileSync(appPath, 'utf8');

// Replace renderCounterGrid and its invocations
const renderCounterGridStart = appJs.indexOf('const renderCounterGrid = (elementId, list) => {');
if (renderCounterGridStart !== -1) {
  const renderCounterGridEnd = appJs.indexOf('};', renderCounterGridStart) + 2;
  const oldFunc = appJs.substring(renderCounterGridStart, renderCounterGridEnd);
  
  const newFunc = `const renderFullCounters = () => {
    const container = document.getElementById("counters-dynamic-container");
    if (!container) return;
    container.innerHTML = "";
    
    if (!JLPT_DATA.counters || JLPT_DATA.counters.length === 0) return;

    JLPT_DATA.counters.forEach(group => {
      let html = \`
        <div class="counter-box" style="background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; box-shadow: var(--shadow-sm);">
          <h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 8px; font-size: 1.1rem; display: flex; align-items: center; gap: 8px;">
            <span style="display: inline-block; width: 4px; height: 18px; background: var(--primary); border-radius: 4px;"></span>
            \${group.title}
          </h4>
          \${group.description ? \`<p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px; margin-left: 12px;">\${group.description}</p>\` : ''}
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 12px;">
      \`;

      group.table.forEach(item => {
        let badgeHtml = item.irregular ? \`<span style="position: absolute; top: -8px; right: -8px; background: #EF4444; color: white; font-size: 0.65rem; padding: 2px 8px; border-radius: 12px; font-weight: bold; box-shadow: 0 2px 4px rgba(239,68,68,0.3);">特殊</span>\` : '';
        let displayKanji = item.kanji || item.jp || item.num;
        let displayNum = item.num;
        
        html += \`
          <div class="clickable-jp" data-speech="\${displayKanji}" style="position: relative; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px 8px; text-align: center; cursor: pointer; transition: all 0.2s;" onmouseenter="this.style.borderColor='var(--primary)'; this.style.transform='translateY(-2px)';" onmouseleave="this.style.borderColor='var(--border-color)'; this.style.transform='translateY(0)';">
            \${badgeHtml}
            <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px;">\${displayNum}</div>
            <div style="font-size: 1.25rem; font-weight: bold; color: var(--text-primary); margin-bottom: 2px;">\${displayKanji}</div>
            <div style="font-size: 0.85rem; color: var(--primary); font-weight: 500;">\${item.furigana}</div>
            \${item.romaji ? \`<div style="font-size: 0.75rem; color: var(--text-secondary); opacity: 0.7; margin-top: 2px;">\${item.romaji}</div>\` : ''}
          </div>
        \`;
      });

      html += \`</div></div>\`;
      container.insertAdjacentHTML('beforeend', html);
    });
    
    // Bind speak
    container.querySelectorAll(".clickable-jp").forEach(el => {
      el.onclick = (e) => {
        e.stopPropagation();
        const text = el.getAttribute("data-speech");
        const cleanText = text.replace(/\\([^)]*\\)/g, "").trim();
        speak(cleanText);
        el.classList.add("ripple-effect");
        setTimeout(() => el.classList.remove("ripple-effect"), 300);
      };
    });
  };`;
  appJs = appJs.replace(oldFunc, newFunc);
  console.log("Patched renderCounterGrid -> renderFullCounters");
}

// Remove old calls and add new call
const oldCalls = `    renderCounterGrid("grid-counter-items", JLPT_DATA.counterTables.items);
    renderCounterGrid("grid-counter-people", JLPT_DATA.counterTables.people);
    renderCounterGrid("grid-counter-days", JLPT_DATA.counterTables.days);`;

if (appJs.includes(oldCalls)) {
  appJs = appJs.replace(oldCalls, `    renderFullCounters();`);
  console.log("Patched invocation");
}

// Fix navigation for "counters"
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

if (appJs.includes(navOld)) {
    appJs = appJs.replace(navOld, navNew);
    console.log("Patched navigation hook");
}

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
if (appJs.includes(triggerOld)) {
    appJs = appJs.replace(triggerOld, triggerNew);
    console.log("Patched navigation trigger");
}

fs.writeFileSync(appPath, appJs, 'utf8');
console.log("Done patching app.js!");
