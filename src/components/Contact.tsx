const channels = [
  {
    label: 'Email',
    value: 'mrizkywidodo@gmail.com',
    href: 'mailto:mrizkywidodo@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammad-rizky-widodo',
    href: 'https://linkedin.com/in/muhammad-rizky-widodo',
  },
]

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
        Contact
      </h2>
      <p className="mt-2 max-w-xl text-neutral-500 dark:text-neutral-400">
        Lagi job hunting dan terbuka untuk peluang full-stack / product
        engineering. Jangan ragu buat reach out.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.label === 'LinkedIn' ? '_blank' : undefined}
            rel={channel.label === 'LinkedIn' ? 'noreferrer' : undefined}
            className="flex-1 rounded-2xl border border-neutral-200 p-6 transition-colors hover:border-accent hover:bg-accent/5 dark:border-neutral-800 dark:hover:border-accent-dark dark:hover:bg-accent-dark/10"
          >
            <span className="text-xs font-medium tracking-wide text-neutral-400 uppercase dark:text-neutral-500">
              {channel.label}
            </span>
            <p className="mt-2 text-lg font-medium text-neutral-900 dark:text-white">
              {channel.value}
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact
