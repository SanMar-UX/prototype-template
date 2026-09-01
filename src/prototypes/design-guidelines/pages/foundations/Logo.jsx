import { DocsPage, PageHeader, H2, Callout, Do, Dont, DoDont } from '../../components/docs.jsx'

const LOGO_RATIO = 294 / 60

export default function Logo() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Logo & brand"
        lead="The SanMar wordmark is the most visible expression of the brand. Give it room, keep it legible, and use the right version for the background."
      />

      <H2>The wordmark</H2>
      <p>
        The default lockup is the SanMar wordmark. Two color treatments cover nearly every
        surface: brand blue on light backgrounds, and white on dark or photographic ones.
      </p>
      <div className="row g-3 my-2">
        <div className="col-md-6">
          <div className="border rounded d-flex align-items-center justify-content-center p-4" style={{ minHeight: 140 }}>
            <img src="/header/sanmar-logo-blue.svg" alt="SanMar" height={48} width={Math.round(48 * LOGO_RATIO)} />
          </div>
          <div className="text-secondary small mt-2">Brand blue — on light surfaces</div>
        </div>
        <div className="col-md-6">
          <div className="rounded d-flex align-items-center justify-content-center p-4" style={{ minHeight: 140, background: 'var(--dg-navy)' }}>
            <img src="/footer/sanmar-logo-white.svg" alt="SanMar" height={48} width={Math.round((48 * 168) / 34.7263)} />
          </div>
          <div className="text-secondary small mt-2">White — on dark / photo surfaces</div>
        </div>
      </div>
      <p className="text-secondary">
        The brand also defines Horizontal (with the “Together, for Good.” tagline), Vertical,
        and Stacked lockups for specific contexts. Prototypes ship the default wordmark, reused
        in the site header and footer.
      </p>

      <H2>Clear space &amp; size</H2>
      <p>
        Keep a margin of clear space around the wordmark equal to the height of the “S” — no
        text, icons, or edges inside it. Don't render the wordmark so small that the letterforms
        stop being crisp.
      </p>

      <H2>Do &amp; don't</H2>
      <DoDont>
        <Do preview={<img src="/header/sanmar-logo-blue.svg" alt="SanMar" height={36} width={Math.round(36 * LOGO_RATIO)} />}>
          Use the supplied SVG at its natural proportions, with generous clear space.
        </Do>
        <Dont preview={<img src="/header/sanmar-logo-blue.svg" alt="SanMar distorted" height={44} width={90} style={{ objectFit: 'fill' }} />}>
          Stretch, squash, recolor, or rotate the wordmark. Always scale width and height
          together.
        </Dont>
      </DoDont>
      <DoDont>
        <Do preview={
          <div className="rounded d-flex align-items-center justify-content-center px-4 py-3" style={{ background: 'var(--dg-navy)' }}>
            <img src="/footer/sanmar-logo-white.svg" alt="SanMar" height={30} width={Math.round((30 * 168) / 34.7263)} />
          </div>
        }>
          Switch to the white wordmark whenever the background is dark or busy, so it stays
          legible.
        </Do>
        <Dont preview={
          <div className="rounded d-flex align-items-center justify-content-center px-4 py-3" style={{ background: 'var(--dg-navy)' }}>
            <img src="/header/sanmar-logo-blue.svg" alt="SanMar low contrast" height={30} width={Math.round(30 * LOGO_RATIO)} />
          </div>
        }>
          Place the blue wordmark on a dark background where it disappears.
        </Dont>
      </DoDont>

      <Callout variant="info" title="Logo SVGs have no intrinsic ratio">
        The exported wordmark SVGs are set to 100% width/height. Always set both the{' '}
        <code>width</code> and <code>height</code> from the viewBox ratio (294 : 60) so the
        image doesn't stretch to the default box.
      </Callout>
    </DocsPage>
  )
}
