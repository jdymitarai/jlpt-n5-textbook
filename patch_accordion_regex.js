const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

const searchRegex = /\/\/ Collapse all others\s*document\.querySelectorAll\("\.grammar-item-card"\)\.forEach\(c => c\.classList\.remove\("expanded"\)\);\s*if \(\!isExpanded\) \{/g;

if (searchRegex.test(appJS)) {
  appJS = appJS.replace(searchRegex, `if (isExpanded) { itemCard.classList.remove("expanded"); } else {`);
  fs.writeFileSync('app.js', appJS, 'utf8');
  console.log("Successfully patched app.js with regex");
} else {
  console.log("Could not match regex");
}
