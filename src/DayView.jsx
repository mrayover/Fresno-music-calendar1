import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";

const DayView = () => {
  const { date } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "approved");

      if (!error) {
        const filtered = data.filter((event) => {
          const eventDate = new Date(event.start).toLocaleDateString("sv-SE"); // YYYY-MM-DD
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
<div key={e.id} className="mb-4 border-b border-gray-700 pb-2 hover:bg-tower-brick/10 transition rounded p-2">
  <Link to={`/event/${e.id}`} className="block text-xl font-semibold text-tower-yellow hover:underline">
    {e.title}
  </Link>
  <p className="text-sm italic">{e.venue}</p>
  <p className="text-sm">
    {new Date(e.start).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })} –{" "}
    {new Date(e.end).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })}
  </p>
  <p className="text-sm">{e.genre}</p>
  <p className="mt-1">{e.description}</p>
  {e.flyer && (
    <img
      src={e.flyer}
      alt={`${e.title} flyer`}
      className="mt-2 max-w-full rounded shadow"
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
