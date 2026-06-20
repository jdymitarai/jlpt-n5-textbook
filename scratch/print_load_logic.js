const fs = require('fs');

const appContent = fs.readFileSync('C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook\\app.js', 'utf8');

const idx = appContent.indexOf('data_clinical.js');
if (idx !== -1) {
  const start = Math.max(0, idx - 300);
  const end = Math.min(appContent.length, idx + 300);
  console.log("Database loading logic in app.js:");
  console.log(appContent.substring(start, end));
} else {
  console.log("Not found");
}
