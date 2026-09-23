import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { MAP, PROXIMITY, WHATSAPP } from "../data";

export function Location() {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [24, -24],
  );
  const mapScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [1.02, 1, 1.02],
  );

  return (
    <section className="section location" id="location" ref={ref}>
      <div className="container location-intro">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
        >
          Location
        </motion.p>
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          City pulse. Lake calm.
        </motion.h2>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.14, duration: 0.7 }}
        >
          Kukatpally — opposite IDL Lake.
        </motion.p>
      </div>

      <motion.div
        className="location-stage"
        ref={stageRef}
        initial={reduce ? false : { opacity: 0, y: 48 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="location-map-shell">
          <motion.div
            className="location-map-glow"
            aria-hidden
            animate={
              reduce
                ? undefined
                : {
                    opacity: [0.35, 0.7, 0.35],
                    scale: [1, 1.08, 1],
                  }
            }
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="location-map-embed"
            initial={
              reduce
                ? false
                : { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0.4 }
            }
            animate={
              inView
                ? {
                    clipPath: "polygon(0 4%, 100% 0, 100% 96%, 0 100%)",
                    opacity: 1,
                  }
                : undefined
            }
            transition={{ duration: 1.15, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="location-map-parallax"
              style={{ y: mapY, scale: mapScale }}
            >
              <iframe
                title="Fortune Waterfront on Google Maps"
                src={MAP.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>

            <motion.div
              className="location-map-veil"
              aria-hidden
              initial={reduce ? false : { opacity: 0.55 }}
              animate={inView ? { opacity: 0 } : undefined}
              transition={{ duration: 1.4, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="location-pin" aria-hidden>
              <motion.span
                className="location-pin-pulse"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                className="location-pin-pulse location-pin-pulse--delayed"
                animate={
                  reduce
                    ? undefined
                    : { scale: [1, 2.4, 1], opacity: [0.4, 0, 0.4] }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.7,
                }}
              />
              <motion.span
                className="location-pin-dot"
                initial={reduce ? false : { scale: 0, y: -24 }}
                animate={inView ? { scale: 1, y: 0 } : undefined}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 18,
                  delay: 0.85,
                }}
              />
            </div>
          </motion.div>

          <motion.aside
            className="location-float"
            initial={reduce ? false : { opacity: 0, x: -36, y: 24 }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.p
              className="location-float-kicker"
              initial={reduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ delay: 0.7 }}
            >
              Find us
            </motion.p>
            <motion.h3
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.78, duration: 0.55 }}
            >
              {MAP.label}
            </motion.h3>
            <ul className="location-float-list">
              {PROXIMITY.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={reduce ? false : { opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    delay: 0.88 + i * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <strong>{p.title}</strong>
                  <span>{p.detail}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="location-actions"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <a
                className="btn-primary"
                href={MAP.directionsUrl}
                target="_blank"
                rel="noreferrer"
              >
                Get directions
              </a>
              <a
                className="btn-ghost-on-dark"
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
              >
                Ask on WhatsApp
              </a>
            </motion.div>
            <motion.a
              className="map-open-link"
              href={MAP.openUrl}
              target="_blank"
              rel="noreferrer"
              initial={reduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : undefined}
              transition={{ delay: 1.35 }}
            >
              Open in Google Maps →
            </motion.a>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  );
}
