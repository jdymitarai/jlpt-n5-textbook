  const renderConsolidationData = () => {
    const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
    
    const getBadgeHtml = (level) => {
      let color = 'var(--text-muted)';
      let bg = 'var(--surface-2)';
      if (level === 'N5') { color = '#8B5CF6'; bg = 'rgba(139, 92, 246, 0.1)'; }
      if (level === 'N4') { color = '#3B82F6'; bg = 'rgba(59, 130, 246, 0.1)'; }
      if (level === 'N3') { color = '#10B981'; bg = 'rgba(16, 185, 129, 0.1)'; }
      if (level === 'N2') { color = '#F59E0B'; bg = 'rgba(245, 158, 11, 0.1)'; }
      if (level === 'N1') { color = '#EF4444'; bg = 'rgba(239, 68, 68, 0.1)'; }
      return `<span style="background-color: ${bg}; color: ${color}; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; font-weight: 700;">${level}</span>`;
    };

    // 1. Render Verbs
    const tableVerbs = document.getElementById("table-verbs-body");
    if (tableVerbs) {
      tableVerbs.innerHTML = "";
      const verbConjugations = levels.flatMap(lvl => (JLPT_DATA.verbConjugations ? JLPT_DATA.verbConjugations[lvl] || [] : []).map(v => ({...v, level: lvl})));
      verbConjugations.forEach(v => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${getBadgeHtml(v.level)}</td>
          <td class="clickable-jp" data-speech="${v.dictionary.split(" ")[0]}">${v.dictionary}</td>
          <td class="clickable-jp" data-speech="${v.masu.split(" ")[0]}">${v.masu}</td>
          <td class="clickable-jp" data-speech="${v.te.split(" ")[0]}">${v.te}</td>
          <td class="clickable-jp" data-speech="${v.nai.split(" ")[0]}">${v.nai}</td>
          <td>${v.meaning}</td>
          <td><span class="vocab-badge ${v.group.includes("第一") ? "verbs" : v.group.includes("第二") ? "people" : "time"}">${v.group}</span></td>
        `;
        tableVerbs.appendChild(tr);
      });
    }

    // 2. Render Adjectives (i-adjectives)
    const tableAdjI = document.getElementById("table-adj-i-body");
    if (tableAdjI) {
      tableAdjI.innerHTML = "";
      const iAdjs = levels.flatMap(lvl => (JLPT_DATA.adjectiveGroups && JLPT_DATA.adjectiveGroups[lvl] ? JLPT_DATA.adjectiveGroups[lvl].iAdjectives || [] : []).map(v => ({...v, level: lvl})));
      iAdjs.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${getBadgeHtml(a.level)}</td>
          <td class="clickable-jp" data-speech="${a.word.split(" ")[0]}">${a.word}</td>
          <td>${a.meaning}</td>
          <td class="clickable-jp" data-speech="${a.negative}">${a.negative}</td>
          <td class="clickable-jp" data-speech="${a.past}">${a.past}</td>
        `;
        tableAdjI.appendChild(tr);
      });
    }

    // 3. Render Adjectives (na-adjectives)
    const tableAdjNa = document.getElementById("table-adj-na-body");
    if (tableAdjNa) {
      tableAdjNa.innerHTML = "";
      const naAdjs = levels.flatMap(lvl => (JLPT_DATA.adjectiveGroups && JLPT_DATA.adjectiveGroups[lvl] ? JLPT_DATA.adjectiveGroups[lvl].naAdjectives || [] : []).map(v => ({...v, level: lvl})));
      naAdjs.forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${getBadgeHtml(a.level)}</td>
          <td class="clickable-jp" data-speech="${a.word.split(" ")[0]}">${a.word}</td>
          <td>${a.meaning}</td>
          <td class="clickable-jp" data-speech="${a.negative}">${a.negative}</td>
          <td class="clickable-jp" data-speech="${a.past}">${a.past}</td>
        `;
        tableAdjNa.appendChild(tr);
      });
    }

    // 5. Render Adverbs
    const adverbsContainer = document.getElementById("adverbs-container");
    if (adverbsContainer) {
      const adverbs = levels.flatMap(lvl => (JLPT_DATA.adverbsGroup ? JLPT_DATA.adverbsGroup[lvl] || [] : []).map(v => ({...v, level: lvl})));
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>日文 (原形)</th><th>發音</th><th>中文意思</th><th>分類/用法</th></tr></thead><tbody>';
      adverbs.forEach(item => {
        html += `<tr>
          <td>${getBadgeHtml(item.level)}</td>
          <td class="clickable-jp" data-speech="${item.word}">${item.word}</td>
          <td>${item.furigana} (${item.romaji})</td>
          <td>${item.meaning}</td>
          <td><span class="vocab-badge ${item.type === '時間與頻率' ? 'time' : 'people'}">${item.type}</span></td>
        </tr>`;
      });
      html += '</tbody></table></div>';
      adverbsContainer.innerHTML = adverbs.length ? html : '<p>尚未載入資料</p>';
      
      adverbsContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = () => speak(td.getAttribute('data-speech'));
      });
    }

    // 6. Render Conjunctions
    const conjContainer = document.getElementById("conjunctions-container");
    if (conjContainer) {
      const conjunctions = levels.flatMap(lvl => (JLPT_DATA.conjunctions ? JLPT_DATA.conjunctions[lvl] || [] : []).map(v => ({...v, level: lvl})));
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>日文 (原形)</th><th>發音</th><th>中文意思</th><th>分類/用法</th></tr></thead><tbody>';
      conjunctions.forEach(item => {
        html += `<tr>
          <td>${getBadgeHtml(item.level)}</td>
          <td class="clickable-jp" data-speech="${item.word}">${item.word}</td>
          <td>${item.furigana} (${item.romaji})</td>
          <td>${item.meaning}</td>
          <td><span class="vocab-badge ${item.type === '逆接與對立' ? 'time' : 'nature'}">${item.type}</span></td>
        </tr>`;
      });
      html += '</tbody></table></div>';
      conjContainer.innerHTML = conjunctions.length ? html : '<p>尚未載入資料</p>';
      
      conjContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = () => speak(td.getAttribute('data-speech'));
      });
    }

    // 7. Render Particles
    const partContainer = document.getElementById("particles-container");
    if (partContainer) {
      const particles = levels.flatMap(lvl => (JLPT_DATA.particles ? JLPT_DATA.particles[lvl] || [] : []).map(v => ({...v, level: lvl})));
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>助詞</th><th>核心功能</th><th>經典例句</th></tr></thead><tbody>';
      particles.forEach(item => {
        html += `<tr>
          <td>${getBadgeHtml(item.level)}</td>
          <td class="clickable-jp" style="font-size: 1.2rem; font-weight: 700; color: var(--primary);" data-speech="${item.word}">${item.word}</td>
          <td>${item.function}</td>
          <td>
            <div style="margin-bottom: 4px;"><ruby>${item.exampleJa}<rt>${item.exampleFurigana}</rt></ruby></div>
            <div style="font-size: 0.85rem; color: var(--text-secondary);">${item.exampleZh}</div>
          </td>
        </tr>`;
      });
      html += '</tbody></table></div>';
      partContainer.innerHTML = particles.length ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">尚未載入資料</p>';
      
      partContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = (e) => {
           e.stopPropagation();
           speak(td.getAttribute('data-speech'));
        };
      });
    }

    // 8. Render Keigo
    const keigoContainer = document.getElementById("keigo-container");
    if (keigoContainer) {
      const keigo = levels.flatMap(lvl => (JLPT_DATA.keigo ? JLPT_DATA.keigo[lvl] || [] : []).map(v => ({...v, level: lvl})));
      let html = '<div style="overflow-x: auto;"><table class="consolidation-table"><thead><tr><th style="width:60px;">級別</th><th>中文動作</th><th>辭書形 (常體)</th><th>丁寧語 (一般禮貌)</th><th>尊敬語 (抬高對方)</th><th>謙讓語 (貶低自己)</th></tr></thead><tbody>';
      keigo.forEach(item => {
        html += `<tr>
          <td>${getBadgeHtml(item.level)}</td>
          <td>${item.meaning}</td>
          <td class="clickable-jp" data-speech="${item.dict.split(' / ')[0]}">${item.dict}</td>
          <td class="clickable-jp" data-speech="${item.polite.split(' / ')[0]}">${item.polite}</td>
          <td class="clickable-jp" data-speech="${item.honorific.replace(/\(.*\)/g, '').split(' / ')[0].trim()}">${item.honorific}</td>
          <td class="clickable-jp" data-speech="${item.humble.replace(/\(.*\)/g, '').split(' / ')[0].trim()}">${item.humble}</td>
        </tr>`;
      });
      html += '</tbody></table></div>';
      keigoContainer.innerHTML = keigo.length ? html : '<p style="text-align:center; padding: 20px; color: var(--text-secondary);">尚未載入資料</p>';
      
      keigoContainer.querySelectorAll('.clickable-jp').forEach(td => {
        td.onclick = (e) => {
           e.stopPropagation();
           const speechText = td.getAttribute('data-speech');
           if (speechText && speechText !== '—') {
             speak(speechText);
           }
        };
      });
    }
  };
