import { DocsPage, PageHeader, H2, Callout, SpecTable } from '../components/docs.jsx'

const PERSONALITY = [
  ['Honest', 'We earn trust through truthfulness and transparency. We’re the real deal.'],
  ['Enthusiastic', 'We’re passionate about our purpose and committed to our customers’ success. We’re all in.'],
  ['Curious', 'We look beyond the surface to uncover deeper, more meaningful connections.'],
]

const VALUE_PROPS = [
  ['Deep inventory', 'A distribution network built to nurture businesses of every size — what customers need, when they need it.'],
  ['Dedicated team', 'Business is personal. Our people act as an extension of our customers’ own workforce.'],
  ['Tech-driven solutions', 'Technology-enabled tools that make it easier to pitch products, manage orders, and get things done.'],
  ['Quality apparel', 'A curated collection of private labels, retail brands, and favorites — good-better-best for every need and budget.'],
  ['Sustainable practices', 'We believe business done well has the power to do good — for people and the planet.'],
]

export default function PurposeValues() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Brand"
        title="Purpose & values"
        lead="Before the colors and components, there’s the why. This is the brand platform every SanMar digital experience is built on — the beliefs that make our products feel unmistakably ours."
      />

      <H2>Our purpose</H2>
      <p>Purpose is our <em>why</em> — the intention behind everything we make.</p>
      <blockquote
        className="my-3"
        style={{ fontFamily: 'var(--bs-font-serif), Georgia, serif', fontSize: '1.9rem', lineHeight: 1.25, color: 'var(--dg-navy)', borderLeft: '3px solid var(--bs-primary)', paddingLeft: '1.25rem' }}
      >
        To create meaningful connections that elevate lives.
      </blockquote>
      <p className="text-secondary">
        <strong>Positioning:</strong> For those seeking a partner committed to driving their
        success, SanMar brings greater care to relationships and unwavering reliability.
      </p>

      <H2>Our tagline</H2>
      <div
        className="rounded p-4 my-3"
        style={{ background: 'var(--dg-navy)', color: '#fff' }}
      >
        <div style={{ fontFamily: 'var(--bs-font-serif), Georgia, serif', fontSize: '2.2rem', lineHeight: 1.1 }}>
          Together, for Good.
        </div>
        <p className="mt-3 mb-0" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '52ch' }}>
          “We don’t do good so we can sell t-shirts. We sell t-shirts so we can do good.”
          Whether we’re supporting our communities and customers or reducing our environmental
          impact, creating positive change is at the heart of everything we do.
        </p>
      </div>
      <p className="text-secondary">
        It’s built from our purpose: <strong>“create meaningful connections”</strong> →{' '}
        <em>Together</em>, and <strong>“that elevate lives”</strong> → <em>for Good</em>.
      </p>

      <H2>Our story</H2>
      <p>
        In 1979, SanMar founder Marty Lott opened a box of yellow t-shirts and found a
        mismatched assortment of hues and fabrics. When his supplier refused to make it right,
        his wife Sharon suggested he could do better selling his own blank shirts — and change
        the industry with a promise to treat people well and do right by customers. That
        approach still guides SanMar today. We’ve been family-owned and operated for more than
        50 years, and our focus on relationships has never changed.
      </p>

      <H2>Our values</H2>
      <p>Everything traces back to one simple philosophy, held since day one:</p>
      <div
        className="my-3"
        style={{ fontFamily: 'var(--bs-font-serif), Georgia, serif', fontSize: '2rem', lineHeight: 1.15, color: 'var(--dg-navy)' }}
      >
        Be Nice.<br />Tell the Truth.
      </div>
      <Callout variant="success" title="A quick gut check for anything you write or design">
        Ask yourself: <strong>Is it nice? Is it true?</strong> Refine your message until the
        answer to both is yes. Every SanMar team member is empowered to communicate and act
        with these values in mind.
      </Callout>

      <H2>Our personality</H2>
      <p>
        These traits don’t need to appear in our writing — they’re the emotive qualities that
        guide creative decisions, so a SanMar experience always feels consistent and authentic.
      </p>
      <div className="row g-3 my-2">
        {PERSONALITY.map(([title, body]) => (
          <div key={title} className="col-md-4">
            <div className="border rounded p-3 h-100">
              <div className="fw-semibold mb-1" style={{ color: 'var(--bs-primary)' }}>{title}</div>
              <div className="text-secondary" style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{body}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-secondary mt-3">
        Put together, the SanMar persona is <strong>a warm-hearted expert who always has your
        back</strong> — someone who pairs deep expertise with a genuine desire to help, takes
        the work seriously with a lighthearted attitude, and treats everyone as an equal.
      </p>

      <H2>What sets us apart</H2>
      <p>
        Five value propositions are the deep-rooted truths we embrace every day. Keep them in
        mind as you decide how to present information — they’re what we want people to know
        about us.
      </p>
      <SpecTable
        head={['Value proposition', 'What it means']}
        rows={VALUE_PROPS}
      />
    </DocsPage>
  )
}
