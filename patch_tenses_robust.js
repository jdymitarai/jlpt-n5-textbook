const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Use string replacement that handles \r?\n gracefully or just insert via indexOf

// 1. Add the subtab button
const buttonMarker = 'data-subtab="keigo">敬語系統對照</button>';
if (html.includes(buttonMarker) && !html.includes('data-subtab="tenses"')) {
  html = html.replace(buttonMarker, buttonMarker + '\n            <button class="btn btn-secondary subtab-btn" data-subtab="tenses">四大詞性時態對照</button>');
  console.log("Button inserted.");
} else {
  console.log("Button marker not found or already inserted.");
}

// 2. Add the view
const viewMarker = '<!-- PAGE 3: 文法核心庫 (Grammar Core)         -->';
if (html.includes(viewMarker) && !html.includes('subtab-tenses-view')) {
  // We want to insert the tenses view right before the </section> of the consolidation-page
  // Let's find the position of viewMarker
  let idx = html.indexOf(viewMarker);
  // Find the previous </section> before viewMarker
  let sectionEnd = html.lastIndexOf('</section>', idx);
  
  if (sectionEnd !== -1) {
    const tensesViewHTML = `
            <!-- 時態整理 -->
            <div id="subtab-tenses-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">四大詞性時態變化全指南</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 24px;">日文的時態變化是根據「詞性」決定的。這裡將「名詞/な形容詞」、「い形容詞」、「動詞」的「現在/過去」與「肯定/否定」一次列出，並左右對照「敬體 (丁寧體)」與「常體 (普通體)」。</p>

              <!-- 1. 名詞與な形容詞 -->
              <div class="grammar-rule-card" style="margin-bottom: 24px; background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h4 style="margin-bottom: 16px; color: #8B5CF6; font-size: 1.1rem; border-bottom: 2px solid rgba(139, 92, 246, 0.2); padding-bottom: 8px;">
                  ① 名詞 (N) 與 な形容詞 (Na-adj) 群組
                </h4>
                <div style="overflow-x: auto;">
                  <table class="consolidation-table" style="min-width: 600px;">
                    <thead>
                      <tr>
                        <th style="width: 20%;">時態與語氣</th>
                        <th style="width: 40%;">敬體 (對長輩/生人)</th>
                        <th style="width: 40%;">常體 (對平輩/朋友)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="font-weight: 700;">現在肯定</td>
                        <td>〜<strong style="color:#8B5CF6">です</strong></td>
                        <td>〜<strong style="color:#8B5CF6">だ</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">現在否定</td>
                        <td>〜<strong style="color:#EF4444">じゃありません</strong></td>
                        <td>〜<strong style="color:#EF4444">じゃない</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去肯定</td>
                        <td>〜<strong style="color:#3B82F6">でした</strong></td>
                        <td>〜<strong style="color:#3B82F6">だった</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去否定</td>
                        <td>〜<strong style="color:#EF4444">じゃありません</strong><strong style="color:#3B82F6">でした</strong></td>
                        <td>〜<strong style="color:#EF4444">じゃな</strong><strong style="color:#3B82F6">かった</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 2. い形容詞 -->
              <div class="grammar-rule-card" style="margin-bottom: 24px; background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h4 style="margin-bottom: 16px; color: #3B82F6; font-size: 1.1rem; border-bottom: 2px solid rgba(59, 130, 246, 0.2); padding-bottom: 8px;">
                  ② い形容詞 (I-adj) 群組 <span style="font-size:0.85rem; font-weight:normal; color:var(--text-secondary);">(字尾「い」產生變化)</span>
                </h4>
                <div style="overflow-x: auto;">
                  <table class="consolidation-table" style="min-width: 600px;">
                    <thead>
                      <tr>
                        <th style="width: 20%;">時態與語氣</th>
                        <th style="width: 40%;">敬體 (對長輩/生人)</th>
                        <th style="width: 40%;">常體 (對平輩/朋友)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="font-weight: 700;">現在肯定</td>
                        <td>〜<strong style="color:#3B82F6">い</strong>です</td>
                        <td>〜<strong style="color:#3B82F6">い</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">現在否定</td>
                        <td>〜<strong style="color:#EF4444">くない</strong>です<br><span style="font-size:0.85rem; color:var(--text-secondary);">(或 〜<strong style="color:#EF4444">くありません</strong>)</span></td>
                        <td>〜<strong style="color:#EF4444">くない</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去肯定</td>
                        <td>〜<strong style="color:#3B82F6">かった</strong>です</td>
                        <td>〜<strong style="color:#3B82F6">かった</strong></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去否定</td>
                        <td>〜<strong style="color:#EF4444">くなかった</strong>です<br><span style="font-size:0.85rem; color:var(--text-secondary);">(或 〜<strong style="color:#EF4444">くありません</strong><strong style="color:#3B82F6">でした</strong>)</span></td>
                        <td>〜<strong style="color:#EF4444">くな</strong><strong style="color:#3B82F6">かった</strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- 3. 動詞 -->
              <div class="grammar-rule-card" style="margin-bottom: 24px; background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h4 style="margin-bottom: 16px; color: #10B981; font-size: 1.1rem; border-bottom: 2px solid rgba(16, 185, 129, 0.2); padding-bottom: 8px;">
                  ③ 動詞 (Verb) 群組
                </h4>
                <div style="overflow-x: auto;">
                  <table class="consolidation-table" style="min-width: 600px;">
                    <thead>
                      <tr>
                        <th style="width: 20%;">時態與語氣</th>
                        <th style="width: 40%;">敬體 (對長輩/生人)</th>
                        <th style="width: 40%;">常體 (對平輩/朋友)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style="font-weight: 700;">現在肯定</td>
                        <td>〜<strong style="color:#10B981">ます</strong> <span style="font-size:0.85rem; color:var(--text-secondary);">(ます形)</span></td>
                        <td>〜<strong style="color:#10B981">る</strong> <span style="font-size:0.85rem; color:var(--text-secondary);">(辭書形/原形)</span></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">現在否定</td>
                        <td>〜<strong style="color:#EF4444">ません</strong></td>
                        <td>〜<strong style="color:#EF4444">ない</strong> <span style="font-size:0.85rem; color:var(--text-secondary);">(ない形)</span></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去肯定</td>
                        <td>〜<strong style="color:#3B82F6">ました</strong></td>
                        <td>〜<strong style="color:#3B82F6">た</strong> <span style="font-size:0.85rem; color:var(--text-secondary);">(た形)</span></td>
                      </tr>
                      <tr>
                        <td style="font-weight: 700;">過去否定</td>
                        <td>〜<strong style="color:#EF4444">ません</strong><strong style="color:#3B82F6">でした</strong></td>
                        <td>〜<strong style="color:#EF4444">な</strong><strong style="color:#3B82F6">かった</strong> <span style="font-size:0.85rem; color:var(--text-secondary);">(ない形去い+かった)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
`;
    // Find the </div> before </section>
    let divEnd = html.lastIndexOf('</div>', sectionEnd);
    if (divEnd !== -1) {
       html = html.substring(0, divEnd) + tensesViewHTML + '\n          </div>\n        </section>\n' + html.substring(sectionEnd + 10);
       console.log("View inserted.");
    }
  }
} else {
  console.log("View marker not found or already inserted.");
}

fs.writeFileSync('index.html', html, 'utf8');
