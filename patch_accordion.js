const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

const targetStr = `      // Accordion click toggle
      itemCard.querySelector(".grammar-item-header").addEventListener("click", () => {
        const isExpanded = itemCard.classList.contains("expanded");
        // Collapse all others
        document.querySelectorAll(".grammar-item-card").forEach(c => c.classList.remove("expanded"));
        if (!isExpanded) {
          itemCard.classList.add("expanded");
          // Mark as read when opened (optional, let user checkbox do it, or do it on open)
          if (!state.grammarRead[currentLevel].includes(item.id)) {
            state.grammarRead[currentLevel].push(item.id);
            saveState();
            itemCard.querySelector(".grammar-read-checkbox").checked = true;
          }
        }
      });`;

const replacementStr = `      // Accordion click toggle
      itemCard.querySelector(".grammar-item-header").addEventListener("click", () => {
        const isExpanded = itemCard.classList.contains("expanded");
        if (isExpanded) {
          itemCard.classList.remove("expanded");
        } else {
          itemCard.classList.add("expanded");
          // Mark as read when opened (optional, let user checkbox do it, or do it on open)
          if (!state.grammarRead[currentLevel].includes(item.id)) {
            state.grammarRead[currentLevel].push(item.id);
            saveState();
            itemCard.querySelector(".grammar-read-checkbox").checked = true;
          }
        }
      });`;

if (appJS.includes(targetStr)) {
  appJS = appJS.replace(targetStr, replacementStr);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log("Successfully patched app.js");
} else {
  console.log("Could not find the target string in app.js");
}
