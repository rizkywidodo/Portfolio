import { Link, useLocation, useNavigate } from 'react-router-dom'

const sectionLinks = [
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-pixel text-xs text-cyan">
          RW_
        </Link>
        <ul className="flex items-center gap-6 font-pixel text-[10px] tracking-wide text-slate-400 uppercase">
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
      </nav>
    </header>
  )
}

export default Navbar
