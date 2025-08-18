import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  return (
    <div className="card">
      <div className="flex items-baseline gap-3">
        <span className="badge">{activity.time}</span>
        <h3 className="font-semibold text-ink">{activity.title}</h3>
      </div>
      {!activity.isTravel && (
        <p className="p mt-2">
          {activity.locationName} • {activity.address}
        </p>
      )}
      <p className="p mt-2">{activity.notes}</p>
      <div className="mt-3 flex gap-3 text-sm">
        <Link className="link" to={`/activity/${activity.slug}`}>
          Open
        </Link>
        {!activity.isTravel && activity.links?.maps && (
          <a
            className="link"
            href={activity.links.maps}
            target="_blank"
            rel="noreferrer"
          >
            Maps
          </a>
        )}
      </div>
    </div>
  );
}
