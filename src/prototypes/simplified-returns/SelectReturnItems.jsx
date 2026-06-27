import { useState } from 'react'
import { Container, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import ReturnStepper from './components/ReturnStepper.jsx'
import ReturnItemsTable from './components/ReturnItemsTable.jsx'

// =============================================================================
// SelectReturnItems — first screen of the Simplified Returns flow.
//
// Where the shopper picks which order items to return. Has the SanMar chrome
// (logged-in header + footer) plus the page header (back button + order title).
// The item-selection UI comes next.
// =============================================================================

// Bootstrap Icons "arrow-left", inlined to match the codebase's SVG pattern.
const ArrowLeft = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
  </svg>
)

export default function SelectReturnItems() {
  // Enabled once at least one item row is fully populated (see ReturnItemsTable).
  const [canContinue, setCanContinue] = useState(false)

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        {/* Page header: back button + order title (gap-3 = 16px) */}
        <div className="d-flex align-items-center gap-3 mb-4">
          <OverlayTrigger placement="top" overlay={<Tooltip>Back to Order History</Tooltip>}>
            {/* Inert on this screen — back doesn't navigate anywhere yet. */}
            <Button
              type="button"
              variant="outline-light"
              aria-label="Back to Order History"
              className="d-inline-flex align-items-center justify-content-center"
              style={{ padding: 11 }}
            >
              <ArrowLeft className="text-secondary" />
            </Button>
          </OverlayTrigger>
          <h1 className="h3 mb-0">Return - Order #SO-9190092</h1>
        </div>

        <ReturnStepper current={1} />

        <div className="mt-4">
          <ReturnItemsTable onValidityChange={setCanContinue} />
        </div>

        {/* Enabled once at least one item row is fully populated. */}
        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" disabled={!canContinue}>Continue</Button>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
