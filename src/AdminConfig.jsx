import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
window.supabase = supabase

const GENRE_STORAGE_KEY = "customGenres";

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

    const fetchPending = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("status", "pending");

      if (error) {
        console.error("Failed to fetch moderation queue:", error.message);
      } else {
        console.log("Fetched from Supabase:", data);
        setPendingEvents(data);
      }
};

    fetchPending();
  }, []);
  const handleEventChange = (e) => {
  const { name, value } = e.target;
  setEventData((prev) => ({ ...prev, [name]: value }));
};

  const addGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres([...genres, trimmed]);
      localStorage.setItem(GENRE_STORAGE_KEY, JSON.stringify([...genres, trimmed]));
      setNewGenre("");
    }
  };

const generateEventObject = async () => {
  const start = `${eventData.date}T${eventData.startTime}:00`;
  const end = `${eventData.date}T${eventData.endTime}:00`;

  const newEvent = {
    title: eventData.title,
    start,
    end,
    venue: eventData.venue,
    description: eventData.description,
    genre: eventData.genre,
    cover: eventData.cover,
    status: "approved",
    source: "admin"
  };

  try {
    const { error } = await supabase.from("events").insert([newEvent]);

    if (error) {
      console.error("Insert failed:", error.message);
      alert("There was an error submitting your event.");
    } else {
      alert("Event added and approved!");
      window.location.reload();
    }
  } catch (err) {
    console.error("Unexpected insert error:", err);
    alert("Unexpected error occurred.");
  }
};



const approveEvent = async (event) => {
  try {
    const { data, error } = await supabase
      .from("events")
      .update({ status: "approved" })
      .eq("id", event.id);

    console.log("Supabase update result:", { data, error });

    if (error) {
      console.error("Error approving event:", error.message);
      alert("There was an error approving the event.");
      return;
    }

    setPendingEvents((prev) => prev.filter((e) => e.id !== event.id));
    alert("Event approved and published!");
  } catch (err) {
    console.error("Unexpected error approving event:", err);
    alert("Unexpected error occurred.");
  }
};

const rejectEvent = async (eventId) => {
  try {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId)
      .eq("status", "pending"); // Safety: only delete if still pending

    if (error) {
      console.error("Error rejecting event:", error.message);
      alert("There was an error rejecting the event.");
      return;
    }

    setPendingEvents((prev) => prev.filter((e) => e.id !== eventId));
    alert("Event rejected and removed from moderation queue.");
  } catch (err) {
    console.error("Unexpected error rejecting event:", err);
    alert("Unexpected error occurred.");
  }
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
        <input name="date" type="date" value={eventData.date} onChange={handleEventChange} required />
        <input name="startTime" type="time" value={eventData.startTime} onChange={handleEventChange} required />
        <input name="endTime" type="time" value={eventData.endTime} onChange={handleEventChange} required />
        <input name="venue" placeholder="Venue" value={eventData.venue} onChange={handleEventChange} required />
        <input name="genre" placeholder="Genre" value={eventData.genre} onChange={handleEventChange} />
        <input name="cover" placeholder="Cover Charge" value={eventData.cover} onChange={handleEventChange} />
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleEventChange} required />
        <button type="submit">Add Event to Calendar</button>
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
