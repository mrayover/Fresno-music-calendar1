import React from "react";

/*
 * The AddToCalendarButton component generates a Google Calendar link based on
 * the event's start and end times.  Events are stored in the database as
 * pseudo‑UTC strings (e.g. "2025-07-27T18:00:00.000Z") where the trailing
 * "Z" should be ignored when interpreting the value.  The helper below
 * constructs a Date from the date and time components without applying
 * timezone conversion.  When we subsequently call toISOString() on that
 * Date the result is a true UTC timestamp, ensuring the calendar invite
 * corresponds to the local time originally entered.
 */
function parseLocalDateTime(datetimeStr) {
  if (datetimeStr instanceof Date) return datetimeStr;
  if (!datetimeStr) return new Date(NaN);
  const [datePart, timePart = "00:00"] = datetimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":" ).map(Number);
  return new Date(year, month - 1, day, hour, minute);
}

export default function AddToCalendarButton({ event }) {
  const generateGoogleCalendarUrl = () => {
    const title = encodeURIComponent(event.title);
    // Convert stored local string into a true UTC ISO string for calendar
    const startIso = parseLocalDateTime(event.start).toISOString().replace(/-|:|\.\d+/g, "");
    const endIso = parseLocalDateTime(event.end).toISOString().replace(/-|:|\.\d+/g, "");
    const details = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.venue || "");
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}&sf=true&output=xml`;
  };
  return (
    <a className="add-to-calendar" href={generateGoogleCalendarUrl()} target="_blank" rel="noopener noreferrer">
      Add to Google Calendar
    </a>
  );
}