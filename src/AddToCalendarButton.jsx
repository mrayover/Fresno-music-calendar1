import React from "react";

export default function AddToCalendarButton({ event }) {
  const { name, time, venue } = event;

  const startTime = new Date(time).toISOString();
  const endTime = new Date(new Date(time).getTime() + 2 * 60 * 60 * 1000).toISOString(); // +2 hours
  const details = encodeURIComponent(`${name} at ${venue}`);
  const location = encodeURIComponent(venue);
  const calendarUrl = `https://www.addevent.com/dir/?client=aGxsNGRhaHRjZ29scg&id=example&start=${startTime}&end=${endTime}&title=${encodeURIComponent(name)}&location=${location}&description=${details}`;

  return (
    <a href={calendarUrl} target="_blank" rel="noopener noreferrer">
      <button style={{ marginTop: "0.5rem", padding: "0.4rem 1rem", background: "#333", color: "#fff", border: "none", cursor: "pointer" }}>
        Add to Calendar
      </button>
    </a>
  );
}
