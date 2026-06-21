const fs = require('fs');
let app = fs.readFileSync('c:/ai/jlpt-n5-textbook/app.js', 'utf8');
let scriptPro = fs.readFileSync('c:/ai/jlpt-n5-textbook/inject_app_pro.js', 'utf8');

let extractedProCode = scriptPro.substring(scriptPro.indexOf('const proCode = `') + 17, scriptPro.indexOf('`;\n\nif (!app.includes'));

if (app.includes('// We will let the pronouns/adverbs injectors')) {
  app = app.replace('// We will let the pronouns/adverbs injectors handle their own logic by appending to this function or executing afterwards.', extractedProCode + '\n      // We will let the pronouns/adverbs injectors handle their own logic by appending to this function or executing afterwards.');
  fs.writeFileSync('c:/ai/jlpt-n5-textbook/app.js', app, 'utf8');
  console.log('Successfully injected Pronouns, Adverbs, Keigo, Conjunctions, Particles into renderConsolidationData!');
}
