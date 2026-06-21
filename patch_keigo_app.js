const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const targetMarker = '// 7. Render Particles';
const endMarker = '    const partContainer = document.getElementById("particles-container");';

// We insert right before 7.
const newCode = `
    // 8. Render Keigo
    const keigoContainer = document.getElementById("keigo-container");
    if (keigoContainer) {
      const keigo = JLPT_DATA.keigo ? (JLPT_DATA.keigo[currentLevel] || []) : [];
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th>中文動作</th><th>辭書形 (常體)</th><th>丁寧語 (一般禮貌)</th><th>尊敬語 (抬高對方)</th><th>謙讓語 (貶低自己)</th></tr></thead><tbody>';
      keigo.forEach(item => {
        html += \`<tr>
          <td>\${item.meaning}</td>
          <td class="clickable-jp" data-speech="\${item.dict.split(' / ')[0]}">\${item.dict}</td>
          <td class="clickable-jp" data-speech="\${item.polite.split(' / ')[0]}">\${item.polite}</td>
          <td class="clickable-jp" data-speech="\${item.honorific.replace(/\\(.*\\)/g, '').split(' / ')[0].trim()}">\${item.honorific}</td>
          <td class="clickable-jp" data-speech="\${item.humble.replace(/\\(.*\\)/g, '').split(' / ')[0].trim()}">\${item.humble}</td>
        </tr>\`;
      });
      html += '</tbody></table></div>';
      keigoContainer.innerHTML = keigo.length ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">此級數尚無專屬敬語資料</p>';
      
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

`;

app = app.replace(endMarker, newCode + endMarker);
fs.writeFileSync('app.js', app, 'utf8');
console.log('app.js patched with keigo rendering');
