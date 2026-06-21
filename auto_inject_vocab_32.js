const fs = require('fs');

const vocabDataN3 = `
  { word: "栄養", furigana: "えいよう", romaji: "eiyou", meaning: "營養", category: "N3_nouns", examples: [
    { ja: "栄養のバランスが大切です。", furigana: "えいよう の バランス が たいせつ です。", en: "Nutritional balance is important." }
  ]},
  { word: "影響", furigana: "えいきょう", romaji: "eikyou", meaning: "影響", category: "N3_nouns", examples: [
    { ja: "環境に良い影響を与えます。", furigana: "かんきょう に よい えいきょう を あたえます。", en: "It has a positive influence on the environment." }
  ]},
  { word: "確認", furigana: "かくにん", romaji: "kakunin", meaning: "確認", category: "N3_nouns", examples: [
    { ja: "スケジュールを確認してください。", furigana: "スケジュール を かくにん して ください。", en: "Please confirm the schedule." }
  ]},
  { word: "感謝", furigana: "かんしゃ", romaji: "kansha", meaning: "感謝", category: "N3_nouns", examples: [
    { ja: "心から感謝します。", furigana: "こころ から かんしゃ します。", en: "I sincerely appreciate it." }
  ]},
  { word: "感情", furigana: "かんじょう", romaji: "kanjou", meaning: "感情、情緒", category: "N3_nouns", examples: [
    { ja: "感情を表に出さない。", furigana: "かんじょう を おもて に ださない。", en: "Not showing one's emotions." }
  ]},
  { word: "記憶", furigana: "きおく", romaji: "kioku", meaning: "記憶", category: "N3_nouns", examples: [
    { ja: "子供の頃の記憶がない。", furigana: "こども の ころ の きおく が ない。", en: "I have no memories of my childhood." }
  ]},
  { word: "記事", furigana: "きじ", romaji: "kiji", meaning: "報導、文章", category: "N3_nouns", examples: [
    { ja: "新聞の記事を読みました。", furigana: "しんぶん の きじ を よみました。", en: "I read a newspaper article." }
  ]},
  { word: "期待", furigana: "きたい", romaji: "kitai", meaning: "期待", category: "N3_nouns", examples: [
    { ja: "親の期待に応える。", furigana: "おや の きたい に こたえる。", en: "To meet parents' expectations." }
  ]},
  { word: "規則", furigana: "きそく", romaji: "kisoku", meaning: "規則", category: "N3_nouns", examples: [
    { ja: "学校の規則を守る。", furigana: "がっこう の きそく を まもる。", en: "To obey school rules." }
  ]},
  { word: "偶然", furigana: "ぐうぜん", romaji: "guuzen", meaning: "偶然、巧合", category: "N3_nouns", examples: [
    { ja: "街で偶然友達に会った。", furigana: "まち で ぐうぜん ともだち に あった。", en: "I accidentally bumped into a friend in the city." }
  ]},
  { word: "経営", furigana: "けいえい", romaji: "keiei", meaning: "經營", category: "N3_nouns", examples: [
    { ja: "父は会社を経営しています。", furigana: "ちち は かいしゃ を けいえい しています。", en: "My father manages a company." }
  ]},
  { word: "結果", furigana: "けっか", romaji: "kekka", meaning: "結果", category: "N3_nouns", examples: [
    { ja: "テストの結果が悪かった。", furigana: "テスト の けっか が わるかった。", en: "The test results were bad." }
  ]}
`;

// Insert to data_n3.js
let dataN3 = fs.readFileSync('c:/ai/jlpt-n5-textbook/data_n3.js', 'utf8');
const markerN3 = 'window.JLPT_DATA.vocabulary.N3.push(';
dataN3 = dataN3.replace(markerN3, markerN3 + '\n' + vocabDataN3 + ',');
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data_n3.js', dataN3, 'utf8');

console.log("Added 12 new N3 words.");
