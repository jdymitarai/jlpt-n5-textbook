const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');

const targetFunctionStart = app.indexOf('const renderConsolidationData = () => {');
if (targetFunctionStart === -1) {
  console.log('Could not find renderConsolidationData');
  process.exit(1);
}

// Find the end of renderConsolidationData
let braceCount = 0;
let endIdx = -1;
let started = false;
for (let i = targetFunctionStart; i < app.length; i++) {
  if (app[i] === '{') {
    braceCount++;
    started = true;
  } else if (app[i] === '}') {
    braceCount--;
  }
  if (started && braceCount === 0) {
    endIdx = i + 1;
    break;
  }
}

const newRenderConsolidation = `const renderConsolidationData = () => {
    try {
      // 1. Render Verbs
      const tableVerbs = document.getElementById("table-verbs-body");
      if (tableVerbs) {
        tableVerbs.innerHTML = "";
        const verbConjugations = JLPT_DATA.verbConjugations[currentLevel] || [];
        verbConjugations.forEach(v => {
          // Backward compatibility + new format support
          const dictionary = v.dictionary || (v.conjugations && v.conjugations.dictionary && v.conjugations.dictionary.jp) || v.word || '';
          const masu = v.masu || (v.conjugations && v.conjugations.masu && v.conjugations.masu.jp) || '';
          const te = v.te || (v.conjugations && v.conjugations.te && v.conjugations.te.jp) || '';
          const nai = v.nai || (v.conjugations && v.conjugations.nai && v.conjugations.nai.jp) || '';
          const kanou = (v.conjugations && v.conjugations.kanou && v.conjugations.kanou.jp) || '-';
          const meaning = v.meaning || '暫無釋義';
          const groupStr = typeof v.group === 'number' ? \`第\${['一', '二', '三'][v.group - 1] || v.group}類動詞\` : (v.group || '');
          
          const badgeClass = groupStr.includes("一") ? "verbs" : groupStr.includes("二") ? "people" : "time";

          const tr = document.createElement("tr");
          // Add 可能形 column (Requires HTML update too, but we will add it here, and if HTML is missing it, it just overflows or is ignored, wait! The user asked for it, we must add it to HTML as well)
          tr.innerHTML = \`
            <td class="clickable-jp" data-speech="\${dictionary.split(" ")[0]}">\${dictionary}</td>
            <td class="clickable-jp" data-speech="\${masu.split(" ")[0]}">\${masu}</td>
            <td class="clickable-jp" data-speech="\${te.split(" ")[0]}">\${te}</td>
            <td class="clickable-jp" data-speech="\${nai.split(" ")[0]}">\${nai}</td>
            <td class="clickable-jp" data-speech="\${kanou !== '-' ? kanou.split(" ")[0] : ''}">\${kanou}</td>
            <td>\${meaning}</td>
            <td><span class="vocab-badge \${badgeClass}">\${groupStr}</span></td>
          \`;
          tableVerbs.appendChild(tr);
        });
      }

      // 2. Render Adjectives (i-adjectives)
      const tableAdjI = document.getElementById("table-adj-i-body");
      if (tableAdjI) {
        tableAdjI.innerHTML = "";
        const adjGroup = JLPT_DATA.adjectiveGroups[currentLevel] || { iAdjectives: [], naAdjectives: [] };
        const iAdjs = Array.isArray(adjGroup) ? adjGroup.filter(a => a.type === 'i' || a.type === 'i-adjective') : (adjGroup.iAdjectives || []);
        
        iAdjs.forEach(a => {
          const word = a.word || '';
          const meaning = a.meaning || '暫無釋義';
          const negative = a.negative || (a.conjugations && a.conjugations.negative && a.conjugations.negative.jp) || '';
          const past = a.past || (a.conjugations && a.conjugations.past && a.conjugations.past.jp) || '';
          
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td class="clickable-jp" data-speech="\${word.split(" ")[0]}">\${word}</td>
            <td>\${meaning}</td>
            <td class="clickable-jp" data-speech="\${negative.split(" ")[0]}">\${negative}</td>
            <td class="clickable-jp" data-speech="\${past.split(" ")[0]}">\${past}</td>
          \`;
          tableAdjI.appendChild(tr);
        });
      }

      // 3. Render Adjectives (na-adjectives)
      const tableAdjNa = document.getElementById("table-adj-na-body");
      if (tableAdjNa) {
        tableAdjNa.innerHTML = "";
        const adjGroup = JLPT_DATA.adjectiveGroups[currentLevel] || { iAdjectives: [], naAdjectives: [] };
        const naAdjs = Array.isArray(adjGroup) ? adjGroup.filter(a => a.type === 'na' || a.type === 'na-adjective') : (adjGroup.naAdjectives || []);
        
        naAdjs.forEach(a => {
          const word = a.word || '';
          const meaning = a.meaning || '暫無釋義';
          const negative = a.negative || (a.conjugations && a.conjugations.negative && a.conjugations.negative.jp) || '';
          const past = a.past || (a.conjugations && a.conjugations.past && a.conjugations.past.jp) || '';
          
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td class="clickable-jp" data-speech="\${word.split(" ")[0]}">\${word}</td>
            <td>\${meaning}</td>
            <td class="clickable-jp" data-speech="\${negative.split(" ")[0]}">\${negative}</td>
            <td class="clickable-jp" data-speech="\${past.split(" ")[0]}">\${past}</td>
          \`;
          tableAdjNa.appendChild(tr);
        });
      }

      // 4. Render Counters
      if (JLPT_DATA.counterTables) {
        if (typeof renderCounterGrid === 'function') {
          if (JLPT_DATA.counterTables.items) renderCounterGrid("grid-counter-items", JLPT_DATA.counterTables.items);
          if (JLPT_DATA.counterTables.people) renderCounterGrid("grid-counter-people", JLPT_DATA.counterTables.people);
          if (JLPT_DATA.counterTables.days) renderCounterGrid("grid-counter-days", JLPT_DATA.counterTables.days);
        }
      }

      // 5. Render Demonstratives
      const tableDem = document.getElementById("table-dem-body");
      if (tableDem && JLPT_DATA.demonstratives) {
        tableDem.innerHTML = "";
        JLPT_DATA.demonstratives.forEach(d => {
          const tr = document.createElement("tr");
          tr.innerHTML = \`
            <td>\${d.series}</td>
            <td class="clickable-jp" data-speech="\${d.ko}">\${d.ko}</td>
            <td class="clickable-jp" data-speech="\${d.so}">\${d.so}</td>
            <td class="clickable-jp" data-speech="\${d.a}">\${d.a}</td>
            <td class="clickable-jp" data-speech="\${d.do}">\${d.do}</td>
          \`;
          tableDem.appendChild(tr);
        });
      }
      
      // We will let the pronouns/adverbs injectors handle their own logic by appending to this function or executing afterwards.
    } catch (e) {
      console.error("Error in renderConsolidationData:", e);
    }
  }`;

app = app.substring(0, targetFunctionStart) + newRenderConsolidation + app.substring(endIdx);
fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
console.log('Successfully patched app.js to fix renderConsolidationData crashing!');
