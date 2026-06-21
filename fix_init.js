const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

const initSearch = /\/\/ --- Initializer sequence ---\s*loadState\(\);\s*initNavigation\(\);\s*initTheme\(\);\s*initKanaControls\(\);\s*initLevelSwitcher\(\);/;

const initReplace = `// --- Initializer sequence ---
  loadState();
  initNavigation();
  initTheme();
  initKanaControls();
  initLevelSwitcher();
  setupConsolidationFilter();`;

if (initSearch.test(appJS)) {
  appJS = appJS.replace(initSearch, initReplace);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log('app.js updated successfully (setupConsolidationFilter added to init sequence).');
} else {
  console.log('initSearch not found in app.js');
}
