const fs = require('fs');

// 1. Fix app.js (Grammar accordion logic)
let appJS = fs.readFileSync('app.js', 'utf8');

// Looking for the logic where grammar items close each other
// Usually looks like:
/*
      header.onclick = () => {
        // ... loop through grammar items to remove 'open'
        const isOpen = item.classList.contains('open');
*/
// Let's replace the whole block by finding header.onclick inside renderGrammarList
let lines = appJS.split('\n');
let inHeaderClick = false;
let startDelete = -1;
let endDelete = -1;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('header.onclick = () => {') && lines[i-1].includes('const detail = document.createElement(\'div\');')) {
    // Actually, usually the click listener is right around the end of item creation
  }
}
// An easier way: just use string replace.
// Let's see what the actual code is by finding header.onclick
