const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;

console.log("Starting unified multi-level bundling and packaging...");

const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/\r?\n/g, ' ');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8').replace(/\r?\n/g, ' ');
const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

console.log("Loading and minifying consolidated data.js...");
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

const workerCode = `
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

const deployCode = `async () => {
  const accountId = "aca27b6ae0d9a3c59955a2920487a76a";
  const workerScript = \`${escapeForTemplate(workerCode)}\`;
  
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
  ].join("\\r\\n");

  console.log("Uploading consolidated JLPT Worker script to Cloudflare...");
  
  // 1. Deploy the worker script
  const deployRes = await cloudflare.request({
    method: "PUT",
    path: "/accounts/" + accountId + "/workers/scripts/jlpt-n5-textbook",
    body: body,
    contentType: "multipart/form-data; boundary=" + b,
    rawBody: true
  });

  if (!deployRes.success) {
    return { success: false, step: "deploy", details: deployRes };
  }

  // 2. Attach domain to the worker
  const attachRes = await cloudflare.request({
    method: "PUT",
    path: "/accounts/" + accountId + "/workers/domains",
    body: {
      hostname: "national-taiwan-university.com",
      service: "jlpt-n5-textbook",
      environment: "production"
    }
  });

  return { success: true, deploy: deployRes, attach: attachRes };
}`;

const outputDeployTxtPath = 'deploy_code.txt';
fs.writeFileSync(outputDeployTxtPath, deployCode, 'utf8');
console.log("Successfully generated deploy_code.txt!");
console.log(`Bundled Worker script size: ${(workerCode.length / (1024 * 1024)).toFixed(2)} MB`);
