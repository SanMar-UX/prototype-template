import { Alert, Toast, Spinner, ProgressBar, Placeholder, Card } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, SpecTable } from '../../components/docs.jsx'
import { IconInfo, IconCheck, IconWarn, IconX } from '../../components/icons.jsx'

const ALERT_ICON = { info: IconInfo, success: IconCheck, warning: IconWarn, danger: IconX }

export default function Feedback() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Feedback & status"
        lead="Tell people what's happening — that an action worked, something needs attention, or the system is busy. Match the component to how urgent and how persistent the message is."
      />

      <H2>Choosing a pattern</H2>
      <SpecTable
        head={['Component', 'Use when…', 'Persistence']}
        rows={[
          ['Alert', 'A message relates to the content in view', 'Stays until resolved / dismissed'],
          ['Toast', 'Confirming a background action succeeded', 'Auto-hides after a few seconds'],
          ['Spinner', 'A short wait with unknown duration', 'While loading'],
          ['Progress', 'A measurable, multi-step or timed task', 'While running'],
          ['Placeholder', 'Content is loading into a known layout', 'While loading'],
        ]}
      />

      <H2>Alerts</H2>
      <p>
        Alerts sit inline with content and carry a contextual color plus a leading icon. Use
        them for messages tied to the page — a saved confirmation, a form-level error, an
        important notice.
      </p>
      <Preview center={false} meta="The four contextual alert types">
        <div className="w-100" style={{ maxWidth: 520 }}>
          {['info', 'success', 'warning', 'danger'].map((v) => {
            const Icon = ALERT_ICON[v]
            return (
              <Alert key={v} variant={v} className="d-flex align-items-start mb-2">
                <span className="me-2 mt-1"><Icon size="1em" /></span>
                <div className="text-capitalize">{v} — a short, specific message.</div>
              </Alert>
            )
          })}
        </div>
      </Preview>

      <H2>Toasts</H2>
      <p>
        A toast is a lightweight, transient confirmation that doesn't interrupt. Reserve it
        for success or informational nudges — never for errors that require action, which
        need a persistent alert.
      </p>
      <Preview meta="A success toast with a tinted header">
        <Toast>
          <Toast.Header closeButton={false} className="bg-success-subtle">
            <span className="me-2 text-success"><IconCheck size="1em" /></span>
            <strong className="me-auto">Saved</strong>
            <small className="text-secondary">just now</small>
          </Toast.Header>
          <Toast.Body>Your return has been submitted.</Toast.Body>
        </Toast>
      </Preview>

      <H2>Loading &amp; progress</H2>
      <Preview meta="Spinner for indeterminate waits; progress bar for measurable ones">
        <div className="d-flex align-items-center gap-4 w-100" style={{ maxWidth: 480 }}>
          <Spinner animation="border" variant="primary" role="status">
            <span className="visually-hidden">Loading…</span>
          </Spinner>
          <div className="flex-grow-1">
            <ProgressBar now={66} label="66%" />
          </div>
        </div>
      </Preview>

      <H2>Placeholders</H2>
      <p>
        Show a skeleton of the layout while content loads, so the page doesn't jump when data
        arrives. Skeletons feel faster than a blank screen or a lone spinner for content-heavy
        views.
      </p>
      <Preview meta="A loading card skeleton">
        <Card style={{ width: 300 }}>
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow"><Placeholder xs={6} /></Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={5} aria-hidden="true" />
          </Card.Body>
        </Card>
      </Preview>

      <Callout variant="info" title="Announce changes to assistive tech">
        Status messages that appear dynamically should live in an ARIA live region so screen
        readers hear them. Errors that block progress must move focus to the message.
      </Callout>
    </DocsPage>
  )
}
