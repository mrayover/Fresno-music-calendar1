import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData.jsx";
import AddToCalendarButton from "./AddToCalendarButton";

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData.find(event => event.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{event.name}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p>{event.description}</p>
      <AddToCalendarButton event={event} />
    </div>
  );
}