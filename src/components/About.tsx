const stats = [
  { k: "4+", v: "Years designing" },
  { k: "3", v: "Content niches" },
  { k: "12M+", v: "Audience reach" },
  { k: "∞", v: "Revisions until right" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-md" data-reveal>
          <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-core/40 to-magenta-core/30 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/15">
            <img src="/portrait.webp" alt="Sythe" className="w-full" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
          </div>
          <div className="glass absolute -bottom-5 -right-3 rounded-2xl px-5 py-4 md:-right-8">
            <p className="font-display text-lg font-bold">Sythe</p>
            <p className="text-xs text-haze">Graphic Designer · Romania</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tightest md:text-6xl" data-reveal>
            About <span className="text-gradient">me</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-haze md:text-xl" data-reveal>
            A passionate graphic designer from Romania with over 4 years of experience bringing
            ideas to life. I specialize in creating eye-catching thumbnails, banners, posters, and
            more. I'm here to create designs that fit your needs and help you stand out.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4" data-reveal>
            {stats.map((s) => (
              <div key={s.v} className="rounded-2xl glass p-5">
                <p className="font-display text-3xl font-bold text-gradient">{s.k}</p>
                <p className="mt-1 text-sm text-haze">{s.v}</p>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-primary mt-10" data-reveal>
            Work with me
          </a>
        </div>
      </div>
    </section>
  );
}
