---
name: to-figma
description: Push a prototype route from this repo into Figma as design-system-grounded frames (library component instances + variable bindings, NOT html-to-design). Use when asked to "push <prototype> to Figma", "sync the prototype into Figma", or "build the Figma version of /<slug>". Calibrated on the my-dashboard pilot (Aug 2026).
model: opus
---

# /to-figma — code → Figma push

Rebuild a prototype route (`src/prototypes/<slug>/`) as a proper Figma frame: real library
component instances, variable-bound colors/radii, shared text styles. The output must stay
linked to the design system — never a flat screenshot import.

**Model:** run this skill on **Opus 4.8** (fallback Sonnet 4.6). Fable was used once for
calibration only; this recipe is designed so a smaller model can follow it mechanically.

## 0. Prerequisites

- Figma MCP connected (SanMar org seat). Permissions: figma MCP is fully allowlisted at the
  project level; if prompts appear, the culprit is `ask` rules in `~/.claude/settings.json`
  (user-level ask beats project allow — remove them, don't fight the allowlist).
- **MANDATORY:** load both MCP skill resources BEFORE any `use_figma` call:
  `skill://figma/figma-use/SKILL.md` and `skill://figma/figma-generate-design/SKILL.md`
  (via ReadMcpResourceTool, server `figma`). Pass
  `skillNames: "resource:figma-use,resource:figma-generate-design"` on every `use_figma` call.

## 1. Scope questions (ask, don't assume)

Confirm with the user before building: which persona/data state, which breakpoint (default:
desktop 1440 only), full color (default: yes — ignore the prototype's lo-fi grayscale filter),
and exclusions (default: exclude demo chrome like the floating persona switcher).

## 2. Figma destination

- File: `CvFIRGi2Q4610lzz343Ns3` ("🌐 My SanMar—Customer Dashboard")
- Page "Incentives Program Dashboard": node `5593:57456` — `await figma.setCurrentPageAsync()`
  **at the start of every `use_figma` call** (page context resets between calls).
- Libraries enabled on the file: "Design System - Foundation 1.2", "Brand Logo Components".
- Reference build (pilot output, copy its structure): wrapper `5599:6844` on that page.

## 3. Resolved design-system keys (Foundation 1.2)

Components (`importComponentSetByKeyAsync` unless noted):
| Component | Key | Notes |
|---|---|---|
| Header (set) | `0dd313d8f23207290397190df493b61138fc1c10` | variants Screen size × Logged in; bool prop `Breadcrumbs#8207:0` |
| Footer (set) | `2e51bc196b4a73f9963f4ccc48987d610429f753` | variant names exactly `Screen size=Desktop` etc.; instance + `layoutSizingHorizontal='FILL'` |
| Badge (set) | `114458243638a5a63a38c550a482df7c0a5fa78c` | TEXT prop `Content#122:7`; variants Style/Color/Size (e.g. `Style=Normal, Color=Warning, Size=H6`) |
| Button (set) | `33362e99628b8b90e4d307c0faa3e462eb71b434` | **`Style` incl. `Link`** (+Size Large/Normal/Small); TEXT prop `Button Title#570:0` → live-instance CTAs. Link-styled prototype CTAs (`<Button variant="link">`, disclosure toggles) map here — do NOT render as plain text |
| Info Tooltip | `c8c5c4575bd05f8956d5d07013c4de4164093ec9` | single component (`importComponentByKeyAsync`); `resize(14,14)` next to 20px titles |
| Logo-SanMar (set) | `9767e5e7f734c2842eae88182e65bfc1f7810157` | |
| Divider | `73fc609f21ac3c559de84b3660910d9315cea61f` | |
| Modal (set) | `94ac02e16b2535bc05f581c0bbecae6ec3a28f40` | Size Small=300/Medium=500/Large=800/XL=1140; bool `Modal Header#136:0`/`Modal Footer#136:6`/`Close Button#136:12`. Body slot NOT parameterized → detach to host custom body (Close Button survives as live instance) |
| Table Cell (set) | `12c9f2a4dce94939cfb615d508b2578111dc36ce` | build tables as rows of cells. Type=Table Data/Table Header, `Horizontal Dividers=On` for row borders. Content text NOT an exposed prop → override nested TEXT. Right-align a column via `cell.counterAxisAlignItems='MAX'`. Cells transparent → row-level fill tints current row |
| Alert Banner (set) | `a89d2c9a513376abab1e0d7f4021fafc81d9ae7c` | Style incl. Warning/Info/Light; bool `Icon`/`Close Button`. **Multi-paragraph = LIVE instance**: nested `Alert Content` has `Blocks=1..12` (block 1 = Body, rest = Instance Swap slots → `swapComponent` a Body, set `Content#94:0`; force wrap with block text `textAutoResize='HEIGHT'`+`layoutSizingHorizontal='FILL'`). Body set `2c11915515467c9b69f505c908568b31d3ead9a8` |

No ProgressBar component is published → build bars manually: track = auto-layout frame, FILL
width, height 8, cornerRadius 4, fill bound to `body-secondary-bg`, `clipsContent = true`;
fill child = fixed-width frame (inner width × fraction), height 8, cornerRadius 4, `primary`.

### Discover + read the content model BEFORE building (hard rule)

1. **`search_design_system` per element, every time.** The table above is not exhaustive — it
   was calibrated on the pilot page. For each element in the prototype (modal, table, alert,
   CTA link, badge, pill…) run a discovery search before hand-building. Silence in this table ≠
   absence in the library. Missing this is the #1 recurring error.
2. **Inspect the nested content component's OWN `componentPropertyDefinitions` + variants before
   concluding a component "can't hold the content."** Many DS components hide their real content
   model one level down: a nested `Alert Content`/`Body`/`Content` instance may expose a
   `Blocks=1..N` count variant, INSTANCE_SWAP slots, or TEXT props. Reading only the top-level
   instance's props (and seeing a single "Content" text) and pattern-matching to "locked slot →
   detach" is the trap that produced a wrongly-detached alert. **Detaching is the LAST resort** —
   only after confirming the nested content component genuinely can't express the content via
   block-count, instance-swap, or exposed text/size props. When a component DOES expose text
   (Button Title, Badge Content) or blocks (Alert Content), keep it a **live linked instance** and
   fill it; override nested text/fills/fontName directly (allowed on live instances) for
   bold/color that isn't a variant.

Variables (`figma.variables.importVariableByKeyAsync`):
| Variable | Key |
|---|---|
| body-bg (card/page bg) | `f90d083bf3ec8defe75de77f50e457e052ee7b97` |
| body-color (default text) | `e2695b77a1cde832d33124d99731c120f0f93c3a` |
| body-secondary-color (muted text) | `d125d2d90f7518ce796e65b7f2824b2c7f012a00` |
| body-secondary-bg (progress track) | `3000f1639622b471853c095bee2086ec08e9b7bd` |
| text-primary (links) | `075f02eb141d2e30784ae18d3377b1a84ede0b7d` |
| border-color | `c693c07ad90caa69557a07dfc1250d3cfd886caa` |
| border-radius | `65fe41ca0466be39be5a94940a3d1fe9eced0fd1` |
| primary | `9b164359e406a138cb52a0be701fdb60418a98d4` |

Text styles (`figma.importStyleByKeyAsync`, apply via `node.textStyleId`):
Heading/H3 `7530a22dc9589e7a60f2dc4cba6c30a3cfce66ef` (page H1) · Heading/H5
`30f5eba14e978d58dc00838620d4bac8ebdb0000` (section H2s) · Body/Regular
`17eaf2cdf9674c4ff1671d56f45701413d55681f` (16px) · Body/Small
`ee1ce5dad026cf1d16e8aeda82ab48ee000ae8cc` (14px).

Font: **Inter**, style names have spaces: `"Medium"`, `"Semi Bold"` (never "SemiBold").
`loadFontAsync` every style you touch, including before applying text styles.

## 4. Build recipe (structure that worked)

Work in `use_figma` calls of **≤10 logical ops**, returning all created node IDs each call.
Failed scripts are atomic — read the error, fix, retry; never rebuild blindly.

1. **Wrapper**: vertical auto-layout frame, 1440 fixed wide, HUG height, positioned clear of
   existing content on the page.
2. **Header instance** (Desktop / Logged in=true / Breadcrumbs=false), FILL width.
3. **Container**: padding 72 sides / 24 vertical, gap 16 → breadcrumb text → **layout row**
   (horizontal, gap 32) → **sidebar** (200 fixed; make a local "Sidebar Item" component with a
   Label TEXT prop, one-off bold row for active state, hairline dividers) + **main col**
   (fill remaining width, `itemSpacing: 0`).
4. **Spacer-frame pattern** for vertical rhythm in the main col and inside cards: empty frames
   (`fills = []`, fixed height 4/8/12/16/24/48, FILL width) instead of itemSpacing — mirrors
   Bootstrap's per-element margins exactly.
5. **Cards**: DS Card has no content slot → manual auto-layout frames, padding 24, stroke bound
   to `border-color` (weight 1), all four corner radii bound to `border-radius` (bind each of
   `topLeftRadius`…`bottomRightRadius`; there is no single bindable `cornerRadius`), fill
   bound to `body-bg`.
6. **Money figures**: Inter Semi Bold 40; de-emphasized cents via
   `setRangeFontSize(centsStart, end, 22)`. Mixed-emphasis lines: `setRangeFontName` for bold
   spans, `setRangeFills` with a `setBoundVariableForPaint` paint for secondary/link spans —
   compute ranges with `characters.indexOf(...)`, don't hand-count.
7. **Icons** (chevrons etc.): `figma.createNodeFromSvg` with the Bootstrap Icons path (include
   explicit width/height + viewBox), resize to 12, bind vector fills to `text-primary`.
   Never rebuild icons from primitives.
8. **Wrapping text**: `textAutoResize = 'HEIGHT'` + `layoutSizingHorizontal = 'FILL'`
   (set AFTER appendChild).
9. **Footer instance** appended to the wrapper last, FILL width.

## 5. Validate against the RUNNING app, not the source

Source strings lie — JS formatting differs (e.g. `currentPct = 3.0` renders as **"3%"**, not
"3.0%"; `toLocaleString` inserts commas). Always compare against rendered output:

1. `npm run dev -- --port 5199` in `sanmar-prototype-template/`.
2. Headless Chrome screenshot (no install needed):
   `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu
   --hide-scrollbars --window-size=1440,2400 --screenshot=proto.png "http://localhost:5199/<slug>"`
   (grayscale lo-fi filter + persona switcher will show — ignore them, compare layout/text).
3. `get_screenshot` per section AND the full wrapper frame; fix discrepancies with targeted
   scripts, then send both screenshots to the user for approval.

## 6. Follow-up investment (noted, not yet done)

Add **Code Connect mappings** (`*.figma.tsx` next to react-bootstrap wrappers) so future
pushes resolve component keys automatically instead of relying on the key table above.
