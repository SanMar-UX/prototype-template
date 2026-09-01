import { Badge } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, SpecTable, Do, Dont, DoDont } from '../components/docs.jsx'

// The three recurring critique tags from the Figma before/after examples.
const CUTS = [
  ['Filler words', 'Words that add length but not meaning — “please be advised”, “in order to”, “simply”.'],
  ['Redundant info', 'Anything already shown elsewhere on screen, or a label that repeats its field.'],
  ['Unnecessary formatting', 'Bold-on-bold, ALL CAPS, and dense paragraphs that fight scanning.'],
]

const q = (text) => (
  <span className="text-center" style={{ fontSize: '0.9rem', lineHeight: 1.45 }}>{text}</span>
)

export default function WritingForUX() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Content"
        title="Writing for UX"
        lead="Interface writing is design. These are the practical rules — and real before/after rewrites — for turning the SanMar voice into microcopy that’s clear, warm, and quick to read."
      />

      <H2>Cut three things first</H2>
      <p>
        Most UI copy improves the moment you remove what isn’t working. When you review a
        screen, hunt for these three culprits.
      </p>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {CUTS.map(([t]) => <Badge key={t} bg="warning" text="dark" className="fs-6 fw-medium">{t}</Badge>)}
      </div>
      <SpecTable head={['Cut', 'What to look for']} rows={CUTS} />

      <H2>Before &amp; after</H2>
      <p>The same message, rewritten in the SanMar voice. Notice how much lighter it reads.</p>

      <div className="text-secondary small fw-semibold text-uppercase mt-4" style={{ letterSpacing: '0.06em' }}>Confirmation modal</div>
      <DoDont>
        <Do preview={q(<><strong>Replace Shopping Box?</strong><br />This will overwrite your current box.</>)}>
          Lead with a short, specific question, then one plain sentence. Give the buttons real
          verbs (“Replace” / “Cancel”).
        </Do>
        <Dont preview={q(<span className="text-secondary">“You are about to overwrite the current contents of your Shopping Box with the contents of this saved Shopping Box…”</span>)}>
          Bury the decision in a long, anxious paragraph the reader has to decode under pressure.
        </Dont>
      </DoDont>

      <div className="text-secondary small fw-semibold text-uppercase mt-4" style={{ letterSpacing: '0.06em' }}>Delay / error message</div>
      <DoDont>
        <Do preview={q(<>“We’re sorry your order has been delayed, and we want to make it right.”</>)}>
          Honest and empathetic. Own it, then point to the fix. (Honest, not negative.)
        </Do>
        <Dont preview={q(<span className="text-secondary">“Please be advised that your order has been delayed.”</span>)}>
          Cold, passive, and blame-free of any warmth. It reports a problem without caring.
        </Dont>
      </DoDont>

      <div className="text-secondary small fw-semibold text-uppercase mt-4" style={{ letterSpacing: '0.06em' }}>Inclusive word choice</div>
      <DoDont>
        <Do preview={q(<>“Uniforms that fit every body.”</>)}>
          Warm, human, and naturally inclusive. (Kind, not clinical.)
        </Do>
        <Dont preview={q(<span className="text-secondary">“Uniforms for all body types.”</span>)}>
          Technically accurate, but flat — it states where it could welcome.
        </Dont>
      </DoDont>

      <div className="text-secondary small fw-semibold text-uppercase mt-4" style={{ letterSpacing: '0.06em' }}>Value statement</div>
      <DoDont>
        <Do preview={q(<>“We only have one planet. We’re doing our part by investing in renewable energy.”</>)}>
          Collaborative and human — speaks as a person who shares the goal.
        </Do>
        <Dont preview={q(<span className="text-secondary">“SanMar is committed to investing in renewable energy.”</span>)}>
          Corporate boilerplate. True, but it doesn’t sound like a person.
        </Dont>
      </DoDont>

      <H2>Specific guidelines</H2>

      <H3text>Calls to action</H3text>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Use sentence case and lead with a verb: <strong>“Place order”</strong>, not “Submit”.</li>
        <li>Say what will happen next, so no one has to guess.</li>
        <li>Avoid “Yes / No” or a bare “OK” — echo the action instead (“Replace”, “Keep editing”).</li>
      </ul>

      <H3text>Error messages</H3text>
      <ul style={{ lineHeight: 1.8 }}>
        <li>These are “oh no” moments — get to the point and stay blame-free.</li>
        <li>Always include the corrective action: what happened, and how to fix it.</li>
        <li>Skip programmer-speak. “We couldn’t find that style number” beats “404 / null”.</li>
      </ul>

      <H3text>Notifications &amp; confirmations</H3text>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Make each notification distinct and actionable — no two should read the same.</li>
        <li>Confirm warmly and briefly: <strong>“Thanks for your order!”</strong> then the details.</li>
        <li>Don’t repeat a field’s label inside its own value or helper text.</li>
      </ul>

      <H3text>Headings, case &amp; punctuation</H3text>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Use sentence case for headings, buttons, links, and labels; Title Case only for proper nouns.</li>
        <li>Use ending punctuation for full sentences only — not for short labels or headings.</li>
        <li>Avoid idioms and regional turns of phrase; they don’t translate and can exclude.</li>
      </ul>

      <Callout variant="success" title="A 20-second copy check">
        Read it aloud. Is it <strong>nice</strong> and is it <strong>true</strong>? Could a
        first-time customer act on it without help? Did you cut the filler, the repetition, and
        the shouty formatting? If yes to all — ship it.
      </Callout>
    </DocsPage>
  )
}

// Local sub-heading (not registered in the on-this-page rail, which tracks h2).
function H3text({ children }) {
  return <h3>{children}</h3>
}
