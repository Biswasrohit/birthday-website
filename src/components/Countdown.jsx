import { useEffect, useMemo, useState } from "react";

export default function Countdown({ target }) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target]);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, targetMs - now);
  const s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  return (
    <div className="card flex items-center gap-4">
      <div className="h2">Countdown</div>
      <div className="ml-auto text-ink/80 font-mono">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>
  );
}
