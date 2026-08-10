import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import HeroBackground from './HeroBackground'

type SafeZone = { top: number; bottom: number }

const contacts = [
  { label: 'Email', href: 'mailto:mrizkywidodo@gmail.com' },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/muhammad-rizky-widodo',
  },
]

function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [safeZone, setSafeZone] = useState<SafeZone | null>(null)

  // Mobile's ambient alien decoration must never fall through the text
  // column (it did — a sprite ended up sitting across the headline). Measure
  // the actual rendered text block so the decoration can stay clear of it.
  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const measure = () => {
      setSafeZone({ top: text.offsetTop, bottom: text.offsetTop + text.offsetHeight })
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(text)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-16"
    >
      <HeroBackground safeZone={safeZone} />

      <div ref={textRef} className="pointer-events-none relative z-10 mx-auto max-w-2xl">
        <p className="font-pixel text-[12px] tracking-widest text-yellow">
          &gt; INFORMATICS ENGINEERING GRAD, ITS 2025
        </p>
        <h1 className="font-pixel mt-6 text-3xl leading-[1.6] text-cyan md:text-4xl lg:text-5xl [text-shadow:0.05em_0_0_var(--color-pink),-0.05em_0_0_var(--color-cyan)]">
          Muhammad
          <br />
          Rizky Widodo
        </h1>
        <p className="mt-6 leading-relaxed text-slate-400">
          Fresh grad who spent the past year building things people at work
          actually use, not class assignments. That meant talking through
          requirements, writing PRDs, and shipping the result myself. I'm
          curious by default, so if something looks interesting, I'll
          usually just try building it before asking whether it's possible.
        </p>

        <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">
          <Link
            to="/projects"
            className="font-pixel border-4 border-cyan bg-cyan px-5 py-3 text-[11px] text-bg shadow-[4px_4px_0_0_var(--color-panel)] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-panel)]"
          >
            VIEW PROJECTS
          </Link>
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.label === 'LinkedIn' ? '_blank' : undefined}
              rel={contact.label === 'LinkedIn' ? 'noreferrer' : undefined}
              className="font-pixel border-4 border-border px-5 py-3 text-[11px] text-slate-300 shadow-[4px_4px_0_0_var(--color-panel)] transition-transform hover:-translate-y-0.5 hover:border-pink hover:text-pink hover:shadow-[6px_6px_0_0_var(--color-panel)]"
            >
              {contact.label.toUpperCase()}
            </a>
          ))}
        </div>

        <p className="font-pixel mt-16 inline-flex items-center gap-2 text-[11px] text-green">
          <span className="animate-blink h-2 w-2 bg-green" />
          OPEN TO WORK — GREATER JAKARTA AREA
        </p>
      </div>
    </section>
  )
}

export default Hero
