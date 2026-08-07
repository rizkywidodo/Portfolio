const stats = [
  { label: 'GPA', value: '3.32', color: 'text-cyan' },
  { label: 'TOEFL ITP', value: '540', color: 'text-pink' },
  { label: 'Grad Year', value: '2025', color: 'text-yellow' },
]

function Education() {
  return (
    <section id="education" className="-mt-10 border-t-4 border-border lg:-mt-16">
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <h2 className="font-pixel text-xl text-cyan">// EDUCATION</h2>

        <div className="mt-10 border-4 border-border bg-panel p-8 shadow-[8px_8px_0_0_#2a3152]">
          <p className="font-pixel text-sm text-slate-200 md:text-base">
            Institut Teknologi Sepuluh Nopember (ITS)
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Bachelor of Informatics Engineering
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t-4 border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className={`font-pixel text-lg md:text-2xl ${stat.color}`}>
                  {stat.value}
                </p>
                <p className="mt-2 text-[11px] tracking-wide text-slate-500 uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
