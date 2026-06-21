const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add "名詞 (Nouns)" to subtabs
const btnTarget = '<button class="btn btn-primary subtab-btn" data-subtab="verbs">動詞三類變化</button>';
const btnReplacement = `<button class="btn btn-primary subtab-btn" data-subtab="nouns">名詞單字庫</button>
            <button class="btn btn-secondary subtab-btn" data-subtab="verbs">動詞三類變化</button>`;

if (html.includes(btnTarget) && !html.includes('data-subtab="nouns"')) {
  html = html.replace(btnTarget, btnReplacement);
  console.log('Added nouns subtab button');
}

// Ensure the first view is subtab-nouns-view and it's not hidden
if (html.includes('<div id="subtab-nouns-view" class="consolidation-view hide">')) {
  html = html.replace('<div id="subtab-nouns-view" class="consolidation-view hide">', '<div id="subtab-nouns-view" class="consolidation-view">');
}

// Make sure verbs view is hidden by default
const verbsViewTarget = '<div id="subtab-verbs-view" class="consolidation-view">';
const verbsViewReplacement = '<div id="subtab-verbs-view" class="consolidation-view hide">';
if (html.includes(verbsViewTarget)) {
  html = html.replace(verbsViewTarget, verbsViewReplacement);
}

fs.writeFileSync('index.html', html, 'utf8');
