// =============================================================================
// Sidebar navigation model for the Design Guidelines docs site.
// =============================================================================
// The base path is registered in App.jsx. Child `to` values are relative to it.
// NAV drives the sidebar (grouped) and, flattened, the prev/next pager.

export const BASE = '/design-guidelines'

export const NAV = [
  {
    title: 'Get started',
    items: [
      { to: '', label: 'Overview', end: true },
      { to: 'getting-started', label: 'Using the system' },
    ],
  },
  {
    title: 'Brand',
    items: [
      { to: 'purpose', label: 'Purpose & values' },
      { to: 'principles', label: 'Design principles' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { to: 'foundations/color', label: 'Color' },
      { to: 'foundations/typography', label: 'Typography' },
      { to: 'foundations/spacing', label: 'Spacing & layout' },
      { to: 'foundations/logo', label: 'Logo & brand' },
      { to: 'foundations/iconography', label: 'Iconography' },
    ],
  },
  {
    title: 'Components',
    items: [
      { to: 'components', label: 'Overview', end: true },
      { to: 'components/actions', label: 'Actions' },
      { to: 'components/forms', label: 'Forms & inputs' },
      { to: 'components/feedback', label: 'Feedback & status' },
      { to: 'components/navigation', label: 'Navigation' },
      { to: 'components/containment', label: 'Containment' },
      { to: 'components/data-display', label: 'Data display' },
    ],
  },
  {
    title: 'Content',
    items: [
      { to: 'voice-tone', label: 'Voice & tone' },
      { to: 'writing-for-ux', label: 'Writing for UX' },
    ],
  },
  {
    title: 'Guidance',
    items: [
      { to: 'accessibility', label: 'Accessibility' },
      { to: 'resources', label: 'Resources' },
    ],
  },
]

// Flatten to an ordered list for the prev/next pager. Each entry carries the
// full path (base + relative) plus its label.
export const FLAT = NAV.flatMap((g) =>
  g.items.map((it) => ({
    path: it.to ? `${BASE}/${it.to}` : BASE,
    label: it.label === 'Overview' ? g.title : it.label,
    group: g.title,
  })),
)

export function pagerFor(pathname) {
  // Normalize trailing slash.
  const clean = pathname.replace(/\/$/, '') || BASE
  const i = FLAT.findIndex((e) => e.path === clean)
  if (i === -1) return { prev: null, next: null }
  return { prev: FLAT[i - 1] || null, next: FLAT[i + 1] || null }
}
