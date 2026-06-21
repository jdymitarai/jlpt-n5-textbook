const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the vocab-page section
const vocabPageStartTag = '<section id="vocab-page"';
const startIndex = html.indexOf(vocabPageStartTag);

if (startIndex !== -1) {
  // Find the next section to know where vocab-page ends
  const nextSectionIndex = html.indexOf('<section id="consolidation-page"', startIndex);
  if (nextSectionIndex !== -1) {
    let vocabPageContentRaw = html.substring(startIndex, nextSectionIndex);
    
    // We need just the inner content, without the <section> tags
    // Let's replace the h1 first
    vocabPageContentRaw = vocabPageContentRaw.replace(/<h1 class="page-title">.*?<\/h1>/, '<h3>名詞單字卡與列表</h3>');
    
    // Remove the `<section id="vocab-page" class="page-section hide">` and `</section>`
    let contentStart = vocabPageContentRaw.indexOf('>') + 1;
    let contentEnd = vocabPageContentRaw.lastIndexOf('</section>');
    let vocabContent = vocabPageContentRaw.substring(contentStart, contentEnd);
    
    const newSubtabView = `
            <!-- 0. 名詞整理 -->
            <div id="subtab-nouns-view" class="consolidation-view">
              ${vocabContent}
            </div>
    `;
    
    // Inject into consolidation page, before verbs
    const insertPoint = '<div id="subtab-verbs-view"';
    if (html.includes(insertPoint)) {
      html = html.replace(insertPoint, newSubtabView + '\n            ' + insertPoint);
      console.log('Inserted nouns view into consolidation');
      
      // Now remove the old vocab-page from the HTML entirely
      html = html.substring(0, startIndex) + html.substring(nextSectionIndex);
      console.log('Removed original vocab-page');
    } else {
      console.log('Could not find insert point for verbs-view');
    }
  } else {
    console.log('Could not find consolidation-page');
  }
} else {
  console.log('Could not find vocab-page');
}

fs.writeFileSync('index.html', html, 'utf8');
