# How theming works

The goal: a prototype should look like SanMar without anyone styling it by hand.
That happens by customizing Bootstrap at the **Sass variable** level, driven by a
single tokens file.

## The three style files

1. **`src/styles/_tokens.scss`** — raw SanMar brand values (`$sm-blue`,
   `$sm-font-sans`, `$sm-radius`, …). This is the *only* file that should hold
   literal hex codes / sizes. It's kept in sync with Figma via `/sync-tokens`.

2. **`src/styles/_theme.scss`** — maps those tokens onto **Bootstrap's** Sass
   variables (`$primary: $sm-blue;`, `$border-radius: $sm-radius;`, …) and
   defines extra brand utility colors. This is the translation layer.

3. **`src/styles/main.scss`** — imports everything in the **correct order** and
   compiles Bootstrap. This order is load-bearing:

   ```
   1. bootstrap/scss/functions   (color helpers our overrides may use)
   2. _theme  (our overrides — MUST come before Bootstrap's variables)
   3. bootstrap/scss/variables + maps + mixins + root
   4. the rest of Bootstrap's components
   ```

   Bootstrap's variables are declared `!default`, so an override only wins if it
   is assigned *before* Bootstrap's variables are imported. That's why `_theme`
   comes first.

## Using the theme in components

- **Prefer react-bootstrap components** (`<Button>`, `<Card>`, `<Navbar>`) — they
  render Bootstrap markup and pick up the theme automatically.
- **Use semantic color names**, never raw hex, in screens:
  - `variant="primary"`, `bg="dark"`, `text-secondary`
  - brand extras: `bg="brand-teal"`, `className="text-brand-navy"`
- Need a new brand color in components? Add it to `_tokens.scss`, expose it in
  `_theme.scss` (`$custom-colors`), and it becomes a Bootstrap utility.

## Why customize Bootstrap instead of using it raw?

Stock Bootstrap looks like stock Bootstrap. By overriding the Sass variables, the
*same* components render in SanMar's colors, type, and shape — so prototypes are
on-brand and still use the exact component vocabulary production references.

## Trimming the CSS bundle

`main.scss` imports the full Bootstrap component set for convenience. If you want
a smaller build, delete the `@import` lines for components your prototype doesn't
use (everything below the `// 4. The rest of Bootstrap` comment is safe to trim).
