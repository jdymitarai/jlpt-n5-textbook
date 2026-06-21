const fs = require('fs');

let fileData = fs.readFileSync('data.js', 'utf8');

const pronounsData = `
  "pronouns": [
    {
      "category": "第一人稱 (自稱)",
      "description": "表示說話者自己，依據性別與禮貌程度區分。",
      "words": [
        { "word": "私", "furigana": "わたし / わたくし", "meaning": "我 (男女通用)" },
        { "word": "僕", "furigana": "ぼく", "meaning": "我 (男性專用)" },
        { "word": "俺", "furigana": "おれ", "meaning": "我 (男性專用)" },
        { "word": "あたし", "furigana": "", "meaning": "我 (女性專用)" }
      ]
    },
    {
      "category": "第二人稱 (對稱)",
      "description": "表示對話的對象。",
      "words": [
        { "word": "あなた", "furigana": "", "meaning": "你 (一般稱呼)" },
        { "word": "君", "furigana": "きみ", "meaning": "你 (對平輩或晚輩)" },
        { "word": "お前", "furigana": "おまえ", "meaning": "你 (對平輩或晚輩)" },
        { "word": "あんた", "furigana": "", "meaning": "你 (極熟絡或帶有情緒)" }
      ]
    },
    {
      "category": "第三人稱 (他稱)",
      "description": "表示不在場的第三方。",
      "words": [
        { "word": "彼", "furigana": "かれ", "meaning": "他 (指代男性)" },
        { "word": "彼女", "furigana": "かのじょ", "meaning": "她 (指代女性)" },
        { "word": "あいつ", "furigana": "", "meaning": "那傢伙 (帶有強烈情緒)" },
        { "word": "こいつ", "furigana": "", "meaning": "這傢伙 (帶有強烈情緒)" },
        { "word": "そいつ", "furigana": "", "meaning": "那傢伙 (帶有強烈情緒)" }
      ]
    },
    {
      "category": "反身代名詞",
      "description": "表示動作的對象就是自己本身。",
      "words": [
        { "word": "自分", "furigana": "じぶん", "meaning": "自己 (一般常用)" },
        { "word": "自身", "furigana": "じしん", "meaning": "自己本身 (一般常用)" },
        { "word": "自ら", "furigana": "みずから", "meaning": "親自 (書面或強調)" },
        { "word": "己", "furigana": "おのれ", "meaning": "自己 (書面或強調)" }
      ]
    },
    {
      "category": "人稱複數後綴",
      "description": "加在代名詞後方，用來表示群體的必備字尾。",
      "words": [
        { "word": "～たち", "furigana": "", "meaning": "中立與鄭重 (如：私たち)" },
        { "word": "～がた", "furigana": "", "meaning": "中立與鄭重 (如：あなたがた)" },
        { "word": "～ら", "furigana": "", "meaning": "隨性與口語 (如：僕ら、彼ら)" }
      ]
    }
  ],
`;

const insertAfter = '"independentInterrogatives": [';
let searchIndex = fileData.indexOf(insertAfter);

if (searchIndex !== -1) {
  let endIndex = fileData.indexOf('  ],', searchIndex) + 4;
  let newFileData = fileData.substring(0, endIndex) + pronounsData + fileData.substring(endIndex);
  
  fs.writeFileSync('data.js', newFileData, 'utf8');
  console.log("Successfully updated data.js with pronouns");
} else {
  console.log("Failed to find independentInterrogatives in data.js");
}
