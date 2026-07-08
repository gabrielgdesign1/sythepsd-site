import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import {
  initReveals,
  initSmoothScroll,
  initMagnetic,
  initScrollProgress,
} from "./lib/animations";

export default function App() {
  useEffect(() => {
    const cleanupScroll = initSmoothScroll();
    let cleanupMagnetic = () => {};
    const id = window.setTimeout(() => {
      initReveals();
      initScrollProgress();
      cleanupMagnetic = initMagnetic();
    }, 80);
    return () => {
      cleanupScroll();
      cleanupMagnetic();
      window.clearTimeout(id);
    };
  }, []);

  return (
    <div className="relative">
      <div className="scroll-progress" />
      <div className="grain" />

      {/* Global animated aurora backdrop */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="aurora-blob animate-aurora left-[-8%] top-[8%] h-[46vh] w-[46vh] bg-violet-deep/25" />
        <div
          className="aurora-blob animate-aurora bottom-[6%] right-[-8%] h-[52vh] w-[52vh] bg-magenta-core/20"
          style={{ animationDelay: "-9s" }}
        />
        <div
          className="aurora-blob animate-aurora left-1/2 top-1/2 h-[40vh] w-[40vh] bg-violet-core/15"
          style={{ animationDelay: "-16s" }}
        />
      </div>

      <Nav />
      <main>
        <Hero />
        <Clients />
        <Portfolio />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
