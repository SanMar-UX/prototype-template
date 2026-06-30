import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import ReturnPageHeader from './components/ReturnPageHeader.jsx'
import ReturnStepper from './components/ReturnStepper.jsx'
import ReturnItemsTable from './components/ReturnItemsTable.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { hasBlockingIssues } from './state/returnsModel.js'

// =============================================================================
// SelectReturnItems — step 1 of the Simplified Returns flow.
// The shopper picks which order items to return, how many, and why.
// =============================================================================
export default function SelectReturnItems() {
  const navigate = useNavigate()
  const { entriesById, hasValidReturn } = useReturns()  // enabled once a row is fully populated
  const [showErrors, setShowErrors] = useState(false)

  // Continue is clickable once one row is valid. On click: if any *started but
  // incomplete* row (or an over-limit one) exists, flag it instead of advancing.
  const handleContinue = () => {
    if (hasBlockingIssues(entriesById)) {
      setShowErrors(true)
    } else {
      navigate('/simplified-returns/details')
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        <ReturnPageHeader />
        <ReturnStepper current={1} />

        <div className="mt-4">
          <ReturnItemsTable showErrors={showErrors} />
        </div>

        <div className="d-flex justify-content-end mt-4">
          <Button variant="primary" disabled={!hasValidReturn} onClick={handleContinue}>
            Continue
          </Button>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
