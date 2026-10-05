# agentbox-site

The landing page for [Agentbox](https://github.com/savannahfeder/agentbox), a free, open source Mac app that gives your coding agents an inbox. It is a plain static site with no build step: HTML, one stylesheet and one script.

```
index.html          the landing page
privacy.html        privacy policy (draft, see the launch checklist)
terms.html          terms of service (draft, see the launch checklist)
css/site.css        every rule is scoped to its section's id
js/site.js          one self-contained block per section
assets/             the app icon and the Geist fonts
vercel.json         clean URLs and the /download redirect
```

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The page uses root paths (`/css/site.css`), so serve it from this folder rather than opening the file directly. Locally `/download`, `/privacy` and `/terms` need their real file names (`/privacy.html`); on Vercel the clean URLs work.

## How it deploys

The site is hosted on Vercel as a static project with no framework and no build command, served at **agentbox.ac**. `vercel.json` turns on clean URLs (`/privacy` serves `privacy.html`) and redirects `/download` to the newest Mac build:

```
https://github.com/Astral-Agent/astral-releases/releases/latest/download/Astral-arm64.dmg
```

That is the app's current release feed. **A new signed Agentbox build has to be published there before launch**, and the asset name may change (for example to `Agentbox-arm64.dmg`). If it does, update the redirect in `vercel.json`.

## Launch checklist

- [ ] A signed and notarized Agentbox build is published to the release feed, and `/download` returns it.
- [ ] Legal review of `privacy.html` and `terms.html`. Both were renamed from an earlier product and have not been reviewed for Agentbox. They also need a contact email, which is left as a visible placeholder.
- [ ] The domain agentbox.ac points at the Vercel project, with HTTPS.
- [ ] An og:image for link previews. There is none yet. Add a 1200x630 image at `assets/og.png` and a `<meta property="og:image" content="https://agentbox.ac/assets/og.png">` tag (plus `twitter:card` set to `summary_large_image`) in the head of `index.html`.

## Open source

This repository is meant to be open sourced later, alongside the app. Keep it free of anything personal: no names, email addresses, home paths, keys or tokens.
