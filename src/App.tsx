import { lazy, Suspense, useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Three.js is the heaviest dependency in the app. Split it into its own chunk
// so first paint (hero + aurora backdrop) isn't blocked on the WebGL bundle.
const LiquidScene = lazy(() => import("./three/LiquidScene"));
import {
  initReveals,
  initSmoothScroll,
  initMagnetic,
  initScrollProgress,
} from "./lib/animations";

export default function App() {
  // Delay requesting the WebGL chunk by a tick so it doesn't compete with
  // fonts/CSS/hero content for bandwidth on a cold, high-latency connection.
  const [showScene, setShowScene] = useState(false);
  useEffect(() => {
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setShowScene(true));
    return () => cancel(id as number);
  }, []);

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

      {/* Animated aurora backdrop */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
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

      {/* Fixed 3D scene — blob weaves across the page as you scroll */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.78]">
        {showScene && (
          <Suspense fallback={null}>
            <LiquidScene />
          </Suspense>
        )}
      </div>

      {/* Content sits above the 3D layer */}
      <div className="relative z-10">
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
    </div>
  );
}
