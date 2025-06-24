import React from "react";

const FilterPanel = ({ genres, selectedGenres, onGenreChange }) => {
  return (
    <div style={{ padding: "1rem", maxWidth: "200px" }}>
      <h4 style={{ marginBottom: "0.5rem" }}>Filter by Genre</h4>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
        {genres.map((genre) => (
          <label key={genre} style={{ fontSize: "0.9rem" }}>
            <input
              type="checkbox"
              checked={selectedGenres.includes(genre)}
              onChange={() => onGenreChange(genre)}
              style={{ marginRight: "0.5rem" }}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
