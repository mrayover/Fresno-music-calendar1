import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import EventForm from "./components/EventForm";
import UnifiedWeekView from "./components/UnifiedWeekView";

/*
 * This version of the AdminConfig component normalizes date handling across
 * the application.  When creating or editing events via the admin panel
 * we convert the provided local date and time into a pseudo‑UTC ISO string
 * that preserves the wall‑clock value for Fresno (America/Los_Angeles).
 * Without this conversion the browser’s built–in `toISOString` would
 * interpret a local 18:00 entry as 01:00Z during Daylight Saving Time.  By
 * subtracting the current timezone offset before calling `toISOString()`
 * we produce an ISO timestamp like `2025-07-27T18:00:00.000Z`, which our
 * client code later interprets as a local 18:00 event.  See SubmitEventForm
 * for a similar implementation.
 */

export default function AdminConfig() {
  const [newGenre, setNewGenre] = useState("");
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    startTime: "18:00",
    endTime: "19:00",
    venue: "",
    genre: "",
    cover: "",
    description: "",
    source: "",
    submittedBy: "",
    email: "",
    contact: "",
    flyer: null,
  });

  const [editingId, setEditingId] = useState(null);
  const [pendingEvents, setPendingEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [genres, setGenres] = useState(
    JSON.parse(localStorage.getItem("customGenres")) || []
  );

  useEffect(() => {
    const fetchPendingUsers = async () => {
      const { data, error } = await supabase
        .from("account_requests")
        .select("*")
        .eq("status", "pending");
      if (!error) setPendingUsers(data);
    };
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    const fetchGenres = () => {
      const saved = localStorage.getItem("customGenres");
      if (saved) setGenres(JSON.parse(saved));
    };
    const fetchEvents = async () => {
      const pending = await supabase
        .from("events")
        .select("*")
        .eq("status", "pending");
      const all = await supabase
        .from("events")
        .select("*")
        .in("status", ["approved", "archived"]);
      if (pending.data) setPendingEvents(pending.data);
      if (all.data) {
        const approvedOnly = all.data.filter((e) => e.status === "approved");
        const archivedOnly = all.data.filter((e) => e.status === "archived");
        setApprovedEvents(approvedOnly);
        setArchivedEvents(archivedOnly);
      }
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
    const updated = genres.filter((x) => x !== g);
    setGenres(updated);
    localStorage.setItem("customGenres", JSON.stringify(updated));
  };

  // Approve, reject and user management helpers remain unchanged
  const approveUser = async (request) => {
    const confirmed = window.confirm(
      `Approve account for ${request.username}?`
    );
    if (!confirmed) return;
    try {
      const res = await fetch("/api/approve-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: request.email,
          username: request.username,
          name: request.name,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert("Error creating user: " + result.error);
        return;
      }
      setPendingUsers((prev) => prev.filter((u) => u.id !== request.id));
      alert(
        `User approved. Password reset email sent to ${request.email}.`
      );
    } catch (err) {
      console.error("Error approving user:", err);
      alert("Unexpected error while approving user.");
    }
  };

  const rejectUser = async (requestId) => {
    const confirmed = window.confirm("Reject this account request?");
    if (!confirmed) return;
    const { error } = await supabase
      .from("account_requests")
      .delete()
      .eq("id", requestId);
    if (error) {
      alert("Failed to reject request.");
    } else {
      setPendingUsers((prev) => prev.filter((u) => u.id !== requestId));
      alert("Request rejected.");
    }
  };

  /**
   * Convert a local date (YYYY‑MM‑DD) and time (HH:mm) into an ISO string
   * preserving the wall‑clock time.  We subtract the current timezone
   * offset so that the resulting string has a trailing `Z` but still
   * reflects the entered local time.  For example, 2025‑07‑27 18:00 becomes
   * 2025‑07‑27T18:00:00.000Z rather than 2025‑07‑28T01:00:00.000Z.
   */
  const localToISO = (dateStr, timeStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    const localDate = new Date(year, month - 1, day, hour, minute);
    const tzOffsetMs = localDate.getTimezoneOffset() * 60000;
    return new Date(localDate.getTime() - tzOffsetMs).toISOString();
  };

  const generateEventObject = async (e) => {
    e.preventDefault();
    const start = localToISO(eventData.date, eventData.startTime);
    const end = localToISO(eventData.date, eventData.endTime);
    const coverNumber = parseFloat(eventData.cover);
    if (isNaN(coverNumber) || coverNumber < 0) {
      alert("Please enter a valid non‑negative cover charge.");
      return;
    }
    let flyerUrl = eventData.flyer;
    // Upload new flyer if necessary
    if (eventData.flyer && typeof eventData.flyer !== "string") {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("flyers")
        .upload(`flyers/${Date.now()}-${eventData.flyer.name}`, eventData.flyer, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) {
        alert("Flyer upload failed.");
        return;
      }
      const { data: publicUrlData } = await supabase.storage
        .from("flyers")
        .getPublicUrl(uploadData.path);
      flyerUrl = publicUrlData.publicUrl;
    }
    const updatedEvent = {
      title: eventData.title,
      start,
      end,
      venue: eventData.venue,
      genre: eventData.genre,
      cover: parseFloat(eventData.cover),
      description: eventData.description,
      source: eventData.source,
      submittedBy: eventData.submittedBy,
      email: eventData.email,
      contact: eventData.contact,
      flyer: flyerUrl,
      status: "approved",
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

  // Approve existing event from the moderation queue
  const approveEvent = async (event) => {
    const { id, title, start, end, venue, genre, cover, description, source, submittedBy, contact, flyer, email } = event;
    const { error } = await supabase
      .from("events")
      .update({ title, start, end, venue, genre, cover, description, source, submittedBy, contact, flyer, email, status: "approved" })
      .eq("id", id);
    if (error) {
      console.error("Approval failed:", error.message);
      alert("Approval failed. Please try again.");
    } else {
      setPendingEvents((p) => p.filter((e) => e.id !== id));
      alert("Event approved.");
    }
  };

  // Load an event into the form for editing
  const editEvent = (event) => {
    setEventData({
      title: event.title,
      date: event.start.slice(0, 10),
      startTime: event.start.slice(11, 16),
      endTime: event.end.slice(11, 16),
      venue: event.venue || "",
      genre: event.genre || "",
      cover: event.cover || "",
      description: event.description || "",
      source: event.source || "",
      submittedBy: event.submittedBy || "admin",
      email: event.email || "",
      contact: event.contact || "",
      flyer: event.flyer || null,
    });
    setEditingId(event.id);
  };

  // Delete an approved event
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

  // Archive or restore events
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
      const { data: updatedApproved } = await supabase
        .from("events")
        .select("*")
        .in("status", ["approved", "archived"]);
      const approvedOnly = (updatedApproved || []).filter((e) => e.status === "approved");
      const archivedOnly = (updatedApproved || []).filter((e) => e.status === "archived");
      setApprovedEvents(approvedOnly);
      setArchivedEvents(archivedOnly);
      alert(isArchived ? "Event restored to calendar." : "Event archived.");
    }
  };

  const rejectEvent = async (id) => {
    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", id)
      .eq("status", "pending");
    if (!error) {
      setPendingEvents((p) => p.filter((e) => e.id !== id));
      alert("Event rejected.");
    } else {
      alert("Error rejecting event.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startTime") {
      const [hour, minute] = value.split(":").map(Number);
      const newHour = (hour + 1) % 24;
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

  const [activeTab, setActiveTab] = useState("event");

  return (
    <div className="relative">
      {/* Sticky header and tab bar */}
      <div className="sticky top-20 z-30 bg-[#1c0f1f] border-b border-tower-cream">
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-center text-white w-full">Admin Panel</h1>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = "/";
            }}
            className="absolute right-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
          >
            Sign Out
          </button>
        </div>
        <div className="px-6 py-2 border-t border-tower-cream flex space-x-4 justify-center bg-[#2b1530]">
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${activeTab === "event" ? "bg-tower-yellow text-black" : "text-white hover:underline"}`}
            onClick={() => setActiveTab("event")}
          >
            Event Moderation
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${activeTab === "user" ? "bg-tower-yellow text-black" : "text-white hover:underline"}`}
            onClick={() => setActiveTab("user")}
          >
            User Moderation
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${activeTab === "venue" ? "bg-tower-yellow text-black" : "text-white hover:underline"}`}
            onClick={() => setActiveTab("venue")}
          >
            Venue Moderation
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${activeTab === "band" ? "bg-tower-yellow text-black" : "text-white hover:underline"}`}
            onClick={() => setActiveTab("band")}
          >
            Band Moderation
          </button>
        </div>
      </div>
      {/* Main content area */}
      <div className="p-8">
        {activeTab === "event" && (
          <>
            {pendingEvents.length > 0 && (
              <div className="bg-yellow-300 text-black font-bold px-4 py-2 rounded mb-4 shadow">
                You have {pendingEvents.length} pending event{pendingEvents.length > 1 ? "s" : ""} awaiting review
              </div>
            )}
            <h2 className="text-lg font-semibold mb-2">Admin Genre Manager</h2>
            <input
              value={newGenre}
              onChange={(e) => setNewGenre(e.target.value)}
              placeholder="New Genre"
              className="border px-2 py-1 mr-2 rounded"
            />
            <button
              onClick={addGenre}
              className="bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
            >
              Add
            </button>
            <ul className="mt-2">
              {genres.map((g) => (
                <li key={g}>
                  {g}{" "}
                  <button
                    onClick={() => removeGenre(g)}
                    className="text-red-500 hover:underline ml-2"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <hr className="my-6" />
            <h2 className="text-lg font-semibold mb-2">
              {editingId ? "Edit Event" : "Add Event"}
            </h2>
            <EventForm
              mode="admin"
              data={eventData}
              setData={setEventData}
              onSubmit={generateEventObject}
              handleChange={handleChange}
              editingId={editingId}
              availableGenres={genres}
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
                  description: "",
                });
              }}
            />
            <hr className="my-6" />
            <UnifiedWeekView
              pendingEvents={pendingEvents}
              approvedEvents={approvedEvents}
              archivedEvents={archivedEvents}
              onEdit={editEvent}
              approveEvent={approveEvent}
              rejectEvent={rejectEvent}
              archiveEvent={toggleArchiveEvent}
              deleteEvent={deleteApprovedEvent}
              genres={genres}
              setGenres={setGenres}
            />
          </>
        )}
        {activeTab === "user" && (
          <div className="text-white mt-8 px-6">
            <h2 className="text-xl font-bold mb-4">Pending Account Requests</h2>
            {pendingUsers.length === 0 ? (
              <p className="text-sm italic text-tower-yellow">No pending requests.</p>
            ) : (
              <div className="space-y-4">
                {pendingUsers.map((u) => (
                  <div key={u.id} className="bg-[#321c38] border border-tower-yellow p-4 rounded shadow">
                    <div className="flex items-center gap-4">
                      <img
                        src={u.avatar_url || "/default-avatar.png"}
                        alt="avatar"
                        className="w-16 h-16 rounded-full border object-cover"
                      />
                      <div>
                        <p className="font-bold">
                          {u.name} ({u.username})
                        </p>
                        <p className="text-sm text-gray-300">{u.email}</p>
                        {u.message && <p className="text-sm mt-2 italic">"{u.message}"</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => approveUser(u)}
                        className="bg-tower-yellow text-black font-bold px-3 py-1 rounded hover:bg-yellow-300"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectUser(u.id)}
                        className="bg-red-600 text-white font-bold px-3 py-1 rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "venue" && (
          <div className="text-white text-center mt-10">
            <h2 className="text-xl font-semibold">Venue Moderation</h2>
            <p className="text-sm mt-2">This section is planned for future venue directory moderation.</p>
          </div>
        )}
        {activeTab === "band" && (
          <div className="text-white text-center mt-10">
            <h2 className="text-xl font-semibold">Band Moderation</h2>
            <p className="text-sm mt-2">This section will handle artist profiles and public band submissions in a future phase.</p>
          </div>
        )}
      </div>
    </div>
  );
}