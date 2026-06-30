import { Container, Button, Alert } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import ReturnSummaryTable from './components/ReturnSummaryTable.jsx'
import ReturnFinancials from './components/ReturnFinancials.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { returnItems, boxesForItems } from './state/returnsModel.js'
import { shippingVariant, PAID_LABEL_ID, isSanmarLabel, shippingOptionLabel } from './data/shippingOptions.js'
import { generateReturnPdf } from './pdf/generateReturnPdf.js'
import './ConfirmationScreen.css'

// Inlined Bootstrap Icons.
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
  </svg>
)
const PrinterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
    <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2zm0 1h6a1 1 0 0 1 1 1v2H4V3a1 1 0 0 1 1-1m6 8a1 1 0 0 1 1 1v2H4v-2a1 1 0 0 1 1-1zm3-4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v3H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z" />
  </svg>
)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
  </svg>
)
const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
  </svg>
)

const PACK_STEPS = [
  'Pack items securely in original packaging if possible',
  'Remove or cover any old shipping labels',
  'Seal boxes with strong tape',
  'Attach one shipping label per package',
]

// =============================================================================
// ConfirmationScreen — post-submit confirmation for the Simplified Returns flow.
// =============================================================================
export default function ConfirmationScreen() {
  const { entriesById, shipMethod } = useReturns()
  const items = returnItems(entriesById)

  const variant = shippingVariant(entriesById)
  const selected = shipMethod ?? variant.options[0]?.id

  const totalPieces = items.reduce((s, it) => s + Number(it.entry.qty), 0)
  const boxes = boxesForItems(items)
  const returnShipment = selected === PAID_LABEL_ID ? 5 * boxes : 0

  const methodLabel = variant.notRequired
    ? 'Shipback not required'
    : (shippingOptionLabel(selected)?.replace(/^Use /, '') ?? '—')
  const usesSanmarLabel = isSanmarLabel(selected)
  const downloadLabel = usesSanmarLabel ? 'Download Shipping Documents' : 'Download Packing List'

  const handleDownload = () =>
    generateReturnPdf({ items, boxes, includeLabels: usesSanmarLabel, refNo: 'WRR-9112', orderNo: 'SO-9190092' })

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        <Alert variant="success" className="d-flex align-items-center gap-2">
          <CheckIcon />
          Your return has been started
        </Alert>

        <div className="d-flex justify-content-between align-items-start mb-3">
          <h2 className="h4 mb-0">Return Details</h2>
          <Button
            variant="outline-primary"
            className="d-inline-flex align-items-center gap-2"
            onClick={() => window.print()}
          >
            <PrinterIcon />
            Print Confirmation
          </Button>
        </div>

        <div className="conf-meta mb-4">
          <div className="fw-bold">Web Return Reference&nbsp;#:</div>
          <div><a href="#" onClick={(e) => e.preventDefault()}>WRR-9112</a></div>
          <div className="fw-bold">Original order:</div>
          <div><a href="#" onClick={(e) => e.preventDefault()}>SO-9190092</a></div>
          <div className="fw-bold">Submitted:</div>
          <div>February 28, 2026 at 2:34PM</div>
          <div className="fw-bold">Ship to Warehouse:</div>
          <div>Dallas, TX</div>
          <div className="fw-bold">Shipping method:</div>
          <div>{methodLabel}</div>
          <div className="fw-bold">Packaging:</div>
          <div>{boxes} boxes, {totalPieces} items</div>
        </div>

        <div className="conf-pack mb-4">
          <div className="d-flex align-items-center gap-2 fw-bold">
            <InfoIcon />
            How to pack your return:
          </div>
          <ol className="conf-pack__list mb-0">
            {PACK_STEPS.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>

        <Button variant="primary" className="d-inline-flex align-items-center gap-2 mb-4" onClick={handleDownload}>
          <DownloadIcon />
          {downloadLabel}
        </Button>

        <ReturnSummaryTable items={items} />

        <div className="mt-4">
          <ReturnFinancials items={items} returnShipment={returnShipment} />
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
