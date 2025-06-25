import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import events from './eventsData';
import FilterPanel from "./FilterPanel";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [view, setView] = useState(Views.MONTH);
  const [selectedGenres, setSelectedGenres] = useState(
    Array.from(new Set(events.map(event => event.genre))).sort()
  );

  const navigate = useNavigate();

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    );
  };

  return (
  <div style={{ display: "flex", height: "calc(100vh - 120px)", padding: "1rem" }}>
    <div style={{ minWidth: "200px", marginRight: "2rem" }}>
      <FilterPanel
        genres={Array.from(new Set(events.map(event => event.genre))).sort()}
        selectedGenres={selectedGenres}
        onFilterChange={handleGenreChange}
      />
    </div>

    <div style={{ flex: 1 }}>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setView(Views.MONTH)}>Month</button>
        <button onClick={() => setView(Views.DAY)}>Day</button>
      </div>
      <Calendar
        views={["month", "day"]}
        localizer={localizer}
        events={events.filter(event => selectedGenres.includes(event.genre))}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        view={view}
        onView={setView}
        onSelectEvent={handleSelectEvent}
        style={{ height: "100%" }}
      />
    </div>
  </div>
);

};

export default CalendarView;
