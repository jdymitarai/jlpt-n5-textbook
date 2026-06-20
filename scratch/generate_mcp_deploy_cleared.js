const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook';

const filesToUpload = [
  { name: 'index.html', type: 'text/html; charset=utf-8' },
  { name: 'data_n5.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n4.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n3.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n2.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_n1.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_clinical.js', type: 'application/javascript; charset=utf-8' },
  { name: 'data_native.js', type: 'application/javascript; charset=utf-8' }
];

const filePayloads = [];

for (const file of filesToUpload) {
  const filePath = path.join(srcDir, file.name);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: ${file.name} does not exist at ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath);
  const b64 = content.toString('base64');
  filePayloads.push({
    name: file.name,
    type: file.type,
    b64: b64
  });
}

const code = `async () => {
  const accountId = "aca27b6ae0d9a3c59955a2920487a76a";
  const bucketName = "jlpt-n5-textbook";

  const files = ${JSON.stringify(filePayloads, null, 2)};

  function b64ToBuffer(b64) {
    const binStr = atob(b64);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bytes[i] = binStr.charCodeAt(i);
    }
    return bytes.buffer;
  }

  const results = [];
  for (const file of files) {
    const res = await cloudflare.request({
      method: "PUT",
      path: "/accounts/" + accountId + "/r2/buckets/" + bucketName + "/objects/" + file.name,
      body: b64ToBuffer(file.b64),
      rawBody: true,
      contentType: file.type
    });
    results.push({ name: file.name, success: res.success, status: res.status });
  }

  return results;
}`;

const outPath = path.join(srcDir, 'mcp_deploy_cleared_code.txt');
fs.writeFileSync(outPath, code, 'utf8');
console.log("Successfully generated mcp_deploy_cleared_code.txt!");
