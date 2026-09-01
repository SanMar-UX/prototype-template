import { Routes, Route } from 'react-router-dom'

import StarterPage from './screens/StarterPage.jsx'
import DesignSystem from './screens/DesignSystem.jsx'

// Prototypes — each self-contained under src/prototypes/<slug>/ (see CLAUDE.md).
import ReturnsLayout from './prototypes/simplified-returns/ReturnsLayout.jsx'
import OrderHistory from './prototypes/simplified-returns/OrderHistory.jsx'
import ReturnDetails from './prototypes/simplified-returns/ReturnDetails.jsx'
import OrderDetails from './prototypes/simplified-returns/OrderDetails.jsx'
import SelectReturnItems from './prototypes/simplified-returns/SelectReturnItems.jsx'
import AddDetails from './prototypes/simplified-returns/AddDetails.jsx'
import ReviewAndSubmit from './prototypes/simplified-returns/ReviewAndSubmit.jsx'
import ConfirmationScreen from './prototypes/simplified-returns/ConfirmationScreen.jsx'
import MyDashboard from './prototypes/my-dashboard/MyDashboard.jsx'

// Design Guidelines — a routed docs site (shell + nested pages)
import DesignGuidelines from './prototypes/design-guidelines/DesignGuidelines.jsx'
import DGHome from './prototypes/design-guidelines/pages/Home.jsx'
import DGGettingStarted from './prototypes/design-guidelines/pages/GettingStarted.jsx'
import DGPurpose from './prototypes/design-guidelines/pages/PurposeValues.jsx'
import DGPrinciples from './prototypes/design-guidelines/pages/Principles.jsx'
import DGColor from './prototypes/design-guidelines/pages/foundations/Color.jsx'
import DGTypography from './prototypes/design-guidelines/pages/foundations/Typography.jsx'
import DGSpacing from './prototypes/design-guidelines/pages/foundations/Spacing.jsx'
import DGLogo from './prototypes/design-guidelines/pages/foundations/Logo.jsx'
import DGIconography from './prototypes/design-guidelines/pages/foundations/Iconography.jsx'
import DGComponents from './prototypes/design-guidelines/pages/components/ComponentsOverview.jsx'
import DGActions from './prototypes/design-guidelines/pages/components/Actions.jsx'
import DGForms from './prototypes/design-guidelines/pages/components/Forms.jsx'
import DGFeedback from './prototypes/design-guidelines/pages/components/Feedback.jsx'
import DGNavigation from './prototypes/design-guidelines/pages/components/Navigation.jsx'
import DGContainment from './prototypes/design-guidelines/pages/components/Containment.jsx'
import DGDataDisplay from './prototypes/design-guidelines/pages/components/DataDisplay.jsx'
import DGVoiceTone from './prototypes/design-guidelines/pages/VoiceTone.jsx'
import DGWriting from './prototypes/design-guidelines/pages/WritingForUX.jsx'
import DGAccessibility from './prototypes/design-guidelines/pages/Accessibility.jsx'
import DGResources from './prototypes/design-guidelines/pages/Resources.jsx'

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
        <Route path="order" element={<OrderDetails />} />
        <Route path="view" element={<ReturnDetails />} />
        <Route path="new" element={<SelectReturnItems />} />
        <Route path="details" element={<AddDetails />} />
        <Route path="review" element={<ReviewAndSubmit />} />
        <Route path="confirmation" element={<ConfirmationScreen />} />
      </Route>

      {/* My Dashboard prototype — Incentive Programs MVP (persona switcher built in) */}
      <Route path="/my-dashboard" element={<MyDashboard />} />

      {/* Design Guidelines — docs site; shell renders the sidebar + <Outlet /> */}
      <Route path="/design-guidelines" element={<DesignGuidelines />}>
        <Route index element={<DGHome />} />
        <Route path="getting-started" element={<DGGettingStarted />} />
        <Route path="purpose" element={<DGPurpose />} />
        <Route path="principles" element={<DGPrinciples />} />
        <Route path="foundations/color" element={<DGColor />} />
        <Route path="foundations/typography" element={<DGTypography />} />
        <Route path="foundations/spacing" element={<DGSpacing />} />
        <Route path="foundations/logo" element={<DGLogo />} />
        <Route path="foundations/iconography" element={<DGIconography />} />
        <Route path="components" element={<DGComponents />} />
        <Route path="components/actions" element={<DGActions />} />
        <Route path="components/forms" element={<DGForms />} />
        <Route path="components/feedback" element={<DGFeedback />} />
        <Route path="components/navigation" element={<DGNavigation />} />
        <Route path="components/containment" element={<DGContainment />} />
        <Route path="components/data-display" element={<DGDataDisplay />} />
        <Route path="voice-tone" element={<DGVoiceTone />} />
        <Route path="writing-for-ux" element={<DGWriting />} />
        <Route path="accessibility" element={<DGAccessibility />} />
        <Route path="resources" element={<DGResources />} />
      </Route>
    </Routes>
  )
}
