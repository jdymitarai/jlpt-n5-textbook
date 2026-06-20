export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/upload-secret-db' && request.method === 'POST') {
      try {
        const fileName = url.searchParams.get('file');
        const body = await request.arrayBuffer();
        await env.JLPT_R2.put(fileName, body, { httpMetadata: { contentType: request.headers.get('content-type') } });
        return new Response('Success', { status: 200 });
      } catch (e) { return new Response(e.message, { status: 500 }); }
    }
    if (url.pathname === '/upload-secret-db' && request.method === 'POST') {
      try {
        const fileName = url.searchParams.get('file');
        const body = await request.arrayBuffer();
        await env.JLPT_R2.put(fileName, body, { httpMetadata: { contentType: request.headers.get('content-type') } });
        return new Response('Success', { status: 200 });
      } catch (e) { return new Response(e.message, { status: 500 }); }
    }
    if (url.pathname === '/upload-secret-db' && request.method === 'POST') {
      try {
        const fileName = url.searchParams.get('file');
        const body = await request.arrayBuffer();
        await env.JLPT_R2.put(fileName, body, { httpMetadata: { contentType: request.headers.get('content-type') } });
        return new Response('Success', { status: 200 });
      } catch (e) { return new Response(e.message, { status: 500 }); }
    }
    if (url.pathname === '/upload-secret-db' && request.method === 'POST') {
      try {
        const fileName = url.searchParams.get('file');
        const body = await request.arrayBuffer();
        await env.JLPT_R2.put(fileName, body, { httpMetadata: { contentType: request.headers.get('content-type') } });
        return new Response('Success', { status: 200 });
      } catch (e) { return new Response(e.message, { status: 500 }); }
    }

    let path = url.pathname.slice(1);
    if (path === '' || path === '/') {
      path = 'index.html';
    }

    if (!env.JLPT_R2) {
      return new Response('System Error: JLPT_R2 binding missing', { status: 500 });
    }

    const object = await env.JLPT_R2.get(path);
    if (!object) {
      return new Response('Not Found', { status: 404 });
    }

    let contentType = 'application/octet-stream';
    if (path.endsWith('.html')) {
      contentType = 'text/html; charset=utf-8';
    } else if (path.endsWith('.css')) {
      contentType = 'text/css; charset=utf-8';
    } else if (path.endsWith('.js')) {
      contentType = 'application/javascript; charset=utf-8';
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=600');
    headers.set('Access-Control-Allow-Origin', '*');

    return new Response(object.body, { headers });
  }
};
