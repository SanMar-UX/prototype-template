import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// The single stylesheet. Importing it here applies the SanMar-themed Bootstrap
// build to the whole app. (We import our compiled SCSS, NOT bootstrap's prebuilt
// CSS — that's how the design-system tokens take effect.)
import './styles/main.scss'

import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
