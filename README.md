# Birthday Website 🎉

A personalized birthday website built with **Vite + React** and styled using **Tailwind CSS**.  
It features interactive elements like a countdown, itinerary timeline, birthday letter reveal, confetti celebration, and a Now/Next banner that updates live during the day.

---

## Features

- 🎂 Landing page with personalized birthday greeting
- ⏳ Countdown timer until the big day
- 🗓️ Timeline of activities with travel blocks and subtimelines
- 💌 Reveal letter with heartfelt message
- 🎊 Confetti celebration on milestones
- 📍 Google Maps integration for destinations
- 🔔 Now/Next banner showing current and upcoming activities

---

## Tech Stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## Installation

1. Clone this repository:

   ```bash
   git clone <your-repo-url>
   cd fb22
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and visit the local server (default: http://localhost:5173).

---

## File Structure

```
/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ router.jsx
│  ├─ index.css
│  ├─ data/itinerary.js
│  ├─ components/
│  │  ├─ Countdown.jsx
│  │  ├─ Timeline.jsx
│  │  ├─ ActivityCard.jsx
│  │  ├─ RevealLetter.jsx
│  │  ├─ ConfettiOnMilestone.jsx
│  │  ├─ NowNextBanner.jsx
│  ├─ pages/
│     ├─ Landing.jsx
│     ├─ Itinerary.jsx
│     ├─ Activity.jsx
```

---

## Deployment

You can deploy this site easily on [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/), or [GitHub Pages](https://pages.github.com/).

---

## License

This project is for personal use and celebration purposes only.
