import NotesCarousel from "../components/NotesCarousel";
import { notes } from "../data/notes";

export default function Notes() {
  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="h1">22 Reasons I Love You</h1>
        <p className="p max-w-2xl mx-auto">
          One for every year. Take your time or let them flow. You can pause,
          skip, or linger on the ones that feel like us.
        </p>
      </header>

      <NotesCarousel notes={notes} autoPlay interval={4000} />
    </div>
  );
}
