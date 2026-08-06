import { DocsPage, PageHeader, H2, Callout, Preview, Do, Dont, DoDont, SpecTable } from '../../components/docs.jsx'
import {
  IconArrowRight, IconExternal, IconCheck, IconX, IconInfo, IconWarn, IconMenu, IconGitHub,
} from '../../components/icons.jsx'
import { Button } from 'react-bootstrap'

const SET = [
  ['Arrow right', IconArrowRight],
  ['External', IconExternal],
  ['Check', IconCheck],
  ['Close', IconX],
  ['Info', IconInfo],
  ['Warning', IconWarn],
  ['Menu', IconMenu],
  ['Repository', IconGitHub],
]

export default function Iconography() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Foundations"
        title="Iconography"
        lead="Icons speed recognition and add clarity to labels. SanMar prototypes use a consistent line-and-solid set drawn on a 16-pixel grid that inherits text color and scales with type."
      />

      <H2>Style</H2>
      <p>
        Icons are drawn on a <strong>16×16 viewBox</strong> and rendered with{' '}
        <code>fill="currentColor"</code>, so they take the color of the surrounding text
        automatically. Size them in <code>em</code> where they sit inline, so they scale with
        the font size of their context.
      </p>
      <Preview meta="The core UI icon set — each inherits color and size from its context">
        <div className="d-flex flex-wrap gap-4">
          {SET.map(([label, Icon]) => (
            <div key={label} className="text-center" style={{ width: 76 }}>
              <div className="d-flex align-items-center justify-content-center" style={{ height: 40, fontSize: '1.5rem' }}>
                <Icon />
              </div>
              <div className="text-secondary" style={{ fontSize: '0.72rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </Preview>

      <H2>Sizing</H2>
      <p>
        Match the icon to its role. Inline-with-text icons should be about the size of a
        capital letter; standalone or action icons can be larger.
      </p>
      <SpecTable
        head={['Context', 'Size', 'Notes']}
        rows={[
          ['Inline with body text', '1em (~16px)', 'Aligns to the cap height'],
          ['Buttons & inputs', '16–20px', 'Leading or trailing the label'],
          ['Standalone / icon button', '20–24px', 'Needs an accessible label'],
          ['Feature / empty-state', '32px+', 'Decorative, paired with a heading'],
        ]}
      />

      <H2>Pairing with labels</H2>
      <DoDont>
        <Do preview={
          <Button variant="primary" className="d-inline-flex align-items-center gap-2">
            Continue <IconArrowRight />
          </Button>
        }>
          Pair an icon with a text label for actions. The words carry the meaning; the icon
          reinforces it.
        </Do>
        <Dont preview={
          <Button variant="primary" className="btn-icon"><IconArrowRight size="1em" /></Button>
        }>
          Ship an icon-only control with no accessible label. If space forces icon-only, add
          an <code>aria-label</code> and a tooltip.
        </Dont>
      </DoDont>

      <H2>Accessibility</H2>
      <p>
        Decorative icons — those next to a text label that already says the same thing —
        should be hidden from assistive tech with <code>aria-hidden="true"</code>. An icon that
        stands alone as a control needs an <code>aria-label</code> describing the action, not
        the picture (“Close”, not “X”).
      </p>
      <Callout variant="info" title="Draw once, reuse everywhere">
        Keep icons as small inline components (like the docs set) rather than pasting raw SVG
        into screens. That way sizing, color, and accessibility defaults stay consistent.
      </Callout>
    </DocsPage>
  )
}
