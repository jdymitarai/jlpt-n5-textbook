const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');
const window = {};
eval(data);
console.log(window.JLPT_DATA.adverbsGroup.N5[0]);
