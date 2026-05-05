# STATUS.md — rorimori.com

*Update this at the start and end of every session. Keep it short.*

---

## Current State

Site is in good shape. Core pages live. Essay + poem publishing pipeline working via Sanity → git push → Vercel auto-deploy. Multi-content-type support shipped. Dyslexia reading mode shipped.

## Active Task

<!-- Replace this with what you're working on right now -->
[No active task — update before starting a session]

## Known Issues

- Dyslexia toggle: font swap (Atkinson Hyperlegible) not visually confirmed working — attribute sets correctly, CSS scoped correctly, but font rendering unverified in production
- Follow/subscribe action not yet implemented

## Recently Completed

- Multi-content-type support: Essay, Poem, Fragment, Field Note (Sanity schema + writing index cards + homepage featured section)
- Poem page template: narrow column, stanza spacing, audio embed support
- audioEmbed field added to schema (available all content types)
- Dyslexia-friendly reading mode: toggle in nav, localStorage persistence, scoped to .essay-body and .poem-body only
- Hero wordmark/chevron overlap fix at smallest breakpoint
- Essay attribution component (dropdown in Sanity schema)
- contentType field in Sanity schema with Studio ordering

## Next Up (pull from BACKLOG.md)

- Verify Atkinson Hyperlegible font is loading in production
- Google Search Console setup
- Music page planning

---

*After a session: update "Recently Completed" and clear "Active Task."*
*Start of session: set "Active Task" before opening Claude Code.*
