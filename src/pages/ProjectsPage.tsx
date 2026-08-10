import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { playInsert, playSelect, unlockAudio } from '../lib/sound'

const LOAD_MS = 500
type CartridgeState = 'closed' | 'loading' | 'open'

type Project = {
  title: string
  org: string
  problem: string
  solution: string
  impact: string
  stack: string[]
}

const projects: Project[] = [
  {
    title: 'Booking Ruang Stasiun',
    org: 'MRT Jakarta — Station Digitalization Intern',
    problem:
      '13 stations, one Google Form, and no real-time visibility into what was already booked. Double-bookings and manual back-and-forth were routine, with no clean way to track requests at scale.',
    solution:
      'A full-CRUD booking platform with role-based access for super admins, planners, and area authorities. Booking requests trigger instant email confirmations via Brevo SMTP, so approvals happen without anyone manually following up.',
    impact: 'Live across all 13 stations, fully replacing manual coordination.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel', 'Brevo SMTP'],
  },
  {
    title: 'Bank Data Station Dashboard',
    org: 'MRT Jakarta',
    problem:
      'Daily Safety/Service/Security reports ran through Excel Online/Sheets, laggy and painful to filter across 4 stations. I was tasked with building a dashboard to fix that.',
    solution:
      'I proposed a real web app: a pipeline that turns the raw form export into a live, filterable dashboard with real-time stats, category breakdowns, per-station trends, and drill-down into individual reports with photo attachments.',
    impact:
      'Now used daily to analyze complaints and findings across stations, with reports updating the moment they\'re uploaded.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Cloudflare'],
  },
  {
    title: 'Station Digitalization Proposal',
    org: 'MRT Jakarta',
    problem:
      'Regional planners needed to pitch IT investment to leadership, and a slide deck by itself wasn\'t going to convince anyone.',
    solution:
      'Wrote the BRD and PRD, designed Figma mockups, then built a working prototype on top of them.',
    impact:
      'The pitch came with a working demo people could try themselves.',
    stack: ['Figma', 'PRD/BRD', 'React', 'Vite'],
  },
]

const labelColor: Record<string, string> = {
  PROBLEM: 'text-pink',
  SOLUTION: 'text-cyan',
  IMPACT: 'text-yellow',
}

function companyOf(org: string) {
  return org.split('—')[0].trim()
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const companies = [...new Set(projects.map((project) => companyOf(project.org)))]

function ProjectsPage() {
  const location = useLocation()
  const [cartridges, setCartridges] = useState<Record<string, CartridgeState>>({})

  const insertCartridge = (title: string) => {
    unlockAudio()
    playInsert()
    setCartridges((prev) => ({ ...prev, [title]: 'loading' }))
    window.setTimeout(() => {
      setCartridges((prev) => ({ ...prev, [title]: 'open' }))
    }, LOAD_MS)
  }

  // Nav/links to a specific company's projects pass the target section id
  // via router state (see WorkExperience.tsx) since HashRouter can't also
  // carry a plain #anchor in the URL.
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
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <Link
        to="/"
        onClick={() => {
          unlockAudio()
          playSelect()
        }}
        className="font-pixel inline-block text-[11px] text-muted transition-colors hover:text-pink"
      >
        &larr; BACK
      </Link>

      <h1 className="font-pixel mt-6 text-xl text-cyan">// PROJECTS</h1>
      <p className="mt-4 max-w-xl text-sm text-slate-400">
        A few projects from my internship at MRT Jakarta, from figuring out
        what people actually needed to shipping something they use. (Repos
        are private — still running in production.)
      </p>

      {companies.map((company) => (
        <div key={company} id={slugify(company)} className="mt-16 first:mt-10">
          <h2 className="font-pixel text-[11px] tracking-widest text-muted">
            {company.toUpperCase()}
          </h2>

          <div className="mt-6 space-y-8">
            {projects
              .filter((project) => companyOf(project.org) === company)
              .map((project) => {
                const status = cartridges[project.title] ?? 'closed'
                return (
                  <article
                    key={project.title}
                    className="overflow-hidden border-4 border-border bg-panel shadow-[8px_8px_0_0_var(--color-border)] transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-2 bg-border px-6 py-3">
                      <span className="text-cyan">▣</span>
                      <span className="font-pixel text-[11px] tracking-wide text-cyan">
                        CARTRIDGE {String(projects.indexOf(project) + 1).padStart(2, '0')} —{' '}
                        {project.title.toUpperCase()}
                      </span>
                    </div>

                    <div className="p-8">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-pixel text-sm text-slate-100 md:text-base">
                          {project.title}
                        </h3>
                        <span className="font-pixel text-[11px] text-muted">
                          {project.org}
                        </span>
                      </div>

                      {status === 'open' && (
                        <>
                          <dl className="mt-8 grid gap-6 sm:grid-cols-3">
                            {(
                              [
                                ['PROBLEM', project.problem],
                                ['SOLUTION', project.solution],
                                ['IMPACT', project.impact],
                              ] as const
                            ).map(([label, text]) => (
                              <div key={label}>
                                <dt
                                  className={`font-pixel text-[11px] tracking-wide ${labelColor[label]}`}
                                >
                                  {label}
                                </dt>
                                <dd className="mt-3 text-sm leading-relaxed text-slate-400">
                                  {text}
                                </dd>
                              </div>
                            ))}
                          </dl>

                          <ul className="mt-8 flex flex-wrap gap-2">
                            {project.stack.map((tech) => (
                              <li
                                key={tech}
                                className="border-2 border-border px-3 py-1 text-[11px] text-slate-400"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      {status === 'loading' && (
                        <div className="mt-8">
                          <div className="h-4 w-full border-2 border-border bg-bg">
                            <div className="animate-cartridge-load h-full bg-cyan" />
                          </div>
                          <p className="font-pixel mt-3 text-[11px] tracking-wide text-muted">
                            LOADING…
                          </p>
                        </div>
                      )}

                      {status === 'closed' && (
                        <div className="mt-8 flex justify-center py-6">
                          <button
                            type="button"
                            onClick={() => insertCartridge(project.title)}
                            className="animate-blink font-pixel cursor-pointer text-[11px] tracking-wide text-pink transition-colors hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink"
                          >
                            ▸ INSERT TO VIEW DETAILS
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                )
              })}
          </div>
        </div>
      ))}
    </section>
  )
}

export default ProjectsPage
