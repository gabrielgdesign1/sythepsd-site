import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Services from "./components/Services";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { initReveals, initSmoothScroll } from "./lib/animations";

export default function App() {
  useEffect(() => {
    const cleanup = initSmoothScroll();
    const id = window.setTimeout(initReveals, 60);
    return () => {
      cleanup();
      window.clearTimeout(id);
    };
  }, []);

  return (
    <div className="relative">
      <div className="grain" />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[20%] h-[50vh] w-[50vh] rounded-full bg-violet-deep/10 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] h-[55vh] w-[55vh] rounded-full bg-magenta-core/10 blur-[150px]" />
      </div>

      <Nav />
      <main>
        <Hero />
        <Clients />
        <Portfolio />
        <About />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
