# SanMar Prototype Template

A starting point for **high-fidelity, interactive prototypes** for the SanMar UX
team — built with Claude Code instead of Figma Make. It comes pre-themed with the
SanMar design system, so every prototype looks on-brand from the first run, and
it deploys to a real URL you can send to customers.

> **TL;DR:** Click **Use this template** → clone → `npm install` → `npm run dev`.
> Then describe the screens you want to Claude Code and start iterating.

---

## Why this exists

We loved the rich, clickable prototypes — but not Figma Make's pricing or its
ceiling. This template gives the same realism with full control:

- **On-brand by default** — Bootstrap is customized with SanMar design tokens,
  so you don't start from a blank, generic UI.
- **Speaks production's language** — uses Bootstrap + react-bootstrap, the same
  design-system vocabulary our developers reference, so prototypes are a useful
  handoff artifact, not just a picture.
- **Real URLs** — deploy to Vercel; every branch gets its own preview link for
  A/B testing flows with customers.
- **Built for Claude Code** — conventions live in `CLAUDE.md`, and `/sync-tokens`
  keeps the theme aligned with the Figma design system.

---

## Quick start

Requires **Node 20+** (`.nvmrc` included — run `nvm use`).

```bash
npm install      # install dependencies
npm run dev      # start the dev server, opens http://localhost:5173
```

Edit files in `src/` and the browser hot-reloads instantly. The included example
is a small product browse → detail → cart flow; delete or replace it.

---

## Project structure

```
src/
├── styles/
│   ├── _tokens.scss   # SanMar brand values — synced from Figma (/sync-tokens)
│   ├── _theme.scss    # maps tokens onto Bootstrap's Sass variables
│   └── main.scss      # imports overrides FIRST, then Bootstrap (order matters)
├── components/        # reusable pieces (e.g. AppNav)
├── screens/           # one file per screen; routes are wired in App.jsx
├── data/              # mock data
├── App.jsx            # routing + shared state (e.g. cart)
└── main.jsx           # entry point; imports the stylesheet
```

See [`docs/design-system.md`](docs/design-system.md) for how theming works and
[`docs/prototyping-guide.md`](docs/prototyping-guide.md) for how to build a flow.

---

## Connecting to the SanMar design system

The prototype's look comes entirely from `src/styles/_tokens.scss`. Keep it in
sync with the Figma design system via Claude Code:

```
/sync-tokens https://www.figma.com/design/<fileKey>/SanMar-Design-System
```

This reads published variables from the Figma library (via the Figma MCP server)
and rewrites the tokens — the whole prototype re-skins automatically. You can
also paste a Figma **frame** URL and ask Claude Code to build that screen using
react-bootstrap + existing tokens.

> First time: open the **Figma desktop app**, switch to **Dev Mode**, and enable
> the MCP server in the right sidebar so Claude Code can read your files.

---

## Deploying a live URL

This builds to static files — host it anywhere. We use **Vercel** (free tier):

```bash
npm i -g vercel   # once
vercel            # deploy; follow the prompts -> get a URL
```

Or import the GitHub repo at [vercel.com/new](https://vercel.com/new) once, and
every push deploys automatically. **Every branch gets its own preview URL** —
make a branch per variant to test alternatives with customers.

---

## For maintainers

To update the template for everyone: edit this repo. New prototypes created from
it pick up the changes; existing clones can pull manually. Keep `_tokens.scss`
and `_theme.scss` as the single theming surface so re-skinning stays a one-file
change.
