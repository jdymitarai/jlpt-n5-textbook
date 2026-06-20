const fs = require('fs');
const path = require('path');
const vm = require('vm');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const publicDir = path.join(projectDir, 'public');

// 6 missing N5 medical candidates
const newN5Entries = [
  {
    word: "病院",
    furigana: "びょういん",
    romaji: "byouin",
    meaning: "醫院",
    category: "health_medical",
    exampleJa: "風邪をひいたので病院に行きました。",
    exampleFurigana: "かぜをひいたのでびょういんにいきました。",
    exampleEn: "因為感冒了所以去了醫院。",
    level: "N5"
  },
  {
    word: "医者",
    furigana: "いしゃ",
    romaji: "isha",
    meaning: "醫生",
    category: "relations_human",
    exampleJa: "彼女は将来医者になりたいと言っています。",
    exampleFurigana: "かのじょはしょうらいいしゃになりたいといっています。",
    exampleEn: "她說將來想成為醫生。",
    level: "N5"
  },
  {
    word: "薬",
    furigana: "くすり",
    romaji: "kusuri",
    meaning: "藥、藥物",
    category: "health_medical",
    exampleJa: "薬を飲んだら熱が下がりました。",
    exampleFurigana: "くすりをのんだらねつがさがりました。",
    exampleEn: "吃了藥之後退燒了。",
    level: "N5"
  },
  {
    word: "痛い",
    furigana: "いたい",
    romaji: "itai",
    meaning: "疼痛的、痛的",
    category: "properties_relations",
    exampleJa: "転んで膝がとても痛いです。",
    exampleFurigana: "ころんでひざがとてもいたいです。",
    exampleEn: "跌倒了，膝蓋非常痛。",
    level: "N5"
  },
  {
    word: "風邪",
    furigana: "かぜ",
    romaji: "kaze",
    meaning: "感冒",
    category: "health_medical",
    exampleJa: "風邪を引いて学校を休みました。",
    exampleFurigana: "かぜをひいてがっこうをやすみました。",
    exampleEn: "因為感冒，請假沒去學校。",
    level: "N5"
  },
  {
    word: "トースト",
    furigana: "トースト",
    romaji: "toosuto",
    meaning: "吐司、烤麵包",
    category: "food_culture",
    exampleJa: "毎朝トーストにバターを塗って食べます。",
    exampleFurigana: "まいあさとーすとにばたーをぬってたべます。",
    exampleEn: "每天早上在吐司上塗奶油來吃。",
    level: "N5"
  }
];

// --- Verb conjugation helpers (same as import_n5_n4.js) ---
const g1RuExceptions = [
  "帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる", "戻る", "もどる"
];
const iColumn = ["い", "き", "し", "ち", "に", "ひ", "み", "り", "び", "ぎ", "じ", "ぴ"];
const eColumn = ["え", "け", "せ", "て", "ね", "へ", "め", "れ", "べ", "げ", "ぜ", "ぺ"];

function conjugateVerb(word, furigana) {
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
    const isGroup1Ru = g1RuExceptions.includes(word) || 
                       g1RuExceptions.includes(furigana) ||
                       !isIRuOrERu;

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

function isVerb(word, furigana) {
  const verbEndings = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'];
  return verbEndings.includes(word.slice(-1)) || word.endsWith('する');
}

// --- Main ---
function run() {
  const filePath = path.join(projectDir, 'data_n5.js');
  const publicPath = path.join(publicDir, 'data_n5.js');

  console.log("Reading current data_n5.js...");
  const content = fs.readFileSync(filePath, 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(content, ctx);

  const chunk = ctx.window.JLPT_DATA_CHUNKS['N5'];
  if (!chunk || !chunk.vocabulary) {
    console.error("Invalid N5 database structure!");
    process.exit(1);
  }

  console.log(`Current N5 vocabulary count: ${chunk.vocabulary.length}`);

  // Check for duplicates before adding
  const existingWords = new Set(chunk.vocabulary.map(v => v.word + '|' + v.meaning));

  let added = 0;
  newN5Entries.forEach(entry => {
    const key = entry.word + '|' + entry.meaning;
    if (existingWords.has(key)) {
      console.log(`  Skipping duplicate: ${entry.word} - ${entry.meaning}`);
      return;
    }

    // Check if it's a verb and add conjugations
    if (isVerb(entry.word, entry.furigana) && !['病院', '医者', '風邪'].includes(entry.word)) {
      entry.conjugations = conjugateVerb(entry.word, entry.furigana);
      console.log(`  Generated conjugations for verb: ${entry.word}`);
    }

    chunk.vocabulary.push(entry);
    existingWords.add(key);
    added++;
    console.log(`  Added: ${entry.word} (${entry.furigana}) - ${entry.meaning} [${entry.category}]`);
  });

  console.log(`\nAdded ${added} new entries. Total N5 vocabulary: ${chunk.vocabulary.length}`);

  // Rebuild verbConjugations and adjectiveGroups from ALL entries
  const newVerbConjugations = [];
  const newAdjectiveGroups = { iAdjectives: [], naAdjectives: [] };

  chunk.vocabulary.forEach(v => {
    if (v.conjugations) {
      newVerbConjugations.push({
        dictionary: v.conjugations.dictionary,
        masu: v.conjugations.masu,
        te: v.conjugations.te,
        nai: v.conjugations.nai,
        meaning: v.meaning,
        group: v.conjugations.group
      });
    }
    
    // i-adjective detection
    if (v.word.endsWith('い') && v.category === 'properties_relations') {
      const rootK = v.word.slice(0, -1);
      const rootF = v.furigana.slice(0, -1);
      let negative = `${rootK}くない`;
      let past = `${rootK}かった`;
      if (v.word === 'いい' || v.word === '良い') {
        negative = 'よくない';
        past = 'よかった';
      }
      newAdjectiveGroups.iAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: negative,
        past: past
      });
    }
  });

  chunk.verbConjugations = newVerbConjugations;
  chunk.adjectiveGroups = newAdjectiveGroups;

  // Write output
  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
  
  fs.writeFileSync(filePath, outputString, 'utf8');
  fs.writeFileSync(publicPath, outputString, 'utf8');
  console.log("Saved updated N5 database to root & public/ directories.");

  // Print summary
  console.log(`\n=== N5 Summary ===`);
  console.log(`Total vocabulary: ${chunk.vocabulary.length}`);
  console.log(`Verb conjugations: ${chunk.verbConjugations.length}`);
  console.log(`i-Adjectives: ${chunk.adjectiveGroups.iAdjectives.length}`);
  console.log(`na-Adjectives: ${chunk.adjectiveGroups.naAdjectives.length}`);
  
  // Print category breakdown
  const cats = {};
  chunk.vocabulary.forEach(v => {
    cats[v.category] = (cats[v.category] || 0) + 1;
  });
  console.log("\nCategory breakdown:");
  Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([cat, count]) => {
    console.log(`  ${cat}: ${count}`);
  });
}

run();
