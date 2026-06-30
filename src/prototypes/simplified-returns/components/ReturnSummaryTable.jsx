import { Fragment } from 'react'
import { reasonLabel, subReasonLabel, lineAmount, lineRestockingFee } from '../state/returnsModel.js'
import './ReturnSummaryTable.css'

const money = (n) => `$${n.toFixed(2)}`

// Read-only summary of the return lines, shared by the Review and Confirmation
// screens.
export default function ReturnSummaryTable({ items }) {
  return (
    <div className="summary-table">
      <div className="summary-table__head">Style</div>
      <div className="summary-table__head">Color</div>
      <div className="summary-table__head">Size</div>
      <div className="summary-table__head">Pieces</div>
      <div className="summary-table__head">Reason</div>
      <div className="summary-table__head summary-table__head--num">Price</div>
      <div className="summary-table__head summary-table__head--num">Restocking Fee</div>
      <div className="summary-table__head summary-table__head--num">Amount</div>

      {items.map((it) => (
        <Fragment key={`${it.productId}-${it.entryIndex}`}>
          <div className="summary-table__cell">{it.product.styleNumber}</div>
          <div className="summary-table__cell">
            <span className="summary-table__swatch" style={{ background: it.product.colorHex }} />
            {it.product.colorName}
          </div>
          <div className="summary-table__cell">{it.product.size}</div>
          <div className="summary-table__cell">{it.entry.qty}</div>
          <div className="summary-table__cell">
            {reasonLabel(it.entry.reason)}
            {it.entry.subReason && <div>{subReasonLabel(it.entry.reason, it.entry.subReason)}</div>}
            {it.entry.description && <div className="summary-table__desc">{it.entry.description}</div>}
          </div>
          <div className="summary-table__cell summary-table__cell--num">{money(it.product.price)}</div>
          <div className="summary-table__cell summary-table__cell--num">{money(lineRestockingFee(it))}</div>
          <div className="summary-table__cell summary-table__cell--num">{money(lineAmount(it))}</div>
        </Fragment>
      ))}
    </div>
  )
}
