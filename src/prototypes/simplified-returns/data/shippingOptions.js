// Shipping option building blocks for the Simplified Returns flow + the rule
// that picks which variant applies to the whole return.

import { returnItems } from '../state/returnsModel.js'

const SANMAR_ADDRESS = '4701 Northview Drive\nIrving, TX 75038'

export const OWN_CARRIER_OPTION = {
  id: 'own-carrier',
  label: 'Ship with my own carrier',
  detail: `Return to:\n${SANMAR_ADDRESS}`,
}
export const DROP_OFF_OPTION = {
  id: 'drop-off',
  label: 'Drop off at SanMar warehouse',
  detail: `Drop off at Reno WH:\n${SANMAR_ADDRESS}`,
}
export const SANMAR_PAID_OPTION = {
  id: 'sanmar-labels',
  label: 'Use SanMar shipping labels',
  detail: 'Shipping cost: $5 per box',
}
export const SANMAR_PREPAID_OPTION = { id: 'sanmar-prepaid', label: 'Use SanMar prepaid labels' }
export const SANMAR_FREE_OPTION = { id: 'sanmar-free', label: 'Use SanMar prepaid labels (FREE)' }

// Which shipping variant the whole return gets:
//   notRequired  — total qty < 4 AND total value < $20 (no ship-back)
//   paid 3-option — otherwise, when every item is "No Longer Needed"
//   free 2-option — otherwise
export const shippingVariant = (entriesById) => {
  const items = returnItems(entriesById)
  const totalQty = items.reduce((s, it) => s + Number(it.entry.qty), 0)
  const totalValue = items.reduce((s, it) => s + Number(it.entry.qty) * it.product.price, 0)

  if (totalQty < 4 && totalValue < 20) return { notRequired: true, options: [] }

  const allNoLongerNeeded = items.length > 0 && items.every((it) => it.entry.reason === 'no-longer-needed')
  return allNoLongerNeeded
    ? { notRequired: false, options: [SANMAR_PAID_OPTION, OWN_CARRIER_OPTION, DROP_OFF_OPTION] }
    : { notRequired: false, options: [SANMAR_FREE_OPTION, DROP_OFF_OPTION] }
}

// The $5/box option is the only one with a return-shipment cost.
export const PAID_LABEL_ID = SANMAR_PAID_OPTION.id

const ALL_OPTIONS = [SANMAR_PAID_OPTION, SANMAR_PREPAID_OPTION, SANMAR_FREE_OPTION, OWN_CARRIER_OPTION, DROP_OFF_OPTION]
export const shippingOptionLabel = (id) => ALL_OPTIONS.find((o) => o.id === id)?.label

// Any "Use SanMar … labels" option (paid / prepaid / free) yields shipping
// labels; everything else (own carrier, drop off) yields packing lists.
const SANMAR_LABEL_IDS = new Set([SANMAR_PAID_OPTION.id, SANMAR_PREPAID_OPTION.id, SANMAR_FREE_OPTION.id])
export const isSanmarLabel = (id) => SANMAR_LABEL_IDS.has(id)
