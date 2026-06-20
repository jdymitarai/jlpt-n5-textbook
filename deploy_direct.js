const fs = require('fs');
const path = require('path');
const vm = require('vm');
const https = require('https');

const dir = 'C:\\Users\\O1004\\.gemini\\antigravity\\scratch\\jlpt-n5-textbook';
const accountId = "aca27b6ae0d9a3c59955a2920487a76a";
const token = "cfoat_uLz0omd4zbtNKXTn8MIAx8GXNrOBrSnGo8BifrhVKBg.DYiivO87zQN3AVtReXEIryJXcJ89IWDKZJ5LG4BqKS4";

console.log("Loading files...");
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/\r?\n/g, ' ');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8').replace(/\r?\n/g, ' ');
const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

console.log("Loading and minifying data.js...");
const dataRaw = fs.readFileSync(path.join(dir, 'data.js'), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataRaw, context);
const jlptData = context.window.JLPT_DATA;
if (!jlptData) {
  throw new Error("Failed to load JLPT_DATA from data.js");
}
const dataMinified = `window.JLPT_DATA = ${JSON.stringify(jlptData)};`;

function escapeForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$');
}

const workerScript = `
const htmlContent = \`${escapeForTemplate(html)}\`;
const cssContent = \`${escapeForTemplate(css)}\`;
const jsContent = \`${escapeForTemplate(js)}\`;
const dataContent = \`${escapeForTemplate(dataMinified)}\`;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  if (path === '/' || path === '/index.html') {
    return new Response(htmlContent, {
      headers: { 'content-type': 'text/html; charset=utf-8' }
    });
  } else if (path === '/styles.css') {
    return new Response(cssContent, {
      headers: { 'content-type': 'text/css; charset=utf-8' }
    });
  } else if (path === '/app.js') {
    return new Response(jsContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data.js') {
    return new Response(dataContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else {
    return new Response('404 Not Found', { status: 404 });
  }
}
`;

const metadata = { body_part: "script", compatibility_date: "2026-06-19" };
const b = "----F" + Date.now();
const body = [
  "--" + b,
  'Content-Disposition: form-data; name="metadata"',
  'Content-Type: application/json',
  '',
  JSON.stringify(metadata),
  "--" + b,
  'Content-Disposition: form-data; name="script"',
  'Content-Type: application/javascript',
  '',
  workerScript,
  "--" + b + "--"
].join("\r\n");

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve({ raw: data, statusCode: res.statusCode });
        }
      });
    });
    req.on('error', (err) => {
      reject(err);
    });
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function run() {
  console.log("Deploying script to Cloudflare Workers...");
  const deployOptions = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/accounts/${accountId}/workers/scripts/jlpt-n5-textbook`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${b}`,
      'Content-Length': Buffer.byteLength(body)
    }
  };

  const deployResult = await makeRequest(deployOptions, body);
  console.log("Deploy result:", JSON.stringify(deployResult, null, 2));

  if (!deployResult.success) {
    console.error("Deploy failed!");
    return;
  }

  console.log("Attaching domain to worker...");
  const domainBody = JSON.stringify({
    hostname: "national-taiwan-university.com",
    service: "jlpt-n5-textbook",
    environment: "production"
  });

  const domainOptions = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/accounts/${accountId}/workers/domains`,
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(domainBody)
    }
  };

  const domainResult = await makeRequest(domainOptions, domainBody);
  console.log("Domain result:", JSON.stringify(domainResult, null, 2));
}

run().catch(console.error);
