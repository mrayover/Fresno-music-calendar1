
import React, { useState } from "react";
import eventsData from "./eventsData";
import AddToCalendarButton from "./AddToCalendarButton";
import "./style.css";

export default function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);

  const allGenres = Array.from(new Set(eventsData.map(event => event.genre)));
  const allVenues = Array.from(new Set(eventsData.map(event => event.venue)));

  const toggleFilter = (filterType, value) => {
    if (filterType === "genre") {
      setSelectedGenres(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    } else if (filterType === "venue") {
      setSelectedVenues(prev =>
        prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
      );
    }
  };

  const selectAll = (filterType) => {
    if (filterType === "genre") {
      setSelectedGenres(allGenres);
    } else if (filterType === "venue") {
      setSelectedVenues(allVenues);
    }
  };

  const filteredEvents = eventsData.filter(event =>
    (selectedGenres.length === 0 || selectedGenres.includes(event.genre)) &&
    (selectedVenues.length === 0 || selectedVenues.includes(event.venue))
  );

  return (
    <div className="App" style={{ display: "flex" }}>
      <aside style={{ width: "20%", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h2>Filters</h2>
        <div>
          <h3>Genres</h3>
          <button onClick={() => selectAll("genre")}>Select All</button>
          {allGenres.map((genre, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleFilter("genre", genre)}
              />
              {genre}
            </div>
          ))}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <h3>Venues</h3>
          <button onClick={() => selectAll("venue")}>Select All</button>
          {allVenues.map((venue, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={selectedVenues.includes(venue)}
                onChange={() => toggleFilter("venue", venue)}
              />
              {venue}
            </div>
          ))}
        </div>
      </aside>
      <main style={{ flexGrow: 1, padding: "1rem" }}>
        {filteredEvents.map((event, index) => (
          <div key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
            <h2>{event.name}</h2>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Genre:</strong> {event.genre}</p>
            <p>{event.description}</p>
            <AddToCalendarButton event={event} />
          </div>
        ))}
      </main>
    </div>
  );
}
