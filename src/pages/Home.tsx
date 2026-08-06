import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import Education from '../components/Education'
import Skills from '../components/Skills'
import WorkExperience from '../components/WorkExperience'
import Terminal from '../components/Terminal'

function Home() {
  const location = useLocation()

  // Nav links to "Education"/"Skills" from other pages pass the target
  // section id via router state (see Navbar.tsx) since HashRouter can't
  // also carry a plain #anchor in the URL.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)
      ?.scrollTo
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [location.state])

  return (
    <>
      <Hero />
      <Education />
      <Skills />
      <WorkExperience />
      <Terminal />
    </>
  )
}

export default Home
