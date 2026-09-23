import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { PROGRESS } from "../data";

export function Progress() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="section progress" id="progress" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
        >
          Work in progress
        </motion.p>
        <div className="progress-head">
          <motion.h2
            className="section-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Rising by the lake
          </motion.h2>
          <motion.p
            className="progress-date"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            {PROGRESS.label}
          </motion.p>
        </div>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.16, duration: 0.7 }}
        >
          {PROGRESS.tagline}
        </motion.p>

        <div className="progress-grid">
          {PROGRESS.photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              className="progress-item"
              onClick={() => setLightbox(i)}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                delay: 0.18 + i * 0.04,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img src={photo.src} alt={photo.caption} loading="lazy" />
              <span>{photo.caption}</span>
            </motion.button>
          ))}
        </div>

        <p className="progress-source">
          Photos from{" "}
          <a href={PROGRESS.sourceUrl} target="_blank" rel="noreferrer">
            srisreenivasa.com
          </a>
        </p>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Progress photo"
          >
            <button
              type="button"
              className="lightbox-close"
              onClick={() => setLightbox(null)}
              aria-label="Close"
            >
              Close
            </button>
            <motion.img
              key={PROGRESS.photos[lightbox].src}
              src={PROGRESS.photos[lightbox].src}
              alt={PROGRESS.photos[lightbox].caption}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
            />
            <p>{PROGRESS.photos[lightbox].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
