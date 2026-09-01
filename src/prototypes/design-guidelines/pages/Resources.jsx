import { Link } from 'react-router-dom'
import { DocsPage, PageHeader, H2, Callout, SpecTable } from '../components/docs.jsx'
import { IconArrowRight, IconExternal } from '../components/icons.jsx'

const LINKS = [
  { label: 'Live component catalog', to: '/design-system', desc: 'Every component variant, values read from the compiled theme.', internal: true },
  { label: 'SanMar Figma library', href: '#', desc: 'Foundation 1.2 — the source of truth for tokens and components.' },
  { label: 'Prototype repository', href: '#', desc: 'The gallery source. Clone it, then use the three-step workflow.' },
]

export default function Resources() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Guidance"
        title="Resources"
        lead="Where the design system lives, how it stays in sync, and where to go next."
      />

      <H2>Links</H2>
      <div className="d-flex flex-column gap-3 my-3">
        {LINKS.map((l) => {
          const inner = (
            <>
              <div>
                <div className="fw-medium d-inline-flex align-items-center gap-2">
                  {l.label} {l.internal ? <IconArrowRight /> : <IconExternal size="0.85em" />}
                </div>
                <div className="text-secondary" style={{ fontSize: '0.9rem' }}>{l.desc}</div>
              </div>
            </>
          )
          return l.internal ? (
            <Link key={l.label} to={l.to} className="dg-tile" style={{ textDecoration: 'none' }}>{inner}</Link>
          ) : (
            <a key={l.label} href={l.href} onClick={(e) => e.preventDefault()} className="dg-tile" style={{ textDecoration: 'none' }}>{inner}</a>
          )
        })}
      </div>

      <H2>How the system stays in sync</H2>
      <p>
        Brand values — colors, type, spacing — live in a single tokens file that maps onto the
        themed component library. That file is kept in sync with the SanMar Figma library, so a
        change made once in Figma flows to every prototype in the gallery. Screens never
        hard-code brand values; they reference the tokens.
      </p>
      <SpecTable
        head={['Layer', 'Lives in', 'Role']}
        rows={[
          ['Design tokens', 'Figma → tokens file', 'The single source of brand values'],
          ['Themed components', 'Shared foundation', 'Bootstrap, restyled with the tokens'],
          ['Prototypes', 'Per-prototype folders', 'Compose components into flows'],
        ]}
      />

      <H2>Contributing</H2>
      <p>
        Found a gap — a missing token, a component that needs guidance, a pattern worth
        documenting? That's how the system grows. Add it in the right layer (a token in the
        tokens file, guidance on the relevant page) so the whole gallery benefits, rather than
        patching one screen.
      </p>

      <Callout variant="info" title="Start building">
        Ready to make something? Head back to{' '}
        <Link to="/design-guidelines/getting-started">Using the system</Link> for the
        three-step workflow, or browse the{' '}
        <Link to="/design-guidelines/components">components</Link> to see what's available.
      </Callout>
    </DocsPage>
  )
}
