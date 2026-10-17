import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml' };
const routes = new Set(['/', '/about', '/services', '/blog', '/contact', '/book-consultation',
  '/services/ai-marketing-automation', '/services/ai-social-media-marketing', '/services/ai-lead-generation',
  '/services/seo-aeo', '/services/paid-ads', '/services/content-marketing', '/services/ai-business-growth-strategy',
  '/blog/small-business-ai-marketing', '/blog/practical-ai-marketing-tools',
  '/blog/better-digital-marketing-strategy-leads', '/blog/ai-powered-content-marketing-guide',
  '/blog/simple-marketing-automation-workflow']);

http.createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const route = pathname.replace(/\/$/, '') || '/';
  const relative = normalize(decodeURIComponent(pathname).replace(/^\/+/, ''));
  let path = join(root, relative);
  if (!path.startsWith(root)) { res.writeHead(400); res.end('Bad request'); return; }
  try { if ((await stat(path)).isDirectory()) path = join(path, 'index.html'); }
  catch {
    if (extname(pathname)) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found'); return; }
    path = join(root, 'index.html');
  }
  try {
    const body = await readFile(path);
    res.writeHead(routes.has(route) || extname(pathname) ? 200 : 404, {
      'Content-Type': types[extname(path)] || 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin',
      'X-Frame-Options': 'SAMEORIGIN', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
      'Content-Security-Policy': "default-src 'self' https: data:; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data:; frame-src https:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; frame-ancestors 'self'"
    });
    res.end(body);
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); res.end('Not found'); }
}).listen(port, () => console.log(`Portfolio running at http://localhost:${port}`));
