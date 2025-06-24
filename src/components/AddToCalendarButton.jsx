import React from "react";

export default function AddToCalendarButton({ event }) {
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    const start = new Date(event.start).toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(event.end).toISOString().replace(/-|:|\.\d+/g, "");
    const details = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.venue || "");

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}&sf=true&output=xml`;
  };

  return (
    <a
      className="add-to-calendar"
      href={generateGoogleCalendarUrl()}
      target="_blank"
      rel="noopener noreferrer"
    >
      Add to Google Calendar
    </a>
  );
}
