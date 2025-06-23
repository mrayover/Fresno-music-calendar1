
import React, { useState } from "react";
import eventsData from "./eventsData";
import AddToCalendarButton from "./AddToCalendarButton";

export default function App() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedVenues, setSelectedVenues] = useState([]);

  const genres = [...new Set(eventsData.map((event) => event.genre))];
  const venues = [...new Set(eventsData.map((event) => event.venue))];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleVenue = (venue) => {
    setSelectedVenues((prev) =>
      prev.includes(venue)
        ? prev.filter((v) => v !== venue)
        : [...prev, venue]
    );
  };

  const filteredEvents = eventsData.filter((event) => {
    const genreMatch = selectedGenres.length === 0 || selectedGenres.includes(event.genre);
    const venueMatch = selectedVenues.length === 0 || selectedVenues.includes(event.venue);
    return genreMatch && venueMatch;
  });

  return (
    <div>
      <aside style={{ padding: "1rem", borderRight: "1px solid #ccc" }}>
        <h3>Filter by Genre</h3>
        <label>
          <input
            type="checkbox"
            checked={selectedGenres.length === 0}
            onChange={() => setSelectedGenres([])}
          />
          Select All
        </label>
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => toggleGenre(genre)}
            />
            {genre}
          </label>
        ))}

        <h3>Filter by Venue</h3>
        <label>
          <input
            type="checkbox"
            checked={selectedVenues.length === 0}
            onChange={() => setSelectedVenues([])}
          />
          Select All
        </label>
        {venues.map((venue) => (
          <label key={venue}>
            <input
              type="checkbox"
              checked={selectedVenues.includes(venue)}
              onChange={() => toggleVenue(venue)}
            />
            {venue}
          </label>
        ))}
      </aside>

      <main style={{ padding: "1rem" }}>
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
