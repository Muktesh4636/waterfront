import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WHATSAPP } from "../data";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setVisible(progress >= 0.5);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          className="wa-float"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, y: 72, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 56, scale: 0.9 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="wa-float-pulse" aria-hidden />
          <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
            <path
              fill="currentColor"
              d="M16.01 3C9.39 3 4 8.29 4 14.8c0 2.08.56 4.1 1.62 5.9L4 29l8.55-1.57c1.72.93 3.66 1.42 5.63 1.42h.01C24.82 28.85 30 23.56 30 17.05 30 10.54 24.63 3 16.01 3zm7.4 17.58c-.31.87-1.8 1.6-2.5 1.7-.64.09-1.45.13-2.34-.15-.54-.16-1.23-.4-2.12-.78-3.73-1.61-6.16-5.36-6.35-5.61-.18-.25-1.52-2.02-1.52-3.85s.96-2.73 1.3-3.1c.34-.37.74-.46 1-.46h.72c.23 0 .53-.1.83.63.31.75 1.05 2.57 1.14 2.76.09.19.15.41.03.66-.12.25-.18.41-.36.63-.18.22-.38.49-.54.66-.18.19-.36.39-.16.76.21.37.93 1.53 2 2.48 1.37 1.22 2.53 1.6 2.9 1.78.37.19.58.16.8-.09.21-.25.93-1.09 1.18-1.46.25-.37.5-.31.84-.19.34.12 2.17 1.02 2.54 1.21.37.19.62.28.71.43.09.16.09.91-.22 1.78z"
            />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
