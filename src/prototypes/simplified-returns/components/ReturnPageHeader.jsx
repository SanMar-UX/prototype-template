import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

// Shared page header for the Simplified Returns flow: an (inert) back-to-order-
// history button + the order title. Used by every step screen.

// Bootstrap Icons "arrow-left", inlined to match the codebase's SVG pattern.
const ArrowLeft = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
  </svg>
)

export default function ReturnPageHeader({ title = 'Return - Order #SO-9190092' }) {
  return (
    <div className="d-flex align-items-center gap-3 mb-4">
      <OverlayTrigger placement="top" overlay={<Tooltip>Back to Order History</Tooltip>}>
        {/* Inert in this prototype — back doesn't navigate anywhere yet. */}
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
      <h1 className="h3 mb-0">{title}</h1>
    </div>
  )
}
