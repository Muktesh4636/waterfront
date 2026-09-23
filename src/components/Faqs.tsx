import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { FAQS, whatsappLink } from "../data";

export function Faqs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section faqs" id="faqs" ref={ref}>
      <div className="container faqs-inner">
        <div className="faqs-intro">
          <motion.p
            className="section-label"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
          >
            FAQs
          </motion.p>
          <motion.h2
            className="section-title"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.08, duration: 0.7 }}
          >
            Questions, answered
          </motion.h2>
          <motion.p
            className="section-copy tagline-only"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.14, duration: 0.7 }}
          >
            Still curious? Ask us on WhatsApp.
          </motion.p>
          <motion.a
            className="btn-whatsapp faqs-wa"
            href={whatsappLink(
              "Hi, I have a question about Fortune Waterfront.",
            )}
            target="_blank"
            rel="noreferrer"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Ask on WhatsApp
          </motion.a>
        </div>

        <ul className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                className={`faq-item${isOpen ? " is-open" : ""}`}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ delay: 0.16 + i * 0.05, duration: 0.5 }}
              >
                <button
                  type="button"
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
