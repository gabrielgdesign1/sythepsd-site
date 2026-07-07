import { services } from "../data";

export default function Services() {
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl" data-reveal>
          <h2 className="font-display text-4xl font-bold tracking-tightest md:text-6xl">
            Services &amp; <span className="text-gradient">prices</span>
          </h2>
          <p className="mt-4 text-lg text-haze">
            A quick rundown of what I offer. Prices vary with complexity, revisions and specific
            requirements — custom requests and package deals are always welcome.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((s, idx) => (
            <div
              key={s.group}
              data-reveal
              className={`relative flex flex-col overflow-hidden rounded-3xl glass p-8 ${
                idx === 0 ? "lg:row-span-1 ring-1 ring-magenta-core/30" : ""
              }`}
            >
              {idx === 0 && (
                <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-violet-core to-magenta-core px-3 py-1 text-[11px] font-medium uppercase tracking-widest">
                  Most requested
                </span>
              )}
              <h3 className="font-display text-2xl font-bold">{s.group}</h3>
              <div className="mt-6 flex-1 divide-y divide-white/10">
                {s.items.map((it) => (
                  <div key={it.name} className="flex items-center justify-between py-3.5">
                    <span className="text-haze">{it.name}</span>
                    <span className="font-display text-lg font-semibold text-white">{it.price}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-magenta-glow transition-colors hover:text-white"
              >
                Request this <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-haze" data-reveal>
          Note: payment is required upfront before work begins. Secure payment methods only.
        </p>
      </div>
    </section>
  );
}
