import { useEffect, useRef, useState } from "react";
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

const AUTO_MS = 4200;

export default function Clients() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = window.setTimeout(
      () => setActive((a) => (a + 1) % clients.length),
      AUTO_MS
    );
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [active, paused]);

  const current = clients[active];

  return (
    <section id="clients" className="relative py-24 md:py-32">
      {/* Marquee band */}
      <div className="relative flex select-none overflow-hidden border-y border-white/10 py-6">
        {[0, 1].map((k) => (
          <div
            key={k}
            aria-hidden={k === 1}
            className="flex min-w-full shrink-0 animate-marquee items-center gap-10 whitespace-nowrap pr-10"
          >
            {[...marqueeItems, ...marqueeItems].map((t, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="font-display text-2xl font-semibold text-white/70 md:text-3xl">{t}</span>
                <span className="h-2 w-2 rounded-full bg-magenta-core" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="container-x mt-20 grid items-center gap-16 lg:grid-cols-2">
        {/* Left: copy */}
        <div>
          <h2 className="reveal-heading font-display text-4xl font-bold tracking-tightest md:text-6xl" data-reveal>
            Trusted by <span className="text-gradient">creators</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-haze" data-reveal>
            Working alongside some of the biggest names in Fortnite and IRL content — from rising
            channels to multi-million subscriber creators.
          </p>

          {/* Active client detail */}
          <div className="mt-10 min-h-[132px]" data-reveal>
            <div key={current.name} className="client-detail">
              <span className="inline-flex rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-haze">
                {current.tag}
              </span>
              <div className="mt-4 flex items-end gap-4">
                <p className="font-display text-4xl font-bold md:text-5xl">{current.name}</p>
                <a
                  href={current.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mb-1 text-sm text-magenta-glow transition-colors hover:text-white"
                >
                  {current.handle} ↗
                </a>
              </div>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-gradient">{current.subs}</span>
                <span className="text-haze">subscribers</span>
              </p>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex gap-2">
            {clients.map((c, i) => (
              <button
                key={c.name}
                aria-label={`Show ${c.name}`}
                onClick={() => setActive(i)}
                className="group relative h-1.5 w-10 overflow-hidden rounded-full bg-white/10"
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-core to-magenta-core ${
                    i === active && !paused ? "client-progress" : ""
                  }`}
                  style={{ width: i < active ? "100%" : i === active ? undefined : "0%" }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: orbital carousel */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[440px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* concentric rings */}
          <div className="pointer-events-none absolute inset-0 rounded-full border border-white/5" />
          <div className="pointer-events-none absolute inset-[12%] rounded-full border border-white/5" />
          <div className="pointer-events-none absolute inset-[24%] rounded-full border border-dashed border-violet-glow/15" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-core/20 blur-[70px]" />

          {/* Center featured avatar */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div key={current.img} className="client-center relative h-32 w-32 md:h-40 md:w-40">
              <span className="absolute -inset-3 rounded-full bg-gradient-to-br from-violet-core to-magenta-core opacity-70 blur-md" />
              <img
                src={current.img}
                alt={current.name}
                className="relative h-full w-full rounded-full object-cover ring-2 ring-white/30"
              />
            </div>
          </div>

          {/* Rotating orbit of nodes */}
          <div className="absolute inset-0 animate-orbit">
            {clients.map((c, i) => {
              const angle = (i / clients.length) * Math.PI * 2 - Math.PI / 2;
              const r = 44; // % radius
              const x = 50 + Math.cos(angle) * r;
              const y = 50 + Math.sin(angle) * r;
              const isActive = i === active;
              return (
                <button
                  key={c.name}
                  onClick={() => setActive(i)}
                  aria-label={c.name}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {/* counter-rotate so avatars stay upright */}
                  <span className="block animate-orbit-reverse">
                    <span
                      className={`block overflow-hidden rounded-full transition-all duration-500 ${
                        isActive
                          ? "h-16 w-16 ring-2 ring-magenta-glow md:h-20 md:w-20"
                          : "h-12 w-12 opacity-60 ring-1 ring-white/20 hover:opacity-100 md:h-14 md:w-14"
                      }`}
                    >
                      <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
