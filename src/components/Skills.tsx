type SkillGroup = {
  category: string
  items: string[]
}

const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Backend & DB',
    items: ['Supabase (PostgreSQL)', 'Flask', 'Python', 'SQL'],
  },
  {
    category: 'DevOps & Tools',
    items: ['Vercel', 'Cloudflare', 'Git/GitHub', 'SMTP (Brevo)'],
  },
  {
    category: 'Product',
    items: ['PRD/BRD Writing', 'Figma', 'Microsoft Forms', 'Excel'],
  },
  {
    category: 'CMS',
    items: ['WordPress', 'Elementor'],
  },
]

function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/40"
    >
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Skills
        </h2>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium tracking-wide text-accent uppercase dark:text-accent-dark">
                {group.category}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300"
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
