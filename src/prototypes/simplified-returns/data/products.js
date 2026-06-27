// Products (order line items) for the Simplified Returns prototype.
// Lives inside this prototype's own folder — NOT shared (see CLAUDE.md).
//
// Simplified model (per UX): each entry is a flat "product", not a real SKU +
// variants. Fields:
//   styleNumber   - style/SKU code (shared across colors & sizes)
//   colorHex      - swatch color, CSS-ready (#RRGGBB)
//   colorName     - human-readable color
//   size          - size label (varies by style)
//   orderedQty    - units originally ordered
//   returnableQty - units still eligible to return (0 = none left)
//   price         - USD unit price as a number (format with $ in the UI)
//   returnable    - whether this product can be returned at all

export const PRODUCTS = [
  { id: 'k500-kelly-green-s', styleNumber: 'K500', colorHex: '#39845D', colorName: 'Kelly Green', size: 'S', orderedQty: 50, returnableQty: 50, price: 12.04, returnable: true },
  { id: 'k500-kelly-green-m', styleNumber: 'K500', colorHex: '#39845D', colorName: 'Kelly Green', size: 'M', orderedQty: 50, returnableQty: 50, price: 12.04, returnable: true },
  { id: 'k500-maui-blue-s', styleNumber: 'K500', colorHex: '#57A0B7', colorName: 'Maui Blue', size: 'S', orderedQty: 50, returnableQty: 50, price: 12.04, returnable: true },
  { id: 'k500-maui-blue-m', styleNumber: 'K500', colorHex: '#57A0B7', colorName: 'Maui Blue', size: 'M', orderedQty: 40, returnableQty: 40, price: 12.04, returnable: true },
  { id: 'k500-maui-blue-l', styleNumber: 'K500', colorHex: '#57A0B7', colorName: 'Maui Blue', size: 'L', orderedQty: 24, returnableQty: 24, price: 12.04, returnable: true },
  { id: 'pt20-charcoal-28-5x27h', styleNumber: 'PT20', colorHex: '#4F4F4F', colorName: 'Charcoal', size: '28.5 x 27H', orderedQty: 5, returnableQty: 5, price: 21.16, returnable: true },
  { id: 'pt20-charcoal-29-5x27h', styleNumber: 'PT20', colorHex: '#4F4F4F', colorName: 'Charcoal', size: '29.5 x 27H', orderedQty: 5, returnableQty: 3, price: 21.16, returnable: true },
  { id: 'pt20-charcoal-30-5x27h', styleNumber: 'PT20', colorHex: '#4F4F4F', colorName: 'Charcoal', size: '30.5 x 27H', orderedQty: 4, returnableQty: 0, price: 21.16, returnable: true },
  { id: 'ct104485-carhartt-brown-osfa', styleNumber: 'CT104485', colorHex: '#984C0C', colorName: 'Carhartt Brown', size: 'OSFA', orderedQty: 50, returnableQty: 0, price: 23.80, returnable: false },
  { id: 'pc54dtg-gold-s', styleNumber: 'PC54DTG', colorHex: '#E9AB48', colorName: 'Gold', size: 'S', orderedQty: 40, returnableQty: 0, price: 4.91, returnable: false },
  { id: 'pc54dtg-gold-m', styleNumber: 'PC54DTG', colorHex: '#E9AB48', colorName: 'Gold', size: 'M', orderedQty: 40, returnableQty: 0, price: 4.91, returnable: false },
]

// Lookup helper for rendering a saved selection back to its product.
export const getProduct = (id) => PRODUCTS.find((p) => p.id === id)
