import { useState } from 'react'
import { Card, ListGroup, Accordion, Modal, Offcanvas, Button } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, SpecTable } from '../../components/docs.jsx'

export default function Containment() {
  const [showModal, setShowModal] = useState(false)
  const [showCanvas, setShowCanvas] = useState(false)

  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Containment"
        lead="Components that group content into surfaces or layer it above the page. Use the lightest container that does the job — reach for an overlay only when you must interrupt."
      />

      <H2>Card</H2>
      <p>
        A card is a flexible surface for a single subject — a product, an order, a summary.
        Roomy 24px padding and a soft border set it apart from the page without shouting.
      </p>
      <Preview meta="A card with body and action">
        <Card style={{ width: 300 }}>
          <Card.Body>
            <Card.Title>PC54 Core Cotton Tee</Card.Title>
            <Card.Text className="text-secondary">
              A soft, midweight everyday tee available in 30+ colors.
            </Card.Text>
            <Button variant="primary" size="sm">View product</Button>
          </Card.Body>
        </Card>
      </Preview>

      <H2>List group</H2>
      <p>
        A vertical series of related items — settings, results, navigable rows. Items can be
        static, actionable, or carry a leading icon and trailing chevron.
      </p>
      <Preview center={false} meta="Actionable list; one active item at a time">
        <ListGroup defaultActiveKey="#b" style={{ maxWidth: 360 }} className="w-100">
          <ListGroup.Item action href="#a" onClick={(e) => e.preventDefault()}>Order history</ListGroup.Item>
          <ListGroup.Item action href="#b" onClick={(e) => e.preventDefault()}>Returns</ListGroup.Item>
          <ListGroup.Item action href="#c" onClick={(e) => e.preventDefault()}>Payment methods</ListGroup.Item>
        </ListGroup>
      </Preview>

      <H2>Accordion</H2>
      <p>
        Collapse secondary content so the page stays scannable. Good for FAQs and optional
        detail — not for content people need to compare side by side.
      </p>
      <Preview center={false} meta="One section expanded by default">
        <Accordion defaultActiveKey="0" className="w-100" style={{ maxWidth: 480 }}>
          <Accordion.Item eventKey="0">
            <Accordion.Header>How do returns work?</Accordion.Header>
            <Accordion.Body className="text-secondary">
              Start a return from your order history within 30 days for a prepaid label.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>When am I refunded?</Accordion.Header>
            <Accordion.Body className="text-secondary">
              Refunds post 3–5 business days after we receive the item.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Preview>

      <H2>Overlays — modal &amp; offcanvas</H2>
      <p>
        Overlays interrupt. A <strong>modal</strong> demands a decision before continuing; an{' '}
        <strong>offcanvas</strong> drawer slides in secondary content like filters or a cart.
        Both trap focus and dismiss with Esc.
      </p>
      <Preview meta="Click to open — both dismiss with ×, backdrop, or Esc">
        <Button variant="outline-primary" onClick={() => setShowModal(true)}>Open modal</Button>
        <Button variant="outline-primary" onClick={() => setShowCanvas(true)}>Open drawer</Button>
      </Preview>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title as="h5" className="fw-medium">Cancel this return?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-secondary">
          Your progress won't be saved. This can't be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>Keep editing</Button>
          <Button variant="danger" onClick={() => setShowModal(false)}>Cancel return</Button>
        </Modal.Footer>
      </Modal>

      <Offcanvas show={showCanvas} placement="end" onHide={() => setShowCanvas(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="text-secondary">
          Drop filter controls, a cart summary, or secondary navigation in here.
        </Offcanvas.Body>
      </Offcanvas>

      <H2>Reference</H2>
      <SpecTable
        head={['Container', 'Interrupts?', 'Use for']}
        rows={[
          ['Card', 'No', 'A single subject on the page'],
          ['List group', 'No', 'A series of related rows'],
          ['Accordion', 'No', 'Collapsible secondary detail'],
          ['Modal', 'Yes — blocks', 'A required decision or focused task'],
          ['Offcanvas', 'Yes — dismissible', 'Filters, cart, or mobile navigation'],
        ]}
      />

      <Callout variant="warning" title="Don't over-use modals">
        A modal stops everything. If the content isn't a decision the user must make right now,
        put it on the page or in a drawer instead.
      </Callout>
    </DocsPage>
  )
}
