import { nav } from "../data";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 py-12">
      <div className="container-x flex flex-col items-center justify-between gap-8 md:flex-row">
        <a href="#home" className="flex items-center gap-3">
          <span className="h-9 w-9 overflow-hidden rounded-full ring-1 ring-violet-glow/50">
            <img src="/logo.webp" alt="Sythe logo" className="h-full w-full object-cover" />
          </span>
          <span className="font-display text-lg font-bold tracking-tightest">Sythe</span>
        </a>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-haze transition-colors hover:text-white">
              {n.label}
            </a>
          ))}
        </nav>

        <p className="text-sm text-haze">
          © {new Date().getFullYear()} Sythe — Graphic Designer
        </p>
      </div>
    </footer>
  );
}
