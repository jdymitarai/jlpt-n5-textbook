const fs = require('fs');
const path = require('path');
const https = require('https');

const token = "cfoat_uLz0omd4zbtNKXTn8MIAx8GXNrOBrSnGo8BifrhVKBg.DYiivO87zQN3AVtReXEIryJXcJ89IWDKZJ5LG4BqKS4";
const accountId = "aca27b6ae0d9a3c59955a2920487a76a";
const bucketName = "jlpt-n5-textbook";

const srcDir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';

const filesToUpload = [
  { name: 'data_n5.js', type: 'application/javascript; charset=utf-8' }
];

function uploadToR2(fileName, contentType, dataBuffer) {
  return new Promise((resolve, reject) => {
    console.log(`Uploading ${fileName} (${(dataBuffer.length / 1024).toFixed(1)} KB) to R2...`);
    const options = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4/accounts/${accountId}/r2/buckets/${bucketName}/objects/${fileName}`,
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': contentType,
        'Content-Length': dataBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.success) {
            resolve({ fileName, success: true });
          } else {
            resolve({ fileName, success: false, status: res.statusCode, errors: parsed.errors, raw: data });
          }
        } catch (e) {
          resolve({ fileName, success: false, status: res.statusCode, error: e.message, raw: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(dataBuffer);
    req.end();
  });
}

async function run() {
  for (const file of filesToUpload) {
    const filePath = path.join(srcDir, file.name);
    if (!fs.existsSync(filePath)) {
      console.error(`Skipping upload: file ${file.name} does not exist at ${filePath}`);
      continue;
    }
    const content = fs.readFileSync(filePath);
    let retries = 3;
    let success = false;
    while (retries > 0 && !success) {
      try {
        const res = await uploadToR2(file.name, file.type, content);
        if (res.success) {
          console.log(`Successfully uploaded ${file.name} to R2!`);
          success = true;
        } else {
          console.error(`Failed to upload ${file.name}:`, res);
        }
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err.message);
      }
      retries--;
      if (!success && retries > 0) {
        await new Promise(r => setTimeout(r, 2000));
      }
    }
    if (!success) {
      console.error(`CRITICAL: Failed to upload ${file.name} after 3 attempts!`);
      process.exit(1);
    }
  }
  console.log("File successfully uploaded to Cloudflare R2!");
}

run().catch(console.error);
