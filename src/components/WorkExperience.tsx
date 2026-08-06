import { Link } from 'react-router-dom'

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
    <section id="work-experience" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-pixel text-xl text-cyan">// WORK EXPERIENCE</h2>

      <div className="mt-10 space-y-8">
        {jobs.map((job) => (
          <article
            key={job.company}
            className="border-4 border-border bg-panel p-8 shadow-[8px_8px_0_0_#2a3152]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-pixel text-sm text-slate-100 md:text-base">
                {job.company}
              </h3>
              <span className="font-pixel text-[10px] text-slate-500">
                {job.role} · {job.dates}
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-400">
              {job.body}
            </p>

            {job.projectsAnchor && (
              <Link
                to="/projects"
                state={{ scrollTo: job.projectsAnchor }}
                className="font-pixel mt-6 inline-block border-4 border-cyan bg-cyan px-5 py-3 text-[11px] text-bg shadow-[4px_4px_0_0_#131829] transition-transform hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#131829]"
              >
                VIEW PROJECTS →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default WorkExperience
