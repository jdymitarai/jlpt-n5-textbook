const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const newDemHtml = `            <!-- 4. 指示與疑問詞 -->
            <div id="subtab-demonstratives-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">Ko-So-A-Do (こ・そ・あ・ど) 系統指示代名詞表</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">指示代詞代表離說話者與聽話者的距離。「こ」代表近稱，「そ」代表中稱，「あ」代表遠稱，「ど」代表疑問。</p>
              <div style="overflow-x: auto; margin-bottom: 32px;">
                <table class="consolidation-table">
                  <thead>
                    <tr>
                      <th>指示代詞類型</th>
                      <th>近稱 (靠近說話者 こ)</th>
                      <th>中稱 (靠近聽話者 そ)</th>
                      <th>遠稱 (遠離雙方 あ)</th>
                      <th>疑問稱 (疑問選擇 ど)</th>
                    </tr>
                  </thead>
                  <tbody id="table-dem-body"></tbody>
                </table>
              </div>

              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">獨立疑問詞 (非こそあど系統)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">除了上述「ど」開頭的疑問詞之外，日常必用的提問單字 (5W1H)。點擊可聽發音。</p>
              <div style="overflow-x: auto;">
                <table class="consolidation-table">
                  <thead>
                    <tr>
                      <th>疑問情境</th>
                      <th>疑問詞</th>
                      <th>中文含意</th>
                    </tr>
                  </thead>
                  <tbody id="table-independent-interrogatives-body"></tbody>
                </table>
              </div>
            </div>`;

// Find the old subtab-demonstratives-view
const targetStart = '<!-- 4. 指示與疑問詞 -->';
let startIndex = html.indexOf(targetStart);
if (startIndex !== -1) {
  let endIndex = html.indexOf('<!-- 5. 副詞總整理 -->');
  if (endIndex !== -1) {
    let newHtml = html.substring(0, startIndex) + newDemHtml + "\n\n            " + html.substring(endIndex);
    fs.writeFileSync('index.html', newHtml, 'utf8');
    console.log("Successfully updated index.html for Demonstratives");
  } else {
    console.log("Failed to find end index for demonstratives in index.html");
  }
} else {
  console.log("Failed to find demonstratives in index.html");
}
