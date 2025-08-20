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
        Hi, my love,
        <br />
        <br />
        I want to take this moment to tell you how much you mean to me. You’ve
        become the person I look forward to every day, making even the quietest
        moments feel meaningful.
        <br />
        <br />
        You are hardworking in everything you do, and it inspires me constantly.
        You’re so smart, and how you carry yourself daily makes me proud to be
        with you. On top of that, you are caring in a way that makes me feel
        seen and loved in ways I never thought possible.
        <br />
        <br />
        What I love most is how empathetic you are to those around you. How you
        notice others, understand them, and honestly care for their feelings
        shows such a deep heart. I admire that more than I can put into words,
        and I know that same empathy will make you a fantastic mother one day.
        <br />
        <br />
        I also appreciate the food you make for me. It’s more than just
        delicious; every meal shows the thought, effort, and care you put into
        making me happy. It reminds me how lucky I am to share life with someone
        who gives so much of herself in little everyday ways.
        <br />
        <br />
        I want you to know I appreciate every bit of who you are. Every laugh,
        smile, and thoughtful thing you do for me adds to something I couldn’t
        imagine living without.
        <br />
        <br />
        I’m so grateful to share this life with you, and I can’t wait for all
        the moments still ahead of us. I love you more than I can ever fully put
        into words.
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
