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

  // Heading reveal — headline rises with a subtle 3D tilt
  gsap.utils.toArray<HTMLElement>(".reveal-heading").forEach((h) => {
    gsap.from(h, {
      y: 40,
      rotateX: -35,
      transformPerspective: 700,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: { trigger: h, start: "top 92%" },
    });
  });

  ScrollTrigger.refresh();
}

/** Magnetic hover on primary buttons — they lean toward the cursor. */
export function initMagnetic() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || window.matchMedia("(pointer: coarse)").matches) return () => {};

  const buttons = Array.from(document.querySelectorAll<HTMLElement>(".btn-primary"));
  const cleanups: Array<() => void> = [];

  buttons.forEach((btn) => {
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, { x: x * 0.3, y: y * 0.4, duration: 0.5, ease: "power3.out" });
    };
    const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

/** Thin top progress bar reflecting page scroll. */
export function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>(".scroll-progress");
  if (!bar) return;
  gsap.to(bar, {
    scaleX: 1,
    ease: "none",
    scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
  });
}

export { gsap, ScrollTrigger };
