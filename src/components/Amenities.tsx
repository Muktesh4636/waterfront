import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { AMENITIES, IMAGES } from "../data";

export function Amenities() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  return (
    <section className="section amenities" id="amenities" ref={ref}>
      <div className="container">
        <div className="amenities-intro">
          <div>
            <motion.p
              className="section-label"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
            >
              Amenities
            </motion.p>
            <motion.h2
              className="section-title"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.08, duration: 0.7 }}
            >
              Spaces that invite you to linger
            </motion.h2>
          </div>
          <motion.p
            className="section-copy tagline-only"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.15, duration: 0.7 }}
          >
            Poolside evenings. Quiet gardens. Play without leaving home.
          </motion.p>
        </div>

        <div className="amenity-showcase">
          <ul className="amenity-list">
            {AMENITIES.map((a, i) => (
              <motion.li
                key={a.name}
                className={`amenity-row${active === i ? " is-active" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                initial={reduce ? false : { opacity: 0, x: -28 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span className="amenity-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="amenity-name">{a.name}</span>
              </motion.li>
            ))}
          </ul>

          <div className="amenity-preview" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.img
                key={AMENITIES[active].image}
                src={AMENITIES[active].image}
                alt=""
                initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          className="vista-block"
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <h3>VISTA — life above the street</h3>
            <p className="tagline-only">
              A vehicle-free podium. Soft lawns. Room to breathe.
            </p>
          </div>
          <div className="vista-image">
            <img
              src={IMAGES.grand}
              alt="Fortune Waterfront landscaped podium"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
