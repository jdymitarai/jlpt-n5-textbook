const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

const targetBeforeTable = /<div style="overflow-x: auto;">\s*<table class="consolidation-table">\s*<thead>\s*<tr>\s*<th style="width: 60px;">級別<\/th>/;

const filterHTML = `
              <div style="margin-bottom: 12px; display: flex; gap: 8px; align-items: center; flex-wrap: wrap;" id="verb-context-filter">
                <strong style="font-size:0.85rem; color:var(--text-secondary);">情境場合：</strong>
                <button class="filter-btn active" data-context="All" style="padding: 4px 10px; font-size: 0.8rem;">全部</button>
                <button class="filter-btn" data-context="日常起居" style="padding: 4px 10px; font-size: 0.8rem;">日常起居</button>
                <button class="filter-btn" data-context="移動與交通" style="padding: 4px 10px; font-size: 0.8rem;">移動與交通</button>
                <button class="filter-btn" data-context="溝通與互動" style="padding: 4px 10px; font-size: 0.8rem;">溝通與互動</button>
                <button class="filter-btn" data-context="工作與學習" style="padding: 4px 10px; font-size: 0.8rem;">工作與學習</button>
                <button class="filter-btn" data-context="情感與思考" style="padding: 4px 10px; font-size: 0.8rem;">情感與思考</button>
                <button class="filter-btn" data-context="狀態與變化" style="padding: 4px 10px; font-size: 0.8rem;">狀態與變化</button>
                <button class="filter-btn" data-context="購物與飲食" style="padding: 4px 10px; font-size: 0.8rem;">購物與飲食</button>
              </div>
              <div style="overflow-x: auto;">
                <table class="consolidation-table">
                  <thead>
                    <tr>
                      <th style="width: 60px;">級別</th>`;

if (targetBeforeTable.test(html)) {
  html = html.replace(targetBeforeTable, filterHTML);
  html = html.replace('<th style="min-width: 110px;">分類群組</th>', '<th style="min-width: 130px;">群組 / 情境</th>');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html updated successfully.');
} else {
  console.log('table marker not found in index.html');
}

// 2. Update app.js
let appJS = fs.readFileSync('app.js', 'utf8');

// A. Add currentVerbContext state and logic
const stateSetupSearch = /let currentConsolidationLevel = 'All';\s*\/\/ Level filter click listener\s*const setupConsolidationFilter = \(\) => \{/;

const stateSetupReplace = `let currentConsolidationLevel = 'All';
let currentVerbContext = 'All';

  // Level filter click listener
  const setupConsolidationFilter = () => {
    // Context filter buttons
    const contextBtns = document.querySelectorAll('#verb-context-filter .filter-btn');
    if (contextBtns.length > 0) {
      contextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          contextBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          currentVerbContext = e.target.getAttribute('data-context');
          renderConsolidationData();
        });
      });
    }
`;

if (stateSetupSearch.test(appJS)) {
  appJS = appJS.replace(stateSetupSearch, stateSetupReplace);
}

// B. Add filtering logic in renderConsolidationData for verbs
const renderVerbsSearch = /const verbConjugations = JLPT_DATA\.verbConjugations\[lvl\] \|\| \[\];\s*verbConjugations\.forEach\(v => \{/g;
const renderVerbsReplace = `const verbConjugations = JLPT_DATA.verbConjugations[lvl] || [];
        verbConjugations.forEach(v => {
          if (currentVerbContext !== 'All' && v.context !== currentVerbContext) return;`;

if (renderVerbsSearch.test(appJS)) {
  appJS = appJS.replace(renderVerbsSearch, renderVerbsReplace);
}

// C. Update HTML column rendering for group/context
const tdSearch = /<td><span class="vocab-badge \$\{v\.group\.includes\("第一"\) \? "verbs" : v\.group\.includes\("第二"\) \? "people" : "time"\}">\$\{v\.group\}<\/span><\/td>/g;

const tdReplace = `<td>
              <div style="margin-bottom: 4px;"><span class="vocab-badge \${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">\${v.group}</span></div>
              <div><span class="vocab-badge context-badge" style="background: rgba(139, 92, 246, 0.1); color: #8B5CF6; border-color: rgba(139, 92, 246, 0.3);">\${v.context || '一般'}</span></div>
            </td>`;

if (tdSearch.test(appJS)) {
  appJS = appJS.replace(tdSearch, tdReplace);
}

fs.writeFileSync('app.js', appJS, 'utf8');
console.log('app.js updated successfully.');
