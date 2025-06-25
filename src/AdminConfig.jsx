import React, { useState, useEffect } from "react";

const STORAGE_KEY = "customGenres";

export default function AdminConfig() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setGenres(JSON.parse(saved));
  }, []);

  const saveGenres = (updated) => {
    setGenres(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      saveGenres([...genres, trimmed]);
      setNewGenre("");
    }
  };

  const removeGenre = (genreToRemove) => {
    saveGenres(genres.filter((g) => g !== genreToRemove));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Genre Manager</h2>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <input
          value={newGenre}
          onChange={(e) => setNewGenre(e.target.value)}
          placeholder="Add new genre"
        />
        <button onClick={addGenre}>Add</button>
      </div>
      <ul>
        {genres.map((genre) => (
          <li key={genre} style={{ marginBottom: "0.25rem" }}>
            {genre} <button onClick={() => removeGenre(genre)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
