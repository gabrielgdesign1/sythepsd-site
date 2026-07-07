import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return () => {};

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Anchor links -> lenis scroll
  const onClick = (e: MouseEvent) => {
    const target = (e.target as HTMLElement)?.closest("a[href^='#']");
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href || href === "#") return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
    }
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    lenis.destroy();
  };
}

export function initReveals() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");

  if (reduced) {
    items.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
    return;
  }

  ScrollTrigger.batch("[data-reveal]", {
    start: "top 88%",
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        overwrite: true,
      }),
  });

  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };
