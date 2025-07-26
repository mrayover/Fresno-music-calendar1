import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import AddToCalendarButton from "./AddToCalendarButton";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching event:", error.message);
      } else {
        setEvent(data);
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) {
    return <div>Event not found</div>;
  }
const parseLocalDateTime = (dateTimeStr) => {
  const [datePart, timePart] = dateTimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute);
};

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Calendar
      </button>

      <h1>{event.title}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
     <p><strong>Date:</strong> {
  new Date(event.start).toLocaleDateString([], {
    year: "numeric", month: "2-digit", day: "2-digit"
  })
}</p>
<p><strong>Time:</strong> {
  new Date(event.start).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Los_Angeles" })
} – {
  new Date(event.end).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Los_Angeles" })
}</p>
    
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Cover:</strong> {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}</p>
      <p>{event.description}</p>
      {event.source && (
  <p><strong>Source:</strong>{" "}
    <a href={event.source} target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "#337ab7" }}>
      {event.source}
    </a>
  </p>
)}

{event.submittedBy && (
  <p><strong>Submitted By:</strong> {event.submittedBy}</p>
)}

{event.contact && (
  <p><strong>Contact:</strong> {event.contact}</p>
)}

{event.flyer && (
  <div style={{ marginTop: "1rem" }}>
    <img
      src={event.flyer}
      alt={`${event.title} flyer`}
      style={{ maxWidth: "100%", borderRadius: "6px", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}
    />
  </div>
)}

      <AddToCalendarButton event={event} />
    </div>
  );
}
