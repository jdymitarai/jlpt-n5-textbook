const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const targetStr = `// 9. Render Demonstratives (if any, although it might just be static HTML)`;
const newCode = `// 9. Render Demonstratives
    const tableDem = document.getElementById("table-dem-body");
    if (tableDem && JLPT_DATA.demonstratives) {
      tableDem.innerHTML = "";
      JLPT_DATA.demonstratives.forEach(item => {
        const html = \`
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="font-weight: 600; color: var(--primary); vertical-align: middle;">\${item.type}</td>
            <td style="vertical-align: middle;">\${item.ko}</td>
            <td style="vertical-align: middle;">\${item.so}</td>
            <td style="vertical-align: middle;">\${item.a}</td>
            <td style="vertical-align: middle;">\${item.do}</td>
          </tr>
        \`;
        tableDem.insertAdjacentHTML("beforeend", html);
      });
    }

    // 10. Render Independent Interrogatives
    const tableIndep = document.getElementById("table-independent-interrogatives-body");
    if (tableIndep && JLPT_DATA.independentInterrogatives) {
      tableIndep.innerHTML = "";
      JLPT_DATA.independentInterrogatives.forEach(group => {
        let wordsHtml = group.words.map(w => \`
          <div style="margin-bottom: 8px;">
            <span class="clickable-jp" data-speech="\${w.word}" style="font-size: 1.1em; font-weight: bold; color: var(--text-primary); cursor: pointer;">\${w.word}</span>
            <span style="font-size: 0.85em; opacity: 0.8; color: var(--text-secondary); margin-left: 4px;">\${w.furigana ? '(' + w.furigana + ')' : ''}</span>
          </div>
        \`).join("");
        
        let meaningsHtml = group.words.map(w => \`
          <div style="margin-bottom: 8px; color: var(--text-primary);">\${w.meaning}</div>
        \`).join("");

        const html = \`
          <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="font-weight: 600; color: var(--primary); vertical-align: middle;">\${group.category}</td>
            <td style="vertical-align: middle;">\${wordsHtml}</td>
            <td style="vertical-align: middle;">\${meaningsHtml}</td>
          </tr>
        \`;
        tableIndep.insertAdjacentHTML("beforeend", html);
      });
    }`;

if (app.includes(targetStr)) {
  app = app.replace(targetStr, newCode);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log("Successfully updated app.js for Demonstratives and Interrogatives");
} else {
  console.log("Could not find target string in app.js");
}
