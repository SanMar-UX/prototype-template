// Mock submitted returns for the "Returns" tab of My Order History.
// status: 'pending' (amber) | 'approved' (green) | 'rejected' (red).
// Dates generated relative to now(), sorted newest-first (like the Orders tab).

const MS_PER_DAY = 24 * 60 * 60 * 1000
const formatDate = (d) => d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })

const ROWS = [
  { status: 'pending', onlineRefNo: 'WR-0921210', orderNo: 'SO-113533222', originalOrderNo: 'SO-1135324321', shippingOption: 'Drop off at SanMar warehouse', amount: 429.23 },
  { status: 'pending', onlineRefNo: 'WR-0921210', orderNo: 'SO-140234534', originalOrderNo: 'SO-1445636434', shippingOption: 'SanMar prepaid labels (FREE)', amount: 1203.02 },
  { status: 'approved', onlineRefNo: 'WR-0921210', orderNo: 'SO-140234277', originalOrderNo: 'SO-1426000008', shippingOption: 'Own carrier', amount: 240.99 },
  { status: 'rejected', onlineRefNo: 'WR-092143', orderNo: 'SO-1431242213', originalOrderNo: 'SO-1426000008', shippingOption: 'SanMar prepaid labels', amount: 19929.15 },
  { status: 'approved', onlineRefNo: '300019829', orderNo: 'SO-143464455', originalOrderNo: 'SO-1125325322', shippingOption: 'No shipback required', amount: 2.87 },
]

export const RETURNS = ROWS
  .map((r, i) => {
    const daysAgo = 4 + i * 21 + Math.floor(Math.random() * 12)
    const date = new Date(Date.now() - daysAgo * MS_PER_DAY)
    return { ...r, date, datePlaced: formatDate(date) }
  })
  .sort((a, b) => b.date - a.date)

export const RETURNS_TOTAL = 421
