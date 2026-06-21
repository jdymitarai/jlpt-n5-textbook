const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(fileData);

// Clean up na adjectives
for (const lvl of ['N5', 'N4', 'N3', 'N2', 'N1']) {
  if (window.JLPT_DATA.adjectiveGroups[lvl] && window.JLPT_DATA.adjectiveGroups[lvl].naAdjectives) {
    for (let i = 0; i < window.JLPT_DATA.adjectiveGroups[lvl].naAdjectives.length; i++) {
      let adj = window.JLPT_DATA.adjectiveGroups[lvl].naAdjectives[i];
      
      // Fix word format: extract the pure stem and any romaji/kana at the end
      // e.g. "静か(な)な (な) (shizuka)" -> pure stem is "静か", extra is "(shizuka)"
      let rawWord = adj.word;
      
      // Find the romaji part if any (anything from the last opening parenthesis that contains english letters)
      let romajiPart = "";
      let m = rawWord.match(/\([a-zA-Z\s]+\)$/);
      if (m) {
        romajiPart = " " + m[0];
      } else if (rawWord.includes('(shizuka)')) {
        romajiPart = " (shizuka)";
      }
      
      // Get the pure japanese part
      let jpPart = rawWord.replace(/\([a-zA-Z\s]+\)$/, '').trim();
      
      // remove all occurrences of (な), な, spaces at the end
      jpPart = jpPart.replace(/\(な\)/g, '').replace(/な/g, '').trim();
      
      // Special case if there's kanji reading like 嫌(いや)
      // wait, the format in original was "静か(な) (shizuka)" or similar? No, the original format in N5 vocabulary was just "静かな" or "静かな (shizuka)"?
      // Actually, if we just remove (な) and な from the end:
      let pureStem = jpPart;
      
      // Let's reconstruct
      adj.word = pureStem + "な" + romajiPart;
      adj.negative = pureStem + "ではない / " + pureStem + "ではありません";
      adj.past = pureStem + "だった / " + pureStem + "でした";
      adj.past_negative = pureStem + "ではなかった / " + pureStem + "ではありませんでした";
      adj.te = pureStem + "で";
      adj.adverb = pureStem + "に";
    }
  }
}

const newDataStr = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('data.js', newDataStr, 'utf8');
console.log('Successfully cleaned up na adjectives.');
