const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetTitle = '<h1 class="page-title">N5 單字總整理</h1>';
const newTitle = '<h1 class="page-title">全級別 單字總整理 (N5 ~ N1)</h1>';

const targetDesc = '<p style="color: var(--text-secondary); max-width: 700px; line-height: 1.6; margin-bottom: 24px;">\n              統整 N5 核心動詞三類變化、形容詞變化群組、必考特殊量詞（個數/人數/日期） 與 ko-so-a-do 指示代名詞。\n            </p>';
const newDesc = '<p style="color: var(--text-secondary); max-width: 700px; line-height: 1.6; margin-bottom: 24px;">\n              統整 N5 ~ N1 核心動詞三類變化、形容詞變化群組、各級別常考副詞、接續詞、必考助詞對照，以及敬語系統大盤點。\n            </p>';

html = html.replace(targetTitle, newTitle);
html = html.replace(targetDesc, newDesc);

// Just in case whitespace issues
if (html.indexOf('統整 N5 核心動詞') !== -1) {
  html = html.replace(/統整 N5 核心動詞三類變化、形容詞變化群組、必考特殊量詞（個數\/人數\/日期） 與 ko-so-a-do 指示代名詞。/g, '統整 N5 ~ N1 核心動詞三類變化、形容詞變化群組、各級別常考副詞、接續詞、必考助詞對照，以及敬語系統大盤點。');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated with new Consolidation title and description.');
