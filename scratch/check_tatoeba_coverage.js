const fs = require('fs');
const path = require('path');
const https = require('https');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const errorsPath = path.join(projectDir, 'scratch', 'database_errors.json');
const allErrors = JSON.parse(fs.readFileSync(errorsPath, 'utf8'));

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkCoverage() {
  const levels = ['n5', 'n3', 'n2', 'n1'];
  const noMatches = [];

  for (const lvl of levels) {
    const errors = allErrors[lvl] || [];
    console.log(`Checking ${lvl} errors (${errors.length} total)...`);
    for (const e of errors) {
      const word = e.word;
      // Check CMN translation first
      const cmnUrl = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=cmn&q=${encodeURIComponent(word)}&sort=relevance&limit=1`;
      try {
        const res = await httpGet(cmnUrl);
        if (res && res.data && res.data.length > 0) {
          // Found CMN
          continue;
        }
      } catch (err) {
        console.warn(`Error checking cmn for ${word}: ${err.message}`);
      }
      await sleep(100);

      // Check ENG translation
      const engUrl = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=eng&q=${encodeURIComponent(word)}&sort=relevance&limit=1`;
      try {
        const res = await httpGet(engUrl);
        if (res && res.data && res.data.length > 0) {
          // Found ENG
          continue;
        }
      } catch (err) {
        console.warn(`Error checking eng for ${word}: ${err.message}`);
      }

      console.log(`❌ No Tatoeba matches for "${word}" (${lvl})`);
      noMatches.push({ word: e.word, furigana: e.furigana, meaning: e.meaning, level: lvl });
      await sleep(100);
    }
  }

  console.log(`\nDone! Total words with NO Tatoeba matches: ${noMatches.length}`);
  fs.writeFileSync(path.join(projectDir, 'scratch', 'no_tatoeba_matches.json'), JSON.stringify(noMatches, null, 2), 'utf8');
}

checkCoverage().catch(console.error);
