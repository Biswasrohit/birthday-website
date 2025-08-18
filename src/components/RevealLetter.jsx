import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RevealLetter({ title = "Open your note", children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left flex items-center justify-between"
      >
        <span className="h2">💌 {title}</span>
        <span className="text-roseAccent font-semibold">
          {open ? "Hide" : "Reveal"}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="mt-4 p"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
