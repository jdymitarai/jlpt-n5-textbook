const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const dataFilePath = path.join(projectDir, 'data.js');

console.log("Loading data.js (accumulated helper words)...");
const fileContent = fs.readFileSync(dataFilePath, 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(fileContent, context);
const jlptData = context.window.JLPT_DATA || context.JLPT_DATA;

const helperWords = jlptData.vocabulary;
console.log(`Loaded ${helperWords.length} total helper vocabulary words.`);

const levelsList = ["N5", "N4", "N3", "N2", "N1", "臨床", "母語者"];

// Helper to convert hiragana to romaji
function hiraganaToRomaji(hira) {
  const map = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'て': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    'っ': 't', 'ー': ''
  };
  let res = '';
  let i = 0;
  while (i < hira.length) {
    if (i + 1 < hira.length) {
      const two = hira.substring(i, i + 2);
      if (map[two]) { res += map[two]; i += 2; continue; }
    }
    const one = hira.charAt(i);
    if (one === 'っ' && i + 1 < hira.length) {
      const next = hira.charAt(i + 1);
      const nextRomaji = map[next] || (i + 2 <= hira.length ? map[hira.substring(i+1, i+3)] : null);
      if (nextRomaji) { res += nextRomaji.charAt(0); }
      i++;
    } else if (map[one]) {
      res += map[one];
      i++;
    } else {
      res += one;
      i++;
    }
  }
  return res;
}

const g1RuExceptions = ["帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる"];
const iColumn = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "び", "ぎ", "じ", "ぴ"];
const eColumn = ["え", "け", "せ", "て", "ね", "へ", "め", "れ", "べ", "げ", "ぜ", "ぺ"];

function conjugateVerb(word, furigana, meaning) {
  word = word.trim();
  furigana = furigana.trim();
  if (word.endsWith("する") || furigana.endsWith("する")) {
    const rootK = word.slice(0, -2);
    const rootF = furigana.slice(0, -2);
    return {
      group: "第三類動詞 (不規則)",
      dictionary: `${word} (${furigana})`,
      masu: `${rootK}します (${rootF}します)`,
      te: `${rootK}して (${rootF}して)`,
      nai: `${rootK}しない (${rootF}しない)`,
      ta: `${rootK}した (${rootF}した)`
    };
  }
  if (word.endsWith("る")) {
    const charBeforeRu = furigana.charAt(furigana.length - 2);
    const isIRuOrERu = iColumn.includes(charBeforeRu) || eColumn.includes(charBeforeRu);
    const isGroup1Ru = g1RuExceptions.includes(word) || g1RuExceptions.includes(furigana) || !isIRuOrERu;
    const rootK = word.slice(0, -1);
    const rootF = furigana.slice(0, -1);
    if (isGroup1Ru) {
      return {
        group: "第一類動詞 (五段)",
        dictionary: `${word} (${furigana})`,
        masu: `${rootK}ります (${rootF}ります)`,
        te: `${rootK}って (${rootF}って)`,
        nai: `${rootK}らない (${rootF}らない)`,
        ta: `${rootK}った (${rootF}った)`
      };
    } else {
      return {
        group: "第二類動詞 (上下段)",
        dictionary: `${word} (${furigana})`,
        masu: `${rootK}ます (${rootF}ます)`,
        te: `${rootK}て (${rootF}て)`,
        nai: `${rootK}ない (${rootF}ない)`,
        ta: `${rootK}た (${rootF}た)`
      };
    }
  }
  const lastK = word.slice(-1);
  const lastF = furigana.slice(-1);
  const rootK = word.slice(0, -1);
  const rootF = furigana.slice(0, -1);
  const masuMap = { "う": "います", "つ": "ちます", "ぬ": "にます", "ぶ": "びます", "む": "みます", "く": "きます", "ぐ": "ぎます", "す": "します" };
  const teMap   = { "う": "って", "つ": "って", "ぬ": "んで", "ぶ": "んで", "む": "んで", "く": "いて", "ぐ": "いで", "す": "して" };
  const naiMap  = { "う": "わない", "つ": "たない", "ぬ": "なない", "ぶ": "ばない", "む": "まない", "く": "かない", "ぐ": "がない", "す": "さない" };
  const taMap   = { "う": "った", "つ": "った", "ぬ": "んだ", "ぶ": "んだ", "む": "んだ", "く": "いた", "ぐ": "いだ", "す": "した" };
  return {
    group: "第一類動詞 (五段)",
    dictionary: `${word} (${furigana})`,
    masu: `${rootK}${masuMap[lastK] || 'みます'} (${rootF}${masuMap[lastF] || 'みます'})`,
    te: `${rootK}${teMap[lastK] || 'んで'} (${rootF}${teMap[lastF] || 'んで'})`,
    nai: `${rootK}${naiMap[lastK] || 'まない'} (${rootF}${naiMap[lastF] || 'まない'})`,
    ta: `${rootK}${taMap[lastK] || 'んだ'} (${rootF}${taMap[lastF] || 'んだ'})`
  };
}

levelsList.forEach(lvl => {
  console.log(`Processing level ${lvl}...`);
  const levelHelperWords = helperWords.filter(v => v.level === lvl);
  
  let chunkData = {
    vocabulary: [],
    verbConjugations: [],
    adjectiveGroups: { iAdjectives: [], naAdjectives: [] }
  };
  
  let filename = '';
  if (lvl === 'N5') filename = 'data_n5.js';
  else if (lvl === 'N4') filename = 'data_n4.js';
  else if (lvl === 'N3') filename = 'data_n3.js';
  else if (lvl === 'N2') filename = 'data_n2.js';
  else if (lvl === 'N1') filename = 'data_n1.js';
  else if (lvl === '臨床') filename = 'data_clinical.js';
  else if (lvl === '母語者') filename = 'data_native.js';

  const filepath = path.join(projectDir, filename);

  // If N5-N1, load the existing API-built chunk file first
  if (["N5", "N4", "N3", "N2", "N1"].includes(lvl) && fs.existsSync(filepath)) {
    console.log(`Reading existing API database for ${lvl}...`);
    const existingContent = fs.readFileSync(filepath, 'utf8');
    const existingContext = { window: {} };
    vm.createContext(existingContext);
    vm.runInContext(existingContent, existingContext);
    const existingData = existingContext.window.JLPT_DATA_CHUNKS ? existingContext.window.JLPT_DATA_CHUNKS[lvl] : null;
    if (existingData) {
      chunkData.vocabulary = existingData.vocabulary || [];
      chunkData.verbConjugations = existingData.verbConjugations || [];
      chunkData.adjectiveGroups = existingData.adjectiveGroups || { iAdjectives: [], naAdjectives: [] };
    }
  }

  // Merge helper words
  let addedCount = 0;
  levelHelperWords.forEach(w => {
    // Normalise keys
    if (w.example && typeof w.example === 'object') {
      w.exampleJa = w.example.ja;
      w.exampleEn = w.example.ch || w.example.en;
      w.exampleFurigana = w.example.furi || w.example.ja;
      delete w.example;
    }
    if (!w.exampleFurigana) w.exampleFurigana = w.exampleJa;
    if (!w.romaji) w.romaji = hiraganaToRomaji(w.furigana);
    
    // Check duplicate
    const exists = chunkData.vocabulary.some(v => v.word === w.word);
    if (!exists) {
      chunkData.vocabulary.push(w);
      addedCount++;

      // Handle conjugations
      if (w.category.endsWith('_verbs') || w.category === 'action_verbs') {
        const conj = conjugateVerb(w.word, w.furigana, w.meaning);
        chunkData.verbConjugations.push({
          dictionary: conj.dictionary,
          masu: conj.masu,
          te: conj.te,
          nai: conj.nai,
          meaning: w.meaning,
          group: conj.group
        });
      } else if (w.category === 'i_adjectives') {
        let rootK = w.word.endsWith('い') ? w.word.slice(0, -1) : w.word;
        let negative = `${rootK}くない`;
        let past = `${rootK}かった`;
        if (w.word === 'いい' || w.word === '良い') {
          negative = 'よくない';
          past = 'よかった';
        }
        chunkData.adjectiveGroups.iAdjectives.push({
          word: `${w.word} (${w.furigana})`,
          meaning: w.meaning,
          negative: negative,
          past: past
        });
      } else if (w.category === 'na_adjectives') {
        chunkData.adjectiveGroups.naAdjectives.push({
          word: `${w.word} (${w.furigana})`,
          meaning: w.meaning,
          negative: `${w.word}ではない`,
          past: `${w.word}でした`
        });
      }
    }
  });

  console.log(`Merged ${addedCount} helper words. Total vocabulary: ${chunkData.vocabulary.length}.`);

  const chunkContent = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${lvl}"] = ${JSON.stringify(chunkData, null, 2)};`;
  fs.writeFileSync(filepath, chunkContent, 'utf8');
  console.log(`Successfully wrote ${filename}`);
});

console.log("\nSplit complete!");
