type SkillGroup = {
  category: string
  color: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    color: 'text-cyan',
    items: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Backend & DB',
    color: 'text-pink',
    items: ['Supabase (PostgreSQL)', 'Flask', 'Python', 'SQL'],
  },
  {
    category: 'DevOps & Tools',
    color: 'text-yellow',
    items: ['Vercel', 'Cloudflare', 'Git/GitHub', 'SMTP (Brevo)'],
  },
  {
    category: 'Product',
    color: 'text-green',
    items: ['PRD/BRD Writing', 'Figma', 'Microsoft Forms', 'Excel'],
  },
  {
    category: 'CMS',
    color: 'text-cyan',
    items: ['WordPress', 'Elementor'],
  },
]

function Skills() {
  return (
    <section id="skills" className="border-t-4 border-border">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="font-pixel text-xl text-cyan">// SKILLS</h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="border-4 border-border bg-panel p-6"
            >
              <h3
                className={`font-pixel text-[11px] tracking-wide ${group.color}`}
              >
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-2 border-border px-3 py-1 text-[11px] text-slate-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
