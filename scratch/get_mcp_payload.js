const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const fileName = process.argv[2];

if (!fileName) {
  console.error("Please specify a file name");
  process.exit(1);
}

const filePath = path.join(srcDir, fileName);
if (!fs.existsSync(filePath)) {
  console.error(`File does not exist: ${filePath}`);
  process.exit(1);
}

const textContent = fs.readFileSync(filePath, 'utf8');
const escapedContent = JSON.stringify(textContent);

const code = `async () => {
  const content = JSON.parse(${escapedContent});
  return cloudflare.request({
    method: "PUT",
    path: \`/accounts/\${accountId}/r2/buckets/jlpt-n5-textbook/objects/${fileName}\`,
    body: content,
    contentType: "application/javascript; charset=utf-8",
    rawBody: true
  });
}`;

console.log(code);
