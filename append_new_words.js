const fs = require('fs');
const { execSync } = require('child_process');

try {
  const dataPath = 'c:/ai/jlpt-n5-textbook/jlpt_data.json';
  const newWordsPath = 'c:/ai/jlpt-n5-textbook/new_words.json';
  const statePath = 'c:/ai/jlpt-n5-textbook/generation_state.json';
  
  if (!fs.existsSync(newWordsPath)) {
    console.log('No new words to append.');
    process.exit(0);
  }
  
  const newWords = JSON.parse(fs.readFileSync(newWordsPath, 'utf8'));
  const jlptData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));
  
  const level = state.levels[state.currentLevelIndex];
  
  if (!jlptData.JLPT_DATA_CHUNKS) jlptData.JLPT_DATA_CHUNKS = {};
  if (!jlptData.JLPT_DATA_CHUNKS[level]) jlptData.JLPT_DATA_CHUNKS[level] = { vocabulary: [] };
  if (!jlptData.JLPT_DATA_CHUNKS[level].vocabulary) jlptData.JLPT_DATA_CHUNKS[level].vocabulary = [];
  
  jlptData.JLPT_DATA_CHUNKS[level].vocabulary.push(...newWords);
  
  fs.writeFileSync(dataPath, JSON.stringify(jlptData, null, 2));
  
  // Upload to R2
  console.log('Uploading to R2...');
  execSync('npx wrangler r2 object put my-r2-storage/jlpt_data.json --file=c:/ai/jlpt-n5-textbook/jlpt_data.json --remote', { cwd: 'c:/ai/jlpt-app-v2', stdio: 'inherit' });
  
  // Update state
  state.totalGenerated += newWords.length;
  state.currentCategoryIndex++;
  if (state.currentCategoryIndex >= state.categories.length) {
    state.currentCategoryIndex = 0;
    state.currentLevelIndex++;
  }
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  fs.unlinkSync(newWordsPath);
  
  console.log('Successfully added ' + newWords.length + ' words!');
} catch (e) { 
  console.error(e); 
  process.exit(1); 
}
