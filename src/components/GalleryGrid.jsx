import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryGrid({ images = [] }) {
  const [active, setActive] = useState(null);

  return (
    <>
      {/* Masonry using CSS columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive({ src, i })}
            className="mb-4 block w-full overflow-hidden rounded-2xl bg-white/60 shadow hover:shadow-md focus:outline-none"
            style={{ breakInside: "avoid" }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              className="w-full h-auto transition-transform duration-200 hover:scale-[1.02]"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              key={active.src}
              src={active.src}
              alt="Preview"
              className="max-h-[85vh] max-w-[92vw] rounded-xl shadow-2xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 badge !bg-roseAccent !text-white"
              onClick={() => setActive(null)}
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
