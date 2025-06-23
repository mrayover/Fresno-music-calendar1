
import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import eventsData from "./eventsData.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";

const localizer = momentLocalizer(moment);

const App = () => {
  const navigate = useNavigate();

  const events = eventsData.map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }));

  const handleSelectEvent = (event) => {
    if (event.id) {
      navigate(`/event/${event.id}`);
    }
  };

  return (
    <div className="App">
      <h1>Fresno Music Calendar</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: "50px" }}
        onSelectEvent={handleSelectEvent}
      />
    </div>
  );
};

export default App;
