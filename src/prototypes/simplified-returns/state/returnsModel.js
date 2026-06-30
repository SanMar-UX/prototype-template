// Pure domain logic for the Simplified Returns flow (no React).
// Shared by the context (state + validity) and the table UI.

import { PRODUCTS } from '../data/products.js'
import { RETURN_REASONS } from '../data/returnReasons.js'

export const subReasonsOf = (reasonId) => RETURN_REASONS.find((r) => r.id === reasonId)?.subReasons
export const reasonLabel = (reasonId) => RETURN_REASONS.find((r) => r.id === reasonId)?.label
export const subReasonLabel = (reasonId, subId) => subReasonsOf(reasonId)?.find((s) => s.id === subId)?.label

// Replacing makes no sense for these reasons, so the checkbox is hidden for them.
export const NON_REPLACEABLE = new Set(['no-longer-needed', 'late-shipment'])
export const isReplaceable = (reasonId) => reasonId !== '' && !NON_REPLACEABLE.has(reasonId)

// Enabled = the shopper can actually pick a return for it (returnable + units left).
export const isEnabled = (p) => p.returnable && p.returnableQty > 0
export const blankEntry = () => ({ qty: '', reason: '', subReason: '', replace: false, description: '' })

// A reason is "chosen" once it (and its sub-reason, if any) is selected.
export const reasonChosen = (e) => e.reason !== '' && (!subReasonsOf(e.reason) || e.subReason !== '')
// An entry is "complete" for submission once it also has a qty > 0.
export const entryComplete = (e) => Number(e.qty) > 0 && reasonChosen(e)

// "Started" = the shopper has begun this entry (a qty or a reason).
export const entryStarted = (e) => e.qty !== '' || e.reason !== ''
// Needs attention = started but not complete (missing qty / reason / sub-reason).
export const entryNeedsAttention = (e) => entryStarted(e) && !entryComplete(e)

export const totalQty = (entries) => entries.reduce((s, e) => s + (Number(e.qty) || 0), 0)

// One blank entry per enabled product, keyed by product id.
export const initialEntriesById = () =>
  Object.fromEntries(PRODUCTS.filter(isEnabled).map((p) => [p.id, [blankEntry()]]))

// Good to continue if at least one product has a complete entry within its
// returnable cap. (Partially-filled extra entries are ignored.)
export const hasValidReturn = (entriesById) =>
  PRODUCTS.some((p) => {
    if (!isEnabled(p)) return false
    const entries = entriesById[p.id]
    return totalQty(entries) <= p.returnableQty && entries.some(entryComplete)
  })

// True if any started row is incomplete or any product exceeds its returnable
// cap — i.e. the shopper shouldn't advance without fixing something.
export const hasBlockingIssues = (entriesById) =>
  PRODUCTS.some((p) => {
    if (!isEnabled(p)) return false
    const entries = entriesById[p.id]
    if (totalQty(entries) > p.returnableQty) return true
    return entries.some(entryNeedsAttention)
  })

// --- Pricing (step 3) --------------------------------------------------------
// ASSUMPTION (confirm): one box per 15 items.
export const ITEMS_PER_BOX = 15
export const boxesForItems = (items) =>
  Math.max(1, Math.ceil(items.reduce((s, it) => s + Number(it.entry.qty), 0) / ITEMS_PER_BOX))

// Per-line refund amount.
export const lineAmount = (item) => item.product.price * Number(item.entry.qty)

// A restocking fee applies only to "No Longer Needed" lines (buyer's remorse),
// at 10% of the line amount; all other reasons are free.
export const RESTOCKING_RATE = 0.1
const RESTOCKED_REASONS = new Set(['no-longer-needed'])
export const lineRestockingFee = (item) =>
  RESTOCKED_REASONS.has(item.entry.reason) ? lineAmount(item) * RESTOCKING_RATE : 0

// Every completed entry (within each product's returnable cap), flattened into a
// list — the items that actually carry through the flow.
export const returnItems = (entriesById) => {
  const items = []
  PRODUCTS.forEach((p) => {
    if (!isEnabled(p)) return
    const entries = entriesById[p.id]
    if (totalQty(entries) > p.returnableQty) return
    entries.forEach((entry, entryIndex) => {
      if (entryComplete(entry)) items.push({ product: p, entry, productId: p.id, entryIndex })
    })
  })
  return items
}
