const fs = require('fs');

const vocabDataN5 = `
  { word: "音楽", furigana: "おんがく", romaji: "ongaku", meaning: "音樂", category: "N5_nouns", examples: [
    { ja: "私は音楽を聞くのが好きです。", furigana: "わたし は おんがく を きく の が すき です。", en: "I like listening to music." }
  ]},
  { word: "雑誌", furigana: "ざっし", romaji: "zasshi", meaning: "雜誌", category: "N5_nouns", examples: [
    { ja: "本屋で雑誌を買いました。", furigana: "ほんや で ざっし を かいました。", en: "I bought a magazine at the bookstore." }
  ]},
  { word: "切手", furigana: "きって", romaji: "kitte", meaning: "郵票", category: "N5_nouns", examples: [
    { ja: "郵便局で切手を買います。", furigana: "ゆうびんきょく で きって を かいます。", en: "I will buy stamps at the post office." }
  ]},
  { word: "封筒", furigana: "ふうとう", romaji: "fuutou", meaning: "信封", category: "N5_nouns", examples: [
    { ja: "手紙を封筒に入れます。", furigana: "てがみ を ふうとう に いれます。", en: "I put the letter in the envelope." }
  ]},
  { word: "財布", furigana: "さいふ", romaji: "saifu", meaning: "錢包", category: "N5_nouns", examples: [
    { ja: "財布を落としました。", furigana: "さいふ を おとしました。", en: "I dropped my wallet." }
  ]},
  { word: "万年筆", furigana: "まんねんひつ", romaji: "mannenhitsu", meaning: "鋼筆", category: "N5_nouns", examples: [
    { ja: "これは父の万年筆です。", furigana: "これ は ちち の まんねんひつ です。", en: "This is my father's fountain pen." }
  ]}
`;

const vocabDataN4 = `
  { word: "輸出", furigana: "ゆしゅつ", romaji: "yushutsu", meaning: "出口", category: "N4_nouns", examples: [
    { ja: "日本の車は世界中に輸出されています。", furigana: "にほん の くるま は せかいじゅう に ゆしゅつ されて います。", en: "Japanese cars are exported all over the world." }
  ]},
  { word: "輸入", furigana: "ゆにゅう", romaji: "yunyuu", meaning: "進口", category: "N4_nouns", examples: [
    { ja: "この国は多くの食料を輸入しています。", furigana: "この くに は おおく の しょくりょう を ゆにゅう しています。", en: "This country imports a lot of food." }
  ]},
  { word: "生産", furigana: "せいさん", romaji: "seisan", meaning: "生產", category: "N4_nouns", examples: [
    { ja: "この工場ではテレビを生産しています。", furigana: "この こうじょう では テレビ を せいさん しています。", en: "This factory produces televisions." }
  ]},
  { word: "消費", furigana: "しょうひ", romaji: "shouhi", meaning: "消費", category: "N4_nouns", examples: [
    { ja: "電気の消費を減らします。", furigana: "でんき の しょうひ を へらします。", en: "I will reduce electricity consumption." }
  ]},
  { word: "貿易", furigana: "ぼうえき", romaji: "boueki", meaning: "貿易", category: "N4_nouns", examples: [
    { ja: "外国と貿易をします。", furigana: "がいこく と ぼうえき を します。", en: "We trade with foreign countries." }
  ]},
  { word: "産業", furigana: "さんぎょう", romaji: "sangyou", meaning: "產業", category: "N4_nouns", examples: [
    { ja: "この地域は自動車産業が盛んです。", furigana: "この ちいき は じどうしゃさんぎょう が さかん です。", en: "The automobile industry is thriving in this region." }
  ]}
`;

// Insert to data_n5.js
let dataN5 = fs.readFileSync('c:/ai/jlpt-n5-textbook/data_n5.js', 'utf8');
const markerN5 = 'window.JLPT_DATA.vocabulary.N5.push(';
dataN5 = dataN5.replace(markerN5, markerN5 + '\n' + vocabDataN5 + ',');
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data_n5.js', dataN5, 'utf8');

// Insert to data_n4.js
let dataN4 = fs.readFileSync('c:/ai/jlpt-n5-textbook/data_n4.js', 'utf8');
const markerN4 = 'window.JLPT_DATA.vocabulary.N4.push(';
dataN4 = dataN4.replace(markerN4, markerN4 + '\n' + vocabDataN4 + ',');
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data_n4.js', dataN4, 'utf8');

console.log("Added 12 new words.");
