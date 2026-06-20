const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const files = [
  { name: 'data.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n5.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n4.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n3.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n2.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n1.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_clinical.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_native.js', type: 'application/javascript; charset=utf-8' }
];

const uploads = [];
for (const f of files) {
  const filePath = path.join(srcDir, f.name);
  if (fs.existsSync(filePath)) {
    const textContent = fs.readFileSync(filePath, 'utf8');
    uploads.push({
      name: f.name,
      contentType: f.type,
      content: textContent
    });
  }
}

// Write the javascript code to run via cloudflare-api execute
const code = `async () => {
  const uploads = ${JSON.stringify(uploads)};
  const results = [];
  for (const upload of uploads) {
    const res = await cloudflare.request({
      method: "PUT",
      path: \`/accounts/\${accountId}/r2/buckets/jlpt-n5-textbook/objects/\${upload.name}\`,
      body: upload.content,
      contentType: upload.contentType,
      rawBody: true
    });
    results.push({ name: upload.name, success: res.success, status: res.status, errors: res.errors });
  }
  return results;
}`;

fs.writeFileSync(path.join(srcDir, 'scratch', 'mcp_r2_payload_utf8.js'), code, 'utf8');
console.log("Successfully generated UTF-8 MCP payload code and saved to scratch/mcp_r2_payload_utf8.js");
