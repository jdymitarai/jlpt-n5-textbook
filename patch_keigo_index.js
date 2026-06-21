const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Add button
const buttonsRegex = /(<button class="btn btn-secondary subtab-btn" data-subtab="particles">必考助詞對照<\/button>)/;
const newButtons = `
            <button class="btn btn-secondary subtab-btn" data-subtab="keigo">敬語系統對照</button>`;
html = html.replace(buttonsRegex, `$1${newButtons}`);

// Add view
const viewsRegex = /(<div id="subtab-particles-view" class="consolidation-view hide">[\s\S]*?<\/div>\s*<\/div>)/;

const newViews = `

            <!-- 8. 敬語系統對照 -->
            <div id="subtab-keigo-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">敬語系統對照表 (丁寧語、尊敬語、謙讓語)</h3>
              <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">
                日文的敬語分為三種層級。雖然 N5 主要是考「丁寧語」，但提早熟悉這套系統，未來看日劇或考 N4/N3 時就能輕鬆駕馭！點擊單字可聽發音。
              </p>
              
              <!-- 視覺化規則解說卡片 -->
              <div class="grammar-rule-card" style="margin-bottom: 20px; background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); padding: 16px; border-radius: 12px;">
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px;">
                  <div style="background: var(--surface); padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <strong style="color: #3B82F6; display: block; margin-bottom: 4px;">🟢 丁寧語 (Teineigo)</strong>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">對任何人都適用的基本禮貌。特徵是句尾使用<strong>「です」</strong>或<strong>「ます」</strong>。</p>
                  </div>
                  <div style="background: var(--surface); padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <strong style="color: #8B5CF6; display: block; margin-bottom: 4px;">⬆️ 尊敬語 (Sonkeigo)</strong>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">用於<strong>「對方」</strong>(長輩、客戶) 的動作，把對方捧上天。特徵：特殊動詞 或 お～になる。</p>
                  </div>
                  <div style="background: var(--surface); padding: 12px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <strong style="color: #F59E0B; display: block; margin-bottom: 4px;">⬇️ 謙讓語 (Kenjougo)</strong>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">用於<strong>「自己」</strong>的動作，把自己地位壓低以顯示對方的尊貴。特徵：特殊動詞 或 お～する。</p>
                  </div>
                </div>
              </div>

              <div id="keigo-container"></div>
            </div>`;

html = html.replace(viewsRegex, `$1${newViews}`);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html patched with keigo tab');
