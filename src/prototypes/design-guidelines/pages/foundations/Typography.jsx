import { DocsPage, PageHeader, H2, Callout, SpecTable, Do, Dont, DoDont } from '../../components/docs.jsx'

const HEADINGS = [
  ['h1', 'Heading 1', '2.5rem', '40px'],
  ['h2', 'Heading 2', '2rem', '32px'],
  ['h3', 'Heading 3', '1.75rem', '28px'],
  ['h4', 'Heading 4', '1.5rem', '24px'],
  ['h5', 'Heading 5', '1.25rem', '20px'],
  ['h6', 'Heading 6', '1rem', '16px'],
]

export default function Typography() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        lead="Two typefaces do all the work: Inter for interface text and headings, Libre Baskerville for expressive display moments. A shared scale keeps hierarchy consistent."
      />

      <H2>Typefaces</H2>
      <div className="row g-3 my-2">
        <div className="col-md-6">
          <div className="border rounded p-4 h-100">
            <div className="text-secondary small mb-2">Sans · Inter</div>
            <div style={{ fontFamily: 'var(--bs-font-sans-serif)', fontSize: '2rem', lineHeight: 1.1 }}>Aa Gg Rr</div>
            <div style={{ fontFamily: 'var(--bs-font-sans-serif)' }} className="mt-2">
              The workhorse. Body copy, labels, headings, data.
            </div>
            <div className="text-secondary small mt-2">Weights 400 · 500 · 700</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border rounded p-4 h-100">
            <div className="text-secondary small mb-2">Serif · Libre Baskerville</div>
            <div className="display-6" style={{ margin: 0 }}>Aa Gg Rr</div>
            <div className="mt-2">Display headings and editorial moments only.</div>
            <div className="text-secondary small mt-2">Weights 400 · 700</div>
          </div>
        </div>
      </div>

      <H2>Type scale</H2>
      <p>
        Headings use Inter at weight 500. Pick a level by hierarchy, not by size — skipping
        levels for a specific pixel value breaks the document outline.
      </p>
      <div className="my-3">
        {HEADINGS.map(([tag, label, rem, px]) => {
          const Tag = tag
          return (
            <div key={tag} className="d-flex align-items-baseline gap-3 border-bottom py-2">
              <Tag style={{ margin: 0 }}>{label}</Tag>
              <code className="small text-secondary ms-auto">{px} · {rem}</code>
            </div>
          )
        })}
      </div>

      <H2>Display &amp; body</H2>
      <div className="my-3">
        <div className="text-secondary small mb-2">Display (serif) — for hero moments</div>
        <div className="display-5 mb-1">Together, for Good.</div>
        <div className="text-secondary small mb-2 mt-4">Body sizes</div>
        <p className="lead mb-1">Lead — 20px, for introductions and standfirst copy.</p>
        <p className="mb-1">Body — 16px, the default for running text.</p>
        <p className="small mb-0 text-secondary">Small — 14px, for captions, help text, and metadata.</p>
      </div>

      <H2>Usage</H2>
      <DoDont>
        <Do preview={
          <div className="text-start">
            <div style={{ fontSize: '1.5rem', fontWeight: 500 }}>Order summary</div>
            <div className="text-secondary" style={{ fontSize: '0.9rem' }}>3 items · shipped</div>
          </div>
        }>
          Pair one clear heading with supporting text at a smaller, lighter size to build
          hierarchy.
        </Do>
        <Dont preview={
          <div className="text-start">
            <div className="display-6" style={{ fontFamily: 'var(--bs-font-serif), serif' }}>Order</div>
          </div>
        }>
          Use the serif display face for interface labels or long text — it's for occasional
          impact, not everyday reading.
        </Dont>
      </DoDont>

      <SpecTable
        head={['Token', 'Value', 'Use']}
        rows={[
          [<code>$font-family-sans-serif</code>, 'Inter', 'All UI text and headings'],
          [<code>$display-font-family</code>, 'Libre Baskerville', 'Display / hero headings'],
          [<code>$headings-font-weight</code>, '500', 'Heading weight'],
          [<code>$font-size-base</code>, '1rem (16px)', 'Body baseline'],
        ]}
      />

      <Callout variant="info" title="Keep line length readable">
        Aim for 45–75 characters per line for running text. The docs content column caps at
        about 68 characters for exactly this reason.
      </Callout>
    </DocsPage>
  )
}
