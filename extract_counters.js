const fs = require('fs');
const { execSync } = require('child_process');

let headData = execSync('git show HEAD:data.js').toString();
const startIdx = headData.indexOf('"counterTables":');
const endIdx = headData.indexOf('// --- MODULE 5: GRAMMAR ---', startIdx);
let tablesStr = headData.substring(startIdx, endIdx);

// It is followed by }, so we need to trim properly
tablesStr = "{\n  " + tablesStr.substring(0, tablesStr.lastIndexOf('}')) + "\n}";

fs.writeFileSync('temp_counter_tables.js', tablesStr);
