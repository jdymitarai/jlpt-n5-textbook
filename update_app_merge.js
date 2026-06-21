const fs = require('fs');

let appJS = fs.readFileSync('app.js', 'utf8');

// 1. Remove vocab from initNavigation tracking
if (appJS.includes('vocab: "日檢單字總庫",')) {
  appJS = appJS.replace('vocab: "日檢單字總庫",', '');
}

// 2. initNavigation: remove vocab if block
const vocabIfBlock = `} else if (targetTab === "vocab") {
          initVocabPage();
        `;
if (appJS.includes(vocabIfBlock)) {
  appJS = appJS.replace(vocabIfBlock, '');
}

// 3. initConsolidationPage: add initVocabPage
const initConTarget = `const initConsolidationPage = () => {`;
const initConReplacement = `const initConsolidationPage = () => {
    initVocabPage(); // Initialize Nouns subtab`;
if (appJS.includes(initConTarget) && !appJS.includes('// Initialize Nouns subtab')) {
  appJS = appJS.replace(initConTarget, initConReplacement);
}

// 4. In updateDashboardProgress, update vocab page link
const dashVocabLink = `document.querySelector(".nav-item a[data-tab='vocab']").click();`;
const dashConLink = `document.querySelector(".nav-item a[data-tab='consolidation']").click();`;
if (appJS.includes(dashVocabLink)) {
  appJS = appJS.replace(dashVocabLink, dashConLink);
}

// 5. In app.js anywhere it sets vocab title
appJS = appJS.replace(/N5 單字庫 \(単語\)/g, "名詞總整理 (Nouns)");
appJS = appJS.replace(/日檢單字總庫/g, "單字總整理");

fs.writeFileSync('app.js', appJS, 'utf8');
console.log('Successfully updated app.js for Vocab merge');
