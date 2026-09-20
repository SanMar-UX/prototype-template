import { Dropdown } from 'react-bootstrap'
import { PERSONAS } from '../data/personas.js'

// Prototype-only control: switches which customer scenario the dashboard
// renders. A floating pill (fixed, bottom-right, above the page) rather than
// page chrome — detached from the layout so it obviously isn't part of the
// product experience, same idiom as Vercel's preview toolbar. Each scenario
// carries the share of enrolled customers on that program so the audience
// understands the magnitude.
// Scenarios ready to demo; the rest stay visible but disabled as WIP.
// Personas flagged `hidden` in the data are left out of the menu entirely.
const VISIBLE = PERSONAS.filter((p) => !p.hidden)
const READY_IDS = VISIBLE.map((p) => p.id)

export default function PersonaSwitcher({ activeId, onChange }) {
  const active = PERSONAS.find((p) => p.id === activeId)
  return (
    <div className="mdb-switcher">
      <div className="mdb-switcher__inner">
        <span className="mdb-switcher__label">Demo — view as:</span>
        <Dropdown drop="up" align="end" onSelect={(id) => id && onChange(id)}>
          <Dropdown.Toggle variant="dark" size="sm" className="mdb-switcher__toggle">
            {active.switcherLabel}
            <span className="mdb-switcher__tag">{active.switcherTag}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark" className="mdb-switcher__menu">
            {VISIBLE.map((p) => {
              const ready = READY_IDS.includes(p.id)
              return (
                <Dropdown.Item
                  key={p.id}
                  eventKey={p.id}
                  active={p.id === activeId}
                  disabled={!ready}
                  title={ready ? undefined : 'Work in progress'}
                >
                  <div className="d-flex justify-content-between align-items-baseline gap-4">
                    <span>{p.switcherLabel}</span>
                    <span className="mdb-switcher__itemtag">{ready ? p.switcherTag : 'WIP'}</span>
                  </div>
                  <div className="mdb-switcher__hint">{p.switcherHint}</div>
                </Dropdown.Item>
              )
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
