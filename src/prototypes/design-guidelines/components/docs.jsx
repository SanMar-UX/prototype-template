import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { pagerFor } from '../data/nav.js'
import { IconArrowRight, IconCheck, IconX, IconInfo, IconWarn } from './icons.jsx'

// Slugify a heading into a stable anchor id.
export const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// -----------------------------------------------------------------------------
// PageHeader — eyebrow + title + lead, the top of every content page.
// -----------------------------------------------------------------------------
export function PageHeader({ eyebrow, title, lead }) {
  return (
    <header className="mb-4">
      {eyebrow && <div className="dg-eyebrow">{eyebrow}</div>}
      <h1 className="dg-page-title">{title}</h1>
      {lead && <p className="dg-lead">{lead}</p>}
    </header>
  )
}

// -----------------------------------------------------------------------------
// H2 — a section heading that auto-registers an id (for the on-this-page rail).
// -----------------------------------------------------------------------------
export function H2({ children }) {
  return <h2 id={slug(children)}>{children}</h2>
}

// -----------------------------------------------------------------------------
// Callout — a colored guidance box (info / success / warning).
// -----------------------------------------------------------------------------
const CALLOUT_ICON = { info: IconInfo, success: IconCheck, warning: IconWarn }
export function Callout({ variant = 'info', title, children }) {
  const Icon = CALLOUT_ICON[variant] || IconInfo
  return (
    <div className={`dg-callout dg-callout-${variant}`}>
      <Icon size="1.15em" />
      <div>
        {title && <span className="dg-callout-title">{title}</span>}
        {children}
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Do / Don't — paired guidance cards. Preview goes in `preview`, guidance text
// as children.
// -----------------------------------------------------------------------------
export function DoDont({ children }) {
  return <div className="dg-dodont my-4">{children}</div>
}
export function Do({ preview, children }) {
  return (
    <div className="dg-dd-card dg-dd-do">
      <div className="dg-dd-preview">{preview}</div>
      <div className="dg-dd-bar"><IconCheck size="1em" /> Do</div>
      <div className="dg-dd-body">{children}</div>
    </div>
  )
}
export function Dont({ preview, children }) {
  return (
    <div className="dg-dd-card dg-dd-dont">
      <div className="dg-dd-preview">{preview}</div>
      <div className="dg-dd-bar"><IconX size="1em" /> Don’t</div>
      <div className="dg-dd-body">{children}</div>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Preview — a checkered stage for a live component sample, with a caption strip.
// -----------------------------------------------------------------------------
export function Preview({ children, meta, center = true }) {
  return (
    <div className="mb-4">
      <div className="dg-preview">
        <div className={`dg-preview-row${center ? ' justify-content-center' : ''}`}>{children}</div>
      </div>
      {meta && <div className="dg-preview-meta">{meta}</div>}
    </div>
  )
}

// -----------------------------------------------------------------------------
// SpecTable — a themed table for tokens / props / anatomy.
// -----------------------------------------------------------------------------
export function SpecTable({ head, rows }) {
  return (
    <Table className="dg-table align-middle" size="sm" hover responsive>
      <thead>
        <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
        ))}
      </tbody>
    </Table>
  )
}

// -----------------------------------------------------------------------------
// OnThisPage — right-rail table of contents with scroll-spy. Reads all h2[id]
// inside the content column at mount and highlights the one in view.
// -----------------------------------------------------------------------------
export function OnThisPage() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState('')
  const { pathname } = useLocation()

  useEffect(() => {
    const nodes = [...document.querySelectorAll('.dg-content h2[id]')]
    setItems(nodes.map((n) => ({ id: n.id, label: n.textContent })))
    if (!nodes.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting)
        if (vis.length) setActive(vis[0].target.id)
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    )
    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [pathname])

  if (items.length < 2) return null
  return (
    <nav className="dg-toc" aria-label="On this page">
      <div className="dg-toc-title">On this page</div>
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          className={active === it.id ? 'active' : undefined}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById(it.id)?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          {it.label}
        </a>
      ))}
    </nav>
  )
}

// -----------------------------------------------------------------------------
// Pager — previous / next links across the flattened nav order.
// -----------------------------------------------------------------------------
export function Pager() {
  const { pathname } = useLocation()
  const { prev, next } = pagerFor(pathname)
  if (!prev && !next) return null
  return (
    <nav className="dg-pager" aria-label="Page navigation">
      {prev ? (
        <Link to={prev.path}>
          <div className="dg-pager-dir">Previous</div>
          <div className="dg-pager-label">{prev.label}</div>
        </Link>
      ) : <span style={{ flex: 1 }} />}
      {next ? (
        <Link to={next.path} className="dg-pager-next">
          <div className="dg-pager-dir">Next</div>
          <div className="dg-pager-label d-inline-flex align-items-center gap-2">
            {next.label} <IconArrowRight />
          </div>
        </Link>
      ) : <span style={{ flex: 1 }} />}
    </nav>
  )
}

// -----------------------------------------------------------------------------
// DocsPage — the standard content layout: a prose column + the on-this-page
// rail, with the prev/next pager pinned at the foot. Scrolls to top on route
// change and honors in-page #hash deep links.
// -----------------------------------------------------------------------------
export function DocsPage({ children }) {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) { el.scrollIntoView(); return }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="dg-page">
      <div className="dg-content">
        {children}
        <Pager />
      </div>
      <OnThisPage />
    </div>
  )
}
