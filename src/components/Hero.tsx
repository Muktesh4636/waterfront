import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { IMAGES } from "../data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 40]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.01, 1.06],
  );

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-media" aria-hidden>
        <motion.div className="hero-media-inner" style={{ y, scale }}>
          <img
            className="hero-img hero-img-desktop"
            src={IMAGES.hero}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
          <img
            className="hero-img hero-img-mobile"
            src={IMAGES.heroMobile}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
      </div>
      <div className="hero-overlay" />
      <div className="hero-veil" aria-hidden />

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
          <span className="hero-brand-fortune">Fortune</span>
          <span className="hero-brand-water">
            Waterfront
            <svg
              className="hero-brand-wave"
              viewBox="0 0 120 14"
              aria-hidden
            >
              <path
                d="M2 8c12-8 22-8 34 0s22 8 34 0 22-8 34 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
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
