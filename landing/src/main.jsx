import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './styles/tokens.css';
import './styles/components.css';
import './styles/site.css';
import App from './App.jsx';

// ?theme=light shows the light page; a page built light carries data-theme on <html> already.
if (new URLSearchParams(location.search).get('theme') === 'light') document.documentElement.dataset.theme = 'light';

const root = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;
// The production build is prerendered (prerender.mjs), so hydrate it; `npm run dev` serves an empty root.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
