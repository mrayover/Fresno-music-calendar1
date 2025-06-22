
import { useState } from "react";
import "./ReviewDashboard.css";

export default function ReviewDashboard() {
  const [pending, setPending] = useState([
    {
      id: "temp-1",
      title: "Indie Night @ Goldstein's",
      date: "2025-06-29",
      time: "9:00 PM",
      venue: "Goldstein's Mortuary & Delicatessen",
      address: "1279 N Wishon Ave, Fresno, CA",
      genre: "Indie Rock",
      cover: "$8",
      description: "Local indie showcase — loud and proud.",
      ticketsLink: "",
      source: "https://instagram.com/goldsteinsfresno"
    }
  ]);

  const [approved, setApproved] = useState([]);

  const approveEvent = (event) => {
    setApproved([...approved, event]);
    setPending(pending.filter(e => e.id !== event.id));
  };

  const rejectEvent = (id) => {
    setPending(pending.filter(e => e.id !== id));
  };

  return (
    <div className="review-dashboard">
      <h1>Review Event Submissions</h1>
      {pending.length === 0 ? (
        <p>No pending submissions 🎉</p>
      ) : (
        pending.map(e => (
          <div className="pending-event" key={e.id}>
            <h2>{e.title}</h2>
            <p><strong>Date:</strong> {e.date} at {e.time}</p>
            <p><strong>Venue:</strong> {e.venue}</p>
            <p><strong>Address:</strong> {e.address}</p>
            <p><strong>Genre:</strong> {e.genre}</p>
            <p><strong>Cover:</strong> {e.cover}</p>
            <p>{e.description}</p>
            <p><strong>Source:</strong> <a href={e.source} target="_blank" rel="noreferrer">{e.source}</a></p>
            <div className="review-buttons">
              <button onClick={() => approveEvent(e)}>✅ Approve</button>
              <button onClick={() => rejectEvent(e.id)}>❌ Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
