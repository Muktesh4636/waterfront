import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { MAP, PROXIMITY, WHATSAPP } from "../data";

export function Location() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

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
        initial={reduce ? false : { opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="location-map-shell">
          <div className="location-map-glow" aria-hidden />
          <div className="location-map-embed">
            <iframe
              title="Fortune Waterfront on Google Maps"
              src={MAP.embedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <aside className="location-float">
            <p className="location-float-kicker">Find us</p>
            <h3>{MAP.label}</h3>
            <ul className="location-float-list">
              {PROXIMITY.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.detail}</span>
                </li>
              ))}
            </ul>
            <div className="location-actions">
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
            </div>
            <a
              className="map-open-link"
              href={MAP.openUrl}
              target="_blank"
              rel="noreferrer"
            >
              Open in Google Maps →
            </a>
          </aside>
        </div>
      </motion.div>
    </section>
  );
}
