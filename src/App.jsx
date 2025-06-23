
import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useNavigate } from "react-router-dom";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import eventsData from "./eventsData.jsx";
import "./style.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function App() {
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src="/logo.png" alt="Fresno Music Calendar" className="logo" />
        <h1 className="site-title">Fresno Music Calendar</h1>
      </header>
      <main className="calendar-main">
        <aside className="sidebar">
          {/* Placeholder for filters */}
          <p>Filters will go here.</p>
        </aside>
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={eventsData}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleSelectEvent}
            style={{ height: "90vh", margin: "2rem" }}
          />
        </div>
      </main>
    </div>
  );
}
