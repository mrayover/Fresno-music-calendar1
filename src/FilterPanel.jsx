import React from "react";

export default function FilterPanel({ genres, venues, selectedGenres, selectedVenues, onGenreChange, onVenueChange }) {
  return (
    <aside style={{ padding: "1rem", borderRight: "1px solid #ccc", width: "250px", backgroundColor: "#f9f9f9" }}>
      <h3>Filter by Genre</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedGenres.length === genres.length}
            onChange={(e) => onGenreChange("ALL", e.target.checked)}
          />
          Select All
        </label>
        {genres.map((genre) => (
          <label key={genre} style={{ display: "block", marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={(e) => onGenreChange(genre, e.target.checked)}
            />
            {genre}
          </label>
        ))}
      </div>

      <h3 style={{ marginTop: "1rem" }}>Filter by Venue</h3>
      <div>
        <label>
          <input
            type="checkbox"
            checked={selectedVenues.length === venues.length}
            onChange={(e) => onVenueChange("ALL", e.target.checked)}
          />
          Select All
        </label>
        {venues.map((venue) => (
          <label key={venue} style={{ display: "block", marginLeft: "1rem" }}>
            <input
              type="checkbox"
              checked={selectedVenues.includes(venue)}
              onChange={(e) => onVenueChange(venue, e.target.checked)}
            />
            {venue}
          </label>
        ))}
      </div>
    </aside>
  );
}
