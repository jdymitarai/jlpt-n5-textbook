const fs = require('fs');

const appContent = fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\app.js', 'utf8');

const startIdx = appContent.indexOf("categoryLabels = {");
if (startIdx !== -1) {
  const endIdx = appContent.indexOf("};", startIdx);
  console.log("Category Labels in app.js:");
  console.log(appContent.substring(startIdx, endIdx + 2));
} else {
  console.log("categoryLabels not found!");
}
