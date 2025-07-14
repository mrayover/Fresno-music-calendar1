import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const DayView = () => {
  const { date } = useParams();
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "approved");

      if (!error) {
        const filtered = data.filter((event) => {
         const eventDate = event.start.slice(0, 10); // exact match, no shift
          return eventDate === date;
        });
        setEvents(filtered);
      }
    };
    fetch();
  }, [date]);

  return (
    <div className="p-6 max-w-3xl mx-auto text-tower-cream">
      <h1 className="text-2xl font-bold mb-4 text-tower-yellow">Events on {date}</h1>
      {events.length === 0 ? (
        <p>No events scheduled for this day.</p>
      ) : (
        events.map((e) => (
  <div
    key={e.id}
    className="mb-4 border-b border-gray-700 pb-2 hover:bg-tower-brick/10 transition rounded p-2 cursor-pointer"
    onClick={() => navigate(`/event/${e.id}`)}
  >
    <div className="text-xl font-semibold text-tower-yellow hover:underline">
      {e.title}
    </div>
    <p className="text-sm italic">{e.venue}</p>
    <p className="text-sm">
      {e.start.slice(11, 16)} – {e.end.slice(11, 16)}
 – {new Date(e.end).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })}
    </p>
    <p className="text-sm">{e.genre}</p>
    <p className="mt-1">{e.description}</p>

    {e.source && (
      <p className="text-sm mt-1">
        <strong>Source:</strong>{" "}
        <a
          href={e.source}
          target="_blank"
          rel="noreferrer"
          className="underline text-tower-teal"
          onClick={(evt) => evt.stopPropagation()}
        >
          {e.source}
        </a>
      </p>
    )}

    {e.submittedBy && (
      <p className="text-sm mt-1">
        <strong>Submitted by:</strong> {e.submittedBy}
      </p>
    )}

    {e.contact && (
      <p className="text-sm mt-1">
        <strong>Contact:</strong> {e.contact}
      </p>
    )}

    {e.flyer && (
      <img
        src={e.flyer}
        alt={`${e.title} flyer`}
        className="mt-2 max-w-full rounded shadow"
        style={{ pointerEvents: "none" }}
      />
    )}
  </div>
))
      )}
      <Link to="/" className="text-tower-teal underline hover:text-tower-yellow">← Back to Calendar</Link>
    </div>
  );
};

export default DayView;
