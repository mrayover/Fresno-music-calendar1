import React from "react";
import { useParams } from "react-router-dom";
import eventsData from "./eventsData.jsx";
import "./style.css";

export default function EventDetail() {
  const { id } = useParams();
  const event = eventsData.find(e => e.id === id);

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div className="event-detail">
      <h1>{event.name}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Date:</strong> {new Date(event.start).toLocaleString()}</p>
      <p><strong>End Time:</strong> {new Date(event.end).toLocaleString()}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Description:</strong> {event.description}</p>
    </div>
  );
}