import { Fragment, useState } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { PRODUCTS } from '../data/products.js'
import { RETURN_REASONS } from '../data/returnReasons.js'
import './ReturnItemsTable.css'

const RETURNABLE = PRODUCTS.filter((p) => p.returnable)
const NON_RETURNABLE = PRODUCTS.filter((p) => !p.returnable)

const COLUMNS = ['Style', 'Color', 'Size', 'Ordered', 'Qty to Return', 'Reason']

// Bootstrap Icons "exclamation-triangle-fill", inlined to match the codebase pattern.
const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="flex-shrink-0 mt-1">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
)

// Bootstrap Icons "plus", inlined to match the codebase pattern.
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3.5a.5.5 0 0 1 .5.5v3.5H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
  </svg>
)

// One item row = six grid cells. Returned as a fragment so the cells land
// directly in the parent grid.
function Row({ item }) {
  const [qty, setQty] = useState('')
  const [reason, setReason] = useState('')
  const [subReason, setSubReason] = useState('')
  const alreadyReturned = item.orderedQty - item.returnableQty
  const isDisabled = !item.returnable || item.returnableQty === 0
  const showHint = item.returnable && alreadyReturned > 0   // partial / none-left
  const exceedsOrdered = qty !== '' && Number(qty) > item.orderedQty
  const subReasons = RETURN_REASONS.find((r) => r.id === reason)?.subReasons
  const reasonComplete = reason !== '' && (!subReasons || subReason !== '')

  return (
    <Fragment>
      <div className="returns-table__cell">{item.styleNumber}</div>

      <div className="returns-table__cell">
        <span className="returns-table__color">
          <span className="returns-table__swatch" style={{ background: item.colorHex }} />
          {item.colorName}
        </span>
      </div>

      <div className="returns-table__cell">{item.size}</div>

      <div className="returns-table__cell">{item.orderedQty}</div>

      <div className="returns-table__cell returns-table__cell--control">
        <Form.Control
          type="number"
          min={0}
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          disabled={isDisabled}
          isInvalid={exceedsOrdered}
          aria-label={`Quantity to return for ${item.styleNumber} ${item.colorName} ${item.size}`}
        />
        <Form.Control.Feedback type="invalid">
          Can&apos;t return more than ordered
        </Form.Control.Feedback>
        {showHint && (
          <p className="returns-table__hint">
            {item.returnableQty} returnable<br />
            {alreadyReturned} already returned
          </p>
        )}
      </div>

      <div className="returns-table__cell returns-table__cell--control">
        <Form.Select
          value={reason}
          onChange={(e) => { setReason(e.target.value); setSubReason('') }}
          disabled={isDisabled}
          aria-label={`Return reason for ${item.styleNumber} ${item.colorName} ${item.size}`}
        >
          <option value="" disabled>{isDisabled ? '' : 'Choose a return reason'}</option>
          {RETURN_REASONS.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </Form.Select>

        {subReasons && (
          <Form.Select
            className="mt-2"
            value={subReason}
            onChange={(e) => setSubReason(e.target.value)}
            aria-label={`Additional reason for ${item.styleNumber} ${item.colorName} ${item.size}`}
          >
            <option value="" disabled>Choose a sub-reason</option>
            {subReasons.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </Form.Select>
        )}

        {reasonComplete && (
          <div className="d-flex justify-content-end mt-3">
            <Button
              type="button"
              variant="link"
              className="d-inline-flex align-items-center gap-2 p-0 text-decoration-none"
            >
              <PlusIcon />
              Add another reason
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default function ReturnItemsTable() {
  return (
    <div className="returns-table">
      {COLUMNS.map((c) => (
        <div key={c} className="returns-table__head">{c}</div>
      ))}

      {RETURNABLE.map((item) => <Row key={item.id} item={item} />)}

      {NON_RETURNABLE.length > 0 && (
        <div className="returns-table__banner">
          <Alert variant="warning" className="d-flex gap-2 align-items-start mb-0">
            <WarningIcon />
            <div>
              <p className="fw-bold mb-0">Items below cannot be returned</p>
              <p className="text-body mb-0">
                Possible reasons: not yet invoiced, discontinued, decorated, or invoiced more than 30 days ago.
              </p>
            </div>
          </Alert>
        </div>
      )}

      {NON_RETURNABLE.map((item) => <Row key={item.id} item={item} />)}
    </div>
  )
}
