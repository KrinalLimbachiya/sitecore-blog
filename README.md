# My Blog (Next.js MVP)

A simple Next.js + Tailwind blog. Every page — home, the blog index, and each
post — has its own URL, and each blog post is its own plain React page file
(no CMS, no markdown).

## Structure

```
src/app/
  page.js                        → "/"            (home)
  blog/page.js                   → "/blog"         (post list)
  blog/<slug>/page.js             → "/blog/<slug>"  (one file per post)
src/lib/
  posts.js                        → title/date/excerpt shown on the blog index
  site-config.js                   → site name, tagline, nav links
src/components/
  Navbar.js, Footer.js             → shared header/footer on every page
```

## Adding real content to a post

Each post placeholder currently says "Content coming soon". To fill one in,
open `src/app/blog/<slug>/page.js` and replace the placeholder paragraph with
the real write-up (plain JSX — headings, paragraphs, images, code blocks,
etc. all work).

## Adding a brand new post

1. Add an entry to the `posts` array in `src/lib/posts.js` (slug, title, date,
   excerpt).
2. Create `src/app/blog/<slug>/page.js` (copy an existing post file as a
   starting point) with the real content.

That new slug is automatically a new URL: `/blog/<slug>`.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Deploy to Netlify (free)

This repo already has a `netlify.toml` and the `@netlify/plugin-nextjs`
plugin installed, so Netlify's Next.js support picks it up automatically.

1. Push this folder to a GitHub repository.
2. Go to https://app.netlify.com → **Add new site** → **Import an existing
   project** → pick the repo.
3. Netlify auto-detects the build command (`npm run build`) and publish
   directory from `netlify.toml` — just click **Deploy**.
4. You'll get a free `https://<something>.netlify.app` URL immediately; you
   can rename the site (Site settings → Change site name) for a nicer free
   subdomain, or attach a custom domain later.

Alternatively, install the Netlify CLI (`npm install -g netlify-cli`) and run
`netlify deploy` from this folder without using GitHub at all.
