import { Outlet, Link, useLocation } from "react-router-dom";

export default function App() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur bg-rose-50/70 border-b border-black/5">
        <nav className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="font-display text-xl">
            Her Day ✨
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              to="/itinerary"
              className={`hover:underline ${
                pathname.startsWith("/itinerary") && "font-semibold"
              }`}
            >
              Itinerary
            </Link>
            <Link
              to="/notes"
              className={`hover:underline ${
                pathname.startsWith("/notes") && "font-semibold"
              }`}
            >
              Notes
            </Link>
            <Link
              to="/gallery"
              className={`hover:underline ${
                pathname.startsWith("/gallery") && "font-semibold"
              }`}
            >
              Gallery
            </Link>
            <a
              className="link"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Top
            </a>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-center text-xs text-ink/60">
        Made with ❤️ for her birthday.
      </footer>
    </div>
  );
}
