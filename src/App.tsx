import { useEffect } from "react";
import Lenis from "lenis";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Overview } from "./components/Overview";
import { Residences } from "./components/Residences";
import { Amenities } from "./components/Amenities";
import { Plans } from "./components/Plans";
import { Videos } from "./components/Videos";
import { Progress } from "./components/Progress";
import { Location } from "./components/Location";
import { Faqs } from "./components/Faqs";
import { WhatsAppCta } from "./components/WhatsAppCta";
import { Footer } from "./components/Footer";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onPlay = () => lenis.stop();
    const onStop = () => lenis.start();
    window.addEventListener("fw:video-play", onPlay);
    window.addEventListener("fw:video-stop", onStop);

    return () => {
      window.removeEventListener("fw:video-play", onPlay);
      window.removeEventListener("fw:video-stop", onStop);
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
        <Plans />
        <Videos />
        <Progress />
        <Location />
        <Faqs />
        <WhatsAppCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default App;
