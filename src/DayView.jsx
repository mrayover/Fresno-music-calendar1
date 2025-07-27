import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

/*
 * This version of the DayView component normalizes how event dates and times
 * are handled throughout the application.  Events stored in Supabase use an
 * ISO string that preserves the wall‑clock value (e.g. "2025-07-27T18:00:00.000Z")
 * for Fresno/Pacific time by subtracting the current timezone offset before
 * calling toISOString().  When reading those strings back we ignore the
 * trailing "Z" and construct a new Date using the date and time parts
 * directly so that 18:00 means 6 PM local.  The helper below performs this
 * conversion; if a Date instance is passed it is returned unchanged.
 */
function parseLocalDateTime(datetimeStr) {
  // If already a Date (e.g. provided by CalendarView) just return it
  if (datetimeStr instanceof Date) return datetimeStr;
  if (!datetimeStr) return new Date(NaN);
  const [datePart, timePart = "00:00"] = datetimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":" ).map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

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
          const localDate = parseLocalDateTime(event.start);
          const yyyyMMdd = localDate.toLocaleDateString("sv-SE"); // "YYYY-MM-DD"
          return yyyyMMdd === date;
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
            <div className="text-xl font-semibold text-tower-yellow hover:underline">{e.title}</div>
            <p className="text-sm italic">{e.venue}</p>
            <p className="text-sm">
              {parseLocalDateTime(e.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – {parseLocalDateTime(e.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
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
      <Link to="/" className="text-tower-teal underline hover:text-tower-yellow">
        ← Back to Calendar
      </Link>
    </div>
  );
};

export default DayView;