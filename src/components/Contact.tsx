import { socials } from "../data";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-ink-800 p-8 md:p-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-violet-core/30 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-magenta-core/25 blur-[110px]" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-bold leading-[0.95] tracking-tightest md:text-6xl" data-reveal>
                Let's build something that <span className="text-gradient">stands out</span>
              </h2>
              <p className="mt-6 max-w-md text-lg text-haze" data-reveal>
                To place an order, reach out through any platform. Expect a quick response — usually
                within minutes — professional communication, and multiple revision rounds until it's
                perfect.
              </p>
              <a href="mailto:schullerdani70@gmail.com" className="btn-primary mt-8" data-reveal>
                Email me directly
              </a>
            </div>

            <div className="grid gap-3 sm:grid-cols-2" data-reveal>
              {socials.map((s) => {
                const isLink = s.url !== "#";
                const Tag = isLink ? "a" : "div";
                return (
                  <Tag
                    key={s.label}
                    {...(isLink ? { href: s.url, target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex flex-col justify-between rounded-2xl glass p-5 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="text-xs uppercase tracking-[0.2em] text-haze">{s.label}</span>
                    <span className="mt-6 flex items-center justify-between">
                      <span className="font-display text-lg font-semibold text-white">{s.handle}</span>
                      {isLink && (
                        <span className="text-magenta-glow opacity-0 transition-opacity group-hover:opacity-100">
                          ↗
                        </span>
                      )}
                    </span>
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
