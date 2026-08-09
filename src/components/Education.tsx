import PixelGraduate from './PixelGraduate'

function Education() {
  return (
    <section id="education" className="border-t-4 border-border">
      <div className="mx-auto max-w-5xl px-6 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <h2 className="font-pixel text-xl text-cyan">// EDUCATION</h2>

        <div className="relative mt-10">
          <PixelGraduate />
          <div className="border-4 border-border bg-panel p-8 shadow-[8px_8px_0_0_var(--color-border)]">
            <p className="font-pixel text-sm text-slate-200 md:text-base">
              Institut Teknologi Sepuluh Nopember (ITS)
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Bachelor of Informatics Engineering
            </p>
            <p className="font-pixel mt-4 text-[11px] tracking-wide text-muted">
              GPA 3.32 · TOEFL ITP 540 · Class of 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
