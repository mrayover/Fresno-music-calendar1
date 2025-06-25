import React from "react";

const FilterPanel = ({ genres, selectedGenres, onFilterChange }) => {
  const allSelected = genres.length === selectedGenres.length;

  const handleSelectAll = () => {
    if (allSelected) {
      genres.forEach(genre => onFilterChange(genre)); // Deselect all
    } else {
      genres
        .filter(genre => !selectedGenres.includes(genre))
        .forEach(genre => onFilterChange(genre)); // Select missing ones
    }
  };

  return (
    <div className="filter-panel" style={{ marginBottom: "1rem" }}>
      <h3>Filter by Genre</h3>
      <label>
        <input
          type="checkbox"
          checked={allSelected}
          onChange={handleSelectAll}
        />
        Select All
      </label>
      <div style={{ display: "flex", flexDirection: "column", marginTop: "0.5rem" }}>
        {genres.map((genre) => (
          <label key={genre}>
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={() => onFilterChange(genre)}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
