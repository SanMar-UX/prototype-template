// Placeholder prompts for the Description field on Add Details (step 2).
// Keyed by reason id; for reasons that have sub-reasons, keyed by sub-reason id.
// `descriptionPrompt(reasonId, subReasonId)` resolves the right one.

const DEFAULT_PROMPT = 'Add any details that will help us process this return.'

export const DESCRIPTION_PROMPTS = {
  'damaged-product-box-ok': {
    'broken-missing-component': 'Which component is broken or missing (button, zipper, handle, etc.), and how many units are affected?',
    'colorfastness': 'What happened — fading, bleeding, or color transfer — and under what conditions?',
    'dirt-stain': 'Where is the dirt or staining, and how many units are affected?',
    'fabric-flaw': 'Describe the flaw (hole, snag, pull, etc.) and where it appears on the item.',
    'workmanship': 'Describe the workmanship issue (loose or crooked seams, etc.) and where it appears.',
    'color-shade-off': 'How does the color shade differ from what you expected?',
    'size-out-of-spec': 'How is the size out of spec or mistagged? (Measured before washing.)',
    'other': 'Please describe the defect in as much detail as possible.',
  },
  'product-and-box-damaged': 'Describe the damage to both the product and the shipping box.',
  'late-shipment': 'When did you expect the order, and when did it actually arrive?',
  'wrong-item-received': {
    'color-on-invoice': 'What color did you order, and what color is on the invoice?',
    'quantity-on-invoice': 'What quantity did you order, and what quantity is on the invoice?',
    'size-on-invoice': 'What size did you order, and what size is on the invoice?',
    'style-on-invoice': 'What style did you order, and what style is on the invoice?',
  },
  'no-longer-needed': 'Optionally, tell us a bit more about why these are no longer needed.',
  'sanmar-entered-order-incorrectly': 'What did the order confirmation get wrong (color, size, style, quantity)?',
}

export const descriptionPrompt = (reasonId, subReasonId) => {
  const entry = DESCRIPTION_PROMPTS[reasonId]
  if (!entry) return DEFAULT_PROMPT
  if (typeof entry === 'string') return entry
  return entry[subReasonId] || DEFAULT_PROMPT
}
