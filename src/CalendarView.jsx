
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import FilterPanel from "./FilterPanel";

const localizer = momentLocalizer(moment);

const CalendarView = ({ events }) => {
  const [view, setView] = useState(Views.MONTH);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const genres = [...new Set(events.map(event => event.genre))];

  const handleSelectEvent = (event) => {
    navigate(`/event/${event.id}`);
  };

  const handleFilterChange = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const filteredEvents = selectedGenres.length
    ? events.filter(event => selectedGenres.includes(event.genre))
    : events;

  return (
    <div style={{ display: "flex", height: "calc(100vh - 120px)", margin: "1rem" }}>
      <div style={{ width: "200px", marginRight: "1rem" }}>
        <FilterPanel
          genres={genres}
          selectedGenres={selectedGenres}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div style={{ flexGrow: 1 }}>
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => setView(Views.MONTH)}>Month</button>
          <button onClick={() => setView(Views.DAY)}>Day</button>
        </div>
        <Calendar
          views={["month", "day"]}
          localizer={localizer}
          events={filteredEvents}
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
