# Claude Desktop kit — SanMar prototyping without VS Code

For teammates who won't touch VS Code / git: this kit packages the SanMar
design system as a **claude.ai Project**, so their prototypes in plain Claude
Desktop come out on-brand as shareable artifacts. No repo, no localhost, no
deploy — the design system travels as a small CSS file.

## How it works

Claude artifacts run under a strict security policy that only allows external
files from a short CDN allowlist — which includes both `cdnjs.cloudflare.com`
and `cdn.jsdelivr.net`. So an artifact loads stock Bootstrap from cdnjs, then
loads `sanmar-overrides.css` straight from this GitHub repo via jsDelivr:

```
https://cdn.jsdelivr.net/gh/SanMar-UX/prototype-template@main/claude-desktop-kit/sanmar-overrides.css
```

That file is the mechanically-extracted **delta** between stock Bootstrap 5.3.8
and our compiled SanMar theme (~29 KB — tokens, radii, pagination tint, header/
footer chrome, everything). CDN Bootstrap + this delta = pixel-identical to the
gallery's stylesheet. Linking it (rather than pasting it into every artifact)
means Claude never has to transcribe 29 KB, and updates propagate automatically
when the repo changes. The Project instructions also carry HTML ports of
`SiteHeader`/`SiteFooter`, which Claude does copy into each artifact.

> Requires this repo to stay **public** (jsDelivr only serves public repos) on
> branch `main`. jsDelivr caches the `@main` URL for up to ~12 hours, so pushed
> changes reach artifacts within that window.

## One-time setup (owner, ~10 minutes)

1. On claude.ai (Team workspace): **Projects → New project** — name it
   "SanMar UX Prototyping".
2. Paste the contents of `PROJECT_INSTRUCTIONS.md` into the project's custom
   instructions.
3. Upload to project knowledge: `site-header.html`, `site-footer.html`.
   (The design-system CSS is NOT uploaded — it loads from jsDelivr.)
4. Share the project with the UX team.

Teammates then open Claude Desktop, pick the project, and type things like
*"build a checkout screen with a shipping form and order summary."* That's the
whole workflow.

## Test it first (this laptop)

- Double-click `example-prototype.html` — a local kitchen-sink page using the
  exact CDN + overrides recipe. Compare against `localhost:5173/design-system`.
- In Claude Desktop, inside the project, ask for a small test prototype and
  check: brand-blue #0077cf buttons with 4px corners, Inter + Libre Baskerville
  type, the SanMar header/footer, working modal. (Google Fonts is on the
  artifact allowlist, so the fonts should load; if they ever don't, text falls
  back to system fonts — acceptable, everything else must hold.)

## Keeping it in sync

After `/sync-tokens`, a `_theme.scss`/`_components.scss` change, or a Bootstrap
version bump:

```
node claude-desktop-kit/build-kit.mjs
```

then **commit and push to `main`** — artifacts load `sanmar-overrides.css` from
jsDelivr, which serves it from the repo, so pushing IS the deploy (within the
~12 h jsDelivr cache window). No re-upload to the claude.ai project is needed
for CSS changes. The script recompiles stock + themed Bootstrap from
`node_modules` and re-extracts the delta; it prints `not overridable: 0` when
the delta is exact.

Only re-upload to the project when the **header/footer** change (re-upload
`site-header.html` / `site-footer.html`). If Bootstrap's version changed, also
update the cdnjs + jsDelivr URLs in `PROJECT_INSTRUCTIONS.md` — the CDN and the
delta must be the same version.

## Files

| File | What it is | Where it's used |
|---|---|---|
| `sanmar-overrides.css` | Generated design-system delta | Served from repo via jsDelivr (push to update) |
| `site-header.html` / `site-footer.html` | Generated chrome ports (logos inlined) | Uploaded to project knowledge |
| `PROJECT_INSTRUCTIONS.md` | Paste into project custom instructions | Pasted into custom instructions |
| `example-prototype.html` | Generated local visual check | Not uploaded |
| `build-kit.mjs` | Regenerates all of the above | Not uploaded |
| `snippets/*.src.html` | Snippet sources ({{logo}} placeholders) | Not uploaded |

## Porting a winner into the real gallery

Artifacts built under these rules are plain Bootstrap 5 markup — the same
component vocabulary as the gallery. Save the artifact HTML, drop it next to
this repo, and ask Claude Code to "port this into a prototype at /<slug>" — it
maps 1:1 onto react-bootstrap + the shared chrome.
