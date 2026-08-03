import { PERSONAS } from '../data/personas.js'

// Prototype-only control: switches which customer scenario the dashboard
// renders. Deliberately styled as demo chrome (black strip above the page) so
// stakeholders don't mistake it for product UI. Each program tab carries the
// share of enrolled customers on that program so the audience understands the
// magnitude.
// Scenarios ready to demo; the rest stay visible but disabled as WIP.
const READY_IDS = ['standard', 'standard-rc']

export default function PersonaSwitcher({ activeId, onChange }) {
  return (
    <div className="mdb-switcher">
      <div className="mdb-switcher__inner">
        <span className="mdb-switcher__label">Demo — view as:</span>
        <div className="mdb-switcher__buttons" role="tablist" aria-label="Customer scenario">
          {PERSONAS.map((p) => {
            const ready = READY_IDS.includes(p.id)
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={p.id === activeId}
                disabled={!ready}
                title={ready ? undefined : 'Work in progress'}
                className={`mdb-switcher__btn${p.id === activeId ? ' mdb-switcher__btn--active' : ''}`}
                onClick={() => onChange(p.id)}
              >
                {p.switcherLabel}
                <span className="mdb-switcher__tag">{ready ? p.switcherTag : 'WIP'}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
