import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import FilterPanel from "./FilterPanel";

const localizer = momentLocalizer(moment);


const [events, setEvents] = useState([]);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "approved");

      if (error) {
        console.error("Error fetching events:", error.message);
      } else {
        const parsed = data.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end)
        }));
        setEvents(parsed);
        setSelectedGenres(Array.from(new Set(parsed.map(e => e.genre))).sort());
        setSelectedVenues(Array.from(new Set(parsed.map(e => e.venue))).sort());
      }
    };

    fetchEvents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
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
              checked={selectedVenues.length === Array.from(new Set(events.map(e => e.venue))).length}
              onChange={() => {
                const allVenues = Array.from(new Set(events.map(e => e.venue))).sort();
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
            {Array.from(new Set(events.map(event => event.venue))).sort().map((venue) => (
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
        <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div>
            <button onClick={() => setView(Views.MONTH)}>Month</button>
            <button onClick={() => setView(Views.DAY)}>Day</button>
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ padding: "0.4rem", flex: 1 }}
          />
        </div>

        {/* Live Search Suggestions */}
        {searchQuery && (
          <div style={{
            background: "#fff",
            color: "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            maxHeight: "200px",
            overflowY: "auto",
            marginBottom: "1rem",
            padding: "0.5rem"
          }}>
            {events
              .filter(
                (event) =>
                  selectedGenres.includes(event.genre) &&
                  selectedVenues.includes(event.venue) &&
                  (event.title.toLowerCase().includes(searchQuery) ||
                   event.description.toLowerCase().includes(searchQuery))
              )
              .map((event) => (
                <div key={event.id} style={{ padding: "0.25rem 0" }}>
                  <a
                    href={`/event/${event.id}`}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    <strong>{event.title}</strong> – {new Date(event.start).toLocaleDateString()} @ {event.venue}
                  </a>
                </div>
              ))}
          </div>
        )}

        <Calendar
          views={["month", "day"]}
          localizer={localizer}
          events={events.filter(
            (event) =>
              selectedGenres.includes(event.genre) &&
              selectedVenues.includes(event.venue) &&
              (event.title.toLowerCase().includes(searchQuery) ||
               event.description.toLowerCase().includes(searchQuery))
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
