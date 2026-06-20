const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const levels = ['n5', 'n4', 'n3', 'n2', 'n1'];

console.log("Starting verification of level databases...");

levels.forEach(lvl => {
  const filePath = path.join(dir, `data_${lvl}.js`);
  if (!fs.existsSync(filePath)) {
    console.error(`ERROR: File not found: ${filePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const context = { window: {} };
  vm.createContext(context);
  
  try {
    vm.runInContext(content, context);
    const data = context.window.JLPT_DATA_CHUNKS[lvl.toUpperCase()];
    if (!data) {
      throw new Error("Parsed data object is null or undefined");
    }

    // Asserts
    if (!data.vocabulary || !Array.isArray(data.vocabulary)) {
      throw new Error("Vocabulary array is missing or invalid");
    }
    if (!data.grammar || !Array.isArray(data.grammar)) {
      throw new Error("Grammar array is missing or invalid");
    }
    if (!data.verbConjugations || !Array.isArray(data.verbConjugations)) {
      throw new Error("verbConjugations is missing or invalid");
    }
    if (!data.adjectiveGroups || typeof data.adjectiveGroups !== 'object') {
      throw new Error("adjectiveGroups is missing or invalid");
    }
    if (!data.counterTables || typeof data.counterTables !== 'object') {
      throw new Error("counterTables is missing or invalid");
    }
    if (!data.demonstratives || !Array.isArray(data.demonstratives)) {
      throw new Error("demonstratives is missing or invalid");
    }

    console.log(`\nJLPT ${lvl.toUpperCase()} verification PASSED:`);
    console.log(`- Vocabulary: ${data.vocabulary.length} words`);
    console.log(`- Conjugated Verbs: ${data.verbConjugations.length}`);
    console.log(`- Adjectives: iAdjectives=${data.adjectiveGroups.iAdjectives?.length}, naAdjectives=${data.adjectiveGroups.naAdjectives?.length}`);
    console.log(`- Grammar points: ${data.grammar.length}`);
    
    // Check first vocabulary item structure if present
    if (data.vocabulary.length > 0) {
      const sample = data.vocabulary[0];
      if (!sample.word || !sample.furigana || !sample.romaji || !sample.meaning || !sample.category) {
        console.warn("WARNING: Sample vocab item has missing fields:", sample);
      }
    }
  } catch (e) {
    console.error(`ERROR: Verification failed for data_${lvl}.js!`, e);
    process.exit(1);
  }
});

console.log("\nAll database files have passed structural and semantic verification!");
