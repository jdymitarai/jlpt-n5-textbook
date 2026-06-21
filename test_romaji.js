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
    } else {
      result += romaji[i];
      i += 1;
    }
  }
  return result;
}

const formatRomajiText = (text) => {
  if (!text) return "";
  // 找尋 "漢字 (romaji)" 格式
  const match = text.match(/^([^\(]+)\s*\((.*?)\)$/);
  if (match) {
    const word = match[1].trim();
    const romaji = match[2].trim();
    const hiragana = romajiToHiragana(romaji);
    return \`<ruby>\${word}<rt>\${hiragana}</rt></ruby>\`;
  }
  return text;
};

console.log(formatRomajiText("行く (iku)"));
console.log(formatRomajiText("行きます (ikimasu)"));
console.log(formatRomajiText("行って (itte)"));
console.log(formatRomajiText("行かない (ikanai)"));
console.log(formatRomajiText("可愛い (kawaii)"));
