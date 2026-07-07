import { useEffect, useState } from "react";
import { gamingWorks, irlWorks, type Work } from "../data";

type Tab = "gaming" | "irl";

export default function Portfolio() {
  const [tab, setTab] = useState<Tab>("gaming");
  const [active, setActive] = useState<Work | null>(null);

  const works = tab === "gaming" ? gamingWorks : irlWorks;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", !!active);
  }, [active]);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold tracking-tightest md:text-6xl">
              Selected <span className="text-gradient">work</span>
            </h2>
            <p className="mt-4 text-lg text-haze">
              A showcase of thumbnails built to win the click — split across gaming and IRL content.
            </p>
          </div>

          {/* Tabs */}
          <div className="inline-flex rounded-full glass p-1.5">
            {(["gaming", "irl"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                  tab === t ? "text-white" : "text-haze hover:text-white"
                }`}
              >
                {tab === t && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-core to-magenta-core" />
                )}
                <span className="relative">{t === "gaming" ? "Gaming" : "IRL"}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w, i) => (
            <button
              key={w.src}
              data-reveal
              onClick={() => setActive(w)}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-700 text-left ${
                tab === "gaming" && i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={w.src}
                  alt={w.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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
