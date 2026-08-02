import { useState } from 'react'
import { Container, Row, Col, Alert, ProgressBar, Button } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import AccountSidebar from './components/AccountSidebar.jsx'
import PersonaSwitcher from './components/PersonaSwitcher.jsx'
import BenefitCard from './components/BenefitCard.jsx'
import EarningsPanel from './components/EarningsPanel.jsx'
import EnrollmentPanel from './components/EnrollmentPanel.jsx'
import { PERSONAS } from './data/personas.js'
import './MyDashboard.css'

const money0 = (n) => '$' + n.toLocaleString('en-US')

// SanMar's alert pattern includes a leading contextual icon in markup (see the
// design-system catalog, Components · Alert banners). Paths from that catalog.
const ALERT_ICON_PATHS = {
  warning:
    'M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  info: 'M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.082.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z',
}

const AlertIcon = ({ icon }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 me-2 mt-1" aria-hidden="true">
    <path d={ALERT_ICON_PATHS[icon]} />
  </svg>
)

// =============================================================================
// MyDashboard — Incentive Programs MVP mock.
// =============================================================================
// Read-only dashboard: view your program, your spendable balances (the benefit
// cards), and how this year's earning is tracking. Spending MF and enrolling /
// changing programs stay with the rep in this MVP; applying Rebate Credit
// links out to the existing online invoice-payment flow.
//
// The persona switcher (top strip) is demo chrome — it swaps between five
// customer scenarios so stakeholders can see one composable design flex across
// the real program landscape.
// =============================================================================
export default function MyDashboard() {
  const [personaId, setPersonaId] = useState('standard')
  const persona = PERSONAS.find((p) => p.id === personaId)

  return (
    <div className="d-flex flex-column min-vh-100 mdb-lofi">
      <SiteHeader loggedIn breadcrumbs={false} />
      <PersonaSwitcher activeId={personaId} onChange={setPersonaId} />

      <Container as="main" className="py-4 flex-grow-1">
        <div className="mdb-crumb mb-3">My SanMar</div>

        <div className="mdb-layout">
          <AccountSidebar active="My Dashboard" />

          <div className="mdb-main">
            <h1 className="h3 mb-1">My Dashboard</h1>

            {persona.program ? (
              <>
                <p className="text-secondary mb-1">
                  Your Incentive Program: <strong>{persona.program.code}</strong> — {persona.program.name}{' '}
                  <span className="mdb-program-family">({persona.program.family})</span>
                </p>
                <p className="mb-5">
                  <Button variant="link" size="sm" className="p-0 border-0 align-baseline" onClick={() => {}}>
                    Download 2026 program statement (PDF)
                  </Button>
                </p>
              </>
            ) : (
              <p className="text-secondary mb-5">You&apos;re not enrolled in an Incentive Program yet.</p>
            )}

            {persona.scenario === 'atRisk' && <AtRiskAlert atRisk={persona.atRisk} />}
            {persona.scenario === 'onHold' && <OnHoldAlert onHold={persona.onHold} />}

            {persona.balances.length > 0 && (
              <>
                <h2 className="h5 mb-3">Available to spend now</h2>
                <Row className="g-4 mb-4">
                  {persona.balances.map((b) => (
                    <Col key={b.type} md={persona.balances.length > 1 ? 6 : 8} xl={persona.balances.length > 1 ? 6 : 7}>
                      <BenefitCard benefit={b} />
                    </Col>
                  ))}
                </Row>
              </>
            )}

            {persona.scenario === 'atRisk' && (
              <Alert variant="light" className="border d-flex align-items-start">
                <AlertIcon icon="info" />
                <div>No funds were deposited this February because 2025 purchases finished below the program minimum.</div>
              </Alert>
            )}

            {persona.earning && <EarningsPanel earning={persona.earning} />}

            {persona.scenario === 'new' && <EnrollmentPanel enrollment={persona.enrollment} />}

            <p className="text-secondary small mt-5 mb-0">
              Program terms are confidential to your account. Questions? Your SanMar Representative can walk you
              through your program any time.
            </p>
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}

// Good-standing rule from the program docs: funds are not issued to accounts
// that have not paid within terms. Earned money, held until invoices clear.
function OnHoldAlert({ onHold }) {
  const money2 = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return (
    <Alert variant="warning" className="d-flex align-items-start">
      <AlertIcon icon="warning" />
      <div className="flex-grow-1">
        <div className="fw-semibold mb-1">Your February 2027 funding is at risk</div>
        <p className="mb-2">
          Incentive Program funds are not issued to accounts that have not paid within terms. This account has{' '}
          {onHold.invoices} open invoices totaling <strong>{money2(onHold.pastDue)}</strong> past terms.
        </p>
        <p className="mb-0">
          Bring the account back into good standing to receive your 2026 earnings in February 2027.{' '}
          <Button variant="link" size="sm" className="p-0 border-0 align-baseline" onClick={() => {}}>
            View &amp; Pay Invoices
          </Button>
        </p>
      </div>
    </Alert>
  )
}

// The message a patient salesperson would today deliver over the phone: you're
// about to lose the program, here's exactly what keeps it.
function AtRiskAlert({ atRisk }) {
  return (
    <Alert variant="warning" className="mdb-atrisk d-flex align-items-start">
      <AlertIcon icon="warning" />
      <div className="flex-grow-1">
        <div className="fw-semibold mb-1">Action needed to keep your Incentive Program</div>
        <p className="mb-2">
          2025 Eligible Brand Purchases finished below the {money0(atRisk.minimum)} program minimum, and 2026 is
          currently below it as well. Accounts below the minimum for two consecutive years are removed from their
          Incentive Program.
        </p>
        <p className="mb-2">
          Purchase <strong>{money0(atRisk.gap)}</strong> more in eligible brands by {atRisk.deadline} to remain in your
          program.
        </p>
        <ProgressBar
          now={((atRisk.minimum - atRisk.gap) / atRisk.minimum) * 100}
          variant="warning"
          className="mdb-progress mb-1"
        />
        <div className="small">
          {money0(atRisk.minimum - atRisk.gap)} of {money0(atRisk.minimum)} minimum
        </div>
      </div>
    </Alert>
  )
}
