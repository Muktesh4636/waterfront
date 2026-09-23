import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { HIGHLIGHTS, IMAGES, TAGLINES } from "../data";

function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Overview() {
  const visualRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-36, 36],
  );

  return (
    <section className="section overview" id="overview">
      <div className="marquee" aria-hidden>
        <div className="marquee-track">
          {[...TAGLINES, ...TAGLINES].map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </div>

      <div className="container overview-grid">
        <FadeIn>
          <div className="overview-visual" ref={visualRef}>
            <motion.img
              src={IMAGES.overview}
              alt="Fortune Waterfront exterior"
              style={{ y: imgY, scale: 1.1 }}
            />
            <p className="overview-caption">
              Opposite IDL Lake · Kukatpally
            </p>
          </div>
        </FadeIn>

        <div>
          <FadeIn delay={0.08}>
            <p className="section-label">Overview</p>
            <h2 className="section-title">Elevated living on the water&apos;s edge</h2>
            <p className="section-copy tagline-only">
              Two towers. Private lobbies. A life framed by water and green.
            </p>
          </FadeIn>

          <dl className="metrics">
            {HIGHLIGHTS.map((m, i) => (
              <FadeIn key={m.label} delay={0.12 + i * 0.06}>
                <div className="metric">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
