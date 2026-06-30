import { Outlet } from 'react-router-dom'
import { ReturnsProvider } from './state/ReturnsContext.jsx'

// Layout route for the Simplified Returns flow. The provider wraps every step
// screen (rendered via <Outlet />) so the return selection survives navigation
// between steps and resets only on a tab refresh.
export default function ReturnsLayout() {
  return (
    <ReturnsProvider>
      <Outlet />
    </ReturnsProvider>
  )
}
