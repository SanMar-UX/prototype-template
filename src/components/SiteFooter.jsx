import { useState } from 'react'
import { Container } from 'react-bootstrap'

// =============================================================================
// SiteFooter — SanMar's composed marketing footer.
// =============================================================================
// A reusable, responsive footer for prototypes: link columns on desktop,
// collapsible accordion on mobile, logo + social + legal. Styling lives in
// src/styles/_components.scss (.site-footer).
// =============================================================================

const COLUMNS = [
  { title: 'Account', links: ['Your Account', 'Your Orders'] },
  {
    title: 'About Us',
    links: ['About SanMar', 'Our Leaders', 'History', 'Brands We Carry',
      { label: 'Sustainability', external: true }, { label: 'Careers', external: true }, 'Press'],
  },
  {
    title: 'Resources',
    links: ['Product Navigators', 'Size & Fit', 'Glossary of Terms', 'Price Lists', 'Tradeshow Schedule', 'Industry Links'],
  },
  {
    title: 'Services',
    links: ['Decorator Solutions', 'Uniforming Services', 'Samples', 'Custom Apparel', 'Integration Offerings', 'SanMar Sports'],
  },
  { title: 'Help', links: ['Contact Us', 'Shipping Info'] },
]

const LEGAL = ['Privacy Policy', 'Terms and Conditions', 'Supply Chain Disclosure']
const COPYRIGHT = '© Copyright 2024 SanMar Corp. All rights reserved.'

// Brand glyphs (Bootstrap Icons paths).
const SOCIAL = [
  { label: 'Instagram', path: 'M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.599-.92c-.11-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.218 4.109 4.109 0 0 0 0-8.218zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z' },
  { label: 'LinkedIn', path: 'M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z' },
  { label: 'Facebook', path: 'M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z' },
]

const ExternalArrow = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" className="ms-1">
    <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
    <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
  </svg>
)

const linkLabel = (l) => (typeof l === 'string' ? l : l.label)

const FooterLink = ({ link }) => (
  <a href="#" className="footer-link d-inline-flex align-items-center">
    {linkLabel(link)}
    {typeof link === 'object' && link.external && <ExternalArrow />}
  </a>
)

const LogoAndSocial = () => (
  <div className="d-flex flex-column gap-4">
    <img src="/footer/sanmar-logo-white.svg" alt="SanMar" width={168} height={35} />
    <div className="footer-social d-flex gap-3">
      {SOCIAL.map((s) => (
        <a key={s.label} href="#" aria-label={s.label}>
          <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d={s.path} />
          </svg>
        </a>
      ))}
    </div>
  </div>
)

const Legal = ({ className }) => (
  <div className={className}>
    {LEGAL.map((l) => <a key={l} href="#" className="footer-link">{l}</a>)}
  </div>
)

function MobileAccordion() {
  const [open, setOpen] = useState('Account')
  return (
    <div>
      {COLUMNS.map(({ title, links }) => {
        const isOpen = open === title
        return (
          <div key={title}>
            <button
              type="button"
              className="footer-toggle d-flex align-items-center justify-content-between w-100"
              onClick={() => setOpen(isOpen ? null : title)}
              aria-expanded={isOpen}
            >
              <span>{title}</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"
                style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
            {isOpen && (
              <div className="footer-panel d-flex flex-column gap-3 px-3 py-3">
                {links.map((l) => <FooterLink key={linkLabel(l)} link={l} />)}
              </div>
            )}
            <div className="footer-divider mx-3" />
          </div>
        )
      })}
    </div>
  )
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      {/* Desktop / tablet */}
      <Container className="d-none d-md-block py-5">
        <div className="d-flex justify-content-between gap-4">
          <LogoAndSocial />
          {COLUMNS.map(({ title, links }) => (
            <div key={title}>
              <div className="footer-heading mb-3">{title}</div>
              <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {links.map((l) => <li key={linkLabel(l)}><FooterLink link={l} /></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-divider my-4" />
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3" style={{ fontSize: 12 }}>
          <span>{COPYRIGHT}</span>
          <Legal className="d-flex gap-4" />
        </div>
      </Container>

      {/* Mobile */}
      <div className="d-md-none pb-4">
        <MobileAccordion />
        <Container className="pt-4">
          <LogoAndSocial />
          <Legal className="d-flex flex-wrap gap-3 mt-4" />
          <p className="mt-3 mb-0" style={{ fontSize: 12 }}>{COPYRIGHT}</p>
        </Container>
      </div>
    </footer>
  )
}
