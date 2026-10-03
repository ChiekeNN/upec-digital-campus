// Preview server for the ftp-deploy package. Mimics Apache:
//  - directories serve index.html
//  - the four /api/... form URLs are mocked (real PHP runs on the user's host)
import http from 'http';
import fs from 'fs';
import path from 'path';

const ROOT = '/home/user/upec-digital-campus/ftp-deploy';
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.webmanifest': 'application/manifest+json',
  '.json': 'application/json', '.txt': 'text/plain', '.ico': 'image/x-icon',
  '.webp': 'image/webp', '.woff2': 'font/woff2',
};

const API_MOCKS = {
  '/api/enquiry': () => ({ success: true, message: 'Your message has been received. The UPEC team will respond soon.' }),
  '/api/application': (d) => ({
    success: true,
    reference: 'UPEC-' + (d.applicationType === 'full' ? 'APP' : 'EOI') + '-' + Date.now().toString().slice(-6),
    message: d.applicationType === 'full'
      ? 'Your application has been submitted successfully.'
      : 'Your expression of interest has been received.',
  }),
  '/api/application/postgraduate': () => ({
    success: true,
    reference: 'UPEC-PG-' + Date.now().toString().slice(-6),
    message: 'Your postgraduate application has been submitted successfully. The UPEC admissions team will contact you.',
  }),
  '/api/application/training': () => ({
    success: true,
    reference: 'UPEC-ET-' + Date.now().toString().slice(-6),
    emailSent: true,
    message: 'Your Entrepreneur Training Registration has been submitted successfully and the details have been sent to chiekenn@gmail.com. Please keep or print your registration slip for verification at the training venue.',
  }),
};

http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0]);

  // Mock the PHP form endpoints (preview only)
  if (req.method === 'POST' && API_MOCKS[urlPath]) {
    let body = '';
    req.on('data', (c) => { body += c; if (body.length > 20e6) req.destroy(); });
    req.on('end', () => {
      let data = {};
      try { data = JSON.parse(body); } catch { /* ignore */ }
      console.log('[preview] form POST ' + urlPath + ' -> ' + (data.name || data.fullName || ''));
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(API_MOCKS[urlPath](data)));
    });
    return;
  }

  let p = path.join(ROOT, urlPath);
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p) || !fs.statSync(p).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    fs.createReadStream(path.join(ROOT, '404.html')).pipe(res);
    return;
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(8123, '0.0.0.0', () => console.log('UPEC ftp-deploy preview on :8123'));
