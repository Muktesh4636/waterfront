import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { VIDEOS } from "../data";

function embedUrl(id: string, start?: number, autoplay = false) {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  if (start) params.set("start", String(start));
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

export function Videos() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const featured = VIDEOS[active];
  const start =
    "start" in featured && typeof featured.start === "number"
      ? featured.start
      : undefined;

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent(playing ? "fw:video-play" : "fw:video-stop"),
    );
    return () => {
      window.dispatchEvent(new CustomEvent("fw:video-stop"));
    };
  }, [playing]);

  const selectVideo = (index: number) => {
    setActive(index);
    setPlaying(false);
  };

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
            {playing ? (
              <iframe
                key={featured.id}
                src={embedUrl(featured.id, start, true)}
                title={featured.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="video-facade"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${featured.title}`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${featured.id}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="video-play" aria-hidden>
                  <svg viewBox="0 0 68 48" width="68" height="48">
                    <path
                      d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.5C4 2.3 2.3 4.8 1.5 7.7 0 13.1 0 24 0 24s0 10.9 1.5 16.3c.8 2.9 2.5 5.4 5.4 6.2C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.5c2.9-.8 4.6-3.3 5.4-6.2C68 34.9 68 24 68 24s0-10.9-1.5-16.3z"
                      fill="currentColor"
                    />
                    <path d="M45 24L27 14v20" fill="#fff" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <p className="video-featured-caption">
            <strong>{featured.title}</strong>
            <span>{featured.tagline}</span>
          </p>
        </motion.div>

        <ul className="video-list">
          {VIDEOS.map((v, i) => (
            <li key={v.id}>
              <button
                type="button"
                className={`video-thumb${active === i ? " is-active" : ""}`}
                onClick={() => selectVideo(i)}
              >
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span>
                  <strong>{v.title}</strong>
                  <em>{v.tagline}</em>
                </span>
              </button>
            </li>
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
