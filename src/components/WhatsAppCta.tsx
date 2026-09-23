import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { WHATSAPP } from "../data";

export function WhatsAppCta() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="section enquire" id="enquire" ref={ref}>
      <div className="container enquire-inner enquire-whatsapp">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Say hello</p>
          <h2 className="section-title">Everything happens on WhatsApp</h2>
          <p className="section-copy tagline-only">
            Visits, plans, questions — one chat away.
          </p>
        </motion.div>

        <motion.div
          className="wa-cta-panel"
          initial={reduce ? false : { opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, delay: 0.12 }}
        >
          <a
            className="btn-whatsapp"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden>
              <path
                fill="currentColor"
                d="M16.01 3C9.39 3 4 8.29 4 14.8c0 2.08.56 4.1 1.62 5.9L4 29l8.55-1.57c1.72.93 3.66 1.42 5.63 1.42h.01C24.82 28.85 30 23.56 30 17.05 30 10.54 24.63 3 16.01 3zm7.4 17.58c-.31.87-1.8 1.6-2.5 1.7-.64.09-1.45.13-2.34-.15-.54-.16-1.23-.4-2.12-.78-3.73-1.61-6.16-5.36-6.35-5.61-.18-.25-1.52-2.02-1.52-3.85s.96-2.73 1.3-3.1c.34-.37.74-.46 1-.46h.72c.23 0 .53-.1.83.63.31.75 1.05 2.57 1.14 2.76.09.19.15.41.03.66-.12.25-.18.41-.36.63-.18.22-.38.49-.54.66-.18.19-.36.39-.16.76.21.37.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.9 1.78.37.19.58.16.8-.09.21-.25.93-1.09 1.18-1.46.25-.37.5-.31.84-.19.34.12 2.17 1.02 2.54 1.21.37.19.62.28.71.43.09.16.09.91-.22 1.78z"
              />
            </svg>
            Chat on WhatsApp
          </a>
          <a href="tel:+918790009000" className="wa-cta-phone">
            +91 87 9000 9000
          </a>
          <p className="form-note">TS RERA NO: P02200009419</p>
        </motion.div>
      </div>
    </section>
  );
}
