const fs = require('fs');
let appJS = fs.readFileSync('app.js', 'utf8');

const filterTarget = `const contextBtns = document.querySelectorAll('#verb-context-filter .filter-btn');`;
const filterReplacement = `
    const adjContextBtns = document.querySelectorAll('#adj-context-filter .filter-btn');
    if (adjContextBtns.length > 0) {
      adjContextBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          adjContextBtns.forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          currentAdjContext = e.target.getAttribute('data-context');
          renderConsolidationData();
        });
      });
    }

    const contextBtns = document.querySelectorAll('#verb-context-filter .filter-btn');`;

if (appJS.includes(filterTarget) && !appJS.includes('adjContextBtns')) {
  appJS = appJS.replace(filterTarget, filterReplacement);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('Successfully injected adjContextBtns into setupConsolidationFilter');
} else {
  console.log('Could not find target or already injected');
}
