const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove sidebar nav item
const navRegex = /<li class="nav-item">\s*<a data-tab="vocab">[\s\S]*?<\/li>/;
if (html.match(navRegex)) {
  html = html.replace(navRegex, '');
  console.log('Removed vocab nav item');
}

// 2. Add "名詞 (Nouns)" to subtabs
const subtabsRegex = /<button class="subtab-btn btn-primary" data-subtab="verbs">動詞 \(Verbs\)<\/button>/;
const newSubtabs = `<button class="subtab-btn btn-primary" data-subtab="nouns">名詞 (Nouns)</button>\n          <button class="subtab-btn btn-secondary" data-subtab="verbs">動詞 (Verbs)</button>`;
if (html.includes('<button class="subtab-btn btn-primary" data-subtab="verbs">動詞 (Verbs)</button>')) {
  html = html.replace('<button class="subtab-btn btn-primary" data-subtab="verbs">動詞 (Verbs)</button>', newSubtabs);
  console.log('Added nouns subtab button');
}

// 3. Extract vocab page content
const vocabPageStart = '<div id="vocab-page" class="page-view hide">';
let startIndex = html.indexOf(vocabPageStart);
if (startIndex !== -1) {
  // Find the end of vocab-page. It ends right before <!-- MODULE 3: GRAMMAR -->
  let endIndex = html.indexOf('<!-- MODULE 3: GRAMMAR -->');
  if (endIndex !== -1) {
    let vocabContentRaw = html.substring(startIndex + vocabPageStart.length, endIndex);
    // Find the last closing div
    let lastDivIndex = vocabContentRaw.lastIndexOf('</div>');
    let vocabContent = vocabContentRaw.substring(0, lastDivIndex);
    
    // Remove the h1 from vocabContent since it's now a subtab
    vocabContent = vocabContent.replace(/<h1 class="page-title">.*?<\/h1>/, '<h3>名詞單字卡與列表</h3>');
    
    // Construct the new subtab view
    const newSubtabView = `
            <!-- 0. 名詞整理 -->
            <div id="subtab-nouns-view" class="consolidation-view">
              ${vocabContent}
            </div>
    `;
    
    // Inject into consolidation page, before verbs
    const insertPoint = '<!-- 1. 動詞總整理 -->';
    if (html.includes(insertPoint)) {
      html = html.replace(insertPoint, newSubtabView + '\n            ' + insertPoint);
      console.log('Inserted nouns view into consolidation');
    }
    
    // Remove the original vocab-page
    let originalVocabPageFull = html.substring(html.indexOf('<!-- MODULE 2: VOCABULARY -->'), endIndex);
    html = html.replace(originalVocabPageFull, '');
    console.log('Removed original vocab module HTML');
  }
}

fs.writeFileSync('index.html', html, 'utf8');
