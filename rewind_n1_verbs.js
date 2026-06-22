const fs = require('fs');
const dataPath = 'c:/ai/jlpt-n5-textbook/jlpt_data.json';
const statePath = 'c:/ai/jlpt-n5-textbook/generation_state.json';

const jlptData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

// Only N1 has verbs so far.
const n1Vocab = jlptData.JLPT_DATA_CHUNKS['N1'].vocabulary;
const initialLength = n1Vocab.length;

// Filter out verbs
jlptData.JLPT_DATA_CHUNKS['N1'].vocabulary = n1Vocab.filter(w => w && w.type !== 'verb');
const finalLength = jlptData.JLPT_DATA_CHUNKS['N1'].vocabulary.length;
const removedCount = initialLength - finalLength;

console.log(`Removed ${removedCount} verbs from N1.`);

state.currentCategoryIndex = 22; // Start of verbs
state.totalGenerated -= removedCount;

fs.writeFileSync(dataPath, JSON.stringify(jlptData, null, 2));
fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

console.log('Successfully rewound state to start of N1 verbs (category index 22).');
