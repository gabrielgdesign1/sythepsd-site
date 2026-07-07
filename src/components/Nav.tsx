import { useEffect, useState } from "react";
import { nav } from "../data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-20px_rgba(233,53,193,0.6)]" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-violet-glow/50">
              <img src="/logo.webp" alt="Sythe logo" className="h-full w-full object-cover" />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-magenta-glow/40" />
            </span>
            <span className="font-display text-lg font-bold tracking-tightest">Sythe</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-haze transition-colors hover:text-white"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="hidden md:inline-flex btn-primary !px-6 !py-2.5 text-sm">
            Start a project
          </a>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full glass md:hidden"
          >
            <div className="space-y-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>

        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-3xl glass p-4 md:hidden">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-haze transition-colors hover:bg-white/5 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Start a project
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
