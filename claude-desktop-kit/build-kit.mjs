// =============================================================================
// build-kit.mjs — regenerates the Claude Desktop kit from the design system.
// =============================================================================
// Compiles (a) stock Bootstrap and (b) the SanMar-themed build from the same
// Bootstrap version in node_modules, then diffs the two compiled sheets at the
// declaration level. The output, sanmar-overrides.css, contains ONLY what SanMar
// changes on top of stock Bootstrap. Claude artifacts load it from this repo via
// jsDelivr (a CDN on the artifact allowlist), layered after the cdnjs Bootstrap
// <link> — so committing + pushing this file IS how a change reaches artifacts.
//
// Run after /sync-tokens or any _theme/_components change:
//   node claude-desktop-kit/build-kit.mjs
//
// Also assembles example-prototype.html (CDN Bootstrap + overrides + the
// header/footer snippets) — open it in a browser next to localhost:5173 to
// eyeball that the kit matches the real design system.
// =============================================================================

import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'

const KIT = dirname(fileURLToPath(import.meta.url))
const REPO = join(KIT, '..')
const BOOTSTRAP_VERSION = JSON.parse(
  readFileSync(join(REPO, 'node_modules/bootstrap/package.json'), 'utf8'),
).version

// --- 1. Compile stock + SanMar sheets ----------------------------------------
// stock.scss mirrors main.scss's module list exactly, minus every SanMar layer
// (theme, spacer-6, _components, body rule) — so the diff is pure brand delta.
const STOCK_SCSS = `
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/variables-dark";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/reboot";
@import "bootstrap/scss/type";
@import "bootstrap/scss/images";
@import "bootstrap/scss/containers";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/tables";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/buttons";
@import "bootstrap/scss/transitions";
@import "bootstrap/scss/dropdown";
@import "bootstrap/scss/button-group";
@import "bootstrap/scss/nav";
@import "bootstrap/scss/navbar";
@import "bootstrap/scss/card";
@import "bootstrap/scss/accordion";
@import "bootstrap/scss/breadcrumb";
@import "bootstrap/scss/pagination";
@import "bootstrap/scss/badge";
@import "bootstrap/scss/alert";
@import "bootstrap/scss/progress";
@import "bootstrap/scss/list-group";
@import "bootstrap/scss/close";
@import "bootstrap/scss/toasts";
@import "bootstrap/scss/modal";
@import "bootstrap/scss/tooltip";
@import "bootstrap/scss/popover";
@import "bootstrap/scss/spinners";
@import "bootstrap/scss/offcanvas";
@import "bootstrap/scss/placeholders";
@import "bootstrap/scss/helpers";
@import "bootstrap/scss/utilities/api";
`

const tmp = mkdtempSync(join(tmpdir(), 'sanmar-kit-'))
writeFileSync(join(tmp, 'stock.scss'), STOCK_SCSS)

function compile(inFile, outFile) {
  execFileSync(
    join(REPO, 'node_modules/.bin/sass'),
    [
      `--load-path=${join(REPO, 'node_modules')}`,
      '--style=expanded',
      '--no-source-map',
      '--quiet-deps',
      '--silence-deprecation=import',
      '--silence-deprecation=color-functions',
      '--silence-deprecation=global-builtin',
      inFile,
      outFile,
    ],
    { stdio: ['ignore', 'inherit', 'inherit'] },
  )
  return readFileSync(outFile, 'utf8')
}

console.log(`Compiling stock Bootstrap ${BOOTSTRAP_VERSION} + SanMar theme…`)
const stockCss = compile(join(tmp, 'stock.scss'), join(tmp, 'stock.css'))
const sanmarCss = compile(join(REPO, 'src/styles/main.scss'), join(tmp, 'sanmar.css'))

// --- 2. Diff the two sheets ---------------------------------------------------
// Key every rule by its at-rule context + selector. For duplicate selectors the
// declaration map is merged last-wins, which matches how the cascade resolves
// same-specificity rules — and our override sheet loads after all of stock.
const norm = (v) => v.replace(/\s+/g, ' ').trim()

function contextOf(node) {
  const parts = []
  for (let p = node.parent; p && p.type === 'atrule'; p = p.parent) {
    parts.unshift(`@${p.name} ${norm(p.params)}`)
  }
  return parts.join(' | ')
}

function declMap(rule, into = new Map()) {
  rule.walkDecls((d) => {
    if (d.parent !== rule) return // nested (shouldn't happen post-compile)
    into.set(d.prop, norm(d.value) + (d.important ? ' !important' : ''))
  })
  return into
}

const stock = new Map()
postcss.parse(stockCss).walkRules((rule) => {
  const key = `${contextOf(rule)}||${norm(rule.selector)}`
  declMap(rule, stock.get(key) ?? stock.set(key, new Map()).get(key))
})

// Merge SanMar declarations per key too — a selector can appear twice (e.g.
// Bootstrap's body + our custom body rule) and the drift check below must
// compare stock against the UNION of them, not each instance alone.
const sanmarRoot = postcss.parse(sanmarCss)
const sanmarMerged = new Map()
sanmarRoot.walkRules((rule) => {
  const key = `${contextOf(rule)}||${norm(rule.selector)}`
  declMap(rule, sanmarMerged.get(key) ?? sanmarMerged.set(key, new Map()).get(key))
})

// Collect override rules in source order as {context, selector, decls[]}
const out = []
let dropped = 0
for (const [key, stockDecls] of stock) {
  const sm = sanmarMerged.get(key)
  for (const p of stockDecls.keys()) if (!sm || !sm.has(p)) dropped++
}
sanmarRoot.walkRules((rule) => {
  if (rule.parent?.type === 'atrule' && rule.parent.name === 'keyframes') {
    // keyframe steps: only include if the whole @keyframes block is SanMar-only
    // (none are today — both sheets ship identical Bootstrap keyframes)
    return
  }
  const context = contextOf(rule)
  const stockDecls = stock.get(`${context}||${norm(rule.selector)}`)
  const decls = []
  rule.walkDecls((d) => {
    if (d.parent !== rule) return
    const v = norm(d.value) + (d.important ? ' !important' : '')
    if (!stockDecls || stockDecls.get(d.prop) !== v) decls.push(`${d.prop}: ${v}`)
  })
  if (decls.length) out.push({ context, selector: norm(rule.selector), decls })
})

// --- 3. Emit compact CSS, grouping consecutive same-context rules -------------
const HEADER = `/* ============================================================================
   SanMar design-system overrides for stock Bootstrap ${BOOTSTRAP_VERSION}
   ----------------------------------------------------------------------------
   GENERATED by claude-desktop-kit/build-kit.mjs — do not edit by hand.
   Load AFTER bootstrap.min.css (cdnjs). Contains only the delta between stock
   Bootstrap and the SanMar theme (tokens, radii, header/footer chrome, …).
   ============================================================================ */
`
let css = HEADER
let openContext = null
let openDepth = 0
const closeContext = () => { css += '}\n'.repeat(openDepth); openDepth = 0 }
for (const { context, selector, decls } of out) {
  if (context !== openContext) {
    closeContext()
    if (context) {
      const parts = context.split(' | ')
      css += parts.map((c) => `${c} {`).join(' ') + '\n'
      openDepth = parts.length
    }
    openContext = context || null
  }
  const indent = openDepth ? '  ' : ''
  css += `${indent}${selector} { ${decls.join('; ')} }\n`
}
closeContext()
writeFileSync(join(KIT, 'sanmar-overrides.css'), css)

// --- 4. Inline the logo SVGs into the snippets ---------------------------------
// The source snippets carry {{NAME:WxH}} placeholders; the shipped snippets get
// the real SVG inlined (artifacts can't load external images). The public/ SVGs
// export with width/height=100% and no intrinsic ratio (see CLAUDE.md gotcha),
// so explicit pixel dimensions are substituted in.
const ASSETS = {
  LOGO_BLUE: readFileSync(join(REPO, 'public/header/sanmar-logo-blue.svg'), 'utf8'),
  LOGO_WHITE: readFileSync(join(REPO, 'public/footer/sanmar-logo-white.svg'), 'utf8'),
  SHOPPING_BOX: readFileSync(join(REPO, 'public/header/shopping-box.svg'), 'utf8'),
}
function inlineAssets(html) {
  return html.replace(/\{\{(\w+):(\d+)x(\d+)\}\}/g, (_, name, w, h) => {
    const svg = ASSETS[name]
    if (!svg) throw new Error(`unknown snippet asset ${name}`)
    return svg
      .replace('width="100%" height="100%"', `width="${w}" height="${h}"`)
      .trim()
  })
}
const header = inlineAssets(readFileSync(join(KIT, 'snippets/site-header.src.html'), 'utf8'))
const footer = inlineAssets(readFileSync(join(KIT, 'snippets/site-footer.src.html'), 'utf8'))
const body = readFileSync(join(KIT, 'snippets/example-body.html'), 'utf8')
writeFileSync(join(KIT, 'site-header.html'), header)
writeFileSync(join(KIT, 'site-footer.html'), footer)
const example = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>SanMar Prototype (Claude Desktop kit example)</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Libre+Baskerville:wght@400;700&display=swap" rel="stylesheet">
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/${BOOTSTRAP_VERSION}/css/bootstrap.min.css" rel="stylesheet">
<style>
${css}
</style>
</head>
<body class="d-flex flex-column min-vh-100">
${header}
<main class="container py-5 flex-grow-1">
${body}
</main>
${footer}
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/${BOOTSTRAP_VERSION}/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`
writeFileSync(join(KIT, 'example-prototype.html'), example)

rmSync(tmp, { recursive: true, force: true })
console.log(`sanmar-overrides.css: ${out.length} rules, ${(css.length / 1024).toFixed(1)} KB`)
console.log(`stock-only declarations not overridable (should stay 0-ish): ${dropped}`)
console.log('example-prototype.html assembled.')
