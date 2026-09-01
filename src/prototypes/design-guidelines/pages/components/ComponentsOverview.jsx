import { Link } from 'react-router-dom'
import { DocsPage, PageHeader, H2, Callout } from '../../components/docs.jsx'
import { BASE } from '../../data/nav.js'
import {
  GlyphCursor, GlyphForm, GlyphBell, GlyphCompass, GlyphLayers, GlyphTable, IconArrowRight,
} from '../../components/icons.jsx'

const GROUPS = [
  { to: 'actions', Icon: GlyphCursor, title: 'Actions', text: 'Buttons, button groups, icon buttons, links, dropdowns, and the close control.', items: 'Button · Button group · Icon button · Link · Dropdown · Close' },
  { to: 'forms', Icon: GlyphForm, title: 'Forms & inputs', text: 'Everything for collecting input, plus validation states.', items: 'Text input · Select · Checkbox · Radio · Switch · Range · Input group · Floating label' },
  { to: 'feedback', Icon: GlyphBell, title: 'Feedback & status', text: 'Communicate system state — messages, progress, and loading.', items: 'Alert · Toast · Spinner · Progress · Placeholder' },
  { to: 'navigation', Icon: GlyphCompass, title: 'Navigation', text: 'Move between views and locate the current place.', items: 'Tabs & navs · Breadcrumb · Pagination' },
  { to: 'containment', Icon: GlyphLayers, title: 'Containment', text: 'Group and layer content — surfaces, lists, and overlays.', items: 'Card · List group · Accordion · Modal · Offcanvas' },
  { to: 'data-display', Icon: GlyphTable, title: 'Data display', text: 'Present structured data and lightweight metadata.', items: 'Table · Badge · Tooltip · Popover' },
]

export default function ComponentsOverview() {
  return (
    <DocsPage>
      <PageHeader
        eyebrow="Components"
        title="Component library"
        lead="Every SanMar component is a themed Bootstrap component — so it's familiar, accessible, and on brand out of the box. Browse by group; each page has live examples and usage guidance."
      />

      <div className="dg-card-grid my-4">
        {GROUPS.map(({ to, Icon, title, text, items }) => (
          <Link key={to} to={`${BASE}/components/${to}`} className="dg-tile">
            <span className="dg-tile-icon"><Icon /></span>
            <h3>{title}</h3>
            <p>{text}</p>
            <p className="mt-2" style={{ fontSize: '0.75rem', color: 'var(--bs-gray-500)' }}>{items}</p>
          </Link>
        ))}
      </div>

      <H2>How to read these pages</H2>
      <p>
        Each component page shows the component live, notes when to use it (and when not to),
        and calls out the accessibility behavior you get for free. Because everything is built
        on Bootstrap, the props and variants map directly to{' '}
        <code>react-bootstrap</code> — reach for those rather than raw HTML so prototypes
        inherit the SanMar theme.
      </p>

      <Callout variant="info" title="Looking for the exhaustive catalog?">
        The <Link to="/design-system">live component catalog</Link> renders every variant of
        every component with its values read straight from the compiled theme. These pages add
        the <em>guidance</em> around it — when and how to use each one.
      </Callout>

      <H2>General rules</H2>
      <ul style={{ lineHeight: 1.8 }}>
        <li>Use the design system; don't rebuild a component that already exists.</li>
        <li>Reach for semantic variants (<code>primary</code>, <code>danger</code>…) so meaning stays consistent.</li>
        <li>One primary action per screen or dialog; everything else is secondary or a link.</li>
        <li>Keep labels short, specific, and action-oriented — “Place order”, not “Submit”.</li>
        <li>Every interactive element must be reachable and operable by keyboard.</li>
      </ul>
    </DocsPage>
  )
}
