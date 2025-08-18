import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotesCarousel({
  notes,
  autoPlay = true,
  interval = 4000,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const count = notes.length;
  const safeIndex = (i) => (i + count) % count;

  const next = () => setIndex((i) => safeIndex(i + 1));
  const prev = () => setIndex((i) => safeIndex(i - 1));
  const goTo = (i) => setIndex(safeIndex(i));

  // autoplay
  useEffect(() => {
    if (!autoPlay || paused) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, paused, interval]);

  // keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const variants = useMemo(
    () => ({
      enter: { opacity: 0, y: 12 },
      center: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -12 },
    }),
    []
  );

  return (
    <div className="space-y-4">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {/* Card */}
        <div className="card bg-gradient-to-b from-blush to-sand">
          <div className="flex items-baseline justify-between">
            <div className="badge">
              Reason {index + 1}/{count}
            </div>
            {paused && <div className="text-xs text-ink/60">Paused</div>}
          </div>

          <div className="min-h-[120px] md:min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25 }}
                className="p text-lg md:text-xl"
              >
                {notes[index]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-2">
              <button className="badge" onClick={prev} aria-label="Previous">
                ←
              </button>
              <button className="badge" onClick={next} aria-label="Next">
                →
              </button>
            </div>

            <button
              className="link"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
            >
              {paused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex flex-wrap gap-2 justify-center">
        {notes.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full ${
              i === index ? "bg-roseAccent" : "bg-ink/20"
            }`}
            aria-label={`Go to ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
