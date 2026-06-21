const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const targetMarker = '<strong style="color: #10B981; display: block; margin-bottom: 4px;">第三類動詞 (不規則動詞)</strong>\n                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4;">只有兩個：<strong>「します」</strong>(做) 與<strong>「来(き)ます」</strong>(來)。以及「名詞+します」。必須直接記憶變化。</p>\n                  </div>';

const exceptionBlock = `
                  <div style="grid-column: 1 / -1; background: rgba(239, 68, 68, 0.05); padding: 12px; border-radius: 8px; border-left: 4px solid #EF4444; margin-top: 4px;">
                    <strong style="color: #EF4444; display: block; margin-bottom: 4px;">⚠️ 必考陷阱：長得很像第二類，但其實是第一類的「例外動詞」</strong>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; margin: 0;">
                      日檢最愛考！例如：<strong>帰(かえ)ります</strong> (回家)、<strong>入(はい)ります</strong> (進入)、<strong>走(はし)ります</strong> (跑)、<strong>知(し)ります</strong> (知道)、<strong>切(き)ります</strong> (切)。它們雖然結尾在「え段/い段」上，但必須按照<strong>第一類動詞</strong>的規則變化（例如て形是：帰って、入って），千萬別上當！
                    </p>
                  </div>`;

if (html.indexOf('⚠️ 必考陷阱') === -1) {
  html = html.replace(targetMarker, targetMarker + '\n' + exceptionBlock);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Added verb exceptions to index.html.');
} else {
  console.log('Verb exceptions already exist.');
}
