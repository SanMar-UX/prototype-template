import { Card, ProgressBar, Table, Row, Col, Badge } from 'react-bootstrap'
import InfoTip from './InfoTip.jsx'
import Disclosure from './Disclosure.jsx'
import { Money } from './BenefitCard.jsx'
import { GLOSSARY } from '../data/personas.js'

const money0 = (n) => '$' + n.toLocaleString('en-US')

// =============================================================================
// EarningsPanel — "What you're earning" for the current year, in two layers.
//
// Layer 1 (always visible) is customer-specific: the number they're on track
// to earn, a per-benefit breakdown, and the single most actionable nudge
// (next tier, or the growth milestone for non-tiered programs).
//
// Layer 2 ("How is this calculated?", collapsed) is the program explainer —
// the two-step calculation walk-through, growth mechanics, and the full tier
// ladder. This is the patient-salesperson content: one click away, in context,
// but not competing with the customer's own facts.
// =============================================================================
export default function EarningsPanel({ earning }) {
  const achievedBonuses = earning.growth ? earning.growth.milestones.filter((m) => m.achieved) : []
  const total =
    earning.rows.reduce((s, r) => s + r.projected, 0) + achievedBonuses.reduce((s, m) => s + m.bonusProjected, 0)
  const nextFebruary = earning.year + 1

  const multiBenefit = earning.rows.length + achievedBonuses.length > 1

  return (
    <Card className="mdb-panel">
      <Card.Body className="p-4">
        <h2 className="h5 mb-4">What you&apos;re earning in {earning.year}</h2>

        {/* Layer 1 — this customer's number */}
        <div className="d-flex flex-wrap align-items-center gap-4">
          <div>
            <div className="text-secondary small mb-1">On track to earn by February {nextFebruary}</div>
            {total > 0 ? (
              <div className="d-flex align-items-baseline gap-2 flex-wrap">
                <Money value={total} className="mdb-money--lg" />
                {!multiBenefit && <span className="text-secondary">{earning.rows[0].label}</span>}
              </div>
            ) : (
              <>
                <span className="mdb-money mdb-money--lg text-secondary">$0</span>
                <div className="small text-secondary">Purchases are below the program minimum</div>
              </>
            )}
          </div>
          {multiBenefit && (
            <div className="mdb-earnsummary">
              {earning.rows.map((r) => (
                <div key={r.type}>
                  <strong>{money0(r.projected)}</strong> {r.label}
                </div>
              ))}
              {achievedBonuses.map((m) => (
                <div key={m.growthPct}>
                  <strong>{money0(m.bonusProjected)}</strong> Growth bonus (+{m.bonusPct}% {earning.growth.bonusOn})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* The single most actionable nudge */}
        {earning.nextTier ? (
          <div className="mdb-nexttier mt-4">
            <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-2">
              <span>
                Spend <strong>{money0(earning.nextTier.gap)}</strong> more in eligible brands by December 31 to{' '}
                {earning.currentPct > 0 ? (
                  <>
                    move from <strong>{earning.currentPct}%</strong> to <strong>{earning.nextTier.pct}%</strong>.
                  </>
                ) : (
                  <>
                    unlock the first tier (<strong>{earning.nextTier.pct}%</strong>).
                  </>
                )}
              </span>
              <span className="small text-secondary">
                {money0(earning.eligible)} of {money0(earning.nextTier.threshold)}
              </span>
            </div>
            {/* tiers apply to the full year retroactively — say what the move is worth */}
            {earning.nextTier.payoff != null && (
              <div className="small text-secondary mb-3">
                Reaching {earning.nextTier.pct}% is worth approximately <strong>{money0(earning.nextTier.payoff)}</strong>{' '}
                on purchases already made this year.
              </div>
            )}
            <ProgressBar now={(earning.eligible / earning.nextTier.threshold) * 100} className="mdb-progress" />
            {earning.paceFinish && (
              <div className="small text-secondary mt-3">
                At your current pace, {earning.year} finishes near <strong>{money0(earning.paceFinish)}</strong> —{' '}
                {earning.paceNote}.
              </div>
            )}
          </div>
        ) : earning.growth ? (
          <GrowthNudge growth={earning.growth} />
        ) : (
          <div className="mdb-nexttier mt-4 small text-secondary">
            {money0(earning.eligible)} in eligible-brand purchases so far this year
          </div>
        )}

        {/* Layer 2 — the program explainer, one click down. Calculation and
            tier ladder sit side by side (50/50) on large screens. */}
        <Disclosure summary="How is this calculated?" className="mt-4">
          <div className="mt-4">
            {earning.tierTable ? (
              <Row className="g-5">
                <Col lg={6}>
                  <CalcSteps earning={earning} nextFebruary={nextFebruary} />
                </Col>
                <Col lg={6}>
                  <TierLadder earning={earning} />
                </Col>
              </Row>
            ) : (
              <CalcSteps earning={earning} nextFebruary={nextFebruary} />
            )}
          </div>
        </Disclosure>
      </Card.Body>
    </Card>
  )
}

// The calculation as a vertical process stepper: each step is label → figure →
// one short note, so the four numbers tell the story and the copy stays
// caption-length. The final (result) step gets a filled marker.
function CalcSteps({ earning, nextFebruary }) {
  const belowMinimum = earning.rows.length === 0
  const achieved = (earning.growth?.milestones ?? []).filter((m) => m.achieved)

  const steps = []

  steps.push({
    label: (
      <>
        Eligible Brand Purchases <InfoTip id="tip-eligible" text={GLOSSARY.eligible} />
      </>
    ),
    value: money0(earning.eligible),
    note: (
      <>
        Total {earning.year} spend on brands included in the program
        {earning.eligibleYoY != null && (
          <>
            {' · '}
            <YoY value={earning.eligibleYoY} />
          </>
        )}
      </>
    ),
  })

  if (earning.tierTable) {
    steps.push(
      belowMinimum
        ? {
            label: 'Tier earned',
            value: 'Below the first tier',
            note: `Tiers begin at ${money0(earning.tierTable.tiers[0].min)} in Eligible Brand Purchases — see the full ladder.`,
          }
        : {
            label: 'Tier earned',
            value: `${earning.currentPct}%`,
            note: 'Set by your Eligible Brand Purchases — see the full ladder.',
          }
    )
  } else {
    steps.push({
      label: 'Program rates',
      value: earning.rows.map((r) => `${r.pct}% ${r.label}`).join(' + '),
      note: 'Flat rates — this program has no tiers.',
    })
  }

  steps.push({
    label: (
      <>
        Rebatable Purchases <InfoTip id="tip-rebatable" text={GLOSSARY.rebatable} />
      </>
    ),
    value: money0(earning.rebatable),
    note: 'The full-price portion of your purchases. Sale-priced and closeout items do not earn.',
  })

  if (earning.growth) {
    steps.push({
      label: 'Growth Incentive',
      value: achieved.length
        ? `+${achieved.map((m) => `${m.bonusPct}%`).join(' / ')} ${earning.growth.bonusOn} bonus unlocked`
        : 'Not yet unlocked',
      note: `Grow Eligible Brand Purchases ${earning.growth.milestones
        .map((m) => `${m.growthPct}% (+${m.bonusPct}%)`)
        .join(' or ')} over last year's ${money0(earning.growth.lastYearEligible)}.`,
    })
  }

  steps.push({
    result: true,
    label: 'Projected payout',
    value: belowMinimum ? (
      '$0'
    ) : (
      <>
        {earning.rows.map((r) => (
          <span key={r.type} className="mdb-calcmath">
            {r.pct}% × {money0(earning.rebatable)} = <strong>{money0(r.projected)}</strong> {r.label}
          </span>
        ))}
        {achieved.map((m) => (
          <span key={m.growthPct} className="mdb-calcmath">
            +{m.bonusPct}% growth bonus = <strong>{money0(m.bonusProjected)}</strong> {earning.growth.bonusOn}
          </span>
        ))}
      </>
    ),
    note: belowMinimum
      ? `Reach ${money0(earning.tierTable.tiers[0].min)} in Eligible Brand Purchases to begin earning ${earning.tierTable.tiers[0].pct}%.`
      : `Deposited February ${nextFebruary}.`,
  })

  return (
    <div className="mdb-stepper">
      {steps.map((s, i) => (
        <div key={i} className="mdb-stepper__step">
          {/* "=" on the result step: reads as math, not as progress state */}
          <div className="mdb-stepper__marker">{s.result ? '=' : i + 1}</div>
          <div>
            <div className="mdb-stepper__label">{s.label}</div>
            <div className="mdb-stepper__value">{s.value}</div>
            {s.note && <div className="mdb-stepper__note">{s.note}</div>}
          </div>
        </div>
      ))}
    </div>
  )
}

function TierLadder({ earning }) {
  return (
    <Table size="sm" className="mdb-tiertable mb-0">
      <thead>
        <tr>
          <th>Eligible Brand Purchases</th>
          <th className="text-end">{earning.tierTable.benefitLabel} earned</th>
        </tr>
      </thead>
      <tbody>
        {earning.tierTable.tiers.map((t) => {
          const current = earning.eligible >= t.min && (t.max === null || earning.eligible <= t.max)
          return (
            <tr key={t.min} className={current ? 'mdb-tiertable__current' : undefined}>
              <td>
                {money0(t.min)}
                {t.max === null ? ' +' : ` – ${money0(Math.floor(t.max))}`}
                {current && <Badge bg="primary" className="ms-2">You are here</Badge>}
              </td>
              <td className="text-end">{t.pct.toFixed(1)}%</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

function YoY({ value }) {
  return (
    <span className={value >= 0 ? 'text-success' : 'text-danger'}>
      {value >= 0 ? '↑' : '↓'} {Math.abs(value)}% vs last year
    </span>
  )
}

// For non-tiered programs the growth milestone is the actionable nudge.
function GrowthNudge({ growth }) {
  const next = growth.milestones.find((m) => !m.achieved)
  if (!next) return null
  return (
    <div className="mdb-nexttier mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-1">
        <span>
          You&apos;ve grown <strong>{growth.currentGrowthPct}%</strong> over last year — reach{' '}
          <strong>{next.growthPct}%</strong> growth to upgrade your bonus to +{next.bonusPct}% {growth.bonusOn}.
        </span>
        <span className="small text-secondary">{money0(next.gap)} to go</span>
      </div>
      <ProgressBar now={(growth.currentGrowthPct / next.growthPct) * 100} variant="success" className="mdb-progress" />
    </div>
  )
}
