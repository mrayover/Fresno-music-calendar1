// EventPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setEvent(data);
    };
    fetchEvent();
  }, [id]);

  if (!event) return <div className="p-6 text-tower-cream">Loading event...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto text-tower-cream">
      <h1 className="text-3xl font-bold text-tower-yellow mb-4">{event.title}</h1>
      <p><strong>Date:</strong> {new Date(event.start).toLocaleDateString()} at {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      <p><strong>Venue:</strong> {event.venue}</p>
      <p><strong>Genre:</strong> {event.genre}</p>
      <p><strong>Cover Charge:</strong> {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}</p>
      <p className="mt-2">{event.description}</p>

      {event.source && (
        <p className="mt-2">
          <strong>Source:</strong>{' '}
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

      <div className="mt-4 flex gap-4">
        <a href="https://www.addevent.com" target="_blank" rel="noreferrer" className="text-tower-teal underline">📅 Add to Calendar</a>
        <Link to="/" className="text-tower-teal underline">← Back to Calendar</Link>
      </div>
    </div>
  );
}
