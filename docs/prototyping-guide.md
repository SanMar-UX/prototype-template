# Building a prototype

A practical guide for the SanMar UX team. You do not need to be a developer —
describe what you want to Claude Code and refine from there.

## The loop

1. `npm run dev` — leave it running; the browser hot-reloads on every save.
2. Tell Claude Code what screen or change you want, in plain language.
3. Look at the result in the browser, give feedback, repeat.
4. Ask Claude to **"deploy it"** — the gallery redeploys and your prototype is
   live at its own path (see "Sharing it" below).

## Adding a prototype

This repo is **one app, many prototypes** (see CLAUDE.md, "The gallery model").
Each prototype lives in its own self-contained folder under
`src/prototypes/<slug>/` — its screens, mock data (`data/`), and one-off
components (`components/`) all stay inside that folder — and is registered as a
route in `src/App.jsx`:

```jsx
// src/App.jsx
import Checkout from './prototypes/checkout/Checkout.jsx'
// ...
<Route path="/checkout" element={<Checkout />} />
```

Ask Claude Code: *"Build a checkout prototype at /checkout with a shipping form
and an order summary, using the design system."* It will create the folder and
wire the route. Prototypes never import from each other, so you can delete a
prototype's folder any time and nothing else breaks.

## Making it feel real

These are what make a prototype test well — ask for them explicitly:

- **State & interactivity** — selections, toggles, quantity steppers, filters.
  (See `src/prototypes/simplified-returns/` for a full multi-step flow with
  shared state.)
- **Faked latency / loading states** — spinners and skeletons make flows feel
  like a real app. Ask for a "loading state with a 1s delay."
- **Realistic data** — put believable SanMar catalog content in your
  prototype's `data/` folder.
- **Multiple variants** — make a git branch per idea; each gets its own Vercel
  preview URL, so you can put two versions in front of customers side by side.

## Building from a Figma design

If a screen already exists in Figma, paste the **frame URL** and ask Claude Code
to build it with react-bootstrap and existing tokens. The Figma MCP server lets
it read the layout, components, and variables directly. Keep `/sync-tokens` run
recently so the colors/type already match.

## Sharing it

Deploying is just pushing to `main` — Vercel rebuilds the gallery automatically
and every prototype is served at `…/<slug>`. Claude runs the git for you: say
**"deploy it"**. If you don't have merge rights on `main`, Claude will push a
branch and open a pull request instead; the owner merges it live. Before sending
a link outside the team, check that Deployment Protection is off in Vercel (see
CLAUDE.md, "Deploy").

## Do / don't

- ✅ Use react-bootstrap components and theme color names.
- ✅ Keep brand values in `_tokens.scss`; run `/sync-tokens` to refresh them.
- ✅ Keep everything prototype-specific inside your `src/prototypes/<slug>/`
  folder.
- ✅ Throw away prototypes freely — that's the point.
- ❌ Don't hard-code hex colors in a screen.
- ❌ Don't add a backend, auth, or a database — fake it.
- ❌ Don't hand-tune CSS to match a one-off; fix the token or component instead.
- ❌ Don't edit the shared foundation (`src/styles/`, `src/components/`,
  `src/screens/`) from inside a prototype task — propose the change separately.
