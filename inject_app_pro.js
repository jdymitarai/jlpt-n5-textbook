const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

const proCode = `
    // Render Pronouns
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
        \`).join('');
        
        pronounsContainer.innerHTML += \`
          <div class="pronoun-group" style="margin-bottom: 24px; padding: 16px; background: var(--surface-2); border-radius: 12px; border: 1px solid var(--border-color);">
            <h4 style="color: var(--primary); margin-bottom: 8px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">\${group.category}</h4>
            <p style="color: var(--text-secondary); font-size: 0.85em; margin-bottom: 12px;">\${group.description}</p>
            <div class="row row-cols-2 row-cols-md-4 g-3">
              \${wordsHtml}
            </div>
          </div>
        \`;
      });
    }
`;

if (!app.includes('pronounsContainer = document')) {
  app = app.replace('// Bind speak handlers', proCode + '\n    // Bind speak handlers');
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Injected Pronouns into app.js');
}
