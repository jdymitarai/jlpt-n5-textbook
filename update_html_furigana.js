const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace grammar example placeholder in FC back
let target = '<div id="fc-back-ex-ja">私は学生です。</div>';
if (html.includes(target)) {
  html = html.replace(target, '<div id="fc-back-ex-ja"><ruby>私<rt>わたし</rt></ruby>は<ruby>学生<rt>がくせい</rt></ruby>です。</div>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log("Updated index.html");
