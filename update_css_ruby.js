const fs = require('fs');

let css = fs.readFileSync('styles.css', 'utf8');

const newCSS = `
/* Ruby & Furigana Styles */
ruby {
  ruby-align: center;
}

rt {
  font-size: 0.6em;
  color: var(--text-secondary);
  font-weight: normal;
  user-select: none;
}

.grammar-example-ja ruby, .vocab-jp-text {
  line-height: 1.8;
}
`;

if (!css.includes('/* Ruby & Furigana Styles */')) {
  css += newCSS;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log("Added ruby CSS");
} else {
  console.log("Ruby CSS already exists");
}
