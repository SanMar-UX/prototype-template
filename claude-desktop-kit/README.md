# Claude Desktop kit — SanMar prototyping without VS Code

For teammates who won't touch VS Code / git: this kit packages the SanMar
design system as a **claude.ai Project**, so their prototypes in plain Claude
Desktop come out on-brand as shareable artifacts. No repo, no localhost, no
deploy — the design system travels as a small CSS file.

## How it works

Artifacts can load stock Bootstrap from cdnjs. `sanmar-overrides.css` is the
mechanically-extracted **delta** between stock Bootstrap 5.3.8 and our compiled
SanMar theme (~29 KB — tokens, radii, pagination tint, header/footer chrome,
everything). CDN Bootstrap + this delta = pixel-identical to the gallery's
stylesheet. The Project instructions make Claude inline the delta into every
artifact, plus HTML ports of `SiteHeader`/`SiteFooter`.

## One-time setup (owner, ~10 minutes)

1. On claude.ai (Team workspace): **Projects → New project** — name it
   "SanMar UX Prototyping".
2. Paste the contents of `PROJECT_INSTRUCTIONS.md` into the project's custom
   instructions.
3. Upload to project knowledge: `sanmar-overrides.css`, `site-header.html`,
   `site-footer.html`.
4. Share the project with the UX team.

Teammates then open Claude Desktop, pick the project, and type things like
*"build a checkout screen with a shipping form and order summary."* That's the
whole workflow.

## Test it first (this laptop)

- Double-click `example-prototype.html` — a local kitchen-sink page using the
  exact CDN + overrides recipe. Compare against `localhost:5173/design-system`.
- In Claude Desktop, inside the project, ask for a small test prototype and
  check: brand-blue #0077cf buttons with 4px corners, Inter type, the SanMar
  header/footer, working modal. If the Google Fonts link is blocked by the
  artifact sandbox, text falls back to system fonts — acceptable; everything
  else must hold.

## Keeping it in sync

After `/sync-tokens`, a `_theme.scss`/`_components.scss` change, or a Bootstrap
version bump:

```
node claude-desktop-kit/build-kit.mjs
```

then re-upload `sanmar-overrides.css` (and the snippets, if the header/footer
changed) to the claude.ai project. The script recompiles stock + themed
Bootstrap from `node_modules` and re-extracts the delta; it prints
`not overridable: 0` when the delta is exact. If Bootstrap's version changed,
the cdnjs URLs in `PROJECT_INSTRUCTIONS.md` must be updated to match — the CDN
and the delta must be the same version.

## Files

| File | What it is | Uploaded to project? |
|---|---|---|
| `sanmar-overrides.css` | Generated design-system delta | Yes |
| `site-header.html` / `site-footer.html` | Generated chrome ports (logos inlined) | Yes |
| `PROJECT_INSTRUCTIONS.md` | Paste into project custom instructions | Pasted |
| `example-prototype.html` | Generated local visual check | No |
| `build-kit.mjs` | Regenerates all of the above | No |
| `snippets/*.src.html` | Snippet sources ({{logo}} placeholders) | No |

## Porting a winner into the real gallery

Artifacts built under these rules are plain Bootstrap 5 markup — the same
component vocabulary as the gallery. Save the artifact HTML, drop it next to
this repo, and ask Claude Code to "port this into a prototype at /<slug>" — it
maps 1:1 onto react-bootstrap + the shared chrome.
