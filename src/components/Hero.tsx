import { Link } from 'react-router-dom'
import HeroBackground from './HeroBackground'

const contacts = [
  { label: 'Email', href: 'mailto:mrizkywidodo@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammad-rizky-widodo',
  },
]

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-start overflow-hidden px-6 pt-28 lg:pt-40"
    >
      <HeroBackground />

      <div className="pointer-events-none relative z-10 mx-auto max-w-5xl">
        <p className="font-pixel text-[11px] tracking-widest text-yellow">
          &gt; INFORMATICS ENGINEERING GRAD, ITS 2025
        </p>
        <h1 className="font-pixel mt-6 text-3xl leading-[1.6] text-cyan md:text-4xl lg:text-5xl">
          Muhammad
          <br />
          Rizky Widodo
        </h1>
        <p className="mt-6 max-w-xl leading-relaxed text-slate-400">
          Fresh grad who spent the past year coding things people actually
          use at work, not just class assignments — talking through
          requirements, writing PRDs, shipping it myself. Curious by
          default: if something looks interesting, I'll try building it
          myself before asking if it's possible.
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="font-pixel border-4 border-cyan bg-cyan px-5 py-3 text-[11px] text-bg shadow-[4px_4px_0_0_#131829] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131829]"
          >
            VIEW PROJECTS
          </Link>
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === 'LinkedIn' ? '_blank' : undefined}
              rel={contact.label === 'LinkedIn' ? 'noreferrer' : undefined}
              className="font-pixel border-4 border-border px-5 py-3 text-[11px] text-slate-300 shadow-[4px_4px_0_0_#131829] transition-transform hover:-translate-y-0.5 hover:border-pink hover:text-pink hover:shadow-[6px_6px_0_0_#131829]"
            >
              {contact.label.toUpperCase()}
            </a>
          ))}
        </div>

        <p className="font-pixel mt-16 inline-flex items-center gap-2 text-[10px] text-green">
          <span className="animate-blink h-2 w-2 bg-green" />
          OPEN TO WORK — GREATER JAKARTA AREA
        </p>
      </div>
    </section>
  )
}

export default Hero
