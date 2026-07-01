import { createContext, useContext, useState } from 'react'
import { initialEntriesById, hasValidReturn } from './returnsModel.js'

// Holds the shopper's return selection in memory so it persists across the flow's
// step screens. It lives above the step routes (see ReturnsLayout), so navigating
// between steps keeps it, while a browser-tab refresh resets it.

const ReturnsContext = createContext(null)

export function ReturnsProvider({ children }) {
  const [entriesById, setEntriesById] = useState(initialEntriesById)
  const [shipMethod, setShipMethod] = useState(null)   // selected shipping option id
  const [order, setOrder] = useState(null)             // the order the return was started from

  // Returns a setter bound to one product's entries array.
  const setEntriesFor = (id) => (next) =>
    setEntriesById((prev) => ({ ...prev, [id]: next }))

  const value = {
    entriesById,
    setEntriesFor,
    shipMethod,
    setShipMethod,
    order,
    setOrder,
    hasValidReturn: hasValidReturn(entriesById),
  }

  return <ReturnsContext.Provider value={value}>{children}</ReturnsContext.Provider>
}

export function useReturns() {
  const ctx = useContext(ReturnsContext)
  if (!ctx) throw new Error('useReturns must be used within a ReturnsProvider')
  return ctx
}
