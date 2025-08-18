import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function modeIcon(mode) {
  switch (mode) {
    case "bus":
      return "🚌";
    case "walk":
      return "🚶‍♀️";
    case "transit":
      return "🚇";
    case "taxi":
      return "🚕";
    default:
      return "➡️";
  }
}

export default function Timeline({
  items,
  activeSlug = null,
  nextSlug = null,
}) {
  const [openSlug, setOpenSlug] = useState(null);

  return (
    <ol className="relative border-s border-rose-200 ml-4">
      {items.map((it, idx) => {
        const isActive = !!activeSlug && it.slug === activeSlug && !it.isTravel;
        const isNext = !!nextSlug && it.slug === nextSlug && !it.isTravel;
        const isOpen = openSlug === it.slug;
        const hasSub =
          Array.isArray(it.subtimeline) && it.subtimeline.length > 0;
        const isTravel = !!it.isTravel;

        const timeLabel = it.endTime ? `${it.time}–${it.endTime}` : it.time;

        return (
          <motion.li
            key={it.slug}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.07 }}
            className="mb-8 ms-6"
          >
            {/* Timeline dot */}
            <span
              className={
                "absolute -start-3 mt-2 flex h-6 w-6 items-center justify-center rounded-full " +
                (isTravel
                  ? "bg-white ring-2 ring-ink/10"
                  : isActive
                  ? "bg-roseAccent/30 ring-4 ring-roseAccent/20 animate-pulse"
                  : isNext
                  ? "bg-roseAccent/20 ring-2 ring-roseAccent/10"
                  : "bg-roseAccent/20")
              }
            >
              <span
                className={
                  "rounded-full " +
                  (isTravel
                    ? "h-2.5 w-2.5 bg-ink/20"
                    : isActive
                    ? "h-3.5 w-3.5 bg-roseAccent"
                    : "h-3 w-3 bg-roseAccent")
                }
              />
            </span>

            {/* Card */}
            <div
              className={
                "card transition-transform " +
                (isTravel
                  ? "border border-dashed border-ink/20 bg-white/80 shadow-none"
                  : isActive
                  ? "ring-1 ring-roseAccent/30 bg-blush/60 scale-[1.01]"
                  : isNext
                  ? "ring-1 ring-roseAccent/20 bg-blush/40"
                  : "")
              }
            >
              <div className="flex items-baseline gap-3">
                <span
                  className={
                    "badge " +
                    (isActive ? "!bg-roseAccent !text-white" : isNext ? "" : "")
                  }
                >
                  {timeLabel}
                </span>
                <h3 className="font-semibold text-ink">
                  {isTravel && (
                    <span className="mr-1" aria-hidden>
                      {modeIcon(it.mode)}
                    </span>
                  )}
                  {it.title}
                </h3>
                <span className="text-ink/60 text-xs ml-auto">
                  {idx + 1}/{items.length}
                </span>
              </div>

              {!isTravel && (
                <p className="p mt-2">
                  {it.locationName} • {it.address}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {!isTravel && (
                  <Link className="link" to={`/activity/${it.slug}`}>
                    Details
                  </Link>
                )}
                {!isTravel && it.links?.maps && (
                  <a
                    className="link"
                    href={it.links.maps}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Maps
                  </a>
                )}
                {hasSub && !isTravel && (
                  <button
                    type="button"
                    className="link"
                    onClick={() => setOpenSlug(isOpen ? null : it.slug)}
                    aria-expanded={isOpen}
                  >
                    {isOpen ? "Hide plan" : "Show plan"}
                  </button>
                )}
                {isTravel && (
                  <span className="text-xs text-ink/60">travel</span>
                )}
              </div>

              {/* Subtimeline (only for non-travel items) */}
              <AnimatePresence initial={false}>
                {hasSub && !isTravel && isOpen && (
                  <motion.div
                    key="subtimeline"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 pl-4 border-l border-rose-200"
                  >
                    <ul className="space-y-2">
                      {it.subtimeline.map((sub, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="badge shrink-0">{sub.time}</span>
                          <span className="p">{sub.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
