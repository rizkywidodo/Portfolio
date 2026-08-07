import { useState } from 'react'

const coreStack = ['React', 'TypeScript', 'Supabase', 'Vite', 'PRD/BRD Writing']

const alsoWorkedWith = [
  'HTML',
  'CSS',
  'JavaScript',
  'Python',
  'Flask',
  'SQL',
  'Vercel',
  'Git/GitHub',
  'Figma',
  'Cloudflare',
  'SMTP (Brevo)',
]

const SECONDS_PER_ITEM = 2.2

function Skills() {
  const [paused, setPaused] = useState(false)
  const duration = alsoWorkedWith.length * 2 * SECONDS_PER_ITEM

  return (
    <section id="skills" className="border-t-4 border-border">
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-10 lg:pt-24 lg:pb-16">
        <h2 className="font-pixel text-xl text-cyan">// SKILLS</h2>

        <p className="font-pixel mt-10 text-[10px] tracking-widest text-slate-500">
          CORE STACK
        </p>
        <div className="mt-4 flex flex-wrap gap-4">
          {coreStack.map((skill) => (
            <span
              key={skill}
              className="font-pixel border-4 border-cyan bg-panel px-5 py-3 text-[12px] tracking-wide text-cyan shadow-[0_0_18px_rgba(46,230,255,0.35)]"
            >
              {skill.toUpperCase()}
            </span>
          ))}
        </div>

        <p className="font-pixel mt-10 text-[10px] tracking-widest text-slate-500">
          ALSO WORKED WITH
        </p>
        <div
          className="relative mt-4 overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex w-max items-center gap-3 whitespace-nowrap"
            style={{
              animationName: 'marquee-left',
              animationDuration: `${duration}s`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationPlayState: paused ? 'paused' : 'running',
            }}
          >
            {[...alsoWorkedWith, ...alsoWorkedWith].map((skill, i) => (
              <span
                key={i}
                className="font-pixel border-2 border-border px-3 py-1.5 text-[10px] tracking-wide text-slate-400"
              >
                {skill.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills
