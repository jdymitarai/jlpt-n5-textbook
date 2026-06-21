const fs = require('fs');
const { execSync } = require('child_process');
const output = execSync('git show HEAD:data.js').toString();
const window = {};
eval(output);
console.log(Array.isArray(window.JLPT_DATA.vocabulary));
