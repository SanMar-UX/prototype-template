import './AccountSidebar.css'

// Prototype-local vertical account nav (same pattern as the returns prototype's
// sidebar — prototypes never import from each other, so this is a local copy
// with "Incentive Program" added under Account Information).
const ITEMS = ['Active Orders', 'Order History', 'Account Information', 'Incentive Programs', 'View & Pay Invoices', 'Address Book', 'Art Library']

export default function AccountSidebar({ active = 'Incentive Programs' }) {
  return (
    <nav className="account-sidebar" aria-label="Account">
      {ITEMS.map((item) => {
        const isActive = item === active
        return isActive ? (
          <span key={item} className="account-sidebar__item account-sidebar__item--active" aria-current="page">
            {item}
          </span>
        ) : (
          <a key={item} href="#" onClick={(e) => e.preventDefault()} className="account-sidebar__item">
            {item}
          </a>
        )
      })}
    </nav>
  )
}
