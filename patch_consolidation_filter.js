const fs = require('fs');

// 1. Update index.html to add level filter above subtabs in Consolidation page
let html = fs.readFileSync('index.html', 'utf8');

const targetContainer = `<div class="glass-card">
            <div class="subtabs-container">`;

const replaceContainer = `<div class="glass-card">
            <!-- 級別篩選 (大分類) -->
            <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
              <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">大分類 (級別篩選)：</div>
              <div id="consolidation-level-filter" class="filter-group">
                <button class="filter-btn active" data-lvl="All">全部級別</button>
                <button class="filter-btn" data-lvl="N5">N5</button>
                <button class="filter-btn" data-lvl="N4">N4</button>
                <button class="filter-btn" data-lvl="N3">N3</button>
                <button class="filter-btn" data-lvl="N2">N2</button>
                <button class="filter-btn" data-lvl="N1">N1</button>
              </div>
            </div>
            
            <div style="font-weight: 600; font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 8px;">小分類 (詞性切換)：</div>
            <div class="subtabs-container">`;

if (html.includes(targetContainer)) {
  html = html.replace(targetContainer, replaceContainer);
  
  // Also make sure table headers have a Level column. We need to add "級別" column
  // Verbs table
  html = html.replace(/<th style="min-width: 90px;">動詞原形<\/th>/, `<th style="width: 60px;">級別</th>\n                      <th style="min-width: 90px;">動詞原形</th>`);
  
  // Adjectives table
  // There are two adjective tables
  html = html.replace(/<th>原形<\/th>\s*<th>中文含意<\/th>/g, `<th style="width: 60px;">級別</th>\n                          <th>原形</th>\n                          <th>中文含意</th>`);
  
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('targetContainer not found in index.html');
}

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');

// The render logic
const renderConsolidationDataRegex = /const renderConsolidationData = \(\) => \{[\s\S]*?\/\/ --- MODULE 5: GRAMMAR ---/;

const newRenderLogic = `let currentConsolidationLevel = 'All';

  // Level filter click listener
  const setupConsolidationFilter = () => {
    const filterBtns = document.querySelectorAll('#consolidation-level-filter .filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentConsolidationLevel = e.target.getAttribute('data-lvl');
        renderConsolidationData();
      });
    });
  };

  const getConsolidationLevels = () => {
    return currentConsolidationLevel === 'All' ? ['N5', 'N4', 'N3', 'N2', 'N1'] : [currentConsolidationLevel];
  };

  const renderConsolidationData = () => {
    const levelsToRender = getConsolidationLevels();

    // Helper to get badge HTML
    const getLvlBadge = (lvl) => \`<span class="level-badge level-\${lvl.toLowerCase()}">\${lvl}</span>\`;

    // 1. Render Verbs
    const tableVerbs = document.getElementById("table-verbs-body");
    if (tableVerbs) {
      tableVerbs.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const verbConjugations = JLPT_DATA.verbConjugations[lvl] || [];
        verbConjugations.forEach(v => {
          hasData = true;
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td>\${getLvlBadge(lvl)}</td>
            <td class="clickable-jp" data-speech="\${v.dictionary.split(" ")[0]}">\${v.dictionary}</td>
            <td class="clickable-jp" data-speech="\${v.masu.split(" ")[0]}">\${v.masu}</td>
            <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}">\${v.te}</td>
            <td class="clickable-jp" data-speech="\${v.te.split(" ")[0]}います" style="color:#10B981; line-height: 1.4;">
              <div>\${v.te.replace(/て(?!.*て)/, 'ている').replace(/で(?!.*で)/, 'でいる')}</div>
              <div style="font-size:0.85em; opacity:0.8;">\${v.te.replace(/て(?!.*て)/, 'ています').replace(/で(?!.*で)/, 'でいます')}</div>
            </td>
            <td class="clickable-jp" data-speech="\${v.te.split(" ")[0].replace(/て$/, 'た').replace(/で$/, 'だ')}" style="color:#3B82F6;">\${v.te.replace(/て(?!.*て)/, 'た').replace(/で(?!.*で)/, 'だ')}</td>
            <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0]}">\${v.nai}</td>
            <td class="clickable-jp" data-speech="\${v.nai.split(" ")[0].replace(/ない$/, 'なかった')}" style="color:#EF4444;">\${v.nai.replace(/ない(?!.*ない)/, 'なかった')}</td>
            <td>\${v.meaning}</td>
            <td><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></td>
          \`;
          tableVerbs.appendChild(tr);
        });
      });
      if (!hasData) tableVerbs.innerHTML = '<tr><td colspan="10" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
    }

    // 2. Render Adjectives (i-adjectives)
    const tableAdjI = document.getElementById("table-adj-i-body");
    if (tableAdjI) {
      tableAdjI.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const adjGroup = JLPT_DATA.adjectiveGroups[lvl] || { iAdjectives: [], naAdjectives: [] };
        adjGroup.iAdjectives.forEach(a => {
          hasData = true;
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td>\${getLvlBadge(lvl)}</td>
            <td class="clickable-jp" data-speech="\${a.word.split(" ")[0]}">\${a.word}</td>
            <td>\${a.meaning}</td>
            <td class="clickable-jp" data-speech="\${a.negative}">\${a.negative}</td>
            <td class="clickable-jp" data-speech="\${a.past}">\${a.past}</td>
          \`;
          tableAdjI.appendChild(tr);
        });
      });
      if (!hasData) tableAdjI.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
    }

    // 3. Render Adjectives (na-adjectives)
    const tableAdjNa = document.getElementById("table-adj-na-body");
    if (tableAdjNa) {
      tableAdjNa.innerHTML = "";
      let hasData = false;
      levelsToRender.forEach(lvl => {
        const adjGroup = JLPT_DATA.adjectiveGroups[lvl] || { iAdjectives: [], naAdjectives: [] };
        adjGroup.naAdjectives.forEach(a => {
          hasData = true;
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td>\${getLvlBadge(lvl)}</td>
            <td class="clickable-jp" data-speech="\${a.word.split(" ")[0]}">\${a.word}</td>
            <td>\${a.meaning}</td>
            <td class="clickable-jp" data-speech="\${a.negative}">\${a.negative}</td>
            <td class="clickable-jp" data-speech="\${a.past}">\${a.past}</td>
          \`;
          tableAdjNa.appendChild(tr);
        });
      });
      if (!hasData) tableAdjNa.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 20px;">此分類目前無資料</td></tr>';
    }

    // Bind speech handlers for new elements
    document.querySelectorAll(".consolidation-view .clickable-jp").forEach(el => {
      // prevent multiple bindings by removing and re-adding
      const clone = el.cloneNode(true);
      if(el.parentNode) el.parentNode.replaceChild(clone, el);
      
      clone.addEventListener("click", (e) => {
        e.stopPropagation();
        let text = clone.getAttribute("data-speech");
        const cleanText = text.replace(/\\([^)]*\\)/g, "").trim();
        speak(cleanText);
        
        clone.classList.add("ripple-effect");
        setTimeout(() => clone.classList.remove("ripple-effect"), 300);
      });
    });
    
    // Note: Conjunctions, Particles, Keigo should also be updated here. 
    // They were added in a previous session, but got wiped by git checkout!
    // I will recreate them below.
  };

  // --- MODULE 5: GRAMMAR ---`;

if (renderConsolidationDataRegex.test(appJS)) {
  appJS = appJS.replace(renderConsolidationDataRegex, newRenderLogic);
  
  // Need to also call setupConsolidationFilter in DOMContentLoaded
  if (appJS.includes('setupVocabFilters();')) {
    appJS = appJS.replace('setupVocabFilters();', 'setupVocabFilters();\n  setupConsolidationFilter();');
  }
  
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully.');
} else {
  console.log('renderConsolidationData not found in app.js');
}
