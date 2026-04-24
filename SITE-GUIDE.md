# rorimori.com — Site Management Guide

*Last updated April 2026*

---

## Starting a Work Session

Open two terminal tabs every time.

**Tab 1 — Dev server:**
```
cd ~/ryan-moriarty-site
npm run dev
```
Site previews at http://localhost:3000. Leave this running.

**Tab 2 — Claude Code:**
```
cd ~/ryan-moriarty-site
claude
```
Claude Code reads CLAUDE.md automatically. Give it instructions from here.

---

## Making Site Changes (Code)

1. Open Claude Code (Tab 2)
2. Give instructions — Claude Code edits the files
3. Preview at http://localhost:3000
4. When happy, save to Git and it auto-deploys (see below)

---

## Saving to Git and Deploying

Every `git push` to main automatically deploys to rorimori.com via Vercel. No manual deploy command needed.

```
cd ~/ryan-moriarty-site
git add .
git commit -m "Short description of what changed"
git push
```

SSH is set up — no password or token needed. Vercel picks up the push and deploys within 1–2 minutes.

---

## Updating CMS Content (Sanity)

Sanity manages all essay content. The site is statically generated — any content added or changed in Sanity only appears on the live site after a redeploy. Trigger a redeploy by making any small git commit and pushing.

**Open Sanity Studio:**
```
cd ~/ryan-moriarty-site
npm run dev
```
Then go to: http://localhost:3000/studio

**To publish a new essay:**
1. Open Studio
2. Click + New → Essay
3. Fill in: Title, Subhead, Slug, Published date, Body content
4. Click Publish
5. Make a git commit and push to trigger a Vercel redeploy

**To update an existing essay:**
1. Open Studio
2. Find the essay, make edits
3. Click Publish
4. Make a git commit and push to trigger redeploy

**To add images to an essay:**
Use the inline image block in the body editor. Images are hosted by Sanity — no manual uploads needed.

---

## Publishing a New Essay (Full Content Workflow)

**To publish and cross-post an essay:**

1. Write and finalize the essay in Sanity Studio
2. Click Publish in Sanity
3. Make a git commit and push — essay is now live at rorimori.com
4. Wait 1–2 days if possible before cross-posting (gives Google time to index the original)
5. Submit rorimori.com to Google Search Console (one-time setup) to speed up indexing
6. Cross-post to Medium using **Import Story** (not copy/paste)
   - Medium's Import feature automatically sets the canonical URL back to rorimori.com
   - This tells Google the original lives on your site, protecting your SEO
   - Never paste the full essay text directly into Medium — always use Import

**Cross-post order always:**
rorimori.com first → push → wait → Medium import

---

## Full Workflow (Start to Finish)

```
1. npm run dev                                      → start local preview
2. claude                                           → open Claude Code for changes
3. git add . && git commit -m "..." && git push     → saves to Git and auto-deploys live
```

---

## Accounts

| Service | Login |
|---|---|
| GitHub | RoriMori (personal Gmail) |
| Vercel | rorimori's projects (connected via GitHub) |
| Cloudflare | hello.rorimori@gmail.com (domain only) |
| Sanity | hello.rorimori@gmail.com |
| Domain | rorimori.com via Cloudflare Registrar |

---

## Key URLs

| What | Where |
|---|---|
| Live site | https://rorimori.com |
| Local preview | http://localhost:3000 |
| Sanity Studio (local) | http://localhost:3000/studio |
| GitHub repo | https://github.com/RoriMori/ryan-moriarty-site |
| Vercel dashboard | https://vercel.com/rorimori |
| Cloudflare dashboard | https://dash.cloudflare.com (domain management only) |

---

## Stack

- Next.js 16, App Router
- Tailwind CSS
- Sanity (headless CMS)
- Vercel (hosting — auto-deploys on every git push)
- Cloudflare Registrar (domain)
- Google Fonts: Work Sans + Merriweather

---

## If Something Breaks

**Site not updating after git push:**
Check https://vercel.com → ryan-moriarty-site → Deployments tab. Look for a new deployment in progress or any build errors.

**Sanity content not showing locally:**
Make sure `npm run dev` is running and check that `.env.local` has `NEXT_PUBLIC_SANITY_PROJECT_ID=b0xqc5lw`.

**Sanity content not showing on live site:**
The site is statically generated. Content changes need a redeploy — make any small git commit and push to trigger one.

**Git push failing:**
SSH keys are set up. If it fails, run `ssh -T git@github.com` to verify the connection.
