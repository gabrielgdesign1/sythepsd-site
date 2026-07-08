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

const AUTO_MS = 2600;

// Split clients across two counter-rotating rings.
const outer = clients.filter((_, i) => i % 2 === 0);
const inner = clients.filter((_, i) => i % 2 === 1);

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

  const Ring = ({
    items,
    radius,
    reverse,
    size,
  }: {
    items: typeof clients;
    radius: number;
    reverse?: boolean;
    size: string;
  }) => (
    <div className={`absolute inset-0 ${reverse ? "animate-orbit-reverse" : "animate-orbit"}`}>
      {items.map((c, i) => {
        const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * radius;
        const y = 50 + Math.sin(angle) * radius;
        const globalIndex = clients.indexOf(c);
        const isActive = globalIndex === active;
        return (
          <button
            key={c.name}
            onClick={() => setActive(globalIndex)}
            aria-label={c.name}
            title={c.name}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className={`block ${reverse ? "animate-orbit" : "animate-orbit-reverse"}`}>
              <span
                className={`block overflow-hidden rounded-full transition-all duration-500 ${size} ${
                  isActive
                    ? "scale-125 ring-2 ring-magenta-glow"
                    : "opacity-55 ring-1 ring-white/15 hover:opacity-100"
                }`}
              >
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover" />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="clients" className="relative py-24 md:py-32">
      {/* Marquee band */}
      <div className="relative flex select-none overflow-hidden border-y border-white/10 bg-ink-900/40 py-6 backdrop-blur-sm">
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

      <div className="container-x mt-20 grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy + featured */}
        <div>
          <h2 className="reveal-heading font-display text-4xl font-bold tracking-tightest md:text-6xl" data-reveal>
            Trusted by <span className="text-gradient">creators</span>
          </h2>
          <p className="mt-4 max-w-md text-lg text-haze" data-reveal>
            21 creators and counting — from rising channels to multi-million subscriber names across
            Fortnite and IRL content.
          </p>

          <div className="mt-10 min-h-[150px]" data-reveal>
            <div key={current.name} className="client-detail">
              <div className="flex items-center gap-4">
                <span className="h-16 w-16 overflow-hidden rounded-2xl ring-1 ring-white/20">
                  <img src={current.img} alt={current.name} className="h-full w-full object-cover" />
                </span>
                <div>
                  <p className="font-display text-3xl font-bold md:text-4xl">{current.name}</p>
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-magenta-glow transition-colors hover:text-white"
                  >
                    {current.handle} ↗
                  </a>
                </div>
              </div>
              <p className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-bold text-gradient">{current.subs}</span>
                <span className="text-haze">subscribers</span>
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/10">
              <span
                key={active + (paused ? "p" : "")}
                className={`block h-full rounded-full bg-gradient-to-r from-violet-core to-magenta-core ${
                  paused ? "" : "client-progress"
                }`}
                style={paused ? { width: "100%" } : undefined}
              />
            </div>
            <span className="font-display text-sm text-haze">
              {String(active + 1).padStart(2, "0")} / {clients.length}
            </span>
          </div>
        </div>

        {/* Right: rotating constellation */}
        <div
          className="relative mx-auto aspect-square w-full max-w-[460px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/5" />
          <div className="pointer-events-none absolute inset-[26%] rounded-full border border-dashed border-violet-glow/15" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-core/25 blur-[70px]" />

          {/* Center featured */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <a
              href={current.url}
              target="_blank"
              rel="noreferrer"
              key={current.img}
              className="client-center relative block h-28 w-28 md:h-36 md:w-36"
            >
              <span className="absolute -inset-3 rounded-full bg-gradient-to-br from-violet-core to-magenta-core opacity-70 blur-md" />
              <img
                src={current.img}
                alt={current.name}
                className="relative h-full w-full rounded-full object-cover ring-2 ring-white/30"
              />
            </a>
          </div>

          <Ring items={outer} radius={46} size="h-11 w-11 md:h-14 md:w-14" />
          <Ring items={inner} radius={30} reverse size="h-10 w-10 md:h-12 md:w-12" />
        </div>
      </div>
    </section>
  );
}
