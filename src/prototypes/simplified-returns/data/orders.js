// Mock order history for the "My Order History" account page.
//
// Dates are generated relative to now() on each page load so the prototype stays
// current whenever research runs: ~half the orders fall within the last 30 days
// (inside the return window → Initiate-return arrow is active) and the rest are
// 31–60 days ago (arrow disabled). Rows are sorted newest-first.

const MS_PER_DAY = 24 * 60 * 60 * 1000
const RETURN_WINDOW_DAYS = 30

const formatDate = (d) => d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

// Order identity only — datePlaced + returnable are derived below.
const ROWS = [
  { orderNo: 'SO-140396992', poNo: '1425674323', shippedTo: 'Steven Gerrard' },
  { orderNo: 'SO-140325112', poNo: '234675665', shippedTo: 'Dilbar Akunova' },
  { orderNo: 'SO-140334322', poNo: '234665453', shippedTo: 'Marta Stewart' },
  { orderNo: 'SO-14234233', poNo: '2346576567', shippedTo: 'Jurgen Klopp' },
  { orderNo: 'SO-13098303', poNo: '235465333', shippedTo: 'Fabricio Romano' },
  { orderNo: 'SO-140234534', poNo: '2378645323', shippedTo: 'Pamela Stones' },
  { orderNo: 'SO-140325113', poNo: '234675665', shippedTo: 'Dilbar Akunova' },
  { orderNo: 'SO-14346544', poNo: '2435785576', shippedTo: 'Lillian Fernandez' },
  { orderNo: 'SO-140235654', poNo: '234575645', shippedTo: 'Sergiy Potapov' },
  { orderNo: 'SO-140323565', poNo: '2534677564', shippedTo: 'Alisson Becker' },
  { orderNo: 'SO-140396993', poNo: '9856746323', shippedTo: 'Ibraim Konate' },
  { orderNo: 'SO-140324364', poNo: '354656453', shippedTo: 'Luis Suarez' },
  { orderNo: 'SO-134654733', poNo: '3645764332', shippedTo: 'Curtis Jones' },
  { orderNo: 'SO-142453655', poNo: '867456354', shippedTo: 'Elena Purewall' },
  { orderNo: 'SO-143457653', poNo: '235466332', shippedTo: 'Barbara Thomas' },
  { orderNo: 'SO-156853423', poNo: '3455653344', shippedTo: 'Justin Flanagan' },
  { orderNo: 'SO-124536547', poNo: '234565763', shippedTo: 'Tim Cook' },
  { orderNo: 'SO-145665433', poNo: '346576352', shippedTo: 'Rebecca Kona' },
  { orderNo: 'SO-140345655', poNo: '3647565635', shippedTo: 'Francesco Totti' },
]

export const ORDERS = ROWS
  .map((o, i) => {
    const inWindow = i < Math.ceil(ROWS.length / 2) // ~half within the return window
    const daysAgo = inWindow
      ? Math.floor(Math.random() * (RETURN_WINDOW_DAYS + 1))        // 0–30
      : RETURN_WINDOW_DAYS + 1 + Math.floor(Math.random() * 30)     // 31–60
    const date = new Date(Date.now() - daysAgo * MS_PER_DAY)
    return { ...o, date, datePlaced: formatDate(date), returnable: daysAgo <= RETURN_WINDOW_DAYS }
  })
  .sort((a, b) => b.date - a.date) // newest first

export const ORDERS_TOTAL = 421
