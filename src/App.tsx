import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { Residences } from "./components/Residences";
import { Amenities } from "./components/Amenities";
import { Videos } from "./components/Videos";
import { Progress } from "./components/Progress";
import { Location } from "./components/Location";
import { WhatsAppCta } from "./components/WhatsAppCta";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Overview />
        <Residences />
        <Amenities />
        <Videos />
        <Progress />
        <Location />
        <WhatsAppCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
