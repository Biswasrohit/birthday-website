// Birthday day/time for countdown (America/New_York)
export const day = "2025-08-20T00:00:00-04:00";

// Real itinerary for the day (includes travel blocks)
export const activities = [
  {
    slug: "gift-dropoff",
    title: "Gift Drop‑off",
    time: "08:30",
    endTime: "09:00",
    locationName: "Her Place",
    address: "—",
    notes:
      "Start the day with surprises! Too many gifts to carry around, so they’ll stay safe here 🎁💐",
    links: {},
  },
  // Travel: Home → Bronx Zoo
  {
    slug: "travel-to-zoo",
    title: "Bus to Bronx Zoo",
    time: "09:00",
    endTime: "10:00",
    isTravel: true,
    mode: "bus",
    locationName: "Transit",
    address: "—",
    notes: "About an hour ride — playlists and city views 🚌",
    links: { maps: "#" },
  },
  {
    slug: "bronx-zoo",
    title: "Bronx Zoo Adventure",
    time: "10:00",
    endTime: "15:30",
    locationName: "Bronx Zoo",
    address: "2300 Southern Blvd, The Bronx, NY",
    notes:
      "Walk on the wild side 🦁🐒🦓. Morning through mid‑afternoon exploring animals, shows, and hidden paths.",
    links: { maps: "https://maps.app.goo.gl/dsihxNRrjgL8SmeR7" },
    subtimeline: [
      { time: "10:30", detail: "Jungle World & tigers" },
      { time: "12:00", detail: "Lunch at Dancing Crane Café" },
      { time: "13:30", detail: "Giraffes & butterfly garden" },
      { time: "15:00", detail: "Sea lions send‑off" },
    ],
  },
  // Travel: Bronx Zoo → Bathhouse Flatiron
  {
    slug: "travel-to-bathhouse",
    title: "Subway to Bathhouse",
    time: "15:30",
    endTime: "16:30",
    isTravel: true,
    mode: "transit",
    locationName: "Transit",
    address: "—",
    notes: "Head downtown for a well‑earned soak 🚇",
    links: { maps: "#" },
  },
  {
    slug: "bathhouse",
    title: "Bathhouse Flatiron",
    time: "16:30",
    endTime: "19:50",
    locationName: "Bathhouse Flatiron",
    address: "14 W 22nd St, New York, NY",
    notes:
      "Cool down and recharge in saunas, pools, and steam rooms 🌊🧖‍♀️. Leave around 7:50 PM.",
    links: { maps: "https://maps.app.goo.gl/BdfnpX2V5adsPNNh7" },
  },
  // Travel: Bathhouse → Coqodaq (short walk)
  {
    slug: "walk-to-coqodaq",
    title: "Walk to COQODAQ",
    time: "19:50",
    endTime: "20:00",
    isTravel: true,
    mode: "walk",
    locationName: "Walk",
    address: "—",
    notes: "5‑minute stroll — fresh air and city glow 🚶‍♀️",
    links: { maps: "#" },
  },
  {
    slug: "dinner-coqodaq",
    title: "Dinner at COQODAQ",
    time: "20:00",
    endTime: "21:30",
    locationName: "COQODAQ",
    address: "12 E 22nd St, New York, NY",
    notes:
      "The famous fried chicken temple 🍗✨. Lots of crunch, cocktails, and laughter.",
    links: { maps: "https://maps.app.goo.gl/f5P1yok9BpM3notR8" },
  },
  // Travel: Flatiron → Home
  {
    slug: "head-home",
    title: "Head Home",
    time: "21:30",
    endTime: "22:30",
    isTravel: true,
    mode: "transit",
    locationName: "Transit",
    address: "—",
    notes: "Sleepy train/taxi back — hand in hand 🚕",
    links: { maps: "#" },
  },
  {
    slug: "return-home",
    title: "Return Home",
    time: "22:30",
    locationName: "Her Place",
    address: "—",
    notes:
      "End the night cozy, full, and happy. Unwrap the rest of the gifts and relax 🎀",
    links: {},
  },
];
