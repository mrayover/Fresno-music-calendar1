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
    startTime: "18:00",
    endTime: "",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });
  const [pendingEvents, setPendingEvents] = useState([]);
const [approvedEvents, setApprovedEvents] = useState([]);
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
const fetchApproved = async () => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "approved");

  if (error) {
    console.error("Failed to fetch approved events:", error.message);
  } else {
    setApprovedEvents(data);
  }
};
fetchApproved();
    fetchPending();
  }, []);

  const [editingId, setEditingId] = useState(null);
const editEvent = (event) => {
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);

  setEventData({
    title: event.title,
    date: startDate.toISOString().slice(0, 10),
    startTime: startDate.toISOString().slice(11, 16),
    endTime: endDate.toISOString().slice(11, 16),
    venue: event.venue,
    genre: event.genre,
    cover: event.cover || "",
    description: event.description || ""
  });

  setEditingId(event.id);
};
const handleChange = (e) => {
  const { name, value } = e.target;

  // If the startTime changes, auto-update endTime
  if (name === "startTime") {
    const [hour, minute] = value.split(":").map(Number);
    let newHour = (hour + 1) % 24;
    const adjustedEnd = `${newHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    setEventData((prev) => ({
      ...prev,
      startTime: value,
      endTime: adjustedEnd,
    }));
  } else {
    setEventData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};


  const addGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      setGenres([...genres, trimmed]);
      localStorage.setItem(GENRE_STORAGE_KEY, JSON.stringify([...genres, trimmed]));
      setNewGenre("");
    }
  };
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 15, 30, 45]) {
      const h = hour % 24;
      const labelHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
      const suffix = h < 12 || h === 24 ? "AM" : "PM";
      const label = `${labelHour}:${min.toString().padStart(2, "0")} ${suffix}`;
      const value = `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
      times.push({ label, value });
    }
  }
  return times;
};


  const localToISO = (dateStr, timeStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const localDate = new Date(year, month - 1, day, hour, minute);
  return localDate.toISOString(); // this is what Supabase likes
};


const generateEventObject = async () => {
  const start = localToISO(eventData.date, eventData.startTime);
  const end = localToISO(eventData.date, eventData.endTime);

  const coverNumber = parseFloat(eventData.cover);

  if (isNaN(coverNumber) || coverNumber < 0) {
    alert("Please enter a valid non-negative cover charge.");
    return;
  }

  const updatedEvent = {
    title: eventData.title,
    start,
    end,
    venue: eventData.venue,
    description: eventData.description,
    genre: eventData.genre,
    cover: coverNumber, // stored as number
    status: "approved",
    source: "admin"
  };

  try {
    let result;
    if (editingId) {
      result = await supabase
        .from("events")
        .update(updatedEvent)
        .eq("id", editingId);
    } else {
      result = await supabase.from("events").insert([updatedEvent]);
    }

    const { error } = result;
    if (error) {
      console.error("Save failed:", error.message);
      alert("Error submitting your event.");
    } else {
      alert(`Event ${editingId ? "updated" : "added"} successfully!`);
      setEditingId(null);
      window.location.reload();
    }
  } catch (err) {
    console.error("Unexpected insert/update error:", err);
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
const removeGenre = (genreToRemove) => {
  const updated = genres.filter(g => g !== genreToRemove);
  setGenres(updated);
  localStorage.setItem(GENRE_STORAGE_KEY, JSON.stringify(updated));
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
{editingId && (
  <div style={{ marginBottom: "1rem", color: "#ffcc00" }}>
    <strong>Editing Event ID: {editingId}</strong>
    <button onClick={() => {
      setEditingId(null);
      setEventData({
        title: "",
        date: "",
        startTime: "13:00",
        endTime: "14:00",
        venue: "",
        genre: "",
        cover: "",
        description: ""
      });
    }} style={{ marginLeft: "1rem" }}>Cancel Edit</button>
  </div>
)}


      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateEventObject();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "500px" }}
      >
        <input name="title" placeholder="Title" value={eventData.title} onChange={handleEventChange} required />
        <input name="date" type="date" value={eventData.date} onChange={handleEventChange} required />
        <select
  name="startTime"
  value={eventData.startTime}
  onChange={handleEventChange}
  required
>
  <option value="13:00">1:00 PM (default)</option>
  {generateTimeOptions().map((time) => (
    <option key={time.value} value={time.value}>
      {time.label}
    </option>
  ))}
</select>

<select
  name="endTime"
  value={eventData.endTime}
  onChange={handleEventChange}
  required
>
  <option value="">Select End Time</option>
  {generateTimeOptions().map((time) => (
    <option key={time.value} value={time.value}>
      {time.label}
    </option>
  ))}
</select>
        <input name="venue" placeholder="Venue" value={eventData.venue} onChange={handleEventChange} required />
        <input name="genre" placeholder="Genre" value={eventData.genre} onChange={handleEventChange} />
        <input name="cover" placeholder="Cover Charge" value={eventData.cover} onChange={handleEventChange} />
        <textarea name="description" placeholder="Description" value={eventData.description} onChange={handleEventChange} required />
        <button type="submit">
  {editingId ? "Update Event" : "Add Event to Calendar"}
</button>
      </form>

      <hr style={{ margin: "2rem 0" }} />

      <h2>Moderation Queue</h2>
      {pendingEvents.length === 0 ? (
        <p>No pending events.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {pendingEvents.map((event) => (
            <li
  key={event.id}
  style={{
    marginBottom: "1.5rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
   backgroundColor: editingId === event.id ? "#003366" : "inherit",
color: editingId === event.id ? "#ffffff" : "inherit"
  }}
>
  <strong>{event.title}</strong><br />
  {new Date(event.start).toLocaleString()} – {new Date(event.end).toLocaleTimeString()}<br />
  <em>{event.venue}</em> | {event.genre} | {parseFloat(event.cover) > 0 ? `$${parseFloat(event.cover).toFixed(2)}` : "Free"}<br />
  <p>{event.description}</p>
  <button onClick={() => approveEvent(event)} style={{ marginRight: "0.5rem" }}>Approve</button>
  <button onClick={() => rejectEvent(event.id)}>Reject</button>
  <button
    onClick={() => editEvent(event)}
    style={{ marginLeft: "0.5rem" }}
    disabled={editingId !== null && editingId !== event.id}
  >
    Edit
  </button>
</li>

            
          ))}
          
        </ul>
      )}
      <hr style={{ margin: "2rem 0" }} />
      <h2>Approved Events</h2>
      {approvedEvents.length === 0 ? (
        <p>No approved events yet.</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {approvedEvents.map((event) => (
            <li
  key={event.id}
  style={{
    marginBottom: "1.5rem",
    padding: "1rem",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: editingId === event.id ? "#003366" : "inherit",
color: editingId === event.id ? "#ffffff" : "inherit"
  }}
>
  <strong>{event.title}</strong><br />
  {new Date(event.start).toLocaleString()} – {new Date(event.end).toLocaleTimeString()}<br />
  <em>{event.venue}</em> | {event.genre} | {event.cover}<br />
  <p>{event.description}</p>
  <button onClick={() => approveEvent(event)} style={{ marginRight: "0.5rem" }}>Approve</button>
  <button onClick={() => rejectEvent(event.id)}>Reject</button>
<button
  onClick={() => {
    if (editingId === event.id) {
      setEditingId(null);
      setEventData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        venue: "",
        genre: "",
        cover: "",
        description: ""
      });
    } else {
      editEvent(event);
    }
  }}
>
  {editingId === event.id ? "Cancel Edit" : "Edit"}
</button>

</li>

          ))}
        </ul>
      )}
    </div>
  );
}
