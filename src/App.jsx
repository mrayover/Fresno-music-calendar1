
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import eventsData from "./eventsData.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

const localizer = momentLocalizer(moment);

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <img src="/logo.png" alt="Fresno Music Calendar" className="logo" />
        <h1>Fresno Music Calendar</h1>
      </header>
      <main className="main">
        <Calendar
          localizer={localizer}
          events={eventsData}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          components={{
            event: ({ event }) => (
              <Link to={`/event/${event.id}`} className="calendar-link">
                <span>{event.title}</span>
              </Link>
            ),
          }}
        />
      </main>
    </div>
  );
}
