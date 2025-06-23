
import React, { useState, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import eventsData from "./eventsData.jsx";

const localizer = momentLocalizer(moment);

export default function App() {
  const [events] = useState(eventsData);
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  const memoizedEvents = useMemo(() => {
    return events.map(event => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [events]);

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/logo.png" alt="Fresno Music Calendar Logo" className="logo" />
        <h1>Fresno Music Calendar</h1>
      </header>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={memoizedEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
          onSelectEvent={handleSelectEvent}
        />
      </div>
    </div>
  );
}
