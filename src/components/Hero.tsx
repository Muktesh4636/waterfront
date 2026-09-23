import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { IMAGES, WHATSAPP } from "../data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.02, 1.1],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.4]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-media" aria-hidden>
        <motion.img
          src={IMAGES.hero}
          alt=""
          style={{ y, scale }}
          initial={reduce ? false : { scale: 1.06, opacity: 0 }}
          animate={{ scale: 1.02, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="hero-overlay" />

      <svg
        className="hero-waves"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          fill="rgba(126,184,201,0.35)"
          animate={
            reduce
              ? undefined
              : {
                  d: [
                    "M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z",
                    "M0,70 C240,30 480,90 720,50 C960,20 1200,90 1440,55 L1440,120 L0,120 Z",
                    "M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z",
                  ],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,80 C320,40 560,110 800,70 C1040,30 1280,90 1440,65 L1440,120 L0,120 Z"
          fill="rgba(11,31,42,0.55)"
          animate={
            reduce
              ? undefined
              : {
                  d: [
                    "M0,80 C320,40 560,110 800,70 C1040,30 1280,90 1440,65 L1440,120 L0,120 Z",
                    "M0,75 C320,100 560,40 800,80 C1040,110 1280,50 1440,70 L1440,120 L0,120 Z",
                    "M0,80 C320,40 560,110 800,70 C1040,30 1280,90 1440,65 L1440,120 L0,120 Z",
                  ],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <motion.div className="hero-content" style={{ opacity }}>
        <motion.p
          className="hero-eyebrow"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Sri Sreenivasa Infra
        </motion.p>

        <motion.h1
          className="hero-brand"
          initial={reduce ? false : { opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          Fortune
          <em>Waterfront</em>
        </motion.h1>

        <motion.p
          className="hero-lead"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Where the lake meets home.
        </motion.p>

        <motion.div
          className="hero-actions"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            className="btn-primary"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
          <a href="#videos" className="btn-ghost">
            Watch walkthrough
          </a>
        </motion.div>
      </motion.div>

      <div className="hero-scroll" aria-hidden>
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
