import './AccountSidebar.css'

// Ad-hoc vertical account nav for the "My SanMar" pages. Only "Order History"
// is wired in this prototype; the rest are inert links.
const ITEMS = ['Active Orders', 'Order History', 'Account Information', 'View & Pay Invoices', 'Address Book', 'Art Library']

export default function AccountSidebar({ active = 'Order History' }) {
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
