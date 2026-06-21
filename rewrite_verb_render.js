const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

// I need to find the `html += \`<tr>...<tbody>\`;` generation block for verbs.
// Let's use string manipulation to carefully replace the inner loop.

const loopStartStr = `const verbConjugations = JLPT_DATA.verbConjugations[lvl] || [];
        verbConjugations.forEach(v => {
          if (currentVerbContext !== 'All' && v.context !== currentVerbContext) return;
          html += \`
            <tr>
              <td><span class="level-badge \${lvl}">\${lvl}</span></td>`;

// I will just rewrite the `renderConsolidationData` logic for verbs entirely.
// Find the exact block.
const verbBlockStart = appJS.indexOf("if (targetTab === \"verbs\") {");
const verbBlockEnd = appJS.indexOf("} else if (targetTab === \"adjectives\") {");

if (verbBlockStart !== -1 && verbBlockEnd !== -1) {
  let newVerbBlock = `if (targetTab === "verbs") {
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width: 60px;">級別</th><th style="min-width: 120px;">日文 (原形 / 敬體)</th><th style="min-width: 100px;">中文釋義</th><th style="min-width: 80px;">自/他</th><th style="min-width: 130px;">分類 / 情境</th><th style="width: 80px;">時態</th></tr></thead><tbody>';

      ['N5', 'N4', 'N3', 'N2', 'N1'].forEach(lvl => {
        if (currentConsolidationLevel !== 'All' && currentConsolidationLevel !== lvl) return;
        
        const verbConjugations = JLPT_DATA.verbConjugations[lvl] || [];
        verbConjugations.forEach((v, idx) => {
          if (currentVerbContext !== 'All' && v.context !== currentVerbContext) return;
          
          let transBadgeColor = v.transitivity === '自動詞' ? '#10b981' : (v.transitivity === '他動詞' ? '#f59e0b' : '#6366f1');
          let transBadgeBg = v.transitivity === '自動詞' ? 'rgba(16, 185, 129, 0.1)' : (v.transitivity === '他動詞' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)');
          
          let verbId = lvl + '-' + idx;

          html += \`
            <tr>
              <td><span class="level-badge \${lvl}">\${lvl}</span></td>
              <td class="clickable-jp" data-speech="\${v.dictionary.split(' ')[0]}" style="line-height: 1.4;">
                <div style="font-size: 1.1em; font-weight: bold; color: var(--text-primary);">\${v.dictionary}</div>
                <div style="font-size: 0.85em; opacity: 0.8;">\${v.masu}</div>
              </td>
              <td>\${v.meaning}</td>
              <td>
                <span class="vocab-badge" style="background: \${transBadgeBg}; color: \${transBadgeColor}; border-color: \${transBadgeBg};">\${v.transitivity || '無'}</span>
              </td>
              <td>
                <div style="margin-bottom: 4px;"><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></div>
                <div><span class="vocab-badge context-badge" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: rgba(139, 92, 246, 0.3);">\${v.subcontext ? v.context.substring(0,2) + '-' + v.subcontext : v.context || '一般'}</span></div>
              </td>
              <td>
                <button class="filter-btn" style="padding: 4px 8px; font-size: 0.75rem;" onclick="document.getElementById('conj-\${verbId}').classList.toggle('hidden');">展開</button>
              </td>
            </tr>
            <tr id="conj-\${verbId}" class="hidden" style="background-color: var(--bg-secondary);">
              <td colspan="6" style="padding: 12px;">
                <div style="display: grid; grid-template-columns: 80px 1fr 1fr; gap: 8px; font-size: 0.9em; text-align: left;">
                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center;">進行 / 接續</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (て形)</div>
                    <div class="clickable-jp" data-speech="\${v.te.split(" ")[0]}" style="color: #3B82F6;">\${v.te}</div>
                    <div class="clickable-jp" data-speech="\${v.te.split(" ")[0]}いる" style="color: #3B82F6;">\${v.te.split(" ")[0]}いる</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (丁寧語)</div>
                    <div class="clickable-jp" data-speech="\${v.te.split(" ")[0]}います" style="color: #3B82F6;">\${v.te.split(" ")[0]}います</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center;">過去形</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (た形)</div>
                    <div class="clickable-jp" data-speech="\${v.te.split(" ")[0].replace(/て$/, 'た').replace(/で$/, 'だ')}" style="color: #10B981;">\${v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ')}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (ました)</div>
                    <div class="clickable-jp" data-speech="\${v.masu.split(" ")[0].replace(/ます$/, 'ました')}" style="color: #10B981;">\${v.masu.replace(/ます(?!.*ます)/, 'ました')}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center;">否定形</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (ない形 / なかった)</div>
                    <div class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}" style="color: #EF4444;">\${v.nai}</div>
                    <div class="clickable-jp" data-speech="\${v.nai.split(" ")[0].replace(/ない$/, 'なかった')}" style="color: #EF4444;">\${v.nai.replace(/ない(?!.*ない)/, 'なかった')}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (ません / ませんでした)</div>
                    <div class="clickable-jp" data-speech="\${v.masu.split(" ")[0].replace(/ます$/, 'ません')}" style="color: #EF4444;">\${v.masu.replace(/ます(?!.*ます)/, 'ません')}</div>
                    <div class="clickable-jp" data-speech="\${v.masu.split(" ")[0].replace(/ます$/, 'ませんでした')}" style="color: #EF4444;">\${v.masu.replace(/ます(?!.*ます)/, 'ませんでした')}</div>
                  </div>
                </div>
              </td>
            </tr>
          \`;
        });
      });
      html += '</tbody></table></div>';
      container.innerHTML = html;
    `;

  let newAppJS = appJS.substring(0, verbBlockStart) + newVerbBlock + "\n    " + appJS.substring(verbBlockEnd);
  
  // also inject `.hidden { display: none; }` to styles.css just in case
  
  fs.writeFileSync('app.js', newAppJS, 'utf8');
  console.log('Successfully updated app.js verb rendering');
} else {
  console.log('Failed to find verb block in app.js');
}

// 4. Check if .hidden exists in styles.css
let css = fs.readFileSync('styles.css', 'utf8');
if (!css.includes('.hidden {')) {
  css += '\n\n.hidden {\n  display: none !important;\n}\n';
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Appended .hidden to styles.css');
}

