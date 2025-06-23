import React, { useState } from 'react';

export default function SidebarFilters() {
  const [genres, setGenres] = useState({
    Rock: true,
    Jazz: true,
    HipHop: true,
    Classical: true,
    Electronic: true,
  });

  const [venues, setVenues] = useState({
    TowerTheatre: true,
    Fulton55: true,
    Strummer: true,
    Bitwise: true,
    BackyardStage: true,
  });

  const toggleAll = (stateSetter, values, checked) => {
    const updated = {};
    Object.keys(values).forEach(key => updated[key] = checked);
    stateSetter(updated);
  };

  const handleCheckboxChange = (setter, values, key) => {
    setter({ ...values, [key]: !values[key] });
  };

  return (
    <aside style={{
      minWidth: '220px',
      padding: '1rem',
      borderRight: '1px solid #ddd',
      background: '#fdfdfd',
    }}>
      <h3>Genres</h3>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => toggleAll(setGenres, genres, true)}>Select All</button>
        <button onClick={() => toggleAll(setGenres, genres, false)} style={{ marginLeft: '0.5rem' }}>Clear</button>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Object.keys(genres).map((genre) => (
            <li key={genre}>
              <label>
                <input
                  type="checkbox"
                  checked={genres[genre]}
                  onChange={() => handleCheckboxChange(setGenres, genres, genre)}
                />
                {genre}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <h3>Venues</h3>
      <div>
        <button onClick={() => toggleAll(setVenues, venues, true)}>Select All</button>
        <button onClick={() => toggleAll(setVenues, venues, false)} style={{ marginLeft: '0.5rem' }}>Clear</button>
        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {Object.keys(venues).map((venue) => (
            <li key={venue}>
              <label>
                <input
                  type="checkbox"
                  checked={venues[venue]}
                  onChange={() => handleCheckboxChange(setVenues, venues, venue)}
                />
                {venue}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
