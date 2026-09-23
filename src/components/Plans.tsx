import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { PLANS } from "../data";

export function Plans() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <section className="section plans" id="plans" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
        >
          Plans
        </motion.p>
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          Master plan & floor plans
        </motion.h2>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.14, duration: 0.7 }}
        >
          Tap Download — we&apos;ll send the plan on WhatsApp.
        </motion.p>

        <div className="plans-grid">
          {PLANS.map((plan, i) => (
            <motion.a
              key={plan.title}
              className="plan-card"
              href={plan.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Download ${plan.title} via WhatsApp`}
              initial={reduce ? false : { opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                delay: 0.18 + i * 0.08,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="plan-media">
                <img src={plan.image} alt={plan.title} loading="lazy" />
              </div>
              <div className="plan-meta">
                <h3>{plan.title}</h3>
                <p>{plan.line}</p>
                <span className="plan-cta">Download →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
