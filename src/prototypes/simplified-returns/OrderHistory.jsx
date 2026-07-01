import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Button, Table, Alert } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import AccountSidebar from './components/AccountSidebar.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { ORDERS, ORDERS_TOTAL } from './data/orders.js'
import { RETURNS, RETURNS_TOTAL } from './data/returns.js'
import './OrderHistory.css'

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
const StatusIcon = ({ status }) => (status === 'approved' ? <CheckCircle /> : status === 'rejected' ? <XCircle /> : <ClockCircle />)

const ReturnArrow = ({ className }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
  </svg>
)
const FunnelIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
  </svg>
)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 mt-1" aria-hidden="true">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
  </svg>
)

// Shared search + filter controls (labels differ per tab).
function SearchAndFilters({ heading, numberLabel, numberPlaceholder, firstFilterLabel }) {
  return (
    <>
      <div className="mb-2 fw-semibold">{heading}</div>
      <div className="d-flex flex-wrap gap-2 align-items-center">
        <Form.Select style={{ maxWidth: 240 }} defaultValue="n"><option value="n">{numberLabel}</option></Form.Select>
        <Form.Control style={{ maxWidth: 320 }} placeholder={numberPlaceholder} />
        <Button variant="primary">Help Me Find It</Button>
      </div>
      <div className="d-flex justify-content-end my-2">
        <a href="#" onClick={demo} className="d-inline-flex align-items-center gap-1 text-decoration-none">
          <FunnelIcon /> Advanced Search
        </a>
      </div>

      <div className="oh-filters mb-4">
        <Form.Group>
          <Form.Label className="small mb-1">{firstFilterLabel}</Form.Label>
          <Form.Select defaultValue="all"><option value="all">All</option></Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="small mb-1">Placed</Form.Label>
          <Form.Select defaultValue="30"><option value="30">Previous 30 days</option><option value="90">Previous 90 days</option></Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="small mb-1">From</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="small mb-1">To</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group>
          <Form.Label className="small mb-1">Included Color</Form.Label>
          <Form.Select defaultValue="all"><option value="all">All</option></Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="small mb-1">Included Size</Form.Label>
          <Form.Control placeholder="All" />
        </Form.Group>
        <div className="oh-filters__action">
          <Button variant="primary">Search</Button>
        </div>
      </div>
    </>
  )
}

function TablePager({ shown, total }) {
  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
      <span className="text-secondary small">Showing {shown} of {total}</span>
      <nav className="d-flex align-items-center gap-1">
        <a href="#" onClick={demo} className="oh-page">&laquo;</a>
        <a href="#" onClick={demo} className="oh-page">&lsaquo;</a>
        <span className="oh-page oh-page--active">1</span>
        {[2, 3, 4, 5].map((n) => <a key={n} href="#" onClick={demo} className="oh-page">{n}</a>)}
        <a href="#" onClick={demo} className="oh-page">&rsaquo;</a>
        <a href="#" onClick={demo} className="oh-page">&raquo;</a>
      </nav>
      <div className="d-flex align-items-center gap-2">
        <span className="small text-secondary">Items Per Page</span>
        <Form.Select size="sm" style={{ width: 80 }} defaultValue="20">
          <option>20</option><option>50</option><option>100</option>
        </Form.Select>
      </div>
    </div>
  )
}

function OrdersPanel({ onInitiateReturn, onViewOrder }) {
  return (
    <>
      <SearchAndFilters heading="Search Your Orders" numberLabel="Sales Order Number" numberPlaceholder="Enter Sales Order Number" firstFilterLabel="Order Status" />

      <Alert variant="primary" className="d-flex gap-2 align-items-start">
        <InfoIcon />
        <span>
          Can&apos;t find the order you&apos;re looking for? Check the &apos;Active Orders&apos; tab for orders in transit,
          the &apos;Order History&apos; tab for delivered orders, or contact a SanMar representative at (800) 426-6399 to get assistance.
        </span>
      </Alert>

      <Table hover responsive className="oh-table oh-table--clickable align-middle">
        <thead>
          <tr>
            <th>Status</th><th>Order No</th><th>PO No</th><th>Date Placed</th>
            <th>Shipped To</th><th>Tracking</th><th className="text-end">Initiate return</th>
          </tr>
        </thead>
        <tbody>
          {ORDERS.map((o) => (
            <tr key={o.orderNo} onClick={() => onViewOrder(o)}>
              <td><CheckCircle /></td>
              <td><a href="#" onClick={demo} className="text-decoration-none">{o.orderNo}</a></td>
              <td>{o.poNo}</td>
              <td>{o.datePlaced}</td>
              <td>{o.shippedTo}</td>
              <td><a href="#" onClick={demo} className="text-decoration-none">Track Packages</a></td>
              <td className="text-end">
                {o.returnable ? (
                  <Button variant="link" className="p-0" aria-label={`Initiate return for ${o.orderNo}`} onClick={(e) => { e.stopPropagation(); onInitiateReturn(o) }}>
                    <ReturnArrow />
                  </Button>
                ) : (
                  <ReturnArrow className="text-secondary opacity-25" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePager shown={ORDERS.length} total={ORDERS_TOTAL} />
    </>
  )
}

function ReturnsPanel({ onViewReturn }) {
  return (
    <>
      <SearchAndFilters heading="Return Your Orders" numberLabel="Return Order Number" numberPlaceholder="Enter Return Order Number" firstFilterLabel="Type" />

      <Table hover responsive className="oh-table oh-table--clickable align-middle">
        <thead>
          <tr>
            <th>Status</th><th>Online Ref No</th><th>Order No</th><th>Original Order No</th>
            <th>Shipping option</th><th>Date Placed</th><th className="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          {RETURNS.map((r) => (
            <tr key={r.onlineRefNo + r.orderNo} onClick={() => onViewReturn(r)}>
              <td><StatusIcon status={r.status} /></td>
              <td>{r.onlineRefNo}</td>
              <td><a href="#" onClick={demo} className="text-decoration-none">{r.orderNo}</a></td>
              <td><a href="#" onClick={demo} className="text-decoration-none">{r.originalOrderNo}</a></td>
              <td>{r.shippingOption}</td>
              <td>{r.datePlaced}</td>
              <td className="text-end">{money(r.amount)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <TablePager shown={RETURNS.length} total={RETURNS_TOTAL} />
    </>
  )
}

// =============================================================================
// OrderHistory — the "My Order History" account page. Entry point for both the
// place-a-return flow (Orders tab, Initiate-return arrow) and the view-a-return
// flow (Returns tab).
// =============================================================================
export default function OrderHistory() {
  const navigate = useNavigate()
  const { setOrder, setViewedReturn } = useReturns()
  const [tab, setTab] = useState('orders')

  const initiateReturn = (order) => {
    setOrder(order)                          // carry the chosen order through the flow
    navigate('/simplified-returns/new')
  }
  const viewReturn = (ret) => {
    setViewedReturn(ret)                      // carry the chosen return to the detail screen
    navigate('/simplified-returns/view')
  }
  const viewOrder = (order) => {
    setOrder(order)                           // carry the chosen order to the order-detail screen
    navigate('/simplified-returns/order')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-4 flex-grow-1">
        <div className="oh-crumb mb-3">My SanMar</div>

        <div className="oh-layout">
          <AccountSidebar active="Order History" />

          <div className="oh-main">
            <h1 className="h3 mb-2">My Order History</h1>
            <p className="text-secondary">
              Here you&apos;ll find all your completed and canceled orders. Check the Active Orders tab for orders being
              processed or already in transit.
            </p>

            <div className="oh-tabs">
              <button className={`oh-tab${tab === 'orders' ? ' oh-tab--active' : ''}`} onClick={() => setTab('orders')}>Orders</button>
              <button className={`oh-tab${tab === 'returns' ? ' oh-tab--active' : ''}`} onClick={() => setTab('returns')}>Returns</button>
            </div>

            {tab === 'orders' ? <OrdersPanel onInitiateReturn={initiateReturn} onViewOrder={viewOrder} /> : <ReturnsPanel onViewReturn={viewReturn} />}
          </div>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
