import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, WHATSAPP } from "../data";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`nav${scrolled || open ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="nav-brand" onClick={close}>
            Fortune Waterfront
            <span>Sri Sreenivasa Infra</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="nav-cta"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>

          <button
            type="button"
            className={`nav-toggle${open ? " open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={close}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.05, duration: 0.4 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              className="mobile-cta"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              onClick={close}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Chat on WhatsApp
            </motion.a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
