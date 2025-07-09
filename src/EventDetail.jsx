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

  return (
    <div style={{ padding: "2rem" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "1rem" }}>
        ← Back to Calendar
      </button>

      <h1>{event.title}</h1>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()}</p>
      <p><strong>Time:</strong> {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Cover:</strong> {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}</p>
      <p>{event.description}</p>
      <AddToCalendarButton event={event} />
    </div>
  );
}
