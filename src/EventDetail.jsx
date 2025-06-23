
import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData";
import AddToCalendarButton from "./AddToCalendarButton";

const EventDetail = () => {
  const { id } = useParams();
  const event = eventsData.find((e) => e.id === parseInt(id));

  if (!event) {
    return <div style={{ padding: "2rem" }}>Event Not Found</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{event.name}</h2>
      <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {event.time}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p>{event.description}</p>
      <AddToCalendarButton event={event} />
    </div>
  );
};

export default EventDetail;
