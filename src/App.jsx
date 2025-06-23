
import React, { useState } from "react";

export default function App() {
  const sampleEvent = {
    name: "Jazz Night",
    venue: "Tower Theatre",
    time: "8:00 PM",
    genre: "Jazz",
    description: "Enjoy a night of smooth jazz with local artists."
  };

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);

  const allGenres = ["Jazz"];
  const allVenues = ["Tower Theatre"];

  const toggleFilter = (type, value) => {
    if (type === "genre") {
      setSelectedGenres(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    } else if (type === "venue") {
      setSelectedVenues(prev =>
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    }
  };

  const selectAll = (type) => {
    if (type === "genre") {
      setSelectedGenres(allGenres);
    } else if (type === "venue") {
      setSelectedVenues(allVenues);
    }
  };

  const shouldDisplay =
    (selectedGenres.length === 0 || selectedGenres.includes(sampleEvent.genre)) &&
    (selectedVenues.length === 0 || selectedVenues.includes(sampleEvent.venue));

  return (
    <div className="App" style={{ color: "white", backgroundColor: "black", minHeight: "100vh", padding: "1rem" }}>
      <h1>Fresno Music Calendar</h1>
      <aside>
        <h2>Filters</h2>
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
      </aside>
      <main>
        {shouldDisplay && (
          <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
            <h2>{sampleEvent.name}</h2>
            <p><strong>Venue:</strong> {sampleEvent.venue}</p>
            <p><strong>Time:</strong> {sampleEvent.time}</p>
            <p><strong>Genre:</strong> {sampleEvent.genre}</p>
            <p>{sampleEvent.description}</p>
          </div>
        )}
      </main>
    </div>
  );
}
