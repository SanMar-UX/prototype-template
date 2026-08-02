import { useState } from 'react'
import { Card, Badge, Button, Modal, Table, ProgressBar } from 'react-bootstrap'
import InfoTip from './InfoTip.jsx'
import Disclosure from './Disclosure.jsx'
import { GLOSSARY } from '../data/personas.js'

// $2,179.75 → big dollars, cents kept but visually de-emphasized (with the
// decimal point — a bare superscript "00" reads as a footnote marker).
export function Money({ value, className = '' }) {
  const [dollars, cents] = value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split('.')
  return (
    <span className={`mdb-money ${className}`}>
      ${dollars}
      <span className="mdb-money__cents">.{cents}</span>
    </span>
  )
}

// Label/value rows for distinct facts (funded, source, expiry, invoice) —
// replaces middot-separated run-on strings.
function FactList({ facts, className = '' }) {
  return (
    <dl className={`mdb-facts ${className}`}>
      {facts.map(([label, value]) => (
        <div key={label} className="mdb-facts__row">
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

// Storage-style allocation bar. Deliberately NOT the progress-bar grammar
// (partial fill on an empty track = distance to a goal): this bar is always
// full, split into two visible segments — striped/pale = consumed, solid =
// still available. Both ends labeled.
function UsageBar({ spent, remaining, spentLabel, remainingLabel }) {
  const total = spent + remaining
  const spentPct = (spent / total) * 100
  return (
    <div className="mdb-usage">
      <div className="d-flex justify-content-between gap-3 small mb-1">
        <span>
          <Money value={spent} /> <span className="text-secondary">{spentLabel}</span>
        </span>
        <span>
          <Money value={remaining} /> <span className="text-secondary">{remainingLabel}</span>
        </span>
      </div>
      <ProgressBar className="mdb-usage__bar" aria-label={`${spentLabel}: ${Math.round(spentPct)}% of the total`}>
        <ProgressBar striped variant="secondary" now={spentPct} key={1} className="mdb-usage__spent" />
        <ProgressBar now={100 - spentPct} key={2} className="mdb-usage__left" />
      </ProgressBar>
    </div>
  )
}

// =============================================================================
// BenefitCard — one spendable benefit. A "program" is just a stack of these:
// Marketing Fund, Rebate Credit, and/or Off-Invoice Discount. Each variant
// leads with the single most actionable fact (MF: the expiry date; RC: never
// expires; OID: it's automatic).
// =============================================================================
export default function BenefitCard({ benefit }) {
  if (benefit.type === 'mf') return <MarketingFundCard b={benefit} />
  if (benefit.type === 'rc') return <RebateCreditCard b={benefit} />
  return <OffInvoiceCard b={benefit} />
}

function CardShell({ title, tipKey, badge, children }) {
  return (
    <Card className="mdb-benefit h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center gap-1">
            <span className="mdb-benefit__title">{title}</span>
            <InfoTip id={`tip-${tipKey}`} text={GLOSSARY[tipKey]} />
          </div>
          {badge}
        </div>
        {children}
      </Card.Body>
    </Card>
  )
}

function MarketingFundCard({ b }) {
  const [modal, setModal] = useState(null) // 'history' | 'howto'
  return (
    <CardShell title="Marketing Fund" tipKey="mf" badge={<Badge bg="warning" text="dark">Expires in {b.expiresIn}</Badge>}>
      <div className="text-secondary small mb-1">Remaining balance</div>
      <Money value={b.remaining} className="mdb-money--lg" />
      {/* actions live inside Details; no meter here — a depleting balance
          isn't "progress", bars are reserved for goal-progress */}
      <Disclosure summary="Details" className="mdb-carddetails mt-3">
        <div className="mt-3">
          <UsageBar spent={b.funded - b.remaining} remaining={b.remaining} spentLabel="spent" remainingLabel="left" />
        </div>
        <FactList
          className="mt-3"
          facts={[
            ['Funded', <><Money value={b.funded} /> · {b.fundedDate}</>],
            ['Source', b.source],
            ['Expires', b.expires],
          ]}
        />
        <div className="small mt-3">
          <Button variant="link" size="sm" className="p-0 border-0 align-baseline" onClick={() => setModal('history')}>
            View history
          </Button>
        </div>
        <div className="small mt-2 mb-0">
          <Button variant="link" size="sm" className="p-0 border-0 align-baseline" onClick={() => setModal('howto')}>
            What can I buy with this?
          </Button>
        </div>
      </Disclosure>

      <MfHistoryModal b={b} show={modal === 'history'} onHide={() => setModal(null)} />
      <MfHowToModal b={b} show={modal === 'howto'} onHide={() => setModal(null)} />
    </CardShell>
  )
}

// Transaction history: the February deposit plus every order that drew the
// fund down, newest first with a running balance.
function MfHistoryModal({ b, show, onHide }) {
  let running = 0
  const rows = (b.history ?? []).map((t) => {
    running += t.amount
    return { ...t, balance: running }
  }).reverse()

  return (
    <Modal show={show} onHide={onHide} size="lg" contentClassName="mdb-lofi-modal">
      <Modal.Header closeButton className="px-4 pt-4">
        <Modal.Title as="h5" className="fw-medium">Marketing Fund history</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <Table className="mdb-historytable align-middle mb-2">
          <thead>
            <tr>
              <th>Date</th>
              <th>Activity</th>
              <th className="text-end">Amount</th>
              <th className="text-end">Balance</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.date + t.amount}>
                <td className="text-nowrap">{t.date}</td>
                <td>{t.desc}</td>
                <td className={`text-end text-nowrap ${t.amount > 0 ? 'text-success' : ''}`}>
                  {t.amount > 0 ? '+' : '−'}<Money value={Math.abs(t.amount)} />
                </td>
                <td className="text-end text-nowrap"><Money value={t.balance} /></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-secondary small">
          Orders placed with your fund are deducted when they invoice. Your remaining balance expires {b.expires}.
        </div>
      </Modal.Body>
    </Modal>
  )
}

// The patient-salesperson answer to "so what do I actually do with this
// money?" — rules straight from the program offerings doc.
function MfHowToModal({ b, show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} contentClassName="mdb-lofi-modal">
      <Modal.Header closeButton className="px-4 pt-4">
        <Modal.Title as="h5" className="fw-medium">Using your Marketing Fund</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <p>
          Your Marketing Fund is money SanMar gives you to grow your business. Use it toward:
        </p>
        <ul>
          <li>Samples of new styles to show customers</li>
          <li>Showroom supplies and displays</li>
          <li>Catalogs and marketing materials</li>
          <li>Presentation boxes and other qualified marketing purchases</li>
        </ul>
        <p className="fw-semibold mb-1">The rules</p>
        <ul>
          <li>Purchases must be at full price — sale or discounted items don&apos;t qualify</li>
          <li>Industry brands (Gildan, BELLA+CANVAS, etc.) don&apos;t qualify</li>
          <li>Orders are non-refundable and deducted from your balance when they invoice</li>
          <li>
            <strong>Your balance expires {b.expires}</strong> — unused funds are lost
          </li>
        </ul>
        <p className="mb-0">
          <strong>To place an order:</strong> contact your SanMar Representative or Customer Service — Marketing Fund
          ordering isn&apos;t available online yet.
        </p>
      </Modal.Body>
    </Modal>
  )
}

function RebateCreditCard({ b }) {
  return (
    <CardShell title="Rebate Credit" tipKey="rc" badge={<Badge bg="success">Never expires</Badge>}>
      <div className="text-secondary small mb-1">Remaining balance</div>
      <Money value={b.remaining} className="mdb-money--lg" />
      <Disclosure summary="Details" className="mdb-carddetails mt-3">
        <div className="mt-3">
          <UsageBar
            spent={b.funded - b.remaining}
            remaining={b.remaining}
            spentLabel="applied to invoices"
            remainingLabel="left"
          />
        </div>
        <FactList
          className="mt-3"
          facts={[
            ['Funded', <><Money value={b.funded} /> · {b.fundedDate}</>],
            ['Source', b.source],
            ['Invoice', `#${b.invoiceNo}`],
          ]}
        />
        <div className="small mt-3">
          <Button variant="link" size="sm" className="p-0 border-0 align-baseline" onClick={() => {}}>
            View history
          </Button>
        </div>
        <div className="text-secondary small mt-3 mb-0">
          You can apply this credit when paying invoices online, or through your Credit Representative.
        </div>
      </Disclosure>
    </CardShell>
  )
}

function OffInvoiceCard({ b }) {
  return (
    <CardShell title="Off-Invoice Discount" tipKey="oid" badge={<Badge bg="info" text="dark">Automatic</Badge>}>
      <div className="text-secondary small mb-1">Your discount</div>
      <span className="mdb-money mdb-money--lg">{b.pct}%</span>
      <div className="text-secondary small mt-2">off {b.appliesTo}, applied at the time of order — nothing to track or redeem.</div>
      <div className="mt-4 pt-3 border-top d-flex align-items-baseline justify-content-between">
        <span className="small text-secondary">Saved so far in 2026</span>
        <Money value={b.ytdSavings} className="text-success fw-semibold" />
      </div>
    </CardShell>
  )
}
