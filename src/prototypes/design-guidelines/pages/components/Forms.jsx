import { Form, InputGroup, FloatingLabel, Row, Col } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, Do, Dont, DoDont } from '../../components/docs.jsx'

export default function Forms() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Forms & inputs"
        lead="Forms are where people give the product information. Keep them short, clearly labeled, and forgiving — validate helpfully, and never make someone guess what a field wants."
      />

      <H2>Text inputs</H2>
      <p>
        Every input needs a visible label above it. Placeholder text is a hint, not a
        label — it disappears on typing and fails contrast, so it can't carry the field's name.
      </p>
      <Preview center={false} meta="Label + control + help text; sizes small / default / large">
        <div style={{ maxWidth: 280 }} className="w-100">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="you@example.com" />
          <Form.Text>We'll only use this to send your order updates.</Form.Text>
          <div className="d-flex flex-column gap-2 mt-3">
            <Form.Control size="sm" placeholder="Small" />
            <Form.Control placeholder="Default" />
            <Form.Control size="lg" placeholder="Large" />
          </div>
        </div>
      </Preview>

      <H2>Selection controls</H2>
      <Preview center={false} meta="Checkbox, radio, and switch — checked state uses primary">
        <div className="d-flex flex-wrap gap-5">
          <div className="d-flex flex-column gap-2">
            <Form.Check type="checkbox" id="f-cb1" label="Ground shipping" defaultChecked />
            <Form.Check type="checkbox" id="f-cb2" label="Gift wrap" />
          </div>
          <div className="d-flex flex-column gap-2">
            <Form.Check type="radio" name="f-r" id="f-r1" label="Pickup" defaultChecked />
            <Form.Check type="radio" name="f-r" id="f-r2" label="Delivery" />
          </div>
          <div className="d-flex flex-column gap-2">
            <Form.Check type="switch" id="f-sw1" label="Email me updates" defaultChecked />
            <Form.Check type="switch" id="f-sw2" label="SMS updates" />
          </div>
        </div>
      </Preview>

      <H2>Select, groups &amp; floating labels</H2>
      <Preview center={false} meta="Select, input group addons, and the floating-label variant">
        <Row className="g-3 w-100" style={{ maxWidth: 620 }}>
          <Col sm={4}>
            <Form.Label>Size</Form.Label>
            <Form.Select>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </Form.Select>
          </Col>
          <Col sm={4}>
            <Form.Label>Amount</Form.Label>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder="0.00" aria-label="Amount" />
            </InputGroup>
          </Col>
          <Col sm={4}>
            <FloatingLabel label="Style number">
              <Form.Control placeholder="Style number" />
            </FloatingLabel>
          </Col>
        </Row>
      </Preview>

      <H2>Validation</H2>
      <p>
        Show validation inline, next to the field it concerns, in plain language that says how
        to fix it. Pair the color with an icon or text so it isn't the only signal.
      </p>
      <Preview center={false} meta="Valid and invalid states with feedback">
        <Row className="g-3 w-100" style={{ maxWidth: 480 }}>
          <Col sm={6}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control defaultValue="24" isValid />
            <Form.Control.Feedback type="valid">Looks good.</Form.Control.Feedback>
          </Col>
          <Col sm={6}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control defaultValue="0" isInvalid />
            <Form.Control.Feedback type="invalid">Enter at least 1.</Form.Control.Feedback>
          </Col>
        </Row>
      </Preview>

      <H2>Guidance</H2>
      <DoDont>
        <Do preview={
          <div className="text-start" style={{ fontSize: '0.85rem' }}>
            <div className="fw-medium mb-1">Company name</div>
            <div className="border rounded px-2 py-1 bg-white text-secondary">Acme Uniforms</div>
          </div>
        }>
          Put a persistent label above every field so its purpose is always visible.
        </Do>
        <Dont preview={
          <div className="text-start" style={{ fontSize: '0.85rem' }}>
            <div className="border rounded px-2 py-1 bg-white text-secondary">Company name</div>
          </div>
        }>
          Use the placeholder as the only label. Once someone types, the field's name is gone.
        </Dont>
      </DoDont>

      <Callout variant="warning" title="Ask for as little as possible">
        Every extra field costs completion. Only request what you truly need, mark optional
        fields clearly, and group related inputs so long forms feel shorter.
      </Callout>
    </DocsPage>
  )
}
