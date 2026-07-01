import { useNavigate, Navigate } from 'react-router-dom'
import { Container, Button, Table } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import AccountSidebar from './components/AccountSidebar.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import './OrderDetails.css'

const demo = (e) => e.preventDefault()
const isRef = (v) => v.startsWith('SO-')

const ReorderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
    <path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
  </svg>
)

// All hardcoded order content — only the order number is dynamic (from the click).
const SHIPMENTS = [
  {
    n: 1, subtotal: '$687.3', carrier: 'WILL-EAST', tracking: 'LP012782929',
    items: [
      { style: 'PC54', color: 'Athletic Kelly', colorHex: '#39845D', size: 'XL', qty: 10, price: '$2.44', amount: '$24.4' },
      { style: 'DT156', color: 'Grey Frost', colorHex: '#b8bcbe', size: 'S', qty: 20, price: '$10.34', amount: '$206.8' },
    ],
  },
  {
    n: 2, subtotal: '$1,666.31', carrier: 'WILL-PICK', tracking: 'LP053124593',
    items: [
      { style: 'MM7217', color: 'Night Navy', colorHex: '#1c2333', size: 'XS', qty: 8, price: '$39.11', amount: '$312.88' },
      { style: 'MM7217', color: 'Night Navy', colorHex: '#1c2333', size: 'S', qty: 10, price: '$39.11', amount: '$319.11' },
    ],
  },
]

const ORDER_RETURNS = [
  { wrr: 'WRR-1531', returnOrderNo: 'SO-91920512', replacement: 'SO-91920512', datePlaced: '02/05/2026', refund: '$0.00', refundNeg: false },
  { wrr: 'WRR-1531', returnOrderNo: 'SO-91920512', replacement: 'Pending', datePlaced: '02/05/2026', refund: '$0.00', refundNeg: false },
  { wrr: 'WRR-12124', returnOrderNo: 'SO-91920231', replacement: '-', datePlaced: '04/18/2026', refund: '-$203.90', refundNeg: true },
]

// =============================================================================
// OrderDetails — the order-detail screen (Orders tab -> click a row).
// =============================================================================
export default function OrderDetails() {
  const navigate = useNavigate()
  const { order } = useReturns()

  // No order selected (refresh / direct deep link) → back to Order History.
  if (!order) return <Navigate to="/simplified-returns" replace />

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-4 flex-grow-1">
        <div className="od-crumb mb-3">My SanMar</div>

        <div className="od-layout">
          <AccountSidebar active="Order History" />

          <div className="od-main">
            <h2 className="h5 mb-1">My Order History</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/simplified-returns') }} className="od-back text-decoration-none">
              &lsaquo; Back to All Order History
            </a>

            {/* Order summary */}
            <div className="od-card">
              <div className="od-card__body od-summary">
                <div>
                  <div className="od-label">Order Number</div>
                  <div className="od-ordno">{order.orderNo}</div>
                  <div className="small mt-2"><span className="fw-bold">Return Placed:</span> 12/24/25</div>
                  <div className="small"><span className="fw-bold">Refund Total:</span> $924.42</div>
                </div>
                <div>
                  <div className="od-label">Ship-To Name</div>
                  <div className="fw-bold" style={{ fontSize: 18 }}>Steven Gerrard</div>
                  <div className="small mt-2"><span className="fw-bold">PO#:</span> John Doe</div>
                </div>
                <div>
                  <div className="od-label">Invoice(s)</div>
                  <div>INV-15210090</div>
                </div>
                <div className="text-end">
                  <Button variant="primary" className="d-inline-flex align-items-center gap-2">
                    <ReorderIcon /> Reorder
                  </Button>
                </div>
              </div>
            </div>

            {/* Shipped */}
            <div className="od-card">
              <div className="od-card__head">Shipped</div>
              <div className="od-card__body">
                {SHIPMENTS.map((s, si) => (
                  <div key={s.n} className={si > 0 ? 'mt-5' : ''}>
                    <div className="od-ship-meta">
                      <span className="fw-bold">Shipment {s.n}</span>
                      <span><span className="fw-bold">Subtotal:</span> {s.subtotal}</span>
                      <span><span className="fw-bold">Carrier:</span> {s.carrier}</span>
                      <span><span className="fw-bold">Tracking:</span> {s.tracking}</span>
                    </div>
                    <Table responsive className="od-items align-middle mt-2 mb-0">
                      <thead>
                        <tr>
                          <th>Style</th><th>Color</th><th>Size</th><th>Qty</th>
                          <th>Price per item</th><th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {s.items.map((it, i) => (
                          <tr key={i}>
                            <td><a href="#" onClick={demo} className="text-decoration-none">{it.style}</a></td>
                            <td><span className="od-swatch" style={{ background: it.colorHex }} />{it.color}</td>
                            <td>{it.size}</td>
                            <td>{it.qty}</td>
                            <td>{it.price}</td>
                            <td className="text-end">{it.amount}</td>
                          </tr>
                        ))}
                        {si === SHIPMENTS.length - 1 && (
                          <tr className="od-total-tr">
                            <td className="fw-bold">Total</td><td /><td />
                            <td className="fw-bold">18</td><td />
                            <td className="text-end fw-bold">$863.19</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees & Savings */}
            <div className="od-card">
              <div className="od-card__head">Fees &amp; Savings</div>
              <div className="od-card__body">
                <div className="od-fee-row"><span>Shipping</span><span>$0.00</span></div>
                <div className="od-fee-row"><span>Handling fee</span><span>$0.00</span></div>
                <div className="od-fee-total text-end">
                  Fees Total: $0.00
                  <div className="small text-secondary fw-normal">+ Tax: $36.37</div>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="od-card">
              <div className="od-card__body text-end fw-bold od-order-total">Order Total: $2,389.98</div>
            </div>

            {/* Returns */}
            <div className="od-card">
              <div className="od-card__head">Returns</div>
              <div className="od-card__body">
                <Table responsive className="od-items align-middle mb-0">
                  <thead>
                    <tr>
                      <th>WRR No</th><th>Return Order No</th><th>Replacement Order No</th>
                      <th>Date Placed</th><th>Refund Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORDER_RETURNS.map((r, i) => (
                      <tr key={i}>
                        <td>{r.wrr}</td>
                        <td><a href="#" onClick={demo} className="text-decoration-none">{r.returnOrderNo}</a></td>
                        <td>{isRef(r.replacement) ? <a href="#" onClick={demo} className="text-decoration-none">{r.replacement}</a> : r.replacement}</td>
                        <td>{r.datePlaced}</td>
                        <td className={r.refundNeg ? 'text-success fw-semibold' : ''}>{r.refund}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
