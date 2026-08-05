import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// HashRouter (not BrowserRouter): GitHub Pages is static hosting with no
// server-side rewrites, so a route like /projects would 404 on refresh
// under a real path-based router. Hash routing keeps every route resolving
// to the same index.html regardless of host/subpath.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
