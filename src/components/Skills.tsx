import { useState } from 'react'

type SkillGroup = {
  category: string
  color: string
  items: string[]
}

const topRow: SkillGroup[] = [
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
]

const bottomRow: SkillGroup[] = [
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

const SECONDS_PER_CARD = 7

function SkillCard({ group }: { group: SkillGroup }) {
  return (
    <div className="w-72 shrink-0 border-4 border-border bg-panel p-6">
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
  )
}

function MarqueeRow({
  groups,
  direction,
}: {
  groups: SkillGroup[]
  direction: 'left' | 'right'
}) {
  const [paused, setPaused] = useState(false)
  // *2 for the duplicated content, so speed (not just duration) stays
  // consistent regardless of how many cards are in a given row.
  const duration = groups.length * 2 * SECONDS_PER_CARD

  return (
    <div className="overflow-hidden">
      <div
        className="flex w-max gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{
          animationName: `marquee-${direction}`,
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {[...groups, ...groups].map((group, i) => (
          <SkillCard key={`${group.category}-${i}`} group={group} />
        ))}
      </div>
    </div>
  )
}

function Skills() {
  return (
    <section id="skills" className="border-t-4 border-border">
      <div className="mx-auto max-w-5xl px-6 pt-24 pb-16">
        <h2 className="font-pixel text-xl text-cyan">// SKILLS</h2>

        <div className="mt-10 space-y-6">
          <MarqueeRow groups={topRow} direction="left" />
          <MarqueeRow groups={bottomRow} direction="right" />
        </div>
      </div>
    </section>
  )
}

export default Skills
