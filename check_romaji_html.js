const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// There is a table somewhere with `<th>羅馬字</th>`. But wait, in the consolidation view, the vocabulary list mode does not have a <table>. It uses grid cards!
// So there is no `<th>羅馬字</th>`. Let me verify if there is any "羅馬字" string in index.html.

if (html.includes('羅馬字')) {
  console.log("Found 羅馬字 in index.html! Removing...");
  // But I don't know where it is exactly. Let's find out.
} else {
  console.log("No 羅馬字 found in index.html");
}
