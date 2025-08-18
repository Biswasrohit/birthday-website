import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Countdown from "../components/Countdown";
import RevealLetter from "../components/RevealLetter";
import Timeline from "../components/Timeline";
import ConfettiOnMilestone from "../components/ConfettiOnMilestone";
import NowNextBanner from "../components/NowNextBanner";
import { day, activities } from "../data/itinerary";

function combineDateAndTime(baseISO, hhmm) {
  const base = new Date(baseISO);
  const [h, m] = hhmm.split(":").map(Number);
  const d = new Date(base);
  d.setHours(h, m, 0, 0);
  return d;
}

function computeNowNext(dayISO, items, now = new Date()) {
  const dayDate = new Date(dayISO);
  const isSameDay = now.toDateString() === dayDate.toDateString();
  // Ignore travel items for current/next logic
  const mainItems = items.filter((it) => !it.isTravel);
  const withTimes = mainItems
    .map((it) => ({ ...it, at: combineDateAndTime(dayISO, it.time) }))
    .sort((a, b) => a.at - b.at);
  const future = withTimes.filter((it) => it.at > now);
  const past = withTimes.filter((it) => it.at <= now);
  let active = null,
    next = null;
  if (!isSameDay) {
    next = withTimes[0] || null;
  } else if (future.length === 0) {
    active = withTimes[withTimes.length - 1] || null;
  } else if (past.length === 0) {
    next = future[0];
  } else {
    active = past[past.length - 1];
    next = future[0];
  }
  return { activeSlug: active?.slug ?? null, nextSlug: next?.slug ?? null };
}

export default function Landing() {
  const { search } = useLocation();
  const nowParam = useMemo(
    () => new URLSearchParams(search).get("now"),
    [search]
  );
  const initialNow = useMemo(
    () => (nowParam ? new Date(nowParam) : new Date()),
    [nowParam]
  );

  const [now, setNow] = useState(initialNow);

  // Tick every 30s unless a fixed test time (?now=...) is provided
  useEffect(() => {
    if (nowParam) return;
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, [nowParam]);

  const isBirthday = useMemo(() => {
    const target = new Date(day);
    return now.toDateString() === target.toDateString();
  }, [now]);

  const { activeSlug, nextSlug } = useMemo(
    () => computeNowNext(day, activities, now),
    [now]
  );

  return (
    <div className="space-y-8">
      <ConfettiOnMilestone activate={isBirthday} />

      <section className="text-center space-y-4">
        <h1 className="h1">Happy Birthday, Farhin</h1>
        <p className="p max-w-2xl mx-auto">
          A little site to guide our day together: times, places, and tiny
          surprises. Let’s make your this Aug 20th your best birthday yet!
        </p>
      </section>

      <NowNextBanner day={day} items={activities} />
      <Countdown target={day} />

      <RevealLetter title="Open your birthday letter">
        Today is a celebration of you and all the incredible moments we have
        shared. Your kindness, strength, and spirit inspire me every day. I am
        endlessly grateful for your presence in my life and for the joy you
        bring to those around you. May this birthday be filled with warmth,
        laughter, and the comfort of knowing how deeply you are loved and
        appreciated. Here's to many more years of happiness and unforgettable
        memories together.
      </RevealLetter>

      <section className="space-y-4">
        <h2 className="h2">Our Day</h2>
        <Timeline
          items={activities}
          activeSlug={activeSlug}
          nextSlug={nextSlug}
        />
      </section>
    </div>
  );
}
