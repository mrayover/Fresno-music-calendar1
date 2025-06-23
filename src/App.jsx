import React, { useState } from "react";
import FilterPanel from "./FilterPanel";
import events from "./eventsData";

function App() {
  const allGenres = [...new Set(events.map(e => e.genre))];
  const allVenues = [...new Set(events.map(e => e.venue))];
  const [selectedGenres, setSelectedGenres] = useState(allGenres);
  const [selectedVenues, setSelectedVenues] = useState(allVenues);

  const handleGenreChange = (genre, checked) => {
    setSelectedGenres(checked
      ? genre === "ALL" ? allGenres : [...selectedGenres, genre]
      : selectedGenres.filter(g => g !== genre)
    );
  };

  const handleVenueChange = (venue, checked) => {
    setSelectedVenues(checked
      ? venue === "ALL" ? allVenues : [...selectedVenues, venue]
      : selectedVenues.filter(v => v !== venue)
    );
  };

  const filteredEvents = events.filter(e =>
    selectedGenres.includes(e.genre) && selectedVenues.includes(e.venue)
  );

  return (
    <div style={{ display: "flex" }}>
      <FilterPanel
        genres={allGenres}
        venues={allVenues}
        selectedGenres={selectedGenres}
        selectedVenues={selectedVenues}
        onGenreChange={handleGenreChange}
        onVenueChange={handleVenueChange}
      />
      <main style={{ flex: 1, padding: "1rem" }}>
        <h1>Fresno Music Calendar</h1>
        {filteredEvents.map((event, index) => (
          <div key={index} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ccc" }}>
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

export default App;
