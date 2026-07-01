import { useNavigate, Navigate } from 'react-router-dom'
import { Container, Button, Table } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import AccountSidebar from './components/AccountSidebar.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { generateReturnPdf } from './pdf/generateReturnPdf.js'
import './ReturnDetails.css'

const demo = (e) => e.preventDefault()
const money = (n) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

// Inlined Bootstrap Icons.
const CheckCircle = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-success" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
)
const XCircle = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-danger" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
  </svg>
)
const ClockCircle = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="text-warning" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
  </svg>
)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
  </svg>
)
const PrinterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zm0 1h6a1 1 0 0 1 1 1v2H4V3a1 1 0 0 1 1-1m6 8a1 1 0 0 1 1 1v2H4v-2a1 1 0 0 1 1-1zm3-4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
  </svg>
)
const FileIcon = () => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2z" />
  </svg>
)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
  </svg>
)
const ChevronUp = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-secondary" aria-hidden="true">
    <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z" />
  </svg>
)

const STATUS = {
  pending: { label: 'Return started', icon: <ClockCircle /> },
  approved: { label: 'Return approved', icon: <CheckCircle /> },
  rejected: { label: 'Return rejected', icon: <XCircle /> },
}

const PACK_STEPS = [
  'Pack items securely in original packaging if possible',
  'Remove or cover any old shipping labels',
  'Place the first page of the Packing List outside of the box',
  'Seal boxes with strong tape',
  'Attach one shipping label per package',
]

// Everything below is hardcoded return content (the same regardless of which row
// was clicked); only the WRR / order-number IDs + status come from the click.
const ITEMS = [
  { style: 'BP33', color: 'Kelly Green', colorHex: '#39845D', size: 'OSFA', qty: 10, warehouse: 'Reno, NV', price: 6.74, total: 67.40 },
  { style: 'DT6105', color: 'Heathered Charcoal', colorHex: '#45484b', size: 'XL', qty: 10, warehouse: 'Seattle, WA', price: 9.28, total: 92.80 },
]
const merchandiseTotal = ITEMS.reduce((s, it) => s + it.total, 0)
const FEES_TOTAL = 25.0
const TAX = 6.37
const orderTotal = merchandiseTotal + FEES_TOTAL + TAX

// =============================================================================
// ReturnDetails — the view-a-return detail screen (Returns tab -> click a row).
// =============================================================================
export default function ReturnDetails() {
  const navigate = useNavigate()
  const { viewedReturn: r } = useReturns()

  // No return selected (refresh / direct deep link) → back to Order History.
  if (!r) return <Navigate to="/simplified-returns" replace />

  const status = STATUS[r.status] ?? STATUS.pending
  const usesLabels = /sanmar/i.test(r.shippingOption) && /label/i.test(r.shippingOption)
  const handleDownload = () =>
    generateReturnPdf({
      items: ITEMS.map((it) => ({ product: { styleNumber: it.style, colorName: it.color, size: it.size }, entry: { qty: it.qty } })),
      boxes: 3,
      includeLabels: usesLabels,
      refNo: r.onlineRefNo,
      orderNo: r.orderNo,
    })

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-4 flex-grow-1">
        <div className="rd-crumb mb-3">My SanMar</div>

        <div className="rd-layout">
          <AccountSidebar active="Order History" />

          <div className="rd-main">
            <h2 className="h5 mb-1">My Order History</h2>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/simplified-returns') }} className="rd-back text-decoration-none">
              &lsaquo; Back to All Order History
            </a>

            {/* Order summary */}
            <div className="rd-card">
              <div className="rd-card__body rd-summary">
                <div>
                  <div className="rd-label">Order Number</div>
                  <div className="rd-ordno">{r.orderNo}</div>
                  <div className="small text-secondary mt-1">Order Date: 09/04/25</div>
                  <div className="small text-secondary">Order Total: $68.77</div>
                </div>
                <div>
                  <div className="rd-label">Ship-To Name</div>
                  <div className="fw-bold">Eastpointe</div>
                  <div className="fw-bold">Employee Pickup</div>
                  <div className="small mt-2">PO #: Kelly Campbell</div>
                </div>
                <div>
                  <div className="rd-label">Invoice(s)</div>
                  <div>INV-152100090</div>
                </div>
                <div className="rd-summary__actions">
                  <div className="d-flex gap-3 justify-content-end mb-2">
                    <a href="#" onClick={demo} className="d-inline-flex align-items-center gap-1 text-decoration-none"><PrinterIcon /> Print</a>
                    <a href="#" onClick={demo} className="d-inline-flex align-items-center gap-1 text-decoration-none"><FileIcon /> Save to file</a>
                  </div>
                  <Button variant="primary" className="d-inline-flex align-items-center gap-2" onClick={handleDownload}>
                    <DownloadIcon /> Download Shipping Documents
                  </Button>
                </div>
              </div>
            </div>

            {/* Return Details */}
            <div className="rd-card">
              <div className="rd-card__head"><span>Return Details</span><ChevronUp /></div>
              <div className="rd-card__body">
                <div className="rd-meta">
                  <div>Web Return Reference&nbsp;#</div>
                  <div><a href="#" onClick={demo} className="text-decoration-none">{r.onlineRefNo}</a></div>
                  <div>Status</div>
                  <div className="d-flex align-items-center gap-2">{status.icon}<span>{status.label}</span></div>
                  <div>Original Order</div>
                  <div><a href="#" onClick={demo} className="text-decoration-none">{r.originalOrderNo}</a></div>
                  <div>Associated Replacement</div>
                  <div><a href="#" onClick={demo} className="text-decoration-none">SO-151212453</a></div>
                  <div>Submitted</div>
                  <div>February 28, 2026 at 2:34PM</div>
                  <div>Return deadline</div>
                  <div>March 28, 2026 at 2:34PM</div>
                  <div>Ship to Warehouse:</div>
                  <div>Dallas, TX</div>
                  <div>Shipping method:</div>
                  <div>{r.shippingOption}</div>
                  <div>Packaging:</div>
                  <div>3 boxes</div>
                </div>

                <div className="rd-pack">
                  <div className="d-flex align-items-center gap-2 fw-bold">
                    <InfoIcon /> How to pack your return:
                  </div>
                  <ol className="mb-0">
                    {PACK_STEPS.map((s) => <li key={s}>{s}</li>)}
                  </ol>
                </div>
              </div>
            </div>

            {/* Items for Return */}
            <div className="rd-card">
              <div className="rd-card__head"><span>Items for Return</span><ChevronUp /></div>
              <div className="rd-card__body">
                <Table responsive className="rd-items align-middle mb-3">
                  <thead>
                    <tr>
                      <th>Style #</th><th>Color</th><th>Size</th><th>Quantity</th><th>Warehouse</th>
                      <th className="text-end">Price Per Item</th><th className="text-end">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ITEMS.map((it) => (
                      <tr key={it.style}>
                        <td><a href="#" onClick={demo} className="text-decoration-none">{it.style}</a></td>
                        <td>
                          <span className="rd-swatch" style={{ background: it.colorHex }} />
                          {it.color}
                        </td>
                        <td>{it.size}</td>
                        <td>{it.qty}</td>
                        <td>{it.warehouse}</td>
                        <td className="text-end">{money(it.price)}</td>
                        <td className="text-end">-{money(it.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="text-end fw-bold">Merchandise Total: {money(merchandiseTotal)}</div>
              </div>
            </div>

            {/* Fees & Savings */}
            <div className="rd-card">
              <div className="rd-card__head"><span>Fees &amp; Savings</span></div>
              <div className="rd-card__body">
                <div className="rd-fee-row"><span>Shipping</span><span>$0.00</span></div>
                <div className="rd-fee-row"><span>Restocking Fee</span><span>{money(FEES_TOTAL)}</span></div>
                <div className="rd-fee-total text-end">
                  Fees Total: {money(FEES_TOTAL)}
                  <div className="small text-secondary fw-normal">+ Tax: {money(TAX)}</div>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="rd-card">
              <div className="rd-card__body text-end fw-bold rd-order-total">Order Total: {money(orderTotal)}</div>
            </div>
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
