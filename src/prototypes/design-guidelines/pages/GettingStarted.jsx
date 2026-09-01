import { Link } from 'react-router-dom'
import { DocsPage, PageHeader, H2, Callout, SpecTable } from '../components/docs.jsx'

export default function GettingStarted() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Get started"
        title="Using the system"
        lead="One deployed gallery hosts every SanMar prototype. Here's how it's organized, and how anyone on the team can add to it — no design-tooling background required."
      />

      <H2>What this is</H2>
      <p>
        The SanMar prototype gallery is <strong>one app that hosts many prototypes</strong>, each
        living at its own address (like <code>/simplified-returns</code> or{' '}
        <code>/my-dashboard</code>). They all share the same on-brand foundation — the
        colors, type, and components documented here — so anything you build looks and
        behaves like SanMar from the first screen.
      </p>
      <p>
        You never start from a blank page. Every prototype inherits the themed header,
        footer, and the full component library, so you spend your time on the idea, not
        the plumbing.
      </p>

      <H2>The three-step workflow</H2>
      <p>
        For everyday use, the whole workflow is three plain-English requests. You describe
        what you want; the assistant handles the code and the git.
      </p>
      <SpecTable
        head={['Ask for…', 'What happens']}
        rows={[
          ['“Build a <name> prototype at /<slug>”', 'A new, self-contained prototype folder is scaffolded and wired up as a route.'],
          ['“Show me”', 'The local preview starts so you can click through it live.'],
          ['“Deploy it”', 'The change is pushed to main; the live gallery rebuilds in ~10 seconds.'],
        ]}
      />
      <Callout variant="info" title="One-time setup per laptop">
        Install Node, Claude Code, clone the repository, and sign in to GitHub. After that,
        the three asks above are all you need.
      </Callout>

      <H2>How a prototype is structured</H2>
      <p>
        Each prototype is its own isolated world under <code>src/prototypes/&lt;slug&gt;/</code>.
        Everything it needs — screens, mock data, one-off components — lives inside that one
        folder and nowhere else.
      </p>
      <SpecTable
        head={['Path', 'Holds']}
        rows={[
          [<code>&lt;Name&gt;.jsx</code>, 'The screen(s) — the route entry point.'],
          [<code>data/</code>, 'Fake data for this prototype only (realistic mock content is encouraged).'],
          [<code>components/</code>, 'Components used only by this prototype.'],
        ]}
      />
      <p>
        The one rule that keeps things tidy: a prototype may borrow from the shared
        foundation, but the foundation never reaches into a prototype, and prototypes never
        import from each other. That means you can delete a prototype's whole folder and
        nothing else breaks.
      </p>

      <H2>Building on brand</H2>
      <p>
        Reach for the documented <Link to="/design-guidelines/components">components</Link> and
        the <Link to="/design-guidelines/foundations/color">color</Link> and{' '}
        <Link to="/design-guidelines/foundations/typography">type</Link> foundations rather
        than inventing new styles. The brand values live in a single tokens file that stays
        in sync with Figma — so when the brand evolves, every prototype updates with it.
      </p>
      <Callout variant="warning" title="Don't hard-code brand values">
        Never paste a raw hex color or font size into a screen. If a value seems to be
        missing, it should be added as a token so the whole gallery benefits — not patched
        locally.
      </Callout>
    </DocsPage>
  )
}
