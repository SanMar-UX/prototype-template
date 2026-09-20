import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

// Demo chrome, not product UI: floating pill (bottom-left, mirroring the
// persona switcher's idiom) that flips between the V1 snapshot (pre-SME
// review, at /my-dashboard-v1) and this V2. "What's new" lists every V2
// change with the rationale so stakeholders can review the delta.
const CHANGES = [
  {
    title: 'Rebate Credit expiration corrected',
    why: 'V1 said "Never expires" (per the Program Offerings doc). Barb: "It does expire. We don’t allow our customers to roll credits year over year." Exact date rule mirrors the Marketing Fund pending policy review by Casey Vivang / Nick Anderson.',
  },
  {
    title: 'A clear next step on every benefit card',
    why: 'Barb: information without an action leaves customers asking "now what?" Marketing Fund gets "Request samples" — a structured request routed to your AE, since MF ordering isn’t online yet. Rebate Credit gets "Apply to an invoice," routing to the existing View & Pay Invoices flow.',
  },
  {
    title: '"Explore your options" contact panel',
    why: 'Barb asked for a prominent action that routes to a person. Shows the customer’s named Account Executive (most program customers have one, not a 1-800 relationship) with the 1-800 line as fallback.',
  },
  {
    title: 'Action button beside every progress meter',
    why: 'Barb’s loyalty-dashboard grammar (Marriott): a meter, your status, and an adjacent action. "Shop eligible brands" now sits with each tier/growth meter and the at-risk alert.',
  },
  {
    title: 'Speedometer gauge — A/B visualization',
    why: 'Barb compared the ideal to Marriott’s status speedometer. Rebate Credit programs render tier progress as a gauge; Marketing Fund programs keep the linear bar, so the two can be compared on one page.',
  },
  {
    title: 'Earnings copy corrections',
    why: 'Projections now read as estimates calculated on Rebatable Purchases. Freight added to the exclusions (Barb: "less closeout, less sale, less freight") and the confusing "do not earn" phrasing reworded. Final language to come from the policy owners.',
  },
  {
    title: 'Full color',
    why: 'V1 was deliberately grayscale so early feedback stayed on structure and content. With the direction validated, V2 moves to the themed design-system look.',
  },
]

export default function VersionSwitcher() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  return (
    <div className="mdb-vswitcher">
      <div className="mdb-vswitcher__inner">
        <span className="mdb-vswitcher__label">Version:</span>
        <button type="button" className="mdb-vswitcher__btn" onClick={() => navigate('/my-dashboard-v1')}>
          V1
        </button>
        <button type="button" className="mdb-vswitcher__btn mdb-vswitcher__btn--active">V2</button>
        <span className="mdb-vswitcher__sep" />
        <button type="button" className="mdb-vswitcher__btn" onClick={() => setShow(true)}>
          What&apos;s new
        </button>
      </div>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton className="px-4 pt-4">
          <Modal.Title as="h5" className="fw-medium">What&apos;s new in V2</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <p className="text-secondary">
            Changes from the SME review with Barb Herman (Sales), September 2026. V1 is preserved unchanged for
            comparison.
          </p>
          <ol className="mdb-changelog">
            {CHANGES.map((c) => (
              <li key={c.title}>
                <div className="fw-semibold">{c.title}</div>
                <div className="text-secondary">{c.why}</div>
              </li>
            ))}
          </ol>
          <p className="text-secondary small mb-0">
            Parked (deliberately not in V2): temporary/auxiliary programs (TVBP, brand promotions, riders),
            access-control &amp; opt-in design, Salesforce rep parity — tracked with named owners for follow-up.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  )
}
