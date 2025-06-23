
import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData";

export default function EventDetail() {
  const { id } = useParams();

  const event = eventsData.find((e) => String(e.id) === String(id));

  if (!event) {
    return <div style={{ padding: "1rem" }}>Event Not Found</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {event.start.toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {event.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p>{event.description}</p>
    </div>
  );
}
