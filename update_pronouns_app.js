const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `// 11. Render Adverbs`;
const newCode = `// 10.5 Render Pronouns
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
          <div style="margin-bottom: 24px;">
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

    // 11. Render Adverbs`;

if (app.includes(targetStr) && !app.includes('// 10.5 Render Pronouns')) {
  app = app.replace(targetStr, newCode);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Successfully updated app.js with Pronouns rendering");
} else {
  console.log("Could not find insertion point in app.js or already added");
}
