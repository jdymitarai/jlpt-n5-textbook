const https = require('https');

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: { 'User-Agent': 'Mozilla/5.0 JLPT-Importer/3.0' }
    };
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { resolve(data); }
      });
    }).on('error', reject);
  });
}

async function queryTatoebaV1(word, keywords = null) {
  const url = `https://api.tatoeba.org/v1/sentences?lang=jpn&trans:lang=cmn&q=${encodeURIComponent(word)}&sort=relevance&limit=10`;
  try {
    const res = await httpGet(url);
    if (res && res.data && res.data.length > 0) {
      const candidates = [];
      for (const item of res.data) {
        let cmnText = null;
        if (item.translations && item.translations.length > 0) {
          // Find Chinese translation
          const t = item.translations.find(trans => trans.lang === 'cmn' || trans.lang === 'zho');
          if (t) {
            cmnText = t.text;
          }
        }
        if (cmnText) {
          candidates.push({ ja: item.text, zh: cmnText });
        }
      }

      let selected = null;
      if (keywords && keywords.length > 0) {
        for (const cand of candidates) {
          const hasKeyword = keywords.some(kw => cand.zh.includes(kw) || cand.ja.includes(kw));
          if (hasKeyword) {
            selected = cand;
            break;
          }
        }
      }

      if (!selected && candidates.length > 0) {
        selected = candidates[0];
      }

      return selected;
    }
  } catch (e) {
    console.error(`Error querying: ${e.message}`);
  }
  return null;
}

async function test() {
  const words = ['おはようございます', '学生', '友達'];
  for (const w of words) {
    console.log(`Querying "${w}"...`);
    const res = await queryTatoebaV1(w);
    console.log(`Result:`, res);
  }
}

test();
