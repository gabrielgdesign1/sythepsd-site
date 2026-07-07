import { clients } from "../data";

const marqueeItems = [
  "Fortnite Thumbnails",
  "IRL Content",
  "3D Design",
  "Channel Branding",
  "Banners & Headers",
  "Profile Pictures",
  "Posters",
  "Revamps",
];

export default function Clients() {
  return (
    <section id="clients" className="relative py-24 md:py-32">
      {/* Marquee band */}
      <div className="relative flex select-none overflow-hidden border-y border-white/10 py-6">
        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10">
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl font-semibold text-white/70 md:text-3xl">{t}</span>
              <span className="h-2 w-2 rounded-full bg-magenta-core" />
            </span>
          ))}
        </div>
        <div className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10" aria-hidden>
          {[...marqueeItems, ...marqueeItems].map((t, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl font-semibold text-white/70 md:text-3xl">{t}</span>
              <span className="h-2 w-2 rounded-full bg-magenta-core" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-x mt-20">
        <div className="mb-12 max-w-2xl" data-reveal>
          <h2 className="font-display text-4xl font-bold tracking-tightest md:text-6xl">
            Trusted by <span className="text-gradient">creators</span>
          </h2>
          <p className="mt-4 text-lg text-haze">
            Working alongside some of the biggest names in Fortnite and IRL content.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {clients.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              data-reveal
              className="group relative overflow-hidden rounded-3xl glass p-8 transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-core/20 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-40" />
              <div className="flex items-center justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-core to-magenta-core font-display text-2xl font-bold">
                  {c.name.slice(0, 2)}
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-haze opacity-0 transition-opacity group-hover:opacity-100">
                  Visit →
                </span>
              </div>
              <div className="mt-8">
                <p className="font-display text-2xl font-bold">{c.name}</p>
                <p className="text-sm text-haze">{c.handle}</p>
              </div>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-gradient">{c.subs}</span>
                <span className="text-sm text-haze">subscribers</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
