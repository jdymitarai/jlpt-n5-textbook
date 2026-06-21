const fs = require('fs');
let data = fs.readFileSync('data.js', 'utf8');

// The file starts with window.JLPT_DATA = { ... }
// We can just evaluate it by mocking window
const context = {};
const script = `
  const window = {};
  ${data};
  return window.JLPT_DATA;
`;
const JLPT_DATA = new Function(script)();

const levels = ['N5', 'N4', 'N3', 'N2', 'N1'];
levels.forEach(level => {
  const verbs = JLPT_DATA.verbs && JLPT_DATA.verbs[level] ? JLPT_DATA.verbs[level].length : 0;
  console.log(`Level ${level} verbs: ${verbs}`);
});
