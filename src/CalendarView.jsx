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

  const allVenues = Array.from(new Set(events.map(event => event.venue))).sort();
const [selectedVenues, setSelectedVenues] = useState(allVenues);
const handleVenueChange = (venue) => {
  setSelectedVenues(prev =>
    prev.includes(venue)
      ? prev.filter(v => v !== venue)
      : [...prev, venue]
  );
};


  return (
  <div style={{ display: "flex", height: "calc(100vh - 120px)", padding: "1rem" }}>
    {/* Left column: Filters */}
    <div style={{ minWidth: "220px", marginRight: "2rem", display: "flex", flexDirection: "column" }}>
      <FilterPanel
        genres={Array.from(new Set(events.map(event => event.genre))).sort()}
        selectedGenres={selectedGenres}
        onFilterChange={handleGenreChange}
      />

      <div style={{ marginTop: "2rem" }}>
        <h3>Filter by Venue</h3>
        <label>
          <input
            type="checkbox"
            checked={allVenues.length === selectedVenues.length}
            onChange={() => {
              if (selectedVenues.length === allVenues.length) {
                setSelectedVenues([]);
              } else {
                setSelectedVenues(allVenues);
              }
            }}
          />
          Select All
        </label>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.5rem" }}>
          {allVenues.map((venue) => (
            <label key={venue}>
              <input
                type="checkbox"
                value={venue}
                checked={selectedVenues.includes(venue)}
                onChange={() => handleVenueChange(venue)}
              />
              {venue}
            </label>
          ))}
        </div>
      </div>
    </div>

    {/* Right column: Calendar */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setView(Views.MONTH)}>Month</button>
        <button onClick={() => setView(Views.DAY)}>Day</button>
      </div>
      <Calendar
        views={["month", "day"]}
        localizer={localizer}
        events={events.filter(
          event =>
            selectedGenres.includes(event.genre) &&
            selectedVenues.includes(event.venue)
        )}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        view={view}
        onView={setView}
        onSelectEvent={handleSelectEvent}
        style={{ height: "calc(100vh - 200px)", width: "100%" }}
      />
    </div>
  </div>
);

};

export default CalendarView;
