import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfettiOnMilestone({ activate }) {
  useEffect(() => {
    if (!activate) return;
    const end = Date.now() + 800;
    (function frame() {
      confetti({
        particleCount: 4,
        startVelocity: 36,
        spread: 60,
        origin: { y: 0.6 },
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [activate]);
  return null;
}
