import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { ReturnsProvider } from './state/ReturnsContext.jsx'

// Layout route for the Simplified Returns flow. The provider wraps every step
// screen (rendered via <Outlet />) so the return selection survives navigation
// between steps and resets only on a tab refresh.
export default function ReturnsLayout() {
  const { pathname } = useLocation()

  // Reset scroll to the top on each step change (react-router keeps the previous
  // scroll position otherwise, so a new screen would open scrolled to the bottom).
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <ReturnsProvider>
      <Outlet />
    </ReturnsProvider>
  )
}
