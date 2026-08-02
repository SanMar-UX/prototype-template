import './AccountSidebar.css'

// Prototype-local vertical account nav (same pattern as the returns prototype's
// sidebar — prototypes never import from each other, so this is a local copy
// with "My Dashboard" added).
const ITEMS = ['My Dashboard', 'Active Orders', 'Order History', 'Account Information', 'View & Pay Invoices', 'Address Book', 'Art Library']

export default function AccountSidebar({ active = 'My Dashboard' }) {
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
