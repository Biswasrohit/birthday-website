import { useMemo } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { activities, day } from "../data/itinerary";

function combineDateAndTime(baseISO, hhmm) {
  const base = new Date(baseISO);
  const [h, m] = (hhmm || "").split(":").map(Number);
  const d = new Date(base);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  d.setHours(h, m, 0, 0);
  return d;
}

function isActiveNow(activity, now, dayISO) {
  const start = combineDateAndTime(dayISO, activity.time);
  if (!start) return false;
  const end = activity.endTime
    ? combineDateAndTime(dayISO, activity.endTime)
    : null;
  const dayDate = new Date(dayISO);
  const isSameDay = now.toDateString() === dayDate.toDateString();
  if (!isSameDay) return false;
  if (end) return now >= start && now <= end;
  // If no end, consider it active for 60 minutes from start
  const oneHour = 60 * 60 * 1000;
  return now >= start && now <= new Date(start.getTime() + oneHour);
}

export default function Activity() {
  const { slug } = useParams();
  const { search } = useLocation();

  const act = activities.find((a) => a.slug === slug);
  const nowParam = useMemo(
    () => new URLSearchParams(search).get("now"),
    [search]
  );
  const now = useMemo(
    () => (nowParam ? new Date(nowParam) : new Date()),
    [nowParam]
  );

  if (!act) {
    return (
      <div className="p">
        Not found.{" "}
        <Link className="link" to="/itinerary">
          Back
        </Link>
      </div>
    );
  }

  const timeLabel = act.endTime ? `${act.time}–${act.endTime}` : act.time;
  const here = isActiveNow(act, now, day);

  return (
    <article className="space-y-4">
      <Link className="link" to="/itinerary">
        ← Back to itinerary
      </Link>

      <header className="card">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="badge">{timeLabel}</span>
          <h1 className="h2">{act.title}</h1>
          {here && (
            <span className="badge !bg-roseAccent !text-white">
              You’re here
            </span>
          )}
        </div>
        <p className="p mt-2">
          {act.locationName} • {act.address}
        </p>
        {act.notes && <p className="p mt-2">{act.notes}</p>}
        {act.endTime && (
          <p className="p mt-2 text-ink/70">Ends at {act.endTime}</p>
        )}
        <div className="mt-3 flex gap-3 text-sm">
          {act.links?.maps && (
            <a
              className="link"
              href={act.links.maps}
              target="_blank"
              rel="noreferrer"
            >
              Open in Maps
            </a>
          )}
          {act.links?.menu && (
            <a
              className="link"
              href={act.links.menu}
              target="_blank"
              rel="noreferrer"
            >
              Menu
            </a>
          )}
        </div>
      </header>

      {Array.isArray(act.subtimeline) && act.subtimeline.length > 0 && (
        <section className="card">
          <h2 className="font-semibold text-ink mb-3">Plan inside this stop</h2>
          <ul className="space-y-2">
            {act.subtimeline.map((sub, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="badge shrink-0">{sub.time}</span>
                <span className="p">{sub.detail}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="card">
        <h2 className="font-semibold text-ink mb-2">Memory</h2>
        <p className="p">(Add a photo + 1-sentence story here later.)</p>
      </section>
    </article>
  );
}
