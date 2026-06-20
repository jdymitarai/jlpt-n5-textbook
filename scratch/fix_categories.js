const fs = require('fs');
const path = require('path');
const vm = require('vm');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const n5File = path.join(srcDir, 'data_n5.js');

const n5Content = fs.readFileSync(n5File, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(n5Content, sandbox);

const db = sandbox.window.JLPT_DATA_CHUNKS["N5"];

// Categorize words appropriately using proper IDs!
const categoryMap = {
  "body_physiology": ["頭", "顔", "目", "耳", "鼻", "口", "歯", "手", "足", "体", "髪", "首", "背中", "お腹", "指", "肩", "胸", "腕", "寝る", "起きる", "歩く", "走る", "座る", "立つ"],
  "health_medical": ["痛い", "疲れる", "風邪", "薬", "病院", "医者", "病気", "怪我", "休む"],
  "psychology_character": ["泣く", "笑う", "怒る", "楽しい", "悲しい", "優しい", "覚える", "忘れる", "思う", "考える"]
};

// Create a reverse map for quick lookup
const wordToCategory = {};
for (const [cat, words] of Object.entries(categoryMap)) {
  for (const word of words) {
    wordToCategory[word] = cat;
  }
}

let modifiedCount = 0;
for (const item of db.vocabulary) {
  if (wordToCategory[item.word]) {
    item.category = wordToCategory[item.word];
    modifiedCount++;
  } else {
    // If somehow a word is missed, keep its category as is, or fix it if it's currently Chinese
    if (item.category === '身體與生理') item.category = 'body_physiology';
    if (item.category === '健康與醫療') item.category = 'health_medical';
    if (item.category === '心理與性格') item.category = 'psychology_character';
    if (item.category === '人類自身') item.category = 'body_physiology'; // fallback
  }
}

// Write back to data_n5.js
const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log(`Successfully mapped to correct English IDs for ${modifiedCount} words in data_n5.js.`);
