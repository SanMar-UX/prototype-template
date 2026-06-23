import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import SiteHeader from '../components/SiteHeader.jsx'
import SiteFooter from '../components/SiteFooter.jsx'

// =============================================================================
// StarterPage — the blank starting point for a prototype.
//
// The real SanMar chrome (full-width header + footer) is already in place; the
// <Container> body is yours. Copy this file to src/screens/ as a base for a new
// screen, or just replace the body below.
//
// Layout: min-vh-100 flex column with a flex-grow-1 main keeps the footer pinned
// to the bottom even when the body is short.
// =============================================================================
export default function StarterPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <SiteHeader loggedIn={false} breadcrumbs={false} />

      <Container as="main" className="py-5 flex-grow-1">
        <h1 className="h3">Your content goes here</h1>
        {/* TEMP deploy-test marker — remove after confirming the deploy loop */}
        <p className="badge text-bg-info mb-3">✅ deploy test — pushed via Claude Code</p>
        <p className="text-secondary mb-0">
          A blank, themed starting point with the SanMar header and footer in
          place. Replace this body with your prototype — reach for components from
          the <Link to="/design-system">design system</Link> rather than building
          from scratch.
        </p>
      </Container>

      <SiteFooter />
    </div>
  )
}
