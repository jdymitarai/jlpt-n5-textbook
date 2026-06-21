const fs = require('fs');

let data = fs.readFileSync('c:/ai/jlpt-n5-textbook/data.js', 'utf8');

// 1. Pronouns
let scriptPro = fs.readFileSync('c:/ai/jlpt-n5-textbook/update_pronouns_data.js', 'utf8');
let proStr = scriptPro.substring(scriptPro.indexOf('"pronouns":'), scriptPro.indexOf('  ],\n`') + 4);
if (!data.includes('"pronouns":')) {
  data = data.replace('window.JLPT_DATA = {', 'window.JLPT_DATA = {\n  ' + proStr + ',');
}

// 2. Adverbs
let scriptAdv = fs.readFileSync('c:/ai/jlpt-n5-textbook/restructure_adverbs_data.js', 'utf8');
let advStr = scriptAdv.substring(scriptAdv.indexOf('"adverbs":'), scriptAdv.indexOf('  ]\n`') + 3);
if (!data.includes('"adverbs":') && advStr.length > 50) {
  data = data.replace('window.JLPT_DATA = {', 'window.JLPT_DATA = {\n  ' + advStr + ',');
}

fs.writeFileSync('c:/ai/jlpt-n5-textbook/data.js', data, 'utf8');
console.log('Injected pronouns and adverbs manually');
