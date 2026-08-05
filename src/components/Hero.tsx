import HeroBackground from './HeroBackground'

const facts = [
  { label: 'Location', value: 'Greater Jakarta Area, Indonesia' },
  { label: 'Education', value: 'ITS — Informatics Engineering, GPA 3.32' },
  { label: 'Status', value: 'Open to work' },
]

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      <HeroBackground />

      <div className="mx-auto max-w-5xl">
        <p className="animate-fade-up text-sm font-medium tracking-wide text-accent uppercase dark:text-accent-dark">
          Informatics Engineering Graduate — ITS 2025
        </p>
        <h1 className="animate-fade-up mt-4 text-5xl font-semibold tracking-tight text-neutral-900 [animation-delay:0.1s] md:text-7xl dark:text-white">
          Muhammad Rizky
          <br />
          Widodo
        </h1>
        <p className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed [animation-delay:0.2s]">
          Fresh grad dengan 1 tahun pengalaman hands-on bikin & ship internal
          web app. Terbiasa identifikasi pain point operasional dan deliver
          solusi full-stack sendiri, dari requirements gathering & PRD writing
          sampai deployment — lintas sektor transportasi dan financial
          services.
        </p>

        <div className="animate-fade-up mt-8 flex flex-wrap gap-4 [animation-delay:0.3s]">
          <a
            href="#projects"
            className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent dark:bg-white dark:text-neutral-900 dark:hover:bg-accent-dark"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900 transition-colors hover:border-accent hover:text-accent dark:border-neutral-700 dark:text-white dark:hover:border-accent-dark dark:hover:text-accent-dark"
          >
            Get in Touch
          </a>
        </div>

        <dl className="animate-fade-up mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-neutral-200 pt-8 [animation-delay:0.4s] sm:grid-cols-3 dark:border-neutral-800">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
                {fact.label}
              </dt>
              <dd className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default Hero
