const fs = require('fs');
const path = require('path');
const https = require('https');
const vm = require('vm');
const readline = require('readline');
const { execSync } = require('child_process');

const projectDir = __dirname;
const publicDir = path.join(projectDir, 'public');

// 1. Ensure morphological parser dependencies are installed
let Kuroshiro, KuromojiAnalyzer;
try {
  Kuroshiro = require('kuroshiro').default || require('kuroshiro');
  KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
} catch (e) {
  console.log("Installing required morphological analyzer (kuroshiro & kuromoji) locally...");
  try {
    execSync('npm install kuroshiro kuroshiro-analyzer-kuromoji', { stdio: 'inherit', cwd: projectDir });
    Kuroshiro = require('kuroshiro').default || require('kuroshiro');
    KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');
    console.log("Morphological analyzer installed successfully!");
  } catch (err) {
    console.error("Failed to install kuroshiro. Furigana auto-generation will fall back to manual input.");
  }
}

// 17 Categories list
const categories = [
  { id: "body_physiology", label: "人類自身 - 身體與生理 (body_physiology)" },
  { id: "health_medical", label: "人類自身 - 健康與醫療 (health_medical)" },
  { id: "psychology_character", label: "人類自身 - 心理與性格 (psychology_character)" },
  { id: "food_culture", label: "物質生活 - 飲食文化 (food_culture)" },
  { id: "fashion_beauty", label: "物質生活 - 服飾與美容 (fashion_beauty)" },
  { id: "housing_space", label: "物質生活 - 居住與空間 (housing_space)" },
  { id: "transport_mobility", label: "物質生活 - 交通與移動 (transport_mobility)" },
  { id: "leisure_sports", label: "物質生活 - 休閒與運動 (leisure_sports)" },
  { id: "astronomy_meteorology", label: "自然與宇宙 - 天文與氣象 (astronomy_meteorology)" },
  { id: "geography_ecology", label: "自然與宇宙 - 地理與生態 (geography_ecology)" },
  { id: "biological_world", label: "自然與宇宙 - 生物世界 (biological_world)" },
  { id: "relations_human", label: "社會與文明 - 人際與關係 (relations_human)" },
  { id: "society_politics_law", label: "社會與文明 - 社會政治法律 (society_politics_law)" },
  { id: "economy_business", label: "社會與文明 - 經濟商業金融 (economy_business)" },
  { id: "culture_thought", label: "社會與文明 - 文明與傳承 (culture_thought)" },
  { id: "math_quantity", label: "抽象概念 - 數量與數理 (math_quantity)" },
  { id: "properties_relations", label: "抽象概念 - 性質狀態關係 (properties_relations)" }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Helper: HTTP GET request returning parsed JSON or raw string
function httpGet(url, json = true) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Request failed with status code ${res.statusCode}`));
        return;
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(json ? JSON.parse(data) : data);
        } catch (e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

// Romaji & Katakana conversion helpers
const romajiMap = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'o', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'っ': 't'
};
const comboMap = {
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
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo'
};

function katakanaToHiragana(src) {
  return src.replace(/[\u30a1-\u30f6]/g, (match) => {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
}

function kanaToRomaji(str) {
  str = katakanaToHiragana(str);
  let result = '';
  let i = 0;
  while (i < str.length) {
    const char = str[i];
    const nextChar = str[i + 1];
    if (nextChar && comboMap[char + nextChar]) {
      result += comboMap[char + nextChar];
      i += 2;
    } else if (char === 'っ') {
      if (nextChar) {
        const nextRomaji = romajiMap[nextChar] || comboMap[nextChar + str[i+2]];
        if (nextRomaji) result += nextRomaji[0];
      }
      i++;
    } else {
      result += romajiMap[char] || char;
      i++;
    }
  }
  return result;
}

// Verb conjugation helper
const g1RuExceptions = [
  "帰る", "かえる", "走る", "はしる", "入る", "はいる", "知る", "しる", "切る", "きる", "要る", "いる"
];
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

  if (word === "来る" || word === "くる") {
    return {
      group: "第三類動詞 (不規則)",
      dictionary: "来る (くる)",
      masu: "來ます (きます)",
      te: "來て (きて)",
      nai: "來ない (こない)",
      ta: "來ta (きた)"
    };
  }

  if (word.endsWith("る")) {
    const charBeforeRu = furigana.charAt(furigana.length - 2);
    const isIRuOrERu = iColumn.includes(charBeforeRu) || eColumn.includes(charBeforeRu);
    const isGroup1Ru = g1RuExceptions.includes(word) || 
                       g1RuExceptions.includes(furigana) ||
                       meaning.includes("回家") || 
                       meaning.includes("跑步") || 
                       meaning.includes("進入") || 
                       meaning.includes(" know") || 
                       meaning.includes("知道") || 
                       meaning.includes("切") || 
                       meaning.includes("需要") ||
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

  if (word === "行く" || word === "いく") {
    return {
      group: "第一類動詞 (五段)",
      dictionary: "行く (いく)",
      masu: "行きます (いきます)",
      te: "行って (いって)",
      nai: "行かない (いかない)",
      ta: "行った (いった)"
    };
  }

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

async function run() {
  console.log("=== 歡迎使用 JMdict & Tatoeba 單字錄入工具 ===\n");

  // 1. Select level
  let level = "";
  while (true) {
    const lvlInput = (await question("請選擇日檢等級 (5, 4, 3, 2, 1): ")).trim();
    if (['5','4','3','2','1'].includes(lvlInput)) {
      level = `N${lvlInput}`;
      break;
    }
    console.log("輸入錯誤！請輸入 5, 4, 3, 2, 1 之一。");
  }

  // 2. Select category
  console.log("\n請選擇分類：");
  categories.forEach((cat, index) => {
    console.log(`${String(index + 1).padStart(2)}: ${cat.label}`);
  });
  let category = "";
  while (true) {
    const catIdxInput = (await question(`請輸入分類編號 (1-${categories.length}): `)).trim();
    const idx = parseInt(catIdxInput, 10) - 1;
    if (idx >= 0 && idx < categories.length) {
      category = categories[idx].id;
      break;
    }
    console.log("編號錯誤！");
  }

  // 3. Prompt Japanese word
  const inputWord = (await question("\n請輸入欲錄入的日文單字: ")).trim();
  if (!inputWord) {
    console.log("單字不能為空！結束。");
    rl.close();
    return;
  }

  // 4. Query Jisho API (JMdict source)
  console.log(`\n正在 JMdict (Jisho API) 中搜尋「${inputWord}」...`);
  const jishoUrl = `https://jisho.org/api/v1/search/words?keyword=${encodeURIComponent(inputWord)}`;
  let jishoData;
  try {
    jishoData = await httpGet(jishoUrl);
  } catch (e) {
    console.error("無法連線至 Jisho API:", e.message);
  }

  let word = inputWord;
  let furigana = inputWord;
  let englishDefinition = "";

  if (jishoData && jishoData.data && jishoData.data.length > 0) {
    console.log(`搜尋到 ${jishoData.data.length} 個符合的項目：`);
    const limit = Math.min(jishoData.data.length, 5);
    for (let i = 0; i < limit; i++) {
      const entry = jishoData.data[i];
      const jp = entry.japanese[0] || {};
      const kanji = jp.word || jp.reading || "";
      const reading = jp.reading || "";
      const senses = entry.senses.slice(0, 3).map(s => s.english_definitions.join(', ')).join('; ');
      console.log(`  [${i + 1}] 漢字/寫法: ${kanji} | 假名: ${reading}`);
      console.log(`      英文釋義: ${senses}`);
    }

    const selIndexInput = (await question(`\n請選擇錄入項目編號 [1-${limit}] (或直接按 Enter 選擇第一個): `)).trim();
    let selIdx = 0;
    if (selIndexInput) {
      const p = parseInt(selIndexInput, 10) - 1;
      if (p >= 0 && p < limit) selIdx = p;
    }

    const selectedEntry = jishoData.data[selIdx];
    const jp = selectedEntry.japanese[0] || {};
    word = jp.word || jp.reading || inputWord;
    furigana = jp.reading || word;
    englishDefinition = selectedEntry.senses.map(s => s.english_definitions.join(', ')).join('; ');
  } else {
    console.log("未在 JMdict 中搜尋到相關項目，轉為手動輸入讀音：");
    const manualFuri = (await question(`請輸入「${inputWord}」的假名讀音 (例如: としょかん): `)).trim();
    if (manualFuri) furigana = manualFuri;
  }

  const romaji = kanaToRomaji(furigana);
  console.log(`\n拼音 (Romaji): ${romaji}`);

  // 5. Auto-translate English glosses to Chinese
  let chineseMeaning = "";
  if (englishDefinition) {
    console.log(`英文釋義為: ${englishDefinition}`);
    console.log("正在使用 Google Translate 將英文翻譯為繁體中文...");
    try {
      const translateUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-TW&dt=t&q=${encodeURIComponent(englishDefinition)}`;
      const transRes = await httpGet(translateUrl);
      if (transRes && transRes[0]) {
        chineseMeaning = transRes[0].map(x => x[0]).join('').trim();
      }
    } catch (e) {
      console.warn("自動翻譯失敗:", e.message);
    }
  }

  const userMeaning = (await question(`請確認中文釋義 (直接按 Enter 接受「${chineseMeaning}」，或自行輸入): `)).trim();
  if (userMeaning) chineseMeaning = userMeaning;
  if (!chineseMeaning) {
    chineseMeaning = (await question("中文釋義不能為空，請手動輸入: ")).trim();
  }

  // 6. Query Tatoeba API for example sentences
  console.log(`\n正在 Tatoeba 搜尋「${word}」的日中例句...`);
  const tatoebaUrl = `https://api.tatoeba.org/v1/sentences?q=${encodeURIComponent(word)}&lang=jpn&sort=relevance&trans:lang=cmn`;
  let tatoebaData;
  try {
    tatoebaData = await httpGet(tatoebaUrl);
  } catch (e) {
    console.warn("無法連線至 Tatoeba API:", e.message);
  }

  let selectedJa = "";
  let selectedZh = "";

  if (tatoebaData && tatoebaData.data && tatoebaData.data.length > 0) {
    console.log(`在 Tatoeba 中搜尋到 ${tatoebaData.data.length} 句例句：`);
    const limit = Math.min(tatoebaData.data.length, 5);
    for (let i = 0; i < limit; i++) {
      const item = tatoebaData.data[i];
      const transText = item.translations.map(t => t.text).join(' / ');
      console.log(`  [${i + 1}] 日文: ${item.text}`);
      console.log(`      中文: ${transText}`);
    }

    const selSentenceInput = (await question(`\n請選擇例句編號 [1-${limit}] (或直接按 Enter 跳過例句錄入): `)).trim();
    if (selSentenceInput) {
      const p = parseInt(selSentenceInput, 10) - 1;
      if (p >= 0 && p < limit) {
        selectedJa = tatoebaData.data[p].text;
        selectedZh = tatoebaData.data[p].translations[0].text;
      }
    }
  } else {
    console.log("未在 Tatoeba 搜尋到相關日中例句。");
    const manualJa = (await question("請手動輸入日文例句 (可留空跳過): ")).trim();
    if (manualJa) {
      selectedJa = manualJa;
      selectedZh = (await question("請手動輸入該例句的中文翻譯: ")).trim();
    }
  }

  // 7. Generate example sentence furigana using kuroshiro
  let selectedFurigana = "";
  if (selectedJa) {
    if (Kuroshiro && KuromojiAnalyzer) {
      console.log("正在分析例句讀音 (Furigana)...");
      try {
        const kuro = new Kuroshiro();
        await kuro.init(new KuromojiAnalyzer());
        const rawFuri = await kuro.convert(selectedJa, { to: "hiragana" });
        selectedFurigana = rawFuri.replace(/[\u3040-\u309f]+(?=[^\u3040-\u309f]*)/g, (match) => match).trim();
      } catch (e) {
        console.warn("Morphological analysis failed. Romaji fallback will be used.");
      }
    }

    if (!selectedFurigana) {
      console.log(`日文例句: ${selectedJa}`);
      const manualFuri = (await question("請確認或輸入此例句的完整假名讀音 (可直接 Enter 跳過): ")).trim();
      selectedFurigana = manualFuri || selectedJa;
    }
  }

  // 8. Construct word object
  const wordEntry = {
    word: word,
    furigana: furigana,
    romaji: romaji,
    meaning: chineseMeaning,
    category: category,
    exampleJa: selectedJa || `日常会話で「${word}」という表現はよく使われます。`,
    exampleFurigana: selectedFurigana || `にちじょうかいわで「${furigana}」というひょうげんはよくつかわれます。`,
    exampleEn: selectedZh || `在日常對話中常用「${chineseMeaning}」這個表達。`,
    level: level
  };

  // Check if it conjugates (if verb)
  const isVerb = ['う', 'く', 'ぐ', 'す', 'つ', 'ぬ', 'ぶ', 'む', 'る'].includes(word.slice(-1)) || word.endsWith('する');
  if (isVerb && (category.endsWith('_verbs') || category === 'properties_relations')) {
    wordEntry.conjugations = conjugateVerb(word, furigana, chineseMeaning);
    console.log("\n自動生成動詞變化：", wordEntry.conjugations);
  }

  console.log("\n即將寫入的單字項目資訊：");
  console.log(JSON.stringify(wordEntry, null, 2));

  const confirmWrite = (await question("\n確認要寫入資料庫嗎？(y/n): ")).trim().toLowerCase();
  if (confirmWrite !== 'y') {
    console.log("已取消寫入。");
    rl.close();
    return;
  }

  // 9. Load level database and append word
  const lvlFile = `data_${level.toLowerCase()}.js`;
  const filePath = path.join(projectDir, lvlFile);
  const publicPath = path.join(publicDir, lvlFile);

  if (!fs.existsSync(filePath)) {
    console.error(`找不到等級檔案: ${filePath}`);
    rl.close();
    return;
  }

  console.log(`\n讀取 ${lvlFile}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  const fileContext = { window: {} };
  vm.createContext(fileContext);
  vm.runInContext(content, fileContext);

  const chunk = fileContext.window.JLPT_DATA_CHUNKS[level];
  if (!chunk || !chunk.vocabulary) {
    console.error(`檔案格式不正確，無法找到 ${level} 單字庫數組`);
    rl.close();
    return;
  }

  // Check duplicate
  const duplicate = chunk.vocabulary.find(v => v.word === wordEntry.word);
  if (duplicate) {
    console.log(`警告：單字「${word}」已存在於資料庫中。`);
    const overwrite = (await question("是否要覆蓋該單字？(y/n): ")).trim().toLowerCase();
    if (overwrite === 'y') {
      const idx = chunk.vocabulary.indexOf(duplicate);
      chunk.vocabulary[idx] = wordEntry;
      console.log("已覆蓋原單字。");
    } else {
      console.log("已取消寫入。");
      rl.close();
      return;
    }
  } else {
    chunk.vocabulary.push(wordEntry);
    console.log("單字已成功加入陣列！");
  }

  // 10. Rebuild verbConjugations and adjectiveGroups for this level
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
    } else if (v.category === 'properties_relations' && v.word.endsWith('い') && !['世界', '社會', '機械', '愛', '違い', '水泳', '丁寧', '生涯', '正解', '失敗', '經濟', '介紹', '大會', '都會', '例外', '被害', '災害'].includes(v.word)) {
      let rootK = v.word.slice(0, -1);
      let rootF = v.furigana.slice(0, -1);
      let negative = `${rootK}くない`;
      let past = `${rootK}かった`;
      if (v.word === 'いい' || v.word === '良い' || v.furigana === 'いい' || v.furigana === 'よい') {
        negative = 'よくない';
        past = 'よかった';
      }
      newAdjectiveGroups.iAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: negative,
        past: past
      });
    } else if (v.category === 'properties_relations' && v.meaning.includes('的')) {
      newAdjectiveGroups.naAdjectives.push({
        word: `${v.word} (${v.furigana})`,
        meaning: v.meaning,
        negative: `${v.word}ではない`,
        past: `${v.word}でした`
      });
    }
  });

  chunk.verbConjugations = newVerbConjugations;
  chunk.adjectiveGroups = newAdjectiveGroups;

  // Save changes
  const outputString = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["${level}"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["${level}"]; }`;
  
  fs.writeFileSync(filePath, outputString, 'utf8');
  fs.writeFileSync(publicPath, outputString, 'utf8');
  console.log(`\n已成功將更新後的單字庫寫入 ${lvlFile} (根目錄與 public/ 目錄)！`);

  // 11. Offer to sync to KV
  const confirmSync = (await question("\n是否要立即執行 KV 上傳腳本同步更新到 Cloudflare？(y/n): ")).trim().toLowerCase();
  if (confirmSync === 'y') {
    try {
      console.log("正在執行 upload_text_to_kv.js...");
      execSync('node C:\\Users\\O1004\\.gemini\\antigravity\\brain\\461414d4-4d3d-4ce2-92e2-f2d0a23768ee\\scratch\\upload_text_to_kv.js', { stdio: 'inherit' });
      console.log("\nKV 同步完成！請通知 AI 助理執行 R2 拷貝同步以將單字正式上線。");
    } catch (err) {
      console.error("同步到 KV 失敗:", err.message);
    }
  }

  rl.close();
}

run().catch(err => {
  console.error(err);
  rl.close();
});
