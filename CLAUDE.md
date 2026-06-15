# SanMar Prototype — guidance for Claude Code

This is a **throwaway UX prototype** built from the SanMar prototyping template.
Optimize for speed of iteration and visual fidelity, not production hardening.

## Stack
- **React 18 + Vite** — app shell. `npm run dev` for hot-reload.
- **Bootstrap 5.3 (Sass) themed with SanMar tokens** — `src/styles/`.
- **react-bootstrap** — use these components instead of raw HTML so prototypes
  inherit SanMar theming and match production's component vocabulary.
- **react-router-dom** — multi-screen flows. Register routes in `src/App.jsx`.

## Conventions (please follow)
- **Use the design system, don't reinvent it.** Reach for react-bootstrap
  components and Bootstrap utility classes. Use theme colors (`primary`,
  `dark`, `brand-navy`, `brand-teal`) — never hard-code hex values in a screen.
- **Tokens are the source of truth.** Brand values live ONLY in
  `src/styles/_tokens.scss`, kept in sync with Figma via `/sync-tokens`. Never
  hard-code a brand color in a component; if a value is missing, add a token.
- **One screen per file** in `src/screens/`. Shared pieces go in
  `src/components/`. Mock data goes in `src/data/`.
- **Keep prototype-only CSS thin.** Anything reusable belongs in the design
  system layer, not in a one-off style.
- This is a prototype: **no backend, no auth, no tests required.** Fake data and
  faked latency are fine and encouraged for realism.

## The component catalog — check it first
`src/screens/DesignSystem.jsx` renders a **live reference of every component the
template ships**, at **`/design-system`** (`npm run dev` → open `/design-system`).
Before building a screen, skim it (or the file) to see what already exists and how
it's used: buttons, links, forms/inputs, tables, tabs/navs, pagination, modals,
offcanvas, toasts, popovers, tooltips, spinners, progress, placeholders, list
groups, cards, badges, breadcrumbs, the composed `SiteHeader`/`SiteFooter`, plus
the brand logo and the color/type/spacing foundations. **Reuse from here; don't
rebuild.** Adding a component? Add a `<Section>` — the sticky "Jump to section"
nav discovers it automatically.

## Connecting to Figma
- `/sync-tokens <figma-url>` — pull design tokens from the SanMar Figma library
  into `_tokens.scss`.
- To rebuild a screen from a Figma frame, share the frame URL and ask to
  implement it with react-bootstrap + existing tokens (the Figma MCP server is
  connected).

## Building a component from Figma (the workflow that built the catalog)
1. `get_design_context` (+ `get_screenshot`) on the frame. Figma exports a giant
   per-variant `if/else` matrix with Tailwind classes — read it as a **prop
   matrix**, NOT code to copy. Those Tailwind classes are not our system.
2. **Map the matrix onto a Bootstrap / react-bootstrap component.** Almost every
   SanMar component *is* a themed Bootstrap default: `style`→`variant`,
   `state`→`active`/`disabled`, `size`→`sm`/`lg`, and "atom + container" frame
   pairs → nested components (`ListGroup`+`Item`, `Nav`+`Tab`, `Pagination`+`Item`).
   Most need **zero custom CSS**.
3. **When it genuinely deviates from a Bootstrap default, change the theme, not
   the screen.** Add a Sass variable override in `src/styles/_theme.scss`, derived
   from existing tokens so it tracks `/sync-tokens` and applies app-wide — e.g.
   `$pagination-active-bg: tint-color($primary, 80%)`. Real CSS (only when no
   variable exists) goes in `_components.scss`. Never hardcode the value in a
   component. Verify if unsure: `curl -s localhost:<port>/src/styles/main.scss | grep <var>`.

## Patterns & gotchas (learned building the catalog)
- **Never use `href="#"` on interactive list/nav items.** It scrolls to the top
  AND (in react-bootstrap) collapses every item onto one shared `eventKey`, so
  clicking one activates all of them. Render a `<button>` (omit `href`), or give
  each item a unique `eventKey` + a `defaultActiveKey` on the container.
- **Single-select `ListGroup` / `Nav` / `Tabs`** = unique `eventKey` per item +
  `defaultActiveKey` (or controlled `activeKey`) on the parent. That's native.
- **Logo SVGs** export with `preserveAspectRatio="none"` and 100% width/height
  (no intrinsic ratio). Set BOTH `width` and `height` from the viewBox ratio or
  they stretch to the 300px default box.
- **Sample links that go nowhere** use the `DemoLink` helper (`preventDefault`)
  so clicking them doesn't jump the page.

## Deploy
`vercel` (or import the repo at vercel.com). Each branch gets its own preview
URL — use branches to test variants with customers.
