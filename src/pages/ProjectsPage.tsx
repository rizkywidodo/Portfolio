import { Link } from 'react-router-dom'

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
      "13 stations, one room schedule that only lived in each planner's head. Station staff kept double-booking because nobody could see what anyone else had reserved.",
    solution:
      'A full-CRUD booking platform with role-based access (super admin, planner, area authority) and automatic email confirmations — so nobody has to ask "did this get approved?" anymore.',
    impact: 'Live across all 13 stations, fully replacing manual coordination.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel', 'Brevo SMTP'],
  },
  {
    title: 'Bank Data Station Dashboard',
    org: 'MRT Jakarta',
    problem:
      'Shift reports got compiled through Excel Online — slow, and one wrong click could send bad data through without anyone noticing.',
    solution:
      'A CSV-upload pipeline that renders straight into a filterable dashboard, deployed on Vercel.',
    impact: 'Reports that used to take a wait now update the moment you upload.',
    stack: ['React', 'TypeScript', 'Supabase', 'Cloudflare'],
  },
  {
    title: 'Station Digitalization Proposal',
    org: 'MRT Jakarta',
    problem:
      'Regional planners needed to pitch IT investment, but slides alone are easy to say no to — people need to see it, not just hear about it.',
    solution:
      'Wrote the BRD and PRD, designed Figma mockups, then went further: built an actual working prototype instead of stopping at static designs.',
    impact:
      'The pitch came with a demo people could try themselves, not just a promise on paper.',
    stack: ['Figma', 'PRD/BRD', 'React'],
  },
]

const labelColor: Record<string, string> = {
  PROBLEM: 'text-pink',
  SOLUTION: 'text-cyan',
  IMPACT: 'text-yellow',
}

function ProjectsPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-32 pb-24">
      <Link
        to="/"
        className="font-pixel inline-block text-[10px] text-slate-500 transition-colors hover:text-pink"
      >
        &larr; BACK
      </Link>

      <h1 className="font-pixel mt-6 text-xl text-cyan">// PROJECTS</h1>
      <p className="mt-4 max-w-xl text-sm text-slate-400">
        A few projects from my internship at MRT Jakarta, from figuring out
        what people actually needed to shipping something they use. (Repos
        are private — still running in production.)
      </p>

      <div className="mt-10 space-y-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="border-4 border-border bg-panel p-8 shadow-[8px_8px_0_0_#2a3152] transition-transform hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-pixel text-sm text-slate-100 md:text-base">
                {project.title}
              </h2>
              <span className="font-pixel text-[10px] text-slate-500">
                {project.org}
              </span>
            </div>

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
                    className={`font-pixel text-[10px] tracking-wide ${labelColor[label]}`}
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
                  className="border-2 border-border px-3 py-1 text-[10px] text-slate-400"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsPage
