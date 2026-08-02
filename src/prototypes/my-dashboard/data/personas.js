// =============================================================================
// Mock personas for the My Dashboard — Incentive Programs prototype.
// =============================================================================
// Every number is precomputed fake data, kept internally consistent with the
// real program mechanics from "Incentive Programs - Program Offerings" (see
// ../context/): Eligible Brand Purchases determine the tier achieved, then the
// percentage is applied to Rebatable Purchases. Balances available "now" were
// funded in February from LAST year's purchases; what's being earned this year
// funds next February.
//
// "Today" inside this prototype is August 1, 2026.
// =============================================================================

// Standard tier ladder shared by programs #2 (Marketing Fund) and #4 (Rebate
// Credit) — the two programs that together cover ~72% of enrolled customers.
const TIERS_STANDARD = [
  { min: 25000, max: 49999.99, pct: 1.0 },
  { min: 50000, max: 74999.99, pct: 1.5 },
  { min: 75000, max: 124999.99, pct: 2.0 },
  { min: 125000, max: 174999.99, pct: 2.5 },
  { min: 175000, max: 224999.99, pct: 3.0 },
  { min: 225000, max: 299999.99, pct: 3.5 },
  { min: 300000, max: 399999.99, pct: 4.0 },
  { min: 400000, max: null, pct: 5.0 },
]

export const PERSONAS = [
  // ---------------------------------------------------------------------------
  // 1. The majority case — program #2, single tiered Marketing Fund (51.5% of
  //    enrolled customers are on this program).
  // ---------------------------------------------------------------------------
  {
    id: 'standard',
    switcherLabel: 'Standard MF (#2)',
    switcherTag: '51.5%', // 7,018 of 13,618 enrolled customers
    switcherHint: 'The majority case — tiered Marketing Fund',
    scenario: 'enrolled',
    program: {
      code: '#2',
      name: 'Tiered Marketing Fund',
      family: 'Standard Incentive Program',
      minimum: 25000,
    },
    balances: [
      {
        type: 'mf',
        remaining: 2179.75,
        funded: 5240.5,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        expires: 'January 31, 2027',
        expiresIn: '6 months',
        // Oldest → newest; the deposit first, then spends. Sums to `remaining`.
        history: [
          { date: 'Feb 7, 2026', desc: 'Annual deposit — 2025 program earnings', amount: 5240.5 },
          { date: 'Mar 14, 2026', desc: 'Sample order — Port Authority spring line (#SO-118423)', amount: -842.25 },
          { date: 'Apr 2, 2026', desc: 'Spring catalogs, 250 qty (#SO-119081)', amount: -1260.0 },
          { date: 'May 20, 2026', desc: 'Showroom displays & supplies (#SO-120114)', amount: -618.5 },
          { date: 'Jun 30, 2026', desc: 'Wearable samples — District tees (#SO-121598)', amount: -340.0 },
        ],
      },
    ],
    // Deliberately non-round customer numbers so they don't read as tier
    // thresholds (only the ladder's own boundaries are round).
    earning: {
      year: 2026,
      eligible: 203485,
      eligibleYoY: 6.2, // vs this point last year
      rebatable: 151900,
      rows: [{ type: 'mf', label: 'Marketing Fund', pct: 3.0, projected: 4557 }],
      tierTable: { tiers: TIERS_STANDARD, benefitLabel: 'Marketing Fund' },
      currentPct: 3.0,
      // payoff: tiers apply retroactively to the full year, so crossing pays
      // (3.5 − 3.0)% × rebatable-to-date ≈ $760 on purchases already made.
      nextTier: { pct: 3.5, threshold: 225000, gap: 21515, payoff: 760 },
      // run-rate: $203,485 by Aug 1 (~58% of the year) → ≈ $349k full-year
      paceFinish: 349000,
      paceNote: 'the 4.0% tier',
    },
  },

  // ---------------------------------------------------------------------------
  // 2. The second-largest program — #4, single tiered Rebate Credit (20.1% of
  //    enrolled customers). Same shape as #2 with the benefit swapped; together
  //    #2 + #4 cover ~72% of all enrolled customers.
  // ---------------------------------------------------------------------------
  {
    id: 'standard-rc',
    switcherLabel: 'Standard RC (#4)',
    switcherTag: '20.1%', // 2,733 of 13,618
    switcherHint: 'Second-largest — tiered Rebate Credit',
    scenario: 'enrolled',
    program: {
      code: '#4',
      name: 'Tiered Rebate Credit',
      family: 'Standard Incentive Program',
      minimum: 25000,
    },
    balances: [
      {
        type: 'rc',
        remaining: 3912.75,
        funded: 5847.0,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        invoiceNo: 'RBT-000121556',
      },
    ],
    earning: {
      year: 2026,
      eligible: 127842,
      eligibleYoY: 9.1,
      rebatable: 95640,
      rows: [{ type: 'rc', label: 'Rebate Credit', pct: 2.5, projected: 2391 }],
      tierTable: { tiers: TIERS_STANDARD, benefitLabel: 'Rebate Credit' },
      currentPct: 2.5,
      nextTier: { pct: 3.0, threshold: 175000, gap: 47158, payoff: 478 },
      paceFinish: 219000,
      paceNote: 'holding your 3.0% tier',
    },
  },

  // ---------------------------------------------------------------------------
  // 3. The largest buying-group program with an at-order benefit — IP Proforma:
  //    4% Off-Invoice Discount + flat 1% Marketing Fund. Demonstrates benefit
  //    stacking, the "invisible" automatic discount, and the buying-group
  //    family.
  // ---------------------------------------------------------------------------
  {
    id: 'proforma',
    switcherLabel: 'Proforma',
    switcherTag: '3.3%', // 448 of 13,618
    switcherHint: 'Buying group — Off-Invoice Discount + flat Marketing Fund',
    scenario: 'enrolled',
    program: {
      code: 'IP Proforma',
      name: 'Off-Invoice Discount & Marketing Fund',
      family: 'Buying Group Incentive Program',
      minimum: 50000,
    },
    balances: [
      {
        type: 'mf',
        remaining: 412.6,
        funded: 655.0,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        expires: 'January 31, 2027',
        expiresIn: '6 months',
        history: [
          { date: 'Feb 7, 2026', desc: 'Annual deposit — 2025 program earnings', amount: 655.0 },
          { date: 'May 11, 2026', desc: 'Sample order — CornerStone workwear (#SO-120493)', amount: -242.4 },
        ],
      },
      {
        type: 'oid',
        pct: 4.0,
        appliesTo: 'private label and retail brand purchases',
        ytdSavings: 2830.2,
      },
    ],
    earning: {
      year: 2026,
      eligible: 91368,
      eligibleYoY: 3.4,
      rebatable: 72400,
      rows: [{ type: 'mf', label: 'Marketing Fund', pct: 1.0, projected: 724 }],
      tierTable: null,
    },
  },

  // ---------------------------------------------------------------------------
  // 4. The power customer — IP Million Combo: flat MF + flat RC + Growth
  //    Incentive. No tier ladder; growth milestones instead.
  // ---------------------------------------------------------------------------
  {
    id: 'million',
    switcherLabel: 'Million Combo',
    switcherTag: '0.2%', // 23 of 13,618
    switcherHint: 'MF + RC + Growth Incentive',
    scenario: 'enrolled',
    program: {
      code: 'IP Million Combo',
      name: 'Marketing Fund, Rebate Credit & Growth Incentive',
      family: 'Custom-tier Incentive Program',
      minimum: 1000000,
    },
    balances: [
      {
        type: 'mf',
        remaining: 6412.18,
        funded: 9850,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        expires: 'January 31, 2027',
        expiresIn: '6 months',
        history: [
          { date: 'Feb 7, 2026', desc: 'Annual deposit — 2025 program earnings', amount: 9850.0 },
          { date: 'Mar 3, 2026', desc: 'Sample order — Eddie Bauer outerwear (#SO-117854)', amount: -1890.32 },
          { date: 'Apr 22, 2026', desc: 'Showroom refresh — displays & supplies (#SO-119760)', amount: -1047.5 },
          { date: 'Jul 8, 2026', desc: 'Catalogs, 100 qty (#SO-122341)', amount: -500.0 },
        ],
      },
      {
        type: 'rc',
        remaining: 38502.44,
        funded: 54100,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        invoiceNo: 'RBT-000129417',
      },
    ],
    earning: {
      year: 2026,
      eligible: 1437206,
      rebatable: 1101300,
      rows: [
        { type: 'mf', label: 'Marketing Fund', pct: 1.0, projected: 11013 },
        { type: 'rc', label: 'Rebate Credit', pct: 5.0, projected: 55065 },
      ],
      tierTable: null,
      growth: {
        bonusOn: 'Rebate Credit',
        lastYearEligible: 1264180,
        currentGrowthPct: 13.7,
        milestones: [
          { growthPct: 10, bonusPct: 1, achieved: true, bonusProjected: 11013 },
          { growthPct: 25, bonusPct: 2, achieved: false, threshold: 1580225, gap: 143019 },
        ],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // 5. At risk — on #2, but 2025 fell below the $25k minimum and 2026 is
  //    tracking below it too. Two consecutive years below = removed.
  // ---------------------------------------------------------------------------
  {
    id: 'at-risk',
    switcherLabel: 'At risk',
    switcherTag: 'edge case',
    switcherHint: '2nd year below the $25k minimum',
    scenario: 'atRisk',
    program: {
      code: '#2',
      name: 'Tiered Marketing Fund',
      family: 'Standard Incentive Program',
      minimum: 25000,
    },
    // 2025 ended below $25k, so nothing was funded in February 2026.
    balances: [],
    earning: {
      year: 2026,
      eligible: 14362,
      eligibleYoY: -8.4,
      rebatable: 11057,
      rows: [],
      tierTable: { tiers: TIERS_STANDARD, benefitLabel: 'Marketing Fund' },
      currentPct: 0,
      nextTier: { pct: 1.0, threshold: 25000, gap: 10638, payoff: 111 },
      paceFinish: 24600,
      paceNote: 'just below the $25,000 minimum',
    },
    atRisk: {
      lastYearEligible: 19850,
      minimum: 25000,
      gap: 10638,
      deadline: 'December 31, 2026',
    },
  },

  // ---------------------------------------------------------------------------
  // 6. Funding on hold — earning normally, but the account is past terms. Per
  //    the program docs, funds are not issued to accounts that have not paid
  //    within terms, so the February deposit is at risk.
  // ---------------------------------------------------------------------------
  {
    id: 'on-hold',
    switcherLabel: 'Funding on hold',
    switcherTag: 'edge case',
    switcherHint: 'Account past terms — February funding at risk',
    scenario: 'onHold',
    program: {
      code: '#4',
      name: 'Tiered Rebate Credit',
      family: 'Standard Incentive Program',
      minimum: 25000,
    },
    balances: [
      {
        type: 'rc',
        remaining: 1148.6,
        funded: 2204.0,
        fundedNote: 'Funded February 2026 from your 2025 purchases',
        invoiceNo: 'RBT-000117204',
      },
    ],
    earning: {
      year: 2026,
      eligible: 96470,
      eligibleYoY: 2.1,
      rebatable: 74830,
      rows: [{ type: 'rc', label: 'Rebate Credit', pct: 2.0, projected: 1497 }],
      tierTable: { tiers: TIERS_STANDARD, benefitLabel: 'Rebate Credit' },
      currentPct: 2.0,
      nextTier: { pct: 2.5, threshold: 125000, gap: 28530, payoff: 374 },
      paceFinish: 165400,
      paceNote: 'the 2.5% tier',
    },
    onHold: {
      pastDue: 6412.8,
      invoices: 3,
    },
  },

  // ---------------------------------------------------------------------------
  // 7. New customer — not enrolled in any program. Sees what programs are and
  //    how to get in.
  // ---------------------------------------------------------------------------
  {
    id: 'new',
    switcherLabel: 'New customer',
    switcherTag: 'edge case',
    switcherHint: 'Not enrolled — what do they see?',
    scenario: 'new',
    program: null,
    balances: [],
    earning: null,
    enrollment: {
      ytdEligible: 8732,
      threshold: 25000,
      repName: 'Alex Morgan',
      repPhone: '1-800-426-6399',
    },
  },
]

// Plain-English glossary used by the info tooltips. The two purchase
// definitions are the #1 thing sales currently explains over the phone.
export const GLOSSARY = {
  eligible:
    'Eligible Brand Purchases — everything you buy from private label, retail, and A4 brands this calendar year (invoiced orders only). This number decides your tier.',
  rebatable:
    'Rebatable Purchases — the full-price portion of your eligible purchases. Sale-priced, TVBP, closeout and a few excluded styles don’t count. Your earned percentage is calculated on this number.',
  mf: 'Marketing Funds can be used for samples, showroom supplies, catalogs, and other marketing purchases at full price. They expire January 31 of the year after they are funded.',
  rc: 'Rebate Credits are applied toward any open invoice — yours to direct, and they never expire.',
  oid: 'An Off-Invoice Discount is taken automatically at the time of order — no balance to track.',
}
