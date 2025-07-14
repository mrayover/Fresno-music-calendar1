// EventPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  console.log("🧠 EventPage is being rendered");

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("id, title, start, end, venue, genre, cover, description, source, submittedBy, contact, flyer")
        .eq("id", id)
        .single();

      if (!error) setEvent(data);
      else console.error("Error fetching event:", error.message);
    };

    fetchEvent();
  }, [id]);

  if (!event) return <div className="p-6 text-tower-cream">Loading event...</div>;

  console.log("🔎 Event object:", event);

  return (
    <div className="p-6 max-w-3xl mx-auto text-tower-cream">
      <h1 className="text-3xl font-bold text-tower-yellow mb-4">{event.title}</h1>
      <p><strong>Date:</strong> {event.start.slice(0, 10)} at {event.start.slice(11, 16)}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Cover:</strong> {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}</p>
      <p className="mt-2">{event.description}</p>

      {event.source && (
        <p className="mt-2">
          <strong>Source:</strong>{" "}
          <a href={event.source} target="_blank" rel="noreferrer" className="underline text-tower-teal">
            {event.source}
          </a>
        </p>
      )}

      {event.submittedBy && (
        <p className="mt-1"><strong>Submitted By:</strong> {event.submittedBy}</p>
      )}

      {event.contact && (
        <p className="mt-1"><strong>Contact:</strong> {event.contact}</p>
      )}

      {event.flyer && (
        <img
          src={event.flyer}
          alt={`${event.title} flyer`}
          className="mt-4 max-w-full rounded shadow"
        />
      )}

      <div className="mt-6 flex gap-4">
        <a href="https://www.addevent.com" target="_blank" rel="noreferrer" className="text-tower-teal underline">
          📅 Add to Calendar
        </a>
        <Link to="/" className="text-tower-teal underline">← Back to Calendar</Link>
      </div>
    </div>
  );
}
