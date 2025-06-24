import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData";
import AddToCalendarButton from "./AddToCalendarButton";

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData.find(event => event.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{event.title}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Start:</strong> {event.start}</p>
      <p><strong>End:</strong> {event.end}</p>
      <p><strong>Description:</strong> {event.description}</p>
      <AddToCalendarButton event={event} />
    </div>
  );
}
