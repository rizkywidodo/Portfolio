import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import KonamiEasterEgg from './components/KonamiEasterEgg'
import CRTOverlay from './components/CRTOverlay'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (!location.state) window.scrollTo(0, 0)
  }, [location.pathname, location.state])

  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <CRTOverlay />
      <KonamiEasterEgg />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
