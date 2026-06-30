import { Fragment } from 'react'
import { Form, Alert, Button } from 'react-bootstrap'
import { PRODUCTS } from '../data/products.js'
import { RETURN_REASONS } from '../data/returnReasons.js'
import { useReturns } from '../state/ReturnsContext.jsx'
import { subReasonsOf, isReplaceable, isEnabled, blankEntry, reasonChosen, totalQty, entryStarted, entryComplete } from '../state/returnsModel.js'
import './ReturnItemsTable.css'

const RETURNABLE = PRODUCTS.filter((p) => p.returnable)
const NON_RETURNABLE = PRODUCTS.filter((p) => !p.returnable)

const COLUMNS = ['Style', 'Color', 'Size', 'Ordered', 'Qty to Return', 'Reason']

// Inlined Bootstrap Icons, matching the codebase pattern.
const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="flex-shrink-0 mt-1">
    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>
)
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3.5a.5.5 0 0 1 .5.5v3.5H12a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0V8.5H4a.5.5 0 0 1 0-1h3.5V4a.5.5 0 0 1 .5-.5z" />
  </svg>
)
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
  </svg>
)

// Shared first-four cells (Style / Color / Size / Ordered).
const TextCells = ({ item }) => (
  <>
    <div className="returns-table__cell">{item.styleNumber}</div>
    <div className="returns-table__cell">
      <span className="returns-table__color">
        <span className="returns-table__swatch" style={{ background: item.colorHex }} />
        {item.colorName}
      </span>
    </div>
    <div className="returns-table__cell">{item.size}</div>
    <div className="returns-table__cell">{item.orderedQty}</div>
  </>
)

const Hint = ({ item, alreadyReturned }) => (
  <p className="returns-table__hint">
    {item.returnableQty} returnable<br />
    {alreadyReturned} already returned
  </p>
)

// One item row = the four text cells + a cell spanning the Qty + Reason columns.
function Row({ item, entries, onEntriesChange, showErrors }) {
  const alreadyReturned = item.orderedQty - item.returnableQty
  const showHint = item.returnable && alreadyReturned > 0

  // Disabled rows: a single static block, no interactivity.
  if (!isEnabled(item)) {
    return (
      <Fragment>
        <TextCells item={item} />
        <div className="returns-table__entries">
          <div className="returns-entry-grid">
            <div>
              <Form.Control type="number" disabled aria-label={`Quantity to return for ${item.styleNumber}`} />
              {showHint && <Hint item={item} alreadyReturned={alreadyReturned} />}
            </div>
            <div className="returns-entry__reason-row">
              <Form.Select className="flex-grow-1" disabled defaultValue="" aria-label={`Return reason for ${item.styleNumber}`}>
                <option value="" disabled />
              </Form.Select>
              <span className="returns-entry__delete" style={{ visibility: 'hidden' }} aria-hidden="true"><CloseIcon /></span>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }

  const total = totalQty(entries)
  const exceedsReturnable = total > item.returnableQty
  const addDisabled = total >= item.returnableQty                  // all returnable qty already allocated

  const updateEntry = (i, changes) =>
    onEntriesChange(entries.map((e, idx) => (idx === i ? { ...e, ...changes } : e)))
  const addEntry = () => onEntriesChange([...entries, blankEntry()])
  const removeEntry = (i) => onEntriesChange(entries.filter((_, idx) => idx !== i))

  return (
    <Fragment>
      <TextCells item={item} />
      <div className="returns-table__entries">
        <div className="returns-entry-grid">
          {entries.map((entry, i) => {
            const entrySubReasons = subReasonsOf(entry.reason)
            const isLast = i === entries.length - 1
            const isFirst = i === 0
            const chosen = reasonChosen(entry)
            const showCheckbox = chosen && isReplaceable(entry.reason)
            const showAddLink = isLast && chosen
            // On Continue, a started-but-incomplete entry flags its missing fields.
            const needsAttention = showErrors && entryStarted(entry) && !entryComplete(entry)
            const qtyMissing = needsAttention && !(Number(entry.qty) > 0)
            const reasonMissing = needsAttention && entry.reason === ''
            const subMissing = needsAttention && entry.reason !== '' && Boolean(entrySubReasons) && entry.subReason === ''
            return (
              <Fragment key={i}>
                <div>
                  <Form.Control
                    type="number"
                    min={0}
                    value={entry.qty}
                    onChange={(e) => updateEntry(i, { qty: e.target.value })}
                    isInvalid={exceedsReturnable || qtyMissing}
                    aria-label={`Quantity to return for ${item.styleNumber} ${item.colorName} ${item.size}, reason ${i + 1}`}
                  />
                  {(qtyMissing || (exceedsReturnable && isLast)) && (
                    <Form.Control.Feedback type="invalid">
                      {qtyMissing ? 'Quantity is required' : 'Value entered exceeds the returnable quantity'}
                    </Form.Control.Feedback>
                  )}
                  {showHint && isFirst && <Hint item={item} alreadyReturned={alreadyReturned} />}
                </div>

                <div className="returns-entry__reason-row">
                  <div className="flex-grow-1">
                    <Form.Select
                      value={entry.reason}
                      onChange={(e) => updateEntry(i, { reason: e.target.value, subReason: '', replace: false })}
                      isInvalid={reasonMissing}
                      aria-label={`Return reason ${i + 1} for ${item.styleNumber} ${item.colorName} ${item.size}`}
                    >
                      <option value="" disabled>Choose a return reason</option>
                      {RETURN_REASONS.map((r) => (
                        <option key={r.id} value={r.id}>{r.label}</option>
                      ))}
                    </Form.Select>
                    {reasonMissing && (
                      <Form.Control.Feedback type="invalid">Choose a reason</Form.Control.Feedback>
                    )}
                    {entrySubReasons && (
                      <>
                        <Form.Select
                          className="mt-2"
                          value={entry.subReason}
                          onChange={(e) => updateEntry(i, { subReason: e.target.value })}
                          isInvalid={subMissing}
                          aria-label={`Additional reason ${i + 1}`}
                        >
                          <option value="" disabled>Choose a sub-reason</option>
                          {entrySubReasons.map((s) => (
                            <option key={s.id} value={s.id}>{s.label}</option>
                          ))}
                        </Form.Select>
                        {subMissing && (
                          <Form.Control.Feedback type="invalid">Choose a sub-reason</Form.Control.Feedback>
                        )}
                      </>
                    )}

                    {(showCheckbox || showAddLink) && (
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        {showCheckbox ? (
                          <Form.Check
                            type="checkbox"
                            id={`replace-${item.id}-${i}`}
                            label="Replace these items"
                            checked={entry.replace}
                            onChange={(e) => updateEntry(i, { replace: e.target.checked })}
                          />
                        ) : (
                          <span />
                        )}
                        {showAddLink ? (
                          <Button
                            type="button"
                            variant="link"
                            className="d-inline-flex align-items-center gap-2 p-0 text-decoration-none"
                            disabled={addDisabled}
                            onClick={addEntry}
                          >
                            <PlusIcon />
                            Add another reason
                          </Button>
                        ) : (
                          <span />
                        )}
                      </div>
                    )}
                  </div>

                  {isFirst ? (
                    <span className="returns-entry__delete" style={{ visibility: 'hidden' }} aria-hidden="true"><CloseIcon /></span>
                  ) : (
                    <Button
                      type="button"
                      variant="link"
                      className="returns-entry__delete p-0 text-decoration-none"
                      onClick={() => removeEntry(i)}
                      title="Delete"
                      aria-label={`Remove reason ${i + 1}`}
                    >
                      <CloseIcon />
                    </Button>
                  )}
                </div>
              </Fragment>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}

export default function ReturnItemsTable({ showErrors }) {
  const { entriesById, setEntriesFor } = useReturns()

  const renderRow = (item) => (
    <Row key={item.id} item={item} entries={entriesById[item.id]} onEntriesChange={setEntriesFor(item.id)} showErrors={showErrors} />
  )

  return (
    <div className="returns-table">
      {COLUMNS.map((c) => (
        <div key={c} className="returns-table__head">{c}</div>
      ))}

      {RETURNABLE.map(renderRow)}

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

      {NON_RETURNABLE.map(renderRow)}
    </div>
  )
}
