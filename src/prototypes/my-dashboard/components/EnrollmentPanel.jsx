import { Card, Row, Col, ProgressBar, Button } from 'react-bootstrap'

const money0 = (n) => '$' + n.toLocaleString('en-US')
const demo = (e) => e.preventDefault()

// What a customer with NO incentive program sees: what the programs are, how
// earning works, how close they are to qualifying, and how to get in
// (enrollment stays with the sales rep in this MVP).
export default function EnrollmentPanel({ enrollment }) {
  const ratio = enrollment.ytdEligible / enrollment.threshold

  return (
    <>
      <Card className="mdb-panel mb-4">
        <Card.Body className="p-4">
          <h2 className="h5">Earn money back on the purchasing you already do</h2>
          <p className="text-secondary">
            SanMar Incentive Programs reward you for buying eligible brands. Once you&apos;re enrolled, every
            qualifying purchase earns a percentage back — and the more you buy in a calendar year, the higher your
            earning tier.
          </p>

          <Row className="g-3">
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <div className="fw-semibold mb-1">Marketing Fund</div>
                  <div className="small text-secondary">
                  Money for growing your business — samples, showroom supplies, catalogs. Funded every February.
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <div className="fw-semibold mb-1">Rebate Credit</div>
                  <div className="small text-secondary">
                  A credit on your account you can put toward any open invoice. It never expires.
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100">
                <Card.Body>
                  <div className="fw-semibold mb-1">Off-Invoice Discount</div>
                  <div className="small text-secondary">
                  A percentage off automatically at the time of order. Nothing to track or redeem.
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="mdb-panel">
        <Card.Body className="p-4">
          <h2 className="h5">You&apos;re on your way to qualifying</h2>
          <p className="text-secondary mb-2">
            Programs start at {money0(enrollment.threshold)} in eligible brand purchases in a calendar year. Here&apos;s
            where you stand in 2026:
          </p>
          <div className="d-flex justify-content-between small mb-1">
            <span>
              <strong>{money0(enrollment.ytdEligible)}</strong> in eligible brand purchases so far
            </span>
            <span className="text-secondary">{money0(enrollment.threshold)} to qualify</span>
          </div>
          <ProgressBar now={ratio * 100} className="mdb-progress mb-3" />
          <p className="text-secondary small">
            Your SanMar Representative can walk you through the programs and get you enrolled — enrollment isn&apos;t
            available online yet.
          </p>
          <div className="d-flex flex-wrap gap-2">
            <Button variant="primary" onClick={demo}>
              Contact {enrollment.repName}
            </Button>
            <Button variant="outline-primary" onClick={demo}>
              Call {enrollment.repPhone}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
