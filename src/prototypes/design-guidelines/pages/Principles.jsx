import { DocsPage, PageHeader, H2 } from '../components/docs.jsx'

const PRINCIPLES = [
  {
    n: '01',
    title: 'Clarity over cleverness',
    body: 'SanMar customers are working — placing orders, tracking returns, decorating apparel. Interfaces should make the next step obvious. Prefer plain language, familiar patterns, and a single clear action over novelty that needs to be learned.',
  },
  {
    n: '02',
    title: 'Consistent, not uniform',
    body: 'Reuse the same components, spacing, and words for the same jobs so the product feels like one system. Consistency builds trust and speed; it does not mean every screen looks identical — it means nothing is surprising.',
  },
  {
    n: '03',
    title: 'Built on the brand',
    body: 'Every screen should feel unmistakably SanMar — warm, honest, and helpful. The palette, typography, logo, and voice aren’t decoration applied at the end; they’re the starting point. When in doubt, lean on the tokens, the documented components, and the values behind them: Be Nice. Tell the Truth.',
  },
  {
    n: '04',
    title: 'Accessible by default',
    body: 'The baseline — color contrast, visible focus, keyboard operability, meaningful labels — is not an enhancement to add later. It ships with the component. If a pattern excludes someone, it is not finished.',
  },
  {
    n: '05',
    title: 'Fast to feel, fast to ship',
    body: 'Perceived speed is a feature: show state, avoid dead ends, keep flows short. Behind the scenes, the system optimizes for quick iteration so a good idea can become a clickable prototype the same day.',
  },
]

export default function Principles() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Brand"
        title="Design principles"
        lead="Five ideas that guide how we make decisions when the spec runs out. They turn our brand values — Be Nice, Tell the Truth — into everyday design choices, whether you're building a full flow or picking between two buttons."
      />

      {PRINCIPLES.map((p) => (
        <section key={p.n} className="mb-5">
          <div className="d-flex align-items-baseline gap-3 mb-2">
            <span
              className="fw-medium"
              style={{ fontSize: '1.5rem', color: 'var(--bs-primary)', fontFamily: 'var(--bs-font-serif, Georgia), serif' }}
            >
              {p.n}
            </span>
            <h2 id={p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} style={{ margin: 0 }}>
              {p.title}
            </h2>
          </div>
          <p className="text-body" style={{ maxWidth: '62ch' }}>{p.body}</p>
        </section>
      ))}
    </DocsPage>
  )
}
