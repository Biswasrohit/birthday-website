import { activities } from "../data/itinerary";
import ActivityCard from "../components/ActivityCard";

export default function Itinerary() {
  return (
    <div className="space-y-6">
      <h1 className="h1">Full Itinerary</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {activities.map((a) => (
          <ActivityCard key={a.slug} activity={a} />
        ))}
      </div>
    </div>
  );
}
