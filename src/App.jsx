
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
    <div className="App">
      <h1>DEBUG: App is Rendering!</h1>
    <div className="app-container">
      <header className="header">
        <h1>Fresno Music Calendar</h1>
      </header>
      <aside className="sidebar">
        <h2>Filters</h2>
        <div className="filter-group">
          <h3>Genres</h3>
          <button onClick={() => selectAll("genre")}>Select All</button>
          {allGenres.map((genre, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleFilter("genre", genre)}
              />
              {genre}
            </label>
          ))}
        </div>
        <div className="filter-group">
          <h3>Venues</h3>
          <button onClick={() => selectAll("venue")}>Select All</button>
          {allVenues.map((venue, index) => (
            <label key={index}>
              <input
                type="checkbox"
                checked={selectedVenues.includes(venue)}
                onChange={() => toggleFilter("venue", venue)}
              />
              {venue}
            </label>
          ))}
        </div>
      </aside>
      <main className="main-content">
        {filteredEvents.map((event, index) => (
          <div className="event-card" key={index}>
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
