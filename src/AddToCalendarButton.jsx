import React from "react";

export default function AddToCalendarButton({ event }) {
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.name);
    const details = encodeURIComponent(event.description);
    const location = encodeURIComponent(event.venue);
    const start = new Date(event.start).toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(event.end).toISOString().replace(/-|:|\.\d+/g, "");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <a
      href={generateGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "inline-block", marginTop: "0.5rem" }}
    >
      Add to Google Calendar
    </a>
  );
}
