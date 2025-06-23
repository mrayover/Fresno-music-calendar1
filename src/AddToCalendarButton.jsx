import React from "react";

export default function AddToCalendarButton({ event }) {
  if (!event || !event.name || !event.time || !event.venue) return null;

  const startTime = encodeURIComponent(new Date(event.time).toISOString());
  const endTime = encodeURIComponent(new Date(new Date(event.time).getTime() + 60 * 60 * 1000).toISOString());
  const title = encodeURIComponent(event.name);
  const location = encodeURIComponent(event.venue);
  const details = encodeURIComponent(event.description || "");

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}&sf=true&output=xml`;


  return (
    <div style={{ marginTop: "0.5rem" }}>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{
        padding: "0.5rem 1rem",
        backgroundColor: "#000",
        color: "#fff",
        textDecoration: "none",
        borderRadius: "4px",
        display: "inline-block"
      }}>
        Add to Google Calendar
      </a>
    </div>
  );
}
