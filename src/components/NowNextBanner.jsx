import { useEffect, useMemo, useState } from "react";

function combineDateAndTime(baseISO, hhmm) {
  const base = new Date(baseISO); // e.g., 2025-08-20T00:00:00-04:00
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(base);
  d.setHours(h, m, 0, 0); // local time, same day
  return d;
}

function computeNowNext(dayISO, items, now = new Date()) {
  const dayDate = new Date(dayISO);
  const isSameDay = now.toDateString() === dayDate.toDateString();

  // Ignore travel items for Now/Next logic
  const mainItems = items.filter((it) => !it.isTravel);
  const withTimes = mainItems
    .map((it) => ({ ...it, at: combineDateAndTime(dayISO, it.time) }))
    .sort((a, b) => a.at - b.at);

  const future = withTimes.filter((it) => it.at > now);
  const past = withTimes.filter((it) => it.at <= now);

  let status = "upcoming";
  let current = null;
  let next = null;

  if (!isSameDay) {
    next = withTimes[0] || null;
  } else if (future.length === 0) {
    status = "done";
    current = withTimes[withTimes.length - 1] || null;
  } else if (past.length === 0) {
    status = "pre";
    next = future[0];
  } else {
    status = "during";
    current = past[past.length - 1];
    next = future[0];
  }

  return { isSameDay, status, current, next };
}

function formatTimeUntil(target, now) {
  if (!target) return "";
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) return "now";
  const mins = Math.round(ms / 60000);
  if (mins < 60) return `in ${mins}m`;
  const hours = Math.floor(mins / 60);
  const rem = mins % 60;
  if (rem === 0) return `in ${hours}h`;
  return `in ${hours}h ${rem}m`;
}

export default function NowNextBanner({ day, items }) {
  // Support testing override: ?now=2025-08-20T14:05:00-04:00
  const params = new URLSearchParams(window.location.search);
  const nowParam = params.get("now");
  const initialNow = nowParam ? new Date(nowParam) : new Date();

  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    // If a fixed test time is supplied, don't tick
    if (nowParam) return;
    const id = setInterval(() => setNow(new Date()), 30_000); // refresh every 30s
    return () => clearInterval(id);
  }, [nowParam]);

  const info = useMemo(
    () => computeNowNext(day, items, now),
    [day, items, now]
  );

  // If we're not on the event day and there's no first item, don't show anything
  if (!info.isSameDay && !items?.length) return null;

  // First non-travel item for preview state
  const firstMain = useMemo(
    () => items.find((it) => !it.isTravel) || null,
    [items]
  );

  return (
    <div className="card bg-gradient-to-r from-roseAccent/10 via-blush to-sand ring-1 ring-roseAccent/20">
      {nowParam && (
        <div className="text-xs text-roseAccent font-medium mb-2">
          Test mode: using override time
        </div>
      )}
      {info.isSameDay ? (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            {info.status === "during" && info.current && (
              <span className="badge animate-pulse shadow-sm">Now</span>
            )}
            {info.status === "pre" && info.next && (
              <span className="badge">Next</span>
            )}
            {info.status === "done" && (
              <span className="badge">Day complete</span>
            )}

            <div className="p">
              {info.status === "during" && info.current && (
                <>
                  <strong>{info.current.title}</strong> at {info.current.time} •{" "}
                  {info.current.locationName}
                  {info.next && (
                    <>
                      {" "}
                      — up next: <strong>{info.next.title}</strong> at{" "}
                      {info.next.time}
                      <span className="ml-2 text-ink/60">
                        {formatTimeUntil(info.next.at, now)}
                      </span>
                    </>
                  )}
                </>
              )}
              {info.status === "pre" && info.next && (
                <>
                  First up: <strong>{info.next.title}</strong> at{" "}
                  {info.next.time} • {info.next.locationName}
                  <span className="ml-2 text-ink/60">
                    {formatTimeUntil(info.next.at, now)}
                  </span>
                </>
              )}
              {info.status === "done" && <>What a day! 🎉</>}
            </div>
          </div>

          {/* Right side small meta */}
          {info.next && (
            <div className="text-xs md:text-sm text-ink/70">
              Be there a few minutes early ✨
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="badge">Preview</span>
          <div className="p">
            First up: <strong>{firstMain?.title}</strong> at {firstMain?.time}
          </div>
        </div>
      )}
    </div>
  );
}
