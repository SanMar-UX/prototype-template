import { DocsPage, PageHeader, H2, Callout, SpecTable } from '../../components/docs.jsx'

const SCALE = [
  [1, '4px', '.25rem', ''],
  [2, '8px', '.5rem', ''],
  [3, '16px', '1rem', ''],
  [4, '24px', '1.5rem', ''],
  [5, '48px', '3rem', ''],
  [6, '64px', '4rem', 'custom'],
]

export default function Spacing() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing & layout"
        lead="A small, consistent spacing scale creates rhythm and makes layouts feel intentional. Use the steps — not arbitrary pixel values — for margin, padding, and gaps."
      />

      <H2>The spacer scale</H2>
      <p>
        Six steps power every spacing utility (<code>m-*</code>, <code>p-*</code>,{' '}
        <code>gap-*</code>). Steps 1–5 are Bootstrap's defaults; SanMar adds a sixth step for
        generous section spacing.
      </p>
      <div className="my-3">
        {SCALE.map(([step, px, rem, note]) => (
          <div key={step} className="d-flex align-items-center gap-3 py-2 border-bottom">
            <code className="text-secondary" style={{ width: 24 }}>{step}</code>
            <div style={{ height: 20, width: rem, background: 'var(--bs-primary)', borderRadius: 3 }} />
            <code className="small text-secondary">{px} · {rem}{note ? ` · ${note}` : ''}</code>
          </div>
        ))}
      </div>

      <H2>Applying it</H2>
      <p>
        Prefer utility classes that reference the scale over inline styles. This keeps spacing
        consistent and lets the whole gallery shift rhythm from one place if the scale changes.
      </p>
      <SpecTable
        head={['Need', 'Reach for', 'Example']}
        rows={[
          ['Space between related items', 'gap-2 / gap-3', 'Buttons in a row, form fields'],
          ['Padding inside a card or panel', 'p-4 (24px)', 'Matches the card default'],
          ['Space between sections', 'mb-5 / mb-6', 'Major content blocks'],
          ['Tight label-to-control', 'mb-1 / mb-2', 'Field label above its input'],
        ]}
      />

      <H2>Layout &amp; grid</H2>
      <p>
        Page content sits inside a centered container; within it, the 12-column responsive
        grid handles multi-column layouts. Let content reflow at breakpoints rather than
        fixing widths — the same prototype should be usable on a laptop and a phone.
      </p>
      <div className="my-3">
        <div className="row g-2 text-center" style={{ fontSize: '0.8rem' }}>
          {[6, 6, 4, 4, 4, 3, 3, 3, 3].map((n, i) => (
            <div key={i} className={`col-${n}`}>
              <div className="rounded py-2" style={{ background: 'var(--bs-primary-bg-subtle)', color: 'var(--bs-primary-text-emphasis)' }}>
                {n}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Callout variant="warning" title="Avoid off-scale values">
        A one-off <code>margin: 13px</code> quietly breaks the rhythm and is impossible to
        keep consistent. If nothing on the scale fits, that's usually a sign the layout needs
        rethinking — not a new value.
      </Callout>
    </DocsPage>
  )
}
