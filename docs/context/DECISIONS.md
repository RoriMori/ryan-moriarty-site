# DECISIONS.md — rorimori.com

*Why things were built the way they were. Saves re-litigating decisions with Claude Code later.*

---

## Hosting: Vercel (not Cloudflare Pages)

**Decision:** Site is hosted on Vercel, not Cloudflare Pages.
**Why:** Vercel was already set up and working with GitHub auto-deploy. A Cloudflare Pages migration was considered in April 2026 due to a Vercel supply chain security incident (Context.ai OAuth breach), but risk to a personal writing site was assessed as low. Stayed on Vercel. Cloudflare is DNS/registrar only.

---

## CMS: Sanity

**Decision:** Sanity as headless CMS, not MDX files or a simpler flat-file approach.
**Why:** Ryan publishes essays without touching code. Sanity supports portable text with inline images, audio embeds, and external plugin support — all needed for the essay format. The writing workflow requires a proper CMS.

**Note:** Site is statically generated. Content changes in Sanity require a git push to trigger a Vercel redeploy.

---

## Typography: Work Sans + Merriweather

**Decision:** Work Sans for UI/navigation, Merriweather for essay body.
**Why:** Essay reading experience is the main event. Merriweather is a readable serif built for screens. Work Sans keeps navigation clean and distinct from reading mode. Both via Google Fonts.

---

## Color: Warm white background (#FDFAEA), not pure white

**Decision:** Background is warm white (#FDFAEA), not #FFFFFF.
**Why:** Reads like paper. Warmer and easier on the eyes for long-form reading. Consistent with the "something you'd read late at night" feel.

---

## Accent: #EDD543 (yellow)

**Decision:** Yellow as the single accent color.
**Why:** Works in both light and dark mode without adjustment. Used as a background highlight (text marker effect) rather than as text color — contrast on warm white is insufficient for accessible text use.

---

## Fonts loaded via Google Fonts (not self-hosted)

**Decision:** Using Google Fonts CDN.
**Why:** Simplest path. Acceptable for a personal writing site. Can revisit if performance becomes a concern.

---

*Add a new entry whenever a non-obvious decision is made. Include the alternative that was rejected and why.*
