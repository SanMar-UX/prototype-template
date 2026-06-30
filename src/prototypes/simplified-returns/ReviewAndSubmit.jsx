import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import ReturnPageHeader from './components/ReturnPageHeader.jsx'
import ReturnStepper from './components/ReturnStepper.jsx'
import ShippingOptions from './components/ShippingOptions.jsx'
import ReturnSummaryTable from './components/ReturnSummaryTable.jsx'
import ReturnFinancials from './components/ReturnFinancials.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { returnItems, boxesForItems } from './state/returnsModel.js'
import { shippingVariant, PAID_LABEL_ID } from './data/shippingOptions.js'
import './ReviewAndSubmit.css'

// =============================================================================
// ReviewAndSubmit — step 3 of the Simplified Returns flow.
// =============================================================================
export default function ReviewAndSubmit() {
  const navigate = useNavigate()
  const { entriesById, shipMethod, setShipMethod } = useReturns()
  const items = returnItems(entriesById)

  const variant = shippingVariant(entriesById)
  const selected = shipMethod ?? variant.options[0]?.id   // default to the first option

  const totalPieces = items.reduce((s, it) => s + Number(it.entry.qty), 0)
  const boxes = boxesForItems(items)
  const returnShipment = selected === PAID_LABEL_ID ? 5 * boxes : 0

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        <ReturnPageHeader />
        <ReturnStepper current={3} />

        <h2 className="h4 mt-4 mb-3">Return Details</h2>

        {/* Ship-to is a placeholder pending the rule */}
        <div className="review-meta mb-4">
          <div className="fw-bold">Ship to Warehouse:</div>
          <div>Dallas, TX</div>
          <div className="fw-bold">Packaging:</div>
          <div>{boxes} boxes, {totalPieces} items</div>
        </div>

        <div className="mb-4" style={{ maxWidth: 360 }}>
          <ShippingOptions
            name="return-shipping"
            options={variant.options}
            value={selected}
            onChange={setShipMethod}
            notRequired={variant.notRequired}
          />
        </div>

        <ReturnSummaryTable items={items} />

        <div className="mt-4">
          <ReturnFinancials items={items} returnShipment={returnShipment} />
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="outline-primary" onClick={() => navigate('/simplified-returns/details')}>Back</Button>
          <Button variant="primary" onClick={() => navigate('/simplified-returns/confirmation')}>Submit Return</Button>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
