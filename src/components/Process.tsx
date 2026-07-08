import { process } from "../data";

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl" data-reveal>
          <h2 className="reveal-heading font-display text-4xl font-bold tracking-tightest md:text-6xl">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="mt-4 text-lg text-haze">
            A simple, professional process from first message to final delivery.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div
              key={p.title}
              data-reveal
              className="group relative overflow-hidden rounded-3xl glass p-7 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <span className="font-display text-6xl font-bold text-white/10 transition-colors group-hover:text-magenta-core/30">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-haze">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
