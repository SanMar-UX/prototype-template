import { lineAmount, lineRestockingFee } from '../state/returnsModel.js'
import './ReturnFinancials.css'

const money = (n) => `$${n.toFixed(2)}`

// Refund disclosure + totals box, shared by the Review and Confirmation screens.
// Total = refund − restocking − return shipment.
export default function ReturnFinancials({ items, returnShipment = 0 }) {
  const refundAmount = items.reduce((s, it) => s + lineAmount(it), 0)
  const restockingTotal = items.reduce((s, it) => s + lineRestockingFee(it), 0)
  const total = refundAmount - restockingTotal - returnShipment

  return (
    <div className="return-financials">
      <p className="return-financials__disclosure mb-0">
        Refund will be credited to your original payment method.<br />
        Allow 5-7 business days for processing.
      </p>

      <div className="return-totals">
        <div className="return-totals__row"><span>Refund amount:</span><span>{money(refundAmount)}</span></div>
        <div className="return-totals__row"><span>Restocking fee:</span><span>{money(restockingTotal)}</span></div>
        <div className="return-totals__row"><span>Return shipment:</span><span>{money(returnShipment)}</span></div>
        <div className="return-totals__divider" />
        <div className="return-totals__row return-totals__row--total"><span>Total</span><span>{money(total)}</span></div>
      </div>
    </div>
  )
}
