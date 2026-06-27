import { Routes, Route } from 'react-router-dom'

import StarterPage from './screens/StarterPage.jsx'
import DesignSystem from './screens/DesignSystem.jsx'

// Prototypes — each self-contained under src/prototypes/<slug>/ (see CLAUDE.md).
import SelectReturnItems from './prototypes/simplified-returns/SelectReturnItems.jsx'

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

      {/* Simplified Returns prototype */}
      <Route path="/simplified-returns" element={<SelectReturnItems />} />
    </Routes>
  )
}
