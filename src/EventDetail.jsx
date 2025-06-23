
import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData.jsx";

export default function EventDetail() {
  const { eventId } = useParams();
  const event = eventsData.find((e) => e.id === eventId);

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{event.title}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Time:</strong> {new Date(event.start).toLocaleString()} – {new Date(event.end).toLocaleString()}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Cover:</strong> {event.cover || "Not listed"}</p>
    </div>
  );
}
