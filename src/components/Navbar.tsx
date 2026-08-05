const links = [
  { href: '#education', label: 'Education' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
]

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-4 border-border bg-bg/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          className="font-pixel text-xs text-cyan"
        >
          RW_
        </a>
        <ul className="flex items-center gap-6 font-pixel text-[10px] tracking-wide text-slate-400 uppercase">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-pink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
