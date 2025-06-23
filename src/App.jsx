
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    "title": "Jazz Night at Fulton",
    "start": "2025-06-25T19:00:00-07:00",
    "end": "2025-06-25T21:00:00-07:00"
  },
  {
    "title": "Open Mic @ Tower Caf\u00e9",
    "start": "2025-06-27T20:00:00-07:00",
    "end": "2025-06-27T22:00:00-07:00"
  },
  {
    "title": "Symphony in the Park",
    "start": "2025-06-30T18:00:00-07:00",
    "end": "2025-06-30T20:30:00-07:00"
  }
];

export default function App() {
  const parsedEvents = events.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div className="App" style={{ height: "100vh", padding: "1rem" }}>
      <h1>Fresno Music Calendar</h1>
      <Calendar
        localizer={localizer}
        events={parsedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
      />
    </div>
  );
}
