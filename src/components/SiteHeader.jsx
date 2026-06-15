import { Container, Form, Button } from 'react-bootstrap'

// =============================================================================
// SiteHeader — SanMar's composed e-commerce header.
// =============================================================================
// Reusable, responsive header for prototypes. Two states via `loggedIn`:
//   - logged out: utility links + inline login form
//   - logged in:  welcome + account exec + shopping box + checkout
// Desktop shows the blue nav bar + search; mobile collapses to a hamburger.
// Styling lives in src/styles/_components.scss (.site-header).
// =============================================================================

const NAV = ['Products', 'Marketing', 'Resources', 'Sale']

const SearchIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
)
const CaretDown = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
  </svg>
)
const Hamburger = () => (
  <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
  </svg>
)

const UtilLink = ({ children, caret }) => (
  <a href="#" className="header-util-link d-inline-flex align-items-center gap-1">
    {children}{caret && <CaretDown />}
  </a>
)

// Logo SVG viewBox is 294×60 (aspect ratio 4.9). Set BOTH dimensions so the
// SVG (which has width="100%") doesn't get a wrong intrinsic width and stretch.
const LOGO_RATIO = 294 / 60

const Logo = ({ height = 36 }) => (
  <div className="d-flex align-items-center gap-3">
    <img src="/header/sanmar-logo-blue.svg" alt="SanMar" width={Math.round(height * LOGO_RATIO)} height={height} />
    <span className="header-divider" />
    <span className="header-tagline">Together, for Good.</span>
  </div>
)

const SearchBar = ({ placeholder }) => (
  <div className="header-search">
    <SearchIcon className="header-search-icon" />
    <Form.Control type="search" placeholder={placeholder} aria-label="Search" />
  </div>
)

const ShoppingBox = () => (
  <div className="d-flex align-items-center gap-2">
    <span className="header-cart">
      <span className="header-cart-badge">817</span>
      <img src="/header/shopping-box.svg" alt="" width={56} height={40} />
    </span>
    <div>
      <div className="fw-bold" style={{ fontSize: 14 }}>Shopping Box</div>
      <a href="#" className="text-decoration-underline" style={{ fontSize: 14, color: '#747473' }}>$15,837.50</a>
    </div>
  </div>
)

function LoggedOutTop() {
  return (
    <div className="d-flex flex-column align-items-end gap-2">
      <div className="d-flex gap-3">
        <UtilLink caret>Contact</UtilLink>
        <UtilLink>New Web User</UtilLink>
        <UtilLink>New Customer Sign Up</UtilLink>
      </div>
      <div>
        <div className="d-flex gap-2">
          <Form.Control size="sm" placeholder="Username" style={{ width: 150 }} />
          <Form.Control size="sm" type="password" placeholder="Password" style={{ width: 150 }} />
          <Button size="sm" variant="primary">Log In</Button>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <Form.Check type="checkbox" id="stay-logged-in" label="Stay Logged In" className="small text-secondary" />
          <a href="#" className="header-util-link small text-decoration-underline">Forgot Password?</a>
        </div>
      </div>
    </div>
  )
}

function LoggedInTop() {
  return (
    <div className="d-flex flex-column align-items-end gap-3">
      <div className="d-flex gap-3">
        <UtilLink>Quick Order</UtilLink>
        <UtilLink caret>New Web User</UtilLink>
        <UtilLink caret>Contact</UtilLink>
        <UtilLink>Saved Shopping Box</UtilLink>
        <UtilLink>Log out</UtilLink>
      </div>
      <div className="d-flex align-items-center gap-5">
        <div className="text-nowrap">
          <div className="fw-bold" style={{ fontSize: 14 }}>Welcome, Victoria</div>
          <div className="text-secondary" style={{ fontSize: 14 }}>Account Exec: Marilena Violari-West (ext. 4760)</div>
        </div>
        <div className="d-flex align-items-center gap-4">
          <ShoppingBox />
          <Button variant="primary">Checkout</Button>
        </div>
      </div>
    </div>
  )
}

const Breadcrumb = () => (
  <Container className="py-2">
    <nav className="d-flex gap-2 align-items-center" aria-label="breadcrumb">
      <a href="#" className="text-decoration-underline" style={{ color: 'var(--bs-primary)' }}>Content</a>
      <span className="text-secondary">&gt;</span>
      <span className="text-secondary">Page</span>
    </nav>
  </Container>
)

export default function SiteHeader({ loggedIn = false, breadcrumbs = true }) {
  return (
    <header className="site-header border-bottom">
      {/* Desktop */}
      <div className="d-none d-lg-block">
        <Container className="d-flex align-items-center justify-content-between py-3">
          <Logo />
          {loggedIn ? <LoggedInTop /> : <LoggedOutTop />}
        </Container>
        <div className="header-navbar">
          <Container className="d-flex align-items-center justify-content-between gap-3">
            <nav className="d-flex">
              {NAV.map((n) => <a key={n} href="#" className="header-nav-item">{n}</a>)}
            </nav>
            <SearchBar placeholder="Search by Product, Style Number, or Category" />
          </Container>
        </div>
        {breadcrumbs && <Breadcrumb />}
      </div>

      {/* Mobile / tablet */}
      <div className="d-lg-none">
        <Container className="d-flex align-items-center justify-content-between py-2">
          <button type="button" className="header-hamburger" aria-label="Menu">
            <Hamburger />
            MENU
          </button>
          <img src="/header/sanmar-logo-blue.svg" alt="SanMar" width={Math.round(24 * LOGO_RATIO)} height={24} />
          {loggedIn ? (
            <span className="header-cart">
              <span className="header-cart-badge">817</span>
              <img src="/header/shopping-box.svg" alt="Cart" width={39} height={28} />
            </span>
          ) : (
            <Button size="sm" variant="primary">Log In</Button>
          )}
        </Container>
        <Container className="pb-2">
          <SearchBar placeholder="Search by Product or Style Number" />
        </Container>
        {breadcrumbs && <Breadcrumb />}
      </div>
    </header>
  )
}
