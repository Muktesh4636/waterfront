import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { GALLERY, LIFESTYLE } from "../data";

export function Residences() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="section residences" id="lifestyle" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          Lifestyle
        </motion.p>
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          A home that feels like a retreat
        </motion.h2>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          Light-filled. Lake-kissed. Made for everyday celebration.
        </motion.p>

        <div className="lifestyle-grid">
          {LIFESTYLE.map((item, i) => (
            <motion.article
              key={item.title}
              className="lifestyle-card"
              initial={reduce ? false : { opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="lifestyle-media">
                <img src={item.image} alt={item.title} loading="lazy" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.line}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="container-wide">
        <div className="gallery-strip" tabIndex={0} aria-label="Project gallery">
          {GALLERY.map((item, i) => (
            <motion.figure
              key={item.src}
              className="gallery-item"
              initial={reduce ? false : { opacity: 0, x: 48 }}
              animate={inView ? { opacity: 1, x: 0 } : undefined}
              transition={{
                duration: 0.75,
                delay: 0.35 + i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img src={item.src} alt="" loading="lazy" />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
