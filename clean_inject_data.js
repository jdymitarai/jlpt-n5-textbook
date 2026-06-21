const fs = require('fs');

let data = fs.readFileSync('c:/ai/jlpt-n5-textbook/data.js', 'utf8');

const window = {};
eval(data); // Populates window.JLPT_DATA

// 1. Pronouns
let scriptPro = fs.readFileSync('c:/ai/jlpt-n5-textbook/update_pronouns_data.js', 'utf8');
let proMatch = scriptPro.match(/"pronouns":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
if (proMatch) {
  window.JLPT_DATA.pronouns = eval(proMatch[1]);
  console.log('Injected pronouns');
}

// 2. Adverbs
let scriptAdv = fs.readFileSync('c:/ai/jlpt-n5-textbook/restructure_adverbs_data.js', 'utf8');
let advMatch = scriptAdv.match(/"adverbsGroup":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
if (!advMatch) {
  // Try adverbs key
  advMatch = scriptAdv.match(/"adverbs":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
}
if (advMatch) {
  window.JLPT_DATA.adverbsGroup = eval(advMatch[1]);
  console.log('Injected adverbsGroup');
}

// 3. Keigo
let scriptKeigo = fs.readFileSync('c:/ai/jlpt-n5-textbook/patch_keigo_app.js', 'utf8');
let keigoMatch = scriptKeigo.match(/"keigoData":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
if (keigoMatch) {
  window.JLPT_DATA.keigoData = eval(keigoMatch[1]);
  console.log('Injected keigoData');
}

// 4. Conjunctions
let scriptConj = fs.readFileSync('c:/ai/jlpt-n5-textbook/inject_app_pro.js', 'utf8');
let conjMatch = scriptConj.match(/"conjunctions":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
if (conjMatch) {
  window.JLPT_DATA.conjunctions = eval(conjMatch[1]);
  console.log('Injected conjunctions');
}

// 5. Particles
let partMatch = scriptConj.match(/"particles":\s*(\[\s*\{[\s\S]*?\}\s*\])/);
if (partMatch) {
  window.JLPT_DATA.particles = eval(partMatch[1]);
  console.log('Injected particles');
}

const newData = 'window.JLPT_DATA = ' + JSON.stringify(window.JLPT_DATA, null, 2) + ';';
fs.writeFileSync('c:/ai/jlpt-n5-textbook/data.js', newData, 'utf8');
console.log('data.js updated cleanly!');
