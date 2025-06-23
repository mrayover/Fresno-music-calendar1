
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import eventsData from "./eventsData.jsx";
import logo from "/logo.png";
import { useNavigate } from "react-router-dom";

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
  const [events] = useState(eventsData);
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <img src={logo} alt="Fresno Music Calendar" className="app-logo" />
        <h1>Fresno Music Calendar</h1>
      </header>
      <main>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          onSelectEvent={handleSelectEvent}
        />
      </main>
    </div>
  );
}
