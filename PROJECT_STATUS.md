# Project status — SanMar prototyping template

> Tracks the development of **this template itself** (not prototypes built from it).
> A handoff/continuity doc so any session — human or Claude — can pick up where we
> left off. If you generated a prototype from this template, you can delete this file.

_Last updated: 2026-08-25_

---

## 🎯 Goal

A cloneable, on-brand **SanMar prototyping template** so any UX team member can use
**Claude Code** to build advanced, interactive prototypes fast — without rebuilding
the design system each time. Published as a private **GitHub template** under the
`SanMar-UX` org, deployable to live (shareable) URLs.

**Definition of done:** a teammate clicks _"Use this template"_ → clones →
`npm install && npm run dev` → and Claude Code already knows the design system, the
component catalog, and the conventions, so they're productive in minutes.

---

## ✅ Done

**Design system (the hard part — complete)**
- Live component catalog at **`/design-system`** (`src/screens/DesignSystem.jsx`)
  covering: buttons, links, button groups, close button, accordion, alerts, toasts,
  badges, breadcrumb, tabs/navs, pagination, table, list group, modal, offcanvas,
  dropdown, focus ring, inputs/forms, progress, placeholder, spinner, tooltip,
  icon tip, popover, plus the composed **SiteHeader/SiteFooter**.
- Foundations: brand logo, theme colors, grays, palette, typography, spacing.
- SanMar deviations from Bootstrap defaults captured as **theme variable overrides**
  in `src/styles/_theme.scss` (4px radii family, pagination + progress theming,
  tinted toast/table states) — derived from tokens so `/sync-tokens` keeps them aligned.
- Sticky "Jump to section" nav on the catalog page (self-populating).

**Template usability**
- **`StarterPage`** at `/` — blank screen with real SanMar header/footer, ready to fill.
- **`CLAUDE.md`** updated: points at `/design-system`, documents the Figma→Bootstrap
  workflow and the gotchas (the `href="#"` trap, `eventKey` selection, logo SVG sizing).
- **`README.md`** corrected to match the actual shipped screens/components.

**Publishing**
- `SanMar-UX` GitHub org created.
- Repo **`SanMar-UX/prototype-template`** — code on `main`, marked as a
  **Template repository**. Made **public** (2026-06-23) so the free Vercel Hobby
  plan could deploy it (private-org repos required paid Vercel Pro at the time;
  moot since the 2026-08-17 move to Pro — see below).
- **Vercel connected** — push to `main` auto-deploys; verified end-to-end
  (commit → Production in ~9s). Claude runs the git; no Vercel CLI needed.

**Moved to Vercel Pro (2026-08-17)**
- Manager (Devin) created the **UX Team** Pro workspace (`ux-team-sanmar`) on
  Vercel; the `sanmar-prototypes` project was **transferred** into it from the
  personal Hobby team.
- **Nothing about the workflow changed**: push to `main` still auto-deploys
  (webhook survived the transfer; re-verified end-to-end after the move).
- **All URLs survived**, including previously shared links —
  `prototype-template-gamma.vercel.app` (primary) and both team-scoped URLs
  still resolve, deep links included. Deployment Protection remains OFF.
- The old personal `SanMar-UX` Hobby Vercel team is now empty (delete at leisure).

**Deploy model decided: the _gallery_ (2026-06-23)**
- **One repo / one Vercel project**, each prototype is a route
  (`/simplified-returns`, `/pdp`, `/shareable-links`…), all under one domain.
- Chosen because colleagues won't learn git/Vercel: the painful clone + Vercel
  setup happens **once for the whole team**, not once per prototype. New prototype
  = a new route pushed to this same repo, riding the existing Vercel connection.
- Convention + workflow documented in **`CLAUDE.md`** ("The gallery model").

**Ownership tied to the SanMar identity (2026-06-23)**
- Manager's instruction: everything SanMar must be under `c-nurgazybudaichiev@sanmar.com`.
- That email was only a secondary email on the personal `nurgazik` account (no
  separate account existed). Freed it, created GitHub account **`uxnur`**, made it
  an **Owner** of `SanMar-UX` (kept `nurgazik` as backup owner). This repo now
  **commits as `uxnur`**. (`uxnur` has no 2FA by choice — would be auto-removed if
  the org ever enforces 2FA.)

**Deploy gate — branch protection on `main` (2026-06-23)**
- Require PR + 1 approval + **restrict who can push → `uxnur`** (admins exempt).
- Effect: only the owner can merge to `main`, so **only the owner publishes to
  production**. Teammates work on branches (preview URLs) and open PRs the owner
  merges. Documented in `CLAUDE.md` ("Release gating").

---

## ⬜ To do / outstanding

**Publishing follow-ups**
- [x] **Vercel** — connected; auto-deploy on push verified.
- [x] **Disable Deployment Protection** — done 2026-06-23; still off after the
      Pro-team transfer (re-verified 2026-08-17). External links open directly.
- [x] **Rename Vercel project to `sanmar-prototypes`** — done. (GitHub repo is
      still named `prototype-template`; primary domain is
      `prototype-template-gamma.vercel.app`.)
- [x] **First real route** — `/simplified-returns` shipped and shared.
- [ ] **Build the gallery index at `/`** — still the blank StarterPage; should
      become an index of cards linking to each prototype.
- [ ] **Consider making the repo private again** — the public-repo workaround is
      obsolete now that we're on Vercel Pro. Ask Devin for preference.
- [ ] **Add a 2nd org owner** when a colleague is onboarded (bus-factor insurance — currently sole owner).
- [ ] **Invite colleagues** once they have GitHub accounts (they have `@sanmar.com` emails but no GitHub yet).

**Design system gaps**
- [ ] **Offcanvas** is intentionally Bootstrap-default (not yet designed in Figma) — revisit when designed.
- [ ] **Logo** ships only the Default wordmark; the Horizontal / Vertical / Stacked lockups
      aren't downloaded yet (would go in `public/brand/`).
- [ ] Re-sync **Progress / Table / Placeholder** if their Figma frames change (they were WIP when built).

**Nice-to-have**
- [ ] Build one **real example flow** (product grid → PDP → cart) as a richer worked
      example a cloner can copy. (Currently the only example is the blank StarterPage.)

**Someday / if it grows**
- [ ] If SanMar IT stands up governed GitHub, **transfer the org/repo** into corporate
      ownership (org + repos are transferable without losing history/URLs).
- [ ] Upgrade to GitHub **Team** plan if branch protection / required reviews become useful.
