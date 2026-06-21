const fs = require('fs');
let data = fs.readFileSync('c:/ai/jlpt-n5-textbook/data.js', 'utf8');

console.log('adjectivesGroup', data.includes('"adjectivesGroup"'));
console.log('adjectiveGroups', data.includes('"adjectiveGroups"'));
console.log('verbsGroup', data.includes('"verbsGroup"'));
console.log('verbConjugations', data.includes('"verbConjugations"'));
console.log('adverbsGroup', data.includes('"adverbsGroup"'));
