const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// The marker to insert our new rendering logic
const targetMarker = '    renderCounterGrid("grid-counter-days", JLPT_DATA.counterTables.days);';

const newCode = `
    // 5. Render Adverbs
    const adverbsContainer = document.getElementById("adverbs-container");
    if (adverbsContainer) {
      const adverbs = JLPT_DATA.adverbsGroup ? (JLPT_DATA.adverbsGroup[currentLevel] || []) : [];
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th>日文 (原形)</th><th>發音</th><th>中文意思</th><th>分類/用法</th></tr></thead><tbody>';
      adverbs.forEach(item => {
        html += \`<tr>
          <td class="clickable-jp" data-speech="\${item.word}">\${item.word}</td>
          <td>\${item.furigana} (\${item.romaji})</td>
          <td>\${item.meaning}</td>
          <td><span class="vocab-badge \${item.type === '時間與頻率' ? 'time' : 'people'}">\${item.type}</span></td>
        </tr>\`;
      });
      html += '</tbody></table></div>';
      adverbsContainer.innerHTML = adverbs.length ? html : '<p>尚未載入資料</p>';
      
      adverbsContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = () => speak(td.getAttribute('data-speech'));
      });
    }

    // 6. Render Conjunctions
    const conjContainer = document.getElementById("conjunctions-container");
    if (conjContainer) {
      const conjunctions = JLPT_DATA.conjunctions ? (JLPT_DATA.conjunctions[currentLevel] || []) : [];
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th>日文 (原形)</th><th>發音</th><th>中文意思</th><th>分類/用法</th></tr></thead><tbody>';
      conjunctions.forEach(item => {
        html += \`<tr>
          <td class="clickable-jp" data-speech="\${item.word}">\${item.word}</td>
          <td>\${item.furigana} (\${item.romaji})</td>
          <td>\${item.meaning}</td>
          <td><span class="vocab-badge verbs">\${item.type}</span></td>
        </tr>\`;
      });
      html += '</tbody></table></div>';
      conjContainer.innerHTML = conjunctions.length ? html : '<p>尚未載入資料</p>';
      
      conjContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = () => speak(td.getAttribute('data-speech'));
      });
    }

    // 7. Render Particles
    const partContainer = document.getElementById("particles-container");
    if (partContainer) {
      const particles = JLPT_DATA.particles ? (JLPT_DATA.particles[currentLevel] || []) : [];
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th>助詞</th><th>主要功能</th><th>經典例句</th><th>中文翻譯</th></tr></thead><tbody>';
      particles.forEach(item => {
        html += \`<tr>
          <td class="clickable-jp" data-speech="\${item.word}">\${item.word}</td>
          <td>\${item.function}</td>
          <td class="clickable-jp" data-speech="\${item.exampleJa}"><ruby>\${item.exampleJa}<rt>\${item.exampleFurigana}</rt></ruby></td>
          <td>\${item.exampleZh}</td>
        </tr>\`;
      });
      html += '</tbody></table></div>';
      partContainer.innerHTML = particles.length ? html : '<p>尚未載入資料</p>';
      
      partContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = (e) => {
           e.stopPropagation();
           speak(td.getAttribute('data-speech'));
        };
      });
    }
`;

app = app.replace(targetMarker, targetMarker + '\n' + newCode);
fs.writeFileSync('app.js', app, 'utf8');
console.log('app.js patched with new rendering logic');
