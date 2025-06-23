import React from "react";

const AddToCalendarButton = ({ event }) => {
  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || "");
    const location = encodeURIComponent(event.location || "");
    const start = new Date(event.start).toISOString().replace(/-|:|\.\d+/g, "");
    const end = new Date(event.end).toISOString().replace(/-|:|\.\d+/g, "");

    return \`https://www.google.com/calendar/render?action=TEMPLATE&text=\${title}&dates=\${start}/\${end}&details=\${details}&location=\${location}&sf=true&output=xml\`;
  };

  return (
    <a
      href={createGoogleCalendarLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="add-to-calendar"
    >
      Add to Google Calendar
    </a>
  );
};

export default AddToCalendarButton;
