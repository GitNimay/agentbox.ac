# agentbox-site

The website for [Agentbox](https://github.com/savannahfeder/agentbox): one inbox for a team and its agents. It is a static site. The guides, privacy and terms pages are hand-written HTML; the homepage is built from `landing/`.

```
index.html          the homepage, built from landing/ (do not edit it by hand)
landing/            the homepage's source: React and Vite, prerendered to static HTML
privacy.html        privacy policy
terms.html          terms of service
css/guide.css       the guide pages' stylesheet
assets/             the app icon, the link preview (og.png), and the homepage's built files
drafts/             approved.html, the first approved layout, kept to compare against
vercel.json         clean URLs and the /download redirect
.vercelignore       keeps landing/ and drafts/ off the live site
```

## Changing the homepage

```
cd landing && npm ci && npm run build
cp dist/index.html ../index.html && cp -R dist/assets/. ../assets/
```

`npm run dev` in `landing/` serves it with hot reload at http://localhost:4321.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The page uses root paths (`/css/site.css`), so serve it from this folder rather than opening the file directly. Locally `/download`, `/privacy` and `/terms` need their real file names (`/privacy.html`); on Vercel the clean URLs work.

## How it deploys

**Pushing to `main` does not deploy.** The Vercel project is linked through
`.vercel/`, not through a GitHub integration, so a push updates the repository
and leaves the live site on its previous build. Deploy from this folder:

```
vercel --prod
```

Measured on 2026-10-17: `main` was pushed with five new pages and agentbox.ac
kept serving the 15 October build — every new URL a 404 — until `vercel --prod`
ran. Check a real URL afterwards rather than trusting the push.

The site is hosted on Vercel as a static project with no framework and no build command, served at **agentbox.ac**. `vercel.json` turns on clean URLs (`/privacy` serves `privacy.html`) and redirects `/download` to the newest Mac build:

```
https://github.com/agentboxhq/agentbox-releases/releases/latest/download/Agentbox.dmg
```

That is the app's public release feed, the same repo installed copies check for updates. The app's `scripts/publish-download.mjs` uploads each signed build there under the fixed name `Agentbox.dmg`.

## Public repository

This repository is public. Keep it free of anything personal: no names, email addresses, home paths, keys or tokens. Commit as a GitHub no-reply address, never a personal email.

On 2026-11-22 the history was rewritten to take a personal email out of four commits, and `main` refuses force pushes and merge commits. A copy cloned before then will not fast-forward: save its own work, then reset it to `origin/main`. Never merge the old `main` back in.
