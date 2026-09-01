import { Button } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, Preview, SpecTable } from '../components/docs.jsx'

export default function Accessibility() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Guidance"
        title="Accessibility"
        lead="Accessible design is the baseline, not a feature. Because prototypes build on themed Bootstrap components, most of this comes for free — your job is to not undo it, and to fill the gaps content can't."
      />

      <H2>Our baseline</H2>
      <p>
        Every SanMar prototype should meet <strong>WCAG 2.1 AA</strong>. In practice that
        means the four commitments below hold on every screen.
      </p>
      <SpecTable
        head={['Commitment', 'What it means']}
        rows={[
          ['Perceivable', 'Text contrast meets AA; nothing relies on color alone; images have alt text.'],
          ['Operable', 'Everything works by keyboard; focus is always visible; no keyboard traps.'],
          ['Understandable', 'Labels are clear; errors explain how to fix; behavior is predictable.'],
          ['Robust', 'Semantic HTML and ARIA so assistive tech can parse the page.'],
        ]}
      />

      <H2>Color &amp; contrast</H2>
      <p>
        Body text needs a 4.5:1 contrast ratio against its background; large text (24px+, or
        18px bold) needs 3:1. The semantic subtle/emphasis color pairs are pre-checked. Never
        use color as the only way to convey meaning — pair it with text or an icon.
      </p>

      <H2>Keyboard &amp; focus</H2>
      <p>
        Everything actionable must be reachable with <kbd>Tab</kbd>, operable with{' '}
        <kbd>Enter</kbd> / <kbd>Space</kbd>, and dismissible with <kbd>Esc</kbd> where relevant.
        The focus ring is part of the theme — keep it visible; never set{' '}
        <code>outline: none</code> without an equal replacement.
      </p>
      <Preview meta="Tab to a button to see the themed focus ring">
        <Button variant="primary">Focusable action</Button>
        <Button variant="outline-secondary">Another</Button>
      </Preview>

      <H2>Labels &amp; semantics</H2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Every input has a persistent, associated <code>&lt;label&gt;</code>.</li>
        <li>Icon-only controls carry an <code>aria-label</code> describing the action.</li>
        <li>Headings step down in order (<code>h1</code> → <code>h2</code> → <code>h3</code>) to form a real outline.</li>
        <li>Dynamic status messages use a live region so they're announced.</li>
        <li>Images that convey meaning have <code>alt</code> text; decorative ones use empty <code>alt</code>.</li>
      </ul>

      <H2>Motion &amp; timing</H2>
      <p>
        Keep animation subtle and purposeful, and honor <code>prefers-reduced-motion</code>.
        Don't rely on time-outs that people can't extend, and never auto-dismiss a message that
        requires action.
      </p>

      <Callout variant="success" title="A quick self-check">
        Before you call a screen done: tab through it start to finish, zoom to 200%, and read
        every label out loud. If any of those three is awkward, so is the experience for
        someone relying on them.
      </Callout>
    </DocsPage>
  )
}
