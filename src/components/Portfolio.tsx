import { useEffect, useRef, useState } from "react";
import { works, BEHANCE_URL, type Work } from "../data";
import { gsap, ScrollTrigger } from "../lib/animations";

export default function Portfolio() {
  const [active, setActive] = useState<Work | null>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", !!active);
  }, [active]);

  // Reveal + subtle parallax on the tiles
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !grid.current) return;
    const ctx = gsap.context(() => {
      const tiles = gsap.utils.toArray<HTMLElement>(".work-tile");
      tiles.forEach((tile) => {
        gsap.from(tile, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: tile, start: "top 92%" },
        });
        const img = tile.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: tile, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        }
      });
    }, grid);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="max-w-2xl" data-reveal>
          <h2 className="reveal-heading font-display text-4xl font-bold tracking-tightest md:text-6xl">
            Selected <span className="text-gradient">work</span>
          </h2>
          <p className="mt-4 text-lg text-haze">
            A showcase of thumbnails built to win the click — across Fortnite and IRL content.
          </p>
        </div>

        <div
          ref={grid}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {works.map((w, i) => (
            <button
              key={w.src}
              onClick={() => setActive(w)}
              className={`work-tile group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-700 text-left ${
                i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={w.src}
                  alt={w.title}
                  loading="lazy"
                  className="h-[116%] w-full -translate-y-[8%] object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/90 via-transparent to-transparent opacity-70" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <span className="font-display text-lg font-semibold">{w.title}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
                  ↗
                </span>
              </div>
              <span className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest text-white/80">
                {w.category === "gaming" ? "Fortnite" : "IRL"}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-14 flex justify-center" data-reveal>
          <a href={BEHANCE_URL} target="_blank" rel="noreferrer" className="btn-primary group !px-9 !py-4">
            View whole portfolio
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/85 p-6 backdrop-blur-md"
          onClick={() => setActive(null)}
        >
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.src}
              alt={active.title}
              className="w-full rounded-2xl border border-white/15 shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between">
              <p className="font-display text-xl font-semibold">{active.title}</p>
              <button
                onClick={() => setActive(null)}
                className="rounded-full glass px-5 py-2 text-sm text-haze transition-colors hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
