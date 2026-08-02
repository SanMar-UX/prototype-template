import { useState } from 'react'
import { Collapse } from 'react-bootstrap'

// Chevron (Bootstrap Icons chevron-right — the repo's icon convention; no
// icon-font dependency). Points right when closed, rotates down when open.
const Chevron = ({ open }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="currentColor"
    className={`mdb-disclosure__chevron${open ? ' mdb-disclosure__chevron--open' : ''}`}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
)

// Progressive-disclosure primitive built on the design system's Collapse
// (native <details>/<summary> isn't themed by Bootstrap). Link-colored toggle
// with a trailing chevron; content animates open.
export default function Disclosure({ summary, className = '', children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <button type="button" className="mdb-disclosure__toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
        {summary}
        <Chevron open={open} />
      </button>
      <Collapse in={open}>
        <div>{children}</div>
      </Collapse>
    </div>
  )
}
