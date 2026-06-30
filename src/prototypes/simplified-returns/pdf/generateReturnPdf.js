import { jsPDF } from 'jspdf'
import label1 from './labels/label-1.png'
import label2 from './labels/label-2.png'
import label3 from './labels/label-3.png'

// Builds and downloads the return paperwork PDF.
//   includeLabels = true  → instructions + N shipping labels + N packing slips
//   includeLabels = false → instructions + N packing slips
// One label + one packing slip per box. Labels are SanMar's real label PNGs
// (cycled per box); the "x OF 3" text is baked into the images.

const PACK_STEPS = [
  'Pack items securely in original packaging if possible',
  'Remove or cover any old shipping labels',
  'Seal boxes with strong tape',
  'Attach one shipping label on each box (outside)',
  'Place full Packing List into each box (inside)',
]

const LABELS = [label1, label2, label3]

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })

export async function generateReturnPdf({ items, boxes, includeLabels, refNo = 'WRR-9112', orderNo = 'SO-9190092' }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()
  const M = 56

  instructionsPage(doc, M)

  if (includeLabels) {
    const imgs = await Promise.all(LABELS.map(loadImage))
    for (let b = 1; b <= boxes; b++) {
      doc.addPage()
      shippingLabelPage(doc, { img: imgs[(b - 1) % imgs.length], W })
    }
  } else {
    for (let b = 1; b <= boxes; b++) {
      doc.addPage()
      shipToPage(doc, { box: b, boxes, refNo, M })
    }
  }

  for (let b = 1; b <= boxes; b++) {
    doc.addPage()
    packingSlipPage(doc, { box: b, boxes, items, refNo, orderNo, M })
  }

  doc.save(`${includeLabels ? 'shipping-documents' : 'packing-list'}-${refNo}.pdf`)
}

function instructionsPage(doc, M) {
  let y = M + 20
  doc.setFont('helvetica', 'bold').setFontSize(18)
  doc.text('How to pack your return:', M, y)
  doc.setFont('helvetica', 'normal').setFontSize(12)
  y += 32
  PACK_STEPS.forEach((s, i) => {
    doc.text(`${i + 1}.`, M, y)
    doc.text(s, M + 18, y)
    y += 24
  })
}

function shippingLabelPage(doc, { img, W }) {
  const h = 700
  const w = h * (img.width / img.height)
  doc.addImage(img, 'PNG', (W - w) / 2, 70, w, h)
}

// Non-SanMar-labels case: a simple "ship to" card per box instead of a label.
function shipToPage(doc, { box, boxes, refNo, M }) {
  const w = 360
  const h = 150
  const y = 120
  doc.setDrawColor(180).setLineWidth(1).rect(M, y, w, h)

  let cy = y + 30
  doc.setFont('helvetica', 'bold').setFontSize(16).text('Ship to:', M + 20, cy)
  doc.setFont('helvetica', 'normal').setFontSize(13)
  cy += 26
  doc.text('SanMar Returns', M + 20, cy); cy += 18
  doc.text('4701 Northview Drive', M + 20, cy); cy += 18
  doc.text('Irving, TX 75038', M + 20, cy)

  cy = y + h + 32
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold').text('Web Return No', M, cy)
  doc.setFont('helvetica', 'normal').text(refNo, M + 140, cy)
  cy += 22
  doc.setFont('helvetica', 'bold').text('Box', M, cy)
  doc.setFont('helvetica', 'normal').text(`${box} of ${boxes}`, M + 140, cy)
}

function packingSlipPage(doc, { box, boxes, items, refNo, orderNo, M }) {
  let y = M + 10
  doc.setFont('helvetica', 'bold').setFontSize(16)
  doc.text(`Packing Slip ${box}/${boxes}`, M, y)

  y += 22
  doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor(90)
  doc.text('Each packing slip contains identical information and must be placed inside each box.', M, y)
  doc.setTextColor(0)

  // info box
  y += 34
  const ibw = 360
  const ibh = 92
  doc.setDrawColor(180).setLineWidth(1).rect(M, y, ibw, ibh)
  doc.setFontSize(11)
  const info = [
    ['Web Return No', refNo],
    ['Original Order No', orderNo],
    ['Customer Address', '123 Main St. New York, NY 100293'],
  ]
  let iy = y + 26
  info.forEach(([k, v]) => {
    doc.setFont('helvetica', 'bold').text(k, M + 16, iy)
    doc.setFont('helvetica', 'normal').text(v, M + 180, iy)
    iy += 24
  })

  // items table
  y += ibh + 40
  const colStyle = M
  const colColor = M + 110
  const colSize = M + 290
  const colQty = M + 420
  doc.setFont('helvetica', 'bold').setFontSize(11)
  doc.text('Style', colStyle, y)
  doc.text('Color', colColor, y)
  doc.text('Size', colSize, y)
  doc.text('Qty', colQty, y)
  y += 8
  doc.setLineWidth(0.5).line(M, y, M + 460, y)
  y += 22
  doc.setFont('helvetica', 'normal')
  items.forEach((it) => {
    doc.text(String(it.product.styleNumber), colStyle, y)
    doc.text(String(it.product.colorName), colColor, y)
    doc.text(String(it.product.size), colSize, y)
    doc.text(String(it.entry.qty), colQty, y)
    y += 24
  })
}
