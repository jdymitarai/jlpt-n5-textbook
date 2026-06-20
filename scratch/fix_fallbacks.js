const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Kuroshiro = require('kuroshiro').default || require('kuroshiro');
const KuromojiAnalyzer = require('kuroshiro-analyzer-kuromoji');

const projectDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

async function fix() {
  const k = new Kuroshiro();
  await k.init(new KuromojiAnalyzer());

  const content = fs.readFileSync(path.join(projectDir, 'data_n5.js'), 'utf8');
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(content, ctx);
  const chunk = ctx.window.JLPT_DATA_CHUNKS['N5'];
  const v = chunk.vocabulary;

  // Fix 足首
  const i1 = v.findIndex(e => e.word === '足首');
  v[i1].exampleJa = '走っているときに足首をひねってしまった。';
  v[i1].exampleFurigana = await k.convert(v[i1].exampleJa, { to: 'hiragana' });
  v[i1].exampleEn = '跑步時扭傷了腳踝。';
  console.log('Fixed 足首:', v[i1].exampleJa, '->', v[i1].exampleFurigana);

  // Fix 饅頭
  const i2 = v.findIndex(e => e.word === '饅頭');
  v[i2].exampleJa = 'お土産に温泉饅頭をもらいました。';
  v[i2].exampleFurigana = await k.convert(v[i2].exampleJa, { to: 'hiragana' });
  v[i2].exampleEn = '收到了溫泉饅頭作為伴手禮。';
  console.log('Fixed 饅頭:', v[i2].exampleJa, '->', v[i2].exampleFurigana);

  // Save
  const out = `window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\nwindow.JLPT_DATA_CHUNKS["N5"] = ${JSON.stringify(chunk, null, 2)};\nif (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS["N5"]; }`;
  fs.writeFileSync(path.join(projectDir, 'data_n5.js'), out, 'utf8');
  fs.writeFileSync(path.join(projectDir, 'public', 'data_n5.js'), out, 'utf8');
  console.log('Saved data_n5.js (root & public)!');

  // Final verification
  console.log(`\nTotal entries: ${v.length}`);
  const withTatoeba = v.filter(e => !e.exampleJa.includes('大切な言葉'));
  console.log(`With real examples: ${withTatoeba.length}/${v.length}`);
}

fix().catch(console.error);
