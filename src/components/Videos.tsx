import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { VIDEOS } from "../data";

export function Videos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const featured = VIDEOS[active];

  return (
    <section className="section videos" id="videos" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
        >
          Videos
        </motion.p>
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.08, duration: 0.7 }}
        >
          See it. Feel it.
        </motion.h2>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.14, duration: 0.7 }}
        >
          Walkthroughs and site stories from Sri Sreenivasa Infra.
        </motion.p>

        <motion.div
          className="video-featured"
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 0.2, duration: 0.75 }}
        >
          <div className="video-frame">
            <iframe
              key={featured.id}
              src={`https://www.youtube.com/embed/${featured.id}?rel=0${"start" in featured && featured.start ? `&start=${featured.start}` : ""}`}
              title={featured.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="video-featured-caption">
            <strong>{featured.title}</strong>
            <span>{featured.tagline}</span>
          </p>
        </motion.div>

        <ul className="video-list">
          {VIDEOS.map((v, i) => (
            <motion.li
              key={v.id}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.5 }}
            >
              <button
                type="button"
                className={`video-thumb${active === i ? " is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                />
                <span>
                  <strong>{v.title}</strong>
                  <em>{v.tagline}</em>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>

        <p className="video-channel">
          <a
            href="https://www.youtube.com/@SriSreenivasaInfra"
            target="_blank"
            rel="noreferrer"
          >
            More on YouTube →
          </a>
        </p>
      </div>
    </section>
  );
}
