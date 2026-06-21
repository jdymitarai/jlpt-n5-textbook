const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');

const helperCode = `
const romajiToHiraganaMap = {
  "a": "あ", "i": "い", "u": "う", "e": "え", "o": "お",
  "ka": "か", "ki": "き", "ku": "く", "ke": "け", "ko": "こ",
  "sa": "さ", "shi": "し", "su": "す", "se": "せ", "so": "そ",
  "ta": "た", "chi": "ち", "tsu": "つ", "te": "て", "to": "と",
  "na": "な", "ni": "に", "nu": "ぬ", "ne": "ね", "no": "の",
  "ha": "は", "hi": "ひ", "fu": "ふ", "he": "へ", "ho": "ほ",
  "ma": "ま", "mi": "み", "mu": "む", "me": "め", "mo": "も",
  "ya": "や", "yu": "ゆ", "yo": "よ",
  "ra": "ら", "ri": "り", "ru": "る", "re": "れ", "ro": "ろ",
  "wa": "わ", "wo": "を", "n": "ん",
  "ga": "が", "gi": "ぎ", "gu": "ぐ", "ge": "げ", "go": "ご",
  "za": "ざ", "ji": "じ", "zu": "ず", "ze": "ぜ", "zo": "ぞ",
  "da": "だ", "ji": "ぢ", "zu": "づ", "de": "で", "do": "ど",
  "ba": "ば", "bi": "び", "bu": "ぶ", "be": "べ", "bo": "ぼ",
  "pa": "ぱ", "pi": "ぴ", "pu": "ぷ", "pe": "ぺ", "po": "ぽ",
  "kya": "きゃ", "kyu": "きゅ", "kyo": "きょ",
  "sha": "しゃ", "shu": "しゅ", "sho": "しょ",
  "cha": "ちゃ", "chu": "ちゅ", "cho": "ちょ",
  "nya": "にゃ", "nyu": "にゅ", "nyo": "にょ",
  "hya": "ひゃ", "hyu": "ひゅ", "hyo": "ひょ",
  "mya": "みゃ", "myu": "みゅ", "myo": "みょ",
  "rya": "りゃ", "ryu": "りゅ", "ryo": "りょ",
  "gya": "ぎゃ", "gyu": "ぎゅ", "gyo": "ぎょ",
  "ja": "じゃ", "ju": "じゅ", "jo": "じょ",
  "bya": "びゃ", "byu": "びゅ", "byo": "びょ",
  "pya": "ぴゃ", "pyu": "ぴゅ", "pyo": "ぴょ"
};

function romajiToHiragana(romaji) {
  let result = "";
  let i = 0;
  while (i < romaji.length) {
    if (i + 2 < romaji.length && romajiToHiraganaMap[romaji.substring(i, i + 3)]) {
      result += romajiToHiraganaMap[romaji.substring(i, i + 3)];
      i += 3;
    } else if (i + 1 < romaji.length && romajiToHiraganaMap[romaji.substring(i, i + 2)]) {
      result += romajiToHiraganaMap[romaji.substring(i, i + 2)];
      i += 2;
    } else if (romajiToHiraganaMap[romaji[i]]) {
      result += romajiToHiraganaMap[romaji[i]];
      i += 1;
    } else if (romaji[i] === romaji[i+1] && romaji[i] !== 'n' && romaji[i].match(/[a-z]/i)) {
      result += "っ";
      i += 1;
    } else if (romaji[i] === "-") {
      result += "ー";
      i += 1;
    } else {
      result += romaji[i];
      i += 1;
    }
  }
  return result;
}

const formatRomajiText = (text) => {
  if (!text) return "";
  const match = text.match(/^([^\\(]+)\\s*\\((.*?)\\)$/);
  if (match) {
    const word = match[1].trim();
    const romaji = match[2].trim();
    const hiragana = romajiToHiragana(romaji);
    // 判斷是否全為平假名或片假名，如果是，就不需要ruby
    const hasKanji = /[\\u4e00-\\u9faf]/.test(word);
    if (hasKanji) {
      return \`<ruby>\${word}<rt>\${hiragana}</rt></ruby>\`;
    }
    return word;
  }
  return text;
};
`;

if (!app.includes('const formatRomajiText')) {
  app = app.replace('const parseFuriganaToRuby = (text) => {', helperCode + '\nconst parseFuriganaToRuby = (text) => {');
}

// 1. Update Verbs
app = app.replace(/\${v.dictionary}/g, "${formatRomajiText(v.dictionary)}");
app = app.replace(/\${v.masu}/g, "${formatRomajiText(v.masu)}");
app = app.replace(/\${teIru}/g, "${formatRomajiText(teIru)}");
app = app.replace(/\${teImasu}/g, "${formatRomajiText(teImasu)}");
app = app.replace(/\${taForm}/g, "${formatRomajiText(taForm)}");
app = app.replace(/\${v.te}/g, "${formatRomajiText(v.te)}");
app = app.replace(/\${v.nai}/g, "${formatRomajiText(v.nai)}");
app = app.replace(/\${nakatta}/g, "${formatRomajiText(nakatta)}");
app = app.replace(/\${masen}/g, "${formatRomajiText(masen)}");
app = app.replace(/\${masendeshita}/g, "${formatRomajiText(masendeshita)}");

// 2. Update Adjectives
app = app.replace(/\${v.word}/g, "${formatRomajiText(v.word)}");
// Wait! `v.word` in Adjectives has `(romaji)`? Let's check `data.js`.
// In Adjectives, does it use `v.word`? Yes, JLPT_DATA.adjectives.forEach(v => ...) 

// 3. Update Adverbs
// JLPT_DATA.adverbs.forEach(v => ...) also uses `v.word`?
// Let's replace the whole `v.word` for adverbs and adjectives.
// But wait! `vocab` also uses `v.word` which is just "頭"! It does NOT have `(romaji)` inside!
// `formatRomajiText("頭")` returns `"頭"`. So it is totally safe!

// 4. Update Pronouns
app = app.replace(/\${w.word}/g, "${formatRomajiText(w.word)}");

fs.writeFileSync('app.js', app, 'utf8');
console.log("Updated app.js with formatRomajiText replacements");
