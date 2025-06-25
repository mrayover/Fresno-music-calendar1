import React, { useState, useEffect } from "react";

const GENRE_STORAGE_KEY = "customGenres";
const QUEUE_STORAGE_KEY = "pendingEvents";

export default function AdminConfig() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });

  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const savedGenres = localStorage.getItem(GENRE_STORAGE_KEY);
    if (savedGenres) setGenres(JSON.parse(savedGenres));

    const savedQueue = localStorage.getItem(QUEUE_STORAGE_KEY);
    if (savedQueue) setPendingEvents(JSON.parse(savedQueue));
  }, []);

  const saveGenres = (updated) => {
    setGenres(updated);
    localStorage.setItem(GENRE_STORAGE_KEY, JSON.stringify(updated));
  };

  const saveQueue = (updated) => {
    setPendingEvents(updated);
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(updated));
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

  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateToISO = (mmddyyyy) => {
    const [month, day, year] = mmddyyyy.split("-");
    return `${year}-${month}-${day}`;
  };

  const generateEventObject = () => {
    const isoDate = formatDateToISO(eventData.date);
    const start = `${isoDate}T${eventData.startTime}:00`;
    const end = `${isoDate}T${eventData.endTime}:00`;

    const newEvent = {
      id: Date.now().toString(),
      title: eventData.title,
      start: new Date(start),
      end: new Date(end),
      venue: eventData.venue,
      description: eventData.description,
      genre: eventData.genre,
      cover: eventData.cover
    };

    alert("Copy this event object into eventsData.jsx:

" + JSON.stringify(newEvent, null, 2));
  };

  const approveEvent = (event) => {
    const eventJSON = JSON.stringify(event, null, 2);
    navigator.clipboard.writeText(eventJSON);
    alert("Approved! Event JSON copied to clipboard.");
    const updatedQueue = pendingEvents.filter((e) => e.id !== event.id);
    saveQueue(updatedQueue);
  };

  const rejectEvent = (eventId) => {
    const updatedQueue = pendingEvents.filter((e) => e.id !== eventId);
    saveQueue(updatedQueue);
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

      <hr style={{ margin: "2rem 0" }} />

      <h2>Manually Add an Event</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateEventObject();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "500px" }}
      >
        <input name="title" placeholder="Title" value={eventData.title} onChange={handleEventChange} required />
        <input name="date" placeholder="MM-DD-YYYY" value={eventData.date} onChange={handleEventChange} required />
        <input name="startTime" type="time" value={eventData.startTime} onChange={handleEventChange} required />
        <input name="endTime" type="time" value={eventData.endTime} onChange={handleEventChange} required />
        <input name="venue" placeholder="Venue" value={eventData.venue} onChange={handleEventChange} required />
        <input name="genre" placeholder="Genre" value={eventData.genre} onChange={handleEventChange} />
        <input name="cover" placeholder="Cover Charge" value={eventData.cover} onChange={handleEventChange} />
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleEventChange} required />
        <button type="submit">Generate Event JSON</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Moderation Queue</h2>
      {pendingEvents.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {pendingEvents.map((event) => (
            <li key={event.id} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
              <strong>{event.title}</strong><br />
              {new Date(event.start).toLocaleString()} – {new Date(event.end).toLocaleTimeString()}<br />
              <em>{event.venue}</em> | {event.genre} | {event.cover}<br />
              <p>{event.description}</p>
              <button onClick={() => approveEvent(event)} style={{ marginRight: "0.5rem" }}>Approve</button>
              <button onClick={() => rejectEvent(event.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
