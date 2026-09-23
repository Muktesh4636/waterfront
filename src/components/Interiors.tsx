import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ROOM_TOURS } from "../data";
import { RoomView3D } from "./RoomView3D";

export function Interiors() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(
    () => Math.max(0, ROOM_TOURS.findIndex((r) => r.id === "living")),
  );
  const room = ROOM_TOURS[active];

  return (
    <section className="section interiors" id="interiors" ref={ref}>
      <div className="container">
        <motion.p
          className="section-label"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          Interiors
        </motion.p>
        <motion.h2
          className="section-title"
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.08 }}
        >
          Stand in the middle of the room
        </motion.h2>
        <motion.p
          className="section-copy tagline-only"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 0.16 }}
        >
          Drag to look · change Position (Center, Balcony, Sofa, TV, Art) or walk with WASD.
        </motion.p>

        <div className="room-tour-tabs" role="tablist" aria-label="Interior rooms">
          {ROOM_TOURS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`room-tour-tab${active === i ? " is-active" : ""}`}
              onClick={() => setActive(i)}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div className="container-wide">
        <motion.div
          className="room-tour-stage"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <RoomView3D
            key={room.id}
            panorama={"panorama" in room ? room.panorama : undefined}
            src={"panorama" in room ? undefined : room.src}
          />
          <div className="room-tour-caption">
            <h3>{room.title}</h3>
            <p>{room.line}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
