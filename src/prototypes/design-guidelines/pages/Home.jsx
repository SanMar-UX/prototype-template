import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { BASE } from '../data/nav.js'
import { Pager } from '../components/docs.jsx'
import {
  IconArrowRight, GlyphRocket, GlyphStar, GlyphPalette, GlyphBook,
  GlyphGrid, GlyphAccess,
} from '../components/icons.jsx'

const TILES = [
  { to: 'purpose', Icon: GlyphStar, title: 'Purpose & values', text: 'The brand platform every SanMar experience is built on — our why, and “Be Nice. Tell the Truth.”' },
  { to: 'voice-tone', Icon: GlyphBook, title: 'Voice & tone', text: 'How SanMar sounds across every digital touchpoint — because words are part of the product.' },
  { to: 'foundations/color', Icon: GlyphPalette, title: 'Color', text: 'The digital brand palette, semantic roles, and how to apply them.' },
  { to: 'components', Icon: GlyphGrid, title: 'Components', text: 'The full component library with live examples and usage guidance.' },
  { to: 'accessibility', Icon: GlyphAccess, title: 'Accessibility', text: 'The baseline every experience meets — contrast, focus, and semantics.' },
  { to: 'getting-started', Icon: GlyphRocket, title: 'Using the system', text: 'How the gallery is organized and how teammates add a prototype.' },
]

const STATS = [
  ['24+', 'Components'],
  ['8', 'Semantic colors'],
  ['2', 'Typefaces'],
  ['6-step', 'Spacing scale'],
]

export default function Home() {
  return (
    <>
      <section className="dg-hero">
        <div className="dg-hero-inner">
          <div className="dg-eyebrow">SanMar Digital Brand Guidelines</div>
          <h1>Together, for good — and on brand.</h1>
          <p>
            A shared source of truth for SanMar’s digital teams — the brand
            foundations, reusable components, and the voice that make every
            screen feel unmistakably SanMar: warm, honest, and genuinely helpful.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Button as={Link} to={`${BASE}/getting-started`} variant="light" size="lg">
              Get started
            </Button>
            <Button
              as={Link}
              to={`${BASE}/components`}
              variant="outline-light"
              size="lg"
              className="d-inline-flex align-items-center gap-2"
            >
              Explore components <IconArrowRight />
            </Button>
          </div>
        </div>
      </section>

      <div className="dg-page">
        <div className="dg-content" style={{ maxWidth: 960 }}>
          <div className="d-flex flex-wrap gap-4 gap-md-6 py-3 mb-2">
            {STATS.map(([n, label]) => (
              <div key={label}>
                <div style={{ fontSize: '2rem', fontWeight: 500, lineHeight: 1 }}>{n}</div>
                <div className="text-secondary small mt-1">{label}</div>
              </div>
            ))}
          </div>

          <hr className="dg-rule" />

          <h2 className="mb-1" style={{ fontSize: '1.6rem', fontWeight: 500 }}>Explore the system</h2>
          <p className="text-secondary mb-4">Everything you need to design and build a SanMar experience.</p>

          <div className="dg-card-grid">
            {TILES.map(({ to, Icon, title, text }) => (
              <Link key={to} to={`${BASE}/${to}`} className="dg-tile">
                <span className="dg-tile-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Link>
            ))}
          </div>

          <Pager />
        </div>
      </div>
    </>
  )
}
