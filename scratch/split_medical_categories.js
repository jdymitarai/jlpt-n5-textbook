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

// The first 72 words in the human_existence categories are basic N5/N4 words.
const basicWords = new Set([
  "頭", "顔", "目", "耳", "鼻", "口", "歯", "手", "足", "体", "髪", "首", "背中", "お腹", "指", "肩", "胸", "腕",
  "痛い", "疲れる", "風邪", "薬", "病院", "医者", "病気", "怪我", "休む",
  "泣く", "笑う", "怒る", "楽しい", "悲しい", "優しい", "覚える", "忘れる", "思う", "考える",
  "寝る", "起きる", "歩く", "走る", "座る", "立つ",
  "爪", "骨", "血", "喉", "息", "汗", "涙", "声", "夢",
  "アレルギー", "咳", "熱", "治る", "注射", "入院", "退院", "具合", "気分",
  "嬉しい", "寂しい", "怖い", "恥ずかしい", "驚く", "困る", "安心", "心配", "厳しい", "大人しい", "真面目"
]);

// Helper mapping to reclassify
function getNewMedCategory(oldCat) {
  if (oldCat === 'body_physiology') return 'med_anatomy';
  if (oldCat === 'health_medical') return 'med_clinical';
  if (oldCat === 'psychology_character') return 'med_psych';
  return oldCat;
}

let reclassifiedCount = 0;

db.vocabulary.forEach(v => {
  if (v.category === 'body_physiology' || v.category === 'health_medical' || v.category === 'psychology_character') {
    if (!basicWords.has(v.word)) {
      v.category = getNewMedCategory(v.category);
      reclassifiedCount++;
    }
  }
});

const outputCode = "window.JLPT_DATA_CHUNKS = window.JLPT_DATA_CHUNKS || {};\n" +
"window.JLPT_DATA_CHUNKS[\"N5\"] = " + JSON.stringify(db, null, 2) + ";\n" +
"if (typeof module !== 'undefined') { module.exports = window.JLPT_DATA_CHUNKS[\"N5\"]; }\n";

fs.writeFileSync(n5File, outputCode, 'utf8');
console.log(`Reclassified ${reclassifiedCount} advanced medical words.`);
