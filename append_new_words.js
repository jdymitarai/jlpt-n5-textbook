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
    if (state.currentLevelIndex === 4) {
      // Finished N1 nouns and verbs. Now backfill verbs for N5-N2.
      state.currentLevelIndex = 0; // N5
      state.currentCategoryIndex = 22; // verb_body_movement
    } else if (state.currentLevelIndex >= 0 && state.currentLevelIndex < 3) {
      // Finished verbs for N5, N4, N3. Move to next level verbs.
      state.currentLevelIndex++;
      state.currentCategoryIndex = 22;
    } else if (state.currentLevelIndex === 3) {
      // Finished verbs for N2. We already did N1 verbs, so we are completely DONE!
      state.currentCategoryIndex = 999; // Indicate completion
    }
  }
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  fs.unlinkSync(newWordsPath);
  
  console.log('Successfully added ' + newWords.length + ' words!');
} catch (e) { 
  console.error(e); 
  process.exit(1); 
}
