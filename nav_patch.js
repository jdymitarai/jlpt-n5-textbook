const fs = require('fs');

const appPath = 'C:\\ai\\jlpt-n5-textbook\\app.js';
let appJs = fs.readFileSync(appPath, 'utf8');

appJs = appJs.replace(
  /const targetTab = link\.getAttribute\("data-tab"\);/,
  `let targetTab = link.getAttribute("data-tab");
        let isCounters = false;
        if (targetTab === "counters") {
          targetTab = "consolidation";
          isCounters = true;
        }`
);

appJs = appJs.replace(
  /\} else if \(targetTab === "consolidation"\) \{\s*initConsolidationPage\(\);\s*\}/,
  `} else if (targetTab === "consolidation") {
          initConsolidationPage();
          if (isCounters) {
            setTimeout(() => {
              const btn = document.querySelector('.subtab-btn[data-subtab="counters"]');
              if (btn) btn.click();
            }, 50);
          }
        }`
);

fs.writeFileSync(appPath, appJs, 'utf8');
console.log("Navigation patched");
