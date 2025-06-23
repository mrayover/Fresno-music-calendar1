import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData.jsx";
import AddToCalendarButton from "./AddToCalendarButton.jsx";

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id.toString() === id);

  if (!event) {
    return <p>Event Not Found</p>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{event.title}</h2>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Time:</strong> {new Date(event.start).toLocaleString()}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <AddToCalendarButton event={event} />
    </div>
  );
}
