const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(data);
console.log('vocabulary exists:', !!window.JLPT_DATA.vocabulary);
if (window.JLPT_DATA.vocabulary) {
  console.log('is array:', Array.isArray(window.JLPT_DATA.vocabulary));
}
