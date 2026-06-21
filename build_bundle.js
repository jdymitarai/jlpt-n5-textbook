const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8').replace(/\r?\n/g, ' ');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8').replace(/\r?\n/g, ' ');
const js = fs.readFileSync(path.join(dir, 'app.js'), 'utf8');

const dataRaw = fs.readFileSync(path.join(dir, 'data.js'), 'utf8');
const context = { window: {} };
vm.createContext(context);
vm.runInContext(dataRaw, context);
const jlptData = context.window.JLPT_DATA;
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

fs.writeFileSync(path.join(dir, 'worker_bundle.js'), workerScript, 'utf8');
console.log("worker_bundle.js created successfully.");
