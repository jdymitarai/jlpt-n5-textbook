const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');

// Render counters
const renderCountersScript = `
// ==========================================
// Counters Rendering
// ==========================================
function renderCounters() {
  const container = document.getElementById('counters-container');
  if (!container) return;
  container.innerHTML = '';
  
  if (!window.JLPT_DATA || !window.JLPT_DATA.counters) return;
  
  window.JLPT_DATA.counters.forEach(group => {
    const section = document.createElement('div');
    section.className = 'counter-section';
    
    const header = document.createElement('div');
    header.className = 'counter-header';
    header.innerHTML = \`
      <h2>\${group.title}</h2>
      <p class="counter-desc">\${group.description}</p>
    \`;
    
    const grid = document.createElement('div');
    grid.className = 'counter-grid';
    
    group.table.forEach(item => {
      const card = document.createElement('div');
      card.className = 'counter-card' + (item.irregular ? ' irregular' : '');
      
      card.innerHTML = \`
        <div class="counter-num">\${item.num}</div>
        <div class="counter-kanji">\${item.kanji}</div>
        <div class="counter-furigana">\${item.furigana}</div>
        <div class="counter-romaji">\${item.romaji}</div>
      \`;
      
      card.addEventListener('click', () => playAudio(item.kanji));
      grid.appendChild(card);
    });
    
    section.appendChild(header);
    section.appendChild(grid);
    container.appendChild(section);
  });
}
`;

content = content.replace(/(document\.addEventListener\(["']DOMContentLoaded["'], \(\) => \{)/, renderCountersScript + '\n$1');
content = content.replace(/(initVocab\(\);\s*initGrammar\(\);\s*initPractice\(\);)/, '$1\n  renderCounters();');

fs.writeFileSync('app.js', content, 'utf8');
console.log('app.js updated');
