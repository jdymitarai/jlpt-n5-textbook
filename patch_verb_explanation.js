const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startMarker = '<div class="grammar-rule-card" style="margin-bottom: 20px; background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); padding: 16px; border-radius: 12px;">';
const endMarker = '              <div style="overflow-x: auto;">\n                <table class="consolidation-table">';

let startIdx = html.indexOf(startMarker);
let endIdx = html.indexOf(endMarker, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const newCard = `<div class="grammar-rule-card" style="margin-bottom: 24px; background: var(--surface); border: 1px solid var(--border); padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                <h4 style="margin-bottom: 16px; color: var(--primary); font-size: 1.2rem; display: flex; align-items: center; gap: 8px;">
                  <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                  日文動詞三大分類與變化全攻略
                </h4>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-bottom: 20px;">
                  <!-- 第一類 -->
                  <div style="border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; overflow: hidden;">
                    <div style="background: rgba(139, 92, 246, 0.1); padding: 10px 16px; border-bottom: 1px solid rgba(139, 92, 246, 0.2); font-weight: 700; color: #8B5CF6;">
                      第一類動詞 (五段動詞)
                    </div>
                    <div style="padding: 16px;">
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        <li style="margin-bottom: 8px;"><strong>🎯 辨別法 (從辭書形)：</strong>字尾不是「る」，或字尾是「る」但前一音為「あ、う、お段」</li>
                        <li style="margin-bottom: 8px;"><strong>🎯 辨別法 (從ます形)：</strong>ます前方的音為<strong style="color:var(--text)">「い段音」</strong> (如：書<span style="color:#8B5CF6">き</span>ます)</li>
                        <li style="margin-bottom: 8px; border-top: 1px dashed var(--border); padding-top: 8px;"><strong>🔄 て形 / た形 音便規則：</strong>
                          <ul style="margin-top: 4px; padding-left: 20px; list-style-type: disc;">
                            <li><strong style="color:var(--text)">い、ち、り</strong> ➡️ <strong style="color:#8B5CF6">って</strong> / <strong style="color:#8B5CF6">った</strong> (會って)</li>
                            <li><strong style="color:var(--text)">み、び、に</strong> ➡️ <strong style="color:#8B5CF6">んで</strong> / <strong style="color:#8B5CF6">んだ</strong> (飲んで)</li>
                            <li><strong style="color:var(--text)">き</strong> ➡️ <strong style="color:#8B5CF6">いて</strong> (書いて) ※例外：行く ➡️ 行って</li>
                            <li><strong style="color:var(--text)">ぎ</strong> ➡️ <strong style="color:#8B5CF6">いで</strong> (急いで)</li>
                            <li><strong style="color:var(--text)">し</strong> ➡️ <strong style="color:#8B5CF6">して</strong> (話して)</li>
                          </ul>
                        </li>
                        <li style="border-top: 1px dashed var(--border); padding-top: 8px;"><strong>🔄 ない形規則：</strong>い段音改為同行的<strong style="color:#8B5CF6">「あ段音」</strong>＋ない (如：書かない)。※如果是「い」則改為「わ」 (如：買わない)</li>
                      </ul>
                    </div>
                  </div>

                  <!-- 第二類 -->
                  <div style="border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; overflow: hidden;">
                    <div style="background: rgba(59, 130, 246, 0.1); padding: 10px 16px; border-bottom: 1px solid rgba(59, 130, 246, 0.2); font-weight: 700; color: #3B82F6;">
                      第二類動詞 (上下段動詞)
                    </div>
                    <div style="padding: 16px;">
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        <li style="margin-bottom: 8px;"><strong>🎯 辨別法 (從辭書形)：</strong>字尾一定是<strong style="color:var(--text)">「る」</strong>，且前一個音為「い、え段」</li>
                        <li style="margin-bottom: 8px;"><strong>🎯 辨別法 (從ます形)：</strong>ます前方的音為<strong style="color:var(--text)">「え段音」</strong> (如：食<span style="color:#3B82F6">べ</span>ます) 或少數「い段音」 (如：見ます)</li>
                        <li style="margin-bottom: 8px; border-top: 1px dashed var(--border); padding-top: 8px;"><strong>🔄 變化規則超級簡單：</strong>
                          不管要變成 て形、た形、還是 ない形，通通都是<strong>「直接去掉『ます/る』，然後接上後綴」</strong>！
                          <ul style="margin-top: 4px; padding-left: 20px; list-style-type: disc;">
                            <li>て形：食べます ➡️ <strong style="color:#3B82F6">食べて</strong></li>
                            <li>た形：食べます ➡️ <strong style="color:#3B82F6">食べた</strong></li>
                            <li>ない形：食べます ➡️ <strong style="color:#3B82F6">食べない</strong></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- 第三類 -->
                  <div style="border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; overflow: hidden; height: fit-content;">
                    <div style="background: rgba(16, 185, 129, 0.1); padding: 10px 16px; border-bottom: 1px solid rgba(16, 185, 129, 0.2); font-weight: 700; color: #10B981;">
                      第三類動詞 (不規則動詞)
                    </div>
                    <div style="padding: 16px;">
                      <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
                        <li style="margin-bottom: 8px;"><strong>🎯 辨別法：</strong>全日文只有兩個專屬動詞：<strong>「来(き)ます」(來)</strong> 與 <strong>「します」(做)</strong>。以及由「名詞＋します」組成的動詞 (如：勉強します)。</li>
                        <li style="margin-bottom: 8px; border-top: 1px dashed var(--border); padding-top: 8px;"><strong>🔄 變化規則 (必須死背)：</strong>
                          <ul style="margin-top: 4px; padding-left: 20px; list-style-type: disc;">
                            <li style="margin-bottom: 6px;"><strong>します (する)：</strong><br>て形: <strong style="color:#10B981">して</strong> | た形: <strong style="color:#10B981">した</strong> | ない形: <strong style="color:#10B981">しない</strong></li>
                            <li><strong>来(き)ます (くる)：</strong><br>て形: <strong style="color:#10B981">きて</strong> | た形: <strong style="color:#10B981">きた</strong> | ない形: <strong style="color:#10B981">こない</strong><br>⚠️(注意 ない形 發音變成"こ"!)</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style="background: rgba(239, 68, 68, 0.05); padding: 16px; border-radius: 8px; border-left: 4px solid #EF4444;">
                  <strong style="color: #EF4444; display: block; margin-bottom: 8px; font-size: 1.1rem;">⚠️ 必考陷阱：長得很像第二類，但其實是第一類的「例外動詞」</strong>
                  <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6; margin: 0;">
                    日檢最愛考！這些動詞長得很騙人，辭書形結尾是「る」且前面是い/え段（例如：帰る），或是ます形是い段/え段，但他們全部都是<strong>第一類動詞 (五段動詞)</strong>！變化必須照第一類走（也就是會有促音便）。<br>
                    <strong>常見例外名單：</strong><br>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">帰(かえ)る (回家) ➡️ 帰って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">入(はい)る (進入) ➡️ 入って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">走(はし)る (跑) ➡️ 走って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">知(し)る (知道) ➡️ 知って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">切(き)る (切) ➡️ 切って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">要(い)る (需要) ➡️ 要って</span>
                    <span style="display:inline-block; margin-top:8px; padding: 4px 10px; background: rgba(239, 68, 68, 0.1); border-radius: 4px; color:#EF4444; font-weight:700; margin-right: 8px;">減(へ)る (減少) ➡️ 減って</span>
                  </p>
                </div>
              </div>\n\n`;

  html = html.substring(0, startIdx) + newCard + html.substring(endIdx);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html successfully patched with detailed verb explanation.');
} else {
  console.log('Could not find markers:', startIdx, endIdx);
}
