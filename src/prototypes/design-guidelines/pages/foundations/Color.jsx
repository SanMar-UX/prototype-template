import { useEffect, useState } from 'react'
import { Row, Col, Badge, Button, Alert } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Do, Dont, DoDont } from '../../components/docs.jsx'

// Reads a compiled CSS custom property at runtime, so swatches always reflect
// what's actually in the build (not a hardcoded hex).
function useVar(name) {
  const [v, setV] = useState('')
  useEffect(() => {
    setV(getComputedStyle(document.documentElement).getPropertyValue(name).trim())
  }, [name])
  return v
}

function Swatch({ varName, label, big }) {
  const value = useVar(varName)
  return (
    <div className="d-flex align-items-center gap-3">
      <div
        style={{
          width: big ? 56 : 40,
          height: big ? 56 : 40,
          borderRadius: 8,
          background: `var(${varName})`,
          border: '1px solid var(--bs-border-color)',
          flex: '0 0 auto',
        }}
      />
      <div className="text-truncate">
        <div className="fw-medium text-capitalize" style={{ fontSize: '0.9rem' }}>{label}</div>
        <code className="small text-secondary">{value || varName}</code>
      </div>
    </div>
  )
}

function Grid({ items, big }) {
  return (
    <Row xs={2} sm={3} className="g-3 my-1">
      {items.map(({ varName, label }) => (
        <Col key={varName}><Swatch varName={varName} label={label} big={big} /></Col>
      ))}
    </Row>
  )
}

const THEME = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const PALETTE = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']
const GRAYS = ['100', '200', '300', '400', '500', '600', '700', '800', '900']

const ROLES = [
  ['Primary', 'primary', 'SanMar blue. Primary actions, links, selected states, focus.'],
  ['Success', 'success', 'Confirmation, completed states, positive validation.'],
  ['Danger', 'danger', 'Errors, destructive actions, invalid input.'],
  ['Warning', 'warning', 'Cautions that need attention but aren’t blocking.'],
  ['Info', 'info', 'Neutral, informational highlights.'],
]

export default function Color() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Color"
        lead="Color carries the SanMar brand and communicates meaning. Work from semantic roles first — they map to the palette and stay correct as the brand evolves."
      />

      <H2>Brand palette</H2>
      <p>
        The primitive palette is the raw set of brand colors. You rarely reference these
        directly in a screen — instead use the semantic roles below, which point at these
        values. Swatches read their value live from the compiled tokens.
      </p>
      <Grid items={PALETTE.map((c) => ({ varName: `--bs-${c}`, label: c }))} />

      <H2>Semantic roles</H2>
      <p>
        These are the colors you actually reach for. Each has a job; use it for that job so
        meaning stays consistent across every prototype.
      </p>
      <Grid big items={THEME.map((c) => ({ varName: `--bs-${c}`, label: c }))} />

      <div className="mt-4">
        {ROLES.map(([label, variant, desc]) => (
          <div key={variant} className="d-flex align-items-center gap-3 py-2 border-bottom">
            <Badge bg={variant} text={['warning', 'info', 'light'].includes(variant) ? 'dark' : undefined} style={{ minWidth: 84 }}>
              {label}
            </Badge>
            <span className="text-secondary" style={{ fontSize: '0.9rem' }}>{desc}</span>
          </div>
        ))}
      </div>

      <H2>Neutrals</H2>
      <p>
        The gray scale carries most of the interface — text, borders, surfaces, and
        disabled states. Body text is <code>gray-900</code>; secondary text, borders, and
        muted surfaces step lighter from there.
      </p>
      <Grid items={GRAYS.map((g) => ({ varName: `--bs-gray-${g}`, label: `Gray ${g}` }))} />

      <H2>Subtle &amp; emphasis pairs</H2>
      <p>
        Every semantic role also derives a soft <code>-bg-subtle</code> background and a
        darker <code>-text-emphasis</code> text color. Use the pair for tinted surfaces like
        alerts, badges, and callouts — they meet contrast automatically.
      </p>
      <div className="d-flex flex-column gap-2 my-3" style={{ maxWidth: 520 }}>
        {['primary', 'success', 'warning', 'danger'].map((v) => (
          <div
            key={v}
            className="d-flex align-items-center justify-content-between px-3 py-2 rounded"
            style={{ background: `var(--bs-${v}-bg-subtle)`, color: `var(--bs-${v}-text-emphasis)`, border: `1px solid var(--bs-${v}-border-subtle)` }}
          >
            <span className="fw-medium text-capitalize">{v} surface</span>
            <code style={{ color: 'inherit' }}>--bs-{v}-bg-subtle</code>
          </div>
        ))}
      </div>

      <H2>Using color well</H2>
      <DoDont>
        <Do preview={<Button variant="primary">Place order</Button>}>
          Use a single primary color for the main action on a screen, so the next step is
          unmistakable.
        </Do>
        <Dont preview={
          <>
            <Button variant="primary" size="sm">Save</Button>
            <Button variant="success" size="sm">Send</Button>
            <Button variant="danger" size="sm">Share</Button>
          </>
        }>
          Compete multiple bright, solid buttons against each other — it hides the primary
          action and reads as chaos.
        </Dont>
      </DoDont>
      <DoDont>
        <Do preview={<Alert variant="danger" className="mb-0 py-2 px-3 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem' }}>Payment failed</Alert>}>
          Pair color with an icon and text so meaning survives for color-blind users.
        </Do>
        <Dont preview={<span className="d-inline-block rounded-circle" style={{ width: 16, height: 16, background: 'var(--bs-danger)' }} />}>
          Rely on color alone to communicate status. A red dot with no label is ambiguous.
        </Dont>
      </DoDont>

      <Callout variant="info" title="Contrast is non-negotiable">
        Text must meet WCAG AA (4.5:1 for body, 3:1 for large text). The semantic pairs above
        are pre-checked; if you combine colors by hand, verify the contrast.
      </Callout>
    </DocsPage>
  )
}
