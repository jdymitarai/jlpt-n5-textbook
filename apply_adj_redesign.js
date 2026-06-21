const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

// 1. Inject currentAdjContext
if (!appJS.includes('let currentAdjContext')) {
  appJS = appJS.replace('let currentVerbContext = \'All\';', 'let currentVerbContext = \'All\';\nlet currentAdjContext = \'All\';');
}

// 2. Update setupConsolidationFilter
const filterTarget = `const contextBtns = document.querySelectorAll('#verb-context-filter .filter-btn');`;
const filterReplacement = `
    const adjContextBtns = document.querySelectorAll('#adj-context-filter .filter-btn');
    if (adjContextBtns.length > 0) {
      adjContextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          adjContextBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          currentAdjContext = e.target.getAttribute('data-context');
          renderConsolidationData();
        });
      });
    }

    const contextBtns = document.querySelectorAll('#verb-context-filter .filter-btn');`;
if (!appJS.includes('adj-context-filter')) {
  appJS = appJS.replace(filterTarget, filterReplacement);
}

// 3. Replace Render Adjectives logic
const adjStartIdx = appJS.indexOf('// 2. Render Adjectives');
const countStartIdx = appJS.indexOf('// 4. Render Counters');

if (adjStartIdx !== -1 && countStartIdx !== -1) {
  const newAdjLogic = `// 2. Render Adjectives
    const tableAdj = document.getElementById("table-adj-body");
    if (tableAdj) {
      tableAdj.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const adjGroup = JLPT_DATA.adjectiveGroups[lvl] || { iAdjectives: [], naAdjectives: [] };
        
        const renderAdjective = (a, type, idxPrefix) => {
          if (currentAdjContext !== 'All' && a.context !== currentAdjContext) return;
          hasData = true;
          
          let typeColor = type === 'i' ? '#ef4444' : '#3b82f6';
          let typeBg = type === 'i' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(59, 130, 246, 0.1)';
          let typeLabel = type === 'i' ? 'い形容詞' : 'な形容詞';
          
          let rowId = 'adj-' + lvl + '-' + idxPrefix;

          const html = \`
            <tr style="border-bottom: 1px solid var(--border-color); cursor: pointer;" onclick="document.getElementById('conj-\${rowId}').classList.toggle('hidden');">
              <td style="vertical-align: middle;">\${getLvlBadge(lvl)}</td>
              <td style="line-height: 1.4; vertical-align: middle;">
                <div class="clickable-jp" data-speech="\${a.word.split(" ")[0]}" style="font-size: 1.1em; font-weight: bold; color: var(--text-primary);">\${a.word}</div>
              </td>
              <td style="vertical-align: middle;">\${a.meaning}</td>
              <td style="vertical-align: middle;">
                <span class="vocab-badge" style="background: \${typeBg}; color: \${typeColor}; border-color: \${typeBg};">\${typeLabel}</span>
              </td>
              <td style="vertical-align: middle;">
                <div style="margin-bottom: 4px;"><span class="vocab-badge" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: rgba(139, 92, 246, 0.3);">\${a.context}</span></div>
                <div><span class="vocab-badge context-badge" style="background: rgba(107, 114, 128, 0.1); color: #6B7280; border-color: rgba(107, 114, 128, 0.3);">\${a.subcontext}</span></div>
              </td>
              <td style="vertical-align: middle; text-align: center;">
                <button class="filter-btn" style="padding: 6px 10px; font-size: 0.8rem; background: var(--bg-primary); border: 1px solid var(--border-color);">變化</button>
              </td>
            </tr>
            <tr id="conj-\${rowId}" class="hidden" style="background-color: var(--bg-secondary); border-bottom: 2px solid var(--border-color);">
              <td colspan="6" style="padding: 12px;">
                <div style="display: grid; grid-template-columns: 80px 1fr 1fr; gap: 8px; font-size: 0.9em; text-align: left;">
                  
                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">否定形</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">常體</div>
                    <div class="clickable-jp" data-speech="\${a.negative.split(" / ")[0]}" style="color: #EF4444;">\${a.negative.split(" / ")[0]}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">敬體</div>
                    <div class="clickable-jp" data-speech="\${a.negative.split(" / ")[1]}" style="color: #EF4444;">\${a.negative.split(" / ")[1]}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">過去形</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">常體</div>
                    <div class="clickable-jp" data-speech="\${a.past.split(" / ")[0]}" style="color: #10B981;">\${a.past.split(" / ")[0]}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">敬體</div>
                    <div class="clickable-jp" data-speech="\${a.past.split(" / ")[1]}" style="color: #10B981;">\${a.past.split(" / ")[1]}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">過去否定</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">常體</div>
                    <div class="clickable-jp" data-speech="\${a.past_negative.split(" / ")[0]}" style="color: #8B5CF6;">\${a.past_negative.split(" / ")[0]}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">敬體</div>
                    <div class="clickable-jp" data-speech="\${a.past_negative.split(" / ")[1]}" style="color: #8B5CF6;">\${a.past_negative.split(" / ")[1]}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">其他</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">接續形 (くて/で)</div>
                    <div class="clickable-jp" data-speech="\${a.te}" style="color: #3B82F6;">\${a.te}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 4px;">副詞形 (く/に)</div>
                    <div class="clickable-jp" data-speech="\${a.adverb}" style="color: #F59E0B;">\${a.adverb}</div>
                  </div>

                </div>
              </td>
            </tr>
          \`;
          tableAdj.insertAdjacentHTML("beforeend", html);
        };
        
        adjGroup.iAdjectives.forEach((a, idx) => renderAdjective(a, 'i', 'i-' + idx));
        adjGroup.naAdjectives.forEach((a, idx) => renderAdjective(a, 'na', 'na-' + idx));
      });
      
      if (!hasData) {
        tableAdj.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
      }
    }

    `;

  appJS = appJS.substring(0, adjStartIdx) + newAdjLogic + appJS.substring(countStartIdx);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('Successfully updated app.js adjectives render logic.');
} else {
  console.log('Failed to find // 2. Render Adjectives or // 4. Render Counters in app.js');
}

