import { useEffect, useState } from 'react'
import { Container, Row, Col, Button, ButtonGroup, CloseButton, Accordion, Alert, Badge, Breadcrumb, Card, Dropdown, DropdownButton, OverlayTrigger, Tooltip, Popover, Form, InputGroup, FloatingLabel, ListGroup, Spinner, Modal, Nav, NavDropdown, Tab, Pagination, Toast, ProgressBar, Table, Placeholder, Offcanvas } from 'react-bootstrap'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

const VARIANTS = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

// Variants that need dark text for contrast (Bootstrap's text-bg-* behavior).
const DARK_TEXT = ['warning', 'info', 'light']

// Contextual icons for alert banners (Bootstrap Icons paths). The icon is part
// of SanMar's alert pattern, added in markup — not a Bootstrap style.
const ICON_PATHS = {
  info: 'M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.082.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z',
  success: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z',
  warning: 'M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z',
  danger: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  question: 'M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z',
}

// Which icon each alert variant uses, matching the Figma frame.
const ALERT_ICON_FOR = {
  primary: 'question',
  secondary: 'info',
  success: 'success',
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  light: 'info',
  dark: 'info',
}

const AlertIcon = ({ variant }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 me-2 mt-1" aria-hidden="true">
    <path d={ICON_PATHS[ALERT_ICON_FOR[variant]]} />
  </svg>
)

// Leading icon for toast headers — reuses the alert ICON_PATHS, colored per type.
const ToastIcon = ({ icon, className }) => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className={`flex-shrink-0 me-2 ${className}`} aria-hidden="true">
    <path d={ICON_PATHS[icon]} />
  </svg>
)

// Mock apparel data for the Table section.
const TABLE_COLS = ['Style', 'Product', 'Color', 'Price']
const TABLE_ROWS = [
  ['PC54', 'Core Cotton Tee', 'Navy', '$6.98'],
  ['ST350', 'PosiCharge Competitor', 'Black', '$9.48'],
  ['DT6000', 'Very Important Tee', 'Heather Grey', '$4.26'],
  ['K500', 'Silk Touch Polo', 'White', '$18.50'],
]

// Sort indicator for table headers (the Figma "Table Sorter" atom): both carets
// dim when unsorted, the active direction lit.
const SortIcon = ({ dir }) => (
  <span className="ms-1 d-inline-flex flex-column align-middle" style={{ fontSize: '0.5em', lineHeight: 0.85 }} aria-hidden="true">
    <span style={{ opacity: dir === 'asc' ? 1 : 0.3 }}>▲</span>
    <span style={{ opacity: dir === 'desc' ? 1 : 0.3 }}>▼</span>
  </span>
)

// A static data table reused for the styling variants; activeRow tints one row
// with the contextual blue (Figma's "Active" cell state).
const DataTable = ({ activeRow, ...props }) => (
  <Table {...props}>
    <thead>
      <tr>{TABLE_COLS.map((c) => <th key={c}>{c}</th>)}</tr>
    </thead>
    <tbody>
      {TABLE_ROWS.map((row, r) => (
        <tr key={row[0]} className={r === activeRow ? 'table-primary' : undefined}>
          {row.map((cell, i) => <td key={i}>{cell}</td>)}
        </tr>
      ))}
    </tbody>
  </Table>
)

// The four contextual toast types: a tinted header background + a colored icon.
// (Info keeps Bootstrap's default white header; the icon carries the color.)
const TOAST_TYPES = [
  { key: 'info', label: 'Info', headerBg: '', iconColor: 'text-primary' },
  { key: 'warning', label: 'Warning', headerBg: 'bg-warning-subtle', iconColor: 'text-warning-emphasis' },
  { key: 'danger', label: 'Danger', headerBg: 'bg-danger-subtle', iconColor: 'text-danger' },
  { key: 'success', label: 'Success', headerBg: 'bg-success-subtle', iconColor: 'text-success' },
]

// A generic "plus" glyph for icon-button examples.
const IconGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 3a.75.75 0 0 1 .75.75v3.5h3.5a.75.75 0 0 1 0 1.5h-3.5v3.5a.75.75 0 0 1-1.5 0v-3.5h-3.5a.75.75 0 0 1 0-1.5h3.5v-3.5A.75.75 0 0 1 8 3Z" />
  </svg>
)

// Leading/trailing glyphs for list group items, matching the Figma frame
// (a regular "circle" on the left, a "chevron-right" on the right).
const CircleGlyph = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0 ms-auto" aria-hidden="true">
    <path d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" />
  </svg>
)

// Font Awesome "arrow-right-long", used as a link trailing icon. Sized in `em`
// so it scales with the link's font size and inherits its color via currentColor.
const ArrowRightLong = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" className="flex-shrink-0" aria-hidden="true">
    <path d="M15.78 8.53a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 1 0-1.06 1.06l2.22 2.22H.75a.75.75 0 0 0 0 1.5h12.69l-2.22 2.22a.75.75 0 1 0 1.06 1.06l3.5-3.5Z" />
  </svg>
)

// An em-sized outline circle for link leading icons (matches the Figma "circle").
const CircleEm = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="6.5" />
  </svg>
)

// Anchor used purely for display on this reference page — preventDefault stops a
// sample link from navigating / jumping the page when clicked.
const DemoLink = ({ className, children }) => (
  <a href="#" onClick={(e) => e.preventDefault()} className={className}>{children}</a>
)

// =============================================================================
// DesignSystem — a living reference of what the template inherited from the
// SanMar Figma design system: brand, foundations (colors, type, spacing), and
// the component library (buttons through tables). Grows as more Figma frames are
// synced; the sticky "Jump to section" bar is built from the sections at runtime.
//
// Swatches read their value from the COMPILED CSS variables at runtime
// (getComputedStyle), so this page reflects what is actually in the build — not
// hardcoded hex. If a token is wrong, you'll see it here.
// =============================================================================

// Slugify a section title into a stable anchor id (for the jump nav / deep links).
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const THEME = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']
const GRAYS = ['100', '200', '300', '400', '500', '600', '700', '800', '900']
const PALETTE = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan']

// Bootstrap's modal sizes (Figma's "Extra Small / 275px" is just the base frame
// width, not a real size — the five below are the actual Bootstrap widths).
const MODAL_SIZES = [
  { key: 'sm', label: 'Small · 300px', size: 'sm' },
  { key: 'md', label: 'Medium · 500px (default)' },
  { key: 'lg', label: 'Large · 800px', size: 'lg' },
  { key: 'xl', label: 'Extra large · 1140px', size: 'xl' },
  { key: 'fs', label: 'Fullscreen', fullscreen: true },
]

function Swatch({ varName, label }) {
  const [value, setValue] = useState('')
  useEffect(() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    setValue(v)
  }, [varName])
  return (
    <div className="d-flex align-items-center gap-3">
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 'var(--bs-border-radius)',
          background: `var(${varName})`,
          border: '1px solid var(--bs-border-color)',
          flex: '0 0 auto',
        }}
      />
      <div className="text-truncate">
        <div className="fw-medium text-capitalize">{label}</div>
        <code className="small text-secondary">{value || varName}</code>
      </div>
    </div>
  )
}

function SwatchGrid({ items }) {
  return (
    <Row xs={2} sm={3} md={4} className="g-3">
      {items.map(({ varName, label }) => (
        <Col key={varName}>
          <Swatch varName={varName} label={label} />
        </Col>
      ))}
    </Row>
  )
}

// Wrapper for block-level component samples (accordion, table, alerts…) so they
// render at a readable width instead of filling the whole page.
function Sample({ children }) {
  return <div style={{ maxWidth: 600 }}>{children}</div>
}

function Section({ title, subtitle, children, first }) {
  // Non-first sections get a gray top divider + matching top padding, so the
  // line sits centered in the 4rem gap (mb-6 below + pt-6 above). The id +
  // data-toc let the JumpNav discover and link to each section; scroll-margin
  // keeps the heading clear of the sticky jump bar when deep-linked.
  return (
    <section
      id={slug(title)}
      data-toc
      style={{ scrollMarginTop: '4.5rem' }}
      className={first ? 'mb-6' : 'mb-6 pt-6 border-top'}
    >
      <h2 className="h4">{title}</h2>
      {subtitle && <p className="text-secondary">{subtitle}</p>}
      {children}
    </section>
  )
}

// Sticky "Jump to section" bar — self-populates from the rendered Sections
// (each <section data-toc>), so it never goes stale as components are added.
function JumpNav() {
  const [items, setItems] = useState([])
  useEffect(() => {
    const secs = [...document.querySelectorAll('section[data-toc]')]
    setItems(secs.map((el) => ({ id: el.id, label: el.querySelector('h2')?.textContent || el.id })))
  }, [])
  return (
    <div className="position-sticky top-0 bg-body py-2 mb-4 border-bottom" style={{ zIndex: 1020 }}>
      <Form.Select
        size="sm"
        style={{ maxWidth: 340 }}
        defaultValue=""
        onChange={(e) => {
          document.getElementById(e.target.value)?.scrollIntoView({ behavior: 'smooth' })
          e.target.value = ''
        }}
        aria-label="Jump to section"
      >
        <option value="" disabled>Jump to section…</option>
        {items.map((it) => <option key={it.id} value={it.id}>{it.label}</option>)}
      </Form.Select>
    </div>
  )
}

export default function DesignSystem() {
  const [openModal, setOpenModal] = useState(null)
  const currentModal = MODAL_SIZES.find((m) => m.key === openModal) || null
  const [page, setPage] = useState(3)
  const PAGE_COUNT = 7
  const [showToast, setShowToast] = useState(false)
  const [offcanvas, setOffcanvas] = useState(null)
  const [sort, setSort] = useState({ col: 0, dir: 'asc' })
  const sortedRows = [...TABLE_ROWS].sort((a, b) => {
    const cmp = a[sort.col].localeCompare(b[sort.col], undefined, { numeric: true })
    return sort.dir === 'asc' ? cmp : -cmp
  })
  return (
    <>
      <Container className="py-4">
      <header className="mb-6">
        <h1 className="h3">SanMar design system</h1>
        <p className="text-secondary mb-0">
          Synced from Figma “Design System — Foundation 1.2”. Values are read live
          from the compiled CSS, so this page is also a sync check.
        </p>
      </header>

      <JumpNav />

      <Section
        first
        title="Brand · Logo"
        subtitle="The SanMar wordmark (the “Default” lockup) in brand blue and white. Figma also defines Horizontal (with the “Together, for Good.” tagline), Vertical (tagline stacked below), and Stacked (San / Mar) lockups; this prototype ships the Default wordmark, reused here from the header and footer."
      >
        <Row className="g-3">
          <Col md={6}>
            <div className="border rounded d-flex align-items-center justify-content-center p-4" style={{ minHeight: 120 }}>
              <img src="/header/sanmar-logo-blue.svg" alt="SanMar" height={48} width={Math.round((48 * 294) / 60)} />
            </div>
            <div className="text-secondary small mt-2">Brand blue — on light surfaces</div>
          </Col>
          <Col md={6}>
            <div className="bg-dark rounded d-flex align-items-center justify-content-center p-4" style={{ minHeight: 120 }}>
              <img src="/footer/sanmar-logo-white.svg" alt="SanMar" height={48} width={Math.round((48 * 168) / 34.7263)} />
            </div>
            <div className="text-secondary small mt-2">White — on dark / photo surfaces</div>
          </Col>
        </Row>
      </Section>

      <Section
        title="Theme colors"
        subtitle="Semantic roles that drive components (buttons, alerts, badges…)."
      >
        <SwatchGrid items={THEME.map((c) => ({ varName: `--bs-${c}`, label: c }))} />
      </Section>

      <Section title="Grays" subtitle="The neutral scale, from light to dark.">
        <SwatchGrid items={GRAYS.map((g) => ({ varName: `--bs-gray-${g}`, label: `gray ${g}` }))} />
      </Section>

      <Section title="Palette" subtitle="Primitive brand colors.">
        <SwatchGrid items={PALETTE.map((c) => ({ varName: `--bs-${c}`, label: c }))} />
      </Section>

      <Section
        title="Typography"
        subtitle="Inter for text and headings; Libre Baskerville (serif) for displays."
      >
        <Row className="g-4 mb-4">
          <Col md={6}>
            <div className="border rounded p-3">
              <div className="text-secondary small mb-1">Sans · Inter</div>
              <div style={{ fontFamily: 'var(--bs-font-sans-serif)', fontSize: '1.5rem' }}>
                The quick brown fox
              </div>
              <div style={{ fontFamily: 'var(--bs-font-sans-serif)', fontWeight: 500 }}>
                Medium 500 · used for headings
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="border rounded p-3">
              <div className="text-secondary small mb-1">Serif · Libre Baskerville</div>
              <div className="display-6">The quick brown fox</div>
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <div className="text-secondary small mb-2">Heading scale (h1–h6)</div>
          {[
            ['h1', '2.5rem / 40px'],
            ['h2', '2rem / 32px'],
            ['h3', '1.75rem / 28px'],
            ['h4', '1.5rem / 24px'],
            ['h5', '1.25rem / 20px'],
            ['h6', '1rem / 16px'],
          ].map(([tag, size]) => (
            <div key={tag} className="d-flex align-items-baseline gap-3 border-bottom py-1">
              <div className={tag} style={{ margin: 0 }}>Heading {tag.toUpperCase()}</div>
              <code className="small text-secondary ms-auto">{size}</code>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <div className="text-secondary small mb-2">Display scale (serif)</div>
          {['display-4', 'display-5', 'display-6'].map((cls) => (
            <div key={cls} className={cls}>Display</div>
          ))}
        </div>

        <div>
          <div className="text-secondary small mb-2">Body sizes</div>
          <p className="lead mb-1">Lead / large — 20px</p>
          <p className="mb-1">Body base — 16px</p>
          <p className="small mb-0">Small — 14px</p>
        </div>
      </Section>

      <Section
        title="Spacing"
        subtitle="The spacer scale behind margin/padding/gap utilities (p-1 … p-6)."
      >
        {[
          [1, '4px', '.25rem'],
          [2, '8px', '.5rem'],
          [3, '16px', '1rem'],
          [4, '24px', '1.5rem'],
          [5, '48px', '3rem'],
          [6, '64px', '4rem'],
        ].map(([step, px, rem]) => (
          <div key={step} className="d-flex align-items-center gap-3 py-1">
            <code className="small text-secondary" style={{ width: 32 }}>{step}</code>
            <div style={{ height: 16, width: rem, background: 'var(--bs-primary)', borderRadius: 2 }} />
            <code className="small text-secondary">
              {px} · {rem}{step === 6 ? ' · custom' : ''}
            </code>
          </div>
        ))}
      </Section>

      <Section
        title="Components · Buttons"
        subtitle="Matched to Figma: tighter radii (4/6/2px) plus a custom icon button. Colors, padding, and states use Bootstrap defaults, which already match."
      >
        <div className="text-secondary small mb-2">Solid</div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.map((v) => (
            <Button key={v} variant={v} className="text-capitalize">{v}</Button>
          ))}
        </div>

        <div className="text-secondary small mb-2">Outline</div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.map((v) => (
            <Button key={v} variant={`outline-${v}`} className="text-capitalize">{v}</Button>
          ))}
        </div>

        <div className="text-secondary small mb-2">Sizes · states · link</div>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="link">Link button</Button>
        </div>

        <div className="text-secondary small mb-2">Icon buttons (custom · square)</div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <Button variant="primary" className="btn-icon btn-sm" aria-label="Add"><IconGlyph /></Button>
          <Button variant="primary" className="btn-icon" aria-label="Add"><IconGlyph /></Button>
          <Button variant="primary" className="btn-icon btn-lg" aria-label="Add"><IconGlyph /></Button>
          <Button variant="outline-secondary" className="btn-icon" aria-label="Add"><IconGlyph /></Button>
          <Button variant="success" className="btn-icon" aria-label="Add"><IconGlyph /></Button>
        </div>
      </Section>

      <Section
        title="Components · Links"
        subtitle="Text links in three styles, three sizes, and an underline toggle — all Bootstrap colored-link helpers + underline-opacity utilities, no custom CSS. Hover shifts the color 20% darker (auto-derived from the synced theme). Optional leading circle / trailing arrow icons inherit the link color and size."
      >
        <div className="text-secondary small mb-2">Styles (hover to see the darker shade)</div>
        <div className="d-flex flex-wrap gap-4 mb-3">
          <DemoLink className="link-primary">Primary link</DemoLink>
          <DemoLink className="link-secondary">Secondary link</DemoLink>
          <DemoLink className="link-dark">Dark link</DemoLink>
        </div>

        <div className="text-secondary small mb-2">Sizes</div>
        <div className="d-flex flex-wrap align-items-baseline gap-4 mb-3">
          <DemoLink className="link-primary small">Small · 14px</DemoLink>
          <DemoLink className="link-primary">Normal · 16px</DemoLink>
          <DemoLink className="link-primary fs-5">Large · 20px</DemoLink>
        </div>

        <div className="text-secondary small mb-2">Underline</div>
        <div className="d-flex flex-wrap gap-4 mb-3">
          <DemoLink className="link-primary">Underlined (default)</DemoLink>
          <DemoLink className="link-primary link-underline-opacity-0 link-underline-opacity-100-hover">Underline on hover</DemoLink>
        </div>

        <div className="text-secondary small mb-2">With icons (inherit the link color &amp; size)</div>
        <div className="d-flex flex-wrap align-items-center gap-4">
          <DemoLink className="link-primary d-inline-flex align-items-center gap-2"><CircleEm />Leading icon</DemoLink>
          <DemoLink className="link-primary d-inline-flex align-items-center gap-2">Trailing arrow<ArrowRightLong /></DemoLink>
        </div>
      </Section>

      <Section
        title="Components · Button group"
        subtitle="Bootstrap joins our buttons — inner corners collapse to the 4px radius. Sizes and vertical orientation are standard; no extra styling needed."
      >
        <div className="text-secondary small mb-2">Horizontal · solid &amp; outline</div>
        <div className="d-flex flex-wrap gap-3 mb-3">
          <ButtonGroup>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline-primary">Button</Button>
            <Button variant="outline-primary">Button</Button>
            <Button variant="outline-primary">Button</Button>
          </ButtonGroup>
        </div>

        <div className="text-secondary small mb-2">Sizes (sm · md · lg)</div>
        <div className="d-flex flex-column align-items-start gap-2 mb-3">
          <ButtonGroup size="sm">
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
            <Button variant="primary">Button</Button>
          </ButtonGroup>
        </div>

        <div className="text-secondary small mb-2">Vertical</div>
        <ButtonGroup vertical>
          <Button variant="primary">Button</Button>
          <Button variant="primary">Button</Button>
          <Button variant="primary">Button</Button>
        </ButtonGroup>
      </Section>

      <Section
        title="Components · Close button"
        subtitle="The × dismiss control (used in alerts, modals, toasts). Color, padding, opacity, and states match Bootstrap; the corner is 4px. A white variant exists for dark backgrounds."
      >
        <div className="d-flex flex-wrap align-items-center gap-4">
          <div className="d-flex align-items-center gap-3">
            <span className="text-secondary small">Default</span>
            <CloseButton />
            <CloseButton disabled />
          </div>
          <div className="d-flex align-items-center gap-3 bg-dark rounded p-3">
            <span className="text-white-50 small">White (on dark)</span>
            <CloseButton variant="white" />
            <CloseButton variant="white" disabled />
          </div>
        </div>
      </Section>

      <Section
        title="Components · Accordion"
        subtitle="Matched to Figma: 4px radius. Padding, colors, and the expanded state use Bootstrap defaults, which already match."
      >
        <Sample>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Heading</Accordion.Header>
              <Accordion.Body>
                The expanded state uses Bootstrap’s default styling, tinted by the
                synced primary color.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Sample>
      </Section>

      <Section
        title="Components · Alert banners"
        subtitle="Matched to Figma: 4px radius, dismissible, with a leading contextual icon. Padding and subtle colors use Bootstrap defaults, which already match."
      >
        <Sample>
          {VARIANTS.map((v) => (
            <Alert key={v} variant={v} dismissible className="d-flex align-items-start">
              <AlertIcon variant={v} />
              <div>Content</div>
            </Alert>
          ))}
        </Sample>
      </Section>

      <Section
        title="Components · Toast"
        subtitle="A lightweight notification — a tinted header (icon + title + timestamp + close) over a content body. Bootstrap toast defaults (350px, translucent bg, 6px radius), with the SanMar touch of a type-colored header (bg-*-subtle). Shown statically below; the last example pops a live, auto-hiding toast."
      >
        <div className="text-secondary small mb-2">Header + body (four types)</div>
        <div className="d-flex flex-wrap gap-3 mb-4">
          {TOAST_TYPES.map((t) => (
            <Toast key={t.key}>
              <Toast.Header className={t.headerBg}>
                <ToastIcon icon={t.key} className={t.iconColor} />
                <strong className="me-auto">{t.label}</strong>
                <small className="text-secondary">Timestamp</small>
              </Toast.Header>
              <Toast.Body>Content</Toast.Body>
            </Toast>
          ))}
        </div>

        <div className="text-secondary small mb-2">Header only</div>
        <div className="d-flex flex-wrap gap-3 mb-4">
          {TOAST_TYPES.map((t) => (
            <Toast key={t.key}>
              <Toast.Header className={t.headerBg}>
                <ToastIcon icon={t.key} className={t.iconColor} />
                <strong className="me-auto">{t.label}</strong>
                <small className="text-secondary">Timestamp</small>
              </Toast.Header>
            </Toast>
          ))}
        </div>

        <div className="text-secondary small mb-2">Body only (no header)</div>
        <Toast className="mb-4">
          <Toast.Body className="d-flex align-items-center">
            Content
            <small className="text-secondary ms-auto me-2">Timestamp</small>
            <CloseButton />
          </Toast.Body>
        </Toast>

        <div className="text-secondary small mb-2">Interactive (auto-hides after 3s)</div>
        <div className="border rounded position-relative" style={{ minHeight: 160 }}>
          <div className="p-3">
            <Button variant="primary" onClick={() => setShowToast(true)}>Show a toast</Button>
          </div>
          <div className="position-absolute bottom-0 end-0 p-3">
            <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
              <Toast.Header className="bg-success-subtle">
                <ToastIcon icon="success" className="text-success" />
                <strong className="me-auto">Success</strong>
                <small className="text-secondary">just now</small>
              </Toast.Header>
              <Toast.Body>Your changes have been saved.</Toast.Body>
            </Toast>
          </div>
        </div>
      </Section>

      <Section
        title="Components · Badges"
        subtitle="Matched to Figma: 4px radius, plus pill and dot forms. Color, weight, and em-based sizing use Bootstrap defaults."
      >
        <div className="text-secondary small mb-2">Solid</div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.map((v) => (
            <Badge key={v} bg={v} text={DARK_TEXT.includes(v) ? 'dark' : undefined} className="text-capitalize">{v}</Badge>
          ))}
        </div>

        <div className="text-secondary small mb-2">Pill</div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {VARIANTS.map((v) => (
            <Badge key={v} pill bg={v} text={DARK_TEXT.includes(v) ? 'dark' : undefined} className="text-capitalize">{v}</Badge>
          ))}
        </div>

        <div className="text-secondary small mb-2">Dot</div>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
          {VARIANTS.map((v) => (
            <span key={v} className={`d-inline-block rounded-circle bg-${v}`} style={{ width: 10, height: 10 }} />
          ))}
        </div>

        <div className="text-secondary small mb-2">Scales with surrounding text (em-based)</div>
        <div className="d-flex align-items-center gap-4">
          <span className="h4 mb-0">Heading <Badge bg="primary">New</Badge></span>
          <span>Body text <Badge bg="primary">New</Badge></span>
        </div>
      </Section>

      <Section
        title="Components · Breadcrumb"
        subtitle="All Bootstrap defaults except the default divider, set to a chevron. The divider is configurable per instance (--bs-breadcrumb-divider)."
      >
        <Sample>
          {[
            ['Chevron (default)', "'>'"],
            ['Slash', "'/'"],
            ['Chevron left', "'<'"],
            ['Backslash', "'\\\\'"],
          ].map(([label, divider]) => (
            <div key={label} className="mb-3">
              <div className="text-secondary small">{label}</div>
              <Breadcrumb listProps={{ style: { '--bs-breadcrumb-divider': divider, marginBottom: 0 } }}>
                <Breadcrumb.Item href="#">Content</Breadcrumb.Item>
                <Breadcrumb.Item href="#">Content</Breadcrumb.Item>
                <Breadcrumb.Item active>Active</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          ))}

          <div className="text-secondary small">Collapsed (long path)</div>
          <Breadcrumb listProps={{ style: { marginBottom: 0 } }}>
            <Breadcrumb.Item href="#">Content</Breadcrumb.Item>
            <Breadcrumb.Item disabled>…</Breadcrumb.Item>
            <Breadcrumb.Item href="#">Content</Breadcrumb.Item>
            <Breadcrumb.Item active>Active</Breadcrumb.Item>
          </Breadcrumb>
        </Sample>
      </Section>

      <Section
        title="Components · Tabs &amp; navs"
        subtitle="Bootstrap’s nav in four styles — basic (“Nav Link”), tabs, pills, and underline — themed by the synced tokens (link #0077cf, hover #005fa6, pill-active = primary). Each nav below is live: click to move the active item. A dropdown item and a disabled item are included; vertical and real content-panel usages follow."
      >
        {[
          { variant: undefined, label: 'Basic (“Nav Link”)', note: 'no border or background — the active item isn’t visually distinct, by design' },
          { variant: 'tabs', label: 'Tabs' },
          { variant: 'pills', label: 'Pills' },
          { variant: 'underline', label: 'Underline' },
        ].map(({ variant, label, note }, i) => (
          <div key={label} className="mb-4">
            <div className="text-secondary small mb-2">{label}{note ? ` — ${note}` : ''}</div>
            <Nav variant={variant} defaultActiveKey={`${i}-a`}>
              <Nav.Item><Nav.Link eventKey={`${i}-a`}>Active</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey={`${i}-b`}>Tab</Nav.Link></Nav.Item>
              <NavDropdown title="Dropdown" id={`nav-dd-${i}`}>
                <NavDropdown.Item>Action</NavDropdown.Item>
                <NavDropdown.Item>Another action</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item><Nav.Link eventKey={`${i}-d`} disabled>Disabled</Nav.Link></Nav.Item>
            </Nav>
          </div>
        ))}

        <div className="text-secondary small mb-2">Vertical (pills)</div>
        <Nav variant="pills" className="flex-column mb-4" defaultActiveKey="v-a" style={{ maxWidth: 200 }}>
          <Nav.Item><Nav.Link eventKey="v-a">Active</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="v-b">Tab</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="v-c">Tab</Nav.Link></Nav.Item>
        </Nav>

        <div className="text-secondary small mb-2">With content panels (the real usage)</div>
        <Sample>
          <Tab.Container defaultActiveKey="overview">
            <Nav variant="tabs" className="mb-3">
              <Nav.Item><Nav.Link eventKey="overview">Overview</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="specs">Specs</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="reviews">Reviews</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link eventKey="disabled" disabled>Disabled</Nav.Link></Nav.Item>
            </Nav>
            <Tab.Content className="text-secondary">
              <Tab.Pane eventKey="overview">The Overview panel — switching tabs swaps this content.</Tab.Pane>
              <Tab.Pane eventKey="specs">The Specs panel — fabric, sizing, and care details.</Tab.Pane>
              <Tab.Pane eventKey="reviews">The Reviews panel — customer ratings and comments.</Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Sample>
      </Section>

      <Section
        title="Components · Pagination"
        subtitle="Bootstrap pagination with First / Prev / Next / Last controls, an ellipsis for long ranges, and three sizes. The SanMar twist is themed in: the active page is a soft-blue fill with darker-blue text (not Bootstrap’s solid-primary), set via $pagination-active-* in the theme so the whole app inherits it."
      >
        <div className="text-secondary small mb-2">Interactive (click a page; First/Prev/Next/Last disable at the ends)</div>
        <Pagination className="mb-4">
          <Pagination.First disabled={page === 1} onClick={() => setPage(1)} />
          <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
          {Array.from({ length: PAGE_COUNT }, (_, i) => i + 1).map((n) => (
            <Pagination.Item key={n} active={n === page} onClick={() => setPage(n)}>{n}</Pagination.Item>
          ))}
          <Pagination.Next disabled={page === PAGE_COUNT} onClick={() => setPage(page + 1)} />
          <Pagination.Last disabled={page === PAGE_COUNT} onClick={() => setPage(PAGE_COUNT)} />
        </Pagination>

        <div className="text-secondary small mb-2">Sizes (small · default · large)</div>
        <div className="d-flex flex-column gap-2 mb-4">
          {['sm', undefined, 'lg'].map((size, i) => (
            <Pagination key={i} size={size} className="mb-0">
              <Pagination.Prev />
              <Pagination.Item>1</Pagination.Item>
              <Pagination.Item active>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Next />
            </Pagination>
          ))}
        </div>

        <div className="text-secondary small mb-2">With ellipsis &amp; disabled</div>
        <Pagination className="mb-0">
          <Pagination.First disabled />
          <Pagination.Prev disabled />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Ellipsis disabled />
          <Pagination.Item>10</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Section>

      <Section
        title="Components · Card"
        subtitle="A container for content. Roomier 24px padding vs Bootstrap's 16px; white bg, translucent border, and 6px corner all match Bootstrap (the card keeps 6px, unlike the 4px components)."
      >
        <div className="d-flex flex-wrap gap-3">
          <Card style={{ width: 280 }}>
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text className="text-secondary">
                Cards are empty containers you place content into — text, images,
                actions.
              </Card.Text>
              <Button variant="primary" size="sm">Action</Button>
            </Card.Body>
          </Card>

          <Card style={{ width: 280 }}>
            <Card.Header>Header</Card.Header>
            <Card.Body>
              <Card.Text className="text-secondary">
                The same card with an optional header and footer cap.
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-secondary">Footer</Card.Footer>
          </Card>
        </div>
      </Section>

      <Section
        title="Components · Table"
        subtitle="Bootstrap tables, themed by the synced tokens. Striped, hover, bordered (all dividers), borderless, and small are native options; sortable headers (the Figma “Table Sorter”) are wired up below, and a selected row uses the contextual blue (table-primary). Note: Bootstrap has no vertical-only divider mode — “bordered” draws both."
      >
        <div style={{ maxWidth: 640 }}>
          <div className="text-secondary small mb-2">Sortable · hover (click a header)</div>
          <Table hover className="mb-4">
            <thead>
              <tr>
                {TABLE_COLS.map((c, i) => (
                  <th
                    key={c}
                    role="button"
                    className="user-select-none"
                    onClick={() => setSort((s) => ({ col: i, dir: s.col === i && s.dir === 'asc' ? 'desc' : 'asc' }))}
                  >
                    {c}
                    <SortIcon dir={sort.col === i ? sort.dir : null} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row) => (
                <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>
              ))}
            </tbody>
          </Table>

          <div className="text-secondary small mb-2">Striped · hover</div>
          <DataTable striped hover className="mb-4" />

          <div className="text-secondary small mb-2">Bordered (all dividers)</div>
          <DataTable bordered className="mb-4" />

          <div className="text-secondary small mb-2">Borderless</div>
          <DataTable borderless className="mb-4" />

          <div className="text-secondary small mb-2">Small · with a selected row</div>
          <DataTable size="sm" hover activeRow={1} className="mb-0" />
        </div>
      </Section>

      <Section
        title="Components · List group"
        subtitle="A flexible container for a series of related items. In Figma this is two parts — the List group (container: direction + flush) and the List group item (each row: static/action, states, optional icon + chevron). Both map straight onto react-bootstrap’s ListGroup, themed by the synced tokens (active = primary)."
      >
        <Sample>
          <div className="text-secondary small mb-2">Default (static)</div>
          <ListGroup className="mb-4">
            <ListGroup.Item>List Item</ListGroup.Item>
            <ListGroup.Item>List Item</ListGroup.Item>
            <ListGroup.Item>List Item</ListGroup.Item>
          </ListGroup>

          <div className="text-secondary small mb-2">Actionable · click to select (single active, like a radio) · last is disabled</div>
          <ListGroup defaultActiveKey="action-2" className="mb-4">
            <ListGroup.Item action eventKey="action-1">List Item</ListGroup.Item>
            <ListGroup.Item action eventKey="action-2">List Item</ListGroup.Item>
            <ListGroup.Item action eventKey="action-3">List Item</ListGroup.Item>
            <ListGroup.Item action disabled>List Item</ListGroup.Item>
          </ListGroup>

          <div className="text-secondary small mb-2">With leading icon &amp; trailing chevron (also selectable)</div>
          <ListGroup className="mb-4">
            {['List Item', 'List Item', 'List Item'].map((label, i) => (
              <ListGroup.Item key={i} action eventKey={`icon-${i}`} className="d-flex align-items-center gap-3">
                <CircleGlyph />
                {label}
                <ChevronRight />
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="text-secondary small mb-2">Flush (edge-to-edge — borderless sides, square corners; for use inside a card)</div>
          <Card className="mb-4">
            <ListGroup variant="flush">
              <ListGroup.Item>List Item</ListGroup.Item>
              <ListGroup.Item>List Item</ListGroup.Item>
              <ListGroup.Item>List Item</ListGroup.Item>
            </ListGroup>
          </Card>

          <div className="text-secondary small mb-2">Horizontal</div>
          <ListGroup horizontal>
            <ListGroup.Item>List Item</ListGroup.Item>
            <ListGroup.Item>List Item</ListGroup.Item>
            <ListGroup.Item>List Item</ListGroup.Item>
          </ListGroup>
        </Sample>
      </Section>

      <Section
        title="Components · Dropdown"
        subtitle="WIP in Figma — only the toggle is designed. The toggle inherits our button look (4px, primary, shadow); the menu uses Bootstrap's standard styling and behavior. All 4 directions and 3 sizes are native Bootstrap."
      >
        <div className="text-secondary small mb-2">Directions</div>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {[['down', 'Down'], ['up', 'Up'], ['end', 'Right'], ['start', 'Left']].map(([drop, label]) => (
            <DropdownButton key={drop} drop={drop} title={`Dropdown · ${label}`} variant="primary">
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
          ))}
        </div>

        <div className="text-secondary small mb-2">Sizes (sm · md · lg)</div>
        <div className="d-flex flex-wrap align-items-center gap-2">
          <DropdownButton size="sm" title="Small" variant="primary">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
          </DropdownButton>
          <DropdownButton title="Medium" variant="primary">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
          </DropdownButton>
          <DropdownButton size="lg" title="Large" variant="primary">
            <Dropdown.Item href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
          </DropdownButton>
        </div>
      </Section>

      <Section
        title="Components · Focus ring"
        subtitle="The keyboard-focus indicator — a 4px ring at 25% of the element's color. All Bootstrap defaults, auto-derived from the synced theme colors (no overrides). Shown statically below."
      >
        <div className="d-flex flex-wrap gap-4 py-2">
          {VARIANTS.map((v) => (
            <span
              key={v}
              className="d-inline-flex align-items-center px-3 py-2 rounded bg-white text-capitalize"
              style={{
                border: '1px solid var(--bs-border-color)',
                boxShadow: `0 0 0 0.25rem rgba(var(--bs-${v}-rgb), 0.25)`,
              }}
            >
              {v}
            </span>
          ))}
        </div>
        <p className="text-secondary small mt-3 mb-0">
          Tip: press Tab to move through the buttons and dropdowns above — the live keyboard focus ring is the same.
        </p>
      </Section>

      <Section
        title="Components · Inputs"
        subtitle="Form controls — all Bootstrap defaults, themed by the synced tokens (checked = primary, valid = success, invalid = danger)."
      >
        <div className="text-secondary small mb-2">Checkbox</div>
        <div className="d-flex flex-wrap gap-4 mb-3">
          <Form.Check type="checkbox" id="cb-default" label="Default" />
          <Form.Check type="checkbox" id="cb-checked" label="Checked" defaultChecked />
          <Form.Check type="checkbox" id="cb-disabled" label="Disabled" disabled />
          <Form.Check type="checkbox" id="cb-disabled-checked" label="Disabled checked" defaultChecked disabled />
          <Form.Check type="checkbox" id="cb-valid" label="Valid" defaultChecked isValid />
          <Form.Check type="checkbox" id="cb-invalid" label="Invalid" isInvalid />
        </div>

        <div className="text-secondary small mb-2">Radio</div>
        <div className="d-flex flex-wrap gap-4 mb-3">
          <Form.Check type="radio" name="demo-radio" id="rb-default" label="Default" />
          <Form.Check type="radio" name="demo-radio" id="rb-checked" label="Checked" defaultChecked />
          <Form.Check type="radio" name="demo-radio-d" id="rb-disabled" label="Disabled" disabled />
          <Form.Check type="radio" name="demo-radio-v" id="rb-valid" label="Valid" defaultChecked isValid />
          <Form.Check type="radio" name="demo-radio-i" id="rb-invalid" label="Invalid" isInvalid />
        </div>

        <div className="text-secondary small mb-2">Switch</div>
        <div className="d-flex flex-wrap gap-4 mb-3">
          <Form.Check type="switch" id="sw-off" label="Off" />
          <Form.Check type="switch" id="sw-on" label="On" defaultChecked />
          <Form.Check type="switch" id="sw-disabled" label="Disabled" disabled />
          <Form.Check type="switch" id="sw-valid" label="Valid" defaultChecked isValid />
          <Form.Check type="switch" id="sw-invalid" label="Invalid" defaultChecked isInvalid />
        </div>

        <div className="text-secondary small mb-2">Range</div>
        <div style={{ maxWidth: 320 }}>
          <Form.Range defaultValue={25} aria-label="Range" className="mb-2" />
          <Form.Range defaultValue={50} disabled aria-label="Disabled range" />
        </div>

        <div className="text-secondary small mb-2 mt-4">Text input, select &amp; group</div>
        <Row className="g-3 mb-3" style={{ maxWidth: 760 }}>
          <Col sm={4}>
            <Form.Label>Label</Form.Label>
            <Form.Control placeholder="Content" />
            <Form.Text>Help text</Form.Text>
          </Col>
          <Col sm={4}>
            <Form.Label>Valid</Form.Label>
            <Form.Control defaultValue="Content" isValid />
            <Form.Control.Feedback type="valid">Looks good.</Form.Control.Feedback>
          </Col>
          <Col sm={4}>
            <Form.Label>Invalid</Form.Label>
            <Form.Control defaultValue="Content" isInvalid />
            <Form.Control.Feedback type="invalid">Please fix this.</Form.Control.Feedback>
          </Col>
        </Row>
        <div className="d-flex flex-wrap gap-4">
          <div className="d-flex flex-column gap-2" style={{ width: 220 }}>
            <Form.Control size="sm" placeholder="Small" />
            <Form.Control placeholder="Default" />
            <Form.Control size="lg" placeholder="Large" />
          </div>
          <div className="d-flex flex-column gap-2" style={{ width: 220 }}>
            <Form.Control placeholder="Disabled" disabled />
            <Form.Control defaultValue="Read-only" readOnly />
            <Form.Select aria-label="Select">
              <option>Select…</option>
              <option>Option one</option>
              <option>Option two</option>
            </Form.Select>
          </div>
          <div className="d-flex flex-column gap-2" style={{ width: 220 }}>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control placeholder="0.00" aria-label="Amount" />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>
            <InputGroup>
              <InputGroup.Text>@</InputGroup.Text>
              <Form.Control placeholder="username" aria-label="Username" />
            </InputGroup>
            <FloatingLabel label="Floating label">
              <Form.Control placeholder="Floating" />
            </FloatingLabel>
          </div>
        </div>
      </Section>

      <Section
        title="Components · Modal"
        subtitle="A dialog overlay — header (heading + close), body, and a footer with a Cancel/confirm button pair. All Bootstrap defaults (6px radius, box-shadow, backdrop), themed by the synced tokens. Click a button to open it at each Bootstrap size; dismiss with the ×, the backdrop, Esc, or a footer button."
      >
        <div className="text-secondary small mb-2">Open at each size</div>
        <div className="d-flex flex-wrap gap-2">
          {MODAL_SIZES.map((m) => (
            <Button key={m.key} variant="outline-primary" onClick={() => setOpenModal(m.key)}>
              {m.label}
            </Button>
          ))}
        </div>

        <Modal
          show={!!currentModal}
          onHide={() => setOpenModal(null)}
          size={currentModal?.size}
          fullscreen={currentModal?.fullscreen}
        >
          <Modal.Header closeButton>
            <Modal.Title as="h5" className="fw-medium">Heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Content</Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={() => setOpenModal(null)}>Button</Button>
            <Button variant="primary" onClick={() => setOpenModal(null)}>Button</Button>
          </Modal.Footer>
        </Modal>
      </Section>

      <Section
        title="Components · Progress bar"
        subtitle="Bootstrap progress with a gray-200 track, primary fill, 16px height, and a subtle inset shadow — all defaults, only the 4px radius is the SanMar touch. Figma specs the Primary style at fixed percentages; label, striped/animated, contextual variants, and stacked are standard Bootstrap shown here too."
      >
        <div style={{ maxWidth: 400 }}>
          <div className="text-secondary small mb-2">Values</div>
          {[0, 25, 50, 75, 100].map((n) => (
            <ProgressBar key={n} now={n} className="mb-2" />
          ))}

          <div className="text-secondary small mb-2 mt-3">With label</div>
          <ProgressBar now={25} label="25%" className="mb-2" />
          <ProgressBar now={50} label="50%" />

          <div className="text-secondary small mb-2 mt-3">Striped · animated</div>
          <ProgressBar now={50} striped className="mb-2" />
          <ProgressBar now={50} striped animated />

          <div className="text-secondary small mb-2 mt-3">Contextual variants</div>
          {['success', 'danger', 'warning', 'info'].map((v) => (
            <ProgressBar key={v} now={60} variant={v} className="mb-2" />
          ))}

          <div className="text-secondary small mb-2 mt-3">Stacked</div>
          <ProgressBar>
            <ProgressBar now={35} key={1} />
            <ProgressBar now={20} variant="success" key={2} />
            <ProgressBar now={15} variant="warning" key={3} />
          </ProgressBar>
        </div>
      </Section>

      <Section
        title="Components · Placeholder"
        subtitle="Loading skeletons — gray bars that stand in for content while it loads. All Bootstrap defaults: glow / wave (“Ripple”) animations, four sizes (xs / sm / default / lg), and the theme colors via bg-*. Text and button shapes both shown."
      >
        <div className="text-secondary small mb-2">In context (a loading card)</div>
        <Card style={{ width: 320 }} className="mb-4">
          <Card.Body>
            <Placeholder as={Card.Title} animation="glow"><Placeholder xs={6} /></Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
            <Placeholder.Button variant="primary" xs={5} aria-hidden="true" />
          </Card.Body>
        </Card>

        <div style={{ maxWidth: 400 }}>
          <div className="text-secondary small mb-1">Glow</div>
          <Placeholder as="p" animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />
          </Placeholder>
          <div className="text-secondary small mb-1">Wave (“Ripple”)</div>
          <Placeholder as="p" animation="wave">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} /> <Placeholder xs={6} />
          </Placeholder>

          <div className="text-secondary small mb-2 mt-2">Sizes (xs · sm · default · lg)</div>
          <Placeholder as="div" animation="glow" className="d-flex flex-column gap-2 mb-4">
            <Placeholder xs={12} size="xs" />
            <Placeholder xs={12} size="sm" />
            <Placeholder xs={12} />
            <Placeholder xs={12} size="lg" />
          </Placeholder>

          <div className="text-secondary small mb-2">Colors (body + theme)</div>
          <Placeholder as="div" animation="glow" className="d-flex flex-column gap-2">
            <Placeholder xs={12} />
            {VARIANTS.map((v) => <Placeholder key={v} xs={12} bg={v} />)}
          </Placeholder>
        </div>
      </Section>

      <Section
        title="Components · Loading spinner"
        subtitle="Bootstrap spinners in two types — border (“Spinner”) and grow (“Orb”) — across all eight theme colors. Pure Bootstrap, themed by the synced tokens; the CSS animation runs live (Figma’s Phase 1/2/3 are just keyframes of that spin). 32px is the default; a small size and an in-button usage are shown too."
      >
        <div className="text-secondary small mb-2">Border (“Spinner”)</div>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {VARIANTS.map((v) => (
            <Spinner key={v} animation="border" variant={v} role="status">
              <span className="visually-hidden">Loading…</span>
            </Spinner>
          ))}
        </div>

        <div className="text-secondary small mb-2">Grow (“Orb”)</div>
        <div className="d-flex flex-wrap gap-3 mb-3">
          {VARIANTS.map((v) => (
            <Spinner key={v} animation="grow" variant={v} role="status">
              <span className="visually-hidden">Loading…</span>
            </Spinner>
          ))}
        </div>

        <div className="text-secondary small mb-2">Sizes (default 32px · small)</div>
        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
          <Spinner animation="border" variant="primary" aria-label="Loading" />
          <Spinner animation="border" variant="primary" size="sm" aria-label="Loading" />
          <Spinner animation="grow" variant="primary" aria-label="Loading" />
          <Spinner animation="grow" variant="primary" size="sm" aria-label="Loading" />
        </div>

        <div className="text-secondary small mb-2">In a button (loading state)</div>
        <div className="d-flex flex-wrap gap-2">
          <Button variant="primary" disabled>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Loading…
          </Button>
          <Button variant="primary" disabled>
            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" className="me-2" />
            Loading…
          </Button>
        </div>
      </Section>

      <Section
        title="Components · Tooltip"
        subtitle="A small label shown on hover or keyboard focus — black background, white text, 14px, with the only token change being the 4px radius. Four placements, each with a tail pointing at the trigger. (The Icon tip below is this same tooltip, triggered by an info icon instead of a button.)"
      >
        <div className="d-flex flex-wrap gap-2">
          {['top', 'right', 'bottom', 'left'].map((placement) => (
            <OverlayTrigger key={placement} placement={placement} overlay={<Tooltip>Tooltip on {placement}</Tooltip>}>
              <Button variant="outline-secondary" className="text-capitalize">{placement}</Button>
            </OverlayTrigger>
          ))}
        </div>
      </Section>

      <Section
        title="Components · Icon tip"
        subtitle="An info icon (ⓘ) that reveals a tooltip on hover or keyboard focus. The tooltip is Bootstrap's default styling with a 4px radius. The icon scales with surrounding text."
      >
        <div className="d-flex align-items-center gap-4">
          {['top', 'right', 'bottom', 'left'].map((placement) => (
            <OverlayTrigger key={placement} placement={placement} overlay={<Tooltip>Tooltip on {placement}</Tooltip>}>
              <span className="text-primary d-inline-flex" role="button" tabIndex={0} aria-label={`Info, tooltip on ${placement}`}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d={ICON_PATHS.info} />
                </svg>
              </span>
            </OverlayTrigger>
          ))}
          <span className="text-secondary small">← hover or focus each icon (top · right · bottom · left)</span>
        </div>
      </Section>

      <Section
        title="Components · Popover"
        subtitle="A click-triggered overlay with an optional heading and a body — like a richer tooltip. All Bootstrap defaults (276px max-width, translucent border, gray header), themed by the synced tokens. Four placements; the body can hold plain text or custom content. Click outside (or the trigger again) to dismiss."
      >
        <div className="text-secondary small mb-2">Placements (click a button)</div>
        <div className="d-flex flex-wrap gap-2 mb-4">
          {[['top', 'Above'], ['bottom', 'Below'], ['left', 'Left'], ['right', 'Right']].map(([placement, label]) => (
            <OverlayTrigger
              key={placement}
              trigger="click"
              rootClose
              placement={placement}
              overlay={
                <Popover>
                  <Popover.Header>Heading</Popover.Header>
                  <Popover.Body>Content</Popover.Body>
                </Popover>
              }
            >
              <Button variant="outline-primary">{label}</Button>
            </OverlayTrigger>
          ))}
        </div>

        <div className="text-secondary small mb-2">Body only (no header) · custom content</div>
        <div className="d-flex flex-wrap gap-2">
          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={
              <Popover>
                <Popover.Body>A popover with no header — body content only.</Popover.Body>
              </Popover>
            }
          >
            <Button variant="outline-primary">No header</Button>
          </OverlayTrigger>

          <OverlayTrigger
            trigger="click"
            rootClose
            placement="top"
            overlay={
              <Popover>
                <Popover.Header>Heading</Popover.Header>
                <Popover.Body>
                  <p className="mb-2">Custom content can hold anything — text, lists, or actions.</p>
                  <Button size="sm" variant="primary">Action</Button>
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="outline-primary">Custom content</Button>
          </OverlayTrigger>
        </div>
      </Section>

      <Section
        title="Components · Offcanvas"
        subtitle="Bootstrap’s slide-in panel, used out of the box (not yet designed in Figma). Opens from any edge — handy for mobile nav, filters, or a cart drawer. Dismiss with the ×, the backdrop, or Esc."
      >
        <div className="d-flex flex-wrap gap-2">
          {['start', 'end', 'top', 'bottom'].map((p) => (
            <Button key={p} variant="outline-primary" className="text-capitalize" onClick={() => setOffcanvas(p)}>
              {p}
            </Button>
          ))}
        </div>
        <Offcanvas show={!!offcanvas} placement={offcanvas || 'start'} onHide={() => setOffcanvas(null)}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            A slide-in panel. Drop nav links, filter controls, or a cart summary in here.
          </Offcanvas.Body>
        </Offcanvas>
      </Section>

      <Section
        title="Components · Header"
        subtitle="The composed e-commerce header (utility bar + blue nav + search), in both auth states. Responsive: collapses to a hamburger on mobile. Reusable as <SiteHeader loggedIn={…} />."
      >
        <div className="text-secondary small mb-2">Logged out</div>
        <div className="full-bleed border-top border-bottom mb-4">
          <SiteHeader loggedIn={false} />
        </div>
        <div className="text-secondary small mb-2">Logged in</div>
        <div className="full-bleed border-top border-bottom">
          <SiteHeader loggedIn={true} />
        </div>
      </Section>

      <Section
        title="Components · Footer"
        subtitle="A full-width composed footer (navy #003861, sky-blue links). Responsive: link columns on desktop, collapsible accordion on mobile. Reusable as <SiteFooter />; shown live at the bottom of this page."
      >
        <p className="text-secondary mb-0">
          Scroll to the very bottom to see it full-width — resize the window narrow to
          see the mobile accordion.
        </p>
      </Section>
      </Container>

      <SiteFooter />
    </>
  )
}
