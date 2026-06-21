const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `      // 5. Render Demonstratives
      const tableDem = document.getElementById("table-dem-body");`;

const replacementCode = `      // 5. Render Demonstratives
      const tableDem = document.getElementById("table-dem-body");

      // 6. Render Nouns
      const nounsContainer = document.getElementById("nouns-container");
      if (nounsContainer && JLPT_DATA.vocabulary) {
        nounsContainer.innerHTML = "";
        const nouns = JLPT_DATA.vocabulary.filter(v => v.category === 'nature_weather' || v.category === 'food_diet' || v.category === 'family_people' || v.category === 'clothing_colors' || v.category === 'house_items');
        // Just take some N5 words that are likely nouns to show as a placeholder if we don't have POS
        const displayNouns = nouns.slice(0, 100);
        let html = '';
        displayNouns.forEach(n => {
           html += \`<div style="padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;" class="clickable-jp" data-speech="\${n.word}">
             <div style="font-weight: 600; font-size: 1.1em;">\${n.word}</div>
             \${n.furigana ? \`<div style="font-size: 0.8em; color: var(--text-secondary);">\${n.furigana}</div>\` : ''}
             <div style="font-size: 0.85em; color: var(--text-secondary); margin-top: 4px;">\${n.meaning}</div>
           </div>\`;
        });
        nounsContainer.innerHTML = html;
      }

      // 7. Render Pronouns
      const pronounsContainer = document.getElementById("pronouns-container");
      if (pronounsContainer && JLPT_DATA.pronouns) {
        pronounsContainer.innerHTML = "";
        JLPT_DATA.pronouns.forEach(group => {
          let wordsHtml = group.words.map(w => \`
            <div class="col" style="min-width: 200px; margin-bottom: 12px; background: rgba(255, 255, 255, 0.05); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
              <div style="margin-bottom: 4px;">
                <span class="clickable-jp" data-speech="\${w.word}" style="font-size: 1.2em; font-weight: bold; color: var(--text-primary); cursor: pointer;">\${w.word}</span>
                \${w.furigana ? \`<span style="font-size: 0.85em; opacity: 0.8; color: var(--text-secondary); margin-left: 6px;">(\${w.furigana})</span>\` : ''}
              </div>
              <div style="color: var(--text-secondary); font-size: 0.9em;">\${w.meaning}</div>
            </div>
          \`).join("");

          const html = \`
            <div style="margin-bottom: 24px; width: 100%;">
              <h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                <span style="display: inline-block; width: 6px; height: 16px; background: var(--primary); border-radius: 4px;"></span>
                \${group.category}
              </h4>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px; padding-left: 14px;">\${group.description}</p>
              <div class="row" style="display: flex; flex-wrap: wrap; gap: 12px; padding-left: 14px;">
                \${wordsHtml}
              </div>
            </div>
          \`;
          pronounsContainer.insertAdjacentHTML("beforeend", html);
        });
      }

      // 8. Render Adverbs
      const adverbsContainer = document.getElementById("adverbs-container");
      if (adverbsContainer && JLPT_DATA.adverbsGroup && JLPT_DATA.adverbsGroup[currentLevel]) {
        adverbsContainer.innerHTML = "";
        
        // Group by context
        const contextMap = {};
        JLPT_DATA.adverbsGroup[currentLevel].forEach(a => {
           if (!contextMap[a.context]) contextMap[a.context] = {};
           if (!contextMap[a.context][a.subcontext]) contextMap[a.context][a.subcontext] = [];
           contextMap[a.context][a.subcontext].push(a);
        });

        for (const [ctx, subObj] of Object.entries(contextMap)) {
           let ctxHtml = \`<div style="margin-bottom: 24px;"><h4 style="color: var(--primary); font-family: var(--font-title); margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 4px;">\${ctx}</h4>\`;
           
           for (const [subCtx, items] of Object.entries(subObj)) {
              ctxHtml += \`<div style="margin-bottom: 16px;">
                <div style="font-weight: bold; font-size: 0.9em; color: var(--text-secondary); margin-bottom: 8px; padding-left: 8px; border-left: 3px solid var(--text-secondary);">\${subCtx}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 10px; padding-left: 14px;">\`;
                
              items.forEach(a => {
                ctxHtml += \`<div style="padding: 8px 16px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); border-radius: 6px; cursor: pointer;" class="clickable-jp" data-speech="\${a.word}">
                  <span style="font-weight: bold; color: var(--text-primary); font-size: 1.1em;">\${a.word}</span>
                  <span style="color: var(--text-secondary); font-size: 0.85em; margin-left: 8px;">\${a.meaning}</span>
                </div>\`;
              });
              ctxHtml += \`</div></div>\`;
           }
           ctxHtml += \`</div>\`;
           adverbsContainer.insertAdjacentHTML("beforeend", ctxHtml);
        }
      }

`;

if (app.includes(targetStr)) {
   app = app.replace(targetStr, replacementCode);
   fs.writeFileSync('app.js', app, 'utf8');
   console.log("Successfully patched app.js with renderers");
} else {
   console.log("Failed to find insertion point");
}
