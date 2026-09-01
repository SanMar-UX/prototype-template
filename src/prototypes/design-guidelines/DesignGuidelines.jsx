import { useState } from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { Offcanvas } from 'react-bootstrap'
import { NAV, BASE } from './data/nav.js'
import { IconMenu, IconExternal, IconGitHub } from './components/icons.jsx'
import './design-guidelines.css'

// =============================================================================
// DesignGuidelines — the documentation-site shell.
// =============================================================================
// A Carbon/Auro-style docs experience for the SanMar design system: a fixed top
// bar, a grouped left sidebar, and a routed content area (<Outlet />). Mobile
// collapses the sidebar into an offcanvas drawer. Everything is scoped under the
// `.dg` root class + design-guidelines.css so it stays isolated from the shared
// foundation. Child pages live in ./pages and register under BASE in App.jsx.
// =============================================================================

const LOGO_RATIO = 168 / 34.7263 // white wordmark viewBox ratio

function SidebarNav({ onNavigate }) {
  return (
    <nav aria-label="Design guidelines">
      {NAV.map((group) => (
        <div key={group.title} className="dg-nav-group">
          <div className="dg-nav-title">{group.title}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.to || 'index'}
              to={item.to ? `${BASE}/${item.to}` : BASE}
              end={item.end}
              className="dg-nav-link"
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

export default function DesignGuidelines() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="dg">
      {/* Top bar */}
      <header className="dg-topbar">
        <button
          type="button"
          className="dg-menu-btn"
          aria-label="Open navigation"
          onClick={() => setMenuOpen(true)}
        >
          <IconMenu size="20" />
        </button>

        <Link to={BASE} className="dg-brand">
          <img
            src="/footer/sanmar-logo-white.svg"
            alt="SanMar"
            height={24}
            width={Math.round(24 * LOGO_RATIO)}
          />
          <span className="dg-brand-sep" />
          <span className="dg-brand-name">Digital Brand Guidelines</span>
        </Link>

        <div className="dg-topbar-links">
          <Link to="/design-system">Component catalog</Link>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Figma <IconExternal size="0.85em" />
          </a>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label="Repository">
            <IconGitHub size="1.1em" />
          </a>
        </div>
      </header>

      {/* Shell */}
      <div className="dg-shell">
        <aside className="dg-sidebar">
          <SidebarNav />
        </aside>

        <main className="dg-main">
          <Outlet />
        </main>
      </div>

      {/* Mobile drawer */}
      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        className="dg-offcanvas"
        style={{ maxWidth: 300 }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Digital Brand Guidelines</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SidebarNav onNavigate={() => setMenuOpen(false)} />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
