// Bake the rendered page into dist/index.html so it ships as full HTML (SEO, first paint);
// the client bundle then hydrates it. Runs after both vite builds (see package.json).
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { render } from './.ssr/entry-server.js';

const file = 'dist/index.html';
const html = readFileSync(file, 'utf8');
if (!html.includes('<!--app-html-->')) throw new Error('index.html is missing the <!--app-html--> marker');
// React prefixes the markup with <link rel="preload"> hints for the images; they belong in <head>.
const [, hints, app] = render().match(/^((?:<link [^>]*\/>)*)([\s\S]*)$/);
writeFileSync(file, html.replace('</head>', hints + '\n</head>').replace('<!--app-html-->', app));
rmSync('.ssr', { recursive: true, force: true });
console.log('prerendered', file);
