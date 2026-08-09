import { Link } from 'react-router-dom'
import PixelSnake from './PixelSnake'
import { playSelect, unlockAudio } from '../lib/sound'

const jobs = [
  {
    company: 'MRT Jakarta',
    role: 'Station Digitalization Intern',
    dates: 'Dec 2025 – Jun 2026',
    body: 'Room bookings across 13 stations ran through Google Forms — no real-time visibility, frequent double-bookings. Daily shift reports were stuck in slow, unfilterable Excel Online sheets. I built the systems that replaced both: a live booking platform and a data dashboard, still in production use today. Also contributed to TRAMS, a mission-critical platform migration — interviewing station staff to translate operational needs into a structured BRD for the dev team.',
    projectsAnchor: 'mrt-jakarta',
  },
  {
    company: 'Bank Rakyat Indonesia (BRI)',
    role: 'IT Intern',
    dates: 'Sep 2022 – Mar 2023',
    body: "BRI's Consumer Business Department was managing housing/mortgage property listings manually through Google Drive — no structured catalog, hard to browse or update. I built BRIOmah to replace it. On the Operation Network & Service side, branch SOP compliance checks (staff appearance, service quality) were still paper-based — I digitized that into a web tool, and supported secret shopping evaluations and CCTV compliance reviews across branches.",
    projectsAnchor: null,
  },
]

function WorkExperience() {
  return (
    <section
      id="work-experience"
      className="relative overflow-hidden border-t-4 border-border"
    >
      <PixelSnake />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-16 lg:py-24">
        <h2 className="font-pixel text-xl text-cyan">// WORK EXPERIENCE</h2>

        <div className="mt-8 space-y-8">
          {jobs.map((job, index) => (
            <article
              key={job.company}
              className="overflow-hidden border-4 border-border bg-panel shadow-[8px_8px_0_0_var(--color-border)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 bg-border px-6 py-3">
                <span className="font-pixel text-[11px] tracking-wide text-yellow">
                  ▣ MISSION FILE {String(index + 1).padStart(2, '0')} — {job.company.toUpperCase()}
                </span>
                <span className="font-pixel -rotate-[4deg] border-2 border-green px-2 py-1 text-[11px] text-green">
                  STATUS: CLEARED
                </span>
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-pixel text-sm text-slate-100 md:text-base">
                    {job.company}
                  </h3>
                  <span className="font-pixel text-[11px] text-muted">
                    {job.role} · {job.dates}
                  </span>
                </div>

                <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-400">
                  {job.body}
                </p>

                {job.projectsAnchor && (
                  <Link
                    to="/projects"
                    state={{ scrollTo: job.projectsAnchor }}
                    onClick={() => {
                      unlockAudio()
                      playSelect()
                    }}
                    className="font-pixel mt-6 inline-block border-4 border-cyan bg-cyan px-5 py-3 text-[11px] text-bg shadow-[4px_4px_0_0_var(--color-panel)] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-panel)]"
                  >
                    VIEW PROJECTS →
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WorkExperience
