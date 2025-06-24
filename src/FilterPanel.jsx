import React from "react";

const FilterPanel = ({ genres, selectedGenres, onFilterChange }) => {
  return (
    <div className="filter-panel">
      <h3>Filter by Genre</h3>
      <div>
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
