import { Badge } from 'react-bootstrap'
import { DocsPage, PageHeader, H2, Callout, SpecTable, Do, Dont, DoDont } from '../components/docs.jsx'
import { IconCheck, IconX } from '../components/icons.jsx'

const VOICE_ATTRS = [
  ['Honest', 'Forthright and transparent. We share what we know — and what we don’t.'],
  ['Enthusiastic', 'Warm and optimistic about helping, without tipping into hype.'],
  ['Curious', 'We anticipate what someone needs next and meet them there.'],
  ['Clear', 'Plain language first. If a word isn’t earning its place, it goes.'],
]

// From the Figma "How we sound" frame — what we are vs. what we're not.
const HOW_WE_SOUND = [
  ['Professional', 'corporate'],
  ['Friendly', 'casual'],
  ['Direct', 'abrupt'],
  ['Enthusiastic', 'salesy'],
  ['Honest', 'negative'],
]

const TONE_CONTEXTS = [
  ['Welcoming', 'Home page, campaigns, onboarding', 'Warm and human — invite people in.'],
  ['Brief', 'Alerts, product cards, CTAs', 'A few precise words; respect the glance.'],
  ['Direct', 'Ordering, checkout, account', 'Clear and confident — no ambiguity when it counts.'],
  ['Encouraging', 'New users, complex tasks', 'Steady reassurance that they’re on track.'],
  ['Supportive', 'Error states, loading, 404s', 'Calm, blame-free, and pointed at the fix.'],
]

const PRINCIPLES = [
  ['Make it scannable', 'People read a fraction of what’s on screen. Lead with the point; use bullets, bold key info, and white space.'],
  ['Be clear and concise', 'Cut filler words and jargon. Say it in the fewest words that stay warm and human.'],
  ['Prioritize transparency', 'Share what we know and what we don’t. Set honest expectations rather than over-promising.'],
  ['Stay consistent', 'Same terms for the same things, predictable patterns, one voice across every touchpoint.'],
]

export default function VoiceTone() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Content"
        title="Voice & tone"
        lead="Our voice is how SanMar sounds across every digital touchpoint — warm, honest, and genuinely helpful. In our products, words aren’t decoration. Words are part of the product."
      />

      <Callout variant="info" title="Why this matters">
        People form an impression of a digital experience in milliseconds and read only a
        fraction of what’s on screen. Clear, consistent language builds trust, speeds people
        up, and makes SanMar feel like one team — not many.
      </Callout>

      <H2>Voice vs. tone</H2>
      <p>
        <strong>Voice</strong> is who we are; it never changes. <strong>Tone</strong> is how
        we adapt that voice to the moment — the same person sounds different celebrating a win
        than they do apologizing for a delay.
      </p>
      <div className="row g-3 my-2">
        <div className="col-md-6">
          <div className="border rounded p-3 h-100">
            <div className="fw-semibold mb-2">Voice — how we <em>are</em></div>
            <ul className="mb-0 text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              <li>A consistent personality</li>
              <li>Never changes</li>
              <li>Our brand DNA</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="border rounded p-3 h-100">
            <div className="fw-semibold mb-2">Tone — how we <em>adapt</em></div>
            <ul className="mb-0 text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
              <li>Contextually flexible</li>
              <li>Situationally aware</li>
              <li>Responds to what the user needs</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="text-secondary">
        Underneath both is the same value that guides everything else:{' '}
        <strong>Be nice. Tell the truth.</strong>
      </p>

      <H2>Our voice</H2>
      <p>Four attributes bring the SanMar personality to life on screen.</p>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {VOICE_ATTRS.map(([t]) => (
          <Badge key={t} bg="primary" className="fs-6 fw-medium">{t}</Badge>
        ))}
      </div>
      <SpecTable head={['Attribute', 'What it sounds like']} rows={VOICE_ATTRS} />

      <H2>How we sound</H2>
      <p>
        A useful way to calibrate: for each quality we aim for, there’s a near-neighbor we want
        to avoid. Aim left, not right.
      </p>
      <div className="d-flex flex-column gap-2 my-3" style={{ maxWidth: 460 }}>
        {HOW_WE_SOUND.map(([yes, no]) => (
          <div key={yes} className="d-flex align-items-center gap-3 px-3 py-2 border rounded">
            <span className="d-inline-flex align-items-center gap-2 fw-medium" style={{ color: 'var(--bs-success)', minWidth: 150 }}>
              <IconCheck size="1em" /> {yes}
            </span>
            <span className="d-inline-flex align-items-center gap-2 text-secondary">
              <IconX size="1em" /> not {no}
            </span>
          </div>
        ))}
      </div>

      <H2>Tone by context</H2>
      <p>
        Match the tone to where people are and how they’re feeling. The voice stays the same;
        the dial moves.
      </p>
      <SpecTable
        head={['Tone', 'Where', 'How it feels']}
        rows={TONE_CONTEXTS}
      />

      <H2>Writing principles</H2>
      <div className="row g-3 my-2">
        {PRINCIPLES.map(([title, body]) => (
          <div key={title} className="col-md-6">
            <div className="border rounded p-3 h-100">
              <div className="fw-semibold mb-1">{title}</div>
              <div className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.55 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>

      <H2>Naming &amp; word choice</H2>
      <p>
        A few consistent choices keep the brand recognizable and warm wherever it appears.
      </p>
      <DoDont>
        <Do preview={<span className="fs-5 fw-medium">SanMar</span>}>
          Write <strong>SanMar</strong> with a capital S and M, as one word. Use “SanMar
          Corporation” only in formal contexts like press releases.
        </Do>
        <Dont preview={<span className="fs-5 fw-medium text-secondary">Sanmar · San Mar · SanMar’s</span>}>
          Avoid “Sanmar”, “San Mar”, or the possessive “SanMar’s” in UI copy (the URL{' '}
          <code>sanmar.com</code> is the exception).
        </Dont>
      </DoDont>
      <DoDont>
        <Do preview={<span className="text-center" style={{ fontSize: '0.9rem' }}>“the SanMar team”<br />“our partners &amp; friends”</span>}>
          Refer to <strong>the SanMar team</strong> or <strong>community</strong>; call
          customers <strong>partners</strong> or <strong>friends</strong>. Convey warmth with a
          word that fits the context.
        </Do>
        <Dont preview={<span className="text-center text-secondary" style={{ fontSize: '0.9rem' }}>“the SanMar family”<br />“welcome to the family”</span>}>
          Avoid “family” in a business setting. The sentiment stays; the word doesn’t.
        </Dont>
      </DoDont>

      <Callout variant="success" title="See it in practice">
        The <a href="/design-guidelines/writing-for-ux">Writing for UX</a> page turns these
        principles into concrete rules and before/after rewrites for CTAs, errors,
        notifications, and forms.
      </Callout>
    </DocsPage>
  )
}
