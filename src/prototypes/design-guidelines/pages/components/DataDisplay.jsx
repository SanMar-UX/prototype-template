import { Table, Badge, OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, Do, Dont, DoDont } from '../../components/docs.jsx'

const ROWS = [
  ['PC54', 'Core Cotton Tee', 'Navy', '$6.98', 'In stock'],
  ['ST350', 'PosiCharge Competitor', 'Black', '$9.48', 'Low'],
  ['DT6000', 'Very Important Tee', 'Heather Grey', '$4.26', 'In stock'],
]
const STATUS = { 'In stock': 'success', Low: 'warning', Out: 'danger' }

export default function DataDisplay() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Data display"
        lead="Present structured information so it's scannable and precise. Tables carry the data; badges, tooltips, and popovers add lightweight status and detail around it."
      />

      <H2>Tables</H2>
      <p>
        Use a table for data with shared attributes across rows. Right-align numbers, keep
        headers in place, and let people sort by the column they care about.
      </p>
      <Preview center={false} meta="Hover rows; a badge carries per-row status">
        <Table hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Style</th><th>Product</th><th>Color</th>
              <th className="text-end">Price</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]}>
                <td><code>{r[0]}</code></td>
                <td>{r[1]}</td>
                <td>{r[2]}</td>
                <td className="text-end">{r[3]}</td>
                <td><Badge bg={STATUS[r[4]]} text={r[4] === 'Low' ? 'dark' : undefined}>{r[4]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Preview>

      <H2>Badges</H2>
      <p>
        A badge is a compact label for status, counts, or categories. Keep the text to a word
        or two, and use semantic colors so status reads consistently.
      </p>
      <Preview meta="Solid, pill, and count badges">
        <Badge bg="success">In stock</Badge>
        <Badge bg="warning" text="dark">Low</Badge>
        <Badge bg="danger">Out</Badge>
        <Badge pill bg="primary">New</Badge>
        <span>Cart <Badge bg="secondary">3</Badge></span>
      </Preview>

      <H2>Tooltip &amp; popover</H2>
      <p>
        A <strong>tooltip</strong> gives a brief text hint on hover or focus. A{' '}
        <strong>popover</strong> holds richer content on click. Neither should hide information
        that's essential to complete a task — that belongs on the page.
      </p>
      <Preview meta="Tooltip on hover/focus; popover on click">
        <OverlayTrigger overlay={<Tooltip>Ships in 1–2 business days</Tooltip>}>
          <Button variant="outline-secondary">Hover for a tooltip</Button>
        </OverlayTrigger>
        <OverlayTrigger
          trigger="click"
          rootClose
          overlay={
            <Popover>
              <Popover.Header>Bulk pricing</Popover.Header>
              <Popover.Body>Order 144+ units for tier pricing and free freight.</Popover.Body>
            </Popover>
          }
        >
          <Button variant="outline-primary">Click for a popover</Button>
        </OverlayTrigger>
      </Preview>

      <H2>Guidance</H2>
      <DoDont>
        <Do preview={
          <Table size="sm" className="mb-0" style={{ fontSize: '0.8rem', maxWidth: 200 }}>
            <tbody>
              <tr><td>Subtotal</td><td className="text-end">$148.00</td></tr>
              <tr><td>Shipping</td><td className="text-end">$12.50</td></tr>
            </tbody>
          </Table>
        }>
          Right-align numeric columns so digits line up and totals are easy to compare.
        </Do>
        <Dont preview={
          <Table size="sm" className="mb-0" style={{ fontSize: '0.8rem', maxWidth: 200 }}>
            <tbody>
              <tr><td>Subtotal</td><td>$148.00</td></tr>
              <tr><td>Shipping</td><td>$12.50</td></tr>
            </tbody>
          </Table>
        }>
          Left-align numbers, which makes magnitudes hard to scan at a glance.
        </Dont>
      </DoDont>

      <Callout variant="info" title="Semantics matter">
        Use real <code>&lt;th&gt;</code> headers with scope so screen readers can associate
        each cell with its column. Don't fake a table with divs — the structure is what makes
        it navigable.
      </Callout>
    </DocsPage>
  )
}
