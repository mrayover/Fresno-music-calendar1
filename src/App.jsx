
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventsData from "./eventsData";
import { Link } from "react-router-dom";

const localizer = momentLocalizer(moment);

export default function App() {
  const customizedEvents = eventsData.map(event => ({
    ...event,
    title: (
      <Link to={`/event/${event.id}`} style={{ color: "blue", textDecoration: "underline" }}>
        {event.title}
      </Link>
    ),
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  return (
    <div style={{ height: "100vh", padding: "1rem" }}>
      <h1>Fresno Music Calendar</h1>
      <Calendar
        localizer={localizer}
        events={customizedEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="month"
        style={{ height: "90vh" }}
      />
    </div>
  );
}
