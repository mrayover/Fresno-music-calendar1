// EventForm.jsx
import React from "react";

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

const EventForm = ({ data, setData, onSubmit, mode = "public", editingId = null, cancelEdit = null }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
if (name === "startTime") {
  const [hour, minute] = value.split(":").map(Number);
  let newHour = (hour + 1) % 24;
  const adjustedEnd = `${newHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

  setData((prev) => {
    const shouldAutoUpdate = prev.endTime === "" || prev.endTime === prev.startTime;
    return {
      ...prev,
      startTime: value,
      endTime: shouldAutoUpdate ? adjustedEnd : prev.endTime,
    };
  });

    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <>
      {mode === "admin" && editingId && (
        <div style={{ marginBottom: "1rem", color: "#ffcc00" }}>
          <strong>Editing Event ID: {editingId}</strong>
          <button onClick={cancelEdit} style={{ marginLeft: "1rem" }}>Cancel Edit</button>
        </div>
      )}

      <form
        onSubmit={onSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "500px" }}
      >
        <input name="title" placeholder="Title" value={data.title} onChange={handleChange} required />
        <input name="date" type="date" value={data.date} onChange={handleChange} required />

        <select name="startTime" value={data.startTime} onChange={handleChange} required>
          <option value="">Select Start Time</option>
          {generateTimeOptions().map((time) => (
            <option key={time.value} value={time.value}>{time.label}</option>
          ))}
        </select>

        <select name="endTime" value={data.endTime} onChange={handleChange} required>
          <option value="">Select End Time</option>
          {generateTimeOptions().map((time) => (
            <option key={time.value} value={time.value}>{time.label}</option>
          ))}
        </select>

        <input name="venue" placeholder="Venue" value={data.venue} onChange={handleChange} required />
        <input name="genre" placeholder="Genre" value={data.genre} onChange={handleChange} />
        <input name="cover" placeholder="Cover Charge" value={data.cover} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange} required />

        <button type="submit">{editingId ? "Update Event" : mode === "admin" ? "Add Event to Calendar" : "Submit Event"}</button>
      </form>
    </>
  );
};

export default EventForm;
