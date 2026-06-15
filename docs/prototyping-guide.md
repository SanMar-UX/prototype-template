# Building a prototype

A practical guide for the SanMar UX team. You do not need to be a developer —
describe what you want to Claude Code and refine from there.

## The loop

1. `npm run dev` — leave it running; the browser hot-reloads on every save.
2. Tell Claude Code what screen or change you want, in plain language.
3. Look at the result in the browser, give feedback, repeat.
4. Push to a branch and share the Vercel preview URL with customers.

## Adding a screen

A screen is one file in `src/screens/`, registered as a route in `src/App.jsx`:

```jsx
// src/App.jsx
import Checkout from './screens/Checkout.jsx'
// ...
<Route path="/checkout" element={<Checkout />} />
```

Ask Claude Code: *"Add a checkout screen at /checkout with a shipping form and an
order summary, using the design system."* It will create the file and wire the
route.

## Making it feel real

These are what made the advanced prototype test well — ask for them explicitly:

- **State & interactivity** — selections, toggles, quantity steppers, filters.
  (See `ProductDetail.jsx` for color/quantity selection + a confirmation toast.)
- **Faked latency / loading states** — spinners and skeletons make flows feel
  like a real app. Ask for a "loading state with a 1s delay."
- **Realistic data** — put believable SanMar catalog content in `src/data/`.
- **Multiple variants** — make a git branch per idea; each gets its own preview
  URL, so you can put two versions in front of customers side by side.

## Building from a Figma design

If a screen already exists in Figma, paste the **frame URL** and ask Claude Code
to build it with react-bootstrap and existing tokens. The Figma MCP server lets
it read the layout, components, and variables directly. Keep `/sync-tokens` run
recently so the colors/type already match.

## Do / don't

- ✅ Use react-bootstrap components and theme color names.
- ✅ Keep brand values in `_tokens.scss`; run `/sync-tokens` to refresh them.
- ✅ Throw away prototypes freely — that's the point.
- ❌ Don't hard-code hex colors in a screen.
- ❌ Don't add a backend, auth, or a database — fake it.
- ❌ Don't hand-tune CSS to match a one-off; fix the token or component instead.
