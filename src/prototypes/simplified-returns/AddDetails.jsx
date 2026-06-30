import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Form } from 'react-bootstrap'
import SiteHeader from '../../components/SiteHeader.jsx'
import SiteFooter from '../../components/SiteFooter.jsx'
import ReturnPageHeader from './components/ReturnPageHeader.jsx'
import ReturnStepper from './components/ReturnStepper.jsx'
import { useReturns } from './state/ReturnsContext.jsx'
import { returnItems, isReplaceable, reasonLabel, subReasonLabel } from './state/returnsModel.js'
import { descriptionPrompt } from './data/descriptionPrompts.js'
import './AddDetails.css'

const DESC_MAX = 500

// Description is required only for Damaged/Defective (shipping box OK) + Other.
const descriptionRequired = (entry) =>
  entry.reason === 'damaged-product-box-ok' && entry.subReason === 'other'

// =============================================================================
// AddDetails — step 2 of the Simplified Returns flow.
// Each completed return entry from step 1 becomes an "Item" card with a
// read-only summary + a Description textarea.
// =============================================================================
export default function AddDetails() {
  const navigate = useNavigate()
  const { entriesById, setEntriesFor } = useReturns()
  const [showErrors, setShowErrors] = useState(false)

  const items = returnItems(entriesById)

  const setDescription = (productId, entryIndex, value) =>
    setEntriesFor(productId)(
      entriesById[productId].map((e, i) => (i === entryIndex ? { ...e, description: value } : e))
    )

  const handleContinue = () => {
    setShowErrors(true)
    const allValid = items.every(
      (it) => !descriptionRequired(it.entry) || (it.entry.description || '').trim() !== ''
    )
    if (allValid) {
      navigate('/simplified-returns/review')
    }
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        <ReturnPageHeader />
        <ReturnStepper current={2} />

        <div className="add-details-items mt-4">
          {items.map((it, n) => {
            const { product, entry, productId, entryIndex } = it
            const required = descriptionRequired(entry)
            const description = entry.description || ''
            const invalid = showErrors && required && description.trim() === ''
            return (
              <div className="ad-item" key={`${productId}-${entryIndex}`}>
                <div className="ad-item__label">Item {n + 1}</div>

                <div className="ad-summary">
                  <div className="ad-summary__label">Style number:</div>
                  <div>{product.styleNumber}</div>

                  <div className="ad-summary__label">Color:</div>
                  <div className="d-inline-flex align-items-center gap-2">
                    <span className="ad-swatch" style={{ background: product.colorHex }} />
                    {product.colorName}
                  </div>

                  <div className="ad-summary__label">Size</div>
                  <div>{product.size}</div>

                  <div className="ad-summary__label">Qty to return:</div>
                  <div>{entry.qty}</div>

                  <div className="ad-summary__label">Return reason:</div>
                  <div>
                    {reasonLabel(entry.reason)}
                    {entry.subReason && <div>{subReasonLabel(entry.reason, entry.subReason)}</div>}
                  </div>

                  {isReplaceable(entry.reason) && (
                    <>
                      <div className="ad-summary__label">Replacement:</div>
                      <div>{entry.replace ? 'Yes' : 'No'}</div>
                    </>
                  )}
                </div>

                <Form.Group className="ad-desc">
                  <Form.Label className="mb-2">
                    Description{required ? <span className="text-danger"> *</span> : ' (optional)'}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    maxLength={DESC_MAX}
                    placeholder={descriptionPrompt(entry.reason, entry.subReason)}
                    value={description}
                    isInvalid={invalid}
                    onChange={(e) => setDescription(productId, entryIndex, e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                  <div className="ad-desc__counter">{description.length}/{DESC_MAX}</div>
                </Form.Group>
              </div>
            )
          })}
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button variant="outline-primary" onClick={() => navigate('/simplified-returns')}>Back</Button>
          <Button variant="primary" onClick={handleContinue}>Continue</Button>
        </div>
      </Container>

      <SiteFooter />
    </div>
  )
}
