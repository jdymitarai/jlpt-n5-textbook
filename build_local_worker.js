const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = 'C:\\\\Users\\\\O1004\\\\.gemini\\\\antigravity\\\\scratch\\\\jlpt-n5-textbook';

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

// Load chunks
console.log("Loading chunks for worker bundling...");
const n5Data = fs.readFileSync(path.join(dir, 'data_n5.js'), 'utf8');
const n4Data = fs.readFileSync(path.join(dir, 'data_n4.js'), 'utf8');
const n3Data = fs.readFileSync(path.join(dir, 'data_n3.js'), 'utf8');
const n2Data = fs.readFileSync(path.join(dir, 'data_n2.js'), 'utf8');
const n1Data = fs.readFileSync(path.join(dir, 'data_n1.js'), 'utf8');
const clinicalData = fs.readFileSync(path.join(dir, 'data_clinical.js'), 'utf8');
const nativeData = fs.readFileSync(path.join(dir, 'data_native.js'), 'utf8');

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
const n5Content = \`${escapeForTemplate(n5Data)}\`;
const n4Content = \`${escapeForTemplate(n4Data)}\`;
const n3Content = \`${escapeForTemplate(n3Data)}\`;
const n2Content = \`${escapeForTemplate(n2Data)}\`;
const n1Content = \`${escapeForTemplate(n1Data)}\`;
const clinicalContent = \`${escapeForTemplate(clinicalData)}\`;
const nativeContent = \`${escapeForTemplate(nativeData)}\`;

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
  } else if (path === '/data_n5.js') {
    return new Response(n5Content, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_n4.js') {
    return new Response(n4Content, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_n3.js') {
    return new Response(n3Content, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_n2.js') {
    return new Response(n2Content, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_n1.js') {
    return new Response(n1Content, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_clinical.js') {
    return new Response(clinicalContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else if (path === '/data_native.js') {
    return new Response(nativeContent, {
      headers: { 'content-type': 'text/javascript; charset=utf-8' }
    });
  } else {
    return new Response('404 Not Found', { status: 404 });
  }
}
`;

fs.writeFileSync(path.join(dir, 'worker.js'), workerCode, 'utf8');
console.log("Successfully generated worker.js!");
console.log(`Worker file size: ${(workerCode.length / (1024 * 1024)).toFixed(2)} MB`);

const wranglerToml = `
name = "jlpt-n5-textbook"
main = "worker.js"
compatibility_date = "2026-06-19"
account_id = "aca27b6ae0d9a3c59955a2920487a76a"
`;

fs.writeFileSync(path.join(dir, 'wrangler.toml'), wranglerToml, 'utf8');
console.log("Successfully generated wrangler.toml!");
