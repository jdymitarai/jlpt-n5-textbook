const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const thTarget = /<thead>\s*<tr>\s*<th style="width: 60px;">級別<\/th>\s*<th style="min-width: 90px;">動詞原形<\/th>\s*<th style="min-width: 100px;">ます形\(敬體\)<\/th>\s*<th style="min-width: 90px;">て形\(接續\)<\/th>\s*<th style="min-width: 130px;">ている \/ ています<br><span style="font-size:0\.8em;font-weight:normal;">\(進行\/狀態\)<\/span><\/th>\s*<th style="min-width: 120px;">た形 \/ ました<br><span style="font-size:0\.8em;font-weight:normal;">\(過去\)<\/span><\/th>\s*<th style="min-width: 120px;">ない形 \/ ません<br><span style="font-size:0\.8em;font-weight:normal;">\(否定\)<\/span><\/th>\s*<th style="min-width: 140px;">なかった \/ ませんでした<br><span style="font-size:0\.8em;font-weight:normal;">\(過去否定\)<\/span><\/th>\s*<th style="min-width: 100px;">中文釋義<\/th>\s*<th style="min-width: 130px;">群組 \/ 情境<\/th>\s*<\/tr>\s*<\/thead>/;

const thReplace = `<thead>
                    <tr>
                      <th style="width: 60px;">級別</th>
                      <th style="min-width: 120px;">日文 (原形 / 敬體)</th>
                      <th style="min-width: 100px;">中文釋義</th>
                      <th style="min-width: 80px;">自 / 他</th>
                      <th style="min-width: 130px;">分類 / 情境</th>
                      <th style="width: 60px;">時態</th>
                    </tr>
                  </thead>`;

if (thTarget.test(html)) {
  html = html.replace(thTarget, thReplace);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('index.html headers rewritten successfully for compact view.');
} else {
  console.log('Target headers not found in index.html');
}
