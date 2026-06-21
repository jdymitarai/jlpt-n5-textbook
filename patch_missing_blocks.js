const fs = require('fs');
let appJS = fs.readFileSync('app.js', 'utf8');

const missingBlocks = `
    // 6. Render Conjunctions
    const conjContainer = document.getElementById("conjunctions-container");
    if (conjContainer) {
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>日文 (原形)</th><th>發音</th><th>中文意思</th><th>分類/用法</th></tr></thead><tbody>';
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const conjunctions = JLPT_DATA.conjunctions ? JLPT_DATA.conjunctions[lvl] || [] : [];
        conjunctions.forEach(item => {
          hasData = true;
          html += \`<tr>
            <td>\${getLvlBadge(lvl)}</td>
            <td class="clickable-jp" data-speech="\${item.word}">\${item.word}</td>
            <td>\${item.furigana} (\${item.romaji})</td>
            <td>\${item.meaning}</td>
            <td><span class="vocab-badge \${item.type === '逆接與對立' ? 'time' : 'nature'}">\${item.type}</span></td>
          </tr>\`;
        });
      });
      html += '</tbody></table></div>';
      conjContainer.innerHTML = hasData ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">此分類目前無資料</p>';
      
      conjContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = () => speak(td.getAttribute('data-speech'));
      });
    }

    // 7. Render Particles
    const partContainer = document.getElementById("particles-container");
    if (partContainer) {
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>助詞</th><th>核心功能</th><th>經典例句</th></tr></thead><tbody>';
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const particles = JLPT_DATA.particles ? JLPT_DATA.particles[lvl] || [] : [];
        particles.forEach(item => {
          hasData = true;
          html += \`<tr>
            <td>\${getLvlBadge(lvl)}</td>
            <td class="clickable-jp" style="font-size: 1.2rem; font-weight: 700; color: var(--primary);" data-speech="\${item.word}">\${item.word}</td>
            <td>\${item.function}</td>
            <td>
              <div style="margin-bottom: 4px;"><ruby>\${item.exampleJa}<rt>\${item.exampleFurigana}</rt></ruby></div>
              <div style="font-size: 0.85rem; color: var(--text-secondary);">\${item.exampleZh}</div>
            </td>
          </tr>\`;
        });
      });
      html += '</tbody></table></div>';
      partContainer.innerHTML = hasData ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">此分類目前無資料</p>';
      
      partContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = (e) => {
           e.stopPropagation();
           speak(td.getAttribute('data-speech'));
        };
      });
    }

    // 8. Render Keigo
    const keigoContainer = document.getElementById("keigo-container");
    if (keigoContainer) {
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>中文動作</th><th>辭書形 (常體)</th><th>丁寧語 (一般禮貌)</th><th>尊敬語 (抬高對方)</th><th>謙讓語 (貶低自己)</th></tr></thead><tbody>';
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const keigo = JLPT_DATA.keigo ? JLPT_DATA.keigo[lvl] || [] : [];
        keigo.forEach(item => {
          hasData = true;
          html += \`<tr>
            <td>\${getLvlBadge(lvl)}</td>
            <td>\${item.meaning}</td>
            <td class="clickable-jp" data-speech="\${item.dict.split(' / ')[0]}">\${item.dict}</td>
            <td class="clickable-jp" data-speech="\${item.polite.split(' / ')[0]}">\${item.polite}</td>
            <td class="clickable-jp" data-speech="\${item.honorific.replace(/\\(.*\\)/g, '').split(' / ')[0].trim()}">\${item.honorific}</td>
            <td class="clickable-jp" data-speech="\${item.humble.replace(/\\(.*\\)/g, '').split(' / ')[0].trim()}">\${item.humble}</td>
          </tr>\`;
        });
      });
      html += '</tbody></table></div>';
      keigoContainer.innerHTML = hasData ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">此分類目前無資料</p>';
      
      keigoContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = (e) => {
           e.stopPropagation();
           const speechText = td.getAttribute('data-speech');
           if (speechText && speechText !== '—') {
             speak(speechText);
           }
        };
      });
    }

    // 9. Render Demonstratives (if any, although it might just be static HTML)
    
  };`;

// We will replace the bottom of renderConsolidationData where the comment is:
const marker = /\/\/ Note: Conjunctions, Particles, Keigo should also be updated here\.[\s\S]*?\/\/ I will recreate them below\.\s*};\s*\/\/ --- MODULE 5: GRAMMAR ---/;

if (marker.test(appJS)) {
  appJS = appJS.replace(marker, missingBlocks + '\n\n  // --- MODULE 5: GRAMMAR ---');
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('Successfully added missing blocks to app.js');
} else {
  console.log('Marker not found in app.js');
}
