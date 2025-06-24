import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import events from './eventsData';
import FilterPanel from "./FilterPanel";

const allGenres = Array.from(new Set(events.map(event => event.genre))).sort();

const [selectedGenres, setSelectedGenres] = useState(allGenres);

const handleGenreChange = (genre) => {
  setSelectedGenres(prev =>
    prev.includes(genre)
      ? prev.filter(g => g !== genre)
      : [...prev, genre]
  );
};

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [view, setView] = useState(Views.MONTH);
  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  return (
    <div style={{ height: "calc(100vh - 120px)", margin: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setView(Views.MONTH)}>Month</button>
        <button onClick={() => setView(Views.DAY)}>Day</button>
      </div>
      <Calendar
        views={["month", "day"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        view={view}
        onView={setView}
        onSelectEvent={handleSelectEvent}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default CalendarView;