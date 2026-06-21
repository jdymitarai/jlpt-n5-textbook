const fs = require('fs');
let html = fs.readFileSync('c:/ai/jlpt-n5-textbook/index.html', 'utf8');
const views = `
            <!-- 5. 名詞列表 -->
            <div id="subtab-nouns-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">JLPT 核心名詞列表</h3>
              <div id="nouns-container" class="nouns-grid-container"></div>
            </div>

            <!-- 6. 代名詞 -->
            <div id="subtab-pronouns-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">代名詞總整理</h3>
              <div id="pronouns-container" class="pronouns-grid-container"></div>
            </div>

            <!-- 7. 副詞 -->
            <div id="subtab-adverbs-view" class="consolidation-view hide">
              <h3 style="margin-bottom: 12px; font-family: var(--font-title); color: var(--primary);">副詞總整理</h3>
              <div id="adverbs-container" class="adverbs-grid-container"></div>
            </div>

          </div>
        </section>`;

html = html.replace('          </div>\r\n        </section>', views).replace('          </div>\n        </section>', views);
fs.writeFileSync('c:/ai/jlpt-n5-textbook/index.html', html, 'utf8');
console.log('Injected views!');
