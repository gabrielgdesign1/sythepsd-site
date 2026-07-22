import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/animations";

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out", clearProps: "transform,opacity" },
      });
      tl.from(".hero-word", { yPercent: 120, opacity: 0, duration: 1.1, stagger: 0.09 }, 0.2)
        .from(".hero-sub", { y: 24, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
        .from(".hero-badge", { scale: 0.8, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, "-=0.3");

      gsap.to(".hero-title", {
        yPercent: -20,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-badges", {
        yPercent: -70,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-24"
    >
      {/* Subtle legibility scrim — keeps the blob glowing through */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[70vh] w-[92vw] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(closest-side, rgba(5,3,16,0.42), rgba(5,3,16,0.14) 55%, transparent 78%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[46vh] bg-gradient-to-t from-ink-900 via-ink-900/80 to-transparent" />
      </div>

      <div className="container-x relative z-10">
        <div className="hero-badges pointer-events-none absolute inset-x-0 -top-4 hidden justify-between md:flex">
          <div className="hero-badge glass pointer-events-auto ml-2 rounded-2xl px-4 py-3">
            <p className="text-2xl font-bold font-display">4+</p>
            <p className="text-xs text-haze">Years of experience</p>
          </div>
          <div className="hero-badge glass pointer-events-auto mr-2 mt-10 rounded-2xl px-4 py-3 animate-floaty">
            <p className="text-2xl font-bold font-display">21</p>
            <p className="text-xs text-haze">Creators worked with</p>
          </div>
        </div>

        <div className="hero-title text-center">
          <p className="hero-sub mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.25em] text-haze">
            Graphic Designer · Romania
          </p>

          <h1 className="font-display font-extrabold leading-[0.82] tracking-tightest">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block text-[19vw] text-gradient md:text-[15vw]">
                Sythe
              </span>
            </span>
          </h1>

          <div className="hero-sub mx-auto mt-7 max-w-xl">
            <p
              className="rounded-2xl px-5 py-3 text-lg text-white md:text-xl"
              style={{
                background: "rgba(8,5,20,0.55)",
                backdropFilter: "blur(6px)",
                boxShadow: "0 8px 40px -12px rgba(0,0,0,0.8)",
              }}
            >
              Thumbnails, banners and 3D graphics that make people stop scrolling — built for
              Fortnite creators and beyond.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href="#work" className="hero-cta btn-primary">
              View my work
            </a>
            <a href="#contact" className="hero-cta btn-ghost">
              Start a project
            </a>
          </div>
        </div>
      </div>

      <a
        href="#work"
        className="hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-haze"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-magenta-glow" />
        </span>
      </a>
    </section>
  );
}
