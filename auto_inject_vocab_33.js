const fs = require('fs');

const vocabDataN2 = `
  { word: "条件", furigana: "じょうけん", romaji: "jouken", meaning: "條件", category: "N2_nouns", examples: [
    { ja: "契約の条件を確認する。", furigana: "けいやく の じょうけん を かくにん する。", en: "Confirm the conditions of the contract." }
  ]},
  { word: "状況", furigana: "じょうきょう", romaji: "joukyou", meaning: "狀況", category: "N2_nouns", examples: [
    { ja: "現在の状況を説明してください。", furigana: "げんざい の じょうきょう を せつめい して ください。", en: "Please explain the current situation." }
  ]},
  { word: "資源", furigana: "しげん", romaji: "shigen", meaning: "資源", category: "N2_nouns", examples: [
    { ja: "天然資源を大切にする。", furigana: "てんねんしげん を たいせつ に する。", en: "Take good care of natural resources." }
  ]},
  { word: "自然", furigana: "しぜん", romaji: "shizen", meaning: "自然", category: "N2_nouns", examples: [
    { ja: "自然を守る活動に参加する。", furigana: "しぜん を まもる かつどう に さんか する。", en: "Participate in activities to protect nature." }
  ]},
  { word: "事故", furigana: "じこ", romaji: "jiko", meaning: "事故", category: "N2_nouns", examples: [
    { ja: "交通事故に遭う。", furigana: "こうつうじこ に あう。", en: "Encounter a traffic accident." }
  ]},
  { word: "事情", furigana: "じじょう", romaji: "jijou", meaning: "事情、情況", category: "N2_nouns", examples: [
    { ja: "複雑な事情がある。", furigana: "ふくざつ な じじょう が ある。", en: "There are complicated circumstances." }
  ]},
  { word: "時代", furigana: "じだい", romaji: "jidai", meaning: "時代", category: "N2_nouns", examples: [
    { ja: "新しい時代が始まる。", furigana: "あたらしい じだい が はじまる。", en: "A new era begins." }
  ]},
  { word: "実行", furigana: "じっこう", romaji: "jikkou", meaning: "實行、執行", category: "N2_nouns", examples: [
    { ja: "計画を実行に移す。", furigana: "けいかく を じっこう に うつす。", en: "Put the plan into practice." }
  ]},
  { word: "実験", furigana: "じっけん", romaji: "jikken", meaning: "實驗", category: "N2_nouns", examples: [
    { ja: "科学の実験をする。", furigana: "かがく の じっけん を する。", en: "Conduct a science experiment." }
  ]},
  { word: "失望", furigana: "しつぼう", romaji: "shitsubou", meaning: "失望", category: "N2_nouns", examples: [
    { ja: "結果に失望する。", furigana: "けっか に しつぼう する。", en: "Be disappointed with the results." }
  ]},
  { word: "質問", furigana: "しつもん", romaji: "shitsumon", meaning: "問題、提問", category: "N2_nouns", examples: [
    { ja: "先生に質問をする。", furigana: "せんせい に しつもん を する。", en: "Ask the teacher a question." }
  ]},
  { word: "失敗", furigana: "しっぱい", romaji: "shippai", meaning: "失敗", category: "N2_nouns", examples: [
    { ja: "失敗から学ぶ。", furigana: "しっぱい から まなぶ。", en: "Learn from failure." }
  ]}
`;

// Insert to data_n2.js
let dataN2 = fs.readFileSync('c:/ai/jlpt-n5-textbook/data_n2.js', 'utf8');
const markerN2 = 'window.JLPT_DATA.vocabulary.N2.push(';
dataN2 = dataN2.replace(markerN2, markerN2 + '\n' + vocabDataN2 + ',');
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data_n2.js', dataN2, 'utf8');

console.log("Added 12 new N2 words.");
