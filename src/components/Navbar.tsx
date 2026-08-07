import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const sectionLinks = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'work-experience', label: 'Work' },
  { id: 'terminal', label: 'Terminal' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const goHome = (e: React.MouseEvent) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      e.preventDefault()
      document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={goHome} className="font-pixel text-xs text-cyan">
          RW_
        </Link>

        <ul className="hidden items-center gap-6 font-pixel text-[10px] tracking-wide text-slate-400 uppercase sm:flex">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={goToSection(link.id)}
                className="transition-colors hover:text-pink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link to="/projects" className="transition-colors hover:text-pink">
              Projects
            </Link>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          className="flex flex-col gap-1.5 sm:hidden"
        >
          <span
            className={`block h-0.5 w-6 bg-cyan transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-cyan transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-cyan transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <ul className="flex flex-col gap-4 border-t-4 border-border bg-bg px-6 py-6 font-pixel text-[11px] tracking-wide text-slate-400 uppercase sm:hidden">
          {sectionLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`/#${link.id}`}
                onClick={goToSection(link.id)}
                className="transition-colors hover:text-pink"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="transition-colors hover:text-pink"
            >
              Projects
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Navbar
