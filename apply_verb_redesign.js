const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

const regex = /const tableVerbs = document\.getElementById\("table-verbs-body"\);\s*if \(tableVerbs\) \{[\s\S]*?\}\s*\}\s*\/\/\s*2\. Render Adjectives/;

const replacement = `const tableVerbs = document.getElementById("table-verbs-body");
    if (tableVerbs) {
      tableVerbs.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const verbConjugations = JLPT_DATA.verbConjugations[lvl] || [];
        verbConjugations.forEach((v, idx) => {
          if (currentVerbContext !== 'All' && v.context !== currentVerbContext) return;
          hasData = true;
          
          let transBadgeColor = v.transitivity === '自動詞' ? '#10b981' : (v.transitivity === '他動詞' ? '#f59e0b' : '#6366f1');
          let transBadgeBg = v.transitivity === '自動詞' ? 'rgba(16, 185, 129, 0.1)' : (v.transitivity === '他動詞' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(99, 102, 241, 0.1)');
          let verbId = lvl + '-' + idx;

          let teIru = v.te.replace(/て(?!.*て)/, 'ている').replace(/で(?!.*で)/, 'でいる');
          let teImasu = v.te.replace(/て(?!.*て)/, 'ています').replace(/で(?!.*で)/, 'でいます');
          let taForm = v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ');
          let mashita = v.masu.replace(/ます(?!.*ます)/, 'ました');
          let nakatta = v.nai.replace(/ない(?!.*ない)/, 'なかった');
          let masen = v.masu.replace(/ます(?!.*ます)/, 'ません');
          let masendeshita = v.masu.replace(/ます(?!.*ます)/, 'ませんでした');

          let html = \`
            <tr style="border-bottom: 1px solid var(--border-color);">
              <td style="vertical-align: middle;">\${getLvlBadge(lvl)}</td>
              <td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}" style="line-height: 1.4; vertical-align: middle;">
                <div style="font-size: 1.1em; font-weight: bold; color: var(--text-primary);">\${v.dictionary}</div>
                <div style="font-size: 0.85em; opacity: 0.8;">\${v.masu}</div>
              </td>
              <td style="vertical-align: middle;">\${v.meaning}</td>
              <td style="vertical-align: middle;">
                <span class="vocab-badge" style="background: \${transBadgeBg}; color: \${transBadgeColor}; border-color: \${transBadgeBg};">\${v.transitivity || '無'}</span>
              </td>
              <td style="vertical-align: middle;">
                <div style="margin-bottom: 4px;"><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></div>
                <div><span class="vocab-badge context-badge" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: rgba(139, 92, 246, 0.3);">\${v.subcontext ? v.context.substring(0,2) + '-' + v.subcontext : v.context || '一般'}</span></div>
              </td>
              <td style="vertical-align: middle; text-align: center;">
                <button class="filter-btn" style="padding: 6px 10px; font-size: 0.8rem; background: var(--bg-primary); border: 1px solid var(--border-color);" onclick="document.getElementById('conj-\${verbId}').classList.toggle('hidden');">變化</button>
              </td>
            </tr>
            <tr id="conj-\${verbId}" class="hidden" style="background-color: var(--bg-secondary); border-bottom: 2px solid var(--border-color);">
              <td colspan="6" style="padding: 12px;">
                <div style="display: grid; grid-template-columns: 80px 1fr 1fr; gap: 8px; font-size: 0.9em; text-align: left;">
                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">接續/進行</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (て形 / ている)</div>
                    <div class="clickable-jp" data-speech="\${v.te.split(" ")[0]}" style="color: #3B82F6;">\${v.te}</div>
                    <div class="clickable-jp" data-speech="\${teIru.split(" ")[0]}" style="color: #3B82F6;">\${teIru}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (ています)</div>
                    <div class="clickable-jp" data-speech="\${teImasu.split(" ")[0]}" style="color: #3B82F6; margin-top: 20px;">\${teImasu}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">過去 (肯定)</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (た形)</div>
                    <div class="clickable-jp" data-speech="\${taForm.split(" ")[0]}" style="color: #10B981;">\${taForm}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (ました)</div>
                    <div class="clickable-jp" data-speech="\${mashita.split(" ")[0]}" style="color: #10B981;">\${mashita}</div>
                  </div>

                  <div style="font-weight: bold; color: var(--text-secondary); display: flex; align-items: center; justify-content: flex-end; padding-right: 12px;">否定形</div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">常體 (ない / なかった)</div>
                    <div class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}" style="color: #EF4444;">\${v.nai}</div>
                    <div class="clickable-jp" data-speech="\${nakatta.split(" ")[0]}" style="color: #EF4444;">\${nakatta}</div>
                  </div>
                  <div style="background: var(--bg-primary); padding: 8px; border-radius: 6px; border: 1px solid var(--border-color);">
                    <div style="color: var(--text-secondary); font-size: 0.8em; margin-bottom: 2px;">敬體 (ません / ませんでした)</div>
                    <div class="clickable-jp" data-speech="\${masen.split(" ")[0]}" style="color: #EF4444;">\${masen}</div>
                    <div class="clickable-jp" data-speech="\${masendeshita.split(" ")[0]}" style="color: #EF4444;">\${masendeshita}</div>
                  </div>
                </div>
              </td>
            </tr>
          \`;
          tableVerbs.insertAdjacentHTML("beforeend", html);
        });
      });
      if (!hasData) {
        tableVerbs.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
      }
    }

    // 2. Render Adjectives`;

if (regex.test(appJS)) {
  appJS = appJS.replace(regex, replacement);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js successfully updated.');
} else {
  console.log('Regex did not match app.js');
}
