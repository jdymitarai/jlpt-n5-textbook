const fs = require('fs');
let appJS = fs.readFileSync('app.js', 'utf8');

// 1. Add currentAdvContext variable
const varTarget = "let currentAdjContext = 'All';";
const varReplacement = "let currentAdjContext = 'All';\nlet currentAdvContext = 'All';";
if (appJS.includes(varTarget) && !appJS.includes('let currentAdvContext')) {
  appJS = appJS.replace(varTarget, varReplacement);
}

// 2. Add advContextBtns listeners in setupConsolidationFilter
const filterTarget = `const adjContextBtns = document.querySelectorAll('#adj-context-filter .filter-btn');`;
const filterReplacement = `const advContextBtns = document.querySelectorAll('#adv-context-filter .filter-btn');
    if (advContextBtns.length > 0) {
      advContextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          advContextBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          currentAdvContext = e.target.getAttribute('data-context');
          renderConsolidationData();
        });
      });
    }

    const adjContextBtns = document.querySelectorAll('#adj-context-filter .filter-btn');`;
if (appJS.includes(filterTarget) && !appJS.includes('advContextBtns')) {
  appJS = appJS.replace(filterTarget, filterReplacement);
}

// 3. Add adverbs rendering logic in renderConsolidationData
const renderTarget = `// Bind speech handlers for new elements`;
const renderReplacement = `// 5. Render Adverbs
    const advContainer = document.getElementById("adverbs-container");
    if (advContainer) {
      advContainer.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const adverbs = JLPT_DATA.adverbsGroup[lvl] || [];
        adverbs.forEach(a => {
          if (currentAdvContext !== 'All' && a.context !== currentAdvContext) return;
          hasData = true;
          
          let subBadgeColor = '#8B5CF6';
          let subBadgeBg = 'rgba(139, 92, 246, 0.1)';
          if (a.context === '時間與頻率') { subBadgeColor = '#3B82F6'; subBadgeBg = 'rgba(59, 130, 246, 0.1)'; }
          if (a.context === '程度與數量') { subBadgeColor = '#F59E0B'; subBadgeBg = 'rgba(245, 158, 11, 0.1)'; }
          if (a.context === '狀態與模樣') { subBadgeColor = '#10B981'; subBadgeBg = 'rgba(16, 185, 129, 0.1)'; }

          const html = \`
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="vertical-align: middle;">\${getLvlBadge(lvl)}</td>
              <td style="vertical-align: middle;">
                <div class="clickable-jp" data-speech="\${a.word}" style="font-size: 1.1em; font-weight: bold; color: var(--text-primary); cursor: pointer; display: inline-block;">\${a.word}</div>
              </td>
              <td style="vertical-align: middle; color: var(--text-secondary);">\${a.meaning}</td>
              <td style="vertical-align: middle;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 0.8em; padding: 4px 8px; border-radius: 4px; background: \${subBadgeBg}; color: \${subBadgeColor};">\${a.context}</span>
                  <span style="font-size: 0.8em; color: var(--text-secondary);">\${a.subcontext}</span>
                </div>
              </td>
            </tr>
          \`;
          advContainer.insertAdjacentHTML("beforeend", html);
        });
      });
      
      if (!hasData) {
        advContainer.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
      }
    }

    // Bind speech handlers for new elements`;

if (appJS.includes(renderTarget) && !appJS.includes('// 5. Render Adverbs\n    const advContainer')) {
  appJS = appJS.replace(renderTarget, renderReplacement);
}

fs.writeFileSync('app.js', appJS, 'utf8');
console.log('Successfully updated app.js with adverbs rendering and filter logic.');
