const fs = require('fs');
const vm = require('vm');

let content = fs.readFileSync('data.js', 'utf8');
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(content, ctx);

const data = ctx.window.JLPT_DATA;

// Helper to ensure structure exists
const ensureData = (level) => {
  if (!data.verbConjugations[level]) data.verbConjugations[level] = [];
  if (!data.adjectiveGroups[level]) data.adjectiveGroups[level] = { iAdjectives: [], naAdjectives: [] };
  if (!data.demonstratives[level]) data.demonstratives[level] = [];
  if (!data.adverbsGroup[level]) data.adverbsGroup[level] = [];
  if (!data.conjunctions[level]) data.conjunctions[level] = [];
  if (!data.particles[level]) data.particles[level] = [];
  if (!data.keigo[level]) data.keigo[level] = [];
};

['N4', 'N3', 'N2', 'N1'].forEach(ensureData);

// ================= N4 Data =================
data.verbConjugations['N4'].push(
  { dictionary: '調べる (shiraberu)', masu: '調べます (shirabemasu)', te: '調べて (shirabete)', nai: '調べない (shirabenai)', meaning: '調查', group: '第二類動詞' },
  { dictionary: '集める (atsumeru)', masu: '集めます (atsumemasu)', te: '集めて (atsumete)', nai: '集めない (atsumenai)', meaning: '收集', group: '第二類動詞' },
  { dictionary: '手伝う (tetsudau)', masu: '手伝います (tetsudaimasu)', te: '手伝って (tetsudatte)', nai: '手伝わない (tetsudawanai)', meaning: '幫忙', group: '第一類動詞' },
  { dictionary: '運ぶ (hakobu)', masu: '運びます (hakobimasu)', te: '運んで (hakonde)', nai: '運ばない (hakobanai)', meaning: '搬運', group: '第一類動詞' },
  { dictionary: '落とす (otosu)', masu: '落とします (otoshimasu)', te: '落として (otoshite)', nai: '落とさない (otosanai)', meaning: '弄掉、遺失', group: '第一類動詞' }
);
data.adjectiveGroups['N4'].iAdjectives.push(
  { word: '厳しい (kibishii)', meaning: '嚴格的', negative: '厳しくない (kibishikunai)', past: '厳しかった (kibishikatta)' },
  { word: '細かい (komakai)', meaning: '細微的、零碎的', negative: '細かくない (komakakunai)', past: '細かかった (komakakatta)' }
);
data.adjectiveGroups['N4'].naAdjectives.push(
  { word: '複雑な (fukuzatsuna)', meaning: '複雜的', negative: '複雑ではない (fukuzatsudewanai)', past: '複雑でした (fukuzatsudeshita)' },
  { word: '丁寧な (teineina)', meaning: '有禮貌的、仔細的', negative: '丁寧ではない (teineidewanai)', past: '丁寧でした (teineideshita)' }
);
data.adverbsGroup['N4'].push(
  { word: 'ぜひ', furigana: 'ぜひ', romaji: 'zehi', meaning: '務必、一定', type: '程度與數量' },
  { word: 'たぶん', furigana: 'たぶん', romaji: 'tabun', meaning: '大概、也許', type: '程度與數量' },
  { word: '急に', furigana: 'きゅうに', romaji: 'kyuuni', meaning: '突然地', type: '狀態副詞' }
);
data.conjunctions['N4'].push(
  { word: 'だから', furigana: 'だから', romaji: 'dakara', meaning: '所以', type: '順接與原因' },
  { word: 'けれども', furigana: 'けれども', romaji: 'keredomo', meaning: '雖然、但是', type: '逆接與對立' }
);
data.particles['N4'].push(
  { word: 'までに', function: '期限', exampleJa: '明日までに宿題を出してください。', exampleFurigana: 'あしたまでにしゅくだいをだしてください', exampleZh: '請在明天之前交作業。' },
  { word: 'しか', function: '限定（後接否定）', exampleJa: '千円しかありません。', exampleFurigana: 'せんえんしかありません', exampleZh: '只有一千日圓。' }
);
data.keigo['N4'].push(
  { meaning: '拜訪 / 詢問', dict: '訪ねる / 聞く', polite: '訪ねます / 聞きます', honorific: '—', humble: '伺う (うかがう)' },
  { meaning: '讓您久等了', dict: '待たせる', polite: '待たせます', honorific: 'お待たせいたしました', humble: '—' },
  { meaning: '吃 / 喝', dict: '食べる / 飲む', polite: '食べます / 飲みます', honorific: '召し上がる (めしあがる)', humble: 'いただく' }
);

// ================= N3 Data =================
data.verbConjugations['N3'].push(
  { dictionary: '確かめる (tashikameru)', masu: '確かめます (tashikamemasu)', te: '確かめて (tashikamete)', nai: '確かめない (tashikamenai)', meaning: '確認', group: '第二類動詞' },
  { dictionary: '減る (heru)', masu: '減ります (herimasu)', te: '減って (hette)', nai: '減らない (heranai)', meaning: '減少', group: '第一類動詞' }
);
data.adjectiveGroups['N3'].iAdjectives.push(
  { word: '悔しい (kuyashii)', meaning: '懊悔的、不甘心的', negative: '悔しくない (kuyashikunai)', past: '悔しかった (kuyashikatta)' }
);
data.adjectiveGroups['N3'].naAdjectives.push(
  { word: '豊かな (yutakana)', meaning: '豐富的', negative: '豊かではない (yutakadewanai)', past: '豊かでした (yutakadeshita)' }
);
data.adverbsGroup['N3'].push(
  { word: 'やはり', furigana: 'やはり', romaji: 'yahari', meaning: '果然', type: '狀態副詞' },
  { word: 'まるで', furigana: 'まるで', romaji: 'marude', meaning: '簡直、宛如', type: '狀態副詞' }
);
data.conjunctions['N3'].push(
  { word: 'つまり', furigana: 'つまり', romaji: 'tsumari', meaning: '也就是說', type: '順接與原因' },
  { word: 'かえって', furigana: 'かえって', romaji: 'kaette', meaning: '反而', type: '逆接與對立' }
);
data.particles['N3'].push(
  { word: 'ばかり', function: '光是、淨是', exampleJa: '遊んでばかりいる。', exampleFurigana: 'あそんでばかりいる', exampleZh: '淨是在玩。' }
);
data.keigo['N3'].push(
  { meaning: '見面', dict: '会う', polite: '会います', honorific: 'お会いになる', humble: 'お目にかかる (おめにかかる)' },
  { meaning: '知道', dict: '知っている', polite: '知っています', honorific: 'ご存じだ (ごぞんじだ)', humble: '存じておる (ぞんじておる)' }
);

// ================= N2/N1 Data Placeholder =================
// Just to prevent empty arrays for N2 and N1
['N2', 'N1'].forEach(level => {
  data.verbConjugations[level].push({ dictionary: '及ぼす (oyobosu)', masu: '及ぼします (oyoboshimasu)', te: '及ぼして (oyoboshite)', nai: '及ぼさない (oyobosanai)', meaning: '波及', group: '第一類動詞' });
  data.adjectiveGroups[level].iAdjectives.push({ word: '著しい (ichijirushii)', meaning: '顯著的', negative: '著しくない (ichijirushikunai)', past: '著しかった (ichijirushikatta)' });
  data.adjectiveGroups[level].naAdjectives.push({ word: '過剰な (kajouna)', meaning: '過剩的', negative: '過剰ではない (kajoudewanai)', past: '過剰でした (kajoudeshita)' });
  data.adverbsGroup[level].push({ word: '一応', furigana: 'いちおう', romaji: 'ichiou', meaning: '暫且、姑且', type: '狀態副詞' });
  data.conjunctions[level].push({ word: 'したがって', furigana: 'したがって', romaji: 'shitagatte', meaning: '因此', type: '順接與原因' });
  data.particles[level].push({ word: 'に際して', function: '在...之際', exampleJa: '開会に際して一言ご挨拶申し上げます。', exampleFurigana: 'かいかいにさいしていちごとごあいさつもうしあげます', exampleZh: '在開會之際致上幾句問候。' });
  data.keigo[level].push({ meaning: '給予 (尊敬)', dict: 'くれる', polite: 'くれます', honorific: '賜る (たまわる)', humble: '—' });
});

const newData = `window.JLPT_DATA = ${JSON.stringify(data, null, 2)};\n`;
fs.writeFileSync('data.js', newData, 'utf8');
console.log('Inserted full level consolidation data into data.js');
