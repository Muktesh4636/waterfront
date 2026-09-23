import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";
import { IMAGES } from "../data";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden>
        <img
          className="hero-img"
          src={IMAGES.hero}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero-overlay" aria-hidden />

      <div className="hero-content">
        <motion.p
          className="hero-kicker"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Opposite IDL Lake · Kukatpally
        </motion.p>

        <motion.h1
          className="hero-brand"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            className="hero-brand-logo"
            src="/images/brand/fortune-waterfront-logo.png"
            alt="Fortune Waterfront"
            width={560}
            height={276}
            decoding="async"
            fetchPriority="high"
          />
        </motion.h1>

        <motion.p
          className="hero-lead"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Luxury living on the water&apos;s edge
        </motion.p>
      </div>
    </section>
  );
}
