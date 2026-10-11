# StuPivot trust, SEO and form upgrade

## Files
- `index.html`, `style.css`, `script.js`: updated existing site. Existing tools/sections are retained.
- `privacy.html`, `terms.html`: standalone policy pages with unique titles/descriptions. Review the legal copy for your actual practices before publishing.
- `thank-you.html`: post-submission destination.
- `404.html`: GitHub Pages custom not-found page.
- `assets/social-preview.png`: 1200×630 social sharing preview.
- `assets/favicon.svg`, `assets/favicon-180.png`: favicon icons.

## Before publishing
1. Confirm your actual GitHub Pages URL/repository slug. These files use `https://rijan0228.github.io/stupviot/` because that is the canonical URL in the supplied HTML. If the repo is named differently, update canonical URLs, Open Graph URLs, form `_next` values, and social image URLs.
2. Enable HTTPS: GitHub → repository → Settings → Pages → check **Enforce HTTPS** after GitHub Pages has issued the certificate. The static page cannot toggle this setting itself.
3. Analytics: create a GA4 property if you want it, copy its measurement ID (format `G-...`) into `GA4_MEASUREMENT_ID` in `script.js`, and review the analytics provider's current privacy terms. It loads only after visitor consent. Until an ID is configured, analytics does not run.
4. Form protection: the client validates required fields and length/email formats, and includes a honeypot. Configure Formspree spam protection / reCAPTCHA or equivalent in the Formspree dashboard. Client-side validation and honeypots can be bypassed.
5. Server-side validation and rate limiting cannot be implemented securely in a static GitHub Pages site. For strong protection, use a backend/serverless endpoint (for example Cloudflare Worker or Netlify Function) with validation, rate limiting, and bot checks, or use form-provider features. There is no login form in the supplied site, so login rate limiting is not applicable unless you add authentication.
6. No images existed in the supplied `index.html`; therefore there were no existing photos to compress or add `alt` text to. The new social preview is optimized PNG; if you add content images later, include descriptive `alt` text and compress them before upload.
7. Check live performance after publishing with PageSpeed Insights (mobile and desktop). No reliable live load-speed measurement is claimed by this local file edit.
8. Test both forms using the live Formspree endpoint, confirm messages arrive, verify thank-you redirect, and inspect the browser console for broken in-page links.

## Important
There were no API keys or obvious secrets in the supplied `script.js`. Never place private API keys, passwords, or secret tokens in HTML/JS/CSS: anyone can view front-end source. Put secrets in a server-side environment variable.
