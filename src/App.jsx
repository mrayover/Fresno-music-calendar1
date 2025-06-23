
import React, { useState } from "react";
import eventsData from "./eventsData.jsx";
import "./style.css";

export default function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const allGenres = Array.from(new Set(eventsData.map(event => event.genre)));

  const toggleFilter = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const filteredEvents = eventsData.filter(event =>
    selectedGenres.length === 0 || selectedGenres.includes(event.genre)
  );

  return (
    <div className="App">
      <header>
        <img src="/logo.png" alt="Fresno Music Calendar Logo" />
        <h1>Fresno Music Calendar</h1>
      </header>
      <aside style={{ float: "left", width: "20%" }}>
        <h2>Filters</h2>
        <h3>Genres</h3>
        {allGenres.map((genre, idx) => (
          <div key={idx}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleFilter(genre)}
            />
            {genre}
          </div>
        ))}
      </aside>
      <main style={{ marginLeft: "22%" }}>
        {filteredEvents.map((event, index) => (
          <div key={index} className={"event-card " + (event.genre || "").toLowerCase().replace(/\s+/g, '')}>
            <h2>{event.name}</h2>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Genre:</strong> {event.genre}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
