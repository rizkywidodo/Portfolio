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
      'Booking ruang di 13 stasiun MRT dikoordinasi manual, tidak ada visibility bersama antara planner dan staff stasiun.',
    solution:
      'Membangun platform booking full-CRUD dengan role-based access (super admin, planner, area authority) dan auto email confirmation.',
    impact: 'Menggantikan proses manual di 13 stasiun sekaligus.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel', 'Brevo SMTP'],
  },
  {
    title: 'Bank Data Station Dashboard',
    org: 'MRT Jakarta',
    problem:
      'Shift report dikompilasi lewat Excel Online yang lambat dan rawan error.',
    solution:
      'Membangun CSV-upload pipeline dengan dashboard yang filterable, di-deploy di Vercel.',
    impact: 'Kompilasi shift report jadi cepat dan minim human error.',
    stack: ['React', 'TypeScript', 'Supabase', 'Cloudflare'],
  },
  {
    title: 'Station Digitalization Proposal',
    org: 'MRT Jakarta',
    problem:
      'Regional planner butuh business case yang lebih kuat untuk justifikasi investasi IT.',
    solution:
      'Menulis BRD/PRD, mendesain mockup di Figma, dan proaktif membangun working prototype — bukan sekadar mockup.',
    impact: 'Business case didukung prototype nyata, bukan cuma dokumen.',
    stack: ['Figma', 'PRD/BRD', 'React'],
  },
]

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Projects
      </h2>
      <p className="mt-2 max-w-xl text-neutral-500 dark:text-neutral-400">
        Case study dari internship di MRT Jakarta — dari requirements
        gathering sampai deployment.
      </p>

      <div className="mt-12 space-y-6">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-2xl border border-neutral-200 p-8 transition-colors hover:border-accent/50 dark:border-neutral-800 dark:hover:border-accent-dark/50"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-medium text-neutral-900 dark:text-white">
                {project.title}
              </h3>
              <span className="text-sm text-neutral-400 dark:text-neutral-500">
                {project.org}
              </span>
            </div>

            <dl className="mt-6 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-medium tracking-wide text-accent uppercase dark:text-accent-dark">
                  Problem
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.problem}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-accent uppercase dark:text-accent-dark">
                  Solution
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.solution}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium tracking-wide text-accent uppercase dark:text-accent-dark">
                  Impact
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {project.impact}
                </dd>
              </div>
            </dl>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400"
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

export default Projects
