const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');
const newFunc = fs.readFileSync('new_render_consolidation.js', 'utf8');

const startMarker = 'const renderConsolidationData = () => {';
const endMarker = '  // --- MODULE 5: GRAMMAR ---';
let startIdx = app.indexOf(startMarker);
let endIdx = app.indexOf(endMarker);

if (startIdx !== -1 && endIdx !== -1) {
  app = app.substring(0, startIdx) + newFunc + '\n' + app.substring(endIdx);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('app.js successfully patched for all-levels consolidation.');
} else {
  console.error('Could not find markers in app.js');
}
