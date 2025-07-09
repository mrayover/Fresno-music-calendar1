import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import EventForm from "./components/EventForm";

export default function AdminConfig() {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState("");
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "18:00",
    endTime: "19:00",
    venue: "",
    genre: "",
    cover: "",
    description: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);

  useEffect(() => {
    const fetchGenres = () => {
      const saved = localStorage.getItem("customGenres");
      if (saved) setGenres(JSON.parse(saved));
    };

    const fetchEvents = async () => {
      const pending = await supabase.from("events").select("*").eq("status", "pending");
      const approved = await supabase
  .from("events")
  .select("*")
  .in("status", ["approved", "archived"]);


      if (pending.data) setPendingEvents(pending.data);
      if (approved.data) setApprovedEvents(approved.data);
    };

    fetchGenres();
    fetchEvents();
  }, []);

  const addGenre = () => {
    const trimmed = newGenre.trim();
    if (trimmed && !genres.includes(trimmed)) {
      const updated = [...genres, trimmed];
      setGenres(updated);
      localStorage.setItem("customGenres", JSON.stringify(updated));
      setNewGenre("");
    }
  };

  const removeGenre = (g) => {
    const updated = genres.filter(x => x !== g);
    setGenres(updated);
    localStorage.setItem("customGenres", JSON.stringify(updated));
  };

  const localToISO = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute).toISOString();
  };

  const generateEventObject = async (e) => {
    e.preventDefault();
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
      cover: coverNumber,
      status: "approved",
      source: "admin"
    };

    const result = editingId
      ? await supabase.from("events").update(updatedEvent).eq("id", editingId)
      : await supabase.from("events").insert([updatedEvent]);

    if (result.error) {
      alert("Error submitting event.");
    } else {
      alert(editingId ? "Event updated!" : "Event added!");
      window.location.reload();
    }
  };

  const approveEvent = async (event) => {
    const { error } = await supabase.from("events").update({ status: "approved" }).eq("id", event.id);
    if (!error) {
      setPendingEvents(p => p.filter(e => e.id !== event.id));
      alert("Event approved.");
    }
  };

  const rejectEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id).eq("status", "pending");
    if (!error) {
      setPendingEvents(p => p.filter(e => e.id !== id));
      alert("Event rejected.");
    }
  };

  const editEvent = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    setEventData({
      title: event.title,
      date: start.toISOString().slice(0, 10),
      startTime: start.toISOString().slice(11, 16),
      endTime: end.toISOString().slice(11, 16),
      venue: event.venue || "",
      genre: event.genre || "",
      cover: event.cover || "",
      description: event.description || ""
    });
    setEditingId(event.id);
  };
const deleteApprovedEvent = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this approved event?");
  if (!confirmed) return;

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    alert("Failed to delete event.");
  } else {
    setApprovedEvents((prev) => prev.filter((e) => e.id !== id));
    alert("Event deleted.");
  }
};
const toggleArchiveEvent = async (event) => {
  const isArchived = event.status === "archived";
  const newStatus = isArchived ? "approved" : "archived";

  const confirmed = window.confirm(`${isArchived ? "Restore" : "Archive"} this event?`);
  if (!confirmed) return;

  const { error } = await supabase
    .from("events")
    .update({ status: newStatus })
    .eq("id", event.id);

  if (error) {
    alert("Failed to update archive status.");
  } else {
    // Refetch the lists to reflect updated status
    const { data: updatedApproved } = await supabase
  .from("events")
  .select("*")
  .in("status", ["approved", "archived"]);
    const approvedOnly = (updatedApproved || []).filter(e => e.status === "approved");
    const archivedOnly = (updatedApproved || []).filter(e => e.status === "archived");

      setApprovedEvents(approvedOnly);
      setArchivedEvents(archivedOnly); // (optional for future use)
    alert(isArchived ? "Event restored to calendar." : "Event archived.");
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "startTime") {
      const [hour, minute] = value.split(":").map(Number);
      let newHour = (hour + 1) % 24;
      const adjustedEnd = `${newHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

      setEventData((prev) => ({
        ...prev,
        startTime: value,
        endTime: adjustedEnd
      }));
    } else {
      setEventData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Genre Manager</h2>
      <input value={newGenre} onChange={(e) => setNewGenre(e.target.value)} placeholder="New Genre" />
      <button onClick={addGenre}>Add</button>
      <ul>
        {genres.map((g) => (
          <li key={g}>{g} <button onClick={() => removeGenre(g)}>Remove</button></li>
        ))}
      </ul>

      <hr />
      <h2>{editingId ? "Edit Event" : "Add Event"}</h2>

      <EventForm
        mode="admin"
        data={eventData}
        setData={setEventData}
        onSubmit={generateEventObject}
        handleChange={handleChange}
        editingId={editingId}
        cancelEdit={() => {
          setEditingId(null);
          setEventData({
            title: "",
            date: "",
            startTime: "18:00",
            endTime: "19:00",
            venue: "",
            genre: "",
            cover: "",
            description: ""
          });
        }}
      />

      <hr />
      <h2>Pending Events</h2>
      <ul>
        {pendingEvents.map(e => (
          <li key={e.id}>
            <strong>{e.title}</strong> | {e.venue} | {e.genre} | {parseFloat(e.cover) > 0 ? `$${parseFloat(e.cover).toFixed(2)}` : "Free"}<br />
            {new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleTimeString()}<br />
            {e.description}<br />
            <button onClick={() => approveEvent(e)}>Approve</button>
            <button onClick={() => rejectEvent(e.id)}>Reject</button>
            <button onClick={() => editEvent(e)}>Edit</button>
          </li>
        ))}
      </ul>
      <hr />
<h2>Approved Events</h2>
<ul>
  {approvedEvents.map((e) => (
    <li key={e.id}>
      <strong>{e.title}</strong> | {e.venue} | {e.genre} | {parseFloat(e.cover) > 0 ? `$${parseFloat(e.cover).toFixed(2)}` : "Free"}<br />
      {new Date(e.start).toLocaleString()} – {new Date(e.end).toLocaleTimeString()}<br />
      {e.description}<br />
      <button onClick={() => editEvent(e)}>Edit</button>
      <button onClick={() => deleteApprovedEvent(e.id)} style={{ marginLeft: "1rem" }}>Delete</button>
      <button
  onClick={() => toggleArchiveEvent(e)}
  style={{
    marginLeft: "1rem",
    backgroundColor: e.status === "archived" ? "#ffcc66" : "#ddd"
  }}
>
  {e.status === "archived" ? "Restore" : "Archive"}
</button>

    </li>
  ))}
</ul>
    </div>
  );
}
