# CLAUDE.md — Ryan Moriarty Personal Site

## What This Is

A personal writing and creative home. Not a portfolio, not a resume. The human version of Ryan Moriarty, in public for the first time. The professional work lives at opscraft.notion.site — this site is the other half of the story.

The writing is the main event. Every design and build decision serves that.

---

## Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **CMS:** Sanity (headless) — required for rich content support: inline images, audio embeds, external plugins, portable text
- **Hosting:** Cloudflare Pages
- **Domain:** [PLACEHOLDER — to be confirmed, likely ryanmoriarty.com] via Cloudflare Registrar
- **Icons:** Feather Icons (https://feathericons.com)
- **Fonts:** Google Fonts (Work Sans, Merriweather)

Note: Vercel is not used. Cloudflare Pages is the deliberate choice.

---

## Site Architecture

Four pages at launch:

1. **Home** — Name, a short honest opening statement. Not a bio. More like a first line.
2. **Writing** — Where essays live. Simple list or grid, chronological.
3. **About** — Human version of the bio, essay voice not LinkedIn voice.
4. **Links** — opscraft.notion.site, LinkedIn, SoundCloud, and wherever the work lives.

Cross-linking: this site links to opscraft for professional proof points. opscraft links here for the human context behind the work.

---

## Design System

### Typography

- **Sans-serif (headlines, subheads, navigation, UI):** Work Sans
- **Serif (body, essays, long-form reading):** Merriweather
- **Scale:** Major Thirds, 1.25 ratio, 16px base

| Role | Size | Line Height | Spacing | Weight |
|---|---|---|---|---|
| H1 | 76.294px | 76.294px | -1.5px | 400 / 700 |
| H2 | 61.035px | 61.035px | -0.5px | 400 / 700 |
| H3 | 39.063px | 39.063px | 0px | 400 / 700 |
| H4 | 31.25px | 31.25px | 0.25px | 400 / 700 |
| H5 | 25px | 25px | -0.18px | 400 / 700 |
| H6 | 20px | 20px | 0px | 400 / 700 |
| Subtitle 1 | 25px | 25px | 0px | 500 |
| Subtitle 2 | 16px | 24px | 0px | 500 |
| Paragraph 1 | 16px | 24px | 0.5px | 400 |
| Paragraph 2 | 12.8px | 19.2px | 0px | 400 |
| Link | 16px | 24px | 0.5px | 500 |
| Button | 16px | 24px | 1.25px | 400 |
| Caption | 12.8px | 16px | 0.4px | 400 |

Body text for essays uses Merriweather at 400. Do not use thin (200) weights for body text.

### Color System

**Light mode:**

| Token | Hex | Usage |
|---|---|---|
| Background | #FDFAEA | Primary background — warm white, reads like paper |
| Surface | #DDEDF3 | Secondary surfaces, code blocks, callouts, captions |
| Surface Alt | #AFD4E4 | Subtle accents, image borders |
| Text Primary | #28261A | All primary text — warm charcoal, not harsh black |
| Accent | #EDD543 | Links hover states, highlights, pull quote markers |
| Accent Mid | #F2E17B | Softer accent, background highlights |
| White | #FFFFFF | Where needed |

**Dark mode (inverted):**

| Token | Hex | Usage |
|---|---|---|
| Background | #28261A | Primary background |
| Text Primary | #FDFAEA | All primary text |
| Accent | #EDD543 | Stays the same — works in both modes |
| Surface | #2E3F46 | Secondary surfaces |

Note: Check contrast ratio of #EDD543 on #FDFAEA before using as text. Use as background highlight (text marker effect) rather than text color when needed.

Dark mode should be built in from the start, not retrofitted.

### Spacing

8px grid system.

| Token | Value |
|---|---|
| xs | 8px |
| sm | 16px |
| md | 24px |
| lg | 32px |
| xl | 48px |
| 2xl | 72px |
| 3xl | 128px |

Generous whitespace throughout. The essay reading view especially — the writing needs room.

### Shadows

Use sparingly. Base and Medium only. Subtle depth on images or embedded content. Never decorative.

### Icons

Feather Icons only. Consistent stroke weight throughout. No filled icons.

---

## Priority Components

Build in this order:

1. **Essay reading view** — the most important component. Merriweather body, generous line length (65–75 characters), ample vertical spacing, support for inline images and audio embeds via Sanity portable text.
2. **Homepage**
3. **Navigation**
4. **About page**

---

## Sanity CMS Requirements

Sanity is required (not optional) for the writing workflow. Ryan publishes essays without touching code.

The Sanity schema must support:
- Long-form rich text (portable text)
- Inline images with captions
- Audio embeds (SoundCloud and similar)
- External plugin embeds via iframe or oEmbed
- Essay metadata: title, subhead, publish date, slug

---

## Feel

Warm and personal. Something you'd read late at night, not something you'd send to a recruiter. The professional site (opscraft) is clean and structured — this site is its human counterpart.

Generous whitespace. Quiet. The writing is always the main event.

---

## Voice and Tone

Same voice as the essay "The Long Way In." Used as the reference for all copy on the site.

- Conversational, direct, first person
- Thinks out loud
- Comfortable with unresolved questions
- Short sentences when landing a point, longer when building toward something
- Fragments used deliberately
- Humor arrives quietly, as an afterthought not a setup
- Self-correction mid-thought is fine
- Rhetorical questions that don't always get answered

**Avoid:**
- Em dashes
- Three-part parallel constructions
- Polished closing lines that are too quotable
- Anything that sounds like a cover letter or capabilities summary
- Signpost pivot lines ("And then something unexpected happened," "Here's what I learned," "What followed surprised me")

**The test:** Would this appear in a personal essay by someone who has been honest about neurodivergence, imposter syndrome, and not knowing what comes next?

---

## Attribution and AI Transparency

Ryan collaborates with Claude on writing. This is disclosed, not obscured.

- A formal attribution statement appears at the end of published essays
- Ryan drives everything: the material, memories, corrections, voice, ending
- Claude shapes sentences and holds architecture
- The work is Ryan's in every way that matters

Do not write copy for this site that obscures or contradicts this framing.

---

## What This Site Is Not

- Not a portfolio (that's opscraft.notion.site)
- Not a resume
- Not a capabilities summary
- Not a cover letter
- Not a product site

If something reads like any of those, rewrite it.
