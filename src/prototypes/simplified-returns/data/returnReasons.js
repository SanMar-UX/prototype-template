// Return reasons for the Simplified Returns prototype.
// Lives inside this prototype's own folder — NOT shared with the template or any
// other prototype (see CLAUDE.md → "The gallery model").
// Source: SanMar returns reason list (provided by UX, 2026-06).
//
// Each reason has a stable `id` (use as the <option> value / React key — never
// the label, so wording can change without breaking saved selections) and a
// human-readable `label` (what the shopper sees).

export const RETURN_REASONS = [
  {
    id: 'damaged-product-box-ok',
    label: 'Damaged/Defective Product (shipping box OK)',
    subReasons: [
      { id: 'broken-missing-component', label: 'Broken/Missing Component (button, handle, zipper, etc)' },
      { id: 'colorfastness', label: 'Colorfastness (fading, bleeding, etc)' },
      { id: 'dirt-stain', label: 'Dirt/Stain' },
      { id: 'fabric-flaw', label: 'Fabric Flaw (hole, snag, etc)' },
      { id: 'workmanship', label: 'Workmanship (loose or crooked seams, etc)' },
      { id: 'color-shade-off', label: 'Color Shade Off' },
      { id: 'size-out-of-spec', label: 'Size out of Spec/ Mistagged (prior to washing)' },
      { id: 'other', label: 'Other' },
    ],
  },
  { id: 'product-and-box-damaged', label: 'Product and Shipping Box Damaged' },
  { id: 'late-shipment', label: 'Late Shipment' },
  {
    id: 'wrong-item-received',
    label: 'Wrong Item Received',
    subReasons: [
      { id: 'color-on-invoice', label: 'Color on invoice is not what was ordered' },
      { id: 'quantity-on-invoice', label: 'Quantity on invoice is not what was ordered' },
      { id: 'size-on-invoice', label: 'Size on invoice is not what was ordered' },
      { id: 'style-on-invoice', label: 'Style on invoice is not what was ordered' },
    ],
  },
  { id: 'no-longer-needed', label: 'No Longer Needed' },
  { id: 'sanmar-entered-order-incorrectly', label: 'SanMar Entered Order Incorrectly' },
]

// Lookup helper for rendering a saved selection back to its label.
export const getReturnReason = (id) => RETURN_REASONS.find((r) => r.id === id)
