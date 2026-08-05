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
      'Booking ruang di 13 stasiun MRT masih manual, planner sama staff stasiun juga nggak bisa saling liat jadwal.',
    solution:
      'Bikin platform booking full-CRUD, ada role beda-beda (super admin, planner, area authority), plus otomatis kirim email konfirmasi.',
    impact: 'Proses manual di 13 stasiun langsung kegantiin semua.',
    stack: ['React', 'TypeScript', 'Vite', 'Supabase', 'Vercel', 'Brevo SMTP'],
  },
  {
    title: 'Bank Data Station Dashboard',
    org: 'MRT Jakarta',
    problem:
      'Bikin shift report masih pake Excel Online, lemot dan gampang salah.',
    solution:
      'Bikin sistem upload CSV yang langsung masuk dashboard, bisa difilter-filter, di-deploy di Vercel.',
    impact: 'Bikin shift report jadi cepet dan minim typo/salah input.',
    stack: ['React', 'TypeScript', 'Supabase', 'Cloudflare'],
  },
  {
    title: 'Station Digitalization Proposal',
    org: 'MRT Jakarta',
    problem:
      'Regional planner butuh alasan yang lebih kuat buat ngeyakinin investasi IT.',
    solution:
      'Nulis BRD/PRD, bikin mockup di Figma, terus gas bikin prototype yang beneran jalan — bukan cuma mockup doang.',
    impact: 'Business case-nya jadi lebih kuat karena ada prototype beneran, bukan cuma dokumen.',
    stack: ['Figma', 'PRD/BRD', 'React'],
  },
]

const labelColor: Record<string, string> = {
  PROBLEM: 'text-pink',
  SOLUTION: 'text-cyan',
  IMPACT: 'text-yellow',
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-pixel text-xl text-cyan">// PROJECTS</h2>
      <p className="mt-4 max-w-xl text-sm text-slate-400">
        Beberapa project pas magang di MRT Jakarta, dari mikirin kebutuhannya
        sampe jadi aplikasi beneran. (Repo-nya private soalnya masih dipake
        sampe sekarang.)
      </p>

      <div className="mt-10 space-y-8">
        {projects.map((project) => (
          <article
            key={project.title}
            className="border-4 border-border bg-panel p-8 shadow-[8px_8px_0_0_#2a3152] transition-transform hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-pixel text-sm text-slate-100 md:text-base">
                {project.title}
              </h3>
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

export default Projects
