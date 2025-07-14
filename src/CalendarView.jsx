import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import FilterPanel from "./FilterPanel";

const localizer = momentLocalizer(moment);

function parseLocalDateTime(datetimeStr) {
  if (datetimeStr instanceof Date) return datetimeStr;

  const [datePart, timePart = "00:00"] = datetimeStr.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hour, minute);
}



const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();

const dayHighlight = () => ({
  className: "hover:bg-tower-brick/20 transition-colors duration-150 cursor-pointer"
});

const handleSelectSlot = (slotInfo) => {
  navigate(`/day/${slotInfo.start.toISOString().slice(0, 10)}`);
};

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
  start: parseLocalDateTime(event.start),
  end: parseLocalDateTime(event.end)
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
const handleSelectEvent = (event) => {
  navigate(`/event/${event.id}`);
};

const handleGenreChange = (genre) => {
  setSelectedGenres((prev) =>
    prev.includes(genre)
      ? prev.filter((g) => g !== genre)
      : [...prev, genre]
  );
};

const handleVenueChange = (venue) => {
  setSelectedVenues((prev) =>
    prev.includes(venue)
      ? prev.filter((v) => v !== venue)
      : [...prev, venue]
  );
};
const handleMouseEnter = (event, e) => {
  const rect = e.target.getBoundingClientRect();
  setHoveredEvent(event);
  setHoverPosition({ x: rect.left, y: rect.bottom });
};

const handleMouseLeave = () => {
  // Delay to avoid flickering
  setTimeout(() => setHoveredEvent(null), 150);
};
const genreColors = {
  Jazz: "#4B9CD3",
  "Open Mic": "#A23E48",
  Classical: "#3E9A5E",
  Rock: "#C95E5E",
  Punk: "#D1495B",
  HipHop: "#6B4C9A",
  Indie: "#D0A73E",
  Other: "#666666"
};


  return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-120px)] p-4 gap-4">
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
      <div className="flex-1 w-full min-w-0">
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
<div className="relative overflow-visible">
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
components={{
month: {
  event: ({ event }) => {
    const bg = genreColors[event.genre] || genreColors["Other"];
    return (
      <div
        className="relative z-10 cursor-pointer"
        onMouseEnter={(e) => handleMouseEnter(event, e)}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="truncate px-2 py-1 rounded-sm text-sm font-medium text-white"
          style={{ backgroundColor: bg }}
        >
          {event.title}
        </div>
      </div>
    );
  }
},

  day: {
    event: ({ event }) => {
      const bg = genreColors[event.genre] || genreColors["Other"];
      return (
        <div
          className="px-2 py-1 rounded-sm text-sm font-medium text-white"
          style={{ backgroundColor: bg }}
        >
          {event.title}
        </div>
      );
    }
  }
}}
startAccessor={(event) => parseLocalDateTime(event.start)}
endAccessor={(event) => parseLocalDateTime(event.end)}

          titleAccessor="title"
          view={view}
          onView={setView}
  onSelectEvent={handleSelectEvent}
  onSelectSlot={handleSelectSlot}
  selectable
  popup
  dayPropGetter={dayHighlight}
    date={date}
  onNavigate={(newDate) => setDate(newDate)}

          className="h-[85vh] w-full"
        />
      </div>
      
    </div>
    
      {hoveredEvent && (
        <div
          className="absolute z-50 bg-black text-white text-sm p-3 rounded shadow-xl w-64 pointer-events-none"
          style={{
            top: hoverPosition.y + 8,
            left: hoverPosition.x,
          }}
        >
          <div className="font-bold">{hoveredEvent.title}</div>
          <div className="text-xs italic">{hoveredEvent.venue}</div>
          <div className="text-xs">
            {new Date(hoveredEvent.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })} –{" "}
            {new Date(hoveredEvent.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </div>
          <div className="text-xs text-tower-yellow">{hoveredEvent.genre}</div>
          <p className="mt-1">
            {hoveredEvent.description?.slice(0, 120)}
            {hoveredEvent.description?.length > 120 ? "..." : ""}
          </p>
        </div>
      )}

    </div> 
  );
};

export default CalendarView;
