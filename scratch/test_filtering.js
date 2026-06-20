const fs = require('fs');

const dataStr = fs.readFileSync('data_n5.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataStr, sandbox);
const JLPT_DATA = sandbox.window.JLPT_DATA_CHUNKS["N5"];

const currentVocabLevelFilter = "all";

const currentLevelVocab = JLPT_DATA.vocabulary.filter(item => {
  return currentVocabLevelFilter === "all" || item.level === currentVocabLevelFilter;
});

const activeCategoryIds = new Set(currentLevelVocab.map(item => item.category));

console.log("activeCategoryIds:", Array.from(activeCategoryIds));

const categoryGroups = [
  { id: "all", label: "✨ 全部類別" },
  { id: "human_existence", label: "👥 人類自身" },
  { id: "material_life", label: "🏠 物質生活" },
  { id: "nature_universe", label: "🌌 自然與宇宙" },
  { id: "society_civilization", label: "🏢 社會與文明" },
  { id: "abstract_concepts", label: "💡 抽象概念" }
];

const categories = [
  // Group 1: 人類自身
  { id: "body_physiology", label: "身體與生理", group: "human_existence" },
  { id: "health_medical", label: "健康與醫療", group: "human_existence" },
  { id: "psychology_character", label: "心理與性格", group: "human_existence" }
];

let displayedCategories = categories;
let displayedGroups = categoryGroups;

if (activeCategoryIds.size > 0) {
  displayedCategories = categories.filter(cat => activeCategoryIds.has(cat.id));
  const activeGroupIds = new Set(displayedCategories.map(cat => cat.group));
  activeGroupIds.add("all");
  displayedGroups = categoryGroups.filter(grp => activeGroupIds.has(grp.id));
}

console.log("displayedGroups:", displayedGroups);
console.log("displayedCategories:", displayedCategories);
