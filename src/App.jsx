import { Routes, Route } from 'react-router-dom'

import StarterPage from './screens/StarterPage.jsx'
import DesignSystem from './screens/DesignSystem.jsx'

// Prototypes — each self-contained under src/prototypes/<slug>/ (see CLAUDE.md).
import ReturnsLayout from './prototypes/simplified-returns/ReturnsLayout.jsx'
import OrderHistory from './prototypes/simplified-returns/OrderHistory.jsx'
import SelectReturnItems from './prototypes/simplified-returns/SelectReturnItems.jsx'
import AddDetails from './prototypes/simplified-returns/AddDetails.jsx'
import ReviewAndSubmit from './prototypes/simplified-returns/ReviewAndSubmit.jsx'
import ConfirmationScreen from './prototypes/simplified-returns/ConfirmationScreen.jsx'

// =============================================================================
// App — top-level routing.
// =============================================================================
// Blank starting point. Add screens as files in src/screens/ and register them
// as <Route>s below. The SanMar Bootstrap theme is already applied globally.
//
// /design-system is a living reference of the synced design tokens (kept as the
// template grows; safe to delete per-prototype if a team doesn't want it).
// =============================================================================
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StarterPage />} />
      <Route path="/design-system" element={<DesignSystem />} />

      {/* Simplified Returns prototype — provider wraps all steps (state survives navigation) */}
      <Route path="/simplified-returns" element={<ReturnsLayout />}>
        <Route index element={<OrderHistory />} />
        <Route path="new" element={<SelectReturnItems />} />
        <Route path="details" element={<AddDetails />} />
        <Route path="review" element={<ReviewAndSubmit />} />
        <Route path="confirmation" element={<ConfirmationScreen />} />
      </Route>
    </Routes>
  )
}
